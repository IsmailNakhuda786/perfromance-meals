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

      {/* Section header */}
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

      {/* Accordion panels */}
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
              {/* Giant decorative number */}
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

              {/* Top: tag + accent bar + logo */}
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

              {/* Bottom: headline + body + cta */}
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

                {/* Body — slides in when active */}
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

      {/* Bottom bar */}
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

export default function HomePage({ navigate, navigateToWizard }: Props) {
  const [activeMilestone, setActiveMilestone] = useState(3);
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

  const storySection        = useReveal();
  const testimonialsSection = useReveal();

  const scrollToBrands = () => brandsRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-white text-[#1A1A1A] overflow-x-hidden">

      {/* ── HERO — custom performance brand visual ── */}
      <section className="relative bg-[#FFFDF7] text-[#1A1A1A] min-h-[92svh] flex items-center overflow-hidden">

        {/* Subtle background grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(245,179,0,0.10) 1px,transparent 1px),linear-gradient(90deg,rgba(245,179,0,0.10) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />

        {/* Yellow glow — bottom right */}
        <div className="absolute bottom-0 right-0 w-[700px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 85% 95%, rgba(245,179,0,0.18) 0%, transparent 60%)" }} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT — brand text ── */}
          <div>
            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
              <PerformanceMealsLogo size="lg" variant="dark" />
            </div>

            <div className="mt-10" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "120ms" }}>
              <p className="text-[11px] font-mono tracking-[0.45em] uppercase text-[#F5B300] mb-5">Singapore · Est. 2019 · Macro-tracked</p>
              <h1 className="font-display text-[44px] sm:text-[60px] lg:text-[72px] font-extrabold leading-[0.88] mb-8 text-[#1A1A1A]">
                Nutrition that works<br />
                <span className="text-[#F5B300]">as hard as you do.</span>
              </h1>
            </div>

            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "260ms" }}>
              <p className="text-[#1A1A1A]/55 text-[16px] sm:text-[17px] leading-relaxed max-w-[440px] mb-10">
                40+ macro-tracked meals. Chef-prepared daily in Singapore. One performance standard — two ways to eat well.
              </p>
            </div>

            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "380ms" }}>
              <button onClick={scrollToBrands}
                className="group inline-flex items-center gap-4 px-8 py-5 bg-[#F5B300] text-[#1A1A1A] font-extrabold text-[12px] tracking-[0.2em] uppercase hover:bg-white transition-colors">
                Explore Our Brands
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                  className="transition-transform group-hover:translate-y-1"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              </button>
            </div>

            {/* Proof stats row */}
            <div className="mt-12 flex flex-wrap gap-8 border-t border-[#1A1A1A]/10 pt-10"
              style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.8s ease", transitionDelay: "600ms" }}>
              {[
                { v: "8,400+", l: "Active customers" },
                { v: "4.9★",   l: "Average rating" },
                { v: "40+",    l: "Macro meals" },
                { v: "5 yrs",  l: "Serving Singapore" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-[22px] font-extrabold text-[#F5B300] leading-none">{s.v}</div>
                  <div className="text-[#1A1A1A]/40 text-[10px] font-mono uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — custom performance brand graphic ── */}
          <div className="hidden lg:flex items-center justify-center"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateX(20px)", transition: "opacity 1s ease, transform 1s ease", transitionDelay: "450ms" }}>
            <div className="relative w-[460px] h-[460px]">

              {/* Central SVG performance ring graphic */}
              <svg viewBox="0 0 460 460" className="absolute inset-0 w-full h-full" aria-hidden="true">
                {/* Outermost decorative ring */}
                <circle cx="230" cy="230" r="218" fill="none" stroke="rgba(245,179,0,0.06)" strokeWidth="1" />

                {/* Main performance arc — yellow, 82% */}
                <circle cx="230" cy="230" r="200" fill="none" stroke="rgba(245,179,0,0.18)" strokeWidth="12" />
                <circle cx="230" cy="230" r="200" fill="none" stroke="#F5B300" strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 200 * 0.82} ${2 * Math.PI * 200}`}
                  strokeLinecap="round" transform="rotate(-100 230 230)" />

                {/* Secondary inner ring — protein track */}
                <circle cx="230" cy="230" r="170" fill="none" stroke="rgba(26,26,26,0.06)" strokeWidth="8" />
                <circle cx="230" cy="230" r="170" fill="none" stroke="rgba(245,179,0,0.35)" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 170 * 0.68} ${2 * Math.PI * 170}`}
                  strokeLinecap="round" transform="rotate(-90 230 230)" />

                {/* Tertiary ring — carbs */}
                <circle cx="230" cy="230" r="142" fill="none" stroke="rgba(26,26,26,0.06)" strokeWidth="6" />
                <circle cx="230" cy="230" r="142" fill="none" stroke="rgba(245,179,0,0.20)" strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 142 * 0.55} ${2 * Math.PI * 142}`}
                  strokeLinecap="round" transform="rotate(-90 230 230)" />

                {/* Centre fill */}
                <circle cx="230" cy="230" r="118" fill="#FFFDF7" />

                {/* Centre brand mark — yellow circle + PM */}
                <circle cx="230" cy="230" r="62" fill="#F5B300" />
                <circle cx="230" cy="230" r="55" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeOpacity="0.15" />
                <text x="230" y="218" textAnchor="middle" fill="#1A1A1A" fontSize="22" fontWeight="900" fontFamily="Outfit, sans-serif" letterSpacing="-1">PM</text>
                <text x="230" y="237" textAnchor="middle" fill="rgba(26,26,26,0.55)" fontSize="8.5" fontFamily="Inter, sans-serif" letterSpacing="3">PERFORMANCE</text>
                <text x="230" y="250" textAnchor="middle" fill="rgba(26,26,26,0.55)" fontSize="8.5" fontFamily="Inter, sans-serif" letterSpacing="3">MEALS</text>

                {/* Ring labels */}
                {/* Protein — top */}
                <text x="230" y="20" textAnchor="middle" fill="#F5B300" fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif" letterSpacing="2">PROTEIN</text>
                <text x="230" y="34" textAnchor="middle" fill="rgba(26,26,26,0.40)" fontSize="8.5" fontFamily="Inter, sans-serif">40g+ per meal</text>

                {/* Fresh — right */}
                <text x="452" y="218" textAnchor="end" fill="#F5B300" fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif" letterSpacing="2">FRESH</text>
                <text x="452" y="232" textAnchor="end" fill="rgba(26,26,26,0.40)" fontSize="8.5" fontFamily="Inter, sans-serif">Daily prep</text>

                {/* Goal-led — bottom */}
                <text x="230" y="440" textAnchor="middle" fill="#F5B300" fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif" letterSpacing="2">GOAL-LED</text>
                <text x="230" y="454" textAnchor="middle" fill="rgba(26,26,26,0.40)" fontSize="8.5" fontFamily="Inter, sans-serif">Structured or flexible</text>

                {/* Macro — left */}
                <text x="8" y="218" textAnchor="start" fill="#F5B300" fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif" letterSpacing="2">MACRO</text>
                <text x="8" y="232" textAnchor="start" fill="rgba(26,26,26,0.40)" fontSize="8.5" fontFamily="Inter, sans-serif">Tracked meals</text>
              </svg>

              {/* Floating data badge — top right */}
              <div className="absolute -top-2 -right-4 bg-[#1A1A1A] border border-[#1A1A1A]/10 px-4 py-3 min-w-[110px]">
                <div className="text-[#F5B300] font-display font-extrabold text-[22px] leading-none">40+</div>
                <div className="text-white/55 text-[9px] font-mono uppercase tracking-widest mt-1">Meal options</div>
              </div>

              {/* Floating data badge — bottom left */}
              <div className="absolute -bottom-2 -left-4 bg-[#F5B300] px-4 py-3 min-w-[120px]">
                <div className="text-[#1A1A1A] font-display font-extrabold text-[22px] leading-none">8,400+</div>
                <div className="text-[#1A1A1A]/60 text-[9px] font-mono uppercase tracking-widest mt-1 font-bold">Active customers</div>
              </div>

              {/* Floating brand label — bottom right */}
              <div className="absolute bottom-12 -right-6 flex items-center gap-2">
                <div className="h-px w-8 bg-[#F5B300]/60" />
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#1A1A1A]/30">Singapore · Est. 2019</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-6 sm:left-10 flex items-center gap-3 z-10"
          style={{ opacity: heroVisible ? 0.4 : 0, transition: "opacity 1.2s ease", transitionDelay: "900ms" }}>
          <div className="w-px h-10 bg-[#1A1A1A]/20 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#1A1A1A]/35">Scroll to explore</span>
        </div>
      </section>


      {/* ── BRAND FAMILY ── */}
      <BrandFamilySection brandsRef={brandsRef} brandsVisible={brandsVisible} navigate={navigate} />

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
      <section ref={testimonialsSection.ref} className="py-20 sm:py-28 bg-[#FAF9F6] border-t border-[#E8E4DC]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className={`mb-12 transition-all duration-700 ${testimonialsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-3">Real results</p>
            <h2 className="font-display text-[38px] font-extrabold text-[#1A1A1A] leading-tight">What our customers say.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}
                className={`bg-white border border-[#E8E4DC] p-8 hover:border-[#F5B300]/50 transition-all duration-500 ${testimonialsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: testimonialsSection.visible ? `${i * 120}ms` : "0ms" }}>
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, j) => <span key={j} className="text-[#F5B300] text-[14px]">★</span>)}
                </div>
                <p className="text-[#555] text-[14px] leading-relaxed italic mb-6">"{t.text}"</p>
                <div className="font-semibold text-[#1A1A1A] text-[13px]">{t.name}</div>
                <div className="text-[#1A1A1A]/35 text-[11px] mt-0.5 font-mono">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


{/* ── FOOTER STRIP ── */}
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
