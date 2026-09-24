import { useState, useEffect, useRef } from "react";
import { Page } from "@/data";
import { PerformanceMealsLogo, MealPlanLogo, ReadySeriesLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard?: (plan?: string) => void;
}

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
  { year: "2019", short: "Founded", event: "Started by athletes who could not find food that supported how they trained. Built the kitchen they wished existed." },
  { year: "2021", short: "Meal Plan launch", event: "Launched Singapore's first goal-led meal subscription with real personal check-ins — not just macros, but genuine support." },
  { year: "2022", short: "Ready-Series", event: "Ready-Series launched for customers who wanted the same quality without a subscription. Zero compromise on the food." },
  { year: "2024", short: "8,400+ customers", event: "Over 8,400 active customers. 40+ macro-tracked meals on the menu. Still made fresh daily. Still answering messages personally." },
];

const STATS = [
  { value: 8400, label: "Active customers" },
  { value: 49,   label: "Avg rating",        display: "4.9 / 5" },
  { value: 40,   label: "Macro-tracked meals" },
  { value: 5,    label: "Years serving Singapore" },
];

const TESTIMONIALS = [
  { name: "Jonathan C.", role: "6by60 programme · 12 weeks", text: "Down 9kg. The check-ins made the difference — it felt like having a coach, not just a meal service.", stars: 5 },
  { name: "Mei Lin T.",  role: "Meal Plan · 6 months",       text: "Finally stopped guessing what to eat. The meals fit my training schedule and I actually look forward to them.", stars: 5 },
  { name: "Ravi S.",     role: "Ready-Series customer",       text: "I travel a lot. Stocking the freezer with Ready-Series means I never fall off when life gets chaotic.", stars: 5 },
];

export default function HomePage({ navigate, navigateToWizard }: Props) {
  const [activeMilestone, setActiveMilestone] = useState(3);
  const [hoveredPath, setHoveredPath] = useState<"ready" | "plan" | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const brandsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const [brandsVisible, setBrandsVisible] = useState(false);
  useEffect(() => {
    const el = brandsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setBrandsVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const storySection      = useReveal();
  const testimonialsSection = useReveal();
  const pathsSection      = useReveal();
  const statsSection      = useReveal();

  const c0 = useCounter(8400, 1600, statsSection.visible);
  const c2 = useCounter(40,   900,  statsSection.visible);
  const c3 = useCounter(5,    700,  statsSection.visible);
  const statDisplays = [`${c0.toLocaleString()}+`, "4.9 / 5", `${c2}+`, `${c3} yrs`];

  const scrollToBrands = () => brandsRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-[#1A1A1A] text-white overflow-x-hidden">

      {/* ── HERO — parent brand, light-led editorial ── */}
      <section className="bg-white text-[#1A1A1A] border-b border-[#E8E4DC] min-h-[88svh] flex items-center">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
              <PerformanceMealsLogo size="lg" variant="dark" />
            </div>

            <div className="mt-10" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "120ms" }}>
              <p className="text-[11px] font-mono tracking-[0.45em] uppercase text-[#F5B300] mb-5">Singapore · Est. 2019</p>
              <h1 className="font-display text-[44px] sm:text-[62px] lg:text-[72px] font-extrabold leading-[0.92] mb-8 text-[#1A1A1A]">
                Nutrition that works<br />
                <span className="text-[#F5B300]">as hard as you do.</span>
              </h1>
            </div>

            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "260ms" }}>
              <p className="text-[#555] text-[16px] sm:text-[18px] leading-relaxed max-w-[460px] mb-12">
                Performance Meals makes exceptional meal prep accessible to every customer — with care in every experience. One performance standard. Two distinct ways to eat well.
              </p>
            </div>

            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "380ms" }}>
              <button onClick={scrollToBrands}
                className="group inline-flex items-center gap-4 px-8 py-5 bg-[#F5B300] text-[#1A1A1A] font-extrabold text-[12px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors">
                Explore Our Brands
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                  className="transition-transform group-hover:translate-y-1"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              </button>
            </div>

            <div className="mt-14 flex items-center gap-6"
              style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 1s ease", transitionDelay: "700ms" }}>
              <div className="h-px flex-1 bg-[#E8E4DC]" />
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#aaa]">Scroll to explore</span>
              <div className="h-px flex-1 bg-[#E8E4DC]" />
            </div>
          </div>

          {/* Right — lifestyle photo: real people, natural light */}
          <div className="hidden lg:block"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateX(16px)", transition: "opacity 0.9s ease, transform 0.9s ease", transitionDelay: "460ms" }}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1758523418005-b0eeb9b9a170?w=900&h=680&fit=crop&auto=format&q=85"
                alt="Real routines — Performance Meals customers"
                className="w-full h-[580px] object-cover"
              />
              {/* Yellow accent bar bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F5B300]" />
              {/* Subtle caption */}
              <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-2">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#888]">Real routines. Real results.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div ref={statsSection.ref} className="bg-[#111] border-t border-b border-white/8">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/8">
            {STATS.map((s, i) => (
              <div key={i}
                className={`p-6 sm:p-8 transition-all duration-700 ${statsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="font-display text-[32px] sm:text-[40px] font-extrabold text-[#F5B300] leading-none tabular-nums">
                  {statDisplays[i]}
                </div>
                <div className="text-white/30 text-[11px] mt-2 font-mono uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BRAND FAMILY ── */}
      <section ref={brandsRef} className="bg-white text-[#1A1A1A] py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">

          {/* Section header */}
          <div className={`mb-4 transition-all duration-700 ${brandsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[11px] font-mono tracking-[0.45em] uppercase text-[#F5B300] mb-4">Our brand family</p>
            <h2 className="font-display text-[38px] sm:text-[52px] font-extrabold text-[#1A1A1A] leading-[0.93] mb-4">
              One Standard.<br />Two Distinct Experiences.
            </h2>
            <p className="text-[#666] text-[16px] leading-relaxed max-w-[600px]">
              Performance Meals sets the quality and performance standard. Meal Plan and Ready-Series then serve two different customer needs — one the same trusted kitchen.
            </p>
          </div>

          {/* Thin yellow rule */}
          <div className="h-px bg-[#F5B300] w-24 mb-14 mt-8" />

          {/* Three brand cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#E8E4DC]">

            {/* Performance Meals — parent */}
            <div className={`p-10 border-b lg:border-b-0 lg:border-r border-[#E8E4DC] transition-all duration-700 ${brandsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "100ms" }}>
              <div className="mb-8">
                <PerformanceMealsLogo size="md" variant="dark" />
              </div>
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#F5B300] mb-3">The Parent Brand</p>
              <h3 className="font-display text-[22px] font-semibold text-[#1A1A1A] leading-snug mb-4">
                Credible, caring, principled.
              </h3>
              <p className="text-[#666] text-[14px] leading-relaxed mb-8">
                Performance Meals sets the purpose, standards, and shared quality foundation. Every meal, every experience, every customer interaction begins here.
              </p>
              <button onClick={() => navigate("about")}
                className="group inline-flex items-center gap-3 text-[#1A1A1A] text-[11px] font-bold tracking-[0.2em] uppercase border-b border-[#1A1A1A] pb-0.5 hover:border-[#F5B300] hover:text-[#F5B300] transition-colors">
                About Performance Meals
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                  className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>

            {/* Meal Plan */}
            <div className={`p-10 border-b lg:border-b-0 lg:border-r border-[#E8E4DC] transition-all duration-700 ${brandsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "200ms" }}>
              {/* Orange top accent */}
              <div className="h-[3px] bg-[#E85D04] -mx-10 -mt-10 mb-10" />
              <div className="mb-8">
                <MealPlanLogo size="md" variant="light" />
              </div>
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase mb-3" style={{ color: "#E85D04" }}>Boutique Progress</p>
              <h3 className="font-display text-[22px] font-semibold text-[#1A1A1A] leading-snug mb-4">
                Fresh structure for a personal goal.
              </h3>
              <p className="text-[#666] text-[14px] leading-relaxed mb-8">
                Tailored support, structure, confidence, and meaningful results. Designed for people who want more than a generic healthy-food routine — built around your goal, delivered fresh.
              </p>
              <button onClick={() => navigate("meal-plan-landing")}
                className="group inline-flex items-center gap-3 text-white text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-3.5 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#E85D04" }}>
                Discover Meal Plan
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                  className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>

            {/* Ready-Series */}
            <div className={`p-10 bg-[#1A1A1A] text-white transition-all duration-700 ${brandsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "300ms" }}>
              {/* Yellow top accent */}
              <div className="h-[3px] bg-[#F5B300] -mx-10 -mt-10 mb-10" />
              <div className="mb-8">
                <ReadySeriesLogo size="md" variant="dark" />
              </div>
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#F5B300] mb-3">Everyday Momentum</p>
              <h3 className="font-display text-[22px] font-extrabold text-white leading-snug mb-4">
                READY FOR REAL LIFE.
              </h3>
              <p className="text-white/55 text-[14px] leading-relaxed mb-8">
                Fast, enjoyable frozen meals that are ready when life gets busy. Dependable, repeat-friendly, and built to keep your week moving — without locking you in.
              </p>
              <button onClick={() => navigate("ready-series")}
                className="group inline-flex items-center gap-3 bg-[#F5B300] text-[#1A1A1A] text-[11px] font-extrabold tracking-[0.2em] uppercase px-6 py-3.5 hover:bg-white transition-colors">
                Shop Ready-Series
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                  className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>

          </div>

          {/* Relationship line */}
          <div className="mt-6 px-6 py-5 bg-[#1A1A1A]">
            <p className="text-white/55 text-[13px] leading-relaxed font-body">
              <span className="text-[#F5B300] font-semibold">One trusted standard</span> — delivered through a <strong className="text-white">personalised fresh-plan experience</strong> or a <strong className="text-white">fast, flexible frozen-meal experience.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section ref={storySection.ref} className="bg-[#FAF9F6] text-[#1A1A1A] py-20 sm:py-28 border-t border-[#E8E4DC]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${storySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-4">Who we are</p>
              <h2 className="font-display text-[38px] sm:text-[52px] font-extrabold leading-[0.93] text-[#1A1A1A] mb-8">
                We built the food<br />we could not find.
              </h2>
              <div className="space-y-5 text-[#555] text-[15px] leading-relaxed mb-8">
                <p>Performance Meals started because the founders — competitive athletes training in Singapore — could not find food that actually supported what they were doing. Everything was either too expensive, nutritionally vague, or genuinely unenjoyable.</p>
                <p>So they built it themselves. A kitchen focused entirely on performance nutrition — fresh, macro-tracked, chef-prepared meals made for people who take their health seriously but still have a life to live.</p>
                <p>Today we serve over 8,400 active customers across two distinct brand experiences. We have stayed close to our original promise: honest food, personal service, real results.</p>
              </div>

              {/* Purpose block */}
              <div className="border-l-[3px] border-[#F5B300] pl-5 py-2 mb-4">
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#aaa] mb-2">Parent Purpose</p>
                <p className="text-[#1A1A1A] text-[16px] leading-relaxed font-medium">
                  To make exceptional meal prep accessible to every customer, with care in every experience.
                </p>
              </div>
              <div className="border-l-[3px] border-[#E8E4DC] pl-5 py-2">
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#aaa] mb-2">Mission</p>
                <p className="text-[#555] text-[14px] leading-relaxed">
                  To deliver exceptional meals and thoughtful support that make healthy eating easier every day.
                </p>
              </div>
            </div>

            {/* Interactive timeline */}
            <div>
              <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#aaa] mb-6">Our story</div>
              <div className="space-y-0">
                {MILESTONES.map((m, i) => (
                  <button key={i} onClick={() => setActiveMilestone(activeMilestone === i ? -1 : i)}
                    className={`w-full text-left border-l-[3px] pl-6 pr-4 py-4 transition-all duration-300 ${activeMilestone === i ? "border-[#F5B300] bg-white" : "border-[#E8E4DC] hover:border-[#F5B300]/50 hover:bg-white/60"}`}>
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

      {/* ── TESTIMONIALS ── */}
      <section ref={testimonialsSection.ref} className="py-20 sm:py-28 bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className={`mb-12 transition-all duration-700 ${testimonialsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-3">Real results</p>
            <h2 className="font-display text-[38px] font-extrabold text-white leading-tight">What our customers say.</h2>
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

      {/* ── TWO PATHS — animated split ── */}
      <section ref={pathsSection.ref} className="border-t border-white/8">
        <div className={`transition-all duration-700 ${pathsSection.visible ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-[#111] py-14 px-6 sm:px-10 text-center">
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-3">Choose your experience</p>
            <h2 className="font-display text-[38px] sm:text-[54px] font-extrabold text-white leading-[0.93]">
              One standard.<br />Two clear offers.
            </h2>
            <p className="text-white/30 text-[15px] mt-3">Same quality. Different format. Choose the one that fits your life.</p>
          </div>

          <div className="flex flex-col lg:flex-row min-h-[500px]" onMouseLeave={() => setHoveredPath(null)}>

            {/* Ready-Series */}
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
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, #F5B300 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

              <div className="relative z-10">
                <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#F5B300] mb-4">Everyday Momentum</p>
                <h3 className="font-display text-[38px] sm:text-[50px] font-extrabold text-white leading-[0.93] mb-5">
                  READY FOR<br />REAL LIFE.
                </h3>
                <p className={`text-white/50 text-[14px] leading-relaxed max-w-[280px] transition-opacity duration-300 ${hoveredPath === "plan" ? "opacity-0" : "opacity-100"}`}>
                  Good meals, ready when you need them. Frozen at peak freshness. Fast, dependable, and built for busy schedules.
                </p>
              </div>

              <div className="relative z-10 mt-10 lg:mt-0">
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Frozen at peak", "No lock-in", "Bundle & save", "From $9.90"].map((t) => (
                    <span key={t} className="text-[10px] border border-white/15 px-3 py-1.5 text-white/40 font-mono">{t}</span>
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); navigate("ready-series"); }}
                  className="inline-flex items-center gap-3 bg-[#F5B300] text-[#1A1A1A] text-[11px] font-extrabold tracking-[0.2em] uppercase px-8 py-4 hover:bg-white transition-colors">
                  Shop Ready-Series
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
                <p className="text-[10px] font-mono tracking-[0.4em] uppercase mb-4" style={{ color: "#E85D04" }}>Boutique Progress</p>
                <h3 className="font-display text-[38px] sm:text-[50px] font-semibold leading-[0.93] mb-5 text-[#1A1A1A]">
                  Fresh structure.<br />Personal<br />support.
                </h3>
                <p className={`text-[#666] text-[14px] leading-relaxed max-w-[280px] transition-opacity duration-300 ${hoveredPath === "ready" ? "opacity-0" : "opacity-100"}`}>
                  Exceptional meal prep, thoughtfully supported. Built around your goal and your routine — not a one-size plan.
                </p>
              </div>

              <div className="relative z-10 mt-10 lg:mt-0">
                <div className="flex flex-wrap gap-2 mb-5">
                  {["6by60", "6by60 Plus", "Fresh delivery", "Personal check-ins"].map((t) => (
                    <span key={t} className="text-[10px] border border-[#E8E4DC] bg-[#F0EDE8] px-3 py-1.5 text-[#888] font-mono">{t}</span>
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); navigate("meal-plan-landing"); }}
                  className="inline-flex items-center gap-3 text-white text-[11px] font-extrabold tracking-[0.2em] uppercase px-8 py-4 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#E85D04" }}>
                  Discover Meal Plan
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
              { l: "About",        p: "about" as Page },
              { l: "Ready-Series", p: "ready-series" as Page },
              { l: "Meal Plan",    p: "meal-plan-landing" as Page },
            ].map((item) => (
              <button key={item.l} onClick={() => navigate(item.p)} className="hover:text-white/55 transition-colors">{item.l}</button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
