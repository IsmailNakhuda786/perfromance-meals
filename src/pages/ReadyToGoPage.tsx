import { useState } from "react";
import { ALL_REVIEWS, BUNDLES, CartItem, CATS, Meal, MEALS, Page, PROMOTIONS } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

type Bundle = typeof BUNDLES[0];

export default function ReadyToGoPage({ navigate, addToCart, cart }: Props) {
  const [activeCat, setActiveCat] = useState("all");
  const [sort, setSort] = useState("popular");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [added, setAdded] = useState<number | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [bundleSlide, setBundleSlide] = useState(0);

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
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Hero banner */}
      <div className="relative h-40 sm:h-52 overflow-hidden bg-[#111]">
        <img src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=1400&h=400&fit=crop&auto=format" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-transparent to-[#1A1A1A]" />
        <div className="relative max-w-[1440px] mx-auto px-6 h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#F5B300] uppercase">01 / Ready Series</span>
            <div className="h-px w-12 bg-[#F5B300]/30" />
          </div>
          <h1 className="font-display text-[32px] sm:text-[48px] font-extrabold uppercase">FROZEN AT PEAK.<br />READY ON DEMAND.</h1>
          <p className="text-white/40 mt-1 text-[14px]">Fast, enjoyable frozen meals that are ready when life gets busy. Keep your week moving.</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-10">
        {/* Build-A-Box CTA */}
        <div className="mb-8 border border-[#F5B300]/20 bg-[#F5B300]/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#F5B300] mb-1 uppercase">Save more</div>
            <h3 className="font-display text-[22px] font-bold">Box Subscription — from $10.00/meal</h3>
            <p className="text-white/40 text-[13px] mt-1">Pick your meals, set a cadence. 10% off every delivery. Cancel anytime.</p>
          </div>
          <button onClick={() => navigate("build-a-box")} className="inline-flex items-center gap-2 bg-[#F5B300] text-[#111111] px-6 py-3 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors whitespace-nowrap shrink-0">
            Subscribe &amp; Save →
          </button>
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {CATS.map((c) => (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                className={`px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase font-medium whitespace-nowrap transition-all ${activeCat === c.id ? "bg-[#F5B300] text-[#111111]" : "border border-white/12 text-white/40 hover:border-white/35 hover:text-white"}`}>
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
              <div key={p.id} className="bg-[#1A1A1A] overflow-hidden border border-[#F5B300]/20">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute top-3 left-3 bg-[#F5B300] text-[#111] text-[10px] font-bold px-2 py-1 tracking-wider uppercase">{p.tag}</div>
                  <div className="absolute top-3 right-3 bg-[#F5B300] text-[#1A1A1A] text-[10px] font-bold px-2 py-1 tracking-wider uppercase">{p.saving}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[15px] mb-1">{p.name}</h3>
                  <p className="text-white/40 text-[12px] mb-3">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[20px] text-[#F5B300]">${p.sale}</span>
                      <span className="font-mono text-[14px] text-white/25 line-through">${p.original}</span>
                    </div>
                    <button onClick={() => addToCart({ id: p.id, name: p.name, price: p.sale, qty: 1, img: p.img, type: "ready" })}
                      className="bg-[#F5B300] text-[#111] px-4 py-2 text-[11px] font-bold tracking-wider uppercase hover:bg-white transition-colors">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            {BUNDLES.map((b) => {
              const uniqueMeals = Array.from(new Set(b.mealIds)).map((id) => MEALS.find((m) => m.id === id)).filter(Boolean) as typeof MEALS;
              return (
                <div key={b.id} className="bg-[#111] border border-white/8 flex flex-col overflow-hidden">

                  {/* Meal image strip — clickable, shows all meals */}
                  <div className="relative">
                    {b.tag === "Best Value" || b.tag === "Popular" ? (
                      <div className="absolute top-3 left-3 z-10 bg-[#F5B300] text-[#111] text-[9px] font-extrabold px-2 py-1 tracking-widest uppercase">
                        {b.tag === "Popular" ? "MOST POPULAR" : b.tag.toUpperCase()}
                      </div>
                    ) : null}
                    <div className="absolute top-3 right-3 z-10 bg-black/60 text-white/60 text-[10px] font-mono px-2 py-1">
                      {b.mealIds.length} meals
                    </div>
                    <div className="flex overflow-x-auto scrollbar-none">
                      {uniqueMeals.map((m, i) => (
                        <div key={i} className="shrink-0 w-[22%] min-w-[110px] relative group cursor-pointer"
                          onClick={() => { setSelectedBundle(b); setBundleSlide(i); }}>
                          <div className="h-[140px] overflow-hidden">
                            <img src={m.img} alt={m.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400 opacity-85 group-hover:opacity-100" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-1.5 pt-4">
                            <p className="text-white text-[9px] font-semibold leading-tight truncate">{m.name.split(" & ")[0]}</p>
                          </div>
                        </div>
                      ))}
                      {/* See more arrow */}
                      <div className="shrink-0 w-10 flex items-center justify-center bg-black/40 cursor-pointer hover:bg-[#F5B300]/20 transition-colors"
                        onClick={() => { setSelectedBundle(b); setBundleSlide(0); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="opacity-60"><path d="M9 18l6-6-6-6"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Bundle info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-bold text-[18px] text-white leading-tight">{b.name}</h3>
                      <div className="text-right shrink-0">
                        <div className="font-mono font-extrabold text-[24px] text-[#F5B300] leading-none">${b.price}</div>
                        <div className="text-white/30 text-[11px]">${b.perMeal}/meal</div>
                      </div>
                    </div>
                    <p className="text-white/40 text-[13px] mb-4">{b.desc}</p>

                    {/* Meal name tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {uniqueMeals.slice(0, 4).map((m, i) => (
                        <span key={i} className="text-[10px] text-white/50 border border-white/10 px-2.5 py-1 font-mono">
                          {m.name.split(" & ")[0]}
                        </span>
                      ))}
                      {uniqueMeals.length > 4 && (
                        <button onClick={() => { setSelectedBundle(b); setBundleSlide(0); }}
                          className="text-[10px] text-[#F5B300] border border-[#F5B300]/30 px-2.5 py-1 font-mono hover:bg-[#F5B300]/10 transition-colors">
                          +{uniqueMeals.length - 4} more →
                        </button>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => { setSelectedBundle(b); setBundleSlide(0); }}
                        className="border border-white/20 text-white/50 px-4 py-3 text-[10px] font-bold tracking-widest uppercase hover:border-[#F5B300] hover:text-[#F5B300] transition-colors whitespace-nowrap">
                        View Contents
                      </button>
                      <button onClick={() => addToCart({ id: b.id, name: b.name, price: b.price, qty: 1, img: b.img, type: "box" })}
                        className="flex-1 bg-white/8 hover:bg-[#F5B300] hover:text-[#111] text-white py-3 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors">
                        ADD BUNDLE — ${b.price}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
              <div key={meal.id} className={`group bg-[#1A1A1A] overflow-hidden ${qtyInCart > 0 ? "ring-1 ring-[#F5B300]/40" : ""}`}>
                {/* Image */}
                <div className="relative h-52 bg-[#222] overflow-hidden cursor-pointer" onClick={() => setSelectedMeal(meal)}>
                  {meal.badge && (
                    <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-bold ${meal.badge === "Bestseller" || meal.badge === "Staff Pick" ? "bg-[#F5B300] text-[#111111]" : "bg-black/50 text-white backdrop-blur-sm border border-white/10"}`}>
                      {meal.badge}
                    </div>
                  )}
                  {/* Cart quantity badge */}
                  {qtyInCart > 0 && (
                    <div className="absolute top-3 right-3 z-10 bg-[#F5B300] text-[#1A1A1A] font-bold text-[12px] w-7 h-7 flex items-center justify-center border border-[#1A1A1A]/20">
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
                      "high-carb":    { label: "High Carb",    bg: "#F5B30022", text: "#F5B300" },
                      "low-carb":     { label: "Low Carb",     bg: "#ffffff15", text: "#ffffff80" },
                      "just-protein": { label: "Just Protein", bg: "#ffffff15", text: "#ffffff80" },
                      "breakfast":    { label: "Breakfast",    bg: "#F5B30022", text: "#F5B300" },
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
                    <h3 className="text-[14px] font-medium leading-snug cursor-pointer hover:text-[#F5B300] transition-colors" onClick={() => setSelectedMeal(meal)}>{meal.name}</h3>
                    <span className="text-[#F5B300] font-bold text-[15px] whitespace-nowrap font-mono">${meal.price.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 mb-4">
                    {[{ label: "CAL", val: meal.cal }, { label: "PRO", val: `${meal.protein}g` }, { label: "CARB", val: `${meal.carbs}g` }, { label: "FAT", val: `${meal.fat}g` }].map((m) => (
                      <div key={m.label} className="bg-[#252525] px-1 py-1.5 sm:px-1.5 sm:py-2 text-center">
                        <div className="font-mono text-[9px] text-white/25 mb-0.5 tracking-wider">{m.label}</div>
                        <div className="font-mono text-[11px] text-white font-medium">{m.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-white/35">
                      <span className="text-[#F5B300]">{"★".repeat(Math.round(meal.rating))}</span> {meal.rating} ({meal.reviews})
                    </div>
                    <button
                      onClick={() => handleAdd(meal)}
                      className={`px-4 py-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-all ${added === meal.id ? "bg-white text-[#1A1A1A]" : "bg-[#F5B300] text-[#1A1A1A] hover:bg-white"}`}
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
              <span className="font-mono text-[10px] tracking-[0.45em] text-[#F5B300]/50 uppercase">Customer Reviews</span>
              <h3 className="font-display text-[28px] font-bold text-white mt-2">8,400+ happy customers</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Marcus L.", text: "The macros are spot on. Teriyaki Chicken is my weekly staple.", stars: 5 },
                { name: "Priya S.", text: "Heats in 3 minutes and tastes like a restaurant meal. Game changer.", stars: 5 },
                { name: "Wei Jian T.", text: "Best value meal prep in SG. The Build-A-Box saves me money every week.", stars: 5 },
              ].map((t) => (
                <div key={t.name} className="bg-[#222] p-5">
                  <div className="text-[#F5B300] text-[14px] mb-3">{"★".repeat(t.stars)}</div>
                  <p className="text-white/60 text-[13px] leading-relaxed mb-4">"{t.text}"</p>
                  <div className="text-white/40 text-[12px] font-medium">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bundle Detail Dialog */}
      {selectedBundle && (() => {
        const uniqueIds = Array.from(new Set(selectedBundle.mealIds));
        const bundleMeals = uniqueIds.map((id) => MEALS.find((m) => m.id === id)).filter(Boolean) as Meal[];
        const totalSlides = bundleMeals.length;
        const slide = Math.max(0, Math.min(bundleSlide, totalSlides - 1));
        const current = bundleMeals[slide];
        const qty = selectedBundle.mealIds.filter((id) => id === current?.id).length;
        return (
          <div className="fixed inset-0 z-[95] flex items-center justify-center p-2 sm:p-4">
            <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedBundle(null)} />
            <div className="relative bg-[#1A1A1A] w-full max-w-3xl overflow-hidden max-h-[100dvh] sm:max-h-[92vh] flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-white/10">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-1">📦 Bundle Contents</div>
                  <h2 className="font-display text-[22px] font-extrabold">{selectedBundle.name}</h2>
                  <p className="text-white/40 text-[13px] mt-0.5">{selectedBundle.desc}</p>
                </div>
                <button onClick={() => setSelectedBundle(null)} className="text-white/30 hover:text-white ml-4 shrink-0 p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Carousel */}
              <div className="flex-1 overflow-y-auto">
                {/* Slide counter + nav */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <span className="text-[11px] text-white/30 font-mono">{slide + 1} / {totalSlides} meals in this bundle</span>
                  <div className="flex gap-2">
                    <button onClick={() => setBundleSlide(Math.max(0, slide - 1))} disabled={slide === 0}
                      className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-[#F5B300] hover:text-[#F5B300] disabled:opacity-25 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onClick={() => setBundleSlide(Math.min(totalSlides - 1, slide + 1))} disabled={slide === totalSlides - 1}
                      className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-[#F5B300] hover:text-[#F5B300] disabled:opacity-25 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>

                {/* Dot pills */}
                <div className="flex gap-1.5 px-5 mb-5">
                  {bundleMeals.map((_, i) => (
                    <button key={i} onClick={() => setBundleSlide(i)}
                      className={`transition-all h-1.5 ${i === slide ? "w-6 bg-[#F5B300]" : "w-1.5 bg-white/20 hover:bg-white/40"}`} />
                  ))}
                </div>

                {current && (
                  <div className="px-5 pb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
                      {/* Meal image */}
                      <div className="sm:col-span-3 relative overflow-hidden h-60">
                        <img src={current.img} alt={current.name} className="w-full h-full object-cover" />
                        {qty > 1 && (
                          <div className="absolute top-3 right-3 bg-[#F5B300] text-[#1A1A1A] font-extrabold text-[12px] px-3 py-1">
                            ×{qty} in bundle
                          </div>
                        )}
                        {current.badge && (
                          <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 tracking-widest uppercase backdrop-blur-sm">
                            {current.badge}
                          </div>
                        )}
                      </div>
                      {/* Meal details */}
                      <div className="sm:col-span-2 flex flex-col justify-between gap-4">
                        <div>
                          <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1">{current.cat}</div>
                          <h3 className="font-bold text-[18px] leading-snug mb-2">{current.name}</h3>
                          <p className="text-white/40 text-[13px] leading-relaxed">{current.desc}</p>
                        </div>
                        {/* Macros */}
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { label: "CAL", val: current.cal },
                            { label: "PRO", val: `${current.protein}g` },
                            { label: "CARB", val: `${current.carbs}g` },
                            { label: "FAT", val: `${current.fat}g` },
                          ].map((m) => (
                            <div key={m.label} className="bg-[#222] py-2.5 text-center">
                              <div className="font-mono text-[12px] text-[#F5B300] font-medium">{m.val}</div>
                              <div className="text-white/25 text-[9px] mt-0.5 uppercase tracking-wider">{m.label}</div>
                            </div>
                          ))}
                        </div>
                        {/* Reviews for this meal */}
                        {(() => {
                          const revs = ALL_REVIEWS[current.id] ?? [];
                          if (revs.length === 0) return null;
                          const avg = revs.reduce((s, r) => s + r.rating, 0) / revs.length;
                          return (
                            <div className="flex items-center gap-2">
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i} className={`text-[12px] ${i < Math.round(avg) ? "text-[#F5B300]" : "text-white/15"}`}>★</span>
                                ))}
                              </div>
                              <span className="font-mono text-[12px] text-[#F5B300] font-bold">{avg.toFixed(1)}</span>
                              <span className="text-white/25 text-[11px]">{revs.length} reviews</span>
                            </div>
                          );
                        })()}
                        <div className="font-mono text-[15px] text-[#F5B300] font-bold">${current.price.toFixed(2)} each</div>
                      </div>
                    </div>

                    {/* Top review for this meal */}
                    {(() => {
                      const topRev = (ALL_REVIEWS[current.id] ?? [])[0];
                      if (!topRev) return null;
                      return (
                        <div className="mt-5 border border-white/10 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-[#F5B300] flex items-center justify-center font-extrabold text-[10px] text-[#1A1A1A]">
                                {topRev.author.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-[12px]">{topRev.author} <span className="text-white/25 font-normal">· {topRev.role}</span></div>
                              </div>
                            </div>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`text-[11px] ${i < topRev.rating ? "text-[#F5B300]" : "text-white/15"}`}>★</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-[12px] text-white/50 leading-relaxed italic">"{topRev.text}"</p>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Thumbnail strip */}
                <div className="flex gap-2 px-5 pb-5 overflow-x-auto">
                  {bundleMeals.map((m, i) => (
                    <button key={i} onClick={() => setBundleSlide(i)}
                      className={`w-16 h-16 shrink-0 overflow-hidden border-2 transition-all ${i === slide ? "border-[#F5B300]" : "border-transparent opacity-40 hover:opacity-70"}`}>
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="border-t border-white/10 p-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-white/30 mb-0.5">{selectedBundle.mealIds.length} meals total</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-extrabold text-[24px] text-[#F5B300]">${selectedBundle.price}</span>
                    <span className="text-white/30 text-[13px]">${selectedBundle.perMeal}/meal</span>
                  </div>
                </div>
                <button onClick={() => { addToCart({ id: selectedBundle.id, name: selectedBundle.name, price: selectedBundle.price, qty: 1, img: selectedBundle.img, type: "box" }); setSelectedBundle(null); }}
                  className="bg-[#F5B300] text-[#111111] px-8 py-4 font-bold text-[13px] tracking-[0.15em] uppercase hover:bg-white transition-colors">
                  Add Bundle to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Cross-link: Meal Plan */}
      <div className="bg-[#F5B300]/10 border-t border-[#F5B300]/25 px-6 py-8 text-center">
        <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#F5B300] mb-2">Meal Plan</p>
        <p className="font-display text-[20px] font-bold text-white mb-1">Want structured nutrition with personal support?</p>
        <p className="text-white/40 text-[13px] mb-5">Goal-led meal plans with check-ins, macro tracking, and full flexibility.</p>
        <button onClick={() => navigate("meal-plan-landing")}
          className="bg-[#E85D04] text-white px-8 py-3 font-bold text-[12px] tracking-[0.18em] uppercase hover:bg-white hover:text-[#1A1A1A] transition-colors">
          Explore Meal Plans →
        </button>
      </div>

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
                <div className={`absolute top-4 left-4 px-3 py-1 text-[11px] tracking-[0.18em] uppercase font-bold ${selectedMeal.badge === "Bestseller" || selectedMeal.badge === "Staff Pick" ? "bg-[#F5B300] text-[#111111]" : "bg-black/60 text-white backdrop-blur-sm"}`}>
                  {selectedMeal.badge}
                </div>
              )}
              {getCartQty(selectedMeal.id) > 0 && (
                <div className="absolute top-4 right-4 bg-[#F5B300] text-[#111] text-[12px] font-bold px-3 py-1">
                  {getCartQty(selectedMeal.id)} in cart
                </div>
              )}
            </div>
            <div className="p-7">
              {(() => {
                const typeMap: Record<string, { label: string; color: string }> = {
                  "high-carb":    { label: "High Carb",    color: "#F5B300" },
                  "low-carb":     { label: "Low Carb",     color: "#ffffff80" },
                  "just-protein": { label: "Just Protein", color: "#ffffff80" },
                  "breakfast":    { label: "Breakfast",    color: "#F5B300" },
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
                <span className="font-mono text-[22px] text-[#F5B300] font-bold shrink-0">${selectedMeal.price.toFixed(2)}</span>
              </div>
              <p className="text-white/50 text-[14px] leading-relaxed mb-6">{selectedMeal.desc}</p>

              <div className="grid grid-cols-4 gap-2 mb-6">
                {[{ label: "Calories", val: selectedMeal.cal }, { label: "Protein", val: `${selectedMeal.protein}g` }, { label: "Carbs", val: `${selectedMeal.carbs}g` }, { label: "Fat", val: `${selectedMeal.fat}g` }].map((m) => (
                  <div key={m.label} className="bg-[#222] px-1 py-1.5 sm:px-3 sm:py-3 text-center">
                    <div className="font-mono text-[13px] text-[#F5B300] font-medium">{m.val}</div>
                    <div className="text-white/30 text-[10px] mt-1 uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Rating row */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-[15px] ${i < Math.round(selectedMeal.rating) ? "text-[#F5B300]" : "text-white/15"}`}>★</span>
                ))}</div>
                <span className="font-mono font-bold text-[14px] text-[#F5B300]">{selectedMeal.rating}</span>
                <span className="text-white/30 text-[12px]">{selectedMeal.reviews} reviews</span>
              </div>

              {/* Customer reviews preview */}
              {(() => {
                const revs = ALL_REVIEWS[selectedMeal.id] ?? [];
                if (revs.length === 0) return null;
                return (
                  <div className="border border-white/10 mb-6">
                    <div className="px-4 py-3 bg-white/5 border-b border-white/8 flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#F5B300]">Customer Reviews</span>
                      <span className="text-[10px] text-white/25">{revs.length} verified</span>
                    </div>
                    <div className="divide-y divide-white/8">
                      {revs.slice(0, 3).map((r, i) => (
                        <div key={i} className="px-4 py-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-[#F5B300] flex items-center justify-center font-extrabold text-[10px] text-[#1A1A1A] shrink-0">
                                {r.author.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-[12px] text-white">{r.author}</div>
                                <div className="text-[10px] text-white/30">{r.role}</div>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="flex gap-0.5 justify-end">
                                {Array.from({ length: 5 }).map((_, j) => (
                                  <span key={j} className={`text-[11px] ${j < r.rating ? "text-[#F5B300]" : "text-white/15"}`}>★</span>
                                ))}
                              </div>
                              <div className="text-[9px] text-white/20 font-mono mt-0.5">{r.date}</div>
                            </div>
                          </div>
                          <p className="text-[12px] text-white/55 leading-relaxed">{r.text}</p>
                          {r.verified && (
                            <div className="flex items-center gap-1.5 mt-2">
                              <div className="w-1.5 h-1.5 bg-[#F5B300]" />
                              <span className="text-[9px] font-mono text-white/20 tracking-wider">VERIFIED PURCHASE</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {revs.length > 3 && (
                      <div className="px-4 py-3 border-t border-white/8 text-center">
                        <span className="text-[11px] text-white/25 font-mono">+{revs.length - 3} more reviews on the product page</span>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="border border-white/10 p-4 mb-6 text-[12px] text-white/40 space-y-1">
                <div>❄️ Frozen at peak freshness · 2-month freezer life</div>
                <div>⚡ Heat in 3 minutes in microwave or oven</div>
                <div>✓ USDA nutritional standards · Macro-labelled</div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => { handleAdd(selectedMeal); setSelectedMeal(null); }}
                  className="flex-1 bg-[#F5B300] text-[#111111] py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                  Add to Cart — ${selectedMeal.price.toFixed(2)}
                </button>
                <button onClick={() => { navigate("build-a-box"); setSelectedMeal(null); }}
                  className="border border-white/15 px-5 py-4 text-[11px] text-white/40 hover:border-[#F5B300] hover:text-[#F5B300] transition-colors whitespace-nowrap">
                  Add to Sub Box
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
