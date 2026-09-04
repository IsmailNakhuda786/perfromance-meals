import { useState } from "react";
import { CartItem, Page } from "@/data";

interface NavProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  navigateToWizard: (plan?: string) => void;
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  updateCartQty: (id: number, type: string, delta: number) => void;
  removeFromCart: (id: number, type: string) => void;
  onCheckout: () => void;
}

export default function Nav({ currentPage, navigate, navigateToWizard, cart, cartOpen, setCartOpen, updateCartQty, removeFromCart, onCheckout }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const go = (page: Page) => { navigate(page); setMobileOpen(false); };
  const goWizard = (plan?: string) => { navigateToWizard(plan); setMobileOpen(false); };

  return (
    <>
      {/* Promo bar */}
      <div className="bg-[#CDFF3A] text-[#111111] text-center py-2 px-4 text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold">
        Use <strong>SG61</strong> for $6.10 off &nbsp;·&nbsp; Free delivery above $80
      </div>

      <nav className="sticky top-0 z-50 bg-[#111111] text-white shadow-xl">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-[56px] sm:h-[60px] flex items-center justify-between gap-4">

          {/* Logo + stamp */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button onClick={() => go("home")} className="font-display text-[20px] sm:text-[22px] font-bold tracking-tight">
              FRESHER<span className="text-[#CDFF3A]">.</span>
            </button>
            <div className="relative w-[38px] h-[38px] sm:w-[46px] sm:h-[46px] shrink-0 select-none" title="Lose 6kg in 60 days">
              <svg viewBox="0 0 46 46" className="w-full h-full">
                <circle cx="23" cy="23" r="21" fill="none" stroke="#CDFF3A" strokeWidth="1.2" strokeDasharray="2.8 2.2" strokeLinecap="round" />
                <circle cx="23" cy="23" r="17.5" fill="#CDFF3A" />
                <defs>
                  <path id="topArc" d="M 9,23 A 14,14 0 0,1 37,23" />
                  <path id="btmArc" d="M 8.5,24 A 14.5,14.5 0 0,0 37.5,24" />
                </defs>
                <text fontSize="4.2" fontFamily="monospace" fontWeight="700" fill="#111" letterSpacing="0.8">
                  <textPath href="#topArc" startOffset="50%" textAnchor="middle">LOSE · 6KG ·</textPath>
                </text>
                <text fontSize="4.2" fontFamily="monospace" fontWeight="700" fill="#111" letterSpacing="0.8">
                  <textPath href="#btmArc" startOffset="50%" textAnchor="middle">IN 60 DAYS</textPath>
                </text>
                <text x="23" y="22" textAnchor="middle" fontSize="10" fontFamily="serif" fontWeight="900" fill="#111" dy="0.35em" letterSpacing="-0.5">6in60</text>
              </svg>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <div className="flex items-center gap-5">
              <button onClick={() => go("ready-to-go")}
                className={`flex items-center gap-1.5 text-[11px] tracking-[0.3em] uppercase font-semibold transition-colors ${currentPage === "ready-to-go" || currentPage === "build-a-box" ? "text-[#CDFF3A]" : "text-[#CDFF3A]/70 hover:text-[#CDFF3A]"}`}>
                <span className="opacity-50 text-[9px]">01</span> Ready-to-Go
              </button>
              <div className="flex items-center gap-5 text-white/40 text-[11px] tracking-wider uppercase">
                {["Low Carb", "High Carb", "Breakfast"].map((l) => (
                  <button key={l} onClick={() => go("ready-to-go")} className="hover:text-white transition-colors">{l}</button>
                ))}
                <button onClick={() => go("build-a-box")} className={`hover:text-white transition-colors ${currentPage === "build-a-box" ? "text-[#CDFF3A]" : ""}`}>Build-A-Box</button>
              </div>
            </div>
            <div className="w-px h-6 bg-white/15" />
            <div className="flex items-center gap-5">
              <button onClick={() => goWizard()}
                className={`flex items-center gap-1.5 text-[11px] tracking-[0.3em] uppercase font-semibold transition-colors ${currentPage === "meal-plan-wizard" ? "text-[#F2C94C]" : "text-[#F2C94C]/70 hover:text-[#F2C94C]"}`}>
                <span className="opacity-50 text-[9px]">02</span> Meal Plans
              </button>
              <div className="flex items-center gap-5 text-white/40 text-[11px] tracking-wider uppercase">
                {["CUT", "MAINTAIN", "BUILD"].map((l) => (
                  <button key={l} onClick={() => goWizard(l)} className="hover:text-white transition-colors">{l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button onClick={() => go("gift-card")} className="text-white/50 hover:text-[#CDFF3A] transition-colors text-[11px] tracking-[0.2em] uppercase hidden md:block whitespace-nowrap">Gift Cards</button>
            <button onClick={() => go("account")} className="text-white/50 hover:text-white transition-colors text-[11px] tracking-[0.2em] uppercase hidden md:block">Rewards</button>
            <button onClick={() => go("account")} className={`text-white/50 hover:text-white transition-colors hidden md:block ${currentPage === "account" ? "text-white" : ""}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            {/* Cart */}
            <button className="relative text-white/50 hover:text-white transition-colors" onClick={() => setCartOpen(!cartOpen)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#CDFF3A] text-[#111111] text-[9px] font-bold rounded-full w-[17px] h-[17px] flex items-center justify-center">{cartCount}</span>
              )}
            </button>
            {/* Hamburger — mobile only */}
            <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden text-white/70 hover:text-white transition-colors p-1">
              {mobileOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0E0E0E] border-t border-white/10 overflow-y-auto max-h-[80vh]">
            <div className="px-5 py-4 space-y-1">
              <div className="text-[9px] font-mono tracking-[0.4em] text-[#CDFF3A] uppercase py-2">01 / Ready Series</div>
              {[
                { label: "All Meals", action: () => go("ready-to-go") },
                { label: "Build-A-Box", action: () => go("build-a-box") },
              ].map((l) => (
                <button key={l.label} onClick={l.action} className="w-full text-left py-3 px-3 text-[15px] text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">{l.label}</button>
              ))}

              <div className="text-[9px] font-mono tracking-[0.4em] text-[#F2C94C] uppercase py-2 mt-2">02 / Meal Plans</div>
              {[
                { label: "All Plans", action: () => goWizard() },
                { label: "CUT — Fat loss", action: () => goWizard("CUT") },
                { label: "MAINTAIN — Performance", action: () => goWizard("MAINTAIN") },
                { label: "BUILD — Muscle gain", action: () => goWizard("BUILD") },
                { label: "How It Works", action: () => go("how-it-works") },
              ].map((l) => (
                <button key={l.label} onClick={l.action} className="w-full text-left py-3 px-3 text-[15px] text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">{l.label}</button>
              ))}

              <div className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase py-2 mt-2">Account</div>
              {[
                { label: "My Account", action: () => go("account") },
                { label: "Rewards & Points", action: () => go("account") },
                { label: "Gift Cards", action: () => go("gift-card") },
              ].map((l) => (
                <button key={l.label} onClick={l.action} className="w-full text-left py-3 px-3 text-[15px] text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">{l.label}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="flex-1 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="w-full sm:w-[400px] max-w-full bg-[#111111] text-white flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h2 className="font-display text-[20px] font-bold">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-white/50 hover:text-white p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-white/30 px-6">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <p className="text-[14px]">Your cart is empty</p>
                <button onClick={() => { setCartOpen(false); navigate("ready-to-go"); }} className="text-[#CDFF3A] text-[12px] tracking-widest uppercase font-semibold">Shop Meals →</button>
              </div>
            ) : (
              <>
                <div className="flex-1 p-4 space-y-3">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.type}`} className="flex gap-3 bg-[#1A1A1A] p-3">
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-cover shrink-0 bg-[#222]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium leading-snug line-clamp-2">{item.name}</p>
                        {item.planLabel && <p className="text-[11px] text-[#F2C94C] mt-0.5">{item.planLabel}</p>}
                        <div className="flex items-center justify-between mt-2 gap-2">
                          <span className="font-mono text-[12px] text-[#CDFF3A]">${(item.price * item.qty).toFixed(2)}</span>
                          {item.type !== "plan" ? (
                            <div className="flex items-center gap-1">
                              <button onClick={() => updateCartQty(item.id, item.type, -1)} className="w-7 h-7 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-[14px] transition-colors">−</button>
                              <span className="text-[13px] w-5 text-center font-mono">{item.qty}</span>
                              <button onClick={() => updateCartQty(item.id, item.type, 1)} className="w-7 h-7 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-[14px] transition-colors">+</button>
                              <button onClick={() => removeFromCart(item.id, item.type)} className="w-7 h-7 ml-0.5 text-white/30 hover:text-red-400 flex items-center justify-center transition-colors">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => removeFromCart(item.id, item.type)} className="text-white/30 hover:text-red-400 text-[11px] transition-colors">Remove</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mx-4 bg-[#1A2E1A] border border-[#7EE8B0]/20 p-3 text-[12px] text-[#7EE8B0] flex items-center gap-2">
                  <span>💳</span>
                  <span>Wallet: <strong>$12.50</strong> available at checkout</span>
                </div>

                <div className="p-4 border-t border-white/10 mt-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50 text-[13px]">Subtotal ({cartCount} item{cartCount !== 1 ? "s" : ""})</span>
                    <span className="font-mono font-bold text-[16px]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button onClick={() => { setCartOpen(false); onCheckout(); }} className="w-full bg-[#CDFF3A] text-[#111111] py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                    Proceed to Checkout
                  </button>
                  <button onClick={() => setCartOpen(false)} className="w-full text-white/30 text-[11px] uppercase tracking-widest mt-3 hover:text-white transition-colors py-2">
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
