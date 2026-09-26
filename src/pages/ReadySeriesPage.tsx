import { useState } from "react";
import { Page, CartItem } from "@/data";
import { ReadySeriesLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
  onSelectMeal: (id: number) => void;
  setCartOpen: (v: boolean) => void;
}

const MEALS = [
  { id: 101, name: "Teriyaki Chicken & Brown Rice", cat: "Just Protein", price: 12.90, protein: 42, carbs: 48, fat: 8, cal: 478, badge: "BESTSELLER", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
  { id: 102, name: "Spicy Korean Beef Bulgogi", cat: "Low Carb", price: 13.50, protein: 38, carbs: 12, fat: 14, cal: 326, badge: "HOT", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80" },
  { id: 103, name: "Herb Chicken & Roasted Veg", cat: "Low Carb", price: 12.50, protein: 36, carbs: 14, fat: 10, cal: 290, badge: null, img: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&q=80" },
  { id: 104, name: "Salmon & Quinoa Power Bowl", cat: "Just Protein", price: 15.90, protein: 44, carbs: 38, fat: 16, cal: 468, badge: "NEW", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { id: 105, name: "Thai Basil Pork Rice Bowl", cat: "High Carb", price: 11.90, protein: 28, carbs: 62, fat: 8, cal: 436, badge: null, img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80" },
  { id: 106, name: "Miso Glazed Salmon", cat: "Just Protein", price: 16.90, protein: 46, carbs: 18, fat: 18, cal: 414, badge: "PREMIUM", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80" },
  { id: 107, name: "Overnight Oats & Berry", cat: "High Carb", price: 8.90, protein: 18, carbs: 52, fat: 6, cal: 334, badge: null, img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80" },
  { id: 108, name: "Greek Chicken Wrap", cat: "Just Protein", price: 12.90, protein: 34, carbs: 36, fat: 10, cal: 374, badge: null, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80" },
  { id: 109, name: "Egg White & Avocado Toast", cat: "High Carb", price: 9.50, protein: 22, carbs: 34, fat: 12, cal: 332, badge: "POPULAR", img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80" },
  { id: 110, name: "Beef Rendang & Cauliflower", cat: "Low Carb", price: 14.90, protein: 40, carbs: 10, fat: 22, cal: 398, badge: null, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80" },
  { id: 111, name: "Chicken Burrito Bowl", cat: "High Carb", price: 12.50, protein: 30, carbs: 58, fat: 10, cal: 450, badge: null, img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80" },
  { id: 112, name: "Prawn Fried Rice", cat: "High Carb", price: 13.90, protein: 26, carbs: 60, fat: 8, cal: 428, badge: "BESTSELLER", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80" },
];

const CATS = ["A-la-carte", "Low Carb", "High Carb", "Just Protein"];

// Non-beef Low Carb: 103 Herb Chicken, 104 Salmon Quinoa, 106 Miso Salmon, 108 Greek Chicken, 109 Egg White Avocado
// Beef Low Carb: 102 Spicy Korean Beef, 110 Beef Rendang
// High Carb Non-Beef: 107 Overnight Oats, 109 Egg White Avocado, 111 Chicken Burrito, 112 Prawn Fried Rice, 105 Thai Basil Pork
// High Carb Beef: 105 Thai Basil Pork, 112 Prawn Fried Rice, 111 Chicken Burrito
// Just Protein: 101 Teriyaki Chicken, 104 Salmon Quinoa, 106 Miso Salmon, 108 Greek Chicken

const PREDEFINED_BUNDLES = [
  {
    category: "Low Carb Meals",
    color: "#F5B300",
    items: [
      { name: "Signature 5 — Non-Beef", variant: "Non-Beef", desc: "Our most-loved low carb flavours, curated for you. 3% bundle discount applied.", badge: "POPULAR", price: 48.99, meals: 5,
        mealIds: [103, 104, 106, 108, 109] },
      { name: "Signature 5 — Beef",     variant: "Beef",     desc: "Best-selling beef low carb options in one bundle. 3% bundle discount applied.", badge: null, price: 48.99, meals: 5,
        mealIds: [102, 110, 102, 110, 102] },
      { name: "9 Flavours of the Month",variant: null,       desc: "9 rotating seasonal low carb meals, refreshed monthly. 5% bundle discount applied.", badge: "NEW", price: 86.55, meals: 9,
        mealIds: [103, 104, 106, 108, 109, 102, 110, 103, 106] },
      { name: "Essential 10 — Non-Beef",variant: "Non-Beef", desc: "Top up your fridge with essential low carb staples. 7% bundle discount applied.", badge: null, price: 93.00, meals: 10,
        mealIds: [103, 104, 106, 108, 109, 103, 104, 106, 108, 109] },
      { name: "Essential 10 — Beef",    variant: "Beef",     desc: "Beef-based essentials to keep your macros on track. 7% bundle discount applied.", badge: null, price: 93.00, meals: 10,
        mealIds: [102, 110, 102, 110, 102, 110, 102, 110, 102, 110] },
    ],
  },
  {
    category: "High Carb Meals",
    color: "#F5B300",
    items: [
      { name: "Signature 5 — Non-Beef", variant: "Non-Beef", desc: "High carb performance meals for fuel-heavy days. 3% bundle discount applied.", badge: "POPULAR", price: 48.99, meals: 5,
        mealIds: [107, 109, 111, 112, 105] },
      { name: "Signature 5 — Beef",     variant: "Beef",     desc: "Beef-based high carb signatures for sustained energy. 3% bundle discount applied.", badge: null, price: 48.99, meals: 5,
        mealIds: [105, 112, 111, 105, 112] },
      { name: "9 Flavours of the Month",variant: null,       desc: "9 rotating seasonal high carb meals, refreshed monthly. 5% bundle discount applied.", badge: "NEW", price: 88.45, meals: 9,
        mealIds: [107, 109, 111, 112, 105, 107, 111, 112, 109] },
      { name: "Essential 10 — Non-Beef",variant: "Non-Beef", desc: "Restock your week with non-beef high carb essentials. 7% bundle discount applied.", badge: null, price: 93.00, meals: 10,
        mealIds: [107, 109, 111, 112, 105, 107, 109, 111, 112, 105] },
      { name: "Essential 10 — Beef",    variant: "Beef",     desc: "Beef high carb top-up for active weeks. 7% bundle discount applied.", badge: null, price: 93.00, meals: 10,
        mealIds: [105, 112, 111, 105, 112, 111, 105, 112, 111, 105] },
    ],
  },
  {
    category: "Just Protein",
    color: "#F5B300",
    items: [
      { name: "JP Variety Bundle of 10", variant: null, desc: "10-meal variety of high-protein just protein serves. 3% bundle discount applied.", badge: "BESTSELLER", price: 55.10, meals: 10,
        mealIds: [101, 104, 106, 108, 101, 104, 106, 108, 101, 104] },
    ],
  },
  {
    category: "Mixed Bundle",
    color: "#F5B300",
    items: [
      { name: "7 Low Carb + 7 Just Protein",  variant: "Non-Beef", desc: "14-meal mixed bundle: 7 low carb + 7 just protein serves. 7% bundle discount applied.", badge: "BEST VALUE", price: 118.30, meals: 14,
        mealIds: [103, 104, 106, 108, 109, 103, 106, 101, 104, 106, 108, 101, 104, 106] },
      { name: "7 High Carb + 7 Just Protein", variant: "Non-Beef", desc: "14-meal mixed bundle: 7 high carb + 7 just protein serves. 7% bundle discount applied.", badge: null, price: 117.37, meals: 14,
        mealIds: [107, 109, 111, 112, 105, 107, 109, 101, 104, 106, 108, 101, 104, 108] },
    ],
  },
];

// 10 predefined subscription products
const SUBSCRIPTION_PRODUCTS = [
  { sku: "JPSUB01", name: "Just Protein",         variant: "Non-Beef", items: 14, price3m: 252.90, price6m: 480.50, badge: null },
  { sku: "JPSUB02", name: "Just Protein",         variant: "Beef",     items: 14, price3m: 252.90, price6m: 480.50, badge: null },
  { sku: "LCSUB01", name: "Low Carb Meals",       variant: "Non-Beef", items: 10, price3m: 303.00, price6m: 575.70, badge: "POPULAR" },
  { sku: "LCSUB02", name: "Low Carb Meals",       variant: "Beef",     items: 10, price3m: 303.00, price6m: 575.70, badge: null },
  { sku: "HCSUB01", name: "High Carb Meals",      variant: "Non-Beef", items: 10, price3m: 303.00, price6m: 575.70, badge: null },
  { sku: "HCSUB02", name: "High Carb Meals",      variant: "Beef",     items: 10, price3m: 303.00, price6m: 575.70, badge: null },
  { sku: "LCMIXSUB01", name: "Low Carb + Just Protein",  variant: "Non-Beef", items: 15, price3m: 354.56, price6m: 693.90, badge: "BEST VALUE" },
  { sku: "LCMIXSUB02", name: "Low Carb + Just Protein",  variant: "Beef",     items: 15, price3m: 354.56, price6m: 693.90, badge: null },
  { sku: "HCMIXSUB01", name: "High Carb + Just Protein", variant: "Non-Beef", items: 15, price3m: 354.56, price6m: 693.90, badge: null },
  { sku: "HCMIXSUB02", name: "High Carb + Just Protein", variant: "Beef",     items: 15, price3m: 354.56, price6m: 693.90, badge: null },
];

const FREE_DELIVERY_THRESHOLD = 120;
const DELIVERY_FEE = 10;

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

export default function ReadySeriesPage({ navigate, addToCart, cart, onSelectMeal, setCartOpen }: Props) {
  const [purchaseMode, setPurchaseMode] = useState<"single" | "bundles" | "subscription">("single");
  const [subTerm, setSubTerm] = useState<3 | 6>(3);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState("A-la-carte");
  const [addedId, setAddedId] = useState<number | null>(null);
  const [reviewMealId, setReviewMealId] = useState<number | null>(null);
  const [carouselOffsets, setCarouselOffsets] = useState<Record<string, number>>({});

  const scrollCarousel = (bundleName: string, dir: 1 | -1) => {
    setCarouselOffsets((prev) => {
      const current = prev[bundleName] ?? 0;
      const next = current + dir * 120;
      return { ...prev, [bundleName]: Math.max(0, next) };
    });
  };

  const filtered = (activeCat === "All" || activeCat === "A-la-carte") ? MEALS : MEALS.filter((m) => m.cat === activeCat);

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
  const cartTotal = cart.filter((i) => i.type === "ready" || i.type === "box").reduce((s, i) => s + i.price * i.qty, 0);
  const toFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);
  const freeDeliveryPct = Math.min(100, (cartTotal / FREE_DELIVERY_THRESHOLD) * 100);
  const deliveryFee = cartTotal > 0 ? (cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE) : 0;

  return (
    <div className="bg-[#1A1A1A] text-white min-h-screen">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden min-h-[75svh] flex items-center">
        {/* Full-bleed food photo background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=1600&h=900&fit=crop&auto=format&q=80"
            alt="Ready-Series meal prep containers"
            className="w-full h-full object-cover object-center"
          />
          {/* Heavy charcoal overlay with yellow undertone — keeps e-commerce energy, not boutique softness */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(100deg, rgba(16,16,16,0.97) 0%, rgba(16,16,16,0.90) 45%, rgba(16,16,16,0.65) 75%, rgba(16,16,16,0.3) 100%)" }} />
          {/* Yellow burst — top right, energetic */}
          <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 85% 10%, rgba(245,179,0,0.28) 0%, transparent 60%)" }} />
        </div>

        {/* Yellow top bar — brand identifier stripe */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F5B300] z-20" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-8 py-20 sm:py-24">
          <button onClick={() => navigate("home")} className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[11px] font-mono tracking-widest uppercase mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Performance Meals
          </button>

          <div className="mb-7">
            <ReadySeriesLogo size="md" variant="dark" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-[#F5B300] mb-5">Everyday Momentum</p>
              <h1 className="font-display text-[52px] sm:text-[68px] font-extrabold leading-[0.88] mb-6">
                FROZEN AT PEAK.<br /><span className="text-[#F5B300]">READY ON DEMAND.</span>
              </h1>
              <p className="text-white/50 text-[15px] leading-relaxed max-w-[420px] mb-8">
                Fast, enjoyable frozen meals that are ready when life gets busy. Keep your week moving.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById("rs-shop")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-3 bg-[#F5B300] text-[#1A1A1A] px-8 py-4 font-extrabold text-[12px] tracking-[0.2em] uppercase hover:bg-white transition-colors">
                  Shop Now
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                </button>
              </div>
            </div>

            {/* Stats — energetic tiles, yellow-accented */}
            <div className="grid grid-cols-3 gap-3 lg:justify-items-end">
              {[
                { v: "3 min", l: "Ready to eat" },
                { v: "40+", l: "Meal options" },
                { v: "$8.90", l: "From" },
              ].map((s) => (
                <div key={s.l} className="border border-[#F5B300]/25 bg-[#F5B300]/5 px-4 py-5 text-center">
                  <div className="text-[#F5B300] font-display text-[28px] sm:text-[32px] font-extrabold leading-none">{s.v}</div>
                  <div className="text-white/40 text-[10px] tracking-wide mt-2 uppercase">{s.l}</div>
                </div>
              ))}
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

      {/* ── FREE DELIVERY PROGRESS — single/bundle only ── */}
      {purchaseMode !== "subscription" && (
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
      )}

      {/* ── PURCHASE MODE TABS ── */}
      <div id="rs-shop" className="bg-[#111] border-b border-white/8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex">
            {([
              { key: "single" as const,       label: "Single Purchase", sub: "Individual meals" },
              { key: "bundles" as const,       label: "Bundles",         sub: "Predefined packs" },
              { key: "subscription" as const,  label: "Subscription",    sub: "3 or 6 months" },
            ]).map((m) => (
              <button key={m.key} onClick={() => setPurchaseMode(m.key)}
                className={`px-6 py-4 text-left transition-all border-b-2 ${purchaseMode === m.key ? "border-[#F5B300] text-white" : "border-transparent text-white/35 hover:text-white/70"}`}>
                <div className="text-[12px] font-bold tracking-wide">{m.label}</div>
                <div className="text-[10px] mt-0.5 text-white/30">{m.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BUNDLES TAB ── */}
      {purchaseMode === "bundles" && (
      <section className="py-16 px-6 sm:px-8 bg-[#FAF9F6]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-[#E85D04] mb-3">Predefined Bundles</p>
            <h2 className="font-display text-[38px] sm:text-[52px] font-extrabold text-[#1A1A1A] leading-[0.92]">Choose your bundle<span className="text-[#F5B300]">.</span></h2>
            <p className="text-[#888] text-[15px] mt-3 max-w-[500px]">All bundles are curated and ready to go — pick the category and size that suits your week.</p>
          </div>

          <div className="space-y-14">
            {PREDEFINED_BUNDLES.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-[11px] font-mono tracking-[0.4em] uppercase text-[#1A1A1A] font-bold">{group.category}</div>
                  <div className="flex-1 h-px bg-[#E8E4DC]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((item) => {
                    const previewMeals = item.mealIds
                      .filter((id, idx, arr) => arr.indexOf(id) === idx)
                      .slice(0, 3)
                      .map((id) => MEALS.find((m) => m.id === id))
                      .filter(Boolean) as typeof MEALS;
                    return (
                    <div key={item.name} className="bg-white border border-[#E8E4DC] flex flex-col hover:border-[#F5B300] hover:shadow-lg transition-all duration-300 group overflow-hidden">
                      {/* Meal image strip */}
                      <div className="flex h-28 overflow-hidden">
                        {previewMeals.map((m, pi) => (
                          <div key={pi} className="flex-1 overflow-hidden">
                            <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ))}
                        {previewMeals.length === 0 && <div className="flex-1 bg-[#F5F2EC]" />}
                      </div>

                      <div className="p-5 flex flex-col gap-3 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[14px] font-extrabold text-[#1A1A1A] leading-snug">{item.name}</div>
                            {item.variant && (
                              <div className="text-[10px] font-mono tracking-widest uppercase text-[#999] mt-1">{item.variant}</div>
                            )}
                          </div>
                          {item.badge && (
                            <span className="bg-[#F5B300] text-[#1A1A1A] text-[8px] font-extrabold tracking-[0.15em] uppercase px-2 py-1 shrink-0">{item.badge}</span>
                          )}
                        </div>
                        <p className="text-[12px] text-[#888] leading-relaxed flex-1">{item.desc}</p>

                        {/* Meal name pills */}
                        <div className="flex flex-wrap gap-1.5">
                          {previewMeals.map((m) => (
                            <span key={m.id} className="text-[10px] bg-[#FAF9F6] border border-[#E8E4DC] text-[#555] px-2 py-0.5 leading-snug">{m.name}</span>
                          ))}
                          {item.mealIds.filter((id, idx, arr) => arr.indexOf(id) === idx).length > 3 && (
                            <span className="text-[10px] bg-[#F5B300]/10 border border-[#F5B300]/30 text-[#E85D04] px-2 py-0.5 font-semibold">+{item.mealIds.filter((id, idx, arr) => arr.indexOf(id) === idx).length - 3} more</span>
                          )}
                        </div>

                        <div className="flex items-end justify-between pt-2 border-t border-[#F0EDE8]">
                          <div>
                            <span className="font-display text-[22px] font-extrabold text-[#1A1A1A]">${item.price.toFixed(2)}</span>
                            <span className="text-[11px] text-[#aaa] ml-1.5">{item.meals} meals · ${(item.price / item.meals).toFixed(2)}/meal</span>
                          </div>
                        </div>
                      <button
                        onClick={() => {
                          const bundleMeals = item.mealIds.map((id) => MEALS.find((m) => m.id === id)).filter(Boolean) as typeof MEALS;
                          addToCart({
                            id: parseInt(`${group.category.charCodeAt(0)}${item.name.charCodeAt(0)}${item.price * 100}`),
                            name: item.name,
                            price: item.price,
                            qty: 1,
                            img: bundleMeals[0]?.img ?? "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=200&fit=crop&auto=format",
                            type: "box",
                            mealNames: bundleMeals.map((m) => m.name),
                            mealImgs: bundleMeals.map((m) => m.img),
                          });
                        }}
                        className="w-full py-3 text-[11px] font-extrabold tracking-[0.15em] uppercase bg-[#1A1A1A] text-white hover:bg-[#F5B300] hover:text-[#1A1A1A] transition-colors">
                        Add to Cart →
                      </button>
                      </div>{/* p-5 */}
                    </div>/* card */
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 bg-[#FFF8E1] border border-[#F5B300]/30 text-[12px] text-[#888]">
            🚚 Free delivery on orders $120 and above · $10 delivery fee below $120
          </div>
        </div>
      </section>
      )}

      {/* ── SUBSCRIPTION TAB ── */}
      {purchaseMode === "subscription" && (
      <section className="py-14 px-6 sm:px-8 bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8">
            <div className="text-[#F5B300] text-[10px] font-mono tracking-[0.3em] uppercase mb-2">Ready Series Subscription</div>
            <h2 className="font-display text-[32px] sm:text-[40px] font-extrabold">Choose your subscription<span className="text-[#F5B300]">.</span></h2>
            <p className="text-white/40 text-[13px] mt-2">10 predefined subscription options. Select a term, then subscribe.</p>
          </div>

          {/* Term selector */}
          <div className="flex gap-0 mb-8 border border-white/10 p-1 bg-white/4 inline-flex">
            {([3, 6] as const).map((t) => (
              <button key={t} onClick={() => setSubTerm(t)}
                className={`px-8 py-3 text-[12px] font-bold tracking-wide transition-all ${subTerm === t ? "bg-[#F5B300] text-[#111]" : "text-white/40 hover:text-white"}`}>
                {t} Months
                <div className={`text-[10px] font-normal mt-0.5 ${subTerm === t ? "text-[#111]/60" : "text-white/25"}`}>
                  {t === 3 ? "Renews after 3 months" : "Renews after 6 months"}
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SUBSCRIPTION_PRODUCTS.map((sub) => {
              const price = subTerm === 3 ? sub.price3m : sub.price6m;
              const isSelected = selectedSub === sub.sku;
              return (
                <div key={sub.sku}
                  onClick={() => setSelectedSub(isSelected ? null : sub.sku)}
                  className={`cursor-pointer border p-5 flex flex-col gap-4 transition-all ${isSelected ? "border-[#F5B300] bg-[#F5B300]/5" : "border-white/8 bg-[#111] hover:border-white/20"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[13px] font-semibold leading-snug">{sub.name}</div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-white/30 mt-1">{sub.variant}</div>
                    </div>
                    {sub.badge && (
                      <span className="bg-[#F5B300] text-[#111] text-[8px] font-extrabold tracking-[0.15em] uppercase px-2 py-0.5 shrink-0">{sub.badge}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/30">
                    <span className="font-mono">{sub.items} items</span>
                    <span>·</span>
                    <span className="font-mono text-[9px] text-white/20">{sub.sku}</span>
                  </div>
                  <div className="mt-auto">
                    <div className="font-mono text-[24px] font-extrabold text-[#F5B300]">${price.toFixed(2)}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">for {subTerm} months · renews after</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart({ id: sub.sku.split("").reduce((a, c) => a + c.charCodeAt(0), 0), name: `${sub.name} (${sub.variant}) — ${subTerm}-Month Subscription`, price, qty: 1, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=200&fit=crop&auto=format", type: "box" }); }}
                    className={`w-full py-3 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${isSelected ? "bg-[#F5B300] text-[#111] hover:bg-white" : "bg-white/8 text-white/50 hover:bg-[#F5B300] hover:text-[#111] border border-white/10 hover:border-[#F5B300]"}`}>
                    Subscribe →
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 border border-white/8 bg-white/3 text-[11px] text-white/30 leading-relaxed">
            Ready Series Subscription delivers {subTerm === 3 ? "3" : "6"} times over your selected term and renews after {subTerm} months.
            Delivery dates are assigned after subscription is confirmed. Cancel or manage your subscription from your account.
          </div>
        </div>
      </section>
      )}

      {/* ── PRODUCT GRID (single purchase) ── */}
      {purchaseMode === "single" && (
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
      )}

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
              { icon: "🚚", label: "Free delivery $120+", desc: "Free delivery on orders $120 and above. $10 below." },
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
          {/* Free delivery progress — single/bundle only */}
          {toFreeDelivery > 0 && purchaseMode !== "subscription" && (
            <div className="bg-[#111] px-6 py-2 flex items-center gap-4">
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#F5B300] rounded-full transition-all" style={{ width: `${freeDeliveryPct}%` }} />
              </div>
              <span className="text-[11px] text-white/60 shrink-0">Add ${toFreeDelivery.toFixed(2)} for free delivery</span>
            </div>
          )}
          <button
            className="w-full px-6 py-4 flex items-center justify-between hover:brightness-95 transition-all cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <div className="text-left">
              <div className="font-extrabold text-[16px]">{cartQty} item{cartQty !== 1 ? "s" : ""} · ${cartTotal.toFixed(2)}</div>
              <div className="text-[11px] opacity-60">
                {purchaseMode === "subscription" ? "Delivery arranged after confirmation" : toFreeDelivery <= 0 ? "🎉 Free delivery" : `+ $${DELIVERY_FEE} delivery · Add $${toFreeDelivery.toFixed(2)} for free`}
              </div>
            </div>
            <div className="bg-[#111] text-white text-[11px] font-extrabold tracking-[0.2em] uppercase px-8 py-3">
              View Cart →
            </div>
          </button>
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
                  className="w-full bg-[#F5B300] text-[#111] py-3.5 font-bold text-[13px] tracking-wider uppercase hover:bg-white transition-colors">
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
