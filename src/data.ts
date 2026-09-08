export type Page =
  | "home"
  | "ready-to-go"
  | "build-a-box"
  | "meal-plan-wizard"
  | "checkout"
  | "confirmation"
  | "account"
  | "how-it-works"
  | "gift-card"
  | "handoff"
  | "blueprint"
  | "wireframe"
  | "about"
  | "screens-export";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
  type: "ready" | "box" | "plan";
  planLabel?: string;
}

export interface Meal {
  id: number;
  name: string;
  cat: string;
  price: number;
  protein: number;
  carbs: number;
  fat: number;
  cal: number;
  rating: number;
  reviews: number;
  badge: string | null;
  img: string;
  desc: string;
}

export const MEALS: Meal[] = [
  {
    id: 1, name: "Herb Grilled Chicken & Brown Rice", cat: "high-carb",
    price: 12.40, protein: 42, carbs: 55, fat: 8, cal: 460,
    rating: 4.9, reviews: 284, badge: "Bestseller",
    img: "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?w=600&h=500&fit=crop&auto=format",
    desc: "Free-range chicken breast marinated overnight in rosemary, thyme, and lemon. Paired with nutty brown rice and steamed broccolini.",
  },
  {
    id: 2, name: "Chilli Lime Chicken & Cauliflower Rice", cat: "low-carb",
    price: 12.40, protein: 40, carbs: 14, fat: 10, cal: 310,
    rating: 4.8, reviews: 196, badge: "Low Carb",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=500&fit=crop&auto=format",
    desc: "Zesty chilli-lime chicken thigh over riced cauliflower with pickled cucumber and sesame dressing.",
  },
  {
    id: 3, name: "Smoked Salmon Scrambled Eggs", cat: "breakfast",
    price: 11.90, protein: 28, carbs: 8, fat: 16, cal: 290,
    rating: 4.7, reviews: 143, badge: "Breakfast",
    img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=500&fit=crop&auto=format",
    desc: "Slow-scrambled free-range eggs with cold-smoked Atlantic salmon, capers, and dill.",
  },
  {
    id: 4, name: "Teriyaki Chicken & Jasmine Rice", cat: "high-carb",
    price: 12.40, protein: 38, carbs: 52, fat: 10, cal: 450,
    rating: 4.9, reviews: 312, badge: "New",
    img: "https://images.unsplash.com/photo-1772693471187-6e7d364f99ee?w=600&h=500&fit=crop&auto=format",
    desc: "House-made teriyaki glaze on grilled chicken, over fragrant jasmine rice with edamame and pickled ginger.",
  },
  {
    id: 5, name: "Korean BBQ Beef & Purple Rice", cat: "high-carb",
    price: 13.90, protein: 44, carbs: 58, fat: 12, cal: 510,
    rating: 4.8, reviews: 201, badge: null,
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=500&fit=crop&auto=format",
    desc: "Grass-fed beef in house gochujang marinade over antioxidant-rich purple rice with kimchi slaw.",
  },
  {
    id: 6, name: "Lemon Herb Turkey Breast", cat: "just-protein",
    price: 11.90, protein: 46, carbs: 6, fat: 6, cal: 270,
    rating: 4.7, reviews: 98, badge: "Just Protein",
    img: "https://images.unsplash.com/photo-1563438962385-0d3dd8319200?w=600&h=500&fit=crop&auto=format",
    desc: "Lean turkey breast, slow-roasted with lemon and herbs. 46g protein per serve. Zero filler.",
  },
  {
    id: 7, name: "Greek Chicken & Quinoa Bowl", cat: "low-carb",
    price: 12.40, protein: 38, carbs: 22, fat: 11, cal: 350,
    rating: 4.7, reviews: 155, badge: null,
    img: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&h=500&fit=crop&auto=format",
    desc: "Lemon oregano chicken over tri-colour quinoa with cucumber, olives, and sun-dried tomato.",
  },
  {
    id: 8, name: "Overnight Protein Oats & Berries", cat: "breakfast",
    price: 9.90, protein: 22, carbs: 48, fat: 8, cal: 360,
    rating: 4.6, reviews: 88, badge: null,
    img: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=600&h=500&fit=crop&auto=format",
    desc: "Cold-brew overnight oats with vanilla protein, blueberry compote, and toasted almonds.",
  },
  {
    id: 9, name: "Cajun Salmon & Sweet Potato Mash", cat: "high-carb",
    price: 13.90, protein: 40, carbs: 44, fat: 14, cal: 470,
    rating: 4.9, reviews: 267, badge: "Staff Pick",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=500&fit=crop&auto=format",
    desc: "Atlantic salmon fillet with cajun spice crust, over whipped sweet potato and wilted spinach.",
  },
];

export const CATS = [
  { id: "all", label: "All Meals" },
  { id: "promotion", label: "🔥 Promotion" },
  { id: "bundles", label: "📦 Useful Bundles" },
  { id: "low-carb", label: "Low Carb" },
  { id: "high-carb", label: "High Carb" },
  { id: "breakfast", label: "Breakfast" },
  { id: "just-protein", label: "Just Protein" },
];

export const PROMOTIONS = [
  { id: 101, name: "SG61 Deal — Herb Chicken ×3", desc: "Our #1 bestseller at a special price. Use code SG61.", original: 37.20, sale: 28.90, saving: "22% OFF", img: "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?w=600&h=500&fit=crop&auto=format", tag: "Promo" },
  { id: 102, name: "Weekend Bundle — Mix of 4", desc: "Teriyaki, Korean BBQ, Cajun Salmon + Herb Chicken.", original: 52.60, sale: 39.90, saving: "24% OFF", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=500&fit=crop&auto=format", tag: "Flash Sale" },
];

export const BUNDLES = [
  { id: 201, name: "Lean Starter Pack (5 meals)", desc: "Curated low-carb selection — perfect for first-timers.", price: 59.00, perMeal: 11.80, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=500&fit=crop&auto=format", tag: "Popular" },
  { id: 202, name: "Bulk Performance Box (10 meals)", desc: "Mix of high-protein picks, best value per meal.", price: 109.00, perMeal: 10.90, img: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&h=500&fit=crop&auto=format", tag: "Best Value" },
  { id: 203, name: "Breakfast Week (7 meals)", desc: "Protein oats + salmon scramble — 7 mornings sorted.", price: 65.00, perMeal: 9.28, img: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=600&h=500&fit=crop&auto=format", tag: "New" },
];

export const BOX_SIZES = [
  { qty: 5, label: "Starter", pricePerMeal: 12.40, total: 62.00, popular: false },
  { qty: 10, label: "Standard", pricePerMeal: 11.90, total: 119.00, popular: true },
  { qty: 15, label: "Pro", pricePerMeal: 11.50, total: 172.50, popular: false },
  { qty: 20, label: "Elite", pricePerMeal: 11.00, total: 220.00, popular: false },
];

export const PLANS = [
  {
    name: "CUT", cal: 1500, protein: 130, carbs: 120, fat: 45, meals: 3,
    priceWeek: 148, priceMonth: 520,
    desc: "Structured deficit for steady, sustainable fat loss without sacrificing muscle.",
    accent: "#CDFF3A",
  },
  {
    name: "MAINTAIN", cal: 2000, protein: 160, carbs: 190, fat: 60, meals: 4,
    priceWeek: 178, priceMonth: 625,
    desc: "Calibrated to your TDEE — optimal fueling for daily performance and recovery.",
    accent: "#F2C94C",
  },
  {
    name: "BUILD", cal: 2500, protein: 190, carbs: 260, fat: 75, meals: 5,
    priceWeek: 208, priceMonth: 729,
    desc: "Clean surplus with high-protein loading designed for serious muscle gain.",
    accent: "#7EE8B0",
  },
];
