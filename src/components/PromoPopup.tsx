import { useState } from "react";
import type { Page } from "@/data";

interface Props {
  onClose: () => void;
  navigate: (page: Page) => void;
  navigateToWizard?: (plan?: string) => void;
}

type Tab = "promo" | "sub";

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function XIcon({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="shrink-0 text-white/60 hover:text-white transition-colors" aria-label="Close">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

export default function PromoPopup({ onClose, navigate, navigateToWizard }: Props) {
  const [tab, setTab] = useState<Tab>("promo");
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText("READY20").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/66" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          background: "#191919",
          border: "1px solid #f5b800",
          width: "min(760px, 96vw)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: "none" }}>
          <span className="font-bold text-[#f5b800] text-[11px] tracking-[0.08em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
            {tab === "promo" ? "THIS WEEK ONLY" : "READY-SERIES SUBSCRIPTION"}
          </span>
          <XIcon onClick={onClose} />
        </div>

        {/* Tabs */}
        <div className="flex" style={{ height: "54px" }}>
          <button
            onClick={() => setTab("promo")}
            className="flex flex-1 items-center justify-center font-bold text-[13px] tracking-[0.04em] transition-colors"
            style={{
              fontFamily: "Inter, sans-serif",
              background: tab === "promo" ? "#f5b800" : "#242424",
              color: tab === "promo" ? "#191919" : "#fff",
              borderBottom: tab === "promo" ? "3px solid #f5b800" : "none",
            }}
          >
            PROMOTIONAL OFFER
          </button>
          <button
            onClick={() => setTab("sub")}
            className="flex flex-1 items-center justify-center font-bold text-[13px] tracking-[0.04em] transition-colors"
            style={{
              fontFamily: "Inter, sans-serif",
              background: tab === "sub" ? "#f5b800" : "#242424",
              color: tab === "sub" ? "#191919" : "#fff",
              borderBottom: tab === "sub" ? "3px solid #f5b800" : "none",
            }}
          >
            SUBSCRIPTION DEAL
          </button>
        </div>

        {/* ── PROMOTIONAL OFFER content ── */}
        {tab === "promo" && (
          <div className="flex flex-col gap-6 p-[42px]">
            <p
              className="font-bold leading-none text-white"
              style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              20% OFF THE MEALS THAT KEEP UP.
            </p>
            <p className="leading-[1.55] text-[#d6d4ce] text-[16px]" style={{ fontFamily: "Inter, sans-serif" }}>
              Save on selected Ready Series meals. Stock the freezer once and move through Singapore's busiest days without missing dinner.
            </p>

            {/* Promo code box */}
            <div className="bg-white flex items-center justify-between px-5" style={{ height: "68px" }}>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[#6c6a66] text-[10px] tracking-[0.08em]" style={{ fontFamily: "Inter, sans-serif" }}>PROMO CODE</span>
                <span className="font-bold text-black text-[26px] leading-none" style={{ fontFamily: "Outfit, sans-serif" }}>READY20</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-2.5 font-bold text-[#191919] text-[14px] transition-opacity hover:opacity-80"
                style={{ fontFamily: "Inter, sans-serif", background: "#f5b800", height: "48px", padding: "0 20px" }}
              >
                {copied ? "Copied!" : "Copy code"}
                <ArrowRight />
              </button>
            </div>

            <p className="text-[#b9b7b0] text-[11px] leading-[1.55]" style={{ fontFamily: "Inter, sans-serif" }}>
              Valid until 11:59pm SGT, 18 October 2026. Selected meals only. One use per customer. Cannot be combined with subscription pricing or wallet vouchers.
            </p>

            {/* Shop CTA */}
            <button
              onClick={() => { navigate("ready-series"); onClose(); }}
              className="flex items-center justify-center gap-2.5 w-full font-bold text-[#191919] text-[14px] transition-opacity hover:opacity-85"
              style={{ fontFamily: "Inter, sans-serif", background: "#f5b800", height: "48px" }}
            >
              Shop selected meals
              <ArrowRight />
            </button>
          </div>
        )}

        {/* ── SUBSCRIPTION DEAL content ── */}
        {tab === "sub" && (
          <div className="flex flex-col gap-6 p-[38px]">
            {/* Heading */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-white leading-tight" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(24px, 3vw, 38px)" }}>
                SET THE FREEZER. SAVE EVERY CYCLE.
              </p>
              <p className="text-[#d6d4ce] text-[14px] leading-[1.5]" style={{ fontFamily: "Inter, sans-serif" }}>
                Choose a curated package now. Pause, skip or cancel from your account.
              </p>
            </div>

            {/* Packages */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Everyday 12 */}
              <div
                className="flex flex-col justify-between p-6"
                style={{ background: "#fff", border: "1px solid #d8d6d0", minHeight: "250px" }}
              >
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-black text-[26px] leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>Everyday 12</p>
                  <p className="text-[#6c6a66] text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>12 meals · every 4 weeks</p>
                  <p className="font-bold text-black text-[22px]" style={{ fontFamily: "Outfit, sans-serif" }}>$10.90 / meal</p>
                  <p className="font-bold text-[#187a4d] text-[12px]" style={{ fontFamily: "Inter, sans-serif" }}>Save $96 over 3 months</p>
                </div>
                <button
                  onClick={() => { navigateToWizard?.("everyday-12"); onClose(); }}
                  className="flex items-center justify-center gap-2.5 w-full font-bold text-[#191919] text-[14px] hover:opacity-85 transition-opacity"
                  style={{ fontFamily: "Inter, sans-serif", background: "#f5b800", height: "48px" }}
                >
                  Select Everyday 12 <ArrowRight />
                </button>
              </div>

              {/* Momentum 18 — most popular */}
              <div
                className="flex flex-col justify-between p-6"
                style={{ background: "#fff3cc", border: "2px solid #f5b800", minHeight: "250px" }}
              >
                <div className="flex flex-col gap-2">
                  <div className="inline-flex px-2.5 py-1.5" style={{ background: "#fff3cc" }}>
                    <span className="font-bold text-[#f5b800] text-[10px] tracking-[0.06em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Most popular</span>
                  </div>
                  <p className="font-bold text-black text-[26px] leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>Momentum 18</p>
                  <p className="text-[#6c6a66] text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>18 meals · every 4 weeks</p>
                  <p className="font-bold text-black text-[22px]" style={{ fontFamily: "Outfit, sans-serif" }}>$9.90 / meal</p>
                  <p className="font-bold text-[#187a4d] text-[12px]" style={{ fontFamily: "Inter, sans-serif" }}>Save $216 over 6 months</p>
                </div>
                <button
                  onClick={() => { navigateToWizard?.("momentum-18"); onClose(); }}
                  className="flex items-center justify-center gap-2.5 w-full font-bold text-[#191919] text-[14px] hover:opacity-85 transition-opacity"
                  style={{ fontFamily: "Inter, sans-serif", background: "#f5b800", height: "48px" }}
                >
                  Select Momentum 18 <ArrowRight />
                </button>
              </div>
            </div>

            <p className="text-[#b9b7b0] text-[11px] text-center" style={{ fontFamily: "Inter, sans-serif" }}>
              Account required · Free delivery · Monthly menu rotation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
