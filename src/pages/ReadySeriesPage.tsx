import { useState } from "react";
import { Page, CartItem } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
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

const BUNDLES = [
  { n: "Starter Pack", meals: 5, price: 62, ppm: 12.40, desc: "Perfect first order — try 5 different meals." },
  { n: "Weekly Pack", meals: 10, price: 119, ppm: 11.90, desc: "Stock the freezer for the full week.", badge: "MOST POPULAR" },
  { n: "Performance Pack", meals: 15, price: 172, ppm: 11.50, desc: "Serious about consistency. 15 meals sorted.", badge: "BEST VALUE" },
  { n: "Monthly Pack", meals: 20, price: 220, ppm: 11.00, desc: "Full month of performance nutrition locked in." },
];

const promos = [
  { code: "READY20", desc: "20% off your first Ready Series order", expires: "30 Sep 2026" },
  { code: "SG61", desc: "$6.10 off — Singapore National Day special", expires: "Ongoing" },
  { code: "FREEZER5", desc: "$5 off orders of 10+ meals", expires: "15 Oct 2026" },
];

export default function ReadySeriesPage({ navigate, addToCart, cart }: Props) {
  const [activeCat, setActiveCat] = useState("All");
  const [addedId, setAddedId] = useState<number | null>(null);

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

  const cartQty = cart.filter((i) => i.type === "ready").reduce((s, i) => s + i.qty, 0);

  return (
    <div className="bg-[#111111] text-white min-h-screen">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 50px,rgba(205,255,58,0.4) 50px,rgba(205,255,58,0.4) 51px),repeating-linear-gradient(90deg,transparent,transparent 50px,rgba(205,255,58,0.4) 50px,rgba(205,255,58,0.4) 51px)" }}
        />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#CDFF3A]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
          <button onClick={() => navigate("home")} className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[11px] font-mono tracking-widest uppercase mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Fresher
          </button>

          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 bg-[#CDFF3A] rounded-full" />
            <span className="text-[#CDFF3A] text-[10px] font-mono tracking-[0.35em] uppercase">Ready Series by Fresher</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="font-display text-[56px] sm:text-[72px] font-black leading-[0.88] mb-5">
                GOOD MEALS.<br />READY WHEN<br />YOU NEED<br /><span className="text-[#CDFF3A]">THEM.</span>
              </h1>
              <p className="text-white/50 text-[16px] leading-relaxed max-w-[420px]">
                Fast, enjoyable frozen meals that are ready when life gets busy. 40+ macro-tracked options. Keep your week moving.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <div className="bg-[#0A0A0A] border border-white/10 px-6 py-5 flex-1">
                <div className="text-[#CDFF3A] font-display text-[32px] font-black">3 min</div>
                <div className="text-white/40 text-[11px] tracking-wide mt-1">Ready to eat</div>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 px-6 py-5 flex-1">
                <div className="text-[#CDFF3A] font-display text-[32px] font-black">40+</div>
                <div className="text-white/40 text-[11px] tracking-wide mt-1">Meal options</div>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 px-6 py-5 flex-1">
                <div className="text-[#CDFF3A] font-display text-[32px] font-black">$10.90</div>
                <div className="text-white/40 text-[11px] tracking-wide mt-1">Starting from</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIVE PROMOS BAR ── */}
      <div className="bg-[#CDFF3A]/8 border-y border-[#CDFF3A]/15 px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
          <div className="text-[#CDFF3A] text-[10px] font-mono tracking-[0.3em] uppercase shrink-0">Active Promos</div>
          <div className="flex flex-wrap gap-4">
            {promos.map((p) => (
              <div key={p.code} className="flex items-center gap-2">
                <span className="bg-[#CDFF3A] text-[#111] text-[9px] font-black px-2 py-0.5 tracking-wider">{p.code}</span>
                <span className="text-white/50 text-[11px]">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BUNDLES / BUILD-A-BOX ── */}
      <section className="py-16 px-6 sm:px-8 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[#CDFF3A] text-[10px] font-mono tracking-[0.3em] uppercase mb-2">Useful Bundles</div>
              <h2 className="font-display text-[32px] sm:text-[40px] font-black">Stock up and save<span className="text-[#CDFF3A]">.</span></h2>
            </div>
            <button
              onClick={() => navigate("build-a-box")}
              className="inline-flex items-center gap-2 border border-[#CDFF3A]/40 text-[#CDFF3A] text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#CDFF3A] hover:text-[#111] transition-colors whitespace-nowrap"
            >
              Build-A-Box →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
            {BUNDLES.map((b) => (
              <div key={b.n} className="bg-[#0A0A0A] px-7 py-8 flex flex-col gap-3 relative">
                {b.badge && (
                  <div className="absolute top-4 right-4 bg-[#CDFF3A] text-[#111] text-[8px] font-black tracking-[0.15em] px-2 py-1">{b.badge}</div>
                )}
                <div className="text-white/30 text-[11px] font-mono">{b.meals} meals</div>
                <div className="font-display text-[20px] font-bold text-white">{b.n}</div>
                <div className="text-white/50 text-[12px] leading-relaxed">{b.desc}</div>
                <div className="mt-auto pt-4 border-t border-white/8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[28px] font-black text-[#CDFF3A]">${b.price}</span>
                    <span className="text-white/30 text-[12px]">${b.ppm}/meal</span>
                  </div>
                  <button
                    onClick={() => addToCart({ id: 200 + b.meals, name: `${b.n} (${b.meals} meals)`, price: b.price, qty: 1, img: MEALS[0].img, type: "box" })}
                    className="w-full mt-3 bg-white/8 text-white text-[11px] font-bold tracking-[0.2em] uppercase py-3 hover:bg-[#CDFF3A] hover:text-[#111] transition-colors"
                  >
                    Add Bundle
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("build-a-box")}
              className="inline-flex items-center gap-3 text-white/40 hover:text-[#CDFF3A] text-[12px] font-mono tracking-widest uppercase transition-colors"
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
              <div className="text-[#CDFF3A] text-[10px] font-mono tracking-[0.3em] uppercase mb-2">All Meals</div>
              <h2 className="font-display text-[32px] sm:text-[40px] font-black">
                {filtered.length} meals available<span className="text-[#CDFF3A]">.</span>
              </h2>
            </div>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${activeCat === c ? "bg-[#CDFF3A] text-[#111]" : "border border-white/15 text-white/50 hover:border-[#CDFF3A]/50 hover:text-[#CDFF3A]"}`}
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
              return (
                <div key={meal.id} className="bg-[#111] flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
                    <img src={meal.img} alt={meal.name} className="w-full h-full object-cover" />
                    {meal.badge && (
                      <div className="absolute top-3 left-3 bg-[#CDFF3A] text-[#111] text-[8px] font-black tracking-[0.15em] px-2 py-1">
                        {meal.badge}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-[#111]/80 text-white/60 text-[10px] font-mono px-2 py-1">
                      {meal.cat}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="font-display text-[15px] font-bold text-white leading-snug">{meal.name}</div>
                    <div className="flex gap-3 text-[10px] font-mono text-white/40">
                      <span>{meal.protein}g protein</span>
                      <span>·</span>
                      <span>{meal.cal} cal</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-white/8">
                      <span className="font-display text-[18px] font-black text-white">${meal.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAdd(meal)}
                        className={`px-4 py-2 text-[10px] font-black tracking-[0.15em] uppercase transition-colors ${justAdded ? "bg-[#7EE8B0] text-[#111]" : inCart ? "bg-[#CDFF3A]/20 text-[#CDFF3A] border border-[#CDFF3A]/30 hover:bg-[#CDFF3A] hover:text-[#111]" : "bg-[#CDFF3A] text-[#111] hover:bg-white"}`}
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
      <section className="py-16 bg-[#0A0A0A] px-6 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#CDFF3A] text-[10px] font-mono tracking-[0.3em] uppercase mb-3">Why Ready Series</div>
            <h2 className="font-display text-[36px] sm:text-[48px] font-black">
              A busy day does not have<br />to knock you off track<span className="text-[#CDFF3A]">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
            {[
              { icon: "🧊", label: "Frozen at peak", desc: "Locked in at maximum freshness and nutrition." },
              { icon: "⏱", label: "3-minute prep", desc: "Microwave from frozen. No thaw time needed." },
              { icon: "📊", label: "Macro tracked", desc: "Every gram counted. No guesswork required." },
              { icon: "🚚", label: "Next-day delivery", desc: "Order today, delivered to your door tomorrow." },
            ].map((f) => (
              <div key={f.label} className="bg-[#0A0A0A] px-7 py-8">
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
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#CDFF3A] text-[#111] px-6 py-4 flex items-center justify-between">
          <div>
            <div className="font-black text-[16px]">{cartQty} meal{cartQty !== 1 ? "s" : ""} in your box</div>
            <div className="text-[11px] opacity-60">Continue adding or head to checkout</div>
          </div>
          <button
            onClick={() => navigate("checkout")}
            className="bg-[#111] text-white text-[11px] font-black tracking-[0.2em] uppercase px-8 py-3 hover:bg-white hover:text-[#111] transition-colors"
          >
            Checkout →
          </button>
        </div>
      )}
    </div>
  );
}
