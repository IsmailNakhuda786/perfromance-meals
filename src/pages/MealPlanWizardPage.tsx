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

const PROGRAMME_DETAILS: Record<ProgrammeType, {
  label: string; description: string; kind: "recurring" | "fixed"; days?: number; menuWeeks: number;
}> = {
  "bi-weekly":  { label: "Bi-weekly",  description: "Delivery every 2 weeks",                                  kind: "recurring", menuWeeks: 2 },
  "monthly":    { label: "Monthly",    description: "One delivery per month",                                   kind: "recurring", menuWeeks: 4 },
  "6by60":      { label: "6by60",      description: "60-day programme · Fresh structure for your goal",         kind: "fixed", days: 60, menuWeeks: 4 },
  "buddy-plan": { label: "Buddy Plan", description: "20-day programme · Consistent meals for your week",       kind: "fixed", days: 20, menuWeeks: 4 },
  "hyrox":      { label: "HYROX",      description: "20-day programme · Structured fuel around your sessions", kind: "fixed", days: 20, menuWeeks: 4 },
};

const MEAL_PLANS: { id: MealPlanType; kcal: string }[] = [
  { id: "Low Carb Regular", kcal: "~400–450 kcal per meal" },
  { id: "Low Carb Petite",  kcal: "~300–350 kcal per meal" },
  { id: "Balance Regular",  kcal: "~500–550 kcal per meal" },
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

// ── Pre-set weekly menu pool ──────────────────────────────────────────────────
// Each week has exactly 4 meals pre-set by the kitchen: 2 for the lunch slot
// and 2 for the dinner slot. Customers pick 1 from each pool per day —
// the pool is shared across every day in that week.
const WEEK_MENUS: Array<{ lunch: number[]; dinner: number[] }> = [
  { lunch: [1, 7],   dinner: [4, 9]   }, // Week 1 pool
  { lunch: [2, 5],   dinner: [6, 10]  }, // Week 2 pool
  { lunch: [3, 8],   dinner: [1, 5]   }, // Week 3 pool
  { lunch: [7, 9],   dinner: [2, 6]   }, // Week 4 pool
];

function getMeal(id: number) {
  return MEALS.find((m) => m.id === id) ?? MEALS[0];
}

// Gamification milestones: % of wizard → label + reward hint
const MILESTONES = [
  { at: 20,  hint: "Complete Step 2 to unlock your personal menu" },
  { at: 40,  hint: "Choose your weekly menu for a 5% early-bird discount" },
  { at: 60,  hint: "Add your details — almost there!" },
  { at: 80,  hint: "Final review before your plan goes live" },
  { at: 100, hint: "🎉 Plan complete — your meals are on their way!" },
];

function getNextMilestone(pct: number) {
  return MILESTONES.find((m) => m.at > pct) ?? MILESTONES[MILESTONES.length - 1];
}

type MenuSelections = Record<number, Record<string, { lunch: number | null; dinner: number | null }>>;

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selected ? "border-[#E85D04] bg-[#E85D04]" : "border-[#D0CCC4]"}`}>
      {selected && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
    </div>
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

  // Overall wizard completion % — used for the progress bar
  const completionPct = useMemo(() => {
    let pct = (step - 1) * 20; // each completed step = 20%
    // Within step 3 (menu), add partial credit proportional to meals selected
    if (step === 3) pct += Math.round((filledSlots / totalSlots) * 20);
    return Math.min(pct, 100);
  }, [step, filledSlots, totalSlots]);

  const nextMilestone = getNextMilestone(completionPct);
  const milestoneTarget = nextMilestone.at;
  const pctToNext = milestoneTarget - completionPct;

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

  const canProceedStep4 = !!(details.name && details.phone && details.email && details.street);

  const progLabel = (progInfo.kind === "fixed" && progInfo.days)
    ? `${progInfo.label} · ${progInfo.days} days`
    : progInfo.label;
  const mealCountLabel = mealCount === "lunch-only" ? "Lunch Only · 1/day" : "Lunch & Dinner · 2/day";

  const goBack = () => {
    if (step === 1) navigate("meal-plan-landing");
    else setStep((s) => (s - 1) as Step);
  };

  // Weekly pre-set meal pool for current week tab
  const weekPool = WEEK_MENUS[selectedWeek] ?? WEEK_MENUS[0];
  const lunchOptions = weekPool.lunch.map(getMeal);
  const dinnerOptions = weekPool.dinner.map(getMeal);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">

      {/* ── Header with step progress ── */}
      <div className="bg-white border-b border-[#E8E4DC] sticky top-0 z-20">
        <div className="px-4 sm:px-8 flex items-stretch">
          <button onClick={() => navigate("meal-plan-landing")} className="shrink-0 flex items-center pr-6 border-r border-[#E8E4DC] my-3">
            <MealPlanLogo size="sm" variant="light" />
          </button>
          {/* Step tabs — desktop */}
          <div className="flex-1 hidden sm:grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
            {STEP_LABELS.map((label, i) => {
              const s = (i + 1) as Step;
              const done = s < step;
              const active = s === step;
              return (
                <div key={label}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${active ? "border-[#E85D04] bg-[#FFF9F5]" : done ? "border-[#E85D04]" : "border-transparent"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${active || done ? "bg-[#E85D04] text-white" : "border border-[#D0CCC4] text-[#999]"}`}>
                    {done ? "✓" : s}
                  </div>
                  <span className={`text-[12px] font-medium ${active ? "text-[#E85D04]" : done ? "text-[#555]" : "text-[#999]"}`}>{label}</span>
                </div>
              );
            })}
          </div>
          {/* Mobile step indicator */}
          <div className="sm:hidden flex items-center ml-4 text-[13px] font-semibold">
            {step}/{STEP_LABELS.length} · {STEP_LABELS[step - 1]}
          </div>
        </div>
      </div>

      {/* ── Gamification Progress Bar ── */}
      <div className="bg-[#1A1A1A] px-4 sm:px-8 py-3">
        <div className="max-w-[1160px] mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#F5B300]">
                {completionPct === 100 ? "Complete!" : `${completionPct}% done`}
              </div>
              {completionPct < 100 && (
                <div className="text-[11px] text-white/40">
                  — {pctToNext}% to: <span className="text-white/70">{nextMilestone.hint}</span>
                </div>
              )}
              {completionPct === 100 && (
                <div className="text-[11px] text-white/60">{nextMilestone.hint}</div>
              )}
            </div>
            <div className="text-[11px] text-white/40 shrink-0 hidden sm:block">
              RM {basePrice.toFixed(0)} · incl. GST RM {gst.toFixed(2)}
            </div>
          </div>

          {/* Track */}
          <div className="relative h-2 bg-white/10 overflow-hidden">
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 bg-[#F5B300] transition-all duration-700"
              style={{ width: `${completionPct}%` }}
            />
            {/* Milestone tick marks */}
            {MILESTONES.map((m) => (
              <div
                key={m.at}
                className={`absolute top-0 bottom-0 w-0.5 transition-colors duration-500 ${completionPct >= m.at ? "bg-[#E85D04]" : "bg-white/20"}`}
                style={{ left: `${m.at}%` }}
              />
            ))}
          </div>

          {/* Milestone labels */}
          <div className="relative h-4 mt-1">
            {MILESTONES.map((m) => (
              <div
                key={m.at}
                className={`absolute text-[9px] font-bold transition-colors duration-500 ${completionPct >= m.at ? "text-[#F5B300]" : "text-white/20"}`}
                style={{ left: `${m.at}%`, transform: "translateX(-50%)" }}
              >
                {m.at}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Page title ── */}
      <div className="border-b border-[#E8E4DC] px-4 sm:px-8 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Build your Meal Plan.</h1>
        <p className="text-[#888] mt-1 text-[14px]">Choose your order preferences, then confirm delivery details and payment.</p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 min-w-0">

          {/* ════ Step 1: Type ════ */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#E85D04] text-white flex items-center justify-center font-bold text-sm shrink-0">01</div>
                <h2 className="text-2xl font-bold">Choose your order</h2>
              </div>
              <p className="text-[#666] text-[14px] mb-8 ml-11">Select a recurring subscription or a fixed-period programme.</p>

              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">Recurring Subscription</p>
              <div className="flex flex-col gap-3 mb-6">
                {(["bi-weekly", "monthly"] as ProgrammeType[]).map((type) => {
                  const info = PROGRAMME_DETAILS[type];
                  const selected = programme === type;
                  return (
                    <button key={type} onClick={() => setProgramme(type)}
                      className={`w-full text-left border px-5 py-4 flex items-center justify-between transition-all ${selected ? "border-[#E85D04] bg-[#FFF9F5]" : "border-[#E8E4DC] hover:border-[#aaa]"}`}>
                      <div>
                        <div className="flex items-center gap-2 font-semibold text-[15px]">
                          {info.label}
                          {type === "bi-weekly" && (
                            <span className="bg-[#E85D04] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5">POPULAR</span>
                          )}
                        </div>
                        <div className="text-[13px] text-[#888] mt-0.5">{info.description}</div>
                      </div>
                      <RadioCircle selected={selected} />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[#E8E4DC]" />
                <span className="text-[12px] text-[#888] font-medium">OR</span>
                <div className="flex-1 h-px bg-[#E8E4DC]" />
              </div>

              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">Fixed-Period Programme</p>
              <div className="flex flex-col gap-3 mb-8">
                {(["6by60", "buddy-plan", "hyrox"] as ProgrammeType[]).map((type) => {
                  const info = PROGRAMME_DETAILS[type];
                  const selected = programme === type;
                  return (
                    <button key={type} onClick={() => setProgramme(type)}
                      className={`w-full text-left border px-5 py-4 flex items-center justify-between transition-all ${selected ? "border-[#E85D04] bg-[#FFF9F5]" : "border-[#E8E4DC] hover:border-[#aaa]"}`}>
                      <div>
                        <div className="font-semibold text-[15px]">{info.label}</div>
                        <div className="text-[13px] text-[#888] mt-0.5">{info.description}</div>
                      </div>
                      <RadioCircle selected={selected} />
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="border border-[#D0CCC4] px-6 py-3.5 text-[14px] font-semibold text-[#666] hover:border-[#111] hover:text-[#111] transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Back
                </button>
                <button onClick={() => setStep(2)}
                  className="flex-1 bg-[#E85D04] text-white py-3.5 font-semibold text-[15px] hover:bg-[#1A1A1A] transition-colors flex items-center justify-center gap-2">
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ════ Step 2: Plan & Meals ════ */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#E85D04] text-white flex items-center justify-center font-bold text-sm shrink-0">02</div>
                <h2 className="text-2xl font-bold">Meal Type & Size</h2>
              </div>
              <p className="text-[#666] text-[14px] mb-8 ml-11">Select a meal type and the number of meals you would like per day.</p>

              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">Meal Type & Size</p>
              <div className="flex flex-col gap-3 mb-8">
                {MEAL_PLANS.map((plan) => {
                  const selected = mealPlan === plan.id;
                  return (
                    <button key={plan.id} onClick={() => setMealPlan(plan.id)}
                      className={`w-full text-left border px-5 py-4 flex items-center justify-between transition-all ${selected ? "border-[#E85D04] bg-[#FFF9F5]" : "border-[#E8E4DC] hover:border-[#aaa]"}`}>
                      <div>
                        <div className="font-semibold text-[15px]">{plan.id}</div>
                        <div className="text-[13px] text-[#888] mt-0.5">{plan.kcal}</div>
                      </div>
                      <RadioCircle selected={selected} />
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">Number of Meals</p>
              <div className="flex flex-col gap-3 mb-8">
                {([
                  { id: "lunch-only"   as MealCount, label: "Lunch Only",     desc: "1 meal per day" },
                  { id: "lunch-dinner" as MealCount, label: "Lunch & Dinner", desc: "2 meals per day" },
                ]).map((opt) => {
                  const selected = mealCount === opt.id;
                  return (
                    <button key={opt.id} onClick={() => setMealCount(opt.id)}
                      className={`w-full text-left border px-5 py-4 flex items-center justify-between transition-all ${selected ? "border-[#E85D04] bg-[#FFF9F5]" : "border-[#E8E4DC] hover:border-[#aaa]"}`}>
                      <div>
                        <div className="font-semibold text-[15px]">{opt.label}</div>
                        <div className="text-[13px] text-[#888] mt-0.5">{opt.desc}</div>
                      </div>
                      <RadioCircle selected={selected} />
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="border border-[#D0CCC4] px-6 py-3.5 text-[14px] font-semibold text-[#666] hover:border-[#111] hover:text-[#111] transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Back
                </button>
                <button onClick={() => setStep(3)}
                  className="flex-1 bg-[#E85D04] text-white py-3.5 font-semibold text-[15px] hover:bg-[#1A1A1A] transition-colors flex items-center justify-center gap-2">
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ════ Step 3: Menu ════ */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#E85D04] text-white flex items-center justify-center font-bold text-sm shrink-0">03</div>
                <h2 className="text-2xl font-bold">Menu Selection</h2>
              </div>
              <p className="text-[#666] text-[14px] mb-2 ml-11">
                {WEEKS[selectedWeek].label} · {WEEKS[selectedWeek].dates} · Meals selected:{" "}
                <strong className="text-[#1A1A1A]">{filledSlots} / {totalSlots}</strong>
              </p>

              {/* Pre-set pool notice */}
              <div className="ml-11 mb-5 flex items-start gap-2 bg-[#F7F5F0] border-l-4 border-[#F5B300] px-4 py-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B300" strokeWidth="2" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  <strong className="text-[#1A1A1A]">This week&apos;s menu is pre-set by our kitchen.</strong>{" "}
                  Choose from the 2 options below for each slot — you can pick the same meal multiple days or mix it up.
                </p>
              </div>

              {/* Week tabs */}
              <div className="flex border-b border-[#E8E4DC] mb-1 overflow-x-auto">
                {WEEKS.map((w, i) => (
                  <button key={i} onClick={() => { setSelectedWeek(i); setOpenDay("Monday"); }}
                    className={`flex flex-col items-start px-4 py-3 border-b-2 -mb-px shrink-0 transition-all ${selectedWeek === i ? "border-[#E85D04] text-[#E85D04]" : "border-transparent text-[#888] hover:text-[#111]"}`}>
                    <span className="text-[13px] font-semibold">{w.label}</span>
                    <span className="text-[11px] font-normal">{w.dates}</span>
                  </button>
                ))}
              </div>

              {/* This week's pre-set pool — always visible above the accordion */}
              <div className="bg-[#FAF9F6] border border-[#E8E4DC] px-5 py-4 my-4">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">
                  {WEEKS[selectedWeek].label} Pre-Set Menu · {mealCountLabel}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {lunchOptions.map((meal) => (
                    <div key={`l-${meal.id}`} className="flex items-center gap-3 bg-white border border-[#E8E4DC] p-3">
                      <img src={meal.img} alt={meal.name} className="w-12 h-12 object-cover shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#F5B300] mb-0.5">Lunch option</div>
                        <div className="text-[12px] font-semibold leading-tight">{meal.name}</div>
                        <div className="text-[10px] text-[#888]">{meal.cal} kcal · P {meal.protein}g</div>
                      </div>
                    </div>
                  ))}
                  {mealCount === "lunch-dinner" && dinnerOptions.map((meal) => (
                    <div key={`d-${meal.id}`} className="flex items-center gap-3 bg-white border border-[#E8E4DC] p-3">
                      <img src={meal.img} alt={meal.name} className="w-12 h-12 object-cover shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#E85D04] mb-0.5">Dinner option</div>
                        <div className="text-[12px] font-semibold leading-tight">{meal.name}</div>
                        <div className="text-[10px] text-[#888]">{meal.cal} kcal · P {meal.protein}g</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-day accordion */}
              <div className="border border-[#E8E4DC] mb-8 divide-y divide-[#E8E4DC]">
                {WEEKDAYS.map((day) => {
                  const isOpen = openDay === day;
                  const dayData = (menuSelections[selectedWeek] || {})[day] || { lunch: null, dinner: null };
                  const lunchMeal = getMealById(dayData.lunch);
                  const dinnerMeal = getMealById(dayData.dinner);
                  const dayFilled = (lunchMeal ? 1 : 0) + (mealCount === "lunch-dinner" && dinnerMeal ? 1 : 0);
                  const dayDone = dayFilled === slotsPerDay;

                  return (
                    <div key={day}>
                      <button
                        onClick={() => setOpenDay(isOpen ? null : day)}
                        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FAFAF8] transition-colors text-left">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-semibold text-[16px] shrink-0">{day}</span>
                          {isOpen && <span className="text-[12px] text-[#888] italic">Editing</span>}
                          {!isOpen && dayDone && (
                            <span className="text-[12px] text-[#E85D04] font-medium flex items-center gap-1">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
                              Done
                            </span>
                          )}
                          {!isOpen && !dayDone && <span className="text-[12px] text-[#888]">Tap to edit</span>}
                          {/* Mini preview of selected meals */}
                          {!isOpen && (lunchMeal || dinnerMeal) && (
                            <div className="hidden sm:flex items-center gap-1.5 ml-2 min-w-0">
                              {lunchMeal && (
                                <span className="text-[11px] text-[#555] truncate max-w-[140px]">
                                  L: {lunchMeal.name}
                                </span>
                              )}
                              {dinnerMeal && (
                                <span className="text-[11px] text-[#555] truncate max-w-[140px]">
                                  · D: {dinnerMeal.name}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className={`transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-3 bg-[#FAFAF8]">

                          {/* Lunch slot */}
                          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">Lunch — choose 1</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            {lunchOptions.map((meal) => {
                              const selected = dayData.lunch === meal.id;
                              return (
                                <button key={meal.id} onClick={() => selectMeal(day, "lunch", meal.id)}
                                  className={`flex items-center gap-3 p-3 border text-left transition-all ${selected ? "border-[#E85D04] bg-white" : "border-[#E8E4DC] bg-white hover:border-[#bbb]"}`}>
                                  <img src={meal.img} alt={meal.name} className="w-14 h-14 object-cover shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-[13px] leading-tight">{meal.name}</div>
                                    <div className="text-[11px] text-[#888] mt-1">{meal.cal} kcal</div>
                                    <div className="text-[11px] text-[#888]">P {meal.protein}g &nbsp;C {meal.carbs}g</div>
                                  </div>
                                  <RadioCircle selected={selected} />
                                </button>
                              );
                            })}
                          </div>

                          {/* Dinner slot */}
                          {mealCount === "lunch-dinner" && (
                            <>
                              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">Dinner — choose 1</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {dinnerOptions.map((meal) => {
                                  const selected = dayData.dinner === meal.id;
                                  return (
                                    <button key={meal.id} onClick={() => selectMeal(day, "dinner", meal.id)}
                                      className={`flex items-center gap-3 p-3 border text-left transition-all ${selected ? "border-[#E85D04] bg-white" : "border-[#E8E4DC] bg-white hover:border-[#bbb]"}`}>
                                      <img src={meal.img} alt={meal.name} className="w-14 h-14 object-cover shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-[13px] leading-tight">{meal.name}</div>
                                        <div className="text-[11px] text-[#888] mt-1">{meal.cal} kcal</div>
                                        <div className="text-[11px] text-[#888]">P {meal.protein}g &nbsp;C {meal.carbs}g</div>
                                      </div>
                                      <RadioCircle selected={selected} />
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="border border-[#D0CCC4] px-6 py-3.5 text-[14px] font-semibold text-[#666] hover:border-[#111] hover:text-[#111] transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Back
                </button>
                <button onClick={() => setStep(4)}
                  className="flex-1 bg-[#E85D04] text-white py-3.5 font-semibold text-[15px] hover:bg-[#1A1A1A] transition-colors flex items-center justify-center gap-2">
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ════ Step 4: Your Details ════ */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#E85D04] text-white flex items-center justify-center font-bold text-sm shrink-0">04</div>
                <h2 className="text-2xl font-bold">Your Details</h2>
              </div>
              <p className="text-[#666] text-[14px] mb-8 ml-11">Enter your details and delivery address.</p>

              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">Personal Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[12px] text-[#666] mb-1">Full Name</label>
                  <input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    placeholder="Alex Johnson"
                    className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#111]" />
                </div>
                <div>
                  <label className="block text-[12px] text-[#666] mb-1">Phone Number</label>
                  <input value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    placeholder="+60 12-345 6789"
                    className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#111]" />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-[12px] text-[#666] mb-1">Email</label>
                <input value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })}
                  type="email" placeholder="alex@email.com"
                  className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#111]" />
              </div>

              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">Delivery Address</p>
              <div className="border-l-4 border-[#E85D04] bg-[#FFF9F5] px-4 py-3 mb-4 flex items-center gap-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <div className="text-[13px]">
                  <span className="font-semibold text-[#1A1A1A]">Delivery:</span>
                  <span className="text-[#666] ml-1">Sun, Tue & Thu · 5:00 – 8:00 pm</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-4 h-4 bg-[#E85D04] flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <span className="text-[13px] text-[#666]">Same as personal details address</span>
              </div>
              <div className="flex flex-col gap-3 mb-8">
                <div>
                  <label className="block text-[12px] text-[#666] mb-1">Street Address</label>
                  <input value={details.street} onChange={(e) => setDetails({ ...details, street: e.target.value })}
                    placeholder="123 Jalan Ampang"
                    className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#111]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] text-[#666] mb-1">City</label>
                    <input value={details.city} onChange={(e) => setDetails({ ...details, city: e.target.value })}
                      placeholder="Kuala Lumpur"
                      className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#111]" />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#666] mb-1">Postcode</label>
                    <input value={details.postcode} onChange={(e) => setDetails({ ...details, postcode: e.target.value })}
                      placeholder="50450"
                      className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#111]" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] text-[#666] mb-1">Delivery Notes (optional)</label>
                  <textarea value={details.notes} onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                    placeholder="Leave at door, call on arrival..."
                    rows={3}
                    className="w-full border border-[#D0CCC4] bg-white text-[#1A1A1A] px-4 py-3 text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#111] resize-none" />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="border border-[#D0CCC4] px-6 py-3.5 text-[14px] font-semibold text-[#666] hover:border-[#111] hover:text-[#111] transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Back
                </button>
                <button onClick={() => { if (canProceedStep4) setStep(5); }} disabled={!canProceedStep4}
                  className={`flex-1 py-3.5 font-semibold text-[15px] transition-colors flex items-center justify-center gap-2 ${canProceedStep4 ? "bg-[#E85D04] text-white hover:bg-[#1A1A1A]" : "bg-[#E5E2DA] text-[#aaa] cursor-not-allowed"}`}>
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ════ Step 5: Review ════ */}
          {step === 5 && (
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#E85D04] text-white flex items-center justify-center font-bold text-sm shrink-0">05</div>
                <h2 className="text-2xl font-bold">Order Summary</h2>
              </div>
              <p className="text-[#666] text-[14px] mb-8 ml-11">Review your programme, meal plan and payment details.</p>

              {/* Programme summary */}
              <div className="border border-[#E8E4DC] mb-4">
                {[
                  ["Programme",         progLabel],
                  ["Menu availability", `${progInfo.menuWeeks} weekly menus`],
                  ["Meal Plan",         mealPlan],
                  ["Meals",             mealCountLabel],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between px-5 py-3.5 border-b border-[#E8E4DC] last:border-b-0">
                    <span className="text-[14px] text-[#666]">{k}</span>
                    <span className="text-[14px] font-semibold text-[#1A1A1A] text-right">{v}</span>
                  </div>
                ))}
              </div>

              {/* Period (fixed programmes) */}
              {progInfo.days && (
                <div className="border border-[#E8E4DC] mb-4">
                  {[
                    ["Programme Period", `${progInfo.days} days`],
                    ["Start Date",       fmtDate(startDate)],
                    ["End Date",         endDate ? fmtDate(endDate) : "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between px-5 py-3.5 border-b border-[#E8E4DC] last:border-b-0">
                      <span className="text-[14px] text-[#666]">{k}</span>
                      <span className="text-[14px] font-semibold text-[#1A1A1A]">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing */}
              <div className="border border-[#E8E4DC] mb-4">
                <div className="flex justify-between px-5 py-3.5 border-b border-[#E8E4DC]">
                  <span className="text-[14px] text-[#666]">{progInfo.days ? `${progInfo.days} days programme` : progInfo.label}</span>
                  <span className="text-[14px] text-[#1A1A1A]">RM {basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-5 py-3.5 border-b border-[#E8E4DC]">
                  <span className="text-[14px] text-[#666]">Delivery</span>
                  <span className="text-[14px] text-[#1A1A1A]">Free</span>
                </div>
                <div className="flex justify-between px-5 py-3.5 border-b border-[#E8E4DC]">
                  <span className="text-[14px] text-[#666]">Subtotal</span>
                  <span className="text-[14px] text-[#1A1A1A]">RM {basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-5 py-3.5 border-b border-[#E8E4DC]">
                  <span className="text-[14px] text-[#666]">GST (6%)</span>
                  <span className="text-[14px] text-[#1A1A1A]">RM {gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-5 py-4">
                  <span className="text-[15px] font-semibold">Total</span>
                  <span className="text-[20px] font-bold text-[#E85D04]">RM {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment method */}
              <div className="border border-[#E8E4DC] px-5 pt-4 pb-5 mb-8">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888] mb-3">Payment Method</p>
                <div className="border border-[#E85D04] bg-[#FFF9F5] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-6 bg-[#1A1A1A] flex items-center justify-center">
                      <svg width="18" height="12" viewBox="0 0 30 20" fill="none">
                        <rect width="30" height="20" fill="#222"/>
                        <rect x="2" y="7" width="26" height="3" fill="#666"/>
                        <rect x="2" y="13" width="8" height="2" rx="0.5" fill="#999"/>
                      </svg>
                    </div>
                    <span className="text-[14px] font-medium">Card</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="border border-[#D0CCC4] px-6 py-3.5 text-[14px] font-semibold text-[#666] hover:border-[#111] hover:text-[#111] transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Back
                </button>
                <button
                  onClick={() => onCheckoutComplete({ name: details.name, phone: details.phone, line1: details.street, unit: "", postal: details.postcode })}
                  className="flex-1 bg-[#E85D04] text-white py-3.5 font-semibold text-[15px] hover:bg-[#1A1A1A] transition-colors flex items-center justify-center gap-2">
                  Place Order
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ── YOUR ORDER Sidebar ── */}
        <div className="lg:w-[280px] xl:w-[300px] shrink-0">
          <div className="bg-[#1A1A1A] text-white p-6 sticky top-[120px]">
            <div className="flex items-center gap-2 mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="1"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666]">Your Order</span>
            </div>

            <div className="space-y-4 text-[13px]">
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Step {step} of 5</p>
                <p className="font-semibold">{STEP_LABELS[step - 1]}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">
                  {progInfo.kind === "recurring" ? "Subscription" : "Programme"}
                </p>
                <p className="font-semibold">{progLabel}</p>
              </div>

              {progInfo.days && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Programme Period</p>
                  <p className="font-semibold">{progInfo.days} days</p>
                </div>
              )}

              <div className="border-t border-white/10 pt-4">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Menu Availability</p>
                <p className="font-semibold">{progInfo.menuWeeks} weekly menus</p>
              </div>

              {step >= 2 && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Meal Plan</p>
                  <p className="font-semibold">{mealPlan}</p>
                </div>
              )}

              {step >= 2 && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555] mb-0.5">Meals</p>
                  <p className="font-semibold">{mealCountLabel}</p>
                </div>
              )}

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#555]">Delivery</p>
                </div>
                <p className="font-semibold text-[12px]">SUN, TUE & THU · 5:00–8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
