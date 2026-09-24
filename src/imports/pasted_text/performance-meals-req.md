PERFORMANCE MEALS
CUSTOMER PROTOTYPE — CONSOLIDATED REQUIREMENT UPDATE
FINAL CUSTOMER-FLOW RECONCILIATION

============================================================
IMPORTANT — READ BEFORE MAKING ANY CHANGES
============================================================

This is a CONSOLIDATED UPDATE to the EXISTING Performance Meals
customer prototype.

DO NOT rebuild the prototype.
DO NOT create a new Figma file.
DO NOT create duplicate screens.
DO NOT create alternative design concepts.
DO NOT create a new homepage variation.
DO NOT redesign unrelated pages.
DO NOT invent business rules.
DO NOT invent products, prices, SKUs, delivery rules or programme rules.

FIRST:
Inspect the EXISTING customer prototype.

THEN:
Compare it against the latest supplied requirements.

THEN:
Change ONLY what is now outdated, missing, contradictory, or explicitly
updated by the latest requirements.

The goal is to make ONE controlled correction pass.

After completing the changes:
STOP.
Do not make speculative improvements.

============================================================
SOURCE PRIORITY
============================================================

Use these sources in this order:

1. Jerome's latest written requirements in the supplied emails/messages.
2. Jerome's selected Option B for Ready Series subscription.
3. The attached subscription/product/bundle spreadsheets.
4. Jerome's screenshots showing the parent/sub-brand navigation.
5. Jerome's supplied Ready Series reference URL:
   http://34.23.135.100/ready-series/
   If the URL is inaccessible, use his supplied screenshots as the reference.
6. The existing approved Performance Meals customer prototype.
7. Earlier Phase A / Phase B decisions, EXCEPT where Jerome's latest
   requirements explicitly supersede them.

LATEST REQUIREMENT ALWAYS OVERRIDES OLDER PROTOTYPE ASSUMPTIONS.

============================================================
SECTION 1 — PRESERVE THE APPROVED FOUNDATION
============================================================

Preserve previously approved customer-side rules unless explicitly changed
below.

KEEP:

- Performance Meals as the parent brand.
- Meal Plan and Ready Series as distinct customer experiences.
- Meal Plan account requirement.
- No guest checkout for Meal Plan.
- Structured Meal Plan menu selection.
- No unrestricted Meal Plan box-building behaviour.
- Pause and Cancel remain separate.
- Pause duration remains 1 / 2 / 3 / 4 weeks.
- Internal design/reference routes must not be customer-facing.
- Parent brand must not expose Gift Cards / Rewards as primary parent-nav
  destinations unless already specifically approved elsewhere.

Do not regress previously corrected functionality.

============================================================
SECTION 2 — BRAND / HEADER / NAVIGATION
============================================================

Jerome's latest screenshots are the reference for the parent/sub-brand
relationship.

The customer should understand:

PERFORMANCE MEALS
→ PARENT BRAND

MEAL PLAN
→ SUBSIDIARY BRAND

READY SERIES
→ SUBSIDIARY BRAND

The main header must use a clear:

CURRENT BRAND

selector / dropdown.

Examples:

CURRENT BRAND — PARENT
CURRENT BRAND — MEAL PLAN
CURRENT BRAND — READY SERIES

The dropdown must allow the user to switch between:

- Performance Meals
- Meal Plan
- Ready Series

The dropdown may show:
- brand name
- short description
- active/current indicator

Match the hierarchy shown in Jerome's supplied screenshots.

KEEP the useful global actions already present:
- Performance Meals logo
- Our Brands
- About Us
- Account
- Cart

CRITICAL:

Do NOT reintroduce the old repeated Ready Series / Meal Plans
navigation that Jerome objected to.

Do NOT add two different navigation systems that repeat the same destinations.

The Current Brand dropdown is the primary brand-switching mechanism.

If a secondary navigation row duplicates the same brand destinations,
remove/hide that duplication.

Do not create a new navigation model beyond Jerome's reference.

============================================================
SECTION 3 — DESIGN DIRECTION
============================================================

Jerome's screenshots establish the latest visual direction.

The customer experience should feel:

- premium
- modern
- frictionless
- clean
- confident
- contemporary
- easy to scan

Use the current Performance Meals brand language already established in
the prototype and Jerome's reference.

Do not introduce a new unrelated visual identity.

Use:
- dark premium surfaces where already established
- restrained gold / warm accent treatment
- strong display typography
- clean supporting sans-serif typography
- restrained borders
- intentional whitespace
- clear visual hierarchy

MODERN / FRICTIONLESS IMPROVEMENTS ARE ALLOWED ONLY WHERE THEY REDUCE
CUSTOMER FRICTION.

Examples:

- fewer repeated navigation choices
- clearer CTA hierarchy
- less dead space before meaningful content
- easier scanning of product choices
- clear price visibility
- clear subscription-term visibility
- consistent card structure
- persistent cart access
- fewer unnecessary clicks
- clear next-step actions
- progressive disclosure for complex information

Do NOT turn this into a visual redesign exercise.

Do not create multiple design variants.

============================================================
SECTION 4 — READY SERIES MUST NOW HAVE THREE PURCHASE MODES
============================================================

Ready Series must be clearly structured into:

A. SINGLE PURCHASE
B. BUNDLE PURCHASE
C. SUBSCRIPTION

These are distinct purchase modes.

Do NOT merge them into one generic product/configuration experience.

The customer should be able to understand these three paths quickly
without seeing a cluttered header.

============================================================
SECTION 5 — READY SERIES SINGLE PURCHASE
============================================================

Single purchase is ordinary ecommerce.

Customer flow:

Ready Series
→ Browse
→ Select product
→ Add to cart
→ Checkout

Categories:

MEALS
- Low Carb
- High Carb

JUST PROTEIN

Do not create a custom configurator.

Do not make the customer build a product from multiple business rules.

Use the existing product-card and cart patterns wherever possible.

============================================================
SECTION 6 — READY SERIES BUNDLE PURCHASE
============================================================

Bundles are PREDEFINED products.

Do NOT create an unrestricted "build your own bundle" experience.

The customer-facing bundle structure is:

LOW CARB MEALS

1. Signature Flavours
   - Beef
   - Non-beef

2. Essential Top Up
   - Beef
   - Non-beef

3. 9 Flavours of the Month


HIGH CARB MEALS

1. Signature Flavours
   - Beef
   - Non-beef

2. Essential Top Up
   - Beef
   - Non-beef

3. 9 Flavours of the Month


JUST PROTEIN

Bundle of 10
- Beef
- Non-beef


MIXED BUNDLE

Low Carb
- Beef
- Non-beef

High Carb
- Beef
- Non-beef

============================================================
SECTION 7 — BUNDLE SPREADSHEETS ARE PRODUCT SOURCES, NOT CUSTOMER UI
============================================================

The attached bundle spreadsheets contain the actual product-definition
material.

Use the spreadsheets to determine:
- bundle composition
- meal counts
- SKUs / stock codes where supplied
- product names
- source pricing
- predefined bundle structure

IMPORTANT:

Do NOT expose the spreadsheet mechanics to the customer.

Do NOT show:
- Group dropdown
- Menu-builder rows
- Qty-entry grid
- Discount input controls
- internal bundle-builder calculations

Those are source/business configuration mechanics.

The customer should see a polished predefined bundle product.

Use the exact source product data wherever available.

Do NOT invent bundle prices.

Do NOT calculate a new promotional price if the source product already
provides the customer-facing price.

============================================================
SECTION 8 — READY SERIES SUBSCRIPTION
============================================================

CRITICAL UPDATE FROM JEROME:

READY SERIES SUBSCRIPTION USES 10 PREDEFINED SUBSCRIPTION OPTIONS.

JEROME CONFIRMED OPTION B:

THE CUSTOMER CHOOSES FROM PREDEFINED SUBSCRIPTION PRODUCTS.

DO NOT BUILD A STEP-BY-STEP SUBSCRIPTION CONFIGURATOR.

Do NOT ask the customer to construct:

term
→ product type
→ carb type
→ beef/non-beef
→ SKU

Instead:

Show the predefined subscription products.

The spreadsheet defines 10 subscription options.

These are:

1. Just protein (non beef)
   SKU: JPSUB01
   14 items

2. Just protein (Beef)
   SKU: JPSUB02
   14 items

3. Low carb meals (Nonbeef)
   SKU: LCSUB01
   10 items

4. Low carb meals (Beef)
   SKU: LCSUB02
   10 items

5. High carb meals (Nonbeef)
   SKU: HCSUB01
   10 items

6. High carb meals (Beef)
   SKU: HCSUB02
   10 items

7. Low carb 10 meals + 5 just protein (nonbeef)
   SKU: LCMIXSUB01
   15 items

8. Low carb 10 meals + 5 just protein (Beef)
   SKU: LCMIXSUB02
   15 items

9. High carb 10 meals + 5 just protein (nonbeef)
   SKU: HCMIXSUB01
   15 items

10. High carb 10 meals + 5 just protein (Beef)
    SKU: HCMIXSUB02
    15 items

Each predefined subscription option has:

3-month price
and
6-month price.

The source sheet currently defines:

JPSUB01 / JPSUB02
3 months: $252.90
6 months: $480.50

LCSUB01 / LCSUB02
3 months: $303.00
6 months: $575.70

HCSUB01 / HCSUB02
3 months: $303.00
6 months: $575.70

LCMIXSUB01 / LCMIXSUB02
3 months: $354.56
6 months: $693.90

HCMIXSUB01 / HCMIXSUB02
3 months: $354.56
6 months: $693.90

IMPORTANT:

These are 10 predefined product options with a 3-month / 6-month
term/pricing choice.

Do NOT create 20 independent product cards.

Use a simple, low-friction term selector such as:

[ 3 MONTHS ] [ 6 MONTHS ]

and show the applicable price for the selected term.

The term selector changes the price/term of the predefined subscription
product.

The product itself remains predefined.

============================================================
SECTION 9 — READY SERIES SUBSCRIPTION RENEWAL
============================================================

The subscription is billed again after the selected term:

3-month option
→ renewal after 3 months

6-month option
→ renewal after 6 months

Do not invent a weekly or fortnightly Ready Series subscription cadence.

Do not introduce arbitrary delivery frequencies.

============================================================
SECTION 10 — READY SERIES SUBSCRIPTION NOTIFICATIONS
============================================================

The documented subscription communication requirements include:

- Renewal reminder
- Delivery reminder
- Order confirmation

These are separate notification purposes.

Do not create a customer-facing notification center just for this.

Represent them naturally in:
- confirmation
- account/subscription information
- appropriate reminder/status content

============================================================
SECTION 11 — READY SERIES SUBSCRIPTION DELIVERY ORDER
============================================================

Jerome's requirement states:

Delivery Order for the registered 3 or 6 deliveries.

Do NOT invent additional delivery frequency mechanics.

The customer-facing prototype should communicate the subscription term
and relevant delivery information without creating an unsupported
delivery schedule.

============================================================
SECTION 12 — READY SERIES DELIVERY FEE
============================================================

For Ready Series single purchases and bundle purchases:

FREE DELIVERY:
$120 and above

DELIVERY FEE:
$10 below $120

Show this clearly at the appropriate cart stage.

Use the existing cart/checkout system.

Do not create new delivery configuration logic.

IMPORTANT:

Do not invent whether the threshold is measured before or after discounts
unless the existing approved product logic already specifies it.

Only communicate the confirmed business rule:
$120+ = free delivery
below $120 = $10 delivery fee.

============================================================
SECTION 13 — OLD BOX SUBSCRIPTION / BUILD-A-BOX FLOW
============================================================

CRITICAL:

The older prototype contains a Ready Series recurring-box / Box Subscription
concept and Build-A-Box behaviour.

Jerome's latest requirement supersedes that model.

DO NOT expose the older:
- 5 / 10 / 15 / 20 box sizing
- weekly / fortnightly Ready Series box configuration
- unrestricted meal-selection subscription builder
- Build-A-Box as a primary Ready Series subscription journey

The new Ready Series subscription model is:

10 predefined subscription products
+
3-month / 6-month term

If the existing prototype contains old Box Subscription / Build-A-Box
routes or components:

- remove them from the primary customer journey/navigation
- repurpose the existing subscription screen where practical
- preserve underlying code/components where practical
- do not create a duplicate replacement screen unless technically required

VISIBLE CUSTOMER TERMINOLOGY should reflect:
"Ready Series Subscription"

rather than the old generic "Box Subscription" terminology.

============================================================
SECTION 14 — READY SERIES LANDING / INFORMATION ARCHITECTURE
============================================================

Without creating additional top-level pages, make the existing Ready Series
experience clearly expose the three purchase modes:

- Single Purchase
- Bundles
- Subscription

Use one clear, modern mechanism inside the Ready Series experience.

Examples of acceptable patterns:
- contextual segmented tabs
- product-category navigation
- three clean purchase cards
- clearly grouped sections

Do NOT add these choices to the global header.

The goal is:

FAST UNDERSTANDING
→ FAST PRODUCT SELECTION
→ FAST CART
→ FAST CHECKOUT

============================================================
SECTION 15 — MEAL PLAN RECURRING SUBSCRIPTION
============================================================

Meal Plan now supports:

MONDAY–FRIDAY COVERAGE

Recurring periods:

- Biweekly
- Monthly
- 2 Months

This is an explicit update from Jerome.

============================================================
SECTION 16 — MEAL PLAN MENU PREVIEW
============================================================

CRITICAL:

BIWEEKLY
→ show 2 weeks of menu

MONTHLY
→ show 4 weeks of menu

Do NOT show 4 weeks when Biweekly is selected.

The visible menu preview must match the selected recurring period.

For the 2-month option:

Do NOT invent an 8-week customer-facing preview.

Jerome did not explicitly define the visible menu-preview length for the
2-month option.

Use the existing structured menu interaction without inventing a new
rule for how many weeks must be visible at once.

============================================================
SECTION 17 — MEAL PLAN "PLAN & MEALS"
============================================================

Jerome explicitly wants this to be treated as PREDEFINED / PREFIXED.

The customer must NOT be presented with Plan & Meals as a freely editable
configuration field.

The Plan & Meals area should appear:

- grey
- informational
- clearly predefined / fixed
- non-editable

Use the source-defined plan names where available:

- Low Carb Regular
- Low Carb Regular +
- Balance Regular
- Balance Regular+
- Additional approved options only where actually supplied

DO NOT invent missing plan names.

Instead of making this look like another selection step, use a clear
informational section such as:

WHAT'S INCLUDED

or equivalent wording already consistent with the prototype.

This area should explain what the chosen programme includes.

============================================================
SECTION 18 — MEAL PLAN "CHOOSE MEALS"
============================================================

After the predefined plan/programme information is established, the
customer can choose meals where the approved flow allows it.

Keep the existing structured Meal Plan model.

Do NOT convert it back into:

"Pick any combination across Mon–Fri."

Do NOT create unrestricted meal-count selection.

============================================================
SECTION 19 — MEAL PLAN PROGRAMMES
============================================================

Programs remain distinct from the recurring subscription.

Programs:

1. 6 by 60

- All-week coverage
- 60-day programme
- Designed for a 6kg or more weight-loss goal

2. 6 by 60 Plus

- All-week coverage
- 60-day programme
- Designed for a 6kg or more weight-loss goal
- Additional support for customers looking to build muscle

Do NOT merge these into Biweekly / Monthly / 2-month recurring billing.

============================================================
SECTION 20 — 6 BY 60 / 6 BY 60 PLUS "WHAT'S INCLUDED"
============================================================

Jerome's latest wording states:

Includes:
- support frozen weekend meals
- channel
- weigh-in machine
- rewards

Use these as informational inclusions.

IMPORTANT:

Do not invent what "channel" means.

Do not invent additional programme benefits.

Do not restore older promotional copy such as a money-back guarantee unless
it is explicitly confirmed by Jerome in the latest approved material.

============================================================
SECTION 21 — MEAL PLAN ACCOUNT / CHECKOUT
============================================================

Preserve the approved Meal Plan account gate.

Meal Plan:
Account creation / sign-in required.

No guest checkout.

Preserve existing:
- delivery details
- payment
- review
- confirmation
- account-managed subscription state

Do not reintroduce old guest checkout behavior.

============================================================
SECTION 22 — PAUSE / CANCEL / ACCOUNT
============================================================

Preserve:

PAUSE
- 1 week
- 2 weeks
- 3 weeks
- 4 weeks

Pause is separate from cancellation.

Keep:
- pause dates
- bounded duration
- next billing visibility
- cancel confirmation
- permitted menu changes

Do not reintroduce arbitrary delivery-day/time-slot editing from the
older prototype where it was removed during the previous correction pass.

============================================================
SECTION 23 — CART / CHECKOUT
============================================================

READY SERIES SINGLE PURCHASE
→ cart
→ checkout

READY SERIES BUNDLE
→ cart
→ checkout

READY SERIES SUBSCRIPTION
→ selected predefined subscription product
→ term selected (3 or 6 months)
→ checkout

MEAL PLAN
→ approved account-gated flow
→ checkout

Keep the current checkout architecture.

Do not create a custom payment processor.

Do not create a custom commerce engine.

============================================================
SECTION 24 — PAYMENT / SHOPIFY BOUNDARY
============================================================

Shopify remains the commerce system of record.

Do not replace Shopify.

Do not create custom customer-side payment processing.

Where appropriate:
- product
- price
- cart
- checkout
- payment
- order
- subscription commerce

should continue to use the approved Shopify architecture.

============================================================
SECTION 25 — READY SERIES CUSTOMER CONTENT
============================================================

Use Jerome's latest category structure and the attached product sources.

Do not invent:
- new categories
- new bundle types
- new subscription SKUs
- new prices
- new delivery charges
- new programme benefits

Use the spreadsheets for exact product information.

The prototype should present products in a customer-friendly way, not as
an internal spreadsheet.

============================================================
SECTION 26 — 24_9 TRIAL OPERATIONAL SHEET
============================================================

IMPORTANT:

The attached 24_9 Trial spreadsheet is OPERATIONAL / DELIVERY reference
material, NOT a customer-facing product source.

It contains operational items such as:
- delivery windows
- pickup time
- route/car grouping
- dispatching point
- customer delivery addresses

DO NOT import those internal operational tables into the customer UI.

Do not create customer-facing route management, driver management or
dispatch screens in this prototype.

Those belong to the Admin side.

============================================================
SECTION 27 — CUSTOMER-FACING REPORTING / ACCOUNT
============================================================

Do not add Admin reports to the customer prototype.

Customer-facing account areas should remain focused on:

- subscription status
- upcoming / past orders
- permitted menu management
- pause / resume / cancel
- wallet / rewards where already approved
- relevant delivery/order information

Do not expose:
- inventory reports
- Delivery Order reports
- operational reports
- driver routes
- internal marketing reports

============================================================
SECTION 28 — UX PRINCIPLES FOR THIS UPDATE
============================================================

The new customer experience should reduce friction without adding
complexity.

Apply these principles:

1. SHOW THE CUSTOMER WHAT THEY ARE BUYING.
   Product / bundle / subscription type should be obvious.

2. SHOW PRICE EARLY.
   Do not hide key pricing behind unnecessary clicks.

3. SHOW TERM EARLY FOR SUBSCRIPTIONS.
   3 months / 6 months should be immediately understandable.

4. SHOW THE NEXT ACTION.
   One primary CTA per meaningful step.

5. REDUCE REPETITION.
   Do not repeat Ready Series / Meal Plan choices in every header.

6. USE PROGRESSIVE DISCLOSURE.
   Reveal detail when it becomes relevant instead of overwhelming the
   customer on one screen.

7. KEEP CART ACCESSIBLE.
   The customer should always understand what has been added.

8. DO NOT TURN BUSINESS RULES INTO FORM COMPLEXITY.
   Predefined products should feel predefined.

9. KEEP IMPORTANT INFORMATION NEAR THE DECISION.
   Price, term, contents, delivery rule and CTA should be close together.

10. USE STRONG VISUAL HIERARCHY.
    One primary message, one primary action.

============================================================
SECTION 29 — RESPONSIVE / MOBILE
============================================================

Preserve responsive behaviour.

On mobile:

- Current Brand selector must remain easy to use.
- Product cards must remain scannable.
- Subscription term selector must remain obvious.
- Cart access must remain visible.
- No horizontal overflow.
- No oversized decorative areas that push purchasing actions too far down.
- Primary CTA remains easy to reach.
- Important price/term information remains visible.

Do not build a separate mobile product.

Keep one responsive system.

============================================================
SECTION 30 — NO DUPLICATE PAGES
============================================================

IMPORTANT:

Do not add new top-level screens unless absolutely required by an explicit
requirement.

Use and modify the existing screens/routes where possible.

Existing relevant screens include:

- Home
- Ready Series browse
- Promotions
- Bundles
- Product Detail
- Existing recurring/subscription screen
- Meal Plan Wizard
- Checkout
- Confirmation
- Account

Repurpose obsolete existing screens where appropriate rather than creating
duplicates.

============================================================
SECTION 31 — VISIBLE TERMINOLOGY
============================================================

Visible customer terminology should consistently use:

Performance Meals
Meal Plan
Ready Series
Ready Series Subscription
Single Purchase
Bundles
Biweekly
Monthly
2 Months
6 by 60
6 by 60 Plus

Avoid legacy visible terminology that contradicts the latest model.

Where internal source filenames/routes contain older names:
do not rename internal code purely for cosmetic reasons.

Only customer-visible terminology needs to be corrected.

============================================================
SECTION 32 — WHAT MUST NOT BE INVENTED
============================================================

Do NOT invent:

- additional Ready Series subscription SKUs
- additional subscription terms
- weekly Ready Series subscription billing
- fortnightly Ready Series subscription billing
- custom Ready Series bundle composition
- arbitrary Ready Series box sizes
- unsupported delivery schedules
- additional 6by60 benefits
- meaning of "channel"
- 2-month menu-preview duration
- unsupported guarantees
- new payment methods
- new loyalty economics
- new report modules
- new admin features

When information is unspecified:
KEEP THE EXISTING APPROVED BEHAVIOUR
or
PRESENT THE INFORMATION SIMPLY WITHOUT INVENTING A RULE.

============================================================
SECTION 33 — FINAL CONSOLIDATED QA
============================================================

After making the changes, perform a complete QA pass of the customer
prototype.

Verify:

BRAND / NAVIGATION
✓ Current Brand dropdown exists.
✓ Parent / Meal Plan / Ready Series hierarchy is clear.
✓ Old repeated Ready Series / Meal Plans header navigation is not restored.
✓ Our Brands / About Us / Account / Cart remain usable.

READY SERIES
✓ Single purchase is separate.
✓ Bundles are predefined.
✓ Subscription is separate.
✓ Subscription uses 10 predefined products.
✓ 3-month and 6-month term selection is clear.
✓ No old arbitrary box-builder behaviour is exposed.
✓ $120+ free delivery rule is represented.
✓ $10 delivery fee below $120 is represented.
✓ Bundle spreadsheet mechanics are not exposed to customers.

MEAL PLAN
✓ Biweekly shows 2 weeks.
✓ Monthly shows 4 weeks.
✓ 2-month option exists.
✓ Plan & Meals is predefined / grey / non-editable.
✓ Choose Meals remains structured.
✓ 6 by 60 and 6 by 60 Plus remain separate programmes.
✓ Included benefits match the supplied wording only.
✓ No unsupported guarantee is introduced.
✓ Account gate remains intact.
✓ Pause/cancel logic remains intact.

GENERAL
✓ No duplicate screens.
✓ No new application.
✓ No new speculative UX flows.
✓ No unsupported functionality.
✓ Existing approved functionality is preserved.
✓ Desktop remains coherent.
✓ Mobile remains usable.
✓ Design feels modern and frictionless without becoming a redesign.
✓ No visible conflicting legacy terminology remains.

============================================================
FINAL INSTRUCTION
============================================================

THIS IS THE FINAL CONSOLIDATED CUSTOMER UPDATE.

INSPECT FIRST.
COMPARE SECOND.
CORRECT THIRD.

Do not redesign for the sake of redesigning.

Do not create variations.

Do not keep iterating after the requirements above are satisfied.

Use the existing prototype as the foundation.

Apply Jerome's latest confirmed requirements once, carefully, and then STOP.

At the end, provide a concise change log containing:
- screens changed
- major functional changes
- obsolete behaviour removed from active customer flow
- any source requirement that was intentionally NOT changed because it
  was unspecified

Do not make additional changes after reporting the result.