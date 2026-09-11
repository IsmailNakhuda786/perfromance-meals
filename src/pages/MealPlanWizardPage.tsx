import { useState, useMemo } from "react";
import { MEALS, Page } from "@/data";
import { MealPlanLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToCart?: (item: any) => void;
  initialPlan: string;
  onCheckoutComplete: (addr: { name: string; phone: string; line1: string; unit: string; postal: string }) => void;
}

type ProgrammeType = "bi-weekly" | "monthly" | "6by60" | "buddy-plan" | "hyrox";
type MealPlanType = "Low Carb Regular" | "Low Carb Petite" | "Balance Regular";
type MealCount = "lunch-only" | "lunch-dinner";
type Step = 1 | 2 | 3 | 4 | 5;

const STEP_LABELS = ["Type", "Plan & Meals", "Menu", "Your Details", "Review"];
const STEP_SUBTITLES = [
  "Recurring or fixed-period?",
  "What & how much?",
  "Pick your weekly meals",
  "Where do we deliver?",
  "Confirm & place order",
];

const PROGRAMME_DETAILS: Record<ProgrammeType, {
  label: string; description: string; kind: "recurring" | "fixed"; days?: number; menuWeeks: number; badge?: string;
}> = {
  "bi-weekly":  { label: "Bi-weekly",  description: "Delivery every 2 weeks",                                  kind: "recurring", menuWeeks: 2, badge: "POPULAR" },
  "monthly":    { label: "Monthly",    description: "One delivery per month",                                   kind: "recurring", menuWeeks: 4 },
  "6by60":      { label: "6by60",      description: "60-day programme · Fresh structure for your goal",         kind: "fixed", days: 60, menuWeeks: 4 },
  "buddy-plan": { label: "Buddy Plan", description: "20-day programme · Consistent meals for your week",       kind: "fixed", days: 20, menuWeeks: 4 },
  "hyrox":      { label: "HYROX",      description: "20-day programme · Structured fuel around your sessions", kind: "fixed", days: 20, menuWeeks: 4 },
};

const MEAL_PLANS: { id: MealPlanType; kcal: string; note: string }[] = [
  { id: "Low Carb Regular", kcal: "~400–450 kcal", note: "Most popular · balanced macros" },
  { id: "Low Carb Petite",  kcal: "~300–350 kcal", note: "Lighter portions · calorie deficit" },
  { id: "Balance Regular",  kcal: "~500–550 kcal", note: "Higher energy · performance fuel" },
];

const BASE_PRICES: Record<MealPlanType, Record<MealCount, number>> = {
  "Low Carb Regular": { "lunch-only": 140, "lunch-dinner": 200 },
  "Low Carb Petite":  { "lunch-only": 120, "lunch-dinner": 180 },
  "Balance Regular":  { "lunch-only": 150, "lunch-dinner": 220 },
};

const WEEKS = [
  { label: "Week 1", dates: "23–27 Jun" },
  { label: "Week 2", dates: "30 Jun–4 Jul" },
  { label: "Week 3", dates: "7–11 Jul" },
  { label: "Week 4", dates: "14–18 Jul" },
];

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const WEEKDAY_SHORT = ["MON", "TUE", "WED", "THU", "FRI"];

const WEEK_MENUS: Array<{ lunch: number[]; dinner: number[] }> = [
  { lunch: [1, 7],  dinner: [4, 9]  },
  { lunch: [2, 5],  dinner: [6, 10] },
  { lunch: [3, 8],  dinner: [1, 5]  },
  { lunch: [7, 9],  dinner: [2, 6]  },
];

function getMeal(id: number) {
  return MEALS.find((m) => m.id === id) ?? MEALS[0];
}

type MenuSelections = Record<number, Record<string, { lunch: number | null; dinner: number | null }>>;

// ── Sleek selection card ─────────────────────────────────────────────────────
function PickCard({
  selected, onClick, children, badge,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left p-5 transition-all duration-150 border group
        ${selected
          ? "border-[#E85D04] bg-[#FFF9F5] shadow-[0_0_0_2px_#E85D04]"
          : "border-[#E8E4DC] bg-white hover:border-[#C0BAB0] hover:shadow-sm active:scale-[0.99]"
        }`}
    >
      {badge && (
        <span className="absolute top-3 right-3 bg-[#E85D04] text-white text-[9px] font-extrabold tracking-[0.15em] uppercase px-2 py-0.5">
          {badge}
        </span>
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">{children}</div>
        <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150
          ${selected ? "border-[#E85D04] bg-[#E85D04]" : "border-[#D0CCC4] group-hover:border-[#aaa]"}`}>
          {selected && (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

// ── Meal thumbnail card for menu step ───────────────────────────────────────
function MealCard({
  meal, selected, onClick, slotLabel,
}: {
  meal: typeof MEALS[0];
  selected: boolean;
  onClick: () => void;
  slotLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left overflow-hidden border transition-all duration-150 group
        ${selected
          ? "border-[#E85D04] shadow-[0_0_0_2px_#E85D04]"
          : "border-[#E8E4DC] hover:border-[#C0BAB0] hover:shadow-sm active:scale-[0.99]"
        }`}
    >
      {/* Image strip */}
      <div className="relative h-28 overflow-hidden">
        <img src={meal.img} alt={meal.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <span className={`text-[9px] font-bold tracking-[0.15em] uppercase px-1.5 py-0.5 ${slotLabel === "LUNCH" ? "bg-[#F5B300] text-[#1A1A1A]" : "bg-[#E85D04] text-white"}`}>
            {slotLabel}
          </span>
          {selected && (
            <div className="w-6 h-6 bg-[#E85D04] rounded-full flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
          )}
        </div>
      </div>
      {/* Info */}
      <div className="p-3 bg-white">
        <div className="font-semibold text-[13px] leading-tight text-[#1A1A1A] mb-1">{meal.name}</div>
        <div className="flex gap-2 text-[11px] text-[#888]">
          <span>{meal.cal} kcal</span>
          <span>·</span>
          <span>P {meal.protein}g</span>
          <span>·</span>
          <span>C {meal.carbs}g</span>
        </div>
      </div>
    </button>
  );
}

export default function MealPlanWizardPage({ navigate, onCheckoutComplete }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [programme, setProgramme] = useState<ProgrammeType>("bi-weekly");
  const [mealPlan, setMealPlan] = useState<MealPlanType>("Low Carb Regular");
  const [mealCount, setMealCount] = useState<MealCount>("lunch-dinner");
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [openDay, setOpenDay] = useState<string | null>("Monday");
  const [menuSelections, setMenuSelections] = useState<MenuSelections>({});
  const [details, setDetails] = useState({ name: "", phone: "", email: "", street: "", city: "", postcode: "", notes: "" });

  const progInfo = PROGRAMME_DETAILS[programme];
  const basePrice = BASE_PRICES[mealPlan][mealCount];
  const gst = basePrice * 0.06;
  const total = basePrice + gst;

  const slotsPerDay = mealCount === "lunch-dinner" ? 2 : 1;
  const totalSlots = WEEKDAYS.length * slotsPerDay;

  const weekSels = menuSelections[selectedWeek] || {};
  const filledSlots = WEEKDAYS.reduce((acc, day) => {
    const d = weekSels[day];
    if (!d) return acc;
    let c = d.lunch ? 1 : 0;
    if (mealCount === "lunch-dinner") c += d.dinner ? 1 : 0;
    return acc + c;
  }, 0);

  // Completion % drives the gamification bar
  const completionPct = useMemo(() => {
    const base = (step - 1) * 20;
    if (step === 3) return Math.min(base + Math.round((filledSlots / totalSlots) * 20), 79);
    return Math.min(base, 100);
  }, [step, filledSlots, totalSlots]);

  const selectMeal = (day: string, slot: "lunch" | "dinner", mealId: number) => {
    setMenuSelections((prev) => ({
      ...prev,
      [selectedWeek]: {
        ...(prev[selectedWeek] || {}),
        [day]: {
          lunch: prev[selectedWeek]?.[day]?.lunch ?? null,
          dinner: prev[selectedWeek]?.[day]?.dinner ?? null,
          [slot]: mealId,
        },
      },
    }));
  };

  const getMealById = (id: number | null) => id ? MEALS.find((m) => m.id === id) : null;

  const startDate = new Date(2025, 5, 25);
  const endDate = progInfo.days ? new Date(startDate.getTime() + (progInfo.days - 1) * 86400000) : null;
  const fmtDate = (d: Date) => d.toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" });

  const canProceed4 = !!(details.name && details.phone && details.email && details.street);

  const progLabel = progInfo.kind === "fixed" && progInfo.days
    ? `${progInfo.label} · ${progInfo.days} days`
    : progInfo.label;
  const mealCountLabel = mealCount === "lunch-only" ? "Lunch Only · 1/day" : "Lunch & Dinner · 2/day";

  const goBack = () => step === 1 ? navigate("meal-plan-landing") : setStep((s) => (s - 1) as Step);

  const weekPool = WEEK_MENUS[selectedWeek] ?? WEEK_MENUS[0];
  const lunchOptions = weekPool.lunch.map(getMeal);
  const dinnerOptions = weekPool.dinner.map(getMeal);

  // Day completion dots for menu step
  const dayCompletionMap = WEEKDAYS.map((day) => {
    const d = (menuSelections[selectedWeek] || {})[day] || { lunch: null, dinner: null };
    const filled = (d.lunch ? 1 : 0) + (mealCount === "lunch-dinner" && d.dinner ? 1 : 0);
    return filled === slotsPerDay;
  });

  return (
    <div className="min-h-screen text-[#1A1A1A]" style={{ backgroundColor: "#F7F5F1" }}>

      {/* ── Top chrome: logo + progress arc ── */}
      <div className="bg-white border-b border-[#E8E4DC] sticky top-0 z-30">
        {/* Slim progress bar — very top */}
        <div className="h-0.5 bg-[#E8E4DC]">
          <div
            className="h-full bg-[#E85D04] transition-all duration-700 ease-out"
            style={{ width: `${completionPct}%` }}
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex items-center gap-6 py-3">
          <button onClick={() => navigate("meal-plan-landing")} className="shrink-0">
            <MealPlanLogo size="sm" variant="light" />
          </button>

          {/* Step pills — desktop */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {STEP_LABELS.map((label, i) => {
              const s = (i + 1) as Step;
              const done = s < step;
              const active = s === step;
              return (
                <div key={label} className="flex items-center gap-1">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold transition-all
                    ${active ? "text-[#E85D04]" : done ? "text-[#555]" : "text-[#C0BAB0]"}`}>
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0
                      ${active ? "bg-[#E85D04] text-white" : done ? "bg-[#E85D04] text-white" : "border border-[#D0CCC4] text-[#C0BAB0]"}`}>
                      {done ? "✓" : s}
                    </span>
                    {label}
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`w-6 h-px ${s < step ? "bg-[#E85D04]" : "bg-[#E0DCD6]"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: step x of 5 */}
          <div className="md:hidden flex-1 text-center text-[13px] font-semibold text-[#666]">
            Step {step} of 5 — {STEP_LABELS[step - 1]}
          </div>

          {/* Completion badge */}
          <div className="shrink-0 flex items-center gap-2">
            <div className="text-[11px] font-bold text-[#E85D04]">{completionPct}%</div>
            <button onClick={goBack} className="text-[12px] text-[#888] hover:text-[#1A1A1A] transition-colors font-medium">
              {step === 1 ? "Exit" : "← Back"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 lg:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

        {/* ── MAIN CONTENT PANEL ── */}
        <div className="flex-1 min-w-0">
          {/* Step header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#E85D04]">
                {String(step).padStart(2, "0")} / {String(STEP_LABELS.length).padStart(2, "0")}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
              {STEP_LABELS[step - 1]}
            </h1>
            <p className="text-[#888] mt-1 text-[15px]">{STEP_SUBTITLES[step - 1]}</p>
          </div>

          {/* ════ Step 1: Type ════ */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#888] mb-3">Recurring Subscription</p>
                <div className="space-y-2.5">
                  {(["bi-weekly", "monthly"] as ProgrammeType[]).map((type) => {
                    const info = PROGRAMME_DETAILS[type];
                    return (
                      <PickCard key={type} selected={programme === type} onClick={() => setProgramme(type)} badge={info.badge}>
                        <div className="font-bold text-[16px]">{info.label}</div>
                        <div className="text-[13px] text-[#888] mt-0.5">{info.description}</div>
                      </PickCard>
                    );
                  })}
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="flex-1 h-px bg-[#E8E4DC]" />
                <span className="mx-4 text-[11px] font-semibold text-[#C0BAB0] tracking-widest uppercase">or</span>
                <div className="flex-1 h-px bg-[#E8E4DC]" />
              </div>

              <div>
                <p className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#888] mb-3">Fixed-Period Programme</p>
                <div className="space-y-2.5">
                  {(["6by60", "buddy-plan", "hyrox"] as ProgrammeType[]).map((type) => {
                    const info = PROGRAMME_DETAILS[type];
                    return (
                      <PickCard key={type} selected={programme === type} onClick={() => setProgramme(type)}>
                        <div className="font-bold text-[16px]">{info.label}</div>
                        <div className="text-[13px] text-[#888] mt-0.5">{info.description}</div>
                      </PickCard>
                    );
                  })}
                </div>
              </div>

              <button onClick={() => setStep(2)}
                className="w-full bg-[#E85D04] text-white py-4 font-bold text-[15px] tracking-wide hover:bg-[#1A1A1A] transition-colors active:scale-[0.99] flex items-center justify-center gap-2">
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}

          {/* ════ Step 2: Plan & Meals ════ */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#888] mb-3">Meal Type & Size</p>
                <div className="space-y-2.5">
                  {MEAL_PLANS.map((plan) => (
                    <PickCard key={plan.id} selected={mealPlan === plan.id} onClick={() => setMealPlan(plan.id)}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-bold text-[16px]">{plan.id}</span>
                        <span className="text-[13px] font-semibold text-[#E85D04]">{plan.kcal}</span>
                      </div>
                      <div className="text-[12px] text-[#888] mt-0.5">{plan.note}</div>
                    </PickCard>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#888] mb-3">Meals Per Day</p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { id: "lunch-only"   as MealCount, label: "Lunch Only",     sub: "1 meal / day",  icon: "☀️" },
                    { id: "lunch-dinner" as MealCount, label: "Lunch & Dinner", sub: "2 meals / day", icon: "🌙" },
                  ]).map((opt) => (
                    <button key={opt.id} onClick={() => setMealCount(opt.id)}
                      className={`p-5 border text-left transition-all duration-150 group active:scale-[0.99]
                        ${mealCount === opt.id
                          ? "border-[#E85D04] bg-[#FFF9F5] shadow-[0_0_0_2px_#E85D04]"
                          : "border-[#E8E4DC] bg-white hover:border-[#C0BAB0] hover:shadow-sm"
                        }`}>
                      <div className="text-2xl mb-3">{opt.icon}</div>
                      <div className="font-bold text-[15px]">{opt.label}</div>
                      <div className="text-[12px] text-[#888] mt-0.5">{opt.sub}</div>
                      <div className={`mt-3 text-[11px] font-bold tracking-wide transition-colors ${mealCount === opt.id ? "text-[#E85D04]" : "text-transparent"}`}>
                        ✓ Selected
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#1A1A1A] text-white px-5 py-4 flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 bg-[#E85D04] flex items-center justify-center text-xl">💰</div>
                <div>
                  <p className="font-bold text-[14px]">
                    Total from <span className="text-[#F5B300]">RM {basePrice.toFixed(0)}</span>
                    <span className="text-white/40 font-normal text-[12px] ml-1">+ 6% GST</span>
                  </p>
                  <p className="text-white/50 text-[12px]">Delivery included · cancel anytime</p>
                </div>
              </div>

              <button onClick={() => setStep(3)}
                className="w-full bg-[#E85D04] text-white py-4 font-bold text-[15px] tracking-wide hover:bg-[#1A1A1A] transition-colors active:scale-[0.99] flex items-center justify-center gap-2">
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}

          {/* ════ Step 3: Menu ════ */}
          {step === 3 && (
            <div>
              {/* Week tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                {WEEKS.map((w, i) => (
                  <button key={i} onClick={() => { setSelectedWeek(i); setOpenDay("Monday"); }}
                    className={`flex flex-col items-center px-4 py-2.5 border text-center shrink-0 transition-all
                      ${selectedWeek === i
                        ? "border-[#E85D04] bg-[#E85D04] text-white"
                        : "border-[#E8E4DC] bg-white text-[#888] hover:border-[#aaa]"
                      }`}>
                    <span className="text-[12px] font-extrabold tracking-wide">{w.label}</span>
                    <span className="text-[10px] opacity-70 mt-0.5">{w.dates}</span>
                  </button>
                ))}
              </div>

              {/* Day completion dots */}
              <div className="bg-white border border-[#E8E4DC] px-5 py-3 mb-5 flex items-center gap-4">
                <div className="flex gap-2 flex-1">
                  {WEEKDAYS.map((day, i) => (
                    <div key={day} className="flex flex-col items-center gap-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold transition-all
                        ${dayCompletionMap[i]
                          ? "bg-[#E85D04] text-white"
                          : openDay === day
                            ? "border-2 border-[#E85D04] text-[#E85D04]"
                            : "border-2 border-[#E8E4DC] text-[#C0BAB0]"
                        }`}>
                        {dayCompletionMap[i] ? "✓" : WEEKDAY_SHORT[i].slice(0, 1)}
                      </div>
                      <span className="text-[8px] text-[#aaa] font-semibold">{WEEKDAY_SHORT[i]}</span>
                    </div>
                  ))}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-bold text-[#1A1A1A]">{filledSlots}<span className="text-[#C0BAB0] font-normal">/{totalSlots}</span></div>
                  <div className="text-[10px] text-[#888]">meals chosen</div>
                </div>
              </div>

              {/* Info pill */}
              <div className="flex items-start gap-2 bg-[#FFFBF0] border border-[#F5B300]/30 px-4 py-3 mb-5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F5B300" strokeWidth="2" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
                <p className="text-[12px] text-[#666] leading-relaxed">
                  <strong className="text-[#1A1A1A]">Kitchen pre-sets 4 meals each week</strong> — 2 for lunch, 2 for dinner.
                  Mix and match across any day. Same pool, every day this week.
                </p>
              </div>

              {/* Day accordion */}
              <div className="space-y-2 mb-8">
                {WEEKDAYS.map((day, di) => {
                  const isOpen = openDay === day;
                  const dayData = (menuSelections[selectedWeek] || {})[day] || { lunch: null, dinner: null };
                  const lm = getMealById(dayData.lunch);
                  const dm = getMealById(dayData.dinner);
                  const done = dayCompletionMap[di];

                  return (
                    <div key={day}
                      className={`border transition-all duration-200 ${isOpen ? "border-[#E85D04] bg-white" : "border-[#E8E4DC] bg-white hover:border-[#C0BAB0]"}`}>
                      <button
                        onClick={() => setOpenDay(isOpen ? null : day)}
                        className="w-full flex items-center gap-4 px-5 py-4 text-left">
                        <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-extrabold transition-all
                          ${done ? "bg-[#E85D04] text-white" : isOpen ? "border-2 border-[#E85D04] text-[#E85D04]" : "border-2 border-[#E8E4DC] text-[#C0BAB0]"}`}>
                          {done ? "✓" : WEEKDAY_SHORT[di].slice(0, 1)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[15px]">{day}</span>
                            {isOpen && <span className="text-[11px] text-[#E85D04] font-semibold">Editing</span>}
                            {!isOpen && done && <span className="text-[11px] text-[#888]">Done</span>}
                            {!isOpen && !done && <span className="text-[11px] text-[#aaa]">Tap to choose</span>}
                          </div>
                          {!isOpen && (lm || dm) && (
                            <div className="flex gap-2 mt-0.5 min-w-0">
                              {lm && <span className="text-[11px] text-[#888] truncate">L: {lm.name}</span>}
                              {dm && <span className="text-[11px] text-[#888] truncate">D: {dm.name}</span>}
                            </div>
                          )}
                        </div>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className={`shrink-0 text-[#888] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-[#E8E4DC]">
                          <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#888] mt-4 mb-3">
                            Lunch — pick one
                          </p>
                          <div className="grid grid-cols-2 gap-3 mb-5">
                            {lunchOptions.map((meal) => (
                              <MealCard key={meal.id} meal={meal} selected={dayData.lunch === meal.id}
                                onClick={() => selectMeal(day, "lunch", meal.id)} slotLabel="LUNCH" />
                            ))}
                          </div>
                          {mealCount === "lunch-dinner" && (
                            <>
                              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#888] mb-3">
                                Dinner — pick one
                              </p>
                              <div className="grid grid-cols-2 gap-3">
                                {dinnerOptions.map((meal) => (
                                  <MealCard key={meal.id} meal={meal} selected={dayData.dinner === meal.id}
                                    onClick={() => selectMeal(day, "dinner", meal.id)} slotLabel="DINNER" />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button onClick={() => setStep(4)}
                className="w-full bg-[#E85D04] text-white py-4 font-bold text-[15px] tracking-wide hover:bg-[#1A1A1A] transition-colors active:scale-[0.99] flex items-center justify-center gap-2">
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}

          {/* ════ Step 4: Your Details ════ */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#888] mb-4">Personal Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#666] mb-1.5 tracking-wide">Full Name</label>
                    <input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })}
                      placeholder="Alex Johnson"
                      className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-[14px] placeholder:text-[#C0BAB0] focus:outline-none focus:border-[#E85D04] focus:shadow-[0_0_0_2px_rgba(232,93,4,0.15)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#666] mb-1.5 tracking-wide">Phone Number</label>
                    <input value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                      placeholder="+60 12-345 6789"
                      className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-[14px] placeholder:text-[#C0BAB0] focus:outline-none focus:border-[#E85D04] focus:shadow-[0_0_0_2px_rgba(232,93,4,0.15)] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#666] mb-1.5 tracking-wide">Email</label>
                  <input value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    type="email" placeholder="alex@email.com"
                    className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-[14px] placeholder:text-[#C0BAB0] focus:outline-none focus:border-[#E85D04] focus:shadow-[0_0_0_2px_rgba(232,93,4,0.15)] transition-all" />
                </div>
              </div>

              <div>
                <p className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#888] mb-4">Delivery Address</p>
                {/* Fixed schedule pill */}
                <div className="flex items-center gap-3 bg-[#1A1A1A] text-white px-4 py-3 mb-5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  <div className="text-[13px]">
                    <span className="font-bold">Fixed delivery:</span>
                    <span className="text-white/60 ml-1.5">Sun, Tue & Thu · 5:00–8:00 pm</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#666] mb-1.5 tracking-wide">Street Address</label>
                    <input value={details.street} onChange={(e) => setDetails({ ...details, street: e.target.value })}
                      placeholder="123 Jalan Ampang"
                      className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-[14px] placeholder:text-[#C0BAB0] focus:outline-none focus:border-[#E85D04] focus:shadow-[0_0_0_2px_rgba(232,93,4,0.15)] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#666] mb-1.5 tracking-wide">City</label>
                      <input value={details.city} onChange={(e) => setDetails({ ...details, city: e.target.value })}
                        placeholder="Kuala Lumpur"
                        className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-[14px] placeholder:text-[#C0BAB0] focus:outline-none focus:border-[#E85D04] focus:shadow-[0_0_0_2px_rgba(232,93,4,0.15)] transition-all" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#666] mb-1.5 tracking-wide">Postcode</label>
                      <input value={details.postcode} onChange={(e) => setDetails({ ...details, postcode: e.target.value })}
                        placeholder="50450"
                        className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-[14px] placeholder:text-[#C0BAB0] focus:outline-none focus:border-[#E85D04] focus:shadow-[0_0_0_2px_rgba(232,93,4,0.15)] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#666] mb-1.5 tracking-wide">Delivery Notes <span className="text-[#C0BAB0] font-normal">(optional)</span></label>
                    <textarea value={details.notes} onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                      placeholder="Leave at door, call on arrival..."
                      rows={3}
                      className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-[14px] placeholder:text-[#C0BAB0] focus:outline-none focus:border-[#E85D04] focus:shadow-[0_0_0_2px_rgba(232,93,4,0.15)] transition-all resize-none" />
                  </div>
                </div>
              </div>

              <button onClick={() => { if (canProceed4) setStep(5); }} disabled={!canProceed4}
                className={`w-full py-4 font-bold text-[15px] tracking-wide transition-colors active:scale-[0.99] flex items-center justify-center gap-2
                  ${canProceed4 ? "bg-[#E85D04] text-white hover:bg-[#1A1A1A]" : "bg-[#E8E4DC] text-[#C0BAB0] cursor-not-allowed"}`}>
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}

          {/* ════ Step 5: Review ════ */}
          {step === 5 && (
            <div className="space-y-4">
              {/* Programme + Plan */}
              <div className="bg-white border border-[#E8E4DC] overflow-hidden">
                <div className="px-5 py-3 bg-[#F7F5F1] border-b border-[#E8E4DC]">
                  <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#888]">Programme & Plan</p>
                </div>
                {[
                  ["Programme",         progLabel],
                  ["Menu availability", `${progInfo.menuWeeks} weekly menus`],
                  ["Meal Plan",         mealPlan],
                  ["Meals",             mealCountLabel],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center px-5 py-3.5 border-b border-[#F0EDE8] last:border-b-0">
                    <span className="text-[13px] text-[#666]">{k}</span>
                    <span className="text-[13px] font-semibold text-[#1A1A1A]">{v}</span>
                  </div>
                ))}
              </div>

              {/* Dates (fixed only) */}
              {progInfo.days && (
                <div className="bg-white border border-[#E8E4DC] overflow-hidden">
                  <div className="px-5 py-3 bg-[#F7F5F1] border-b border-[#E8E4DC]">
                    <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#888]">Programme Period</p>
                  </div>
                  {[
                    ["Duration",    `${progInfo.days} days`],
                    ["Start Date",  fmtDate(startDate)],
                    ["End Date",    endDate ? fmtDate(endDate) : "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center px-5 py-3.5 border-b border-[#F0EDE8] last:border-b-0">
                      <span className="text-[13px] text-[#666]">{k}</span>
                      <span className="text-[13px] font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing */}
              <div className="bg-white border border-[#E8E4DC] overflow-hidden">
                <div className="px-5 py-3 bg-[#F7F5F1] border-b border-[#E8E4DC]">
                  <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#888]">Cost Breakdown</p>
                </div>
                {[
                  [progInfo.days ? `${progInfo.days}-day programme` : progInfo.label, `RM ${basePrice.toFixed(2)}`],
                  ["Delivery", "Free"],
                  ["Subtotal", `RM ${basePrice.toFixed(2)}`],
                  ["GST (6%)", `RM ${gst.toFixed(2)}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center px-5 py-3.5 border-b border-[#F0EDE8]">
                    <span className="text-[13px] text-[#666]">{k}</span>
                    <span className="text-[13px] text-[#1A1A1A]">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center px-5 py-4 bg-[#1A1A1A]">
                  <span className="text-white font-bold text-[15px]">Total</span>
                  <span className="text-[#F5B300] font-extrabold text-[22px]">RM {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white border border-[#E8E4DC] px-5 py-4">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#888] mb-3">Payment Method</p>
                <div className="border border-[#E85D04] bg-[#FFF9F5] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 bg-[#1A1A1A] flex items-center justify-center shrink-0">
                      <svg width="20" height="13" viewBox="0 0 30 20" fill="none">
                        <rect width="30" height="20" fill="#333"/>
                        <rect x="2" y="7" width="26" height="3" fill="#666"/>
                        <rect x="2" y="13" width="8" height="2" rx="0.5" fill="#999"/>
                      </svg>
                    </div>
                    <span className="text-[14px] font-semibold">Credit / Debit Card</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
              </div>

              <button
                onClick={() => onCheckoutComplete({ name: details.name, phone: details.phone, line1: details.street, unit: "", postal: details.postcode })}
                className="w-full bg-[#E85D04] text-white py-4 font-bold text-[15px] tracking-wide hover:bg-[#1A1A1A] transition-colors active:scale-[0.99] flex items-center justify-center gap-2">
                Place Order · RM {total.toFixed(2)}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <p className="text-center text-[12px] text-[#aaa]">No lock-in · cancel anytime from your account</p>
            </div>
          )}
        </div>

        {/* ── YOUR ORDER — live receipt ── */}
        <div className="lg:w-[272px] xl:w-[290px] shrink-0">
          <div className="sticky top-[72px]">
            <div className="bg-[#1A1A1A] text-white overflow-hidden">
              {/* Receipt header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="1"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#666]">Your Order</span>
                <div className="ml-auto text-[10px] font-bold text-[#E85D04]">{completionPct}% done</div>
              </div>

              {/* Gamification bar */}
              <div className="px-5 py-3 border-b border-white/10">
                <div className="flex justify-between text-[9px] text-[#555] mb-1.5">
                  {[20, 40, 60, 80, 100].map((m) => (
                    <span key={m} className={completionPct >= m ? "text-[#E85D04] font-bold" : ""}>{m}%</span>
                  ))}
                </div>
                <div className="h-1 bg-white/10 relative overflow-hidden">
                  <div className="h-full bg-[#F5B300] transition-all duration-700 ease-out" style={{ width: `${completionPct}%` }} />
                </div>
              </div>

              {/* Order details */}
              <div className="px-5 py-4 space-y-3 text-[12px]">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Step {step} of 5</p>
                  <p className="font-semibold text-[13px]">{STEP_LABELS[step - 1]}</p>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">
                    {progInfo.kind === "recurring" ? "Subscription" : "Programme"}
                  </p>
                  <p className="font-semibold">{progLabel}</p>
                </div>

                {progInfo.days && (
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Period</p>
                    <p className="font-semibold">{progInfo.days} days</p>
                  </div>
                )}

                <div className="border-t border-white/10 pt-3">
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Menu Availability</p>
                  <p className="font-semibold">{progInfo.menuWeeks} weekly menus</p>
                </div>

                {step >= 2 && (
                  <>
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Meal Plan</p>
                      <p className="font-semibold">{mealPlan}</p>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Meals</p>
                      <p className="font-semibold">{mealCountLabel}</p>
                    </div>
                  </>
                )}

                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/>
                      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555]">Delivery</p>
                  </div>
                  <p className="font-semibold text-[11px]">SUN, TUE & THU · 5:00–8:00 PM</p>
                </div>
              </div>

              {/* Price footer */}
              <div className="px-5 py-4 bg-[#111] flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555]">Total incl. GST</p>
                  <p className="text-[20px] font-extrabold text-[#F5B300]">RM {total.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-[#555]">Free delivery</p>
                  <p className="text-[9px] text-[#555]">Cancel anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
