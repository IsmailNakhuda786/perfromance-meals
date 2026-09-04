import { CartItem, Page, PLANS } from "@/data";

interface HomePageProps {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
}

const TESTIMONIALS = [
  { name: "Marcus T.", role: "Competitive Swimmer", text: "Been on Fresher for 6 months. My body composition has changed more in this period than the previous 2 years of training. The macros are genuinely accurate — every batch.", rating: 5, plan: "Meal Plan — Build" },
  { name: "Sarah L.", role: "Working Mum of Two", text: "Ready-to-Go meals have saved my week, every week. I grab 10 on Monday and I'm sorted. The low carb options taste far better than anything I would cook myself.", rating: 5, plan: "Ready Series" },
  { name: "Ryan K.", role: "CrossFit Athlete", text: "I run strict meal timing protocols and Fresher's USDA-standard macro labelling is the only brand I trust blindly. Consistency across every single batch.", rating: 5, plan: "Meal Plan — Maintain" },
];

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <div className="bg-[#F7F5F0]">
      {/* ── HERO — SPLIT PANEL ── */}
      <section className="h-[calc(100vh-84px)] grid grid-cols-1 md:grid-cols-2">
        <div className="relative overflow-hidden cursor-pointer group" onClick={() => navigate("ready-to-go")}>
          <img src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=1000&h=1100&fit=crop&auto=format" alt="Ready-to-Go meals" className="absolute inset-0 w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/25 group-hover:via-[#111111]/55 transition-all duration-500" />
          <div className="relative h-full flex flex-col justify-between p-10 lg:p-14 text-white">
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#CDFF3A] uppercase">01 / READY SERIES</span>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-5">Fresher Performance Meals</p>
              <h1 className="font-display text-[52px] lg:text-[68px] font-bold leading-[0.88] mb-7">
                Heat.<br /><span className="text-[#CDFF3A]">Eat.</span><br />Perform.
              </h1>
              <p className="text-white/60 text-[15px] max-w-[300px] mb-9 leading-relaxed">Macro-accurate frozen meals, ready in 3 minutes. No prep. No guesswork. Pure performance fuel.</p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("ready-to-go"); }}
                  className="inline-flex items-center gap-2.5 bg-[#CDFF3A] text-[#111111] px-7 py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors"
                >
                  Shop Meals →
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("build-a-box"); }}
                  className="text-white/60 text-[12px] border border-white/20 px-5 py-3.5 hover:border-[#CDFF3A] hover:text-[#CDFF3A] transition-colors"
                >
                  Build-A-Box
                </button>
              </div>
              <div className="flex flex-wrap gap-x-6 mt-10 text-[11px] text-white/30 tracking-wider">
                <span>Same-day delivery</span><span>·</span><span>2-month freezer life</span><span>·</span><span>USDA standards</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden cursor-pointer group" onClick={() => navigate("meal-plan-wizard")}>
          <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&h=1100&fit=crop&auto=format" alt="Meal Plans fresh bowl" className="absolute inset-0 w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2818] via-[#0D2818]/75 to-[#0D2818]/30 group-hover:via-[#0D2818]/58 transition-all duration-500" />
          <div className="relative h-full flex flex-col justify-between p-10 lg:p-14 text-white">
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#F2C94C] uppercase">02 / MEAL PLANS</span>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-5">Fresher Performance Meals</p>
              <h1 className="font-display text-[52px] lg:text-[68px] font-bold leading-[0.88] mb-7">
                Your goal.<br /><span className="text-[#F2C94C]">Your</span><br />macros.
              </h1>
              <p className="text-white/60 text-[15px] max-w-[300px] mb-9 leading-relaxed">Chef-prepared fresh meals delivered daily, calibrated to your caloric target. Cut, Maintain, or Build.</p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("meal-plan-wizard"); }}
                  className="inline-flex items-center gap-2.5 bg-[#F2C94C] text-[#111111] px-7 py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors"
                >
                  Get My Plan →
                </button>
              </div>
              <div className="flex flex-wrap gap-x-6 mt-10 text-[11px] text-white/30 tracking-wider">
                <span>Delivered fresh daily</span><span>·</span><span>Chef-prepared</span><span>·</span><span>Trainer-approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-[#0E0E0E] border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {[
            { icon: "🏛", label: "USDA Nutritional Standards" },
            { icon: "⚡", label: "Same-Day Delivery" },
            { icon: "❄️", label: "2-Month Freezer Life" },
            { icon: "🏋", label: "Trainer-Approved Macros" },
            { icon: "⭐", label: "4.8 · 2,400+ Reviews" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2.5 text-[11px] text-white/40 tracking-[0.15em] uppercase">
              <span className="text-[15px]">{t.icon}</span><span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Plans preview strip */}
      <section className="bg-[#0D2818] text-white py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#F2C94C] uppercase">02 / Meal Plans</span>
            <div className="h-px w-16 bg-[#F2C94C]/25" />
          </div>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
            <h2 className="font-display text-[52px] font-bold leading-none">Your goal.<br />Your macros.</h2>
            <p className="text-white/45 max-w-md text-[15px] leading-relaxed mt-2">
              Three plans. Every calorie calculated. Fresh meals delivered to your door every morning — chef-prepared, macro-labelled.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {PLANS.map((plan) => (
              <div key={plan.name} className="border border-white/10 p-7 hover:border-white/25 transition-colors cursor-pointer" onClick={() => navigate("meal-plan-wizard")}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: plan.accent }}>{plan.name}</span>
                    <div className="font-display text-[36px] font-bold mt-1">{plan.cal}<span className="text-[16px] font-normal text-white/35"> kcal/day</span></div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-[28px] font-bold" style={{ color: plan.accent }}>${plan.priceWeek}</div>
                    <div className="text-white/35 text-[11px]">/week</div>
                  </div>
                </div>
                <p className="text-white/40 text-[13px] leading-relaxed mb-4">{plan.desc}</p>
                <div className="text-[11px] text-white/25">{plan.meals} meals per day · Fresh daily delivery</div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("meal-plan-wizard")} className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#111111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
            Start Meal Plan Wizard →
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F7F5F0] py-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#111111]/35 uppercase">Client Results</span>
            <div className="h-px w-16 bg-[#111111]/15" />
          </div>
          <h2 className="font-display text-[52px] font-bold mb-14 leading-none">What our<br />members say.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white p-8 border border-[#E5E2DA]">
                <div className="text-[#CDFF3A] text-[16px] mb-5">{"★".repeat(t.rating)}</div>
                <p className="text-[#333] text-[15px] leading-relaxed mb-7">"{t.text}"</p>
                <div className="border-t border-[#E5E2DA] pt-5 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-[14px]">{t.name}</div>
                    <div className="text-[#999] text-[12px] mt-0.5">{t.role}</div>
                  </div>
                  <span className={`text-[10px] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 whitespace-nowrap ${t.plan.includes("Ready") ? "bg-[#111111] text-[#CDFF3A]" : "bg-[#0D2818] text-[#F2C94C]"}`}>
                    {t.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="bg-[#111111] text-white py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase mb-6">Rewards Program</div>
              <h2 className="font-display text-[52px] font-bold mb-5 leading-none">Earn while<br />you <span className="text-[#CDFF3A]">perform.</span></h2>
              <p className="text-white/45 text-[15px] leading-relaxed mb-10 max-w-md">Every dollar spent earns Fresher Points. Redeem for free meals, plan upgrades, and exclusive benefits.</p>
              <button className="inline-flex items-center gap-2.5 bg-[#CDFF3A] text-[#111111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                Join Rewards →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { pts: "1 pt", per: "per $1 spent", color: "#CDFF3A" },
                { pts: "2× pts", per: "on Meal Plans", color: "#F2C94C" },
                { pts: "$5 off", per: "every 500 points", color: "#7EE8B0" },
                { pts: "VIP tier", per: "at 5,000+ pts / yr", color: "#A78BFA" },
              ].map((r) => (
                <div key={r.pts} className="bg-white/5 border border-white/8 p-7 hover:bg-white/8 transition-colors">
                  <div className="font-display text-[32px] font-bold mb-1.5" style={{ color: r.color }}>{r.pts}</div>
                  <div className="text-white/35 text-[11px] uppercase tracking-[0.15em]">{r.per}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#F7F5F0] py-16 border-t border-[#E5E2DA]">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <span className="font-mono text-[10px] tracking-[0.45em] text-[#111111]/35 uppercase">Stay in the loop</span>
          <h3 className="font-display text-[36px] font-bold mt-3 mb-2">New meals. New deals. Every week.</h3>
          <p className="text-[#888] text-[14px] mb-8">Join 8,400+ members getting the weekly menu drop.</p>
          <div className="flex gap-0 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 border border-[#D0CCC4] border-r-0 px-5 py-3.5 text-[14px] bg-white text-[#111111] placeholder:text-[#bbb] outline-none focus:border-[#111111] transition-colors" />
            <button className="bg-[#111111] text-white px-6 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
