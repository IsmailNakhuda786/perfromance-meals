import { useState } from "react";
import { Page } from "@/data";
import { PerformanceMealsLogo, ReadySeriesLogo, MealPlanLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard?: (plan?: string) => void;
  addToCart?: (item: any) => void;
  navigateToReferral?: () => void;
}


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
              {["Goal-first", "6by60 · Buddy Plan · HYROX", "Fresh daily", "Boutique support"].map((t) => (
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

      {/* ── SECTION 2: TRUST STRIP ── */}
      <section className="bg-white border-t border-[#E8E4DC] py-5 px-6 sm:px-10">
        <div className="max-w-[1000px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { stat: "8,400+", label: "Active customers" },
            { stat: "4.9/5", label: "Verified rating" },
            { stat: "40+", label: "Macro-tracked meals" },
            { stat: "Free delivery", label: "On orders above $80" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-center">
              <div className="w-1 h-1 bg-[#F5B300]" />
              <span className="font-bold text-[13px] text-[#1A1A1A]">{item.stat}</span>
              <span className="text-[12px] text-[#888]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
