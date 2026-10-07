import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

const stories = [
  { label: "Demo story · copy pending approval", title: "A calmer weekday rhythm", quote: "Reserved for a verified customer account of how the programme fits around meetings, training, and family time.", image: "https://images.unsplash.com/photo-1539137071648-943c78fcbc84?w=900&h=1100&fit=crop&auto=format" },
  { label: "Demo story · imagery pending consent", title: "Consistency over intensity", quote: "Reserved for an approved story about programme experience, food enjoyment, support, and sustainable routine.", image: "https://images.unsplash.com/photo-1587996580981-bd03dde74843?w=900&h=1100&fit=crop&auto=format" },
];

export default function MealPlanStoriesPage({ navigate, navigateToWizard }: Props) {
  return (
    <div className="min-h-screen bg-[#EEE7DC] text-[#2A231D]">
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 pt-20 pb-16">
        <div className="max-w-[800px]">
          <p className="text-[#9B4A2F] text-[11px] font-mono tracking-[0.42em] uppercase mb-5">Customer stories</p>
          <h1 className="font-display text-[52px] sm:text-[78px] font-semibold leading-[0.88]">Progress is personal.<br /><span className="italic font-light text-[#75816D]">The routine is shared.</span></h1>
          <p className="text-[#6D5C50] text-[17px] leading-relaxed max-w-[620px] mt-8">This editorial space is ready for verified customer voices, approved imagery, and consented programme stories. No outcome claims are shown until source material is supplied.</p>
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 pb-24 grid lg:grid-cols-2 gap-6">
        {stories.map((story, index) => (
          <article key={story.title} className={`bg-[#F8F4EE] ${index === 1 ? "lg:mt-24" : ""}`}>
            <div className="relative h-[500px] overflow-hidden">
              <img src={story.image} alt="Demo editorial placeholder for a future customer story" className="w-full h-full object-cover sepia-[18%]" />
              <span className="absolute top-5 left-5 bg-[#2F3B31] text-white px-4 py-2 text-[9px] font-mono uppercase tracking-widest">{story.label}</span>
            </div>
            <div className="p-8 sm:p-10">
              <span className="text-[#9B4A2F] text-[48px] font-display leading-none">“</span>
              <h2 className="font-display text-[30px] font-semibold mt-2">{story.title}</h2>
              <p className="text-[#6D5C50] leading-relaxed mt-4">{story.quote}</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#9B4A2F] mt-8">Placeholder — not a customer claim</p>
            </div>
          </article>
        ))}
      </section>
      <section className="bg-[#2F3B31] text-white px-6 py-20 text-center">
        <p className="text-[#C98B70] text-[10px] font-mono uppercase tracking-[0.4em] mb-5">Write your own routine</p>
        <h2 className="font-display text-[40px] sm:text-[55px] font-semibold">Explore the Meal Plan programme.</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <button onClick={() => navigateToWizard()} className="bg-[#C46F50] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-white hover:text-[#2F3B31] transition-colors">Start ordering</button>
          <button onClick={() => navigate("meal-plan-about")} className="border border-white/30 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] hover:border-white transition-colors">How it works</button>
        </div>
      </section>
    </div>
  );
}
