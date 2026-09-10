import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
  addToCart?: (item: any) => void;
  navigateToReferral?: () => void;
}

const testimonials = [
  { name: "Darren T.", role: "Software Engineer", text: "Lost 8kg in 10 weeks without thinking about food once. The meals actually taste like real food.", stars: 5 },
  { name: "Priya M.", role: "Marketing Lead", text: "I was sceptical about frozen meals — Ready Series changed that. Macros are spot-on every time.", stars: 5 },
  { name: "Jason K.", role: "Personal Trainer", text: "I recommend Fresher to all my clients. The Meal Plan gives them structure without obsession.", stars: 5 },
  { name: "Alicia W.", role: "Nurse", text: "Shift work makes eating well nearly impossible. Ready Series keeps me on track on 12-hour days.", stars: 5 },
  { name: "Marcus L.", role: "Entrepreneur", text: "The goal-based plans are legitimately different. My coach was impressed by how structured the approach is.", stars: 5 },
  { name: "Siti R.", role: "Accountant", text: "Been ordering for 6 months. Consistent quality, responsive support. Nothing like it in Singapore.", stars: 5 },
];

const trustPillars = [
  { icon: "🏆", label: "Trusted by athletes", sub: "8,400+ active customers across Singapore" },
  { icon: "🎯", label: "Macro accurate", sub: "Every meal tracked to the gram — no guessing" },
  { icon: "👨‍🍳", label: "Chef prepared", sub: "In-house kitchen, no outsourced production" },
  { icon: "⚡", label: "Fast delivery", sub: "Next-day island-wide delivery on all orders" },
  { icon: "⭐", label: "4.9/5 satisfaction", sub: "Verified across 3,200+ customer reviews" },
];

const steps = [
  { n: "01", label: "Choose your path", desc: "Meal Plan for structured goal-support. Ready Series for fast, flexible everyday meals." },
  { n: "02", label: "Select meals or plan", desc: "Pick from 40+ macro-tracked meals or let our wizard build your weekly plan." },
  { n: "03", label: "Receive delivery", desc: "Next-day delivery island-wide. Fresh or frozen — both arrive perfectly packaged." },
  { n: "04", label: "Perform better", desc: "Track progress, earn rewards, and reorder in one tap. Results you can see." },
];

export default function HomePage({ navigate }: Props) {
  return (
    <div className="bg-[#111111] text-white">

      {/* ── SECTION 1: SPLIT HERO ── */}
      <section className="min-h-[100svh] grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT — Ready Series */}
        <div
          className="relative flex flex-col justify-between px-8 sm:px-12 lg:px-16 py-16 lg:py-20 overflow-hidden group cursor-pointer min-h-[50svh] lg:min-h-[100svh]"
          onClick={() => navigate("ready-series")}
        >
          <div className="absolute inset-0 bg-[#0A0A0A]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(205,255,58,0.3) 60px,rgba(205,255,58,0.3) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(205,255,58,0.3) 60px,rgba(205,255,58,0.3) 61px)" }}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] bg-[#CDFF3A]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-[#CDFF3A] rounded-full" />
              <span className="text-[#CDFF3A] text-[10px] font-mono tracking-[0.35em] uppercase">by Fresher</span>
            </div>
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/30 mb-3">READY SERIES</div>
            <h1 className="font-display text-[48px] sm:text-[64px] lg:text-[68px] xl:text-[80px] font-black leading-[0.9] tracking-tight text-white mb-6 lg:mb-8">
              FROZEN<br />AT PEAK.<br /><span className="text-[#CDFF3A]">READY</span><br />ON DEMAND.
            </h1>
            <p className="text-white/50 text-[15px] sm:text-[16px] leading-relaxed max-w-[340px]">
              Macro-accurate meals ready in 3 minutes. Built for busy schedules — not built around them.
            </p>
          </div>

          <div className="relative z-10 mt-10 lg:mt-0">
            <button
              onClick={(e) => { e.stopPropagation(); navigate("ready-series"); }}
              className="inline-flex items-center gap-3 bg-[#CDFF3A] text-[#111] text-[11px] font-black tracking-[0.25em] uppercase px-8 py-4 hover:bg-white transition-colors"
            >
              Explore Ready Series
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <div className="mt-5 flex items-center gap-3 text-white/25 text-[11px] font-mono tracking-wide flex-wrap">
              <span>40+ meals</span>
              <span>·</span>
              <span>Next-day delivery</span>
              <span>·</span>
              <span>From $10.90</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Meal Plan */}
        <div
          className="relative flex flex-col justify-between px-8 sm:px-12 lg:px-16 py-16 lg:py-20 overflow-hidden group cursor-pointer min-h-[50svh] lg:min-h-[100svh] border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10"
          onClick={() => navigate("meal-plan-landing")}
        >
          <div className="absolute inset-0 bg-[#0F0F0F]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 30px,rgba(242,201,76,0.5) 30px,rgba(242,201,76,0.5) 31px)" }}
          />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] bg-[#F2C94C]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-[#F2C94C] rounded-full" />
              <span className="text-[#F2C94C] text-[10px] font-mono tracking-[0.35em] uppercase">by Fresher</span>
            </div>
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/30 mb-3">MEAL PLAN</div>
            <h1 className="font-display text-[48px] sm:text-[64px] lg:text-[68px] xl:text-[80px] font-black leading-[0.9] tracking-tight text-white mb-6 lg:mb-8">
              PLANNED<br />FOR YOUR<br /><span className="text-[#F2C94C]">GOAL.</span><br />FRESH DAILY.
            </h1>
            <p className="text-white/50 text-[15px] sm:text-[16px] leading-relaxed max-w-[340px]">
              Chef-prepared meal plans tailored to your goals. Structure, support, and real results — not another subscription.
            </p>
          </div>

          <div className="relative z-10 mt-10 lg:mt-0">
            <button
              onClick={(e) => { e.stopPropagation(); navigate("meal-plan-landing"); }}
              className="inline-flex items-center gap-3 bg-[#F2C94C] text-[#111] text-[11px] font-black tracking-[0.25em] uppercase px-8 py-4 hover:bg-white transition-colors"
            >
              Explore Meal Plans
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <div className="mt-5 flex items-center gap-3 text-white/25 text-[11px] font-mono tracking-wide flex-wrap">
              <span>CUT · MAINTAIN · BUILD</span>
              <span>·</span>
              <span>Fresh daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll cue */}
      <div className="flex flex-col items-center py-8 gap-2">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/20">Scroll to learn more</div>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* ── SECTION 2: WHY FRESHER ── */}
      <section className="py-24 px-6 sm:px-8 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-[#CDFF3A] text-[10px] font-mono tracking-[0.35em] uppercase mb-4">The Fresher Standard</div>
          <h2 className="font-display text-[40px] sm:text-[52px] font-black leading-tight">
            Why 8,400 people<br />choose Fresher<span className="text-[#CDFF3A]">.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/8">
          {trustPillars.map((p) => (
            <div key={p.label} className="bg-[#111] px-7 py-9 flex flex-col gap-4">
              <div className="text-[32px]">{p.icon}</div>
              <div>
                <div className="font-display text-[17px] font-bold text-white mb-1.5">{p.label}</div>
                <div className="text-white/40 text-[12px] leading-relaxed">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: HOW IT WORKS ── */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-block text-[#CDFF3A] text-[10px] font-mono tracking-[0.35em] uppercase mb-4">Process</div>
            <h2 className="font-display text-[40px] sm:text-[52px] font-black leading-tight">
              How Fresher works<span className="text-[#CDFF3A]">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
            {steps.map((s, i) => (
              <div key={s.n} className="bg-[#0A0A0A] px-8 py-10 relative">
                <div className="text-[#CDFF3A] text-[11px] font-mono tracking-[0.3em] mb-5">{s.n}</div>
                <div className="font-display text-[22px] font-bold text-white mb-3">{s.label}</div>
                <div className="text-white/40 text-[13px] leading-relaxed">{s.desc}</div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-10 text-white/15">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("ready-series")}
              className="flex items-center justify-between px-8 py-5 bg-[#CDFF3A] text-[#111] hover:bg-white transition-colors"
            >
              <div>
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-1">I want fast and flexible</div>
                <div className="text-[16px] font-black">Explore Ready Series →</div>
              </div>
              <span className="text-[28px]">⚡</span>
            </button>
            <button
              onClick={() => navigate("meal-plan-landing")}
              className="flex items-center justify-between px-8 py-5 border border-[#F2C94C]/30 hover:border-[#F2C94C] transition-colors"
            >
              <div>
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-1 text-[#F2C94C]">I want a structured plan</div>
                <div className="text-[16px] font-black text-white">Explore Meal Plans →</div>
              </div>
              <span className="text-[28px]">🎯</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SOCIAL PROOF ── */}
      <section className="py-24 px-6 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block text-[#CDFF3A] text-[10px] font-mono tracking-[0.35em] uppercase mb-4">Real Results</div>
            <h2 className="font-display text-[40px] sm:text-[52px] font-black leading-tight">
              What our customers<br />are saying<span className="text-[#CDFF3A]">.</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="flex">
                {[1,2,3,4,5].map((s) => <span key={s} className="text-[#CDFF3A] text-[18px]">★</span>)}
              </div>
              <span className="text-white/50 text-[13px]">4.9/5 from 3,200+ verified reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#111] px-7 py-8 flex flex-col gap-4">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => <span key={s} className="text-[#CDFF3A] text-[12px]">★</span>)}
                </div>
                <p className="text-white/70 text-[14px] leading-relaxed flex-1">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-[13px] text-white">{t.name}</div>
                  <div className="text-white/30 text-[11px]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-px grid grid-cols-3 bg-white/8">
            {[
              { n: "8,400+", l: "Active Customers" },
              { n: "60-Day", l: "Satisfaction Guarantee" },
              { n: "4.9/5", l: "Average Rating" },
            ].map((s) => (
              <div key={s.l} className="bg-[#111] px-6 py-8 text-center">
                <div className="font-display text-[36px] font-black text-[#CDFF3A]">{s.n}</div>
                <div className="text-white/40 text-[11px] tracking-wide mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: REWARDS PROGRAM ── */}
      <section className="py-24 bg-[#0A0A0A] px-6 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-block text-[#CDFF3A] text-[10px] font-mono tracking-[0.35em] uppercase mb-5">Fresher Rewards</div>
              <h2 className="font-display text-[40px] sm:text-[52px] font-black leading-tight mb-5">
                Eat well.<br />Earn points.<br /><span className="text-[#CDFF3A]">Get rewarded.</span>
              </h2>
              <p className="text-white/50 text-[15px] leading-relaxed mb-8">
                Every order earns Fresher Points. Redeem them as wallet credits, unlock VIP tiers, and refer friends for bonus rewards.
              </p>
              <button
                onClick={() => navigate("account")}
                className="inline-flex items-center gap-3 bg-[#CDFF3A] text-[#111] text-[11px] font-black tracking-[0.25em] uppercase px-8 py-4 hover:bg-white transition-colors"
              >
                View My Rewards →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/8">
              {[
                { icon: "🪙", n: "1pt", l: "per $1 spent", sub: "On every order, every time" },
                { icon: "🎁", n: "$5", l: "signup bonus", sub: "Credited on first order" },
                { icon: "👥", n: "$10", l: "per referral", sub: "Paid when friend orders" },
                { icon: "👑", n: "VIP", l: "tier upgrades", sub: "Unlock at 500, 1000, 2500 pts" },
              ].map((r) => (
                <div key={r.l} className="bg-[#0A0A0A] px-6 py-7">
                  <div className="text-[26px] mb-3">{r.icon}</div>
                  <div className="font-display text-[24px] font-black text-[#CDFF3A]">{r.n}</div>
                  <div className="text-white text-[12px] font-semibold">{r.l}</div>
                  <div className="text-white/30 text-[11px] mt-1">{r.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FINAL CTA ── */}
      <section className="py-24 px-6 sm:px-8 border-t border-white/8">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="inline-block text-[#CDFF3A] text-[10px] font-mono tracking-[0.35em] uppercase mb-6">Get Started Today</div>
          <h2 className="font-display text-[48px] sm:text-[64px] font-black leading-[0.9] mb-6">
            Choose your<br />experience<span className="text-[#CDFF3A]">.</span>
          </h2>
          <p className="text-white/40 text-[16px] mb-14 max-w-[480px] mx-auto">
            Both paths lead to better nutrition. Pick the one that fits how you live.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[600px] mx-auto">
            <button
              onClick={() => navigate("ready-series")}
              className="flex flex-col items-center gap-4 px-8 py-10 bg-[#CDFF3A] text-[#111] hover:bg-white transition-colors"
            >
              <span className="text-[40px]">⚡</span>
              <div>
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2 opacity-60">Fast and flexible</div>
                <div className="text-[20px] font-black">Ready Series</div>
                <div className="text-[12px] mt-1 opacity-60">Frozen at peak. Ready on demand.</div>
              </div>
            </button>
            <button
              onClick={() => navigate("meal-plan-landing")}
              className="flex flex-col items-center gap-4 px-8 py-10 border border-[#F2C94C]/40 hover:border-[#F2C94C] hover:bg-[#F2C94C]/5 transition-colors"
            >
              <span className="text-[40px]">🎯</span>
              <div>
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2 text-[#F2C94C]">Structured and personal</div>
                <div className="text-[20px] font-black text-white">Meal Plans</div>
                <div className="text-[12px] mt-1 text-white/40">Planned for your goal. Delivered fresh.</div>
              </div>
            </button>
          </div>
          <div className="mt-12 text-white/20 text-[11px] font-mono tracking-[0.2em] leading-loose">
            FREE DELIVERY ABOVE $80 &nbsp;·&nbsp; 60-DAY GUARANTEE &nbsp;·&nbsp; ISLAND-WIDE SINGAPORE
          </div>
        </div>
      </section>
    </div>
  );
}
