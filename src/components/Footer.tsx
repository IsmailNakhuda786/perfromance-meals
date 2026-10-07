import { Page } from "@/data";
import { PerformanceMealsLogo } from "@/components/Logos";

interface FooterProps {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

export default function Footer({ navigate, navigateToWizard }: FooterProps) {
  return (
    <footer className="bg-[#1A1A1A] border-t border-white/5">
      {/* Main row */}
      <div className="max-w-[1440px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand */}
        <button onClick={() => navigate("home")} className="shrink-0">
          <PerformanceMealsLogo size="sm" variant="light" />
        </button>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {[
            { label: "Ready Series", action: () => navigate("ready-series") },
            { label: "Meal Plans", action: () => navigate("meal-plan-landing") },
            { label: "Gift Cards", action: () => navigate("gift-card") },
            { label: "About Us", action: () => navigate("about") },
          ].map((l) => (
            <button key={l.label} onClick={l.action}
              className="text-[11px] sm:text-[12px] text-white/60 hover:text-[#F5B300] transition-colors tracking-wide whitespace-nowrap">
              {l.label}
            </button>
          ))}
        </nav>

        {/* Contact micro */}
        <div className="text-[11px] text-white/30 text-right shrink-0 hidden lg:block">
          <div>hello@performancemeals.com.sg</div>
          <div className="mt-0.5">+65 6123 4567 · Toa Payoh, SG</div>
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/30">
          <span>© 2026 Performance Meals Pte. Ltd. · UEN 202512345A</span>
          <div className="flex gap-5 items-center">
            {["Privacy", "Terms", "Refunds"].map((l) => (
              <a key={l} href="#" className="hover:text-white/70 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
