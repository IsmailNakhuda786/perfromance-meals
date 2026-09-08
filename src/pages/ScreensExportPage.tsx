import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
}

/* ─── Shared primitives ─── */
const Badge = ({ label, bg = "#CDFF3A", color = "#111" }: { label: string; bg?: string; color?: string }) => (
  <span className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: bg, color }}>{label}</span>
);

const ScreenFrame = ({ n, title, sub, children }: { n: number; title: string; sub: string; children: React.ReactNode }) => (
  <div className="screen-frame" style={{ pageBreakBefore: n === 1 ? "avoid" : "always" }}>
    {/* Label row */}
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10, borderBottom: "2px solid #CDFF3A", paddingBottom: 8 }}>
      <span style={{ fontFamily: "monospace", fontSize: 10, color: "#CDFF3A", background: "#111", padding: "2px 6px", fontWeight: 700 }}>{String(n).padStart(2, "0")}</span>
      <span style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{title}</span>
      <span style={{ fontSize: 10, color: "#888", marginLeft: "auto" }}>{sub}</span>
    </div>
    <div style={{ border: "1px solid #E5E2DA", background: "#F7F5F0", padding: 0, overflow: "hidden" }}>
      {children}
    </div>
  </div>
);

/* ─── Mini nav bar used in most screens ─── */
const MiniNav = ({ page = "home" }: { page?: string }) => (
  <div style={{ background: "#111", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <span style={{ fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: 1 }}>FRESHER<span style={{ color: "#CDFF3A" }}>.</span></span>
    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
      {["Ready Series", "Meal Plans", "Build-A-Box", "How It Works"].map((l) => (
        <span key={l} style={{ fontSize: 9, color: l.toLowerCase().replace(/ /g, "-") === page ? "#CDFF3A" : "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{l}</span>
      ))}
      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>🪙 $12 · 1,234pts</span>
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#CDFF3A", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 10, color: "#111" }}>J</div>
      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.2)", padding: "2px 7px" }}>Out</span>
      <span style={{ fontSize: 9, color: "#111", background: "#CDFF3A", padding: "3px 10px", fontWeight: 700 }}>🛒 3</span>
    </div>
  </div>
);

const Row = ({ children, gap = 12, wrap = false }: { children: React.ReactNode; gap?: number; wrap?: boolean }) => (
  <div style={{ display: "flex", gap, flexWrap: wrap ? "wrap" : undefined }}>{children}</div>
);

const Col = ({ children, flex = 1, bg, pad = 12 }: { children: React.ReactNode; flex?: number; bg?: string; pad?: number }) => (
  <div style={{ flex, background: bg, padding: pad }}>{children}</div>
);

const Label = ({ children, color = "#999", size = 8, mono = false }: { children: React.ReactNode; color?: string; size?: number; mono?: boolean }) => (
  <p style={{ fontSize: size, color, fontFamily: mono ? "monospace" : undefined, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 3 }}>{children}</p>
);

const H = ({ children, size = 14, color = "#111", weight = 700 }: { children: React.ReactNode; size?: number; color?: string; weight?: number }) => (
  <p style={{ fontSize: size, color, fontWeight: weight, marginBottom: 4, lineHeight: 1.3 }}>{children}</p>
);

const P = ({ children, color = "#666", size = 9 }: { children: React.ReactNode; color?: string; size?: number }) => (
  <p style={{ fontSize: size, color, marginBottom: 3, lineHeight: 1.4 }}>{children}</p>
);

const Btn = ({ children, bg = "#111", color = "#fff", full = false }: { children: React.ReactNode; bg?: string; color?: string; full?: boolean }) => (
  <div style={{ display: "inline-block", background: bg, color, fontSize: 8, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 12px", width: full ? "100%" : undefined, textAlign: full ? "center" : undefined, boxSizing: "border-box" }}>{children}</div>
);

const Card = ({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) => (
  <div style={{ background: bg, border: "1px solid #E5E2DA", padding: 10, flex: 1 }}>{children}</div>
);

const Img = ({ src, h = 60 }: { src: string; h?: number }) => (
  <div style={{ height: h, overflow: "hidden", marginBottom: 6 }}>
    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

const Divider = () => <div style={{ height: 1, background: "#E5E2DA", margin: "6px 0" }} />;

const Input = ({ placeholder }: { placeholder: string }) => (
  <div style={{ border: "1px solid #D0CCC4", background: "#fff", padding: "5px 8px", fontSize: 9, color: "#aaa", marginBottom: 5 }}>{placeholder}</div>
);

const CheckRow = ({ label, checked = false }: { label: string; checked?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
    <div style={{ width: 10, height: 10, border: "1px solid #ccc", background: checked ? "#111" : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {checked && <span style={{ color: "#CDFF3A", fontSize: 7 }}>✓</span>}
    </div>
    <span style={{ fontSize: 8, color: "#444" }}>{label}</span>
  </div>
);

const MealCard = ({ name, cat, price, img }: { name: string; cat: string; price: string; img: string }) => (
  <div style={{ flex: 1, background: "#1A1A1A", overflow: "hidden", minWidth: 80 }}>
    <div style={{ height: 50, overflow: "hidden", position: "relative" }}>
      <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
      <span style={{ position: "absolute", top: 3, left: 3, background: "#CDFF3A", color: "#111", fontSize: 6, padding: "1px 4px", fontWeight: 700, textTransform: "uppercase" }}>{cat}</span>
    </div>
    <div style={{ padding: "5px 6px" }}>
      <p style={{ fontSize: 7, color: "#fff", fontWeight: 600, marginBottom: 2, lineHeight: 1.2 }}>{name}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 8, color: "#CDFF3A", fontFamily: "monospace", fontWeight: 700 }}>{price}</span>
        <div style={{ display: "flex", gap: 2 }}>
          <span style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 8, width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</span>
          <span style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 8, width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</span>
        </div>
      </div>
    </div>
  </div>
);

const TimelineItem = ({ label, detail, done, active }: { label: string; detail: string; done: boolean; active: boolean }) => (
  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: 14, height: 14, borderRadius: "50%", background: done ? "#CDFF3A" : active ? "#111" : "#E5E2DA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {done && <span style={{ fontSize: 7, color: "#111" }}>✓</span>}
        {active && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#CDFF3A" }} />}
      </div>
      <div style={{ width: 1, flex: 1, background: done ? "#CDFF3A" : "#E5E2DA", minHeight: 12 }} />
    </div>
    <div style={{ paddingBottom: 6 }}>
      <p style={{ fontSize: 8, fontWeight: 600, color: done || active ? "#111" : "#bbb" }}>{label}</p>
      <p style={{ fontSize: 7, color: "#888" }}>{detail}</p>
    </div>
  </div>
);

export default function ScreensExportPage({ navigate }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setGenerating(true);
    try {
      const el = contentRef.current;
      const canvas = await html2canvas(el, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: el.scrollWidth,
        height: el.scrollHeight,
        windowWidth: el.scrollWidth,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.85);
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = canvas.width;
      const imgH = canvas.height;
      const ratio = pageW / imgW;
      const scaledH = imgH * ratio;

      let yPos = 0;
      while (yPos < scaledH) {
        if (yPos > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, -yPos, pageW, scaledH);
        yPos += pageH;
      }

      pdf.save("Fresher-Prototype-Screens.pdf");
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("PDF generation failed — try a smaller window width and retry.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#fff", maxWidth: 900, margin: "0 auto", padding: 32 }}>
      <style>{`.screen-frame { margin-bottom: 40px; }`}</style>

      {/* Downloadable content */}
      <div ref={contentRef}>

      {/* Cover page */}
      <div style={{ background: "#111", color: "#fff", padding: 48, marginBottom: 40, textAlign: "center" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, color: "#CDFF3A", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}>Prototype · Screen Documentation</p>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 8 }}>FRESHER<span style={{ color: "#CDFF3A" }}>.</span></h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>fresher.com.sg · Performance Meals</p>
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 32 }}>
          {[["14", "Screens"], ["3", "User Journeys"], ["7", "Page Types"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#CDFF3A" }}>{n}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.2em" }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 8 }}>
          {["#CDFF3A", "#F2C94C", "#7EE8B0", "#111111", "#F7F5F0"].map((c) => (
            <div key={c} style={{ width: 32, height: 32, background: c, border: "1px solid rgba(255,255,255,0.1)" }} />
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, marginTop: 12 }}>Brand palette · Lime · Gold · Mint · Midnight · Parchment</p>
      </div>

      {/* Screen index */}
      <div style={{ border: "1px solid #E5E2DA", padding: 24, marginBottom: 40 }}>
        <p style={{ fontFamily: "monospace", fontSize: 9, color: "#999", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>Screen Index</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 32px" }}>
          {[
            ["01", "Home Page"],
            ["02", "Ready-to-Go — All Meals"],
            ["03", "Ready-to-Go — Promotions"],
            ["04", "Ready-to-Go — Useful Bundles"],
            ["05", "Ready-to-Go — Product Detail Modal"],
            ["06", "Build-A-Box"],
            ["07", "Meal Plan Wizard (Steps 1–5)"],
            ["08", "Checkout — Auth Gate"],
            ["09", "Checkout — Delivery & Payment"],
            ["10", "Order Confirmation"],
            ["11", "Account — Dashboard"],
            ["12", "Account — Subscription & Meal Swap"],
            ["13", "Account — Order History"],
            ["14", "Account — Wallet & Rewards"],
          ].map(([n, l]) => (
            <div key={n} style={{ display: "flex", gap: 12, alignItems: "center", padding: "5px 0", borderBottom: "1px solid #F0EDE8" }}>
              <span style={{ fontFamily: "monospace", fontSize: 9, color: "#CDFF3A", background: "#111", padding: "1px 5px", fontWeight: 700 }}>{n}</span>
              <span style={{ fontSize: 10, color: "#333" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          SCREEN 01 — HOME PAGE
      ═══════════════════════════════════════ */}
      <ScreenFrame n={1} title="Home Page" sub="Entry · Discovery · Hook building">
        <MiniNav page="home" />
        {/* Hero */}
        <div style={{ background: "#0E0E0E", padding: "24px 20px" }}>
          <p style={{ fontFamily: "monospace", fontSize: 8, color: "#CDFF3A", letterSpacing: "0.4em", marginBottom: 6 }}>PERFORMANCE MEALS · SINGAPORE</p>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 8 }}>Fuel your body.<br /><span style={{ color: "#CDFF3A" }}>Hit your goals.</span></h1>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Macro-accurate meals delivered to your door. From $9.90/meal.</p>
          <Row gap={8}>
            <Btn bg="#CDFF3A" color="#111">Shop Ready Meals →</Btn>
            <Btn bg="transparent" color="rgba(255,255,255,0.5)">From $9 · View Plans</Btn>
            <Btn bg="#111" color="rgba(255,255,255,0.5)">Build-A-Box · From $11</Btn>
          </Row>
        </div>
        {/* Trust bar */}
        <div style={{ background: "#CDFF3A", padding: "6px 20px", display: "flex", gap: 24 }}>
          {["✓ Free delivery over $80", "✓ Macro-accurate", "✓ 60-day money-back", "✓ No lock-in"].map((t) => (
            <span key={t} style={{ fontSize: 8, fontWeight: 700, color: "#111", textTransform: "uppercase", letterSpacing: "0.15em" }}>{t}</span>
          ))}
        </div>
        {/* Plans section */}
        <div style={{ background: "#F7F5F0", padding: "16px 20px" }}>
          <Label mono color="#999">Choose your journey</Label>
          <H size={13}>Ready Series · Meal Plans · Build-A-Box</H>
          <Row gap={8}>
            {[
              { name: "Ready-to-Go", from: "$9.90", color: "#CDFF3A", desc: "Single meals, any day" },
              { name: "Meal Plan", from: "$148/wk", color: "#F2C94C", desc: "CUT · MAINTAIN · BUILD" },
              { name: "Build-A-Box", from: "$11/meal", color: "#7EE8B0", desc: "Mix & match 5–20 meals" },
            ].map((p) => (
              <Card key={p.name}>
                <div style={{ height: 4, background: p.color, marginBottom: 6 }} />
                <H size={10}>{p.name}</H>
                <P>{p.desc}</P>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#111", marginBottom: 6 }}>From {p.from}</p>
                <Btn bg="#111" color="#fff">Shop Now →</Btn>
              </Card>
            ))}
          </Row>
        </div>
        {/* Trusted By */}
        <div style={{ background: "#fff", padding: "12px 20px" }}>
          <Label mono color="#999">Trusted by</Label>
          <Row gap={8}>
            {[{ seg: "Athletes", icon: "🏋️" }, { seg: "Busy Professionals", icon: "💼" }, { seg: "Families", icon: "👨‍👩‍👧" }].map((s) => (
              <div key={s.seg} style={{ flex: 1, border: "1px solid #E5E2DA", padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <p style={{ fontSize: 8, fontWeight: 700, color: "#111" }}>{s.seg}</p>
              </div>
            ))}
          </Row>
        </div>
        {/* Created By */}
        <div style={{ background: "#0D2818", padding: "12px 20px", display: "flex", gap: 16 }}>
          <div style={{ width: 60, height: 60, background: "#1A3D24", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24 }}>👨‍🍳</span>
          </div>
          <div>
            <Label mono color="#7EE8B0">Created by</Label>
            <H size={12} color="#fff">Chef Ahmad + Sports Nutrition Team</H>
            <P color="rgba(255,255,255,0.4)" size={8}>Ex-5-star hotel chef · 10 years in sports nutrition · Certified dieticians</P>
          </div>
        </div>
        {/* Real Results */}
        <div style={{ background: "#F7F5F0", padding: "12px 20px" }}>
          <Label mono color="#999">Real Results</Label>
          <Row gap={6}>
            {[["Marcus L.", "Lost 8kg in 60 days", "⭐⭐⭐⭐⭐"], ["Priya S.", "+3kg muscle in 8wks", "⭐⭐⭐⭐⭐"], ["David K.", "Dropped 12kg", "⭐⭐⭐⭐⭐"]].map(([n, r, s]) => (
              <Card key={n}>
                <p style={{ fontSize: 9, marginBottom: 2 }}>{s}</p>
                <P size={8}>{r}</P>
                <P size={7} color="#aaa">{n}</P>
              </Card>
            ))}
          </Row>
        </div>
        {/* Promo Popup indicator */}
        <div style={{ background: "#CDFF3A", padding: "6px 20px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 10 }}>🎉</span>
          <span style={{ fontSize: 8, fontWeight: 700, color: "#111" }}>PROMO POPUP fires on every home page visit · "Get 10% off your first order — use FRESHER10"</span>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 02 — READY-TO-GO ALL MEALS
      ═══════════════════════════════════════ */}
      <ScreenFrame n={2} title="Ready-to-Go — All Meals" sub="Discovery · Purchase · Free delivery signal">
        <MiniNav page="ready-series" />
        <div style={{ background: "#0E0E0E", padding: "16px 20px" }}>
          <Label mono color="#CDFF3A">01 / Ready Series</Label>
          <H size={20} color="#fff">Ready-to-Go Meals</H>
          <P color="rgba(255,255,255,0.4)">Macro-accurate. Frozen at peak nutrition. Heat in 3 minutes.</P>
        </div>
        <div style={{ background: "#0E0E0E", padding: "0 20px 16px" }}>
          {/* Category tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            {["All Meals", "🔥 Promotion", "📦 Useful Bundles", "Low Carb", "High Carb", "Breakfast", "Just Protein"].map((c, i) => (
              <span key={c} style={{ fontSize: 8, padding: "4px 10px", background: i === 0 ? "#CDFF3A" : "transparent", color: i === 0 ? "#111" : "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.12)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>{c}</span>
            ))}
          </div>
          {/* Meal grid */}
          <Row gap={6}>
            {[
              { name: "Herb Chicken Rice", cat: "High Carb", price: "$12.40", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=150&fit=crop" },
              { name: "Korean BBQ Bowl", cat: "Low Carb", price: "$13.20", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=150&fit=crop" },
              { name: "Cajun Salmon", cat: "Just Protein", price: "$14.80", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=150&fit=crop" },
            ].map((m) => <MealCard key={m.name} {...m} />)}
          </Row>
        </div>
        {/* Cart drawer preview */}
        <div style={{ background: "#1A1A1A", padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Row gap={12}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Cart savings nudge (Nav cart drawer)</p>
              <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>
                <p style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Add <span style={{ color: "#CDFF3A", fontWeight: 700 }}>$23.50</span> more for free delivery</p>
                <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: "70%", background: "#CDFF3A", borderRadius: 2 }} />
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Meal savings nudge</p>
              <div style={{ background: "#0D2818", border: "1px solid rgba(205,255,58,0.3)", padding: 8 }}>
                <p style={{ fontSize: 8, color: "#CDFF3A", fontWeight: 700 }}>Add 5 more meals — save $0.50/meal</p>
              </div>
            </div>
          </Row>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 03 — PROMOTIONS
      ═══════════════════════════════════════ */}
      <ScreenFrame n={3} title="Ready-to-Go — Promotions" sub="Discounted products & bundles · Flash sales">
        <MiniNav page="ready-series" />
        <div style={{ background: "#0E0E0E", padding: "16px 20px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {["All Meals", "🔥 Promotion", "📦 Useful Bundles", "Low Carb", "High Carb"].map((c, i) => (
              <span key={c} style={{ fontSize: 8, padding: "4px 10px", background: i === 1 ? "#CDFF3A" : "transparent", color: i === 1 ? "#111" : "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.12)", fontWeight: 600, letterSpacing: "0.15em" }}>{c}</span>
            ))}
          </div>
          <Row gap={10}>
            {[
              { name: "SG61 Deal — Herb Chicken ×3", tag: "Promo", saving: "22% OFF", sale: "$28.90", orig: "$37.20", img: "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?w=300&h=180&fit=crop" },
              { name: "Weekend Bundle — Mix of 4", tag: "Flash Sale", saving: "24% OFF", sale: "$39.90", orig: "$52.60", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=180&fit=crop" },
            ].map((p) => (
              <div key={p.name} style={{ flex: 1, background: "#1A1A1A", border: "1px solid rgba(205,255,58,0.2)", overflow: "hidden" }}>
                <div style={{ height: 80, position: "relative", overflow: "hidden" }}>
                  <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
                  <span style={{ position: "absolute", top: 4, left: 4, background: "#CDFF3A", color: "#111", fontSize: 7, padding: "2px 5px", fontWeight: 700 }}>{p.tag}</span>
                  <span style={{ position: "absolute", top: 4, right: 4, background: "#ef4444", color: "#fff", fontSize: 7, padding: "2px 5px", fontWeight: 700 }}>{p.saving}</span>
                </div>
                <div style={{ padding: 8 }}>
                  <p style={{ fontSize: 9, color: "#fff", fontWeight: 600, marginBottom: 3 }}>{p.name}</p>
                  <Row gap={8}>
                    <span style={{ fontSize: 13, color: "#CDFF3A", fontFamily: "monospace", fontWeight: 700 }}>{p.sale}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "line-through", fontFamily: "monospace" }}>{p.orig}</span>
                    <Btn bg="#CDFF3A" color="#111">Add to Cart</Btn>
                  </Row>
                </div>
              </div>
            ))}
          </Row>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 04 — USEFUL BUNDLES
      ═══════════════════════════════════════ */}
      <ScreenFrame n={4} title="Ready-to-Go — Useful Bundles" sub="Curated meal packs · Best value per meal">
        <MiniNav page="ready-series" />
        <div style={{ background: "#0E0E0E", padding: "16px 20px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {["All Meals", "🔥 Promotion", "📦 Useful Bundles"].map((c, i) => (
              <span key={c} style={{ fontSize: 8, padding: "4px 10px", background: i === 2 ? "#CDFF3A" : "transparent", color: i === 2 ? "#111" : "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.12)", fontWeight: 600 }}>{c}</span>
            ))}
          </div>
          <Row gap={8}>
            {[
              { name: "Lean Starter Pack (5 meals)", tag: "Popular", price: "$59.00", ppm: "$11.80/meal", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=120&fit=crop" },
              { name: "Bulk Performance Box (10 meals)", tag: "Best Value", price: "$109.00", ppm: "$10.90/meal", img: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=200&h=120&fit=crop" },
              { name: "Breakfast Week (7 meals)", tag: "New", price: "$65.00", ppm: "$9.28/meal", img: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=200&h=120&fit=crop" },
            ].map((b) => (
              <div key={b.name} style={{ flex: 1, background: "#1A1A1A", overflow: "hidden" }}>
                <Img src={b.img} h={55} />
                <div style={{ padding: 7 }}>
                  <Badge label={b.tag} bg="rgba(255,255,255,0.1)" color="#fff" />
                  <p style={{ fontSize: 8, color: "#fff", fontWeight: 600, margin: "4px 0 2px" }}>{b.name}</p>
                  <p style={{ fontSize: 11, color: "#CDFF3A", fontFamily: "monospace", fontWeight: 700 }}>{b.price}</p>
                  <p style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", marginBottom: 5 }}>{b.ppm}</p>
                  <Btn bg="rgba(255,255,255,0.1)" color="#fff">Add</Btn>
                </div>
              </div>
            ))}
          </Row>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 05 — PRODUCT DETAIL MODAL
      ═══════════════════════════════════════ */}
      <ScreenFrame n={5} title="Product Detail Modal" sub="Meal info · Macros · Add to cart · View ratings">
        <div style={{ background: "rgba(0,0,0,0.7)", padding: 20, display: "flex", justifyContent: "center" }}>
          <div style={{ background: "#1A1A1A", width: "100%", maxWidth: 480, overflow: "hidden" }}>
            <div style={{ height: 100, overflow: "hidden", position: "relative" }}>
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=200&fit=crop" alt="" style={{ width: "100%", objectFit: "cover" }} />
              <Badge label="Bestseller" />
            </div>
            <div style={{ padding: 14 }}>
              <Row gap={8}>
                <div style={{ flex: 1 }}>
                  <Label mono color="#999">High Carb</Label>
                  <H size={14} color="#fff">Herb Chicken Rice Bowl</H>
                  <p style={{ fontSize: 9, color: "#888", marginBottom: 6 }}>⭐⭐⭐⭐⭐ 4.9 · 128 reviews</p>
                  <P color="rgba(255,255,255,0.4)">Tender herb-marinated chicken thigh on jasmine rice with roasted vegetables. Chef Ahmad's signature.</P>
                </div>
                <div>
                  <Row gap={4}>
                    {[["450", "kcal"], ["38g", "protein"], ["52g", "carbs"], ["12g", "fat"]].map(([v, l]) => (
                      <div key={l} style={{ textAlign: "center", background: "#222", padding: "5px 6px" }}>
                        <p style={{ fontSize: 10, color: "#CDFF3A", fontWeight: 700 }}>{v}</p>
                        <p style={{ fontSize: 7, color: "#666" }}>{l}</p>
                      </div>
                    ))}
                  </Row>
                  <div style={{ marginTop: 8 }}>
                    <p style={{ fontSize: 16, color: "#CDFF3A", fontFamily: "monospace", fontWeight: 700 }}>$12.40</p>
                    <Btn bg="#CDFF3A" color="#111" full>Add to Cart</Btn>
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 06 — BUILD-A-BOX
      ═══════════════════════════════════════ */}
      <ScreenFrame n={6} title="Build-A-Box" sub="Mix & match · 5–20 meals · Best value">
        <MiniNav />
        <div style={{ background: "#0E0E0E", padding: "16px 20px" }}>
          <H size={18} color="#fff">Build Your Box</H>
          <P color="rgba(255,255,255,0.4)">Mix & match any meals. Best price per meal on the site.</P>
          {/* Size selector */}
          <Row gap={6} wrap>
            {[{ qty: 5, label: "Starter", ppm: "$12.40" }, { qty: 10, label: "Standard", ppm: "$11.90", pop: true }, { qty: 15, label: "Pro", ppm: "$11.50" }, { qty: 20, label: "Elite", ppm: "$11.00" }].map((s) => (
              <div key={s.qty} style={{ flex: 1, border: `2px solid ${s.pop ? "#CDFF3A" : "rgba(255,255,255,0.15)"}`, padding: 8, textAlign: "center", background: s.pop ? "rgba(205,255,58,0.05)" : "transparent" }}>
                {s.pop && <Badge label="Most Popular" />}
                <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: "3px 0 1px" }}>{s.qty} meals</p>
                <p style={{ fontSize: 8, color: "#CDFF3A", fontFamily: "monospace" }}>{s.ppm}/meal</p>
                <p style={{ fontSize: 7, color: "#666" }}>{s.label}</p>
              </div>
            ))}
          </Row>
          <div style={{ marginTop: 12 }}>
            <Row gap={8}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Progress · 7 of 10 meals selected</p>
                <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: 10 }}>
                  <div style={{ height: "100%", width: "70%", background: "#CDFF3A", borderRadius: 2 }} />
                </div>
                <Row gap={5}>
                  {[
                    { name: "Herb Chicken", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop" },
                    { name: "Korean BBQ", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=80&h=80&fit=crop" },
                    { name: "Cajun Salmon", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=80&h=80&fit=crop" },
                  ].map((m) => (
                    <div key={m.name} style={{ flex: 1, background: "#1A1A1A", overflow: "hidden" }}>
                      <div style={{ height: 40, overflow: "hidden" }}>
                        <img src={m.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ padding: 4, display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 7, color: "#fff" }}>{m.name}</span>
                        <span style={{ fontSize: 10, color: "#CDFF3A", fontWeight: 700 }}>2×</span>
                      </div>
                    </div>
                  ))}
                </Row>
              </div>
              <div style={{ width: 120, background: "#111", border: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>
                <Label mono color="#999">Box Summary</Label>
                <p style={{ fontSize: 9, color: "#fff", marginBottom: 2 }}>10 meals · Standard</p>
                <p style={{ fontSize: 14, color: "#CDFF3A", fontFamily: "monospace", fontWeight: 700 }}>$119.00</p>
                <p style={{ fontSize: 7, color: "#888", marginBottom: 8 }}>$11.90/meal</p>
                <Btn bg="#CDFF3A" color="#111" full>Add to Cart →</Btn>
              </div>
            </Row>
          </div>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 07 — MEAL PLAN WIZARD
      ═══════════════════════════════════════ */}
      <ScreenFrame n={7} title="Meal Plan Wizard — Steps 1–5" sub="Goal → Meals → Menu → Delivery → Pay">
        <div style={{ background: "#F7F5F0", padding: "12px 20px" }}>
          {/* Step progress */}
          <div style={{ display: "flex", gap: 0, marginBottom: 16, alignItems: "center" }}>
            {["Meals", "Goal", "Menu", "Delivery", "Pay"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: i < 3 ? "#CDFF3A" : i === 3 ? "#111" : "#E5E2DA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: i < 3 ? "#111" : i === 3 ? "#fff" : "#aaa" }}>
                    {i < 3 ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: 7, color: i <= 3 ? "#111" : "#aaa", marginTop: 2, fontWeight: i === 3 ? 700 : 400 }}>{s}</span>
                </div>
                {i < 4 && <div style={{ height: 1, flex: 1, background: i < 3 ? "#CDFF3A" : "#E5E2DA", marginBottom: 12 }} />}
              </div>
            ))}
          </div>
          <Row gap={12}>
            {/* Step 1 & 2 */}
            <div style={{ flex: 1 }}>
              <div style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 10, marginBottom: 8 }}>
                <Label mono color="#999">Step 1 · Meals per day</Label>
                <Row gap={6}>
                  {["1 meal · Lunch only", "2 meals · Lunch & Dinner"].map((o, i) => (
                    <div key={o} style={{ flex: 1, border: `2px solid ${i === 1 ? "#111" : "#E5E2DA"}`, padding: 7, background: i === 1 ? "#111" : "#fff" }}>
                      <p style={{ fontSize: 8, fontWeight: 700, color: i === 1 ? "#CDFF3A" : "#111" }}>{o}</p>
                    </div>
                  ))}
                </Row>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 10 }}>
                <Label mono color="#999">Step 2 · Choose your goal</Label>
                {/* Billing toggle */}
                <div style={{ display: "flex", border: "2px solid #111", marginBottom: 8 }}>
                  <div style={{ flex: 1, padding: 5, textAlign: "center", background: "#fff" }}>
                    <p style={{ fontSize: 8, fontWeight: 700, color: "#111" }}>Weekly</p>
                  </div>
                  <div style={{ flex: 1, padding: 5, textAlign: "center", background: "#F2C94C" }}>
                    <p style={{ fontSize: 8, fontWeight: 900, color: "#111" }}>Monthly · SAVE 15%</p>
                  </div>
                </div>
                <Row gap={6}>
                  {[{ name: "CUT", color: "#CDFF3A", price: "$148/wk" }, { name: "MAINTAIN", color: "#F2C94C", price: "$178/wk" }, { name: "BUILD", color: "#7EE8B0", price: "$208/wk" }].map((p) => (
                    <div key={p.name} style={{ flex: 1, border: `2px solid ${p.name === "MAINTAIN" ? "#111" : "#E5E2DA"}`, padding: 7 }}>
                      <div style={{ height: 3, background: p.color, marginBottom: 4 }} />
                      <p style={{ fontSize: 9, fontWeight: 700 }}>{p.name}</p>
                      <p style={{ fontSize: 8, color: "#CDFF3A", fontFamily: "monospace" }}>{p.price}</p>
                    </div>
                  ))}
                </Row>
              </div>
            </div>
            {/* Step 3 */}
            <div style={{ flex: 1 }}>
              <div style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 10 }}>
                <Label mono color="#999">Step 3 · Select your meals</Label>
                <P size={8}>Pick 4 meals (can repeat). 6 of 8 selected.</P>
                <div style={{ height: 3, background: "#E5E2DA", borderRadius: 2, marginBottom: 8 }}>
                  <div style={{ height: "100%", width: "75%", background: "#F2C94C", borderRadius: 2 }} />
                </div>
                <div style={{ background: "#0E0E0E", padding: 8 }}>
                  <Row gap={4}>
                    {[
                      { name: "Herb Chicken", qty: 2, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop" },
                      { name: "Korean BBQ", qty: 1, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=80&h=80&fit=crop" },
                      { name: "Teriyaki Beef", qty: 1, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=80&h=80&fit=crop" },
                    ].map((m) => (
                      <div key={m.name} style={{ flex: 1, background: "#1A1A1A", overflow: "hidden", position: "relative" }}>
                        <div style={{ height: 35, overflow: "hidden" }}>
                          <img src={m.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <span style={{ position: "absolute", top: 2, right: 2, background: "#F2C94C", color: "#111", fontSize: 7, padding: "1px 3px", fontWeight: 700 }}>{m.qty}×</span>
                        <p style={{ fontSize: 6, color: "#fff", padding: "2px 4px" }}>{m.name}</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: 2, padding: "0 4px 4px" }}>
                          <span style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 8, width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>−</span>
                          <span style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 8, width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>+</span>
                        </div>
                      </div>
                    ))}
                  </Row>
                  <P size={7} color="rgba(255,255,255,0.3)">You can repeat meals · max 8</P>
                </div>
              </div>
            </div>
          </Row>
          {/* Steps 4 + 5 */}
          <Row gap={8} wrap>
            <div style={{ flex: 1, background: "#fff", border: "1px solid #E5E2DA", padding: 10, minWidth: 160 }}>
              <Label mono color="#999">Step 4 · Delivery</Label>
              <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} style={{ flex: 1, background: ["Mon", "Wed", "Fri"].includes(d) ? "#111" : "#F7F5F0", textAlign: "center", padding: "4px 2px", fontSize: 7, color: ["Mon", "Wed", "Fri"].includes(d) ? "#CDFF3A" : "#999", fontWeight: 600 }}>{d}</div>
                ))}
              </div>
              <Input placeholder="Full name" />
              <Input placeholder="Street address" />
              <Input placeholder="Postal code" />
            </div>
            <div style={{ flex: 1, background: "#fff", border: "1px solid #E5E2DA", padding: 10, minWidth: 160 }}>
              <Label mono color="#999">Step 5 · Auth gate</Label>
              <div style={{ background: "#111", padding: 8, marginBottom: 6 }}>
                <p style={{ fontSize: 9, color: "#fff", fontWeight: 700, marginBottom: 2 }}>Almost there!</p>
                <p style={{ fontSize: 7, color: "rgba(255,255,255,0.4)" }}>Sign in or create an account to track your plan.</p>
              </div>
              <Btn bg="#CDFF3A" color="#111" full>Create Account & Subscribe</Btn>
              <div style={{ height: 5 }} />
              <Btn bg="transparent" color="#111" full>Sign In to Existing Account</Btn>
              <div style={{ height: 5 }} />
              <div style={{ border: "1px solid #D0CCC4", textAlign: "center", padding: 5, fontSize: 8, color: "#888" }}>Continue as Guest</div>
              <div style={{ marginTop: 8 }}>
                <Label mono color="#999">Payment after auth</Label>
                <Input placeholder="Card number" />
                <Row gap={4}><Input placeholder="MM/YY" /><Input placeholder="CVV" /></Row>
                <Input placeholder="Promo code e.g. FRESHER10" />
                <CheckRow label="Auto-charge consent (required)" />
                <Btn bg="#F2C94C" color="#111" full>Subscribe — $178/wk</Btn>
              </div>
            </div>
          </Row>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 08 — CHECKOUT AUTH GATE
      ═══════════════════════════════════════ */}
      <ScreenFrame n={8} title="Checkout — Auth Gate" sub="New customer · Account creation · Guest option">
        <div style={{ background: "#fff", padding: 20, display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <H size={20}>Almost there.</H>
            <P>Sign in to save your order history and earn rewards points — or continue as a guest.</P>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ background: "#111", color: "#fff", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Create Account</span>
                <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)" }}>Earn points on this order →</span>
              </div>
              <div style={{ border: "2px solid #111", padding: "10px 14px", textAlign: "center", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Sign In to Existing Account</div>
              <div style={{ border: "1px solid #D0CCC4", padding: "8px 14px", textAlign: "center", fontSize: 10, color: "#888" }}>Continue as Guest</div>
            </div>
            <p style={{ fontSize: 8, color: "#aaa", textAlign: "center", marginTop: 6 }}>Guest orders earn no reward points and won't appear in order history.</p>

            {/* Sign up form */}
            <div style={{ marginTop: 12, borderTop: "1px solid #E5E2DA", paddingTop: 12 }}>
              <Label mono color="#999">Create Account form</Label>
              <Input placeholder="Full Name" />
              <Input placeholder="Email address" />
              <Input placeholder="Phone (WhatsApp)" />
              <Input placeholder="Password (min 8 chars)" />
              <div style={{ background: "rgba(205,255,58,0.2)", border: "1px solid rgba(205,255,58,0.5)", padding: 6, fontSize: 8, color: "#555", marginBottom: 6 }}>
                🎁 You'll earn points on this order and unlock referral rewards after signup.
              </div>
              <Btn bg="#111" color="#fff" full>Create Account & Continue →</Btn>
            </div>
          </div>
          {/* Guest warning */}
          <div style={{ width: 180 }}>
            <Label mono color="#999">Guest checkout warning banner</Label>
            <div style={{ background: "#FFF3CD", border: "1px solid #F2C94C", padding: 10 }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#7B5900", marginBottom: 4 }}>⚠️ Checking out as guest — you'll miss out on:</p>
              <ul style={{ fontSize: 7, color: "#7B5900", paddingLeft: 12 }}>
                <li>Fresher reward points (up to $12/mo)</li>
                <li>Exclusive member discounts</li>
                <li>Order history & easy reorders</li>
                <li>Referral bonuses — earn $10/friend</li>
              </ul>
              <p style={{ fontSize: 7, color: "#7B5900", fontWeight: 700, textDecoration: "underline", marginTop: 5 }}>Create a free account instead →</p>
            </div>
            <div style={{ marginTop: 8 }}>
              <Label mono color="#999">Signup success screen</Label>
              <div style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#CDFF3A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 12 }}>✓</span>
                </div>
                <p style={{ fontSize: 9, fontWeight: 700, marginBottom: 2 }}>Account created!</p>
                <p style={{ fontSize: 7, color: "#666", marginBottom: 5 }}>Welcome, Jerome. Confirmation sent via WhatsApp and email.</p>
                <div style={{ background: "rgba(7,94,84,0.1)", border: "1px solid rgba(7,94,84,0.2)", padding: 4, fontSize: 7, marginBottom: 3, display: "flex", justifyContent: "space-between" }}>
                  <span>💬 WhatsApp</span><span style={{ color: "#25D366", fontWeight: 700 }}>✓ Sent</span>
                </div>
                <div style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", padding: 4, fontSize: 7, display: "flex", justifyContent: "space-between" }}>
                  <span>✉️ Email</span><span style={{ color: "#111", background: "#CDFF3A", padding: "0 4px", fontWeight: 700, fontSize: 6 }}>✓ Sent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 09 — CHECKOUT DELIVERY + PAYMENT
      ═══════════════════════════════════════ */}
      <ScreenFrame n={9} title="Checkout — Delivery & Payment" sub="Address · Date · Card · Promo code · Place order">
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, padding: 16, background: "#F7F5F0" }}>
            <H size={16}>Delivery</H>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 10 }}>
              <Input placeholder="Full name" /><Input placeholder="Phone" />
              <div style={{ gridColumn: "span 2" }}><Input placeholder="Street address + unit" /></div>
              <Input placeholder="Postal code" /><Input placeholder="Delivery note (optional)" />
            </div>
            <Label mono color="#999">Delivery Date</Label>
            <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
              {["Mon 4", "Tue 5", "Wed 6", "Thu 7", "Fri 8", "Sat 9"].map((d, i) => (
                <div key={d} style={{ flex: 1, border: `1px solid ${i === 0 ? "#111" : "#D0CCC4"}`, background: i === 0 ? "#111" : "#fff", textAlign: "center", padding: "4px 2px" }}>
                  <p style={{ fontSize: 6, color: i === 0 ? "rgba(255,255,255,0.5)" : "#aaa" }}>{d.split(" ")[0]}</p>
                  <p style={{ fontSize: 10, fontWeight: 700, color: i === 0 ? "#fff" : "#111" }}>{d.split(" ")[1]}</p>
                </div>
              ))}
            </div>
            <H size={14}>Payment</H>
            <div style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 6, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 8 }}>
              <span style={{ color: "#888" }}>Apply wallet credit</span>
              <span style={{ fontFamily: "monospace", fontWeight: 700 }}>$12.50 available</span>
            </div>
            <Input placeholder="Card number" />
            <Row gap={5}><Input placeholder="MM / YY" /><Input placeholder="CVC" /></Row>
            <div style={{ display: "flex", gap: 5, marginBottom: 6 }}>
              <Input placeholder="Promo code e.g. FRESHER10" />
              <Btn bg="#111" color="#fff">Apply</Btn>
            </div>
            <div style={{ background: "#E8FFD0", border: "1px solid #CDFF3A", padding: 5, fontSize: 8, color: "#2d7a00", marginBottom: 6 }}>✓ Code FRESHER10 applied — 10% off (–$5.80)</div>
            <CheckRow label="Save card for faster checkout" />
            <CheckRow label="Authorise auto-charge for recurring orders" checked />
            <Btn bg="#111" color="#fff" full>Place Order — $52.20</Btn>
          </div>
          {/* Order summary */}
          <div style={{ width: 150, background: "#fff", borderLeft: "1px solid #E5E2DA", padding: 12 }}>
            <H size={11}>Order Summary</H>
            <Divider />
            {[["Herb Chicken ×2", "$24.80"], ["Korean BBQ ×1", "$13.20"]].map(([n, p]) => (
              <div key={n} style={{ display: "flex", justifyContent: "space-between", fontSize: 8, marginBottom: 4 }}>
                <span style={{ color: "#444" }}>{n}</span><span style={{ fontWeight: 700 }}>{p}</span>
              </div>
            ))}
            <Divider />
            {[["Subtotal", "$58.00"], ["Delivery", "Free"], ["Wallet credit", "–$12.50"], ["Promo (FRESHER10)", "–$5.80"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 7, marginBottom: 2, color: l === "Promo (FRESHER10)" || l === "Delivery" ? "#16a34a" : "#666" }}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>$39.70</span>
            </div>
          </div>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 10 — ORDER CONFIRMATION
      ═══════════════════════════════════════ */}
      <ScreenFrame n={10} title="Order Confirmation" sub="WhatsApp + Email · Live status · Points earned · Guest sign-up nudge">
        <div style={{ background: "#F7F5F0", padding: 16, display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, background: "#CDFF3A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                <span style={{ fontSize: 18, fontWeight: 900 }}>✓</span>
              </div>
              <Label mono color="#aaa">Order Confirmed</Label>
              <H size={18}>Your order is confirmed!</H>
              <P>Jerome, your meals are being prepared.</P>
              <p style={{ fontSize: 8, color: "#888" }}>Order <strong style={{ fontFamily: "monospace" }}>#FRE-20250904-7842</strong></p>
            </div>
            {/* Order details */}
            <div style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 10, marginBottom: 8 }}>
              <Label mono color="#999">Order Details</Label>
              {[["Delivery Address", "123 Toa Payoh Lor 4, #08-22"], ["Subtotal", "$58.00"], ["Promo (FRESHER10)", "–$5.80"], ["Payment", "Visa ending 4242 · $52.20"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 8, marginBottom: 3, color: l.startsWith("Promo") ? "#16a34a" : undefined }}>
                  <span style={{ color: l.startsWith("Promo") ? "#16a34a" : "#999" }}>{l}</span>
                  <span style={{ fontWeight: 600, color: l.startsWith("Promo") ? "#16a34a" : "#111" }}>{v}</span>
                </div>
              ))}
            </div>
            {/* Status timeline */}
            <div style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 10, marginBottom: 8 }}>
              <Label mono color="#999">Live Order Status</Label>
              <TimelineItem label="Order Confirmed" detail="Payment processed" done active={false} />
              <TimelineItem label="Kitchen Preparing" detail="Chefs preparing your meals" done={false} active />
              <TimelineItem label="Quality Check" detail="Macro verification" done={false} active={false} />
              <TimelineItem label="Out for Delivery" detail="Driver assigned" done={false} active={false} />
              <TimelineItem label="Delivered" detail="Meals at your door" done={false} active={false} />
            </div>
          </div>
          <div style={{ width: 180 }}>
            {/* WhatsApp */}
            <div style={{ background: "#075E54", padding: 8, marginBottom: 5, display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 24, height: 24, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontSize: 10 }}>💬</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 8, fontWeight: 700, color: "#fff" }}>Confirmation sent via WhatsApp</p>
                <p style={{ fontSize: 6, color: "rgba(255,255,255,0.6)" }}>+65 9123 4567</p>
              </div>
              <span style={{ fontSize: 7, background: "#25D366", color: "#fff", padding: "1px 4px", fontWeight: 700 }}>✓ Sent</span>
            </div>
            {/* Email */}
            <div style={{ background: "#0E0E0E", padding: 8, marginBottom: 5, display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>✉️</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 8, color: "#fff", fontWeight: 600 }}>Confirmation sent to email</p>
                <p style={{ fontSize: 6, color: "rgba(255,255,255,0.4)" }}>jerome@email.com</p>
              </div>
              <span style={{ fontSize: 7, color: "#CDFF3A", fontWeight: 700 }}>✓ Sent</span>
            </div>
            {/* Points earned */}
            <div style={{ background: "#111", padding: 8, marginBottom: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Label mono color="#CDFF3A">Points Earned</Label>
                <p style={{ fontSize: 18, fontWeight: 900, color: "#CDFF3A" }}>+58 pts</p>
                <p style={{ fontSize: 7, color: "rgba(255,255,255,0.35)" }}>Added to your balance</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 7, color: "rgba(255,255,255,0.35)" }}>New balance</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>1,234 pts</p>
              </div>
            </div>
            {/* Guest sign-up nudge */}
            <div style={{ background: "#111", padding: 8, marginBottom: 5 }}>
              <Label mono color="#F2C94C">Guest · Points missed</Label>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#fff", marginBottom: 2 }}>This order would've earned <span style={{ color: "#CDFF3A" }}>+58 pts</span></p>
              <Btn bg="#CDFF3A" color="#111" full>Sign Up — It's Free →</Btn>
            </div>
            {/* Sign-up modal (guest) */}
            <div style={{ background: "#fff", border: "2px solid #CDFF3A", padding: 8 }}>
              <Label mono color="#aaa">Sign-up modal (guest flow)</Label>
              <H size={10}>Join Fresher</H>
              <Input placeholder="Full Name" />
              <Input placeholder="Email address" />
              <Input placeholder="Phone (WhatsApp)" />
              <Input placeholder="Password" />
              <Btn bg="#111" color="#fff" full>Create My Account →</Btn>
            </div>
          </div>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 11 — ACCOUNT DASHBOARD
      ═══════════════════════════════════════ */}
      <ScreenFrame n={11} title="Account — Dashboard" sub="Stats · Active plan · Recent orders · Referral · Renewal reminder">
        <MiniNav />
        <div style={{ display: "flex" }}>
          <div style={{ width: 120, background: "#111", padding: 12, display: "flex", flexDirection: "column", gap: 2 }}>
            {["Dashboard", "Subscription", "Order History", "Wallet & Rewards", "Settings"].map((t, i) => (
              <div key={t} style={{ padding: "5px 8px", background: i === 0 ? "#CDFF3A" : "transparent", fontSize: 8, color: i === 0 ? "#111" : "rgba(255,255,255,0.4)", fontWeight: i === 0 ? 700 : 400 }}>{t}</div>
            ))}
          </div>
          <div style={{ flex: 1, background: "#F7F5F0", padding: 12 }}>
            {/* Renewal reminder */}
            <div style={{ background: "#FFF3CD", border: "1px solid #F2C94C", padding: 8, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 8, fontWeight: 700, color: "#7B5900" }}>Your plan renews in 3 days — Friday 7 Sep</p>
                <p style={{ fontSize: 7, color: "#7B5900" }}>$178.00 will be charged to Visa ending 4242</p>
              </div>
              <Btn bg="#F2C94C" color="#111">Review Plan</Btn>
            </div>
            {/* Stats */}
            <Row gap={6} wrap>
              {[{ l: "Active Plan", v: "MAINTAIN", color: "#F2C94C", bg: "#0D2818" }, { l: "Wallet Balance", v: "$12.50", color: "#CDFF3A", bg: "#111" }, { l: "Orders This Month", v: "3", color: "#A78BFA", bg: "#111" }, { l: "Reward Points", v: "1,234", color: "#7EE8B0", bg: "#111" }].map((s) => (
                <div key={s.l} style={{ flex: 1, background: s.bg, padding: 8, minWidth: 70 }}>
                  <p style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 2 }}>{s.l}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.v}</p>
                </div>
              ))}
            </Row>
            <div style={{ marginTop: 8 }}>
              <H size={11}>Recent Orders</H>
              {[["Herb Chicken ×2, Teriyaki ×1", "$36.70", "Delivered"], ["Meal Plan — Maintain (Week 12)", "$178.00", "Delivered"]].map(([items, total, status]) => (
                <div key={items} style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 8, marginBottom: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 8, fontWeight: 600 }}>{items}</p>
                    <p style={{ fontSize: 7, color: "#aaa" }}>1 Sep 2025</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 10, fontWeight: 700 }}>{total}</p>
                    <p style={{ fontSize: 7, color: "#16a34a" }}>{status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 12 — ACCOUNT SUBSCRIPTION + SWAP
      ═══════════════════════════════════════ */}
      <ScreenFrame n={12} title="Account — Subscription & Meal Swap" sub="Plan details · Edit · Pause · Thursday cutoff · Week tabs · Swap meals">
        <div style={{ display: "flex" }}>
          <div style={{ width: 120, background: "#111", padding: 12 }}>
            {["Dashboard", "Subscription", "Order History", "Wallet & Rewards", "Settings"].map((t, i) => (
              <div key={t} style={{ padding: "5px 8px", background: i === 1 ? "#CDFF3A" : "transparent", fontSize: 8, color: i === 1 ? "#111" : "rgba(255,255,255,0.4)", fontWeight: i === 1 ? 700 : 400, marginBottom: 2 }}>{t}</div>
            ))}
          </div>
          <div style={{ flex: 1, background: "#F7F5F0", padding: 12 }}>
            {/* Plan card */}
            <div style={{ background: "#0D2818", padding: 12, marginBottom: 8 }}>
              <Row gap={8}>
                <div style={{ flex: 1 }}>
                  <Label mono color="#7EE8B0">Active Subscription</Label>
                  <H size={14} color="#fff">MAINTAIN Plan · 4 meals/day</H>
                  <P color="rgba(255,255,255,0.4)">Mon, Wed, Fri, Sat · 6am–9am · Weekly</P>
                  <p style={{ fontSize: 13, color: "#F2C94C", fontFamily: "monospace", fontWeight: 700 }}>$178.00/week</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Btn bg="rgba(255,255,255,0.1)" color="#fff">Edit Plan</Btn>
                  <Btn bg="rgba(255,255,255,0.05)" color="rgba(255,255,255,0.6)">Pause</Btn>
                </div>
              </Row>
            </div>
            {/* Menu review */}
            <div style={{ background: "#fff", border: "1px solid #E5E2DA" }}>
              <div style={{ padding: "8px 12px", borderBottom: "1px solid #E5E2DA", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700 }}>Menu Review</p>
                  <p style={{ fontSize: 7, color: "#888" }}>Cutoff: <strong>Thursday 1pm</strong> each week.</p>
                </div>
                <div style={{ display: "flex", border: "1px solid #E5E2DA", overflow: "hidden" }}>
                  {["Browse Menu", "Review"].map((m, i) => (
                    <div key={m} style={{ padding: "4px 8px", background: i === 1 ? "#111" : "#fff", fontSize: 7, color: i === 1 ? "#fff" : "#888", fontWeight: 700 }}>{m}</div>
                  ))}
                </div>
              </div>
              {/* Cutoff warning */}
              <div style={{ background: "#FFFBEB", borderBottom: "1px solid #FDE68A", padding: "6px 12px", display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 10 }}>⚠️</span>
                <p style={{ fontSize: 7, color: "#92400E" }}>Cutoff for this week has passed (Thursday 1pm). Swap available for upcoming weeks.</p>
              </div>
              {/* Week tabs */}
              <div style={{ display: "flex", borderBottom: "1px solid #E5E2DA" }}>
                {[["This Week", "30 Jun–4 Jul"], ["Week 2", "7–11 Jul"], ["Week 3", "14–18 Jul"], ["Week 4", "21–25 Jul"]].map(([w, d], i) => (
                  <div key={w} style={{ flex: 1, padding: "6px 8px", borderBottom: `2px solid ${i === 1 ? "#F2C94C" : "transparent"}`, textAlign: "center" }}>
                    <p style={{ fontSize: 8, fontWeight: 700, color: i === 1 ? "#111" : "#999" }}>{w}</p>
                    <p style={{ fontSize: 6, color: "#aaa" }}>{d}</p>
                  </div>
                ))}
              </div>
              {/* Meal rows */}
              {[["BBQ Chicken Bowl", "500 kcal", "Lunch"], ["Tuna Pasta", "510 kcal", "Dinner"]].map(([name, cal, slot]) => (
                <div key={name} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #F0EDE8" }}>
                  <div style={{ width: 36, height: 36, background: "#F0EDE8", borderRadius: 4, flexShrink: 0, overflow: "hidden" }}>
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&h=60&fit=crop" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 9, fontWeight: 600 }}>{name}</p>
                    <p style={{ fontSize: 7, color: "#888" }}>{cal}</p>
                  </div>
                  <span style={{ fontSize: 7, padding: "2px 6px", background: slot === "Lunch" ? "#FFF3CD" : "#E8F4FD", color: slot === "Lunch" ? "#B8860B" : "#1565C0", fontWeight: 700, borderRadius: 10 }}>{slot}</span>
                  <Btn bg="#111" color="#fff">Swap</Btn>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 13 — ORDER HISTORY
      ═══════════════════════════════════════ */}
      <ScreenFrame n={13} title="Account — Order History" sub="All orders · Promo code savings summary · Reorder · Review">
        <div style={{ display: "flex" }}>
          <div style={{ width: 120, background: "#111", padding: 12 }}>
            {["Dashboard", "Subscription", "Order History", "Wallet & Rewards", "Settings"].map((t, i) => (
              <div key={t} style={{ padding: "5px 8px", background: i === 2 ? "#CDFF3A" : "transparent", fontSize: 8, color: i === 2 ? "#111" : "rgba(255,255,255,0.4)", fontWeight: i === 2 ? 700 : 400, marginBottom: 2 }}>{t}</div>
            ))}
          </div>
          <div style={{ flex: 1, background: "#F7F5F0", padding: 12 }}>
            <H size={16}>Order History</H>
            {/* Promo savings */}
            <div style={{ background: "#111", padding: 10, marginBottom: 8 }}>
              <Label mono color="#CDFF3A">Promo Codes Used</Label>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Total saved: <span style={{ color: "#CDFF3A" }}>$21.93</span></p>
              {[{ code: "FRESHER10", order: "FRE-20250901-7721", saved: "–$4.08" }, { code: "WELCOME15", order: "FRE-20250818-7641", saved: "–$17.85" }].map((p) => (
                <div key={p.code} style={{ background: "rgba(255,255,255,0.05)", padding: "5px 8px", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <Badge label={p.code} />
                  <p style={{ fontSize: 7, color: "rgba(255,255,255,0.5)", flex: 1 }}>{p.order}</p>
                  <p style={{ fontSize: 9, color: "#7EE8B0", fontWeight: 700 }}>{p.saved}</p>
                </div>
              ))}
            </div>
            {/* Order rows */}
            {[
              { items: "Herb Chicken ×2, Teriyaki ×1", id: "FRE-20250901-7721", date: "1 Sep 2025", total: "$36.70", saved: "saved $4.08", promo: "FRESHER10", type: "❄️" },
              { items: "Meal Plan — Maintain (Week 12)", id: "FRE-20250825-7698", date: "25 Aug 2025", total: "$178.00", saved: null, promo: null, type: "🥗" },
              { items: "Build-A-Box ×10", id: "FRE-20250818-7641", date: "18 Aug 2025", total: "$101.15", saved: "saved $17.85", promo: "WELCOME15", type: "📦" },
            ].map((o) => (
              <div key={o.id} style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 8, marginBottom: 5, display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 28, height: 28, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{o.type}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <p style={{ fontSize: 8, fontWeight: 600 }}>{o.items}</p>
                    {o.promo && <Badge label={o.promo} />}
                  </div>
                  <p style={{ fontSize: 7, color: "#aaa" }}>{o.id} · {o.date}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 10, fontWeight: 700 }}>{o.total}</p>
                  {o.saved && <p style={{ fontSize: 7, color: "#16a34a" }}>{o.saved}</p>}
                </div>
                <Row gap={4}>
                  <Btn>Reorder</Btn>
                  <Btn bg="#FFF3CD" color="#a07800">Review</Btn>
                </Row>
              </div>
            ))}
          </div>
        </div>
      </ScreenFrame>

      {/* ═══════════════════════════════════════
          SCREEN 14 — WALLET & REWARDS
      ═══════════════════════════════════════ */}
      <ScreenFrame n={14} title="Account — Wallet & Rewards" sub="Points balance · Redeem · History · Referral">
        <div style={{ display: "flex" }}>
          <div style={{ width: 120, background: "#111", padding: 12 }}>
            {["Dashboard", "Subscription", "Order History", "Wallet & Rewards", "Settings"].map((t, i) => (
              <div key={t} style={{ padding: "5px 8px", background: i === 3 ? "#CDFF3A" : "transparent", fontSize: 8, color: i === 3 ? "#111" : "rgba(255,255,255,0.4)", fontWeight: i === 3 ? 700 : 400, marginBottom: 2 }}>{t}</div>
            ))}
          </div>
          <div style={{ flex: 1, background: "#F7F5F0", padding: 12 }}>
            <H size={16}>Wallet & Rewards</H>
            <Row gap={6} wrap>
              {[{ l: "Wallet Balance", v: "$12.50", color: "#CDFF3A", bg: "#111" }, { l: "Reward Points", v: "1,234", color: "#F2C94C", bg: "#0D2818" }, { l: "Lifetime Earned", v: "4,891 pts", color: "#7EE8B0", bg: "#111" }].map((s) => (
                <div key={s.l} style={{ flex: 1, background: s.bg, padding: 10 }}>
                  <p style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 3 }}>{s.l}</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.v}</p>
                </div>
              ))}
            </Row>
            {/* Redeem */}
            <div style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 10, marginTop: 8, marginBottom: 8 }}>
              <H size={11}>Redeem Your Points</H>
              <P>You have <strong style={{ color: "#111" }}>1,234 points</strong> = <strong style={{ color: "#111" }}>$12.34 value</strong></P>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Btn>−</Btn>
                <div style={{ flex: 1, border: "1px solid #E5E2DA", textAlign: "center", padding: 6, fontSize: 14, fontWeight: 700 }}>500 pts = $5.00</div>
                <Btn>+</Btn>
              </div>
              <Btn bg="#111" color="#fff" full>Redeem 500 pts → $5.00 credit</Btn>
            </div>
            {/* History */}
            <div style={{ background: "#fff", border: "1px solid #E5E2DA", padding: 10, marginBottom: 8 }}>
              <H size={11}>Points History</H>
              {[{ date: "1 Sep 2025", desc: "Purchase — #FRE-20250901-7721", pts: "+36", type: "earn" }, { date: "25 Aug 2025", desc: "Meal Plan bonus (2× pts)", pts: "+356", type: "earn" }, { date: "20 Aug 2025", desc: "Redeemed 500 pts", pts: "–500", type: "redeem" }].map((h) => (
                <div key={h.desc} style={{ display: "flex", justifyContent: "space-between", fontSize: 8, padding: "4px 0", borderBottom: "1px solid #F0EDE8" }}>
                  <div><p style={{ fontWeight: 600 }}>{h.desc}</p><p style={{ color: "#aaa" }}>{h.date}</p></div>
                  <p style={{ fontWeight: 700, color: h.type === "earn" ? "#16a34a" : "#ef4444" }}>{h.pts}</p>
                </div>
              ))}
            </div>
            {/* Referral */}
            <div style={{ background: "#0D2818", padding: 10 }}>
              <Label mono color="#7EE8B0">Refer & Earn</Label>
              <H size={11} color="#fff">Give $10, Get $10</H>
              <P color="rgba(255,255,255,0.4)">Share your unique code. When a friend orders, you both get $10 wallet credit.</P>
              <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 10px", marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#CDFF3A", fontWeight: 700 }}>JEROME10</span>
                <Btn bg="#CDFF3A" color="#111">Copy Code</Btn>
              </div>
            </div>
          </div>
        </div>
      </ScreenFrame>

      </div>{/* end contentRef */}

      {/* Floating action bar */}
      <div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", gap: 10, zIndex: 999 }}>
        <button onClick={() => navigate("home")}
          style={{ background: "#F7F5F0", border: "1px solid #E5E2DA", color: "#111", padding: "10px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          ← Back to App
        </button>
        <button
          onClick={handleDownload}
          disabled={generating}
          style={{ background: generating ? "#555" : "#111", color: "#CDFF3A", padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: generating ? "not-allowed" : "pointer", letterSpacing: "0.1em", minWidth: 180, textAlign: "center" }}>
          {generating ? "⏳ Generating PDF…" : "⬇ Download PDF"}
        </button>
      </div>
    </div>
  );
}
