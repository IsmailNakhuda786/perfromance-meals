import { Document, Page, View, Text, StyleSheet, pdf, Image } from "@react-pdf/renderer";

/* ── Brand colours ── */
const C = {
  lime:      "#CDFF3A",
  gold:      "#F2C94C",
  mint:      "#7EE8B0",
  violet:    "#A78BFA",
  black:     "#111111",
  dark:      "#1A1A1A",
  forest:    "#0D2818",
  parchment: "#F7F5F0",
  border:    "#E5E2DA",
  gray:      "#888888",
  lightGray: "#CCCCCC",
  white:     "#FFFFFF",
  red:       "#EF4444",
  green:     "#16A34A",
  amber:     "#FFF3CD",
  amberText: "#7B5900",
};

/* ── Base styles ── */
const s = StyleSheet.create({
  page:         { backgroundColor: C.white, fontFamily: "Helvetica", paddingBottom: 36 },
  coverPage:    { backgroundColor: C.black, fontFamily: "Helvetica" },

  /* Header strip on each screen page */
  pageHeader:   { flexDirection: "row", alignItems: "center", backgroundColor: C.black, paddingHorizontal: 28, paddingVertical: 10, marginBottom: 0 },
  screenNum:    { backgroundColor: C.lime, color: C.black, fontSize: 8, fontFamily: "Helvetica-Bold", paddingHorizontal: 6, paddingVertical: 2, marginRight: 10, letterSpacing: 1 },
  screenTitle:  { color: C.white, fontSize: 13, fontFamily: "Helvetica-Bold", flex: 1 },
  screenSub:    { color: C.gray, fontSize: 7, letterSpacing: 0.5 },

  /* Footer */
  pageFooter:   { position: "absolute", bottom: 14, left: 28, right: 28, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  footerText:   { color: C.lightGray, fontSize: 7, fontFamily: "Helvetica", letterSpacing: 0.5 },
  footerLime:   { color: C.lime, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1 },

  /* Body area */
  body:         { paddingHorizontal: 28, paddingTop: 18 },
  row:          { flexDirection: "row", gap: 10 },
  col:          { flex: 1 },

  /* Wireframe primitives */
  section:      { marginBottom: 10 },
  sectionLabel: { fontSize: 6, fontFamily: "Helvetica-Bold", color: C.gray, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 },
  card:         { backgroundColor: C.white, border: "1 solid " + C.border, padding: 8, marginBottom: 6 },
  darkCard:     { backgroundColor: C.dark, padding: 8, marginBottom: 6 },
  forestCard:   { backgroundColor: C.forest, padding: 8, marginBottom: 6 },
  blackCard:    { backgroundColor: C.black, padding: 8, marginBottom: 6 },

  h1:           { fontSize: 18, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 4, lineHeight: 1.2 },
  h2:           { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 3 },
  h3:           { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 2 },
  h3w:          { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 2 },
  body1:        { fontSize: 8, color: "#444444", lineHeight: 1.4, marginBottom: 2 },
  body2:        { fontSize: 7, color: C.gray, lineHeight: 1.4, marginBottom: 1 },
  body1w:       { fontSize: 8, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 },
  body2w:       { fontSize: 7, color: "rgba(255,255,255,0.35)", lineHeight: 1.4 },
  mono:         { fontFamily: "Courier", fontSize: 6, color: C.gray, letterSpacing: 1, textTransform: "uppercase" },
  monoBold:     { fontFamily: "Courier-Bold", fontSize: 8, color: C.lime },
  price:        { fontFamily: "Courier-Bold", fontSize: 14, color: C.lime, marginBottom: 2 },
  priceSm:      { fontFamily: "Courier-Bold", fontSize: 9, color: C.lime },

  /* Buttons */
  btnLime:      { backgroundColor: C.lime, paddingHorizontal: 10, paddingVertical: 4, alignSelf: "flex-start" },
  btnBlack:     { backgroundColor: C.black, paddingHorizontal: 10, paddingVertical: 4, alignSelf: "flex-start" },
  btnOutline:   { border: "1 solid " + C.black, paddingHorizontal: 10, paddingVertical: 4, alignSelf: "flex-start" },
  btnText:      { fontSize: 7, fontFamily: "Helvetica-Bold", color: C.black, letterSpacing: 1 },
  btnTextW:     { fontSize: 7, fontFamily: "Helvetica-Bold", color: C.white, letterSpacing: 1 },

  /* Tags / badges */
  badge:        { backgroundColor: C.lime, paddingHorizontal: 5, paddingVertical: 1.5, alignSelf: "flex-start", marginBottom: 3 },
  badgeText:    { fontSize: 6, fontFamily: "Helvetica-Bold", color: C.black, letterSpacing: 0.8 },
  badgeGold:    { backgroundColor: C.gold, paddingHorizontal: 5, paddingVertical: 1.5, alignSelf: "flex-start" },
  badgeMint:    { backgroundColor: C.mint, paddingHorizontal: 5, paddingVertical: 1.5, alignSelf: "flex-start" },
  badgeRed:     { backgroundColor: C.red, paddingHorizontal: 5, paddingVertical: 1.5, alignSelf: "flex-start" },
  badgeDark:    { backgroundColor: "rgba(255,255,255,0.1)", paddingHorizontal: 5, paddingVertical: 1.5, alignSelf: "flex-start" },

  /* Nav bar */
  nav:          { backgroundColor: C.black, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 6, marginBottom: 0 },
  navLogo:      { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.white, marginRight: 20 },
  navLink:      { fontSize: 6, color: "rgba(255,255,255,0.35)", marginRight: 10, letterSpacing: 0.5 },
  navLinkActive:{ fontSize: 6, color: C.lime, marginRight: 10, letterSpacing: 0.5, fontFamily: "Helvetica-Bold" },
  navRight:     { marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: 6 },
  navWallet:    { fontSize: 6, color: "rgba(255,255,255,0.4)" },
  navAvatar:    { backgroundColor: C.lime, width: 16, height: 16, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  navAvatarTxt: { fontSize: 7, fontFamily: "Helvetica-Bold", color: C.black },
  navCart:      { backgroundColor: C.lime, paddingHorizontal: 6, paddingVertical: 2 },
  navCartTxt:   { fontSize: 6, fontFamily: "Helvetica-Bold", color: C.black },

  /* Divider */
  divider:      { height: 1, backgroundColor: C.border, marginVertical: 6 },
  dividerW:     { height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginVertical: 6 },

  /* Feature annotations */
  featureBox:   { backgroundColor: C.parchment, border: "1 solid " + C.border, padding: 10, marginBottom: 8 },
  featureTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 6, letterSpacing: 0.5 },
  featureRow:   { flexDirection: "row", alignItems: "flex-start", marginBottom: 4 },
  featureDot:   { width: 5, height: 5, borderRadius: 2.5, backgroundColor: C.lime, marginTop: 1.5, marginRight: 6, flexShrink: 0 },
  featureText:  { fontSize: 7, color: "#444444", flex: 1, lineHeight: 1.4 },

  /* Input */
  input:        { border: "1 solid " + C.border, padding: "5 8", marginBottom: 4, backgroundColor: C.white },
  inputText:    { fontSize: 7, color: C.lightGray },

  /* Progress bar */
  progressBg:   { height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: 6 },
  progressFill: { height: 4, backgroundColor: C.lime, borderRadius: 2 },

  /* Chips */
  chip:         { border: "1 solid rgba(255,255,255,0.15)", paddingHorizontal: 8, paddingVertical: 3, marginRight: 4 },
  chipActive:   { backgroundColor: C.lime, paddingHorizontal: 8, paddingVertical: 3, marginRight: 4 },
  chipText:     { fontSize: 6, color: "rgba(255,255,255,0.35)", letterSpacing: 0.8 },
  chipActiveText:{ fontSize: 6, color: C.black, letterSpacing: 0.8, fontFamily: "Helvetica-Bold" },
});

/* ── Shared nav ── */
const Nav = ({ active = "" }: { active?: string }) => (
  <View style={s.nav}>
    <Text style={s.navLogo}>PERF<Text style={{ color: C.lime }}>.</Text>MEALS</Text>
    {["READY SERIES", "MEAL PLANS", "BOX SUBSCRIPTION", "HOW IT WORKS"].map((l) => (
      <Text key={l} style={l === active ? s.navLinkActive : s.navLink}>{l}</Text>
    ))}
    <View style={s.navRight}>
      <Text style={s.navWallet}>🪙 $12 · 1,234pts</Text>
      <View style={s.navAvatar}><Text style={s.navAvatarTxt}>J</Text></View>
      <View style={s.navCart}><Text style={s.navCartTxt}>🛒 3</Text></View>
    </View>
  </View>
);

/* ── Page wrapper ── */
const ScreenPage = ({ n, title, sub, color = C.lime, children, features }: {
  n: string; title: string; sub: string; color?: string;
  children: React.ReactNode; features?: string[];
}) => (
  <Page size="A4" style={s.page}>
    <View style={s.pageHeader}>
      <Text style={[s.screenNum, { backgroundColor: color, color: color === C.lime ? C.black : C.black }]}>{n}</Text>
      <Text style={s.screenTitle}>{title}</Text>
      <Text style={s.screenSub}>{sub}</Text>
    </View>
    <View style={[s.row, { padding: "14 28 0 28", gap: 12 }]}>
      <View style={{ flex: 2 }}>{children}</View>
      {features && features.length > 0 && (
        <View style={{ width: 148 }}>
          <View style={s.featureBox}>
            <Text style={s.featureTitle}>KEY FEATURES</Text>
            {features.map((f, i) => (
              <View key={i} style={s.featureRow}>
                <View style={[s.featureDot, { backgroundColor: color }]} />
                <Text style={s.featureText}>{f}</Text>
              </View>
            ))}
          </View>
          <View style={[s.featureBox, { backgroundColor: C.black, border: 0 }]}>
            <Text style={[s.mono, { color: C.lime, marginBottom: 4 }]}>USER JOURNEY</Text>
            <Text style={[s.body2w, { lineHeight: 1.6 }]}>{sub}</Text>
          </View>
        </View>
      )}
    </View>
    <View style={s.pageFooter}>
      <Text style={s.footerText}>PERFORMANCEMEALS.COM.SG  ·  PROTOTYPE SCREEN DOCUMENTATION  ·  CONFIDENTIAL</Text>
      <Text style={s.footerLime}>SCREEN {n}</Text>
    </View>
  </Page>
);

/* ── Meal card ── */
const MealCard = ({ name, cat, price, img, catColor = "#CDFF3A" }: { name: string; cat: string; price: string; img?: string; catColor?: string }) => (
  <View style={{ flex: 1, backgroundColor: C.dark, overflow: "hidden" }}>
    {img ? (
      <View style={{ height: 50, overflow: "hidden", position: "relative" }}>
        <Image src={img} style={{ width: "100%", height: 50, objectFit: "cover" }} />
        <View style={{ position: "absolute", top: 3, left: 3, backgroundColor: catColor, paddingHorizontal: 4, paddingVertical: 1 }}>
          <Text style={{ fontSize: 5, fontFamily: "Helvetica-Bold", color: C.black }}>{cat}</Text>
        </View>
      </View>
    ) : (
      <View style={{ height: 50, backgroundColor: "#2A2A2A", alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: 30, height: 3, backgroundColor: C.lime, marginBottom: 2 }} />
        <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.2)" }}>{cat}</Text>
      </View>
    )}
    <View style={{ padding: 5 }}>
      <Text style={{ fontSize: 7, color: C.white, fontFamily: "Helvetica-Bold", marginBottom: 3, lineHeight: 1.3 }}>{name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 8, color: C.lime }}>{price}</Text>
        <View style={{ flexDirection: "row", gap: 2 }}>
          <View style={{ width: 12, height: 12, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 8, color: C.white }}>−</Text></View>
          <View style={{ width: 12, height: 12, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 8, color: C.white }}>+</Text></View>
        </View>
      </View>
    </View>
  </View>
);

/* ── Timeline item ── */
const TimelineItem = ({ label, detail, done, active }: { label: string; detail: string; done: boolean; active: boolean }) => (
  <View style={{ flexDirection: "row", gap: 8, marginBottom: 6 }}>
    <View style={{ alignItems: "center" }}>
      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: done ? C.lime : active ? C.black : C.border, border: done || active ? "0" : "1 solid " + C.lightGray, alignItems: "center", justifyContent: "center" }}>
        {done && <Text style={{ fontSize: 7, color: C.black, fontFamily: "Helvetica-Bold" }}>✓</Text>}
        {active && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: C.lime }} />}
      </View>
      <View style={{ width: 1, flex: 1, minHeight: 10, backgroundColor: done ? C.lime : C.border }} />
    </View>
    <View style={{ flex: 1, paddingBottom: 4 }}>
      <Text style={{ fontSize: 8, fontFamily: done || active ? "Helvetica-Bold" : "Helvetica", color: done || active ? C.black : C.lightGray }}>{label}</Text>
      <Text style={{ fontSize: 7, color: C.gray }}>{detail}</Text>
    </View>
  </View>
);

/* ═══════════════════════════════════════════════════
   THE PDF DOCUMENT
═══════════════════════════════════════════════════ */
export const FresherPDF = () => (
  <Document title="Performance Meals Prototype — Screen Documentation" author="PerformanceMeals.com.sg" creator="Figma Make">

    {/* ── COVER ── */}
    <Page size="A4" style={s.coverPage}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 60 }}>
        <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.lime, letterSpacing: 4, marginBottom: 32, textTransform: "uppercase" }}>Prototype · Screen Documentation · Confidential</Text>

        <Text style={{ fontSize: 40, fontFamily: "Helvetica-Bold", color: C.white, letterSpacing: 3, marginBottom: 4 }}>
          PERFORMANCE MEALS<Text style={{ color: C.lime }}>.</Text>
        </Text>
        <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginBottom: 60 }}>performancemeals.com.sg  ·  Singapore</Text>

        {/* Stats row */}
        <View style={{ flexDirection: "row", gap: 48, marginBottom: 60 }}>
          {[["14", "Screens"], ["3", "User Journeys"], ["7", "Page Types"]].map(([n, l]) => (
            <View key={l} style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 36, fontFamily: "Helvetica-Bold", color: C.lime }}>{n}</Text>
              <Text style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase" }}>{l}</Text>
            </View>
          ))}
        </View>

        {/* Colour palette */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          {[C.lime, C.gold, C.mint, "#555555", "#EEEEEE"].map((c) => (
            <View key={c} style={{ width: 40, height: 40, backgroundColor: c }} />
          ))}
        </View>
        <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.2)", letterSpacing: 2 }}>LIME · GOLD · MINT · MIDNIGHT · PARCHMENT</Text>

        <View style={{ marginTop: 60, borderTop: "1 solid rgba(255,255,255,0.08)", paddingTop: 20, width: "100%", alignItems: "center" }}>
          <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.2)", letterSpacing: 1.5 }}>PROTOTYPE BUILD  ·  FIGMA MAKE  ·  REACT + VITE + TAILWIND CSS V4</Text>
        </View>
      </View>
    </Page>

    {/* ── TABLE OF CONTENTS ── */}
    <Page size="A4" style={s.page}>
      <View style={[s.pageHeader, { backgroundColor: C.black }]}>
        <Text style={[s.screenNum, { backgroundColor: C.parchment }]}>TOC</Text>
        <Text style={s.screenTitle}>Screen Index</Text>
        <Text style={s.screenSub}>All 14 screens · 3 user journeys</Text>
      </View>
      <View style={{ padding: "28 40" }}>
        {/* Journey: Ready Series */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <View style={{ width: 4, height: 16, backgroundColor: C.lime, marginRight: 10 }} />
            <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold", color: C.black }}>READY SERIES</Text>
          </View>
          {[
            ["01", "Home Page", "Entry · Discovery · Hook building"],
            ["02", "Ready-to-Go — All Meals", "Browse · Filter by meal type · Free delivery signal"],
            ["03", "Ready-to-Go — Promotions", "Flash sales · Discounted products"],
            ["04", "Ready-to-Go — Useful Bundles", "Curated packs · Best value per meal"],
            ["05", "Product Detail Modal", "Macros · Ratings · Add to cart"],
            ["06", "Box Subscription", "Recurring delivery · 10% off · Weekly or fortnightly"],
          ].map(([n, title, sub]) => (
            <View key={n} style={{ flexDirection: "row", alignItems: "baseline", paddingVertical: 7, borderBottom: "1 solid " + C.border }}>
              <View style={{ backgroundColor: C.lime, paddingHorizontal: 6, paddingVertical: 2, marginRight: 12 }}>
                <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.black }}>{n}</Text>
              </View>
              <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", color: C.black, flex: 1 }}>{title}</Text>
              <Text style={{ fontSize: 7, color: C.gray }}>{sub}</Text>
            </View>
          ))}
        </View>

        {/* Journey: Meal Plans */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <View style={{ width: 4, height: 16, backgroundColor: C.gold, marginRight: 10 }} />
            <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold", color: C.black }}>MEAL PLANS & CHECKOUT</Text>
          </View>
          {[
            ["07", "Meal Plan Wizard (Steps 1–5)", "Goal → Meals → Menu → Delivery → Auth → Pay"],
            ["08", "Checkout — Auth Gate", "Create account · Sign in · Guest checkout"],
            ["09", "Checkout — Delivery & Payment", "Address · Date · Card · Promo code"],
            ["10", "Order Confirmation", "WhatsApp + Email · Live status · Points earned"],
          ].map(([n, title, sub]) => (
            <View key={n} style={{ flexDirection: "row", alignItems: "baseline", paddingVertical: 7, borderBottom: "1 solid " + C.border }}>
              <View style={{ backgroundColor: C.gold, paddingHorizontal: 6, paddingVertical: 2, marginRight: 12 }}>
                <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.black }}>{n}</Text>
              </View>
              <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", color: C.black, flex: 1 }}>{title}</Text>
              <Text style={{ fontSize: 7, color: C.gray }}>{sub}</Text>
            </View>
          ))}
        </View>

        {/* Journey: Account */}
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <View style={{ width: 4, height: 16, backgroundColor: C.mint, marginRight: 10 }} />
            <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold", color: C.black }}>ACCOUNT & REWARDS</Text>
          </View>
          {[
            ["11", "Account — Dashboard", "Active plan · Box sub · Renewal reminder · Wallet balance"],
            ["12", "Account — Subscription & Meal Swap", "Plan progress · Weeks remaining · Menu swap · Pause with dates"],
            ["13", "Account — Order History", "All orders · Promo savings · Reorder · Reviews"],
            ["14", "Account — Wallet & Rewards", "Points balance · Redeem · Transaction history"],
          ].map(([n, title, sub]) => (
            <View key={n} style={{ flexDirection: "row", alignItems: "baseline", paddingVertical: 7, borderBottom: "1 solid " + C.border }}>
              <View style={{ backgroundColor: C.mint, paddingHorizontal: 6, paddingVertical: 2, marginRight: 12 }}>
                <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.black }}>{n}</Text>
              </View>
              <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", color: C.black, flex: 1 }}>{title}</Text>
              <Text style={{ fontSize: 7, color: C.gray }}>{sub}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={s.pageFooter}>
        <Text style={s.footerText}>PERFORMANCEMEALS.COM.SG  ·  PROTOTYPE SCREEN DOCUMENTATION  ·  CONFIDENTIAL</Text>
        <Text style={s.footerLime}>INDEX</Text>
      </View>
    </Page>

    {/* ═══════ SCREEN 01 — HOME PAGE ═══════ */}
    <ScreenPage n="01" title="Home Page" sub="Entry · Discovery · Hook building" color={C.lime}
      features={[
        "Staggered hero entrance animation with scroll-reveal on all sections",
        "Hero: 'Nutrition that works.' — company brand headline, two CTAs (Browse Ready Series / Explore Meal Plans)",
        "4-stat animated counter bar: 8,400+ customers · 4.9/5 · 40+ meals · 5 yrs",
        "Who We Are section: brand origin story + interactive milestone timeline (2019/2021/2022/2024)",
        "What Makes Us Different: 4 expanding pillar cards (click to reveal full description)",
        "Testimonials: 3 customer quotes with star ratings",
        "Two Paths split-panel: hover-expand animation — Ready Series (dark/yellow) vs Meal Plan (white/orange)",
        "No Gift Cards, no Rewards on parent brand page",
      ]}>
      {/* Nav */}
      <Nav />
      {/* Hero */}
      <View style={{ backgroundColor: C.black, padding: "16 14" }}>
        <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.lime, letterSpacing: 2, marginBottom: 4 }}>PERFORMANCE MEALS · SINGAPORE</Text>
        <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: C.white, lineHeight: 1.15, marginBottom: 4 }}>Fuel your body.{"\n"}<Text style={{ color: C.lime }}>Hit your goals.</Text></Text>
        <Text style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>Macro-accurate meals delivered to your door. From $9.90/meal.</Text>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <View style={s.btnLime}><Text style={s.btnText}>SHOP READY MEALS →</Text></View>
          <View style={{ border: "1 solid rgba(255,255,255,0.2)", paddingHorizontal: 10, paddingVertical: 4 }}><Text style={[s.btnText, { color: "rgba(255,255,255,0.4)" }]}>FROM $9 · VIEW PLANS</Text></View>
          <View style={{ border: "1 solid rgba(255,255,255,0.2)", paddingHorizontal: 10, paddingVertical: 4 }}><Text style={[s.btnText, { color: "rgba(255,255,255,0.4)" }]}>BUILD-A-BOX · FROM $11</Text></View>
        </View>
      </View>
      {/* Trust bar */}
      <View style={{ backgroundColor: C.lime, flexDirection: "row", paddingHorizontal: 14, paddingVertical: 5, gap: 16 }}>
        {["✓ FREE DELIVERY OVER $80", "✓ MACRO-ACCURATE", "✓ 60-DAY MONEY-BACK", "✓ NO LOCK-IN"].map((t) => (
          <Text key={t} style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.black, letterSpacing: 0.8 }}>{t}</Text>
        ))}
      </View>
      {/* Plans */}
      <View style={{ backgroundColor: C.parchment, padding: "10 14" }}>
        <Text style={[s.mono, { marginBottom: 4 }]}>CHOOSE YOUR JOURNEY</Text>
        <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 8 }}>Ready Series · Meal Plans · Build-A-Box</Text>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {[{ name: "Ready-to-Go", from: "$9.90/meal", bar: C.lime, sub: "Single meals, any day" },
            { name: "Meal Plan", from: "$148/wk", bar: C.gold, sub: "CUT · MAINTAIN · BUILD" },
            { name: "Build-A-Box", from: "$11/meal", bar: C.mint, sub: "Mix & match 5–20 meals" }
          ].map((p) => (
            <View key={p.name} style={{ flex: 1, backgroundColor: C.white, border: "1 solid " + C.border, padding: 8 }}>
              <View style={{ height: 3, backgroundColor: p.bar, marginBottom: 5 }} />
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", marginBottom: 2 }}>{p.name}</Text>
              <Text style={{ fontSize: 7, color: C.gray, marginBottom: 4 }}>{p.sub}</Text>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 4 }}>From {p.from}</Text>
              <View style={s.btnBlack}><Text style={s.btnTextW}>SHOP NOW →</Text></View>
            </View>
          ))}
        </View>
      </View>
      {/* Trusted by + Created by */}
      <View style={{ flexDirection: "row", gap: 0 }}>
        <View style={{ flex: 1, backgroundColor: C.white, padding: "8 14" }}>
          <Text style={[s.mono, { marginBottom: 5 }]}>TRUSTED BY</Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {["Athletes", "Busy Professionals", "Families"].map((seg) => (
              <View key={seg} style={{ flex: 1, border: "1 solid " + C.border, padding: 6, alignItems: "center" }}>
                <Text style={{ fontSize: 14, marginBottom: 2 }}>🏋️</Text>
                <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", textAlign: "center" }}>{seg}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: C.forest, padding: "8 14", flexDirection: "row", gap: 8, alignItems: "center" }}>
          <View style={{ width: 32, height: 32, backgroundColor: "#1A3D24", borderRadius: 16, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18 }}>👨‍🍳</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[s.mono, { color: C.mint, marginBottom: 3 }]}>CREATED BY</Text>
            <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 1 }}>Chef Ahmad + Sports Nutrition Team</Text>
            <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>Ex-5-star hotel chef · 10 yrs sports nutrition · Certified dieticians</Text>
          </View>
        </View>
      </View>
      {/* Real results */}
      <View style={{ backgroundColor: C.parchment, padding: "8 14" }}>
        <Text style={[s.mono, { marginBottom: 5 }]}>REAL RESULTS</Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          {[["Marcus L.", "Lost 8kg in 60 days"], ["Priya S.", "+3kg muscle in 8wks"], ["David K.", "Dropped 12kg"]].map(([n, r]) => (
            <View key={n} style={{ flex: 1, backgroundColor: C.white, border: "1 solid " + C.border, padding: 6 }}>
              <Text style={{ fontSize: 9, color: C.gold, marginBottom: 2 }}>★★★★★</Text>
              <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", marginBottom: 1 }}>{r}</Text>
              <Text style={{ fontSize: 6, color: C.gray }}>{n}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* Promo popup note */}
      <View style={{ backgroundColor: C.lime, padding: "5 14", flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Text style={{ fontSize: 9 }}>🎉</Text>
        <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.black }}>PROMO POPUP fires on every home visit (1.8s delay) · "Get 10% off your first order — use code PMFIRST10"</Text>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 02 — READY-TO-GO ALL MEALS ═══════ */}
    <ScreenPage n="02" title="Ready-to-Go — All Meals" sub="Discovery · Purchase · Free delivery signal" color={C.lime}
      features={[
        "Category tabs: All Meals, Promotion, Useful Bundles, Low Carb, High Carb, Breakfast, Just Protein",
        "Meal type badges on every product card (colour-coded)",
        "Star rating + review count on each card",
        "Add/remove quantity controls on card",
        "Free delivery progress bar in cart drawer ($80 threshold)",
        "Meal savings nudge: 'Add 5 more — save $0.50/meal'",
        "Product Detail Modal on card click (see Screen 05)",
        "Cart count badge on nav icon",
      ]}>
      <Nav active="READY SERIES" />
      <View style={{ backgroundColor: C.black, padding: "10 14" }}>
        <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.lime, letterSpacing: 2, marginBottom: 2 }}>01 / READY SERIES</Text>
        <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 2 }}>Ready-to-Go Meals</Text>
        <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Macro-accurate. Frozen at peak nutrition. Heat in 3 minutes.</Text>
        {/* Category chips */}
        <View style={{ flexDirection: "row", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
          {["ALL MEALS", "🔥 PROMOTION", "📦 USEFUL BUNDLES", "LOW CARB", "HIGH CARB", "BREAKFAST", "JUST PROTEIN"].map((c, i) => (
            <View key={c} style={i === 0 ? s.chipActive : s.chip}>
              <Text style={i === 0 ? s.chipActiveText : s.chipText}>{c}</Text>
            </View>
          ))}
        </View>
        {/* Meal grid */}
        <View style={{ flexDirection: "row", gap: 6, marginBottom: 8 }}>
          <MealCard name="Herb Chicken Rice Bowl" cat="HIGH CARB" price="$12.40"
            img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&auto=format" catColor={C.gold} />
          <MealCard name="Korean BBQ Bowl" cat="LOW CARB" price="$13.20"
            img="https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop&auto=format" catColor={C.mint} />
          <MealCard name="Cajun Salmon Fillet" cat="JUST PROTEIN" price="$14.80"
            img="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=200&fit=crop&auto=format" catColor="#A78BFA" />
        </View>
        {/* Free delivery + savings nudge */}
        <View style={{ flexDirection: "row", gap: 6 }}>
          <View style={{ flex: 1, backgroundColor: "#111", border: "1 solid rgba(205,255,58,0.2)", padding: 7 }}>
            <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>CART DRAWER · Free Delivery Progress</Text>
            <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Add <Text style={{ color: C.lime, fontFamily: "Helvetica-Bold" }}>$23.50</Text> more for free delivery</Text>
            <View style={s.progressBg}><View style={[s.progressFill, { width: "70%" }]} /></View>
          </View>
          <View style={{ flex: 1, backgroundColor: C.forest, border: "1 solid rgba(205,255,58,0.2)", padding: 7 }}>
            <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>CART DRAWER · Savings Nudge</Text>
            <Text style={{ fontSize: 7, color: C.lime, fontFamily: "Helvetica-Bold" }}>Add 5 more meals — save $0.50/meal</Text>
            <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.35)" }}>Reach 10 meals for $11.90/meal pricing</Text>
          </View>
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 03 — PROMOTIONS ═══════ */}
    <ScreenPage n="03" title="Ready-to-Go — Promotions" sub="Discounted products · Flash sales · Promo codes" color={C.lime}
      features={[
        "Dedicated Promotion tab in category filter",
        "Each deal shows: original price, sale price, % saving badge",
        "Tag labels: Promo / Flash Sale / Bundle Deal",
        "Add to Cart directly from promotion card",
        "Countdowns can be added for flash sales",
        "Promotion content managed via data.ts PROMOTIONS array",
      ]}>
      <Nav active="READY SERIES" />
      <View style={{ backgroundColor: C.black, padding: "10 14" }}>
        <View style={{ flexDirection: "row", gap: 4, marginBottom: 10 }}>
          {["ALL MEALS", "🔥 PROMOTION", "📦 USEFUL BUNDLES"].map((c, i) => (
            <View key={c} style={i === 1 ? s.chipActive : s.chip}><Text style={i === 1 ? s.chipActiveText : s.chipText}>{c}</Text></View>
          ))}
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {[
            { name: "SG61 Deal — Herb Chicken ×3", tag: "PROMO", saving: "22% OFF", sale: "$28.90", orig: "$37.20", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop&auto=format" },
            { name: "Weekend Bundle — Mix of 4", tag: "FLASH SALE", saving: "24% OFF", sale: "$39.90", orig: "$52.60", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=200&fit=crop&auto=format" },
          ].map((p) => (
            <View key={p.name} style={{ flex: 1, backgroundColor: C.dark, border: "1 solid rgba(205,255,58,0.15)", overflow: "hidden" }}>
              <View style={{ height: 80, position: "relative" }}>
                <Image src={p.img} style={{ width: "100%", height: 80, objectFit: "cover" }} />
                <View style={{ position: "absolute", top: 5, left: 5, backgroundColor: C.lime, paddingHorizontal: 5, paddingVertical: 2 }}>
                  <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.black }}>{p.tag}</Text>
                </View>
                <View style={{ position: "absolute", top: 5, right: 5, backgroundColor: C.red, paddingHorizontal: 5, paddingVertical: 2 }}>
                  <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.white }}>{p.saving}</Text>
                </View>
              </View>
              <View style={{ padding: 8 }}>
                <Text style={{ fontSize: 8, color: C.white, fontFamily: "Helvetica-Bold", marginBottom: 4 }}>{p.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}>
                    <Text style={{ fontSize: 14, fontFamily: "Courier-Bold", color: C.lime }}>{p.sale}</Text>
                    <Text style={{ fontSize: 9, fontFamily: "Courier", color: "rgba(255,255,255,0.2)", textDecoration: "line-through" }}>{p.orig}</Text>
                  </View>
                  <View style={s.btnLime}><Text style={s.btnText}>ADD TO CART</Text></View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 04 — USEFUL BUNDLES ═══════ */}
    <ScreenPage n="04" title="Ready-to-Go — Useful Bundles" sub="Curated meal packs · Best value per meal" color={C.lime}
      features={[
        "Three curated bundles: Lean Starter (5 meals), Bulk Performance Box (10 meals), Breakfast Week (7 meals)",
        "Each shows: total price, per-meal price, and description",
        "Tag badges: Popular / Best Value / New",
        "Add to Cart — bundle goes into cart as one line item",
        "Managed via BUNDLES array in data.ts",
      ]}>
      <Nav active="READY SERIES" />
      <View style={{ backgroundColor: C.black, padding: "10 14" }}>
        <View style={{ flexDirection: "row", gap: 4, marginBottom: 10 }}>
          {["ALL MEALS", "🔥 PROMOTION", "📦 USEFUL BUNDLES"].map((c, i) => (
            <View key={c} style={i === 2 ? s.chipActive : s.chip}><Text style={i === 2 ? s.chipActiveText : s.chipText}>{c}</Text></View>
          ))}
        </View>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {[
            { name: "Lean Starter Pack (5 meals)", tag: "POPULAR", price: "$59.00", ppm: "$11.80/meal", desc: "Curated low-carb selection — perfect for first-timers.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=150&fit=crop&auto=format" },
            { name: "Bulk Performance Box (10 meals)", tag: "BEST VALUE", price: "$109.00", ppm: "$10.90/meal", desc: "Mix of high-protein picks, best value per meal.", img: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=150&fit=crop&auto=format" },
            { name: "Breakfast Week (7 meals)", tag: "NEW", price: "$65.00", ppm: "$9.28/meal", desc: "Protein oats + salmon scramble — 7 mornings sorted.", img: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=300&h=150&fit=crop&auto=format" },
          ].map((b) => (
            <View key={b.name} style={{ flex: 1, backgroundColor: C.dark, overflow: "hidden" }}>
              <Image src={b.img} style={{ width: "100%", height: 60, objectFit: "cover" }} />
              <View style={{ padding: 7 }}>
                <View style={s.badgeDark}><Text style={[s.badgeText, { color: C.white }]}>{b.tag}</Text></View>
                <Text style={{ fontSize: 8, color: C.white, fontFamily: "Helvetica-Bold", marginTop: 4, marginBottom: 2, lineHeight: 1.3 }}>{b.name}</Text>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.35)", marginBottom: 5, lineHeight: 1.4 }}>{b.desc}</Text>
                <Text style={{ fontSize: 13, fontFamily: "Courier-Bold", color: C.lime }}>{b.price}</Text>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>{b.ppm}</Text>
                <View style={{ backgroundColor: "rgba(255,255,255,0.08)", paddingHorizontal: 8, paddingVertical: 4, alignSelf: "flex-start" }}>
                  <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.white }}>ADD →</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 05 — PRODUCT DETAIL MODAL ═══════ */}
    <ScreenPage n="05" title="Product Detail Modal" sub="Meal info · Macros · Star rating · Add to cart" color={C.lime}
      features={[
        "Triggered by clicking any meal card (Ready-to-Go, Build-A-Box, Meal Plan Wizard)",
        "Full-width hero image with meal type badge",
        "Star rating + review count",
        "Description from chef",
        "4 macro tiles: kcal / protein / carbs / fat",
        "Price and Add to Cart / qty controls",
        "In-modal quantity adjustment for Meal Plan Wizard",
        "Backdrop click or X button to close",
      ]}>
      <View style={{ backgroundColor: "rgba(0,0,0,0.75)", padding: 16, alignItems: "center" }}>
        <View style={{ backgroundColor: C.dark, width: "85%", overflow: "hidden" }}>
          <View style={{ position: "relative" }}>
            <Image src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=250&fit=crop&auto=format"
              style={{ width: "100%", height: 100, objectFit: "cover" }} />
            <View style={{ position: "absolute", top: 6, left: 6, backgroundColor: C.gold, paddingHorizontal: 6, paddingVertical: 2 }}>
              <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.black }}>HIGH CARB</Text>
            </View>
            <View style={{ position: "absolute", top: 6, left: 6, backgroundColor: C.lime, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 52 }}>
              <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.black }}>BESTSELLER</Text>
            </View>
          </View>
          <View style={{ padding: 12 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.gray, letterSpacing: 1, marginBottom: 2 }}>HIGH CARB</Text>
                <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 2 }}>Herb Chicken Rice Bowl</Text>
                <Text style={{ fontSize: 9, color: C.gold, marginBottom: 3 }}>★★★★★ <Text style={{ fontSize: 7, color: C.gray }}>4.9 · 128 reviews</Text></Text>
                <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>Tender herb-marinated chicken thigh on jasmine rice with roasted vegetables. Chef Ahmad's signature dish.</Text>
              </View>
              <View style={{ width: 100 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
                  {[["450", "kcal"], ["38g", "protein"], ["52g", "carbs"], ["12g", "fat"]].map(([v, l]) => (
                    <View key={l} style={{ backgroundColor: "#222", padding: 5, alignItems: "center", width: 44 }}>
                      <Text style={{ fontSize: 10, fontFamily: "Courier-Bold", color: C.lime }}>{v}</Text>
                      <Text style={{ fontSize: 5, color: C.gray }}>{l}</Text>
                    </View>
                  ))}
                </View>
                <Text style={{ fontSize: 16, fontFamily: "Courier-Bold", color: C.lime, marginBottom: 5 }}>$12.40</Text>
                <View style={[s.btnLime, { width: "100%", alignItems: "center" }]}><Text style={s.btnText}>ADD TO CART</Text></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 06 — BUILD-A-BOX ═══════ */}
    <ScreenPage n="06" title="Box Subscription" sub="Recurring delivery · 10% off · Weekly or fortnightly" color={C.lime}
      features={[
        "Order type toggle: One-time vs Subscribe & Save 10% (defaults to Subscribe)",
        "Frequency picker when subscribing: Weekly or Fortnightly",
        "Box size selector: 5 / 10 / 15 / 20 meals with per-meal price (10% discount shown)",
        "10-meal Standard box highlighted as 'Most Popular'",
        "Subscriber discount line item in summary (−10%)",
        "Subscription badge in review step: frequency, first delivery date, 'Cancel anytime'",
        "Start Subscription CTA → recurring billing set up",
        "Box managed in Account → My Plan → Box Subscription card",
      ]}>
      <Nav active="BOX SUBSCRIPTION" />
      <View style={{ backgroundColor: C.black, padding: "10 14" }}>
        <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 2 }}>Box Subscription</Text>
        <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Pick your meals, set a cadence. 10% off every delivery. Cancel anytime.</Text>
        {/* Size selector */}
        <View style={{ flexDirection: "row", gap: 5, marginBottom: 10 }}>
          {[{ qty: "5 meals", label: "Starter", ppm: "$12.40/meal", pop: false },
            { qty: "10 meals", label: "Standard", ppm: "$11.90/meal", pop: true },
            { qty: "15 meals", label: "Pro", ppm: "$11.50/meal", pop: false },
            { qty: "20 meals", label: "Elite", ppm: "$11.00/meal", pop: false }
          ].map((b) => (
            <View key={b.qty} style={{ flex: 1, border: `2 solid ${b.pop ? C.lime : "rgba(255,255,255,0.15)"}`, padding: 6, alignItems: "center", backgroundColor: b.pop ? "rgba(205,255,58,0.05)" : "transparent" }}>
              {b.pop && <View style={[s.badge, { marginBottom: 2 }]}><Text style={s.badgeText}>MOST POPULAR</Text></View>}
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.white }}>{b.qty}</Text>
              <Text style={{ fontSize: 7, fontFamily: "Courier-Bold", color: C.lime }}>{b.ppm}</Text>
              <Text style={{ fontSize: 6, color: C.gray }}>{b.label}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>Progress · 7 of 10 meals selected</Text>
            <View style={s.progressBg}><View style={[s.progressFill, { width: "70%" }]} /></View>
            <View style={{ flexDirection: "row", gap: 5, marginTop: 4 }}>
              <MealCard name="Herb Chicken" cat="HIGH CARB" price="×2" img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=100&fit=crop&auto=format" catColor={C.gold} />
              <MealCard name="Korean BBQ Bowl" cat="LOW CARB" price="×2" img="https://images.unsplash.com/photo-1547592180-85f173990554?w=150&h=100&fit=crop&auto=format" catColor={C.mint} />
              <MealCard name="Cajun Salmon" cat="PROTEIN" price="×3" img="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=150&h=100&fit=crop&auto=format" catColor="#A78BFA" />
            </View>
          </View>
          <View style={{ width: 110, backgroundColor: "#111", border: "1 solid rgba(255,255,255,0.08)", padding: 10 }}>
            <Text style={[s.mono, { color: C.gray, marginBottom: 4 }]}>BOX SUMMARY</Text>
            <Text style={{ fontSize: 8, color: C.white, marginBottom: 1 }}>10 meals · Standard</Text>
            <Text style={{ fontSize: 7, color: C.gray, textDecoration: "line-through" }}>$119.00</Text>
            <Text style={{ fontSize: 18, fontFamily: "Courier-Bold", color: C.lime }}>{`$107.10`}</Text>
            <Text style={{ fontSize: 6, color: C.gray, marginBottom: 4 }}>$10.71/meal · Save $11.90</Text>
            <Text style={{ fontSize: 6, color: C.lime, marginBottom: 8 }}>↻ Weekly subscription</Text>
            <View style={[s.btnLime, { width: "100%", alignItems: "center" }]}><Text style={s.btnText}>START SUBSCRIPTION →</Text></View>
          </View>
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 07 — MEAL PLAN WIZARD ═══════ */}
    <ScreenPage n="07" title="Meal Plan Wizard — Steps 1–5" sub="Goal → Meals → Menu → Delivery → Auth → Pay" color={C.gold}
      features={[
        "Step 1: 1 or 2 meals per day (Lunch only / Lunch & Dinner)",
        "Step 2: Goal selection (CUT / MAINTAIN / BUILD) + Weekly or Monthly billing toggle with SAVE 15% badge",
        "Step 3: Menu selection with qty controls — repeat meals allowed, max N per plan",
        "Step 4: Delivery days, time slot, address",
        "Step 5: Auth gate (Create Account / Sign In / Guest) before payment",
        "Payment: card fields + promo code + auto-charge consent",
        "Order summary always visible with plan details",
        "Monthly billing savings shown prominently in gold",
      ]}>
      <View style={{ backgroundColor: C.parchment, padding: "10 14" }}>
        {/* Step indicator */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          {["MEALS", "GOAL", "MENU", "DELIVERY", "PAY"].map((step, i) => (
            <View key={step} style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <View style={{ alignItems: "center", flex: 1 }}>
                <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: i < 3 ? C.lime : i === 3 ? C.black : C.border, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: i < 3 ? C.black : i === 3 ? C.white : C.gray }}>{i < 3 ? "✓" : i + 1}</Text>
                </View>
                <Text style={{ fontSize: 6, color: i <= 3 ? C.black : C.gray, marginTop: 2, fontFamily: i === 3 ? "Helvetica-Bold" : "Helvetica" }}>{step}</Text>
              </View>
              {i < 4 && <View style={{ height: 1, width: 20, backgroundColor: i < 3 ? C.lime : C.border, marginBottom: 12 }} />}
            </View>
          ))}
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {/* Steps 1+2 */}
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: 8, marginBottom: 6 }}>
              <Text style={[s.mono, { marginBottom: 4 }]}>STEP 1 · MEALS PER DAY</Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                {["1 meal · Lunch only", "2 meals · Lunch & Dinner"].map((o, i) => (
                  <View key={o} style={{ flex: 1, border: `2 solid ${i === 1 ? C.black : C.border}`, padding: 6, backgroundColor: i === 1 ? C.black : C.white }}>
                    <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: i === 1 ? C.lime : C.black }}>{o}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: 8 }}>
              <Text style={[s.mono, { marginBottom: 4 }]}>STEP 2 · GOAL + BILLING</Text>
              <View style={{ flexDirection: "row", border: "2 solid " + C.black, marginBottom: 6 }}>
                <View style={{ flex: 1, padding: 5, alignItems: "center", backgroundColor: C.white }}>
                  <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.black }}>WEEKLY</Text>
                </View>
                <View style={{ flex: 1, padding: 5, alignItems: "center", backgroundColor: C.gold }}>
                  <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.black }}>MONTHLY · SAVE 15%</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 4 }}>
                {[{ name: "CUT", color: C.lime, price: "$148/wk" },
                  { name: "MAINTAIN", color: C.gold, price: "$178/wk" },
                  { name: "BUILD", color: C.mint, price: "$208/wk" }
                ].map((p) => (
                  <View key={p.name} style={{ flex: 1, border: `2 solid ${p.name === "MAINTAIN" ? C.black : C.border}`, padding: 6 }}>
                    <View style={{ height: 3, backgroundColor: p.color, marginBottom: 4 }} />
                    <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold" }}>{p.name}</Text>
                    <Text style={{ fontSize: 7, fontFamily: "Courier-Bold", color: C.lime }}>{p.price}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          {/* Steps 3+4 */}
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: 8, marginBottom: 6 }}>
              <Text style={[s.mono, { marginBottom: 3 }]}>STEP 3 · MENU SELECTION</Text>
              <View style={{ backgroundColor: C.black, padding: 6 }}>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Select 4 meals (can repeat) · 3 of 4 selected</Text>
                <View style={s.progressBg}><View style={[s.progressFill, { width: "75%" }]} /></View>
                <View style={{ flexDirection: "row", gap: 3, marginTop: 4 }}>
                  <MealCard name="Herb Chicken" cat="HIGH CARB" price="×2" img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=80&fit=crop&auto=format" catColor={C.gold} />
                  <MealCard name="Korean BBQ" cat="LOW CARB" price="×1" img="https://images.unsplash.com/photo-1547592180-85f173990554?w=100&h=80&fit=crop&auto=format" catColor={C.mint} />
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: 8 }}>
              <Text style={[s.mono, { marginBottom: 3 }]}>STEP 4 · DELIVERY</Text>
              <View style={{ flexDirection: "row", gap: 3, marginBottom: 5 }}>
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                  <View key={d} style={{ flex: 1, backgroundColor: ["MON", "WED", "FRI"].includes(d) ? C.black : C.parchment, padding: 3, alignItems: "center" }}>
                    <Text style={{ fontSize: 5, color: ["MON", "WED", "FRI"].includes(d) ? C.lime : C.gray, fontFamily: "Helvetica-Bold" }}>{d}</Text>
                  </View>
                ))}
              </View>
              <View style={s.input}><Text style={s.inputText}>Full name</Text></View>
              <View style={s.input}><Text style={s.inputText}>Street address</Text></View>
              <View style={s.input}><Text style={s.inputText}>Postal code</Text></View>
            </View>
          </View>
        </View>
        {/* Step 5 auth gate */}
        <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: 8, marginTop: 6 }}>
          <Text style={[s.mono, { marginBottom: 4 }]}>STEP 5 · AUTH GATE + PAYMENT</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={{ flex: 1 }}>
              <View style={{ backgroundColor: C.black, padding: 8, marginBottom: 5 }}>
                <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 1 }}>Almost there!</Text>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.4)" }}>Sign in or create an account to track your plan and earn rewards.</Text>
              </View>
              <View style={[s.btnLime, { width: "100%", alignItems: "center", marginBottom: 3 }]}><Text style={s.btnText}>CREATE ACCOUNT & SUBSCRIBE</Text></View>
              <View style={{ border: "2 solid " + C.black, padding: 5, marginBottom: 3, alignItems: "center" }}><Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold" }}>SIGN IN TO EXISTING ACCOUNT</Text></View>
              <View style={{ border: "1 solid " + C.border, padding: 5, alignItems: "center" }}><Text style={{ fontSize: 7, color: C.gray }}>Continue as Guest</Text></View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={s.input}><Text style={s.inputText}>Card number</Text></View>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <View style={[s.input, { flex: 1 }]}><Text style={s.inputText}>MM / YY</Text></View>
                <View style={[s.input, { flex: 1 }]}><Text style={s.inputText}>CVV</Text></View>
              </View>
              <View style={s.input}><Text style={s.inputText}>Promo code e.g. PMFIRST10</Text></View>
              <View style={{ backgroundColor: C.gold, paddingHorizontal: 10, paddingVertical: 5, width: "100%", alignItems: "center" }}>
                <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.black }}>SUBSCRIBE — $178/WK</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 08 — CHECKOUT AUTH GATE ═══════ */}
    <ScreenPage n="08" title="Checkout — Auth Gate" sub="New customer · Account creation · Guest warning" color={C.gold}
      features={[
        "Three options: Create Account / Sign In / Continue as Guest",
        "Create Account: name, email, phone, password + points incentive banner",
        "Sign In: email + password, disabled until filled",
        "Guest checkout: prominent amber warning listing missed benefits",
        "Post-signup: success screen with WhatsApp + email ✓ Sent confirmations",
        "Points earned shown as incentive to sign up",
        "Auth mode gates delivery/payment — they only appear after choice made",
      ]}>
      <View style={{ backgroundColor: C.white, padding: "12 14" }}>
        <Text style={{ fontSize: 18, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 2 }}>Almost there.</Text>
        <Text style={{ fontSize: 8, color: C.gray, marginBottom: 10 }}>Sign in to save your order history and earn rewards points — or continue as a guest.</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1.4 }}>
            {/* Options */}
            <View style={{ backgroundColor: C.black, padding: "8 10", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.white, letterSpacing: 1 }}>CREATE ACCOUNT</Text>
              <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.4)" }}>Earn points on this order →</Text>
            </View>
            <View style={{ border: "2 solid " + C.black, padding: "8 10", alignItems: "center", marginBottom: 4 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.black, letterSpacing: 1 }}>SIGN IN TO EXISTING ACCOUNT</Text>
            </View>
            <View style={{ border: "1 solid " + C.border, padding: "6 10", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ fontSize: 8, color: C.gray }}>Continue as Guest</Text>
            </View>
            <Text style={{ fontSize: 7, color: C.lightGray, textAlign: "center", marginBottom: 12 }}>Guest orders earn no reward points and won't appear in order history.</Text>
            {/* Sign up form */}
            <Text style={[s.mono, { marginBottom: 4 }]}>CREATE ACCOUNT FORM</Text>
            <View style={s.input}><Text style={s.inputText}>Full Name</Text></View>
            <View style={s.input}><Text style={s.inputText}>Email address</Text></View>
            <View style={s.input}><Text style={s.inputText}>Phone (WhatsApp updates)</Text></View>
            <View style={s.input}><Text style={s.inputText}>Password (min 8 characters)</Text></View>
            <View style={{ backgroundColor: "rgba(205,255,58,0.15)", border: "1 solid rgba(205,255,58,0.4)", padding: 6, marginBottom: 6 }}>
              <Text style={{ fontSize: 7, color: "#444" }}>🎁 You'll earn points on this order and unlock referral rewards after signup.</Text>
            </View>
            <View style={[s.btnBlack, { width: "100%", alignItems: "center" }]}><Text style={s.btnTextW}>CREATE ACCOUNT & CONTINUE →</Text></View>
          </View>
          <View style={{ flex: 1 }}>
            {/* Guest warning */}
            <Text style={[s.mono, { marginBottom: 4 }]}>GUEST CHECKOUT WARNING</Text>
            <View style={{ backgroundColor: "#FFF3CD", border: "1 solid " + C.gold, padding: 8, marginBottom: 10 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.amberText, marginBottom: 5 }}>⚠️ Checking out as guest — you'll miss out on:</Text>
              {["Performance Meals reward points (worth up to $12/month)", "Exclusive member discounts and early access deals", "Order history, easy reorders, delivery tracking", "Referral bonuses — earn $10 credit per friend"].map((i) => (
                <View key={i} style={{ flexDirection: "row", marginBottom: 3 }}>
                  <Text style={{ fontSize: 7, color: C.amberText, marginRight: 4 }}>•</Text>
                  <Text style={{ fontSize: 7, color: C.amberText, flex: 1 }}>{i}</Text>
                </View>
              ))}
              <Text style={{ fontSize: 7, color: C.amberText, fontFamily: "Helvetica-Bold", textDecoration: "underline", marginTop: 5 }}>Create a free account instead →</Text>
            </View>
            {/* Signup success */}
            <Text style={[s.mono, { marginBottom: 4 }]}>AFTER SIGNUP · SUCCESS SCREEN</Text>
            <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: 8 }}>
              <View style={{ width: 28, height: 28, backgroundColor: C.lime, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
                <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold" }}>✓</Text>
              </View>
              <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 2 }}>Account created!</Text>
              <Text style={{ fontSize: 7, color: C.gray, marginBottom: 6 }}>Welcome, Jerome. Confirmation sent via WhatsApp and email.</Text>
              <View style={{ backgroundColor: "rgba(7,94,84,0.08)", border: "1 solid rgba(7,94,84,0.15)", padding: 5, flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                <Text style={{ fontSize: 7 }}>💬 WhatsApp</Text>
                <Text style={{ fontSize: 7, color: "#25D366", fontFamily: "Helvetica-Bold" }}>✓ Sent</Text>
              </View>
              <View style={{ backgroundColor: "rgba(0,0,0,0.04)", border: "1 solid rgba(0,0,0,0.08)", padding: 5, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 7 }}>✉️ Email</Text>
                <View style={{ backgroundColor: C.lime, paddingHorizontal: 4, paddingVertical: 1 }}><Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold" }}>✓ Sent</Text></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 09 — CHECKOUT DELIVERY + PAYMENT ═══════ */}
    <ScreenPage n="09" title="Checkout — Delivery & Payment" sub="Address · Date · Card · Promo code · Place order" color={C.gold}
      features={[
        "Delivery form: name, phone, address, postal, delivery note",
        "Delivery date picker: next 6 available days",
        "Time slot: 4 options (6am–9am / 9am–12pm / 12pm–3pm / 3pm–6pm)",
        "Wallet credit toggle: apply $12.50 available",
        "Card fields: number, expiry, CVC",
        "PayNow option (Singapore instant bank transfer)",
        "Promo code field with Apply — validates against known codes, shows invalid/expired errors",
        "Order summary sidebar: subtotal, delivery, wallet credit, promo discount, total",
      ]}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1.4, backgroundColor: C.parchment, padding: "10 12" }}>
          <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 8 }}>Delivery</Text>
          <View style={{ flexDirection: "row", gap: 4, marginBottom: 4 }}>
            <View style={[s.input, { flex: 1 }]}><Text style={s.inputText}>Full name</Text></View>
            <View style={[s.input, { flex: 1 }]}><Text style={s.inputText}>Phone</Text></View>
          </View>
          <View style={s.input}><Text style={s.inputText}>Street address + unit</Text></View>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <View style={[s.input, { flex: 1 }]}><Text style={s.inputText}>Postal code</Text></View>
            <View style={[s.input, { flex: 1 }]}><Text style={s.inputText}>Delivery note (optional)</Text></View>
          </View>
          <Text style={[s.mono, { marginBottom: 4, marginTop: 2 }]}>DELIVERY DATE</Text>
          <View style={{ flexDirection: "row", gap: 3, marginBottom: 8 }}>
            {["Mon 4", "Tue 5", "Wed 6", "Thu 7", "Fri 8", "Sat 9"].map((d, i) => (
              <View key={d} style={{ flex: 1, border: `1 solid ${i === 0 ? C.black : C.border}`, backgroundColor: i === 0 ? C.black : C.white, padding: 4, alignItems: "center" }}>
                <Text style={{ fontSize: 5, color: i === 0 ? "rgba(255,255,255,0.4)" : C.lightGray }}>{d.split(" ")[0]}</Text>
                <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", color: i === 0 ? C.white : C.black }}>{d.split(" ")[1]}</Text>
              </View>
            ))}
          </View>
          <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 6 }}>Payment</Text>
          <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: "5 8", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <Text style={{ fontSize: 7, color: "#444" }}>Apply wallet credit</Text>
            <Text style={{ fontSize: 7, fontFamily: "Courier-Bold" }}>$12.50 available</Text>
          </View>
          <View style={s.input}><Text style={s.inputText}>Card number</Text></View>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <View style={[s.input, { flex: 1 }]}><Text style={s.inputText}>MM / YY</Text></View>
            <View style={[s.input, { flex: 1 }]}><Text style={s.inputText}>CVC</Text></View>
          </View>
          {/* Promo code */}
          <View style={{ flexDirection: "row", gap: 4, marginBottom: 4 }}>
            <View style={[s.input, { flex: 1, marginBottom: 0 }]}><Text style={s.inputText}>Promo code e.g. PMFIRST10</Text></View>
            <View style={[s.btnBlack, { paddingVertical: 5 }]}><Text style={s.btnTextW}>APPLY</Text></View>
          </View>
          <View style={{ backgroundColor: "#E8FFD0", border: "1 solid " + C.lime, padding: 5, marginBottom: 6 }}>
            <Text style={{ fontSize: 7, color: "#2d7a00", fontFamily: "Helvetica-Bold" }}>✓ Code PMFIRST10 applied — 10% off (–$5.80)</Text>
          </View>
          <View style={[s.btnBlack, { width: "100%", alignItems: "center", paddingVertical: 8 }]}>
            <Text style={[s.btnTextW, { fontSize: 9 }]}>PLACE ORDER — $39.70</Text>
          </View>
        </View>
        {/* Order summary */}
        <View style={{ width: 130, backgroundColor: C.white, borderLeft: "1 solid " + C.border, padding: 10 }}>
          <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 6 }}>Order Summary</Text>
          <View style={s.divider} />
          {[["Herb Chicken ×2", "$24.80"], ["Korean BBQ ×1", "$13.20"]].map(([n, p]) => (
            <View key={n} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <Text style={{ fontSize: 7, color: "#444", flex: 1 }}>{n}</Text>
              <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold" }}>{p}</Text>
            </View>
          ))}
          <View style={s.divider} />
          {[["Subtotal", "$58.00", false], ["Delivery", "Free", true], ["Wallet credit", "–$12.50", true], ["Promo (PMFIRST10)", "–$5.80", true]].map(([l, v, g]) => (
            <View key={String(l)} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
              <Text style={{ fontSize: 6, color: g ? C.green : C.gray }}>{l}</Text>
              <Text style={{ fontSize: 6, color: g ? C.green : C.black, fontFamily: "Helvetica-Bold" }}>{v}</Text>
            </View>
          ))}
          <View style={s.divider} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
            <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold" }}>Total</Text>
            <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold" }}>$39.70</Text>
          </View>
          <View style={s.divider} />
          <Text style={{ fontSize: 6, color: C.gray, marginTop: 4, lineHeight: 1.5 }}>🚚 Same-day delivery for orders before 12pm{"\n"}❄️ Meals arrive frozen and vacuum-sealed</Text>
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 10 — ORDER CONFIRMATION ═══════ */}
    <ScreenPage n="10" title="Order Confirmation" sub="WhatsApp + Email · Live status timeline · Points earned" color={C.gold}
      features={[
        "Confetti animation and lime checkmark circle",
        "Order details: address, subtotal, promo discount, payment method",
        "Live Order Status: 5-step timeline with active/done states",
        "WhatsApp confirmation card (dark green, ✓ Sent badge — no external link)",
        "Email confirmation card (dark, ✓ Sent badge)",
        "Points earned: +58 pts with new balance (logged-in customers)",
        "Guest variant: 'You left points on the table' nudge + Sign Up CTA",
        "Guest sign-up modal: full form → success screen → navigate to account",
      ]}>
      <View style={{ backgroundColor: C.parchment, padding: "12 14" }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <View style={{ width: 36, height: 36, backgroundColor: C.lime, borderRadius: 18, alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
                <Text style={{ fontSize: 18, fontFamily: "Helvetica-Bold" }}>✓</Text>
              </View>
              <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.gray, letterSpacing: 2, marginBottom: 2 }}>ORDER CONFIRMED</Text>
              <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 1 }}>Your order is confirmed!</Text>
              <Text style={{ fontSize: 8, color: C.gray }}>Jerome, your meals are being prepared.</Text>
            </View>
            {/* Order details */}
            <View style={s.card}>
              <Text style={[s.mono, { marginBottom: 5 }]}>ORDER DETAILS</Text>
              {[["Delivery Address", "123 Toa Payoh Lor 4, #08-22, S310123"],
                ["Subtotal", "$58.00"],
                ["Promo (PMFIRST10)", "–$5.80"],
                ["Payment", "Visa ending 4242 · $52.20"]
              ].map(([l, v]) => (
                <View key={String(l)} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                  <Text style={{ fontSize: 7, color: String(l).startsWith("Promo") ? C.green : C.gray }}>{l}</Text>
                  <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: String(l).startsWith("Promo") ? C.green : C.black }}>{v}</Text>
                </View>
              ))}
            </View>
            {/* Timeline */}
            <View style={s.card}>
              <Text style={[s.mono, { marginBottom: 6 }]}>LIVE ORDER STATUS</Text>
              <TimelineItem label="Order Confirmed" detail="Payment processed · #FRE-20250904-7842" done active={false} />
              <TimelineItem label="Kitchen Preparing" detail="Chefs are preparing your meals fresh to order" done={false} active />
              <TimelineItem label="Quality Check" detail="Macro verification and packaging seal check" done={false} active={false} />
              <TimelineItem label="Out for Delivery" detail="Driver assigned · ETA within selected time window" done={false} active={false} />
              <TimelineItem label="Delivered" detail="Meals at your door — enjoy your performance fuel!" done={false} active={false} />
            </View>
          </View>
          <View style={{ width: 160 }}>
            {/* WhatsApp */}
            <View style={{ backgroundColor: "#075E54", padding: 8, flexDirection: "row", gap: 6, alignItems: "center", marginBottom: 5 }}>
              <View style={{ width: 22, height: 22, backgroundColor: "#25D366", borderRadius: 11, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: C.white, fontSize: 10 }}>💬</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.white }}>Confirmation sent via WhatsApp</Text>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.5)" }}>+65 9123 4567 — reply anytime</Text>
              </View>
              <View style={{ backgroundColor: "#25D366", paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.white }}>✓ SENT</Text>
              </View>
            </View>
            {/* Email */}
            <View style={{ backgroundColor: C.black, padding: 8, flexDirection: "row", gap: 6, alignItems: "center", marginBottom: 5 }}>
              <Text style={{ fontSize: 14 }}>✉️</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.white }}>Confirmation sent to email</Text>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.35)" }}>jerome@email.com</Text>
              </View>
              <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.lime }}>✓ SENT</Text>
            </View>
            {/* Points earned (member) */}
            <View style={{ backgroundColor: C.black, padding: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <View>
                <Text style={[s.mono, { color: C.lime, marginBottom: 2 }]}>POINTS EARNED</Text>
                <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: C.lime }}>+58 pts</Text>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.3)" }}>Added to your balance</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", marginBottom: 1 }}>New balance</Text>
                <Text style={{ fontSize: 12, fontFamily: "Helvetica-Bold", color: C.white }}>1,234 pts</Text>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.3)" }}>= $12.34</Text>
              </View>
            </View>
            {/* Guest variant */}
            <Text style={[s.mono, { marginBottom: 3 }]}>GUEST VARIANT</Text>
            <View style={{ backgroundColor: C.black, padding: 8, marginBottom: 5 }}>
              <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: C.gold, letterSpacing: 1, marginBottom: 2 }}>YOU LEFT POINTS ON THE TABLE</Text>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 2 }}>This order would've earned <Text style={{ color: C.lime }}>+58 pts</Text></Text>
              <View style={[s.btnLime, { width: "100%", alignItems: "center" }]}><Text style={s.btnText}>SIGN UP — IT'S FREE →</Text></View>
            </View>
            {/* Go to account */}
            <View style={[s.btnBlack, { width: "100%", alignItems: "center", marginBottom: 3 }]}><Text style={s.btnTextW}>GO TO MY ACCOUNT →</Text></View>
            <View style={{ border: "1 solid " + C.border, padding: "5 10", alignItems: "center" }}><Text style={{ fontSize: 7, color: "#444" }}>Back to Home</Text></View>
          </View>
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 11 — ACCOUNT DASHBOARD ═══════ */}
    <ScreenPage n="11" title="Account — Dashboard" sub="Stats · Active plan · Renewal reminder · Referral" color={C.mint}
      features={[
        "Renewal reminder amber banner: 'Plan renews in 3 days'",
        "2-stat grid only: Active Plan + Wallet Balance (Orders This Month and Reward Points removed per Jerome)",
        "Active Meal Plan subscription card: plan name, billing cycle, Manage Plan / Pause buttons",
        "Quick shortcuts: Swap meals + Plan type",
        "Box Subscription status row: 10 meals · Weekly · Next delivery in 7 days · Manage →",
        "No Recent Orders section on dashboard (moved to Order History tab)",
      ]}>
      <View style={{ flexDirection: "row" }}>
        {/* Sidebar */}
        <View style={{ width: 110, backgroundColor: C.black, padding: 10 }}>
          <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 16, letterSpacing: 1 }}>JEROME T.</Text>
          {["Dashboard", "Subscription", "Order History", "Wallet & Rewards", "Settings"].map((t, i) => (
            <View key={t} style={{ padding: "5 8", backgroundColor: i === 0 ? C.lime : "transparent", marginBottom: 2 }}>
              <Text style={{ fontSize: 7, color: i === 0 ? C.black : "rgba(255,255,255,0.4)", fontFamily: i === 0 ? "Helvetica-Bold" : "Helvetica" }}>{t}</Text>
            </View>
          ))}
        </View>
        {/* Main */}
        <View style={{ flex: 1, backgroundColor: C.parchment, padding: 10 }}>
          {/* Renewal reminder */}
          <View style={{ backgroundColor: "#FFF3CD", border: "1 solid " + C.gold, padding: 7, flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Text style={{ fontSize: 12 }}>⚠️</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.amberText }}>Your plan renews in 3 days — Friday 7 Sep</Text>
              <Text style={{ fontSize: 6, color: C.amberText }}>$178.00 will be charged to Visa ending 4242. Review or pause below.</Text>
            </View>
            <View style={s.badgeGold}><Text style={s.badgeText}>REVIEW PLAN</Text></View>
          </View>
          {/* Stats — 2 only per Jerome feedback */}
          <View style={{ flexDirection: "row", gap: 5, marginBottom: 8 }}>
            {[{ l: "Active Plan", v: "MAINTAIN", c: C.gold, bg: C.black },
              { l: "Wallet Balance", v: "$12.50", c: C.lime, bg: C.black },
            ].map((s2) => (
              <View key={s2.l} style={{ flex: 1, backgroundColor: s2.bg, padding: 7 }}>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 2 }}>{s2.l.toUpperCase()}</Text>
                <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold", color: s2.c }}>{s2.v}</Text>
              </View>
            ))}
          </View>
          {/* Box sub status row */}
          <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: "7 10", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 12 }}>📦</Text>
              <View>
                <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.black }}>Box Subscription · 10 meals</Text>
                <Text style={{ fontSize: 6, color: C.gray }}>Weekly · Next delivery in 7 days</Text>
              </View>
            </View>
            <Text style={{ fontSize: 7, color: C.gray }}>Manage →</Text>
          </View>
          {/* Active plan card */}
          <View style={{ backgroundColor: C.black, padding: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <View>
              <Text style={[s.mono, { color: C.lime, marginBottom: 2 }]}>● ACTIVE SUBSCRIPTION</Text>
              <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold", color: C.white }}>MAINTAIN Plan</Text>
              <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.4)" }}>Weekly billing · Next charge Friday 19 Sep</Text>
              <Text style={{ fontSize: 13, fontFamily: "Courier-Bold", color: C.gold, marginTop: 2 }}>$178.00/week</Text>
            </View>
            <View style={{ gap: 4 }}>
              <View style={{ backgroundColor: C.lime, padding: "4 8" }}><Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.black }}>MANAGE PLAN →</Text></View>
              <View style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "4 8" }}><Text style={{ fontSize: 7, color: "rgba(255,255,255,0.4)" }}>PAUSE</Text></View>
            </View>
          </View>
          {/* Quick shortcuts */}
          <View style={{ flexDirection: "row", gap: 5, marginBottom: 0 }}>
            {[{ icon: "🔄", label: "Swap meals", desc: "Change upcoming meals" }, { icon: "⚖️", label: "Plan type", desc: "MAINTAIN · 2,200 kcal" }].map((item) => (
              <View key={item.label} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.05)", padding: 8 }}>
                <Text style={{ fontSize: 12, marginBottom: 3 }}>{item.icon}</Text>
                <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.black }}>{item.label}</Text>
                <Text style={{ fontSize: 6, color: C.gray, marginTop: 1 }}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 12 — ACCOUNT SUBSCRIPTION + SWAP ═══════ */}
    <ScreenPage n="12" title="Account — Subscription & Meal Swap" sub="Edit plan · Thursday cutoff · Week tabs · Swap meals" color={C.mint}
      features={[
        "Plan progress bar: 'Plan week 13 of 12' with yellow fill + weeks remaining counter (turns orange when ≤2 weeks left)",
        "Week tabs show absolute plan week number (W13, W14…) alongside This Week / Week 2 / Week 3 / Week 4",
        "Thursday 1pm cutoff warning banner (amber) on current week",
        "My Menu / Browse toggle — review selected meals or browse available menu",
        "Meal rows: image, name, macros, Lunch/Dinner badge, Swap button; Locked state on past-cutoff weeks",
        "Swap modal: browse full menu, select replacement meal",
        "Billing cycle: Weekly vs Monthly toggle with next billing date shown dynamically",
        "Pause: 1–4 weeks selector WITH date range shown (e.g. 15 Sep – 5 Oct)",
        "Box Subscription card: size picker, frequency toggle (weekly/fortnightly), Skip Next / Edit / Cancel",
        "Cancel subscription with retention flow and 2-step confirmation",
      ]}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 110, backgroundColor: C.black, padding: 10 }}>
          {["Dashboard", "Subscription", "Order History", "Wallet & Rewards", "Settings"].map((t, i) => (
            <View key={t} style={{ padding: "5 8", backgroundColor: i === 1 ? C.lime : "transparent", marginBottom: 2 }}>
              <Text style={{ fontSize: 7, color: i === 1 ? C.black : "rgba(255,255,255,0.4)", fontFamily: i === 1 ? "Helvetica-Bold" : "Helvetica" }}>{t}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1, backgroundColor: C.parchment, padding: 10 }}>
          {/* Plan progress */}
          <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: "8 10", marginBottom: 8 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
              <View>
                <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.black }}>Menu Review</Text>
                <Text style={{ fontSize: 6, color: C.gray }}>Swap cutoff: <Text style={{ fontFamily: "Helvetica-Bold" }}>Thursday 1pm</Text></Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 7, color: C.black }}>Plan week <Text style={{ fontFamily: "Helvetica-Bold" }}>13</Text> of 12</Text>
                <Text style={{ fontSize: 7, color: "#E85D04", fontFamily: "Helvetica-Bold" }}>1 week remaining</Text>
              </View>
            </View>
            <View style={{ height: 4, backgroundColor: C.border, marginBottom: 2 }}>
              <View style={{ height: 4, width: "95%", backgroundColor: C.gold }} />
            </View>
          </View>
          {/* Menu review panel */}
          <View style={{ backgroundColor: C.white, border: "1 solid " + C.border }}>
            <View style={{ padding: "7 10", borderBottom: "1 solid " + C.border, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold" }}>Menu Review</Text>
                <Text style={{ fontSize: 6, color: C.gray }}>Cutoff: <Text style={{ fontFamily: "Helvetica-Bold", color: C.black }}>Thursday 1pm</Text> each week.</Text>
              </View>
              <View style={{ flexDirection: "row", border: "1 solid " + C.border }}>
                {["Browse Menu", "Review"].map((m, i) => (
                  <View key={m} style={{ padding: "3 7", backgroundColor: i === 1 ? C.black : C.white }}>
                    <Text style={{ fontSize: 6, color: i === 1 ? C.white : C.gray, fontFamily: "Helvetica-Bold" }}>{m}</Text>
                  </View>
                ))}
              </View>
            </View>
            {/* Cutoff warning */}
            <View style={{ backgroundColor: "#FFFBEB", borderBottom: "1 solid #FDE68A", padding: "5 10", flexDirection: "row", gap: 5, alignItems: "center" }}>
              <Text style={{ fontSize: 8 }}>⚠️</Text>
              <Text style={{ fontSize: 7, color: "#92400E", flex: 1 }}>Cutoff for this week has passed (Thursday 1pm). Swap available for upcoming weeks.</Text>
            </View>
            {/* Week tabs */}
            <View style={{ flexDirection: "row", borderBottom: "1 solid " + C.border }}>
              {[["This Week", "30 Jun–4 Jul"], ["Week 2", "7–11 Jul"], ["Week 3", "14–18 Jul"], ["Week 4", "21–25 Jul"]].map(([w, d], i) => (
                <View key={w} style={{ flex: 1, padding: "5 7", borderBottom: `2 solid ${i === 1 ? C.gold : "transparent"}`, alignItems: "center" }}>
                  <Text style={{ fontSize: 7, fontFamily: i === 1 ? "Helvetica-Bold" : "Helvetica", color: i === 1 ? C.black : C.gray }}>{w}</Text>
                  <Text style={{ fontSize: 5, color: C.lightGray }}>{d}</Text>
                </View>
              ))}
            </View>
            {/* Meal rows */}
            {[["BBQ Chicken Bowl", "500 kcal", "Lunch", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=60&fit=crop"],
              ["Tuna Pasta", "510 kcal", "Dinner", "https://images.unsplash.com/photo-1547592180-85f173990554?w=80&h=60&fit=crop"]
            ].map(([name, cal, slot, img]) => (
              <View key={String(name)} style={{ flexDirection: "row", alignItems: "center", gap: 8, padding: "7 10", borderBottom: "1 solid " + C.border }}>
                <Image src={String(img)} style={{ width: 32, height: 32, objectFit: "cover" }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold" }}>{name}</Text>
                  <Text style={{ fontSize: 6, color: C.gray }}>{cal}</Text>
                </View>
                <View style={{ backgroundColor: slot === "Lunch" ? "#FFF3CD" : "#E8F4FD", paddingHorizontal: 6, paddingVertical: 2 }}>
                  <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: slot === "Lunch" ? "#B8860B" : "#1565C0" }}>{slot}</Text>
                </View>
                <View style={s.btnBlack}><Text style={s.btnTextW}>SWAP</Text></View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 13 — ORDER HISTORY ═══════ */}
    <ScreenPage n="13" title="Account — Order History" sub="All orders · Promo savings · Reorder · Reviews" color={C.mint}
      features={[
        "Promo Codes Used summary panel: total saved, per-code breakdown",
        "Each order card shows: type icon, items, order ID, date, total",
        "Promo badge on orders where a code was applied",
        "'Saved $X.XX' line beneath total on promo orders",
        "Reorder button on all past orders",
        "Review button (star rating) on delivered orders",
        "5-star modal with free-text review field",
      ]}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 110, backgroundColor: C.black, padding: 10 }}>
          {["Dashboard", "Subscription", "Order History", "Wallet & Rewards", "Settings"].map((t, i) => (
            <View key={t} style={{ padding: "5 8", backgroundColor: i === 2 ? C.lime : "transparent", marginBottom: 2 }}>
              <Text style={{ fontSize: 7, color: i === 2 ? C.black : "rgba(255,255,255,0.4)", fontFamily: i === 2 ? "Helvetica-Bold" : "Helvetica" }}>{t}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1, backgroundColor: C.parchment, padding: 10 }}>
          <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 8 }}>Order History</Text>
          {/* Promo savings panel */}
          <View style={{ backgroundColor: C.black, padding: 10, marginBottom: 8 }}>
            <Text style={[s.mono, { color: C.lime, marginBottom: 4 }]}>PROMO CODES USED</Text>
            <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 6 }}>Total saved: <Text style={{ color: C.lime }}>$21.93</Text></Text>
            {[{ code: "PMFIRST10", order: "FRE-20250901-7721", saved: "–$4.08" },
              { code: "WELCOME15", order: "FRE-20250818-7641", saved: "–$17.85" }
            ].map((p) => (
              <View key={p.code} style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "4 7", flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <View style={s.badge}><Text style={s.badgeText}>{p.code}</Text></View>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.4)", flex: 1 }}>{p.order}</Text>
                <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.mint }}>{p.saved}</Text>
              </View>
            ))}
          </View>
          {/* Order rows */}
          {[
            { icon: "❄️", items: "Herb Chicken ×2, Teriyaki ×1", id: "FRE-20250901-7721", date: "1 Sep 2025", total: "$36.70", saved: "saved $4.08", promo: "PMFIRST10" },
            { icon: "🥗", items: "Meal Plan — Maintain (Week 12)", id: "FRE-20250825-7698", date: "25 Aug 2025", total: "$178.00", saved: null, promo: null },
            { icon: "📦", items: "Build-A-Box ×10", id: "FRE-20250818-7641", date: "18 Aug 2025", total: "$101.15", saved: "saved $17.85", promo: "WELCOME15" },
          ].map((o) => (
            <View key={o.id} style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: 7, flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 4 }}>
              <View style={{ width: 24, height: 24, backgroundColor: C.black, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 12 }}>{o.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 1 }}>
                  <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold" }}>{o.items}</Text>
                  {o.promo && <View style={s.badge}><Text style={s.badgeText}>{o.promo}</Text></View>}
                </View>
                <Text style={{ fontSize: 6, color: C.gray }}>{o.id} · {o.date}</Text>
              </View>
              <View style={{ alignItems: "flex-end", marginRight: 6 }}>
                <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>{o.total}</Text>
                {o.saved && <Text style={{ fontSize: 6, color: C.green }}>{o.saved}</Text>}
                {!o.saved && <Text style={{ fontSize: 6, color: C.green }}>Delivered</Text>}
              </View>
              <View style={{ gap: 3 }}>
                <View style={s.btnOutline}><Text style={s.btnText}>REORDER</Text></View>
                <View style={{ backgroundColor: "#FFF3CD", border: "1 solid " + C.gold, paddingHorizontal: 6, paddingVertical: 3, alignSelf: "flex-start" }}>
                  <Text style={{ fontSize: 6, fontFamily: "Helvetica-Bold", color: "#a07800" }}>★ REVIEW</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScreenPage>

    {/* ═══════ SCREEN 14 — WALLET & REWARDS ═══════ */}
    <ScreenPage n="14" title="Account — Wallet & Rewards" sub="Points balance · Redeem · Transaction history · Referral" color={C.mint}
      features={[
        "3 stat tiles: Wallet Balance ($12.50), Reward Points (1,234), Lifetime Earned (4,891 pts)",
        "Fixed voucher tiers: 500 pts = $5 · 1,000 pts = $11 (+10% bonus) · 2,000 pts = $25 (+25% bonus)",
        "Points redemption slider: 50-pt increments, shows $-value equivalent",
        "Redeem button: applies credit to next order",
        "Transaction history: each earn/redeem row with date, description, points delta",
        "Earn rates: 1pt per $1 for Ready-to-Go, 2× for Meal Plans, 1× for Box Subscription",
        "Referral section: unique code (JEROME10), share link, $10 for both parties",
        "Track referral earnings: list of friends referred",
      ]}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 110, backgroundColor: C.black, padding: 10 }}>
          {["Dashboard", "Subscription", "Order History", "Wallet & Rewards", "Settings"].map((t, i) => (
            <View key={t} style={{ padding: "5 8", backgroundColor: i === 3 ? C.lime : "transparent", marginBottom: 2 }}>
              <Text style={{ fontSize: 7, color: i === 3 ? C.black : "rgba(255,255,255,0.4)", fontFamily: i === 3 ? "Helvetica-Bold" : "Helvetica" }}>{t}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1, backgroundColor: C.parchment, padding: 10 }}>
          <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 8 }}>Wallet & Rewards</Text>
          {/* Stats */}
          <View style={{ flexDirection: "row", gap: 5, marginBottom: 8 }}>
            {[{ l: "WALLET BALANCE", v: "$12.50", c: C.lime, bg: C.black },
              { l: "REWARD POINTS", v: "1,234", c: C.gold, bg: C.forest },
              { l: "LIFETIME EARNED", v: "4,891 pts", c: C.mint, bg: C.black }
            ].map((s2) => (
              <View key={s2.l} style={{ flex: 1, backgroundColor: s2.bg, padding: 10 }}>
                <Text style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 3 }}>{s2.l}</Text>
                <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", color: s2.c }}>{s2.v}</Text>
              </View>
            ))}
          </View>
          {/* Redeem */}
          <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: 10, marginBottom: 8 }}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", marginBottom: 2 }}>Redeem Your Points</Text>
            <Text style={{ fontSize: 7, color: C.gray, marginBottom: 6 }}>You have <Text style={{ fontFamily: "Helvetica-Bold", color: C.black }}>1,234 points</Text> = <Text style={{ fontFamily: "Helvetica-Bold", color: C.black }}>$12.34 value</Text></Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <View style={s.btnOutline}><Text style={s.btnText}>−</Text></View>
              <View style={{ flex: 1, border: "1 solid " + C.border, padding: "5 8", alignItems: "center" }}>
                <Text style={{ fontSize: 12, fontFamily: "Helvetica-Bold" }}>500 pts = $5.00</Text>
              </View>
              <View style={s.btnOutline}><Text style={s.btnText}>+</Text></View>
            </View>
            <View style={[s.btnBlack, { width: "100%", alignItems: "center", paddingVertical: 6 }]}>
              <Text style={s.btnTextW}>REDEEM 500 PTS → $5.00 CREDIT</Text>
            </View>
          </View>
          {/* History */}
          <View style={{ backgroundColor: C.white, border: "1 solid " + C.border, padding: 10, marginBottom: 8 }}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", marginBottom: 6 }}>Points History</Text>
            {[{ date: "1 Sep 2025", desc: "Purchase — #FRE-20250901-7721", pts: "+36", earn: true },
              { date: "25 Aug 2025", desc: "Meal Plan bonus (2× points)", pts: "+356", earn: true },
              { date: "20 Aug 2025", desc: "Redeemed 500 pts for $5.00 credit", pts: "–500", earn: false }
            ].map((h) => (
              <View key={h.desc} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4, borderBottom: "1 solid " + C.border }}>
                <View>
                  <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold" }}>{h.desc}</Text>
                  <Text style={{ fontSize: 6, color: C.gray }}>{h.date}</Text>
                </View>
                <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: h.earn ? C.green : C.red }}>{h.pts}</Text>
              </View>
            ))}
          </View>
          {/* Referral */}
          <View style={{ backgroundColor: C.forest, padding: 10 }}>
            <Text style={[s.mono, { color: C.mint, marginBottom: 3 }]}>REFER & EARN</Text>
            <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 2 }}>Give $10, Get $10</Text>
            <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.4)", marginBottom: 6, lineHeight: 1.4 }}>Share your unique code. When a friend orders, you both get $10 wallet credit.</Text>
            <View style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1 solid rgba(255,255,255,0.12)", padding: "6 10", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontFamily: "Courier-Bold", fontSize: 13, color: C.lime }}>JEROME10</Text>
              <View style={s.btnLime}><Text style={s.btnText}>COPY CODE</Text></View>
            </View>
          </View>
        </View>
      </View>
    </ScreenPage>

  </Document>
);

export async function downloadFresherPDF() {
  const blob = await pdf(<FresherPDF />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "PerformanceMeals-Screen-Documentation.pdf";
  a.click();
  URL.revokeObjectURL(url);
}
