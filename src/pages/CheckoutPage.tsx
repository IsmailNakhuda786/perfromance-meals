import { useState } from "react";
import { CartItem, Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  cart: CartItem[];
}

const DATES = ["Mon 4", "Tue 5", "Wed 6", "Thu 7", "Fri 8", "Sat 9"];
const SLOTS = ["6am – 9am", "9am – 12pm", "12pm – 3pm", "3pm – 6pm"];

export default function CheckoutPage({ navigate, cart }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [date, setDate] = useState(DATES[0]);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [useWallet, setUseWallet] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = Math.max(0, subtotal - (useWallet ? 12.5 : 0));

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col">
      {/* Minimal nav */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E2DA]">
        <button onClick={() => navigate("home")} className="font-display text-[20px] font-bold text-[#111]">
          FRESHER<span className="text-[#CDFF3A]">.</span>
        </button>
        <div className="flex items-center gap-2">
          {[1, 2].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${step === n ? "bg-[#111] text-white" : step > n ? "bg-[#CDFF3A] text-[#111]" : "bg-[#E5E2DA] text-[#aaa]"}`}>
                {step > n ? "✓" : n}
              </div>
              {n < 2 && <div className={`w-8 h-px ${step > n ? "bg-[#CDFF3A]" : "bg-[#E5E2DA]"}`} />}
            </div>
          ))}
        </div>
        <button onClick={() => step > 1 ? setStep(1) : navigate("ready-to-go")} className="text-[#aaa] hover:text-[#111] text-[13px] transition-colors">
          {step > 1 ? "← Back" : "✕"}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5">
        {/* Left: form */}
        <div className="lg:col-span-3 px-6 py-10 max-w-[580px] mx-auto w-full lg:mx-0 lg:ml-auto">

          {/* ── STEP 1: DELIVERY ── */}
          {step === 1 && (
            <div>
              <h1 className="font-display text-[32px] font-bold mb-8">Delivery</h1>

              {/* Address — 4 fields only */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <input placeholder="Full name" defaultValue="Jerome Tan"
                  className="col-span-2 sm:col-span-1 border border-[#D0CCC4] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#111] transition-colors" />
                <input placeholder="Phone" defaultValue="+65 9123 4567"
                  className="col-span-2 sm:col-span-1 border border-[#D0CCC4] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#111] transition-colors" />
                <input placeholder="Street address + unit" defaultValue="123 Toa Payoh Lor 4, #08-22"
                  className="col-span-2 border border-[#D0CCC4] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#111] transition-colors" />
                <input placeholder="Postal code" defaultValue="310123"
                  className="border border-[#D0CCC4] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#111] transition-colors" />
                <input placeholder="Delivery note (optional)"
                  className="border border-[#D0CCC4] bg-white px-4 py-3 text-[14px] text-[#aaa] outline-none focus:border-[#111] transition-colors" />
              </div>

              {/* Date */}
              <div className="mb-6">
                <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-3">Delivery Date</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {DATES.map((d) => (
                    <button key={d} onClick={() => setDate(d)}
                      className={`shrink-0 px-5 py-3 border text-center transition-all ${date === d ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] bg-white hover:border-[#111]"}`}>
                      <div className={`text-[11px] ${date === d ? "text-white/50" : "text-[#aaa]"}`}>{d.split(" ")[0]}</div>
                      <div className="font-bold text-[18px] leading-tight">{d.split(" ")[1]}</div>
                      <div className={`text-[10px] mt-0.5 ${date === d ? "text-[#CDFF3A]" : "text-[#ccc]"}`}>Sep</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot */}
              <div className="mb-10">
                <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-3">Time Slot</p>
                <div className="grid grid-cols-2 gap-2">
                  {SLOTS.map((s) => (
                    <button key={s} onClick={() => setSlot(s)}
                      className={`py-3 text-[13px] border transition-all ${slot === s ? "bg-[#111] text-white border-[#111]" : "border-[#D0CCC4] bg-white hover:border-[#111] text-[#333]"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setStep(2)}
                className="w-full bg-[#111111] text-white py-4 text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">
                Continue to Payment →
              </button>
            </div>
          )}

          {/* ── STEP 2: PAYMENT ── */}
          {step === 2 && (
            <div>
              <h1 className="font-display text-[32px] font-bold mb-8">Payment</h1>

              {/* Delivery recap — tap to edit */}
              <button onClick={() => setStep(1)}
                className="w-full flex items-center justify-between bg-white border border-[#E5E2DA] px-4 py-3 mb-6 hover:border-[#111] transition-colors group">
                <div className="text-left">
                  <div className="text-[12px] text-[#888]">Delivering to</div>
                  <div className="text-[14px] font-medium text-[#111]">123 Toa Payoh Lor 4, #08-22 · {date} Sep · {slot}</div>
                </div>
                <span className="text-[12px] text-[#888] group-hover:text-[#111] transition-colors">Edit</span>
              </button>

              {/* Wallet toggle */}
              {true && (
                <button onClick={() => setUseWallet((v) => !v)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 border mb-5 transition-all ${useWallet ? "bg-[#111] text-white border-[#111]" : "bg-white border-[#E5E2DA] hover:border-[#111]"}`}>
                  <div className="flex items-center gap-2.5 text-left">
                    <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center shrink-0 ${useWallet ? "bg-[#CDFF3A] border-[#CDFF3A]" : "border-[#ccc]"}`}>
                      {useWallet && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>}
                    </div>
                    <span className={`text-[13px] ${useWallet ? "text-white" : "text-[#333]"}`}>Apply wallet credit</span>
                  </div>
                  <span className={`font-mono text-[13px] font-bold ${useWallet ? "text-[#CDFF3A]" : "text-[#888]"}`}>
                    {useWallet ? "–$12.50" : "$12.50 available"}
                  </span>
                </button>
              )}

              {/* Card fields */}
              <div className="space-y-3 mb-6">
                <input placeholder="Card number" defaultValue="4242 4242 4242 4242"
                  className="w-full border border-[#D0CCC4] bg-white px-4 py-3.5 text-[14px] font-mono outline-none focus:border-[#111] transition-colors" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM / YY" defaultValue="08 / 28"
                    className="border border-[#D0CCC4] bg-white px-4 py-3.5 text-[14px] font-mono outline-none focus:border-[#111] transition-colors" />
                  <input placeholder="CVC"
                    className="border border-[#D0CCC4] bg-white px-4 py-3.5 text-[14px] font-mono outline-none focus:border-[#111] transition-colors" />
                </div>
              </div>

              {/* PayNow */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-[#E5E2DA]" />
                <span className="text-[#ccc] text-[11px]">or</span>
                <div className="flex-1 h-px bg-[#E5E2DA]" />
              </div>
              <button className="w-full border border-[#D0CCC4] bg-white py-3.5 text-[13px] text-[#888] hover:border-[#111] hover:text-[#111] transition-colors mb-8 flex items-center justify-center gap-1.5">
                <span className="font-bold text-[#E43B4F]">Pay</span>Now
              </button>

              <button onClick={() => navigate("confirmation")}
                className="w-full bg-[#111111] text-white py-4 text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors">
                Place Order — ${total.toFixed(2)}
              </button>
              <p className="text-[#ccc] text-[11px] text-center mt-3">🔒 Stripe · Free returns within 7 days</p>
            </div>
          )}
        </div>

        {/* Right: order summary — sticky */}
        <div className="hidden lg:block lg:col-span-2 bg-white border-l border-[#E5E2DA]">
          <div className="sticky top-0 p-8">
            <h3 className="font-display text-[18px] font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.type}`} className="flex gap-3">
                  <div className="relative shrink-0">
                    <img src={item.img} alt={item.name} className="w-14 h-14 object-cover bg-[#F0EDE8]" />
                    <span className="absolute -top-1.5 -right-1.5 bg-[#111] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium leading-snug">{item.name}</p>
                    {item.planLabel && <p className="text-[11px] text-[#888] mt-0.5">{item.planLabel}</p>}
                    <p className="font-bold text-[13px] mt-1">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5E2DA] pt-4 space-y-2 text-[13px]">
              <div className="flex justify-between"><span className="text-[#888]">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-[#888]">Delivery</span><span className="text-green-600 font-medium">Free</span></div>
              {useWallet && <div className="flex justify-between text-green-600"><span>Wallet credit</span><span>–$12.50</span></div>}
            </div>
            <div className="border-t border-[#E5E2DA] pt-4 mt-2 flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="font-display text-[22px] font-bold">${total.toFixed(2)}</span>
            </div>

            <div className="mt-6 space-y-2 text-[12px] text-[#aaa]">
              <div>🚚 Same-day delivery for orders before 12pm</div>
              <div>❄️ Meals arrive frozen and vacuum-sealed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
