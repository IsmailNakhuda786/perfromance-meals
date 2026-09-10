# Brand Compliance Audit & Fix Plan

## Context

A full automated audit of every page file against the Performance Meals Brand Template PDF was run. While previous sessions fixed the most visible issues, the audit revealed a second tier of violations still present across multiple pages. This plan fixes every remaining violation so the codebase fully matches the PDF's colour, typography, layout, copy, and programme-naming requirements.

---

## Outstanding Violations (16 categories)

### 1. `font-black` (weight 900) — PDF ceiling is font-extrabold (800)
Used in:
- `Nav.tsx` L143, L210 — Sign Up buttons (both desktop and mobile)
- `HomePage.tsx` L99, L148, L336 — "STOCK UP NOW", "CHOOSE YOUR GOAL", "Ready Series" label
- `ReadySeriesPage.tsx` L147, 150, 155, 169, 202, 243, 287, 354, 357, 375, 411, 417 — 12 instances across hero stats, section headings, price labels, Add buttons, cart bar
- `ReadySeriesProductPage.tsx` L308, 454, 528 — Add to Cart button, reviewer avatar, SHOP ALL button
- `MealPlanWizardPage.tsx` L217 — "SAVE 15%" badge

**Fix:** Global search-and-replace `font-black` → `font-extrabold` across all affected files.

---

### 2. `#F2C94C` off-brand yellow used as primary colour in GiftCardPage
`GiftCardPage.tsx` L92, 150, 202, 259, 278 — used as primary CTA, selected-state border, accent throughout.

**Fix:** Replace all `#F2C94C` with `#F5B300` (Performance Yellow).

---

### 3. Remaining shadow violations
- `Nav.tsx` L417 — `shadow-2xl` on logout toast
- `ConfirmationPage.tsx` L209 — `shadow-2xl` on sign-up modal
- `AccountPage.tsx` L183 — `shadow-xl` on save-confirmation toast
- `GiftCardPage.tsx` L150 — `shadow-md` on amount selector cards
- `ReadyToGoPage.tsx` L155 — `shadow-lg` on per-card quantity badge

**Fix:** Remove shadow class from each element; replace with `border border-white/10` or `border border-[#E8E4DC]` as appropriate.

---

### 4. `rounded-t-2xl` on MealPlanWizardPage bottom-sheet drawer
`MealPlanWizardPage.tsx` L617 — meal picker bottom sheet.

**Fix:** Remove `rounded-t-2xl`.

---

### 5. Wrong colour on MealPlanLandingPage CTA button
`MealPlanLandingPage.tsx` L246 — "Start Your Plan →" CTA uses `#F5B300` (Ready-Series yellow). All Meal Plan CTAs must use `#E85D04`.

**Fix:** Change `#F5B300` → `#E85D04` on that button.

---

### 6. `#E85D04` used on AboutPage CTA
`AboutPage.tsx` L159 — "Start Meal Plan →" CTA uses orange. AboutPage is a parent brand page, not a Meal Plan page.

**Fix:** Change to `#F5B300` (parent brand yellow) or `#1A1A1A`.

---

### 7. BuildABoxPage hero headline not ALL CAPS
`BuildABoxPage.tsx` L65 — h1 is "Build-A-Box". This page is labelled "01 / Ready Series" — Ready-Series hero headlines must be ALL CAPS.

**Fix:** Change to "BUILD-A-BOX".

---

### 8. Off-brand green confirm state (#7EE8B0)
Used in:
- `ReadySeriesPage.tsx` L357 — "✓ Added" button state
- `ReadySeriesProductPage.tsx` L308 — "✓ ADDED TO CART" button state

**Fix:** Replace `bg-[#7EE8B0]` with `bg-white text-[#1A1A1A]` to stay within brand palette.

---

### 9. Off-brand colours in AccountPage
`AccountPage.tsx`:
- L219, 234: `bg-[#0D2818]` (dark green)
- L219, 237, 249, 573: `#F2C94C` (off-brand yellow)
- L221, 781: `#7EE8B0` (off-brand green)
- L222: `#A78BFA` (off-brand purple)

**Fix:** Replace all with closest approved colour: `#F2C94C` and `#7EE8B0` → `#F5B300`; `#A78BFA` → `#1A1A1A` or `#F5B300`; `#0D2818` → `#111111` (acceptable near-black for dark card bg).

---

### 10. Off-brand colours in ReadyToGoPage
`ReadyToGoPage.tsx` L170: `#F2C94C`, `#7EE8B0`, `#A78BFA` — category label colours.

**Fix:** Map to brand palette: use `#F5B300` for highlight states, `#1A1A1A` for dark labels, `white` for inverted.

---

### 11. Off-brand background colours (minor)
Multiple pages use `#FAF9F6`, `#F7F5F0`, `#0E0E0E`, `#0A0A0A` as background tints. These are close but not in the official 4-colour palette.

**Fix (pragmatic):** `#FAF9F6` and `#F7F5F0` are acceptable warm-white off-whites used consistently as off-white page backgrounds — retain these as the PDF itself uses near-white sections. `#0E0E0E` and `#0A0A0A` on BuildABoxPage and ReadyToGoPage should be replaced with `#1A1A1A`.

---

### 12. PDF Programme Names — Meal Plan Wizard
The PDF (p.48) names three specific programmes for the Meal Plan ordering flow:
- **6by60** — "Fresh structure for your goal. 60-day programme."
- **Buddy Plan** — "Consistent meals for your week. 20-day programme."
- **HYROX** — mentioned as a goal option

Currently the wizard uses "CUT", "MAINTAIN", "BUILD" as goal labels. These need to be renamed/relabelled to match the PDF's named programme architecture.

**Fix:** Update `MealPlanWizardPage.tsx` Step 2 goal cards to display programme names (6by60, Buddy Plan, HYROX) as the primary labels, with the goal descriptor (e.g., "Cut", "Maintain", "Build") as a secondary tag.

---

### 13. `#111` / `#111111` instead of `#1A1A1A`
Multiple files use shorthand `#111` or `#111111` instead of the brand charcoal `#1A1A1A`. These render slightly darker. Not a hard violation but should be unified.

**Fix:** Replace `#111` and `#111111` with `#1A1A1A` throughout all page files.

---

## Files to Modify

| File | Changes |
|---|---|
| `src/components/Nav.tsx` | font-black → font-extrabold; remove shadow-2xl from toast |
| `src/pages/HomePage.tsx` | font-black → font-extrabold on 3 CTAs |
| `src/pages/ReadySeriesPage.tsx` | font-black → font-extrabold (12 instances); #7EE8B0 → white |
| `src/pages/ReadySeriesProductPage.tsx` | font-black → font-extrabold (3 instances); #7EE8B0 → white |
| `src/pages/ReadyToGoPage.tsx` | #F2C94C/#7EE8B0/#A78BFA → brand colours; remove shadow-lg; #0E0E0E → #1A1A1A |
| `src/pages/MealPlanLandingPage.tsx` | #F5B300 → #E85D04 on "Start Your Plan" CTA |
| `src/pages/MealPlanWizardPage.tsx` | font-black → font-extrabold; remove rounded-t-2xl; rename CUT/MAINTAIN/BUILD to 6by60/Buddy Plan/HYROX; fix off-brand amber colours |
| `src/pages/AboutPage.tsx` | #E85D04 → #F5B300 on "Start Meal Plan" CTA |
| `src/pages/BuildABoxPage.tsx` | h1 "Build-A-Box" → "BUILD-A-BOX"; #0E0E0E/#111111 → #1A1A1A |
| `src/pages/AccountPage.tsx` | Replace #F2C94C, #7EE8B0, #A78BFA, #0D2818 with brand colours; remove shadow-xl from toast |
| `src/pages/GiftCardPage.tsx` | #F2C94C → #F5B300 throughout; remove shadow-md |
| `src/pages/ConfirmationPage.tsx` | Remove shadow-2xl from sign-up modal; #0E0E0E → #1A1A1A |

---

## Approach

Each file will use targeted search-and-replace. No structural changes — only colour values, font-weight classes, shadow classes, and border-radius classes.

The MealPlanWizardPage programme names (6by60/Buddy Plan/HYROX) will be updated in the goal-selection step only — the existing CUT/MAINTAIN/BUILD logic driving meal selection is retained; only the display labels and descriptions change.

---

## Verification

1. After each file is edited, run `npx tsc --noEmit` to confirm no type errors introduced.
2. Open the app in the preview panel and check:
   - ReadySeriesPage — no yellow-green "Added" button states; all headings max weight is extrabold
   - MealPlanLandingPage — "Start Your Plan" button is orange, not yellow
   - GiftCardPage — all primary CTAs are `#F5B300`
   - MealPlanWizardPage — Step 2 shows 6by60, Buddy Plan, HYROX cards
   - Nav — Sign Up button is extrabold
   - AccountPage / ConfirmationPage — no box shadows on toasts/modals
