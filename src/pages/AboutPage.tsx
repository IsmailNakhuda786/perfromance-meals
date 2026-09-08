import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

export default function AboutPage({ navigate, navigateToWizard }: Props) {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111]">

      {/* Hero */}
      <section className="bg-[#111] text-white">
        <div className="max-w-[1440px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase mb-4">About Fresher</div>
            <h1 className="font-display text-[48px] sm:text-[64px] font-bold leading-none mb-6">
              Food built for<br />performance.
            </h1>
            <p className="text-white/60 text-[16px] leading-relaxed mb-8 max-w-lg">
              Fresher was born in Singapore from a simple frustration — healthy food was either tasteless, inconvenient, or impossible to track. We fixed all three.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => navigate("ready-to-go")}
                className="bg-[#CDFF3A] text-[#111] px-6 py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors">
                Shop Meals →
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
            <div className="absolute bottom-4 left-4 bg-[#CDFF3A] px-4 py-3">
              <div className="font-display text-[22px] font-bold text-[#111]">6in60™</div>
              <div className="text-[#111] text-[11px] font-semibold tracking-wider">Guaranteed results</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#CDFF3A]">
        <div className="max-w-[1440px] mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { val: "8,400+", label: "Happy Customers" },
            { val: "9", label: "Chef-Made Meals" },
            { val: "60 Days", label: "Guaranteed Results" },
            { val: "3 mins", label: "Heat & Eat" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-[36px] sm:text-[44px] font-bold text-[#111]">{s.val}</div>
              <div className="text-[#111]/60 text-[12px] tracking-wider uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 border-b border-[#E5E2DA]">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&h=500&fit=crop&auto=format"
            alt="Fresh meal prep" className="w-full object-cover" style={{ height: 400 }} />
          <div>
            <div className="font-mono text-[10px] tracking-[0.45em] text-[#111]/30 uppercase mb-4">Our Story</div>
            <h2 className="font-display text-[36px] font-bold mb-5">We cook. You perform.</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">
              Founded in 2022 by Jerome Tan, Fresher started as a weekend meal prep project for his gym community in Toa Payoh. Within 6 months, word spread — the food was too good to stay local.
            </p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">
              Today our team of chefs prepares every meal fresh each week, frozen at peak nutrition and delivered to your door across Singapore. Every recipe is macro-engineered by our nutritionists and taste-tested obsessively.
            </p>
            <p className="text-[#555] text-[15px] leading-relaxed">
              The 6in60 Promise is our guarantee: follow the plan, and you lose 6kg in 60 days — or we refund you completely, no questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-20 border-b border-[#E5E2DA]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="font-mono text-[10px] tracking-[0.45em] text-[#111]/30 uppercase mb-3">What we believe</div>
            <h2 className="font-display text-[36px] font-bold">Our principles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🥩", title: "Real food, real results", desc: "No powders, no shortcuts. Every meal uses whole ingredients prepared by trained chefs. You eat food, not supplements." },
              { icon: "📊", title: "Macros that actually work", desc: "Every gram of protein, carbs and fat is calculated to hit your specific goal — whether that's cutting fat, maintaining performance, or building muscle." },
              { icon: "⏱️", title: "Convenience without compromise", desc: "3 minutes from freezer to table. Vacuum-sealed to lock in nutrition. Delivered on your schedule, to your door." },
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
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="font-mono text-[10px] tracking-[0.45em] text-[#111]/30 uppercase mb-3">The team</div>
            <h2 className="font-display text-[36px] font-bold">Built by people who train</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Jerome Tan", role: "Founder & CEO", desc: "Former competitive swimmer. Built Fresher because clean eating shouldn't require a nutrition degree.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format" },
              { name: "Chef Marcus Yeo", role: "Head Chef", desc: "10 years in professional kitchens. Obsessed with making healthy food taste like you're cheating.", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&auto=format" },
              { name: "Dr. Aisha Lim", role: "Lead Nutritionist", desc: "Sports dietitian. Designed every macro target in every plan. She doesn't compromise on the numbers.", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&auto=format" },
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
      <section className="bg-[#111] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <div className="font-mono text-[10px] tracking-[0.45em] text-[#CDFF3A] uppercase mb-4">Ready to start?</div>
          <h2 className="font-display text-[40px] sm:text-[52px] font-bold mb-4">Lose 6kg in 60 days.<br />Guaranteed.</h2>
          <p className="text-white/50 text-[15px] mb-8">If you don't see results, we refund you in full. No questions asked.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => navigateToWizard()}
              className="bg-[#CDFF3A] text-[#111] px-8 py-4 text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors">
              Start Meal Plan →
            </button>
            <button onClick={() => navigate("ready-to-go")}
              className="border border-white/20 text-white px-8 py-4 text-[13px] font-bold tracking-[0.15em] uppercase hover:border-white transition-colors">
              Shop Ready-to-Go
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
