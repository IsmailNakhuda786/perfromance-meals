export interface ReadySeriesMeal {
  id: number
  name: string
  listingCategory: "Low Carb" | "High Carb" | "Just Protein"
  detailCategory: "Low Carb" | "High Carb" | "High Protein" | "Breakfast"
  price: number
  protein: number
  carbs: number
  fat: number
  cal: number
  badge: string | null
  listingImage: string
  detailImage: string
  rating: number
  reviews: number
  description: string
}

export const READY_SERIES_MEALS: ReadySeriesMeal[] = [
  {
    id: 101,
    name: "Teriyaki Chicken & Brown Rice",
    listingCategory: "Just Protein",
    detailCategory: "High Protein",
    price: 12.9,
    protein: 42,
    carbs: 48,
    fat: 8,
    cal: 478,
    badge: "BESTSELLER",
    listingImage:
      "https://images.unsplash.com/photo-1762631383520-df106b252f6a?w=600&h=450&fit=crop&auto=format&q=85",
    detailImage:
      "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.9,
    reviews: 284,
    description:
      "Grilled teriyaki chicken glazed with our house-made sauce, served over nutty brown rice with edamame and pickled ginger. A crowd favourite built for high-protein days.",
  },
  {
    id: 102,
    name: "Spicy Korean Beef Bulgogi",
    listingCategory: "Low Carb",
    detailCategory: "Low Carb",
    price: 13.5,
    protein: 38,
    carbs: 12,
    fat: 14,
    cal: 326,
    badge: "HOT",
    listingImage:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1684815595429-cf46bff6294f?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.8,
    reviews: 201,
    description:
      "Grass-fed beef marinated in gochujang and sesame, served low-carb with shredded cabbage and crispy scallion. Genuinely spicy — as advertised.",
  },
  {
    id: 103,
    name: "Herb Chicken & Roasted Veg",
    listingCategory: "Low Carb",
    detailCategory: "Low Carb",
    price: 12.5,
    protein: 36,
    carbs: 14,
    fat: 10,
    cal: 290,
    badge: null,
    listingImage:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1636044992119-be0892f9de94?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.7,
    reviews: 156,
    description:
      "Free-range chicken breast seasoned in rosemary, thyme, and lemon zest. Paired with oven-roasted courgette, capsicum, and broccolini.",
  },
  {
    id: 104,
    name: "Salmon & Quinoa Power Bowl",
    listingCategory: "Just Protein",
    detailCategory: "High Protein",
    price: 15.9,
    protein: 44,
    carbs: 38,
    fat: 16,
    cal: 468,
    badge: "NEW",
    listingImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1596181367808-c7c64b779b46?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.9,
    reviews: 98,
    description:
      "Atlantic salmon fillet over protein-rich tricolour quinoa with spinach, cucumber, and a lemon-tahini dressing. Premium and nutritionally complete.",
  },
  {
    id: 105,
    name: "Thai Basil Pork Rice Bowl",
    listingCategory: "High Carb",
    detailCategory: "High Carb",
    price: 11.9,
    protein: 28,
    carbs: 62,
    fat: 8,
    cal: 436,
    badge: null,
    listingImage:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1579619002916-88cd4c81a70c?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.7,
    reviews: 174,
    description:
      "Wok-fried minced pork with Thai basil, oyster sauce, and bird's eye chilli over steamed jasmine rice. Fast, bold, and carb-fuelled.",
  },
  {
    id: 106,
    name: "Miso Glazed Salmon",
    listingCategory: "Just Protein",
    detailCategory: "High Protein",
    price: 16.9,
    protein: 46,
    carbs: 18,
    fat: 18,
    cal: 414,
    badge: "PREMIUM",
    listingImage:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1604259596863-57153177d40b?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.9,
    reviews: 142,
    description:
      "Premium Atlantic salmon fillet in a house-made white miso glaze, served with steamed bok choy and sesame soba. The flagship premium option.",
  },
  {
    id: 107,
    name: "Overnight Oats & Berry",
    listingCategory: "High Carb",
    detailCategory: "Breakfast",
    price: 8.9,
    protein: 18,
    carbs: 52,
    fat: 6,
    cal: 334,
    badge: null,
    listingImage:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1660744562389-57bf4544afe2?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.7,
    reviews: 119,
    description:
      "Rolled oats soaked overnight with chia seeds, protein powder, and oat milk. Topped with a mixed berry compote. Ready cold or warm.",
  },
  {
    id: 108,
    name: "Greek Chicken Wrap",
    listingCategory: "Just Protein",
    detailCategory: "High Protein",
    price: 12.9,
    protein: 34,
    carbs: 36,
    fat: 10,
    cal: 374,
    badge: null,
    listingImage:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1625539990527-914cf510191d?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.8,
    reviews: 87,
    description:
      "Grilled lemon-oregano chicken with tzatziki, tomato, red onion, and rocket in a wholemeal wrap. Light, fresh, and high protein.",
  },
  {
    id: 109,
    name: "Egg White & Avocado Toast",
    listingCategory: "High Carb",
    detailCategory: "Breakfast",
    price: 9.5,
    protein: 22,
    carbs: 34,
    fat: 12,
    cal: 332,
    badge: "POPULAR",
    listingImage:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=450&fit=crop&auto=format&q=85",
    detailImage:
      "https://images.unsplash.com/photo-1580683750935-cecfc7ea57f0?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.8,
    reviews: 203,
    description:
      "Thick-cut sourdough topped with smashed avocado, seasoned egg white omelette, and chilli flakes. Cafe quality at home — in under 3 minutes.",
  },
  {
    id: 110,
    name: "Beef Rendang & Cauliflower",
    listingCategory: "Low Carb",
    detailCategory: "Low Carb",
    price: 14.9,
    protein: 40,
    carbs: 10,
    fat: 22,
    cal: 398,
    badge: null,
    listingImage:
      "https://images.unsplash.com/photo-1661257711676-79a0fc533569?w=600&h=450&fit=crop&auto=format&q=85",
    detailImage:
      "https://images.unsplash.com/photo-1678269367737-eb7f31f720f8?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.8,
    reviews: 134,
    description:
      "Slow-braised beef in rich rendang spice paste — lemongrass, galangal, coconut. Served over cauliflower rice for a deeply satisfying low-carb meal.",
  },
  {
    id: 111,
    name: "Chicken Burrito Bowl",
    listingCategory: "High Carb",
    detailCategory: "High Carb",
    price: 12.5,
    protein: 30,
    carbs: 58,
    fat: 10,
    cal: 450,
    badge: null,
    listingImage:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1579619168313-d2e074a7ee02?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.7,
    reviews: 92,
    description:
      "Chipotle-marinated chicken over Mexican rice with black beans, corn salsa, guacamole, and sour cream. Big flavour, big carbs.",
  },
  {
    id: 112,
    name: "Prawn Fried Rice",
    listingCategory: "High Carb",
    detailCategory: "High Carb",
    price: 13.9,
    protein: 26,
    carbs: 60,
    fat: 8,
    cal: 428,
    badge: "BESTSELLER",
    listingImage:
      "https://images.unsplash.com/photo-1580683742795-49989f7ecb72?w=600&h=450&fit=crop&auto=format&q=85",
    detailImage:
      "https://images.unsplash.com/photo-1625560888331-00820499de21?w=900&h=675&fit=crop&auto=format&q=85",
    rating: 4.9,
    reviews: 267,
    description:
      "Wok-tossed jasmine rice with tiger prawns, egg, spring onion, and light soy. Clean, familiar, and genuinely satisfying — a week-day staple.",
  },
]
