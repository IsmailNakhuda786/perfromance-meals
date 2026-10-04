PERFORMANCE MEALS
PHASE A — CUSTOMER PROTOTYPE CORRECTION + UX FREEZE

IMPORTANT:
This is a CORRECTION PASS on the EXISTING CUSTOMER-FACING PROTOTYPE.

DO NOT create a new app.
DO NOT redesign the website.
DO NOT change the overall visual identity.
DO NOT change the existing brand system unnecessarily.
DO NOT touch or modify the Admin Portal.
DO NOT add ERP, logistics admin, rider app, kitchen app, procurement or packaging functionality.

Use the EXISTING CUSTOMER PROTOTYPE as the visual and structural baseline.

The objective is to correct known business-rule and UX inconsistencies using the latest confirmed Performance Meals requirements, while preserving the existing visual design wherever it already works.

==================================================
1. PRIMARY OBJECTIVE
==================================================

Bring the existing customer-facing prototype into alignment with the latest confirmed Performance Meals requirements.

Priority order:

1. Functional correctness
2. Clear UX
3. Correct customer journey logic
4. Consistent business rules
5. Existing visual design preservation
6. Copy can be refined later

This is NOT a visual redesign exercise.

Where existing styling, spacing, typography, components, layout and interactions already work, PRESERVE THEM.

Only modify what is required by the corrections below.

==================================================
2. THREE CUSTOMER JOURNEYS MUST REMAIN DISTINCT
==================================================

Maintain clear separation between:

A. Parent / Performance Meals
B. Meal Plan
C. Ready Series

Do not merge their experiences.

Do not make Meal Plan behave like ordinary ecommerce.

Do not make Ready Series behave like a subscription programme unnecessarily.

The existing visual language and brand distinction should remain intact.

==================================================
3. PARENT / PERFORMANCE MEALS
==================================================

Keep the Parent brand as a minimal gateway/discovery experience.

DO NOT add:
- Gift Cards
- Rewards
- Wallet features
- unnecessary ecommerce account clutter

The Parent page should primarily direct customers toward the appropriate journey.

Preserve the existing design unless a change is required to support the corrected navigation.

==================================================
4. READY SERIES
==================================================

Ready Series remains transactional/ecommerce-first.

Preserve the existing:

- Ready-to-Go browsing
- Meal categories
- Promotions
- Useful Bundles
- Product detail
- Cart
- Checkout
- Box Subscription

Ready Series should continue to feel like ecommerce.

Use transactional language such as:
- Shop Now
- Add to Cart
- Build a Bundle

Do not convert Ready Series into the Meal Plan programme experience.

==================================================
5. READY SERIES BOX SUBSCRIPTION
==================================================

Preserve Box Subscription as a DISTINCT Ready Series subscription journey.

Existing functionality includes:

- 5 / 10 / 15 / 20 meal choices
- subscription frequency
- pricing
- recurring subscription
- account management

Keep the Box Subscription separate from Meal Plan.

Do not mix Box Subscription rules with Meal Plan rules.

Pricing must remain rule-driven and must not be invented.

==================================================
6. MEAL PLAN — CRITICAL CORRECTIONS
==================================================

Meal Plan is a structured programme/subscription experience.

It is NOT a generic ecommerce cart.

Use programme-oriented language such as:

- Choose your goal
- Start your plan
- Build your plan
- Review your meals
- Manage your plan

Avoid making Meal Plan feel like arbitrary transactional cart-building.

==================================================
7. MEAL PLAN MUST REQUIRE AN ACCOUNT
==================================================

CRITICAL CORRECTION:

REMOVE guest checkout from the Meal Plan journey.

Meal Plan customers must:

- Create an account
OR
- Sign in to an existing account

before the subscription/payment can be completed.

Do NOT display:

"Continue as Guest"

inside the Meal Plan subscription flow.

Guest checkout can remain only where it is genuinely applicable to the Ready Series experience.

Make the distinction explicit in the UI.

==================================================
8. MEAL PLAN MENU SELECTION
==================================================

IMPORTANT BUSINESS-RULE CORRECTION:

Do not present Meal Plan as an unrestricted "pick any meals until you reach N meals" box builder.

The customer selects from the prescribed menu structure applicable to the programme.

The interface must make it clear:

- which meal/day is being configured
- whether it is Lunch or Dinner
- which menu is available for that applicable day/period
- which selections have already been made
- what remains to be completed

Selections must map logically to the actual programme schedule.

Do not invent new menu rules.

==================================================
9. DELIVERY LOGIC
==================================================

Do not introduce arbitrary delivery-date selection where the agreed Meal Plan model uses predefined/preset delivery scheduling.

The UI should communicate the applicable delivery structure clearly.

The customer should never be presented with a delivery configuration that could create an invalid subscription schedule.

Preserve only valid controls supported by the current business model.

==================================================
10. BILLING
==================================================

Correct the billing presentation so it is internally consistent with the current Meal Plan model.

Where the current Meal Plan setup uses billing-cycle selection:

- Biweekly
- Monthly

show those choices clearly.

Do not show conflicting Weekly / Monthly options in the Meal Plan areas where the business model is Biweekly / Monthly.

Show the applicable price for the selected billing cycle.

==================================================
11. PAUSE
==================================================

Pause must be clearly different from cancellation.

Provide:

- Pause 1 week
- Pause 2 weeks
- Pause 3 weeks
- Pause 4 weeks

When a pause length is selected, show the resulting pause period/date range.

Example:

Pause:
2 weeks

15 Sep – 29 Sep

The purpose is to make the operational consequence immediately understandable.

Do not invent additional pause durations.

==================================================
12. CANCELLATION
==================================================

Keep Cancel Subscription available.

Cancellation must be clearly distinct from Pause.

Use an intentional confirmation step so a customer cannot cancel accidentally.

Do not remove cancellation from subscription management.

==================================================
13. NEXT BILLING INFORMATION
==================================================

Where billing is displayed in the account/subscription experience, show the next applicable billing cycle/date clearly.

Example structure:

Next billing cycle:
DD MMM YYYY

Also show the applicable amount when appropriate.

The customer should not have to infer when the next billing event occurs.

==================================================
14. ACCOUNT DASHBOARD
==================================================

Keep the dashboard intentionally focused.

Preserve the current useful information such as:

- Active Plan
- Wallet Balance
- Subscription status
- Relevant renewal/billing information
- Plan management actions

DO NOT reintroduce dashboard sections that were previously removed.

Do not add:
- Orders This Month
- Recent Orders
- unnecessary duplicated statistics

Order History remains in its own section.

==================================================
15. SUBSCRIPTION / MEAL SWAP
==================================================

The subscription-management experience must clearly expose:

- Current plan
- Programme progress
- Applicable weeks
- Weeks remaining
- Menu review
- Meal swap where permitted
- Cutoff information
- Pause
- Cancellation
- Billing information

Use clear week/date context.

The customer must understand which weeks are editable and which have already passed the cutoff.

Do not allow the UI to imply that a locked/past period is editable.

==================================================
16. CUTOFF COMMUNICATION
==================================================

Where the customer is reviewing upcoming meals, make cutoff status obvious.

Use states such as:

- Open for changes
- Cutoff approaching
- Changes closed
- Upcoming week available

Avoid ambiguous "edit" actions on locked periods.

==================================================
17. WALLET & REWARDS
==================================================

Keep Wallet & Rewards as a clear account feature.

Maintain separation between:

- Wallet balance
- Reward points
- Redemption
- Transaction history

The redemption flow should communicate that redeemed reward value becomes wallet credit.

Do NOT invent new credit amounts, reward conversion rules or pricing rules that have not been confirmed.

==================================================
18. CHECKOUT CONSISTENCY
==================================================

Make checkout behaviour depend on journey type.

READY SERIES:
- normal ecommerce checkout behaviour
- guest checkout may remain where supported

MEAL PLAN:
- account required
- no guest checkout
- subscription/payment flow must remain programme-oriented

Never allow the UI to present contradictory authentication rules.

==================================================
19. PRODUCT / CART BOUNDARY
==================================================

Keep:

READY SERIES:
Product → Cart → Checkout

MEAL PLAN:
Programme → Menu / Schedule → Account → Billing / Payment → Subscription

Do not force both journeys into an identical ecommerce flow.

==================================================
20. NAVIGATION
==================================================

Preserve the ability for the customer to understand the three Performance Meals destinations.

The navigation should allow movement between:

- Parent / Performance Meals
- Meal Plan
- Ready Series

But do not make the two commercial experiences visually or functionally identical.

==================================================
21. DO NOT INVENT BUSINESS LOGIC
==================================================

CRITICAL:

Do not invent:

- pricing rules
- junior pricing
- wallet credit amounts
- delivery rules
- subscription frequencies
- menu availability
- discount percentages
- reward conversion values
- billing rules

Where a business rule has not been confirmed, preserve the existing value temporarily or structure the UI so the rule can be configured later.

Do not fabricate a "smart" rule.

==================================================
22. UX QUALITY PASS
==================================================

During the correction pass, check every customer screen for:

- clear hierarchy
- obvious primary CTA
- consistent terminology
- no contradictory actions
- no duplicate information
- no dead-end states
- clear locked/editable states
- clear billing information
- clear subscription status
- clear account requirements
- mobile responsiveness
- desktop/tablet/mobile consistency

Do not redesign the page merely because another layout is possible.

==================================================
23. SCREEN-BY-SCREEN PASS
==================================================

Apply the correction logic to the existing customer screens:

01 Home
02 Ready-to-Go — All Meals
03 Ready-to-Go — Promotions
04 Ready-to-Go — Useful Bundles
05 Product Detail
06 Box Subscription
07 Meal Plan Wizard
08 Checkout — Auth
09 Checkout — Delivery & Payment
10 Order Confirmation
11 Account — Dashboard
12 Account — Subscription & Meal Swap
13 Account — Order History
14 Account — Wallet & Rewards

Do not remove an existing screen unless it is genuinely redundant.

==================================================
24. MOST IMPORTANT SCREEN: MEAL PLAN WIZARD
==================================================

Before finishing Phase A, thoroughly inspect the Meal Plan Wizard.

Verify that the final flow is logically:

PLAN TYPE / MEALS
→ GOAL / BILLING
→ PRESCRIBED MENU SELECTION
→ VALID DELIVERY STRUCTURE
→ ACCOUNT REQUIRED
→ PAYMENT
→ SUBSCRIPTION CONFIRMATION

There must be no guest checkout route.

There must be no arbitrary invalid meal/day combination.

There must be no contradictory billing choices.

==================================================
25. FINAL ACCEPTANCE TEST
==================================================

After making the corrections, test these scenarios mentally and through the interactive prototype:

TEST 1:
New customer starts Meal Plan
→ selects plan
→ selects meals
→ reaches account step
→ cannot bypass account
→ completes payment
→ subscription confirmed

TEST 2:
Existing Meal Plan customer
→ opens account
→ views active plan
→ sees next billing information
→ reviews upcoming menu
→ swaps an eligible meal
→ sees cutoff status

TEST 3:
Customer pauses subscription
→ selects 1 / 2 / 3 / 4 weeks
→ sees exact resulting pause period
→ confirms pause

TEST 4:
Customer wants to cancel
→ selects Cancel
→ receives separate cancellation confirmation

TEST 5:
Customer shops Ready Series
→ browses product
→ adds to cart
→ checks out using the permitted checkout mode

==================================================
26. FINAL RULE
==================================================

This is a CORRECTION + FREEZE exercise.

Preserve what already works.

Correct what conflicts with confirmed requirements.

Do not redesign for the sake of redesigning.

Do not add admin functionality.

Do not add ERP functionality.

Do not add rider functionality.

Do not create a second application.

When finished, leave the existing customer prototype in a clean, coherent, presentation-ready state for Jerome's review.

PHASE A OUTPUT:
A corrected customer-facing prototype that is internally consistent with the latest confirmed Performance Meals requirements and ready to move into Phase B functional documentation.