import { useState, useEffect, useRef } from "react";
import { Page } from "@/data";
import { PerformanceMealsLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard?: (plan?: string) => void;
}

/* ── Scroll-reveal hook ──────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Animated counter hook ───────────────────────────────────── */
function useCounter(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setCount(Math.floor(eased * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

const MILESTONES = [
  { year: "2019", short: "Founded", event: "Started by athletes who couldn't find food that supported how they trained. Built the kitchen they wished existed." },
  { year: "2021", short: "Meal Plan launch", event: "Launched Singapore's first goal-led meal subscription with real personal check-ins — not just macros, but mentorship." },
  { year: "2022", short: "Ready Series", event: "Ready Series launched for customers who wanted the same quality without a subscription. Zero compromise on the food." },
  { year: "2024", short: "8,400+ customers", event: "Over 8,400 active customers. 40+ macro-tracked meals on the menu. Still made fresh daily. Still answering messages personally." },
];

const PILLARS = [
  { n: "01", title: "Performance-first nutrition", short: "Every macro matters.", desc: "Every meal is engineered around macros that support training — not just calories in, calories out. We built the food we wanted to eat ourselves." },
  { n: "02", title: "Real food, no shortcuts", short: "Fresh daily. No exceptions.", desc: "Prepared each morning in our Singapore kitchen. No preservatives, no shortcuts. Delivered before 10am while it's still fresh." },
  { n: "03", title: "Boutique at scale", short: "We still answer personally.", desc: "We've grown without losing what made us different. Every Meal Plan customer gets regular check-ins. We've stayed small enough to care." },
  { n: "04", title: "Two paths, one standard", short: "Same kitchen. Your choice.", desc: "Ready Series for everyday momentum. Meal Plan for structured, goal-led progress. Same quality coming out of the same kitchen." },
];

const TESTIMONIALS = [
  { name: "Jonathan C.", role: "6by60 programme · 12 weeks", text: "Down 9kg. The check-ins made the difference — it felt like having a coach, not just a meal service.", stars: 5 },
  { name: "Mei Lin T.", role: "Meal Plan · 6 months", text: "Finally stopped guessing what to eat. The meals fit my training schedule and I actually look forward to them.", stars: 5 },
  { name: "Ravi S.", role: "Ready Series customer", text: "I travel a lot. Stocking the freezer with Ready Series means I never fall off when life gets chaotic.", stars: 5 },
];

const STATS = [
  { value: 8400, suffix: "+", label: "Active customers", mono: false },
  { value: 49, suffix: "/5", label: "Avg rating", mono: true, divide: 10 },
  { value: 40, suffix: "+", label: "Macro-tracked meals", mono: false },
  { value: 5, suffix: " yrs", label: "Serving Singapore", mono: false },
];

export default function HomePage({ navigate, navigateToWizard }: Props) {
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const [activeMilestone, setActiveMilestone] = useState(3); // show latest by default
  const [hoveredPath, setHoveredPath] = useState<"ready" | "plan" | null>(null);

  // Hero stagger: mount-based
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  // Section reveals
  const story = useReveal();
  const pillarsSection = useReveal();
  const testimonialsSection = useReveal();
  const pathsSection = useReveal();
  const statsSection = useReveal();

  // Animated stats
  const c0 = useCounter(8400, 1600, statsSection.visible);
  const c2 = useCounter(40, 900, statsSection.visible);
  const c3 = useCounter(5, 700, statsSection.visible);

  const statValues = [`${c0.toLocaleString()}+`, "4.9 / 5", `${c2}+`, `${c3} yrs`];

  return (
    <div className="bg-[#1A1A1A] text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[92svh] flex flex-col justify-center">
        {/* Animated grid texture */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(#F5B300 1px,transparent 1px),linear-gradient(90deg,#F5B300 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        {/* Animated yellow glow */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,179,0,0.08) 0%, transparent 70%)", animation: "fadeIn 2s ease forwards" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(232,93,4,0.05) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 py-28 sm:py-36">
          {/* Staggered hero elements */}
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "0ms" }}>
            <PerformanceMealsLogo size="lg" variant="dark" />
          </div>

          <div className="mt-10" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "120ms" }}>
            <p className="text-[11px] font-mono tracking-[0.45em] uppercase text-[#F5B300] mb-5">Singapore · Est. 2019</p>
            <h1 className="font-display text-[56px] sm:text-[80px] lg:text-[104px] font-extrabold leading-[0.87] mb-8 max-w-[900px]">
              Nutrition that<br />
              <span className="text-[#F5B300]">works.</span>
            </h1>
          </div>

          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "260ms" }}>
            <p className="text-white/45 text-[17px] sm:text-[20px] leading-relaxed max-w-[560px] mb-12">
              We built the food we couldn't find — performance-grade meals made fresh daily,
              designed around the way serious people actually train and live.
            </p>
          </div>

          {/* CTA row */}
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "380ms" }}
            className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate("ready-series")}
              className="group inline-flex items-center justify-between gap-4 px-8 py-5 bg-[#F5B300] text-[#111] font-extrabold text-[12px] tracking-[0.2em] uppercase hover:bg-white transition-colors">
              <span>Browse Ready Series</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button onClick={() => navigate("meal-plan-landing")}
              className="group inline-flex items-center justify-between gap-4 px-8 py-5 border border-white/20 text-white/55 font-bold text-[12px] tracking-[0.2em] uppercase hover:border-[#E85D04] hover:text-white transition-colors">
              <span>Explore Meal Plans</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-10 left-6 sm:left-10 flex items-center gap-3"
            style={{ opacity: heroVisible ? 0.35 : 0, transition: "opacity 1.2s ease", transitionDelay: "900ms" }}>
            <div className="w-px h-10 bg-white/20 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ── ANIMATED STATS ── */}
      <div ref={statsSection.ref} className="bg-[#111] border-t border-b border-white/8">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/8">
            {STATS.map((s, i) => (
              <div key={i}
                className={`p-6 sm:p-8 transition-all duration-700 ${statsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="font-display text-[32px] sm:text-[40px] font-extrabold text-[#F5B300] leading-none tabular-nums">
                  {statValues[i]}
                </div>
                <div className="text-white/30 text-[11px] mt-2 font-mono uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <section ref={story.ref} className="bg-white text-[#1A1A1A] py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${story.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-4">Who we are</p>
              <h2 className="font-display text-[40px] sm:text-[54px] font-extrabold leading-[0.93] text-[#1A1A1A] mb-8">
                We built the food<br />we couldn't find.
              </h2>
              <div className="space-y-5 text-[#555] text-[15px] leading-relaxed">
                <p>Performance Meals started because the founders — competitive athletes training in Singapore — couldn't find food that actually supported what they were doing. Everything was either too expensive, nutritionally vague, or just plain bad.</p>
                <p>So they built it themselves. A kitchen focused entirely on performance nutrition — fresh, macro-tracked, chef-prepared meals made for people who take their health seriously but still have a life to live.</p>
                <p>Today we serve over 8,400 active customers. We've stayed close to our original promise: honest food, personal service, real results.</p>
              </div>
            </div>

            {/* Interactive timeline */}
            <div>
              <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#aaa] mb-6">Our story</div>
              <div className="space-y-0">
                {MILESTONES.map((m, i) => (
                  <button key={i} onClick={() => setActiveMilestone(activeMilestone === i ? -1 : i)}
                    className={`w-full text-left border-l-[3px] pl-6 pr-4 py-4 transition-all duration-300 ${activeMilestone === i ? "border-[#F5B300] bg-[#F7F5F0]" : "border-[#E8E4DC] hover:border-[#F5B300]/50 hover:bg-[#FAF9F6]"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <span className="font-mono text-[12px] font-bold text-[#F5B300]">{m.year}</span>
                        <span className={`ml-3 text-[13px] font-semibold ${activeMilestone === i ? "text-[#1A1A1A]" : "text-[#888]"}`}>{m.short}</span>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        className={`shrink-0 text-[#888] transition-transform duration-300 ${activeMilestone === i ? "rotate-180 text-[#F5B300]" : ""}`}>
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                    <div className={`overflow-hidden transition-all duration-400 ${activeMilestone === i ? "max-h-32 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-[13px] text-[#666] leading-relaxed">{m.event}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section ref={pillarsSection.ref} className="py-20 sm:py-28 bg-[#F7F5F0]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className={`mb-14 transition-all duration-700 ${pillarsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-3">What makes us different</p>
            <h2 className="font-display text-[40px] sm:text-[54px] font-extrabold text-[#1A1A1A] leading-[0.93]">
              We changed what<br /><span style={{ color: "#E85D04" }}>meal prep</span> means in SG.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PILLARS.map((p, i) => (
              <button key={i} onClick={() => setActivePillar(activePillar === i ? null : i)}
                className={`text-left p-7 border transition-all duration-400 group ${pillarsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${activePillar === i ? "border-[#1A1A1A] bg-[#1A1A1A] text-white" : "border-[#E8E4DC] bg-white hover:border-[#1A1A1A]"}`}
                style={{ transitionDelay: pillarsSection.visible ? `${i * 80}ms` : "0ms" }}>
                <div className={`font-mono text-[10px] tracking-[0.35em] uppercase mb-3 ${activePillar === i ? "text-[#F5B300]" : "text-[#aaa]"}`}>{p.n}</div>
                <div className={`font-display text-[19px] font-bold mb-2 transition-colors ${activePillar === i ? "text-white" : "text-[#1A1A1A] group-hover:text-[#1A1A1A]"}`}>{p.title}</div>
                <div className={`text-[13px] font-mono transition-colors ${activePillar === i ? "text-[#F5B300]" : "text-[#888]"}`}>{p.short}</div>
                <div className={`overflow-hidden transition-all duration-400 ${activePillar === i ? "max-h-28 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="text-[13px] leading-relaxed text-white/65">{p.desc}</p>
                </div>
                <div className={`mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider transition-all ${activePillar === i ? "text-[#F5B300]" : "text-[#ccc] group-hover:text-[#888]"}`}>
                  {activePillar === i ? "Close" : "Read more"}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={`transition-transform duration-300 ${activePillar === i ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section ref={testimonialsSection.ref} className="py-20 sm:py-28 bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className={`mb-12 transition-all duration-700 ${testimonialsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-3">Real results</p>
            <h2 className="font-display text-[40px] font-extrabold text-white leading-tight">What our customers say.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}
                className={`bg-[#111] border border-white/8 p-8 hover:border-[#F5B300]/25 transition-all duration-500 ${testimonialsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: testimonialsSection.visible ? `${i * 120}ms` : "0ms" }}>
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, j) => <span key={j} className="text-[#F5B300] text-[14px]">★</span>)}
                </div>
                <p className="text-white/55 text-[14px] leading-relaxed italic mb-6">"{t.text}"</p>
                <div className="font-semibold text-white text-[13px]">{t.name}</div>
                <div className="text-white/30 text-[11px] mt-0.5 font-mono">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TWO PATHS — animated split panel ── */}
      <section ref={pathsSection.ref} className="border-t border-white/8">
        <div className={`transition-all duration-700 ${pathsSection.visible ? "opacity-100" : "opacity-0"}`}>
          {/* Header */}
          <div className="bg-[#111] py-14 px-6 sm:px-10 text-center">
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-3">Ready to start?</p>
            <h2 className="font-display text-[40px] sm:text-[56px] font-extrabold text-white leading-[0.93]">Two ways to eat well.</h2>
            <p className="text-white/30 text-[15px] mt-3">Same kitchen. Same quality. Choose the format that fits your life.</p>
          </div>

          {/* Animated split */}
          <div className="flex flex-col lg:flex-row min-h-[540px]"
            onMouseLeave={() => setHoveredPath(null)}>

            {/* Ready Series */}
            <div
              className="relative flex flex-col justify-between px-10 sm:px-14 py-14 overflow-hidden cursor-pointer"
              style={{
                backgroundColor: "#1A1A1A",
                flex: hoveredPath === "plan" ? "0 0 35%" : hoveredPath === "ready" ? "0 0 65%" : "1 1 50%",
                transition: "flex 0.45s cubic-bezier(0.4,0,0.2,1)",
              }}
              onClick={() => navigate("ready-series")}
              onMouseEnter={() => setHoveredPath("ready")}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F5B300]" />
              <div className="absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: "radial-gradient(circle, #F5B300 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

              <div className="relative z-10">
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-4">Ready Series</p>
                <h3 className="font-display text-[40px] sm:text-[52px] font-extrabold text-white leading-[0.93] mb-5">
                  READY<br />FOR<br />REAL LIFE.
                </h3>
                <p className={`text-white/50 text-[14px] leading-relaxed max-w-[280px] transition-opacity duration-300 ${hoveredPath === "plan" ? "opacity-0" : "opacity-100"}`}>
                  40+ frozen meals, fresh-made. Order what you want — no subscription, no lock-in.
                </p>
              </div>

              <div className="relative z-10 mt-10 lg:mt-0">
                <div className="flex flex-wrap gap-2 mb-5">
                  {["From $8.90", "40+ meals", "3-min prep", "Bundle & save"].map((t) => (
                    <span key={t} className="text-[10px] border border-white/15 px-3 py-1.5 text-white/40 font-mono">{t}</span>
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); navigate("ready-series"); }}
                  className="inline-flex items-center gap-3 bg-[#F5B300] text-[#111] text-[11px] font-extrabold tracking-[0.2em] uppercase px-8 py-4 hover:bg-white transition-colors">
                  Shop Now
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* Meal Plan */}
            <div
              className="relative flex flex-col justify-between px-10 sm:px-14 py-14 overflow-hidden cursor-pointer border-t lg:border-t-0 lg:border-l border-white/10"
              style={{
                backgroundColor: "#FAFAF8",
                color: "#1A1A1A",
                flex: hoveredPath === "ready" ? "0 0 35%" : hoveredPath === "plan" ? "0 0 65%" : "1 1 50%",
                transition: "flex 0.45s cubic-bezier(0.4,0,0.2,1)",
              }}
              onClick={() => navigate("meal-plan-landing")}
              onMouseEnter={() => setHoveredPath("plan")}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "#E85D04" }} />

              <div className="relative z-10">
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-4" style={{ color: "#E85D04" }}>Meal Plan</p>
                <h3 className="font-display text-[40px] sm:text-[52px] font-extrabold leading-[0.93] mb-5 text-[#1A1A1A]">
                  Fresh structure.<br />Personal<br />support.
                </h3>
                <p className={`text-[#666] text-[14px] leading-relaxed max-w-[280px] transition-opacity duration-300 ${hoveredPath === "ready" ? "opacity-0" : "opacity-100"}`}>
                  Goal-led meal plans with personal check-ins. CUT, MAINTAIN, or BUILD — your goal drives everything.
                </p>
              </div>

              <div className="relative z-10 mt-10 lg:mt-0">
                <div className="flex flex-wrap gap-2 mb-5">
                  {["6by60", "Buddy Plan", "HYROX", "Personal check-ins"].map((t) => (
                    <span key={t} className="text-[10px] border border-[#E8E4DC] bg-[#F0EDE8] px-3 py-1.5 text-[#888] font-mono">{t}</span>
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); navigate("meal-plan-landing"); }}
                  className="inline-flex items-center gap-3 text-white text-[11px] font-extrabold tracking-[0.2em] uppercase px-8 py-4 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#E85D04" }}>
                  Choose My Goal
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="bg-[#0D0D0D] border-t border-white/6 py-10 px-6 sm:px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <PerformanceMealsLogo size="sm" variant="dark" />
            <span className="text-white/20 text-[11px] font-mono">performancemeals.com.sg</span>
          </div>
          <div className="flex gap-5 text-[10px] font-mono tracking-widest uppercase text-white/20">
            {[
              { l: "About", p: "about" as Page },
              { l: "How It Works", p: "how-it-works" as Page },
              { l: "Ready Series", p: "ready-series" as Page },
              { l: "Meal Plan", p: "meal-plan-landing" as Page },
            ].map((item) => (
              <button key={item.l} onClick={() => navigate(item.p)} className="hover:text-white/55 transition-colors">{item.l}</button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
