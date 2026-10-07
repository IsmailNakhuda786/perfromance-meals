import { Page } from "@/data"
import { MealPlanLogo } from "@/components/Logos"

interface Props {
  navigate: (page: Page) => void
  navigateToWizard: (plan?: string) => void
}

const heroImage =
  "https://images.unsplash.com/photo-1695653422557-3b85c1d6d061?w=1500&h=1000&fit=crop&auto=format&q=85"
const professionalImage =
  "https://images.unsplash.com/photo-1695654400381-3f1db5e8d656?w=1000&h=1200&fit=crop&auto=format&q=85"
const routineImage =
  "https://images.unsplash.com/photo-1585838518259-0ceb89d92cd2?w=1000&h=1200&fit=crop&auto=format&q=85"
const familyImage =
  "https://images.unsplash.com/photo-1695654687832-7ee8241cb346?w=1000&h=1200&fit=crop&auto=format&q=85"
const trainingImage =
  "https://images.unsplash.com/photo-1751456357820-c2030c293c71?w=1200&h=900&fit=crop&auto=format&q=85"

const journeys = [
  {
    number: "02",
    image: routineImage,
    title: "Returning to a routine after a demanding season",
    context:
      "When work, travel, or family needs disrupt familiar habits, restarting can feel harder than beginning.",
    role: "A goal-first programme creates a defined next step, while fresh weekday meals reduce the preparation burden during the return.",
    rhythm: "Monthly programme · Recurring rhythm",
  },
  {
    number: "03",
    image: familyImage,
    title: "Making weekday food simpler for a full household",
    context:
      "The person organising meals often carries the planning, shopping, cooking, and cleanup decisions for everyone.",
    role: "A structured Monday–Friday plan can protect time and attention without turning the week into another optimisation project.",
    rhythm: "Balanced routine · Biweekly rhythm",
  },
  {
    number: "04",
    image: trainingImage,
    title: "Supporting training without living around meal prep",
    context:
      "Consistent training asks for consistent food, but the work around that food can compete with recovery and the rest of life.",
    role: "A predefined programme and clear meal information make the routine easier to repeat while keeping the customer’s goal visible.",
    rhythm: "Performance direction · Structured programme",
  },
]

export default function MealPlanStoriesPage({
  navigate,
  navigateToWizard,
}: Props) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A1A]">
      {/* Editorial hero */}
      <section className="relative min-h-[720px] overflow-hidden flex items-end">
        <img
          src={heroImage}
          alt="Professionals discussing their routine together"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />
        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 sm:px-10 py-16 sm:py-24 text-white">
          <MealPlanLogo size="sm" variant="dark" />
          <p className="text-[#E85D04] text-[10px] font-bold tracking-[0.25em] uppercase mt-14 mb-6">
            Customer journeys
          </p>
          <h1 className="font-display text-[50px] sm:text-[72px] lg:text-[82px] font-semibold leading-[0.9] tracking-[-0.04em] max-w-[850px]">
            Real life is the reason the plan exists.
          </h1>
          <p className="text-white/70 text-[17px] leading-relaxed max-w-[620px] mt-7">
            Meal Plan is not only about what arrives. It is about the planning,
            decisions, and weekday pressure that no longer have to be carried
            alone.
          </p>
        </div>
      </section>

      {/* Honest content status */}
      <section className="bg-[#E85D04] text-white px-6 py-5">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="font-display text-[18px] font-semibold">
            Story content awaiting verified customer approvals.
          </p>
          <p className="text-white/75 text-[12px] leading-relaxed max-w-[680px]">
            The journeys below are clearly identified illustrative scenarios.
            Final publication requires approved customer interviews, quotations,
            outcome claims, and image consent.
          </p>
        </div>
      </section>

      {/* Featured journey */}
      <section className="px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div className="relative">
            <img
              src={professionalImage}
              alt="Representative image of a professional managing a busy day"
              className="w-full h-[620px] object-cover rounded-2xl"
            />
            <div className="absolute top-5 left-5 bg-[#1A1A1A] text-white rounded-full px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em]">
              Illustrative journey 01
            </div>
          </div>
          <article>
            <p className="text-[#E85D04] text-[10px] font-bold tracking-[0.24em] uppercase mb-5">
              The late-meeting week
            </p>
            <h2 className="font-display text-[42px] sm:text-[58px] font-semibold leading-[0.94] tracking-[-0.035em]">
              When the workday keeps taking dinner with it.
            </h2>
            <p className="text-[#625A53] text-[16px] leading-relaxed mt-7">
              A busy professional can know exactly how they want to eat and
              still lose the routine to back-to-back meetings, commuting, and
              the decisions waiting at the end of the day.
            </p>
            <div className="mt-9 space-y-0 border-y border-[#DED6CD]">
              {[
                [
                  "The pressure",
                  "Meal planning begins after the calendar is already full, making convenience the default rather than a deliberate choice.",
                ],
                [
                  "The Meal Plan role",
                  "Fresh weekday meals and a recurring structure move preparation earlier, so dinner no longer starts with another decision.",
                ],
                [
                  "The experience",
                  "The customer still chooses within the approved menu structure, but the programme carries the recurring organisation.",
                ],
              ].map(([label, copy]) => (
                <div
                  key={label}
                  className="grid sm:grid-cols-[150px_1fr] gap-3 py-5 border-b border-[#DED6CD] last:border-0"
                >
                  <h3 className="text-[#E85D04] text-[10px] font-bold uppercase tracking-[0.16em] pt-1">
                    {label}
                  </h3>
                  <p className="text-[#6D655E] text-[13px] leading-relaxed">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#988E84] mt-6">
              Representative imagery · not a customer testimonial
            </p>
          </article>
        </div>
      </section>

      {/* Story collection */}
      <section className="bg-[#1A1A1A] text-white px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-[760px] mb-14">
            <p className="text-[#E85D04] text-[10px] font-bold tracking-[0.24em] uppercase mb-5">
              Different lives · one need for structure
            </p>
            <h2 className="font-display text-[42px] sm:text-[58px] font-semibold leading-[0.94] tracking-[-0.035em]">
              Progress looks different inside every routine.
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {journeys.map((story) => (
              <article
                key={story.number}
                className="bg-[#25201C] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="relative h-[330px] overflow-hidden">
                  <img
                    src={story.image}
                    alt="Representative lifestyle image for an illustrative customer journey"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#E85D04] text-white rounded-full px-3 py-1.5 text-[9px] font-bold tracking-[0.14em]">
                    Illustrative {story.number}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-[#E85D04] text-[9px] font-bold uppercase tracking-[0.14em]">
                    {story.rhythm}
                  </p>
                  <h3 className="font-display text-[25px] font-semibold leading-tight mt-4">
                    {story.title}
                  </h3>
                  <div className="mt-7 space-y-5">
                    <div>
                      <p className="text-white/35 text-[9px] font-bold uppercase tracking-[0.15em]">
                        Life context
                      </p>
                      <p className="text-white/55 text-[13px] leading-relaxed mt-2">
                        {story.context}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/35 text-[9px] font-bold uppercase tracking-[0.15em]">
                        Where Meal Plan helps
                      </p>
                      <p className="text-white/55 text-[13px] leading-relaxed mt-2">
                        {story.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-auto pt-8 text-[9px] font-mono uppercase tracking-[0.12em] text-white/25">
                    Representative imagery · no outcome claim
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What real stories will cover */}
      <section className="px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <p className="text-[#E85D04] text-[10px] font-bold tracking-[0.24em] uppercase mb-5">
              The stories we want to tell responsibly
            </p>
            <h2 className="font-display text-[42px] sm:text-[56px] font-semibold leading-[0.94] tracking-[-0.035em]">
              Experience before exaggeration.
            </h2>
            <p className="text-[#6D655E] text-[15px] leading-relaxed mt-6">
              Verified customer interviews should focus on what the programme
              actually felt like—not unsupported transformation promises.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              [
                "Routine",
                "How Meal Plan fitted into work, family, training, and changing weeks.",
              ],
              [
                "Food",
                "Which meals felt enjoyable, practical, and easy to repeat.",
              ],
              [
                "Support",
                "How programme structure and approved support shaped the experience.",
              ],
              [
                "Progress",
                "What changed, using only consented and properly supported customer outcomes.",
              ],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="bg-white border border-[#E2DBD3] rounded-2xl p-6 min-h-[220px]"
              >
                <h3 className="font-display text-[21px] font-semibold">
                  {title}
                </h3>
                <p className="text-[#70675F] text-[13px] leading-relaxed mt-4">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E85D04] text-white px-6 py-20 text-center">
        <p className="text-white/65 text-[10px] font-bold uppercase tracking-[0.24em] mb-5">
          Your routine can begin before the testimonial does
        </p>
        <h2 className="font-display text-[42px] sm:text-[58px] font-semibold">
          Explore the Meal Plan structure.
        </h2>
        <p className="text-white/70 text-[14px] leading-relaxed max-w-[580px] mx-auto mt-5">
          Choose a programme, understand what is included, and see the menu
          rhythm before continuing.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <button
            onClick={() => navigateToWizard()}
            className="rounded-full bg-white text-[#1A1A1A] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            Start Meal Plan
          </button>
          <button
            onClick={() => navigate("meal-plan-about")}
            className="rounded-full border border-white/35 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] hover:border-white transition-colors"
          >
            How Meal Plan works
          </button>
        </div>
      </section>
    </div>
  )
}
