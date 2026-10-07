import { lazy, Suspense, useEffect, useState } from "react"
import { CartItem, Page } from "@/data"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import PromoPopup from "@/components/PromoPopup"
import HomePage from "@/pages/HomePage"

const ReadySeriesPage = lazy(() => import("@/pages/ReadySeriesPage"))
const ReadySeriesLandingPage = lazy(
  () => import("@/pages/ReadySeriesLandingPage"),
)
const ReadySeriesAboutPage = lazy(() => import("@/pages/ReadySeriesAboutPage"))
const MealPlanLandingPage = lazy(() => import("@/pages/MealPlanLandingPage"))
const MealPlanAboutPage = lazy(() => import("@/pages/MealPlanAboutPage"))
const MealPlanStoriesPage = lazy(() => import("@/pages/MealPlanStoriesPage"))
const MealPlanWizardPage = lazy(() => import("@/pages/MealPlanWizardPage"))
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"))
const ConfirmationPage = lazy(() => import("@/pages/ConfirmationPage"))
const AccountPage = lazy(() => import("@/pages/AccountPage"))
const GiftCardPage = lazy(() => import("@/pages/GiftCardPage"))
const AboutPage = lazy(() => import("@/pages/AboutPage"))
const ReadySeriesProductPage = lazy(
  () => import("@/pages/ReadySeriesProductPage"),
)
const RewardsPage = lazy(() => import("@/pages/RewardsPage"))

const NO_FOOTER_PAGES: Page[] = [
  "checkout",
  "confirmation",
  "meal-plan-wizard",
  "ready-series-product",
]

interface SavedAddress {
  name: string
  phone: string
  line1: string
  unit: string
  postal: string
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [wizardInitialPlan, setWizardInitialPlan] = useState("bi-weekly")
  const [savedAddress, setSavedAddress] = useState<SavedAddress | null>(null)
  const [lastOrderType, setLastOrderType] =
    useState<"ready" | "plan" | "mixed">("ready")
  const [lastOrderGuest, setLastOrderGuest] = useState(false)
  const [lastPromoCode, setLastPromoCode] = useState("")
  const [lastPromoDiscount, setLastPromoDiscount] = useState(0)
  const [lastOrderTotal, setLastOrderTotal] = useState(0)
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    name: string
    address: string
    date: string
    slot: string
    deliveryFee: number
  } | null>(null)
  const [selectedMealId, setSelectedMealId] = useState<number>(1)
  const [showPromo, setShowPromo] = useState(false)
  const [readyInitialMode, setReadyInitialMode] =
    useState<"single" | "bundles" | "subscription">("single")

  useEffect(() => {
    const timer = setTimeout(() => setShowPromo(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
    if (p === "home") setTimeout(() => setShowPromo(true), 1800)
  }

  const navigateToWizard = (plan?: string) => {
    if (plan) setWizardInitialPlan(plan)
    navigate("meal-plan-wizard")
  }

  const navigateToReadyOrder = (
    mode: "single" | "bundles" | "subscription",
  ) => {
    setReadyInitialMode(mode)
    navigate("ready-series-order")
  }

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.lineKey === item.lineKey)
      if (existing)
        return prev.map((i) =>
          i.lineKey === item.lineKey ? { ...i, qty: i.qty + item.qty } : i,
        )
      return [...prev, item]
    })
    setCartOpen(true)
  }

  const updateCartQty = (lineKey: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((i) => (i.lineKey === lineKey ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    })
  }

  const removeFromCart = (lineKey: string) => {
    setCart((prev) => prev.filter((i) => i.lineKey !== lineKey))
  }

  const handlePlanCart = (addr: SavedAddress) => {
    setSavedAddress(addr)
    setCartOpen(false)
    navigate("checkout")
  }

  const handleReadyCheckout = () => {
    navigate("checkout")
  }

  const showFooter = !NO_FOOTER_PAGES.includes(page)

  return (
    <div className="min-h-screen font-body">
      {showPromo && (
        <PromoPopup
          onClose={() => setShowPromo(false)}
          navigate={navigate}
          navigateToWizard={navigateToWizard}
        />
      )}

      <Nav
        currentPage={page}
        navigate={navigate}
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        updateCartQty={updateCartQty}
        removeFromCart={removeFromCart}
        onCheckout={handleReadyCheckout}
        isLoggedIn={isLoggedIn}
        onAuthChange={setIsLoggedIn}
      />

      <Suspense
        fallback={
          <div className="min-h-screen bg-[#F7F5F0]" aria-hidden="true" />
        }
      >
        {page === "home" && (
          <HomePage navigate={navigate} navigateToWizard={navigateToWizard} />
        )}
        {page === "ready-series" && (
          <ReadySeriesLandingPage
            navigate={navigate}
            navigateToReadyOrder={navigateToReadyOrder}
          />
        )}
        {page === "ready-series-about" && (
          <ReadySeriesAboutPage navigate={navigate} />
        )}
        {page === "ready-series-order" && (
          <ReadySeriesPage
            navigate={navigate}
            addToCart={addToCart}
            cart={cart}
            onSelectMeal={(id) => {
              setSelectedMealId(id)
              navigate("ready-series-product")
            }}
            setCartOpen={setCartOpen}
            initialPurchaseMode={readyInitialMode}
            isLoggedIn={isLoggedIn}
            onAuthenticated={() => setIsLoggedIn(true)}
          />
        )}
        {page === "ready-series-product" && (
          <ReadySeriesProductPage
            mealId={selectedMealId}
            navigate={navigate}
            addToCart={addToCart}
          />
        )}
        {page === "meal-plan-landing" && (
          <MealPlanLandingPage
            navigate={navigate}
            navigateToWizard={navigateToWizard}
          />
        )}
        {page === "meal-plan-about" && (
          <MealPlanAboutPage
            navigate={navigate}
            navigateToWizard={navigateToWizard}
          />
        )}
        {page === "meal-plan-stories" && (
          <MealPlanStoriesPage
            navigate={navigate}
            navigateToWizard={navigateToWizard}
          />
        )}
        {page === "meal-plan-wizard" && (
          <MealPlanWizardPage
            navigate={navigate}
            addToCart={addToCart}
            initialPlan={wizardInitialPlan}
            isLoggedIn={isLoggedIn}
            onAuthenticated={() => setIsLoggedIn(true)}
            onContinueToCheckout={handlePlanCart}
          />
        )}
        {page === "checkout" && (
          <CheckoutPage
            navigate={navigate}
            cart={cart}
            savedAddress={savedAddress}
            isLoggedIn={isLoggedIn}
            onAuthenticated={() => setIsLoggedIn(true)}
            onComplete={(isGuest, promoCode, promoDiscount, total, details) => {
              const hasMealPlan = cart.some((item) => item.type === "plan")
              const hasReadySeries = cart.some((item) => item.type !== "plan")
              setLastOrderType(
                hasMealPlan && hasReadySeries
                  ? "mixed"
                  : hasMealPlan
                    ? "plan"
                    : "ready",
              )
              setLastOrderGuest(isGuest)
              setLastPromoCode(promoCode)
              setLastPromoDiscount(promoDiscount)
              setLastOrderTotal(total)
              setLastOrderDetails(details)
              navigate("confirmation")
            }}
          />
        )}
        {page === "confirmation" && (
          <ConfirmationPage
            navigate={navigate}
            orderType={lastOrderType}
            isGuest={lastOrderGuest}
            promoCode={lastPromoCode}
            promoDiscount={lastPromoDiscount}
            orderTotal={lastOrderTotal}
            orderDetails={lastOrderDetails}
          />
        )}
        {page === "account" && <AccountPage navigate={navigate} />}
        {page === "gift-card" && <GiftCardPage navigate={navigate} />}
        {page === "about" && <AboutPage navigate={navigate} />}
        {page === "rewards" && (
          <RewardsPage navigate={navigate} isLoggedIn={isLoggedIn} />
        )}
      </Suspense>

      {showFooter && <Footer navigate={navigate} />}

      {/* Floating support chat button — fixed bottom-right on all pages */}
      <FloatingChat />
    </div>
  )
}

const WA_NUMBER = "6512345678"
const WA_MESSAGE = "Hi Performance Meals! I have a question about "

function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState<string | null>(null)

  const openWhatsApp = (msg: string) => {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE + msg)}`
    window.open(url, "_blank", "noopener")
  }

  const quickTopics = [
    { label: "Track my order", msg: "my order status" },
    { label: "Meal Plan info", msg: "the Meal Plan subscription" },
    { label: "Ready Series", msg: "Ready Series products" },
    { label: "Delivery help", msg: "delivery to my area" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div
          className="bg-white border border-[#E8E4DC] w-[300px] sm:w-[340px] overflow-hidden"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.14)" }}
        >
          {/* WhatsApp header */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ backgroundColor: "#075E54" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M11.99 2C6.476 2 2 6.476 2 11.99c0 1.77.463 3.433 1.27 4.88L2 22l5.287-1.384A9.942 9.942 0 0011.99 22c5.514 0 9.99-4.476 9.99-9.99S17.504 2 11.99 2zm0 18.18a8.17 8.17 0 01-4.164-1.135l-.299-.178-3.138.822.836-3.053-.194-.312A8.183 8.183 0 013.82 11.99 8.17 8.17 0 0111.99 3.82 8.17 8.17 0 0120.16 11.99a8.17 8.17 0 01-8.17 8.19z" />
                </svg>
              </div>
              <div>
                <div className="text-white text-[13px] font-semibold">
                  Performance Meals
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-[#25D366]" />
                  <span className="text-white/70 text-[10px]">
                    WhatsApp · Replies within minutes
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="bg-[#ECE5DD] px-5 py-5">
            <div
              className="bg-white px-4 py-3 max-w-[240px] shadow-sm mb-2"
              style={{ borderRadius: "0 8px 8px 8px" }}
            >
              <p className="text-[13px] text-[#1A1A1A] leading-relaxed">
                Hi there! 👋 We're here to help with anything — orders, plans,
                delivery, or nutrition questions.
              </p>
              <p className="text-[10px] text-[#999] mt-1.5 text-right">09:00</p>
            </div>
            <div
              className="bg-white px-4 py-3 max-w-[240px] shadow-sm"
              style={{ borderRadius: "0 8px 8px 8px" }}
            >
              <p className="text-[13px] text-[#1A1A1A] leading-relaxed">
                What can we help you with today?
              </p>
              <p className="text-[10px] text-[#999] mt-1.5 text-right">09:00</p>
            </div>
          </div>

          {/* Quick topic buttons */}
          <div className="px-5 py-4 bg-white border-t border-[#E8E4DC]">
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#aaa] mb-3">
              Quick topics
            </p>
            <div className="flex flex-col gap-2">
              {quickTopics.map((qt) => (
                <button
                  key={qt.label}
                  onClick={() => {
                    setTopic(qt.label)
                    openWhatsApp(qt.msg)
                  }}
                  className={`w-full text-left px-3 py-2.5 border text-[12px] font-medium transition-all flex items-center justify-between ${
                    topic === qt.label
                      ? "border-[#25D366] bg-[#25D366]/5 text-[#075E54]"
                      : "border-[#E8E4DC] text-[#333] hover:border-[#25D366]"
                  }`}
                >
                  {qt.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 w-full py-3 text-white text-[12px] font-bold tracking-[0.1em] uppercase transition-colors"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M11.99 2C6.476 2 2 6.476 2 11.99c0 1.77.463 3.433 1.27 4.88L2 22l5.287-1.384A9.942 9.942 0 0011.99 22c5.514 0 9.99-4.476 9.99-9.99S17.504 2 11.99 2zm0 18.18a8.17 8.17 0 01-4.164-1.135l-.299-.178-3.138.822.836-3.053-.194-.312A8.183 8.183 0 013.82 11.99 8.17 8.17 0 0111.99 3.82 8.17 8.17 0 0120.16 11.99a8.17 8.17 0 01-8.17 8.19z" />
              </svg>
              Open in WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 flex items-center justify-center transition-colors group"
        style={{
          backgroundColor: open ? "#1A1A1A" : "#25D366",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
        aria-label="Open WhatsApp support"
      >
        {open ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M11.99 2C6.476 2 2 6.476 2 11.99c0 1.77.463 3.433 1.27 4.88L2 22l5.287-1.384A9.942 9.942 0 0011.99 22c5.514 0 9.99-4.476 9.99-9.99S17.504 2 11.99 2zm0 18.18a8.17 8.17 0 01-4.164-1.135l-.299-.178-3.138.822.836-3.053-.194-.312A8.183 8.183 0 013.82 11.99 8.17 8.17 0 0111.99 3.82 8.17 8.17 0 0120.16 11.99a8.17 8.17 0 01-8.17 8.19z" />
          </svg>
        )}
      </button>
    </div>
  )
}
