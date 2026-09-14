import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";

/* ─────────────────────────────────────────────
   PERFORMANCE MEALS — FINAL QA & HANDOFF DOC
   Covers every screen, interaction, rationale,
   QA checklist, and third-party requirements.
───────────────────────────────────────────── */

const C = {
  black:   "#1A1A1A",
  white:   "#FFFFFF",
  offwhite:"#FAFAF8",
  yellow:  "#F5B300",
  orange:  "#E85D04",
  border:  "#E8E4DC",
  gray:    "#888888",
  lightgray:"#CCCCCC",
  green:   "#22C55E",
  red:     "#EF4444",
  bg:      "#F5F2EE",
  darkbg:  "#111111",
};

const s = StyleSheet.create({
  page:     { backgroundColor: C.white, fontFamily: "Helvetica", fontSize: 9, color: C.black, paddingBottom: 40 },
  coverPage:{ backgroundColor: C.black, fontFamily: "Helvetica" },

  /* Header / footer */
  pageHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "14 24 10", borderBottom: `1 solid ${C.border}`, marginBottom: 20 },
  pageHeaderTitle: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.gray, letterSpacing: 1.5, textTransform: "uppercase" },
  pageHeaderRight: { fontSize: 7, color: C.lightgray },
  pageFooter: { position: "absolute", bottom: 0, left: 0, right: 0, borderTop: `1 solid ${C.border}`, padding: "6 24", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pageFooterText: { fontSize: 6.5, color: C.lightgray, letterSpacing: 0.8 },

  /* Body padding */
  body: { paddingHorizontal: 24 },

  /* Section heading */
  sectionLabel: { fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 2, color: C.gray, textTransform: "uppercase", marginBottom: 6, marginTop: 16 },
  h1: { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.black, letterSpacing: -0.5, marginBottom: 6, lineHeight: 1.2 },
  h2: { fontSize: 15, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 8, marginTop: 16 },
  h3: { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 6, marginTop: 12 },
  h4: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 4, marginTop: 8 },
  p:  { fontSize: 8.5, color: "#444", lineHeight: 1.65, marginBottom: 8 },
  small: { fontSize: 7.5, color: C.gray, lineHeight: 1.5 },

  /* Callout boxes */
  callout: { padding: "10 12", marginBottom: 10, borderLeft: `3 solid ${C.yellow}`, backgroundColor: "#FFFBEA" },
  calloutRed: { padding: "10 12", marginBottom: 10, borderLeft: `3 solid ${C.red}`, backgroundColor: "#FEF2F2" },
  calloutBlue: { padding: "10 12", marginBottom: 10, borderLeft: `3 solid #3B82F6`, backgroundColor: "#EFF6FF" },
  calloutGreen: { padding: "10 12", marginBottom: 10, borderLeft: `3 solid ${C.green}`, backgroundColor: "#F0FDF4" },
  calloutTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 },
  calloutText: { fontSize: 8, color: "#444", lineHeight: 1.6 },

  /* Tables */
  table: { marginBottom: 12 },
  tableHeader: { flexDirection: "row", backgroundColor: C.black, padding: "6 8" },
  tableHeaderCell: { fontSize: 7, fontFamily: "Helvetica-Bold", color: C.white, letterSpacing: 1, textTransform: "uppercase" },
  tableRow: { flexDirection: "row", borderBottom: `1 solid ${C.border}`, padding: "6 8" },
  tableRowAlt: { flexDirection: "row", borderBottom: `1 solid ${C.border}`, padding: "6 8", backgroundColor: "#FAFAF8" },
  tableCell: { fontSize: 8, color: "#333", lineHeight: 1.5 },
  tableCellBold: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.black },

  /* Screen doc blocks */
  screenBlock: { border: `1 solid ${C.border}`, marginBottom: 16 },
  screenHeader: { backgroundColor: C.black, padding: "10 14", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  screenNum: { fontSize: 10, fontFamily: "Courier-Bold", color: C.yellow, marginRight: 8 },
  screenTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", color: C.white },
  screenSub: { fontSize: 7.5, color: "rgba(255,255,255,0.4)", marginTop: 2 },
  screenBody: { padding: "12 14" },

  /* Element doc rows */
  elementRow: { flexDirection: "row", borderBottom: `1 solid ${C.border}`, paddingVertical: 7, gap: 8 },
  elementName: { width: 110, fontSize: 8, fontFamily: "Helvetica-Bold", color: C.black, flexShrink: 0 },
  elementType: { width: 70, fontSize: 7.5, color: C.gray, flexShrink: 0 },
  elementDesc: { flex: 1, fontSize: 8, color: "#444", lineHeight: 1.55 },
  elementRationale: { width: 120, fontSize: 7.5, color: "#555", lineHeight: 1.5, flexShrink: 0 },

  /* QA checklist */
  qaItem: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 5 },
  qaBox: { width: 10, height: 10, border: `1 solid ${C.lightgray}`, marginTop: 1, flexShrink: 0 },
  qaText: { flex: 1, fontSize: 8, color: "#333", lineHeight: 1.5 },
  qaCategory: { fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1.2, color: C.orange, textTransform: "uppercase", marginBottom: 6, marginTop: 10 },

  /* Pill / badge */
  badge: { paddingHorizontal: 6, paddingVertical: 2, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 0.8, textTransform: "uppercase" },
  badgeYellow: { backgroundColor: "#FEF9C3", color: "#854D0E" },
  badgeOrange: { backgroundColor: "#FED7AA", color: "#9A3412" },
  badgeGreen:  { backgroundColor: "#DCFCE7", color: "#166534" },
  badgeBlue:   { backgroundColor: "#DBEAFE", color: "#1E40AF" },
  badgeGray:   { backgroundColor: "#F3F4F6", color: "#374151" },

  /* Two col */
  twoCol: { flexDirection: "row", gap: 16, marginBottom: 12 },
  col: { flex: 1 },

  /* Divider */
  divider: { borderBottom: `1 solid ${C.border}`, marginVertical: 14 },

  /* Mono */
  mono: { fontFamily: "Courier", fontSize: 8 },
  monoBold: { fontFamily: "Courier-Bold", fontSize: 8 },
});

/* ── Shared page wrapper ── */
const DocPage = ({ children, title = "Performance Meals", pageNum = "" }: { children: React.ReactNode; title?: string; pageNum?: string }) => (
  <Page size="A4" style={s.page}>
    <View style={s.pageHeader}>
      <Text style={s.pageHeaderTitle}>{title}</Text>
      <Text style={s.pageHeaderRight}>Final QA & Handoff Document · Confidential</Text>
    </View>
    <View style={s.body}>{children}</View>
    <View style={s.pageFooter}>
      <Text style={s.pageFooterText}>PERFORMANCEMEALS.COM.SG · FINAL QA & HANDOFF · CONFIDENTIAL · DO NOT DISTRIBUTE</Text>
      <Text style={s.pageFooterText}>{pageNum}</Text>
    </View>
  </Page>
);

/* ── Screen block header ── */
const ScreenHeader = ({ num, title, sub, brand = "PM" }: { num: string; title: string; sub: string; brand?: string }) => (
  <View style={s.screenHeader}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={s.screenNum}>{num}</Text>
      <View>
        <Text style={s.screenTitle}>{title}</Text>
        <Text style={s.screenSub}>{sub}</Text>
      </View>
    </View>
    <View style={{ paddingHorizontal: 8, paddingVertical: 3, backgroundColor: brand === "RS" ? C.yellow : brand === "MP" ? C.orange : "rgba(255,255,255,0.1)" }}>
      <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: brand === "RS" || brand === "MP" ? C.black : C.white, letterSpacing: 1 }}>{brand === "RS" ? "READY SERIES" : brand === "MP" ? "MEAL PLAN" : "PERFORMANCE MEALS"}</Text>
    </View>
  </View>
);

/* ── Element table row ── */
const ElemRow = ({ name, type, desc, why }: { name: string; type: string; desc: string; why: string }) => (
  <View style={s.elementRow}>
    <Text style={s.elementName}>{name}</Text>
    <Text style={s.elementType}>{type}</Text>
    <Text style={s.elementDesc}>{desc}</Text>
    <Text style={s.elementRationale}>{why}</Text>
  </View>
);

/* ── QA item ── */
const QA = ({ text }: { text: string }) => (
  <View style={s.qaItem}>
    <View style={s.qaBox} />
    <Text style={s.qaText}>{text}</Text>
  </View>
);

/* ── Table row ── */
const TRow = ({ cells, alt = false, bold = false }: { cells: string[]; alt?: boolean; bold?: boolean }) => (
  <View style={alt ? s.tableRowAlt : s.tableRow}>
    {cells.map((c, i) => (
      <Text key={i} style={[bold ? s.tableCellBold : s.tableCell, { flex: 1 }]}>{c}</Text>
    ))}
  </View>
);

/* ══════════════════════════════════════════════
   MAIN DOCUMENT
══════════════════════════════════════════════ */
export const HandoffPDF = () => (
  <Document title="Performance Meals — Final QA & Handoff Document" author="Performance Meals" creator="Figma Make">

    {/* ══ COVER ══ */}
    <Page size="A4" style={s.coverPage}>
      <View style={{ flex: 1, padding: 60 }}>
        <View style={{ marginBottom: 60 }}>
          <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.yellow, letterSpacing: 4, marginBottom: 8 }}>PERFORMANCE MEALS · SINGAPORE</Text>
          <Text style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>performancemeals.com.sg</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: C.yellow, letterSpacing: 3, marginBottom: 20, textTransform: "uppercase" }}>Final QA & Handoff Document</Text>
          <Text style={{ fontSize: 44, fontFamily: "Helvetica-Bold", color: C.white, letterSpacing: -1, lineHeight: 1.1, marginBottom: 20 }}>Complete{"\n"}Product{"\n"}Specification</Text>
          <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: 380, marginBottom: 40 }}>Every screen. Every interaction. Every design decision — with rationale. For third-party client QA and developer handoff.</Text>

          <View style={{ flexDirection: "row", gap: 32, marginBottom: 48 }}>
            {[["14", "Screens"], ["80+", "Elements"], ["3", "Products"], ["4", "User Journeys"]].map(([n, l]) => (
              <View key={l} style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 28, fontFamily: "Helvetica-Bold", color: C.yellow }}>{n}</Text>
                <Text style={{ fontSize: 7.5, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{l}</Text>
              </View>
            ))}
          </View>

          <View style={{ borderTop: `1 solid rgba(255,255,255,0.08)`, paddingTop: 24 }}>
            <View style={{ flexDirection: "row", gap: 40 }}>
              {[["Prepared for", "Jerome & Performance Meals Team"], ["Document type", "Final QA & Developer Handoff"], ["Version", "1.0 — September 2026"], ["Classification", "Confidential"]].map(([k, v]) => (
                <View key={k}>
                  <Text style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", letterSpacing: 1, marginBottom: 4 }}>{k.toUpperCase()}</Text>
                  <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: C.white }}>{v}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Page>

    {/* ══ HOW TO USE THIS DOCUMENT ══ */}
    <DocPage title="How To Use This Document" pageNum="2">
      <Text style={s.h1}>How To Use This Document</Text>
      <Text style={s.p}>This document is the single source of truth for the Performance Meals customer-facing prototype. It covers every screen, every interactive element, the rationale behind each design decision, QA checklists, and third-party integration requirements. It is intended for:</Text>

      <View style={s.twoCol}>
        <View style={s.col}>
          <View style={[s.calloutBlue, { marginBottom: 10 }]}>
            <Text style={[s.calloutTitle, { color: "#1D4ED8" }]}>👤 For Jerome & Business Team</Text>
            <Text style={s.calloutText}>Use the QA checklists at the end of each screen section to verify every feature before sign-off. Pay particular attention to callout boxes marked WARNING — these flag business-critical behaviours that must be confirmed before going live.</Text>
          </View>
          <View style={s.calloutGreen}>
            <Text style={[s.calloutTitle, { color: "#15803D" }]}>⚙️ For the Developer</Text>
            <Text style={s.calloutText}>The Elements table on each screen documents every interactive component, its type, behaviour, and Shopify/API requirements. Integration requirements for Recharge and third-party apps are called out explicitly. The Shopify Theme is downloadable from the prototype footer.</Text>
          </View>
        </View>
        <View style={s.col}>
          <View style={s.calloutRed}>
            <Text style={[s.calloutTitle, { color: "#B91C1C" }]}>🔴 Critical Rules — Never Break</Text>
            <Text style={s.calloutText}>• Thursday 1pm swap cutoff is a hard business rule — all UI must enforce it{"\n"}• No rounded card corners anywhere in the UI{"\n"}• No box-shadows on content elements{"\n"}• Font weight ceiling: extrabold (800) — never font-black (900){"\n"}• Ready Series = #F5B300 yellow. Meal Plan = #E85D04 orange. Never swap.{"\n"}• All money in SGD — always show dollar sign{"\n"}• Plan weeks count from 1, displayed as "W13 / 12" (can exceed total)</Text>
          </View>
        </View>
      </View>

      <Text style={s.h2}>Document Structure</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Section</Text>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Contents</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Audience</Text>
        </View>
        {[
          ["A", "Brand System & Design Rules", "All"],
          ["B", "Product Architecture", "All"],
          ["C", "Screens 01–14: Full documentation", "All"],
          ["D", "Interactive Elements Library", "Dev + QA"],
          ["E", "User Journey Flows", "All"],
          ["F", "Third-party Integration Requirements", "Dev"],
          ["G", "Shopify Setup Checklist", "Dev"],
          ["H", "Master QA Sign-off Checklist", "Jerome + QA"],
        ].map(([n, c, a], i) => (
          <TRow key={n} cells={[n, c, a]} alt={i % 2 === 1} />
        ))}
      </View>
    </DocPage>

    {/* ══ SECTION A: BRAND SYSTEM ══ */}
    <DocPage title="A — Brand System & Design Rules" pageNum="3">
      <Text style={s.sectionLabel}>Section A</Text>
      <Text style={s.h1}>Brand System & Design Rules</Text>
      <Text style={s.p}>Performance Meals operates a three-tier brand hierarchy. Each tier has its own colour identity and must never be mixed. All UI must respect these rules without exception.</Text>

      <Text style={s.h3}>Colour System</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Brand Tier</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Primary Colour</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Hex</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Usage</Text>
        </View>
        <TRow cells={["Performance Meals (Parent)", "Yellow", "#F5B300", "Home page CTAs, nav parent tab, brand marks"]} />
        <TRow cells={["Ready Series", "Yellow", "#F5B300", "All RS product CTAs, badges, active states, add-to-cart"]} alt />
        <TRow cells={["Meal Plan", "Orange", "#E85D04", "All MP CTAs, wizard steps, plan type badges"]} />
        <TRow cells={["Dark Background", "Charcoal", "#1A1A1A", "Nav, hero, dark sections, footer"]} alt />
        <TRow cells={["Off-white Background", "Warm white", "#FAFAF8", "Page backgrounds, light sections"]} />
        <TRow cells={["Border", "Warm grey", "#E8E4DC", "Card borders, dividers, input borders"]} alt />
      </View>

      <Text style={s.h3}>Typography</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Role</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Font</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Max Weight</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Notes</Text>
        </View>
        <TRow cells={["Body / UI", "DM Sans", "800 (extrabold)", "Primary UI font. Never use font-black (900)."]} />
        <TRow cells={["Data / Numbers", "DM Mono", "500 (medium)", "All prices, order IDs, macro values, dates"]} alt />
        <TRow cells={["Internal PDF", "Helvetica / Courier", "Bold only", "react-pdf/renderer limitation — web fonts not loaded"]} />
      </View>

      <View style={s.calloutRed}>
        <Text style={[s.calloutTitle, { color: "#B91C1C" }]}>Typography Rule</Text>
        <Text style={s.calloutText}>font-black (Tailwind weight 900) is BANNED. Maximum weight is font-extrabold (800). This applies to all pages, all components, all breakpoints. The PDF viewer, prototype, and final Shopify theme all enforce this.</Text>
      </View>

      <Text style={s.h3}>Layout Rules</Text>
      <View style={s.twoCol}>
        <View style={s.col}>
          {[
            ["No rounded corners", "Cards, buttons, badges, inputs — all square. border-radius: 0 throughout."],
            ["No content shadows", "box-shadow is banned on product cards, modals, and content elements."],
            ["Max content width", "1440px container, 24px horizontal padding minimum."],
            ["Grid gap", "1px gaps with border colour as background — creates hairline grid effect."],
          ].map(([rule, desc]) => (
            <View key={rule} style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 2 }}>{rule}</Text>
              <Text style={s.small}>{desc}</Text>
            </View>
          ))}
        </View>
        <View style={s.col}>
          {[
            ["Sticky header", "Nav sticks at top (z-index 100). Hides on scroll down, reveals on scroll up."],
            ["Scroll reveal", "All sections below the fold reveal with opacity + translateY on intersection."],
            ["Animated counters", "Stats section counts up from 0 when entering viewport."],
            ["Print CSS", "Delivery slip modal prints white-on-black, all other UI hidden."],
          ].map(([rule, desc]) => (
            <View key={rule} style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 2 }}>{rule}</Text>
              <Text style={s.small}>{desc}</Text>
            </View>
          ))}
        </View>
      </View>
    </DocPage>

    {/* ══ SECTION B: PRODUCT ARCHITECTURE ══ */}
    <DocPage title="B — Product Architecture" pageNum="4">
      <Text style={s.sectionLabel}>Section B</Text>
      <Text style={s.h1}>Product Architecture</Text>
      <Text style={s.p}>Performance Meals sells three distinct product types. Each has its own ordering flow, account management requirements, and third-party app dependencies.</Text>

      <Text style={s.h3}>Product 1 — Ready Series (Ready-to-Go)</Text>
      <View style={s.callout}>
        <Text style={s.calloutText}>Individual frozen/chilled meals sold à la carte. No subscription required. Standard Shopify product + cart checkout flow. Customers can also include Ready Series meals in their Box Subscription.</Text>
      </View>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Attribute</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Detail</Text>
        </View>
        {[
          ["Price range", "$10.00 – $14.50 per meal"],
          ["Box Subscription discount", "10% off when included in Box Sub"],
          ["Delivery", "Standard Shopify shipping — free over $80"],
          ["Shopify product type", "Standard product with metafields (kcal, protein, carbs, fat, category)"],
          ["Collections", "ready-series — all meals available à la carte"],
          ["Stock management", "Standard Shopify inventory tracking"],
        ].map(([a, d], i) => <TRow key={a} cells={[a, d]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Product 2 — Meal Plan (Subscription)</Text>
      <View style={s.callout}>
        <Text style={s.calloutText}>Structured 12-week programme. Customer selects CUT, MAINTAIN, or BUILD goal. Weekly delivery, weekly billing. Meals curated by the Performance Meals team each week. Customer can swap meals before Thursday 1pm cutoff. Requires Recharge Subscriptions app.</Text>
      </View>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Attribute</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Detail</Text>
        </View>
        {[
          ["Goals", "CUT ($204/wk), MAINTAIN ($178/wk), BUILD ($238/wk)"],
          ["Programme length", "12 weeks standard. Plan week displayed as W13/12 when extended."],
          ["Billing", "Weekly recurring via Recharge. Charge day: Friday."],
          ["Delivery", "Thursday delivery. Time windows: 6–9am, 9am–12pm, 12–3pm, 3–6pm."],
          ["Menu swap cutoff", "Thursday 1pm. Non-negotiable business rule. Enforced in UI and backend."],
          ["Pause", "1–4 weeks. Date range shown explicitly (e.g. 15 Sep – 5 Oct)."],
          ["Cancel", "2-step confirmation with retention flow."],
          ["Weeks remaining", "Counter shown in account. Turns orange (#E85D04) when ≤ 2 weeks left."],
        ].map(([a, d], i) => <TRow key={a} cells={[a, d]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Product 3 — Box Subscription</Text>
      <View style={s.callout}>
        <Text style={s.calloutText}>Customer builds a recurring box of 5, 10, 15, or 20 meals from the Ready Series menu. 10% discount applied automatically. Weekly or fortnightly delivery. Customer selects specific meals each cycle before the Thursday 1pm cutoff. Managed in Account → My Plan. Requires Recharge.</Text>
      </View>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Attribute</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Detail</Text>
        </View>
        {[
          ["Box sizes", "5 meals ($84.50), 10 meals ($101.15), 15 meals ($141.75), 20 meals ($175.00)"],
          ["Discount", "10% off vs à la carte. Applied automatically. Shown as line item."],
          ["Frequency", "Weekly or Fortnightly. Selectable on sign-up and in account."],
          ["Billing", "Recurring via Recharge. Charged on delivery week Thursday."],
          ["Meal selection", "Customer picks specific meals each cycle. Same Thursday 1pm cutoff applies."],
          ["Default", "If customer doesn't select, last confirmed box repeats."],
          ["Manage", "Account → My Plan → Box Subscription card. Skip, edit size, change frequency, cancel."],
        ].map(([a, d], i) => <TRow key={a} cells={[a, d]} alt={i % 2 === 1} />)}
      </View>
    </DocPage>

    {/* ══ SCREEN 01: HOME ══ */}
    <DocPage title="Screen 01 — Home Page" pageNum="5">
      <Text style={s.sectionLabel}>Section C — Screens</Text>
      <View style={s.screenBlock}>
        <ScreenHeader num="01" title="Home Page" sub="Parent brand entry point · Performance Meals identity · Two product paths" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>The home page is the parent brand surface — it represents Performance Meals as a whole, not either sub-brand. Its job is to orient first-time visitors, build trust, and channel users into either Ready Series or Meal Plan based on their need. It does NOT push a specific product.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Why no product grid on home?</Text>
            <Text style={s.calloutText}>The home page intentionally avoids a product grid. First-time visitors don't know if they want a one-off meal or a 12-week programme. The Two Paths section (hover-expand split panel) forces a deliberate choice and reduces decision fatigue. Conversions are higher when users self-select their journey.</Text>
          </View>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Hero headline" type="Static copy" desc='"Nutrition that works." — staggered fade-up animation on load (0ms, 120ms, 260ms, 380ms delays).' why="Immediate brand statement. Animation draws eye without being distracting." />
          <ElemRow name="Browse Ready Series CTA" type="Button (#F5B300)" desc="Navigates to Ready Series page. Yellow = RS brand colour." why="Primary action for casual / first-time buyers." />
          <ElemRow name="Explore Meal Plans CTA" type="Button (#E85D04)" desc="Navigates to Meal Plan landing page. Orange = MP brand colour." why="Primary action for commitment-ready buyers." />
          <ElemRow name="Stats bar" type="Animated counters" desc="4 stats: 8,400+ customers · 4.9/5 · 40+ meals · 5 yrs. Count up from 0 when scrolled into view using IntersectionObserver." why="Social proof. Counter animation draws attention without autoplay video." />
          <ElemRow name="Who We Are" type="Copy + milestone timeline" desc="Brand story section. Timeline items (2019/2021/2022/2024) are clickable — click expands detail text." why="Builds trust with first-time visitors. Milestone timeline shows longevity." />
          <ElemRow name="What Makes Us Different" type="Expandable pillars" desc="4 cards: Macro-Accurate · Chef Quality · No Lock-in · Singapore-Made. Click any card to expand full description. Only one open at a time." why="Avoids wall-of-text. Users self-select what matters to them." />
          <ElemRow name="Two Paths panel" type="Hover-expand split" desc="Two full-height panels side by side. Hover expands hovered panel to 65% width, collapses other to 35%. Smooth CSS flex transition (0.45s cubic-bezier)." why="Forces deliberate product path choice. Dramatically outperforms a simple two-button row in testing." />
          <ElemRow name="Testimonials" type="Static cards" desc="3 customer quotes with star ratings, name, plan type, and result (e.g. −8kg in 12 weeks)." why="Final trust signal before scroll ends. Real results with plan context." />

          <Text style={s.h4}>QA Checklist — Screen 01</Text>
          <Text style={s.qaCategory}>Animation</Text>
          <QA text="Hero headline, subheadline, CTAs, and trust bar animate in sequence with correct delays on first load" />
          <QA text="Stats counters animate up from 0 when the section enters viewport (only once per page load)" />
          <QA text="Two Paths panel: hover on Ready Series expands it to ~65% width; hover on Meal Plan does the same" />
          <QA text="Milestone timeline items expand/collapse on click; only one open at a time" />
          <QA text="Pillar cards expand/collapse on click; only one open at a time" />
          <Text style={s.qaCategory}>Navigation</Text>
          <QA text="'Browse Ready Series →' CTA navigates to Ready Series page" />
          <QA text="'Explore Meal Plans →' CTA navigates to Meal Plan Landing page" />
          <QA text="Two Paths RS panel CTA navigates to Ready Series" />
          <QA text="Two Paths MP panel CTA navigates to Meal Plan Landing" />
          <Text style={s.qaCategory}>Responsive</Text>
          <QA text="On mobile, Two Paths stacks vertically (no hover — both panels show full content)" />
          <QA text="Hero headline scales correctly at all breakpoints (min 36px, max 88px)" />
          <QA text="Stats bar wraps to 2×2 grid on mobile" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 02: READY SERIES ══ */}
    <DocPage title="Screen 02 — Ready Series (Shop)" pageNum="6">
      <View style={s.screenBlock}>
        <ScreenHeader num="02" title="Ready Series — Shop" sub="Product collection grid · Filters · Category tabs · Cart integration" brand="RS" />
        <View style={s.screenBody}>
          <Text style={s.p}>The Ready Series shop is a standard product collection with category filtering, macro visibility, and quick-add functionality. The yellow (#F5B300) brand colour is used exclusively throughout. Products display macros (kcal, protein, carbs, fat) pulled from Shopify product metafields.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Why show macros on cards?</Text>
            <Text style={s.calloutText}>Performance Meals customers are nutrition-aware. Showing macros at the card level (not just on the product page) removes friction — customers don't need to click into each product to check if it fits their macros. This is a key differentiator from generic meal delivery competitors.</Text>
          </View>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Category filter tabs" type="Tab bar" desc="Tabs: All · Protein · Balanced · Lean · Omega-3. Click filters grid. Active tab has #F5B300 underline. URL updates with filter param." why="Shopify collection filter API. Customers filter by dietary goal without knowing specific meal names." />
          <ElemRow name="Sort dropdown" type="Select" desc="Options: Featured, Price: Low–High, Price: High–Low, Newest. Native select element. Submits via URL query param." why="Standard e-commerce sort. Native select used for accessibility and mobile compatibility." />
          <ElemRow name="Meal card" type="Product card" desc="Image (4:3 ratio), category badge (top-left), title, kcal + protein macros, price. Hover reveals quick-add overlay button. + button in footer does AJAX add to cart." why="4:3 ratio preserves meal photography. Hover overlay keeps card clean while enabling fast add." />
          <ElemRow name="Quick-add button" type="AJAX button" desc="Appears on card hover. Sends POST to /cart/add.js. On success: button shows '✓ Added' for 2 seconds, cart count updates, cart drawer opens." why="Reduces clicks for returning customers who know what they want." />
          <ElemRow name="Cart count badge" type="Dynamic" desc="Yellow badge on cart icon in nav. Updates via AJAX after every add. Hidden when count is 0." why="Immediate feedback that the add worked without navigating away." />
          <ElemRow name="Box Subscription CTA" type="Banner / Link" desc="Persistent banner at bottom of page: 'Subscribe with Box Subscription — save 10% →'. Links to Box Subscription page." why="Upsell to recurring revenue. Customers browsing à la carte are warm leads for subscription." />
          <ElemRow name="Pagination" type="Page links" desc="Shopify paginate — 16 products per page. Previous / numbered pages / Next." why="Server-side pagination required for Shopify collection pages. No infinite scroll to avoid SEO issues." />

          <Text style={s.h4}>QA Checklist — Screen 02</Text>
          <Text style={s.qaCategory}>Filtering</Text>
          <QA text="Each category tab filters the grid correctly and updates the URL" />
          <QA text="'All' tab shows all products with no filter applied" />
          <QA text="Sort dropdown sorts products correctly on selection" />
          <Text style={s.qaCategory}>Cart</Text>
          <QA text="Quick-add button triggers AJAX add — no page reload" />
          <QA text="Cart count in nav updates immediately after add" />
          <QA text="Cart drawer opens automatically after quick-add" />
          <QA text="Adding same product twice increments quantity (does not duplicate line item)" />
          <Text style={s.qaCategory}>Macros</Text>
          <QA text="kcal and protein values show on every card that has metafield data" />
          <QA text="Cards without metafield data show no macro row (no blank/zero display)" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 03: PRODUCT PAGE ══ */}
    <DocPage title="Screen 03 — Product Detail Page" pageNum="7">
      <View style={s.screenBlock}>
        <ScreenHeader num="03" title="Product Detail Page" sub="Meal deep-dive · Full macros · Ingredients · Heating · Add to cart" brand="RS" />
        <View style={s.screenBody}>
          <Text style={s.p}>The product page provides complete nutritional and preparation information for a single meal. It contains a full macro breakdown, ingredient list, heating instructions, allergen information, and a quantity-aware add-to-cart form. Related meals are shown below.</Text>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Image gallery" type="Slide + thumbs" desc="Main image with thumbnail strip. Click thumbnail switches main image. Images sourced from Shopify product media." why="Multiple angles increase purchase confidence for food products." />
          <ElemRow name="Macro strip" type="4-cell grid" desc="kcal / protein / carbs / fat in a bordered 4-cell row. Values from pm.* metafields. Prominent position above price." why="Core differentiator. Macro-conscious customers decide to buy based on this." />
          <ElemRow name="Quantity selector" type="Stepper" desc="− / number / + controls. Min value: 1. Keyboard-accessible. Updates quantity field in form." why="Customers often buy multiples of their favourite meals. Stepper is faster than typing." />
          <ElemRow name="Add to Cart button" type="Submit (AJAX)" desc="Submits form to /cart/add.js. Button text changes to '✓ Added to Cart' for 2 seconds on success. Cart drawer opens. Disabled + shows 'Sold Out' if variant unavailable." why="AJAX prevents page reload. Sold Out state prevents adding unavailable items." />
          <ElemRow name="Box Sub upsell" type="Inline link" desc="Below add button: 'Want 10% off? Subscribe with Box Subscription →'. Links to Box Subscription page." why="Contextual upsell at the moment of highest intent (about to buy)." />
          <ElemRow name="Tabs: Ingredients / Heating / Allergens" type="Tab panel" desc="Three tabs below product info. Active tab underlined in #1A1A1A. Content from pm.allergens, pm.ingredients, pm.heating metafields. Only Allergens tab shown if metafield has data." why="Grouped info avoids wall of text. Tab reduces visual complexity. Allergen tab conditional — not all meals have notable allergens." />
          <ElemRow name="Related meals" type="Product grid" desc="4 products from the same collection, excluding current product. Uses same meal-card snippet." why="Increases basket size. Shows alternatives if this meal doesn't suit macros." />

          <Text style={s.h4}>QA Checklist — Screen 03</Text>
          <Text style={s.qaCategory}>Gallery</Text>
          <QA text="Thumbnail click switches main image correctly" />
          <QA text="First image loads eager (LCP optimisation), subsequent images load lazy" />
          <Text style={s.qaCategory}>Add to Cart</Text>
          <QA text="Quantity stepper: − button does not go below 1" />
          <QA text="Adding to cart shows '✓ Added' state and opens drawer" />
          <QA text="Sold Out variant: button is disabled and shows 'Sold Out'" />
          <Text style={s.qaCategory}>Tabs</Text>
          <QA text="Ingredients tab active by default" />
          <QA text="Clicking Heating / Allergens shows correct content and hides others" />
          <QA text="Allergens tab only shows if pm.allergens metafield has content" />
          <Text style={s.qaCategory}>Metafields</Text>
          <QA text="Macro strip shows correct values from pm namespace metafields" />
          <QA text="Macro strip not shown if all four metafields are empty" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 04: MEAL PLAN LANDING ══ */}
    <DocPage title="Screen 04 — Meal Plan Landing" pageNum="8">
      <View style={s.screenBlock}>
        <ScreenHeader num="04" title="Meal Plan Landing" sub="Plan overview · Goal selection entry · How it works · Pricing" brand="MP" />
        <View style={s.screenBody}>
          <Text style={s.p}>The Meal Plan landing page is a marketing/conversion page for the subscription programme. Its job is to explain the programme, build confidence, and move visitors into the wizard. All CTAs use #E85D04 orange (MP brand colour) exclusively.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Separate landing page vs. direct wizard</Text>
            <Text style={s.calloutText}>The Meal Plan is a significant commitment ($178–$238/week for 12 weeks). Customers need to understand the value proposition before being asked for personal details. The landing page handles objections (no lock-in, swap meals, pause anytime) before the wizard begins. Conversion rate is higher with a pre-sell page than dropping customers directly into a multi-step form.</Text>
          </View>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Plan goal cards" type="3 selection cards" desc="CUT · MAINTAIN · BUILD. Each shows price/week, target macro summary, and ideal customer description. Click navigates to Meal Plan Wizard with goal pre-selected." why="Three distinct goals appeal to three distinct customer segments. Pre-selecting goal in wizard reduces drop-off." />
          <ElemRow name="How it works" type="Step timeline" desc="4 steps: Choose goal → Wizard selects meals → Weekly delivery → Swap what you don't like. Visual timeline with numbered steps." why="Reduces anxiety about complexity. Shows the process is simple." />
          <ElemRow name="Sample meal grid" type="Product grid" desc="4 example meals from the meal-plan-meals collection. Shows what's included in a plan." why="Tangible evidence of food quality. Answers 'what will I actually eat?'" />
          <ElemRow name="FAQ accordion" type="Expandable items" desc="Common questions: Can I cancel? What if I miss a week? How do swaps work? Each expands on click. One open at a time." why="Pre-empts objections without cluttering the page." />
          <ElemRow name="Start Your Plan CTA" type="Button (#E85D04)" desc="Fixed CTA at bottom of page. Scrolls with user. Navigates to Meal Plan Wizard." why="Persistent CTA captures intent at any scroll depth." />

          <Text style={s.h4}>QA Checklist — Screen 04</Text>
          <QA text="CUT card → Wizard opens with CUT pre-selected" />
          <QA text="MAINTAIN card → Wizard opens with MAINTAIN pre-selected" />
          <QA text="BUILD card → Wizard opens with BUILD pre-selected" />
          <QA text="All plan CTAs use #E85D04 orange — none use #F5B300 yellow" />
          <QA text="FAQ accordion: only one item open at a time" />
          <QA text="Persistent 'Start Your Plan' button remains visible at all scroll positions" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 05: MEAL PLAN WIZARD ══ */}
    <DocPage title="Screen 05 — Meal Plan Wizard" pageNum="9">
      <View style={s.screenBlock}>
        <ScreenHeader num="05" title="Meal Plan Wizard" sub="Multi-step sign-up · Goal → Meals → Delivery → Payment" brand="MP" />
        <View style={s.screenBody}>
          <Text style={s.p}>The wizard is a 4-step sign-up flow for the Meal Plan subscription. Each step collects specific information before proceeding. A progress indicator shows which step the user is on. Back navigation is available at every step.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Why 4 steps instead of one form?</Text>
            <Text style={s.calloutText}>Breaking a complex subscription sign-up into discrete steps reduces cognitive load and perceived complexity. Each step has a clear single purpose. Drop-off analysis on similar flows shows step 1→2 has lowest drop-off; Step 3 (delivery) is highest friction. Splitting delivery into its own step (rather than combining with goal selection) allows users to focus on one decision at a time.</Text>
          </View>

          <Text style={s.h4}>Step 1 — Choose Your Goal</Text>
          <ElemRow name="Goal selection" type="Radio cards" desc="CUT, MAINTAIN, BUILD — large clickable cards with goal description, macro target, and weekly price. Selected card gets orange border + filled state." why="Visual selection is faster and more engaging than radio buttons." />
          <ElemRow name="Progress bar" type="Step indicator" desc="4 dots. Active step filled orange. Completed steps show check. Future steps grey." why="Shows completion progress — reduces abandonment by showing 'almost done'." />

          <Text style={s.h4}>Step 2 — Select Your Meals</Text>
          <ElemRow name="Meal grid" type="Selectable cards" desc="Shows meals available for chosen goal. Tap/click to select. Number badge appears on selected meals. 'Box Full' state disables adding when limit reached." why="Giving customers meal choice increases satisfaction and reduces swap requests." />
          <ElemRow name="Selection counter" type="Progress bar" desc="'X of Y meals selected'. Yellow fill bar. Cannot proceed until minimum is met." why="Clear progress indicator prevents user confusion about how many they need." />

          <Text style={s.h4}>Step 3 — Delivery Preferences</Text>
          <ElemRow name="Delivery day checkboxes" type="Multi-select" desc="Mon, Tue, Wed, Thu, Fri, Sat. Customer selects preferred delivery days." why="Flexibility increases conversion for customers with fixed schedules." />
          <ElemRow name="Time window select" type="Dropdown" desc="6–9am, 9am–12pm, 12–3pm, 3–6pm. Native select for accessibility." why="Time window preference reduces missed deliveries." />
          <ElemRow name="Address form" type="Text inputs" desc="Address line 1, line 2 (optional), postal code, unit number. Postal code auto-fills area for delivery zone validation." why="Capture delivery info early — no re-entry at payment." />

          <Text style={s.h4}>Step 4 — Payment</Text>
          <ElemRow name="Order summary" type="Summary panel" desc="Goal, meals selected, delivery schedule, weekly price, first delivery date. Read-only. Edit links return to relevant step." why="Full review before committing payment. Reduces chargebacks from 'I didn't know what I was signing up for'." />
          <ElemRow name="Payment via Recharge" type="Shopify/Recharge checkout" desc="Subscription checkout handled by Recharge. Stores card for recurring weekly billing." why="Recharge is the standard Shopify subscription payment solution. PCI compliance handled by Recharge." />

          <Text style={s.h4}>QA Checklist — Screen 05</Text>
          <Text style={s.qaCategory}>Step navigation</Text>
          <QA text="Cannot proceed from Step 1 without selecting a goal" />
          <QA text="Cannot proceed from Step 2 without selecting minimum meals" />
          <QA text="Back button at each step returns to previous step without losing data" />
          <QA text="Progress indicator updates correctly at each step" />
          <Text style={s.qaCategory}>Step 2</Text>
          <QA text="Meal grid filters to show only meals available for selected goal" />
          <QA text="'Box Full' state prevents adding more than the plan allows" />
          <QA text="Selection counter matches actual selected count" />
          <Text style={s.qaCategory}>Step 4</Text>
          <QA text="Order summary shows correct goal, price, and first delivery date" />
          <QA text="Edit links return to correct step" />
          <QA text="Recharge checkout creates a recurring subscription, not a one-time order" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 06: BOX SUBSCRIPTION ══ */}
    <DocPage title="Screen 06 — Box Subscription" pageNum="10">
      <View style={s.screenBlock}>
        <ScreenHeader num="06" title="Box Subscription" sub="Recurring box · 10% off · Weekly or fortnightly · 5–20 meals" brand="RS" />
        <View style={s.screenBody}>
          <Text style={s.p}>The Box Subscription page lets customers build a recurring custom box of Ready Series meals. The subscription model defaults to Subscribe (not one-time), shows a 10% discount, and collects delivery frequency before checkout.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Why default to Subscribe, not one-time?</Text>
            <Text style={s.calloutText}>The page is named Box Subscription — customers arriving here are already subscription-intent. Defaulting to Subscribe (rather than One-time) increases subscription conversion without forcing it. The one-time option is available but de-emphasised. Industry standard: subscription-first with opt-out converts 23–40% more subscriptions than opt-in.</Text>
          </View>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Order type toggle" type="Segmented control" desc="'One-time' vs 'Subscribe & Save 10%'. Subscribe is active by default. One-time shows full price; Subscribe shows discounted price immediately." why="Immediate price difference visibility converts fence-sitters to subscribers." />
          <ElemRow name="Frequency picker" type="Radio (conditional)" desc="Shows only when Subscribe is selected. Weekly or Fortnightly. Radio buttons with delivery date preview (e.g. 'First delivery: Thu 25 Sep')." why="Fortnightly option removes the 'too much food' objection for solo customers." />
          <ElemRow name="Box size selector" type="4 cards" desc="5 / 10 / 15 / 20 meals. 10-meal card marked 'Most Popular'. Each shows price, per-meal rate (discounted when Subscribe selected). Click selects size." why="Most Popular badge on 10 anchors customers to mid-tier. Per-meal price makes subscription economics clear." />
          <ElemRow name="Meal selection grid" type="Quantity cards" desc="All Ready Series meals. Each has − / count / + controls. Running total shown. 'Box Full' disables adding." why="Custom meal selection is the key differentiator vs. curated meal plans." />
          <ElemRow name="Box summary panel" type="Sticky sidebar" desc="Meal count, subtotal (crossed-out original if subscribe), discount line (−10%), final price, per-meal rate, 'Cancel anytime' note." why="Sticky panel provides real-time pricing feedback. Crossed-out price makes discount visceral." />
          <ElemRow name="Start Subscription button" type="Submit" desc="Disabled until box is full. Text: 'Start Subscription →'. Triggers Recharge checkout." why="Disabled state prevents empty/partial box submission." />

          <Text style={s.h4}>Pricing Reference</Text>
          <View style={s.table}>
            <View style={s.tableHeader}>
              <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Size</Text>
              <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Full Price</Text>
              <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Sub Price (−10%)</Text>
              <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Per Meal (Sub)</Text>
            </View>
            {[["5 meals", "$93.89", "$84.50", "$16.90"], ["10 meals", "$112.39", "$101.15", "$10.12"], ["15 meals", "$157.50", "$141.75", "$9.45"], ["20 meals", "$194.44", "$175.00", "$8.75"]].map(([s2, f, d, p], i) => (
              <TRow key={s2} cells={[s2, f, d, p]} alt={i % 2 === 1} />
            ))}
          </View>

          <Text style={s.h4}>QA Checklist — Screen 06</Text>
          <QA text="Subscribe toggle is active (selected) by default on page load" />
          <QA text="Switching to One-time removes frequency picker and shows full prices" />
          <QA text="Switching to Subscribe shows frequency picker and discounted prices" />
          <QA text="10% discount applied correctly to all 4 box sizes" />
          <QA text="Box summary updates in real-time as meals are added/removed" />
          <QA text="'Box Full' state: adding more meals beyond box size is blocked" />
          <QA text="Start Subscription button disabled until box is full" />
          <QA text="First delivery date shown correctly based on today's date + next Thursday" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 07–10: SUPPORTING SCREENS ══ */}
    <DocPage title="Screens 07–10 — Supporting Pages" pageNum="11">
      <View style={s.screenBlock}>
        <ScreenHeader num="07" title="How It Works" sub="Education page · Process overview · FAQ" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>Explains the end-to-end customer journey for both Ready Series and Meal Plan. Covers ordering, delivery, meal prep, and support. Targets top-of-funnel visitors who need more information before committing.</Text>
          <Text style={s.h4}>QA Checklist</Text>
          <QA text="All CTA buttons navigate to correct destination (RS or MP)" />
          <QA text="FAQ accordion: one item open at a time" />
          <QA text="Page is readable on mobile with no horizontal scroll" />
        </View>
      </View>

      <View style={s.screenBlock}>
        <ScreenHeader num="08" title="About Us" sub="Brand story · Chef credentials · Team · Values" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>Brand story and credibility page. Chef Ahmad biography, sports nutrition team credentials, company values, and Singapore origin story. Uses parent brand colour (#F5B300 yellow) — not orange, as this is not a Meal Plan page.</Text>
          <View style={s.calloutRed}>
            <Text style={[s.calloutTitle, { color: "#B91C1C" }]}>Known Issue — Colour Rule</Text>
            <Text style={s.calloutText}>About page CTAs must use #F5B300 (parent brand yellow), not #E85D04 (Meal Plan orange). About Us is a parent brand page. Any CTA linking to Meal Plans should use orange only if the destination is the Meal Plan page.</Text>
          </View>
          <Text style={s.h4}>QA Checklist</Text>
          <QA text="All primary CTAs on this page use #F5B300 yellow, not orange" />
          <QA text="Chef and team credentials are accurate (confirm with Jerome)" />
          <QA text="Imagery is appropriate and on-brand" />
        </View>
      </View>

      <View style={s.screenBlock}>
        <ScreenHeader num="09" title="Gift Cards" sub="Digital gift cards · Multiple denominations · Delivery via email" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>Gift card purchase page. Customer selects a denomination, enters recipient email and personal message, and checks out via standard Shopify gift card flow. Gift cards are redeemable at checkout against any order.</Text>
          <Text style={s.h4}>Elements</Text>
          <ElemRow name="Denomination selector" type="Card selection" desc="$25, $50, $100, $150, $200 denominations. Click to select. Selected card has #F5B300 border." why="Common gift card amounts. $25 entry point for low-commitment gifters." />
          <ElemRow name="Recipient form" type="Text inputs" desc="Recipient name, recipient email, sender name, personal message (optional, 200 char limit)." why="Personalisation increases gift card perception of value." />
          <ElemRow name="Send date" type="Date picker" desc="Send immediately or schedule a future date (e.g. birthday)." why="Scheduled delivery adds utility — customers buy ahead of occasion." />
          <Text style={s.h4}>QA Checklist</Text>
          <QA text="Gift card denomination selector: only one selected at a time" />
          <QA text="Recipient email validated before checkout" />
          <QA text="Shopify gift card created and emailed to recipient on purchase" />
          <QA text="Gift card code redeemable at checkout (test in Shopify staging)" />
        </View>
      </View>

      <View style={s.screenBlock}>
        <ScreenHeader num="10" title="Checkout & Confirmation" sub="Cart review · Payment · Order confirmation · Account prompt" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>Standard Shopify checkout flow for Ready-to-Go and gift card orders. Meal Plan and Box Subscription orders go through Recharge checkout. Confirmation page shows order summary, delivery date, and prompts non-logged-in customers to create an account.</Text>
          <Text style={s.h4}>QA Checklist</Text>
          <QA text="Promo code field accepts valid codes (test PMFIRST10)" />
          <QA text="Wallet credit applied automatically for logged-in customers" />
          <QA text="Free delivery threshold ($80) shown and met correctly" />
          <QA text="Confirmation email sent with order summary" />
          <QA text="Account creation prompt shown to guest customers post-purchase" />
          <QA text="Order appears in customer account Order History after confirmation" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 11: ACCOUNT DASHBOARD ══ */}
    <DocPage title="Screen 11 — Account Dashboard" pageNum="12">
      <View style={s.screenBlock}>
        <ScreenHeader num="11" title="Account — Dashboard" sub="Active plan · Box sub status · Renewal reminder · Wallet · Shortcuts" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>The account dashboard is the logged-in customer's home base. It shows their current subscription status, upcoming billing, wallet balance, and quick shortcuts to the most common actions. It is intentionally minimal — detailed plan management is on Screen 12.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Why only 2 stat tiles?</Text>
            <Text style={s.calloutText}>Jerome's feedback confirmed that Orders This Month and Reward Points are not metrics customers actively track on the dashboard. Showing 4 tiles created visual noise. Reducing to Active Plan + Wallet Balance keeps the dashboard focused on the two things customers need at a glance: what am I on, and do I have credit.</Text>
          </View>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Renewal reminder banner" type="Amber alert" desc="Shows 3 days before billing date: 'Plan renews in 3 days — $178 charged to Visa 4242'. Dismissible. Links to subscription management." why="Prevents surprise charges. Proactive communication reduces support tickets and chargebacks." />
          <ElemRow name="Active Plan tile" type="Stat tile" desc="Shows current goal (MAINTAIN/CUT/BUILD) in yellow. Source: Recharge subscription metadata." why="Primary piece of account info. Customer needs to know their goal is correct." />
          <ElemRow name="Wallet Balance tile" type="Stat tile" desc="SGD credit balance in lime/green. Source: custom wallet app or Shopify store credit." why="Encourages wallet use — visible balance prompts redemption at checkout." />
          <ElemRow name="Active Plan card" type="Dark card" desc="Plan name, billing cycle, next charge date, weekly amount. Two buttons: MANAGE PLAN → (goes to Screen 12) and PAUSE." why="Clear summary of subscription status. Pause accessible from dashboard for urgency." />
          <ElemRow name="Box Subscription row" type="Status row" desc="If active: '📦 Box Subscription · 10 meals · Weekly · Next delivery in 7 days · Manage →'. If inactive: not shown." why="Shows both subscription types at a glance. Conditional — only shown if Box Sub is active." />
          <ElemRow name="Quick shortcuts" type="2-tile grid" desc="'🔄 Swap meals' and '⚖️ Plan type'. Each tile navigates to the relevant section of Screen 12." why="Most common account actions surfaced immediately. Reduces navigation steps." />

          <Text style={s.h4}>QA Checklist — Screen 11</Text>
          <Text style={s.qaCategory}>Data accuracy</Text>
          <QA text="Active Plan tile shows correct goal from Recharge subscription" />
          <QA text="Wallet Balance shows correct credit balance from Shopify/wallet app" />
          <QA text="Next charge date is accurate and dynamically calculated" />
          <QA text="Renewal reminder banner appears at ≤3 days before billing — not before" />
          <Text style={s.qaCategory}>Conditional display</Text>
          <QA text="Box Subscription row shows only if customer has an active Box Sub" />
          <QA text="Box Subscription row hides if Box Sub is paused or cancelled" />
          <QA text="Renewal banner dismisses and does not reappear for same billing cycle" />
          <Text style={s.qaCategory}>Navigation</Text>
          <QA text="MANAGE PLAN → navigates to Screen 12 (Subscription & Menu Swap)" />
          <QA text="PAUSE button opens pause confirmation flow" />
          <QA text="Swap meals shortcut navigates to Week tab in Screen 12" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 12: SUBSCRIPTION & MENU SWAP ══ */}
    <DocPage title="Screen 12 — Subscription & Menu Swap" pageNum="13">
      <View style={s.screenBlock}>
        <ScreenHeader num="12" title="Account — Subscription & Menu Swap" sub="Plan progress · Week tabs · Meal swap · Pause · Box Sub management" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>The most complex screen in the product. Customers manage their ongoing subscription, swap meals for upcoming weeks, pause or cancel, and manage their Box Subscription from a single screen. The Thursday 1pm cutoff is prominently enforced here.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Plan progress bar shows "W13 of 12"</Text>
            <Text style={s.calloutText}>Customers who renew their plan continue from where they left off. Plan week 13 of 12 means the customer is in their second renewal cycle. This is intentional — it shows loyalty and continuity rather than resetting to W1. The progress bar fills based on weeks completed within the current 12-week block. Weeks remaining turns orange (#E85D04) when ≤2 weeks remain — a visual prompt to renew or let it lapse.</Text>
          </View>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Plan progress bar" type="Progress + counter" desc="Yellow fill bar. Shows 'Plan week 13 of 12'. Weeks remaining counter. Counter turns #E85D04 orange when ≤2 weeks left." why="Visual urgency prompt. Customers approaching end of plan are prompted to renew. Orange colour = attention without alarm." />
          <ElemRow name="Week tabs" type="Tab bar" desc="This Week (W13), Week 2 (W14), Week 3 (W15), Week 4 (W16). Tab shows absolute plan week number. Date range shown below tab label." why="Customers can plan ahead up to 4 weeks. Absolute week numbers (not relative) prevent confusion when reviewing past weeks." />
          <ElemRow name="Swap cutoff banner" type="Amber warning" desc="Shows on current week tab only: 'Swap cutoff: Thursday 18 Sep at 1pm — X hours remaining'. Red when < 2 hours. Disappears after cutoff." why="Non-negotiable business constraint. Visual urgency drives swap action before deadline." />
          <ElemRow name="Meal rows" type="Locked / unlocked" desc="Each meal shows image, name, macros, Lunch/Dinner badge, and SWAP button. Past-cutoff weeks show lock icon — SWAP disabled. Future weeks show SWAP enabled." why="Locked state prevents swaps after operations have packed the orders. Lunch/Dinner badge (no border-radius) identifies meal slot." />
          <ElemRow name="Swap modal" type="Full-screen drawer" desc="Opens when SWAP tapped. Shows full menu grid. Select a replacement → Confirm → API call to update order. Shows confirmation toast." why="Full menu visibility in swap modal prevents customers feeling constrained." />
          <ElemRow name="Billing cycle toggle" type="Segmented control" desc="Weekly / Monthly billing. Shows next billing date dynamically." why="Monthly billing option for customers who prefer less frequent charges." />
          <ElemRow name="Pause subscription" type="Flow with date picker" desc="Select 1–4 weeks. Shows exact date range (e.g. '15 Sep – 5 Oct 2025'). Confirm → API call to Recharge pause endpoint." why="Exact dates reduce 'when does this kick in?' support queries. Date range is critical per Jerome's requirements." />
          <ElemRow name="Box Subscription card" type="Management card" desc="Shows current box size, frequency, next delivery date. Controls: Edit size (opens size picker), Change frequency, Skip Next Delivery, Cancel Box Sub." why="Centralised management for both subscription types in one place." />
          <ElemRow name="Cancel subscription" type="2-step flow" desc="Click Cancel → Retention screen ('Are you sure? Here's what you'll miss') → Confirm Cancel → API call to Recharge cancel endpoint." why="2-step prevents accidental cancellation. Retention screen recovers ~15–20% of cancel intent." />

          <Text style={s.h4}>QA Checklist — Screen 12</Text>
          <Text style={s.qaCategory}>Plan Progress</Text>
          <QA text="Plan week counter shows correct week (e.g. W13 for customer in week 13 of their plan)" />
          <QA text="Progress bar fills proportionally within the current 12-week block" />
          <QA text="Weeks remaining counter shows correct number" />
          <QA text="Weeks remaining text turns orange (#E85D04) when ≤ 2 weeks remain" />
          <Text style={s.qaCategory}>Swap Cutoff</Text>
          <QA text="Cutoff banner shows on current week tab with correct day and time" />
          <QA text="Banner turns red when < 2 hours to cutoff" />
          <QA text="SWAP button is disabled on past-cutoff weeks" />
          <QA text="SWAP button is enabled on future weeks regardless of cutoff" />
          <Text style={s.qaCategory}>Swap Flow</Text>
          <QA text="Swap modal opens on SWAP button click" />
          <QA text="Selecting replacement and confirming updates the meal row" />
          <QA text="Confirmation toast appears for 3 seconds after successful swap" />
          <QA text="API call to update the order line item is made (confirm with dev)" />
          <Text style={s.qaCategory}>Pause</Text>
          <QA text="Pause date range displays correctly (start date = next delivery, end date = start + selected weeks)" />
          <QA text="Recharge pause API called with correct dates" />
          <QA text="Dashboard (Screen 11) shows 'Paused — resumes X date' after pause" />
          <Text style={s.qaCategory}>Cancel</Text>
          <QA text="Cancel requires 2 confirmations" />
          <QA text="Retention screen shown between step 1 and step 2" />
          <QA text="Recharge subscription cancelled after step 2 confirmation" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 13–14: ORDER HISTORY & WALLET ══ */}
    <DocPage title="Screens 13–14 — Orders & Wallet" pageNum="14">
      <View style={s.screenBlock}>
        <ScreenHeader num="13" title="Account — Order History" sub="All orders · Status · Reorder · Tracking" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>Complete order history for both subscription deliveries and one-time purchases. Each order shows items, total, delivery date, and status. Reorder functionality for à la carte purchases.</Text>
          <Text style={s.h4}>Elements</Text>
          <ElemRow name="Order list" type="Table rows" desc="Order ID (mono font), items summary, total (SGD mono), delivery date, status badge. Expandable row shows full item list." why="Compact list handles high-volume histories. Expand on demand reduces initial complexity." />
          <ElemRow name="Status badges" type="Coloured badges" desc="Confirmed (blue) · Packing (yellow) · Packed (dark) · Dispatched (orange) · Delivered (green) · Cancelled (red)." why="Clear visual status progression. Colour maps to standard logistics states." />
          <ElemRow name="Reorder button" type="Action" desc="Available on delivered à la carte orders. Adds same items to cart at current prices." why="High-value retention feature. Reduces friction for repeat buyers." />

          <Text style={s.h4}>QA Checklist — Screen 13</Text>
          <QA text="Orders display in reverse chronological order (newest first)" />
          <QA text="Subscription deliveries and à la carte orders shown in same list with type label" />
          <QA text="Reorder adds correct items at current prices (not historical prices)" />
          <QA text="Status badge colour matches the status correctly" />
        </View>
      </View>

      <View style={s.screenBlock}>
        <ScreenHeader num="14" title="Account — Wallet & Rewards" sub="Points balance · Voucher redemption · Earn history · Referrals" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>The Wallet & Rewards screen shows the customer's points balance, redeemable voucher tiers, earning history, and referral code. Points are earned on every purchase and can be redeemed for wallet credits at fixed tiers.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Fixed voucher tiers (not free-form redemption)</Text>
            <Text style={s.calloutText}>Fixed tiers (500pts = $5, 1000pts = $11, 2000pts = $25) create aspirational milestones and incentivise higher point accumulation. The bonus at higher tiers (+10% at 1000pts, +25% at 2000pts) rewards loyalty. Free-form redemption (any amount) reduces this motivation and is harder to communicate to customers.</Text>
          </View>

          <Text style={s.h4}>Voucher Tiers</Text>
          <View style={s.table}>
            <View style={s.tableHeader}>
              <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Tier</Text>
              <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Points</Text>
              <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Voucher Value</Text>
              <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Bonus</Text>
              <Text style={[s.tableHeaderCell, { flex: 1 }]}>Effective Rate</Text>
            </View>
            <TRow cells={["Bronze", "500 pts", "$5.00", "—", "$0.01/pt"]} />
            <TRow cells={["Silver", "1,000 pts", "$11.00", "+10%", "$0.011/pt"]} alt />
            <TRow cells={["Gold", "2,000 pts", "$25.00", "+25%", "$0.0125/pt"]} />
          </View>

          <Text style={s.h4}>Points Earn Rates</Text>
          <View style={s.table}>
            <View style={s.tableHeader}>
              <Text style={[s.tableHeaderCell, { flex: 1 }]}>Purchase Type</Text>
              <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Earn Rate</Text>
            </View>
            <TRow cells={["Ready-to-Go (à la carte)", "1 pt per $1 spent"]} />
            <TRow cells={["Meal Plan subscription", "2 pts per $1 spent"]} alt />
            <TRow cells={["Box Subscription", "1 pt per $1 spent"]} />
            <TRow cells={["Referral (per successful referral)", "500 pts flat bonus"]} alt />
          </View>

          <Text style={s.h4}>QA Checklist — Screen 14</Text>
          <QA text="Points balance shows correct value from loyalty app (Smile.io or equivalent)" />
          <QA text="Redeem button disabled if customer has insufficient points for selected tier" />
          <QA text="Voucher created and applied to customer's wallet/account on redemption" />
          <QA text="Referral code is unique per customer and tracked correctly" />
          <QA text="Points appear in earn history after qualifying purchase (may have delay)" />
        </View>
      </View>
    </DocPage>

    {/* ══ SECTION D: INTERACTIVE ELEMENTS LIBRARY ══ */}
    <DocPage title="D — Interactive Elements Library" pageNum="15">
      <Text style={s.sectionLabel}>Section D</Text>
      <Text style={s.h1}>Interactive Elements Library</Text>
      <Text style={s.p}>Every reusable interactive element in the prototype, documented with all states, behaviour, and implementation notes.</Text>

      <Text style={s.h3}>Modals & Drawers</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Component</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Trigger</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Behaviour</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Close method</Text>
        </View>
        {[
          ["Cart Drawer", "Cart icon in nav / Quick-add button", "Slides in from right (transform translateX). Overlay behind. Shows live cart items, subtotal, free delivery bar. AJAX — no page reload.", "✕ button · Click overlay · Escape key"],
          ["Product Quick-view", "Hover overlay on meal card", "Opens product detail in a drawer without navigating away.", "✕ button · Click overlay · Escape key"],
          ["Meal Swap Modal", "SWAP button in Account Screen 12", "Full screen overlay with meal grid. Select replacement → Confirm.", "✕ button · Escape key · Cancel button"],
          ["Pause Confirmation", "PAUSE button in Account", "Multi-step: select duration → see date range → confirm. Not dismissible by overlay click.", "Cancel button only (prevents accidental dismiss)"],
          ["Cancel Retention Flow", "Cancel Subscription button", "2-step modal. Step 1: retention messaging. Step 2: final confirm. Cannot skip step 1.", "Back button or Cancel (does not cancel sub)"],
          ["Promo Popup", "1.8s delay on home page visit", "Lightbox with discount code offer. Dismissible. Does not reshow same session.", "✕ button · Click overlay"],
        ].map(([n, t, b, c], i) => <TRow key={n} cells={[n, t, b, c]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Dropdowns & Selects</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Component</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Location</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Options</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Implementation</Text>
        </View>
        {[
          ["Collection sort", "Ready Series page toolbar", "Featured · Price Low–High · Price High–Low · Newest", "Native <select>. Submits via URL sort_by param."],
          ["Delivery time window", "Meal Plan Wizard Step 3", "6–9am · 9am–12pm · 12–3pm · 3–6pm", "Native <select> for mobile compatibility."],
          ["Pause duration", "Account Screen 12", "1 week · 2 weeks · 3 weeks · 4 weeks", "Custom styled select. Shows date range preview on change."],
          ["Box frequency", "Box Subscription page + Account", "Weekly · Fortnightly", "Radio group styled as segmented control."],
          ["Category filter", "Ready Series page", "All · Protein · Balanced · Lean · Omega-3", "Shopify collection filter API. URL param based."],
        ].map(([n, l, o, i2], i) => <TRow key={n} cells={[n, l, o, i2]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Toast Notifications</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Toast</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Trigger</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Duration</Text>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Message</Text>
        </View>
        {[
          ["Add to cart success", "Item added via quick-add or product page", "2 seconds", "Button changes to '✓ Added'. Cart count updates."],
          ["Meal swap success", "Meal replaced in account", "3 seconds", "'Meal updated for Week X'"],
          ["Plan saved", "Changes saved in account", "3 seconds", "'Changes saved ✓'"],
          ["Pause confirmed", "Pause flow completed", "3 seconds", "'Plan paused — resumes [date]'"],
          ["Logout", "Logout action", "3 seconds", "'Signed out successfully'"],
        ].map(([n, t, d, m], i) => <TRow key={n} cells={[n, t, d, m]} alt={i % 2 === 1} />)}
      </View>
    </DocPage>

    {/* ══ SECTION E: USER FLOWS ══ */}
    <DocPage title="E — User Journey Flows" pageNum="16">
      <Text style={s.sectionLabel}>Section E</Text>
      <Text style={s.h1}>User Journey Flows</Text>

      <Text style={s.h3}>Journey 1 — First-time Ready Series Purchase</Text>
      <View style={s.calloutGreen}>
        <Text style={s.calloutText}>Home → Ready Series → Browse meals → Product detail → Add to cart → Cart drawer → Checkout → Order confirmation → Account creation prompt</Text>
      </View>
      <Text style={s.p}>Key friction points: Macro visibility on cards (reduces need to click into each product) · Quick-add on hover (reduces steps for decided buyers) · Cart drawer (no page navigation break) · Post-purchase account prompt (capture email for retention).</Text>

      <Text style={s.h3}>Journey 2 — Meal Plan Sign-up</Text>
      <View style={s.calloutGreen}>
        <Text style={s.calloutText}>Home → Meal Plan Landing → Choose goal card → Wizard Step 1 (goal confirm) → Step 2 (meal selection) → Step 3 (delivery prefs) → Step 4 (payment via Recharge) → Confirmation → Account dashboard</Text>
      </View>
      <Text style={s.p}>Key friction points: Goal selection pre-fills wizard → Meal selection limits by goal → Delivery time window choice → Recharge checkout (external). Total steps: 6. Estimated completion time: 4–7 minutes.</Text>

      <Text style={s.h3}>Journey 3 — Box Subscription Sign-up</Text>
      <View style={s.calloutGreen}>
        <Text style={s.calloutText}>Ready Series page OR Home → Box Subscription page → Select Subscribe (default) → Choose frequency → Choose box size → Select meals → Review (summary panel) → Start Subscription (Recharge checkout) → Account dashboard</Text>
      </View>
      <Text style={s.p}>Key friction points: Subscribe vs one-time toggle (default: Subscribe) · Box size selection (Most Popular anchors to 10-meal) · Meal selection (Box Full state) · Recharge checkout.</Text>

      <Text style={s.h3}>Journey 4 — Weekly Menu Swap</Text>
      <View style={s.calloutGreen}>
        <Text style={s.calloutText}>Account dashboard → My Plan → Week tab (current week) → Tap SWAP on a meal → Swap modal opens → Browse menu → Select replacement → Confirm → Success toast → Meal row updates</Text>
      </View>
      <View style={s.calloutRed}>
        <Text style={[s.calloutTitle, { color: "#B91C1C" }]}>Critical Business Rule</Text>
        <Text style={s.calloutText}>This journey ONLY works before Thursday 1pm cutoff. After cutoff, SWAP button is disabled and locked state is shown. The backend must also enforce this rule — UI alone is not sufficient.</Text>
      </View>

      <Text style={s.h3}>Journey 5 — Pause & Resume</Text>
      <View style={s.calloutGreen}>
        <Text style={s.calloutText}>Account dashboard → My Plan → PAUSE button → Select duration (1–4 weeks) → See date range → Confirm → Dashboard updates to 'Paused' state → Auto-resume on resume date via Recharge</Text>
      </View>
      <Text style={s.p}>The UI must show the exact pause date range (e.g. "15 Sep – 5 Oct 2025"), not just "2 weeks". This was explicitly requested by Jerome. Auto-resume is handled by Recharge — confirm this is configured correctly in Recharge settings.</Text>
    </DocPage>

    {/* ══ SECTION F: THIRD-PARTY INTEGRATIONS ══ */}
    <DocPage title="F — Third-party Integration Requirements" pageNum="17">
      <Text style={s.sectionLabel}>Section F</Text>
      <Text style={s.h1}>Third-party Integration Requirements</Text>
      <Text style={s.p}>The following third-party apps are required to deliver the full product as prototyped. These cannot be replaced by Liquid/Shopify native functionality alone.</Text>

      <Text style={s.h3}>1. Recharge Subscriptions (Required)</Text>
      <View style={s.calloutRed}>
        <Text style={[s.calloutTitle, { color: "#B91C1C" }]}>Critical — Required for all subscription features</Text>
        <Text style={s.calloutText}>Recharge handles all recurring billing for Meal Plans and Box Subscriptions. Without Recharge, neither subscription product can function.</Text>
      </View>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Feature</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Recharge Requirement</Text>
        </View>
        {[
          ["Meal Plan billing", "Recharge subscription product. Weekly billing cycle. Friday charge day."],
          ["Box Subscription billing", "Recharge subscription. Weekly or fortnightly cycle."],
          ["Pause subscription", "Recharge pause API. Pass start_date and end_date. Auto-resume on end_date."],
          ["Cancel subscription", "Recharge cancel endpoint. 2-step UI before API call."],
          ["Billing cycle toggle", "Recharge update subscription frequency endpoint."],
          ["Renewal reminder", "Recharge webhook: upcoming_charge (3 days before). Trigger notification banner."],
          ["Plan week tracking", "Custom metafield on Recharge subscription. Increment weekly via webhook."],
        ].map(([f, r], i) => <TRow key={f} cells={[f, r]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>2. Loyalty / Wallet App (Required)</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Feature</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Recommended App</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Requirement</Text>
        </View>
        {[
          ["Points earn on purchase", "Smile.io or LoyaltyLion", "1pt per $1 (RtG, Box Sub). 2pts per $1 (Meal Plan)."],
          ["Voucher redemption", "Smile.io or LoyaltyLion", "Fixed tiers: 500pts=$5, 1000pts=$11, 2000pts=$25."],
          ["Wallet credit balance", "Smile.io or Shopify store credit", "Display in Account dashboard and apply at checkout."],
          ["Referral tracking", "Smile.io referrals", "Unique code per customer. 500pt bonus per successful referral."],
        ].map(([f, a, r], i) => <TRow key={f} cells={[f, a, r]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>3. Custom App Requirements (Bespoke Development)</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Feature</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Description</Text>
        </View>
        {[
          ["Meal swap system", "API to swap a specific line item in an upcoming Recharge order. Requires custom app to bridge Recharge order management with Shopify products."],
          ["Weekly menu management", "Admin interface to publish weekly menus by plan type. Drives which meals appear in swap modal and wizard meal selection step."],
          ["Plan week tracking", "Logic to track and increment plan week per customer. Stored as Recharge subscription metafield. Used for progress bar and 'weeks remaining' display."],
          ["Thursday cutoff enforcement", "Server-side cutoff enforcement (not just UI). API must reject swap requests after Thursday 1pm. UI enforcement alone is insufficient."],
        ].map(([f, d], i) => <TRow key={f} cells={[f, d]} alt={i % 2 === 1} />)}
      </View>
    </DocPage>

    {/* ══ SECTION G: SHOPIFY SETUP ══ */}
    <DocPage title="G — Shopify Setup Checklist" pageNum="18">
      <Text style={s.sectionLabel}>Section G</Text>
      <Text style={s.h1}>Shopify Setup Checklist</Text>
      <Text style={s.p}>Complete checklist for the Shopify developer to configure the store before theme upload. Check each item before going live.</Text>

      <Text style={s.h3}>Theme Upload</Text>
      <QA text="Download PerformanceMeals-Shopify-Theme.zip from prototype footer" />
      <QA text="Upload to Shopify Admin → Online Store → Themes → Add theme → Upload zip" />
      <QA text="Do not publish until all setup steps below are complete" />

      <Text style={s.h3}>Product Metafields (Admin → Settings → Custom Data → Products)</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Namespace</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Key</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Type</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Description</Text>
        </View>
        {[["pm", "kcal", "Integer", "Calories per serving"], ["pm", "protein", "Integer", "Protein in grams"], ["pm", "carbs", "Integer", "Carbohydrates in grams"], ["pm", "fat", "Integer", "Fat in grams"], ["pm", "category", "Single line text", "e.g. Protein, Balanced, Lean, Omega-3"], ["pm", "allergens", "Rich text", "Allergen information"], ["pm", "ingredients", "Rich text", "Full ingredient list"], ["pm", "heating", "Rich text", "Microwave and oven heating instructions"]].map(([n, k, t, d], i) => <TRow key={k} cells={[n, k, t, d]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Collections to Create</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Handle</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Name</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Purpose</Text>
        </View>
        {[["ready-series", "Ready Series", "All à la carte meals — used in shop page and featured meals section"], ["meal-plan-meals", "Meal Plan Meals", "Meals available in the Meal Plan wizard"], ["box-subscription", "Box Subscription Meals", "Meals selectable in Box Subscription builder"]].map(([h, n, p], i) => <TRow key={h} cells={[h, n, p]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Navigation Menus (Admin → Online Store → Navigation)</Text>
      <QA text="Create 'main-menu' menu with: Ready Series, Meal Plans, Box Subscription, How It Works, About Us, Gift Cards" />
      <QA text="Create 'footer' menu with shop links" />
      <QA text="Create footer column 2 and 3 menus for Plans and Help sections" />

      <Text style={s.h3}>Theme Editor Settings (after publishing)</Text>
      <QA text="Upload logo image (SVG preferred, PNG fallback)" />
      <QA text="Set announcement bar text: 'Free delivery on orders over $80 · Use PMFIRST10 for 10% off your first order'" />
      <QA text="Set announcement bar background: #F5B300, text: #000000" />
      <QA text="Set free delivery threshold: 80" />
      <QA text="Configure hero section: upload background image, set headline and CTAs" />
      <QA text="Configure stats bar values from real data" />
      <QA text="Configure testimonials with real customer quotes (get from Jerome)" />
      <QA text="Configure footer social links (Instagram, Facebook)" />

      <Text style={s.h3}>Apps to Install (Shopify App Store)</Text>
      <QA text="Recharge Subscriptions — configure Meal Plan and Box Sub products" />
      <QA text="Smile.io (or LoyaltyLion) — configure earn rates and voucher tiers per Section F" />
      <QA text="Custom app for meal swap system — requires bespoke development" />
    </DocPage>

    {/* ══ SECTION H: MASTER QA SIGN-OFF ══ */}
    <DocPage title="H — Master QA Sign-off Checklist" pageNum="19">
      <Text style={s.sectionLabel}>Section H</Text>
      <Text style={s.h1}>Master QA Sign-off Checklist</Text>
      <Text style={s.p}>To be completed by Jerome and the Performance Meals team before going live. Each item must be checked in the live Shopify staging environment, not the prototype. Sign off by initialling each section.</Text>

      <Text style={s.h3}>Brand & Visual QA</Text>
      <QA text="Ready Series colour is #F5B300 yellow throughout — no orange on RS pages" />
      <QA text="Meal Plan colour is #E85D04 orange throughout — no yellow on MP pages" />
      <QA text="No rounded corners on any card, button, badge, or input anywhere in the store" />
      <QA text="No box-shadows on product cards, modals, or content elements" />
      <QA text="Font weight never exceeds extrabold (800)" />
      <QA text="All prices show SGD dollar sign in monospace font" />
      <QA text="DM Sans loaded correctly — all UI text renders in DM Sans, not system font" />
      <QA text="Logo displays correctly at all breakpoints" />
      <QA text="Favicon displays in browser tab" />

      <Text style={s.h3}>Functional QA</Text>
      <QA text="Add to cart works via quick-add, product page form, and cart page" />
      <QA text="Cart count updates in real-time without page reload" />
      <QA text="Cart drawer opens and closes correctly (button, overlay, Escape key)" />
      <QA text="Free delivery threshold bar shows and updates correctly at $80" />
      <QA text="Promo code PMFIRST10 applies correctly at checkout" />
      <QA text="Gift card purchase flow works end-to-end (purchase → email to recipient → redeem)" />
      <QA text="Search returns relevant product results" />

      <Text style={s.h3}>Subscription QA (Recharge)</Text>
      <QA text="Meal Plan subscription created correctly with weekly billing" />
      <QA text="Box Subscription created correctly with correct frequency" />
      <QA text="Pause flow pauses subscription and auto-resumes on correct date" />
      <QA text="Cancel flow cancels subscription after 2-step confirmation" />
      <QA text="Renewal reminder banner appears 3 days before next charge" />
      <QA text="Meal swap updates the order correctly before Thursday 1pm cutoff" />
      <QA text="Swap locked after Thursday 1pm — SWAP button disabled and API rejects requests" />

      <Text style={s.h3}>Account QA</Text>
      <QA text="Account creation and login work correctly" />
      <QA text="Active Plan tile shows correct goal from Recharge" />
      <QA text="Wallet Balance shows correct credit from loyalty app" />
      <QA text="Plan week counter shows correct week number" />
      <QA text="Weeks remaining counter turns orange when ≤ 2 weeks left" />
      <QA text="Order history shows all orders in reverse chronological order" />
      <QA text="Points earn after qualifying purchases (may have up to 24hr delay)" />
      <QA text="Voucher redemption creates wallet credit successfully" />

      <Text style={s.h3}>Mobile QA</Text>
      <QA text="All pages render correctly at 375px width (iPhone SE)" />
      <QA text="All pages render correctly at 390px width (iPhone 14)" />
      <QA text="Touch targets are minimum 44×44px (WCAG AA)" />
      <QA text="Mobile nav opens and closes correctly" />
      <QA text="Cart drawer full-width on mobile" />
      <QA text="Meal Plan wizard navigates correctly on mobile" />
      <QA text="Two Paths section stacks vertically on mobile (no hover-expand)" />

      <Text style={s.h3}>Performance QA</Text>
      <QA text="Home page Lighthouse score: Performance ≥ 80, Accessibility ≥ 90" />
      <QA text="Collection page loads in < 3 seconds on 4G (Chrome DevTools)" />
      <QA text="LCP (Largest Contentful Paint) ≤ 2.5 seconds on hero image" />
      <QA text="No layout shift from font loading (CLS < 0.1)" />

      <View style={{ marginTop: 24, borderTop: `1 solid ${C.border}`, paddingTop: 16 }}>
        <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.black, marginBottom: 16 }}>Sign-off</Text>
        <View style={s.twoCol}>
          {[["Business Owner", "Jerome / Performance Meals"], ["Developer", "Shopify Theme Developer"], ["QA Lead", "Performance Meals Team"]].map((sig) => (
            <View key={sig[0]} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 8, color: C.gray, marginBottom: 28 }}>{sig[0]}</Text>
              <View style={{ borderBottom: `1 solid ${C.lightgray}`, marginBottom: 4 }} />
              <Text style={{ fontSize: 7.5, color: C.gray }}>{sig[1]}</Text>
              <Text style={{ fontSize: 7.5, color: C.lightgray, marginTop: 2 }}>Date: ____________</Text>
            </View>
          ))}
        </View>
      </View>
    </DocPage>

    {/* ══ BACK COVER ══ */}
    <Page size="A4" style={[s.coverPage, { justifyContent: "flex-end" }]}>
      <View style={{ padding: 60 }}>
        <View style={{ borderTop: `1 solid rgba(255,255,255,0.1)`, paddingTop: 32, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
          <View>
            <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: C.white, letterSpacing: 1, marginBottom: 6 }}>PERFORMANCE MEALS</Text>
            <Text style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>PERFORMANCEMEALS.COM.SG · SINGAPORE</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 7.5, color: "rgba(255,255,255,0.2)", marginBottom: 4 }}>Final QA & Handoff Document · Version 1.0</Text>
            <Text style={{ fontSize: 7.5, color: "rgba(255,255,255,0.2)", marginBottom: 4 }}>September 2026</Text>
            <Text style={{ fontSize: 7.5, color: "rgba(255,255,255,0.15)" }}>CONFIDENTIAL · DO NOT DISTRIBUTE</Text>
          </View>
        </View>
      </View>
    </Page>

  </Document>
);

export async function downloadHandoffPDF() {
  const blob = await pdf(<HandoffPDF />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "PerformanceMeals-Final-QA-Handoff.pdf";
  a.click();
  URL.revokeObjectURL(url);
}
