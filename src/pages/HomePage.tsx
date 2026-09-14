import { useState } from "react";
import { Page } from "@/data";
import { PerformanceMealsLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard?: (plan?: string) => void;
}

const MILESTONES = [
  { year: "2019", event: "Founded in Singapore by athletes who couldn't find food that actually fit their training." },
  { year: "2021", event: "Launched the Meal Plan subscription — the first goal-led meal service in SG with personal check-ins." },
  { year: "2022", event: "Ready Series launched for customers who wanted clean food without the commitment." },
  { year: "2024", event: "8,400+ active customers. 40+ macro-tracked meals. Still made fresh daily." },
];

const PILLARS = [
  {
    n: "01",
    title: "Performance-first nutrition",
    desc: "Every meal is built around macros that actually support training — not just calories in, calories out. We engineered the food we wanted to eat ourselves.",
  },
  {
    n: "02",
    title: "Real food, no shortcuts",
    desc: "Prepared daily in our Singapore kitchen. No preservatives, no shortcuts. Delivered fresh the next morning before 10am.",
  },
  {
    n: "03",
    title: "Boutique at scale",
    desc: "We still answer messages personally. Every Meal Plan customer gets regular check-ins. We've stayed small enough to care.",
  },
  {
    n: "04",
    title: "Two clear paths, one standard",
    desc: "Ready Series for everyday momentum. Meal Plan for structured, goal-led progress. The same kitchen, the same quality — however your life works best.",
  },
];

const TESTIMONIALS = [
  { name: "Jonathan C.", role: "6by60 programme · 12 weeks", text: "Down 9kg. The check-ins made the difference — it felt like having a coach, not just a meal service.", stars: 5 },
  { name: "Mei Lin T.", role: "Meal Plan · 6 months", text: "Finally stopped guessing what to eat. The meals fit my training schedule and I actually look forward to them.", stars: 5 },
  { name: "Ravi S.", role: "Ready Series customer", text: "I travel a lot. Stocking the freezer with Ready Series means I never fall off when life gets chaotic.", stars: 5 },
];

export default function HomePage({ navigate, navigateToWizard }: Props) {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);

  return (
    <div className="bg-[#1A1A1A] text-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[90svh] flex flex-col justify-center">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#F5B300 1px,transparent 1px),linear-gradient(90deg,#F5B300 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        {/* Yellow glow top-right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#F5B300]/6 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 py-24 sm:py-32">
          <div className="mb-10">
            <PerformanceMealsLogo size="lg" variant="dark" />
          </div>

          <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-[#F5B300] mb-5">Singapore · Est. 2019</p>

          <h1 className="font-display text-[52px] sm:text-[72px] lg:text-[88px] font-extrabold leading-[0.9] mb-8 max-w-[820px]">
            Nutrition that<br />
            <span className="text-[#F5B300]">works.</span>
          </h1>

          <p className="text-white/50 text-[17px] sm:text-[19px] leading-relaxed max-w-[560px] mb-12">
            We built the food we couldn't find — performance-grade meals made fresh daily,
            designed around the way serious people actually train and live.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-white/10 mb-12">
            {[
              { v: "8,400+", l: "Active customers" },
              { v: "4.9 / 5", l: "Average rating" },
              { v: "40+", l: "Macro-tracked meals" },
              { v: "Since 2019", l: "Made fresh daily" },
            ].map((s, i) => (
              <div key={i} className="p-5 border-r border-b sm:border-b-0 border-white/10 last:border-r-0">
                <div className="font-display text-[28px] font-extrabold text-[#F5B300] leading-none">{s.v}</div>
                <div className="text-white/35 text-[11px] mt-1 font-mono uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Two paths CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate("ready-series")}
              className="flex-1 sm:flex-none inline-flex items-center justify-between gap-3 px-8 py-5 bg-[#F5B300] text-[#111] font-bold text-[12px] tracking-[0.18em] uppercase hover:bg-white transition-colors">
              <span>Browse Ready Series</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button onClick={() => navigate("meal-plan-landing")}
              className="flex-1 sm:flex-none inline-flex items-center justify-between gap-3 px-8 py-5 border border-white/20 text-white/60 font-bold text-[12px] tracking-[0.18em] uppercase hover:border-[#E85D04] hover:text-white transition-colors">
              <span>Explore Meal Plans</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="bg-white text-[#1A1A1A] py-20 sm:py-28 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-4">Who we are</p>
              <h2 className="font-display text-[38px] sm:text-[52px] font-extrabold leading-[0.95] text-[#1A1A1A] mb-8">
                We built the food<br />we couldn't find.
              </h2>
              <div className="space-y-5 text-[#555] text-[15px] leading-relaxed">
                <p>
                  Performance Meals started because the founders — competitive athletes training in Singapore — couldn't find food
                  that actually supported what they were doing. Everything was either too expensive, nutritionally vague, or
                  just plain bad.
                </p>
                <p>
                  So they built it themselves. A kitchen focused entirely on performance nutrition — fresh, macro-tracked,
                  chef-prepared meals made for people who take their health seriously but still have a life to live.
                </p>
                <p>
                  Today we serve over 8,400 active customers across Singapore. We've stayed close to our original promise:
                  honest food, personal service, real results.
                </p>
              </div>
            </div>

            {/* Milestones timeline */}
            <div className="border-l-2 border-[#F5B300] pl-8 space-y-0">
              <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#aaa] mb-6">Our story</div>
              {MILESTONES.map((m, i) => (
                <div key={i}
                  className="relative pb-8 last:pb-0 cursor-pointer group"
                  onClick={() => setExpandedMilestone(expandedMilestone === i ? null : i)}>
                  <div className="absolute -left-[41px] top-1 w-3 h-3 bg-[#F5B300]" />
                  <div className="font-mono text-[13px] font-bold text-[#F5B300] mb-1">{m.year}</div>
                  <p className={`text-[14px] leading-relaxed transition-colors ${expandedMilestone === i ? "text-[#1A1A1A]" : "text-[#888] group-hover:text-[#555]"}`}>
                    {m.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE CHANGED THE GAME ── */}
      <section className="py-20 sm:py-28 bg-[#F7F5F0]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="mb-14">
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-3">What makes us different</p>
            <h2 className="font-display text-[38px] sm:text-[52px] font-extrabold text-[#1A1A1A] leading-[0.95]">
              We changed what<br />
              <span style={{ color: "#E85D04" }}>meal prep</span> looks like in Singapore.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[#E8E4DC]">
            {PILLARS.map((p, i) => (
              <div key={i} className="p-8 border-b border-r border-[#E8E4DC] [&:nth-child(even)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0">
                <div className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#aaa] mb-4">{p.n}</div>
                <h3 className="font-display text-[20px] font-bold text-[#1A1A1A] mb-3">{p.title}</h3>
                <p className="text-[#666] text-[14px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 sm:py-28 bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="mb-12">
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-3">Real results</p>
            <h2 className="font-display text-[38px] font-extrabold text-white leading-tight">What our customers say.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-0">
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j} className="text-[#F5B300] text-[14px]">★</span>
                  ))}
                </div>
                <p className="text-white/60 text-[14px] leading-relaxed italic mb-6">"{t.text}"</p>
                <div className="font-semibold text-white text-[13px]">{t.name}</div>
                <div className="text-white/30 text-[11px] mt-0.5 font-mono">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TWO PATHS ── */}
      <section className="bg-[#111] border-t border-white/8 py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#F5B300] mb-3">Ready to start?</p>
            <h2 className="font-display text-[38px] sm:text-[52px] font-extrabold text-white leading-[0.95]">Two ways to eat well.</h2>
            <p className="text-white/35 text-[15px] mt-3 max-w-[480px] mx-auto">Same kitchen. Same quality. Choose the format that fits your life.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Ready Series */}
            <div className="bg-[#1A1A1A] border border-white/10 p-10 flex flex-col group hover:border-[#F5B300]/30 transition-colors">
              <div className="w-8 h-[3px] bg-[#F5B300] mb-8" />
              <div className="font-display text-[10px] font-extrabold tracking-[0.35em] uppercase text-[#F5B300] mb-3">Ready Series</div>
              <h3 className="font-display text-[32px] font-extrabold text-white leading-tight mb-4">
                Individual meals.<br />No commitment.
              </h3>
              <p className="text-white/45 text-[14px] leading-relaxed mb-8 flex-1">
                40+ frozen meals, fresh-made and flash-frozen. Order what you want, when you want.
                Build a box for volume pricing. No subscription required.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["From $8.90/meal", "40+ options", "3-min prep", "Bundles available"].map((t) => (
                  <span key={t} className="text-[10px] border border-white/12 px-3 py-1.5 text-white/35 font-mono">{t}</span>
                ))}
              </div>
              <button onClick={() => navigate("ready-series")}
                className="w-full py-4 bg-[#F5B300] text-[#111] font-extrabold text-[12px] tracking-[0.2em] uppercase hover:bg-white transition-colors">
                Shop Ready Series →
              </button>
            </div>

            {/* Meal Plan */}
            <div className="bg-white border border-[#E8E4DC] p-10 flex flex-col group hover:border-[#E85D04]/30 transition-colors">
              <div className="w-8 h-[3px] mb-8" style={{ backgroundColor: "#E85D04" }} />
              <div className="font-display text-[10px] font-extrabold tracking-[0.35em] uppercase mb-3" style={{ color: "#E85D04" }}>Meal Plan</div>
              <h3 className="font-display text-[32px] font-extrabold text-[#1A1A1A] leading-tight mb-4">
                Goal-led. Personal.<br />Structured.
              </h3>
              <p className="text-[#666] text-[14px] leading-relaxed mb-8 flex-1">
                CUT, MAINTAIN, or BUILD. A plan built around your goal, with real support and weekly check-ins.
                6by60, Buddy Plan, or HYROX programmes.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["CUT · MAINTAIN · BUILD", "6by60 · Buddy Plan · HYROX", "Personal check-ins", "Fresh daily"].map((t) => (
                  <span key={t} className="text-[10px] border border-[#E8E4DC] bg-[#FAF9F6] px-3 py-1.5 text-[#888] font-mono">{t}</span>
                ))}
              </div>
              <button onClick={() => navigate("meal-plan-landing")}
                className="w-full py-4 font-extrabold text-[12px] tracking-[0.2em] uppercase text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#E85D04" }}>
                Explore Meal Plans →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND FOOTER STRIP ── */}
      <section className="bg-[#0E0E0E] border-t border-white/6 py-12 px-6 sm:px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <PerformanceMealsLogo size="sm" variant="dark" />
            <span className="text-white/20 text-[12px] font-mono">performancemeals.com.sg</span>
          </div>
          <div className="flex gap-6 text-[11px] font-mono tracking-widest uppercase text-white/25">
            <button onClick={() => navigate("about")} className="hover:text-white/60 transition-colors">About</button>
            <button onClick={() => navigate("how-it-works")} className="hover:text-white/60 transition-colors">How It Works</button>
            <button onClick={() => navigate("ready-series")} className="hover:text-white/60 transition-colors">Ready Series</button>
            <button onClick={() => navigate("meal-plan-landing")} className="hover:text-white/60 transition-colors">Meal Plan</button>
          </div>
        </div>
      </section>

    </div>
  );
}
