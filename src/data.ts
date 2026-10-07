export type Page = "home" | "ready-series" | "ready-series-about" | "ready-series-order" | "meal-plan-landing" | "meal-plan-about" | "meal-plan-stories" | "meal-plan-wizard" | "checkout" | "confirmation" | "account" | "gift-card" | "about" | "ready-series-product" | "rewards"

export interface CartItem {
  lineKey: string
  id: number
  name: string
  price: number
  qty: number
  img: string
  type: "ready" | "bundle" | "plan"
  purchaseMode: "individual" | "bundle" | "subscription" | "meal-plan"
  productId: string
  variantId?: string
  sellingPlanId?: string
  programmeContext?: string
  requiresAccount?: boolean
  bonusWalletEligible: boolean
  planLabel?: string
  mealImgs?: string[]
  mealNames?: string[]
  mealCounts?: number[]
}

export interface Meal {
  id: number
  name: string
  cat: string
  price: number
  protein: number
  carbs: number
  fat: number
  cal: number
  rating: number
  reviews: number
  badge: string | null
  img: string
  desc: string
}

export const MEAL_PLAN_MEALS: Meal[] = [
  {
    id: 1,
    name: "Herb Grilled Chicken & Brown Rice",
    cat: "high-carb",
    price: 12.4,
    protein: 42,
    carbs: 55,
    fat: 8,
    cal: 460,
    rating: 4.9,
    reviews: 284,
    badge: "Bestseller",
    img: "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?w=600&h=500&fit=crop&auto=format",
    desc: "Free-range chicken breast marinated overnight in rosemary, thyme, and lemon. Paired with nutty brown rice and steamed broccolini.",
  },
  {
    id: 2,
    name: "Chilli Lime Chicken & Cauliflower Rice",
    cat: "low-carb",
    price: 12.4,
    protein: 40,
    carbs: 14,
    fat: 10,
    cal: 310,
    rating: 4.8,
    reviews: 196,
    badge: "Low Carb",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=500&fit=crop&auto=format",
    desc: "Zesty chilli-lime chicken thigh over riced cauliflower with pickled cucumber and sesame dressing.",
  },
  {
    id: 3,
    name: "Smoked Salmon Scrambled Eggs",
    cat: "breakfast",
    price: 11.9,
    protein: 28,
    carbs: 8,
    fat: 16,
    cal: 290,
    rating: 4.7,
    reviews: 143,
    badge: "Breakfast",
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=500&fit=crop&auto=format&q=85",
    desc: "Slow-scrambled free-range eggs with cold-smoked Atlantic salmon, capers, and dill.",
  },
  {
    id: 4,
    name: "Teriyaki Chicken & Jasmine Rice",
    cat: "high-carb",
    price: 12.4,
    protein: 38,
    carbs: 52,
    fat: 10,
    cal: 450,
    rating: 4.9,
    reviews: 312,
    badge: "New",
    img: "https://images.unsplash.com/photo-1772693471187-6e7d364f99ee?w=600&h=500&fit=crop&auto=format",
    desc: "House-made teriyaki glaze on grilled chicken, over fragrant jasmine rice with edamame and pickled ginger.",
  },
  {
    id: 5,
    name: "Korean BBQ Beef & Purple Rice",
    cat: "high-carb",
    price: 13.9,
    protein: 44,
    carbs: 58,
    fat: 12,
    cal: 510,
    rating: 4.8,
    reviews: 201,
    badge: null,
    img: "https://images.unsplash.com/photo-1696906594893-e9995c4d7082?w=600&h=500&fit=crop&auto=format&q=85",
    desc: "Grass-fed beef in house gochujang marinade over antioxidant-rich purple rice with kimchi slaw.",
  },
  {
    id: 6,
    name: "Lemon Herb Turkey Breast",
    cat: "just-protein",
    price: 11.9,
    protein: 46,
    carbs: 6,
    fat: 6,
    cal: 270,
    rating: 4.7,
    reviews: 98,
    badge: "Just Protein",
    img: "https://images.unsplash.com/photo-1563438962385-0d3dd8319200?w=600&h=500&fit=crop&auto=format",
    desc: "Lean turkey breast, slow-roasted with lemon and herbs. 46g protein per serve. Zero filler.",
  },
  {
    id: 7,
    name: "Greek Chicken & Quinoa Bowl",
    cat: "low-carb",
    price: 12.4,
    protein: 38,
    carbs: 22,
    fat: 11,
    cal: 350,
    rating: 4.7,
    reviews: 155,
    badge: null,
    img: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&h=500&fit=crop&auto=format",
    desc: "Lemon oregano chicken over tri-colour quinoa with cucumber, olives, and sun-dried tomato.",
  },
  {
    id: 8,
    name: "Overnight Protein Oats & Berries",
    cat: "breakfast",
    price: 9.9,
    protein: 22,
    carbs: 48,
    fat: 8,
    cal: 360,
    rating: 4.6,
    reviews: 88,
    badge: null,
    img: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=600&h=500&fit=crop&auto=format",
    desc: "Cold-brew overnight oats with vanilla protein, blueberry compote, and toasted almonds.",
  },
  {
    id: 9,
    name: "Cajun Salmon & Sweet Potato Mash",
    cat: "high-carb",
    price: 13.9,
    protein: 40,
    carbs: 44,
    fat: 14,
    cal: 470,
    rating: 4.9,
    reviews: 267,
    badge: "Staff Pick",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=500&fit=crop&auto=format",
    desc: "Atlantic salmon fillet with cajun spice crust, over whipped sweet potato and wilted spinach.",
  },
]

export type MealReview = {
  author: string
  role: string
  rating: number
  text: string
  date: string
  verified: boolean
}

export const ALL_REVIEWS: Record<number, MealReview[]> = {
  101: [
    {
      author: "Ryan T.",
      role: "Personal Trainer",
      rating: 5,
      text: "My go-to every week. The teriyaki glaze is spot-on and the brown rice keeps me full through afternoon sessions. Consistently excellent.",
      date: "11 Sep 2026",
      verified: true,
    },
    {
      author: "Chloe L.",
      role: "Account Manager",
      rating: 5,
      text: "I order 10 of these a week for my meal prep. The macros are exactly as listed and the taste does not get old. Highly recommend.",
      date: "7 Sep 2026",
      verified: true,
    },
    {
      author: "Brendan K.",
      role: "Marathon Runner",
      rating: 4,
      text: "Solid high-protein option. Great post-run meal. Would love slightly more rice for longer training days but the quality is undeniable.",
      date: "3 Sep 2026",
      verified: true,
    },
    {
      author: "Mei R.",
      role: "Shift Nurse",
      rating: 5,
      text: "Three minutes in the microwave and I have a proper meal. Perfect for long hospital shifts. The teriyaki flavour is genuinely good.",
      date: "29 Aug 2026",
      verified: true,
    },
  ],
  102: [
    {
      author: "Jason O.",
      role: "CrossFit Athlete",
      rating: 5,
      text: "The spice level is real — exactly what was advertised. Gochujang marinade is deep and flavourful. Best Korean-style meal prep I have tried.",
      date: "9 Sep 2026",
      verified: true,
    },
    {
      author: "Siti K.",
      role: "Dietitian",
      rating: 5,
      text: "Impressive macros for a low-carb meal. The beef quality is clearly high. I recommend it to clients on lower-carb weeks regularly.",
      date: "5 Sep 2026",
      verified: true,
    },
    {
      author: "Mark C.",
      role: "Entrepreneur",
      rating: 4,
      text: "Great flavour and honest nutrition. Slightly too spicy for me but I keep coming back because nothing else in this range comes close.",
      date: "1 Sep 2026",
      verified: true,
    },
  ],
  103: [
    {
      author: "Priscilla H.",
      role: "Yoga Teacher",
      rating: 5,
      text: "Light, clean, and genuinely tasty. The roasted vegetables do not turn mushy after reheating — that is impressive for a frozen meal.",
      date: "8 Sep 2026",
      verified: true,
    },
    {
      author: "Nathan G.",
      role: "Physiotherapist",
      rating: 4,
      text: "Really solid low-carb option. The herb seasoning on the chicken is restrained but good. Wish the portion was slightly bigger.",
      date: "4 Sep 2026",
      verified: true,
    },
  ],
  104: [
    {
      author: "Amanda C.",
      role: "Swimmer",
      rating: 5,
      text: "The salmon is perfectly cooked even after freezing. The quinoa absorbs the lemon-tahini dressing beautifully. This is genuinely premium.",
      date: "10 Sep 2026",
      verified: true,
    },
    {
      author: "Wei T.",
      role: "Software Engineer",
      rating: 5,
      text: "44g protein in one frozen meal is remarkable. And it actually tastes like food, not cardboard. This is now my Monday staple.",
      date: "6 Sep 2026",
      verified: true,
    },
    {
      author: "Grace P.",
      role: "Doctor",
      rating: 5,
      text: "As someone who cares about ingredient quality, this stands out. Good fat profile from the salmon, clean carbs from the quinoa. Perfect.",
      date: "2 Sep 2026",
      verified: true,
    },
  ],
  105: [
    {
      author: "Daniel W.",
      role: "Graphic Designer",
      rating: 5,
      text: "The Thai basil flavour is authentic — not a watered-down version. Perfect for high-carb days. Fills me up without feeling heavy.",
      date: "7 Sep 2026",
      verified: true,
    },
    {
      author: "Linda F.",
      role: "Teacher",
      rating: 4,
      text: "Great everyday meal. Bold flavours and good carbs. I would love it a little spicier but that is personal preference. Will keep buying.",
      date: "3 Sep 2026",
      verified: true,
    },
  ],
  106: [
    {
      author: "Marcus D.",
      role: "Finance Director",
      rating: 5,
      text: "The miso glaze caramelises perfectly in the microwave. The soba is not overcooked. This is genuinely restaurant-quality. The premium price is completely justified.",
      date: "11 Sep 2026",
      verified: true,
    },
    {
      author: "Cheryl T.",
      role: "Surgeon",
      rating: 5,
      text: "I eat this after late clinic sessions. Premium salmon, great macros, three minutes. It is the best meal I can have at 10pm with zero effort.",
      date: "8 Sep 2026",
      verified: true,
    },
    {
      author: "Patrick N.",
      role: "Architect",
      rating: 5,
      text: "I was sceptical about frozen salmon but this has converted me completely. The texture is right and the miso is deeply flavourful. Five stars.",
      date: "4 Sep 2026",
      verified: true,
    },
  ],
  107: [
    {
      author: "Felicia A.",
      role: "Early Childhood Educator",
      rating: 5,
      text: "Finally a healthy frozen breakfast. The berries are not too sweet and the oats keep me full until lunch. Perfect weekday breakfast.",
      date: "9 Sep 2026",
      verified: true,
    },
    {
      author: "Tom S.",
      role: "Cyclist",
      rating: 4,
      text: "Good protein content for a breakfast meal. I eat it cold straight from the fridge and it is great. Warm is also good. Convenient and tasty.",
      date: "5 Sep 2026",
      verified: true,
    },
  ],
  108: [
    {
      author: "Sarah J.",
      role: "Marketing Lead",
      rating: 5,
      text: "The tzatziki is the key — fresh and properly garlicky. The wholemeal wrap holds together well after reheating. My lunchtime favourite.",
      date: "8 Sep 2026",
      verified: true,
    },
    {
      author: "Ravi M.",
      role: "Operations Manager",
      rating: 4,
      text: "Great lunchbox option. Leaner than my usual wrap and the flavours are clean. Would love slightly more chicken but overall very happy.",
      date: "4 Sep 2026",
      verified: true,
    },
  ],
  109: [
    {
      author: "Nicole T.",
      role: "Content Creator",
      rating: 5,
      text: "I make avocado toast every morning but this is honestly better. The egg white texture after reheating is surprisingly good. My new weekday go-to.",
      date: "10 Sep 2026",
      verified: true,
    },
    {
      author: "James P.",
      role: "Startup Founder",
      rating: 5,
      text: "Quick, clean, filling. This replaced my protein shake routine. I feel better and it actually tastes like something from a cafe.",
      date: "6 Sep 2026",
      verified: true,
    },
    {
      author: "Aditi K.",
      role: "Lawyer",
      rating: 4,
      text: "Solid breakfast. The avocado portion could be a little more generous but the overall quality and speed of prep makes this a staple for me.",
      date: "2 Sep 2026",
      verified: true,
    },
  ],
  110: [
    {
      author: "Faizal H.",
      role: "Personal Trainer",
      rating: 5,
      text: "Beef rendang done right. The spice base is proper — lemongrass, galangal, coconut — not a shortcut paste. Low carb without compromise.",
      date: "11 Sep 2026",
      verified: true,
    },
    {
      author: "Tricia L.",
      role: "Nutritionist",
      rating: 5,
      text: "Recommending this to every client who wants low-carb comfort food. The rendang is rich and satisfying. Cauliflower rice works perfectly.",
      date: "7 Sep 2026",
      verified: true,
    },
    {
      author: "Ryan B.",
      role: "IT Consultant",
      rating: 4,
      text: "The beef is tender and the flavour is authentic. I grew up eating rendang so my standard is high — this passes. Really impressed.",
      date: "3 Sep 2026",
      verified: true,
    },
  ],
  111: [
    {
      author: "Chris V.",
      role: "University Student",
      rating: 5,
      text: "Best value meal in the range. The chipotle chicken and black beans are bold and filling. Great for post-gym carb loading.",
      date: "9 Sep 2026",
      verified: true,
    },
    {
      author: "Jasmine R.",
      role: "Event Coordinator",
      rating: 4,
      text: "Really enjoyable and filling. The guacamole portion is small but the overall meal is good value. Will keep ordering on high-carb days.",
      date: "5 Sep 2026",
      verified: true,
    },
  ],
  112: [
    {
      author: "Emily W.",
      role: "Nurse",
      rating: 5,
      text: "This is my every-week order. The prawn quality is noticeably good and the fried rice has proper wok flavour — not flat like most meal preps.",
      date: "10 Sep 2026",
      verified: true,
    },
    {
      author: "Kevin S.",
      role: "Engineer",
      rating: 5,
      text: "26g protein in a fried rice is impressive. This is genuinely the best frozen fried rice I have had. It is a staple in my freezer now.",
      date: "7 Sep 2026",
      verified: true,
    },
    {
      author: "Michelle T.",
      role: "HR Manager",
      rating: 5,
      text: "Simple, familiar, and consistently delicious. The spring onion keeps the flavour fresh. I have ordered this every week for two months.",
      date: "3 Sep 2026",
      verified: true,
    },
    {
      author: "Darren F.",
      role: "Business Analyst",
      rating: 4,
      text: "Very satisfying and easy. The tiger prawns are the real highlight — larger than I expected for the price. Highly recommend as a weekly staple.",
      date: "29 Aug 2026",
      verified: true,
    },
  ],
}

export const PLANS = [
  {
    name: "Biweekly",
    cal: "Configured at ordering",
    billingLabel: "every 2 weeks",
    totalWeeks: null,
    desc: "Recurring Monday–Friday coverage with a two-week menu view.",
    accent: "#CDFF3A",
  },
  {
    name: "Monthly",
    cal: "Configured at ordering",
    billingLabel: "every month",
    totalWeeks: null,
    desc: "Recurring Monday–Friday coverage with a four-week menu view.",
    accent: "#F2C94C",
  },
  {
    name: "2 Months",
    cal: "Configured at ordering",
    billingLabel: "every 2 months",
    totalWeeks: null,
    desc: "Recurring Monday–Friday coverage on a two-month renewal rhythm.",
    accent: "#7EE8B0",
  },
  {
    name: "6 by 60",
    cal: "Configured at ordering",
    billingLabel: "fixed 60-day programme",
    totalWeeks: 9,
    desc: "Selectable 60-day programme with all-week coverage.",
    accent: "#E85D04",
  },
  {
    name: "6 by 60 Plus",
    cal: "Configured at ordering",
    billingLabel: "fixed 60-day programme",
    totalWeeks: 9,
    desc: "Selectable 60-day programme with all-week coverage and muscle support.",
    accent: "#A78BFA",
  },
]
