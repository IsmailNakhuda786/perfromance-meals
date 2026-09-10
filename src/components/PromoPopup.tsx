import { useState } from "react";
import { Page } from "@/data";

interface Props {
  onClose: () => void;
  navigate: (page: Page) => void;
}

const BUNDLES = [
  { name: "Starter Bundle", desc: "5 chef meals — perfect intro", original: 62, sale: 49, tag: "21% OFF" },
  { name: "Power Duo", desc: "Herb Chicken + Cajun Salmon ×3 each", original: 74.40, sale: 59, tag: "Best Value" },
];

export default function PromoPopup({ onClose, navigate }: Props) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"code" | "bundle">("code");

  const copyCode = () => {
    navigator.clipboard.writeText("SG61").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#1A1A1A] text-white w-full max-w-[480px] overflow-hidden border border-white/10">

        {/* Top yellow strip */}
        <div className="bg-[#F5B300] h-1 w-full" />

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <div className="text-[10px] font-mono tracking-[0.45em] text-[#F5B300] uppercase mb-2">Performance Meals</div>
          <h2 className="font-display text-[28px] font-bold leading-tight">
            Stock up.<br />Stay on track.
          </h2>
          <p className="text-white/50 text-[13px] mt-2">Exclusive offer — today only</p>
        </div>

        {/* Tab toggle */}
        <div className="flex mx-6 mb-4 border border-white/10 rounded-sm overflow-hidden">
          <button onClick={() => setTab("code")}
            className={`flex-1 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${tab === "code" ? "bg-[#F5B300] text-[#111]" : "text-white/40 hover:text-white"}`}>
            Promo Code
          </button>
          <button onClick={() => setTab("bundle")}
            className={`flex-1 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${tab === "bundle" ? "bg-[#F5B300] text-[#111]" : "text-white/40 hover:text-white"}`}>
            Bundle Deal
          </button>
        </div>

        {/* Promo code tab */}
        {tab === "code" && (
          <div className="px-6 pb-6">
            <div className="bg-white/5 border border-white/10 p-5 text-center mb-4">
              <div className="text-[12px] text-white/40 mb-2">Use code at checkout</div>
              <div className="font-display text-[42px] font-bold text-[#F5B300] tracking-widest leading-none mb-1">SG61</div>
              <div className="text-[13px] text-white/50">$6.10 off your first order</div>
            </div>
            <button onClick={copyCode}
              className={`w-full py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase transition-all mb-3 ${copied ? "bg-white text-[#111]" : "bg-[#F5B300] text-[#111] hover:bg-white"}`}>
              {copied ? "✓ Copied!" : "Copy Code"}
            </button>
            <p className="text-[11px] text-white/25 text-center">Valid on first order · Min. spend $40 · Expires 30 Sep 2025</p>
          </div>
        )}

        {/* Bundle deal tab */}
        {tab === "bundle" && (
          <div className="px-6 pb-6 space-y-3">
            {BUNDLES.map((b) => (
              <div key={b.name} className="border border-white/10 bg-white/5 p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-[14px]">{b.name}</span>
                    <span className="bg-[#F5B300] text-[#111] text-[9px] font-bold tracking-wider px-1.5 py-0.5">{b.tag}</span>
                  </div>
                  <div className="text-[12px] text-white/40">{b.desc}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-mono font-bold text-[16px] text-[#F5B300]">${b.sale}</span>
                    <span className="font-mono text-[13px] text-white/25 line-through">${b.original}</span>
                  </div>
                </div>
                <button onClick={() => { navigate("ready-to-go"); onClose(); }}
                  className="shrink-0 bg-white/10 hover:bg-[#F5B300] hover:text-[#111] text-white px-4 py-2 text-[11px] font-bold tracking-wider uppercase transition-colors">
                  Grab It
                </button>
              </div>
            ))}
            <p className="text-[11px] text-white/25 text-center">Limited stock · Auto-added to cart</p>
          </div>
        )}

        {/* Skip */}
        <button onClick={onClose} className="w-full py-3 text-[11px] text-white/20 hover:text-white/50 transition-colors border-t border-white/5 tracking-wider">
          No thanks, continue browsing
        </button>
      </div>
    </div>
  );
}
