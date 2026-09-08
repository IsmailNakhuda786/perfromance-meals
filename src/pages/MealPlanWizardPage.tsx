import { useState } from "react";
import { Meal, MEALS, Page, PLANS } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: never) => void;
  initialPlan: string;
  onCheckoutComplete: (addr: { name: string; phone: string; line1: string; unit: string; postal: string }) => void;
}

const PLAN_MEAL_CATS: Record<string, string[]> = {
  CUT: ["low-carb", "just-protein", "breakfast"],
  MAINTAIN: ["high-carb", "low-carb", "breakfast", "just-protein"],
  BUILD: ["high-carb", "just-protein", "low-carb"],
};

const getMealsForPlan = (planName: string): Meal[] => {
  const order = PLAN_MEAL_CATS[planName] || PLAN_MEAL_CATS.MAINTAIN;
  return [...MEALS].sort((a, b) => {
    const ai = order.indexOf(a.cat);
    const bi = order.indexOf(b.cat);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
};

type Step = 1 | 2 | 3 | 4 | 5;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["6am – 9am", "9am – 12pm", "12pm – 3pm", "3pm – 6pm"];
const STEP_LABELS = ["Meals", "Goal", "Menu", "Delivery", "Pay"];

export default function MealPlanWizardPage({ navigate, addToCart, initialPlan, onCheckoutComplete }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [mealCount, setMealCount] = useState<1 | 2>(2);
  const [goal, setGoal] = useState(initialPlan || "MAINTAIN");
  const [billing, setBilling] = useState<"week" | "month">("week");
  const [mealQtys, setMealQtys] = useState<Record<number, number>>({});
  const [detailMeal, setDetailMeal] = useState<Meal | null>(null);
  const [deliveryDays, setDeliveryDays] = useState<string[]>(["Mon", "Wed", "Fri"]);
  const [timeSlot, setTimeSlot] = useState(SLOTS[0]);
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", unit: "", postal: "" });
  const [saveCard, setSaveCard] = useState(false);
  const [autoChargeConsent, setAutoChargeConsent] = useState(false);

  const plan = PLANS.find((p) => p.name === goal)!;
  const price = billing === "week" ? plan.priceWeek : plan.priceMonth;
  const maxMeals = plan.meals * 2;

  const toggleDay = (d: string) =>
    setDeliveryDays((prev) =>
      prev.includes(d)
        ? prev.length > 1
          ? prev.filter((x) => x !== d)
          : prev
        : [...prev, d].sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b))
    );

  const totalSelected = Object.values(mealQtys).reduce((s, q) => s + q, 0);
  const getMealQty = (id: number) => mealQtys[id] ?? 0;
  const addMeal = (id: number) => {
    if (totalSelected >= maxMeals) return;
    setMealQtys((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };
  const removeMeal = (id: number) => {
    setMealQtys((prev) => {
      const q = (prev[id] ?? 0) - 1;
      if (q <= 0) { const n = { ...prev }; delete n[id]; return n; }
      return { ...prev, [id]: q };
    });
  };

  const canProceedStep3 = totalSelected >= plan.meals;
  const canProceedStep4 =
    deliveryDays.length > 0 &&
    address.name.trim() !== "" &&
    address.line1.trim() !== "" &&
    address.postal.trim() !== "";
  const canSubscribe = autoChargeConsent;

  const handleNext = () => {
    if (step < 5) setStep((s) => (s + 1) as Step);
  };

  const handleSubscribe = () => {
    onCheckoutComplete(address);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E2DA] flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-20">
        <button onClick={() => navigate("home")} className="font-bold text-[17px] sm:text-[20px] tracking-tight text-[#111] shrink-0">
          FRESHER<span className="text-[#F2C94C]">.</span>
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          {([1, 2, 3, 4] as Step[]).map((s) => (
            <div key={s} className="flex flex-col items-center gap-0.5">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-sm font-semibold border-2 transition-all ${
                  s === step
                    ? "border-[#111] bg-[#111] text-white"
                    : s < step
                    ? "border-[#F2C94C] bg-[#F2C94C] text-[#111]"
                    : "border-[#D0CCC4] bg-white text-[#999]"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              <span className={`hidden sm:block text-[10px] font-medium ${s === step ? "text-[#111]" : "text-[#999]"}`}>
                {STEP_LABELS[s - 1]}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => (step > 1 ? setStep((s) => (s - 1) as Step) : navigate("home"))}
          className="text-[12px] sm:text-sm text-[#666] hover:text-[#111] transition-colors font-medium shrink-0"
        >
          {step === 1 ? "Close" : "← Back"}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-4 py-6 sm:py-8">
        <div className={`w-full ${step === 3 ? "max-w-6xl" : "max-w-2xl"}`}>

          {/* ─── Step 1: Meal Count ─── */}
          {step === 1 && (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">How many meals per day?</h1>
              <p className="text-[#666] mb-8">Choose how many chef-prepared meals you want delivered each day.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {([
                  { count: 1 as const, label: "Lunch only", desc: "1 meal delivered daily — perfect for a structured midday fuel.", slots: ["Lunch"], price: "From $74/wk" },
                  { count: 2 as const, label: "Lunch & Dinner", desc: "2 meals delivered daily — full day nutrition covered.", slots: ["Lunch", "Dinner"], price: "From $148/wk", popular: true },
                ]).map((opt) => (
                  <button key={opt.count} onClick={() => setMealCount(opt.count)}
                    className={`relative text-left border-2 p-6 rounded-2xl transition-all ${mealCount === opt.count ? "border-[#111] bg-white shadow-md" : "border-[#D0CCC4] bg-white hover:border-[#999]"}`}>
                    {opt.popular && (
                      <div className="absolute top-3 right-3 bg-[#F2C94C] text-[#111] text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5">Most Popular</div>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      {opt.slots.map((s) => (
                        <span key={s} className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full ${s === "Lunch" ? "bg-[#FFF3CD] text-[#B8860B]" : "bg-[#E8F4FD] text-[#1565C0]"}`}>{s}</span>
                      ))}
                    </div>
                    <div className="font-bold text-[18px] mb-1">{opt.label}</div>
                    <p className="text-[#666] text-[13px] leading-relaxed mb-4">{opt.desc}</p>
                    <div className="font-mono font-bold text-[16px] text-[#111]">{opt.price}</div>
                    {mealCount === opt.count && <div className="mt-3 text-[#111] text-[11px] font-bold">✓ Selected</div>}
                  </button>
                ))}
              </div>

              <button onClick={handleNext}
                className="w-full py-4 rounded-xl font-semibold text-[15px] transition-all bg-[#F2C94C] text-[#111] hover:bg-[#111] hover:text-white">
                Continue →
              </button>
            </div>
          )}

          {/* ─── Step 2: Goal ─── */}
          {step === 2 && (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">Choose Your Goal</h1>
              <p className="text-[#666] mb-6">Select the plan that matches your target.</p>

              {/* Billing toggle */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-sm font-medium ${billing === "week" ? "text-[#111]" : "text-[#999]"}`}>Weekly</span>
                <button
                  onClick={() => setBilling((b) => (b === "week" ? "month" : "week"))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    billing === "month" ? "bg-[#111]" : "bg-[#D0CCC4]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      billing === "month" ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${billing === "month" ? "text-[#111]" : "text-[#999]"}`}>
                  Monthly <span className="text-[#F2C94C] font-semibold">Save ~15%</span>
                </span>
              </div>

              {/* Plan cards */}
              <div className="flex flex-col gap-4 mb-8">
                {PLANS.map((p) => {
                  const selected = goal === p.name;
                  const px = billing === "week" ? p.priceWeek : p.priceMonth;
                  return (
                    <button
                      key={p.name}
                      onClick={() => setGoal(p.name)}
                      className={`w-full text-left rounded-2xl border-2 p-5 transition-all ${
                        selected ? "border-[#111] bg-white shadow-md" : "border-[#D0CCC4] bg-white hover:border-[#999]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                            style={{ backgroundColor: p.accent }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">{p.name}</span>
                              <span className="text-xs text-[#666]">{p.meals} meals/day · {p.cal} kcal</span>
                            </div>
                            <p className="text-sm text-[#555] mt-0.5">{p.desc}</p>
                            <div className="flex gap-3 mt-2 text-xs text-[#666]">
                              <span>P {p.protein}g</span>
                              <span>C {p.carbs}g</span>
                              <span>F {p.fat}g</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xl font-bold">${px}</div>
                          <div className="text-xs text-[#999]">/{billing === "week" ? "wk" : "mo"}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 6in60 promise trust block */}
              <div className="bg-[#111] text-white p-4 sm:p-5 mb-6 flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="relative shrink-0 w-[56px] h-[56px]">
                  <svg viewBox="0 0 56 56" className="w-full h-full" style={{ animation: "spin6wiz 18s linear infinite" }}>
                    <defs>
                      <path id="wizRing" d="M 28,28 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0" />
                    </defs>
                    <circle cx="28" cy="28" r="25" fill="#CDFF3A" />
                    <circle cx="28" cy="28" r="21" fill="none" stroke="#111" strokeWidth="0.7" strokeDasharray="1.8 1.8" opacity="0.3" />
                    <text fontSize="5.2" fontFamily="monospace" fontWeight="800" fill="#111" opacity="0.55" letterSpacing="1.5">
                      <textPath href="#wizRing" startOffset="50%" textAnchor="middle">GUARANTEED · 60 DAYS ·</textPath>
                    </text>
                    <style>{`@keyframes spin6wiz { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[13px] font-black text-[#111] leading-none">6in60</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[15px] mb-0.5">The 6in60 Promise</div>
                  <p className="text-white/50 text-[12px] leading-relaxed">Lose 6kg in 60 days eating real chef-prepared food — or we refund you in full. No questions asked.</p>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 rounded-xl font-semibold text-[15px] transition-all bg-[#F2C94C] text-[#111] hover:bg-[#111] hover:text-white"
              >
                Continue →
              </button>
            </div>
          )}

          {/* ─── Step 3: Pick Your Meals ─── */}
          {step === 3 && (
            <div className="w-full max-w-none">
              <div className="max-w-2xl mb-6">
                <h1 className="text-xl sm:text-2xl font-bold mb-1">Pick Your Meals</h1>
                <p className="text-white/50 mb-4">
                  Recommended for <strong className="text-white">{goal}</strong> — select at least <strong className="text-white">{plan.meals}</strong> meals for your weekly rotation.
                </p>
                {/* Sticky counter */}
                <div className="flex items-center justify-between p-3 bg-[#1A1A1A] border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px]"
                      style={{ backgroundColor: plan.accent, color: "#111" }}>
                      {totalSelected}
                    </div>
                    <span className="text-[14px] font-medium text-white">
                      of {maxMeals} meals selected
                    </span>
                    {totalSelected < plan.meals && (
                      <span className="text-red-400 text-[12px]">— need {plan.meals - totalSelected} more</span>
                    )}
                  </div>
                  <span className="text-[11px] text-white/40">You can repeat meals · max {maxMeals}</span>
                </div>
              </div>

              {/* Full-width meal grid matching Ready-to-Go style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {getMealsForPlan(goal).map((meal: Meal) => {
                  const qty = getMealQty(meal.id);
                  const atMax = totalSelected >= maxMeals && qty === 0;
                  const recommended = PLAN_MEAL_CATS[goal]?.includes(meal.cat);
                  const typeMap: Record<string, { label: string; bg: string; text: string }> = {
                    "high-carb":    { label: "High Carb",    bg: "#F2C94C22", text: "#F2C94C" },
                    "low-carb":     { label: "Low Carb",     bg: "#7EE8B022", text: "#7EE8B0" },
                    "just-protein": { label: "Just Protein", bg: "#A78BFA22", text: "#A78BFA" },
                    "breakfast":    { label: "Breakfast",    bg: "#FB923C22", text: "#FB923C" },
                  };
                  const mealType = typeMap[meal.cat];
                  return (
                    <div key={meal.id}
                      className={`group bg-[#1A1A1A] overflow-hidden transition-all ${qty > 0 ? "ring-2 shadow-lg" : "hover:ring-1 hover:ring-white/20"} ${atMax ? "opacity-40" : ""}`}
                      style={qty > 0 ? { "--tw-ring-color": plan.accent + "99" } as React.CSSProperties : {}}>
                      {/* Image */}
                      <div className="relative h-52 bg-[#222] overflow-hidden cursor-pointer" onClick={() => setDetailMeal(meal)}>
                        {meal.badge && qty === 0 && (
                          <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-bold ${meal.badge === "Bestseller" || meal.badge === "Staff Pick" ? "bg-[#CDFF3A] text-[#111]" : "bg-black/50 text-white backdrop-blur-sm border border-white/10"}`}>
                            {meal.badge}
                          </div>
                        )}
                        {recommended && qty === 0 && !meal.badge && (
                          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-bold"
                            style={{ backgroundColor: plan.accent, color: "#111" }}>
                            Recommended
                          </div>
                        )}
                        {qty > 0 && (
                          <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center font-black text-[13px]"
                            style={{ backgroundColor: plan.accent, color: "#111" }}>
                            {qty}×
                          </div>
                        )}
                        <img src={meal.img} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-white/10 backdrop-blur-sm text-white text-[11px] uppercase tracking-widest px-4 py-2 border border-white/20">View Details</span>
                        </div>
                      </div>
                      {/* Info */}
                      <div className="p-5">
                        {mealType && (
                          <span className="inline-block text-[9px] font-mono font-bold tracking-[0.25em] uppercase px-2 py-1 mb-2 border"
                            style={{ color: mealType.text, backgroundColor: mealType.bg, borderColor: mealType.text + "44" }}>
                            {mealType.label}
                          </span>
                        )}
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <h3 className="text-white text-[14px] font-medium leading-snug">{meal.name}</h3>
                          <span className="text-[#CDFF3A] font-bold text-[15px] whitespace-nowrap font-mono shrink-0">${meal.price.toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 mb-4">
                          {[{ l: "CAL", v: meal.cal }, { l: "PRO", v: `${meal.protein}g` }, { l: "CARB", v: `${meal.carbs}g` }, { l: "FAT", v: `${meal.fat}g` }].map((m) => (
                            <div key={m.l} className="bg-[#252525] px-1.5 py-2 text-center">
                              <div className="font-mono text-[9px] text-white/25 mb-0.5 tracking-wider">{m.l}</div>
                              <div className="font-mono text-[11px] text-white font-medium">{m.v}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-[11px] text-white/35 flex items-center gap-1">
                            <span className="text-[#CDFF3A]">{"★".repeat(Math.round(meal.rating))}</span>
                            <span>{meal.rating} ({meal.reviews})</span>
                          </div>
                          {qty === 0 ? (
                            <button onClick={() => !atMax && addMeal(meal.id)} disabled={atMax}
                              className={`px-4 py-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-all ${atMax ? "bg-white/5 text-white/20 cursor-not-allowed" : "bg-white/10 text-white hover:bg-[#CDFF3A] hover:text-[#111]"}`}>
                              + Select
                            </button>
                          ) : (
                            <div className="flex items-center gap-1">
                              <button onClick={() => removeMeal(meal.id)}
                                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-[16px] transition-colors">−</button>
                              <span className="text-white font-mono font-bold text-[13px] w-6 text-center">{qty}</span>
                              <button onClick={() => addMeal(meal.id)} disabled={totalSelected >= maxMeals}
                                className={`w-8 h-8 flex items-center justify-center text-[16px] transition-colors ${totalSelected >= maxMeals ? "bg-white/5 text-white/20 cursor-not-allowed" : "bg-[#CDFF3A] text-[#111] hover:bg-white"}`}>+</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="max-w-2xl">
                <button onClick={handleNext} disabled={!canProceedStep3}
                  className={`w-full py-4 font-semibold text-[15px] tracking-wide transition-all ${canProceedStep3 ? "bg-[#F2C94C] text-[#111] hover:bg-[#111] hover:text-white" : "bg-[#E5E2DA] text-[#aaa] cursor-not-allowed"}`}>
                  Continue with {selectedMeals.length} meal{selectedMeals.length !== 1 ? "s" : ""} →
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 4: Delivery ─── */}
          {step === 4 && (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">Delivery Preferences</h1>
              <p className="text-[#666] mb-6">Choose your delivery days, time slot, and address.</p>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Delivery Days</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleDay(d)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        deliveryDays.includes(d)
                          ? "bg-[#111] text-white border-[#111]"
                          : "border-[#D0CCC4] text-[#666] hover:border-[#999]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Delivery Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all text-left ${
                        timeSlot === slot
                          ? "bg-[#111] text-white border-[#111]"
                          : "border-[#D0CCC4] text-[#666] bg-white hover:border-[#999]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Delivery Address</label>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="border border-[#D0CCC4] bg-white text-[#111] rounded-lg px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="border border-[#D0CCC4] bg-white text-[#111] rounded-lg px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Street address"
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    className="border border-[#D0CCC4] bg-white text-[#111] rounded-lg px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Unit / Level (optional)"
                      value={address.unit}
                      onChange={(e) => setAddress({ ...address, unit: e.target.value })}
                      className="border border-[#D0CCC4] bg-white text-[#111] rounded-lg px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]"
                    />
                    <input
                      type="text"
                      placeholder="Postal code"
                      value={address.postal}
                      onChange={(e) => setAddress({ ...address, postal: e.target.value })}
                      className="border border-[#D0CCC4] bg-white text-[#111] rounded-lg px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceedStep4}
                className={`w-full py-4 rounded-xl font-semibold text-[15px] transition-all ${
                  canProceedStep4
                    ? "bg-[#F2C94C] text-[#111] hover:bg-[#111] hover:text-white"
                    : "bg-[#E5E2DA] text-[#aaa] cursor-not-allowed"
                }`}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ─── Step 5: Payment ─── */}
          {step === 5 && (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">Payment</h1>
              <p className="text-[#666] mb-6">Enter your card details to activate your meal plan.</p>

              {/* Order summary */}
              <div className="bg-white border border-[#E5E2DA] rounded-xl p-5 mb-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">{plan.name} Plan</p>
                    <p className="text-sm text-[#666]">
                      {plan.meals} meals/day · {billing === "week" ? "Weekly" : "Monthly"} billing
                    </p>
                    <p className="text-sm text-[#666]">Delivery: {deliveryDays.join(", ")}</p>
                    <p className="text-sm text-[#666]">{timeSlot}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${price}</p>
                    <p className="text-xs text-[#999]">/{billing === "week" ? "week" : "month"}</p>
                  </div>
                </div>
                <div className="h-1 rounded-full" style={{ backgroundColor: plan.accent }} />
              </div>

              {/* Card fields */}
              <div className="flex flex-col gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Cardholder name"
                  className="border border-[#D0CCC4] bg-white text-[#111] rounded-lg px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]"
                />
                <input
                  type="text"
                  placeholder="Card number"
                  className="border border-[#D0CCC4] bg-white text-[#111] rounded-lg px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="border border-[#D0CCC4] bg-white text-[#111] rounded-lg px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="border border-[#D0CCC4] bg-white text-[#111] rounded-lg px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col gap-3 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#111] flex-shrink-0"
                  />
                  <span className="text-sm text-[#444]">Save this card for faster checkout next time</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoChargeConsent}
                    onChange={(e) => setAutoChargeConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#111] flex-shrink-0"
                  />
                  <span className="text-sm text-[#444]">
                    I authorise Fresher to auto-charge my card on each billing cycle{" "}
                    <span className="text-red-500 font-medium">*</span>
                  </span>
                </label>
                {!autoChargeConsent && (
                  <p className="text-xs text-red-500 ml-7">Authorisation required to subscribe</p>
                )}
              </div>

              {/* 6in60 pre-CTA trust seal */}
              <div className="flex items-center gap-3 bg-[#CDFF3A]/10 border border-[#CDFF3A]/30 px-4 py-3 mb-4">
                <div className="relative shrink-0 w-9 h-9">
                  <svg viewBox="0 0 36 36" className="w-full h-full" style={{ animation: "spin6wiz 18s linear infinite" }}>
                    <defs><path id="sealRing" d="M 18,18 m -13,0 a 13,13 0 1,1 26,0 a 13,13 0 1,1 -26,0" /></defs>
                    <circle cx="18" cy="18" r="16" fill="#CDFF3A" />
                    <text fontSize="3.8" fontFamily="monospace" fontWeight="800" fill="#111" opacity="0.5" letterSpacing="1">
                      <textPath href="#sealRing" startOffset="50%" textAnchor="middle">60 DAYS · GUARANTEE ·</textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[8px] font-black text-[#111]">6in60</span>
                  </div>
                </div>
                <div className="text-[12px] text-[#555] leading-tight">
                  <span className="font-bold text-[#111]">60-day money-back guarantee.</span> If you don't lose 6kg, we refund you — no questions asked.
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                disabled={!canSubscribe}
                className={`w-full py-4 rounded-xl font-semibold text-[15px] transition-all ${
                  canSubscribe
                    ? "bg-[#F2C94C] text-[#111] hover:bg-[#111] hover:text-white"
                    : "bg-[#E5E2DA] text-[#aaa] cursor-not-allowed"
                }`}
              >
                Subscribe — ${price}/{billing === "week" ? "wk" : "mo"}
              </button>

              <p className="text-center text-xs text-[#999] mt-4">
                Cancel anytime from your account. No lock-in.
              </p>
            </div>
          )}

        </div>
      </div>

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
                <div className={`absolute top-4 left-4 px-3 py-1 text-[11px] tracking-[0.18em] uppercase font-bold ${detailMeal.badge === "Bestseller" || detailMeal.badge === "Staff Pick" ? "bg-[#CDFF3A] text-[#111]" : "bg-black/60 text-white backdrop-blur-sm"}`}>
                  {detailMeal.badge}
                </div>
              )}
              {getMealQty(detailMeal.id) > 0 && (
                <div className="absolute top-4 right-4 text-[12px] font-bold px-3 py-1" style={{ backgroundColor: plan.accent, color: "#111" }}>
                  {getMealQty(detailMeal.id)}× in your plan
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
                <span className="font-mono text-[22px] text-[#CDFF3A] font-bold shrink-0">${detailMeal.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-white/40 mb-4">
                <span className="text-[#CDFF3A]">{"★".repeat(Math.round(detailMeal.rating))}</span>
                <span className="text-white/60 font-semibold">{detailMeal.rating}</span>
                <span>· {detailMeal.reviews} reviews</span>
              </div>
              <p className="text-white/55 text-[14px] leading-relaxed mb-6">{detailMeal.desc}</p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[{ label: "Calories", val: detailMeal.cal }, { label: "Protein", val: `${detailMeal.protein}g` }, { label: "Carbs", val: `${detailMeal.carbs}g` }, { label: "Fat", val: `${detailMeal.fat}g` }].map((m) => (
                  <div key={m.label} className="bg-[#222] px-3 py-3 text-center">
                    <div className="font-mono text-[13px] text-[#CDFF3A] font-medium">{m.val}</div>
                    <div className="text-white/30 text-[10px] mt-1 uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="border border-white/10 p-4 mb-6 text-[12px] text-white/40 space-y-1">
                <div>❄️ Frozen at peak freshness · 2-month freezer life</div>
                <div>⚡ Heat in 3 minutes in microwave or oven</div>
                <div>✓ USDA nutritional standards · Macro-labelled</div>
              </div>
              <div className="flex gap-3 items-center">
                {getMealQty(detailMeal.id) > 0 && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => removeMeal(detailMeal.id)}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-[18px] transition-colors">−</button>
                    <span className="text-white font-mono font-bold text-[15px] w-8 text-center">{getMealQty(detailMeal.id)}</span>
                    <button onClick={() => addMeal(detailMeal.id)} disabled={totalSelected >= maxMeals}
                      className={`w-10 h-10 flex items-center justify-center text-[18px] transition-colors ${totalSelected >= maxMeals ? "bg-white/5 text-white/20 cursor-not-allowed" : "text-[#111] hover:opacity-90"}`}
                      style={totalSelected < maxMeals ? { backgroundColor: plan.accent } : {}}>+</button>
                  </div>
                )}
                <button
                  onClick={() => { addMeal(detailMeal.id); setDetailMeal(null); }}
                  disabled={totalSelected >= maxMeals}
                  className={`flex-1 py-4 text-[12px] font-bold tracking-[0.18em] uppercase transition-colors ${totalSelected >= maxMeals ? "bg-white/10 text-white/30 cursor-not-allowed" : "text-[#111] hover:opacity-90"}`}
                  style={totalSelected < maxMeals ? { backgroundColor: plan.accent } : {}}>
                  {getMealQty(detailMeal.id) > 0 ? `+ Add Another (${getMealQty(detailMeal.id)}× selected)` : "Add to Plan →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
