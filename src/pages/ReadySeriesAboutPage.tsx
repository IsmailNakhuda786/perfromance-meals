import { Page } from "@/data";
import { ReadySeriesLogo } from "@/components/Logos";

interface Props {
  navigate: (page: Page) => void;
}

const familyImage = "https://images.unsplash.com/photo-1612698940563-143c627668e4?w=1600&h=1000&fit=crop&auto=format&q=85";
const kitchenImage = "https://images.unsplash.com/photo-1668838289210-e7665d947145?w=1200&h=900&fit=crop&auto=format&q=85";
const preparationImage = "https://images.unsplash.com/photo-1668838225765-daa3a5da6207?w=1200&h=900&fit=crop&auto=format&q=85";

export default function ReadySeriesAboutPage({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#1A1A1A]">
      {/* Hero — a human story, not a product diagram */}
      <section className="relative min-h-[760px] overflow-hidden flex items-end">
        <img
          src={familyImage}
          alt="Family sharing a meal together at home"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-10 pb-16 sm:pb-24 pt-32">
          <div className="max-w-[720px]">
            <ReadySeriesLogo size="md" variant="dark" />
            <p className="text-[#F5B300] text-[10px] font-bold tracking-[0.28em] uppercase mt-14 mb-6">Made for real life in Singapore</p>
            <h1 className="font-display text-[48px] sm:text-[68px] lg:text-[82px] font-black leading-[0.9] tracking-[-0.045em] text-white">
              More good days start with a meal that’s ready.
            </h1>
            <p className="text-white/75 text-[17px] sm:text-[19px] leading-relaxed max-w-[620px] mt-7">
              Ready Series exists for the late meeting, the school run, the training night, and every plan that changes. Proper food in the freezer means one less compromise when life gets full.
            </p>
            <button
              onClick={() => navigate("ready-series-order")}
              className="group mt-9 inline-flex items-center gap-6 rounded-full bg-[#F5B300] text-[#1A1A1A] pl-7 pr-2 py-2 text-[11px] font-extrabold tracking-[0.16em] uppercase hover:bg-white transition-colors duration-300"
            >
              Explore the meals
              <span className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Why it began */}
      <section className="px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-24">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#F5B300]" />
              <p className="text-[#806A2A] text-[10px] font-bold tracking-[0.24em] uppercase">The Ready Series story</p>
            </div>
            <h2 className="font-display text-[42px] sm:text-[58px] font-black leading-[0.94] tracking-[-0.035em]">
              Life moves quickly.<br />Eating well should keep up.
            </h2>
          </div>
          <div className="lg:pt-10">
            <p className="text-[#4F4841] text-[18px] leading-relaxed">
              Performance Meals began with a simple belief: busy people should not have to choose between food that supports them and food that fits their schedule.
            </p>
            <p className="text-[#756B62] text-[15px] leading-relaxed mt-6">
              Ready Series brings that belief into the everyday. It is the flexible side of our kitchen—meals you can keep on hand, choose on your terms, and reach for without reorganising your entire week.
            </p>
            <div className="grid sm:grid-cols-3 gap-px bg-[#D9D1C6] border border-[#D9D1C6] mt-10">
              {[
                ["Minutes", "From freezer to table"],
                ["Your way", "Single, bundle, or subscription"],
                ["Always there", "A dependable meal at home"],
              ].map(([value, label]) => (
                <div key={value} className="bg-white px-5 py-6">
                  <div className="font-display text-[20px] font-extrabold">{value}</div>
                  <div className="text-[#81776D] text-[11px] leading-relaxed mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it is made */}
      <section className="bg-[#1A1A1A] text-white px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
            <div>
              <p className="text-[#F5B300] text-[10px] font-bold tracking-[0.25em] uppercase mb-5">From our kitchen to your freezer</p>
              <h2 className="font-display text-[42px] sm:text-[60px] font-black leading-[0.92] tracking-[-0.035em]">
                How Ready Series<br />comes together.
              </h2>
            </div>
            <p className="text-white/55 text-[16px] leading-relaxed max-w-[500px] lg:justify-self-end">
              The format is convenient, but the thinking behind it is deliberate. Every stage is designed to make the final meal clear, dependable, and genuinely useful.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-12">
            <img src={kitchenImage} alt="Food being prepared in a professional kitchen" className="w-full h-[340px] sm:h-[430px] object-cover rounded-2xl" />
            <div className="grid grid-rows-2 gap-5">
              <img src={preparationImage} alt="Prepared ingredients in a professional kitchen" className="w-full h-full min-h-[200px] object-cover rounded-2xl" />
              <img src="/d006a.png" alt="Ready Series prepared meals" className="w-full h-full min-h-[200px] object-cover rounded-2xl" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              ["01", "Cook with purpose", "Meals begin in the same trusted Performance Meals kitchen, with flavour and everyday usefulness considered together."],
              ["02", "Portion with clarity", "Each option presents its protein, calories, and meal information clearly so customers can choose with confidence."],
              ["03", "Freeze for the moment ahead", "Meals are frozen after preparation to help preserve quality until the day they are needed."],
              ["04", "Ready when life changes", "Keep it in the freezer, heat it in minutes, and make a busy day feel more manageable."],
            ].map(([number, title, copy]) => (
              <div key={number} className="bg-[#1A1A1A] px-6 py-8 min-h-[260px] flex flex-col">
                <span className="font-mono text-[10px] text-[#F5B300]">{number}</span>
                <div className="mt-auto pt-12">
                  <h3 className="font-display text-[20px] font-extrabold">{title}</h3>
                  <p className="text-white/45 text-[13px] leading-relaxed mt-3">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Everyday impact */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 bg-[#FFFDF8]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-[760px] mx-auto mb-14">
            <p className="text-[#806A2A] text-[10px] font-bold tracking-[0.24em] uppercase mb-5">Why it matters</p>
            <h2 className="font-display text-[42px] sm:text-[58px] font-black leading-[0.94] tracking-[-0.035em]">
              Not every important meal happens on schedule.
            </h2>
            <p className="text-[#71685F] text-[15px] leading-relaxed mt-6">
              Ready Series is not about replacing the meals you love. It is about protecting the moments when time, energy, or plans would otherwise push a proper meal aside.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["After the late meeting", "Dinner is already handled, so a long workday does not have to end with another decision."],
              ["Between training and home", "A clear, high-protein option is ready when recovery matters and time is short."],
              ["When the family day changes", "A useful backup in the freezer creates room for the people and plans that need attention first."],
            ].map(([title, copy], index) => (
              <article key={title} className="bg-[#F7F2E8] border border-[#DED7CD] rounded-2xl p-7 min-h-[290px] flex flex-col hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(52,42,30,0.10)] transition-all duration-300">
                <span className="font-mono text-[10px] text-[#A67A16]">0{index + 1}</span>
                <div className="mt-auto">
                  <h3 className="font-display text-[24px] font-extrabold leading-tight">{title}</h3>
                  <p className="text-[#71685F] text-[13px] leading-relaxed mt-4">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase clarity */}
      <section className="bg-[#F5B300] px-6 sm:px-10 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4">One range, three ways to buy</p>
            <h2 className="font-display text-[38px] sm:text-[48px] font-black leading-[0.95]">Choose what fits this season of life.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-px bg-black/15">
            {[
              ["Individual", "Choose exactly what you want, once."],
              ["Bundles", "Stock up with a predefined selection."],
              ["Subscription", "Keep your freezer ready on a recurring plan."],
            ].map(([title, copy]) => (
              <div key={title} className="bg-[#F5B300] px-5 py-6">
                <h3 className="font-display text-[18px] font-extrabold">{title}</h3>
                <p className="text-black/60 text-[12px] leading-relaxed mt-2">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional close */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <img src={familyImage} alt="People enjoying time together around a shared meal" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 py-20 text-center text-white">
          <p className="text-[#F5B300] text-[10px] font-bold uppercase tracking-[0.25em] mb-6">Ready for the life around the meal</p>
          <h2 className="font-display text-[42px] sm:text-[64px] font-black leading-[0.92] tracking-[-0.04em]">
            Less time solving dinner.<br />More time living it.
          </h2>
          <p className="text-white/65 text-[16px] leading-relaxed max-w-[600px] mx-auto mt-6">
            Put a better fallback in the freezer and give tomorrow’s busy version of you one less thing to carry.
          </p>
          <button onClick={() => navigate("ready-series-order")} className="mt-9 rounded-full bg-[#F5B300] text-[#1A1A1A] px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.16em] hover:bg-white transition-colors">
            Find your Ready Series
          </button>
        </div>
      </section>
    </div>
  );
}
