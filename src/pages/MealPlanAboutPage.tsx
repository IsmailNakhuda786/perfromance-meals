import { Page } from "@/data";
import { MealPlanLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

const heroImage = "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=1000&h=1200&fit=crop&auto=format&q=85";
const routineImage = "https://images.unsplash.com/photo-1695654689751-a6e9086c13e2?w=1200&h=900&fit=crop&auto=format&q=85";
const kitchenImage = "https://images.unsplash.com/photo-1574966740793-953ad374e8fe?w=900&h=1100&fit=crop&auto=format&q=85";
const platingImage = "https://images.unsplash.com/photo-1761095596765-c8abe01d3aea?w=900&h=1100&fit=crop&auto=format&q=85";
const mealImage = "https://images.unsplash.com/photo-1591931026145-a66b07efda27?w=1200&h=900&fit=crop&auto=format&q=85";

export default function MealPlanAboutPage({ navigate, navigateToWizard }: Props) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A1A]">
      {/* Existing boutique hero direction retained */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 sm:py-28 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        <div>
          <MealPlanLogo size="md" variant="light" />
          <p className="text-[#E85D04] text-[11px] font-semibold tracking-[0.3em] uppercase mt-16 mb-5">Boutique progress · built around your goal</p>
          <h1 className="font-display text-[48px] sm:text-[70px] font-semibold leading-[0.9] tracking-[-0.035em]">
            Structure that<br /><span className="italic font-light text-[#E85D04]">moves with you.</span>
          </h1>
          <p className="text-[#675F58] text-[17px] leading-relaxed max-w-[580px] mt-7">
            Meal Plan is the guided side of Performance Meals: fresh, structured meals and a clear recurring rhythm that take nutrition planning off your plate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <button onClick={() => navigateToWizard()} className="rounded-full bg-[#E85D04] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#1A1A1A] transition-colors">Start your plan</button>
            <button onClick={() => navigate("meal-plan-stories")} className="rounded-full border border-[#1A1A1A]/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] hover:border-[#1A1A1A] transition-colors">Read customer journeys</button>
          </div>
        </div>
        <div className="relative">
          <img src={heroImage} alt="A balanced meal as part of an active routine" className="w-full h-[580px] object-cover rounded-t-full" />
          <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-[#E85D04] text-white px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.18em]">Fresh meals · guided rhythm</div>
        </div>
      </section>

      {/* Why it exists */}
      <section className="bg-[#1A1A1A] text-white px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-24 items-center">
          <div>
            <p className="text-[#E85D04] text-[10px] font-bold tracking-[0.25em] uppercase mb-5">Why Meal Plan exists</p>
            <h2 className="font-display text-[42px] sm:text-[60px] font-semibold leading-[0.94] tracking-[-0.035em]">
              Your goal needs a routine, not more guesswork.
            </h2>
            <p className="text-white/55 text-[16px] leading-relaxed mt-7 max-w-[560px]">
              Planning meals, shopping, preparing food, calculating portions, and repeating it every week creates friction. Meal Plan turns those repeated decisions into one considered programme.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl min-h-[500px]">
            <img src={routineImage} alt="Busy professionals planning their routine together" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-x-5 bottom-5 bg-white text-[#1A1A1A] rounded-2xl p-6 shadow-2xl">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#E85D04]">The customer job</p>
              <p className="font-display text-[22px] font-semibold leading-tight mt-2">Make better nutrition easier to sustain inside a full life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-end mb-12">
            <div>
              <p className="text-[#E85D04] text-[10px] font-bold tracking-[0.25em] uppercase mb-5">What Meal Plan is</p>
              <h2 className="font-display text-[42px] sm:text-[58px] font-semibold leading-[0.94] tracking-[-0.035em]">A programme with clear guardrails.</h2>
            </div>
            <p className="text-[#6D655E] text-[15px] leading-relaxed max-w-[520px] lg:justify-self-end">
              It is not an unrestricted meal box. Your goal establishes the programme, the plan defines what is included, and meal selection happens inside the approved structure.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["01", "Goal-first start", "Begin with Cut, Maintain, Gain, or an approved fixed programme so the plan has a clear purpose."],
              ["02", "Fresh structured meals", "Predefined plan information sets the meal framework before menu choices are made."],
              ["03", "A visible menu rhythm", "Biweekly shows 2 weeks; Monthly shows 4. The preview follows the selected recurring period."],
              ["04", "Account-managed continuity", "Sign-in is required so delivery, plan status, pauses, and permitted changes stay connected."],
            ].map(([number, title, copy]) => (
              <article key={number} className="bg-white border border-[#E3DDD5] rounded-2xl p-7 min-h-[310px] flex flex-col hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(42,35,29,0.08)] transition-all duration-300">
                <span className="font-mono text-[10px] text-[#E85D04]">{number}</span>
                <div className="mt-auto">
                  <h3 className="font-display text-[21px] font-semibold">{title}</h3>
                  <p className="text-[#736A62] text-[13px] leading-relaxed mt-3">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation story */}
      <section className="bg-white border-y border-[#E3DDD5] px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-[760px] mb-14">
            <p className="text-[#E85D04] text-[10px] font-bold tracking-[0.25em] uppercase mb-5">How the meals are prepared</p>
            <h2 className="font-display text-[42px] sm:text-[58px] font-semibold leading-[0.94] tracking-[-0.035em]">The structure is planned. The food is still the point.</h2>
            <p className="text-[#6D655E] text-[15px] leading-relaxed mt-6">Meal Plan pairs programme logic with fresh meal preparation, clear food information, and a menu experience designed to feel considered rather than clinical.</p>
          </div>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-5 mb-12">
            <img src={kitchenImage} alt="Chef preparing fresh ingredients in a professional kitchen" className="w-full h-[560px] object-cover rounded-2xl" />
            <div className="grid sm:grid-cols-2 gap-5">
              <img src={platingImage} alt="Chef carefully plating a prepared meal" className="w-full h-[270px] object-cover rounded-2xl" />
              <img src={mealImage} alt="Finished fresh meal ready for the customer" className="w-full h-[270px] object-cover rounded-2xl" />
              <div className="sm:col-span-2 bg-[#F3EEE7] rounded-2xl p-7 min-h-[270px] grid sm:grid-cols-2 gap-7">
                {[
                  ["Plan the menu", "Programme and recurring period establish the structured menu view."],
                  ["Prepare with care", "Meals are prepared through the shared Performance Meals kitchen standard."],
                  ["Portion with clarity", "Meal and programme information helps customers understand what is included."],
                  ["Deliver the routine", "Fresh meals arrive as part of the selected programme and delivery structure."],
                ].map(([title, copy]) => (
                  <div key={title} className="border-t border-[#D8CEC3] pt-4">
                    <h3 className="font-display text-[17px] font-semibold">{title}</h3>
                    <p className="text-[#756C64] text-[12px] leading-relaxed mt-2">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme logic */}
      <section className="bg-[#2B241F] text-white px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-end mb-12">
            <div>
              <p className="text-[#E85D04] text-[10px] font-bold tracking-[0.25em] uppercase mb-5">The programme logic</p>
              <h2 className="font-display text-[42px] sm:text-[58px] font-semibold leading-[0.94] tracking-[-0.035em]">Choose the rhythm that matches your life.</h2>
            </div>
            <p className="text-white/50 text-[15px] leading-relaxed max-w-[520px] lg:justify-self-end">Recurring subscriptions cover Monday to Friday. Fixed 6 by 60 programmes remain a separate path with all-week coverage.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              ["Biweekly", "2-week menu view", "Mon–Fri coverage · renews every 2 weeks"],
              ["Monthly", "4-week menu view", "Mon–Fri coverage · renews every month"],
              ["2 Months", "Structured menu view", "Mon–Fri coverage · renews every 2 months"],
            ].map(([title, view, copy]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 min-h-[230px]">
                <h3 className="font-display text-[26px] font-semibold">{title}</h3>
                <div className="text-[#E85D04] text-[11px] font-bold uppercase tracking-[0.14em] mt-6">{view}</div>
                <p className="text-white/45 text-[13px] leading-relaxed mt-3">{copy}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-[#E85D04] text-white p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">Separate fixed programmes</p>
              <h3 className="font-display text-[30px] font-semibold mt-2">6 by 60 and 6 by 60 Plus</h3>
              <p className="text-white/70 text-[13px] leading-relaxed max-w-[700px] mt-2">60-day, all-week programmes for the approved 6kg+ goal pathway. Plus adds the approved muscle-support direction.</p>
            </div>
            <button onClick={() => navigateToWizard("CUT")} className="shrink-0 rounded-full bg-white text-[#1A1A1A] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-[#1A1A1A] hover:text-white transition-colors">Explore programmes</button>
          </div>
        </div>
      </section>

      {/* Time value */}
      <section className="px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="text-[#E85D04] text-[10px] font-bold tracking-[0.25em] uppercase mb-5">What Meal Plan gives back</p>
          <h2 className="font-display text-[42px] sm:text-[58px] font-semibold leading-[0.94] tracking-[-0.035em]">Less planning around food. More attention for everything else.</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-left mt-12">
            {[
              ["Planning", "A programme framework replaces the repeated question of what to organise next."],
              ["Preparation", "Fresh prepared meals reduce the cooking and cleanup load across the working week."],
              ["Decision-making", "Clear plan information and structured menus narrow the choices that matter."],
            ].map(([title, copy]) => (
              <div key={title} className="border-t-2 border-[#E85D04] pt-6">
                <h3 className="font-display text-[22px] font-semibold">{title}</h3>
                <p className="text-[#70675F] text-[13px] leading-relaxed mt-3">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E85D04] text-white px-6 py-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70 mb-5">Exceptional meals · practical guidance · meaningful progress</p>
        <h2 className="font-display text-[42px] sm:text-[58px] font-semibold">Build a routine around your goal.</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <button onClick={() => navigateToWizard()} className="rounded-full bg-white text-[#1A1A1A] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#1A1A1A] hover:text-white transition-colors">Start Meal Plan</button>
          <button onClick={() => navigate("meal-plan-stories")} className="rounded-full border border-white/35 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] hover:border-white transition-colors">Read customer journeys</button>
        </div>
      </section>
    </div>
  );
}
