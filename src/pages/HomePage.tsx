import { useState, useEffect, useRef } from "react";
import { Page } from "@/data";
import { PerformanceMealsLogo, MealPlanLogo, ReadySeriesLogo } from "@/components/Logos";

const imgHero    = "/19606.png";
const imgKitchen = "/13da6.png";
const imgChef = "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&h=590&fit=crop&auto=format";
const imgReady   = "/d006a.png";
const imgMeal    = "/98c55.png";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard?: (plan?: string) => void;
}

/* ─── Carousel slides ─────────────────────────────────────── */
const SLIDES = [
  {
    eyebrow: "PERFORMANCE MEALS / SINGAPORE",
    headline: ["NUTRITION", "THAT WORKS", "AS HARD", "AS YOU DO."],
    sub: "Exceptional meals and thoughtful support that make healthy eating easier every day.",
    img: imgHero,
  },
  {
    eyebrow: "PERFORMANCE MEALS / MEAL PLAN",
    headline: ["FRESH STRUCTURE,", "PERSONAL", "GUIDANCE,", "REAL RESULTS."],
    sub: "A structured fresh-meal plan with real check-ins and support around your goal.",
    img: imgMeal,
  },
  {
    eyebrow: "PERFORMANCE MEALS / READY-SERIES",
    headline: ["FROZEN.", "MACRO-TRACKED.", "ZERO", "COMPROMISE."],
    sub: "40+ chef-prepared frozen meals for busy weeks. Fast, flexible, and dependable.",
    img: imgReady,
  },
];

/* ─── Brand Family accordion ─────────────────────────────── */
interface BrandFamilyProps {
  brandsRef: React.RefObject<HTMLDivElement | null>;
  brandsVisible: boolean;
  navigate: (page: Page) => void;
}

const BRAND_DATA = [
  {
    num: "01",
    tag: "The Parent Brand",
    logoVariant: "pm" as const,
    headline: ["Credible.", "Caring.", "Principled."],
    body: "Performance Meals sets the purpose, standards, and shared quality foundation that both brand experiences are built on. Every meal, every customer interaction begins here.",
    stat: { v: "Est. 2019", l: "Singapore" },
    cta: "Our Story",
    page: "about" as Page,
    bg: "#F5F2EC",
    accent: "#1A1A1A",
    accentHighlight: "#F5B300",
    textDim: "rgba(26,26,26,0.50)",
    numColor: "rgba(26,26,26,0.05)",
    ctaStyle: "border-b-2 border-[#1A1A1A]/30 text-[#1A1A1A] hover:border-[#F5B300] hover:text-[#F5B300]",
    barColor: "#F5B300",
  },
  {
    num: "02",
    tag: "Boutique Progress",
    logoVariant: "mp" as const,
    headline: ["Fresh structure", "for your", "personal goal."],
    body: "Tailored support, real check-ins, and meaningful results. Designed for people who want more than a generic routine — built around your goal, delivered fresh daily.",
    stat: { v: "6–12 wks", l: "Avg transformation" },
    cta: "Discover Meal Plan",
    page: "meal-plan-landing" as Page,
    bg: "#E85D04",
    accent: "#FFFFFF",
    accentHighlight: "#FFFFFF",
    textDim: "rgba(255,255,255,0.60)",
    numColor: "rgba(255,255,255,0.05)",
    ctaStyle: "bg-white text-[#E85D04] hover:bg-[#1A1A1A] hover:text-white px-6 py-3.5",
    barColor: "rgba(255,255,255,0.35)",
  },
  {
    num: "03",
    tag: "Everyday Momentum",
    logoVariant: "rs" as const,
    headline: ["Ready for", "real life."],
    body: "Fast, enjoyable frozen meals built to keep your week moving without locking you in. Dependable, repeat-friendly, and zero compromise on nutrition.",
    stat: { v: "40+", l: "Macro-tracked meals" },
    cta: "Shop Ready-Series",
    page: "ready-series" as Page,
    bg: "#F5B300",
    accent: "#1A1A1A",
    accentHighlight: "#1A1A1A",
    textDim: "rgba(26,26,26,0.52)",
    numColor: "rgba(26,26,26,0.05)",
    ctaStyle: "bg-[#1A1A1A] text-white hover:bg-white hover:text-[#1A1A1A] px-6 py-3.5",
    barColor: "rgba(26,26,26,0.25)",
  },
];

function BrandFamilySection({ brandsRef, brandsVisible, navigate }: BrandFamilyProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section ref={brandsRef} className="overflow-hidden">
      <div className={`bg-white px-6 sm:px-10 pt-20 pb-10 transition-all duration-700 ${brandsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] font-mono tracking-[0.45em] uppercase text-[#F5B300] mb-5">Our brand family</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-[52px] sm:text-[72px] font-extrabold text-[#1A1A1A] leading-[0.88]">
              One Standard.<br /><span className="text-[#F5B300]">Two Experiences.</span>
            </h2>
            <p className="text-[#888] text-[15px] leading-relaxed max-w-[320px] lg:mb-2">
              Hover each brand to explore its story — all built on the same trusted kitchen.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ minHeight: "600px" }}>
        {BRAND_DATA.map((b, i) => {
          const isActive = active === i;
          const isInactive = active !== null && !isActive;
          const logo = b.logoVariant === "pm"
            ? <PerformanceMealsLogo size="md" variant="dark" />
            : b.logoVariant === "mp"
              ? <MealPlanLogo size="md" variant="light" />
              : <ReadySeriesLogo size="md" variant="light" />;
          return (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => navigate(b.page)}
              className="relative overflow-hidden flex flex-col justify-between cursor-pointer"
              style={{
                backgroundColor: b.bg,
                flex: isActive ? "2.4" : isInactive ? "0.7" : "1",
                transition: "flex 0.55s cubic-bezier(0.4,0,0.2,1)",
                minHeight: "520px",
                padding: "48px 44px",
              }}
            >
              <div
                className="absolute -bottom-6 -right-4 font-display font-extrabold select-none pointer-events-none"
                style={{
                  fontSize: "clamp(120px, 18vw, 220px)",
                  color: b.numColor,
                  lineHeight: 0.85,
                  transition: "opacity 0.4s ease",
                  opacity: isInactive ? 0 : 1,
                }}
              >
                {b.num}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="h-[2px] transition-all duration-500"
                    style={{ backgroundColor: b.barColor, width: isActive ? "48px" : "32px" }}
                  />
                  <p className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: b.textDim }}>{b.tag}</p>
                </div>
                <div style={{ opacity: isInactive ? 0.5 : 1, transition: "opacity 0.4s ease" }}>
                  {logo}
                </div>
              </div>

              <div>
                <h3
                  className="font-display font-extrabold leading-tight mb-4"
                  style={{
                    color: b.accent,
                    fontSize: isActive ? "clamp(28px, 3vw, 40px)" : "clamp(22px, 2.2vw, 30px)",
                    transition: "font-size 0.4s ease",
                  }}
                >
                  {b.headline.map((line, j) => <span key={j}>{line}<br /></span>)}
                </h3>

                <div style={{
                  maxHeight: isActive ? "200px" : "0px",
                  opacity: isActive ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
                }}>
                  <p className="text-[14px] leading-relaxed mb-6" style={{ color: b.textDim }}>
                    {b.body}
                  </p>
                  <div className="mb-7">
                    <div className="font-display font-extrabold text-[22px] leading-none" style={{ color: b.accentHighlight }}>{b.stat.v}</div>
                    <div className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: b.textDim }}>{b.stat.l}</div>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); navigate(b.page); }}
                  className={`inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors ${b.ctaStyle}`}
                  style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s" }}
                >
                  {b.cta}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#1A1A1A] px-6 sm:px-10 py-5">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/45 text-[12px] leading-relaxed">
            <span className="text-[#F5B300] font-semibold">One trusted kitchen.</span>{" "}
            A personalised fresh-plan or a fast, flexible frozen-meal experience.
          </p>
          <div className="flex gap-6">
            {["about", "meal-plan-landing", "ready-series"].map((p, i) => (
              <button key={p} onClick={() => navigate(p as Page)}
                className="text-white/25 text-[10px] font-mono tracking-widest uppercase hover:text-white/60 transition-colors">
                {["PM", "Meal Plan", "Ready"][i]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export default function HomePage({ navigate, navigateToWizard }: Props) {
  const [slide, setSlide] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [slideAnim, setSlideAnim] = useState(true);
  const brandsRef = useRef<HTMLDivElement>(null);
  const [brandsVisible, setBrandsVisible] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  /* Auto-advance carousel */
  useEffect(() => {
    const t = setInterval(() => {
      setSlideAnim(false);
      setTimeout(() => {
        setSlide((s) => (s + 1) % SLIDES.length);
        setSlideAnim(true);
      }, 50);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = brandsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setBrandsVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const goPrev = () => { setSlideAnim(false); setTimeout(() => { setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length); setSlideAnim(true); }, 50); };
  const goNext = () => { setSlideAnim(false); setTimeout(() => { setSlide((s) => (s + 1) % SLIDES.length); setSlideAnim(true); }, 50); };

  const s = SLIDES[slide];

  return (
    <div className="bg-white text-[#1A1A1A] overflow-x-hidden">

      {/* ── CAROUSEL HERO ── */}
      <section className="relative bg-white overflow-hidden" style={{ minHeight: "670px" }}>
        <div className="absolute inset-y-0 right-0 w-[47%] transition-opacity duration-500" style={{ opacity: slideAnim ? 1 : 0 }}>
          <img key={slide} src={s.img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-y-0 right-[47%] w-5 bg-[#F5B300] z-10" />
        <div className="relative z-10 max-w-none px-14 sm:px-16 py-14 sm:py-20 flex flex-col justify-between" style={{ minHeight: "670px", maxWidth: "53%" }}>
          <div>
            <p className="text-[#1A1A1A] text-[12px] font-medium tracking-[0.06em] mb-10" style={{ opacity: heroVisible ? 1 : 0, fontFamily: "Inter, sans-serif" }}>{s.eyebrow}</p>
            <h1 className="font-display font-bold leading-[0.84] mb-8" style={{ fontSize: "clamp(48px, 6.5vw, 84px)", letterSpacing: "-0.03em", color: "#1A1A1A", opacity: slideAnim ? 1 : 0, transform: slideAnim ? "none" : "translateY(12px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
              {s.headline.map((line, i) => <span key={i} className="block">{line}</span>)}
            </h1>
            <p className="text-[#1A1A1A] leading-[1.45] mb-12 max-w-[480px]" style={{ fontSize: "clamp(16px, 1.4vw, 20px)", fontFamily: "Inter, sans-serif", opacity: slideAnim ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}>{s.sub}</p>
            <div className="flex flex-wrap gap-3" style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }}>
              <button onClick={() => navigate("ready-series")} className="h-12 px-7 bg-[#1A1A1A] text-white text-[12px] font-medium tracking-[0.01em] rounded-full hover:bg-[#333] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>BROWSE READY SERIES</button>
              <button onClick={() => navigateToWizard?.()} className="h-12 px-7 bg-[#E85D04] text-white text-[12px] font-medium tracking-[0.01em] rounded-full hover:bg-[#c94e00] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>EXPLORE MEAL PLAN</button>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-4" style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}>
            <p className="text-[#7A7A75] text-[11px] font-medium tracking-[0.034em]" style={{ fontFamily: "Inter, sans-serif" }}>ONE TRUSTED STANDARD. TWO CLEAR OFFERS.</p>
            <div className="flex items-center gap-4">
              <div className="relative h-[2px] w-[240px] bg-[#1A1A1A]/15 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-[#F5B300] rounded-full transition-all duration-300" style={{ width: `${((slide + 1) / SLIDES.length) * 100}%` }} />
              </div>
              <span className="text-[#7A7A75] text-[12px] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>0{slide + 1} / 0{SLIDES.length}</span>
              <span className="text-[#7A7A75] text-[11px]" style={{ fontFamily: "Inter, sans-serif" }}>AUTO 07s</span>
              <div className="flex gap-2 ml-auto">
                <button onClick={goPrev} className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-white transition-colors shadow-sm">←</button>
                <button onClick={goNext} className="w-11 h-11 bg-[#F5B300] rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#e5a800] transition-colors">→</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 CHOOSE HOW PERFORMANCE MEALS WORKS FOR YOU ── */}
      <section className="bg-[#F7F4EB] overflow-hidden py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1380px] mx-auto">
          {/* Header */}
          <div className="flex items-baseline gap-10 mb-6">
            <span className="font-display font-bold text-[#1A1A1A]" style={{ fontSize: "72px", lineHeight: 1, letterSpacing: "-0.03em" }}>01</span>
            <span className="text-[#1A1A1A] text-[11px] font-medium tracking-[0.05em]" style={{ fontFamily: "Inter, sans-serif" }}>ONE STANDARD. TWO DISTINCT EXPERIENCES.</span>
          </div>

          <h2 className="font-display font-bold text-[#1A1A1A] mb-5" style={{ fontSize: "clamp(36px, 4.5vw, 57px)", lineHeight: 0.92, letterSpacing: "-0.021em" }}>
            <span className="block">CHOOSE HOW</span>
            <span className="block">PERFORMANCE MEALS</span>
            <span className="block">WORKS FOR YOU.</span>
          </h2>

          <p className="text-[#7A7A75] leading-[1.45] mb-12 max-w-[500px]" style={{ fontSize: "16px", fontFamily: "Inter, sans-serif" }}>
            Same belief. Same quality standard. Different jobs for different routines.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Ready Series card */}
            <div className="bg-[#1A1A1A] overflow-hidden flex" style={{ minHeight: "264px" }}>
              <div className="w-[270px] flex-shrink-0 relative">
                <img src={imgReady} alt="Ready Series" className="w-full h-full object-cover" style={{ minHeight: "264px" }} />
              </div>
              <div className="w-2 flex-shrink-0 bg-[#F5B300]" />
              <div className="flex-1 px-8 py-6 flex flex-col justify-between">
                <div>
                  <p className="text-[#F5B300] text-[11px] font-medium tracking-[0.04em] mb-3" style={{ fontFamily: "Inter, sans-serif" }}>READY SERIES</p>
                  <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: "30px", lineHeight: 0.95, letterSpacing: "-0.012em" }}>
                    <span className="block">EVERYDAY</span>
                    <span className="block">MOMENTUM.</span>
                  </h3>
                  <p className="text-white leading-[1.42]" style={{ fontSize: "13px", fontFamily: "Inter, sans-serif" }}>
                    Frozen convenience for changing schedules. Fast, flexible and dependable.
                  </p>
                </div>
                <button
                  onClick={() => navigate("ready-series")}
                  className="text-white text-[12px] font-medium tracking-[0.012em] text-left hover:text-[#F5B300] transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  EXPLORE READY SERIES  →
                </button>
              </div>
            </div>

            {/* Meal Plan card */}
            <div className="bg-white overflow-hidden flex" style={{ minHeight: "264px" }}>
              <div className="w-[286px] flex-shrink-0 relative">
                <img src={imgMeal} alt="Meal Plan" className="w-full h-full object-cover" style={{ minHeight: "264px" }} />
              </div>
              <div className="w-2 flex-shrink-0 bg-[#E85D04]" />
              <div className="flex-1 px-8 py-6 flex flex-col justify-between">
                <div>
                  <p className="text-[#E85D04] text-[11px] font-medium tracking-[0.04em] mb-3" style={{ fontFamily: "Inter, sans-serif" }}>MEAL PLAN</p>
                  <h3 className="font-display font-bold text-[#1A1A1A] mb-4" style={{ fontSize: "30px", lineHeight: 0.95, letterSpacing: "-0.012em" }}>
                    <span className="block">BOUTIQUE</span>
                    <span className="block">PROGRESS.</span>
                  </h3>
                  <p className="text-[#1A1A1A] leading-[1.42]" style={{ fontSize: "13px", fontFamily: "Inter, sans-serif" }}>
                    Fresh structure, personal guidance and support around a clear goal.
                  </p>
                </div>
                <button
                  onClick={() => navigateToWizard?.()}
                  className="text-[#1A1A1A] text-[12px] font-medium tracking-[0.012em] text-left hover:text-[#E85D04] transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  EXPLORE MEAL PLAN  →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 02 THE STANDARD BEHIND EVERY MEAL ── */}
      <section className="bg-[#1A1A1A] overflow-hidden" style={{ minHeight: "590px" }}>
        <div className="flex flex-col lg:flex-row" style={{ minHeight: "590px" }}>
          <div className="flex-1 px-14 sm:px-16 py-16 sm:py-20 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-10 mb-10">
                <span className="font-display font-bold text-[#F5B300]" style={{ fontSize: "72px", lineHeight: 1, letterSpacing: "-0.03em" }}>02</span>
                <span className="text-[#F5B300] text-[11px] font-medium tracking-[0.05em]" style={{ fontFamily: "Inter, sans-serif" }}>THE PARENT BRAND</span>
              </div>
              <h2 className="font-display font-bold text-white mb-8" style={{ fontSize: "clamp(40px, 5vw, 63px)", lineHeight: 0.9, letterSpacing: "-0.023em" }}>
                <span className="block">THE STANDARD</span>
                <span className="block">BEHIND EVERY</span>
                <span className="block">MEAL.</span>
              </h2>
              <p className="text-white leading-[1.48] mb-8 max-w-[480px]" style={{ fontSize: "17px", fontFamily: "Inter, sans-serif" }}>
                Performance Meals sets the purpose, quality standard and experience behind everything we offer.
              </p>
              <p className="text-[#F5B300] text-[11px] font-medium tracking-[0.04em]" style={{ fontFamily: "Inter, sans-serif" }}>PRINCIPLED  •  GROUNDED</p>
            </div>
          </div>
          <div className="relative lg:w-[55%] flex-shrink-0" style={{ minHeight: "400px" }}>
            <img src={imgChef} alt="Chef preparing meals" className="w-full h-full object-cover" style={{ minHeight: "400px" }} />
            <div className="absolute bottom-0 left-0 right-0 bg-[rgba(26,26,26,0.90)] px-8 py-8">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: "01", title: "CHEF-LED RECIPES", sub: "Craft-led food." },
                  { num: "02", title: "CLEAR NUTRITION", sub: "Visible macros & ingredients." },
                  { num: "03", title: "QUALITY CONTROL", sub: "Kitchen to doorstep." },
                ].map((p) => (
                  <div key={p.num}>
                    <p className="text-[#F5B300] text-[10px] tracking-[0.01em] mb-3" style={{ fontFamily: "Inter, sans-serif" }}>{p.num}</p>
                    <p className="text-white text-[13px] font-medium leading-[1.1] mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{p.title}</p>
                    <p className="text-[#C2C2BA] text-[11px] leading-[1.35]" style={{ fontFamily: "Inter, sans-serif" }}>{p.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 BRAND FAMILY (unchanged) ── */}
      <BrandFamilySection brandsRef={brandsRef} brandsVisible={brandsVisible} navigate={navigate} />

      {/* ── 05 CONVENIENCE WITHOUT COMPROMISE ── */}
      <section className="bg-white overflow-hidden" style={{ minHeight: "690px" }}>
        <div className="flex flex-col lg:flex-row" style={{ minHeight: "690px" }}>

          {/* Left: image */}
          <div className="lg:w-[47%] flex-shrink-0 relative" style={{ minHeight: "360px" }}>
            <img src={imgKitchen} alt="Performance Meals food" className="w-full h-full object-cover" style={{ minHeight: "360px" }} />
          </div>

          {/* Yellow spine */}
          <div className="hidden lg:block w-5 flex-shrink-0 bg-[#F5B300]" />

          {/* Right: text */}
          <div className="flex-1 px-12 sm:px-16 py-16 sm:py-20 flex flex-col justify-center">
            {/* Number + tag */}
            <div className="flex items-baseline gap-8 mb-8">
              <span className="font-display font-bold text-[#F5B300]" style={{ fontSize: "72px", lineHeight: 1, letterSpacing: "-0.03em" }}>04</span>
              <span className="text-[#1A1A1A] text-[11px] font-medium tracking-[0.05em]" style={{ fontFamily: "Inter, sans-serif" }}>FOOD FIRST. PERFORMANCE FOLLOWS.</span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-bold text-[#1A1A1A] mb-8" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 0.92, letterSpacing: "-0.022em" }}>
              <span className="block">CONVENIENCE</span>
              <span className="block">WITHOUT</span>
              <span className="block">COMPROMISE.</span>
            </h2>

            {/* Body */}
            <p className="text-[#7A7A75] leading-[1.5] mb-10 max-w-[500px]" style={{ fontSize: "17px", fontFamily: "Inter, sans-serif" }}>
              Convenient food should still respect the ingredients, the craft and the person eating it. That principle shapes every Performance Meals experience.
            </p>

            {/* Rule */}
            <div className="h-px bg-[#1A1A1A]/13 w-full max-w-[510px] mb-8" />

            {/* Mission */}
            <p className="text-[#F5B300] text-[11px] font-medium tracking-[0.04em] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>OUR MISSION</p>
            <p className="text-[#1A1A1A] leading-[1.3] max-w-[500px]" style={{ fontSize: "20px", fontFamily: "Outfit, sans-serif", fontWeight: 500, letterSpacing: "-0.003em" }}>
              To deliver exceptional meals and thoughtful support that make healthy eating easier every day.
            </p>
          </div>
        </div>
      </section>

      {/* ── 06 CLOSING CTA ── */}
      <section className="bg-[#F5B300] overflow-hidden px-16 py-16 sm:py-20 relative" style={{ minHeight: "442px" }}>
        <div className="max-w-[1380px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">

          {/* Left */}
          <div className="max-w-[700px]">
            <p className="text-[#1A1A1A] text-[11px] font-medium tracking-[0.05em] mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
              PERFORMANCE MEALS
            </p>
            <h2 className="font-display font-bold text-[#1A1A1A] mb-6" style={{ fontSize: "clamp(36px, 4vw, 55px)", lineHeight: 0.92, letterSpacing: "-0.021em" }}>
              <span className="block">ONE TRUSTED STANDARD.</span>
              <span className="block">TWO WAYS TO LIVE IT.</span>
            </h2>
            <p className="text-[#1A1A1A] leading-[1.45] mb-10 max-w-[460px]" style={{ fontSize: "17px", fontFamily: "Inter, sans-serif" }}>
              Choose the experience that fits the way you want to eat.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("ready-series")}
                className="h-12 px-7 bg-[#1A1A1A] text-white text-[12px] font-medium tracking-[0.01em] rounded-full hover:bg-[#333] transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                BROWSE READY SERIES
              </button>
              <button
                onClick={() => navigateToWizard?.()}
                className="h-12 px-7 bg-[#E85D04] text-white text-[12px] font-medium tracking-[0.01em] rounded-full hover:bg-[#c94e00] transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                EXPLORE MEAL PLAN
              </button>
            </div>
          </div>

          {/* Right: large wordmark */}
          <div className="lg:text-right">
            <p className="text-[#1A1A1A] text-[11px] font-medium tracking-[0.04em] mb-4 lg:text-right" style={{ fontFamily: "Inter, sans-serif" }}>
              PRINCIPLED  •  GROUNDED
            </p>
            <div className="font-display font-bold text-[#1A1A1A] leading-[0.87]" style={{ fontSize: "clamp(36px, 4vw, 50px)", letterSpacing: "-0.02em" }}>
              <span className="block">PERFORMANCE</span>
              <span className="block">MEALS</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER STRIP (keep as-is) ── */}
      <div className="bg-[#1A1A1A] border-t border-[#1A1A1A]/10 py-10 px-6 sm:px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <PerformanceMealsLogo size="sm" variant="dark" />
            <span className="text-white/30 text-[11px] font-mono">performancemeals.com.sg</span>
          </div>
          <div className="flex gap-5 text-[10px] font-mono tracking-widest uppercase text-white/30">
            {[
              { l: "About",        p: "about" as Page },
              { l: "Ready-Series", p: "ready-series" as Page },
              { l: "Meal Plan",    p: "meal-plan-landing" as Page },
            ].map((item) => (
              <button key={item.l} onClick={() => navigate(item.p)} className="hover:text-white/70 transition-colors">{item.l}</button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
