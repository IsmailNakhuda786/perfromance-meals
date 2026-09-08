import { useState } from "react";
import { CartItem, Page, PLANS } from "@/data";

interface HomePageProps {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
  addToCart: (item: CartItem) => void;
  navigateToReferral: () => void;
}

const TESTIMONIALS = [
  { name: "Marcus T.", role: "Competitive Swimmer", text: "Been on Fresher for 6 months. My body composition has changed more in this period than the previous 2 years of training. The macros are genuinely accurate — every batch.", rating: 5, plan: "Meal Plan — Build" },
  { name: "Sarah L.", role: "Working Mum of Two", text: "Ready-to-Go meals have saved my week, every week. I grab 10 on Monday and I'm sorted. The low carb options taste far better than anything I would cook myself.", rating: 5, plan: "Ready Series" },
  { name: "Ryan K.", role: "CrossFit Athlete", text: "I run strict meal timing protocols and Fresher's USDA-standard macro labelling is the only brand I trust blindly. Consistency across every single batch.", rating: 5, plan: "Meal Plan — Maintain" },
];

const STATS = [
  { val: "12,400+", label: "Active Members" },
  { val: "4.8★", label: "Average Rating" },
  { val: "98%", label: "On-Time Delivery" },
  { val: "2.3M+", label: "Meals Delivered" },
];

export default function HomePage({ navigate, navigateToWizard, navigateToReferral }: HomePageProps) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-[#F7F5F0]">
      {/* ── HERO — SPLIT PANEL ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 relative" style={{ minHeight: "calc(100vh - 84px)" }}>
        {/* Ready-to-Go panel */}
        <div className="relative overflow-hidden cursor-pointer group min-h-[50vh] md:min-h-0" onClick={() => navigate("ready-to-go")}>
          <img src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=1000&h=1100&fit=crop&auto=format" alt="Ready-to-Go meals"
            className="absolute inset-0 w-full h-full object-cover scale-[1.06] group-hover:scale-100 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/65 to-[#111111]/10 group-hover:via-[#111111]/50 transition-all duration-500" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF3A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="relative h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#CDFF3A] uppercase">01 / READY SERIES</span>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3 sm:mb-5">Fresher Performance Meals</p>
              <h1 className="font-display text-[40px] sm:text-[52px] lg:text-[72px] font-bold leading-[0.88] mb-5 sm:mb-7">
                Heat.<br />
                <span className="text-[#CDFF3A] group-hover:drop-shadow-[0_0_24px_rgba(205,255,58,0.5)] transition-all duration-500">Eat.</span>
                <br />Perform.
              </h1>
              <p className="text-white/60 text-[13px] sm:text-[15px] max-w-[300px] mb-6 sm:mb-9 leading-relaxed">
                Macro-accurate frozen meals, ready in 3 minutes. No prep. No guesswork.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); navigate("ready-to-go"); }}
                  className="inline-flex items-center gap-2 bg-[#CDFF3A] text-[#111111] px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors">
                  Shop Meals →
                </button>
                <button onClick={(e) => { e.stopPropagation(); navigate("build-a-box"); }}
                  className="text-white/60 text-[11px] sm:text-[12px] border border-white/20 px-4 sm:px-5 py-3 sm:py-3.5 hover:border-[#CDFF3A] hover:text-[#CDFF3A] transition-colors">
                  Build-A-Box
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-5 sm:mt-8">
                {["✓ Same-day delivery", "✓ USDA standards"].map((s) => (
                  <span key={s} className="text-[9px] sm:text-[10px] text-white/35 border border-white/10 px-2.5 py-1.5 tracking-wider">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Meal Plans panel */}
        <div className="relative overflow-hidden cursor-pointer group min-h-[50vh] md:min-h-0" onClick={() => navigateToWizard()}>
          <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&h=1100&fit=crop&auto=format" alt="Meal Plans fresh bowl"
            className="absolute inset-0 w-full h-full object-cover scale-[1.06] group-hover:scale-100 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2818] via-[#0D2818]/72 to-[#0D2818]/20 group-hover:via-[#0D2818]/55 transition-all duration-500" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F2C94C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="relative h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#F2C94C] uppercase">02 / MEAL PLANS</span>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3 sm:mb-5">Fresher Performance Meals</p>
              <h1 className="font-display text-[40px] sm:text-[52px] lg:text-[72px] font-bold leading-[0.88] mb-5 sm:mb-7">
                Your goal.<br />
                <span className="text-[#F2C94C] group-hover:drop-shadow-[0_0_24px_rgba(242,201,76,0.5)] transition-all duration-500">Your</span>
                <br />macros.
              </h1>
              <p className="text-white/60 text-[13px] sm:text-[15px] max-w-[300px] mb-6 sm:mb-9 leading-relaxed">
                Chef-prepared fresh meals delivered daily, calibrated to your caloric target.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); navigateToWizard(); }}
                  className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#111111] px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors">
                  Get My Plan →
                </button>
                <button onClick={(e) => { e.stopPropagation(); navigate("how-it-works"); }}
                  className="text-white/60 text-[11px] sm:text-[12px] border border-white/20 px-4 sm:px-5 py-3 sm:py-3.5 hover:border-[#F2C94C] hover:text-[#F2C94C] transition-colors">
                  How It Works
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-5 sm:mt-8">
                {["✓ Delivered fresh daily", "✓ Chef-prepared"].map((s) => (
                  <span key={s} className="text-[9px] sm:text-[10px] text-white/35 border border-white/10 px-2.5 py-1.5 tracking-wider">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6IN60 PROMISE BAR ── */}
      <div className="bg-[#CDFF3A] relative overflow-hidden">
        <style>{`
          @keyframes spin6 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes marquee6 { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        `}</style>
        <div className="overflow-hidden border-b border-[#111]/10 py-2">
          <div className="flex w-max" style={{ animation: "marquee6 22s linear infinite" }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center">
                {["LOSE 6KG", "IN 60 DAYS", "CHEF-PREPARED", "MACRO-ACCURATE", "MONEY-BACK GUARANTEE", "12,400+ MEMBERS", "SINGAPORE'S #1"].map((t) => (
                  <span key={t} className="flex items-center gap-3 px-5 text-[9px] font-black tracking-[0.3em] text-[#111]/60">
                    {t} <span className="text-[#111]/30">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="relative shrink-0 w-[64px] h-[64px] sm:w-[80px] sm:h-[80px]">
              <svg viewBox="0 0 80 80" className="w-full h-full" style={{ animation: "spin6 15s linear infinite" }}>
                <defs><path id="pr" d="M 40,40 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" /></defs>
                <circle cx="40" cy="40" r="36" fill="none" stroke="#111" strokeWidth="1.5" strokeDasharray="3 2.5" opacity="0.3" />
                <text fontSize="7.2" fontFamily="monospace" fontWeight="900" fill="#111" opacity="0.5" letterSpacing="2.2">
                  <textPath href="#pr" startOffset="50%" textAnchor="middle">GUARANTEED · SINGAPORE · FRESHER ·</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[18px] sm:text-[22px] font-black text-[#111] leading-none">6in60</span>
              </div>
            </div>
            <div>
              <div className="font-display text-[22px] sm:text-[28px] md:text-[34px] font-black text-[#111] leading-tight">
                Lose 6kg. In 60 days. <span className="underline decoration-2 underline-offset-4">Guaranteed.</span>
              </div>
              <p className="text-[#111]/55 text-[12px] sm:text-[13px] mt-1">Eat real food · no starving · or your money back.</p>
            </div>
          </div>
          <button onClick={() => navigate("meal-plan-wizard")}
            className="w-full sm:w-auto sm:ml-auto shrink-0 bg-[#111] text-[#CDFF3A] px-6 sm:px-8 py-3.5 text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#0D2818] transition-colors">
            Start My 60-Day Plan →
          </button>
        </div>
      </div>

      {/* ── READY SERIES + BUILD-A-BOX FEATURE STRIP ── */}
      <section className="bg-[#111] border-b border-white/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2">
          {/* Ready Series */}
          <div className="relative overflow-hidden group cursor-pointer border-r border-white/5" onClick={() => navigate("ready-to-go")}>
            <img src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=900&h=500&fit=crop&auto=format"
              alt="Ready Series" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700" />
            <div className="relative px-8 sm:px-12 py-12 sm:py-16">
              <span className="font-mono text-[9px] tracking-[0.5em] text-[#CDFF3A] uppercase">01 / Ready Series</span>
              <h3 className="font-display text-[36px] sm:text-[48px] font-bold text-white mt-3 mb-3 leading-tight">
                Heat. Eat.<br /><span className="text-[#CDFF3A]">Perform.</span>
              </h3>
              <p className="text-white/80 text-[13px] sm:text-[15px] leading-relaxed mb-7 max-w-[320px]">
                9 rotating meals. Macro-accurate. Ready in 3 minutes from frozen. Same-day delivery across Singapore.
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <button onClick={(e) => { e.stopPropagation(); navigate("ready-to-go"); }}
                  className="bg-[#CDFF3A] text-[#111] px-6 py-3 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-white transition-colors">
                  Shop Meals →
                </button>
                <div className="flex gap-2">
                  {["From $9.90", "Free delivery $80+"].map((t) => (
                    <span key={t} className="text-[10px] text-white/30 border border-white/10 px-3 py-2 tracking-wide">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Build-A-Box */}
          <div className="relative overflow-hidden group cursor-pointer" onClick={() => navigate("build-a-box")}>
            <img src="https://images.unsplash.com/photo-1607532941433-304659e8198a?w=900&h=500&fit=crop&auto=format"
              alt="Build A Box" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#7EE8B0] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="relative px-8 sm:px-12 py-12 sm:py-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[9px] tracking-[0.5em] text-[#7EE8B0] uppercase">Build-A-Box</span>
                <span className="bg-[#7EE8B0] text-[#111] text-[8px] font-black tracking-widest uppercase px-2 py-1">Best Value</span>
              </div>
              <h3 className="font-display text-[36px] sm:text-[48px] font-bold text-white mb-3 leading-tight">
                Your pick.<br /><span className="text-[#7EE8B0]">Your box.</span>
              </h3>
              <p className="text-white/80 text-[13px] sm:text-[15px] leading-relaxed mb-7 max-w-[320px]">
                Mix and match from 9 meals. Choose 5, 10, 15 or 20 — the more you order, the less you pay per meal.
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <button onClick={(e) => { e.stopPropagation(); navigate("build-a-box"); }}
                  className="bg-[#7EE8B0] text-[#111] px-6 py-3 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-white transition-colors">
                  Build My Box →
                </button>
                <div className="flex gap-2">
                  {["From $11/meal", "Save up to 11%"].map((t) => (
                    <span key={t} className="text-[10px] text-white/30 border border-white/10 px-3 py-2 tracking-wide">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANIMATED STATS BAR ── */}
      <div className="bg-[#111111] py-5 sm:py-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-[24px] sm:text-[28px] font-bold text-[#CDFF3A]">{s.val}</div>
              <div className="text-white/40 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.15em] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div className="bg-[#0E0E0E] border-b border-white/5 overflow-x-auto">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-6 sm:gap-8 lg:gap-12 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
          {[
            { icon: "🏛", label: "USDA Standards" },
            { icon: "⚡", label: "Same-Day Delivery" },
            { icon: "❄️", label: "2-Month Freezer" },
            { icon: "🏋", label: "Trainer-Approved" },
            { icon: "⭐", label: "4.8 · 2,400+ Reviews" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2 text-[10px] sm:text-[11px] text-white/40 tracking-[0.12em] uppercase whitespace-nowrap">
              <span className="text-[13px] sm:text-[15px]">{t.icon}</span><span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRUSTED BY ── */}
      <section className="bg-[#F7F5F0] py-14 border-b border-[#E5E2DA]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#111]/30 uppercase">Trusted by</span>
            <h2 className="font-display text-[28px] sm:text-[36px] font-bold mt-2">The people who fuel on Fresher</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "🏋️", title: "Athletes & Gymgoers", desc: "From recreational lifters to competitive bodybuilders — our macro precision matches training demands at every level.", count: "3,200+ athletes" },
              { icon: "💼", title: "Busy Professionals", desc: "No time to cook doesn't mean no standards. Fresher fits into a demanding schedule without sacrificing nutrition.", count: "2,800+ professionals" },
              { icon: "🏃", title: "Endurance Performers", desc: "Runners, cyclists, swimmers — high-carb fuelling on training days, lean protein on recovery days. All covered.", count: "1,400+ endurance athletes" },
            ].map((g) => (
              <div key={g.title} className="bg-white border border-[#E5E2DA] p-6">
                <div className="text-[36px] mb-3">{g.icon}</div>
                <div className="font-bold text-[16px] mb-2">{g.title}</div>
                <p className="text-[#666] text-[13px] leading-relaxed mb-4">{g.desc}</p>
                <div className="font-mono text-[11px] text-[#CDFF3A] bg-[#111] px-3 py-1.5 inline-block tracking-wider">{g.count}</div>
              </div>
            ))}
          </div>
          {/* Logo trust strip */}
          <div className="border-t border-[#E5E2DA] pt-8">
            <p className="text-center text-[11px] font-mono tracking-[0.3em] text-[#aaa] uppercase mb-6">Featured & recognised by</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {["Business Times", "Straits Times Life", "Men's Health SG", "Women's Health SG", "CNA Lifestyle"].map((b) => (
                <span key={b} className="font-display text-[16px] font-bold text-[#CCC] hover:text-[#999] transition-colors">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CREATED BY ── */}
      <section className="bg-[#111] text-white py-16 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase">Created by</span>
            <h2 className="font-display text-[36px] sm:text-[48px] font-bold mt-3 mb-5 leading-tight">Chefs who<br />understand macros.</h2>
            <p className="text-white/55 text-[15px] leading-relaxed mb-6">
              Every Fresher meal is designed by <strong className="text-white">Chef Marcus Yeo</strong> and calibrated by <strong className="text-white">Dr. Aisha Lim</strong>, our in-house sports dietitian. No guesswork — every gram of protein, carb and fat is intentional.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { val: "USDA", label: "Nutrition standard" },
                { val: "±2g", label: "Macro accuracy" },
                { val: "Weekly", label: "Menu rotation" },
              ].map((s) => (
                <div key={s.label} className="text-center border border-white/10 py-4 px-3">
                  <div className="font-display text-[20px] font-bold text-[#CDFF3A]">{s.val}</div>
                  <div className="text-white/35 text-[10px] uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=80&h=80&fit=crop&auto=format",
                  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&auto=format",
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format",
                ].map((img, i) => (
                  <img key={i} src={img} alt="team" className="w-10 h-10 rounded-full border-2 border-[#111] object-cover grayscale" />
                ))}
              </div>
              <div className="text-[13px] text-white/50">
                Meet the team → <button onClick={() => {}} className="text-[#CDFF3A] hover:underline">About Us</button>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=500&fit=crop&auto=format"
              alt="Chef at work" className="w-full object-cover grayscale opacity-80" style={{ height: 420 }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="bg-white/10 backdrop-blur border border-white/10 px-4 py-3 flex items-center gap-3">
                <span className="text-[22px]">👨‍🍳</span>
                <div>
                  <div className="font-semibold text-[13px]">Chef Marcus Yeo</div>
                  <div className="text-white/50 text-[11px]">Head Chef · 10 years fine dining</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANS SECTION — INTERACTIVE ── */}
      <section className="text-white py-24 overflow-hidden relative" style={{ background: "linear-gradient(160deg, #14100A 0%, #1C1508 45%, #0F1A0C 100%)" }}>

        {/* Slow animated ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ animation: "ambientShift 8s ease-in-out infinite alternate", backgroundImage: "radial-gradient(ellipse 55% 60% at 80% 30%, rgba(242,201,76,0.09) 0%, transparent 65%), radial-gradient(ellipse 40% 45% at 15% 75%, rgba(205,255,58,0.06) 0%, transparent 60%)" }} />

        {/* Grain texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />

        <style>{`
          @keyframes ambientShift {
            from { opacity: 0.6; }
            to { opacity: 1; }
          }
          @keyframes shimmer-sweep {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(300%) skewX(-15deg); }
          }
          @keyframes float-up {
            0% { opacity: 0; transform: translateY(28px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.18; }
            50% { opacity: 0.45; }
          }
          @keyframes badge-pop {
            0% { transform: scale(0.8) rotate(-6deg); opacity: 0; }
            100% { transform: scale(1) rotate(-3deg); opacity: 1; }
          }
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .plan-card { animation: float-up 0.6s cubic-bezier(0.22,1,0.36,1) both; }
          .plan-card:nth-child(1) { animation-delay: 0.05s; }
          .plan-card:nth-child(2) { animation-delay: 0.18s; }
          .plan-card:nth-child(3) { animation-delay: 0.30s; }
          .plan-card:hover .shimmer-bar { animation: shimmer-sweep 0.7s ease forwards; }
          .plan-card:hover .glow-blob { animation: glow-pulse 2s ease infinite; }
          .popular-badge { animation: badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.4s both; }
          .ticker-inner { animation: ticker-scroll 22s linear infinite; }
          .ticker-inner:hover { animation-play-state: paused; }
        `}</style>

        <div className="max-w-[1440px] mx-auto px-6 relative">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#F2C94C] uppercase">02 / Meal Plans</span>
            <div className="h-px w-16 bg-[#F2C94C]/30" />
          </div>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8 mb-8 lg:mb-10">
            <h2 className="font-display text-[40px] sm:text-[52px] lg:text-[72px] font-bold leading-none">
              Your goal.<br />
              <span className="text-[#F2C94C]">Your macros.</span>
            </h2>
            <div className="max-w-md flex flex-col gap-4">
              <p className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed">
                Three plans. Every calorie calculated. Fresh meals delivered to your door every morning — chef-prepared, macro-labelled.
              </p>
              <div className="inline-flex items-center gap-3 bg-[#CDFF3A]/10 border border-[#CDFF3A]/25 px-4 py-2.5 self-start">
                <div className="w-6 h-6 bg-[#CDFF3A] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-[#111] font-black text-[8px]">6:60</span>
                </div>
                <span className="text-[#CDFF3A] text-[11px] sm:text-[12px] font-semibold">Lose 6kg in 60 days — or your money back.</span>
              </div>
              <button onClick={() => navigate("how-it-works")} className="text-white/40 text-[11px] sm:text-[12px] border border-white/15 px-4 py-2.5 hover:border-[#F2C94C] hover:text-[#F2C94C] transition-colors uppercase tracking-[0.15em] self-start">
                How It Works →
              </button>
            </div>
          </div>

          {/* Scrolling social proof ticker */}
          <div className="overflow-hidden mb-10 border-y border-white/6 py-3">
            <div className="ticker-inner flex gap-10 whitespace-nowrap w-max">
              {[...Array(2)].map((_, rep) => (
                <div key={rep} className="flex gap-10 shrink-0">
                  {[
                    "⚡ Marcus T. lost 7.2kg in 60 days",
                    "🔥 Sarah L. — 8 weeks, -5.4kg, energy through the roof",
                    "✓ 12,400+ active members across Singapore",
                    "⭐ 4.8 stars · 2,400+ verified reviews",
                    "🏋 Ryan K. cut from 88kg → 81kg in 8 weeks",
                    "📦 98% on-time delivery rate",
                    "🎯 Chef-prepared · macro-labelled · trainer-approved",
                  ].map((t) => (
                    <span key={t} className="text-[11px] text-white/30 tracking-wide">{t}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {PLANS.map((plan, idx) => {
              const isHovered = hoveredPlan === plan.name;
              const isMaintain = plan.name === "MAINTAIN";
              return (
                <div key={plan.name}
                  className="plan-card relative overflow-hidden cursor-pointer group/card"
                  style={{
                    backgroundColor: isHovered ? "#1E1A12" : isMaintain ? "#1A1610" : "#161208",
                    border: `1.5px solid ${isHovered ? plan.accent : isMaintain ? "rgba(242,201,76,0.3)" : "rgba(255,255,255,0.07)"}`,
                    transform: isHovered ? "translateY(-8px) scale(1.018)" : isMaintain ? "translateY(-3px)" : "translateY(0) scale(1)",
                    transition: "transform 0.38s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease, box-shadow 0.38s ease",
                    boxShadow: isHovered ? `0 28px 70px -12px ${plan.accent}55, 0 0 0 1px ${plan.accent}30` : isMaintain ? "0 8px 40px -8px rgba(242,201,76,0.2)" : "0 4px 24px -4px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={() => setHoveredPlan(plan.name)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  onClick={() => navigateToWizard(plan.name)}>

                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300"
                    style={{ backgroundColor: plan.accent, opacity: isHovered ? 1 : 0.6 }} />

                  {/* Radial glow blob */}
                  <div className="glow-blob absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle, ${plan.accent}40 0%, transparent 70%)`, opacity: isHovered ? 1 : 0 }} />

                  {/* Shimmer sweep on hover */}
                  <div className="shimmer-bar absolute inset-y-0 w-16 pointer-events-none"
                    style={{ background: "rgba(255,255,255,0.07)", transform: "translateX(-100%) skewX(-15deg)" }} />

                  <div className="relative p-7">
                    {/* Most Popular badge — MAINTAIN only */}
                    {isMaintain && (
                      <div className="popular-badge absolute -top-1 -right-1 z-10">
                        <div className="bg-[#F2C94C] text-[#111] text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5">
                          ★ Most Popular
                        </div>
                      </div>
                    )}

                    {/* Plan label + index */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
                          style={{ backgroundColor: `${plan.accent}20`, color: plan.accent, border: `1px solid ${plan.accent}40` }}>
                          {idx + 1}
                        </div>
                        <span className="font-mono text-[11px] tracking-[0.3em] font-bold uppercase"
                          style={{ color: plan.accent }}>{plan.name}</span>
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/25">{plan.meals} meals/day</div>
                    </div>

                    {/* Calorie hero + price */}
                    <div className="flex items-end justify-between mb-5 gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] mb-1 text-white/30">Daily target</div>
                        <div className="font-display leading-none transition-all duration-300"
                          style={{ fontSize: isHovered ? "56px" : "48px", color: isHovered ? plan.accent : "white" }}>
                          {plan.cal}
                          <span className="text-[18px] font-normal text-white/30"> kcal</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display text-[34px] font-bold leading-none" style={{ color: plan.accent }}>
                          ${plan.priceWeek}
                        </div>
                        <div className="text-white/30 text-[11px] mt-1">/week</div>
                      </div>
                    </div>

                    <p className="text-white/40 text-[13px] leading-relaxed mb-6">{plan.desc}</p>

                    {/* Macro pills */}
                    <div className="flex gap-2 mb-6">
                      {[{ l: "Protein", v: `${plan.protein}g` }, { l: "Carbs", v: `${plan.carbs}g` }, { l: "Fat", v: `${plan.fat}g` }].map((m) => (
                        <div key={m.l} className="flex-1 text-center py-2.5 transition-all duration-300"
                          style={{ backgroundColor: isHovered ? `${plan.accent}18` : "rgba(255,255,255,0.05)", border: `1px solid ${isHovered ? plan.accent + "40" : "rgba(255,255,255,0.08)"}` }}>
                          <div className="font-mono text-[14px] font-bold" style={{ color: isHovered ? plan.accent : "rgba(255,255,255,0.8)" }}>{m.v}</div>
                          <div className="text-[9px] uppercase tracking-wider mt-0.5 text-white/25">{m.l}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/8">
                      <span className="text-[11px] text-white/25">Fresh daily · SG</span>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300"
                        style={{ color: isHovered ? plan.accent : "rgba(255,255,255,0.25)", transform: isHovered ? "translateX(0)" : "translateX(-4px)" }}>
                        Select Plan
                        <span className="transition-transform duration-300" style={{ transform: isHovered ? "translateX(3px)" : "translateX(0)" }}>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => navigateToWizard()} className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] transition-colors">
            Start Meal Plan Wizard →
          </button>
        </div>
      </section>

      {/* ── REAL RESULTS ── */}
      <section className="bg-white py-16 border-t border-[#E5E2DA]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#111]/30 uppercase">Real Results</span>
            <h2 className="font-display text-[36px] sm:text-[48px] font-bold mt-2">Real results. Real people.</h2>
            <p className="text-[#888] text-[14px] mt-3">Over 12,400 members. 4.8 stars. Verified reviews.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { name: "Marcus L.", plan: "MAINTAIN Plan · Week 18", stars: 5, text: "I've tried every meal prep service in Singapore. Fresher is the only one where I actually look forward to my meals. Macros are spot on and the food tastes like a restaurant." },
              { name: "Priya S.", plan: "CUT Plan · Lost 7kg in 9 weeks", stars: 5, text: "Down 7kg and I never felt hungry. The chef really understands performance nutrition — this isn't diet food, it's proper eating." },
              { name: "Wei Jian T.", plan: "BUILD Plan · 4 months in", stars: 5, text: "Gained 4kg of lean muscle while eating clean. The protein macros on the BUILD plan are dialled in perfectly. My gym coach was genuinely impressed." },
              { name: "Sarah K.", plan: "Ready-to-Go · Regular customer", stars: 5, text: "The salmon scramble breakfast is addictive. I order 10 a week. Free delivery, arrives frozen fresh, heats in 3 mins. What else do you need?" },
              { name: "Darren Ng", plan: "Gift Card → CUT Plan", stars: 5, text: "Got a gift card from my wife and now I'm a subscriber. The 6in60 guarantee is what got me in the door — results kept me here." },
              { name: "Aisha B.", plan: "MAINTAIN Plan · 6 months", stars: 5, text: "As a busy mum of two I have zero time to meal prep. Fresher has genuinely changed how our household eats. The kids steal my lunches now." },
            ].map((t) => (
              <div key={t.name} className="bg-[#F7F5F0] p-6 flex flex-col gap-4">
                <div className="text-[#CDFF3A] text-[16px]">{"★".repeat(t.stars)}</div>
                <p className="text-[14px] leading-relaxed text-[#333] flex-1">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-[14px]">{t.name}</div>
                  <div className="text-[11px] text-[#888] mt-0.5">{t.plan}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GIFT CARD BANNER ── */}
      <section className="bg-[#CDFF3A] py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] tracking-[0.4em] text-[#111]/40 uppercase mb-2">Gift Cards</div>
            <h3 className="font-display text-[28px] sm:text-[36px] font-bold text-[#111] leading-tight">
              Give the gift of<br />performance.
            </h3>
            <p className="text-[#111]/60 text-[13px] sm:text-[14px] mt-3 max-w-xs">Fresher gift cards never expire. From $25.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div className="grid grid-cols-4 gap-2 sm:flex sm:gap-3">
              {["$25", "$50", "$100", "$150"].map((a) => (
                <div key={a} className="bg-white/50 border-2 border-[#111]/15 px-3 sm:px-5 py-2.5 sm:py-3 text-center">
                  <div className="font-display text-[16px] sm:text-[22px] font-bold text-[#111]">{a}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("gift-card")}
              className="w-full sm:w-auto bg-[#111111] text-white px-6 sm:px-7 py-3.5 sm:py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-[#0D2818] transition-colors whitespace-nowrap">
              Buy a Gift Card →
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — INTERACTIVE ── */}
      <section className="bg-[#F7F5F0] py-14 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] tracking-[0.45em] text-[#111111]/35 uppercase">Client Results</span>
            <div className="h-px w-16 bg-[#111111]/15" />
          </div>
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-14">
            <h2 className="font-display text-[52px] font-bold leading-none">What our<br />members say.</h2>
            <div className="flex items-center gap-2 mt-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`transition-all duration-300 ${activeTestimonial === i ? "w-8 h-2 bg-[#111]" : "w-2 h-2 bg-[#D0CCC4] hover:bg-[#888]"} rounded-full`} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name}
                onClick={() => setActiveTestimonial(i)}
                className={`bg-white p-8 border-2 cursor-pointer transition-all duration-300 ${activeTestimonial === i ? "border-[#111] shadow-xl scale-[1.02]" : "border-transparent hover:border-[#E5E2DA]"}`}>
                <div className="text-[16px] mb-5">
                  {"★".repeat(t.rating).split("").map((s, j) => (
                    <span key={j} className="text-[#CDFF3A]">{s}</span>
                  ))}
                </div>
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

      {/* ── REWARDS ── */}
      <section className="bg-[#111111] text-white py-14 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase mb-6">Rewards Program</div>
              <h2 className="font-display text-[38px] sm:text-[52px] font-bold mb-5 leading-none">
                Earn while<br />you <span className="text-[#CDFF3A]">perform.</span>
              </h2>
              <p className="text-white/45 text-[15px] leading-relaxed mb-10 max-w-md">
                Every dollar spent earns Fresher Points. Redeem for free meals, plan upgrades, and exclusive benefits. Also earn by referring friends.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button onClick={navigateToReferral} className="inline-flex items-center gap-2.5 bg-[#CDFF3A] text-[#111111] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                  Join Rewards →
                </button>
                <button onClick={navigateToReferral} className="border border-white/20 text-white/60 px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:border-white hover:text-white transition-colors">
                  Refer & Earn $10
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { pts: "1 pt", per: "per $1 spent", color: "#CDFF3A" },
                { pts: "2× pts", per: "on Meal Plans", color: "#F2C94C" },
                { pts: "$5 off", per: "every 500 points", color: "#7EE8B0" },
                { pts: "$10 bonus", per: "per referral", color: "#A78BFA" },
              ].map((r) => (
                <div key={r.pts} className="bg-white/5 border border-white/8 p-7 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer">
                  <div className="font-display text-[32px] font-bold mb-1.5" style={{ color: r.color }}>{r.pts}</div>
                  <div className="text-white/35 text-[11px] uppercase tracking-[0.15em]">{r.per}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-[#F7F5F0] py-16 border-t border-[#E5E2DA]">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <span className="font-mono text-[10px] tracking-[0.45em] text-[#111111]/35 uppercase">Stay in the loop</span>
          <h3 className="font-display text-[36px] font-bold mt-3 mb-2">New meals. New deals. Every week.</h3>
          <p className="text-[#888] text-[14px] mb-8">Join 8,400+ members getting the weekly menu drop.</p>
          <div className="flex gap-0 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com"
              className="flex-1 border border-[#D0CCC4] border-r-0 px-5 py-3.5 text-[14px] bg-white text-[#111111] placeholder:text-[#bbb] outline-none focus:border-[#111111] transition-colors" />
            <button className="bg-[#111111] text-white px-6 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#CDFF3A] hover:text-[#111111] transition-colors whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
