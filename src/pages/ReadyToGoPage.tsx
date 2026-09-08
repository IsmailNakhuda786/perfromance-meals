import { useState } from "react";
import { BUNDLES, CartItem, CATS, Meal, MEALS, Page, PROMOTIONS } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

export default function ReadyToGoPage({ navigate, addToCart, cart }: Props) {
  const [activeCat, setActiveCat] = useState("all");
  const [sort, setSort] = useState("popular");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [added, setAdded] = useState<number | null>(null);

  const filtered = (activeCat === "all" ? MEALS : MEALS.filter((m) => m.cat === activeCat))
    .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : b.reviews - a.reviews);

  const getCartQty = (mealId: number) => {
    const item = cart.find((i) => i.id === mealId && i.type === "ready");
    return item ? item.qty : 0;
  };

  const handleAdd = (meal: Meal) => {
    addToCart({ id: meal.id, name: meal.name, price: meal.price, qty: 1, img: meal.img, type: "ready" });
    setAdded(meal.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white">
      {/* Hero banner */}
      <div className="relative h-40 sm:h-52 overflow-hidden bg-[#111]">
        <img src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=1400&h=400&fit=crop&auto=format" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-transparent to-[#0E0E0E]" />
        <div className="relative max-w-[1440px] mx-auto px-6 h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase">01 / Ready Series</span>
            <div className="h-px w-12 bg-[#CDFF3A]/30" />
          </div>
          <h1 className="font-display text-[32px] sm:text-[48px] font-bold">Ready-to-Go Meals</h1>
          <p className="text-white/40 mt-1 text-[14px]">Macro-accurate. Frozen at peak nutrition. Heat in 3 minutes.</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-10">
        {/* Build-A-Box CTA */}
        <div className="mb-8 border border-[#CDFF3A]/20 bg-[#CDFF3A]/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#CDFF3A] mb-1 uppercase">Save more</div>
            <h3 className="font-display text-[22px] font-bold">Build-A-Box — from $11.00/meal</h3>
            <p className="text-white/40 text-[13px] mt-1">Mix & match any 5–20 meals. Best value on the site.</p>
          </div>
          <button onClick={() => navigate("build-a-box")} className="inline-flex items-center gap-2 bg-[#CDFF3A] text-[#111111] px-6 py-3 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors whitespace-nowrap shrink-0">
            Start Building →
          </button>
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATS.map((c) => (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                className={`px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase font-medium whitespace-nowrap transition-all ${activeCat === c.id ? "bg-[#CDFF3A] text-[#111111]" : "border border-white/12 text-white/40 hover:border-white/35 hover:text-white"}`}>
                {c.label}
              </button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="bg-[#1A1A1A] border border-white/12 text-white/50 text-[12px] px-4 py-2.5 outline-none cursor-pointer">
            <option value="popular">Sort: Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Promotion grid */}
        {activeCat === "promotion" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {PROMOTIONS.map((p) => (
              <div key={p.id} className="bg-[#1A1A1A] overflow-hidden border border-[#CDFF3A]/20">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute top-3 left-3 bg-[#CDFF3A] text-[#111] text-[10px] font-bold px-2 py-1 tracking-wider uppercase">{p.tag}</div>
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase">{p.saving}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[15px] mb-1">{p.name}</h3>
                  <p className="text-white/40 text-[12px] mb-3">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[20px] text-[#CDFF3A]">${p.sale}</span>
                      <span className="font-mono text-[14px] text-white/25 line-through">${p.original}</span>
                    </div>
                    <button onClick={() => addToCart({ id: p.id, name: p.name, price: p.sale, qty: 1, img: p.img, type: "ready" })}
                      className="bg-[#CDFF3A] text-[#111] px-4 py-2 text-[11px] font-bold tracking-wider uppercase hover:bg-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bundles grid */}
        {activeCat === "bundles" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {BUNDLES.map((b) => (
              <div key={b.id} className="bg-[#1A1A1A] overflow-hidden border border-white/5">
                <div className="relative h-44 overflow-hidden">
                  <img src={b.img} alt={b.name} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute top-3 left-3 bg-white/10 backdrop-blur text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase">{b.tag}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[14px] mb-1">{b.name}</h3>
                  <p className="text-white/40 text-[12px] mb-3">{b.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-[18px] text-[#CDFF3A]">${b.price}</span>
                      <span className="text-white/30 text-[11px] ml-1">(${b.perMeal}/meal)</span>
                    </div>
                    <button onClick={() => addToCart({ id: b.id, name: b.name, price: b.price, qty: 1, img: b.img, type: "box" })}
                      className="bg-white/10 hover:bg-[#CDFF3A] hover:text-[#111] text-white px-4 py-2 text-[11px] font-bold tracking-wider uppercase transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Count — only for meal categories */}
        {activeCat !== "promotion" && activeCat !== "bundles" && (
          <p className="text-white/30 text-[12px] mb-6 tracking-wider uppercase">{filtered.length} meals</p>
        )}

        {/* Grid — only for meal categories */}
        {activeCat !== "promotion" && activeCat !== "bundles" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((meal) => {
            const qtyInCart = getCartQty(meal.id);
            return (
              <div key={meal.id} className={`group bg-[#1A1A1A] overflow-hidden ${qtyInCart > 0 ? "ring-1 ring-[#CDFF3A]/40" : ""}`}>
                {/* Image */}
                <div className="relative h-52 bg-[#222] overflow-hidden cursor-pointer" onClick={() => setSelectedMeal(meal)}>
                  {meal.badge && (
                    <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-bold ${meal.badge === "Bestseller" || meal.badge === "Staff Pick" ? "bg-[#CDFF3A] text-[#111111]" : "bg-black/50 text-white backdrop-blur-sm border border-white/10"}`}>
                      {meal.badge}
                    </div>
                  )}
                  {/* Cart quantity badge */}
                  {qtyInCart > 0 && (
                    <div className="absolute top-3 right-3 z-10 bg-[#CDFF3A] text-[#111111] font-bold text-[12px] w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
                      {qtyInCart}
                    </div>
                  )}
                  <img src={meal.img} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/10 backdrop-blur-sm text-white text-[11px] uppercase tracking-widest px-4 py-2 border border-white/20">View Details</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  {/* Meal type badge */}
                  {(() => {
                    const typeMap: Record<string, { label: string; bg: string; text: string }> = {
                      "high-carb":    { label: "High Carb",    bg: "#F2C94C22", text: "#F2C94C" },
                      "low-carb":     { label: "Low Carb",     bg: "#7EE8B022", text: "#7EE8B0" },
                      "just-protein": { label: "Just Protein", bg: "#A78BFA22", text: "#A78BFA" },
                      "breakfast":    { label: "Breakfast",    bg: "#FB923C22", text: "#FB923C" },
                    };
                    const t = typeMap[meal.cat];
                    return t ? (
                      <span className="inline-block text-[9px] font-mono font-bold tracking-[0.25em] uppercase px-2 py-1 mb-2 border"
                        style={{ color: t.text, backgroundColor: t.bg, borderColor: t.text + "44" }}>
                        {t.label}
                      </span>
                    ) : null;
                  })()}
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="text-[14px] font-medium leading-snug cursor-pointer hover:text-[#CDFF3A] transition-colors" onClick={() => setSelectedMeal(meal)}>{meal.name}</h3>
                    <span className="text-[#CDFF3A] font-bold text-[15px] whitespace-nowrap font-mono">${meal.price.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 mb-4">
                    {[{ label: "CAL", val: meal.cal }, { label: "PRO", val: `${meal.protein}g` }, { label: "CARB", val: `${meal.carbs}g` }, { label: "FAT", val: `${meal.fat}g` }].map((m) => (
                      <div key={m.label} className="bg-[#252525] px-1.5 py-2 text-center">
                        <div className="font-mono text-[9px] text-white/25 mb-0.5 tracking-wider">{m.label}</div>
                        <div className="font-mono text-[11px] text-white font-medium">{m.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-white/35">
                      <span className="text-[#CDFF3A]">{"★".repeat(Math.round(meal.rating))}</span> {meal.rating} ({meal.reviews})
                    </div>
                    <button
                      onClick={() => handleAdd(meal)}
                      className={`px-4 py-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-all ${added === meal.id ? "bg-[#7EE8B0] text-[#111111]" : "bg-[#CDFF3A] text-[#111111] hover:bg-white"}`}
                    >
                      {added === meal.id ? "✓ Added" : qtyInCart > 0 ? `+ Add more` : "+ Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>

      {/* Testimonials */}
      {activeCat === "all" && (
        <div className="bg-[#1A1A1A] border-t border-white/5 px-6 py-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-8">
              <span className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A]/50 uppercase">Customer Reviews</span>
              <h3 className="font-display text-[28px] font-bold text-white mt-2">8,400+ happy customers</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Marcus L.", text: "The macros are spot on. Teriyaki Chicken is my weekly staple.", stars: 5 },
                { name: "Priya S.", text: "Heats in 3 minutes and tastes like a restaurant meal. Game changer.", stars: 5 },
                { name: "Wei Jian T.", text: "Best value meal prep in SG. The Build-A-Box saves me money every week.", stars: 5 },
              ].map((t) => (
                <div key={t.name} className="bg-[#222] p-5">
                  <div className="text-[#CDFF3A] text-[14px] mb-3">{"★".repeat(t.stars)}</div>
                  <p className="text-white/60 text-[13px] leading-relaxed mb-4">"{t.text}"</p>
                  <div className="text-white/40 text-[12px] font-medium">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedMeal(null)} />
          <div className="relative bg-[#1A1A1A] w-full max-w-2xl overflow-hidden max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedMeal(null)} className="absolute top-4 right-4 z-10 text-white/50 hover:text-white bg-black/30 rounded-full p-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            <div className="h-48 sm:h-64 relative bg-[#222]">
              <img src={selectedMeal.img} alt={selectedMeal.name} className="w-full h-full object-cover" />
              {selectedMeal.badge && (
                <div className={`absolute top-4 left-4 px-3 py-1 text-[11px] tracking-[0.18em] uppercase font-bold ${selectedMeal.badge === "Bestseller" || selectedMeal.badge === "Staff Pick" ? "bg-[#CDFF3A] text-[#111111]" : "bg-black/60 text-white backdrop-blur-sm"}`}>
                  {selectedMeal.badge}
                </div>
              )}
              {getCartQty(selectedMeal.id) > 0 && (
                <div className="absolute top-4 right-4 bg-[#CDFF3A] text-[#111] text-[12px] font-bold px-3 py-1">
                  {getCartQty(selectedMeal.id)} in cart
                </div>
              )}
            </div>
            <div className="p-7">
              {(() => {
                const typeMap: Record<string, { label: string; color: string }> = {
                  "high-carb":    { label: "High Carb",    color: "#F2C94C" },
                  "low-carb":     { label: "Low Carb",     color: "#7EE8B0" },
                  "just-protein": { label: "Just Protein", color: "#A78BFA" },
                  "breakfast":    { label: "Breakfast",    color: "#FB923C" },
                };
                const t = typeMap[selectedMeal.cat];
                return t ? (
                  <span className="inline-block text-[10px] font-mono font-bold tracking-[0.25em] uppercase px-2.5 py-1 mb-3 border"
                    style={{ color: t.color, borderColor: t.color + "55", backgroundColor: t.color + "15" }}>
                    {t.label}
                  </span>
                ) : null;
              })()}
              <div className="flex items-start justify-between mb-3 gap-3">
                <h2 className="font-display text-[26px] font-bold">{selectedMeal.name}</h2>
                <span className="font-mono text-[22px] text-[#CDFF3A] font-bold shrink-0">${selectedMeal.price.toFixed(2)}</span>
              </div>
              <p className="text-white/50 text-[14px] leading-relaxed mb-6">{selectedMeal.desc}</p>

              <div className="grid grid-cols-4 gap-2 mb-6">
                {[{ label: "Calories", val: selectedMeal.cal }, { label: "Protein", val: `${selectedMeal.protein}g` }, { label: "Carbs", val: `${selectedMeal.carbs}g` }, { label: "Fat", val: `${selectedMeal.fat}g` }].map((m) => (
                  <div key={m.label} className="bg-[#222] px-3 py-3 text-center">
                    <div className="font-mono text-[13px] text-[#CDFF3A] font-medium">{m.val}</div>
                    <div className="text-white/30 text-[10px] mt-1 uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[12px] text-white/30 mb-6">
                <span className="text-[#CDFF3A]">{"★".repeat(Math.round(selectedMeal.rating))}</span>
                <span>{selectedMeal.rating} · {selectedMeal.reviews} reviews</span>
              </div>

              <div className="border border-white/10 p-4 mb-6 text-[12px] text-white/40 space-y-1">
                <div>❄️ Frozen at peak freshness · 2-month freezer life</div>
                <div>⚡ Heat in 3 minutes in microwave or oven</div>
                <div>✓ USDA nutritional standards · Macro-labelled</div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => { handleAdd(selectedMeal); setSelectedMeal(null); }}
                  className="flex-1 bg-[#CDFF3A] text-[#111111] py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                  Add to Cart — ${selectedMeal.price.toFixed(2)}
                </button>
                <button onClick={() => { navigate("build-a-box"); setSelectedMeal(null); }}
                  className="border border-white/15 px-5 py-4 text-[11px] text-white/40 hover:border-[#CDFF3A] hover:text-[#CDFF3A] transition-colors whitespace-nowrap">
                  Add to Box
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
