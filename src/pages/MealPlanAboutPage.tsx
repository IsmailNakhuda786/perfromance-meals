import { Page } from "@/data";
import { MealPlanLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

export default function MealPlanAboutPage({ navigate, navigateToWizard }: Props) {
  return (
    <div className="min-h-screen bg-[#F4EFE7] text-[#2A231D]">
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 sm:py-28 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        <div>
          <MealPlanLogo size="md" variant="light" />
          <p className="text-[#9B4A2F] text-[11px] font-mono tracking-[0.42em] uppercase mt-16 mb-5">A programme, not a product pile</p>
          <h1 className="font-display text-[48px] sm:text-[70px] font-semibold leading-[0.9]">Structure that<br /><span className="italic font-light text-[#9B4A2F]">moves with you.</span></h1>
          <p className="text-[#6D5C50] text-[17px] leading-relaxed max-w-[560px] mt-7">Meal Plan is the guided side of Performance Meals: a recurring programme shaped around a goal, an eating routine, and the consistency required to make progress feel realistic.</p>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=900&h=1050&fit=crop&auto=format" alt="A balanced meal as part of an active routine" className="w-full h-[580px] object-cover rounded-t-full" />
          <div className="absolute -bottom-5 -left-5 bg-[#A8B49B] px-6 py-5 text-[#233021] text-[11px] font-mono uppercase tracking-widest">Fresh meals · guided rhythm</div>
        </div>
      </section>
      <section className="bg-[#2F3B31] text-[#F4EFE7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 grid md:grid-cols-3 gap-10">
          {[
            ["01", "Choose a direction", "Start with the approved programme pathway that best reflects your current goal."],
            ["02", "Shape your menu", "Make selections inside the existing structured meal programme — without changing its rules."],
            ["03", "Build consistency", "Receive the recurring support of a plan designed for an ongoing routine."],
          ].map(([n, title, copy]) => (
            <div key={n} className="border-t border-[#A8B49B]/40 pt-6">
              <span className="font-mono text-[10px] text-[#C98B70]">{n}</span>
              <h2 className="font-display text-[25px] font-semibold mt-8">{title}</h2>
              <p className="text-[#F4EFE7]/55 text-[14px] leading-relaxed mt-3">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 py-20 text-center">
        <p className="text-[#9B4A2F] text-[10px] font-mono uppercase tracking-[0.4em] mb-5">Your programme starts with clarity</p>
        <h2 className="font-display text-[40px] sm:text-[55px] font-semibold">Find the plan for your routine.</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <button onClick={() => navigateToWizard()} className="bg-[#9B4A2F] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-[#2F3B31] transition-colors">Start Meal Plan</button>
          <button onClick={() => navigate("meal-plan-stories")} className="border border-[#9B4A2F]/40 text-[#9B4A2F] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] hover:border-[#9B4A2F] transition-colors">Customer Stories</button>
        </div>
      </section>
    </div>
  );
}
