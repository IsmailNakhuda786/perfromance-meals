# Context

PDF brand template has been fully read. Three fixes needed:
1. **Logos.tsx** — logos need to match PDF's athletic/sports visual style more closely
2. **HomePage.tsx** — wrong hero panel colours + missing hover animations the user liked
3. **Copy** — minor wording updates from PDF's approved hero message list

---

## 1. Logo fixes — `src/components/Logos.tsx`

The PDF (p.17 Logo Variations) shows three distinct logo treatments:

**PerformanceMealsLogo** — currently close. Keep: yellow circle, "PERFORMANCE" spaced, thin yellow line, "MEALS" small. ✅ No change needed.

**MealPlanLogo** — currently close but needs weight. PDF shows:
- "PERFORMANCE MEALS" micro-label in small spaced caps above the bar (correct)
- Orange left vertical bar (correct)
- "MEAL PLAN" in very heavy (900), wide italic — almost sports/athletic in feel
- Orange brushstroke underline (correct)
- Increase font size of "MEAL PLAN" and make more impactful

**ReadySeriesLogo** — needs most fixing. PDF shows:
- Large yellow circle ✅
- "READY-SERIES" in italic ExtraBold (800), feels athletic and energetic — needs `fontStyle: "italic"`
- Thin yellow underline beneath "READY-SERIES" wordmark (currently missing)
- "by PERFORMANCE MEALS" small subscript (correct)

---

## 2. HomePage hero panels — `src/pages/HomePage.tsx`

**Critical finding from PDF:** The brand guide (p.30 Typography Side-by-Side, p.21 Ready-Series section header) is explicit:
- **Ready-Series panel = DARK charcoal `#1A1A1A` background**, white text, yellow accents — "Bold, Immediate, Energetic"
- **Meal Plan panel = WHITE background**, charcoal text, orange accents — "Refined, Confident, Considered"

Current implementation has both panels on light cream — wrong per PDF, and the user doesn't like it.

**Fix:** Split hero:
- LEFT = Ready-Series: `bg-[#1A1A1A]` with white text, yellow CTA, "READY FOR REAL LIFE." in Outfit 800 ALL CAPS
- RIGHT = Meal Plan: `bg-white` with charcoal text, orange top stripe, orange CTA, "Fresh structure. Personal support." in Outfit 600 sentence case

**Hover animation (user specifically requested this back):**
- On hover, each panel expands slightly (`flex-grow` transition or `scale` on inner content)
- Add a subtle overlay that reveals on hover with a coloured wash (yellow tint for Ready-Series, orange tint for Meal Plan)
- Or: each CTA button slides up/reveals on hover with a transform transition
- Recommended: CSS transition on panel width — hovering one panel expands it to ~60% while the other compresses to ~40%. Smooth 400ms ease-out.

**Rest of HomePage sections** stay on `#FAF9F6` / white alternating — that part is correct per brand guide.

---

## 3. Copy updates from PDF — `src/pages/HomePage.tsx`

From PDF's approved "Hero Message Variations" (p.28) and "Sample Marketing Materials":
- Ready-Series hero headline: `"READY FOR REAL LIFE."` (PDF-approved, energetic ALL CAPS)
- Ready-Series CTA: `"STOCK UP NOW"` ✅ already correct
- Ready-Series label: `"EVERYDAY MOMENTUM"` ✅ already correct
- Meal Plan hero headline: `"Fresh structure. Personal support."` ✅ already correct  
- Meal Plan CTA: `"CHOOSE YOUR GOAL"` ✅ already correct
- Meal Plan label: `"BOUTIQUE SUPPORT"` (PDF uses this — currently says "Boutique progress")

---

## Files to modify

- `src/components/Logos.tsx` — ReadySeriesLogo italic + yellow underline; MealPlanLogo weight/size tweak
- `src/pages/HomePage.tsx` — Ready-Series panel → dark, hover expand animation, copy fix

## Verification

Visual check in preview: hero should look like the PDF's p.30 side-by-side example — dark energetic Ready-Series left, clean white boutique Meal Plan right. Hover should expand the hovered panel. Logos should feel athletic and on-brand.
