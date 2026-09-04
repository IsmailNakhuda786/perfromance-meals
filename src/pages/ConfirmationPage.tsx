import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  orderType: "ready" | "plan";
}

export default function ConfirmationPage({ navigate, orderType }: Props) {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center px-6 py-20">
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
        <h1 className="font-display text-[48px] font-bold mb-2 leading-tight">
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

        {/* Delivery progress timeline */}
        <div className="bg-white border border-[#E5E2DA] px-6 py-5 mb-5">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-3 h-px bg-[#E5E2DA] z-0" />
            {["Confirmed", "Preparing", "Out for Delivery", "Delivered"].map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1.5 z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${i === 0 ? "bg-[#CDFF3A] border-[#CDFF3A]" : "bg-white border-[#D0CCC4]"}`}>
                  {i === 0 && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>}
                </div>
                <span className={`text-[10px] font-mono tracking-wide ${i === 0 ? "text-[#111] font-bold" : "text-[#aaa]"}`}>{label}</span>
              </div>
            ))}
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

        {/* Rewards earned */}
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate("account")} className="inline-flex items-center justify-center gap-2 bg-[#111111] text-white px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors">
            Go to My Account →
          </button>
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
