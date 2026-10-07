import { Page } from "@/data";
import { ReadySeriesLogo } from "@/components/Logos";

type PurchaseMode = "single" | "bundles" | "subscription";

interface Props {
  navigate: (page: Page) => void;
  navigateToReadyOrder: (mode: PurchaseMode) => void;
}

export default function ReadySeriesLandingPage({ navigate, navigateToReadyOrder }: Props) {
  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#1A1A1A]">
      {/* Advertising hero */}
      <section className="relative overflow-hidden bg-[#1A1A1A] text-white">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] min-h-[740px]">
          <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-16 lg:py-20 flex flex-col">
            <ReadySeriesLogo size="md" variant="dark" />
            <div className="mt-auto pt-20 max-w-[650px]">
              <div className="inline-flex items-center gap-3 bg-[#F5B300] text-[#1A1A1A] rounded-full px-4 py-2 mb-7">
                <span className="w-2 h-2 bg-[#1A1A1A] rounded-full" />
                <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase">Everyday momentum</span>
              </div>
              <h1 className="font-display text-[52px] sm:text-[72px] lg:text-[84px] font-black leading-[0.86] tracking-[-0.045em]">
                Ready for<br /><span className="text-[#F5B300]">real life.</span>
              </h1>
              <p className="text-white/70 text-[17px] sm:text-[19px] leading-relaxed max-w-[560px] mt-8">
                Frozen performance meals that keep your week moving. Easy to choose, ready in minutes, and dependable when cooking does not fit the day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-9">
                <button
                  onClick={() => navigateToReadyOrder("single")}
                  className="group inline-flex items-center justify-between gap-8 rounded-full bg-[#F5B300] text-[#1A1A1A] pl-7 pr-2 py-2 text-[11px] font-extrabold tracking-[0.16em] uppercase hover:bg-white transition-colors"
                >
                  Shop Ready Series
                  <span className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </button>
                <button onClick={() => navigateToReadyOrder("subscription")} className="rounded-full border border-white/25 px-7 py-4 text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-white hover:text-[#1A1A1A] transition-colors">
                  See subscription plans
                </button>
              </div>
            </div>
          </div>

          <div className="relative min-h-[560px] lg:min-h-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1625631980634-397b9e9a73f9?w=1200&h=1000&fit=crop&auto=format&q=85" alt="Busy professional enjoying a prepared meal at home" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            <div className="absolute top-6 right-6 bg-white text-[#1A1A1A] rounded-2xl px-5 py-4 shadow-xl">
              <div className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#897F74]">From freezer to table</div>
              <div className="font-display text-[28px] font-black mt-1">3 minutes</div>
            </div>
            <div className="absolute left-5 right-5 sm:left-8 sm:right-8 bottom-6 grid grid-cols-3 rounded-2xl overflow-hidden bg-white/92 backdrop-blur-md text-[#1A1A1A] shadow-2xl">
              {[
                ["Zero prep", "No chopping"],
                ["Clear macros", "Choose easily"],
                ["Stock-up value", "Stay ready"],
              ].map(([title, copy]) => (
                <div key={title} className="px-3 sm:px-5 py-5 border-r border-[#D7D0C6] last:border-0">
                  <div className="font-display text-[13px] sm:text-[16px] font-extrabold">{title}</div>
                  <div className="text-[#7B7167] text-[9px] sm:text-[10px] mt-1">{copy}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem / relevance */}
      <section className="px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-end mb-12">
            <div>
              <p className="text-[#806A2A] text-[10px] font-bold tracking-[0.24em] uppercase mb-5">When the day changes</p>
              <h2 className="font-display text-[42px] sm:text-[58px] font-black leading-[0.93] tracking-[-0.035em]">
                Cooking can wait.<br />Your routine should not.
              </h2>
            </div>
            <p className="text-[#6F665D] text-[16px] leading-relaxed max-w-[540px] lg:justify-self-end">
              Long workdays, late training, family plans, and low-energy evenings are normal. Ready Series gives those moments a better answer than skipping dinner or ordering whatever is closest.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["7:15 PM", "The meeting ran over", "Dinner is already handled. Heat a meal and close the laptop."],
              ["8:30 PM", "Training finished late", "Clear protein and calorie information makes the next choice easy."],
              ["Any time", "Plans changed again", "A stocked freezer keeps one useful part of the day predictable."],
            ].map(([time, title, copy]) => (
              <article key={title} className="bg-white border border-[#DED7CD] rounded-2xl p-7 min-h-[260px] flex flex-col hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(52,42,30,0.09)] transition-all duration-300">
                <span className="font-mono text-[10px] text-[#A87500]">{time}</span>
                <div className="mt-auto">
                  <h3 className="font-display text-[23px] font-extrabold">{title}</h3>
                  <p className="text-[#71685F] text-[13px] leading-relaxed mt-3">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Product mechanism */}
      <section className="bg-white px-6 sm:px-10 py-20 sm:py-24 border-y border-[#DED7CD]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          <div className="relative overflow-hidden rounded-2xl min-h-[420px]">
            <img src="https://images.unsplash.com/photo-1666819691716-827f78d892f3?w=1200&h=900&fit=crop&auto=format&q=85" alt="A selection of balanced Ready Series meals" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-5 left-5 bg-[#F5B300] rounded-full px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.18em]">Frozen at peak</div>
          </div>
          <div>
            <p className="text-[#806A2A] text-[10px] font-bold tracking-[0.24em] uppercase mb-5">The simplest part of your day</p>
            <h2 className="font-display text-[42px] sm:text-[54px] font-black leading-[0.94] tracking-[-0.035em]">Choose. Heat. Keep moving.</h2>
            <div className="mt-9 space-y-6">
              {[
                ["01", "Choose what fits", "Browse individual meals, predefined bundles, or a recurring subscription."],
                ["02", "Keep it ready", "Store meals in the freezer for the unpredictable days ahead."],
                ["03", "Heat in minutes", "Follow the clear preparation guidance and get back to your evening."],
              ].map(([number, title, copy]) => (
                <div key={number} className="grid grid-cols-[42px_1fr] gap-4 border-t border-[#DED7CD] pt-5">
                  <span className="font-mono text-[10px] text-[#A87500] pt-1">{number}</span>
                  <div>
                    <h3 className="font-display text-[19px] font-extrabold">{title}</h3>
                    <p className="text-[#71685F] text-[13px] leading-relaxed mt-1">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription — primary advertising offer */}
      <section className="bg-[#F5B300] px-6 sm:px-10 py-20 sm:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] text-white px-4 py-2 text-[9px] font-extrabold tracking-[0.18em] uppercase">Ready Series subscription</div>
            <h2 className="font-display text-[48px] sm:text-[66px] font-black leading-[0.88] tracking-[-0.045em] mt-7">
              Stock up once.<br />Stay ready for months.
            </h2>
            <p className="text-black/65 text-[16px] leading-relaxed max-w-[560px] mt-7">
              Choose from 10 predefined plans across Just Protein, Low Carb, High Carb, and Mixed. Select a 3- or 6-month term and receive one planned delivery each month.
            </p>
            <button onClick={() => navigateToReadyOrder("subscription")} className="group mt-9 inline-flex items-center gap-7 rounded-full bg-[#1A1A1A] text-white pl-7 pr-2 py-2 text-[11px] font-extrabold tracking-[0.15em] uppercase hover:bg-white hover:text-[#1A1A1A] transition-colors">
              Compare subscription plans
              <span className="w-10 h-10 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center group-hover:bg-[#F5B300] group-hover:translate-x-1 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </button>
            <p className="text-black/45 text-[10px] mt-4">Subscriptions require a shared Performance Meals account.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ["10", "predefined plans"],
              ["3 or 6", "month terms"],
              ["1", "delivery each month"],
              ["Free", "subscription delivery"],
            ].map(([value, label], index) => (
              <div key={label} className={`rounded-2xl p-7 min-h-[190px] flex flex-col justify-between ${index === 0 ? "bg-[#1A1A1A] text-white" : "bg-white/80 text-[#1A1A1A]"}`}>
                <span className="font-mono text-[10px] opacity-45">0{index + 1}</span>
                <div>
                  <div className="font-display text-[38px] font-black leading-none">{value}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-60 mt-2">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase routes */}
      <section className="px-6 sm:px-10 py-20 sm:py-24 bg-[#F7F2E8]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-[720px] mx-auto mb-12">
            <p className="text-[#806A2A] text-[10px] font-bold tracking-[0.24em] uppercase mb-5">Start where you are</p>
            <h2 className="font-display text-[42px] sm:text-[56px] font-black leading-[0.94] tracking-[-0.035em]">Three clear ways to stay ready.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { mode: "single" as const, number: "01", title: "Individual Selection", copy: "Pick the meals you want for a flexible one-time order.", action: "Choose meals" },
              { mode: "bundles" as const, number: "02", title: "Bundles", copy: "Stock up with a predefined selection and clear one-time pricing.", action: "See bundles" },
              { mode: "subscription" as const, number: "03", title: "Subscription", copy: "Choose a predefined plan for 3 or 6 months and keep the freezer ready.", action: "Compare plans" },
            ].map((card) => (
              <button key={card.mode} onClick={() => navigateToReadyOrder(card.mode)} className="group text-left bg-white border border-[#DED7CD] rounded-2xl p-7 min-h-[320px] flex flex-col hover:bg-[#1A1A1A] hover:text-white hover:-translate-y-1 transition-all duration-300">
                <span className="font-mono text-[10px] text-[#A87500] group-hover:text-[#F5B300]">{card.number}</span>
                <div className="mt-auto">
                  <h3 className="font-display text-[25px] font-extrabold">{card.title}</h3>
                  <p className="text-[#71685F] group-hover:text-white/55 text-[13px] leading-relaxed mt-3">{card.copy}</p>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#906700] group-hover:text-[#F5B300] mt-8">{card.action} →</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Closing campaign line */}
      <section className="bg-[#1A1A1A] text-white px-6 py-20 sm:py-24 text-center">
        <div className="max-w-[850px] mx-auto">
          <p className="text-[#F5B300] text-[10px] font-bold tracking-[0.25em] uppercase mb-6">Stock up. Stay on track.</p>
          <h2 className="font-display text-[44px] sm:text-[64px] font-black leading-[0.9] tracking-[-0.04em]">Put a better fallback in the freezer.</h2>
          <p className="text-white/55 text-[15px] leading-relaxed max-w-[560px] mx-auto mt-6">Ready Series protects your routine when time is short—without asking the rest of life to slow down.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
            <button onClick={() => navigateToReadyOrder("single")} className="rounded-full bg-[#F5B300] text-[#1A1A1A] px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.16em] hover:bg-white transition-colors">Shop meals</button>
            <button onClick={() => navigate("ready-series-about")} className="rounded-full border border-white/25 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] hover:border-white transition-colors">Our story</button>
          </div>
        </div>
      </section>
    </div>
  );
}
