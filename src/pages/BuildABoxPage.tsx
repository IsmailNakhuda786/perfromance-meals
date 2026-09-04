import { useState } from "react";
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
      <div className="bg-[#111111] border-b border-white/8">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase">01 / Ready Series</span>
          </div>
          <h1 className="font-display text-[28px] sm:text-[42px] font-bold">Build-A-Box</h1>
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
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 text-[12px] tracking-wider uppercase font-medium transition-colors whitespace-nowrap ${step === s.key ? "border-[#CDFF3A] text-[#CDFF3A]" : "border-transparent text-white/30 hover:text-white/60"}`}
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
                className={`relative p-7 cursor-pointer border transition-all ${boxSize === size.qty ? "border-[#CDFF3A] bg-[#CDFF3A]/8" : "border-white/10 hover:border-white/30"}`}
              >
                {size.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-[#CDFF3A] text-[#111111] px-3 py-1 text-[9px] tracking-[0.25em] uppercase font-bold">Most Popular</span>
                  </div>
                )}
                <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-2 uppercase">{size.label}</div>
                <div className="font-display text-[48px] font-bold leading-none mb-1">{size.qty}</div>
                <div className="text-white/40 text-[13px] mb-5">meals</div>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-display text-[28px] font-bold text-[#CDFF3A]">${size.pricePerMeal.toFixed(2)}</div>
                  <div className="text-white/35 text-[12px]">/meal</div>
                  <div className="text-white/25 text-[11px] mt-2">Total: ${size.total.toFixed(2)}</div>
                </div>
                {boxSize === size.qty && (
                  <div className="absolute top-4 right-4 w-5 h-5 bg-[#CDFF3A] rounded-full flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border border-white/10 p-6 mb-10 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="font-mono text-[11px] text-white/30 mb-1">Price per meal</div>
              <div className="font-display text-[22px] sm:text-[28px] font-bold text-[#CDFF3A]">${selectedSize.pricePerMeal.toFixed(2)}</div>
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
            className="inline-flex items-center gap-3 bg-[#CDFF3A] text-[#111111] px-10 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors"
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
                  ? <span className="text-[#CDFF3A]">✓ Box complete! Ready to review.</span>
                  : <span>{slotsLeft} slot{slotsLeft !== 1 ? "s" : ""} remaining</span>}
              </span>
              <span className="font-mono text-[13px]">{totalSelected}/{boxSize}</span>
            </div>
            <div className="h-2 bg-[#222] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${fillPct}%`, backgroundColor: fillPct === 100 ? "#CDFF3A" : "#555" }}
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
            {[{ id: "all", label: "All Meals" }, ...CATS.filter((c) => c.id !== "all")].map((c) => (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                className={`px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase font-medium whitespace-nowrap transition-all ${activeCat === c.id ? "bg-[#CDFF3A] text-[#111111]" : "border border-white/12 text-white/40 hover:border-white/35 hover:text-white"}`}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {filteredMeals.map((meal) => {
              const qty = selections[meal.id] || 0;
              const canAdd = totalSelected < boxSize;
              return (
                <div key={meal.id} className={`bg-[#1A1A1A] overflow-hidden ${qty > 0 ? "ring-1 ring-[#CDFF3A]/40" : ""}`}>
                  <div className="relative h-44 bg-[#222]">
                    <img src={meal.img} alt={meal.name} className="w-full h-full object-cover" />
                    {qty > 0 && (
                      <div className="absolute top-2 right-2 bg-[#CDFF3A] text-[#111111] w-7 h-7 rounded-full flex items-center justify-center font-bold text-[12px]">
                        {qty}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3 className="text-[13px] font-medium leading-snug">{meal.name}</h3>
                      <span className="font-mono text-[12px] text-[#CDFF3A] shrink-0">${meal.price.toFixed(2)}</span>
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
                        className={`w-8 h-8 border transition-colors text-lg ${canAdd ? "border-[#CDFF3A] text-[#CDFF3A] hover:bg-[#CDFF3A] hover:text-[#111111]" : "border-white/10 text-white/20"}`}
                      >+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 items-center">
            <button onClick={() => setStep("size")} className="border border-white/15 px-6 py-3.5 text-[12px] text-white/40 hover:text-white hover:border-white/40 transition-colors">
              ← Back
            </button>
            <button
              onClick={() => setStep("review")}
              disabled={totalSelected !== boxSize}
              className={`inline-flex items-center gap-2 px-8 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase transition-colors ${totalSelected === boxSize ? "bg-[#CDFF3A] text-[#111111] hover:bg-white" : "bg-white/10 text-white/30 cursor-not-allowed"}`}
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
                      <div className="font-mono text-[13px] text-[#CDFF3A]">{qty}× meal{qty > 1 ? "s" : ""}</div>
                      <div className="text-white/30 text-[11px]">${(meal.price * qty).toFixed(2)}</div>
                    </div>
                  </div>
                );
              })}
              <button onClick={() => setStep("select")} className="text-white/30 text-[12px] uppercase tracking-wider hover:text-[#CDFF3A] transition-colors mt-2">
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
                  <span className="text-[#CDFF3A]">${selectedSize.pricePerMeal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/40">Delivery</span>
                  <span className="text-[#7EE8B0]">Free</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[14px]">Total</span>
                  <span className="font-display text-[24px] font-bold text-[#CDFF3A]">${selectedSize.total.toFixed(2)}</span>
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
                      <div className="font-mono text-[12px] text-[#CDFF3A]">{m.val}</div>
                      <div className="text-[10px] text-white/25 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleAddToCart} className="w-full bg-[#CDFF3A] text-[#111111] py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                Proceed to Checkout →
              </button>
              <p className="text-white/20 text-[11px] text-center mt-3">Free same-day delivery · Frozen fresh</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
