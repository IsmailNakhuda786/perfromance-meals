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

const NO_FOOTER_PAGES: Page[] = ["checkout", "confirmation", "meal-plan-wizard", "build-a-box"];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const showFooter = !NO_FOOTER_PAGES.includes(page);

  return (
    <div className="min-h-screen font-body">
      <Nav currentPage={page} navigate={navigate} cart={cart} cartOpen={cartOpen} setCartOpen={setCartOpen} />

      {page === "home" && <HomePage navigate={navigate} addToCart={addToCart} />}
      {page === "ready-to-go" && <ReadyToGoPage navigate={navigate} addToCart={addToCart} />}
      {page === "build-a-box" && <BuildABoxPage navigate={navigate} addToCart={addToCart} />}
      {page === "meal-plan-wizard" && <MealPlanWizardPage navigate={navigate} addToCart={addToCart} />}
      {page === "checkout" && <CheckoutPage navigate={navigate} cart={cart} />}
      {page === "confirmation" && <ConfirmationPage navigate={navigate} />}
      {page === "account" && <AccountPage navigate={navigate} />}

      {showFooter && <Footer navigate={navigate} />}
    </div>
  );
}
