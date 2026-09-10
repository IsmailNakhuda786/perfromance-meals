import { useState } from "react";
import { Page } from "@/data";
import { PerformanceMealsLogo, ReadySeriesLogo, MealPlanLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
  addToCart?: (item: any) => void;
  navigateToReferral?: () => void;
}

const testimonials = [
  { name: "Darren T.", role: "Software Engineer", text: "Lost 8kg in 10 weeks without thinking about food once. The meals actually taste like real food.", stars: 5 },
  { name: "Priya M.", role: "Marketing Lead", text: "I was sceptical about frozen meals — Ready Series changed that. Macros are spot-on every time.", stars: 5 },
  { name: "Jason K.", role: "Personal Trainer", text: "I recommend these to all my clients. The Meal Plan gives them structure without obsession.", stars: 5 },
  { name: "Alicia W.", role: "Nurse", text: "Shift work makes eating well nearly impossible. Ready Series keeps me on track on 12-hour days.", stars: 5 },
  { name: "Marcus L.", role: "Entrepreneur", text: "The goal-based plans are legitimately different. My coach was impressed by how structured the approach is.", stars: 5 },
  { name: "Siti R.", role: "Accountant", text: "Been ordering for 6 months. Consistent quality, responsive support. Nothing like it in Singapore.", stars: 5 },
];

const trustPillars = [
  { icon: "🏆", label: "Trusted by athletes", sub: "8,400+ active customers across Singapore" },
  { icon: "🎯", label: "Macro accurate", sub: "Every meal tracked to the gram — no guessing" },
  { icon: "👨‍🍳", label: "Chef prepared", sub: "In-house kitchen, no outsourced production" },
  { icon: "⚡", label: "Fast delivery", sub: "Next-day island-wide delivery on all orders" },
  { icon: "⭐", label: "4.9/5 satisfaction", sub: "Verified across 3,200+ customer reviews" },
];

const steps = [
  { n: "01", label: "Choose your path", desc: "Meal Plan for structured goal-support. Ready Series for fast, flexible everyday meals." },
  { n: "02", label: "Select meals or plan", desc: "Pick from 40+ macro-tracked meals or let our wizard build your weekly plan." },
  { n: "03", label: "Receive delivery", desc: "Next-day delivery island-wide. Fresh or frozen — both arrive perfectly packaged." },
  { n: "04", label: "Perform better", desc: "Track progress, earn rewards, and reorder in one tap. Results you can see." },
];

export default function HomePage({ navigate }: Props) {
  const [hovered, setHovered] = useState<"ready" | "plan" | null>(null);

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A]">

      {/* ── SECTION 1: HERO ── */}
      {/* Top brand bar */}
      <div className="bg-white border-b border-[#E8E4DC] py-10 px-6 sm:px-10 flex flex-col items-center gap-3">
        <PerformanceMealsLogo size="lg" variant="dark" />
        <p className="text-[#888] text-[14px] text-center max-w-[420px] leading-relaxed mt-2">
          Nutrition that works as hard as you do. One standard. Two clear ways to eat well.
        </p>
      </div>

      {/* Split hero panels — hover expands the active panel */}
      <section
        className="flex flex-col lg:flex-row min-h-[82svh]"
        onMouseLeave={() => setHovered(null)}
      >

        {/* LEFT — Ready Series: DARK charcoal per PDF brand guide */}
        <div
          className="relative flex flex-col justify-between px-8 sm:px-12 lg:px-14 py-14 lg:py-16 overflow-hidden cursor-pointer"
          style={{
            backgroundColor: "#1A1A1A",
            flex: hovered === "plan" ? "0 0 38%" : hovered === "ready" ? "0 0 62%" : "1 1 50%",
            transition: "flex 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
          onClick={() => navigate("ready-series")}
          onMouseEnter={() => setHovered("ready")}
        >
          {/* Subtle dot texture */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(circle, #F5B300 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
          {/* Yellow top stripe */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: "#F5B300" }} />

          <div className="relative z-10">
            <div className="mb-8">
              <ReadySeriesLogo size="md" variant="dark" />
            </div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B300] mb-3">Everyday momentum</p>
            <h2 className="font-display text-[42px] sm:text-[54px] lg:text-[52px] xl:text-[64px] font-extrabold leading-[0.9] text-white mb-5">
              READY<br />FOR<br />REAL LIFE.
            </h2>
            <p
              className="text-white/60 text-[15px] leading-relaxed max-w-[300px] transition-opacity duration-300"
              style={{ opacity: hovered === "plan" ? 0 : 1 }}
            >
              Fast, enjoyable frozen meals that are ready when life gets busy — so keeping on track stays easy.
            </p>
          </div>

          <div className="relative z-10 mt-10 lg:mt-0">
            <div className="flex flex-wrap gap-2 mb-5">
              {["40+ meals", "From $8.90", "3-min prep", "Next-day delivery"].map((t) => (
                <span key={t} className="text-[10px] font-semibold tracking-wide border border-white/20 px-3 py-1.5 text-white/50">{t}</span>
              ))}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); navigate("ready-series"); }}
              className="inline-flex items-center gap-3 text-[#1A1A1A] text-[11px] font-extrabold tracking-[0.2em] uppercase px-8 py-4 transition-colors"
              style={{ backgroundColor: "#F5B300" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F5B300"; }}
            >
              STOCK UP NOW
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* RIGHT — Meal Plan: WHITE per PDF brand guide */}
        <div
          className="relative flex flex-col justify-between px-8 sm:px-12 lg:px-14 py-14 lg:py-16 overflow-hidden cursor-pointer border-t lg:border-t-0 lg:border-l border-[#E8E4DC]"
          style={{
            backgroundColor: "#FFFFFF",
            flex: hovered === "ready" ? "0 0 38%" : hovered === "plan" ? "0 0 62%" : "1 1 50%",
            transition: "flex 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
          onClick={() => navigate("meal-plan-landing")}
          onMouseEnter={() => setHovered("plan")}
        >
          {/* Orange top stripe */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: "#E85D04" }} />

          <div className="relative z-10">
            <div className="mb-8">
              <MealPlanLogo size="md" variant="light" />
            </div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "#E85D04" }}>Boutique support</p>
            <h2 className="font-display text-[42px] sm:text-[54px] lg:text-[52px] xl:text-[58px] font-semibold leading-[0.97] text-[#1A1A1A] mb-5">
              Fresh structure.<br />Personal<br />support.
            </h2>
            <p
              className="text-[#666] text-[15px] leading-relaxed max-w-[300px] transition-opacity duration-300"
              style={{ opacity: hovered === "ready" ? 0 : 1 }}
            >
              Exceptional meals, tailored support, and practical guidance for meaningful progress — built around the way you live.
            </p>
          </div>

          <div className="relative z-10 mt-10 lg:mt-0">
            <div className="flex flex-wrap gap-2 mb-5">
              {["Goal-first", "CUT / MAINTAIN / BUILD", "Fresh daily", "Boutique support"].map((t) => (
                <span key={t} className="text-[10px] font-semibold tracking-wide bg-[#FAF9F6] border border-[#E8E4DC] px-3 py-1.5 text-[#555]">{t}</span>
              ))}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); navigate("meal-plan-landing"); }}
              className="inline-flex items-center gap-3 text-white text-[11px] font-extrabold tracking-[0.2em] uppercase px-8 py-4 transition-colors"
              style={{ backgroundColor: "#E85D04" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1A1A1A"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E85D04"; }}
            >
              CHOOSE YOUR GOAL
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TRUST PILLARS ── */}
      <section className="py-20 px-6 sm:px-8 border-t border-[#E8E4DC] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B300] mb-3">The Performance Meals Standard</p>
            <h2 className="font-display text-[36px] sm:text-[48px] font-bold text-[#1A1A1A] leading-tight">
              Why 8,400 people choose us.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {trustPillars.map((p) => (
              <div key={p.label} className="bg-[#FAF9F6] border border-[#E8E4DC] px-6 py-7 flex flex-col gap-3">
                <div className="text-[28px]">{p.icon}</div>
                <div>
                  <div className="font-semibold text-[15px] text-[#1A1A1A] mb-1">{p.label}</div>
                  <div className="text-[#888] text-[12px] leading-relaxed">{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: HOW IT WORKS ── */}
      <section className="py-20 px-6 sm:px-8 border-t border-[#E8E4DC]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B300] mb-3">Process</p>
            <h2 className="font-display text-[36px] sm:text-[48px] font-bold text-[#1A1A1A] leading-tight">
              How it works.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="text-[13px] font-bold mb-4 tabular-nums" style={{ color: "#F5B300" }}>{s.n}</div>
                <div className="font-display text-[20px] font-semibold text-[#1A1A1A] mb-2">{s.label}</div>
                <div className="text-[#888] text-[13px] leading-relaxed">{s.desc}</div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-3 -right-4 text-[#E8E4DC]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Dual CTA row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <button onClick={() => navigate("ready-series")}
              className="flex items-center justify-between px-7 py-5 border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all group">
              <div>
                <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#888] group-hover:text-white/50 mb-0.5">Everyday momentum</div>
                <div className="text-[16px] font-bold text-[#1A1A1A] group-hover:text-white">Explore Ready Series →</div>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#F5B300" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </button>
            <button onClick={() => navigate("meal-plan-landing")}
              className="flex items-center justify-between px-7 py-5 border-2 hover:text-white transition-all group"
              style={{ borderColor: "#E85D04" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E85D04"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = ""; }}>
              <div>
                <div className="text-[10px] font-mono tracking-[0.25em] uppercase mb-0.5" style={{ color: "#E85D04" }}>Boutique support</div>
                <div className="text-[16px] font-bold text-[#1A1A1A] group-hover:text-white">Explore Meal Plans →</div>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#E85D04" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SOCIAL PROOF ── */}
      <section className="py-20 px-6 sm:px-8 border-t border-[#E8E4DC]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B300] mb-3">Real Results</p>
            <h2 className="font-display text-[36px] sm:text-[48px] font-bold text-[#1A1A1A] leading-tight mb-4">
              What our customers are saying.
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map((s) => <span key={s} className="text-[#F5B300] text-[16px]">★</span>)}
              </div>
              <span className="text-[#888] text-[13px]">4.9/5 from 3,200+ verified reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-[#E8E4DC] px-6 py-7 flex flex-col gap-3">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => <span key={s} className="text-[#F5B300] text-[12px]">★</span>)}
                </div>
                <p className="text-[#444] text-[14px] leading-relaxed flex-1 italic">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-[13px] text-[#1A1A1A]">{t.name}</div>
                  <div className="text-[#aaa] text-[11px]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { n: "8,400+", l: "Active customers" },
              { n: "60-Day", l: "Satisfaction guarantee" },
              { n: "4.9/5", l: "Average rating" },
            ].map((s) => (
              <div key={s.l} className="bg-white border border-[#E8E4DC] px-6 py-7 text-center">
                <div className="font-display text-[32px] sm:text-[40px] font-bold text-[#1A1A1A]">{s.n}</div>
                <div className="text-[#888] text-[12px] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: REWARDS ── */}
      <section className="py-20 px-6 sm:px-8 border-t border-[#E8E4DC]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5B300] mb-4">Performance Meals Rewards</p>
              <h2 className="font-display text-[36px] sm:text-[48px] font-bold text-[#1A1A1A] leading-tight mb-5">
                Eat well.<br />Earn points.<br />Get rewarded.
              </h2>
              <p className="text-[#888] text-[15px] leading-relaxed mb-8">
                Every order earns PM Points. Redeem them as wallet credits, unlock VIP tiers, and refer friends for bonus rewards.
              </p>
              <button onClick={() => navigate("account")}
                className="inline-flex items-center gap-3 text-[#1A1A1A] text-[12px] font-bold tracking-[0.2em] uppercase px-8 py-4 border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors">
                View My Rewards →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🪙", n: "1pt", l: "per $1 spent", sub: "On every order, every time" },
                { icon: "🎁", n: "$5", l: "signup bonus", sub: "Credited on first order" },
                { icon: "👥", n: "$10", l: "per referral", sub: "Paid when friend orders" },
                { icon: "👑", n: "VIP", l: "tier upgrades", sub: "Unlock at 500, 1000, 2500 pts" },
              ].map((r) => (
                <div key={r.l} className="border border-[#E8E4DC] bg-[#FAF9F6] px-5 py-6">
                  <div className="text-[24px] mb-3">{r.icon}</div>
                  <div className="font-display text-[22px] font-bold text-[#1A1A1A]">{r.n}</div>
                  <div className="text-[#1A1A1A] text-[12px] font-semibold">{r.l}</div>
                  <div className="text-[#aaa] text-[11px] mt-1">{r.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FINAL CTA ── */}
      <section className="py-20 px-6 sm:px-8 border-t border-[#E8E4DC] bg-[#1A1A1A]">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="mb-4">
            <PerformanceMealsLogo size="md" variant="light" className="inline-flex" />
          </div>
          <h2 className="font-display text-[40px] sm:text-[56px] font-bold leading-tight text-white mb-4">
            One standard.<br />Two clear ways to eat well.
          </h2>
          <p className="text-white/50 text-[15px] mb-12 max-w-[440px] mx-auto leading-relaxed">
            Both paths lead to better nutrition. Pick the one that fits how you live.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[560px] mx-auto mb-10">
            <button onClick={() => navigate("ready-series")}
              className="flex flex-col items-center gap-3 px-6 py-8 text-[#1A1A1A] transition-colors"
              style={{ backgroundColor: "#F5B300" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F5B300"; }}>
              <span className="text-[36px]">⚡</span>
              <div>
                <div className="font-extrabold text-[18px]">Ready Series</div>
                <div className="text-[12px] mt-1 opacity-70">Frozen at peak. Ready on demand.</div>
              </div>
            </button>
            <button onClick={() => navigate("meal-plan-landing")}
              className="flex flex-col items-center gap-3 px-6 py-8 text-white transition-colors border border-[#E85D04]"
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E85D04"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = ""; }}>
              <span className="text-[36px]">🎯</span>
              <div>
                <div className="font-bold text-[18px]">Meal Plans</div>
                <div className="text-[12px] mt-1 text-white/50">Planned for your goal. Delivered fresh.</div>
              </div>
            </button>
          </div>
          <div className="text-white/25 text-[10px] font-mono tracking-[0.2em]">
            FREE DELIVERY ABOVE $80 · 60-DAY GUARANTEE · ISLAND-WIDE SINGAPORE
          </div>
        </div>
      </section>
    </div>
  );
}
