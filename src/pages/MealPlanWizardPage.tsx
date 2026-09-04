import { useState } from "react";
import { CartItem, Page, PLANS } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
}

type WizardStep = "goal" | "profile" | "menu" | "delivery" | "review";

const STEPS: { key: WizardStep; label: string; num: string }[] = [
  { key: "goal", label: "Choose Goal", num: "01" },
  { key: "profile", label: "Your Profile", num: "02" },
  { key: "menu", label: "Menu Prefs", num: "03" },
  { key: "delivery", label: "Delivery", num: "04" },
  { key: "review", label: "Review", num: "05" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MENU_PREFS = [
  { id: "breakfast", label: "Include Breakfast", icon: "🍳" },
  { id: "high-protein", label: "High Protein Focus", icon: "💪" },
  { id: "no-gluten", label: "Gluten-Free", icon: "🌾" },
  { id: "no-dairy", label: "Dairy-Free", icon: "🥛" },
  { id: "seafood", label: "Include Seafood", icon: "🐟" },
  { id: "red-meat", label: "Include Red Meat", icon: "🥩" },
];

export default function MealPlanWizardPage({ navigate, addToCart }: Props) {
  const [step, setStep] = useState<WizardStep>("goal");
  const [goal, setGoal] = useState("MAINTAIN");
  const [billing, setBilling] = useState<"week" | "month">("week");
  const [profile, setProfile] = useState({ gender: "male", age: "28", weight: "75", height: "175", activity: "moderate" });
  const [menuPrefs, setMenuPrefs] = useState<string[]>(["high-protein", "seafood", "red-meat"]);
  const [deliveryDays, setDeliveryDays] = useState<string[]>(["Mon", "Wed", "Fri"]);
  const [address, setAddress] = useState({ name: "Jerome Tan", phone: "+65 9123 4567", line1: "123 Toa Payoh Lor 4", unit: "#08-22", postal: "310123" });
  const [startDate, setStartDate] = useState("2025-09-08");

  const selectedPlan = PLANS.find((p) => p.name === goal) || PLANS[1];

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const goNext = () => setStep(STEPS[stepIndex + 1].key);
  const goBack = () => setStep(STEPS[stepIndex - 1].key);

  // Simple TDEE estimate
  const estimatedTDEE = (() => {
    const w = parseFloat(profile.weight) || 70;
    const h = parseFloat(profile.height) || 170;
    const a = parseFloat(profile.age) || 30;
    const bmr = profile.gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const mult = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 }[profile.activity] || 1.55;
    return Math.round(bmr * mult);
  })();

  const price = billing === "week" ? selectedPlan.priceWeek : selectedPlan.priceMonth;

  const handleSubscribe = () => {
    addToCart({
      id: 8888,
      name: `${selectedPlan.name} Meal Plan — ${selectedPlan.meals} meals/day`,
      price,
      qty: 1,
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop&auto=format",
      type: "plan",
      planLabel: `${billing === "week" ? "Weekly" : "Monthly"} · ${deliveryDays.join(", ")}`,
    });
    navigate("confirmation");
  };

  return (
    <div className="min-h-screen bg-[#0D2818] text-white">
      {/* Header */}
      <div className="bg-[#0A2014] border-b border-white/8">
        <div className="max-w-[960px] mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#F2C94C] uppercase">02 / Meal Plans</span>
          </div>
          <h1 className="font-display text-[40px] font-bold">Meal Plan Wizard</h1>
          <p className="text-white/40 mt-1 text-[14px]">Set up your personalised subscription in 5 steps.</p>
        </div>

        {/* Step progress */}
        <div className="max-w-[960px] mx-auto px-6">
          <div className="flex items-center gap-0 overflow-x-auto">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex items-center shrink-0">
                <div className={`flex items-center gap-2 px-5 py-4 border-b-2 text-[11px] tracking-wider uppercase font-medium transition-colors whitespace-nowrap ${step === s.key ? "border-[#F2C94C] text-[#F2C94C]" : i < stepIndex ? "border-[#F2C94C]/30 text-white/40" : "border-transparent text-white/20"}`}>
                  {i < stepIndex ? (
                    <span className="w-4 h-4 bg-[#F2C94C]/30 rounded-full flex items-center justify-center text-[9px] text-[#F2C94C]">✓</span>
                  ) : (
                    <span className="font-mono text-[10px]">{s.num}</span>
                  )}
                  {s.label}
                </div>
                {i < STEPS.length - 1 && <div className="w-4 text-white/15 text-center text-[11px]">›</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-6 py-14">

        {/* ── STEP 1: GOAL ── */}
        {step === "goal" && (
          <div>
            <h2 className="font-display text-[34px] font-bold mb-2">What's your goal?</h2>
            <p className="text-white/40 mb-10">We'll calibrate your daily macros to match.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => setGoal(plan.name)}
                  className={`relative p-7 cursor-pointer border transition-all ${goal === plan.name ? "border-[#F2C94C]/60 bg-white/5" : "border-white/10 hover:border-white/25"}`}
                >
                  <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: plan.accent }}>{plan.name}</span>
                  <div className="font-display text-[42px] font-bold mt-2 leading-none">{plan.cal}<span className="text-[18px] font-normal text-white/30"> kcal</span></div>
                  <p className="text-white/40 text-[13px] leading-relaxed mt-3 mb-5">{plan.desc}</p>
                  <div className="grid grid-cols-3 gap-1.5 mb-5">
                    {[{ l: "Protein", v: `${plan.protein}g` }, { l: "Carbs", v: `${plan.carbs}g` }, { l: "Fat", v: `${plan.fat}g` }].map((m) => (
                      <div key={m.l} className="bg-white/5 border border-white/8 py-2 text-center">
                        <div className="font-mono text-[12px]" style={{ color: plan.accent }}>{m.v}</div>
                        <div className="text-white/25 text-[9px] mt-0.5 uppercase">{m.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Billing toggle per card */}
                  <div className="flex items-center gap-1 bg-white/8 p-0.5 mb-4">
                    {(["week", "month"] as const).map((c) => (
                      <button key={c} onClick={(e) => { e.stopPropagation(); setBilling(c); }}
                        className={`flex-1 py-1.5 text-[10px] tracking-wider uppercase font-medium transition-all ${billing === c ? "text-[#111111]" : "text-white/30"}`}
                        style={{ backgroundColor: billing === c ? plan.accent : "transparent" }}>
                        {c === "week" ? "Weekly" : "Monthly"}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-display text-[32px] font-bold" style={{ color: plan.accent }}>
                        ${billing === "week" ? plan.priceWeek : plan.priceMonth}
                      </div>
                      <div className="text-white/30 text-[11px]">/{billing}</div>
                    </div>
                    <div className="text-white/30 text-[12px]">{plan.meals} meals/day</div>
                  </div>

                  {goal === plan.name && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: plan.accent }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button onClick={goNext} className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#111111] px-10 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
              Continue with {goal} Plan →
            </button>
          </div>
        )}

        {/* ── STEP 2: PROFILE ── */}
        {step === "profile" && (
          <div>
            <h2 className="font-display text-[34px] font-bold mb-2">Your profile</h2>
            <p className="text-white/40 mb-10">We'll verify your macros match your target.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Gender */}
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Biological Sex</label>
                <div className="flex gap-2">
                  {["male", "female"].map((g) => (
                    <button key={g} onClick={() => setProfile((p) => ({ ...p, gender: g }))}
                      className={`flex-1 py-3 text-[12px] tracking-widest uppercase font-medium border transition-all ${profile.gender === g ? "border-[#F2C94C] bg-[#F2C94C]/10 text-[#F2C94C]" : "border-white/15 text-white/40 hover:border-white/30"}`}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Age</label>
                <input type="number" value={profile.age} onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))}
                  className="w-full bg-[#1A3020] border border-white/15 text-white px-4 py-3 text-[15px] outline-none focus:border-[#F2C94C] transition-colors" />
              </div>

              {/* Weight */}
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Weight (kg)</label>
                <input type="number" value={profile.weight} onChange={(e) => setProfile((p) => ({ ...p, weight: e.target.value }))}
                  className="w-full bg-[#1A3020] border border-white/15 text-white px-4 py-3 text-[15px] outline-none focus:border-[#F2C94C] transition-colors" />
              </div>

              {/* Height */}
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Height (cm)</label>
                <input type="number" value={profile.height} onChange={(e) => setProfile((p) => ({ ...p, height: e.target.value }))}
                  className="w-full bg-[#1A3020] border border-white/15 text-white px-4 py-3 text-[15px] outline-none focus:border-[#F2C94C] transition-colors" />
              </div>

              {/* Activity */}
              <div className="md:col-span-2">
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Activity Level</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: "sedentary", label: "Sedentary", sub: "Desk job" },
                    { id: "light", label: "Light", sub: "1-3x/week" },
                    { id: "moderate", label: "Moderate", sub: "3-5x/week" },
                    { id: "active", label: "Active", sub: "6-7x/week" },
                    { id: "veryActive", label: "Very Active", sub: "Twice daily" },
                  ].map((a) => (
                    <button key={a.id} onClick={() => setProfile((p) => ({ ...p, activity: a.id }))}
                      className={`py-3 px-2 text-center border transition-all ${profile.activity === a.id ? "border-[#F2C94C] bg-[#F2C94C]/10" : "border-white/10 hover:border-white/25"}`}>
                      <div className={`text-[12px] font-medium ${profile.activity === a.id ? "text-[#F2C94C]" : "text-white/60"}`}>{a.label}</div>
                      <div className="text-[10px] text-white/25 mt-0.5">{a.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated result */}
            <div className="bg-[#1A3020] border border-[#F2C94C]/20 p-6 mb-8">
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#F2C94C] uppercase mb-3">Your Estimated TDEE</div>
              <div className="flex flex-wrap gap-8 items-center">
                <div>
                  <div className="font-display text-[42px] font-bold text-[#F2C94C]">{estimatedTDEE}</div>
                  <div className="text-white/35 text-[12px]">kcal/day maintenance</div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <div className="font-mono text-[12px] text-[#CDFF3A]">{selectedPlan.cal} kcal</div>
                    <div className="text-white/30 text-[11px]">{goal} target</div>
                  </div>
                  <div>
                    <div className="font-mono text-[12px] text-[#CDFF3A]">{selectedPlan.protein}g</div>
                    <div className="text-white/30 text-[11px]">Protein target</div>
                  </div>
                  <div>
                    <div className={`font-mono text-[12px] ${Math.abs(estimatedTDEE - selectedPlan.cal) < 300 ? "text-[#7EE8B0]" : "text-[#F2C94C]"}`}>
                      {estimatedTDEE > selectedPlan.cal ? "-" : "+"}{Math.abs(estimatedTDEE - selectedPlan.cal)} kcal
                    </div>
                    <div className="text-white/30 text-[11px]">vs maintenance</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={goBack} className="border border-white/15 px-6 py-3.5 text-[12px] text-white/40 hover:text-white hover:border-white/40 transition-colors">← Back</button>
              <button onClick={goNext} className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#111111] px-8 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                Set Menu Preferences →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: MENU PREFS ── */}
        {step === "menu" && (
          <div>
            <h2 className="font-display text-[34px] font-bold mb-2">Menu preferences</h2>
            <p className="text-white/40 mb-10">Our chefs will curate your daily menu around these preferences.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
              {MENU_PREFS.map((pref) => {
                const active = menuPrefs.includes(pref.id);
                return (
                  <button
                    key={pref.id}
                    onClick={() => setMenuPrefs((prev) => active ? prev.filter((p) => p !== pref.id) : [...prev, pref.id])}
                    className={`p-5 text-left border transition-all ${active ? "border-[#F2C94C]/60 bg-white/5" : "border-white/10 hover:border-white/25"}`}
                  >
                    <span className="text-[24px] block mb-2">{pref.icon}</span>
                    <div className={`text-[14px] font-medium ${active ? "text-white" : "text-white/50"}`}>{pref.label}</div>
                    {active && <div className="text-[#F2C94C] text-[11px] mt-1">✓ Selected</div>}
                  </button>
                );
              })}
            </div>

            <div className="border border-white/10 bg-[#1A3020] p-5 mb-8 text-[13px] text-white/50 leading-relaxed">
              <strong className="text-white">Note:</strong> Your menu is freshly prepared weekly by our chefs. You can modify specific meals or swap items at any time through your account portal.
            </div>

            <div className="flex gap-4">
              <button onClick={goBack} className="border border-white/15 px-6 py-3.5 text-[12px] text-white/40 hover:text-white hover:border-white/40 transition-colors">← Back</button>
              <button onClick={goNext} className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#111111] px-8 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                Set Delivery Details →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: DELIVERY ── */}
        {step === "delivery" && (
          <div>
            <h2 className="font-display text-[34px] font-bold mb-2">Delivery setup</h2>
            <p className="text-white/40 mb-10">Fresh meals delivered on your chosen days. Cut-off is 10pm the night before.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Full Name</label>
                <input value={address.name} onChange={(e) => setAddress((a) => ({ ...a, name: e.target.value }))}
                  className="w-full bg-[#1A3020] border border-white/15 text-white px-4 py-3 text-[15px] outline-none focus:border-[#F2C94C] transition-colors" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Phone Number</label>
                <input value={address.phone} onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))}
                  className="w-full bg-[#1A3020] border border-white/15 text-white px-4 py-3 text-[15px] outline-none focus:border-[#F2C94C] transition-colors" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Street Address</label>
                <input value={address.line1} onChange={(e) => setAddress((a) => ({ ...a, line1: e.target.value }))}
                  className="w-full bg-[#1A3020] border border-white/15 text-white px-4 py-3 text-[15px] outline-none focus:border-[#F2C94C] transition-colors" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Unit Number</label>
                <input value={address.unit} onChange={(e) => setAddress((a) => ({ ...a, unit: e.target.value }))}
                  className="w-full bg-[#1A3020] border border-white/15 text-white px-4 py-3 text-[15px] outline-none focus:border-[#F2C94C] transition-colors" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Postal Code</label>
                <input value={address.postal} onChange={(e) => setAddress((a) => ({ ...a, postal: e.target.value }))}
                  className="w-full bg-[#1A3020] border border-white/15 text-white px-4 py-3 text-[15px] outline-none focus:border-[#F2C94C] transition-colors" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-3">Plan Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-[#1A3020] border border-white/15 text-white px-4 py-3 text-[15px] outline-none focus:border-[#F2C94C] transition-colors" />
              </div>
            </div>

            {/* Delivery days */}
            <div className="mb-8">
              <label className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase block mb-4">Delivery Days <span className="text-white/25">(select {selectedPlan.meals >= 5 ? "5-7" : "3-5"})</span></label>
              <div className="flex gap-2">
                {DAYS.map((day) => {
                  const active = deliveryDays.includes(day);
                  return (
                    <button key={day}
                      onClick={() => setDeliveryDays((prev) => active ? prev.filter((d) => d !== day) : [...prev, day])}
                      className={`flex-1 py-3 text-[12px] tracking-wider uppercase font-medium border transition-all ${active ? "border-[#F2C94C] bg-[#F2C94C]/10 text-[#F2C94C]" : "border-white/10 text-white/30 hover:border-white/25"}`}>
                      {day}
                    </button>
                  );
                })}
              </div>
              <p className="text-white/25 text-[11px] mt-2">{deliveryDays.length} day{deliveryDays.length !== 1 ? "s" : ""} selected · Meals arrive between 6am–9am</p>
            </div>

            <div className="flex gap-4">
              <button onClick={goBack} className="border border-white/15 px-6 py-3.5 text-[12px] text-white/40 hover:text-white hover:border-white/40 transition-colors">← Back</button>
              <button onClick={goNext} className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#111111] px-8 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                Review & Subscribe →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 5: REVIEW ── */}
        {step === "review" && (
          <div>
            <h2 className="font-display text-[34px] font-bold mb-2">Review your plan</h2>
            <p className="text-white/40 mb-10">Everything looks good? Let's get you started.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left: plan + profile summary */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-[#1A3020] border border-[#F2C94C]/20 p-6">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-[#F2C94C] uppercase mb-4">Selected Plan</div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: selectedPlan.accent }}>{selectedPlan.name}</span>
                      <div className="font-display text-[36px] font-bold">{selectedPlan.cal}<span className="text-[18px] font-normal text-white/30"> kcal/day</span></div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-[32px] font-bold" style={{ color: selectedPlan.accent }}>${price}</div>
                      <div className="text-white/35 text-[12px]">/{billing}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ l: "Protein", v: `${selectedPlan.protein}g` }, { l: "Carbs", v: `${selectedPlan.carbs}g` }, { l: "Fat", v: `${selectedPlan.fat}g` }].map((m) => (
                      <div key={m.l} className="bg-white/5 border border-white/8 py-3 text-center">
                        <div className="font-mono text-[13px]" style={{ color: selectedPlan.accent }}>{m.v}</div>
                        <div className="text-white/25 text-[10px] mt-1 uppercase">{m.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1A3020] p-6 grid grid-cols-2 gap-6">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase mb-3">Delivery Address</div>
                    <div className="text-[14px] text-white/70 space-y-0.5">
                      <div className="font-medium text-white">{address.name}</div>
                      <div>{address.line1} {address.unit}</div>
                      <div>S{address.postal}</div>
                      <div>{address.phone}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase mb-3">Delivery Schedule</div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {deliveryDays.map((d) => (
                        <span key={d} className="bg-[#F2C94C]/15 text-[#F2C94C] text-[11px] px-2 py-1 border border-[#F2C94C]/20">{d}</span>
                      ))}
                    </div>
                    <div className="text-[12px] text-white/35">Starts {startDate}</div>
                    <div className="text-[12px] text-white/35">6am–9am delivery window</div>
                  </div>
                </div>

                <div className="bg-[#1A3020] p-6">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase mb-3">Menu Preferences</div>
                  <div className="flex flex-wrap gap-2">
                    {menuPrefs.map((p) => {
                      const pref = MENU_PREFS.find((m) => m.id === p);
                      return pref ? (
                        <span key={p} className="bg-white/5 border border-white/10 text-white/60 text-[12px] px-3 py-1.5">{pref.icon} {pref.label}</span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>

              {/* Right: billing summary */}
              <div className="bg-[#1A3020] border border-[#F2C94C]/25 p-7 self-start">
                <h3 className="font-display text-[20px] font-bold mb-6">Subscription Summary</h3>

                {/* Billing toggle */}
                <div className="flex items-center gap-1 bg-white/8 p-0.5 mb-5">
                  {(["week", "month"] as const).map((c) => (
                    <button key={c} onClick={() => setBilling(c)}
                      className={`flex-1 py-2 text-[10px] tracking-wider uppercase font-medium transition-all ${billing === c ? "bg-[#F2C94C] text-[#111111]" : "text-white/30"}`}>
                      {c === "week" ? "Weekly" : <span>Monthly <span className="text-[#7EE8B0]">–12%</span></span>}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 mb-5 text-[13px]">
                  <div className="flex justify-between"><span className="text-white/40">{selectedPlan.meals} meals/day</span><span>{deliveryDays.length} days</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Delivery</span><span className="text-[#7EE8B0]">Free</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Billing cycle</span><span>{billing === "week" ? "Weekly" : "Monthly"}</span></div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px]">Total {billing === "week" ? "/ week" : "/ month"}</span>
                    <span className="font-display text-[26px] font-bold text-[#F2C94C]">${price}</span>
                  </div>
                  <p className="text-white/20 text-[11px] mt-1">Cancel or pause anytime</p>
                </div>

                {/* Payment */}
                <div className="mb-5">
                  <label className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase block mb-3">Card Number</label>
                  <input defaultValue="4242 4242 4242 4242" className="w-full bg-[#111]/50 border border-white/15 text-white px-4 py-3 text-[14px] outline-none focus:border-[#F2C94C] transition-colors font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase block mb-2">Expiry</label>
                    <input defaultValue="08/28" className="w-full bg-[#111]/50 border border-white/15 text-white px-4 py-3 text-[14px] outline-none focus:border-[#F2C94C] font-mono" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase block mb-2">CVC</label>
                    <input defaultValue="•••" className="w-full bg-[#111]/50 border border-white/15 text-white px-4 py-3 text-[14px] outline-none focus:border-[#F2C94C] font-mono" />
                  </div>
                </div>

                <button onClick={handleSubscribe} className="w-full bg-[#F2C94C] text-[#111111] py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                  Subscribe Now — ${price}/{billing}
                </button>
                <p className="text-white/20 text-[11px] text-center mt-3">🔒 Secured by Stripe · Cancel anytime</p>
              </div>
            </div>

            <button onClick={goBack} className="border border-white/15 px-6 py-3.5 text-[12px] text-white/40 hover:text-white hover:border-white/40 transition-colors">← Back</button>
          </div>
        )}
      </div>
    </div>
  );
}
