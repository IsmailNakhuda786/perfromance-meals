import { useState, useCallback, useEffect } from "react";
import HTML_EXPORT from "@/htmlExport";
import { CartItem, Page } from "@/data";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";
import HomePage from "@/pages/HomePage";
import ReadyToGoPage from "@/pages/ReadyToGoPage";
import BuildABoxPage from "@/pages/BuildABoxPage";
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

const NO_FOOTER_PAGES: Page[] = ["checkout", "confirmation", "meal-plan-wizard", "build-a-box", "handoff", "blueprint", "wireframe"];

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
      <div className="bg-[#111] text-white flex items-center justify-between px-4 py-3 gap-3 flex-wrap">
        <div>
          <div className="text-[13px] font-semibold text-white">Download Prototype</div>
          <div className="text-[11px] text-white/50">Single HTML file — open in any browser, no setup needed</div>
        </div>
        <button onClick={downloadHTML}
          className="bg-[#CDFF3A] text-[#111] text-[12px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-white transition-colors whitespace-nowrap shrink-0">
          ↓ Download fresher-prototype.html
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
      {page === "ready-to-go" && <ReadyToGoPage navigate={navigate} addToCart={addToCart} cart={cart} />}
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
      {page === "wireframe" && <WireframePage navigate={navigate} navigateToWizard={navigateToWizard} />}
      {page === "about" && <AboutPage navigate={navigate} navigateToWizard={navigateToWizard} />}

      {showFooter && <Footer navigate={navigate} navigateToWizard={navigateToWizard} />}
    </div>
  );
}
