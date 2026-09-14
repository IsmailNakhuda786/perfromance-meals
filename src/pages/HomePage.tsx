import { useState } from "react";
import { Page } from "@/data";
import { PerformanceMealsLogo, ReadySeriesLogo, MealPlanLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard?: (plan?: string) => void;
}

const RS_HIGHLIGHTS = [
  { n: "40+", l: "Meal options" },
  { n: "From $8.90", l: "Per meal" },
  { n: "3-min prep", l: "Microwave ready" },
  { n: "Next-day", l: "Delivery by 10am" },
];

const MP_HIGHLIGHTS = [
  { n: "Goal-first", l: "CUT / MAINTAIN / BUILD" },
  { n: "Boutique", l: "Personal support" },
  { n: "6by60", l: "Buddy Plan · HYROX" },
  { n: "Fresh daily", l: "Prepared that morning" },
];

const RS_FEATURES = [
  { icon: "❄️", title: "Frozen at peak", desc: "Prepared fresh, flash-frozen at peak nutrition. 2-month freezer life." },
  { icon: "⚡", title: "3-minute meals", desc: "Microwave or oven from frozen. No prep, no dishes, no excuses." },
  { icon: "📦", title: "Bundle & save", desc: "5, 10, 15, or 20-meal bundles. More meals = lower per-meal price." },
];

const MP_FEATURES = [
  { icon: "🎯", title: "Goal-led planning", desc: "CUT, MAINTAIN, or BUILD. Every meal mapped to your target, not the other way around." },
  { icon: "👤", title: "Personal check-ins", desc: "Regular check-ins, macro reports, and real support from people who know your plan." },
  { icon: "🔄", title: "Weekly flexibility", desc: "Swap any meal before Thursday 1pm. Your preferences, your schedule." },
];

export default function HomePage({ navigate, navigateToWizard }: Props) {
  const [brand, setBrand] = useState<"ready" | "plan">("ready");

  const isRS = brand === "ready";
  const accentColor = isRS ? "#F5B300" : "#E85D04";
  const bgColor = isRS ? "#1A1A1A" : "#FFFFFF";
  const textColor = isRS ? "#FFFFFF" : "#1A1A1A";

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A]">

      {/* ── PARENT BRAND HEADER ── */}
      <div className="bg-white border-b border-[#E8E4DC]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 flex flex-col items-center gap-3 text-center">
          <PerformanceMealsLogo size="lg" variant="dark" />
          <p className="text-[#888] text-[15px] max-w-[480px] leading-relaxed mt-3">
            Nutrition that works as hard as you do. One standard. Two clear ways to eat well.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-4">
            {[
              { stat: "8,400+", label: "Active customers" },
              { stat: "4.9 / 5", label: "Verified rating" },
              { stat: "40+", label: "Macro-tracked meals" },
              { stat: "Free delivery", label: "Orders above $80" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-bold text-[13px]">{s.stat}</span>
                <span className="text-[12px] text-[#888]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BRAND TOGGLE ── */}
      <div className="bg-[#1A1A1A] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="flex items-center gap-0">
            <div className="text-[9px] font-mono tracking-[0.35em] uppercase text-white/25 pr-6 shrink-0 hidden sm:block">Choose</div>
            <button
              onClick={() => setBrand("ready")}
              className={`flex items-center gap-3 px-6 sm:px-10 py-4 border-b-[3px] transition-all ${isRS ? "border-[#F5B300]" : "border-transparent opacity-40 hover:opacity-70"}`}
            >
              <ReadySeriesLogo size="sm" variant="dark" />
            </button>
            <div className="w-px h-6 bg-white/12 mx-2 shrink-0" />
            <button
              onClick={() => setBrand("plan")}
              className={`flex items-center gap-3 px-6 sm:px-10 py-4 border-b-[3px] transition-all ${!isRS ? "border-[#E85D04]" : "border-transparent opacity-40 hover:opacity-70"}`}
            >
              <MealPlanLogo size="sm" variant="dark" />
            </button>
            <div className="ml-auto hidden sm:flex items-center gap-2 pr-2">
              <div className={`w-1.5 h-1.5 ${isRS ? "bg-[#F5B300]" : "bg-[#E85D04]"}`} />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30">
                {isRS ? "Ready Series" : "Meal Plan"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BRAND HERO ── */}
      <div
        className="transition-colors duration-500"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Copy side */}
            <div>
              <div className="mb-6">
                {isRS ? <ReadySeriesLogo size="md" variant="dark" /> : <MealPlanLogo size="md" variant="light" />}
              </div>
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: accentColor }}>
                {isRS ? "Everyday momentum" : "Boutique support"}
              </p>
              <h1 className={`font-display text-[48px] sm:text-[64px] font-extrabold leading-[0.92] mb-6 ${isRS ? "text-white" : "text-[#1A1A1A]"}`}>
                {isRS ? (
                  <>READY<br />FOR<br />REAL LIFE.</>
                ) : (
                  <>Fresh structure.<br />Personal<br />support.</>
                )}
              </h1>
              <p className={`text-[16px] leading-relaxed max-w-[440px] mb-8 ${isRS ? "text-white/60" : "text-[#555]"}`}>
                {isRS
                  ? "Fast, enjoyable frozen meals that are ready when life gets busy — so keeping on track stays easy."
                  : "Exceptional meals, tailored support, and practical guidance for meaningful progress — built around the way you live."
                }
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {(isRS ? RS_HIGHLIGHTS : MP_HIGHLIGHTS).map((h) => (
                  <div key={h.l} className={`px-3 py-2 border text-left ${isRS ? "border-white/15 text-white/50" : "border-[#E8E4DC] text-[#555]"}`}>
                    <div className={`text-[12px] font-bold ${isRS ? "text-white" : "text-[#1A1A1A]"}`}>{h.n}</div>
                    <div className="text-[10px] tracking-wide">{h.l}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isRS ? (
                  <>
                    <button onClick={() => navigate("ready-series")}
                      className="inline-flex items-center justify-center gap-2 px-9 py-4 font-extrabold text-[12px] tracking-[0.2em] uppercase text-[#1A1A1A] transition-colors hover:bg-white"
                      style={{ backgroundColor: "#F5B300" }}>
                      SHOP READY SERIES →
                    </button>
                    <button onClick={() => navigate("build-a-box")}
                      className="inline-flex items-center justify-center gap-2 px-9 py-4 font-bold text-[12px] border border-white/20 text-white/60 hover:border-white/50 hover:text-white transition-colors">
                      Build a Box
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigateToWizard?.("MAINTAIN")}
                      className="inline-flex items-center justify-center gap-2 px-9 py-4 font-bold text-[13px] tracking-[0.15em] uppercase text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#E85D04" }}>
                      CHOOSE YOUR GOAL →
                    </button>
                    <button onClick={() => navigate("meal-plan-landing")}
                      className="inline-flex items-center justify-center gap-2 px-9 py-4 font-medium text-[13px] border border-[#D0CCC4] text-[#555] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors">
                      View Plans
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Feature cards side */}
            <div className="flex flex-col gap-4">
              {(isRS ? RS_FEATURES : MP_FEATURES).map((f) => (
                <div key={f.title}
                  className={`p-5 border ${isRS ? "border-white/10 bg-white/5" : "border-[#E8E4DC] bg-[#FAF9F6]"}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-[28px] leading-none shrink-0">{f.icon}</div>
                    <div>
                      <div className={`font-display text-[16px] font-bold mb-1 ${isRS ? "text-white" : "text-[#1A1A1A]"}`}>{f.title}</div>
                      <div className={`text-[13px] leading-relaxed ${isRS ? "text-white/50" : "text-[#666]"}`}>{f.desc}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom accent */}
              <div className="p-5 flex items-center gap-4" style={{ backgroundColor: accentColor }}>
                <div>
                  <div className="font-display text-[22px] font-extrabold text-[#111] leading-tight">
                    {isRS ? "Bundle & save" : "No long-term lock-in"}
                  </div>
                  <div className="text-[12px] text-[#111]/60 mt-0.5">
                    {isRS ? "5 to 20 meals · price drops with volume" : "Pause or cancel anytime · your settings stay saved"}
                  </div>
                </div>
                <button
                  onClick={() => isRS ? navigate("ready-to-go") : navigate("meal-plan-landing")}
                  className="ml-auto shrink-0 bg-[#1A1A1A] text-white text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-3 hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
                  {isRS ? "See Bundles" : "See Plans"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM DIVIDER STRIP ── */}
      <div className={`border-t py-6 px-6 sm:px-10 ${isRS ? "border-white/10 bg-[#1A1A1A]" : "border-[#E8E4DC] bg-white"}`}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-[12px] ${isRS ? "text-white/30" : "text-[#aaa]"}`}>
            {isRS ? "Switch to Meal Plan for goal-led structured nutrition with personal support →" : "Switch to Ready Series for individual frozen meals, no commitment →"}
          </p>
          <button
            onClick={() => setBrand(isRS ? "plan" : "ready")}
            className={`text-[11px] font-bold tracking-[0.15em] uppercase border px-5 py-2.5 transition-colors ${isRS ? "border-white/20 text-white/50 hover:border-[#F5B300] hover:text-[#F5B300]" : "border-[#D0CCC4] text-[#666] hover:border-[#E85D04] hover:text-[#E85D04]"}`}>
            View {isRS ? "Meal Plan" : "Ready Series"} →
          </button>
        </div>
      </div>
    </div>
  );
}
