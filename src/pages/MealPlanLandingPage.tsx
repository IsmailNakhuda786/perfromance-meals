import { useState } from "react";
import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

const GOALS = [
  {
    id: "CUT",
    icon: "🔥",
    label: "CUT",
    headline: "Fat Loss",
    desc: "Structured calorie deficit with high protein retention. Designed for meaningful, sustainable fat loss.",
    macros: "1,600–1,900 kcal · 40%+ protein",
    meals: "Herb chicken, lean fish, cauliflower rice",
    weeks: "8–12 weeks recommended",
    accent: "#CDFF3A",
  },
  {
    id: "MAINTAIN",
    icon: "⚖️",
    label: "MAINTAIN",
    headline: "Performance",
    desc: "Balanced macros to sustain energy, support training, and maintain your current body composition.",
    macros: "2,000–2,400 kcal · Balanced macros",
    meals: "Mixed protein sources, complex carbs",
    weeks: "Ongoing lifestyle plan",
    accent: "#F2C94C",
    featured: true,
  },
  {
    id: "BUILD",
    icon: "💪",
    label: "BUILD",
    headline: "Muscle Gain",
    desc: "Calorie surplus with strategic protein timing to fuel muscle growth and recovery.",
    macros: "2,600–3,200 kcal · High protein surplus",
    meals: "Rice bowls, lean beef, complex carbs",
    weeks: "12–16 weeks recommended",
    accent: "#7EE8B0",
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
  { n: "03", label: "We prep, you receive", desc: "Prepared daily in our Singapore kitchen. Delivered fresh the next morning." },
  { n: "04", label: "Track and adjust", desc: "Check-ins, macro reports, and a team that actually responds. This is boutique service." },
];

const testimonials = [
  { name: "Jonathan C.", role: "CUT plan, 12 weeks", text: "Down 9kg. My nutritionist was impressed. The personalised check-ins made the difference.", stars: 5 },
  { name: "Mei Lin T.", role: "MAINTAIN plan, 6 months", text: "Finally stopped guessing what to eat. The plan fits my training schedule perfectly.", stars: 5 },
  { name: "Ravi S.", role: "BUILD plan, 8 weeks", text: "Gained 4kg lean mass. The calorie surplus meals actually taste great — that was unexpected.", stars: 5 },
];

export default function MealPlanLandingPage({ navigate, navigateToWizard }: Props) {
  const [selectedGoal, setSelectedGoal] = useState("MAINTAIN");

  return (
    <div className="bg-[#111111] text-white min-h-screen">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(242,201,76,0.5) 40px,rgba(242,201,76,0.5) 41px)" }}
        />
        <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-[#F2C94C]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
          <button onClick={() => navigate("home")} className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[11px] font-mono tracking-widest uppercase mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Fresher
          </button>

          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 bg-[#F2C94C] rounded-full" />
            <span className="text-[#F2C94C] text-[10px] font-mono tracking-[0.35em] uppercase">Meal Plan by Fresher</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="font-display text-[56px] sm:text-[72px] font-black leading-[0.88] mb-5">
                EXCEPTIONAL<br />MEAL PREP,<br /><span className="text-[#F2C94C]">THOUGHTFULLY</span><br />SUPPORTED.
              </h1>
              <p className="text-white/50 text-[16px] leading-relaxed max-w-[440px]">
                For busy, goal-oriented people who want more than a generic healthy-food subscription. Fresh meals, a real plan, and personal guidance.
              </p>
            </div>
            <div className="lg:text-right">
              <div className="inline-flex flex-col gap-3 text-left">
                {[
                  { icon: "🎯", text: "Goal-first starting point — not one-size-fits-all" },
                  { icon: "👨‍🍳", text: "Chef-prepared, delivered fresh every morning" },
                  { icon: "💬", text: "Personal support team with real check-ins" },
                  { icon: "📊", text: "Full macro and allergen transparency" },
                ].map((f) => (
                  <div key={f.text} className="flex items-start gap-3">
                    <span className="text-[18px] shrink-0 mt-0.5">{f.icon}</span>
                    <span className="text-white/60 text-[13px]">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigateToWizard(selectedGoal)}
              className="inline-flex items-center gap-3 bg-[#F2C94C] text-[#111] text-[11px] font-black tracking-[0.25em] uppercase px-10 py-4 hover:bg-white transition-colors"
            >
              Choose Your Goal
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <button
              onClick={() => navigate("how-it-works")}
              className="inline-flex items-center gap-3 border border-white/20 text-white text-[11px] font-bold tracking-[0.25em] uppercase px-10 py-4 hover:border-white/50 transition-colors"
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>

      {/* ── GOAL SELECTION ── */}
      <section className="py-20 px-6 sm:px-8 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#F2C94C] text-[10px] font-mono tracking-[0.3em] uppercase mb-3">Step 01</div>
            <h2 className="font-display text-[36px] sm:text-[48px] font-black">
              Choose your goal<span className="text-[#F2C94C]">.</span>
            </h2>
            <p className="text-white/40 text-[14px] mt-3 max-w-[480px] mx-auto">
              Your goal drives everything — the calories, the macros, the meal selection.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/8">
            {GOALS.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGoal(g.id)}
                className={`bg-[#0A0A0A] px-8 py-10 text-left flex flex-col gap-5 transition-all border-t-2 ${selectedGoal === g.id ? "border-[#F2C94C]" : "border-transparent hover:border-white/20"}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[32px] mb-3">{g.icon}</div>
                    <div className="text-[#F2C94C] text-[10px] font-mono tracking-[0.3em] uppercase mb-1">{g.label}</div>
                    <div className="font-display text-[26px] font-black text-white">{g.headline}</div>
                  </div>
                  {g.featured && (
                    <div className="bg-[#F2C94C] text-[#111] text-[8px] font-black tracking-widest px-2 py-1">MOST POPULAR</div>
                  )}
                </div>
                <div className="text-white/50 text-[13px] leading-relaxed">{g.desc}</div>
                <div className="flex flex-col gap-2 pt-4 border-t border-white/8">
                  <div className="flex items-start gap-2 text-[11px]">
                    <span className="text-white/25 shrink-0">Macros</span>
                    <span className="text-white/60">{g.macros}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px]">
                    <span className="text-white/25 shrink-0">Meals</span>
                    <span className="text-white/60">{g.meals}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px]">
                    <span className="text-white/25 shrink-0">Duration</span>
                    <span className="text-white/60">{g.weeks}</span>
                  </div>
                </div>
                {selectedGoal === g.id && (
                  <div className="mt-auto bg-[#F2C94C] text-[#111] text-[10px] font-black tracking-[0.2em] uppercase py-2.5 px-5 text-center">
                    ✓ Selected
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigateToWizard(selectedGoal)}
              className="inline-flex items-center gap-3 bg-[#F2C94C] text-[#111] text-[11px] font-black tracking-[0.25em] uppercase px-12 py-5 hover:bg-white transition-colors"
            >
              Start {selectedGoal} Plan →
            </button>
          </div>
        </div>
      </section>

      {/* ── PLAN COMPARISON ── */}
      <section className="py-20 px-6 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#F2C94C] text-[10px] font-mono tracking-[0.3em] uppercase mb-3">Step 02</div>
            <h2 className="font-display text-[36px] sm:text-[48px] font-black">
              Select your plan<span className="text-[#F2C94C]">.</span>
            </h2>
            <p className="text-white/40 text-[14px] mt-3">All plans are weekly, pause or cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/8">
            {PLANS.map((p) => (
              <div key={p.n} className={`flex flex-col px-8 py-10 gap-4 relative ${p.badge === "POPULAR" ? "bg-[#1A1A0A]" : "bg-[#111]"}`}>
                {p.badge && (
                  <div className="absolute top-4 right-4 bg-[#F2C94C] text-[#111] text-[8px] font-black tracking-widest px-2 py-1">{p.badge}</div>
                )}
                <div className="text-white/30 text-[11px] font-mono">{p.meals} meals/week · {p.freq}</div>
                <div className="font-display text-[24px] font-black text-white">{p.n}</div>
                <div className="text-white/50 text-[13px] leading-relaxed">{p.desc}</div>
                <div className="mt-auto pt-4 border-t border-white/8">
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="font-display text-[36px] font-black text-[#F2C94C]">${p.price}</span>
                    <span className="text-white/30 text-[12px]">/week</span>
                  </div>
                  <button
                    onClick={() => navigateToWizard(selectedGoal)}
                    className={`w-full py-3.5 text-[11px] font-black tracking-[0.2em] uppercase transition-colors ${p.badge === "POPULAR" ? "bg-[#F2C94C] text-[#111] hover:bg-white" : "bg-white/8 text-white hover:bg-[#F2C94C] hover:text-[#111]"}`}
                  >
                    Choose {p.n}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-[#0A0A0A] px-6 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#F2C94C] text-[10px] font-mono tracking-[0.3em] uppercase mb-3">Process</div>
            <h2 className="font-display text-[36px] sm:text-[48px] font-black">
              Your goals deserve<br />consistent support<span className="text-[#F2C94C]">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n} className="bg-[#0A0A0A] px-7 py-9">
                <div className="text-[#F2C94C] text-[11px] font-mono tracking-[0.3em] mb-4">{s.n}</div>
                <div className="font-display text-[20px] font-bold text-white mb-3">{s.label}</div>
                <div className="text-white/40 text-[13px] leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEAL SCHEDULE PREVIEW ── */}
      <section className="py-20 px-6 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#F2C94C] text-[10px] font-mono tracking-[0.3em] uppercase mb-4">Sample Week</div>
              <h2 className="font-display text-[36px] sm:text-[48px] font-black mb-5">
                What a<br />MAINTAIN week<br />looks like<span className="text-[#F2C94C]">.</span>
              </h2>
              <p className="text-white/50 text-[14px] leading-relaxed mb-8">
                Each day is planned around your targets. You choose the meals — we track the macros.
              </p>
              <button
                onClick={() => navigateToWizard("MAINTAIN")}
                className="inline-flex items-center gap-3 bg-[#F2C94C] text-[#111] text-[11px] font-black tracking-[0.25em] uppercase px-8 py-4 hover:bg-white transition-colors"
              >
                Build My Plan →
              </button>
            </div>
            <div className="bg-[#0A0A0A] border border-white/8">
              <div className="px-6 py-4 border-b border-white/8">
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#F2C94C]">Week 1 — MAINTAIN</div>
                <div className="text-white/30 text-[11px] mt-1">~2,200 kcal · 160g protein daily</div>
              </div>
              {[
                { day: "Monday", meal: "Teriyaki Chicken & Brown Rice", cal: 478, pro: 42 },
                { day: "Tuesday", meal: "Herb Salmon & Quinoa Bowl", cal: 468, pro: 44 },
                { day: "Wednesday", meal: "Korean Beef Bibimbap", cal: 490, pro: 38 },
                { day: "Thursday", meal: "Greek Chicken & Roasted Veg", cal: 390, pro: 36 },
                { day: "Friday", meal: "Miso Glazed Salmon & Rice", cal: 414, pro: 46 },
              ].map((d, i) => (
                <div key={d.day} className={`px-6 py-4 flex items-center justify-between gap-4 ${i < 4 ? "border-b border-white/5" : ""}`}>
                  <div className="min-w-[80px] text-white/25 text-[11px] font-mono">{d.day}</div>
                  <div className="flex-1 text-white/70 text-[12px]">{d.meal}</div>
                  <div className="text-right shrink-0">
                    <div className="text-[#F2C94C] text-[11px] font-mono">{d.pro}g</div>
                    <div className="text-white/25 text-[10px]">{d.cal} cal</div>
                  </div>
                </div>
              ))}
              <div className="px-6 py-4 bg-[#F2C94C]/5 border-t border-[#F2C94C]/15">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/40 font-mono">Weekly avg</span>
                  <span className="text-[#F2C94C] font-bold">2,248 kcal · 41g protein avg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-20 bg-[#0A0A0A] px-6 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#F2C94C] text-[10px] font-mono tracking-[0.3em] uppercase mb-3">Real Results</div>
            <h2 className="font-display text-[36px] sm:text-[48px] font-black">
              Goal achieved<span className="text-[#F2C94C]">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#0A0A0A] px-7 py-8 flex flex-col gap-4">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => <span key={s} className="text-[#F2C94C] text-[12px]">★</span>)}
                </div>
                <p className="text-white/70 text-[14px] leading-relaxed flex-1">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-[13px] text-white">{t.name}</div>
                  <div className="text-[#F2C94C]/60 text-[11px]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-6 sm:px-8 border-t border-white/8">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="text-[#F2C94C] text-[10px] font-mono tracking-[0.3em] uppercase mb-5">Get Started</div>
          <h2 className="font-display text-[44px] sm:text-[56px] font-black leading-[0.92] mb-5">
            Your routine is<br />personal. Your plan<br />should be<span className="text-[#F2C94C]">.</span>
          </h2>
          <p className="text-white/40 text-[15px] mb-10">
            We understand your routine is personal. Let us find the best next step together.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[560px] mx-auto">
            {GOALS.map((g) => (
              <button
                key={g.id}
                onClick={() => navigateToWizard(g.id)}
                className="flex flex-col items-center gap-3 py-8 px-4 border border-white/10 hover:border-[#F2C94C]/50 hover:bg-[#F2C94C]/5 transition-colors"
              >
                <span className="text-[28px]">{g.icon}</span>
                <div>
                  <div className="text-[#F2C94C] text-[10px] font-mono tracking-widest uppercase">{g.label}</div>
                  <div className="text-white text-[14px] font-bold mt-0.5">{g.headline}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
