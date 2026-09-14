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
            {[["14", "Screens"], ["100+", "Elements"], ["3", "Products"], ["5", "User Journeys"]].map(([n, l]) => (
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
          ["C", "Screens 01–14: Full documentation (every element, every rationale, QA checklist)", "All"],
          ["D", "Interactive Elements Library (all modals, dropdowns, toasts)", "Dev + QA"],
          ["E", "User Journey Flows (5 complete journeys)", "All"],
          ["F", "Third-party Integration Requirements (Recharge, Smile.io, custom app)", "Dev"],
          ["G", "Shopify Setup Checklist", "Dev"],
          ["G2", "Navigation & Global Components", "Dev + QA"],
          ["G3", "Error, Empty & Loading States", "Dev + QA"],
          ["G4", "Test Environment & Credentials", "Dev + QA"],
          ["G5", "Browser & Device Support Matrix", "Dev + QA"],
          ["G6", "Known Limitations & Prototype vs. Production", "Jerome + Dev"],
          ["G7", "Post-Launch Monitoring Checklist", "Jerome + Ops"],
          ["H", "Master QA Sign-off Checklist (with signature blocks)", "Jerome + QA"],
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

    {/* ══ SCREEN 07: HOW IT WORKS ══ */}
    <DocPage title="Screen 07 — How It Works" pageNum="11">
      <View style={s.screenBlock}>
        <ScreenHeader num="07" title="How It Works" sub="Education page · Process overview · Delivery info · FAQ" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>A top-of-funnel education page for first-time visitors who want to understand the ordering process before committing to a product. Covers both Ready Series and Meal Plan journeys, delivery logistics, packaging, and FAQs. No product-specific colour — parent brand yellow (#F5B300) throughout.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Why a dedicated How It Works page?</Text>
            <Text style={s.calloutText}>Performance Meals serves two audiences with very different purchase journeys: casual ready-meal buyers and committed 12-week plan subscribers. A shared education page handles top-of-funnel objections (how does delivery work? can I cancel?) before either audience commits to a product. Reduces support queries from confused first-time customers.</Text>
          </View>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Process timeline — Ready Series" type="Step list" desc="4 steps: Browse meals → Add to cart → Choose delivery → Enjoy. Icon per step. No interaction — static." why="Simple linear process reassures new customers the flow is not complicated." />
          <ElemRow name="Process timeline — Meal Plan" type="Step list" desc="5 steps: Choose goal → Wizard selects meals → Weekly delivery → Swap if needed → Renew or cancel. Static." why="Meal Plan is more complex — explicitly showing 5 steps manages expectations." />
          <ElemRow name="Delivery info panel" type="Info grid" desc="Delivery days, cut-off times, time windows, packaging info, cold-chain guarantee. 2-col grid on desktop, stacked on mobile." why="Delivery is the #1 anxiety point for food delivery customers. Pre-empting it here reduces cart abandonment." />
          <ElemRow name="FAQ accordion" type="Expandable" desc="10 FAQs covering cancellation, swaps, allergens, delivery zones, payment, subscriptions. One item open at a time. Animated expand/collapse." why="Addresses common objections without cluttering the page. Accordion format keeps page scannable." />
          <ElemRow name="CTA row" type="Two buttons" desc="'Shop Ready Series' (#F5B300) and 'Start Meal Plan' (#E85D04). Side by side. Both sticky at page bottom on mobile." why="Converts educated visitors immediately. Two CTAs reflect two distinct product journeys." />

          <Text style={s.h4}>FAQ Content (All 10 Items)</Text>
          <View style={s.table}>
            <View style={s.tableHeader}>
              <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>#</Text>
              <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Question</Text>
              <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Applies to</Text>
            </View>
            {[
              ["1", "How does delivery work?", "Both"],
              ["2", "What is the Thursday 1pm cutoff?", "Meal Plan / Box Sub"],
              ["3", "Can I cancel anytime?", "Both subscriptions"],
              ["4", "Do you deliver to my area?", "Both"],
              ["5", "Are meals frozen or chilled?", "Ready Series"],
              ["6", "How do I heat my meals?", "Ready Series"],
              ["7", "Can I swap meals?", "Meal Plan / Box Sub"],
              ["8", "What if I have allergies?", "Both"],
              ["9", "How does the loyalty programme work?", "Both"],
              ["10", "What payment methods do you accept?", "Both"],
            ].map(([n, q, a], i) => <TRow key={n} cells={[n, q, a]} alt={i % 2 === 1} />)}
          </View>

          <Text style={s.h4}>QA Checklist — Screen 07</Text>
          <Text style={s.qaCategory}>Content</Text>
          <QA text="'Shop Ready Series' CTA uses #F5B300 yellow" />
          <QA text="'Start Meal Plan' CTA uses #E85D04 orange" />
          <QA text="Delivery cut-off time displayed is Thursday 1pm — confirm with operations before go-live" />
          <QA text="Delivery zones listed are accurate (confirm with logistics team)" />
          <Text style={s.qaCategory}>Interaction</Text>
          <QA text="FAQ accordion: only one item open at a time" />
          <QA text="Accordion expand/collapse is animated smoothly (no layout jump)" />
          <QA text="Page reads correctly on mobile with no horizontal overflow" />
          <Text style={s.qaCategory}>Navigation</Text>
          <QA text="'Shop Ready Series' button navigates to /collections/ready-series" />
          <QA text="'Start Meal Plan' button navigates to Meal Plan landing page" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 08: ABOUT US ══ */}
    <DocPage title="Screen 08 — About Us" pageNum="12">
      <View style={s.screenBlock}>
        <ScreenHeader num="08" title="About Us" sub="Brand story · Chef credentials · Team · Values · Singapore origin" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>The About Us page is a trust and credibility page. It tells the Performance Meals origin story, introduces the culinary and nutrition team, and lays out the company values. This is a parent brand page — all CTAs use #F5B300 yellow, never orange.</Text>

          <View style={s.calloutRed}>
            <Text style={[s.calloutTitle, { color: "#B91C1C" }]}>Critical Brand Rule — Colour on About page</Text>
            <Text style={s.calloutText}>About Us belongs to the parent brand (Performance Meals), not to either sub-product. All primary CTAs on this page must use #F5B300 yellow. If a CTA links to the Meal Plan, the CTA itself is still yellow — it is the destination page that uses orange. Do not apply #E85D04 to any element on this page.</Text>
          </View>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Origin story hero" type="Dark hero section" desc="Headline and founding paragraph over dark background. Staggered fade-up animation on load. No product CTAs in this section." why="Sets brand narrative before any commercial messaging." />
          <ElemRow name="Chef profile" type="Image + bio card" desc="Chef photo (full bleed left), bio right. Credentials: culinary background, sports nutrition certification, years of experience. No border-radius on image." why="Food business credibility lives or dies on chef credentials. Real name and face builds trust." />
          <ElemRow name="Nutrition team" type="Team grid" desc="3–4 team member cards. Name, role, credential badge. Hover shows short bio. No rounded corners." why="Shows depth behind product — not just a chef but a full nutrition team." />
          <ElemRow name="Company values" type="Icon + copy grid" desc="4 values: Macro-Accurate · Chef Quality · Singapore-Made · No Lock-in. Each has a one-line heading and 2-sentence explanation." why="Values-based content converts brand-aligned customers who share the same principles." />
          <ElemRow name="Milestone timeline" type="Interactive timeline" desc="Click each year (2019/2021/2022/2024) to expand the milestone. One open at a time. Years: Founded, First 1000 customers, Meal Plan launch, 8400+ customers." why="Interactive timeline rewards curious visitors and demonstrates growth credibility." />
          <ElemRow name="Media / press mentions" type="Logo row" desc="Press logos (static, greyscale). Links to articles open in new tab." why="Third-party validation. Greyscale keeps logos from clashing with brand palette." />
          <ElemRow name="CTA" type="Button" desc="'Start Your Journey →' in #F5B300. Links to /collections/ready-series (not Meal Plan)." why="About page intent is brand exploration, not Meal Plan commitment. RS is the lower-friction next step." />

          <Text style={s.h4}>Content to Confirm with Jerome</Text>
          <View style={s.calloutBlue}>
            <Text style={[s.calloutTitle, { color: "#1D4ED8" }]}>Action Required Before Launch</Text>
            <Text style={s.calloutText}>The following must be confirmed with Jerome before the About page goes live:{"\n"}• Chef's full name and biographical details{"\n"}• Nutrition team member names, roles, and credentials{"\n"}• Exact founding year and key milestone dates{"\n"}• Press mentions and article URLs{"\n"}• Permission to use team photography{"\n"}• UEN number and registered company name (for footer)</Text>
          </View>

          <Text style={s.h4}>QA Checklist — Screen 08</Text>
          <QA text="Zero orange (#E85D04) elements on this page — all CTAs are #F5B300 yellow" />
          <QA text="Milestone timeline: click expands, only one open at a time" />
          <QA text="Team hover bios display and dismiss correctly" />
          <QA text="Press logo links open in new tab with rel='noopener noreferrer'" />
          <QA text="Chef and team content confirmed accurate by Jerome before publish" />
          <QA text="All team photography approved and rights confirmed" />
          <QA text="Page is indexable by search engines (no noindex tag)" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 09: GIFT CARDS ══ */}
    <DocPage title="Screen 09 — Gift Cards" pageNum="13">
      <View style={s.screenBlock}>
        <ScreenHeader num="09" title="Gift Cards" sub="Digital gift cards · 5 denominations · Scheduled send · Email delivery" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>The Gift Cards page handles the complete digital gift card purchase flow. Customer selects a denomination, enters recipient and sender details, optionally schedules a send date, then checks out via Shopify's native gift card system. Gift cards are redeemable at checkout against any order.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Why offer gift cards?</Text>
            <Text style={s.calloutText}>Gift cards are a low-friction entry point for new customers and a high-value retention tool for existing ones. They capture revenue immediately and defer the product decision to the recipient. The Performance Meals gift card is also a corporate wellness gifting play — companies buy for employee health programmes. Denominations up to $200 support bulk/corporate gifting.</Text>
          </View>

          <Text style={s.h4}>Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Denomination selector" type="5 cards" desc="$25 / $50 / $100 / $150 / $200. One selected at a time. Selected card: solid #F5B300 border + filled background. Default: $50 pre-selected." why="$50 default anchors mid-range selection. $25 low barrier; $200 enables corporate gifting." />
          <ElemRow name="Recipient name input" type="Text input" desc="Required. Label above input. Placeholder: 'e.g. Sarah Tan'. Used in email subject line." why="Personalised email ('A gift card for Sarah Tan!') dramatically increases open rate vs. generic." />
          <ElemRow name="Recipient email input" type="Email input" desc="Required. Validated format. Error shown inline: 'Please enter a valid email address'." why="Validated to prevent failed delivery from typos. Inline error (not alert) is less disruptive." />
          <ElemRow name="Sender name input" type="Text input" desc="Required. Shown in gift email as 'From: [name]'." why="Removes ambiguity for recipient — they know who sent it." />
          <ElemRow name="Personal message" type="Textarea" desc="Optional. 200 character limit. Character counter shown below (e.g. '148 / 200'). Included in gift card email." why="Personalisation increases gift perception. Character limit forces concision." />
          <ElemRow name="Send date" type="Radio + date picker" desc="'Send immediately' (default) or 'Schedule for a date' (shows date picker). Date picker: no dates in the past. Format: DD/MM/YYYY." why="Scheduled send enables advance purchase for birthdays and occasions. No past dates prevents errors." />
          <ElemRow name="Order summary" type="Sidebar panel" desc="Amount, sender, recipient, scheduled date, total (no delivery cost on gift cards). Sticky on desktop." why="Full preview before payment reduces errors ('I sent it to the wrong email')." />
          <ElemRow name="Checkout button" type="Submit" desc="'Send Gift Card →' in #F5B300. Disabled until required fields complete. Triggers Shopify gift card checkout." why="Disabled state + clear required fields reduces abandonment from incomplete submissions." />

          <Text style={s.h4}>Gift Card Email — Content</Text>
          <View style={s.table}>
            <View style={s.tableHeader}>
              <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Email element</Text>
              <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Content</Text>
              <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Source</Text>
            </View>
            {[
              ["Subject line", "You've received a gift card for Performance Meals!", "Fixed copy"],
              ["Greeting", "Hi [recipient name]!", "Recipient name field"],
              ["From", "From [sender name]", "Sender name field"],
              ["Message", "Personal message (or omitted if blank)", "Message textarea"],
              ["Gift code", "Unique Shopify-generated code", "Shopify"],
              ["Value", "SGD $XX.00", "Selected denomination"],
              ["Redemption link", "performancemeals.com.sg — Apply at checkout", "Fixed copy"],
              ["Expiry", "Gift cards do not expire (Shopify default)", "Shopify setting"],
            ].map(([e, c, src], i) => <TRow key={e} cells={[e, c, src]} alt={i % 2 === 1} />)}
          </View>

          <Text style={s.h4}>QA Checklist — Screen 09</Text>
          <Text style={s.qaCategory}>Form validation</Text>
          <QA text="Denomination: only one card selected at a time; $50 pre-selected on page load" />
          <QA text="Recipient email: invalid format shows inline error, not browser alert" />
          <QA text="Checkout button disabled until recipient name, email, and sender name are complete" />
          <QA text="Character counter updates correctly as user types in message field" />
          <QA text="Date picker: no past dates selectable" />
          <Text style={s.qaCategory}>End-to-end</Text>
          <QA text="Test purchase: $25 gift card sent to test email address — confirm email received" />
          <QA text="Gift card code in email is valid — test redeeming at checkout" />
          <QA text="Scheduled send: card email arrives on scheduled date, not immediately" />
          <QA text="Gift card appears in Shopify Admin → Gift Cards after purchase" />
          <QA text="Redeemed gift card reduces balance correctly — partial redemption supported" />
          <QA text="Gift card value shown in Shopify checkout as payment method" />
        </View>
      </View>
    </DocPage>

    {/* ══ SCREEN 10: CART & CHECKOUT ══ */}
    <DocPage title="Screen 10 — Cart & Checkout" pageNum="14">
      <View style={s.screenBlock}>
        <ScreenHeader num="10" title="Cart & Checkout" sub="Cart page · Promo codes · Wallet credit · Shopify checkout · Confirmation" brand="PM" />
        <View style={s.screenBody}>
          <Text style={s.p}>The cart and checkout covers two distinct surfaces: the Performance Meals cart page (custom, pre-checkout) and Shopify's native checkout. Cart page is fully custom-styled. Checkout uses Shopify Checkout with brand customisations via the checkout editor. Subscription orders (Meal Plan, Box Sub) bypass the cart and go directly to Recharge checkout.</Text>

          <View style={s.callout}>
            <Text style={[s.calloutTitle, { color: "#92400E" }]}>Design Rationale — Custom cart page vs. Shopify native cart</Text>
            <Text style={s.calloutText}>Shopify's native cart page is a dead end — customers cannot be upsold or cross-sold before checkout. The custom cart page includes: a free delivery progress bar (drives average order value), a promo code field, a wallet credit display, and a cross-sell row ('Customers also add…'). This converts 8–12% more revenue per cart session on average vs. native cart.</Text>
          </View>

          <Text style={s.h4}>Cart Page Elements</Text>
          <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
            <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
            <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
            <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
          </View>
          <ElemRow name="Free delivery bar" type="Progress bar" desc="'$X away from free delivery'. Yellow fill. Updates AJAX when qty changes. Text: 'You're $12 away from free delivery' → 'Free delivery unlocked! 🎉' at $80." why="Gamification of order threshold. Drives AOV. '🎉' moment is a small delight that reduces cart abandonment." />
          <ElemRow name="Cart line items" type="Editable rows" desc="Image, product name, qty stepper (−/+), price. Remove button (×). AJAX qty update — no page reload. Price updates in real-time." why="AJAX updates keep user in flow. Real-time price change = immediate feedback." />
          <ElemRow name="Promo code field" type="Text input + apply" desc="'PMFIRST10' (10% off first order). Inline apply button. Success: green tick + discount applied. Error: 'Invalid or expired code' inline." why="Promo code at cart (not checkout) keeps the discount visible during purchase decision." />
          <ElemRow name="Wallet credit" type="Conditional display" desc="Shows only for logged-in customers with credit balance. 'Apply $X wallet credit' toggle. Applied credit shown as a line item discount." why="Showing available credit at cart drives redemption. Hidden credit = forgotten credit." />
          <ElemRow name="Order note" type="Textarea" desc="Optional. 'Special delivery instructions or notes for us'. Passed to Shopify order. 300 char limit." why="Catches edge cases (no lift access, leave at door, etc.) that reduce delivery failures." />
          <ElemRow name="Checkout button" type="Primary CTA" desc="'Proceed to Checkout →' in #F5B300. Full width on mobile. Submits cart to Shopify checkout." why="Yellow = action. Full-width mobile CTA maximises tap target." />
          <ElemRow name="Cross-sell row" type="Product strip" desc="3 meals from same collection. Title: 'Customers also add'. Quick-add button on each. Updates cart AJAX." why="Last opportunity to increase AOV before checkout." />

          <Text style={s.h4}>Confirmation Page Elements</Text>
          <ElemRow name="Order summary" type="Read-only panel" desc="Order number (mono), items ordered, delivery date, delivery address, total paid. Print button." why="Full confirmation reduces 'did my order go through?' support tickets." />
          <ElemRow name="Account creation prompt" type="Conditional banner" desc="Shown to guest customers only. 'Create an account to track your order and earn reward points'. Pre-fills email from order." why="Post-purchase is highest-motivation moment for account creation. Pre-filling email removes friction." />
          <ElemRow name="Reorder shortcut" type="Button (next visit)" desc="Shows on returning to confirmation page or in order history. 'Reorder this' adds same items to cart." why="Returning customers buy familiar meals. One-click reorder drives LTV." />
          <ElemRow name="Next steps" type="Info row" desc="'What happens next': confirmation email sent · packing begins [date] · delivery on [date]. Timeline." why="Explicit next-step communication eliminates 'where is my order?' queries." />

          <Text style={s.h4}>QA Checklist — Screen 10</Text>
          <Text style={s.qaCategory}>Cart page</Text>
          <QA text="Free delivery bar shows correct amount remaining based on cart subtotal" />
          <QA text="Free delivery bar reaches 100% and shows success message at $80" />
          <QA text="Qty stepper: − does not go below 1; × removes item from cart" />
          <QA text="Qty changes update price in real-time without page reload" />
          <QA text="PMFIRST10 promo code applies 10% discount correctly" />
          <QA text="Invalid promo code shows inline error (not browser alert)" />
          <QA text="Wallet credit toggle applies credit as a line item discount" />
          <QA text="Wallet credit section hidden for guest customers / customers with zero balance" />
          <Text style={s.qaCategory}>Checkout (Shopify native)</Text>
          <QA text="Shopify checkout is branded: logo visible, brand colours applied via checkout editor" />
          <QA text="Promo code entered on cart page carries through to checkout" />
          <QA text="Test card 4242 4242 4242 4242 (exp 12/34, CVV 123) completes successfully in Shopify sandbox" />
          <QA text="Gift card code redeemable at checkout payment step" />
          <Text style={s.qaCategory}>Confirmation page</Text>
          <QA text="Confirmation email sent to customer email address immediately after order" />
          <QA text="Account creation prompt only shown to guest customers" />
          <QA text="Order appears in customer account Order History within 5 minutes" />
          <QA text="'What happens next' dates are correct based on order submission time" />
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

    {/* ══ SECTION G2: NAV + GLOBAL COMPONENTS ══ */}
    <DocPage title="G2 — Global Components" pageNum="20">
      <Text style={s.sectionLabel}>Global Components</Text>
      <Text style={s.h1}>Navigation & Global UI</Text>
      <Text style={s.p}>These components appear on every page and are not tied to a single screen. Any bug in these affects the entire customer experience.</Text>

      <Text style={s.h3}>Sticky Navigation Bar</Text>
      <View style={s.callout}>
        <Text style={[s.calloutTitle, { color: "#92400E" }]}>Behaviour: hide on scroll down, reveal on scroll up</Text>
        <Text style={s.calloutText}>The nav hides when the user scrolls down (to maximise content area) and reappears immediately on any upward scroll. This is implemented via a scroll direction detector in theme.js. The nav is always visible at page top. On mobile, the nav never hides — it stays fixed because mobile users rely on it for navigation.</Text>
      </View>
      <View style={{ flexDirection: "row", backgroundColor: C.bg, padding: "5 8", marginBottom: 4 }}>
        <Text style={[s.tableHeaderCell, { flex: 1 }]}>Element</Text>
        <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Type</Text>
        <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Behaviour</Text>
        <Text style={[s.tableHeaderCell, { flex: 1 }]}>Rationale</Text>
      </View>
      <ElemRow name="Logo" type="Image / SVG" desc="Performance Meals wordmark. Click navigates to home. SVG preferred. Min height 32px, max 44px." why="Brand anchor. Always navigates home — universal web convention." />
      <ElemRow name="Desktop nav links" type="Link row" desc="Ready Series · Meal Plans · Box Subscription · How It Works · About · Gift Cards. Hover: #F5B300 underline. Active page: bold + underline." why="Flat navigation at top level — no mega-menus. Keeps paths visible at all times." />
      <ElemRow name="Account icon" type="Icon button" desc="Person icon. Logged out: navigates to /account/login. Logged in: navigates to /account. No dropdown — direct navigate." why="Dropdown account menus add complexity. Direct navigate to account page is simpler and covers all account actions." />
      <ElemRow name="Cart icon" type="Icon + badge" desc="Bag icon. Yellow badge shows item count. Hidden when count = 0. Click opens cart drawer (not cart page)." why="Cart drawer keeps user on current page — less disruptive than navigating to /cart. Badge shows live count." />
      <ElemRow name="Search icon" type="Icon button" desc="Magnifier icon. Click opens full-width search bar below nav (not a modal). Search bar animates down with opacity + height transition." why="Inline search bar (not overlay) feels less disruptive on desktop. Full-width gives adequate typing space." />
      <ElemRow name="Search bar" type="Conditional" desc="Appears below nav on search icon click. Input auto-focuses. Results appear as dropdown below input after 300ms debounce. Escape or click outside closes." why="300ms debounce prevents API hammering. Auto-focus removes extra tap for mobile." />
      <ElemRow name="Mobile hamburger" type="Icon button" desc="Three-line icon. Visible at ≤768px. Click opens mobile nav drawer (full-height, left edge)." why="Standard mobile nav pattern. Full-height drawer covers entire viewport for focused navigation." />
      <ElemRow name="Mobile nav drawer" type="Slide-in panel" desc="Full-height left panel. Stacked links. Account + cart icons at bottom. Overlay behind. Close: × button, overlay tap, or swipe left." why="Swipe-to-close is a mobile UX expectation. Overlay prevents accidental background interaction." />
      <ElemRow name="Announcement bar" type="Top banner" desc="Above nav. Yellow (#F5B300) background, black text. Content from theme settings. Dismissible via × (session cookie). Scrolls away on desktop, fixed on mobile." why="Persistent promo/delivery message. Dismissible avoids annoyance on repeat visits. Cookie dismissal persists for session." />

      <Text style={s.h4}>QA Checklist — Navigation</Text>
      <Text style={s.qaCategory}>Desktop</Text>
      <QA text="Nav hides when scrolling down, reappears immediately on scroll up" />
      <QA text="Active page link is bold and underlined" />
      <QA text="Cart badge shows correct item count; hidden when count is 0" />
      <QA text="Search bar opens below nav on search icon click; input is auto-focused" />
      <QA text="Search returns product results; Enter navigates to search results page" />
      <Text style={s.qaCategory}>Mobile (test on real device, not just DevTools)</Text>
      <QA text="Hamburger icon visible at ≤768px; hidden at >768px" />
      <QA text="Mobile nav drawer opens fully and shows all navigation links" />
      <QA text="Mobile nav closes on overlay tap and swipe left" />
      <QA text="Nav never hides on mobile — always visible" />
      <QA text="Announcement bar × button dismisses; does not reappear in same session" />
      <Text style={s.qaCategory}>Accessibility</Text>
      <QA text="Nav links are reachable by keyboard (Tab key)" />
      <QA text="Cart drawer can be closed with Escape key" />
      <QA text="Mobile nav drawer can be closed with Escape key" />
      <QA text="Focus returns to trigger element after closing drawer/search" />
    </DocPage>

    {/* ══ SECTION G3: ERROR / EMPTY / LOADING STATES ══ */}
    <DocPage title="G3 — Error, Empty & Loading States" pageNum="21">
      <Text style={s.sectionLabel}>States Documentation</Text>
      <Text style={s.h1}>Error, Empty & Loading States</Text>
      <Text style={s.p}>Every surface that can be empty, loading, or in error must have an explicit UI state. These are not edge cases — they are the first thing a new customer often sees (empty cart, loading page, payment failure). Every state below must be tested before launch.</Text>

      <Text style={s.h3}>Empty States</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Surface</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Empty State UI</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>CTA</Text>
        </View>
        {[
          ["Cart (cart page)", "Large icon + 'Your cart is empty' + subtext: 'Add some meals to get started'", "'Browse Ready Series →' (#F5B300)"],
          ["Cart drawer", "Centred text: 'Your cart is empty'. No icon needed.", "'Browse meals →' link"],
          ["Search results", "'No meals found for [query]' + spelling suggestion if possible", "'See all meals →' link"],
          ["Order history", "'No orders yet'. Show for new customers.", "'Start shopping →' (#F5B300)"],
          ["Collection (after filter)", "'No meals match this filter'. Show when category has 0 results.", "Clear filters link"],
          ["Wallet earn history", "'No transactions yet. Earn points on your first order!'", "Link to Ready Series"],
          ["Account — no subscription", "Show 'Start a plan' prompt in place of plan cards", "Links to MP and Box Sub pages"],
          ["Wishlist / saved", "Not implemented in v1 — omit from nav. Do not show empty wishlist page.", "N/A"],
        ].map(([s2, e, c], i) => <TRow key={s2} cells={[s2, e, c]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Loading States</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Operation</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Loading UI</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Max wait before error</Text>
        </View>
        {[
          ["Page load (any page)", "Shopify default skeleton / browser load bar. No custom loader required.", "5 seconds"],
          ["Quick-add to cart", "Button text → spinner (CSS border-radius animation). Button disabled during.", "3 seconds"],
          ["Cart qty update", "Row dims to 70% opacity during update. Spinner on qty field.", "3 seconds"],
          ["Meal swap (account)", "Full swap modal shows spinner overlay during API call.", "5 seconds"],
          ["Pause subscription", "Confirm button shows spinner. Cannot re-click.", "5 seconds"],
          ["Search results", "Skeleton rows (grey animated bars) below search input during query.", "2 seconds"],
          ["Product image gallery", "Image placeholder (grey background) while next image loads.", "Immediate on click"],
          ["Checkout redirect", "Button text → 'Redirecting to checkout…'. Disabled.", "8 seconds"],
        ].map(([op, ui, max], i) => <TRow key={op} cells={[op, ui, max]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Error States</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Error scenario</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>UI message</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Recovery action</Text>
        </View>
        {[
          ["Add to cart fails (API error)", "'Something went wrong. Please try again.' (inline, below button)", "Retry button — re-enables add"],
          ["Payment declined", "Shopify native: 'Your card was declined. Please try another card.'", "Return to payment step"],
          ["Promo code invalid", "'Invalid or expired code' inline below code field", "Clear field, allow retry"],
          ["Meal swap fails (post cutoff)", "'Swap window has closed for this week. Next swap opens [date].'", "Dismiss. Show next open date."],
          ["Subscription pause fails", "'We couldn't pause your plan. Please try again or contact support.'", "Retry + support link"],
          ["Login fails", "'Incorrect email or password.' Inline below form.", "Try again / forgot password link"],
          ["Form: required field empty", "Red border on field + '[Field] is required' below field.", "Focus returns to field"],
          ["404 page not found", "Custom 404 page with Performance Meals branding + nav + 'Let's find you a meal' CTA.", "Link to Ready Series"],
          ["Shopify server error (500)", "Shopify default 500 page — ensure brand logo appears via checkout settings.", "Retry / contact support"],
          ["Cart cleared (session expired)", "Cart resets to empty — show empty cart state with 'Your session expired' note.", "'Start shopping again →'"],
        ].map(([e, m, r], i) => <TRow key={e} cells={[e, m, r]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h4}>QA Checklist — States</Text>
      <Text style={s.qaCategory}>Empty states</Text>
      <QA text="Empty cart page shows correct empty state with CTA — not a blank page" />
      <QA text="Empty cart drawer shows 'Your cart is empty' — not an unstyled empty list" />
      <QA text="Zero-results search shows helpful message and link — not a blank results area" />
      <QA text="New customer account shows 'no orders' and 'no subscription' states — not empty whitespace" />
      <Text style={s.qaCategory}>Loading states</Text>
      <QA text="Quick-add button shows spinner and disables during API call — cannot double-add" />
      <QA text="Meal swap modal shows spinner while update is in flight" />
      <QA text="Search skeleton rows appear immediately after typing — not a blank area" />
      <Text style={s.qaCategory}>Error states</Text>
      <QA text="Test add-to-cart with network throttled to 'Offline' — error message appears, not a broken button" />
      <QA text="Test declined card (use Stripe test card 4000 0000 0000 0002) — Shopify shows decline message" />
      <QA text="Expired promo code shows inline error — not a browser alert box" />
      <QA text="Custom 404 page is live and branded — visit /does-not-exist to confirm" />
    </DocPage>

    {/* ══ SECTION G4: TEST ENVIRONMENT ══ */}
    <DocPage title="G4 — Test Environment & Credentials" pageNum="22">
      <Text style={s.sectionLabel}>Testing Reference</Text>
      <Text style={s.h1}>Test Environment & Credentials</Text>
      <Text style={s.p}>All QA must be performed in the Shopify development store (staging environment) before the theme is published to production. Never run payment tests on the production store.</Text>

      <View style={s.calloutRed}>
        <Text style={[s.calloutTitle, { color: "#B91C1C" }]}>Security Notice</Text>
        <Text style={s.calloutText}>Do not share actual staging credentials in this document. The table below shows the structure — fill in real values in a separate secure handoff (e.g. 1Password shared vault, Bitwarden, or secure Notion page shared only with the developer and Jerome).</Text>
      </View>

      <Text style={s.h3}>Environment URLs</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Environment</Text>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>URL</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Purpose</Text>
        </View>
        {[
          ["Development store", "[store-name].myshopify.com (password protected)", "Theme dev & QA testing"],
          ["Staging preview", "Preview theme URL from Shopify theme editor", "Client review before publish"],
          ["Production", "performancemeals.com.sg (after DNS switch)", "Live store — do not test payments here"],
          ["Recharge sandbox", "Provided by Recharge support on account setup", "Subscription flow testing"],
          ["React prototype", "Figma Make preview URL (internal)", "UX reference only — not production code"],
        ].map(([env, url, purpose], i) => <TRow key={env} cells={[env, url, purpose]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Test Payment Cards (Shopify Bogus Gateway / Stripe Test)</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Card number</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Expiry</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>CVV</Text>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Result</Text>
        </View>
        {[
          ["4242 4242 4242 4242", "Any future", "Any 3", "Payment succeeds"],
          ["4000 0000 0000 0002", "Any future", "Any 3", "Payment declined — use to test decline UI"],
          ["4000 0025 0000 3155", "Any future", "Any 3", "3D Secure authentication required"],
          ["Shopify Bogus: 1", "Any future", "Any 3", "Payment succeeds (Bogus Gateway)"],
          ["Shopify Bogus: 2", "Any future", "Any 3", "Payment fails (Bogus Gateway)"],
        ].map(([card, exp, cvv, result], i) => <TRow key={card} cells={[card, exp, cvv, result]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Promo Codes (Test in Development Store)</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Code</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Discount</Text>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Conditions</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Expected result</Text>
        </View>
        {[
          ["PMFIRST10", "10% off", "First order only. Registered customers.", "10% discount applied at cart"],
          ["TESTCODE", "Create a $5 off test code in Shopify", "No restrictions. QA use only.", "Delete after QA complete"],
          ["EXPIRED2024", "Create expired code", "Expiry date in the past", "Error: 'Invalid or expired code'"],
        ].map(([code, disc, cond, result], i) => <TRow key={code} cells={[code, disc, cond, result]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Test Customer Accounts</Text>
      <View style={s.calloutBlue}>
        <Text style={[s.calloutTitle, { color: "#1D4ED8" }]}>Create these test accounts in the development store</Text>
        <Text style={s.calloutText}>{"1. Guest account — test all guest checkout flows\n2. New customer (no orders) — test empty states\n3. Active Meal Plan customer — test account dashboard, swap, pause\n4. Active Box Sub customer — test Box Sub management\n5. Lapsed customer (cancelled subscription) — test re-subscription flow\n6. Customer with wallet balance — test wallet credit at checkout\n7. Customer with loyalty points at redemption threshold — test voucher redemption"}</Text>
      </View>

      <Text style={s.h3}>Recharge Test Scenarios</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Scenario</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>How to test</Text>
        </View>
        {[
          ["Create Meal Plan subscription", "Complete wizard flow with test customer + test card"],
          ["Pause subscription", "Account → My Plan → PAUSE → select 2 weeks → confirm. Check Recharge admin for pause date."],
          ["Resume after pause", "Set pause end date to yesterday in Recharge sandbox. Confirm subscription auto-resumes."],
          ["Cancel subscription", "Account → My Plan → Cancel → complete 2-step. Confirm cancelled in Recharge admin."],
          ["Weekly billing", "Advance Recharge test clock to trigger next billing. Confirm charge + order created."],
          ["Renewal reminder webhook", "Trigger upcoming_charge webhook manually from Recharge sandbox. Confirm banner appears in account."],
        ].map(([scenario, how], i) => <TRow key={scenario} cells={[scenario, how]} alt={i % 2 === 1} />)}
      </View>
    </DocPage>

    {/* ══ SECTION G5: BROWSER & DEVICE SUPPORT ══ */}
    <DocPage title="G5 — Browser & Device Support" pageNum="23">
      <Text style={s.sectionLabel}>Compatibility</Text>
      <Text style={s.h1}>Browser & Device Support Matrix</Text>

      <Text style={s.h3}>Desktop Browsers — Required Support</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Browser</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Min version</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Priority</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Notes</Text>
        </View>
        {[
          ["Chrome", "110+", "P1 — Critical", "Primary browser for SG market. Test all features here first."],
          ["Safari (macOS)", "16+", "P1 — Critical", "Large SG share via MacBook. Test CSS transitions carefully."],
          ["Firefox", "110+", "P2 — Required", "Smaller share but significant. Confirm flex/grid layout."],
          ["Edge (Chromium)", "110+", "P2 — Required", "Chromium-based — usually matches Chrome. Test scrollbar CSS."],
          ["Safari (older)", "14–15", "P3 — Best effort", "CSS custom properties and gap in flex may need fallbacks."],
          ["IE 11", "N/A", "Not supported", "Do not test. Shopify itself dropped IE11 support."],
        ].map(([b, v, p, n], i) => <TRow key={b} cells={[b, v, p, n]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Mobile Devices — Required Support</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Device / OS</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Min version</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Priority</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Key test</Text>
        </View>
        {[
          ["iPhone (Safari iOS)", "iOS 15+", "P1 — Critical", "Touch targets, fixed nav, safe-area insets, cart drawer swipe."],
          ["iPhone SE (375px)", "iOS 15+", "P1 — Critical", "Smallest supported width. All content must be visible."],
          ["iPhone 14/15 (390px)", "iOS 16+", "P1 — Critical", "Most common SG iPhone size."],
          ["Android (Chrome)", "Android 10+", "P1 — Critical", "Confirm touch events, keyboard behaviour on forms."],
          ["Samsung Galaxy", "One UI 4+", "P2 — Required", "Samsung Internet browser sometimes differs from Chrome."],
          ["iPad (Safari)", "iPadOS 15+", "P2 — Required", "Test tablet layout — should show desktop nav, wider grid."],
        ].map(([d, v, p, k], i) => <TRow key={d} cells={[d, v, p, k]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Breakpoints</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Breakpoint</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Width</Text>
          <Text style={[s.tableHeaderCell, { flex: 1.5 }]}>Layout changes</Text>
        </View>
        {[
          ["Mobile", "< 768px", "Single column. Mobile nav. Stacked Two Paths. Full-width CTA buttons."],
          ["Tablet", "768px – 1023px", "2-column grids. Desktop nav. Wizard steps may stack."],
          ["Desktop", "1024px – 1439px", "Full layout. Desktop nav. 3–4 column product grids."],
          ["Wide desktop", "≥ 1440px", "Max-width container (1440px) centred. No further layout changes."],
        ].map(([bp, w, l], i) => <TRow key={bp} cells={[bp, w, l]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h4}>QA Checklist — Compatibility</Text>
      <QA text="Chrome desktop: run full purchase flow (RS + Meal Plan + Box Sub)" />
      <QA text="Safari macOS: check CSS transitions, sticky nav, and cart drawer animation" />
      <QA text="iPhone 14 (real device): complete add-to-cart + checkout on mobile Safari" />
      <QA text="iPhone SE (375px): confirm no horizontal scroll on any page" />
      <QA text="Android Chrome: confirm cart drawer swipe-to-close works" />
      <QA text="iPad: confirm desktop nav is shown, not mobile hamburger" />
      <QA text="Samsung Internet: confirm basic layout renders (no CSS grid collapse)" />
    </DocPage>

    {/* ══ SECTION G6: KNOWN LIMITATIONS ══ */}
    <DocPage title="G6 — Known Limitations & Prototype vs Production" pageNum="24">
      <Text style={s.sectionLabel}>Scope Clarity</Text>
      <Text style={s.h1}>Known Limitations &{"\n"}Prototype vs. Production</Text>
      <Text style={s.p}>This section is critical for Jerome and the developer. It documents what the React prototype demonstrates vs. what requires additional development to function in the live Shopify store. Nothing here is a bug — these are known scope items.</Text>

      <View style={s.calloutRed}>
        <Text style={[s.calloutTitle, { color: "#B91C1C" }]}>Important — Read Before Signing Off</Text>
        <Text style={s.calloutText}>The React prototype (accessible via the Figma Make preview) is a UX demonstration tool. It shows exactly how the customer experience should look and behave. The Shopify theme (downloadable from prototype footer) is the production-ready implementation. Some features visible in the prototype require custom Shopify app development beyond the theme — these are listed below.</Text>
      </View>

      <Text style={s.h3}>Features Requiring Custom App Development</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Feature</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>In prototype?</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>In theme?</Text>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>What's needed</Text>
        </View>
        {[
          ["Meal swap system", "Yes (simulated)", "UI only", "Custom app: API to update Recharge order line item before cutoff"],
          ["Weekly menu publishing", "Yes (hardcoded)", "Not included", "Admin tool to publish weekly menus by plan type; drives swap modal content"],
          ["Plan week counter", "Yes (hardcoded at W13)", "Not included", "Custom logic: Recharge webhook increments plan week on each delivery"],
          ["Swap cutoff enforcement", "Yes (UI only)", "UI only", "Backend must reject swap API calls after Thursday 1pm — UI alone is not sufficient"],
          ["Renewal reminder banner", "Yes (simulated)", "Not included", "Recharge upcoming_charge webhook → custom app → Shopify customer metafield → theme reads and displays banner"],
          ["Wallet credit balance", "Yes (hardcoded $24.50)", "Not included", "Loyalty app API → display balance in account; apply at checkout via Shopify discount API"],
          ["Points earn tracking", "Yes (simulated)", "Not included", "Loyalty app (Smile.io) handles automatically on purchase — configure earn rates in app admin"],
        ].map(([f, p, t, w], i) => <TRow key={f} cells={[f, p, t, w]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Features in Theme (Production-Ready)</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Feature</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.5 }]}>Status</Text>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Notes</Text>
        </View>
        {[
          ["Full brand design (nav, all pages, footer)", "✓ Complete", "All layouts, colours, typography, spacing implemented"],
          ["Product grid with macro display", "✓ Complete", "Reads from pm.* metafields — just add products to Shopify"],
          ["AJAX add-to-cart + cart drawer", "✓ Complete", "Full AJAX implementation in theme.js"],
          ["Category filter tabs (collection)", "✓ Complete", "Uses Shopify collection filter API"],
          ["Product page tabs (ingredients/heating/allergens)", "✓ Complete", "Reads from pm.* metafields"],
          ["Cart page with promo code + delivery bar", "✓ Complete", "All cart page functionality implemented in cart.liquid"],
          ["Scroll reveal animations", "✓ Complete", "IntersectionObserver in theme.js"],
          ["Animated stat counters", "✓ Complete", "data-target attribute + counter script"],
          ["Mobile nav with swipe to close", "✓ Complete", "Touch events in theme.js"],
          ["Sticky header with scroll hide/reveal", "✓ Complete", "Scroll direction detector in theme.js"],
          ["Two Paths hover-expand panel", "✓ Complete", "Pure CSS flex transition in theme.css"],
          ["Announcement bar dismiss", "✓ Complete", "sessionStorage-based dismiss in theme.js"],
        ].map(([f, status, notes], i) => <TRow key={f} cells={[f, status, notes]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Development Effort Estimate for Custom App Items</Text>
      <View style={s.calloutBlue}>
        <Text style={[s.calloutTitle, { color: "#1D4ED8" }]}>For Jerome — Budget Guidance</Text>
        <Text style={s.calloutText}>The items below require bespoke development beyond theme installation. These are estimates for planning — get firm quotes from your developer:{"\n\n"}• Meal swap API + cutoff enforcement: ~20–30 dev hours{"\n"}• Weekly menu admin tool: ~15–20 dev hours{"\n"}• Plan week tracking + renewal reminder: ~10–15 dev hours{"\n"}• Wallet/loyalty display in account: ~5–10 dev hours (if using Smile.io){"\n\n"}Total estimated custom app work: 50–75 hours. This is in addition to theme setup (estimated 8–12 hours).</Text>
      </View>
    </DocPage>

    {/* ══ SECTION G7: POST-LAUNCH MONITORING ══ */}
    <DocPage title="G7 — Post-Launch Monitoring" pageNum="25">
      <Text style={s.sectionLabel}>Go-Live & Monitoring</Text>
      <Text style={s.h1}>Post-Launch Monitoring Checklist</Text>
      <Text style={s.p}>After publishing the theme to production, monitor the following for the first 7 days. Most issues surface within the first 48 hours of real customer traffic.</Text>

      <Text style={s.h3}>Day 0 — Go-Live Checklist (Do Before Publishing)</Text>
      <Text style={s.qaCategory}>DNS & domain</Text>
      <QA text="Custom domain (performancemeals.com.sg) pointed to Shopify — TTL propagated" />
      <QA text="SSL certificate active — HTTPS padlock visible in all browsers" />
      <QA text="www redirect → non-www (or vice versa) configured in Shopify domain settings" />
      <Text style={s.qaCategory}>Analytics & tracking</Text>
      <QA text="Google Analytics 4 connected — real-time report shows live sessions after publish" />
      <QA text="Google Search Console property verified" />
      <QA text="Facebook Pixel (if required) firing on page view and purchase events" />
      <QA text="Shopify Analytics: test purchase appears in order count" />
      <Text style={s.qaCategory}>Email</Text>
      <QA text="Order confirmation email sent to real email — check formatting on mobile" />
      <QA text="Gift card email sent correctly" />
      <QA text="Abandoned cart email (if configured) fires after 1 hour" />
      <QA text="Recharge subscription email notifications configured and tested" />

      <Text style={s.h3}>Week 1 — Daily Monitoring</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Check</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Tool</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.6 }]}>Alert threshold</Text>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Action if triggered</Text>
        </View>
        {[
          ["Add-to-cart success rate", "Shopify Analytics + GA4", "< 85%", "Check browser console for JS errors; review AJAX error logs"],
          ["Checkout completion rate", "Shopify Analytics", "< 60%", "Check payment gateway; confirm promo codes working"],
          ["Page load speed", "Google PageSpeed / Shopify Analytics", "> 4s average", "Check image sizes; confirm lazy loading; review third-party app scripts"],
          ["JavaScript errors", "Browser console / Sentry (if installed)", "Any new errors", "Review theme.js; check third-party app conflicts"],
          ["Subscription creation", "Recharge dashboard", "Any failed subscriptions", "Check Recharge webhook logs; confirm payment gateway"],
          ["Support ticket volume", "Email / Gorgias / Zendesk", "> 5 tickets/day on same topic", "Indicates UI confusion — prioritise fix or clarify copy"],
          ["404 errors", "Google Search Console", "Any new 404s", "Add redirects in Shopify for any broken links"],
          ["Mobile add-to-cart", "GA4 device segment", "Mobile < desktop by > 30%", "Test on real mobile device; check touch target sizes"],
        ].map(([c, tool, thresh, action], i) => <TRow key={c} cells={[c, tool, thresh, action]} alt={i % 2 === 1} />)}
      </View>

      <Text style={s.h3}>Thursday 1pm Cutoff — Weekly Operations Check</Text>
      <View style={s.calloutRed}>
        <Text style={[s.calloutTitle, { color: "#B91C1C" }]}>Every Thursday — Operations must verify</Text>
        <Text style={s.calloutText}>{"1. Swap cutoff enforcement is working — test by attempting a swap after 1pm Thursday (should fail)\n2. Packing slip generation working for all orders due that week\n3. Recharge order list exported for packing team\n4. Any swap requests submitted before cutoff are reflected in the correct order\n5. Next week's menu published (if using weekly menu admin tool) before Friday delivery cycle begins"}</Text>
      </View>

      <Text style={s.h3}>Escalation Contacts</Text>
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { flex: 0.7 }]}>Issue type</Text>
          <Text style={[s.tableHeaderCell, { flex: 1 }]}>Contact</Text>
          <Text style={[s.tableHeaderCell, { flex: 0.8 }]}>Response SLA</Text>
        </View>
        {[
          ["Shopify store down / payment failing", "Shopify Support: help.shopify.com → Live Chat", "24/7 — < 2 hours"],
          ["Recharge subscription issue", "Recharge Support: support.rechargepayments.com", "Business hours — < 4 hours"],
          ["Smile.io loyalty issue", "Smile.io Support: smile.io/help", "Business hours — < 8 hours"],
          ["Theme bug (Shopify template)", "Your Shopify developer (theme builder)", "As agreed in contract"],
          ["Custom app bug (swap/menu/plan week)", "Your custom app developer", "As agreed in contract"],
          ["DNS / domain issue", "Domain registrar support", "Varies — escalate immediately if site is down"],
        ].map(([issue, contact, sla], i) => <TRow key={issue} cells={[issue, contact, sla]} alt={i % 2 === 1} />)}
      </View>
    </DocPage>

    {/* ══ SECTION H: MASTER QA SIGN-OFF ══ */}
    <DocPage title="H — Master QA Sign-off Checklist" pageNum="26">
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
