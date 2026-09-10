import { useState } from "react";
import { Page } from "@/data";
import { MealPlanLogo, ReadySeriesLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

const MEAL_PLAN_STEPS = [
  { n: "01", label: "Choose your programme", desc: "Start with 6by60, Buddy Plan, or HYROX — then tailor your order." },
  { n: "02", label: "Build your box", desc: "Select dishes from the menu and see your order take shape." },
  { n: "03", label: "Receive fresh", desc: "Meals arrive chilled on your selected delivery day." },
];

const READY_STEPS = [
  { n: "01", label: "Pick your meals", desc: "Choose individual dishes or grab a curated bundle to stock up fast." },
  { n: "02", label: "Stock the freezer", desc: "Meals arrive frozen at peak freshness, ready to store." },
  { n: "03", label: "Heat and eat", desc: "Ready in minutes whenever you need a dependable meal." },
];

const FAQS = [
  { q: "How fresh are the Meal Plan meals?", a: "Prepared same day, delivered chilled within your selected window. We never freeze and rethaw Meal Plan orders." },
  { q: "Can I skip a week?", a: "Yes, pause up to 4 weeks at any time directly from your account dashboard." },
  { q: "What if I don't like a meal?", a: "Swap any upcoming meal up to 10pm the night before delivery. No penalties." },
  { q: "Are Ready-Series meals actually frozen at peak?", a: "Yes. Every Ready-Series meal is frozen immediately after preparation at peak nutritional freshness — not after sitting in transit." },
  { q: "Is there a contract?", a: "No. Cancel anytime, no questions asked. Your unused credits are refunded automatically." },
];

export default function HowItWorksPage({ navigate, navigateToWizard }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">

      {/* Hero */}
      <div className="max-w-[800px] mx-auto px-6 pt-20 pb-14 text-center">
        <div className="inline-block font-mono text-[10px] tracking-[0.35em] uppercase text-[#888] border border-[#D0CCC4] px-4 py-1.5 mb-6">
          How It Works
        </div>
        <h1 className="font-display text-[48px] sm:text-[58px] font-bold leading-tight mb-5 text-[#1A1A1A]">
          One standard.<br />Two clear journeys.
        </h1>
        <p className="text-[#666] text-[17px] leading-relaxed max-w-[520px] mx-auto">
          Performance Meals sets the quality standard. Meal Plan and Ready-Series then serve two different customer needs — structured progress or frozen flexibility.
        </p>
      </div>

      {/* Two-column journey split */}
      <div className="max-w-[1100px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Meal Plan */}
          <div className="bg-[#1A1A1A] text-white p-8">
            <div className="mb-6">
              <MealPlanLogo size="sm" variant="dark" />
            </div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#E85D04] mb-2">Consultative &amp; Guided</p>
            <h2 className="font-display text-[30px] font-semibold leading-tight mb-2 text-white">A clearer routine</h2>
            <p className="text-white/50 text-[14px] mb-8">Choose your structure. Keep your week moving.</p>

            <div className="flex flex-col gap-6">
              {MEAL_PLAN_STEPS.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center font-display font-bold text-[13px] text-[#1A1A1A] bg-[#E85D04]">
                    {s.n}
                  </div>
                  <div>
                    <div className="font-display text-[16px] font-semibold text-white mb-1">{s.label}</div>
                    <p className="text-white/40 text-[13px] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigateToWizard()}
              className="mt-8 w-full py-3.5 font-bold text-[12px] tracking-[0.18em] uppercase text-[#1A1A1A] transition-colors hover:opacity-90"
              style={{ backgroundColor: "#E85D04" }}
            >
              CHOOSE YOUR GOAL →
            </button>
          </div>

          {/* Ready-Series */}
          <div className="bg-white border border-[#E8E4DC] p-8">
            <div className="mb-6">
              <ReadySeriesLogo size="sm" variant="light" />
            </div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F5B300] mb-2">Transactional &amp; Fast</p>
            <h2 className="font-display text-[30px] font-bold leading-tight mb-2 text-[#1A1A1A]">Ready when you are</h2>
            <p className="text-[#666] text-[14px] mb-8">Fast, enjoyable meals that keep your week moving.</p>

            <div className="flex flex-col gap-6">
              {READY_STEPS.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center font-display font-bold text-[13px] text-[#1A1A1A] bg-[#F5B300]">
                    {s.n}
                  </div>
                  <div>
                    <div className="font-display text-[16px] font-bold text-[#1A1A1A] mb-1">{s.label}</div>
                    <p className="text-[#666] text-[13px] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("ready-series")}
              className="mt-8 w-full py-3.5 bg-[#1A1A1A] text-white font-bold text-[12px] tracking-[0.18em] uppercase hover:bg-[#F5B300] hover:text-[#1A1A1A] transition-colors"
            >
              SHOP READY-SERIES →
            </button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[720px] mx-auto px-6 pb-20">
        <h2 className="font-display text-[32px] font-bold mb-8 text-[#1A1A1A]">Frequently asked</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-[#E5E2DA]">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#FAF9F6] transition-colors"
              >
                <span className="font-medium text-[15px] text-[#1A1A1A]">{faq.q}</span>
                <span className="text-[#aaa] text-[18px] ml-4 shrink-0">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-[#666] text-[14px] leading-relaxed border-t border-[#F0EDE8] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-[#1A1A1A] py-20 px-6 text-center">
        <h2 className="font-display text-[40px] font-bold text-white mb-3">Ready to start?</h2>
        <p className="text-white/40 text-[16px] mb-8">One trusted standard — delivered through a personalised fresh-plan experience or a fast, flexible frozen-meal experience.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigateToWizard()}
            className="px-10 py-4 font-bold text-[14px] tracking-[0.15em] uppercase text-[#1A1A1A] hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#E85D04" }}
          >
            Start Your Meal Plan →
          </button>
          <button
            onClick={() => navigate("ready-series")}
            className="bg-[#F5B300] text-[#1A1A1A] px-10 py-4 font-bold text-[14px] tracking-[0.15em] uppercase hover:bg-white transition-colors"
          >
            Shop Ready-Series →
          </button>
        </div>
      </div>
    </div>
  );
}
