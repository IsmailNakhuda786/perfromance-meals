import { useState } from "react";
import { CartItem, Page, PLANS } from "@/data";

interface HomePageProps {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
  addToCart: (item: CartItem) => void;
  navigateToReferral: () => void;
}

const TESTIMONIALS = [
  { name: "Marcus T.", role: "Competitive Swimmer", text: "Been on Fresher for 6 months. My body composition has changed more in this period than the previous 2 years of training. The macros are genuinely accurate — every batch.", rating: 5, plan: "Meal Plan — Build" },
  { name: "Sarah L.", role: "Working Mum of Two", text: "Ready-to-Go meals have saved my week, every week. I grab 10 on Monday and I'm sorted. The low carb options taste far better than anything I would cook myself.", rating: 5, plan: "Ready Series" },
  { name: "Ryan K.", role: "CrossFit Athlete", text: "I run strict meal timing protocols and Fresher's USDA-standard macro labelling is the only brand I trust blindly. Consistency across every single batch.", rating: 5, plan: "Meal Plan — Maintain" },
];

const STATS = [
  { val: "12,400+", label: "Active Members" },
  { val: "4.8★", label: "Average Rating" },
  { val: "98%", label: "On-Time Delivery" },
  { val: "2.3M+", label: "Meals Delivered" },
];

export default function HomePage({ navigate, navigateToWizard, navigateToReferral }: HomePageProps) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-[#F7F5F0]">
      {/* ── HERO — SPLIT PANEL ── */}
      <section className="h-[calc(100vh-84px)] grid grid-cols-1 md:grid-cols-2 relative">
        {/* Ready-to-Go panel */}
        <div className="relative overflow-hidden cursor-pointer group" onClick={() => navigate("ready-to-go")}>
          <img
            src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=1000&h=1100&fit=crop&auto=format"
            alt="Ready-to-Go meals"
            className="absolute inset-0 w-full h-full object-cover scale-[1.06] group-hover:scale-100 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/65 to-[#111111]/10 group-hover:via-[#111111]/50 transition-all duration-500" />
          {/* Animated lime accent bar at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF3A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="relative h-full flex flex-col justify-between p-10 lg:p-14 text-white">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#CDFF3A] uppercase">01 / READY SERIES</span>
              <div className="h-px flex-1 bg-[#CDFF3A]/20 group-hover:bg-[#CDFF3A]/50 transition-colors duration-300 max-w-[60px]" />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-5">Fresher Performance Meals</p>
              <h1 className="font-display text-[52px] lg:text-[72px] font-bold leading-[0.88] mb-7">
                Heat.<br />
                <span className="text-[#CDFF3A] group-hover:drop-shadow-[0_0_24px_rgba(205,255,58,0.5)] transition-all duration-500">Eat.</span>
                <br />Perform.
              </h1>
              <p className="text-white/60 text-[15px] max-w-[300px] mb-9 leading-relaxed">
                Macro-accurate frozen meals, ready in 3 minutes. No prep. No guesswork. Pure performance fuel.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("ready-to-go"); }}
                  className="inline-flex items-center gap-2.5 bg-[#CDFF3A] text-[#111111] px-7 py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors"
                >
                  Shop Meals →
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("build-a-box"); }}
                  className="text-white/60 text-[12px] border border-white/20 px-5 py-3.5 hover:border-[#CDFF3A] hover:text-[#CDFF3A] transition-colors"
                >
                  Build-A-Box
                </button>
              </div>
              {/* Social proof chips */}
              <div className="flex flex-wrap gap-2 mt-8">
                {["✓ Same-day delivery", "✓ 2-month freezer life", "✓ USDA standards"].map((s) => (
                  <span key={s} className="text-[10px] text-white/35 border border-white/10 px-3 py-1.5 tracking-wider">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 6in60 CENTER STAMP ── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center">
          {/* Vertical divider line top */}
          <div className="w-px h-12 bg-white/20" />
          {/* Stamp */}
          <div className="relative" style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.5))" }}>
            <svg viewBox="0 0 96 96" className="w-[96px] h-[96px]" style={{ animation: "spin6in60 18s linear infinite" }}>
              <defs>
                <path id="outerRing" d="M 48,48 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <circle cx="48" cy="48" r="43" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="48" cy="48" r="38" fill="#CDFF3A" />
              <circle cx="48" cy="48" r="33" fill="none" stroke="#111" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3" />
              <text fontSize="8.5" fontFamily="monospace" fontWeight="800" fill="#111" letterSpacing="2.5">
                <textPath href="#outerRing" startOffset="50%" textAnchor="middle">LOSE 6KG · IN 60 DAYS · GUARANTEED ·</textPath>
              </text>
            </svg>
            {/* Static center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[28px] font-black text-[#111] leading-none">6in60</span>
              <span className="font-mono text-[8px] font-bold text-[#111]/50 tracking-[0.15em] uppercase mt-0.5">Promise</span>
            </div>
          </div>
          {/* Vertical divider line bottom */}
          <div className="w-px h-12 bg-white/20" />
          <style>{`@keyframes spin6in60 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>

        {/* Meal Plans panel */}
        <div className="relative overflow-hidden cursor-pointer group" onClick={() => navigateToWizard()}>
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&h=1100&fit=crop&auto=format"
            alt="Meal Plans fresh bowl"
            className="absolute inset-0 w-full h-full object-cover scale-[1.06] group-hover:scale-100 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2818] via-[#0D2818]/72 to-[#0D2818]/20 group-hover:via-[#0D2818]/55 transition-all duration-500" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F2C94C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="relative h-full flex flex-col justify-between p-10 lg:p-14 text-white">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#F2C94C] uppercase">02 / MEAL PLANS</span>
              <div className="h-px flex-1 bg-[#F2C94C]/20 group-hover:bg-[#F2C94C]/50 transition-colors duration-300 max-w-[60px]" />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-5">Fresher Performance Meals</p>
              <h1 className="font-display text-[52px] lg:text-[72px] font-bold leading-[0.88] mb-7">
                Your goal.<br />
                <span className="text-[#F2C94C] group-hover:drop-shadow-[0_0_24px_rgba(242,201,76,0.5)] transition-all duration-500">Your</span>
                <br />macros.
              </h1>
              <p className="text-white/60 text-[15px] max-w-[300px] mb-9 leading-relaxed">
                Chef-prepared fresh meals delivered daily, calibrated to your caloric target. Cut, Maintain, or Build.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); navigateToWizard(); }}
                  className="inline-flex items-center gap-2.5 bg-[#F2C94C] text-[#111111] px-7 py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors"
                >
                  Get My Plan →
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("how-it-works"); }}
                  className="text-white/60 text-[12px] border border-white/20 px-5 py-3.5 hover:border-[#F2C94C] hover:text-[#F2C94C] transition-colors"
                >
                  How It Works
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-8">
                {["✓ Delivered fresh daily", "✓ Chef-prepared", "✓ Trainer-approved"].map((s) => (
                  <span key={s} className="text-[10px] text-white/35 border border-white/10 px-3 py-1.5 tracking-wider">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANIMATED STATS BAR ── */}
      <div className="bg-[#111111] py-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center flex-1 min-w-[120px]">
              <div className="font-display text-[28px] font-bold text-[#CDFF3A]">{s.val}</div>
              <div className="text-white/40 text-[11px] uppercase tracking-[0.15em] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div className="bg-[#0E0E0E] border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 py-3.5 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {[
            { icon: "🏛", label: "USDA Nutritional Standards" },
            { icon: "⚡", label: "Same-Day Delivery" },
            { icon: "❄️", label: "2-Month Freezer Life" },
            { icon: "🏋", label: "Trainer-Approved Macros" },
            { icon: "⭐", label: "4.8 · 2,400+ Reviews" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2.5 text-[11px] text-white/40 tracking-[0.15em] uppercase">
              <span className="text-[15px]">{t.icon}</span><span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PLANS SECTION — INTERACTIVE ── */}
      <section className="text-white py-24 overflow-hidden relative" style={{ background: "linear-gradient(160deg, #14100A 0%, #1C1508 45%, #0F1A0C 100%)" }}>

        {/* Slow animated ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ animation: "ambientShift 8s ease-in-out infinite alternate", backgroundImage: "radial-gradient(ellipse 55% 60% at 80% 30%, rgba(242,201,76,0.09) 0%, transparent 65%), radial-gradient(ellipse 40% 45% at 15% 75%, rgba(205,255,58,0.06) 0%, transparent 60%)" }} />

        {/* Grain texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />

        <style>{`
          @keyframes ambientShift {
            from { opacity: 0.6; }
            to { opacity: 1; }
          }
          @keyframes shimmer-sweep {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(300%) skewX(-15deg); }
          }
          @keyframes float-up {
            0% { opacity: 0; transform: translateY(28px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.18; }
            50% { opacity: 0.45; }
          }
          @keyframes badge-pop {
            0% { transform: scale(0.8) rotate(-6deg); opacity: 0; }
            100% { transform: scale(1) rotate(-3deg); opacity: 1; }
          }
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .plan-card { animation: float-up 0.6s cubic-bezier(0.22,1,0.36,1) both; }
          .plan-card:nth-child(1) { animation-delay: 0.05s; }
          .plan-card:nth-child(2) { animation-delay: 0.18s; }
          .plan-card:nth-child(3) { animation-delay: 0.30s; }
          .plan-card:hover .shimmer-bar { animation: shimmer-sweep 0.7s ease forwards; }
          .plan-card:hover .glow-blob { animation: glow-pulse 2s ease infinite; }
          .popular-badge { animation: badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.4s both; }
          .ticker-inner { animation: ticker-scroll 22s linear infinite; }
          .ticker-inner:hover { animation-play-state: paused; }
        `}</style>

        <div className="max-w-[1440px] mx-auto px-6 relative">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#F2C94C] uppercase">02 / Meal Plans</span>
            <div className="h-px w-16 bg-[#F2C94C]/30" />
          </div>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <h2 className="font-display text-[56px] lg:text-[72px] font-bold leading-none">
              Your goal.<br />
              <span className="text-[#F2C94C]">Your macros.</span>
            </h2>
            <div className="max-w-md flex flex-col justify-between h-full gap-4">
              <p className="text-white/50 text-[15px] leading-relaxed">
                Three plans. Every calorie calculated. Fresh meals delivered to your door every morning — chef-prepared, macro-labelled.
              </p>
              {/* 6in60 promise pill */}
              <div className="inline-flex items-center gap-3 bg-[#CDFF3A]/10 border border-[#CDFF3A]/25 px-5 py-3 self-start">
                <div className="w-7 h-7 bg-[#CDFF3A] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-[#111] font-black text-[9px]">6:60</span>
                </div>
                <span className="text-[#CDFF3A] text-[12px] font-semibold tracking-wide">Lose 6kg in 60 days — or your money back.</span>
              </div>
              <button onClick={() => navigate("how-it-works")} className="text-white/40 text-[12px] border border-white/15 px-5 py-3 hover:border-[#F2C94C] hover:text-[#F2C94C] transition-colors uppercase tracking-[0.15em] self-start">
                How It Works →
              </button>
            </div>
          </div>

          {/* Scrolling social proof ticker */}
          <div className="overflow-hidden mb-10 border-y border-white/6 py-3">
            <div className="ticker-inner flex gap-10 whitespace-nowrap w-max">
              {[...Array(2)].map((_, rep) => (
                <div key={rep} className="flex gap-10 shrink-0">
                  {[
                    "⚡ Marcus T. lost 7.2kg in 60 days",
                    "🔥 Sarah L. — 8 weeks, -5.4kg, energy through the roof",
                    "✓ 12,400+ active members across Singapore",
                    "⭐ 4.8 stars · 2,400+ verified reviews",
                    "🏋 Ryan K. cut from 88kg → 81kg in 8 weeks",
                    "📦 98% on-time delivery rate",
                    "🎯 Chef-prepared · macro-labelled · trainer-approved",
                  ].map((t) => (
                    <span key={t} className="text-[11px] text-white/30 tracking-wide">{t}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {PLANS.map((plan, idx) => {
              const isHovered = hoveredPlan === plan.name;
              const isMaintain = plan.name === "MAINTAIN";
              return (
                <div key={plan.name}
                  className="plan-card relative overflow-hidden cursor-pointer group/card"
                  style={{
                    backgroundColor: isHovered ? "#1E1A12" : isMaintain ? "#1A1610" : "#161208",
                    border: `1.5px solid ${isHovered ? plan.accent : isMaintain ? "rgba(242,201,76,0.3)" : "rgba(255,255,255,0.07)"}`,
                    transform: isHovered ? "translateY(-8px) scale(1.018)" : isMaintain ? "translateY(-3px)" : "translateY(0) scale(1)",
                    transition: "transform 0.38s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease, box-shadow 0.38s ease",
                    boxShadow: isHovered ? `0 28px 70px -12px ${plan.accent}55, 0 0 0 1px ${plan.accent}30` : isMaintain ? "0 8px 40px -8px rgba(242,201,76,0.2)" : "0 4px 24px -4px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={() => setHoveredPlan(plan.name)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  onClick={() => navigateToWizard(plan.name)}>

                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300"
                    style={{ backgroundColor: plan.accent, opacity: isHovered ? 1 : 0.6 }} />

                  {/* Radial glow blob */}
                  <div className="glow-blob absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle, ${plan.accent}40 0%, transparent 70%)`, opacity: isHovered ? 1 : 0 }} />

                  {/* Shimmer sweep on hover */}
                  <div className="shimmer-bar absolute inset-y-0 w-16 pointer-events-none"
                    style={{ background: "rgba(255,255,255,0.07)", transform: "translateX(-100%) skewX(-15deg)" }} />

                  <div className="relative p-7">
                    {/* Most Popular badge — MAINTAIN only */}
                    {isMaintain && (
                      <div className="popular-badge absolute -top-1 -right-1 z-10">
                        <div className="bg-[#F2C94C] text-[#111] text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5">
                          ★ Most Popular
                        </div>
                      </div>
                    )}

                    {/* Plan label + index */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
                          style={{ backgroundColor: `${plan.accent}20`, color: plan.accent, border: `1px solid ${plan.accent}40` }}>
                          {idx + 1}
                        </div>
                        <span className="font-mono text-[11px] tracking-[0.3em] font-bold uppercase"
                          style={{ color: plan.accent }}>{plan.name}</span>
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/25">{plan.meals} meals/day</div>
                    </div>

                    {/* Calorie hero + price */}
                    <div className="flex items-end justify-between mb-5 gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] mb-1 text-white/30">Daily target</div>
                        <div className="font-display leading-none transition-all duration-300"
                          style={{ fontSize: isHovered ? "56px" : "48px", color: isHovered ? plan.accent : "white" }}>
                          {plan.cal}
                          <span className="text-[18px] font-normal text-white/30"> kcal</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display text-[34px] font-bold leading-none" style={{ color: plan.accent }}>
                          ${plan.priceWeek}
                        </div>
                        <div className="text-white/30 text-[11px] mt-1">/week</div>
                      </div>
                    </div>

                    <p className="text-white/40 text-[13px] leading-relaxed mb-6">{plan.desc}</p>

                    {/* Macro pills */}
                    <div className="flex gap-2 mb-6">
                      {[{ l: "Protein", v: `${plan.protein}g` }, { l: "Carbs", v: `${plan.carbs}g` }, { l: "Fat", v: `${plan.fat}g` }].map((m) => (
                        <div key={m.l} className="flex-1 text-center py-2.5 transition-all duration-300"
                          style={{ backgroundColor: isHovered ? `${plan.accent}18` : "rgba(255,255,255,0.05)", border: `1px solid ${isHovered ? plan.accent + "40" : "rgba(255,255,255,0.08)"}` }}>
                          <div className="font-mono text-[14px] font-bold" style={{ color: isHovered ? plan.accent : "rgba(255,255,255,0.8)" }}>{m.v}</div>
                          <div className="text-[9px] uppercase tracking-wider mt-0.5 text-white/25">{m.l}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/8">
                      <span className="text-[11px] text-white/25">Fresh daily · SG</span>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300"
                        style={{ color: isHovered ? plan.accent : "rgba(255,255,255,0.25)", transform: isHovered ? "translateX(0)" : "translateX(-4px)" }}>
                        Select Plan
                        <span className="transition-transform duration-300" style={{ transform: isHovered ? "translateX(3px)" : "translateX(0)" }}>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => navigateToWizard()} className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] transition-colors">
            Start Meal Plan Wizard →
          </button>
        </div>
      </section>

      {/* ── GIFT CARD BANNER ── */}
      <section className="bg-[#CDFF3A] py-14">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] tracking-[0.4em] text-[#111]/40 uppercase mb-2">Gift Cards</div>
            <h3 className="font-display text-[36px] font-bold text-[#111] leading-tight">
              Give the gift of<br />performance.
            </h3>
            <p className="text-[#111]/60 text-[14px] mt-3 max-w-xs">
              Fresher gift cards never expire. Use on any meal, box, or subscription. From $25.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {["$25", "$50", "$100", "$150"].map((a) => (
              <div key={a} className="bg-white/50 border-2 border-[#111]/15 px-5 py-3 text-center">
                <div className="font-display text-[22px] font-bold text-[#111]">{a}</div>
              </div>
            ))}
            <button onClick={() => navigate("gift-card")}
              className="ml-2 bg-[#111111] text-white px-7 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#0D2818] transition-colors whitespace-nowrap">
              Buy a Gift Card →
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — INTERACTIVE ── */}
      <section className="bg-[#F7F5F0] py-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#111111]/35 uppercase">Client Results</span>
            <div className="h-px w-16 bg-[#111111]/15" />
          </div>
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-14">
            <h2 className="font-display text-[52px] font-bold leading-none">What our<br />members say.</h2>
            <div className="flex items-center gap-2 mt-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`transition-all duration-300 ${activeTestimonial === i ? "w-8 h-2 bg-[#111]" : "w-2 h-2 bg-[#D0CCC4] hover:bg-[#888]"} rounded-full`} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name}
                onClick={() => setActiveTestimonial(i)}
                className={`bg-white p-8 border-2 cursor-pointer transition-all duration-300 ${activeTestimonial === i ? "border-[#111] shadow-xl scale-[1.02]" : "border-transparent hover:border-[#E5E2DA]"}`}>
                <div className="text-[16px] mb-5">
                  {"★".repeat(t.rating).split("").map((s, j) => (
                    <span key={j} className="text-[#CDFF3A]">{s}</span>
                  ))}
                </div>
                <p className="text-[#333] text-[15px] leading-relaxed mb-7">"{t.text}"</p>
                <div className="border-t border-[#E5E2DA] pt-5 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-[14px]">{t.name}</div>
                    <div className="text-[#999] text-[12px] mt-0.5">{t.role}</div>
                  </div>
                  <span className={`text-[10px] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 whitespace-nowrap ${t.plan.includes("Ready") ? "bg-[#111111] text-[#CDFF3A]" : "bg-[#0D2818] text-[#F2C94C]"}`}>
                    {t.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REWARDS ── */}
      <section className="bg-[#111111] text-white py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase mb-6">Rewards Program</div>
              <h2 className="font-display text-[52px] font-bold mb-5 leading-none">
                Earn while<br />you <span className="text-[#CDFF3A]">perform.</span>
              </h2>
              <p className="text-white/45 text-[15px] leading-relaxed mb-10 max-w-md">
                Every dollar spent earns Fresher Points. Redeem for free meals, plan upgrades, and exclusive benefits. Also earn by referring friends.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button onClick={navigateToReferral} className="inline-flex items-center gap-2.5 bg-[#CDFF3A] text-[#111111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                  Join Rewards →
                </button>
                <button onClick={navigateToReferral} className="border border-white/20 text-white/60 px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:border-white hover:text-white transition-colors">
                  Refer & Earn $10
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { pts: "1 pt", per: "per $1 spent", color: "#CDFF3A" },
                { pts: "2× pts", per: "on Meal Plans", color: "#F2C94C" },
                { pts: "$5 off", per: "every 500 points", color: "#7EE8B0" },
                { pts: "$10 bonus", per: "per referral", color: "#A78BFA" },
              ].map((r) => (
                <div key={r.pts} className="bg-white/5 border border-white/8 p-7 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer">
                  <div className="font-display text-[32px] font-bold mb-1.5" style={{ color: r.color }}>{r.pts}</div>
                  <div className="text-white/35 text-[11px] uppercase tracking-[0.15em]">{r.per}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-[#F7F5F0] py-16 border-t border-[#E5E2DA]">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <span className="font-mono text-[10px] tracking-[0.45em] text-[#111111]/35 uppercase">Stay in the loop</span>
          <h3 className="font-display text-[36px] font-bold mt-3 mb-2">New meals. New deals. Every week.</h3>
          <p className="text-[#888] text-[14px] mb-8">Join 8,400+ members getting the weekly menu drop.</p>
          <div className="flex gap-0 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com"
              className="flex-1 border border-[#D0CCC4] border-r-0 px-5 py-3.5 text-[14px] bg-white text-[#111111] placeholder:text-[#bbb] outline-none focus:border-[#111111] transition-colors" />
            <button className="bg-[#111111] text-white px-6 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
