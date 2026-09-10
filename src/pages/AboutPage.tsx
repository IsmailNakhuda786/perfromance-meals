import { Page } from "@/data";
import { PerformanceMealsLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

export default function AboutPage({ navigate, navigateToWizard }: Props) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">

      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <PerformanceMealsLogo size="lg" variant="light" />
            </div>
            <h1 className="font-display text-[48px] sm:text-[64px] font-bold leading-none mb-6">
              The gold standard<br />for meal prep.
            </h1>
            <p className="text-white/60 text-[16px] leading-relaxed mb-8 max-w-lg">
              Performance Meals was built in Singapore on a simple belief — healthy eating should be easy, enjoyable, and sustainable. Real food for real routines.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => navigate("ready-series")}
                className="bg-[#F5B300] text-[#1A1A1A] px-6 py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors">
                Shop Ready-Series →
              </button>
              <button onClick={() => navigateToWizard()}
                className="border border-white/20 text-white px-6 py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-colors">
                View Meal Plans
              </button>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=700&h=500&fit=crop&auto=format"
              alt="Chef preparing meals" className="w-full object-cover" style={{ height: 420 }} />
            <div className="absolute bottom-4 left-4 bg-[#F5B300] px-4 py-3">
              <div className="font-display text-[18px] font-bold text-[#1A1A1A]">One Standard</div>
              <div className="text-[#1A1A1A] text-[11px] font-semibold tracking-wider">Two clear offers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#F5B300]">
        <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { val: "8,400+", label: "Happy Customers" },
            { val: "40+", label: "Meal Options" },
            { val: "2 brands", label: "Fresh & Frozen" },
            { val: "3 mins", label: "Heat & Eat" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-[36px] sm:text-[44px] font-bold text-[#1A1A1A]">{s.val}</div>
              <div className="text-[#1A1A1A]/60 text-[12px] tracking-wider uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 border-b border-[#E5E2DA]">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&h=500&fit=crop&auto=format"
            alt="Fresh meal prep" className="w-full object-cover" style={{ height: 400 }} />
          <div>
            <div className="font-mono text-[10px] tracking-[0.45em] text-[#1A1A1A]/30 uppercase mb-4">Our Story</div>
            <h2 className="font-display text-[36px] font-bold mb-5">We cook. You perform.</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">
              Founded in Singapore, Performance Meals started as a meal prep project for a local fitness community. Within months, word spread — the food was too good and too practical to stay local.
            </p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">
              Today our team of chefs prepares every Meal Plan dish fresh each week, and freezes Ready-Series meals at peak nutritional freshness — all delivered across Singapore. Every recipe is macro-tracked by our nutritionists and taste-tested obsessively.
            </p>
            <p className="text-[#555] text-[15px] leading-relaxed">
              Our purpose: to make exceptional meal prep accessible to every customer, with care in every experience.
            </p>

            {/* Mission & Vision blocks — from brand template */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="border-l-4 border-[#F5B300] pl-5 py-1">
                <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-[#1A1A1A]/30 mb-2">Mission</div>
                <p className="text-[#1A1A1A] text-[14px] leading-relaxed font-medium">
                  To deliver exceptional meals and thoughtful support that make healthy eating easier every day.
                </p>
              </div>
              <div className="border-l-4 border-[#F5B300] pl-5 py-1">
                <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-[#1A1A1A]/30 mb-2">Vision</div>
                <p className="text-[#1A1A1A] text-[14px] leading-relaxed font-medium">
                  For Performance Meals to be the gold standard in meal prep — trusted by people to eat well, every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-20 border-b border-[#E5E2DA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="font-mono text-[10px] tracking-[0.45em] text-[#1A1A1A]/30 uppercase mb-3">What we believe</div>
            <h2 className="font-display text-[36px] font-bold">Our principles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🥩", title: "Real food, real routines", desc: "No powders, no shortcuts. Every meal uses whole ingredients prepared by trained chefs. Healthy eating should be enjoyable, not a punishment." },
              { icon: "📊", title: "Nutrition that works as hard as you do", desc: "Every gram of protein, carbs, and fat is calculated to hit your specific goal — whether that's cutting fat, maintaining performance, or building muscle." },
              { icon: "⏱️", title: "Convenience without compromise", desc: "3 minutes from freezer to table. Vacuum-sealed to lock in nutrition. Delivered fresh or frozen on your schedule, to your door." },
            ].map((v) => (
              <div key={v.title} className="bg-white border border-[#E5E2DA] p-7">
                <div className="text-[36px] mb-4">{v.icon}</div>
                <h3 className="font-display text-[20px] font-bold mb-3">{v.title}</h3>
                <p className="text-[#666] text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 border-b border-[#E5E2DA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="font-mono text-[10px] tracking-[0.45em] text-[#1A1A1A]/30 uppercase mb-3">The team</div>
            <h2 className="font-display text-[36px] font-bold">Built by people who care about daily habits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Jerome Tan", role: "Founder & CEO", desc: "Built Performance Meals because clean eating should not require a nutrition degree. Focused on consistency and progress, not perfection.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format" },
              { name: "Chef Marcus Yeo", role: "Head Chef", desc: "10 years in professional kitchens. Obsessed with making healthy food taste like you are genuinely enjoying it.", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&auto=format" },
              { name: "Dr. Aisha Lim", role: "Lead Nutritionist", desc: "Sports dietitian. Designed every macro target across every programme. Practical guidance, not prescriptive perfection.", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&auto=format" },
            ].map((m) => (
              <div key={m.name} className="text-center">
                <img src={m.img} alt={m.name} className="w-28 h-28 object-cover rounded-full mx-auto mb-4 grayscale" />
                <div className="font-bold text-[16px]">{m.name}</div>
                <div className="text-[12px] font-mono text-[#888] tracking-wider uppercase mt-0.5 mb-3">{m.role}</div>
                <p className="text-[#666] text-[13px] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="font-mono text-[10px] tracking-[0.45em] text-[#F5B300] uppercase mb-4">Ready to start?</div>
          <h2 className="font-display text-[40px] sm:text-[52px] font-bold mb-4">
            Nutrition that works<br />as hard as you do.
          </h2>
          <p className="text-white/50 text-[15px] mb-8">Choose your journey — fresh structure or frozen flexibility.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => navigateToWizard()}
              className="px-8 py-4 text-[13px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A] hover:opacity-90 transition-colors"
              style={{ backgroundColor: "#E85D04" }}>
              Start Meal Plan →
            </button>
            <button onClick={() => navigate("ready-series")}
              className="bg-[#F5B300] text-[#1A1A1A] px-8 py-4 text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors">
              Shop Ready-Series →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
