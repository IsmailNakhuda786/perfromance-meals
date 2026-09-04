import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
}

export default function ConfirmationPage({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-[600px] w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-[#CDFF3A] rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <div className="font-mono text-[10px] tracking-[0.45em] text-[#111]/35 uppercase mb-4">Order Confirmed</div>
        <h1 className="font-display text-[48px] font-bold mb-4 leading-tight">
          You're all set,<br />Jerome.
        </h1>
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

        {/* Track order notice */}
        <div className="bg-[#0E0E0E] text-white p-5 mb-8 text-left flex items-center gap-4">
          <span className="text-[24px]">📦</span>
          <div>
            <div className="font-medium text-[14px]">Track your order in real time</div>
            <div className="text-white/40 text-[12px] mt-0.5">SMS updates will be sent to +65 9123 4567</div>
          </div>
        </div>

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
            View My Account →
          </button>
          <button onClick={() => navigate("ready-to-go")} className="inline-flex items-center justify-center gap-2 border border-[#D0CCC4] bg-white text-[#111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:border-[#111] transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
