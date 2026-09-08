import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  orderType: "ready" | "plan";
  isGuest?: boolean;
}

export default function ConfirmationPage({ navigate, orderType, isGuest = false }: Props) {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center px-6 py-12 sm:py-20">
      <div className="max-w-[600px] w-full text-center">
        {/* Hero area with decorative confetti elements */}
        <div className="relative mb-8">
          {/* Decorative confetti circles */}
          <div className="absolute -top-4 left-8 w-4 h-4 bg-[#CDFF3A] rounded-full opacity-40" />
          <div className="absolute top-2 right-12 w-6 h-6 bg-[#F2C94C] rounded-full opacity-40" />
          <div className="absolute -top-2 right-4 w-3 h-3 bg-[#7EE8B0] opacity-40" />
          <div className="absolute top-8 left-16 w-5 h-5 bg-[#7EE8B0] rounded-full opacity-40" />
          {/* Success icon */}
          <div className="w-20 h-20 bg-[#CDFF3A] rounded-full flex items-center justify-center mx-auto">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
        </div>

        <div className="font-mono text-[10px] tracking-[0.45em] text-[#111]/35 uppercase mb-4">Order Confirmed</div>
        <h1 className="font-display text-[36px] sm:text-[48px] font-bold mb-2 leading-tight">
          Your order is confirmed!
        </h1>
        <p className="text-[#555] text-[18px] mb-4">Jerome, your meals are being prepared.</p>
        <p className="text-[#666] text-[16px] leading-relaxed mb-10">
          Your order <strong className="text-[#111] font-mono">#FRE-20250904-7842</strong> has been confirmed. You'll receive a confirmation email and SMS shortly.
        </p>

        {/* Order details */}
        <div className="bg-white border border-[#E5E2DA] p-6 text-left mb-6">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#999] uppercase mb-5">Order Details</div>
          <div className="space-y-4">
            {[
              { label: "Delivery Address", value: "123 Toa Payoh Lor 4, #08-22, S310123" },
              { label: "Delivery Time", value: "Today · 6:00am – 9:00am" },
              { label: "Estimated Arrival", value: "Monday, 4 September 2025" },
              { label: "Payment", value: "Visa ending 4242 · $58.00" },
            ].map((d) => (
              <div key={d.label} className="flex items-start justify-between gap-4">
                <span className="text-[#999] text-[13px] shrink-0">{d.label}</span>
                <span className="text-[#111] text-[13px] font-medium text-right">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery progress timeline — detailed */}
        <div className="bg-white border border-[#E5E2DA] p-6 mb-5 text-left">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#999] uppercase mb-5">Live Order Status</div>
          <div className="space-y-0">
            {[
              { label: "Order Confirmed", time: "Today · 9:04am", detail: "Payment processed · Order #FRE-20250904-7842", done: true, active: false },
              { label: "Kitchen Preparing", time: "Today · 11:00am", detail: "Our chefs are preparing your meals fresh to order", done: false, active: true },
              { label: "Quality Check", time: "Today · 1:00pm", detail: "Macro verification and packaging seal check", done: false, active: false },
              { label: "Out for Delivery", time: "Today · 2:30pm", detail: "Driver assigned · ETA within your selected time window", done: false, active: false },
              { label: "Delivered", time: "Today · 5:00pm", detail: "Meals at your door — enjoy your performance fuel!", done: false, active: false },
            ].map((s, i) => (
              <div key={s.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${s.done ? "bg-[#CDFF3A] border-[#CDFF3A]" : s.active ? "bg-[#111] border-[#111]" : "bg-white border-[#D0CCC4]"}`}>
                    {s.done ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    ) : s.active ? (
                      <div className="w-2 h-2 bg-[#CDFF3A] rounded-full animate-pulse" />
                    ) : null}
                  </div>
                  {i < 4 && <div className={`w-px flex-1 min-h-[32px] ${s.done ? "bg-[#CDFF3A]/40" : "bg-[#E5E2DA]"}`} />}
                </div>
                <div className="pb-5 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-[13px] font-semibold ${s.done || s.active ? "text-[#111]" : "text-[#aaa]"}`}>{s.label}</span>
                    <span className={`font-mono text-[11px] ${s.done ? "text-[#888]" : s.active ? "text-[#CDFF3A] bg-[#111] px-2 py-0.5" : "text-[#ccc]"}`}>{s.time}</span>
                  </div>
                  <p className={`text-[12px] mt-0.5 ${s.done || s.active ? "text-[#666]" : "text-[#ccc]"}`}>{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification channels */}
        {/* WhatsApp — always shown */}
        <div className="bg-[#075E54] text-white p-5 mb-3 text-left flex items-center gap-4">
          <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.524 5.86L.057 23.998l6.294-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.625-.48-5.15-1.322l-.369-.219-3.737.98.998-3.648-.24-.378A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-[14px]">Confirmation sent via WhatsApp</div>
            <div className="text-white/70 text-[12px] mt-0.5">Live order updates at <strong className="text-white">+65 9123 4567</strong> — reply anytime to reach us</div>
          </div>
          <div className="shrink-0 bg-[#25D366] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5">
            ✓ Sent
          </div>
        </div>
        {/* Email — always shown */}
        <div className="bg-[#0E0E0E] text-white p-5 mb-5 text-left flex items-center gap-4">
          <span className="text-[24px]">✉️</span>
          <div className="flex-1">
            <div className="font-medium text-[14px]">Confirmation also sent to your email</div>
            <div className="text-white/40 text-[12px] mt-0.5">Check <strong className="text-white/70">jerome@email.com</strong> for your {orderType === "plan" ? "full meal plan schedule and delivery windows" : "order receipt and delivery details"}</div>
          </div>
          <div className="shrink-0 text-[#CDFF3A] text-[10px] font-bold tracking-wider uppercase">
            ✓ Sent
          </div>
        </div>

        {/* Track order notice */}
        <div className="bg-[#0E0E0E] text-white p-5 mb-5 text-left flex items-center gap-4">
          <span className="text-[24px]">📦</span>
          <div>
            <div className="font-medium text-[14px]">Track your order in real time</div>
            <div className="text-white/40 text-[12px] mt-0.5">SMS updates will be sent to +65 9123 4567</div>
          </div>
        </div>

        {/* Customize Meal Plan CTA — only for plan orders */}
        {orderType === "plan" && <div className="bg-[#0D2818] border border-[#F2C94C]/30 p-5 mb-5 text-left">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#F2C94C] uppercase mb-2">Your Meal Plan is now active</div>
              <div className="font-display text-[20px] font-bold text-white mb-1">Customize your upcoming meals</div>
              <div className="text-white/40 text-[13px] leading-relaxed">
                Swap meals, change delivery days & times, adjust quantity — all from your account.
              </div>
            </div>
            <button onClick={() => navigate("account")}
              className="shrink-0 bg-[#F2C94C] text-[#111111] px-5 py-3 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors whitespace-nowrap">
              Customize →
            </button>
          </div>
        </div>}

        {/* Rewards earned — members only */}
        {!isGuest ? (
          <div className="bg-[#111111] text-white p-5 mb-8 flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#CDFF3A] uppercase mb-1">Points Earned</div>
              <div className="font-display text-[28px] font-bold text-[#CDFF3A]">+58 pts</div>
              <div className="text-white/35 text-[12px]">Added to your rewards balance</div>
            </div>
            <div className="text-right">
              <div className="text-white/35 text-[12px] mb-1">New balance</div>
              <div className="font-display text-[22px] font-bold">1,234 pts</div>
              <div className="text-white/35 text-[11px]">Worth $12.34</div>
            </div>
          </div>
        ) : (
          /* Guest — nudge to sign up */
          <div className="bg-[#111111] text-white p-5 mb-8">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#F2C94C] uppercase mb-2">You left points on the table</div>
            <div className="font-display text-[22px] font-bold mb-1">This order would've earned <span className="text-[#CDFF3A]">+58 pts</span></div>
            <p className="text-white/50 text-[13px] mb-4">Create a free account to earn points, get exclusive discounts, and track all your orders.</p>
            <button onClick={() => navigate("account")}
              className="bg-[#CDFF3A] text-[#111] px-6 py-3 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors">
              Sign Up — It's Free →
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isGuest ? (
            <button onClick={() => navigate("account")} className="inline-flex items-center justify-center gap-2 bg-[#111111] text-white px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors">
              Go to My Account →
            </button>
          ) : (
            <button onClick={() => navigate("home")} className="inline-flex items-center justify-center gap-2 bg-[#111111] text-white px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors">
              Back to Home
            </button>
          )}
          {orderType === "plan" ? (
            <button onClick={() => navigate("ready-to-go")} className="inline-flex items-center justify-center gap-2 border border-[#D0CCC4] bg-white text-[#111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:border-[#111] transition-colors">
              Browse Ready-to-Go Meals
            </button>
          ) : (
            <button onClick={() => navigate("home")} className="inline-flex items-center justify-center gap-2 border border-[#D0CCC4] bg-white text-[#111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:border-[#111] transition-colors">
              Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
