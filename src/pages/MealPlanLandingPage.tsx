import { useState } from "react";
import { Page } from "@/data";
import { MealPlanLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

const GOALS = [
  {
    id: "CUT",
    label: "CUT",
    headline: "Fat Loss",
    desc: "Structured calorie deficit with high protein retention. Designed for meaningful, sustainable fat loss.",
    macros: "1,600–1,900 kcal · 40%+ protein",
    weeks: "8–12 weeks recommended",
  },
  {
    id: "MAINTAIN",
    label: "MAINTAIN",
    headline: "Performance",
    desc: "Balanced macros to sustain energy, support training, and maintain your current body composition.",
    macros: "2,000–2,400 kcal · Balanced macros",
    weeks: "Ongoing lifestyle plan",
    featured: true,
  },
  {
    id: "BUILD",
    label: "BUILD",
    headline: "Muscle Gain",
    desc: "Calorie surplus with strategic protein timing to fuel muscle growth and recovery.",
    macros: "2,600–3,200 kcal · High protein surplus",
    weeks: "12–16 weeks recommended",
  },
];

const PLANS = [
  { n: "Starter", meals: 5, freq: "Weekly", price: 119, desc: "5 meals/week. Perfect for weekday lunches or dinners." },
  { n: "Standard", meals: 10, freq: "Weekly", price: 219, desc: "10 meals/week. Cover both lunch and dinner on weekdays.", badge: "POPULAR" },
  { n: "Full Week", meals: 14, freq: "Weekly", price: 289, desc: "14 meals/week. Every meal sorted, every single day.", badge: "BEST VALUE" },
];

const HOW_IT_WORKS = [
  { n: "01", label: "Set your goal", desc: "CUT, MAINTAIN, or BUILD. We build your plan from your target, not the other way around." },
  { n: "02", label: "Choose your meals", desc: "Select from 40+ fresh chef-prepared options. Swap any meal you don't love." },
  { n: "03", label: "We prep, you receive", desc: "Prepared daily in our Singapore kitchen. Delivered fresh the next morning by 10am." },
  { n: "04", label: "Track and adjust", desc: "Personal check-ins, macro reports, and a team that actually responds. This is boutique service." },
];

const testimonials = [
  { name: "Jonathan C.", role: "CUT plan, 12 weeks", text: "Down 9kg. My nutritionist was impressed. The personalised check-ins made the difference.", stars: 5 },
  { name: "Mei Lin T.", role: "MAINTAIN plan, 6 months", text: "Finally stopped guessing what to eat. The plan fits my training schedule perfectly.", stars: 5 },
  { name: "Ravi S.", role: "BUILD plan, 8 weeks", text: "Gained 4kg lean mass. The calorie surplus meals actually taste great — that was unexpected.", stars: 5 },
];

const ORANGE = "#E85D04";

export default function MealPlanLandingPage({ navigate, navigateToWizard }: Props) {
  const [selectedGoal, setSelectedGoal] = useState("MAINTAIN");

  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden border-b border-[#E8E4DC]">
        {/* Subtle diagonal texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: `repeating-linear-gradient(45deg,transparent,transparent 40px,${ORANGE} 40px,${ORANGE} 41px)` }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
          <button onClick={() => navigate("home")} className="inline-flex items-center gap-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors text-[11px] font-mono tracking-widest uppercase mb-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Performance Meals
          </button>

          <div className="mb-8">
            <MealPlanLogo size="md" variant="light" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: ORANGE }}>BOUTIQUE SUPPORT</p>
              <h1 className="font-display text-[46px] sm:text-[58px] font-semibold leading-[1.0] mb-6 text-[#1A1A1A]">
                Fresh structure.<br />Personal support.
              </h1>
              <p className="text-[#555] text-[16px] leading-relaxed max-w-[440px] mb-8">
                Exceptional meals and practical guidance, built around the way you live. Take the guesswork out of eating well every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => navigateToWizard(selectedGoal)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[13px] tracking-[0.15em] uppercase text-white transition-colors"
                  style={{ backgroundColor: ORANGE }}>
                  CHOOSE YOUR GOAL →
                </button>
                <button onClick={() => navigate("how-it-works")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-medium text-[13px] border border-[#D0CCC4] text-[#555] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors">
                  How it works
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "40+", l: "Meal options" },
                { v: "Boutique", l: "Personal support" },
                { v: "Fresh daily", l: "Delivered by 10am" },
                { v: "Goal-first", l: "Your target, your plan" },
              ].map((s) => (
                <div key={s.l} className="border border-[#E8E4DC] p-5">
                  <div className="font-display text-[26px] font-bold text-[#1A1A1A] mb-1" style={{ color: s.l === "Meal options" ? ORANGE : "#1A1A1A" }}>{s.v}</div>
                  <div className="text-[#888] text-[12px]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── GOAL SELECTOR ── */}
      <section className="py-16 px-6 sm:px-8 bg-[#FAF9F6]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: ORANGE }}>Your goals deserve consistent support.</p>
            <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-[#1A1A1A]">Choose your goal.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {GOALS.map((g) => {
              const selected = selectedGoal === g.id;
              return (
                <button key={g.id} onClick={() => setSelectedGoal(g.id)}
                  className={`text-left p-6 border-2 transition-all ${selected ? "border-[#1A1A1A] bg-white shadow-sm" : "border-[#E8E4DC] bg-white hover:border-[#1A1A1A]/30"}`}>
                  {g.featured && (
                    <div className="text-[9px] font-bold tracking-[0.2em] uppercase mb-3 px-2 py-1 inline-block" style={{ backgroundColor: ORANGE, color: "white" }}>
                      Most Common
                    </div>
                  )}
                  <div className="font-display text-[22px] font-bold text-[#1A1A1A] mb-1">{g.headline}</div>
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: selected ? ORANGE : "#999" }}>{g.label}</div>
                  <p className="text-[#666] text-[13px] leading-relaxed mb-4">{g.desc}</p>
                  <div className="text-[11px] text-[#888] font-mono">{g.macros}</div>
                  <div className="text-[11px] text-[#aaa] mt-1">{g.weeks}</div>
                  {selected && <div className="mt-4 text-[11px] font-bold tracking-wider" style={{ color: ORANGE }}>✓ Selected</div>}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button onClick={() => navigateToWizard(selectedGoal)}
              className="w-full sm:w-auto px-10 py-4 font-bold text-[13px] tracking-[0.15em] uppercase text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: ORANGE }}>
              Start My {GOALS.find((g) => g.id === selectedGoal)?.headline} Plan →
            </button>
            <p className="text-[12px] text-[#aaa]">No long-term commitment · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-6 sm:px-8 border-y border-[#E8E4DC]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: ORANGE }}>The process</p>
            <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-[#1A1A1A]">Exceptional meal prep, thoughtfully supported.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n}>
                <div className="font-display text-[13px] font-bold mb-3 tabular-nums" style={{ color: ORANGE }}>{s.n}</div>
                <div className="font-display text-[18px] font-semibold text-[#1A1A1A] mb-2">{s.label}</div>
                <p className="text-[#666] text-[13px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN COMPARISON ── */}
      <section className="py-16 px-6 sm:px-8 bg-[#FAF9F6]">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: ORANGE }}>Structured plans</p>
            <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-[#1A1A1A]">Choose your frequency.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PLANS.map((p) => (
              <div key={p.n} className={`border-2 bg-white p-7 relative ${p.badge === "POPULAR" ? "border-[#1A1A1A]" : "border-[#E8E4DC]"}`}>
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 text-white" style={{ backgroundColor: ORANGE }}>
                    {p.badge}
                  </div>
                )}
                <div className="font-display text-[20px] font-semibold text-[#1A1A1A] mb-1">{p.n}</div>
                <div className="text-[#888] text-[12px] mb-4">{p.meals} meals · {p.freq}</div>
                <div className="font-display text-[36px] font-bold text-[#1A1A1A] mb-1">${p.price}</div>
                <div className="text-[#aaa] text-[11px] mb-5">/week</div>
                <p className="text-[#666] text-[12px] leading-relaxed mb-6">{p.desc}</p>
                <button onClick={() => navigateToWizard(selectedGoal)}
                  className={`w-full py-3.5 font-bold text-[12px] tracking-[0.15em] uppercase transition-colors ${p.badge === "POPULAR" ? "text-white hover:opacity-90" : "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"}`}
                  style={p.badge === "POPULAR" ? { backgroundColor: ORANGE } : {}}>
                  Choose {p.n} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-6 sm:px-8 border-t border-[#E8E4DC]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: ORANGE }}>Real results</p>
            <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-[#1A1A1A]">Your goals deserve consistent support.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="border border-[#E8E4DC] bg-[#FAF9F6] p-6">
                <div className="flex mb-3">
                  {[...Array(t.stars)].map((_, i) => (
                    <span key={i} className="text-[14px]" style={{ color: ORANGE }}>★</span>
                  ))}
                </div>
                <p className="text-[#444] text-[14px] leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="font-semibold text-[13px] text-[#1A1A1A]">{t.name}</div>
                <div className="text-[11px] text-[#999]">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMISE ── */}
      <section className="py-14 px-6 sm:px-8 border-t border-[#E8E4DC] bg-[#1A1A1A] text-white">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <div className="flex-1">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: ORANGE }}>The Meal Plan promise</p>
            <h2 className="font-display text-[28px] sm:text-[36px] font-semibold leading-tight mb-3">We understand your routine is personal. Let us find the best next step.</h2>
            <p className="text-white/50 text-[14px] leading-relaxed">Personalised guidance. Goal-led meal selection. Real support from real people.</p>
          </div>
          <div className="shrink-0">
            <button onClick={() => navigateToWizard(selectedGoal)}
              className="px-10 py-4 font-bold text-[13px] tracking-[0.15em] uppercase text-[#1A1A1A] transition-colors hover:opacity-90"
              style={{ backgroundColor: "#F5B300" }}>
              Start Your Plan →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
