import { useState, useRef } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const MEALS = [
  {
    id: 1, name: "Herb Grilled Chicken & Brown Rice", cat: "high-carb",
    price: 12.40, protein: 42, carbs: 55, fat: 8, cal: 460,
    rating: 4.9, reviews: 284, badge: "Bestseller",
    img: "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?w=600&h=500&fit=crop&auto=format",
  },
  {
    id: 2, name: "Chilli Lime Chicken & Cauliflower Rice", cat: "low-carb",
    price: 12.40, protein: 40, carbs: 14, fat: 10, cal: 310,
    rating: 4.8, reviews: 196, badge: "Low Carb",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=500&fit=crop&auto=format",
  },
  {
    id: 3, name: "Smoked Salmon Scrambled Eggs", cat: "breakfast",
    price: 11.90, protein: 28, carbs: 8, fat: 16, cal: 290,
    rating: 4.7, reviews: 143, badge: "Breakfast",
    img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=500&fit=crop&auto=format",
  },
  {
    id: 4, name: "Teriyaki Chicken & Jasmine Rice", cat: "high-carb",
    price: 12.40, protein: 38, carbs: 52, fat: 10, cal: 450,
    rating: 4.9, reviews: 312, badge: "New",
    img: "https://images.unsplash.com/photo-1772693471187-6e7d364f99ee?w=600&h=500&fit=crop&auto=format",
  },
  {
    id: 5, name: "Assorted Meal Prep Bundle ×5", cat: "bundle",
    price: 58.00, protein: 200, carbs: 220, fat: 50, cal: 2200,
    rating: 4.9, reviews: 421, badge: "Bundle",
    img: "https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=600&h=500&fit=crop&auto=format",
  },
  {
    id: 6, name: "Lemon Herb Turkey Breast", cat: "just-protein",
    price: 11.90, protein: 46, carbs: 6, fat: 6, cal: 270,
    rating: 4.7, reviews: 98, badge: "Just Protein",
    img: "https://images.unsplash.com/photo-1563438962385-0d3dd8319200?w=600&h=500&fit=crop&auto=format",
  },
];

const CATS = [
  { id: "all", label: "All Meals" },
  { id: "low-carb", label: "Low Carb" },
  { id: "high-carb", label: "High Carb" },
  { id: "breakfast", label: "Breakfast" },
  { id: "just-protein", label: "Just Protein" },
  { id: "bundle", label: "Bundles" },
];

const PLANS = [
  {
    name: "CUT", cal: 1500, protein: 130, carbs: 120, fat: 45, meals: 3,
    priceWeek: 148, priceMonth: 520,
    desc: "Structured deficit for steady, sustainable fat loss without sacrificing muscle.",
    accent: "#CDFF3A", featured: false,
  },
  {
    name: "MAINTAIN", cal: 2000, protein: 160, carbs: 190, fat: 60, meals: 4,
    priceWeek: 178, priceMonth: 625,
    desc: "Calibrated to your TDEE — optimal fueling for daily performance and recovery.",
    accent: "#F2C94C", featured: true,
  },
  {
    name: "BUILD", cal: 2500, protein: 190, carbs: 260, fat: 75, meals: 5,
    priceWeek: 208, priceMonth: 729,
    desc: "Clean surplus with high-protein loading designed for serious muscle gain.",
    accent: "#7EE8B0", featured: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus T.", role: "Competitive Swimmer",
    text: "Been on Fresher for 6 months. My body composition has changed more in this period than the previous 2 years of training. The macros are genuinely accurate — every batch.",
    rating: 5, plan: "Meal Plan — Build",
  },
  {
    name: "Sarah L.", role: "Working Mum of Two",
    text: "Ready-to-Go meals have saved my week, every week. I grab 10 on Monday and I'm sorted. The low carb options taste far better than anything I would cook myself.",
    rating: 5, plan: "Ready Series",
  },
  {
    name: "Ryan K.", role: "CrossFit Athlete",
    text: "I run strict meal timing protocols and Fresher's USDA-standard macro labelling is the only brand I trust blindly. Consistency across every single batch.",
    rating: 5, plan: "Meal Plan — Maintain",
  },
];

const TRUST_ITEMS = [
  { icon: "🏛", label: "USDA Nutritional Standards" },
  { icon: "⚡", label: "Same-Day Delivery" },
  { icon: "❄️", label: "2-Month Freezer Life" },
  { icon: "🏋", label: "Trainer-Approved Macros" },
  { icon: "⭐", label: "4.8 · 2,400+ Reviews" },
];

// ── Icon helpers ─────────────────────────────────────────────────────────────

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function IconBag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function App() {
  const [activeCat, setActiveCat] = useState("all");
  const [activePlan, setActivePlan] = useState("MAINTAIN");
  const [billingCycle, setBillingCycle] = useState<"week" | "month">("week");
  const [hoveredMeal, setHoveredMeal] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartPop, setCartPop] = useState(false);

  const readyRef = useRef<HTMLElement>(null);
  const plansRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = () => {
    setCartCount((c) => c + 1);
    setCartPop(true);
    setTimeout(() => setCartPop(false), 1200);
  };

  const filteredMeals = activeCat === "all" ? MEALS : MEALS.filter((m) => m.cat === activeCat);

  return (
    <div ref={topRef} className="min-h-screen font-body bg-[#F7F5F0] text-[#111111]">

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#CDFF3A] text-[#111111] text-center py-2.5 text-[11px] tracking-[0.2em] uppercase font-semibold">
        August promo — use code <strong>SG61</strong> for $6.10 off your first order &nbsp;·&nbsp; Free delivery above $80
      </div>

      {/* ── STICKY NAV ── */}
      <nav className="sticky top-0 z-50 bg-[#111111] text-white shadow-xl">
        <div className="max-w-[1440px] mx-auto px-6 h-[60px] flex items-center justify-between gap-8">

          {/* Logo */}
          <button onClick={() => scrollTo(topRef)} className="font-display text-[22px] font-bold tracking-tight shrink-0">
            FRESHER<span className="text-[#CDFF3A]">.</span>
          </button>

          {/* Dept nav */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {/* Dept 01 */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => scrollTo(readyRef)}
                className="flex items-center gap-1.5 text-[#CDFF3A] text-[11px] tracking-[0.3em] uppercase font-semibold"
              >
                <span className="opacity-50 text-[9px]">01</span>
                Ready-to-Go
              </button>
              <div className="flex items-center gap-5 text-white/45 text-[11px] tracking-wider uppercase">
                {["Low Carb", "High Carb", "Breakfast", "Bundles"].map((l) => (
                  <button key={l} onClick={() => { setActiveCat(l.toLowerCase().replace(" ", "-")); scrollTo(readyRef); }}
                    className="hover:text-white transition-colors">{l}</button>
                ))}
              </div>
            </div>

            <div className="w-px h-6 bg-white/15" />

            {/* Dept 02 */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => scrollTo(plansRef)}
                className="flex items-center gap-1.5 text-[#F2C94C] text-[11px] tracking-[0.3em] uppercase font-semibold"
              >
                <span className="opacity-50 text-[9px]">02</span>
                Meal Plans
              </button>
              <div className="flex items-center gap-5 text-white/45 text-[11px] tracking-wider uppercase">
                {["Cut", "Maintain", "Build"].map((l) => (
                  <button key={l} onClick={() => { setActivePlan(l.toUpperCase()); scrollTo(plansRef); }}
                    className="hover:text-white transition-colors">{l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5 shrink-0">
            <button className="text-white/50 hover:text-white transition-colors hidden md:block">
              <IconSearch />
            </button>
            <button className="text-white/50 hover:text-white transition-colors text-[11px] tracking-[0.2em] uppercase hidden md:block">
              Rewards
            </button>
            <button
              className="relative text-white/50 hover:text-white transition-colors"
              onClick={addToCart}
            >
              <IconBag />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-2 -right-2 bg-[#CDFF3A] text-[#111111] text-[9px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center transition-transform ${cartPop ? "scale-125" : "scale-100"}`}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO — SPLIT PANEL ── */}
      <section className="h-[calc(100vh-84px)] grid grid-cols-1 md:grid-cols-2">

        {/* Left — Ready-to-Go */}
        <div
          className="relative overflow-hidden cursor-pointer group"
          onClick={() => scrollTo(readyRef)}
        >
          <img
            src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=1000&h=1100&fit=crop&auto=format"
            alt="Fresher Ready-to-Go meal prep containers"
            className="absolute inset-0 w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/30 group-hover:from-[#111111] group-hover:via-[#111111]/55 group-hover:to-[#111111]/10 transition-all duration-500" />

          <div className="relative h-full flex flex-col justify-between p-10 lg:p-14 text-white">
            <div>
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#CDFF3A] uppercase">
                01 / READY SERIES
              </span>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-5">
                Fresher Performance Meals
              </p>
              <h1 className="font-display text-[52px] lg:text-[68px] font-bold leading-[0.88] mb-7">
                Heat.<br />
                <span className="text-[#CDFF3A]">Eat.</span><br />
                Perform.
              </h1>
              <p className="text-white/60 text-[15px] max-w-[300px] mb-9 leading-relaxed">
                Macro-accurate frozen meals, ready in 3 minutes. No prep. No guesswork. Pure performance fuel.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2.5 bg-[#CDFF3A] text-[#111111] px-7 py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase group-hover:bg-white transition-colors duration-300">
                  Shop Meals <IconArrow />
                </span>
                <span className="text-white/35 text-[12px]">From $11.90 / meal</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-10 text-[11px] text-white/30 tracking-wider">
                <span>Same-day delivery</span>
                <span className="hidden sm:block">·</span>
                <span>2-month freezer life</span>
                <span className="hidden sm:block">·</span>
                <span>USDA standards</span>
              </div>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-8 right-8 w-10 h-10 border border-[#CDFF3A]/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-[#CDFF3A]"><IconArrow /></div>
          </div>
        </div>

        {/* Right — Meal Plans */}
        <div
          className="relative overflow-hidden cursor-pointer group"
          onClick={() => scrollTo(plansRef)}
        >
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&h=1100&fit=crop&auto=format"
            alt="Fresher Meal Plans fresh bowl"
            className="absolute inset-0 w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2818] via-[#0D2818]/75 to-[#0D2818]/35 group-hover:from-[#0D2818] group-hover:via-[#0D2818]/58 group-hover:to-[#0D2818]/15 transition-all duration-500" />

          <div className="relative h-full flex flex-col justify-between p-10 lg:p-14 text-white">
            <div>
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#F2C94C] uppercase">
                02 / MEAL PLANS
              </span>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-5">
                Fresher Performance Meals
              </p>
              <h1 className="font-display text-[52px] lg:text-[68px] font-bold leading-[0.88] mb-7">
                Your goal.<br />
                <span className="text-[#F2C94C]">Your</span><br />
                macros.
              </h1>
              <p className="text-white/60 text-[15px] max-w-[300px] mb-9 leading-relaxed">
                Chef-prepared fresh meals delivered daily, calibrated to your caloric target. Cut, Maintain, or Build.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2.5 bg-[#F2C94C] text-[#111111] px-7 py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase group-hover:bg-white transition-colors duration-300">
                  See Plans <IconArrow />
                </span>
                <span className="text-white/35 text-[12px]">From $148 / week</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-10 text-[11px] text-white/30 tracking-wider">
                <span>Delivered fresh daily</span>
                <span className="hidden sm:block">·</span>
                <span>Chef-prepared</span>
                <span className="hidden sm:block">·</span>
                <span>Trainer-approved</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 w-10 h-10 border border-[#F2C94C]/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-[#F2C94C]"><IconArrow /></div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="bg-[#0E0E0E] border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {TRUST_ITEMS.map((t) => (
            <div key={t.label} className="flex items-center gap-2.5 text-[11px] text-white/40 tracking-[0.15em] uppercase">
              <span className="text-[15px]">{t.icon}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* DEPARTMENT 01 — READY-TO-GO                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section ref={readyRef} className="bg-[#0E0E0E] text-white py-24">
        <div className="max-w-[1440px] mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase">
                  01 / READY SERIES
                </span>
                <div className="h-px w-20 bg-[#CDFF3A]/25" />
              </div>
              <h2 className="font-display text-[56px] lg:text-[72px] font-bold leading-none tracking-tight">
                Ready-to-Go
              </h2>
              <p className="text-white/45 mt-4 text-[15px] max-w-lg leading-relaxed">
                Vacuum-sealed at peak nutrition. Chilled, never compromised. Heat in 3 minutes and hit your macros exactly.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#CDFF3A] text-[12px] tracking-[0.2em] uppercase font-semibold hover:gap-4 transition-all whitespace-nowrap"
            >
              View Full Menu <IconArrow />
            </a>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-1">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCat === c.id
                    ? "bg-[#CDFF3A] text-[#111111]"
                    : "border border-white/12 text-white/40 hover:border-white/35 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Meals grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="group relative bg-[#1A1A1A] overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredMeal(meal.id)}
                onMouseLeave={() => setHoveredMeal(null)}
              >
                {/* Badge */}
                {meal.badge && (
                  <div
                    className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-bold ${
                      meal.badge === "Bestseller"
                        ? "bg-[#CDFF3A] text-[#111111]"
                        : meal.badge === "Bundle"
                          ? "bg-[#F2C94C] text-[#111111]"
                          : "bg-black/50 text-white backdrop-blur-sm border border-white/10"
                    }`}
                  >
                    {meal.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-52 bg-[#222] overflow-hidden">
                  <img
                    src={meal.img}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {hoveredMeal === meal.id && (
                    <div className="absolute inset-0 bg-[#111111]/60 flex items-center justify-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(); }}
                        className="bg-[#CDFF3A] text-[#111111] px-6 py-3 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors"
                      >
                        + Add to Cart
                      </button>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="text-[14px] font-medium leading-snug">{meal.name}</h3>
                    <span className="text-[#CDFF3A] font-bold text-[15px] whitespace-nowrap font-mono">
                      ${meal.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-1 mb-4">
                    {[
                      { label: "CAL", val: meal.cal },
                      { label: "PRO", val: `${meal.protein}g` },
                      { label: "CARB", val: `${meal.carbs}g` },
                      { label: "FAT", val: `${meal.fat}g` },
                    ].map((m) => (
                      <div key={m.label} className="bg-[#252525] px-1.5 py-2 text-center">
                        <div className="font-mono text-[9px] text-white/25 mb-0.5 tracking-wider">{m.label}</div>
                        <div className="font-mono text-[11px] text-white font-medium">{m.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Rating + CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-white/35">
                      <span className="text-[#CDFF3A] text-[12px]">{"★".repeat(Math.round(meal.rating))}</span>
                      <span>{meal.rating} ({meal.reviews})</span>
                    </div>
                    <button
                      onClick={addToCart}
                      className="text-[11px] text-white/30 hover:text-[#CDFF3A] transition-colors tracking-wider uppercase"
                    >
                      Quick add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle CTA strip */}
          <div className="mt-12 border border-[#CDFF3A]/15 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#CDFF3A] mb-2 uppercase">Save more with bundles</div>
              <h3 className="font-display text-[28px] font-bold">5-Meal Bundle — <span className="text-[#CDFF3A]">$58.00</span></h3>
              <p className="text-white/40 text-[13px] mt-1">Mix and match any 5 meals. Save $4 vs individual pricing.</p>
            </div>
            <button
              onClick={() => { setActiveCat("bundle"); }}
              className="inline-flex items-center gap-2.5 bg-[#CDFF3A] text-[#111111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors whitespace-nowrap"
            >
              Build My Bundle <IconArrow />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* DEPARTMENT 02 — MEAL PLANS                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section ref={plansRef} className="bg-[#0D2818] text-white py-24">
        <div className="max-w-[1440px] mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-[0.45em] text-[#F2C94C] uppercase">
                  02 / MEAL PLANS
                </span>
                <div className="h-px w-20 bg-[#F2C94C]/25" />
              </div>
              <h2 className="font-display text-[56px] lg:text-[72px] font-bold leading-none tracking-tight">
                Meal Plans
              </h2>
              <p className="text-white/45 mt-4 text-[15px] max-w-lg leading-relaxed">
                Choose your goal. We build your daily menu, cook it fresh, and deliver it every morning.
              </p>
            </div>

            {/* Billing toggle */}
            <div className="flex items-center gap-1 bg-white/8 p-1 self-start md:self-auto">
              {(["week", "month"] as const).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase font-medium transition-all ${
                    billingCycle === cycle
                      ? "bg-[#F2C94C] text-[#111111]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {cycle === "week" ? "Weekly" : (
                    <span>Monthly <span className="text-[#7EE8B0] text-[10px]">–12%</span></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                onClick={() => setActivePlan(plan.name)}
                className={`relative p-8 cursor-pointer transition-all duration-300 border ${
                  activePlan === plan.name
                    ? "border-[#F2C94C]/60 bg-white/5"
                    : "border-white/10 hover:border-white/25 hover:bg-white/3"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-8">
                    <span className="bg-[#F2C94C] text-[#111111] px-3 py-1 text-[9px] tracking-[0.25em] uppercase font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-6 gap-2">
                  <div>
                    <span
                      className="font-mono text-[10px] tracking-[0.35em] uppercase font-semibold"
                      style={{ color: plan.accent }}
                    >
                      {plan.name}
                    </span>
                    <div className="font-display text-[42px] font-bold mt-1 leading-none">
                      {plan.cal}
                      <span className="text-[18px] font-normal text-white/35"> kcal/day</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className="font-display text-[36px] font-bold leading-none"
                      style={{ color: plan.accent }}
                    >
                      ${billingCycle === "week" ? plan.priceWeek : plan.priceMonth}
                    </div>
                    <div className="text-white/35 text-[11px] mt-1 tracking-wider uppercase">
                      /{billingCycle}
                    </div>
                  </div>
                </div>

                <p className="text-white/45 text-[13px] leading-relaxed mb-6">{plan.desc}</p>

                {/* Macro breakdown */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: "Protein", val: `${plan.protein}g` },
                    { label: "Carbs", val: `${plan.carbs}g` },
                    { label: "Fat", val: `${plan.fat}g` },
                  ].map((m) => (
                    <div key={m.label} className="text-center border border-white/10 py-3">
                      <div className="font-mono text-[12px] font-medium" style={{ color: plan.accent }}>
                        {m.val}
                      </div>
                      <div className="text-white/25 text-[9px] mt-1 uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="text-white/30 text-[11px] mb-6 tracking-wide">
                  {plan.meals} meals per day &nbsp;·&nbsp; Fresh daily delivery
                </div>

                <button
                  className="w-full py-3 text-[11px] tracking-[0.18em] uppercase font-bold transition-all duration-200"
                  style={{
                    backgroundColor: activePlan === plan.name ? plan.accent : "transparent",
                    color: activePlan === plan.name ? "#111111" : "rgba(255,255,255,0.4)",
                    border: `1.5px solid ${activePlan === plan.name ? plan.accent : "rgba(255,255,255,0.12)"}`,
                  }}
                >
                  {activePlan === plan.name ? "✓ Selected" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="border-t border-white/8 pt-16">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-[10px] tracking-[0.45em] text-[#F2C94C] uppercase">
                How It Works
              </span>
              <div className="h-px flex-1 bg-white/8" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Choose Your Goal", desc: "Cut, Maintain, or Build. Tell us your target and we calculate your exact daily macros." },
                { step: "02", title: "Customise Your Menu", desc: "Pick from our rotating fresh menu or let our nutrition team curate the optimal selection." },
                { step: "03", title: "Delivered Fresh Daily", desc: "Chef-prepared meals arrive at your door each morning in insulated, eco-friendly packaging." },
                { step: "04", title: "Track & Adjust", desc: "Monthly check-ins to recalibrate your macros as your body composition and goals evolve." },
              ].map((s) => (
                <div key={s.step}>
                  <div className="font-display text-[60px] font-bold text-[#F2C94C]/15 leading-none mb-4">{s.step}</div>
                  <h4 className="font-medium text-[15px] mb-2.5">{s.title}</h4>
                  <p className="text-white/35 text-[13px] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fresh daily image strip */}
          <div className="mt-16 grid grid-cols-3 gap-3 h-52 overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=600&h=300&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1543353071-c953d88f7033?w=600&h=300&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&h=300&fit=crop&auto=format",
            ].map((src, i) => (
              <div key={i} className="relative overflow-hidden bg-[#1a3a25]">
                <img src={src} alt="Fresh meal plan" className="w-full h-full object-cover opacity-70" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#F7F5F0] py-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#111111]/35 uppercase">
              Client Results
            </span>
            <div className="h-px w-16 bg-[#111111]/15" />
          </div>
          <h2 className="font-display text-[52px] lg:text-[64px] font-bold mb-14 leading-none">
            What our<br />members say.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white p-8 border border-[#E5E2DA]">
                <div className="text-[#CDFF3A] text-[16px] mb-5 tracking-tight">
                  {"★".repeat(t.rating)}
                </div>
                <p className="text-[#333] text-[15px] leading-relaxed mb-7">"{t.text}"</p>
                <div className="border-t border-[#E5E2DA] pt-5 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-[14px]">{t.name}</div>
                    <div className="text-[#999] text-[12px] mt-0.5">{t.role}</div>
                  </div>
                  <span
                    className={`text-[10px] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 whitespace-nowrap ${
                      t.plan.includes("Ready")
                        ? "bg-[#111111] text-[#CDFF3A]"
                        : "bg-[#0D2818] text-[#F2C94C]"
                    }`}
                  >
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
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase">
                  Rewards Program
                </span>
              </div>
              <h2 className="font-display text-[52px] lg:text-[60px] font-bold mb-5 leading-none">
                Earn while<br />you <span className="text-[#CDFF3A]">perform.</span>
              </h2>
              <p className="text-white/45 text-[15px] leading-relaxed mb-10 max-w-md">
                Every dollar spent earns you Fresher Points. Redeem them for free meals, plan upgrades, and exclusive member benefits.
              </p>
              <button className="inline-flex items-center gap-2.5 bg-[#CDFF3A] text-[#111111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                Join Rewards <IconArrow />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { pts: "1 pt", per: "per $1 spent", color: "#CDFF3A" },
                { pts: "2× pts", per: "on Meal Plans", color: "#F2C94C" },
                { pts: "$5 off", per: "every 500 points", color: "#7EE8B0" },
                { pts: "VIP tier", per: "at 5,000+ pts / yr", color: "#A78BFA" },
              ].map((r) => (
                <div key={r.pts} className="bg-white/5 border border-white/8 p-7 hover:bg-white/8 transition-colors">
                  <div
                    className="font-display text-[32px] font-bold mb-1.5"
                    style={{ color: r.color }}
                  >
                    {r.pts}
                  </div>
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
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border border-[#D0CCC4] border-r-0 px-5 py-3.5 text-[14px] bg-white text-[#111111] placeholder:text-[#bbb] outline-none focus:border-[#111111] transition-colors"
            />
            <button className="bg-[#111111] text-white px-6 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0A0A] text-white py-16 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2">
              <div className="font-display text-[24px] font-bold mb-4">
                FRESHER<span className="text-[#CDFF3A]">.</span>
              </div>
              <p className="text-white/35 text-[13px] leading-relaxed mb-5 max-w-[220px]">
                Performance meals for serious athletes and busy professionals across Singapore.
              </p>
              <div className="text-[12px] text-white/25 space-y-1">
                <div>hello@fresher.com.sg</div>
                <div>+65 6123 4567</div>
                <div className="mt-2">Toa Payoh, Singapore 310123</div>
              </div>
            </div>

            {[
              {
                title: "01 / Ready-to-Go",
                color: "#CDFF3A",
                links: ["Low Carb Meals", "High Carb Meals", "Breakfast", "Just Protein", "Bundles", "Sweet Deals"],
              },
              {
                title: "02 / Meal Plans",
                color: "#F2C94C",
                links: ["Cut Plan", "Maintain Plan", "Build Plan", "How It Works", "Nutrition Guide", "6 in 60"],
              },
              {
                title: "Account",
                color: "rgba(255,255,255,0.25)",
                links: ["My Account", "Rewards", "Order Tracking", "Subscription", "Gift Cards", "Eating Guide"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  className="font-mono text-[9px] tracking-[0.4em] uppercase mb-5"
                  style={{ color: col.color }}
                >
                  {col.title}
                </div>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[13px] text-white/35 hover:text-white transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/20">
            <span>© 2025 Fresher Performance Meals Pte. Ltd. · UEN 202512345A</span>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Refund Policy"].map((l) => (
                <a key={l} href="#" className="hover:text-white/50 transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
