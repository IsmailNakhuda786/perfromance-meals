import { useState } from "react";
import { CartItem, Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  cart: CartItem[];
}

type CheckoutStep = "address" | "delivery" | "payment";

const SLOTS = ["6:00am – 9:00am", "9:00am – 12:00pm", "12:00pm – 3:00pm", "3:00pm – 6:00pm"];

export default function CheckoutPage({ navigate, cart }: Props) {
  const [step, setStep] = useState<CheckoutStep>("address");
  const [slot, setSlot] = useState(SLOTS[0]);
  const [useWallet, setUseWallet] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const walletCredit = 12.50;
  const discount = useWallet ? walletCredit : 0;
  const total = Math.max(0, subtotal - discount);

  const STEPS: { key: CheckoutStep; label: string }[] = [
    { key: "address", label: "Delivery" },
    { key: "delivery", label: "Schedule" },
    { key: "payment", label: "Payment" },
  ];
  const stepIdx = STEPS.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <div className="bg-[#111111] text-white py-6 px-6">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="font-display text-[20px] font-bold">FRESHER<span className="text-[#CDFF3A]">.</span></div>
          <div className="flex items-center gap-3">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <span className={`text-[11px] tracking-wider uppercase font-medium ${step === s.key ? "text-[#CDFF3A]" : i < stepIdx ? "text-white/40" : "text-white/20"}`}>
                  {i < stepIdx ? "✓ " : ""}{s.label}
                </span>
                {i < STEPS.length - 1 && <span className="text-white/20">›</span>}
              </div>
            ))}
          </div>
          <button onClick={() => navigate("ready-to-go")} className="text-white/30 hover:text-white text-[12px] uppercase tracking-wider">
            ← Continue Shopping
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: form */}
          <div className="lg:col-span-2">

            {/* ── ADDRESS ── */}
            {step === "address" && (
              <div>
                <h2 className="font-display text-[28px] font-bold mb-8">Delivery address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  {[
                    { label: "First Name", default: "Jerome", half: true },
                    { label: "Last Name", default: "Tan", half: true },
                    { label: "Email", default: "jerome@example.com", half: false },
                    { label: "Phone", default: "+65 9123 4567", half: false },
                    { label: "Street Address", default: "123 Toa Payoh Lor 4", half: false },
                    { label: "Unit / Floor", default: "#08-22", half: true },
                    { label: "Postal Code", default: "310123", half: true },
                  ].map((f) => (
                    <div key={f.label} className={f.half ? "" : "sm:col-span-2"}>
                      <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#666] mb-2">{f.label}</label>
                      <input
                        defaultValue={f.default}
                        className="w-full border border-[#D0CCC4] bg-white px-4 py-3 text-[15px] text-[#111] outline-none focus:border-[#111111] transition-colors"
                      />
                    </div>
                  ))}
                </div>

                {/* Delivery instructions */}
                <div className="mb-8">
                  <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#666] mb-2">Delivery Instructions (optional)</label>
                  <input defaultValue="Leave at door. Ring bell." className="w-full border border-[#D0CCC4] bg-white px-4 py-3 text-[15px] text-[#111] outline-none focus:border-[#111111] transition-colors" />
                </div>

                <button onClick={() => setStep("delivery")} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#111111] text-white px-10 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors">
                  Continue to Scheduling →
                </button>
              </div>
            )}

            {/* ── DELIVERY SLOT ── */}
            {step === "delivery" && (
              <div>
                <h2 className="font-display text-[28px] font-bold mb-8">Delivery schedule</h2>

                <div className="bg-[#111111] text-white p-5 mb-8 flex items-center gap-3">
                  <span className="text-[20px]">📍</span>
                  <div>
                    <div className="text-[13px] font-medium">123 Toa Payoh Lor 4, #08-22</div>
                    <div className="text-white/40 text-[12px]">Singapore 310123</div>
                  </div>
                  <button onClick={() => setStep("address")} className="ml-auto text-[#CDFF3A] text-[11px] uppercase tracking-wider hover:underline">Edit</button>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-[15px] mb-4">Today's delivery date</h3>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex gap-2 min-w-max">
                      {["Mon 4 Sep", "Tue 5 Sep", "Wed 6 Sep", "Thu 7 Sep", "Fri 8 Sep", "Sat 9 Sep"].map((d, i) => (
                        <button key={d} className={`flex-shrink-0 px-5 py-4 border text-center transition-all ${i === 0 ? "border-[#111111] bg-[#111111] text-white" : "border-[#D0CCC4] hover:border-[#111111] bg-white"}`}>
                          <div className="text-[12px] text-inherit opacity-60">{d.split(" ")[0]}</div>
                          <div className="font-bold text-[18px]">{d.split(" ")[1]}</div>
                          <div className="text-[11px] opacity-60">{d.split(" ")[2]}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium text-[15px] mb-4">Delivery time slot</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {SLOTS.map((s) => (
                      <button key={s} onClick={() => setSlot(s)}
                        className={`py-4 px-5 border text-left transition-all ${slot === s ? "border-[#111111] bg-[#111111] text-white" : "border-[#D0CCC4] bg-white hover:border-[#111111]"}`}>
                        <div className={`text-[13px] font-medium ${slot === s ? "text-white" : "text-[#111]"}`}>{s}</div>
                        {s === SLOTS[0] && <div className={`text-[11px] mt-1 ${slot === s ? "text-[#CDFF3A]" : "text-[#888]"}`}>Most popular</div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep("address")} className="border border-[#D0CCC4] px-6 py-3.5 text-[12px] text-[#666] hover:border-[#111] hover:text-[#111] transition-colors">← Back</button>
                  <button onClick={() => setStep("payment")} className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors">
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* ── PAYMENT ── */}
            {step === "payment" && (
              <div>
                <h2 className="font-display text-[28px] font-bold mb-8">Payment</h2>

                {/* Wallet credit */}
                <div className={`border p-5 mb-6 cursor-pointer transition-all ${useWallet ? "border-[#111111] bg-[#111111] text-white" : "border-[#D0CCC4] bg-white"}`}
                  onClick={() => setUseWallet((v) => !v)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center ${useWallet ? "bg-[#CDFF3A] border-[#CDFF3A]" : "border-[#aaa]"}`}>
                        {useWallet && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>}
                      </div>
                      <div>
                        <div className={`font-medium text-[14px] ${useWallet ? "text-white" : "text-[#111]"}`}>Apply Wallet Credit</div>
                        <div className={`text-[12px] ${useWallet ? "text-white/50" : "text-[#888]"}`}>$12.50 available</div>
                      </div>
                    </div>
                    {useWallet && <span className="text-[#CDFF3A] font-bold text-[14px]">–$12.50</span>}
                  </div>
                </div>

                {/* Card form */}
                <div className="bg-white border border-[#E5E2DA] p-7 mb-6">
                  <h3 className="font-medium text-[15px] mb-5 flex items-center gap-2">
                    <span>💳</span> Credit / Debit Card
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#666] mb-2">Card Number</label>
                      <input defaultValue="4242 4242 4242 4242" className="w-full border border-[#D0CCC4] px-4 py-3 text-[15px] font-mono outline-none focus:border-[#111] transition-colors" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#666] mb-2">Expiry (MM/YY)</label>
                        <input defaultValue="08/28" className="w-full border border-[#D0CCC4] px-4 py-3 text-[15px] font-mono outline-none focus:border-[#111] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#666] mb-2">CVC</label>
                        <input defaultValue="123" className="w-full border border-[#D0CCC4] px-4 py-3 text-[15px] font-mono outline-none focus:border-[#111] transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#666] mb-2">Name on Card</label>
                      <input defaultValue="Jerome Tan" className="w-full border border-[#D0CCC4] px-4 py-3 text-[15px] outline-none focus:border-[#111] transition-colors" />
                    </div>
                  </div>
                </div>

                {/* PayNow */}
                <div className="bg-white border border-[#E5E2DA] p-5 mb-8 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#E43B4F] rounded flex items-center justify-center text-white text-[11px] font-bold">PN</div>
                  <div>
                    <div className="font-medium text-[14px]">PayNow</div>
                    <div className="text-[#888] text-[12px]">Scan QR code at next step</div>
                  </div>
                  <button className="ml-auto border border-[#D0CCC4] px-4 py-2 text-[12px] hover:border-[#111] transition-colors">Select</button>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep("delivery")} className="border border-[#D0CCC4] px-6 py-3.5 text-[12px] text-[#666] hover:border-[#111] hover:text-[#111] transition-colors">← Back</button>
                  <button onClick={() => navigate("confirmation")} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#111111] text-white px-10 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors">
                    Place Order — ${total.toFixed(2)} →
                  </button>
                </div>
                <p className="text-[#aaa] text-[11px] mt-4 flex items-center gap-1.5">
                  🔒 Payments processed securely by Stripe
                </p>
              </div>
            )}
          </div>

          {/* Right: Order summary */}
          <div className="self-start">
            <div className="bg-white border border-[#E5E2DA] p-6">
              <h3 className="font-display text-[18px] font-bold mb-5">Order Summary</h3>
              <div className="space-y-4 mb-5">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.type}`} className="flex gap-3">
                    <img src={item.img} alt={item.name} className="w-14 h-14 object-cover shrink-0 bg-[#F0EDE8]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium leading-snug">{item.name}</p>
                      {item.planLabel && <p className="text-[11px] text-[#888] mt-0.5">{item.planLabel}</p>}
                      <p className="text-[#111] font-bold text-[13px] mt-1">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E5E2DA] pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-[13px]"><span className="text-[#888]">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-[#888]">Delivery</span><span className="text-green-600 font-medium">Free</span></div>
                {useWallet && <div className="flex justify-between text-[13px] text-green-600"><span>Wallet credit</span><span>–${walletCredit.toFixed(2)}</span></div>}
              </div>

              <div className="border-t border-[#E5E2DA] pt-4 flex justify-between items-center">
                <span className="font-bold text-[15px]">Total</span>
                <span className="font-display text-[22px] font-bold">${total.toFixed(2)}</span>
              </div>

              {!useWallet && (
                <button onClick={() => setUseWallet(true)} className="mt-4 w-full border border-[#D0CCC4] py-2.5 text-[12px] text-[#666] hover:border-[#111] hover:text-[#111] transition-colors">
                  Apply Wallet Credit ($12.50)
                </button>
              )}
            </div>

            <div className="mt-4 bg-[#F7F5F0] border border-[#E5E2DA] p-4 text-[12px] text-[#888] space-y-1.5">
              <div>🚚 Same-day delivery for orders before 12pm</div>
              <div>❄️ Meals arrive frozen and vacuum-sealed</div>
              <div>↩️ Easy returns within 7 days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
