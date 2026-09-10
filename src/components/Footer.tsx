import { Page } from "@/data";

interface FooterProps {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

export default function Footer({ navigate, navigateToWizard }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      {/* Main row */}
      <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Brand */}
        <button onClick={() => navigate("home")} className="font-display text-[20px] font-bold text-white shrink-0">
          FRESHER<span className="text-[#CDFF3A]">.</span>
        </button>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {[
            { label: "Ready Series", action: () => navigate("ready-series") },
            { label: "Build-A-Box", action: () => navigate("build-a-box") },
            { label: "Meal Plans", action: () => navigate("meal-plan-landing") },
            { label: "Cut Plan", action: () => navigateToWizard("CUT") },
            { label: "Maintain Plan", action: () => navigateToWizard("MAINTAIN") },
            { label: "Build Plan", action: () => navigateToWizard("BUILD") },
            { label: "About Us", action: () => navigate("about") },
            { label: "How It Works", action: () => navigate("how-it-works") },
            { label: "Gift Cards", action: () => navigate("gift-card") },
            { label: "My Account", action: () => navigate("account") },
          ].map((l) => (
            <button key={l.label} onClick={l.action}
              className="text-[11px] sm:text-[12px] text-white/60 hover:text-[#CDFF3A] transition-colors tracking-wide whitespace-nowrap">
              {l.label}
            </button>
          ))}
        </nav>

        {/* Contact micro */}
        <div className="text-[11px] text-white/30 text-right shrink-0 hidden lg:block">
          <div>hello@fresher.com.sg</div>
          <div className="mt-0.5">+65 6123 4567 · Toa Payoh, SG</div>
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/30">
          <span>© 2025 Fresher Performance Meals Pte. Ltd. · UEN 202512345A</span>
          <div className="flex gap-5 items-center">
            {["Privacy", "Terms", "Refunds"].map((l) => (
              <a key={l} href="#" className="hover:text-white/70 transition-colors">{l}</a>
            ))}
            <button onClick={() => navigate("wireframe")}
              className="border border-white/15 px-3 py-1 text-[10px] tracking-[0.15em] uppercase hover:border-[#CDFF3A] hover:text-[#CDFF3A] transition-colors">
              Wireframes
            </button>
            <button onClick={() => navigate("blueprint")}
              className="border border-white/15 px-3 py-1 text-[10px] tracking-[0.15em] uppercase hover:border-[#CDFF3A] hover:text-[#CDFF3A] transition-colors">
              Blueprint
            </button>
            <button onClick={() => navigate("handoff")}
              className="border border-white/15 px-3 py-1 text-[10px] tracking-[0.15em] uppercase hover:border-[#CDFF3A] hover:text-[#CDFF3A] transition-colors">
              Dev Handoff
            </button>
            <button onClick={() => navigate("screens-export")}
              className="border border-[#CDFF3A]/40 bg-[#CDFF3A]/5 text-[#CDFF3A] px-3 py-1 text-[10px] tracking-[0.15em] uppercase hover:bg-[#CDFF3A] hover:text-[#111] transition-colors font-bold">
              🖨 All Screens PDF
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
