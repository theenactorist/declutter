# Everything Must Go ✨

### TL;DR

Quality items from our home to yours. Browse, find what you love, and reach out on WhatsApp.

---

## Goals

### Business Goals

* Sell at least 80% of listed items within the first 30 days of launch.

* Achieve a user satisfaction rate of 90%+ among buyers (measured via post-purchase feedback).

* Complete the webapp from concept to live beta launch within 3 weeks.

* Ensure that the platform has >99% uptime during the first sales cycle.

### User Goals

* Quickly discover items of interest through intuitive browsing, search, and filtering by category.

* Easily access detailed item information, including images, specs, price, and grade/condition.

* Contact the seller with one click via WhatsApp for immediate negotiation or purchase.

* Clearly see item availability (available/sold) to avoid confusion or wasted effort.

* Experience a frictionless, visually appealing interface on both desktop and mobile.

### Non-Goals

* No built-in payment gateway or escrow—transactions occur outside the webapp.

* No multi-seller or marketplace functionality; strictly single-seller, invite-based.

* No long-term account creation or buyer/seller profiles; one-way communication only.

---

## User Stories

**Persona: Friend or Family Shopper**

* As a friend, I want to see all available items at a glance, so that I can quickly find something I need.

* As a potential buyer, I want to filter items by room (living room, work & den, kitchen, bedroom), so that I only see relevant products.

* As a curious browser, I want to see large, clear images and zoom in, so that I can better inspect item condition.

* As a buyer, I want to know if an item is already sold, so that I don’t waste time on unavailable listings.

* As a buyer, I want to contact the seller via WhatsApp from the webapp, so that I can quickly ask questions or reserve items.

**Persona: Seller**

* As the seller, I want to easily upload images, specs, price, and grade for each item, so that buyers have all key info.

* As the seller, I want to mark items as sold, so that buyers see an up-to-date list.

* As the seller, I want the webapp to be simple to use and not require coding knowledge, so that I can list without tech hurdles.

---

## Functional Requirements

* Item Gallery & Navigation (Priority: High)

  Gallery View: Grid or tiled presentation of all unsold items, optimized for desktop/mobile.

  Category Filters: Quick-toggle filters for “living room,” “work & den,” “kitchen,” “bedroom.”

  Search Bar: Search by item name, keyword, or description.

  Status Badge: “Available” or “Sold” badge shown clearly on each item.

  Image Zoom: Click or tap on images to see an enlarged, detailed view.

* Item Details & Condition (Priority: High)

  Detail View: Images, detailed description/specs, price, grade/condition displayed for each item.

  Grading Scale: Standardized condition rating (e.g., “Like New,” “Very Good,” “Good,” “Fair”) selectable per listing.

* Seller Interaction & Status Updates (Priority: High)

  WhatsApp Link: Prominent button on each item to initiate WhatsApp conversation with pre-filled message referencing the item.

  Mark as Sold: Seller can update item status directly/reliably (simple admin view).

* Admin Experience (Priority: Medium)

  Edit Listings: Seller can add, edit, or delete items via a simple interface.

  Inline editing table for: price, status (dropdown: Available, Negotiation Ongoing, Sold), item name, category, description/specs.

  Multiple image management: add, remove, and reorder images for each item.

  Add New Listing form matching the table schema (fields: name, category, price, images, description/specs, grade/condition, status).

  Bulk actions: mark multiple items as sold, change category for selected items, or delete selected items.

  Quick filtering and search within the admin panel (by name, category, status, date).

  Activity log: show last-updated timestamp per item and recent changes summary.

  Preview: preview button/link to open an instant buyer-facing preview of the listing.

  Option to hide/archive items without deleting (archived items are excluded from public gallery).

* Item Page Fields (Priority: High)

  Every internal item page should be tailored by category to maximize buyer confidence and minimize unnecessary back-and-forth. The following core fields apply to all items, and each category includes recommended category-specific fields and notes. Make clear in the admin form and listing editor that fields shown on the internal/detail page vary by category.

  Core fields for every item page:

  * Basic info: Item name/title, short description, full description/condition notes.

  * Images: Multiple high-resolution photos, primary image, gallery, and zoom functionality.

  * Price: Display price and any negotiation notes or price history (optional).

  * Status: Availability badge (Available / Negotiation Ongoing / Sold).

  * Contact: Prominent WhatsApp button with pre-filled message including item ID/name.

  * Specifications: Structured key/value specs area (fields depend on category).

  * Extras & Accessories: List of included items or extras (if applicable).

  * Quantity: If more than one unit available, show quantity and per-unit price.

  * Condition & Grading: Standardized grade + free-text condition notes.

  Category-specific recommended fields and notes:

  * Electronics:

    * Technical specs: Brand, model, year, serial number (optional), CPU/processor, RAM, storage, screen size/resolution, battery health (if applicable).

    * Included accessories: Charger, cables, original box, manuals, extra batteries, adapters.

    * Software/licensing notes: OS version, included licenses or subscriptions (if any).

    * Warranty/repairs: Remaining warranty or recent repairs/parts replaced.

    * Notes: State if device is reset/cleaned and whether accessories are original.

  * Appliances:

    * Technical specs: Brand, model, dimensions, power rating, capacity (e.g., liters), energy rating.

    * Included accessories: Manuals, installation hardware, hoses, filters.

    * Service history: Date of last service, any known faults or repairs.

    * Notes: Compatibility (e.g., gas vs electric), installation requirements, whether delivery/installation offered.

  * Furniture:

    * Physical specs: Dimensions (W×D×H), weight (if relevant), material, color/finish.

    * Condition details: Wear areas, refurbishments, stains, or structural repairs.

    * Accessories & extras: Cushions, covers, assembly hardware, legs.

    * Notes: Disassembly instructions, pickup requirements, whether delivery or local delivery fee applies.

  * Vehicles (incl. bikes, scooters):

    * Key details: Make, model, year, mileage/hours, VIN/serial (optional), fuel/electric, registration status.

    * Mechanical specs: Engine size/type, recent maintenance, tires condition, brakes, battery health (if electric).

    * Included extras: Spares, tools, original paperwork, keys.

    * Notes: Roadworthiness, transfer process, required documents for sale, whether test rides allowed and safety precautions.

  * Baby & Kids:

    * Safety & compliance: Age range, safety certifications, recalls, choking hazard notes.

    * Condition: Stains, wear, cleanliness, included bedding or inserts.

    * Accessories: Manuals, extra parts, replacement straps, batteries (if applicable).

    * Notes: Cleaning status, recommended age, any repairs or modifications.

  * Household (kitchen, linens, decor):

    * Product details: Material, dimensions, capacity, care instructions.

    * Accessories: Lids, utensils, mounting hardware.

    * Notes: Food-safe status, wash/care guidance, set counts (e.g., 6-piece).

  * Clothing & Shoes:

    * Sizing: Standard size, measurements (chest/waist/inseam/sole length), fit notes.

    * Condition: Signs of wear, stains, repairs, any alterations.

    * Brand & authenticity: Brand, tags present, authenticity notes for higher-value items.

    * Included extras: Boxes, dust bags, spare laces.

    * Notes: Model/fit photos, return/exchange policy (if any), whether items are vintage or altered.

  Implementation notes for editors and admin:

  * Use category templates in the admin panel so fields relevant to the selected category appear automatically when creating or editing a listing.

  * Make key fields required for listing publication (e.g., at least one image, title, price or price-note, availability status, and core condition/grade).

  * Provide inline help text for category-specific fields to help sellers supply consistent, informative details that reduce buyer questions.

  * Allow optional free-text condition notes and a short summary sentence for the detail page to surface during quick browsing.

  Goal: ensure every item internal page is clear, complete, and tailored by category to maximize buyer confidence and minimize unnecessary back-and-forth conversations.

* Other Functional/Non-Functional (Priority: Medium)

  Responsive Design: Webapp fully usable on mobile and desktop.

  Basic Analytics: Page views, click-through rates, WhatsApp taps collected for dashboard review.

---

## User Experience

**Sample Webpages for Concept**

**References (visual / UI inspiration):**

* [Gallery View Example — https://www.nativeunion.com/collections/desk-essentials](https://www.nativeunion.com/collections/desk-essentials)

* [Single Product Details Example 1 — https://www.nativeunion.com/products/pop-phone?variant=43838127636619](https://www.nativeunion.com/products/pop-phone?variant=43838127636619)

* [Single Product Details Example 2 — https://www.farfetch.com/ng/shopping/men/ghbass-weejuns-larson-penny-loafers-item-14844954.aspx](https://www.farfetch.com/ng/shopping/men/ghbass-weejuns-larson-penny-loafers-item-14844954.aspx)

Gallery -> Single Item Detail flow: Users browse a gallery of items (grid or tiled) and can tap any item to open a single-item details page. The details page provides additional information and pictures, shows price and condition, and offers contact options (one-tap WhatsApp) so buyers can message the seller directly from the item page.

These links are visual/inspirational references for the type of gallery layout and detail pages envisioned for the Declutter Webapp.

**Entry Point & First-Time User Experience**

* Invitation-only access: friends and family receive a unique URL via direct message or email.

* Landing page opens as a visually engaging gallery, with clear sections for filtering/search.

* No sign-up or login required for buyers; instant access.

* Short, one-screen onboarding overlay or tooltip tour highlighting:

  * How to use filters and search

  * How to zoom images

  * Where to tap for more details

  * How to contact via WhatsApp

**Core Experience**

* **Step 1:** User lands on the homepage and sees all available items in a clean, card-based gallery.

  * Visual prominence for image quality; item modal/zoom appears on click.

  * Card displays item name, price, status badge, and main category.

* **Step 2:** User applies filters or searches for keywords (e.g., “desk,” “sofa”).

  * Sidebar or top bar contains filter toggles for room categories and search bar for fast text input.

  * Filters/search update gallery results instantly, with clear “no results” message if needed.

* **Step 3:** User clicks/taps any item for the detail view.

  * Larger image(s), all specs, price, grade/condition shown.

  * Sold badge/overlay if no longer available.

  * “Contact via WhatsApp” button with pre-filled item info.

* **Step 4:** User taps WhatsApp button, taken to WhatsApp (mobile app or web) ready to initiate chat with seller.

  * Pre-fills message with item name, streamlining communication.

* **Step 5:** User browses further or exits; seller receives WhatsApp in real-time and can close deals off-platform.

* **Step 6:** Seller uses admin view (hidden from buyers) to update listings: mark as sold, edit details, or add/remove items.

  * Immediate sync to gallery, sold items clearly indicated or optionally hidden from view.

**Advanced Features & Edge Cases**

* Power-user: Optionally view sold items (toggle “Show sold”).

* Error handling: Graceful message if item is marked sold after a user initiated WhatsApp intent.

* Admin error: Validation on required fields, image size/type; alert for failed uploads.

**UI/UX Highlights**

* Optimized for easy thumb use on mobile.

* High-contrast color palette for accessibility and legibility.

* Sufficient text size and touch targets for all key buttons.

* Smooth image zoom/transition for visual clarity.

* Clean, modern design in line with personal, trustworthy branding.

* No external ads, popups, or unrelated navigation.

---

## Narrative

Our family is preparing to move and has accumulated quality furniture, gadgets, and kitchenware over the years—much of it in great condition—but we don’t want the hassle or impersonality of large public marketplaces.

 swiftly, friends are delighted to snag bargains without confusion, and Sarah enjoys a clutter-free move—with far less hassle. The Declutter Webapp transforms a stressful process into an efficient, personal exchange that fits everyone’s needs.

---

## Success Metrics

### User-Centric Metrics

* Percentage of listed items that are viewed by buyers (target: 90%+).

* Number of WhatsApp inquiries per item (goal: at least 2 per item).

* Surveyed user satisfaction with browsing/shopping flow (target: 90%+ positive).

* Bounce rate below 20%.

### Business Metrics

* 80%+ of items sold within 30 days.

* Number of repeat visitors and unique invited users (goal: >30).

* Closed sales tracked via seller survey/interview.

### Technical Metrics

* Uptime of 99%+ during active sales cycle.

* Less than 1% image upload or critical UI errors reported.

* Page load time averaging under 1.5 seconds on mobile.

### Tracking Plan

* Item page view counts.

* Filter/search usage rates.

* WhatsApp contact button clicks.

* Admin item status updates (sold, edited).

* Session duration and bounce rate.

---

## Technical Considerations

### Technical Needs

* Simple front-end for gallery, detail, and admin views (responsive, fast).

* Back-end for item data storage, status management, and image hosting.

* Secure image upload with validation (size/type limits).

* WhatsApp integration via URL schema with pre-filled text.

* Minimal analytics event tracking.

### Integration Points

* WhatsApp deep-link integration (to launch pre-filled chats).

* Optional: Analytics tool (Google Analytics or similar) for basic tracking.

### Data Storage & Privacy

* Store item listing data and images in secure, access-controlled storage.

* No storage of buyer personal data; WhatsApp conversations happen off-app.

* Compliance: No sensitive or payment data on platform; privacy policy visible.

### Scalability & Performance

* Expected load is low/moderate (dozens of concurrent users); architecture to allow quick expansion if needed.

* Image CDN or compressed storage for rapid load times.

* Designed for quick page loads and fast navigation.

### Potential Challenges

* Ensuring WhatsApp integration works seamlessly across mobile and desktop.

* Preventing unauthorized access to admin functions.

* Handling edge cases where items are sold during active buyer sessions.

---