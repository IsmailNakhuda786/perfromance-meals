import { useState } from "react";
import { ALL_REVIEWS } from "@/data";
import { BOX_SIZES, CartItem, CATS, Meal, MEALS, Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
}

type BoxStep = "size" | "select" | "review";

export default function BuildABoxPage({ navigate, addToCart }: Props) {
  const [step, setStep] = useState<BoxStep>("size");
  const [boxSize, setBoxSize] = useState(10);
  const [activeCat, setActiveCat] = useState("all");
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [detailMeal, setDetailMeal] = useState<Meal | null>(null);

  const selectedSize = BOX_SIZES.find((b) => b.qty === boxSize) || BOX_SIZES[1];
  const totalSelected = Object.values(selections).reduce((s, q) => s + q, 0);
  const slotsLeft = boxSize - totalSelected;
  const fillPct = Math.min((totalSelected / boxSize) * 100, 100);

  const adjustQty = (meal: Meal, delta: number) => {
    setSelections((prev) => {
      const current = prev[meal.id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [meal.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [meal.id]: next };
    });
  };

  const filteredMeals = activeCat === "all" ? MEALS : MEALS.filter((m) => m.cat === activeCat);

  const selectedMeals = MEALS.filter((m) => (selections[m.id] || 0) > 0);

  const handleAddToCart = () => {
    addToCart({
      id: 9999,
      name: `Build-A-Box ×${boxSize} (${selectedMeals.length} varieties)`,
      price: selectedSize.total,
      qty: 1,
      img: "https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=100&h=100&fit=crop&auto=format",
      type: "box",
    });
    navigate("checkout");
  };

  const STEPS: { key: BoxStep; label: string; num: string }[] = [
    { key: "size", label: "Choose Size", num: "01" },
    { key: "select", label: "Pick Your Meals", num: "02" },
    { key: "review", label: "Review & Order", num: "03" },
  ];

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white">
      {/* Header */}
      <div className="bg-[#1A1A1A] border-b border-white/8">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#F5B300] uppercase">01 / Ready Series</span>
          </div>
          <h1 className="font-display text-[28px] sm:text-[42px] font-extrabold uppercase">BUILD-A-BOX</h1>
          <p className="text-white/40 mt-1 text-[14px]">Mix and match any meals. Best value on the site.</p>
        </div>

        {/* Step indicators */}
        <div className="max-w-[1440px] mx-auto px-6 pb-0">
          <div className="flex items-center gap-0 overflow-x-auto">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <button
                  onClick={() => {
                    if (s.key === "select" && step === "review") setStep("select");
                    if (s.key === "size") setStep("size");
                  }}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 text-[12px] tracking-wider uppercase font-medium transition-colors whitespace-nowrap ${step === s.key ? "border-[#F5B300] text-[#F5B300]" : "border-transparent text-white/30 hover:text-white/60"}`}
                >
                  <span className="font-mono text-[10px]">{s.num}</span>
                  {s.label}
                </button>
                {i < STEPS.length - 1 && <div className="w-6 text-white/15 text-center">›</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STEP 1: SIZE ── */}
      {step === "size" && (
        <div className="max-w-[1440px] mx-auto px-6 py-16">
          <h2 className="font-display text-[32px] font-bold mb-2">How many meals?</h2>
          <p className="text-white/40 mb-10">More meals = lower price per meal.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {BOX_SIZES.map((size) => (
              <div
                key={size.qty}
                onClick={() => setBoxSize(size.qty)}
                className={`relative p-7 cursor-pointer border transition-all ${boxSize === size.qty ? "border-[#F5B300] bg-[#F5B300]/8" : "border-white/10 hover:border-white/30"}`}
              >
                {size.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-[#F5B300] text-[#1A1A1A] px-3 py-1 text-[9px] tracking-[0.25em] uppercase font-bold">Most Popular</span>
                  </div>
                )}
                <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-2 uppercase">{size.label}</div>
                <div className="font-display text-[48px] font-bold leading-none mb-1">{size.qty}</div>
                <div className="text-white/40 text-[13px] mb-5">meals</div>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-display text-[28px] font-bold text-[#F5B300]">${size.pricePerMeal.toFixed(2)}</div>
                  <div className="text-white/35 text-[12px]">/meal</div>
                  <div className="text-white/25 text-[11px] mt-2">Total: ${size.total.toFixed(2)}</div>
                </div>
                {boxSize === size.qty && (
                  <div className="absolute top-4 right-4 w-5 h-5 bg-[#F5B300] rounded-full flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border border-white/10 p-3 sm:p-6 mb-10 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="font-mono text-[11px] text-white/30 mb-1">Price per meal</div>
              <div className="font-display text-[22px] sm:text-[28px] font-bold text-[#F5B300]">${selectedSize.pricePerMeal.toFixed(2)}</div>
            </div>
            <div>
              <div className="font-mono text-[11px] text-white/30 mb-1">Meals in box</div>
              <div className="font-display text-[22px] sm:text-[28px] font-bold">{boxSize}</div>
            </div>
            <div>
              <div className="font-mono text-[11px] text-white/30 mb-1">Box total</div>
              <div className="font-display text-[22px] sm:text-[28px] font-bold">${selectedSize.total.toFixed(2)}</div>
            </div>
          </div>

          <button
            onClick={() => setStep("select")}
            className="inline-flex items-center gap-3 bg-[#F5B300] text-[#1A1A1A] px-10 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors"
          >
            Pick My {boxSize} Meals →
          </button>
        </div>
      )}

      {/* ── STEP 2: SELECT MEALS ── */}
      {step === "select" && (
        <div className="max-w-[1440px] mx-auto px-6 py-10">
          {/* Sticky progress bar */}
          <div className="sticky top-[56px] sm:top-[60px] z-30 bg-[#0E0E0E] border-b border-white/8 py-4 mb-8 -mx-6 px-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-medium">
                {totalSelected === boxSize
                  ? <span className="text-[#F5B300]">✓ Box complete! Ready to review.</span>
                  : <span>{slotsLeft} slot{slotsLeft !== 1 ? "s" : ""} remaining</span>}
              </span>
              <span className="font-mono text-[13px]">{totalSelected}/{boxSize}</span>
            </div>
            <div className="h-2 bg-[#222] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${fillPct}%`, backgroundColor: fillPct === 100 ? "#F5B300" : "#555" }}
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
            {[{ id: "all", label: "All Meals" }, ...CATS.filter((c) => c.id !== "all")].map((c) => (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                className={`px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase font-medium whitespace-nowrap transition-all ${activeCat === c.id ? "bg-[#F5B300] text-[#1A1A1A]" : "border border-white/12 text-white/40 hover:border-white/35 hover:text-white"}`}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {filteredMeals.map((meal) => {
              const qty = selections[meal.id] || 0;
              const canAdd = totalSelected < boxSize;
              return (
                <div key={meal.id} className={`group bg-[#1A1A1A] overflow-hidden ${qty > 0 ? "ring-1 ring-[#F5B300]/40" : ""}`}>
                  <div className="relative h-44 bg-[#222] cursor-pointer" onClick={() => setDetailMeal(meal)}>
                    <img src={meal.img} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {qty > 0 && (
                      <div className="absolute top-2 right-2 bg-[#F5B300] text-[#1A1A1A] w-7 h-7 rounded-full flex items-center justify-center font-bold text-[12px]">
                        {qty}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-white/10 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/20">View Details</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3 className="text-[13px] font-medium leading-snug">{meal.name}</h3>
                      <span className="font-mono text-[12px] text-[#F5B300] shrink-0">${meal.price.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 mb-3">
                      {[{ l: "PRO", v: `${meal.protein}g` }, { l: "CARB", v: `${meal.carbs}g` }, { l: "CAL", v: meal.cal }].map((m) => (
                        <div key={m.l} className="bg-[#252525] py-1.5 text-center">
                          <div className="font-mono text-[9px] text-white/25">{m.l}</div>
                          <div className="font-mono text-[10px] text-white">{m.v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => adjustQty(meal, -1)}
                        disabled={qty === 0}
                        className="w-8 h-8 border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-colors disabled:opacity-20 text-lg"
                      >−</button>
                      <span className="font-mono text-[14px] w-8 text-center">{qty}</span>
                      <button
                        onClick={() => adjustQty(meal, 1)}
                        disabled={!canAdd}
                        className={`w-8 h-8 border transition-colors text-lg ${canAdd ? "border-[#F5B300] text-[#F5B300] hover:bg-[#F5B300] hover:text-[#1A1A1A]" : "border-white/10 text-white/20"}`}
                      >+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button onClick={() => setStep("size")} className="border border-white/15 px-6 py-3.5 text-[12px] text-white/40 hover:text-white hover:border-white/40 transition-colors">
              ← Back
            </button>
            <button
              onClick={() => setStep("review")}
              disabled={totalSelected !== boxSize}
              className={`inline-flex items-center gap-2 px-8 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase transition-colors ${totalSelected === boxSize ? "bg-[#F5B300] text-[#1A1A1A] hover:bg-white" : "bg-white/10 text-white/30 cursor-not-allowed"}`}
            >
              {totalSelected === boxSize ? "Review My Box →" : `Fill ${slotsLeft} more slot${slotsLeft !== 1 ? "s" : ""}`}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: REVIEW ── */}
      {step === "review" && (
        <div className="max-w-[1440px] mx-auto px-6 py-16">
          <h2 className="font-display text-[32px] font-bold mb-2">Your Box</h2>
          <p className="text-white/40 mb-10">Review before adding to cart.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {selectedMeals.map((meal) => {
                const qty = selections[meal.id];
                return (
                  <div key={meal.id} className="flex gap-4 bg-[#1A1A1A] p-4 items-center">
                    <img src={meal.img} alt={meal.name} className="w-16 h-16 object-cover shrink-0 bg-[#222]" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-medium">{meal.name}</h4>
                      <div className="text-[12px] text-white/35 mt-0.5">{meal.protein}g protein · {meal.carbs}g carbs · {meal.fat}g fat</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-[13px] text-[#F5B300]">{qty}× meal{qty > 1 ? "s" : ""}</div>
                      <div className="text-white/30 text-[11px]">${(meal.price * qty).toFixed(2)}</div>
                    </div>
                  </div>
                );
              })}
              <button onClick={() => setStep("select")} className="text-white/30 text-[12px] uppercase tracking-wider hover:text-[#F5B300] transition-colors mt-2">
                ← Edit selections
              </button>
            </div>

            {/* Order summary */}
            <div className="bg-[#1A1A1A] p-7 self-start">
              <h3 className="font-display text-[22px] font-bold mb-6">Box Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/40">{boxSize} meals</span>
                  <span>${selectedSize.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/40">Price per meal</span>
                  <span className="text-[#F5B300]">${selectedSize.pricePerMeal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/40">Delivery</span>
                  <span className="text-[#F5B300]">Free</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[14px]">Total</span>
                  <span className="font-display text-[24px] font-bold text-[#F5B300]">${selectedSize.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Macro totals */}
              <div className="bg-[#222] p-4 mb-6">
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-3">Box Macro Totals</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Total Protein", val: `${selectedMeals.reduce((s, m) => s + m.protein * (selections[m.id] || 0), 0)}g` },
                    { label: "Total Carbs", val: `${selectedMeals.reduce((s, m) => s + m.carbs * (selections[m.id] || 0), 0)}g` },
                    { label: "Total Fat", val: `${selectedMeals.reduce((s, m) => s + m.fat * (selections[m.id] || 0), 0)}g` },
                    { label: "Total Calories", val: `${selectedMeals.reduce((s, m) => s + m.cal * (selections[m.id] || 0), 0)}` },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-[12px] text-[#F5B300]">{m.val}</div>
                      <div className="text-[10px] text-white/25 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleAddToCart} className="w-full bg-[#F5B300] text-[#1A1A1A] py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                Proceed to Checkout →
              </button>
              <p className="text-white/20 text-[11px] text-center mt-3">Free same-day delivery · Frozen fresh</p>
            </div>
          </div>
        </div>
      )}
      {/* ── Meal Detail Modal ── */}
      {detailMeal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDetailMeal(null)} />
          <div className="relative bg-[#1A1A1A] text-white w-full max-w-2xl overflow-hidden max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto">
            <button onClick={() => setDetailMeal(null)} className="absolute top-4 right-4 z-10 text-white/50 hover:text-white bg-black/30 rounded-full p-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            <div className="h-56 sm:h-72 relative bg-[#222]">
              <img src={detailMeal.img} alt={detailMeal.name} className="w-full h-full object-cover" />
              {detailMeal.badge && (
                <div className={`absolute top-4 left-4 px-3 py-1 text-[11px] tracking-[0.18em] uppercase font-bold ${detailMeal.badge === "Bestseller" || detailMeal.badge === "Staff Pick" ? "bg-[#F5B300] text-[#111]" : "bg-black/60 text-white backdrop-blur-sm"}`}>
                  {detailMeal.badge}
                </div>
              )}
              {(selections[detailMeal.id] || 0) > 0 && (
                <div className="absolute top-4 right-4 bg-[#F5B300] text-[#111] text-[12px] font-bold px-3 py-1">
                  {selections[detailMeal.id]}× in your box
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
                const t = typeMap[detailMeal.cat];
                return t ? (
                  <span className="inline-block text-[10px] font-mono font-bold tracking-[0.25em] uppercase px-2.5 py-1 mb-3 border"
                    style={{ color: t.color, borderColor: t.color + "55", backgroundColor: t.color + "15" }}>
                    {t.label}
                  </span>
                ) : null;
              })()}
              <div className="flex items-start justify-between mb-3 gap-3">
                <h2 className="font-display text-[26px] font-bold">{detailMeal.name}</h2>
                <span className="font-mono text-[22px] text-[#F5B300] font-bold shrink-0">${detailMeal.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-white/40 mb-4">
                <span className="text-[#F5B300]">{"★".repeat(Math.round(detailMeal.rating))}</span>
                <span className="text-white/60 font-semibold">{detailMeal.rating}</span>
                <span>· {detailMeal.reviews} reviews</span>
              </div>
              <p className="text-white/55 text-[14px] leading-relaxed mb-6">{detailMeal.desc}</p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[{ label: "Calories", val: detailMeal.cal }, { label: "Protein", val: `${detailMeal.protein}g` }, { label: "Carbs", val: `${detailMeal.carbs}g` }, { label: "Fat", val: `${detailMeal.fat}g` }].map((m) => (
                  <div key={m.label} className="bg-[#222] px-3 py-3 text-center">
                    <div className="font-mono text-[13px] text-[#F5B300] font-medium">{m.val}</div>
                    <div className="text-white/30 text-[10px] mt-1 uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="border border-white/10 p-4 mb-6 text-[12px] text-white/40 space-y-1">
                <div>❄️ Frozen at peak freshness · 2-month freezer life</div>
                <div>⚡ Heat in 3 minutes in microwave or oven</div>
                <div>✓ USDA nutritional standards · Macro-labelled</div>
              </div>

              {/* Customer Reviews */}
              {(() => {
                const revs = ALL_REVIEWS[detailMeal.id] ?? [];
                if (revs.length === 0) return null;
                const avg = revs.reduce((s, r) => s + r.rating, 0) / revs.length;
                return (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#F5B300]">Customer Reviews</span>
                        <span className="text-[10px] text-white/25 font-mono">{revs.length} verified</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-[12px] ${i < Math.round(avg) ? "text-[#F5B300]" : "text-white/15"}`}>★</span>
                          ))}
                        </div>
                        <span className="font-mono text-[13px] text-[#F5B300] font-bold">{avg.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="space-y-0 border border-white/8 divide-y divide-white/8">
                      {revs.slice(0, 3).map((r, i) => (
                        <div key={i} className="px-4 py-4">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-[#F5B300] flex items-center justify-center font-extrabold text-[11px] text-[#1A1A1A] shrink-0">
                                {r.author.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-[12px] text-white">{r.author}</div>
                                <div className="text-[10px] text-white/30">{r.role}</div>
                              </div>
                            </div>
                            <div className="shrink-0 text-right">
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
                      <p className="text-[10px] text-white/25 text-center mt-2 font-mono">+{revs.length - 3} more reviews on the product page</p>
                    )}
                  </div>
                );
              })()}

              <div className="flex gap-3 items-center">
                {(selections[detailMeal.id] || 0) > 0 && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => adjustQty(detailMeal, -1)}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-[18px] transition-colors">−</button>
                    <span className="text-white font-mono font-bold text-[15px] w-8 text-center">{selections[detailMeal.id]}</span>
                    <button onClick={() => adjustQty(detailMeal, 1)} disabled={totalSelected >= boxSize}
                      className={`w-10 h-10 flex items-center justify-center text-[18px] transition-colors ${totalSelected >= boxSize ? "bg-white/5 text-white/20 cursor-not-allowed" : "bg-[#F5B300] text-[#111] hover:opacity-90"}`}>+</button>
                  </div>
                )}
                <button
                  onClick={() => { adjustQty(detailMeal, 1); setDetailMeal(null); }}
                  disabled={totalSelected >= boxSize}
                  className={`flex-1 py-4 text-[12px] font-bold tracking-[0.18em] uppercase transition-colors ${totalSelected >= boxSize ? "bg-white/10 text-white/30 cursor-not-allowed" : "bg-[#F5B300] text-[#111] hover:bg-white"}`}>
                  {(selections[detailMeal.id] || 0) > 0
                    ? `+ Add Another (${selections[detailMeal.id]}× in box)`
                    : totalSelected >= boxSize ? "Box Full" : "Add to Box →"}
                </button>
              </div>
              {totalSelected >= boxSize && (
                <p className="text-center text-[11px] text-white/30 mt-3">Box is full · <button onClick={() => setDetailMeal(null)} className="underline">go back to review</button></p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
