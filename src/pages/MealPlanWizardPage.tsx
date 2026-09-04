import { useState } from "react";
import { CartItem, Meal, MEALS, Page, PLANS } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
  initialPlan: string;
  onCheckoutComplete: (addr: { name: string; phone: string; line1: string; unit: string; postal: string }) => void;
}

type Step = 1 | 2 | 3 | 4;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["6am – 9am", "9am – 12pm", "12pm – 3pm", "3pm – 6pm"];
const STEP_LABELS = ["Goal", "Meals", "Delivery", "Pay"];

export default function MealPlanWizardPage({ navigate, addToCart, initialPlan, onCheckoutComplete }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [goal, setGoal] = useState(initialPlan || "MAINTAIN");
  const [billing, setBilling] = useState<"week" | "month">("week");
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
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

  const toggleMeal = (id: number) =>
    setSelectedMeals((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < maxMeals
        ? [...prev, id]
        : prev
    );

  const canProceedStep2 = selectedMeals.length >= plan.meals;
  const canProceedStep3 =
    deliveryDays.length > 0 &&
    address.name.trim() !== "" &&
    address.line1.trim() !== "" &&
    address.postal.trim() !== "";
  const canSubscribe = autoChargeConsent;

  const handleNext = () => {
    if (step < 4) setStep((s) => (s + 1) as Step);
  };

  const handleSubscribe = () => {
    addToCart({
      id: 8888,
      name: `${plan.name} Meal Plan — ${plan.meals} meals/day`,
      price,
      qty: 1,
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop&auto=format",
      type: "plan",
      planLabel: `${billing === "week" ? "Weekly" : "Monthly"} · ${deliveryDays.join(", ")}`,
    });
    onCheckoutComplete(address);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E2DA] flex items-center justify-between px-6 py-4 sticky top-0 z-20">
        <button onClick={() => navigate("home")} className="font-bold text-[20px] tracking-tight text-[#111]">
          FRESHER<span className="text-[#F2C94C]">.</span>
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-3">
          {([1, 2, 3, 4] as Step[]).map((s) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${
                  s === step
                    ? "border-[#111] bg-[#111] text-white"
                    : s < step
                    ? "border-[#F2C94C] bg-[#F2C94C] text-[#111]"
                    : "border-[#D0CCC4] bg-white text-[#999]"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              <span className={`text-[10px] font-medium ${s === step ? "text-[#111]" : "text-[#999]"}`}>
                {STEP_LABELS[s - 1]}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => (step > 1 ? setStep((s) => (s - 1) as Step) : navigate("home"))}
          className="text-sm text-[#666] hover:text-[#111] transition-colors font-medium"
        >
          {step === 1 ? "Close" : "Back"}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">

          {/* ─── Step 1: Goal ─── */}
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-1">Choose Your Goal</h1>
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

              <button
                onClick={handleNext}
                className="w-full py-4 rounded-xl font-semibold text-[15px] transition-all bg-[#F2C94C] text-[#111] hover:bg-[#111] hover:text-white"
              >
                Continue →
              </button>
            </div>
          )}

          {/* ─── Step 2: Pick Your Meals ─── */}
          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-1">Pick Your Meals</h1>
              <p className="text-[#666] mb-2">
                Select at least <strong>{plan.meals}</strong> meals for your weekly rotation. You can always swap from your account.
              </p>

              {/* Counter */}
              <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-white border border-[#E5E2DA]">
                <span className="text-sm text-[#555]">
                  <strong>{selectedMeals.length}</strong> of <strong>{maxMeals}</strong> selected
                  {selectedMeals.length < plan.meals && (
                    <span className="text-red-500 ml-2">· Select at least {plan.meals}</span>
                  )}
                </span>
                <span className="text-xs text-[#999]">Max {maxMeals} for variety</span>
              </div>

              {/* Meal grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {MEALS.map((meal: Meal) => {
                  const isSelected = selectedMeals.includes(meal.id);
                  const atMax = selectedMeals.length >= maxMeals && !isSelected;
                  return (
                    <div
                      key={meal.id}
                      className={`rounded-xl overflow-hidden border-2 bg-white transition-all ${
                        isSelected ? "border-[#111] shadow-md" : "border-[#D0CCC4]"
                      } ${atMax ? "opacity-50" : ""}`}
                    >
                      <div className="relative h-40">
                        <img
                          src={meal.img}
                          alt={meal.name}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-[#F2C94C] flex items-center justify-center text-xl font-bold text-[#111]">
                              ✓
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-[13px] leading-tight mb-2">{meal.name}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="text-[10px] font-mono bg-[#F7F5F0] px-1.5 py-0.5 rounded text-[#555]">
                            P {meal.protein}g
                          </span>
                          <span className="text-[10px] font-mono bg-[#F7F5F0] px-1.5 py-0.5 rounded text-[#555]">
                            C {meal.carbs}g
                          </span>
                          <span className="text-[10px] font-mono bg-[#F7F5F0] px-1.5 py-0.5 rounded text-[#555]">
                            {meal.cal} kcal
                          </span>
                        </div>
                        <button
                          onClick={() => toggleMeal(meal.id)}
                          disabled={atMax}
                          className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isSelected
                              ? "bg-[#111] text-white"
                              : atMax
                              ? "bg-[#E5E2DA] text-[#aaa] cursor-not-allowed"
                              : "bg-[#F7F5F0] text-[#111] border border-[#D0CCC4] hover:bg-[#111] hover:text-white hover:border-[#111]"
                          }`}
                        >
                          {isSelected ? "✓ Selected" : "Select"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceedStep2}
                className={`w-full py-4 rounded-xl font-semibold text-[15px] transition-all ${
                  canProceedStep2
                    ? "bg-[#F2C94C] text-[#111] hover:bg-[#111] hover:text-white"
                    : "bg-[#E5E2DA] text-[#aaa] cursor-not-allowed"
                }`}
              >
                Continue with {selectedMeals.length} meal{selectedMeals.length !== 1 ? "s" : ""} →
              </button>
            </div>
          )}

          {/* ─── Step 3: Delivery ─── */}
          {step === 3 && (
            <div>
              <h1 className="text-2xl font-bold mb-1">Delivery Preferences</h1>
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
                  <div className="grid grid-cols-2 gap-3">
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
                disabled={!canProceedStep3}
                className={`w-full py-4 rounded-xl font-semibold text-[15px] transition-all ${
                  canProceedStep3
                    ? "bg-[#F2C94C] text-[#111] hover:bg-[#111] hover:text-white"
                    : "bg-[#E5E2DA] text-[#aaa] cursor-not-allowed"
                }`}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ─── Step 4: Payment ─── */}
          {step === 4 && (
            <div>
              <h1 className="text-2xl font-bold mb-1">Payment</h1>
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
    </div>
  );
}
