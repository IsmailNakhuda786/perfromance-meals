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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [logoutToast, setLogoutToast] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMobileOpen(false);
    setLogoutToast(true);
    setTimeout(() => setLogoutToast(false), 3000);
  };
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const WALLET_BALANCE = 12.50;
  const REWARD_PTS = 1234;

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
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button onClick={() => go("gift-card")} className="text-white/40 hover:text-[#CDFF3A] transition-colors text-[11px] tracking-[0.2em] uppercase hidden lg:block whitespace-nowrap">Gift Cards</button>

            {isLoggedIn ? (
              <>
                {/* Wallet — compact coin pill */}
                <button onClick={() => go("account")}
                  className="hidden md:flex items-center gap-1.5 hover:opacity-75 transition-opacity">
                  <span className="text-[15px] leading-none">🪙</span>
                  <span className="text-[#CDFF3A] font-mono text-[11px] font-bold">${Math.floor(WALLET_BALANCE)}</span>
                  <span className="text-white/25 text-[9px]">·</span>
                  <span className="text-white/40 text-[10px]">{REWARD_PTS.toLocaleString()}pts</span>
                </button>

                {/* Avatar / profile pill */}
                <button onClick={() => go("account")}
                  className={`flex items-center gap-2 pl-1 pr-2 py-1 border transition-colors ${currentPage === "account" ? "border-white/30 bg-white/10" : "border-white/10 hover:border-white/25 bg-white/5"}`}>
                  <div className="w-6 h-6 bg-[#CDFF3A] rounded-full flex items-center justify-center text-[#111] font-black text-[11px] shrink-0">J</div>
                  <span className="text-white/60 text-[11px] tracking-wide hidden lg:block">Jerome</span>
                </button>

                {/* Log out toggle (prototype only) */}
                <button onClick={handleLogout}
                  className="hidden lg:flex items-center gap-1 border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-colors text-[10px] tracking-widest uppercase px-2.5 py-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                  Out
                </button>
              </>
            ) : (
              <>
                {/* Login / Sign Up */}
                <button onClick={() => { setIsLoggedIn(true); go("account"); }}
                  className="text-white/60 hover:text-white transition-colors text-[11px] tracking-[0.2em] uppercase hidden md:block whitespace-nowrap">
                  Log In
                </button>
                <button onClick={() => { setIsLoggedIn(true); go("account"); }}
                  className="hidden md:block bg-[#CDFF3A] text-[#111] text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 hover:bg-white transition-colors whitespace-nowrap">
                  Sign Up
                </button>
              </>
            )}

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
                { label: "About Us", action: () => go("about") },
              { label: "How It Works", action: () => go("how-it-works") },
              ].map((l) => (
                <button key={l.label} onClick={l.action} className="w-full text-left py-3 px-3 text-[15px] text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">{l.label}</button>
              ))}

              <div className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase py-2 mt-2">Account</div>
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3 border-b border-white/5">
                    <div className="w-9 h-9 bg-[#CDFF3A] rounded-full flex items-center justify-center text-[#111] font-black text-[13px]">J</div>
                    <div>
                      <div className="text-white text-[14px] font-semibold">Jerome</div>
                      <div className="text-[#CDFF3A] text-[11px] font-mono">💳 ${WALLET_BALANCE.toFixed(2)} · {REWARD_PTS} pts</div>
                    </div>
                  </div>
                  {[
                    { label: "My Account", action: () => go("account") },
                    { label: "Rewards & Points", action: () => go("account") },
                    { label: "Gift Cards", action: () => go("gift-card") },
                    { label: "↩ Log Out (prototype)", action: handleLogout },
                  ].map((l) => (
                    <button key={l.label} onClick={l.action} className="w-full text-left py-3 px-3 text-[15px] text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">{l.label}</button>
                  ))}
                </>
              ) : (
                <>
                  <div className="flex gap-3 px-3 py-4 border-b border-white/5">
                    <button onClick={() => { setIsLoggedIn(true); go("account"); }}
                      className="flex-1 border border-white/20 text-white py-3 text-[13px] font-bold tracking-widest uppercase hover:bg-white/10 transition-colors">
                      Log In
                    </button>
                    <button onClick={() => { setIsLoggedIn(true); go("account"); }}
                      className="flex-1 bg-[#CDFF3A] text-[#111] py-3 text-[13px] font-black tracking-widest uppercase hover:bg-white transition-colors">
                      Sign Up
                    </button>
                  </div>
                  {[
                    { label: "Gift Cards", action: () => go("gift-card") },
                  ].map((l) => (
                    <button key={l.label} onClick={l.action} className="w-full text-left py-3 px-3 text-[15px] text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">{l.label}</button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout toast */}
      {logoutToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] bg-[#111] text-white px-6 py-4 flex items-center gap-3 shadow-2xl border border-white/10">
          <div className="w-8 h-8 bg-[#CDFF3A] rounded-full flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          <div>
            <div className="font-semibold text-[13px]">You've been logged out</div>
            <div className="text-white/45 text-[11px]">See you next time, Jerome. Your cart has been saved.</div>
          </div>
        </div>
      )}

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

            {/* Free delivery progress bar */}
            {(() => {
              const FREE_THRESHOLD = 80;
              const pct = Math.min((cartTotal / FREE_THRESHOLD) * 100, 100);
              const remaining = Math.max(FREE_THRESHOLD - cartTotal, 0);
              return (
                <div className="px-5 py-3 border-b border-white/10">
                  {remaining > 0 ? (
                    <p className="text-[11px] text-white/50 mb-2">Add <span className="text-[#CDFF3A] font-bold">${remaining.toFixed(2)}</span> more for free delivery</p>
                  ) : (
                    <p className="text-[11px] text-[#CDFF3A] font-bold mb-2">🎉 You qualify for free delivery!</p>
                  )}
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#CDFF3A] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })()}

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

                {/* Add-more-to-save nudge */}
                {(() => {
                  const readyItems = cart.filter((i) => i.type === "ready");
                  const readyQty = readyItems.reduce((s, i) => s + i.qty, 0);
                  if (readyQty === 0) return null;
                  const tiers = [
                    { qty: 5,  ppm: 12.40 },
                    { qty: 10, ppm: 11.90 },
                    { qty: 15, ppm: 11.50 },
                    { qty: 20, ppm: 11.00 },
                  ];
                  const next = tiers.find((t) => t.qty > readyQty);
                  if (!next) return null;
                  const toAdd = next.qty - readyQty;
                  const avgPrice = readyItems.reduce((s, i) => s + i.price * i.qty, 0) / readyQty;
                  const saving = (avgPrice - next.ppm) * readyQty;
                  return (
                    <div className="mx-4 mb-3 bg-[#CDFF3A]/8 border border-[#CDFF3A]/25 p-3">
                      <div className="flex items-start gap-2">
                        <span className="text-[15px] shrink-0">🛒</span>
                        <div className="flex-1">
                          <p className="text-[#CDFF3A] text-[11px] font-bold mb-0.5">
                            Add {toAdd} more meal{toAdd !== 1 ? "s" : ""}{saving > 0.5 ? ` — save $${saving.toFixed(2)}` : " to unlock box pricing"}
                          </p>
                          <p className="text-white/40 text-[10px] leading-relaxed">
                            {next.qty}-meal Build-A-Box drops to <strong className="text-white/60">${next.ppm.toFixed(2)}/meal</strong>. You currently have {readyQty}.
                          </p>
                          <button onClick={() => { setCartOpen(false); navigate("ready-to-go"); }}
                            className="mt-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#CDFF3A] hover:underline">
                            Add more meals →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

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
