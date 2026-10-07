import { Page } from "@/data";
import { ReadySeriesLogo } from "@/components/Logos";

interface Props { navigate: (page: Page) => void; }

export default function ReadySeriesAboutPage({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-[#F3F7FC] text-[#071B35]">
      <section className="bg-[#0B3264] text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 sm:py-28 grid lg:grid-cols-2 gap-16 items-end">
          <div>
            <ReadySeriesLogo size="md" variant="dark" />
            <p className="text-[#72A7FF] text-[11px] font-mono tracking-[0.45em] uppercase mt-16 mb-5">The always-ready system</p>
            <h1 className="font-display text-[48px] sm:text-[68px] font-black leading-[0.86] uppercase">Built for the<br /><span className="text-[#F5B300]">unplanned day.</span></h1>
          </div>
          <p className="text-white/60 text-[18px] leading-relaxed max-w-[520px]">Ready Series turns your freezer into a dependable food plan: properly portioned meals, frozen at peak, ready whenever work, training, or life changes the schedule.</p>
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16">
          <div>
            <p className="text-[#245DA8] text-[11px] font-mono tracking-[0.4em] uppercase mb-4">What it solves</p>
            <h2 className="font-display text-[40px] sm:text-[54px] font-black leading-[0.92] uppercase">Momentum without meal prep.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-[#B7CDE8] border border-[#B7CDE8]">
            {[
              ["Frozen at peak", "Meals are designed to keep quality and convenience working together."],
              ["Ready in minutes", "A useful meal should be faster than the fallback it replaces."],
              ["High-protein choice", "Clear product information makes selecting for your routine easier."],
              ["Flexible by design", "Buy one-off, choose a set bundle, or subscribe when consistency matters."],
            ].map(([title, copy], i) => (
              <div key={title} className="bg-white p-7 min-h-[220px]">
                <span className="font-mono text-[10px] text-[#3975BE]">0{i + 1}</span>
                <h3 className="font-display text-[22px] font-black uppercase mt-8">{title}</h3>
                <p className="text-[#526B86] text-[14px] leading-relaxed mt-3">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#071B35] text-white px-6 py-20 text-center">
        <p className="text-[#72A7FF] text-[10px] font-mono uppercase tracking-[0.4em] mb-5">Freezer confidence starts here</p>
        <h2 className="font-display text-[40px] sm:text-[56px] font-black uppercase">Choose your way to order.</h2>
        <button onClick={() => navigate("ready-series-order")} className="mt-8 bg-[#F5B300] text-[#071B35] px-8 py-4 text-[12px] font-black uppercase tracking-[0.18em] hover:bg-white transition-colors">View order options</button>
      </section>
    </div>
  );
}
