import { Page } from "@/data";
import { ReadySeriesLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
}

const mealImage = "https://images.unsplash.com/photo-1606858274001-dd10efc5ce7d?w=1400&h=1100&fit=crop&auto=format";

export default function ReadySeriesLandingPage({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-[#EAF2FF] text-[#071B35]">
      <section className="relative overflow-hidden bg-[#071B35] text-white">
        <div className="absolute inset-0 opacity-20 ready-grid" />
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] min-h-[700px]">
          <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-20 lg:py-28 flex flex-col justify-between">
            <ReadySeriesLogo size="md" variant="dark" />
            <div className="max-w-[680px] mt-20">
              <p className="text-[#72A7FF] text-[11px] font-mono tracking-[0.45em] uppercase mb-6">Frozen at peak · Ready on demand</p>
              <h1 className="font-display text-[54px] sm:text-[76px] lg:text-[92px] font-black leading-[0.82] tracking-[-0.04em] uppercase">
                Good food.<br /><span className="text-[#F5B300]">No hold-up.</span>
              </h1>
              <p className="text-white/60 text-[17px] sm:text-[19px] leading-relaxed max-w-[570px] mt-8">
                High-protein frozen meals built for full calendars. Choose exactly what you need, stock up with a bundle, or keep your freezer ready on subscription.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-10">
                <button onClick={() => navigate("ready-series-order")} className="bg-[#F5B300] text-[#071B35] px-8 py-4 text-[12px] font-black tracking-[0.18em] uppercase hover:bg-white transition-colors">Start an order</button>
                <button onClick={() => navigate("ready-series-about")} className="border border-white/25 text-white px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:border-white transition-colors">Why Ready Series</button>
              </div>
            </div>
          </div>
          <div className="relative min-h-[460px] lg:min-h-full border-l border-white/10">
            <img src={mealImage} alt="Prepared meals ready for a busy week" className="absolute inset-0 w-full h-full object-cover grayscale-[20%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B35] via-transparent to-[#071B35]/20" />
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 border border-white/25 backdrop-blur-md bg-[#071B35]/65">
              {["3 min heat", "40+ meals", "0 prep"].map((item) => <div key={item} className="py-4 text-center text-[10px] sm:text-[12px] font-mono uppercase tracking-widest border-r border-white/20 last:border-0">{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">
          <div>
            <p className="text-[#245DA8] text-[11px] font-mono tracking-[0.4em] uppercase mb-4">Choose your route</p>
            <h2 className="font-display text-[42px] sm:text-[58px] font-black leading-[0.9] uppercase">Three ways to<br />stay ready.</h2>
          </div>
          <p className="max-w-[430px] text-[#35506F] leading-relaxed lg:pt-10">No box builder and no blurred choices. Each route has a clear purpose, price model, and commitment level.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n: "01", title: "Individual Selection", copy: "Pick individual meals. One-time purchase, complete flexibility.", tag: "Best for trying favourites" },
            { n: "02", title: "Bundles", copy: "Choose a predefined pack. One-time purchase with easy stock-up value.", tag: "Best for a full freezer" },
            { n: "03", title: "Subscription", copy: "Select an approved recurring plan for 3 or 6 months. Account required.", tag: "Best for consistency" },
          ].map((card) => (
            <button key={card.n} onClick={() => navigate("ready-series-order")} className="group text-left bg-white border border-[#B7CDE8] p-7 sm:p-8 min-h-[330px] flex flex-col hover:bg-[#0D3D78] hover:text-white transition-colors">
              <span className="font-mono text-[11px] text-[#3975BE] group-hover:text-[#F5B300]">{card.n}</span>
              <span className="font-display text-[27px] font-black leading-tight uppercase mt-12">{card.title}</span>
              <span className="text-[14px] text-[#526B86] group-hover:text-white/65 leading-relaxed mt-4">{card.copy}</span>
              <span className="mt-auto pt-8 text-[10px] font-mono uppercase tracking-widest text-[#245DA8] group-hover:text-[#F5B300]">{card.tag} →</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
