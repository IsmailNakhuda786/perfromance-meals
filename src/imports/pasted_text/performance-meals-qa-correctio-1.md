PERFORMANCE MEALS CUSTOMER PROTOTYPE
VERSION 125 — SURGICAL QA CORRECTIONS ONLY

IMPORTANT:

Do NOT rebuild the prototype.
Do NOT redesign the site.
Do NOT create new screens.
Do NOT create design variations.
Do NOT change the existing overall visual language.

The main functionality is already implemented.

This is ONLY a surgical correction pass for issues found during final
visual/functional review of Version 125.

Preserve everything that is already correct.

==================================================
1. READY SERIES BUNDLE PRICING — FIX
==================================================

The predefined bundle cards currently can add a bundle to cart at $0.00.

This is incorrect.

All predefined Ready Series bundles must carry their actual predefined
price from the attached/previously supplied bundle spreadsheets.

When a predefined bundle is added to cart:

- it must NOT be $0.00
- cart subtotal must use the bundle's actual price
- delivery calculation must use the correct cart subtotal
- the bundle must remain a predefined product

Do NOT create a custom bundle-price calculator in the customer UI.

Use the supplied bundle spreadsheet/product data as the source.

Do not invent prices.

==================================================
2. REMOVE LEGACY BOX-PRICING LOGIC
==================================================

Remove all customer-visible legacy messaging/functionality referring to:

- "Add more meals to unlock box pricing"
- "5-meal box subscription"
- "Add X more meals"
- arbitrary meal-count box pricing
- Build-A-Box upsell
- Build-A-Box customer journey

These no longer belong in the current Ready Series customer flow.

Current Ready Series purchasing modes are:

1. Single Purchase
2. Bundle Purchase
3. Subscription

Bundles are predefined.

Subscriptions are predefined products.

Do NOT replace this with another configurable box builder.

Remove only the obsolete customer-facing UI/logic.

Preserve source code only where necessary for rollback/reference.

==================================================
3. CLEAN THE CUSTOMER FOOTER
==================================================

Remove obsolete customer-facing links:

- Cut Plan
- Maintain Plan
- Build Plan

Do not expose old internal prototype navigation.

Also hide from the normal customer-facing prototype:

- WIREFRAMES
- BLUEPRINT
- DEV HANDOFF
- SCREENS EXPORT
- QA PDF
- SHOPIFY THEME
- any other internal prototype/developer utility links

IMPORTANT:

Hide these from the customer-facing UI.

DO NOT delete their underlying code or routes.

==================================================
4. CURRENT BRAND HEADER — CLARIFY
==================================================

Keep the existing Current Brand dropdown structure.

Do NOT create a new navigation system.

Modify the trigger so it clearly communicates:

CURRENT BRAND
READY SERIES
▼

For Meal Plan:

CURRENT BRAND
MEAL PLAN
▼

For Parent:

CURRENT BRAND
PARENT
▼

Use Jerome's supplied reference as the visual reference.

The current tiny dot/caret-only trigger is too ambiguous.

Keep the existing dropdown contents:

- Performance Meals
- Meal Plan
- Ready Series

Clearly indicate the active brand.

Do NOT reintroduce repeated Ready Series / Meal Plans navigation.

==================================================
5. READY SERIES SINGLE PURCHASE CATEGORIES
==================================================

The currently visible product filtering contains categories such as:

- High Protein
- Low Carb
- High Carb
- Breakfast

The latest approved Ready Series category structure supplied by Jerome is:

OVERVIEW / A-LA-CARTE

MEALS
- Low Carb
- High Carb

JUST PROTEIN

Align the customer-facing primary category/navigation structure with this
latest requirement.

Do not invent additional top-level categories.

Preserve individual products that already exist.

The goal is clearer discovery, not a complete redesign of the product grid.

==================================================
6. DELIVERY THRESHOLD — DO NOT APPLY TO SUBSCRIPTIONS
==================================================

Jerome specified the following under Ready Series SINGLE PURCHASE and
BUNDLE PURCHASE:

- $120 and above = Free delivery
- Below $120 = $10 delivery

Do not automatically apply this rule to Ready Series subscriptions unless
explicitly stated in the approved requirements.

Therefore:

SINGLE PURCHASE:
→ show the $120 / $10 delivery rule.

BUNDLES:
→ show the $120 / $10 delivery rule.

SUBSCRIPTIONS:
→ do not show the single/bundle free-delivery threshold or "You qualify
   for free delivery" messaging unless the subscription requirements
   explicitly define it.

Remove misleading threshold messaging from subscription-only views.

==================================================
7. READY SERIES PURCHASE MODE TABS
==================================================

Keep the current three modes:

Single Purchase
Bundles
Subscription

These are useful and should remain.

Ensure the labels make the distinction immediately clear:

Single Purchase
Individual meals

Bundles
Predefined packs

Subscription
3 or 6 months

Do not replace these with a configurator.

==================================================
8. SUBSCRIPTION — PRESERVE CURRENT CORRECT IMPLEMENTATION
==================================================

Preserve the current Version 125 subscription structure:

- 10 predefined subscription options
- 3 months
- 6 months
- exact SKUs
- exact supplied prices
- actual item counts
- renewal after selected term

Do NOT convert subscriptions into a dynamic configurator.

Do NOT change the supplied prices.

==================================================
9. DESIGN / FRICTIONLESS UX
==================================================

Do not redesign the website.

Make only small clarity improvements where necessary.

Priorities:

- obvious primary actions
- readable hierarchy
- clear current-brand selector
- no duplicated navigation
- no legacy box-builder messaging
- visible bundle pricing
- no contradictory delivery messaging
- clean footer
- sufficient clickable/tappable area
- minimal unnecessary controls

The desired result is:

MORE CLEAR
MORE MODERN
LESS FRICTION

not:

MORE DECORATION
MORE SCREENS
MORE OPTIONS

==================================================
10. FINAL QA
==================================================

Before finishing, verify:

✓ No Ready Series bundle can enter the cart at $0.00.
✓ Bundle cards display/use their predefined pricing.
✓ No "unlock box pricing" message remains.
✓ No "5-meal box subscription" message remains.
✓ No Build-A-Box customer flow remains.
✓ Cut Plan / Maintain Plan / Build Plan are not customer-facing.
✓ Internal prototype/developer links are hidden from the customer view.
✓ Current Brand clearly says CURRENT BRAND + active brand.
✓ Dropdown still contains Performance Meals / Meal Plan / Ready Series.
✓ Ready Series categories follow the latest supplied hierarchy.
✓ $120 free-delivery messaging applies to single/bundle flows only.
✓ Subscription remains a predefined-product model.
✓ 3-month and 6-month subscription pricing remains unchanged.
✓ No duplicate pages were created.
✓ No existing correct flow was rebuilt.
✓ No new speculative functionality was introduced.

FINAL INSTRUCTION:

DO NOT PERFORM A REDESIGN.

FIX ONLY THE SPECIFIC ISSUES ABOVE.

PRESERVE THE CURRENT VERSION 125 WORK.