import { useState } from "react";
import { Page } from "@/data";
import { downloadFresherPDF } from "@/FresherPDF";

interface Props {
  navigate: (page: Page) => void;
}

export default function ScreensExportPage({ navigate }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setDone(false);
    try {
      await downloadFresherPDF();
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center gap-8 px-6">
      {/* Back */}
      <button onClick={() => navigate("home")}
        className="absolute top-6 left-6 text-white/40 hover:text-white text-[12px] tracking-widest uppercase transition-colors">
        ← Back to App
      </button>

      {/* Hero */}
      <div className="text-center max-w-md">
        <div className="inline-block bg-[#CDFF3A] text-[#111] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 mb-6">
          PDF Export
        </div>
        <h1 className="font-display text-4xl font-bold text-white mb-3">
          All 14 Screens<span className="text-[#CDFF3A]">.</span>
        </h1>
        <p className="text-white/40 text-[14px] leading-relaxed mb-8">
          Professional vector PDF — Cover page, screen index, and all 14 annotated prototype screens with brand colours, wireframes, and feature notes.
        </p>

        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-[#CDFF3A] text-[#111] font-bold text-[13px] tracking-[0.15em] uppercase px-10 py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {loading ? "Generating PDF…" : done ? "✓ Downloaded!" : "↓ Download PDF — All Screens"}
        </button>

        {done && (
          <p className="text-[#7EE8B0] text-[12px] mt-3">
            PDF downloaded — check your Downloads folder.
          </p>
        )}
      </div>

      {/* Contents list */}
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-6">
        <p className="text-[10px] font-bold text-white/30 tracking-[0.15em] uppercase mb-4">What's inside</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            ["Cover", "Brand + palette + stats"],
            ["Index", "Screen table of contents"],
            ["01", "Home Page"],
            ["02", "Ready-to-Go — All Meals"],
            ["03", "Ready-to-Go — Promotions"],
            ["04", "Useful Bundles"],
            ["05", "Product Detail Modal"],
            ["06", "Build-A-Box"],
            ["07", "Meal Plan Wizard"],
            ["08", "Checkout — Auth Gate"],
            ["09", "Checkout — Payment"],
            ["10", "Order Confirmation"],
            ["11", "Account — Dashboard"],
            ["12", "Account — Subscription"],
            ["13", "Account — Order History"],
            ["14", "Account — Wallet & Rewards"],
          ].map(([n, t]) => (
            <div key={n} className="flex items-center gap-2">
              <span className="bg-[#CDFF3A] text-[#111] text-[8px] font-bold px-1.5 py-0.5 shrink-0 min-w-[28px] text-center">{n}</span>
              <span className="text-white/50 text-[10px]">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
