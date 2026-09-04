import { useState } from "react";
import { Page } from "@/data";

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
  { date: "1 Sep 2025", desc: "Purchase — #FRE-20250901-7721", amount: +36.70, pts: +36, type: "earn" },
  { date: "25 Aug 2025", desc: "Meal Plan bonus (2× pts)", amount: +178.00, pts: +356, type: "earn" },
  { date: "20 Aug 2025", desc: "Redeemed 500 pts", amount: -5.00, pts: -500, type: "redeem" },
  { date: "18 Aug 2025", desc: "Build-A-Box — #FRE-20250818-7641", amount: +119.00, pts: +119, type: "earn" },
];

export default function AccountPage({ navigate }: Props) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [subPaused, setSubPaused] = useState(false);
  const [pauseWeeks, setPauseWeeks] = useState(1);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [menuEdit, setMenuEdit] = useState(false);

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: "dashboard", label: "Dashboard", icon: "⊞" },
    { key: "subscription", label: "Subscription", icon: "↻" },
    { key: "orders", label: "Order History", icon: "📦" },
    { key: "wallet", label: "Wallet", icon: "💳" },
    { key: "settings", label: "Settings", icon: "⚙" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Account header */}
      <div className="bg-[#111111] text-white py-8 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#CDFF3A] rounded-full flex items-center justify-center text-[#111111] font-display text-[22px] font-bold">J</div>
            <div>
              <h1 className="font-display text-[24px] font-bold">Jerome Tan</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[#CDFF3A] text-[11px] font-mono tracking-wider">VIP Member</span>
                <span className="text-white/30 text-[11px]">·</span>
                <span className="text-white/40 text-[12px]">Member since Jun 2024</span>
              </div>
            </div>
          </div>
          <div className="flex gap-6 text-center hidden md:flex">
            {[
              { val: "1,234", label: "Points" },
              { val: "$12.34", label: "Wallet" },
              { val: "Week 13", label: "Plan" },
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
      <div className="bg-white border-b border-[#E5E2DA]">
        <div className="max-w-[1200px] mx-auto px-6 flex gap-0 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-6 py-4 text-[12px] tracking-wider uppercase font-medium whitespace-nowrap border-b-2 transition-colors ${tab === t.key ? "border-[#111111] text-[#111111]" : "border-transparent text-[#999] hover:text-[#111]"}`}>
              <span className="mr-1.5">{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-10">

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-8">Welcome back, Jerome.</h2>

            {/* Key stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Active Plan", val: "MAINTAIN", sub: "2,000 kcal/day", color: "#F2C94C", bg: "#0D2818" },
                { label: "Next Delivery", val: "Tomorrow", sub: "6:00am – 9:00am", color: "#CDFF3A", bg: "#111111" },
                { label: "Wallet Balance", val: "$12.50", sub: "1,234 reward pts", color: "#7EE8B0", bg: "#111111" },
                { label: "Orders This Month", val: "3", sub: "$373.70 spent", color: "#A78BFA", bg: "#111111" },
              ].map((s) => (
                <div key={s.label} className="p-5" style={{ backgroundColor: s.bg }}>
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: `${s.color}80` }}>{s.label}</div>
                  <div className="font-display text-[26px] font-bold" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-white/30 text-[12px] mt-1">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Subscription status card */}
            <div className={`border p-6 mb-6 ${subPaused ? "border-[#F2C94C]/30 bg-[#FFF9E8]" : "border-[#0D2818]/20 bg-[#0D2818]"}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-2 ${subPaused ? "text-[#F2C94C]" : "text-[#F2C94C]"}`}>
                    {subPaused ? "⏸ Subscription Paused" : "✓ Active Subscription"}
                  </div>
                  <h3 className={`font-display text-[24px] font-bold ${subPaused ? "text-[#333]" : "text-white"}`}>
                    MAINTAIN Plan · 4 meals/day
                  </h3>
                  <div className={`text-[13px] mt-1 ${subPaused ? "text-[#888]" : "text-white/40"}`}>
                    {subPaused ? `Paused for ${pauseWeeks} week${pauseWeeks > 1 ? "s" : ""} · Resumes 15 Sep 2025` : "Renews weekly · Mon, Wed, Fri, Sat delivery · $178/week"}
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
                        Manage Plan
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Recent orders */}
            <div className="bg-white border border-[#E5E2DA] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-[18px] font-bold">Recent Orders</h3>
                <button onClick={() => setTab("orders")} className="text-[12px] uppercase tracking-wider text-[#888] hover:text-[#111] transition-colors">View All →</button>
              </div>
              <div className="space-y-3">
                {ORDERS.slice(0, 3).map((o) => (
                  <div key={o.id} className="flex items-center justify-between gap-4 py-3 border-t border-[#F0EDE8] first:border-0 first:pt-0">
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

        {/* ── SUBSCRIPTION ── */}
        {tab === "subscription" && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-8">Manage Subscription</h2>

            {/* Current plan */}
            <div className="bg-[#0D2818] text-white p-7 mb-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-[#F2C94C] uppercase mb-2">Current Plan</div>
                  <h3 className="font-display text-[32px] font-bold">MAINTAIN</h3>
                  <div className="text-white/40 text-[14px] mt-1">2,000 kcal/day · 4 meals/day · $178/week</div>
                </div>
                <div className={`px-4 py-2 text-[11px] font-bold tracking-widest uppercase ${subPaused ? "bg-[#F2C94C] text-[#111]" : "bg-[#CDFF3A] text-[#111]"}`}>
                  {subPaused ? "⏸ Paused" : "● Active"}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{ l: "Protein", v: "160g" }, { l: "Carbs", v: "190g" }, { l: "Fat", v: "60g" }].map((m) => (
                  <div key={m.l} className="bg-white/8 border border-white/10 py-3 text-center">
                    <div className="font-mono text-[14px] text-[#F2C94C]">{m.v}</div>
                    <div className="text-white/25 text-[10px] mt-1 uppercase">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery days */}
            <div className="bg-white border border-[#E5E2DA] p-6 mb-4">
              <h3 className="font-medium text-[16px] mb-4">Delivery Days</h3>
              <div className="flex gap-2 flex-wrap">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => {
                  const active = ["Mon", "Wed", "Fri", "Sat"].includes(d);
                  return (
                    <div key={d} className={`px-4 py-2.5 text-[12px] font-medium border ${active ? "bg-[#0D2818] text-white border-[#0D2818]" : "border-[#D0CCC4] text-[#999]"}`}>
                      {d}
                    </div>
                  );
                })}
              </div>
              <p className="text-[#888] text-[12px] mt-3">Delivery cut-off is 10pm the night before. Contact us to modify delivery days.</p>
            </div>

            {/* Upcoming menu */}
            <div className="bg-white border border-[#E5E2DA] p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[16px]">This Week's Menu</h3>
                <button onClick={() => setMenuEdit(!menuEdit)} className={`text-[12px] uppercase tracking-wider border px-4 py-2 transition-colors ${menuEdit ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] text-[#888] hover:border-[#111] hover:text-[#111]"}`}>
                  {menuEdit ? "Save Changes" : "Edit Menu"}
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Mon", meal: "Herb Grilled Chicken & Brown Rice" },
                  { day: "Mon", meal: "Teriyaki Chicken & Jasmine Rice (lunch)" },
                  { day: "Wed", meal: "Cajun Salmon & Sweet Potato Mash" },
                  { day: "Wed", meal: "Greek Chicken & Quinoa Bowl (lunch)" },
                  { day: "Fri", meal: "Korean BBQ Beef & Purple Rice" },
                  { day: "Sat", meal: "Smoked Salmon Scrambled Eggs (breakfast)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 py-2.5 border-b border-[#F0EDE8] last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[#888] w-8 shrink-0">{item.day}</span>
                      <span className="text-[14px]">{item.meal}</span>
                    </div>
                    {menuEdit && (
                      <button className="text-[12px] text-[#888] border border-[#D0CCC4] px-3 py-1 hover:border-[#111] transition-colors">Swap</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pause / Cancel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E5E2DA] p-5">
                <h3 className="font-medium text-[15px] mb-2">{subPaused ? "Resume Subscription" : "Pause Subscription"}</h3>
                <p className="text-[#888] text-[13px] mb-4">
                  {subPaused ? "Your plan will resume from the next billing cycle." : "Pause for 1–4 weeks. No charges while paused."}
                </p>
                {!subPaused && (
                  <div className="flex gap-2 mb-4 items-center">
                    <span className="text-[13px] text-[#666]">Pause for</span>
                    {[1, 2, 3, 4].map((w) => (
                      <button key={w} onClick={() => setPauseWeeks(w)}
                        className={`w-8 h-8 border text-[12px] font-medium transition-colors ${pauseWeeks === w ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] hover:border-[#111]"}`}>
                        {w}
                      </button>
                    ))}
                    <span className="text-[13px] text-[#666]">week{pauseWeeks > 1 ? "s" : ""}</span>
                  </div>
                )}
                <button
                  onClick={() => { setSubPaused((v) => !v); setShowPauseModal(false); }}
                  className={`w-full py-3 text-[12px] font-bold tracking-widest uppercase transition-colors ${subPaused ? "bg-[#0D2818] text-white hover:bg-[#111]" : "border border-[#111] text-[#111] hover:bg-[#111] hover:text-white"}`}
                >
                  {subPaused ? "Resume Plan" : `Pause ${pauseWeeks} Week${pauseWeeks > 1 ? "s" : ""}`}
                </button>
              </div>

              <div className="bg-white border border-[#E5E2DA] p-5">
                <h3 className="font-medium text-[15px] mb-2">Change Plan</h3>
                <p className="text-[#888] text-[13px] mb-4">Switch between Cut, Maintain, and Build at any time. Changes apply from next billing cycle.</p>
                <button onClick={() => navigate("meal-plan-wizard")} className="w-full py-3 text-[12px] font-bold tracking-widest uppercase border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors">
                  Change Plan →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {tab === "orders" && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-8">Order History</h2>
            <div className="space-y-3">
              {ORDERS.map((o) => (
                <div key={o.id} className="bg-white border border-[#E5E2DA] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center text-[18px] ${o.type === "plan" ? "bg-[#0D2818]" : "bg-[#111111]"}`}>
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
                    <button className="border border-[#D0CCC4] px-4 py-2 text-[12px] hover:border-[#111] transition-colors whitespace-nowrap">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── WALLET ── */}
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

            <div className="bg-white border border-[#E5E2DA] p-6 mb-6">
              <h3 className="font-medium text-[16px] mb-5">Redeem Points</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { pts: 500, val: "$5 off", available: true },
                  { pts: 1000, val: "$10 off", available: true },
                  { pts: 2000, val: "$22 off", available: false },
                  { pts: 5000, val: "Free box", available: false },
                ].map((r) => (
                  <div key={r.pts} className={`border p-4 text-center ${r.available ? "border-[#111] cursor-pointer hover:bg-[#111] hover:text-white group transition-all" : "border-[#E5E2DA] opacity-40"}`}>
                    <div className="font-display text-[22px] font-bold group-hover:text-white">{r.val}</div>
                    <div className="text-[11px] text-[#888] group-hover:text-white/60 mt-1">{r.pts.toLocaleString()} pts</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E5E2DA] p-6">
              <h3 className="font-medium text-[16px] mb-5">Transaction History</h3>
              <div className="space-y-1">
                {WALLET_HISTORY.map((t, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 py-3 border-t border-[#F0EDE8] first:border-0 first:pt-0">
                    <div>
                      <div className="text-[13px]">{t.desc}</div>
                      <div className="text-[#999] text-[11px] mt-0.5">{t.date}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`font-mono text-[13px] font-bold ${t.type === "earn" ? "text-green-600" : "text-[#E43B4F]"}`}>
                        {t.pts > 0 ? "+" : ""}{t.pts} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab === "settings" && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-8">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E5E2DA] p-6">
                <h3 className="font-medium text-[16px] mb-5">Personal Details</h3>
                <div className="space-y-4">
                  {[{ label: "First Name", val: "Jerome" }, { label: "Last Name", val: "Tan" }, { label: "Email", val: "jerome@example.com" }, { label: "Phone", val: "+65 9123 4567" }].map((f) => (
                    <div key={f.label}>
                      <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-1.5">{f.label}</label>
                      <input defaultValue={f.val} className="w-full border border-[#D0CCC4] px-4 py-2.5 text-[14px] outline-none focus:border-[#111] transition-colors" />
                    </div>
                  ))}
                </div>
                <button className="mt-5 bg-[#111] text-white px-6 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">Save Changes</button>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-[#E5E2DA] p-6">
                  <h3 className="font-medium text-[16px] mb-4">Saved Addresses</h3>
                  <div className="border border-[#D0CCC4] p-4 mb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[12px] font-mono text-[#888] uppercase tracking-wider mb-1">Default</div>
                        <div className="text-[14px]">123 Toa Payoh Lor 4, #08-22</div>
                        <div className="text-[13px] text-[#888]">Singapore 310123</div>
                      </div>
                      <button className="text-[12px] text-[#888] hover:text-[#111]">Edit</button>
                    </div>
                  </div>
                  <button className="text-[12px] uppercase tracking-wider text-[#888] hover:text-[#111] transition-colors">+ Add Address</button>
                </div>

                <div className="bg-white border border-[#E5E2DA] p-6">
                  <h3 className="font-medium text-[16px] mb-4">Notifications</h3>
                  {[{ label: "Order confirmations", active: true }, { label: "Delivery reminders", active: true }, { label: "Weekly menu updates", active: true }, { label: "Promotions & deals", active: false }].map((n) => (
                    <div key={n.label} className="flex items-center justify-between py-2.5 border-b border-[#F0EDE8] last:border-0">
                      <span className="text-[14px]">{n.label}</span>
                      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${n.active ? "bg-[#111]" : "bg-[#D0CCC4]"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${n.active ? "left-5" : "left-0.5"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pause modal */}
      {showPauseModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPauseModal(false)} />
          <div className="relative bg-white max-w-[440px] w-full p-8">
            <h3 className="font-display text-[24px] font-bold mb-3">Pause your plan</h3>
            <p className="text-[#666] text-[14px] mb-6">Choose how many weeks to pause. No charges during the pause. Your plan resumes automatically.</p>
            <div className="flex gap-3 mb-6">
              {[1, 2, 3, 4].map((w) => (
                <button key={w} onClick={() => setPauseWeeks(w)}
                  className={`flex-1 py-3 border text-[14px] font-bold transition-colors ${pauseWeeks === w ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] hover:border-[#111]"}`}>
                  {w}w
                </button>
              ))}
            </div>
            <div className="bg-[#F7F5F0] p-4 mb-6 text-[13px] text-[#888]">
              Plan resumes: <strong className="text-[#111]">15 September 2025</strong>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowPauseModal(false)} className="flex-1 border border-[#D0CCC4] py-3 text-[12px] font-bold uppercase tracking-wider text-[#888] hover:border-[#111] transition-colors">Cancel</button>
              <button onClick={() => { setSubPaused(true); setShowPauseModal(false); }} className="flex-1 bg-[#111] text-white py-3 text-[12px] font-bold uppercase tracking-wider hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">Confirm Pause</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
