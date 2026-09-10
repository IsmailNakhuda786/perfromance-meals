import { useState } from "react";
import { Page, CartItem } from "@/data";
import { ReadySeriesLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
  onSelectMeal: (id: number) => void;
}

const MEALS = [
  { id: 101, name: "Teriyaki Chicken & Brown Rice", cat: "High Protein", price: 12.90, protein: 42, carbs: 48, fat: 8, cal: 478, badge: "BESTSELLER", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
  { id: 102, name: "Spicy Korean Beef Bulgogi", cat: "Low Carb", price: 13.50, protein: 38, carbs: 12, fat: 14, cal: 326, badge: "HOT", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80" },
  { id: 103, name: "Herb Chicken & Roasted Veg", cat: "Low Carb", price: 12.50, protein: 36, carbs: 14, fat: 10, cal: 290, badge: null, img: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&q=80" },
  { id: 104, name: "Salmon & Quinoa Power Bowl", cat: "High Protein", price: 15.90, protein: 44, carbs: 38, fat: 16, cal: 468, badge: "NEW", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { id: 105, name: "Thai Basil Pork Rice Bowl", cat: "High Carb", price: 11.90, protein: 28, carbs: 62, fat: 8, cal: 436, badge: null, img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80" },
  { id: 106, name: "Miso Glazed Salmon", cat: "High Protein", price: 16.90, protein: 46, carbs: 18, fat: 18, cal: 414, badge: "PREMIUM", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80" },
  { id: 107, name: "Overnight Oats & Berry", cat: "Breakfast", price: 8.90, protein: 18, carbs: 52, fat: 6, cal: 334, badge: null, img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80" },
  { id: 108, name: "Greek Chicken Wrap", cat: "High Protein", price: 12.90, protein: 34, carbs: 36, fat: 10, cal: 374, badge: null, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80" },
  { id: 109, name: "Egg White & Avocado Toast", cat: "Breakfast", price: 9.50, protein: 22, carbs: 34, fat: 12, cal: 332, badge: "POPULAR", img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80" },
  { id: 110, name: "Beef Rendang & Cauliflower", cat: "Low Carb", price: 14.90, protein: 40, carbs: 10, fat: 22, cal: 398, badge: null, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80" },
  { id: 111, name: "Chicken Burrito Bowl", cat: "High Carb", price: 12.50, protein: 30, carbs: 58, fat: 10, cal: 450, badge: null, img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80" },
  { id: 112, name: "Prawn Fried Rice", cat: "High Carb", price: 13.90, protein: 26, carbs: 60, fat: 8, cal: 428, badge: "BESTSELLER", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80" },
];

const CATS = ["All", "High Protein", "Low Carb", "High Carb", "Breakfast"];

// Each bundle comes with specific meal picks (for carousel display)
const BUNDLES = [
  {
    n: "Starter Pack", meals: 5, price: 62, ppm: 12.40,
    desc: "Try 5 chef-picked meals — perfect first order.",
    badge: null,
    mealIds: [101, 104, 103, 107, 111],
  },
  {
    n: "Weekly Pack", meals: 10, price: 119, ppm: 11.90,
    desc: "Stock the freezer. A full week of performance eating.",
    badge: "MOST POPULAR",
    mealIds: [101, 106, 102, 104, 105, 108, 103, 109, 112, 111],
  },
  {
    n: "Performance Pack", meals: 15, price: 172, ppm: 11.50,
    desc: "High-output week sorted. 15 macro-tracked meals.",
    badge: "BEST VALUE",
    mealIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 101, 104, 106],
  },
  {
    n: "Monthly Pack", meals: 20, price: 220, ppm: 11.00,
    desc: "Full month of performance nutrition locked in.",
    badge: null,
    mealIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 101, 102, 103, 104, 105, 106, 107, 108],
  },
];

const FREE_DELIVERY_THRESHOLD = 80;

const promos = [
  { code: "READY20", desc: "20% off your first Ready Series order", expires: "30 Sep 2026" },
  { code: "SG61", desc: "$6.10 off — Singapore National Day special", expires: "Ongoing" },
  { code: "FREEZER5", desc: "$5 off orders of 10+ meals", expires: "15 Oct 2026" },
];

// Per-meal reviews for the reviews section
const MEAL_REVIEWS: Record<number, { author: string; rating: number; text: string; date: string }[]> = {
  101: [
    { author: "Marcus T.", rating: 5, text: "Best meal prep chicken I have ever had. The teriyaki glaze is spot-on and the brown rice keeps me full till 5pm.", date: "12 Sep" },
    { author: "Rena L.", rating: 5, text: "Ordered 10 of these. Zero regrets. My whole office is jealous at lunchtime.", date: "8 Sep" },
    { author: "Kevin P.", rating: 4, text: "Really solid. Portion size is generous and macros are exactly as listed. Would add 5 stars if carbs were slightly lower.", date: "1 Sep" },
  ],
  104: [
    { author: "Sophie H.", rating: 5, text: "Salmon is perfectly cooked even after freezing — huge win. The quinoa absorbs the sauce beautifully.", date: "10 Sep" },
    { author: "Jared Ng.", rating: 5, text: "Worth every cent at $15.90. Tastes like a restaurant bowl. Easy 5/5.", date: "5 Sep" },
  ],
  106: [
    { author: "Amir R.", rating: 5, text: "Premium price, premium taste. The miso glaze caramelises perfectly in the microwave. Unbelievable.", date: "11 Sep" },
    { author: "Lin Y.", rating: 4, text: "Excellent flavour. Salmon was a tiny bit dry on the edges but still very enjoyable. Will reorder.", date: "7 Sep" },
  ],
  102: [
    { author: "Brian K.", rating: 5, text: "Genuinely spicy — exactly as advertised. Low carb but still super satisfying. Great for cut phase.", date: "9 Sep" },
    { author: "Priya S.", rating: 4, text: "Good flavour, solid protein. Spice level is a little high for me but I keep ordering it anyway.", date: "4 Sep" },
  ],
};

export default function ReadySeriesPage({ navigate, addToCart, cart, onSelectMeal }: Props) {
  const [activeCat, setActiveCat] = useState("All");
  const [addedId, setAddedId] = useState<number | null>(null);
  const [reviewMealId, setReviewMealId] = useState<number | null>(null);

  const filtered = activeCat === "All" ? MEALS : MEALS.filter((m) => m.cat === activeCat);

  const handleAdd = (meal: typeof MEALS[0]) => {
    addToCart({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      qty: 1,
      img: meal.img,
      type: "ready",
    });
    setAddedId(meal.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const cartItems = cart.filter((i) => i.type === "ready" || i.type === "box");
  const cartQty = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.filter((i) => i.type === "ready").reduce((s, i) => s + i.price * i.qty, 0);
  const toFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);
  const freeDeliveryPct = Math.min(100, (cartTotal / FREE_DELIVERY_THRESHOLD) * 100);

  const getMealById = (id: number) => MEALS.find((m) => m.id === id);

  return (
    <div className="bg-[#1A1A1A] text-white min-h-screen">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 50px,rgba(245,179,0,0.35) 50px,rgba(245,179,0,0.35) 51px),repeating-linear-gradient(90deg,transparent,transparent 50px,rgba(245,179,0,0.35) 50px,rgba(245,179,0,0.35) 51px)" }}
        />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#F5B300]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
          <button onClick={() => navigate("home")} className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[11px] font-mono tracking-widest uppercase mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Performance Meals
          </button>

          <div className="mb-6">
            <ReadySeriesLogo size="md" variant="dark" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="font-display text-[52px] sm:text-[68px] font-extrabold leading-[0.9] mb-5">
                FROZEN<br />AT PEAK.<br /><span className="text-[#F5B300]">READY ON</span><br />DEMAND.
              </h1>
              <p className="text-white/50 text-[15px] leading-relaxed max-w-[400px]">
                Fast, enjoyable frozen meals that are ready when life gets busy. Keep your week moving.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <div className="bg-[#1A1A1A] border border-white/10 px-6 py-5 flex-1">
                <div className="text-[#F5B300] font-display text-[32px] font-extrabold">3 min</div>
                <div className="text-white/40 text-[11px] tracking-wide mt-1">Ready to eat</div>
              </div>
              <div className="bg-[#1A1A1A] border border-white/10 px-6 py-5 flex-1">
                <div className="text-[#F5B300] font-display text-[32px] font-extrabold">40+</div>
                <div className="text-white/40 text-[11px] tracking-wide mt-1">Meal options</div>
              </div>
              <div className="bg-[#1A1A1A] border border-white/10 px-6 py-5 flex-1">
                <div className="text-[#F5B300] font-display text-[32px] font-extrabold">$8.90</div>
                <div className="text-white/40 text-[11px] tracking-wide mt-1">Starting from</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIVE PROMOS BAR ── */}
      <div className="bg-[#F5B300]/8 border-y border-[#F5B300]/15 px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
          <div className="text-[#F5B300] text-[10px] font-mono tracking-[0.3em] uppercase shrink-0">Active Promos</div>
          <div className="flex flex-wrap gap-4">
            {promos.map((p) => (
              <div key={p.code} className="flex items-center gap-2">
                <span className="bg-[#F5B300] text-[#111] text-[9px] font-extrabold px-2 py-0.5 tracking-wider">{p.code}</span>
                <span className="text-white/50 text-[11px]">{p.desc}</span>
                <span className="text-white/20 text-[10px] font-mono">{p.expires}</span>
              </div>
            ))}
          </div>
          <div className="ml-auto text-[10px] text-white/25 hidden lg:block">Enter code at checkout</div>
        </div>
      </div>

      {/* ── FREE DELIVERY PROGRESS ── */}
      <div className="bg-[#111] border-b border-white/5 px-6 py-3">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#F5B300] rounded-full transition-all duration-500" style={{ width: `${freeDeliveryPct}%` }} />
            </div>
            <div className="text-[11px] shrink-0">
              {toFreeDelivery <= 0
                ? <span className="text-[#F5B300] font-bold">🎉 Free delivery unlocked!</span>
                : <span className="text-white/40">Add <span className="text-white font-semibold">${toFreeDelivery.toFixed(2)}</span> more for free delivery</span>
              }
            </div>
          </div>
        </div>
      </div>

      {/* ── BUNDLES ── */}
      <section className="py-16 px-6 sm:px-8 bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[#F5B300] text-[10px] font-mono tracking-[0.3em] uppercase mb-2">Useful Bundles</div>
              <h2 className="font-display text-[32px] sm:text-[40px] font-extrabold">Stock up and save<span className="text-[#F5B300]">.</span></h2>
              <p className="text-white/40 text-[13px] mt-2">Each bundle is curated from our bestselling meals — see what you get inside.</p>
            </div>
            <button
              onClick={() => navigate("build-a-box")}
              className="inline-flex items-center gap-2 border border-[#F5B300]/40 text-[#F5B300] text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#F5B300] hover:text-[#111] transition-colors whitespace-nowrap"
            >
              Build-A-Box →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BUNDLES.map((b) => {
              const bundleMeals = b.mealIds.map((id) => getMealById(id)).filter(Boolean) as typeof MEALS;
              const uniqueMeals = bundleMeals.filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i);
              return (
                <div key={b.n} className="bg-[#111] border border-white/8 overflow-hidden hover:border-[#F5B300]/30 transition-colors">
                  {/* Meal image carousel — scrollable thumbnails */}
                  <div className="relative">
                    <div className="flex gap-0 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
                      {uniqueMeals.map((meal) => (
                        <div key={meal.id} className="shrink-0 relative" style={{ width: "120px", height: "90px" }}>
                          <img src={meal.img} alt={meal.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 to-transparent" />
                        </div>
                      ))}
                    </div>
                    {b.badge && (
                      <div className="absolute top-3 right-3 bg-[#F5B300] text-[#111] text-[9px] font-extrabold tracking-[0.15em] px-2.5 py-1">{b.badge}</div>
                    )}
                    <div className="absolute bottom-2 left-3 text-[10px] text-white/50 font-mono">{b.meals} meals · scroll to see all →</div>
                  </div>

                  {/* Bundle info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="font-display text-[18px] font-bold text-white">{b.n}</div>
                        <div className="text-white/40 text-[12px] mt-0.5 leading-relaxed">{b.desc}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display text-[24px] font-extrabold text-[#F5B300]">${b.price}</div>
                        <div className="text-white/30 text-[11px]">${b.ppm}/meal</div>
                      </div>
                    </div>

                    {/* Meal name list (compact) */}
                    <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                      {uniqueMeals.slice(0, 5).map((meal) => (
                        <span key={meal.id} className="bg-white/5 text-white/40 text-[10px] px-2 py-0.5 rounded">{meal.name.split("&")[0].trim()}</span>
                      ))}
                      {uniqueMeals.length > 5 && (
                        <span className="bg-white/5 text-white/30 text-[10px] px-2 py-0.5 rounded">+{uniqueMeals.length - 5} more</span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart({ id: 200 + b.meals, name: `${b.n} (${b.meals} meals)`, price: b.price, qty: 1, img: uniqueMeals[0]?.img ?? "", type: "box" })}
                      className="w-full bg-white/8 text-white text-[11px] font-bold tracking-[0.2em] uppercase py-3 hover:bg-[#F5B300] hover:text-[#111] transition-colors rounded-lg"
                    >
                      Add Bundle — ${b.price}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("build-a-box")}
              className="inline-flex items-center gap-3 text-white/40 hover:text-[#F5B300] text-[12px] font-mono tracking-widest uppercase transition-colors"
            >
              Or build your own custom box →
            </button>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <div className="text-[#F5B300] text-[10px] font-mono tracking-[0.3em] uppercase mb-2">All Meals</div>
              <h2 className="font-display text-[32px] sm:text-[40px] font-extrabold">
                {filtered.length} meals available<span className="text-[#F5B300]">.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${activeCat === c ? "bg-[#F5B300] text-[#111]" : "border border-white/15 text-white/50 hover:border-[#F5B300]/50 hover:text-[#F5B300]"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/8">
            {filtered.map((meal) => {
              const inCart = cart.find((i) => i.id === meal.id && i.type === "ready");
              const justAdded = addedId === meal.id;
              const mealReviews = MEAL_REVIEWS[meal.id];
              const avgRating = mealReviews
                ? (mealReviews.reduce((s, r) => s + r.rating, 0) / mealReviews.length).toFixed(1)
                : "4.8";
              const reviewCount = mealReviews?.length ?? 0;
              return (
                <div key={meal.id} className="bg-[#111] flex flex-col">
                  <button
                    onClick={() => onSelectMeal(meal.id)}
                    className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A] block w-full group"
                    aria-label={`View ${meal.name} details`}
                  >
                    <img src={meal.img} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#F5B300] text-[#1A1A1A] text-[10px] font-extrabold tracking-[0.2em] uppercase px-4 py-2">VIEW DETAILS →</span>
                    </div>
                    {meal.badge && (
                      <div className="absolute top-3 left-3 bg-[#F5B300] text-[#111] text-[8px] font-extrabold tracking-[0.15em] px-2 py-1">
                        {meal.badge}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-[#111]/80 text-white/60 text-[10px] font-mono px-2 py-1">
                      {meal.cat}
                    </div>
                  </button>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <button onClick={() => onSelectMeal(meal.id)} className="font-display text-[15px] font-bold text-white leading-snug text-left hover:text-[#F5B300] transition-colors">{meal.name}</button>
                    <div className="flex gap-3 text-[10px] font-mono text-white/40">
                      <span>{meal.protein}g protein</span>
                      <span>·</span>
                      <span>{meal.cal} cal</span>
                    </div>
                    {/* Inline star rating + reviews link */}
                    <button
                      onClick={() => mealReviews && setReviewMealId(meal.id)}
                      className={`flex items-center gap-1.5 text-left ${mealReviews ? "hover:opacity-80" : "cursor-default"} transition-opacity`}
                    >
                      <div className="flex">
                        {[1,2,3,4,5].map((s) => (
                          <span key={s} className={`text-[11px] ${s <= Math.round(Number(avgRating)) ? "text-[#F5B300]" : "text-white/20"}`}>★</span>
                        ))}
                      </div>
                      <span className="text-[11px] text-white/40 font-mono">{avgRating}</span>
                      {reviewCount > 0 && <span className="text-[10px] text-white/30">({reviewCount} reviews)</span>}
                    </button>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-white/8">
                      <span className="font-display text-[18px] font-extrabold text-white">${meal.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAdd(meal)}
                        className={`px-4 py-2 text-[10px] font-extrabold tracking-[0.15em] uppercase transition-colors ${justAdded ? "bg-white text-[#1A1A1A]" : inCart ? "bg-[#F5B300]/20 text-[#F5B300] border border-[#F5B300]/30 hover:bg-[#F5B300] hover:text-[#111]" : "bg-[#F5B300] text-[#111] hover:bg-white"}`}
                      >
                        {justAdded ? "✓ Added" : inCart ? `In Cart (${inCart.qty})` : "+ Add"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY READY SERIES ── */}
      <section className="py-16 bg-[#1A1A1A] px-6 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#F5B300] text-[10px] font-mono tracking-[0.3em] uppercase mb-3">Why Ready Series</div>
            <h2 className="font-display text-[36px] sm:text-[48px] font-extrabold">
              A busy day does not have<br />to knock you off track<span className="text-[#F5B300]">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
            {[
              { icon: "🧊", label: "Frozen at peak", desc: "Locked in at maximum freshness and nutrition." },
              { icon: "⏱", label: "3-minute prep", desc: "Microwave from frozen. No thaw time needed." },
              { icon: "📊", label: "Macro tracked", desc: "Every gram counted. No guesswork required." },
              { icon: "🚚", label: "Free delivery $80+", desc: "Free delivery on orders over $80. Always." },
            ].map((f) => (
              <div key={f.label} className="bg-[#1A1A1A] px-7 py-8">
                <div className="text-[30px] mb-4">{f.icon}</div>
                <div className="font-display text-[18px] font-bold text-white mb-2">{f.label}</div>
                <div className="text-white/40 text-[12px] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CART STICKY BAR ── */}
      {cartQty > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#F5B300] text-[#111]">
          {/* Free delivery progress */}
          {toFreeDelivery > 0 && (
            <div className="bg-[#111] px-6 py-2 flex items-center gap-4">
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#F5B300] rounded-full transition-all" style={{ width: `${freeDeliveryPct}%` }} />
              </div>
              <span className="text-[11px] text-white/60 shrink-0">Add ${toFreeDelivery.toFixed(2)} for free delivery</span>
            </div>
          )}
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-[16px]">{cartQty} meal{cartQty !== 1 ? "s" : ""} in your box</div>
              <div className="text-[11px] opacity-60">
                {toFreeDelivery <= 0 ? "🎉 Free delivery unlocked!" : `$${cartTotal.toFixed(2)} — ${toFreeDelivery.toFixed(2)} from free delivery`}
              </div>
            </div>
            <button
              onClick={() => navigate("checkout")}
              className="bg-[#111] text-white text-[11px] font-extrabold tracking-[0.2em] uppercase px-8 py-3 hover:bg-white hover:text-[#111] transition-colors"
            >
              Checkout →
            </button>
          </div>
        </div>
      )}

      {/* ── MEAL REVIEWS MODAL ── */}
      {reviewMealId !== null && (() => {
        const meal = MEALS.find((m) => m.id === reviewMealId)!;
        const reviews = MEAL_REVIEWS[reviewMealId] ?? [];
        const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
        const starCounts = [5,4,3,2,1].map((s) => ({ star: s, count: reviews.filter((r) => r.rating === s).length }));
        return (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-black/75" onClick={() => setReviewMealId(null)} />
            <div className="relative bg-[#1A1A1A] w-full sm:max-w-lg max-h-[85vh] overflow-y-auto border border-white/10">
              <div className="sticky top-0 bg-[#1A1A1A] border-b border-white/8 px-6 py-4 flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-[15px] text-white leading-snug">{meal.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className={`text-[13px] ${s <= Math.round(avgRating) ? "text-[#F5B300]" : "text-white/20"}`}>★</span>
                      ))}
                    </div>
                    <span className="text-white/60 text-[12px] font-mono">{avgRating.toFixed(1)} · {reviews.length} reviews</span>
                  </div>
                </div>
                <button onClick={() => setReviewMealId(null)} className="text-white/40 hover:text-white transition-colors mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Star breakdown */}
              <div className="px-6 py-4 border-b border-white/8">
                <div className="flex flex-col gap-2">
                  {starCounts.map(({ star, count }) => (
                    <div key={star} className="flex items-center gap-3 text-[12px]">
                      <span className="text-white/50 w-4 text-right">{star}★</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F5B300] rounded-full" style={{ width: reviews.length > 0 ? `${(count / reviews.length) * 100}%` : "0%" }} />
                      </div>
                      <span className="text-white/30 w-4">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual reviews */}
              <div className="px-6 py-4 flex flex-col gap-5">
                {reviews.map((r, i) => (
                  <div key={i} className="border-b border-white/5 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold text-[13px] text-white">{r.author}</span>
                        <div className="flex mt-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} className={`text-[11px] ${s <= r.rating ? "text-[#F5B300]" : "text-white/20"}`}>★</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-white/30 font-mono">{r.date}</span>
                    </div>
                    <p className="text-[13px] text-white/60 leading-relaxed">{r.text}</p>
                  </div>
                ))}
                {reviews.length === 0 && (
                  <p className="text-white/40 text-[13px] text-center py-4">No reviews yet for this meal. Be the first!</p>
                )}
              </div>

              <div className="px-6 pb-6">
                <button onClick={() => { setReviewMealId(null); handleAdd(meal); }}
                  className="w-full bg-[#F5B300] text-[#111] py-3.5 font-bold text-[13px] tracking-wider uppercase hover:bg-white transition-colors rounded-lg">
                  Add to Cart — ${meal.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
