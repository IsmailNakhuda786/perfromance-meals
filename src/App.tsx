import { useState } from "react";
import { CartItem, Page } from "@/data";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import ReadyToGoPage from "@/pages/ReadyToGoPage";
import BuildABoxPage from "@/pages/BuildABoxPage";
import MealPlanWizardPage from "@/pages/MealPlanWizardPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import AccountPage from "@/pages/AccountPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import GiftCardPage from "@/pages/GiftCardPage";

const NO_FOOTER_PAGES: Page[] = ["checkout", "confirmation", "meal-plan-wizard", "build-a-box"];

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
  const [accountInitialTab, setAccountInitialTab] = useState<"dashboard" | "settings">("dashboard");
  const [accountInitialSection, setAccountInitialSection] = useState<string | undefined>(undefined);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <div className="min-h-screen font-body">
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
      {page === "checkout" && <CheckoutPage navigate={navigate} cart={cart} savedAddress={savedAddress} onComplete={() => { setLastOrderType("ready"); navigate("confirmation"); }} />}
      {page === "confirmation" && <ConfirmationPage navigate={navigate} orderType={lastOrderType} />}
      {page === "account" && <AccountPage navigate={navigate} initialTab={accountInitialTab} initialSection={accountInitialSection} />}
      {page === "how-it-works" && <HowItWorksPage navigate={navigate} navigateToWizard={navigateToWizard} />}
      {page === "gift-card" && <GiftCardPage navigate={navigate} />}

      {showFooter && <Footer navigate={navigate} navigateToWizard={navigateToWizard} />}
    </div>
  );
}
