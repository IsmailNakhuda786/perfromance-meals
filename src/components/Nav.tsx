import { useState } from "react";
import { BUNDLES, CartItem, MEALS, Page } from "@/data";
import { PerformanceMealsLogo } from "@/components/Logos";

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
  const [expandedBundles, setExpandedBundles] = useState<Set<string>>(new Set());

  const toggleBundleExpand = (key: string) => {
    setExpandedBundles((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  // Login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginTab, setLoginTab] = useState<"login" | "forgot" | "forgot_sent" | "signup" | "signup_done">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suError, setSuError] = useState(false);

  const openLogin = () => { setLoginTab("login"); setLoginEmail(""); setLoginPassword(""); setLoginError(false); setShowLoginModal(true); setMobileOpen(false); };
  const openSignup = () => { setLoginTab("signup"); setSuName(""); setSuEmail(""); setSuPhone(""); setSuPassword(""); setSuError(false); setShowLoginModal(true); setMobileOpen(false); };
  const handleLogin = () => {
    if (!loginEmail || !loginPassword) { setLoginError(true); return; }
    setIsLoggedIn(true);
    setShowLoginModal(false);
    go("account");
  };
  const handleSignup = () => {
    if (!suName || !suEmail || !suPassword) { setSuError(true); return; }
    setLoginTab("signup_done");
  };
  const handleForgotSend = () => { setLoginTab("forgot_sent"); };

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
      <div className="bg-[#F5B300] text-[#1A1A1A] text-center py-2 px-4 text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold">
        Use <strong>SG61</strong> for $6.10 off &nbsp;·&nbsp; Free delivery above $80
      </div>

      <nav className="sticky top-0 z-50 bg-[#1A1A1A] text-white border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-[56px] sm:h-[60px] flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center shrink-0">
            <button onClick={() => go("home")} className="flex items-center">
              <PerformanceMealsLogo size="sm" variant="light" />
            </button>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <button onClick={() => go("ready-series")}
              className={`text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors ${currentPage === "ready-series" || currentPage === "ready-to-go" || currentPage === "build-a-box" ? "text-[#F5B300]" : "text-white/50 hover:text-[#F5B300]"}`}>
              Ready Series
            </button>
            <div className="w-px h-4 bg-white/15" />
            <button onClick={() => go("meal-plan-landing")}
              className={`text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors ${currentPage === "meal-plan-landing" || currentPage === "meal-plan-wizard" ? "text-[#E85D04]" : "text-white/50 hover:text-[#E85D04]"}`}>
              Meal Plans
            </button>
            <div className="w-px h-4 bg-white/15" />
            <button onClick={() => go(isLoggedIn ? "account" : "rewards")}
              className={`text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors ${currentPage === "account" || currentPage === "rewards" ? "text-[#F5B300]" : "text-white/50 hover:text-white"}`}>
              Rewards
            </button>
            <button onClick={() => go("gift-card")}
              className={`text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors ${currentPage === "gift-card" ? "text-[#F5B300]" : "text-white/50 hover:text-white"}`}>
              Gift Cards
            </button>
            <button onClick={() => go("about")}
              className={`text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors ${currentPage === "about" ? "text-[#F5B300]" : "text-white/50 hover:text-white"}`}>
              About
            </button>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {isLoggedIn ? (
              <>
                {/* Wallet — compact coin pill */}
                <button onClick={() => go("account")}
                  className="hidden md:flex items-center gap-1.5 hover:opacity-75 transition-opacity">
                  <span className="text-[15px] leading-none">🪙</span>
                  <span className="text-[#F5B300] font-mono text-[11px] font-bold">${Math.floor(WALLET_BALANCE)}</span>
                  <span className="text-white/25 text-[9px]">·</span>
                  <span className="text-white/40 text-[10px]">{REWARD_PTS.toLocaleString()}pts</span>
                </button>

                {/* Avatar / profile pill */}
                <button onClick={() => go("account")}
                  className={`flex items-center gap-2 pl-1 pr-2 py-1 border transition-colors ${currentPage === "account" ? "border-white/30 bg-white/10" : "border-white/10 hover:border-white/25 bg-white/5"}`}>
                  <div className="w-6 h-6 bg-[#F5B300] rounded-full flex items-center justify-center text-[#111] font-extrabold text-[11px] shrink-0">J</div>
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
                <button onClick={openLogin}
                  className="text-white/60 hover:text-white transition-colors text-[11px] tracking-[0.2em] uppercase hidden md:block whitespace-nowrap">
                  Log In
                </button>
                <button onClick={openSignup}
                  className="hidden md:block bg-[#F5B300] text-[#111] text-[10px] font-extrabold tracking-[0.2em] uppercase px-4 py-2 hover:bg-white transition-colors whitespace-nowrap">
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
                <span className="absolute -top-2 -right-2 bg-[#F5B300] text-[#1A1A1A] text-[9px] font-bold rounded-full w-[17px] h-[17px] flex items-center justify-center">{cartCount}</span>
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
          <div className="lg:hidden bg-[#111] border-t border-white/10 overflow-y-auto max-h-[80vh]">
            <div className="px-5 py-4 space-y-1">
              <div className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase py-2">Navigation</div>
              {[
                { label: "Ready Series", action: () => go("ready-series"), accent: "#F5B300" },
                { label: "Meal Plans", action: () => go("meal-plan-landing"), accent: "#E85D04" },
                { label: "Rewards", action: () => go(isLoggedIn ? "account" : "rewards"), accent: null },
                { label: "Gift Cards", action: () => go("gift-card"), accent: null },
                { label: "About", action: () => go("about"), accent: null },
                { label: "How It Works", action: () => go("how-it-works"), accent: null },
              ].map((l) => (
                <button key={l.label} onClick={l.action} className="w-full text-left py-3 px-3 text-[15px] text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">{l.label}</button>
              ))}

              <div className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase py-2 mt-2">Account</div>
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3 border-b border-white/5">
                    <div className="w-9 h-9 bg-[#F5B300] rounded-full flex items-center justify-center text-[#111] font-extrabold text-[13px]">J</div>
                    <div>
                      <div className="text-white text-[14px] font-semibold">Jerome</div>
                      <div className="text-[#F5B300] text-[11px] font-mono">💳 ${WALLET_BALANCE.toFixed(2)} · {REWARD_PTS} pts</div>
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
                    <button onClick={openLogin}
                      className="flex-1 border border-white/20 text-white py-3 text-[13px] font-bold tracking-widest uppercase hover:bg-white/10 transition-colors">
                      Log In
                    </button>
                    <button onClick={openSignup}
                      className="flex-1 bg-[#F5B300] text-[#111] py-3 text-[13px] font-extrabold tracking-widest uppercase hover:bg-white transition-colors">
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

      {/* ── LOGIN MODAL ── */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
          <div className="relative bg-white w-full max-w-[420px] border border-[#E8E4DC]">
            {/* Header */}
            <div className="bg-[#111] px-8 pt-8 pb-6">
              <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
              <div className="font-display text-[22px] font-bold text-white mb-1">
                {loginTab === "login" && <>Welcome back<span className="text-[#F5B300]">.</span></>}
                {loginTab === "forgot" && <>Reset password<span className="text-[#F5B300]">.</span></>}
                {loginTab === "forgot_sent" && <>Check your inbox<span className="text-[#F5B300]">.</span></>}
                {loginTab === "signup" && <>Create account<span className="text-[#F5B300]">.</span></>}
                {loginTab === "signup_done" && <>You're in<span className="text-[#F5B300]">.</span></>}
              </div>
              <p className="text-white/40 text-[12px]">
                {loginTab === "login" && "Sign in to access your account, points and orders."}
                {loginTab === "forgot" && "Enter your email and we'll send a reset link."}
                {loginTab === "forgot_sent" && `A reset link has been sent to ${forgotEmail}.`}
                {loginTab === "signup" && "Join free — earn points on every order."}
                {loginTab === "signup_done" && "Account created. Welcome to Performance Meals!"}
              </p>
            </div>

            <div className="px-8 py-7">
              {loginTab === "login" && (
                <>
                  <div className="mb-4">
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] mb-1.5">Email address</label>
                    <input
                      type="email" value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value); setLoginError(false); }}
                      placeholder="jerome@email.com"
                      className={`w-full border px-4 py-3 text-[14px] outline-none transition-colors ${loginError && !loginEmail ? "border-red-400 bg-red-50" : "border-[#D0CCC4] focus:border-[#111]"}`}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] mb-1.5">Password</label>
                    <input
                      type="password" value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value); setLoginError(false); }}
                      placeholder="••••••••"
                      className={`w-full border px-4 py-3 text-[14px] outline-none transition-colors ${loginError && !loginPassword ? "border-red-400 bg-red-50" : "border-[#D0CCC4] focus:border-[#111]"}`}
                    />
                  </div>
                  <div className="flex justify-end mb-5">
                    <button onClick={() => { setForgotEmail(loginEmail); setLoginTab("forgot"); }} className="text-[11px] text-[#888] hover:text-[#111] transition-colors underline underline-offset-2">
                      Forgot password?
                    </button>
                  </div>
                  {loginError && (
                    <div className="bg-red-50 border border-red-200 px-4 py-3 text-[12px] text-red-700 mb-4">
                      Please enter your email and password to continue.
                    </div>
                  )}
                  <button onClick={handleLogin}
                    className="w-full bg-[#111] text-white py-3.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#F5B300] hover:text-[#111] transition-colors mb-4">
                    Sign In
                  </button>
                  <div className="text-center text-[12px] text-[#888]">
                    No account?{" "}
                    <button onClick={() => setLoginTab("signup")} className="text-[#111] font-semibold hover:text-[#F5B300] transition-colors underline underline-offset-2">
                      Create one free →
                    </button>
                  </div>
                </>
              )}

              {loginTab === "forgot" && (
                <>
                  <div className="mb-5">
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] mb-1.5">Email address</label>
                    <input
                      type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="jerome@email.com"
                      className="w-full border border-[#D0CCC4] focus:border-[#111] px-4 py-3 text-[14px] outline-none transition-colors"
                    />
                  </div>
                  <button onClick={handleForgotSend}
                    className="w-full bg-[#111] text-white py-3.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#F5B300] hover:text-[#111] transition-colors mb-4">
                    Send Reset Link
                  </button>
                  <button onClick={() => setLoginTab("login")} className="w-full text-center text-[12px] text-[#888] hover:text-[#111] transition-colors">
                    ← Back to sign in
                  </button>
                </>
              )}

              {loginTab === "forgot_sent" && (
                <>
                  <div className="flex flex-col items-center text-center py-4">
                    <div className="w-14 h-14 bg-[#F5B300] rounded-full flex items-center justify-center mb-5">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <p className="text-[14px] text-[#444] mb-1">Reset link sent to</p>
                    <p className="text-[14px] font-semibold text-[#111] mb-6">{forgotEmail}</p>
                    <div className="w-full bg-[#075E54] text-white px-5 py-3 flex items-center gap-3 mb-3">
                      <span className="text-[18px]">💬</span>
                      <div className="text-left flex-1">
                        <div className="text-[12px] font-semibold">WhatsApp link also sent</div>
                        <div className="text-[11px] text-white/50">Tap the link in your chat to reset</div>
                      </div>
                      <span className="text-[#25D366] text-[11px] font-bold">✓ Sent</span>
                    </div>
                    <button onClick={() => setLoginTab("login")} className="text-[12px] text-[#888] hover:text-[#111] transition-colors underline underline-offset-2 mt-2">
                      Back to sign in
                    </button>
                  </div>
                </>
              )}

              {loginTab === "signup" && (
                <>
                  <div className="mb-3">
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] mb-1.5">Full name</label>
                    <input value={suName} onChange={(e) => { setSuName(e.target.value); setSuError(false); }} placeholder="Jerome Tan"
                      className={`w-full border px-4 py-3 text-[14px] outline-none transition-colors ${suError && !suName ? "border-red-400 bg-red-50" : "border-[#D0CCC4] focus:border-[#111]"}`} />
                  </div>
                  <div className="mb-3">
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] mb-1.5">Email address</label>
                    <input type="email" value={suEmail} onChange={(e) => { setSuEmail(e.target.value); setSuError(false); }} placeholder="jerome@email.com"
                      className={`w-full border px-4 py-3 text-[14px] outline-none transition-colors ${suError && !suEmail ? "border-red-400 bg-red-50" : "border-[#D0CCC4] focus:border-[#111]"}`} />
                  </div>
                  <div className="mb-3">
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] mb-1.5">WhatsApp number <span className="text-[#aaa] normal-case font-sans tracking-normal">(for order updates)</span></label>
                    <input type="tel" value={suPhone} onChange={(e) => setSuPhone(e.target.value)} placeholder="+65 9123 4567"
                      className="w-full border border-[#D0CCC4] focus:border-[#111] px-4 py-3 text-[14px] outline-none transition-colors" />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] mb-1.5">Password</label>
                    <input type="password" value={suPassword} onChange={(e) => { setSuPassword(e.target.value); setSuError(false); }} placeholder="Min 8 characters"
                      className={`w-full border px-4 py-3 text-[14px] outline-none transition-colors ${suError && !suPassword ? "border-red-400 bg-red-50" : "border-[#D0CCC4] focus:border-[#111]"}`} />
                  </div>
                  {suError && (
                    <div className="bg-red-50 border border-red-200 px-4 py-3 text-[12px] text-red-700 mb-4">
                      Please fill in your name, email and password.
                    </div>
                  )}
                  <div className="bg-[#F7F5F0] border border-[#E5E2DA] px-4 py-3 text-[12px] text-[#555] mb-4">
                    🎁 You'll earn points on your very first order and unlock referral bonuses.
                  </div>
                  <button onClick={handleSignup}
                    className="w-full bg-[#111] text-white py-3.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#F5B300] hover:text-[#111] transition-colors mb-4">
                    Create Account
                  </button>
                  <div className="text-center text-[12px] text-[#888]">
                    Already have an account?{" "}
                    <button onClick={() => setLoginTab("login")} className="text-[#111] font-semibold hover:text-[#F5B300] transition-colors underline underline-offset-2">
                      Sign in →
                    </button>
                  </div>
                </>
              )}

              {loginTab === "signup_done" && (
                <div className="flex flex-col items-center text-center py-2">
                  <div className="w-14 h-14 bg-[#F5B300] rounded-full flex items-center justify-center mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                  <p className="text-[18px] font-display font-bold text-[#111] mb-1">Account created!</p>
                  <p className="text-[13px] text-[#888] mb-6">Welcome, {suName || "Jerome"}. Confirmations sent below.</p>
                  <div className="w-full bg-[#075E54] text-white px-5 py-3 flex items-center gap-3 mb-2">
                    <span className="text-[18px]">💬</span>
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-[12px] font-semibold">WhatsApp</div>
                      <div className="text-[11px] text-white/50 truncate">{suPhone || "+65 9123 4567"}</div>
                    </div>
                    <span className="text-[#25D366] text-[11px] font-bold shrink-0">✓ Sent</span>
                  </div>
                  <div className="w-full bg-[#111] text-white px-5 py-3 flex items-center gap-3 mb-6">
                    <span className="text-[18px]">✉️</span>
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-[12px] font-semibold">Email</div>
                      <div className="text-[11px] text-white/50 truncate">{suEmail || "jerome@email.com"}</div>
                    </div>
                    <span className="text-[#F5B300] text-[11px] font-bold shrink-0">✓ Sent</span>
                  </div>
                  <button onClick={() => { setIsLoggedIn(true); setShowLoginModal(false); go("account"); }}
                    className="w-full bg-[#F5B300] text-[#111] py-3.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#111] hover:text-white transition-colors">
                    Go to My Account →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout toast */}
      {logoutToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] bg-[#1A1A1A] text-white px-6 py-4 flex items-center gap-3 border border-white/10">
          <div className="w-8 h-8 bg-[#F5B300] rounded-full flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          <div>
            <div className="font-semibold text-[13px]">You've been logged out</div>
            <div className="text-white/45 text-[11px]">See you next time. Your cart has been saved.</div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="flex-1 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="w-full sm:w-[400px] max-w-full bg-[#1A1A1A] text-white flex flex-col h-full overflow-y-auto">
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
                    <p className="text-[11px] text-white/50 mb-2">Add <span className="text-[#F5B300] font-bold">${remaining.toFixed(2)}</span> more for free delivery</p>
                  ) : (
                    <p className="text-[11px] text-[#F5B300] font-bold mb-2">🎉 You qualify for free delivery!</p>
                  )}
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F5B300] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
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
                <button onClick={() => { setCartOpen(false); navigate("ready-series"); }} className="text-[#F5B300] text-[12px] tracking-widest uppercase font-semibold">Shop Meals →</button>
              </div>
            ) : (
              <>
                <div className="flex-1 p-4 space-y-3">
                  {cart.map((item) => {
                    const isBox = item.type === "box";
                    const boxImgs = item.mealImgs ?? (isBox ? BUNDLES.find((b) => b.id === item.id)?.mealIds.slice(0, 6).map((mid) => MEALS.find((m) => m.id === mid)?.img).filter(Boolean) as string[] ?? [] : []);
                    const boxNames = item.mealNames ?? [];
                    return (
                      <div key={`${item.id}-${item.type}`} className="bg-[#1A1A1A] p-3">
                        {isBox ? (
                          /* Bundle cart item — expandable */
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-bold leading-tight text-white">{item.name}</p>
                                <p className="text-[10px] text-[#F5B300] mt-0.5">${(item.price / (parseInt(item.name.match(/\d+/)?.[0] ?? "1") || 1)).toFixed(2)}/meal</p>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="font-mono text-[13px] text-[#F5B300] font-bold">${(item.price * item.qty).toFixed(2)}</span>
                                <button onClick={() => removeFromCart(item.id, item.type)} className="w-6 h-6 text-white/25 hover:text-red-400 flex items-center justify-center transition-colors">
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                                </button>
                              </div>
                            </div>
                            {/* Thumbnail strip always visible */}
                            {boxImgs.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {boxImgs.slice(0, 5).map((src, i) => (
                                  <div key={i} className="w-9 h-9 overflow-hidden shrink-0 border border-white/10">
                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                  </div>
                                ))}
                                {boxImgs.length > 5 && (
                                  <div className="w-9 h-9 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <span className="text-[9px] text-white/40 font-mono">+{boxImgs.length - 5}</span>
                                  </div>
                                )}
                              </div>
                            )}
                            {/* Expand/collapse toggle */}
                            <button
                              onClick={() => toggleBundleExpand(`${item.id}-${item.type}`)}
                              className="flex items-center gap-1.5 mt-2 text-[10px] text-white/35 hover:text-[#F5B300] font-mono uppercase tracking-wider transition-colors"
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                className={`transition-transform ${expandedBundles.has(`${item.id}-${item.type}`) ? "rotate-180" : ""}`}>
                                <path d="M6 9l6 6 6-6"/>
                              </svg>
                              {expandedBundles.has(`${item.id}-${item.type}`) ? "Hide meals" : "See all meals"}
                            </button>
                            {/* Expanded meal list */}
                            {expandedBundles.has(`${item.id}-${item.type}`) && boxNames.length > 0 && (
                              <div className="mt-2 border-t border-white/8 pt-2 flex flex-col gap-1.5">
                                {boxNames.map((n, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    {boxImgs[i] && (
                                      <div className="w-8 h-8 overflow-hidden shrink-0">
                                        <img src={boxImgs[i]} alt="" className="w-full h-full object-cover" />
                                      </div>
                                    )}
                                    <span className="text-[11px] text-white/45 leading-tight truncate">{n}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Regular cart item */
                          <div className="flex gap-3">
                            <img src={item.img} alt={item.name} className="w-14 h-14 object-cover shrink-0 bg-[#222]" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-medium leading-snug line-clamp-2">{item.name}</p>
                              {item.planLabel && <p className="text-[11px] text-[#E85D04] mt-0.5">{item.planLabel}</p>}
                              <div className="flex items-center justify-between mt-2 gap-2">
                                <span className="font-mono text-[12px] text-[#F5B300]">${(item.price * item.qty).toFixed(2)}</span>
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
                        )}
                      </div>
                    );
                  })}
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
                    <div className="mx-4 mb-3 bg-[#F5B300]/8 border border-[#F5B300]/25 p-3">
                      <div className="flex items-start gap-2">
                        <span className="text-[15px] shrink-0">🛒</span>
                        <div className="flex-1">
                          <p className="text-[#F5B300] text-[11px] font-bold mb-0.5">
                            Add {toAdd} more meal{toAdd !== 1 ? "s" : ""}{saving > 0.5 ? ` — save $${saving.toFixed(2)}` : " to unlock box pricing"}
                          </p>
                          <p className="text-white/40 text-[10px] leading-relaxed">
                            {next.qty}-meal Build-A-Box drops to <strong className="text-white/60">${next.ppm.toFixed(2)}/meal</strong>. You currently have {readyQty}.
                          </p>
                          <button onClick={() => { setCartOpen(false); navigate("ready-series"); }}
                            className="mt-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#F5B300] hover:underline">
                            Add more meals →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="mx-4 bg-[#F5B300]/10 border border-[#F5B300]/25 p-3 text-[12px] text-[#F5B300] flex items-center gap-2">
                  <span>💳</span>
                  <span>Wallet: <strong>$12.50</strong> available at checkout</span>
                </div>

                <div className="p-4 border-t border-white/10 mt-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50 text-[13px]">Subtotal ({cartCount} item{cartCount !== 1 ? "s" : ""})</span>
                    <span className="font-mono font-bold text-[16px]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button onClick={() => { setCartOpen(false); onCheckout(); }} className="w-full bg-[#F5B300] text-[#1A1A1A] py-4 text-[12px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
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
