import { Page } from "@/data";

interface FooterProps {
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
}

export default function Footer({ navigate, navigateToWizard }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] text-white py-16 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2">
            <button onClick={() => navigate("home")} className="font-display text-[24px] font-bold mb-4 block">
              FRESHER<span className="text-[#CDFF3A]">.</span>
            </button>
            <p className="text-white/35 text-[13px] leading-relaxed mb-5 max-w-[220px]">
              Performance meals for serious athletes and busy professionals across Singapore.
            </p>
            <div className="text-[12px] text-white/25 space-y-1">
              <div>hello@fresher.com.sg</div>
              <div>+65 6123 4567</div>
              <div className="mt-2">Toa Payoh, Singapore 310123</div>
            </div>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.4em] uppercase mb-5 text-[#CDFF3A]">01 / Ready-to-Go</div>
            <ul className="space-y-3">
              {[
                { label: "All Meals", action: () => navigate("ready-to-go") },
                { label: "Low Carb", action: () => navigate("ready-to-go") },
                { label: "High Carb", action: () => navigate("ready-to-go") },
                { label: "Breakfast", action: () => navigate("ready-to-go") },
                { label: "Just Protein", action: () => navigate("ready-to-go") },
                { label: "Build-A-Box", action: () => navigate("build-a-box") },
              ].map((l) => (
                <li key={l.label}>
                  <button onClick={l.action} className="text-[13px] text-white/35 hover:text-white transition-colors">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.4em] uppercase mb-5 text-[#F2C94C]">02 / Meal Plans</div>
            <ul className="space-y-3">
              {[
                { label: "Cut Plan", action: () => navigateToWizard("CUT") },
                { label: "Maintain Plan", action: () => navigateToWizard("MAINTAIN") },
                { label: "Build Plan", action: () => navigateToWizard("BUILD") },
                { label: "How It Works", action: () => navigate("how-it-works") },
                { label: "Nutrition Guide", action: () => navigate("how-it-works") },
              ].map((l) => (
                <li key={l.label}>
                  <button onClick={l.action} className="text-[13px] text-white/35 hover:text-white transition-colors">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.4em] uppercase mb-5 text-white/25">Account</div>
            <ul className="space-y-3">
              {[
                { label: "My Account", action: () => navigate("account") },
                { label: "Rewards", action: () => navigate("account") },
                { label: "Order Tracking", action: () => navigate("account") },
                { label: "Subscription", action: () => navigate("account") },
                { label: "Gift Cards", action: () => navigate("gift-card") },
              ].map((l) => (
                <li key={l.label}>
                  <button onClick={l.action} className="text-[13px] text-white/35 hover:text-white transition-colors">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/20">
          <span>© 2025 Fresher Performance Meals Pte. Ltd. · UEN 202512345A</span>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((l) => (
              <a key={l} href="#" className="hover:text-white/50 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
