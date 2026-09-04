import { useState } from "react";
import { CartItem, Page, PLANS } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
}

type Step = 1 | 2 | 3;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["6am – 9am", "9am – 12pm", "12pm – 3pm", "3pm – 6pm"];

export default function MealPlanWizardPage({ navigate, addToCart }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [goal, setGoal] = useState("MAINTAIN");
  const [billing, setBilling] = useState<"week" | "month">("week");
  const [deliveryDays, setDeliveryDays] = useState<string[]>(["Mon", "Wed", "Fri"]);
  const [timeSlot, setTimeSlot] = useState(SLOTS[0]);
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", unit: "", postal: "" });

  const plan = PLANS.find((p) => p.name === goal)!;
  const price = billing === "week" ? plan.priceWeek : plan.priceMonth;

  const toggleDay = (d: string) =>
    setDeliveryDays((prev) =>
      prev.includes(d)
        ? prev.length > 1 ? prev.filter((x) => x !== d) : prev
        : [...prev, d].sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b))
    );

  const handleSubscribe = () => {
    addToCart({
      id: 8888, name: `${plan.name} Meal Plan — ${plan.meals} meals/day`,
      price, qty: 1,
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop&auto=format",
      type: "plan",
      planLabel: `${billing === "week" ? "Weekly" : "Monthly"} · ${deliveryDays.join(", ")}`,
    });
    navigate("confirmation");
  };

  const canProceed2 = deliveryDays.length > 0 && timeSlot;
  const canProceed3 = address.name && address.line1 && address.postal;

  return (
    <div className="min-h-screen bg-[#0D2818] text-white flex flex-col">
      {/* Minimal header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
        <button onClick={() => navigate("home")} className="font-display text-[20px] font-bold">
          FRESHER<span className="text-[#F2C94C]">.</span>
        </button>
        <div className="flex items-center gap-2">
          {([1, 2, 3] as Step[]).map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${step === n ? "bg-[#F2C94C] text-[#111]" : step > n ? "bg-[#F2C94C]/30 text-[#F2C94C]" : "bg-white/10 text-white/30"}`}>
                {step > n ? "✓" : n}
              </div>
              {n < 3 && <div className={`w-8 h-px ${step > n ? "bg-[#F2C94C]/40" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>
        <button onClick={() => step > 1 ? setStep((s) => (s - 1) as Step) : navigate("home")}
          className="text-white/30 hover:text-white text-[13px] transition-colors">
          {step > 1 ? "← Back" : "✕"}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[820px]">

          {/* ── STEP 1: GOAL ── */}
          {step === 1 && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.4em] text-[#F2C94C]/60 uppercase mb-4">Step 1 of 3</p>
              <h1 className="font-display text-[40px] font-bold mb-10">What's your goal?</h1>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {PLANS.map((p) => {
                  const selected = goal === p.name;
                  return (
                    <div key={p.name} onClick={() => setGoal(p.name)} role="button" tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setGoal(p.name)}
                      style={{ borderColor: selected ? "#F2C94C" : "rgba(255,255,255,0.2)", backgroundColor: selected ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)" }}
                      className="text-left p-6 border-2 cursor-pointer transition-all hover:border-white/50 select-none">
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-mono text-[10px] tracking-[0.35em]" style={{ color: p.accent }}>{p.name}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selected ? "border-[#F2C94C] bg-[#F2C94C]" : "border-white/25"}`}>
                          {selected && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3.5"><path d="M20 6 9 17l-5-5" /></svg>}
                        </div>
                      </div>
                      <div className="font-display text-[36px] font-bold leading-none mb-1">
                        {p.cal}<span className="text-[16px] font-normal text-white/30"> kcal</span>
                      </div>
                      <div className="text-white/45 text-[12px] leading-relaxed mt-2 mb-4">{p.desc}</div>
                      <div className="flex gap-3 text-[11px]">
                        {[{ l: "Pro", v: `${p.protein}g` }, { l: "Carb", v: `${p.carbs}g` }, { l: "Fat", v: `${p.fat}g` }].map((m) => (
                          <span key={m.l} style={{ color: p.accent }}>{m.v} {m.l}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Billing toggle */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-1 bg-white/8 p-1">
                  {(["week", "month"] as const).map((c) => (
                    <button key={c} onClick={() => setBilling(c)}
                      className={`px-5 py-2 text-[12px] font-medium tracking-wider uppercase transition-all ${billing === c ? "bg-[#F2C94C] text-[#111]" : "text-white/40 hover:text-white"}`}>
                      {c === "week" ? "Weekly" : <span>Monthly <span className="text-[#7EE8B0] text-[10px]">–12%</span></span>}
                    </button>
                  ))}
                </div>
                <span className="font-display text-[24px] font-bold text-[#F2C94C]">${price}</span>
                <span className="text-white/35 text-[13px]">/{billing}</span>
              </div>

              <button onClick={() => setStep(2)}
                className="inline-flex items-center gap-3 bg-[#F2C94C] text-[#111111] px-10 py-4 text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors">
                Continue →
              </button>
            </div>
          )}

          {/* ── STEP 2: DELIVERY ── */}
          {step === 2 && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.4em] text-[#F2C94C]/60 uppercase mb-4">Step 2 of 3</p>
              <h1 className="font-display text-[40px] font-bold mb-2">When & where?</h1>
              <p className="text-white/35 mb-10">Pick your delivery days, time, and address.</p>

              {/* Delivery days */}
              <div className="mb-8">
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase block mb-3">Delivery Days</label>
                <div className="flex gap-2">
                  {DAYS.map((d) => {
                    const on = deliveryDays.includes(d);
                    return (
                      <button key={d} onClick={() => toggleDay(d)}
                        className={`flex-1 py-3 text-[12px] font-medium border transition-all ${on ? "bg-[#F2C94C] text-[#111] border-[#F2C94C]" : "border-white/12 text-white/35 hover:border-white/40 hover:text-white"}`}>
                        {d}
                      </button>
                    );
                  })}
                </div>
                <p className="text-white/20 text-[11px] mt-2">Meals arrive between 6am–9am unless you change the slot below</p>
              </div>

              {/* Time slot */}
              <div className="mb-8">
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase block mb-3">Arrival Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SLOTS.map((s) => (
                    <button key={s} onClick={() => setTimeSlot(s)}
                      className={`py-3 text-[12px] font-medium border transition-all ${timeSlot === s ? "bg-[#F2C94C] text-[#111] border-[#F2C94C]" : "border-white/12 text-white/35 hover:border-white/40 hover:text-white"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="mb-10">
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase block mb-3">Delivery Address</label>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Full name" value={address.name} onChange={(e) => setAddress((a) => ({ ...a, name: e.target.value }))}
                    className="col-span-2 sm:col-span-1 bg-white/5 border border-white/12 text-white placeholder:text-white/20 px-4 py-3 text-[14px] outline-none focus:border-[#F2C94C] transition-colors" />
                  <input placeholder="Phone" value={address.phone} onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))}
                    className="col-span-2 sm:col-span-1 bg-white/5 border border-white/12 text-white placeholder:text-white/20 px-4 py-3 text-[14px] outline-none focus:border-[#F2C94C] transition-colors" />
                  <input placeholder="Street address" value={address.line1} onChange={(e) => setAddress((a) => ({ ...a, line1: e.target.value }))}
                    className="col-span-2 bg-white/5 border border-white/12 text-white placeholder:text-white/20 px-4 py-3 text-[14px] outline-none focus:border-[#F2C94C] transition-colors" />
                  <input placeholder="Unit / Floor" value={address.unit} onChange={(e) => setAddress((a) => ({ ...a, unit: e.target.value }))}
                    className="bg-white/5 border border-white/12 text-white placeholder:text-white/20 px-4 py-3 text-[14px] outline-none focus:border-[#F2C94C] transition-colors" />
                  <input placeholder="Postal code" value={address.postal} onChange={(e) => setAddress((a) => ({ ...a, postal: e.target.value }))}
                    className="bg-white/5 border border-white/12 text-white placeholder:text-white/20 px-4 py-3 text-[14px] outline-none focus:border-[#F2C94C] transition-colors" />
                </div>
              </div>

              <button onClick={() => setStep(3)} disabled={!canProceed2 || !canProceed3}
                className={`inline-flex items-center gap-3 px-10 py-4 text-[13px] font-bold tracking-[0.15em] uppercase transition-colors ${canProceed2 && canProceed3 ? "bg-[#F2C94C] text-[#111] hover:bg-white" : "bg-white/10 text-white/25 cursor-not-allowed"}`}>
                Review & Pay →
              </button>
            </div>
          )}

          {/* ── STEP 3: PAY ── */}
          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Plan summary — compact */}
              <div className="lg:col-span-2 self-start">
                <p className="font-mono text-[10px] tracking-[0.4em] text-[#F2C94C]/60 uppercase mb-4">Step 3 of 3</p>
                <h1 className="font-display text-[32px] font-bold mb-6">Your plan</h1>

                <div className="border border-white/12 p-5 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: plan.accent }}>{plan.name}</span>
                      <div className="font-display text-[28px] font-bold">{plan.cal}<span className="text-[14px] font-normal text-white/30"> kcal/day</span></div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-[26px] font-bold" style={{ color: plan.accent }}>${price}</div>
                      <div className="text-white/30 text-[11px]">/{billing}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] border-t border-white/8 pt-4">
                    {[{ l: "Protein", v: `${plan.protein}g` }, { l: "Carbs", v: `${plan.carbs}g` }, { l: "Fat", v: `${plan.fat}g` }].map((m) => (
                      <div key={m.l}>
                        <div className="font-mono" style={{ color: plan.accent }}>{m.v}</div>
                        <div className="text-white/25 mt-0.5 uppercase tracking-wider text-[9px]">{m.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[12px] text-white/30 space-y-1.5">
                  <div>📅 {deliveryDays.join(", ")}</div>
                  <div>🕐 {timeSlot}</div>
                  <div>📍 {address.line1}{address.unit ? `, ${address.unit}` : ""}, S{address.postal}</div>
                  <div className="pt-2 text-white/20">Cancel or pause anytime from your account.</div>
                </div>
              </div>

              {/* Payment */}
              <div className="lg:col-span-3">
                <h2 className="font-display text-[26px] font-bold mb-6 hidden lg:block">Payment</h2>

                <div className="space-y-3 mb-6">
                  <input placeholder="Card number" defaultValue="4242 4242 4242 4242"
                    className="w-full bg-white/5 border border-white/12 text-white placeholder:text-white/20 px-4 py-3.5 text-[14px] font-mono outline-none focus:border-[#F2C94C] transition-colors" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM / YY" defaultValue="08 / 28"
                      className="bg-white/5 border border-white/12 text-white placeholder:text-white/20 px-4 py-3.5 text-[14px] font-mono outline-none focus:border-[#F2C94C] transition-colors" />
                    <input placeholder="CVC"
                      className="bg-white/5 border border-white/12 text-white placeholder:text-white/20 px-4 py-3.5 text-[14px] font-mono outline-none focus:border-[#F2C94C] transition-colors" />
                  </div>
                  <input placeholder="Name on card" defaultValue="Jerome Tan"
                    className="w-full bg-white/5 border border-white/12 text-white placeholder:text-white/20 px-4 py-3.5 text-[14px] outline-none focus:border-[#F2C94C] transition-colors" />
                </div>

                {/* PayNow alternative */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/25 text-[11px]">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <button className="w-full border border-white/12 py-3.5 text-[13px] text-white/50 hover:border-white/30 hover:text-white transition-colors mb-8 flex items-center justify-center gap-2">
                  <span className="font-bold text-[#E43B4F]">Pay</span>Now
                </button>

                <button onClick={handleSubscribe}
                  className="w-full bg-[#F2C94C] text-[#111111] py-4 text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors">
                  Subscribe — ${price}/{billing}
                </button>
                <p className="text-white/20 text-[11px] text-center mt-3">🔒 Stripe · Cancel anytime</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
