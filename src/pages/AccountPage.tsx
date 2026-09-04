import { useState } from "react";
import { MEALS, Page, PLANS } from "@/data";

interface Props {
  navigate: (page: Page) => void;
}

type Tab = "dashboard" | "subscription" | "orders" | "wallet" | "settings";

const ORDERS = [
  { id: "FRE-20250901-7721", date: "1 Sep 2025", items: "Herb Chicken ×2, Teriyaki ×1", total: 36.70, status: "Delivered", type: "ready" },
  { id: "FRE-20250825-7698", date: "25 Aug 2025", items: "Meal Plan — Maintain (Week 12)", total: 178.00, status: "Delivered", type: "plan" },
  { id: "FRE-20250818-7641", date: "18 Aug 2025", items: "Build-A-Box ×10", total: 119.00, status: "Delivered", type: "box" },
  { id: "FRE-20250811-7588", date: "11 Aug 2025", items: "Meal Plan — Maintain (Week 11)", total: 178.00, status: "Delivered", type: "plan" },
  { id: "FRE-20250804-7522", date: "4 Aug 2025", items: "Low Carb Bundle, Salmon ×2", total: 83.60, status: "Delivered", type: "ready" },
];

const WALLET_HISTORY = [
  { date: "1 Sep 2025", desc: "Purchase — #FRE-20250901-7721", pts: +36, type: "earn" },
  { date: "25 Aug 2025", desc: "Meal Plan bonus (2× pts)", pts: +356, type: "earn" },
  { date: "20 Aug 2025", desc: "Redeemed 500 pts", pts: -500, type: "redeem" },
  { date: "18 Aug 2025", desc: "Build-A-Box — #FRE-20250818-7641", pts: +119, type: "earn" },
];

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_SLOTS = ["6:00am – 9:00am", "9:00am – 12:00pm", "12:00pm – 3:00pm", "3:00pm – 6:00pm"];

// Current week's meal schedule — each delivery day has N meal slots
const INITIAL_SCHEDULE: Record<string, number[]> = {
  Mon: [1, 4],
  Wed: [9, 7],
  Fri: [5, 2],
  Sat: [3],
};

export default function AccountPage({ navigate }: Props) {
  const [tab, setTab] = useState<Tab>("dashboard");

  // Subscription state — all editable
  const [subPaused, setSubPaused] = useState(false);
  const [pauseWeeks, setPauseWeeks] = useState(1);
  const [showPauseModal, setShowPauseModal] = useState(false);

  const [activePlan, setActivePlan] = useState("MAINTAIN");
  const [mealsPerDay, setMealsPerDay] = useState(4);
  const [deliveryDays, setDeliveryDays] = useState<string[]>(["Mon", "Wed", "Fri", "Sat"]);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [billing, setBilling] = useState<"week" | "month">("week");

  // Meal swap state
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [swapTarget, setSwapTarget] = useState<{ day: string; slotIdx: number } | null>(null);
  const [savedMsg, setSavedMsg] = useState("");

  // Edit mode flags per section
  const [editingDays, setEditingDays] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [editingQty, setEditingQty] = useState(false);
  const [editingPlan, setEditingPlan] = useState(false);

  const plan = PLANS.find((p) => p.name === activePlan) || PLANS[1];

  const toggleDay = (day: string) => {
    setDeliveryDays((prev) =>
      prev.includes(day) ? (prev.length > 1 ? prev.filter((d) => d !== day) : prev) : [...prev, day].sort((a, b) => ALL_DAYS.indexOf(a) - ALL_DAYS.indexOf(b))
    );
  };

  const swapMeal = (mealId: number) => {
    if (!swapTarget) return;
    setSchedule((prev) => {
      const daySlots = [...(prev[swapTarget.day] || [])];
      daySlots[swapTarget.slotIdx] = mealId;
      return { ...prev, [swapTarget.day]: daySlots };
    });
    setSwapTarget(null);
  };

  const save = (msg: string) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(""), 2500);
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "subscription", label: "My Plan" },
    { key: "orders", label: "Order History" },
    { key: "wallet", label: "Wallet & Rewards" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Account header */}
      <div className="bg-[#111111] text-white py-8 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#CDFF3A] rounded-full flex items-center justify-center text-[#111111] font-display text-[22px] font-bold shrink-0">J</div>
            <div>
              <h1 className="font-display text-[24px] font-bold">Jerome Tan</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[#CDFF3A] text-[11px] font-mono tracking-wider">VIP Member</span>
                <span className="text-white/30">·</span>
                <span className="text-white/40 text-[12px]">Member since Jun 2024</span>
              </div>
            </div>
          </div>
          <div className="flex gap-6 text-center">
            {[
              { val: "1,234", label: "Points" },
              { val: "$12.50", label: "Wallet" },
              { val: `Week 13`, label: "Plan" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-[22px] font-bold text-[#CDFF3A]">{s.val}</div>
                <div className="text-white/35 text-[11px] uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#E5E2DA] sticky top-[60px] z-30">
        <div className="max-w-[1200px] mx-auto px-6 flex gap-0 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-6 py-4 text-[12px] tracking-wider uppercase font-medium whitespace-nowrap border-b-2 transition-colors ${tab === t.key ? "border-[#111111] text-[#111111]" : "border-transparent text-[#999] hover:text-[#111]"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Save toast */}
      {savedMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-[#CDFF3A] text-[#111111] px-6 py-3 text-[13px] font-bold tracking-wider shadow-xl">
          ✓ {savedMsg}
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-6 py-10">

        {/* ══ DASHBOARD ══ */}
        {tab === "dashboard" && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-8">Welcome back, Jerome.</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Active Plan", val: activePlan, sub: `${plan.cal} kcal/day`, color: "#F2C94C", bg: "#0D2818" },
                { label: "Next Delivery", val: "Tomorrow", sub: `${timeSlot.split("–")[0].trim()}`, color: "#CDFF3A", bg: "#111111" },
                { label: "Wallet Balance", val: "$12.50", sub: "1,234 reward pts", color: "#7EE8B0", bg: "#111111" },
                { label: "Orders This Month", val: "3", sub: "$373.70 spent", color: "#A78BFA", bg: "#111111" },
              ].map((s) => (
                <div key={s.label} className="p-5 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: s.bg }}
                  onClick={() => { if (s.label === "Active Plan") setTab("subscription"); if (s.label === "Wallet Balance") setTab("wallet"); if (s.label === "Orders This Month") setTab("orders"); }}>
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: `${s.color}80` }}>{s.label}</div>
                  <div className="font-display text-[26px] font-bold" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-white/30 text-[12px] mt-1">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Active sub card */}
            <div className={`border mb-6 ${subPaused ? "border-amber-300 bg-amber-50" : "border-[#0D2818]/20 bg-[#0D2818]"}`}>
              <div className="p-6 flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-2 ${subPaused ? "text-amber-600" : "text-[#F2C94C]"}`}>
                    {subPaused ? "⏸ Subscription Paused" : "● Active Subscription"}
                  </div>
                  <h3 className={`font-display text-[24px] font-bold ${subPaused ? "text-[#333]" : "text-white"}`}>
                    {activePlan} Plan · {mealsPerDay} meals/day
                  </h3>
                  <div className={`text-[13px] mt-1 ${subPaused ? "text-amber-700" : "text-white/40"}`}>
                    {subPaused ? `Paused · Resumes 15 Sep 2025` : `${billing === "week" ? "Weekly" : "Monthly"} · ${deliveryDays.join(", ")} · ${timeSlot}`}
                  </div>
                </div>
                <div className="flex gap-3">
                  {subPaused ? (
                    <button onClick={() => setSubPaused(false)} className="bg-[#F2C94C] text-[#111] px-5 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#111] hover:text-[#F2C94C] transition-colors">
                      Resume Plan
                    </button>
                  ) : (
                    <>
                      <button onClick={() => setShowPauseModal(true)} className="border border-white/20 text-white/60 px-5 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:border-[#F2C94C] hover:text-[#F2C94C] transition-colors">
                        Pause
                      </button>
                      <button onClick={() => setTab("subscription")} className="bg-[#F2C94C] text-[#111] px-5 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-white transition-colors">
                        Manage Plan →
                      </button>
                    </>
                  )}
                </div>
              </div>
              {/* Customize shortcuts */}
              {!subPaused && (
                <div className="border-t border-white/10 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: "🔄", label: "Swap meals", desc: "Change upcoming meals" },
                    { icon: "📅", label: "Delivery days", desc: "Mon, Wed, Fri, Sat" },
                    { icon: "🕐", label: "Time slot", desc: timeSlot.split("–")[0].trim() },
                    { icon: "⚖️", label: "Plan type", desc: `${activePlan} · ${plan.cal} kcal` },
                  ].map((item) => (
                    <button key={item.label} onClick={() => setTab("subscription")}
                      className="text-left p-3 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="text-[16px] mb-1">{item.icon}</div>
                      <div className="text-white text-[12px] font-medium">{item.label}</div>
                      <div className="text-white/35 text-[11px] mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Recent orders */}
            <div className="bg-white border border-[#E5E2DA] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-[18px] font-bold">Recent Orders</h3>
                <button onClick={() => setTab("orders")} className="text-[12px] uppercase tracking-wider text-[#888] hover:text-[#111] transition-colors">View All →</button>
              </div>
              <div className="space-y-0">
                {ORDERS.slice(0, 3).map((o) => (
                  <div key={o.id} className="flex items-center justify-between gap-4 py-3.5 border-t border-[#F0EDE8] first:border-0">
                    <div>
                      <div className="text-[13px] font-medium">{o.items}</div>
                      <div className="text-[#999] text-[11px] mt-0.5">{o.id} · {o.date}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[14px]">${o.total.toFixed(2)}</div>
                      <div className="text-[11px] text-green-600 font-medium">{o.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ MY PLAN / SUBSCRIPTION ══ */}
        {tab === "subscription" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[28px] font-bold">My Plan</h2>
              {subPaused ? (
                <button onClick={() => setSubPaused(false)} className="bg-[#F2C94C] text-[#111] px-5 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#111] hover:text-[#F2C94C] transition-colors">
                  Resume Subscription
                </button>
              ) : (
                <button onClick={() => setShowPauseModal(true)} className="border border-[#D0CCC4] px-5 py-2.5 text-[12px] font-medium text-[#666] hover:border-[#111] hover:text-[#111] transition-colors">
                  ⏸ Pause Plan
                </button>
              )}
            </div>

            {subPaused && (
              <div className="bg-amber-50 border border-amber-200 p-4 flex items-center gap-3">
                <span className="text-[20px]">⏸</span>
                <div>
                  <div className="font-medium text-amber-800">Plan paused for {pauseWeeks} week{pauseWeeks > 1 ? "s" : ""}</div>
                  <div className="text-amber-600 text-[13px]">No deliveries or charges until 15 Sep 2025. You can still edit your plan settings below.</div>
                </div>
              </div>
            )}

            {/* ── 1. PLAN TYPE ── */}
            <div className="bg-white border border-[#E5E2DA]">
              <div className="flex items-center justify-between p-5 border-b border-[#E5E2DA]">
                <div>
                  <h3 className="font-medium text-[15px]">Plan Type</h3>
                  <p className="text-[#888] text-[12px] mt-0.5">Your caloric target and macro split</p>
                </div>
                <button onClick={() => setEditingPlan((v) => !v)} className={`px-4 py-2 text-[12px] font-medium border transition-colors ${editingPlan ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] text-[#666] hover:border-[#111]"}`}>
                  {editingPlan ? "Done" : "Change Plan"}
                </button>
              </div>

              {!editingPlan ? (
                /* Read-only plan summary */
                <div className="p-5">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: plan.accent }}>{activePlan}</span>
                      <div className="font-display text-[32px] font-bold">{plan.cal} <span className="text-[18px] font-normal text-[#888]">kcal/day</span></div>
                    </div>
                    <div className="flex gap-4">
                      {[{ l: "Protein", v: `${plan.protein}g` }, { l: "Carbs", v: `${plan.carbs}g` }, { l: "Fat", v: `${plan.fat}g` }].map((m) => (
                        <div key={m.l} className="text-center bg-[#F7F5F0] px-5 py-3">
                          <div className="font-mono text-[14px] font-medium">{m.v}</div>
                          <div className="text-[#999] text-[10px] uppercase tracking-wider mt-0.5">{m.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Plan comparison blurb */}
                  <div className="mt-4 border-t border-[#F0EDE8] pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PLANS.map((p) => (
                      <div key={p.name} className={`p-3 border text-[13px] ${activePlan === p.name ? "border-[#111] bg-[#F7F5F0]" : "border-[#E5E2DA] text-[#888]"}`}>
                        <div className="font-mono text-[10px] tracking-[0.25em] mb-1" style={{ color: p.accent }}>{p.name} — {p.cal} kcal</div>
                        <div className="text-[12px] leading-relaxed">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Edit: pick plan */
                <div className="p-5">
                  <p className="text-[#888] text-[13px] mb-4">Changes apply from your next billing cycle.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {PLANS.map((p) => (
                      <button key={p.name} onClick={() => setActivePlan(p.name)}
                        className={`text-left p-5 border transition-all ${activePlan === p.name ? "border-[#111] bg-[#111] text-white" : "border-[#D0CCC4] hover:border-[#888]"}`}>
                        <div className="font-mono text-[10px] tracking-[0.3em] mb-1" style={{ color: activePlan === p.name ? p.accent : p.accent }}>{p.name}</div>
                        <div className={`font-display text-[28px] font-bold ${activePlan === p.name ? "text-white" : "text-[#111]"}`}>{p.cal}<span className="text-[14px] font-normal opacity-50"> kcal</span></div>
                        <div className={`text-[12px] mt-1.5 leading-relaxed ${activePlan === p.name ? "text-white/60" : "text-[#888]"}`}>{p.desc}</div>
                        <div className="flex gap-3 mt-3 text-[11px]">
                          {[{ l: "PRO", v: `${p.protein}g` }, { l: "CARB", v: `${p.carbs}g` }, { l: "FAT", v: `${p.fat}g` }].map((m) => (
                            <span key={m.l} style={{ color: activePlan === p.name ? p.accent : p.accent }}>{m.v} {m.l}</span>
                          ))}
                        </div>
                        {activePlan === p.name && <div className="mt-3 text-[#CDFF3A] text-[11px] font-bold">✓ Current selection</div>}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => { setEditingPlan(false); save("Plan updated — applies next billing cycle"); }}
                    className="bg-[#111] text-white px-6 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">
                    Confirm Plan Change
                  </button>
                </div>
              )}
            </div>

            {/* ── 2. MEALS PER DAY ── */}
            <div className="bg-white border border-[#E5E2DA]">
              <div className="flex items-center justify-between p-5 border-b border-[#E5E2DA]">
                <div>
                  <h3 className="font-medium text-[15px]">Meals Per Day</h3>
                  <p className="text-[#888] text-[12px] mt-0.5">How many meals are delivered each day</p>
                </div>
                <button onClick={() => setEditingQty((v) => !v)} className={`px-4 py-2 text-[12px] font-medium border transition-colors ${editingQty ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] text-[#666] hover:border-[#111]"}`}>
                  {editingQty ? "Done" : "Change"}
                </button>
              </div>
              <div className="p-5">
                {!editingQty ? (
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[36px] font-bold">{mealsPerDay}</span>
                    <div>
                      <div className="text-[14px] font-medium">meals per day</div>
                      <div className="text-[#888] text-[12px]">${(plan.priceWeek / 7 * deliveryDays.length).toFixed(2)} / delivery day · {plan.cal / mealsPerDay} kcal per meal avg.</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[#888] text-[13px] mb-4">More meals = smaller portions per sitting. Price adjusts accordingly.</p>
                    <div className="flex gap-3 flex-wrap">
                      {[2, 3, 4, 5, 6].map((n) => (
                        <button key={n} onClick={() => setMealsPerDay(n)}
                          className={`px-6 py-4 border text-center transition-all ${mealsPerDay === n ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] hover:border-[#888]"}`}>
                          <div className="font-display text-[24px] font-bold">{n}</div>
                          <div className={`text-[11px] mt-1 ${mealsPerDay === n ? "text-white/60" : "text-[#888]"}`}>meals/day</div>
                          <div className={`text-[11px] font-mono ${mealsPerDay === n ? "text-[#CDFF3A]" : "text-[#aaa]"}`}>{Math.round(plan.cal / n)} kcal ea.</div>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => { setEditingQty(false); save("Meals per day updated"); }}
                      className="mt-4 bg-[#111] text-white px-6 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── 3. DELIVERY DAYS ── */}
            <div className="bg-white border border-[#E5E2DA]">
              <div className="flex items-center justify-between p-5 border-b border-[#E5E2DA]">
                <div>
                  <h3 className="font-medium text-[15px]">Delivery Days</h3>
                  <p className="text-[#888] text-[12px] mt-0.5">Which days your meals are delivered</p>
                </div>
                <button onClick={() => setEditingDays((v) => !v)} className={`px-4 py-2 text-[12px] font-medium border transition-colors ${editingDays ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] text-[#666] hover:border-[#111]"}`}>
                  {editingDays ? "Done" : "Change Days"}
                </button>
              </div>
              <div className="p-5">
                {!editingDays ? (
                  <div className="flex gap-2 flex-wrap">
                    {ALL_DAYS.map((d) => (
                      <div key={d} className={`px-4 py-2.5 text-[13px] font-medium border ${deliveryDays.includes(d) ? "bg-[#111] text-white border-[#111]" : "border-[#E5E2DA] text-[#ccc]"}`}>
                        {d}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-[#888] text-[13px] mb-4">Tap to toggle. Cut-off is 10pm the night before each delivery. Changes apply from next week.</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {ALL_DAYS.map((d) => {
                        const active = deliveryDays.includes(d);
                        return (
                          <button key={d} onClick={() => toggleDay(d)}
                            className={`px-5 py-3 text-[13px] font-medium border transition-all ${active ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] text-[#666] hover:border-[#888]"}`}>
                            {d}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[#888] text-[12px] mb-4">{deliveryDays.length} day{deliveryDays.length !== 1 ? "s" : ""} selected</p>
                    <button onClick={() => { setEditingDays(false); save("Delivery days updated — applies next week"); }}
                      className="bg-[#111] text-white px-6 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">
                      Save Days
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── 4. DELIVERY TIME ── */}
            <div className="bg-white border border-[#E5E2DA]">
              <div className="flex items-center justify-between p-5 border-b border-[#E5E2DA]">
                <div>
                  <h3 className="font-medium text-[15px]">Delivery Time Slot</h3>
                  <p className="text-[#888] text-[12px] mt-0.5">When your meals arrive each delivery day</p>
                </div>
                <button onClick={() => setEditingTime((v) => !v)} className={`px-4 py-2 text-[12px] font-medium border transition-colors ${editingTime ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] text-[#666] hover:border-[#111]"}`}>
                  {editingTime ? "Done" : "Change Time"}
                </button>
              </div>
              <div className="p-5">
                {!editingTime ? (
                  <div className="flex items-center gap-3">
                    <span className="text-[24px]">🕐</span>
                    <div>
                      <div className="font-medium text-[16px]">{timeSlot}</div>
                      <div className="text-[#888] text-[12px]">Applies to all delivery days</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[#888] text-[13px] mb-4">Same time slot applies across all delivery days. Changes apply from next delivery.</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {TIME_SLOTS.map((s) => (
                        <button key={s} onClick={() => setTimeSlot(s)}
                          className={`py-4 px-5 border text-left transition-all ${timeSlot === s ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] hover:border-[#888]"}`}>
                          <div className={`text-[14px] font-medium ${timeSlot === s ? "text-white" : "text-[#111]"}`}>{s}</div>
                          {s === TIME_SLOTS[0] && <div className={`text-[11px] mt-1 ${timeSlot === s ? "text-[#CDFF3A]" : "text-[#888]"}`}>Most popular</div>}
                        </button>
                      ))}
                    </div>
                    <div className="bg-[#FFF9E8] border border-amber-200 p-3 text-[12px] text-amber-700 mb-4">
                      ⚠ Changes to time slot require at least 24 hours notice. If your next delivery is within 24 hours, the new time applies from the following delivery.
                    </div>
                    <button onClick={() => { setEditingTime(false); save("Delivery time updated"); }}
                      className="bg-[#111] text-white px-6 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">
                      Save Time Slot
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── 5. UPCOMING MEALS (swap) ── */}
            <div className="bg-white border border-[#E5E2DA]">
              <div className="p-5 border-b border-[#E5E2DA]">
                <h3 className="font-medium text-[15px]">This Week's Meals</h3>
                <p className="text-[#888] text-[12px] mt-0.5">Tap "Swap" on any meal to replace it. Cut-off is 10pm the night before each delivery.</p>
              </div>
              <div className="divide-y divide-[#F0EDE8]">
                {deliveryDays.map((day) => {
                  const slots = schedule[day] || [1];
                  return (
                    <div key={day} className="p-5">
                      <div className="font-mono text-[11px] tracking-[0.25em] text-[#888] uppercase mb-3 flex items-center gap-2">
                        {day}
                        <span className="text-[#ccc]">·</span>
                        <span>{timeSlot}</span>
                      </div>
                      <div className="space-y-2">
                        {slots.map((mealId, slotIdx) => {
                          const meal = MEALS.find((m) => m.id === mealId) || MEALS[0];
                          return (
                            <div key={slotIdx} className="flex items-center gap-4 bg-[#F7F5F0] p-3">
                              <img src={meal.img} alt={meal.name} className="w-14 h-14 object-cover shrink-0 bg-[#E8E5DE]" />
                              <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-medium truncate">{meal.name}</div>
                                <div className="text-[11px] text-[#888] mt-0.5">{meal.protein}g protein · {meal.carbs}g carbs · {meal.cal} kcal</div>
                              </div>
                              <button
                                onClick={() => setSwapTarget({ day, slotIdx })}
                                className="shrink-0 border border-[#D0CCC4] px-3 py-1.5 text-[11px] text-[#666] hover:border-[#111] hover:text-[#111] transition-colors"
                              >
                                Swap
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── 6. BILLING CYCLE ── */}
            <div className="bg-white border border-[#E5E2DA] p-5">
              <h3 className="font-medium text-[15px] mb-4">Billing Cycle</h3>
              <div className="flex gap-3 mb-4">
                {(["week", "month"] as const).map((c) => (
                  <button key={c} onClick={() => setBilling(c)}
                    className={`flex-1 sm:flex-none px-6 py-3 border text-[13px] font-medium transition-all ${billing === c ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] text-[#666] hover:border-[#888]"}`}>
                    {c === "week" ? `Weekly — $${plan.priceWeek}` : `Monthly — $${plan.priceMonth} (save 12%)`}
                  </button>
                ))}
              </div>
              <button onClick={() => save("Billing cycle updated")} className="text-[12px] text-[#888] border border-[#D0CCC4] px-4 py-2 hover:border-[#111] hover:text-[#111] transition-colors">
                Save Billing Preference
              </button>
            </div>

            {/* ── 7. PAUSE / CANCEL ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E5E2DA] p-5">
                <h3 className="font-medium text-[15px] mb-1">{subPaused ? "Resume Plan" : "Pause Plan"}</h3>
                <p className="text-[#888] text-[13px] mb-4">No charges while paused. Plan and meal settings are preserved.</p>
                {!subPaused && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[13px] text-[#666]">Duration:</span>
                    {[1, 2, 3, 4].map((w) => (
                      <button key={w} onClick={() => setPauseWeeks(w)}
                        className={`w-9 h-9 border text-[13px] font-bold transition-colors ${pauseWeeks === w ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] hover:border-[#888]"}`}>
                        {w}
                      </button>
                    ))}
                    <span className="text-[13px] text-[#666]">wk{pauseWeeks > 1 ? "s" : ""}</span>
                  </div>
                )}
                <button
                  onClick={() => { setSubPaused((v) => !v); save(subPaused ? "Plan resumed" : `Plan paused for ${pauseWeeks} week${pauseWeeks > 1 ? "s" : ""}`); }}
                  className={`w-full py-3 text-[12px] font-bold tracking-widest uppercase transition-colors ${subPaused ? "bg-[#0D2818] text-white hover:bg-[#111]" : "border border-[#111] text-[#111] hover:bg-[#111] hover:text-white"}`}
                >
                  {subPaused ? "Resume My Plan" : `Pause ${pauseWeeks} Week${pauseWeeks > 1 ? "s" : ""}`}
                </button>
              </div>
              <div className="bg-white border border-[#E5E2DA] p-5">
                <h3 className="font-medium text-[15px] mb-1 text-[#c00]">Cancel Subscription</h3>
                <p className="text-[#888] text-[13px] mb-4">We'll be sad to see you go. If cost is a concern, consider pausing instead — your plan and history are preserved.</p>
                <button className="w-full py-3 text-[12px] font-bold tracking-widest uppercase border border-[#c00] text-[#c00] hover:bg-[#c00] hover:text-white transition-colors">
                  Cancel Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ ORDERS ══ */}
        {tab === "orders" && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-8">Order History</h2>
            <div className="space-y-3">
              {ORDERS.map((o) => (
                <div key={o.id} className="bg-white border border-[#E5E2DA] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center text-[18px] shrink-0 ${o.type === "plan" ? "bg-[#0D2818]" : "bg-[#111111]"}`}>
                      {o.type === "plan" ? "🥗" : o.type === "box" ? "📦" : "❄️"}
                    </div>
                    <div>
                      <div className="font-medium text-[14px]">{o.items}</div>
                      <div className="text-[#999] text-[12px] mt-0.5">{o.id} · {o.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 sm:shrink-0">
                    <div className="text-right">
                      <div className="font-bold text-[15px]">${o.total.toFixed(2)}</div>
                      <div className="text-[12px] text-green-600 font-medium">{o.status}</div>
                    </div>
                    <button className="border border-[#D0CCC4] px-4 py-2 text-[12px] hover:border-[#111] transition-colors whitespace-nowrap">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ WALLET ══ */}
        {tab === "wallet" && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-8">Wallet & Rewards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Wallet Balance", val: "$12.50", sub: "Available to spend", color: "#CDFF3A", bg: "#111111" },
                { label: "Reward Points", val: "1,234", sub: "= $12.34 value", color: "#F2C94C", bg: "#0D2818" },
                { label: "Lifetime Earned", val: "4,891 pts", sub: "Since Jun 2024", color: "#7EE8B0", bg: "#111111" },
              ].map((s) => (
                <div key={s.label} className="p-6" style={{ backgroundColor: s.bg }}>
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3 text-white/30">{s.label}</div>
                  <div className="font-display text-[30px] font-bold" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-white/30 text-[12px] mt-1">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-[#E5E2DA] p-6 mb-5">
              <h3 className="font-medium text-[16px] mb-5">Redeem Points</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{ pts: 500, val: "$5 off", ok: true }, { pts: 1000, val: "$10 off", ok: true }, { pts: 2000, val: "$22 off", ok: false }, { pts: 5000, val: "Free box", ok: false }].map((r) => (
                  <div key={r.pts} className={`border p-4 text-center ${r.ok ? "border-[#111] cursor-pointer hover:bg-[#111] hover:text-white group transition-all" : "border-[#E5E2DA] opacity-40"}`}>
                    <div className="font-display text-[22px] font-bold group-hover:text-white">{r.val}</div>
                    <div className="text-[11px] text-[#888] group-hover:text-white/60 mt-1">{r.pts.toLocaleString()} pts</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-[#E5E2DA] p-6">
              <h3 className="font-medium text-[16px] mb-5">Transaction History</h3>
              <div className="space-y-0">
                {WALLET_HISTORY.map((t, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 py-3.5 border-t border-[#F0EDE8] first:border-0">
                    <div>
                      <div className="text-[13px]">{t.desc}</div>
                      <div className="text-[#999] text-[11px] mt-0.5">{t.date}</div>
                    </div>
                    <div className={`font-mono text-[13px] font-bold shrink-0 ${t.type === "earn" ? "text-green-600" : "text-red-500"}`}>
                      {t.pts > 0 ? "+" : ""}{t.pts} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ SETTINGS ══ */}
        {tab === "settings" && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-8">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E5E2DA] p-6">
                <h3 className="font-medium text-[16px] mb-5">Personal Details</h3>
                <div className="space-y-4">
                  {[{ l: "First Name", v: "Jerome" }, { l: "Last Name", v: "Tan" }, { l: "Email", v: "jerome@example.com" }, { l: "Phone", v: "+65 9123 4567" }].map((f) => (
                    <div key={f.l}>
                      <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-1.5">{f.l}</label>
                      <input defaultValue={f.v} className="w-full border border-[#D0CCC4] px-4 py-2.5 text-[14px] outline-none focus:border-[#111] transition-colors" />
                    </div>
                  ))}
                </div>
                <button onClick={() => save("Details saved")} className="mt-5 bg-[#111] text-white px-6 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">Save Changes</button>
              </div>
              <div className="space-y-4">
                <div className="bg-white border border-[#E5E2DA] p-6">
                  <h3 className="font-medium text-[16px] mb-4">Saved Addresses</h3>
                  <div className="border border-[#D0CCC4] p-4 mb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[11px] font-mono text-[#888] uppercase tracking-wider mb-1">Default</div>
                        <div className="text-[14px]">123 Toa Payoh Lor 4, #08-22</div>
                        <div className="text-[13px] text-[#888]">Singapore 310123</div>
                      </div>
                      <button className="text-[12px] text-[#888] hover:text-[#111] border border-[#D0CCC4] px-3 py-1 hover:border-[#111] transition-colors">Edit</button>
                    </div>
                  </div>
                  <button className="text-[12px] uppercase tracking-wider text-[#888] hover:text-[#111] transition-colors border border-[#D0CCC4] px-4 py-2 hover:border-[#111] w-full">+ Add Address</button>
                </div>
                <div className="bg-white border border-[#E5E2DA] p-6">
                  <h3 className="font-medium text-[16px] mb-4">Notifications</h3>
                  {[{ l: "Order confirmations", a: true }, { l: "Delivery reminders", a: true }, { l: "Weekly menu updates", a: true }, { l: "Promotions & deals", a: false }].map((n) => (
                    <div key={n.l} className="flex items-center justify-between py-2.5 border-b border-[#F0EDE8] last:border-0">
                      <span className="text-[14px]">{n.l}</span>
                      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${n.a ? "bg-[#111]" : "bg-[#D0CCC4]"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${n.a ? "left-5" : "left-0.5"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── MEAL SWAP MODAL ── */}
      {swapTarget && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSwapTarget(null)} />
          <div className="relative bg-white w-full max-w-[680px] max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[#E5E2DA]">
              <div>
                <h3 className="font-display text-[20px] font-bold">Swap Meal</h3>
                <p className="text-[#888] text-[12px] mt-0.5">{swapTarget.day} · Slot {swapTarget.slotIdx + 1} — pick a replacement</p>
              </div>
              <button onClick={() => setSwapTarget(null)} className="text-[#888] hover:text-[#111]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MEALS.filter((m) => m.cat !== "bundle").map((meal) => {
                const currentMealId = schedule[swapTarget.day]?.[swapTarget.slotIdx];
                const isCurrent = meal.id === currentMealId;
                return (
                  <button key={meal.id} onClick={() => { swapMeal(meal.id); save("Meal swapped successfully"); }}
                    className={`flex gap-3 p-3 text-left border transition-all hover:border-[#111] ${isCurrent ? "border-[#111] bg-[#F7F5F0]" : "border-[#E5E2DA]"}`}>
                    <img src={meal.img} alt={meal.name} className="w-16 h-16 object-cover shrink-0 bg-[#F0EDE8]" />
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium leading-snug">{meal.name}</div>
                      <div className="text-[11px] text-[#888] mt-1">{meal.protein}g pro · {meal.carbs}g carb · {meal.cal} cal</div>
                      {isCurrent && <div className="text-[10px] text-[#888] mt-1 font-mono uppercase tracking-wider">Current</div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Pause modal (dashboard shortcut) */}
      {showPauseModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPauseModal(false)} />
          <div className="relative bg-white max-w-[440px] w-full p-8">
            <h3 className="font-display text-[24px] font-bold mb-3">Pause your plan</h3>
            <p className="text-[#666] text-[14px] mb-6">No deliveries or charges during the pause. Your plan resumes automatically.</p>
            <div className="flex gap-3 mb-5">
              {[1, 2, 3, 4].map((w) => (
                <button key={w} onClick={() => setPauseWeeks(w)}
                  className={`flex-1 py-3 border text-[14px] font-bold transition-colors ${pauseWeeks === w ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] hover:border-[#111]"}`}>
                  {w}w
                </button>
              ))}
            </div>
            <div className="bg-[#F7F5F0] p-3 mb-6 text-[13px] text-[#666]">
              Resumes: <strong className="text-[#111]">15 September 2025</strong>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowPauseModal(false)} className="flex-1 border border-[#D0CCC4] py-3 text-[12px] font-bold uppercase text-[#888] hover:border-[#111] transition-colors">Cancel</button>
              <button onClick={() => { setSubPaused(true); setShowPauseModal(false); save(`Plan paused for ${pauseWeeks} week${pauseWeeks > 1 ? "s" : ""}`); }}
                className="flex-1 bg-[#111] text-white py-3 text-[12px] font-bold uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">
                Confirm Pause
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
