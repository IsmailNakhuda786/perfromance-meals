import { useState } from "react";
import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

const STEPS = [
  {
    n: 1,
    title: "Choose your goal",
    body: "CUT, MAINTAIN, or BUILD. We calibrate your macros based on your target and lifestyle.",
  },
  {
    n: 2,
    title: "Pick your meals",
    body: "Browse our rotating menu and select your favourites. New options added every week.",
  },
  {
    n: 3,
    title: "Set delivery",
    body: "Choose days and time. We deliver fresh before you wake up — chilled and ready to eat.",
  },
  {
    n: 4,
    title: "Track & adjust",
    body: "Log in anytime to swap meals, pause, or change your plan. No commitment needed.",
  },
];

const FAQS = [
  {
    q: "How fresh are the meals?",
    a: "Prepared same day, delivered within 6 hours of packaging. We never freeze and rethaw.",
  },
  {
    q: "Can I skip a week?",
    a: "Yes, pause up to 4 weeks at any time directly from your account dashboard.",
  },
  {
    q: "What if I don't like a meal?",
    a: "Swap any upcoming meal up to 10pm the night before delivery. No penalties.",
  },
  {
    q: "Is there a contract?",
    a: "No. Cancel anytime, no questions asked. Your unused credits are refunded automatically.",
  },
];

export default function HowItWorksPage({ navigate, navigateToWizard }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Hero */}
      <div className="max-w-[720px] mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block font-mono text-[10px] tracking-[0.35em] uppercase text-[#888] border border-[#D0CCC4] px-4 py-1.5 mb-6">
          How It Works
        </div>
        <h1 className="font-display text-[52px] font-bold leading-tight mb-5">
          Fresh meals,<br />zero effort.
        </h1>
        <p className="text-[#666] text-[17px] leading-relaxed max-w-[520px] mx-auto">
          Fresher delivers chef-prepared, macro-accurate meals to your door daily. Here's how it all comes together.
        </p>
      </div>

      {/* 4-step process */}
      <div className="max-w-[900px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {STEPS.map((step) => (
            <div key={step.n} className="bg-white border border-[#E5E2DA] p-7">
              <div className="w-10 h-10 bg-[#CDFF3A] flex items-center justify-center font-display font-bold text-[18px] text-[#111] mb-5">
                {step.n}
              </div>
              <h3 className="font-display text-[20px] font-bold mb-2">{step.title}</h3>
              <p className="text-[#666] text-[14px] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[720px] mx-auto px-6 pb-20">
        <h2 className="font-display text-[32px] font-bold mb-8">Frequently asked</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-[#E5E2DA]">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#F7F5F0] transition-colors"
              >
                <span className="font-medium text-[15px]">{faq.q}</span>
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
      <div className="bg-[#111111] py-20 px-6 text-center">
        <h2 className="font-display text-[40px] font-bold text-white mb-3">Ready to start?</h2>
        <p className="text-white/40 text-[16px] mb-8">Join thousands already eating smarter.</p>
        <button
          onClick={() => navigateToWizard()}
          className="bg-[#CDFF3A] text-[#111] px-10 py-4 font-bold text-[14px] tracking-[0.15em] uppercase hover:bg-white transition-colors"
        >
          Get My Plan →
        </button>
      </div>
    </div>
  );
}
