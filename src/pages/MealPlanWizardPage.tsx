import { useState } from "react";
import { Meal, MEALS, Page, PLANS } from "@/data";
import { MealPlanLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToCart?: (item: any) => void;
  initialPlan: string;
  onCheckoutComplete: (addr: { name: string; phone: string; line1: string; unit: string; postal: string }) => void;
}

const PLAN_MEAL_CATS: Record<string, string[]> = {
  CUT:      ["low-carb", "just-protein", "breakfast"],
  MAINTAIN: ["high-carb", "low-carb", "breakfast", "just-protein"],
  BUILD:    ["high-carb", "just-protein", "low-carb"],
};

const getMealsForPlan = (planName: string): Meal[] => {
  const order = PLAN_MEAL_CATS[planName] || PLAN_MEAL_CATS.MAINTAIN;
  return [...MEALS].sort((a, b) => {
    const ai = order.indexOf(a.cat);
    const bi = order.indexOf(b.cat);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
};

// Prefixed weekly delivery schedule — no date picker
const DELIVERY_WEEK = [
  { day: "Mon", date: "15", month: "Oct" },
  { day: "Tue", date: "16", month: "Oct" },
  { day: "Wed", date: "17", month: "Oct" },
  { day: "Thu", date: "18", month: "Oct" },
  { day: "Fri", date: "19", month: "Oct" },
  { day: "Sat", date: "20", month: "Oct" },
  { day: "Sun", date: "21", month: "Oct" },
];

// Each day gets a rotating set of 4 meal options from the plan
function getDayOptions(meals: Meal[], dayIndex: number): Meal[] {
  const start = (dayIndex * 4) % meals.length;
  const out: Meal[] = [];
  for (let i = 0; i < 4; i++) out.push(meals[(start + i) % meals.length]);
  return out;
}

type Step = 1 | 2 | 3 | 4 | 5;
const STEP_LABELS = ["Meals", "Goal", "Menu", "Delivery", "Pay"];

type Schedule = Record<string, { lunch: number | null; dinner: number | null }>;

export default function MealPlanWizardPage({ navigate, onCheckoutComplete, initialPlan }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [mealCount, setMealCount] = useState<1 | 2>(2);
  const [goal, setGoal] = useState(initialPlan || "MAINTAIN");
  const [billing, setBilling] = useState<"week" | "month">("week");

  // Day-by-day schedule: schedule["Mon"]["lunch"] = mealId
  const [schedule, setSchedule] = useState<Schedule>({});
  const [pickerState, setPickerState] = useState<{ day: string; slot: "lunch" | "dinner" } | null>(null);

  const [address, setAddress] = useState({ name: "", phone: "", line1: "", unit: "", postal: "" });
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState<"invalid" | "expired" | null>(null);

  type WizardAuthMode = null | "signin" | "signup" | "signin_done" | "signup_done";
  const [wizardAuthMode, setWizardAuthMode] = useState<WizardAuthMode>(null);
  const [waEmail, setWaEmail] = useState("");
  const [waName, setWaName] = useState("");
  const [waPhone, setWaPhone] = useState("");
  const [waPassword, setWaPassword] = useState("");

  const VALID_PROMOS: Record<string, { discount: number; flat?: number; expired?: boolean }> = {
    "WELCOME10": { discount: 0.10 },
    "WELCOME15": { discount: 0.15 },
    "SUMMER20":  { discount: 0.20, expired: true },
    "FITLIFE":   { discount: 0.12 },
    "READY20":   { discount: 0.20 },
    "SG61":      { discount: 0, flat: 6.10 },
    "FREEZER5":  { discount: 0, flat: 5.00 },
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const entry = VALID_PROMOS[code];
    if (!entry) { setPromoError("invalid"); setPromoApplied(false); return; }
    if (entry.expired) { setPromoError("expired"); setPromoApplied(false); return; }
    setPromoError(null);
    setPromoApplied(true);
  };

  const plan = PLANS.find((p) => p.name === goal)!;
  const basePrice = billing === "week" ? plan.priceWeek : plan.priceMonth;
  const promoEntry = promoApplied ? VALID_PROMOS[promoCode.trim().toUpperCase()] : null;
  const promoRate = promoEntry?.discount ?? 0;
  const promoFlat = promoEntry?.flat ?? 0;
  const promoDiscount = promoFlat > 0 ? promoFlat : Number(basePrice) * promoRate;
  const price = promoApplied ? Math.max(0, Number(basePrice) - promoDiscount).toFixed(2) : basePrice;

  const planMeals = getMealsForPlan(goal);
  const getMealById = (id: number) => MEALS.find((m) => m.id === id);

  // How many day slots are filled
  const totalSlotsFilled = DELIVERY_WEEK.reduce((count, d) => {
    const s = schedule[d.day];
    if (!s) return count;
    let c = s.lunch ? 1 : 0;
    if (mealCount === 2) c += s.dinner ? 1 : 0;
    return count + c;
  }, 0);
  const totalSlotsRequired = DELIVERY_WEEK.length * mealCount;
  const canProceedStep3 = totalSlotsFilled === totalSlotsRequired;

  const canProceedStep4 =
    address.name.trim() !== "" &&
    address.line1.trim() !== "" &&
    address.postal.trim() !== "";

  const handleNext = () => {
    if (step < 5) setStep((s) => (s + 1) as Step);
  };

  const handleSubscribe = () => {
    onCheckoutComplete(address);
  };

  const selectMeal = (mealId: number) => {
    if (!pickerState) return;
    setSchedule((prev) => ({
      ...prev,
      [pickerState.day]: {
        lunch: prev[pickerState.day]?.lunch ?? null,
        dinner: prev[pickerState.day]?.dinner ?? null,
        [pickerState.slot]: mealId,
      },
    }));
    setPickerState(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E4DC] flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-20">
        <button onClick={() => navigate("meal-plan-landing")} className="shrink-0">
          <MealPlanLogo size="sm" variant="light" />
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          {([1, 2, 3, 4] as Step[]).map((s) => (
            <div key={s} className="flex flex-col items-center gap-0.5">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-sm font-semibold border-2 transition-all ${s === step ? "border-[#111] bg-[#111] text-white" : s < step ? "border-[#E85D04] bg-[#E85D04] text-[#111]" : "border-[#D0CCC4] bg-white text-[#999]"}`}>
                {s < step ? "✓" : s}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-medium ${s === step ? "text-[#111]" : "text-[#999]"}`}>
                {STEP_LABELS[s - 1]}
              </span>
            </div>
          ))}
        </div>
        <button onClick={() => (step > 1 ? setStep((s) => (s - 1) as Step) : navigate("meal-plan-landing"))}
          className="text-[12px] sm:text-sm text-[#666] hover:text-[#111] transition-colors font-medium shrink-0">
          {step === 1 ? "Close" : "← Back"}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-6 sm:py-8">
        <div className={`w-full ${step === 3 ? "max-w-4xl" : "max-w-2xl"}`}>

          {/* ─── Step 1: Meal Count ─── */}
          {step === 1 && (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">How many meals per day?</h1>
              <p className="text-[#666] mb-8">Choose how many chef-prepared meals you want delivered each day.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {([
                  { count: 1 as const, label: "Lunch only", desc: "1 fresh meal per day — perfect for a structured midday fuel.", slots: ["Lunch"], price: "From $74/wk" },
                  { count: 2 as const, label: "Lunch & Dinner", desc: "2 fresh meals per day — full day nutrition fully covered.", slots: ["Lunch", "Dinner"], price: "From $148/wk", popular: true },
                ]).map((opt) => (
                  <button key={opt.count} onClick={() => setMealCount(opt.count)}
                    className={`relative text-left border-2 p-6transition-all ${mealCount === opt.count ? "border-[#111] bg-white" : "border-[#D0CCC4] bg-white hover:border-[#999]"}`}>
                    {opt.popular && (
                      <div className="absolute top-3 right-3 bg-[#E85D04] text-[#111] text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5">Most Popular</div>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      {opt.slots.map((s) => (
                        <span key={s} className={`px-2.5 py-1 text-[10px] font-bold tracking-wider ${s === "Lunch" ? "bg-[#F5B300]/20 text-[#7A5C00]" : "bg-[#E85D04]/15 text-[#E85D04]"}`}>{s}</span>
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
                className="w-full py-4 font-semibold text-[15px] transition-all bg-[#E85D04] text-[#111] hover:bg-[#111] hover:text-white">
                Continue →
              </button>
            </div>
          )}

          {/* ─── Step 2: Goal ─── */}
          {step === 2 && (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">Choose your goal</h1>
              <p className="text-[#666] mb-6">Select the plan that matches your target.</p>
              <div className="mb-7">
                <div className="flex gap-0 border border-[#D0CCC4] p-1 bg-[#F7F5F0] w-full sm:w-auto sm:inline-flex">
                  <button onClick={() => setBilling("week")}
                    className={`flex-1 sm:flex-none px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-all ${billing === "week" ? "bg-white text-[#111]" : "text-[#999] hover:text-[#111]"}`}>
                    Weekly
                  </button>
                  <button onClick={() => setBilling("month")}
                    className={`flex-1 sm:flex-none relative px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-all ${billing === "month" ? "bg-[#111] text-white" : "text-[#999] hover:text-[#111]"}`}>
                    Monthly
                    <span className={`ml-2 text-[10px] font-extrabold tracking-widest px-1.5 py-0.5 ${billing === "month" ? "bg-[#E85D04] text-[#111]" : "bg-[#E85D04]/70 text-[#111]"}`}>SAVE 15%</span>
                  </button>
                </div>
                {billing === "week" && (
                  <div className="mt-3 border-2 border-[#E85D04] bg-[#FFF9E6] px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[22px]">💰</span>
                      <div>
                        <div className="font-extrabold text-[14px] text-[#111]">Save up to $109/mo — switch to Monthly</div>
                        <div className="text-[11px] text-[#7A5C00] mt-0.5">15% off vs weekly · cancel anytime · no lock-in</div>
                      </div>
                    </div>
                    <button onClick={() => setBilling("month")}
                      className="shrink-0 bg-[#E85D04] text-[#111] font-extrabold text-[11px] tracking-[0.15em] uppercase px-4 py-2.5 hover:bg-[#111] hover:text-[#E85D04] transition-colors whitespace-nowrap">
                      Switch Now →
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 mb-8">
                {PLANS.map((p) => {
                  const selected = goal === p.name;
                  const px = billing === "week" ? p.priceWeek : p.priceMonth;
                  const PROG_NAMES: Record<string, { name: string; tag: string; duration: string }> = {
                    CUT:      { name: "6by60",      tag: "CUT",      duration: "60-day programme" },
                    MAINTAIN: { name: "Buddy Plan",  tag: "MAINTAIN", duration: "20-day programme" },
                    BUILD:    { name: "HYROX",       tag: "BUILD",    duration: "Performance programme" },
                  };
                  const prog = PROG_NAMES[p.name] ?? { name: p.name, tag: p.name, duration: "" };
                  return (
                    <button key={p.name} onClick={() => setGoal(p.name)}
                      className={`w-full text-leftborder-2 p-5 transition-all ${selected ? "border-[#111] bg-white" : "border-[#D0CCC4] bg-white hover:border-[#999]"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: p.accent }} />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-lg">{prog.name}</span>
                              <span className="text-[10px] font-mono tracking-widest uppercase border border-[#D0CCC4] px-1.5 py-0.5 text-[#888]">{prog.tag}</span>
                              <span className="text-xs text-[#aaa]">{prog.duration}</span>
                            </div>
                            <div className="text-xs text-[#aaa] mt-0.5">{p.meals} meals/day · {p.cal} kcal</div>
                            <p className="text-sm text-[#555] mt-0.5">{p.desc}</p>
                            <div className="flex gap-3 mt-2 text-xs text-[#666]">
                              <span>P {p.protein}g</span><span>C {p.carbs}g</span><span>F {p.fat}g</span>
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

              <div className="bg-[#111] text-white p-4 sm:p-5 mb-6 flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="relative shrink-0 w-[56px] h-[56px]">
                  <svg viewBox="0 0 56 56" className="w-full h-full" style={{ animation: "spin6wiz 18s linear infinite" }}>
                    <defs><path id="wizRing" d="M 28,28 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0" /></defs>
                    <circle cx="28" cy="28" r="25" fill="#F5B300" />
                    <text fontSize="5.2" fontFamily="monospace" fontWeight="800" fill="#111" opacity="0.55" letterSpacing="1.5">
                      <textPath href="#wizRing" startOffset="50%" textAnchor="middle">GUARANTEED · 60 DAYS ·</textPath>
                    </text>
                    <style>{`@keyframes spin6wiz { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[13px] font-extrabold text-[#111] leading-none">6in60</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[15px] mb-0.5">The Performance Promise</div>
                  <p className="text-white/50 text-[12px] leading-relaxed">Exceptional meals, exceptional support — or your money back. No questions asked.</p>
                </div>
              </div>

              <button onClick={handleNext}
                className="w-full py-4 font-semibold text-[15px] transition-all bg-[#E85D04] text-[#111] hover:bg-[#111] hover:text-white">
                Continue →
              </button>
            </div>
          )}

          {/* ─── Step 3: Day-by-Day Menu Selection ─── */}
          {step === 3 && (
            <div className="w-full">
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold mb-1">Choose your weekly menu</h1>
                <p className="text-[#666] text-[14px]">
                  Select your <strong>{mealCount === 1 ? "lunch" : "lunch and dinner"}</strong> for each day. Daily options are curated for your <strong>{goal}</strong> goal.
                </p>
              </div>

              {/* Progress bar */}
              <div className="mb-6 bg-white border border-[#E5E2DA] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-semibold text-[#111]">{totalSlotsFilled} of {totalSlotsRequired} meals selected</span>
                  {canProceedStep3 && <span className="text-green-600 text-[12px] font-bold">✓ All meals chosen</span>}
                </div>
                <div className="h-2 bg-[#F0EDE8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#E85D04] rounded-full transition-all duration-500"
                    style={{ width: `${(totalSlotsFilled / totalSlotsRequired) * 100}%` }} />
                </div>
              </div>

              {/* Day-by-day grid */}
              <div className="flex flex-col gap-3 mb-6">
                {DELIVERY_WEEK.map((d, dayIndex) => {
                  const daySchedule = schedule[d.day] || { lunch: null, dinner: null };
                  const dayOptions = getDayOptions(planMeals, dayIndex);
                  return (
                    <div key={d.day} className="bg-white border border-[#E5E2DA]overflow-hidden">
                      {/* Day header */}
                      <div className="flex items-center justify-between px-5 py-3 bg-[#F7F5F0] border-b border-[#E5E2DA]">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-[10px] font-mono text-[#999] uppercase">{d.day}</div>
                            <div className="font-bold text-[18px] leading-tight text-[#111]">{d.date}</div>
                            <div className="text-[10px] text-[#aaa]">{d.month}</div>
                          </div>
                          <div className="text-[12px] text-[#999]">
                            {mealCount === 1
                              ? (daySchedule.lunch ? "1/1 selected" : "0/1 selected")
                              : `${(daySchedule.lunch ? 1 : 0) + (daySchedule.dinner ? 1 : 0)}/2 selected`
                            }
                          </div>
                        </div>
                        <div className="text-[10px] text-[#ccc] font-mono">{dayOptions.length} options available</div>
                      </div>

                      {/* Slots */}
                      <div className={`grid ${mealCount === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} divide-y sm:divide-y-0 sm:divide-x divide-[#E5E2DA]`}>
                        {(["lunch", ...(mealCount === 2 ? ["dinner"] : [])] as ("lunch" | "dinner")[]).map((slot) => {
                          const selectedId = daySchedule[slot];
                          const selectedMeal = selectedId ? getMealById(selectedId) : null;
                          return (
                            <div key={slot} className="p-4">
                              <div className="flex items-center gap-1.5 mb-3">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${slot === "lunch" ? "bg-[#F5B300]/20 text-[#7A5C00]" : "bg-[#E85D04]/15 text-[#E85D04]"}`}>
                                  {slot === "lunch" ? "L" : "D"}
                                </span>
                                <span className="text-[11px] font-semibold text-[#666] uppercase tracking-wider">{slot}</span>
                              </div>
                              {selectedMeal ? (
                                <button
                                  onClick={() => setPickerState({ day: d.day, slot })}
                                  className="w-full flex items-center gap-3 group"
                                >
                                  <img src={selectedMeal.img} alt={selectedMeal.name} className="w-12 h-12 object-covershrink-0" />
                                  <div className="flex-1 text-left min-w-0">
                                    <div className="text-[12px] font-semibold text-[#111] leading-tight line-clamp-2">{selectedMeal.name}</div>
                                    <div className="text-[10px] text-[#888] mt-0.5">{selectedMeal.protein}g protein · {selectedMeal.cal} cal</div>
                                  </div>
                                  <span className="text-[10px] text-[#aaa] group-hover:text-[#111] transition-colors shrink-0">Change</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => setPickerState({ day: d.day, slot })}
                                  className="w-full border-2 border-dashed border-[#E5E2DA] hover:border-[#E85D04]py-4 text-[13px] text-[#aaa] hover:text-[#111] transition-all flex flex-col items-center gap-1"
                                >
                                  <span className="text-[20px]">+</span>
                                  <span>Choose {slot}</span>
                                  <span className="text-[10px]">{dayOptions.length} options</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button onClick={handleNext} disabled={!canProceedStep3}
                className={`w-full py-4 font-semibold text-[15px] tracking-wide transition-all${canProceedStep3 ? "bg-[#E85D04] text-[#111] hover:bg-[#111] hover:text-white" : "bg-[#E5E2DA] text-[#aaa] cursor-not-allowed"}`}>
                {canProceedStep3 ? "Confirm Menu →" : `Select ${totalSlotsRequired - totalSlotsFilled} more meal${totalSlotsRequired - totalSlotsFilled !== 1 ? "s" : ""} to continue`}
              </button>
            </div>
          )}

          {/* ─── Step 4: Prefixed Delivery Schedule ─── */}
          {step === 4 && (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">Delivery & Address</h1>
              <p className="text-[#666] mb-6">Your meals are delivered fresh every day. Delivery windows are fixed to allow kitchen preparation.</p>

              {/* Prefixed schedule — read-only */}
              <div className="mb-8">
                <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-3">Your Weekly Delivery Schedule</label>
                <div className="bg-white border border-[#E5E2DA]overflow-hidden">
                  {DELIVERY_WEEK.map((d, i) => (
                    <div key={d.day} className={`flex items-center justify-between px-5 py-3.5 ${i < DELIVERY_WEEK.length - 1 ? "border-b border-[#F0EDE8]" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#E85D04] rounded-full flex items-center justify-center text-[#111] font-bold text-[11px]">{d.date}</div>
                        <div>
                          <div className="text-[13px] font-semibold text-[#111]">{d.day}, {d.date} {d.month}</div>
                          <div className="text-[11px] text-[#888]">{mealCount === 1 ? "Lunch" : "Lunch + Dinner"}</div>
                        </div>
                      </div>
                      <div className="text-[11px] text-[#aaa] font-mono">7am – 10am</div>
                    </div>
                  ))}
                  <div className="px-5 py-3 bg-[#FFFBF0] border-t border-[#E85D04]/30">
                    <p className="text-[11px] text-[#7A5C00]">
                      📦 Meals are prepared fresh each morning and delivered before 10am. Delivery windows are fixed — no scheduling needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="mb-8">
                <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-3">Delivery Address</label>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" placeholder="Full name" value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                    <input type="text" placeholder="Phone / WhatsApp" value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                  </div>
                  <input type="text" placeholder="Street address" value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Unit / Level (optional)" value={address.unit}
                      onChange={(e) => setAddress({ ...address, unit: e.target.value })}
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                    <input type="text" placeholder="Postal code" value={address.postal}
                      onChange={(e) => setAddress({ ...address, postal: e.target.value })}
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                  </div>
                </div>
              </div>

              <button onClick={handleNext} disabled={!canProceedStep4}
                className={`w-full py-4 font-semibold text-[15px] transition-all ${canProceedStep4 ? "bg-[#E85D04] text-[#111] hover:bg-[#111] hover:text-white" : "bg-[#E5E2DA] text-[#aaa] cursor-not-allowed"}`}>
                Continue →
              </button>
            </div>
          )}

          {/* ─── Step 5: Auth + Payment ─── */}
          {step === 5 && (
            <div>
              {/* Auth gate — NO guest option for meal plan (subscription requires account) */}
              {wizardAuthMode === null && (
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold mb-1">Account required</h1>
                  <p className="text-[#666] mb-2 text-[14px]">Meal Plans are subscription-based. An account lets you review your menu weekly, manage deliveries, and earn rewards points.</p>

                  <div className="bg-[#111] text-whitep-4 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F5B300] rounded-full flex items-center justify-center shrink-0 text-[#111] text-lg font-bold">🪙</div>
                    <div>
                      <p className="font-semibold text-[14px]">Earn <span className="text-[#F5B300]">+{Math.round(Number(price) * 1.5)} points</span> on this plan</p>
                      <p className="text-white/50 text-[12px]">Redeem for free meals, discounts and referral bonuses.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mb-4">
                    <button onClick={() => setWizardAuthMode("signup")}
                      className="w-full bg-[#E85D04] text-[#111] py-4 font-bold text-[15px] hover:bg-[#1A1A1A] hover:text-white transition-colors">
                      Create Account & Subscribe
                    </button>
                    <button onClick={() => setWizardAuthMode("signin")}
                      className="w-full border-2 border-[#111] text-[#111] py-4 font-bold text-[15px] hover:bg-[#111] hover:text-white transition-colors">
                      Sign In to Existing Account
                    </button>
                  </div>
                  <p className="text-center text-[12px] text-[#aaa]">Meal Plan subscriptions require an account to manage your weekly menu and deliveries.</p>
                </div>
              )}

              {/* Sign Up */}
              {wizardAuthMode === "signup" && (
                <div>
                  <button onClick={() => setWizardAuthMode(null)} className="text-[#666] text-sm mb-4 flex items-center gap-1 hover:text-[#111]">← Back</button>
                  <h1 className="text-xl font-bold mb-1">Create Your Account</h1>
                  <p className="text-[#666] mb-5 text-sm">Takes 30 seconds — earn points from day one.</p>
                  <div className="flex flex-col gap-3 mb-5">
                    <input value={waName} onChange={(e) => setWaName(e.target.value)} placeholder="Full name"
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                    <input value={waEmail} onChange={(e) => setWaEmail(e.target.value)} type="email" placeholder="Email address"
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                    <input value={waPhone} onChange={(e) => setWaPhone(e.target.value)} type="tel" placeholder="Phone (WhatsApp order updates)"
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                    <input value={waPassword} onChange={(e) => setWaPassword(e.target.value)} type="password" placeholder="Create password"
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                  </div>
                  <button disabled={!waName || !waEmail || !waPassword} onClick={() => setWizardAuthMode("signup_done")}
                    className="w-full bg-[#E85D04] text-[#111] py-4 font-bold text-[15px] disabled:opacity-40 hover:bg-[#1A1A1A] hover:text-white transition-colors">
                    Continue to Payment →
                  </button>
                </div>
              )}

              {/* Sign In */}
              {wizardAuthMode === "signin" && (
                <div>
                  <button onClick={() => setWizardAuthMode(null)} className="text-[#666] text-sm mb-4 flex items-center gap-1 hover:text-[#111]">← Back</button>
                  <h1 className="text-xl font-bold mb-1">Sign In</h1>
                  <p className="text-[#666] mb-5 text-sm">Welcome back — let us activate your plan.</p>
                  <div className="flex flex-col gap-3 mb-5">
                    <input value={waEmail} onChange={(e) => setWaEmail(e.target.value)} type="email" placeholder="Email address"
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                    <input value={waPassword} onChange={(e) => setWaPassword(e.target.value)} type="password" placeholder="Password"
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                  </div>
                  <button disabled={!waEmail || !waPassword} onClick={() => setWizardAuthMode("signin_done")}
                    className="w-full bg-[#111] text-white py-4 font-bold text-[15px] disabled:opacity-40 hover:bg-[#222] transition-colors">
                    Sign In & Continue →
                  </button>
                </div>
              )}

              {/* Payment form */}
              {(wizardAuthMode === "signup_done" || wizardAuthMode === "signin_done") && (
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold mb-1">Payment</h1>
                  <p className="text-[#666] mb-6">Enter your card details to activate your meal plan.</p>

                  {/* Order summary */}
                  <div className="bg-white border border-[#E5E2DA] p-5 mb-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold">{plan.name} Plan</p>
                        <p className="text-sm text-[#666]">{mealCount} meal{mealCount > 1 ? "s" : ""}/day · {billing === "week" ? "Weekly" : "Monthly"} billing</p>
                        <p className="text-sm text-[#666]">7 days/week · Delivered by 10am daily</p>
                      </div>
                      <div className="text-right">
                        {promoApplied && <p className="text-xs text-[#999] line-through">${basePrice}/{billing === "week" ? "wk" : "mo"}</p>}
                        <p className="text-xl font-bold">${price}</p>
                        <p className="text-xs text-[#999]">/{billing === "week" ? "week" : "month"}</p>
                        {promoApplied && <p className="text-xs text-green-600 font-medium mt-0.5">{promoCode} applied ✓</p>}
                      </div>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-[12px] text-green-600 font-medium border-t border-[#F0EDE8] pt-2 mt-2">
                        <span>Promo discount ({promoFlat > 0 ? `$${promoFlat.toFixed(2)} off` : `${Math.round(promoRate * 100)}% off`})</span>
                        <span>–${promoDiscount.toFixed(2)}/{billing === "week" ? "wk" : "mo"}</span>
                      </div>
                    )}
                    <div className="h-1 rounded-full mt-3" style={{ backgroundColor: plan.accent }} />
                  </div>

                  {/* Card fields */}
                  <div className="flex flex-col gap-3 mb-6">
                    <input type="text" placeholder="Cardholder name"
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                    <input type="text" placeholder="Card number"
                      className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm font-mono placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM / YY"
                        className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm font-mono placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                      <input type="text" placeholder="CVV"
                        className="border border-[#D0CCC4] bg-white text-[#111] px-4 py-3 text-sm font-mono placeholder:text-[#999] focus:outline-none focus:border-[#111]" />
                    </div>
                  </div>

                  {/* Promo code */}
                  <div className="mb-5">
                    <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-2">Promo / Discount Code</p>
                    <div className="flex gap-2">
                      <input value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoApplied(false); setPromoError(null); }}
                        placeholder="e.g. WELCOME10"
                        className={`flex-1 border bg-white px-4 py-3 text-[14px] font-mono outline-none transition-colors uppercase ${promoApplied ? "border-green-500 bg-green-50" : promoError ? "border-red-400" : "border-[#D0CCC4] focus:border-[#111]"}`}
                      />
                      <button onClick={handleApplyPromo}
                        className="px-5 py-3 bg-[#111] text-white text-[12px] font-bold tracking-widest uppercase hover:bg-[#E85D04] hover:text-[#111] transition-colors">
                        Apply
                      </button>
                    </div>
                    {promoApplied && <p className="text-green-600 text-[12px] mt-1.5 font-medium">✓ Code <strong>{promoCode}</strong> applied — saving ${promoDiscount.toFixed(2)}/{billing === "week" ? "wk" : "mo"}</p>}
                    {promoError === "invalid" && <p className="text-red-500 text-[12px] mt-1.5 font-medium">✕ Invalid promo code. Check spelling or try another.</p>}
                    {promoError === "expired" && <p className="text-red-500 text-[12px] mt-1.5 font-medium">⏰ This promo code has expired. Check our latest offers!</p>}
                  </div>

                  {/* Trust seal */}
                  <div className="flex items-center gap-3 bg-[#E85D04]/10 border border-[#E85D04]/30 px-4 py-3 mb-4">
                    <span className="text-[24px] shrink-0">🔒</span>
                    <div className="text-[12px] text-[#555] leading-tight">
                      <span className="font-bold text-[#111]">Satisfaction guarantee.</span> Exceptional meals and support — or your money back. No questions asked.
                    </div>
                  </div>

                  <button onClick={handleSubscribe}
                    className="w-full py-4 font-semibold text-[15px] bg-[#E85D04] text-[#111] hover:bg-[#111] hover:text-white transition-all">
                    Subscribe — ${price}/{billing === "week" ? "wk" : "mo"}
                  </button>
                  <p className="text-center text-xs text-[#999] mt-4">Cancel anytime from your account. No lock-in.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── Meal Picker Overlay ── */}
      {pickerState && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setPickerState(null)} />
          <div className="relative bg-white w-full sm:max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E5E2DA] px-6 py-4 flex items-center justify-between">
              <div>
                <div className="font-bold text-[16px] text-[#111]">
                  Choose {pickerState.slot.charAt(0).toUpperCase() + pickerState.slot.slice(1)}
                </div>
                <div className="text-[12px] text-[#888]">{pickerState.day} — curated for {goal}</div>
              </div>
              <button onClick={() => setPickerState(null)} className="text-[#aaa] hover:text-[#111] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {getDayOptions(planMeals, DELIVERY_WEEK.findIndex((d) => d.day === pickerState.day)).map((meal) => (
                <button key={meal.id} onClick={() => selectMeal(meal.id)}
                  className="flex items-center gap-4 p-3 border border-[#E5E2DA] hover:border-[#E85D04] hover:bg-[#FFFBF0]transition-all text-left group">
                  <img src={meal.img} alt={meal.name} className="w-16 h-16 object-covershrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[14px] text-[#111] leading-snug">{meal.name}</div>
                    <div className="flex gap-3 text-[11px] text-[#888] mt-1">
                      <span>{meal.protein}g protein</span>
                      <span>·</span>
                      <span>{meal.cal} cal</span>
                      <span>·</span>
                      <span>${meal.price.toFixed(2)}</span>
                    </div>
                    <div className="flex mt-1">
                      {[1,2,3,4,5].map((s) => <span key={s} className={`text-[10px] ${s <= Math.round(meal.rating) ? "text-[#E85D04]" : "text-[#ddd]"}`}>★</span>)}
                      <span className="text-[10px] text-[#aaa] ml-1">({meal.reviews})</span>
                    </div>
                  </div>
                  <div className="shrink-0 w-8 h-8 rounded-full border-2 border-[#E5E2DA] group-hover:border-[#E85D04] group-hover:bg-[#E85D04] flex items-center justify-center transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
