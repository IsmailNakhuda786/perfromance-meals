import { useState, useCallback, useEffect } from "react";
import HTML_EXPORT from "@/htmlExport";
import { CartItem, Page } from "@/data";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";
import HomePage from "@/pages/HomePage";
import ReadySeriesPage from "@/pages/ReadySeriesPage";
import ReadyToGoPage from "@/pages/ReadyToGoPage";
import BuildABoxPage from "@/pages/BuildABoxPage";
import MealPlanLandingPage from "@/pages/MealPlanLandingPage";
import MealPlanWizardPage from "@/pages/MealPlanWizardPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import AccountPage from "@/pages/AccountPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import GiftCardPage from "@/pages/GiftCardPage";
import HandoffPage from "@/pages/HandoffPage";
import BlueprintPage from "@/pages/BlueprintPage";
import WireframePage from "@/pages/WireframePage";
import AboutPage from "@/pages/AboutPage";
import ScreensExportPage from "@/pages/ScreensExportPage";

const NO_FOOTER_PAGES: Page[] = ["checkout", "confirmation", "meal-plan-wizard", "build-a-box", "handoff", "blueprint", "wireframe", "screens-export"];

export interface SavedAddress {
  name: string;
  phone: string;
  line1: string;
  unit: string;
  postal: string;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wizardInitialPlan, setWizardInitialPlan] = useState("MAINTAIN");
  const [savedAddress, setSavedAddress] = useState<SavedAddress | null>(null);
  const [lastOrderType, setLastOrderType] = useState<"ready" | "plan">("ready");
  const [lastOrderGuest, setLastOrderGuest] = useState(false);
  const [lastPromoCode, setLastPromoCode] = useState("");
  const [lastPromoDiscount, setLastPromoDiscount] = useState(0);
  const [accountInitialTab, setAccountInitialTab] = useState<"dashboard" | "settings">("dashboard");
  const [accountInitialSection, setAccountInitialSection] = useState<string | undefined>(undefined);
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPromo(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (p === "home") setTimeout(() => setShowPromo(true), 1800);
  };

  const navigateToAccountReferral = () => {
    setAccountInitialTab("settings");
    setAccountInitialSection("referral");
    navigate("account");
  };

  const navigateToWizard = (plan?: string) => {
    if (plan) setWizardInitialPlan(plan);
    navigate("meal-plan-wizard");
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const key = `${item.id}-${item.type}`;
      const existing = prev.find((i) => `${i.id}-${i.type}` === key);
      if (existing) return prev.map((i) => `${i.id}-${i.type}` === key ? { ...i, qty: i.qty + item.qty } : i);
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const updateCartQty = (id: number, type: string, delta: number) => {
    setCart((prev) => {
      const key = `${id}-${type}`;
      return prev
        .map((i) => `${i.id}-${i.type}` === key ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0);
    });
  };

  const removeFromCart = (id: number, type: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.type === type)));
  };

  const handlePlanCheckout = (addr: SavedAddress) => {
    setSavedAddress(addr);
    setLastOrderType("plan");
  };

  const handleReadyCheckout = () => {
    setLastOrderType("ready");
    navigate("checkout");
  };

  const showFooter = !NO_FOOTER_PAGES.includes(page);

  const downloadHTML = useCallback(() => {
    const blob = new Blob([HTML_EXPORT], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fresher-prototype.html";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="min-h-screen font-body">
      {showPromo && <PromoPopup onClose={() => setShowPromo(false)} navigate={navigate} />}

      {/* Download banner */}
      <div className="bg-[#1A1A1A] text-white flex items-center justify-between px-4 py-3 gap-3 flex-wrap">
        <div>
          <div className="text-[13px] font-semibold text-white">Download Prototype</div>
          <div className="text-[11px] text-white/50">Single HTML file — open in any browser, no setup needed</div>
        </div>
        <button onClick={downloadHTML}
          className="bg-[#F5B300] text-[#1A1A1A] text-[12px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-white transition-colors whitespace-nowrap shrink-0">
          ↓ Download performance-meals-prototype.html
        </button>
      </div>

      <Nav
        currentPage={page}
        navigate={navigate}
        navigateToWizard={navigateToWizard}
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        updateCartQty={updateCartQty}
        removeFromCart={removeFromCart}
        onCheckout={handleReadyCheckout}
      />

      {page === "home" && <HomePage navigate={navigate} navigateToWizard={navigateToWizard} addToCart={addToCart} navigateToReferral={navigateToAccountReferral} />}
      {page === "ready-series" && <ReadySeriesPage navigate={navigate} addToCart={addToCart} cart={cart} />}
      {page === "ready-to-go" && <ReadyToGoPage navigate={navigate} addToCart={addToCart} cart={cart} />}
      {page === "meal-plan-landing" && <MealPlanLandingPage navigate={navigate} navigateToWizard={navigateToWizard} />}
      {page === "build-a-box" && <BuildABoxPage navigate={navigate} addToCart={addToCart} />}
      {page === "meal-plan-wizard" && (
        <MealPlanWizardPage
          navigate={navigate}
          addToCart={addToCart}
          initialPlan={wizardInitialPlan}
          onCheckoutComplete={(addr) => { handlePlanCheckout(addr); navigate("confirmation"); }}
        />
      )}
      {page === "checkout" && <CheckoutPage navigate={navigate} cart={cart} savedAddress={savedAddress} onComplete={(isGuest, promoCode, promoDiscount) => { setLastOrderType("ready"); setLastOrderGuest(isGuest); setLastPromoCode(promoCode); setLastPromoDiscount(promoDiscount); navigate("confirmation"); }} />}
      {page === "confirmation" && <ConfirmationPage navigate={navigate} orderType={lastOrderType} isGuest={lastOrderGuest} promoCode={lastPromoCode} promoDiscount={lastPromoDiscount} />}
      {page === "account" && <AccountPage navigate={navigate} initialTab={accountInitialTab} initialSection={accountInitialSection} />}
      {page === "how-it-works" && <HowItWorksPage navigate={navigate} navigateToWizard={navigateToWizard} />}
      {page === "gift-card" && <GiftCardPage navigate={navigate} />}
      {page === "handoff" && <HandoffPage navigate={navigate} navigateToWizard={navigateToWizard} />}
      {page === "blueprint" && <BlueprintPage navigate={navigate} navigateToWizard={navigateToWizard} />}
      {page === "screens-export" && <ScreensExportPage navigate={navigate} />}
      {page === "wireframe" && <WireframePage navigate={navigate} navigateToWizard={navigateToWizard} />}
      {page === "about" && <AboutPage navigate={navigate} navigateToWizard={navigateToWizard} />}

      {showFooter && <Footer navigate={navigate} navigateToWizard={navigateToWizard} />}

      {/* Floating support chat button — fixed bottom-right on all pages */}
      <FloatingChat />
    </div>
  );
}

function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="bg-white border border-[#E8E4DC] shadow-xl w-[300px] sm:w-[340px] overflow-hidden"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
          {/* Panel header */}
          <div className="bg-[#1A1A1A] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F5B300] flex items-center justify-center text-[14px] font-black text-[#1A1A1A]">PM</div>
              <div>
                <div className="text-white text-[13px] font-semibold">Performance Meals</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-white/50 text-[10px]">Typically replies in minutes</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          {/* Chat body */}
          <div className="px-5 py-5 flex flex-col gap-3">
            <div className="bg-[#FAF9F6] border border-[#E8E4DC] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[240px]">
              <p className="text-[13px] text-[#1A1A1A] leading-relaxed">
                Hi there! 👋 How can we help you today?
              </p>
            </div>
            <div className="bg-[#FAF9F6] border border-[#E8E4DC] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[240px]">
              <p className="text-[13px] text-[#1A1A1A] leading-relaxed">
                Ask us anything about meal plans, delivery, or your order.
              </p>
            </div>
          </div>
          {/* Quick options */}
          <div className="px-5 pb-4 flex flex-wrap gap-2">
            {["Track my order", "View meal plans", "Delivery info", "Talk to someone"].map((opt) => (
              <button key={opt}
                className="text-[11px] font-medium px-3 py-1.5 border border-[#E8E4DC] text-[#555] hover:border-[#F5B300] hover:text-[#1A1A1A] transition-colors bg-white">
                {opt}
              </button>
            ))}
          </div>
          {/* Input row */}
          <div className="border-t border-[#E8E4DC] px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message…"
              className="flex-1 text-[13px] outline-none text-[#1A1A1A] placeholder:text-[#bbb] bg-transparent"
            />
            <button className="w-8 h-8 flex items-center justify-center bg-[#F5B300] shrink-0 hover:bg-[#1A1A1A] transition-colors group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" className="group-hover:stroke-white"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 flex items-center justify-center bg-[#1A1A1A] hover:bg-[#F5B300] transition-colors group shadow-lg"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.18)" }}
        aria-label="Open support chat"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="group-hover:stroke-[#1A1A1A]"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="group-hover:stroke-[#1A1A1A]">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
