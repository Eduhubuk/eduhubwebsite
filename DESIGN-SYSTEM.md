# EDUCATION HUB · "DAYLIGHT" — Creative Direction & Design System (Iteration 3 · pre-launch refinement)

## Chapter Thirteen — a message from leadership (About)

The long-missing leadership content arrived from the client, attributed at last: Pawan Bhatia, Chief Partnerships Director. Added to About between Chapter Six (Our Belief) and the CTA as `.leadership` — client copy verbatim: section-head ("A Message from Leadership" / "Building the Future of Global Education."), a 62ch prose column with a display-face lede and a gradient pull-line ("We are building a global education platform."), the three commitment principles (Access / Trust / Outcomes) on the existing `.iw-card` panels, and a bordered signature block. Reveals ride the page's existing generic selector (extended with the `.lm-*` elements). Verified 1280 + 375, no overflow, cards collapse to one column on mobile.


## Chapter Twelve — courses expansion (hero, filters, SP Jain + aivancity PG)

**UG hero.** Headline generalised to "Your Undergraduate Journey / Starts Here." (gradient on the second line); the sub line, meta description and title were updated to match — the old copy claimed everything was LAAT-delivered, which had been false since the 50-course catalogue landed.

**UG study-location filter.** New `.crs-tabs` pill row between the hero and the grid: All (initial state, shows all 50) · UK · Canada · Europe · UAE · US. Every UG entry carries a `region` field in courses-data.js, classified by ACTUAL study location (17 UK, 16 Europe, 7 Canada, 2 UAE — both DMU Dubai, 8 US). Watch-out that was caught: SP Jain's BBA location string mentions Dubai as an exchange campus — location-substring matching alone misclassifies it; its study location is London → uk. Filtering is GSAP-animated (fade/slide out, staggered fade in, `ScrollTrigger.refresh()` on completion), instant under reduced motion, with an `animating` guard against double-clicks. Active pill = solid azure.

**PG catalogue.** Ten programmes added as full detail-capable entries (official-site data, extracted 2026-08-21): five SP Jain London (MSc Global Business, MSc Applied Finance & Wealth Management, MFMB/MiM, Global MBA, Executive MBA — spjain.ac.uk) and five aivancity master's (Data Engineering & Cloud Computing, Data Management, AI for Business, Generative & Agent-Based AI, Online Applied AI & Data Science — aivancity.ai). Fees quoted exactly as each page states them (per-term for SP Jain, initial/vocational split for aivancity); MFMB intake "coming soon" → null; two aivancity programmes are taught in French — stated on the cards. PG hero sub/title generalised for the same accuracy reason as UG. PG page: 12 cards, all Know More.

**Verified.** 1280 + 375: filter cycle All→UK(17)→Canada(7)→Europe(16)→UAE(2)→US(8)→All(50); tabs fit at 375; 12 PG cards with detail pages ("All postgraduate courses" shortcut correct); console clean, no overflow.


## Chapter Eleven — final polish pass

**UG card parity.** All 40 Excel-derived cards were enriched from official institution websites (aru.ac.uk, canterbury.ac.uk, arden.ac.uk, cityofglasgowcollege.ac.uk, mcast.edu.mt, gau.edu.tr, berlinsbi.com, ucanwest.ca, unfc.ca, thecanadiancollege.ca, dmu.ac.uk, herzing.edu, avila.edu, webster.edu, cuchicago.edu, ibat.ie) — location, duration, international tuition, intakes and an entry summary wherever the official page states them; the renderer gained an "Entry" meta row. 34/40 now match the manually built cards' level of detail. Six stay minimal because the programme verifiably does not exist or the institution could not be confirmed (ARU online Business Top-up, CCCU BA English Language & Communication, DMU Dubai BSc AI, Pacific Link College, York College of Applied Sciences, IES Business School top-up) — kept per the client's no-removal instruction and flagged to them.

**CTAs.** Every course-card CTA (UG/PG/short/NCFE cards + the detail page's action) reads "Know More"; nav CTAs untouched.

**Chrome.** "Exclusive Partner" is persistently azure/bold in desktop and mobile navigation on every page (`a[href="partners.html"]` — deliberate, not an active state). Header logo 52px (40px mobile), footer chip 74px. Favicon: `assets/favicon.png` (256px crop of the brand mark from logo.png), linked with `rel="icon"` + `apple-touch-icon` on all 14 pages.

**Contact.** Real office address on all four contact pages (96 Heathfield Park Drive, Chadwell Heath, Romford, England, RM6 4FJ), map re-centred on it (z=15). Working hours and Regions-we-serve removed from the details card. Emails by audience: general/students/channel-partners show pbhatia@ + info@; institutions show pbhatia@ + partnerships@ + info@. ⚠ Lesson: a lazy `.*?` across `<li>` boundaries in the removal regex ate the whole details list — caught in browser QA and the list rebuilt from the canonical markup. Verify structural deletions per-item.

**Verified.** 50 UG cards at 1280 and 375 (avg 4.7 meta rows, none over-wide, no overflow), one unique CTA label, blue highlight both menus, favicon loading, address/map/emails per audience, console clean.


## Chapter Ten — final refinements (client sign-off round)

**Courses data.** `js/courses-data.js` grew from 7 to 52 entries: 40 UG programmes imported verbatim from the client's "University Flagship Programmes" Excel (Direct sheet — including universities the sheet marks Contract Terminated, per explicit instruction not to filter, and the sheet's own spellings), four programmes from client-supplied URLs (SP Jain BBA + BSc Data Science, both aivancity programmes), and the Full MBA (Online) — the LAAT dual-certification pathway from the client's brochure (Stage 1 Ofqual-regulated Level 7 Diploma, Stage 2 MBA awarded by Plymouth Marjon; 14-month fast-track, 100% online, Jan/May/Sep). Excel entries are "light" (no slug) — the renderer now shows View course only for detail-capable entries, and the detail page's shortcut button follows the course's own level ("All postgraduate courses" on PG). "LAAT Business Foundation" from the URL list was already on the site as BSc (Hons) Business with Foundation Year — not duplicated.

**Short courses.** Terms strip reduced to Course fee ("Only GBP 250") · Intakes · Delivered by (LAAT); batch sizes and partner commission removed from all public display. Every Marjon card and the NCFE card now carries "Delivered by LAAT", and the NCFE award is a full course card with an overview, matching the AI cards.

**Chrome.** Nav label "Exc Partners" → "Exclusive Partner" everywhere, with a visible active state (`.nav-links a[aria-current="page"]` — azure + underline). Header logo 44→48px (38px mobile). The footer now carries the same header logo asset on a white chip (the navy wordmark is invisible directly on navy), over a subtle navy gradient with three low-opacity brand-colour radial glows and a 2px grad-brand top hairline — static, no animation. ArkAngel key facts gained "Scholarship — Up to $3,000" (client-supplied).

**Verified.** Desktop 1280 + mobile 375: 50 UG cards render with no overflow or clipping, PG shows both MBAs, no batch/commission text anywhere on short courses, active nav state on the Exclusive Partner page, footer logo loads on all 14 pages, console clean.


## Chapter Nine — the final client change list (site-wide)

One session, thirty items. Nothing was redesigned; everything new was assembled from the approved system.

**Navigation.** The primary nav became six items — Home · About · Courses · Institutions · Exc Partners · Contact — with two glass dropdowns (Courses → U.G / P.G / Short Courses; Contact → For Institutions / For Students / For Channel Partners). Desktop dropdowns open on hover (with a hover-bridge pseudo-element) and on click/touch via the new shared `js/nav.js` (aria-expanded, Escape, outside-click). The mobile menu gained `.mm-group` clusters with kicker-style labels; on screens under 700px tall it scrolls instead of clipping. Services / Gallery / Stories left the primary nav; the footer gained a Courses column and lost its dead links. Applied per region (nav / mobile menu / footer) across all 14 pages by script, with per-region count verification, per the Chapter-Five bulk-edit lesson.

**Courses.** New `js/courses-data.js` (single source of truth, extracted from laat.ac.uk on 2026-08-12 — no runtime dependency) + `js/courses.js` render three listing pages (`courses-ug/pg/short-courses.html`) and a detail page (`course.html`). Cards: awarding-body badge, name, meta rows (only stated facts — nulls never render), one-sentence overview, View course + Apply Now. Detail: overview / entry requirements / per-stage module tables + a sticky key-facts panel. The Plymouth Marjon short-course terms (GBP 250 per learner, batches 5–25, Jan/Apr/Jul/Oct, GBP 50 commission) and the NCFE CACHE SENCo award (GBP 450 / GBP 100) are client-supplied verbatim; NCFE gets a violet-accented chip to keep awarding bodies visually distinct. **Gotcha:** course hand-off uses the URL hash (`course.html#slug`, `contact-students.html#course=Name`) — `npx serve`'s clean-URL redirect silently drops query strings, and the hash survives any redirect.

**Contact.** `contact.html` was cloned into three audience pages differing only in hero copy, one extra field and routing. `js/contact.js` is now config-driven from form data-attributes (`data-recipient/enquiry/subject/source`); the mailto body gained Enquiry type / Source / Submitted lines and only prints fields that exist. `#course=` pre-fills the course field and becomes the Source. Email sending stays mailto by explicit client decision — deferred until the site moves to their hosting.

**Home.** Destination rail cards became buttons that expand a glass guide panel (`#dest-detail`) with the fixed 7-section accordion (Life / Why Study / Benefits / Eligibility / Documents / Visa / Cost) from `js/destinations-data.js` — original copy, key facts checked against gov.uk, IRCC, homeaffairs.gov.au, ind.nl, campusfrance.org, irishimmigration.ie. Every open/close ends in `ScrollTrigger.refresh()` on the tween's own onComplete (Chapter-Seven height lesson + the pinned journey lives above). The partner logo marquee reuses `.marquee/.marquee-track` with 68px glass chips — ten official institution marks, duplicated for a seamless loop, eager-loaded (lazy images never load while `document.hidden`). Anglia Ruskin publishes its mark for dark backgrounds only, so its chip is navy. Claim updated to **100+ universities · 20+ countries** (hero, stage 03, stats band — client-supplied number).

**Institutions.** New `regions-why` section (six `.panel` cards, `.iw-*`) between Markets and Models — original copy on demand, mobility, access, counselling, market fluency and fit; no invented statistics. Cards joined the page's existing reveal selector.

**Type & logo.** The fluid scale came down ~15–20% at the display end (`--step-0…4` plus every hardcoded heading clamp, the About counters, and button sizes) — same fonts, same weights. The nav logo's real problem was the asset: `logo.png` is 1536×1024 with the artwork occupying only 58% of the height. `assets/logo-nav.png` is the trimmed crop, rendered at 44px (34px under 900px).

**Elsewhere.** WhatsApp FAB (+971 56 2022 750, wa.me link, z-index 80 under the mobile menu) on every public page; Gallery de-linked everywhere + `noindex` (code untouched); testimonials retained per client instruction.

**Verification.** Desktop 1280 and mobile 375: all pages console-clean, no horizontal overflow; dropdowns, accordions (panel 871px / visa 213px via DOM), Apply-Now→prefill chain, brochures (206 application/pdf) all confirmed. Mid-page screenshots in the backgrounded pane stay blank — the index preloader freezes at opacity 1 when rAF stops; DOM state is the oracle, as documented.


## Chapter Eight — the Partners university profile (partners.html)

The hero and the two selector cards are untouched; everything new sits below them. The cards now double as the navigation.

- **Source of truth:** the two PDFs in `/brochures/`, and nothing else. Extracted with `pypdf` (LAAT's deck bakes letter-spacing into its text, so it needs a de-spacer: split on 2+ spaces, join single-spaced characters). No stat, fee, module, partner or pathway on this page was written by us.
- **Switching:** clicking either card sets it `.is-selected` (a gradient underline), fades and slides the old profile out, eases the container from the old height to the new, then fades and slides the new one in. No reload, no navigation, scroll position untouched.
- **Ten sections per university**, built from the site's existing components — `.panel` feature cards, the Contact page's `.faq-item` accordion and `.tl` timeline, glass info cards, brochure-fact tiles, programme tabs, a campus gallery with a lightbox, and a location block with a map.
- **Sections a brochure does not cover are absent, not filled.** LAAT's deck contains no photography, so its overview image and campus gallery simply do not exist; in their place is the brochure's own "Learning Experience" section. ArkAngel has 4 curriculum phases, LAAT has 2 programme stages.
- **Imagery is the brochure's own.** Seven photographs extracted from the ArkAngel PDF into `assets/partners/arkangel/`. They are Adobe CMYK JPEGs — the raw DCT streams render inverted, so each is opened with Pillow, inverted, converted to RGB and re-encoded.
- **Verified in-browser:** hero and both cards unchanged; profile switches both ways with the height animating (7347 → 6321 → back) and scroll steady; tabs swap panes with a staggered reveal; the FAQ opens one at a time; the lightbox opens with its caption and closes on Escape; mobile 375 stacks everything, the timeline stands up, the tab strip scrolls in its own container, and the page has no horizontal overflow; zero console errors.

**Bug found and fixed:** the container height tween is created inside a timeline `.add()` callback, so it is *not* part of that timeline. The timeline's `onComplete` released the height back to `auto` while the tween was still running, and the tween then left a fixed pixel height behind — with `overflow: hidden` that clipped anything which grew later, so an opening FAQ could not expand the panel. The release now lives on the height tween's own `onComplete`.

## Chapter Seven — the Contact page (contact.html)

Six sections, one job: make starting a conversation feel easy and safe.

- **Hero:** centred, one editorial line — *"Let's start your **global journey**."* — plus a single supporting sentence, then air.
- **Contact experience:** two columns. Left, a glass card holding the form — floating labels (label lifts and turns azure on focus or content), azure focus ring (`0 0 0 4px rgba(21,96,189,.12)`) with a white fill, per-field inline errors, and a field that lifts 2px while focused. Right, a glass details card (address · email · phone · working hours · regions) above a Google Map in the same `--r-lg` glass container, which lifts 4px on hover and does nothing else.
- **Why contact:** three `.panel` glass cards with gradient numerals, revealed on a 0.12s stagger.
- **Journey line:** four steps — Submit Inquiry · We Review · We Contact You · Your Journey Begins. The gradient line draws itself, then each dot pops (`back.out(2)`) and its card rises, 0.22s apart. Below 900px the line stands up and the cards run down its left side, animation intact.
- **FAQs:** glass accordion, one open at a time, GSAP height animation with a plus/minus that rotates closed. All five answers come from approved content — the 17+ countries and their three regions, the one-business-day response line, the approved student services, the three partnership models, and the UK HQ.
- **CTA:** *"Your future starts with a conversation."* + **Get in Touch** on the shared `.cta-bg` glow.
- **Verified in-browser:** empty submit flags exactly the four required fields and leaves phone/country alone; bad email flags and clears on correction; label lift, azure border, 4px ring and white fill all confirmed under a real focus; accordion opens/closes and closes its siblings; the line and all four cards complete; desktop two columns (598/541) and 1:1 field row; mobile stacks everything, inputs full width, timeline vertical; no horizontal overflow at 1280, 506 or 375; zero console errors.

**Placeholders — no phone number, street address or working hours exist anywhere in the approved content.** Those three rows render a muted "To be confirmed" and carry an HTML comment marking the exact drop-in point; the map is centred on the United Kingdom, the only location the approved content gives. **The form has no backend:** a valid submit composes a mailto to the approved general-enquiries address. Replace with a real endpoint before launch.

## Chapter Six — the Gallery page (gallery.html)

One line, one sphere, one CTA — and the site's first dark moment.

- **The component:** the 21st.dev **SphereImageGrid**, ported 1:1 from React/TSX to vanilla JS exactly as the Card Fan Carousel was for Students (this build has no React and no build step). Preserved line-for-line: `SPHERE_MATH`, the Fibonacci distribution with its pole bonus and randomisation, the two rotation matrices, the −10/−30 fade zones, the pole-image scaling rule, the O(n²) collision pass, the momentum/auto-rotate physics and clamping, the hover rule (`min(1.2, 1.2 / scale)` — the original ignores its own `hoverScale` prop, and so does this), and the spotlight modal. The demo's CONFIG is unchanged (60 images, radius 200/600, sensitivity 0.8, decay 0.96, maxSpeed 6, scale 0.15, perspective 1000, autoRotate 0.2).
- **Changed for integration only:** `containerSize` is computed from the viewport rather than the demo's fixed 600 (600 at desktop, 425 at 506px, 300 at 375px — the same prop, a responsive value); styling moved onto the site's tokens; auto-rotate is gated behind `prefers-reduced-motion`. One behavioural addition: a click that ends a drag does not open the modal — the original opens it on any click, including the one that ends a rotation.
- **The background:** none of its own. The sphere sits on the same gradient `.mesh` that carries every other hero on the site, with ~100px of air above and below it and nothing else in the section — the focal point comes from whitespace, not from styling. The circles keep the shared white rim and navy shadow.
  *(Two earlier attempts were rejected and removed: a full-bleed midnight block with top/bottom `mask-image` fades — read as a separate section with a visible horizontal seam — and a large radial dark vignette behind the sphere. The page is light throughout, like the rest of the site.)*
- **Photography:** the site's own verified set (campus life, first lecture, the flight out, arrival, graduation, the library) rather than the demo's generic stock. Captions are deliberately neutral — none states a fact about the business.
- **Verified in-browser:** 60 nodes with visibility culling (37 visible at rest), depth-sorted z-index 983–1136, 20 distinct sizes from the collision pass, all 60 images loaded, auto-rotate + drag + momentum all live, modal opens with title/description and closes on Escape / backdrop / X (and a drag-release on an image does not open it), mobile 375 (300px sphere, touch drag, no horizontal overflow), zero console errors.

## Chapter Five — the Partners page (partners.html)

Three sections, two partners, one interaction. Deliberately short: the page earns its length through the cards, not through copy.

- **Hero:** one editorial line and nothing else — *"Exclusive **Partners**."* (gradient on the second word, the one-phrase rule). No paragraph, no buttons, no stats, no scroll cue. 66svh so the cards are already breaking the fold.
- **The two cards:** equal-height glass cards on a two-column grid, each a **photographic front** — the institution's campus under a navy veil (0.56 → 0.92 top to bottom, set by measuring white-on-photo contrast at the smallest label) — carrying the logo lockup, name, country, the approved one-line description and **Download Brochure**. The glass rim, cursor-tracking glare and hover sweep are unchanged from the shared `.panel` language.
- **The interaction:** three nested layers so nothing fights — shell (idle float, perspective 1500), tilt (hover: rotationX ±5°/rotationY ±6°, translateZ 38px, glare follows the cursor), flip (rotationY 0↔180, 1.2s `back.inOut(0.9)` — a breath of anticipation, a soft overshoot, a settle). Click, tap or Enter/Space flips; the brochure link and the back button stop propagation; a click that ends a scroll-drag is ignored, a click with no coordinates (keyboard/AT) is not.
- **The back:** the destination, not a second page of text. Three frames crossfading on a 6.1s cycle with a slow pan/de-zoom (Ken Burns), a location name and one short line. Antigua & Barbuda for ArkAngel, London for LAAT. The loop is paused until the card is flipped.
- **CTA:** approved *"Become a featured partner."* + the approved network line + **Become Our Partner** (partnerships@), on the shared `.cta-bg` glow.
- **Verified in-browser:** flip round-trip (aria-pressed, tab order swaps between faces), tilt/glare values, both brochures resolving 200 `application/pdf`, all six destination frames and both campus frames loading, mobile 375 (single column, idle float off, tap-to-flip, no horizontal overflow), zero console errors.

**Bugs found and fixed here (all worth remembering):**
1. **Images inside a flipped face never rasterize.** The back's `<img>` elements loaded (`naturalWidth` correct, `complete` true, on top per `elementFromPoint`) and still painted as an empty navy panel — a bitmap that finishes decoding while its layer is turned away never gets uploaded. Proven by swapping the two cards' URLs: the failure followed the *images*, not the card. `decode()` priming didn't fix it; a visibility swap at the flip midpoint made it worse. **Fix: every image on a flip's back face is a CSS `background-image`, which paints as part of the layer itself.** URLs live in the `.p-kb i` / `.p-front-bg` rules, keyed by `data-partner`.
2. **The invisible back face was stealing the button's clicks.** `.p-back` is absolutely positioned over the whole card, and `.p-back-copy` lands exactly on top of Download Brochure. Chrome doesn't hit-test an away-facing backface, so it looked fine here — elsewhere the back swallowed the click, which (not being a control) flipped the card instead of downloading, and left only the icon area working. **Fix: only the face you can see is interactive** — `.p-back` is `pointer-events: none` until `.is-flipped`, and `.p-front` goes inert while flipped. Verified by sweeping `elementFromPoint` across the whole button: 35/39 points hit the anchor, the four misses being the rounded-corner cutouts of the 999px pill.
3. **The hover tilt was stealing the Download Brochure click.** The real cause of "the button flips the card" and "only the icon is clickable": the tilt lifts the card 38px toward the viewer, and under perspective that enlarges and rotates it over a 0.7s tween — enough to slide the button out from under a stationary cursor between mousedown and mouseup. The browser then fires `click` on the nearest common ancestor, the card, so it flips and the anchor never activates. Invisible to synthetic events and to `elementFromPoint`; only a real trusted click reproduces it, caught with a document-level listener logging `e.target`/`e.isTrusted`. **Fix: the card holds absolutely still while a press is in progress, and the flip decision reads the pointerdown target rather than the click target.** Freezing retargets the tilt's `quickTo` tweens to their current values — `killTweensOf` would break those quickTo instances permanently.
4. **Bubble-phase `stopPropagation()` on controls, never capture-phase.** Chrome visits a target's capture and bubble listeners separately, so a capture-phase stop also silenced the anchor's own bubble listeners — including the `.btn` press animation, leaving the button with no feedback and making it feel dead. `preventDefault` is never called: the default action is the download.
5. **A short page can load already inside its own reveal trigger.** At 1280×800 the grid sits above the `top 82%` line at scroll 0, so the ScrollTrigger never fired and the cards stayed at opacity 0 — the same class of bug as the `from()` gotcha, and it also hits deep links and mid-page reloads. **Fix: `revealOnce()` — always `fromTo`, and if the trigger is already on screen at creation, play immediately instead of waiting.**

**Placeholders to replace before launch:** partner logos are in-system lockups built from the approved v3 icons/labels (heart · "School of Medicine", monitor · "Applied Technology") — drop real logos into `.p-logo-mark`; campus and destination photography is Unsplash. **Brochures are real** (client-supplied, 2026-08-06): `brochures/arkangel-brochur.pdf` (27.6 MB) and `brochures/laat-brochure.pdf` (8.3 MB), linked root-relative with the `download` attribute — my earlier placeholder PDFs in `assets/brochures/` were removed. The ArkAngel file arrived with a leading space in its name; renamed so the URL resolves. Two things to watch: root-relative `/brochures/…` requires the site to be served from its own domain root, and 27.6 MB is a heavy mobile download worth compressing.

## Institutions hero refinement + globe bug fix

Hero heading: −13% type (`clamp(2.2rem → 4rem)`, verified 58.1px vs 66.9px at 1280), line-height 0.98, max-width 15em — everything else untouched; gradient stays only on "expand globally."
**Bug fix (site-wide):** globe point-index out of range — the homepage globe referenced city idx 470 after its point count dropped to 420 (its animation loop had been dying on frame one, leaving a static globe), and the Institutions mini-globe (300 pts) referenced pin idx 355. Both now normalize indices with `% N`. Verified: homepage globe truly rotating again with zero fresh errors; both Institutions globes animating.

## Chapter Four — the Institutions page (institutions.html)

Executive calm: slower easings (Lenis lerp 0.09, 1.0s+ reveals), no floating clutter. Approved v3 institutions copy only.

- **Hero:** split — approved heading/paragraph + "Start a Partnership" (→ partnerships@) left; an abstract interactive globe right, built from a new reusable `createGlobe(canvas, opts)` factory (derived from the homepage engine): dots, animated connection routes with travelling pulses, softly glowing pins labeled with **approved market countries** (India, Pakistan, Bangladesh, Sri Lanka, UAE, Saudi Arabia, Kenya, Nigeria). Cursor makes the globe lean (drift) and the wrap parallax ≤8px.
- **Markets We Serve:** sticky left column (heading + a compact second globe + live region label) while three region blocks scroll by — each activation brightens its title, staggers the approved country chips in, and sets `globe.region` so that region's pins/routes illuminate on the sticky globe (verified: one region active at a time, label synced). No sliders/tabs/accordions.
- **Partnership Models:** the three approved models as horizontal panels; the panel in the viewport's center band breathes open (image grows + de-zooms, description fades up) while others sit compressed.
- **CTA:** approved "Let's discuss your target markets." + approved line + "Schedule a Consultation" (mailto partnerships@).
- **Mobile (verified 375px):** mini-globe hidden, hero globe kept, regions/models static-open, no overflow. Nav across all pages now links institutions.html.
- Also re-verified this session: the Students support-pin "overlap" was pane pin-desync — the pin-spacer sits exactly at the fields boundary in document flow.

## Chapter Three — the Students page (students.html)

Four sections, approved content only, student-only messaging.

- **Hero — the destination fan.** The 21st.dev Card Fan Carousel ported 1:1 from React/TSX to vanilla GSAP (`js/students.js`): identical fan geometry, responsive multipliers (0.28→1.0), height budget, elastic entrance, hover push physics, and pagination cycling (dormant until an 8th card; `[hidden]` respected). Restyled entirely in-system: white-framed cards with navy-gradient country names. The typography sits **inside** the fan on a soft white halo; the copy layer passes pointer events through so cards stay hoverable. Six destinations (UK, Canada, Australia, UAE, Ireland, US — images are placeholders, easy to swap). Verified: symmetric slots (±30/±18/±6, ±21°/±12.6°/±4.2°), hover push + elastic settle, all images loading. Mobile: the fan arcs beneath the copy — still the hero, still the same component.
- **Study Opportunities:** the approved six grouped fields with their approved one-liners (Medicine & Health Sciences … Foundation & Pathway) as photo cards with lift/glow/zoom hover.
- **Student Support Services:** the approved six services as floating glass panels (reused `.panel` + tilt), numbered, titles only — nothing invented.
- **CTA:** approved line "Your world. Your education. Our promise." + approved supporting copy; buttons Book a Counselling Session / Apply Now (mailto the approved address).
- Nav/footer across index + about now link to students.html.

## Chapter Two, v4 — the polish pass (about.html)

Nothing redesigned; the approved page, tuned. Cursor parallax capped at **8px** (image) / 6px (counter-layer). Hero image gains idle life — a sub-degree rotation sway (14s) and 6px float (9s) on infinite yoyo, plus a soft-light sweep layer (24s) so it never feels frozen; the gradient line *"This is one of them."* shimmers on an 8s cycle. Why-we-exist statements now grow out of a 5px blur as they activate. Journey/glance transitions turned cinematic: outgoing slides settle back (scale 0.965) as incoming slides arrive over them (1.02 → 1) with overlapping timing, and each activation settles its image (1.07 → 1). Panels glow azure on hover. The map gets a camera settle: the whole canvas eases from 1.035/24px down to rest as the chapter arrives. All verified live: idle tweens running, pins at 3800/2480, initial moment blur 5px, camera scrub registered; mobile keeps everything gated (0 pins, no blur, no idle) — simplified, not disabled.

## Chapter Two, v3 — student-first & alive (about.html)

Structure unchanged; content re-aimed at students; every chapter now breathes.

- **Student purge (verified):** zero institutional vocabulary in the page body — partner/market-entry/recruitment messaging removed. "Our Approach" → **The Student Journey** (Discover · Choose · Apply · Prepare · Arrive, 5 steps with editorial chips like *"Where do I even start?"*); differentiators rewritten as student benefits ("We speak your region", "Beyond admission"); map reframed as *"Wherever you're starting from"*; glance ends on a **"You"** slide; belief quote trimmed to its student half.
- **Living hero:** animated mesh gradient + ambient shapes; image and mesh lean with the cursor (counter-parallax layers); on scroll the image grows while the copy drifts up and fades — a soft hand-off into Chapter 1. Scroll cue + page-top progress bar (new to this page).
- **Chapter upgrades:** why-we-exist image slow-zooms across the whole chapter with a left progress rail; journey background light shifts violet→cyan with progress, step numbers settle and chips pop per activation; panels float on staggered 9s cycles with a glass reflection sweep + 3D tilt; map draws two connection paths after illumination and pulses a ping per region; glance slides carry approved-country chips that stagger in per metric.
- **Mobile/reduced-motion (verified at 375px):** zero pins, ambient shapes and float animations off, slides static, hero image first, no overflow. All motion transform/opacity only.

Rebuilt as six scroll-story chapters. Same tokens/type/spacing/buttons as home; every interaction is new to this page (no globe, no flight path, no memory stack).

1. **Hero** — split editorial: line-revealed headline *"Some decisions change your future. / This is one of them."* left, cinematic image above the fold right; CTAs Start Your Journey + Discover Our Story (Lenis-smooth to Chapter 1). Blobs now drift almost imperceptibly.
2. **Why we exist** — sticky story: image pinned full-viewport left; four one-line moments scroll past on the right, each brightening from 18% to full opacity only while it owns the center band (verified: exactly one active at a time).
3. **Our approach** — full-screen pinned fade-through sequence (4 × 780px) with a vertical progress rail + dots; ghosted gradient numerals; no timeline, no plane.
4. **Why Education Hub** — six floating editorial panels on a 12-col flow with varied spans and vertical offsets — deliberately not a grid.
5. **Global reach** — the flat map now wakes up: regions start greyscale/45% and illuminate SA → ME → AF as the section enters (verified); hover/tap/focus reveals approved country chips.
6. **At a glance** — fullscreen pinned counters (4 × 620px), one metric per viewport with count-up on arrival: 17+ countries · 3 regions · 6 service lines · UK. *(The brief's example figures 600+/20+ are not in the approved documents and were not used.)*
7. **Our belief** — pure typography: heading, one faithful paragraph, large centred quote. No portrait, no signature.
8. **CTA** — "Your future deserves the right partner." with Start Your Journey + Explore Programmes.

**Mobile/reduced-motion (verified at 375px):** zero pins — every sequence unstacks into a generous vertical flow, hero image first and above the fold, moments at full opacity, counters still count on arrival, no horizontal overflow. Shared `pinSequence()` helper powers both pinned chapters.

Same system, quieter rhythm; answers "why should I trust them?" No homepage interaction repeated (no globe, no flight path, no stack, no pins).

**Structure:** editorial hero ("More than education. We create global opportunities.") → Why we exist (split, 3-paragraph story) → Our approach (4 editorial steps with ghosted gradient numerals, alternating) → Why Education Hub (6 differentiator panels, alternating media) → Global reach (abstract flat map: gradient region shapes on a faint graticule; hover/tap/focus reveals approved country chips) → At a glance (UK · 3 regions · 17+ countries · 6 service lines) → Our belief (leadership message + pull quote, no CEO letter) → CTA ("Your future deserves the right partner.") — all copy rewritten editorially from the approved v3 content; nothing invented.

**Approved facts used:** South Asia (India, Nepal, Bangladesh, Pakistan, Sri Lanka) · Middle East (UAE, Saudi Arabia, Oman, Qatar, Bahrain, Kuwait) · Africa (Kenya, Nigeria, Ghana, Tanzania, Uganda, Rwanda) · UK HQ · 17+ countries · 6 service lines · four-step approach · six differentiators · leadership quote · contact emails.

**Build:** `about.html` + `js/about.js` (Lenis, reveals, counters, map, micro-interactions — no globe/journey code) + About styles appended to `style.css`. Map: hover previews and click confirms on desktop; tap toggles on touch; focus-accessible buttons with aria-pressed. Motion: fades, mask text reveals, gentle image scale-ins only.

**⚠ Consistency note:** homepage hero/trust placeholders still say "600+ universities · 20+ countries" — the approved figure is **17+ countries**. Reconcile before launch.

## Iteration 8 — the memory stack, tiered by device

Same component, three temperaments (config-driven slot sets; the stack retiers live on resize):

- **Desktop (>1024):** 4 visible memories at graduated offsets/rotations (−2° → 7.5°), full shadows, hover tilt + fan-open, grab cursor, "← Drag to explore" hint on first hover.
- **Tablet (561–1024):** 3 visible cards, gentler rotations (−1.5° → 3.5°), softer shadows, same touch drag.
- **Mobile (≤560):** exactly 2 cards — the front memory flat at **85% of viewport width**, the next peeking from behind (x16/2.2°/0.94). Native swipe with identical physics; no hover effects, no 3D tilt. First-visit hint "← Swipe memories" appears when the stack scrolls into view (IntersectionObserver, localStorage) and fades on the first swipe (5s failsafe). *(Coarse-pointer gated — verify the hint once on a real phone.)*

All verified in-browser: 85% width exact, per-tier card counts and rotations, live retier on resize, swipe advance on the mobile tier.

## Iteration 7 — the memory stack becomes tactile

The auto-rotation is gone; the stack is now something you *pick up*. Nothing else on the page changed.

- **Drag/swipe:** the front card follows the pointer with pixel-exact rubber-band resistance past 90px (verified: raw −144px damps to −114). Release past the threshold — or flick faster than ~550px/s — and it tucks to the back of the pile while the next memory steps forward (infinite loop). Slow short drags spring back on an elastic ease. Same physics on touch via Pointer Events; vertical swipes hand control straight back to page scroll (axis lock). No paid GSAP plugins — momentum is hand-rolled.
- **Idle nudge:** every 4.5s the front card lifts ~4px with a 1.4° tilt and settles elastically — a quiet "this is interactive."
- **Hover (fine pointers):** front card lifts with perspective parallax tilt (±7°/6°) following the cursor; the pile fans open ~40% so the cards behind peek out; cursor becomes grab/grabbing.
- **First-touch hint:** a small glass pill — *← Drag to explore* — fades in near the stack on first hover, disappears after ~2.5s, and never returns that session (sessionStorage).
- **Craft guards:** captions breathe in with the incoming card; transform/opacity only; `touch-action: pan-y`; image dragging/selection disabled; idle pauses while dragging, hovering, or when the tab is hidden; reduced-motion gets an instant, still, fully draggable stack.

## Iteration 6 — the memory stack (final hero execution)

1. **Hero recomposed as stack + copy.** The four corner polaroids became a **premium memory stack** on the left: 5 printed memories (Graduation Day, New Beginnings, Found My People, Offer Received, Campus Life), 3 visible with depth, front card largest. Every 7 seconds the front memory lifts away (−8°, power2.in) while the stack settles forward (power3.inOut) and the card quietly rejoins the bottom — like someone placing another memory on the pile. Not a carousel: no arrows, no dots. Transform/opacity only (GPU), pauses on hover and when the tab is hidden, fully static under reduced motion.
2. **Right column:** same headline, font and copy — now left-aligned beside the stack, with a recalibrated fluid size (`clamp(2.4rem, 1.2rem + 3.2vw, 4.4rem)`) so the two-line break holds at every width. Builder and trust line align left.
3. **Mobile (<900px):** copy first and centered, the stack tucked beneath at 260px — memories return to small screens.
4. **Micro-polish:** nav links get a 2px azure underline that grows from the left on hover; globe slowed a touch further (speed 0.001, pin pulse −30%).

## Iteration 5 — finalization (student-first, crafted)

The benchmark pass. Direction correction from the client: the homepage is **student-first**; universities are secondary with their own page.

1. **Hero restored to the approved student version:** "Your next chapter begins beyond borders." + "We help students study abroad — admissions, scholarships and visas, handled." Nav/mobile CTA back to **Start Your Journey**.
2. **Journey builder returns as the signature interaction**, refined: deeper glass (blur 18px, inner top highlight), layered shadows, hover lift-shadow on the pill, selects get hover tint + rounded top + azure focus ring; destination options aligned to positioning (Canada, UK, Australia, Europe, Middle East).
3. **Institutions compressed to one quiet moment** (`.cred`): "Trusted by universities. Chosen by students." + one line + one ghost CTA **For Institutions**. The full universities split section was removed — the page is calmer and shorter.
4. **Why Education Hub:** the students section now leads with the "Why Education Hub" kicker and outcome chips (Find the right university · Scholarship guidance · Application support · Visa assistance · Support beyond admission).
5. **Stories upgraded:** real portrait avatars + achievement line ("Now a data analyst in London") alongside university & country. *(Portraits are Unsplash placeholders — swap for real student photos with consent.)*
6. **Final CTA:** "The hardest part isn't studying abroad. It's deciding to begin." (3-line mask reveal, gradient on the last line, step-3 editorial size) + single **Start Your Journey**.
7. **Craft details:** tactile press feedback on all buttons (scale 0.965 on down, fine pointers only); destination photos get subtle saturation lift on hover (800ms); globe quieter (arcs −25%, dot alpha −10%); trust strip lost its top border so the hero flows seamlessly into it.
8. **Mobile:** the memory collage is now desktop-only (<900px hides hero photos) — small-screen hero is pure typography, globe and builder; the top polaroids were colliding with the headline on narrow viewports.

## Iteration 4 — the dual-audience pass (what changed)

Same design system, rebalanced story: the homepage now speaks to students **and** institutions from the first line.

1. **Hero copy:** *"Where students belong, universities grow."* (gradient on "belong") with a plain-language sub covering recruitment + representation. Trust line became "600+ partner institutions · 20+ countries · 3 regions on the ground."
2. **Journey Builder → Dual Entry:** two slim glass pills — *Student · Begin Your Study Journey* / *Institution · Expand Into New Markets* — same glass/pill/hover language as the old builder, linking to each audience's section.
3. **Dual CTA strategy:** nav + mobile menu + final CTA now lead with **Partner With Us** (primary) and **Explore Opportunities** (ghost secondary).
4. **Trust strip** replaced the city marquee below the hero: *Working across South Asia · Middle East · Africa — Supporting Universities · Schools · Medical Institutions · Pathway Providers.* Static (it breathes, no looping motion — net motion reduced), single soft reveal on scroll.
5. **Destinations refocused:** UK, Canada, Australia, **Europe**, **Middle East** + "Every destination" (USA card removed).
6. **Footer previews the full site:** About, Services, Leadership, Exclusive Partners, Success Stories, Students, Institutions, Destinations, Scholarships, Contact.
7. Nav brand now uses the client's actual logo asset (`assets/logo.png`).
8. Bug fixed during verification: an invalid GSAP position string (`"+=-0.55"`) made three hero polaroids skip their sequence and appear at load; rebuilt with absolute positions — memories now enter TL → BR → BL → TR, 0.35s apart, 0.7s after the entrance settles.

## Iteration 3 — the restraint pass (what changed)

Nothing was redesigned; everything was quieted. The concept, structure, and storytelling are untouched.

1. **Hero = one focal point.** Headline → one supporting line → one CTA → globe. The secondary "I'm a university" button was removed (universities keep their nav link and their own section). The cursor glow and third sky blob were deleted.
2. **Memories are earned, not shown.** The hero now pins for ~1500px of scroll; the four polaroids pop in **one at a time** as you scroll — the student makes memories by moving. Hero starts completely clean. (Built with `fromTo` tweens — a `from()` + `invalidateOnRefresh` bug that froze them at opacity 0 was caught and fixed during verification.)
3. **Globe promoted from background to hero.** Bigger (R 0.54), higher center-stage, soft radial atmosphere light, gently pulsing city pins, and it now leans toward your cursor (drift follows pointer). Dot count cut 560 → 420; mid-page it fades to 7% so the background disappears behind content, returning to full at the CTA.
4. **Cinematic journey pacing.** 640 → 820px of scroll per stage, softer crossfades (power2.inOut out / power3.out in), scrub 0.9 — every milestone owns the screen.
5. **Whitespace scale up.** Section padding now `clamp(8rem, 16vh, 13rem)`; section-head margin 4.5 → 7rem; stories gap up. Marquees slowed (48s / 64s). Reveals slowed to 0.8s power3.out. Counters 2.2s. Magnetic strength and tilt reduced — effortless, not springy.
6. **Copy pushed emotionally:** hero CTA "Start Your Journey" · destinations kicker "Where will you go first?" · scholarship band "Dream bigger. Pay less."
7. **Polaroids as framing, not foreground (final micro refinement).** The four memories moved to the true corners — top pair slightly off-screen (magazine-cover peek), bottom pair wide of the builder — so the headline is never squeezed; measured glyph clearance in the browser. Their entrance is no longer scroll-driven: the hero plays fully (headline → sentence → builder → CTA), pauses ~0.7s, then the memories drift in one by one — top-left, bottom-right, bottom-left, top-right — on soft `sine.out`. The hero pin was removed; only the journey pins. Hierarchy on screen and in time: headline, copy, builder, CTA, then memories.
8. **Editorial hero typography (final art direction).** Display font is now **Satoshi 700** (Fontshare; Outfit as fallback) — confident, not loud. Headline reduced to two natural lines with the gradient on a single phrase ("beyond borders"), tracking loosened to −0.025em, max-width 12em so it never breaks awkwardly. The eyebrow was removed; the supporting line now states the business plainly ("We help students study abroad — admissions, scholarships and visas, handled."). New **journey builder** — a glass pill ("I want to study *Masters* in *Canada* → Start Your Journey") — is the hero's one interaction, with a quiet trust line beneath (600+ universities · 20+ countries · Free counselling). Hierarchy: headline → sentence → builder → CTA. *(Builder selects are visual/prototype only — wire to the Students flow when that page exists.)*


> The brand idea in one line: **studying abroad is the brightest thing that will ever happen to you — the site should feel like that morning.**
>
> Iteration 2 responds to client feedback: same story, new light. Dark/tech is gone; the identity now grows out of the actual logo — globe, graduation cap, book, in navy → azure → cyan.

---

## What changed from Iteration 1 (and what stayed)

**Kept (client loved):** the narrative structure, scroll storytelling, the journey concept, "They were here. Now they're there.", the evolving globe, magnetic buttons, marquee, boarding-pass CTA, GSAP + Lenis stack.

**Changed:**
1. **Visual language** — dark "night flight" → bright "daylight": white/off-white, light-blue and soft-purple gradients, subtle glass, sky blobs. Palette derived from the logo.
2. **Journey section rebuilt** — six cramped cards → **one immersive full-screen sequence**: 9 stages (Dream → Career), one stage visible at a time, a plane flying a dotted route, HUD counter (03/09), progress line. Desktop pins and scrubs; mobile reads it as a vertical story.
3. **Photography** — lifestyle imagery everywhere: floating polaroid "memories" in the hero, photo destination cards, split-section photos, campus-life strip. Sells the dream, not the process.
4. **Services woven in as experiences** — For Students (admissions, scholarships, visa, support) and For Universities (recruitment, representation, partnerships, events) as alternating image-left/right sections with chip lists; Scholarships as a full-bleed gradient band.
5. **Globe humanized** — city pins with names (London, Toronto, Sydney…) fade in when facing the viewer; arcs read as flight paths, not data links.
6. **Copy warmed up** — "Your next chapter begins beyond borders." · "Find the place you'll call home." · "Meet your next thousand students." · "Dreams shouldn't have a price tag."

---

## 1 · Homepage structure & rhythm (never repetitive)

| # | Moment | Layout rhythm | Future page it teases |
|---|--------|---------------|----------------------|
| 0 | Preloader — "NOW BOARDING" | — | — |
| 1 | Hero — *Your next chapter begins beyond borders.* | centered + floating photo collage | — |
| 2 | City marquee | full-width ticker | Countries |
| 3 | The Journey — 9 full-screen stages + plane | pinned, one-at-a-time | Students |
| 4 | Find the place you'll call home | horizontal photo rail + arrows | Countries |
| 5 | We've got you. Every step. | split, image **right** | Students |
| 6 | Meet your next thousand students | split, image **left** | Universities |
| 7 | Dreams shouldn't have a price tag + stats | full-bleed gradient band, centered | Scholarships |
| 8 | They were here. Now they're there. | 3-card grid | Success Stories |
| 9 | Your people are already out there | auto-scrolling photo strip | Community/About |
| 10 | Your future has a boarding pass. | centered finale | Contact |
| 11 | Footer (navy) — tagline *Your world. Your education. Our promise.* | — | all |

## 2 · Colour palette (from the logo)
| Token | Value | Role |
|---|---|---|
| `--navy-900` | #0D1F42 | display text, footer |
| `--navy` | #123A7B | brand, buttons-dark |
| `--azure` | #1560BD | primary accent, kickers, links |
| `--cyan` | #14AFD0 | gradient partner, highlights |
| `--sky` | #38BDF8 | light washes only (not text) |
| `--violet` | #8B5CF6 | soft-purple gradient end |
| `--bg` / `--bg-soft` | #FFFFFF / #F4F8FE | backgrounds |
| `--text` / `--text-dim` | #12234A / #4D5E80 | body / secondary (AA+) |
Brand gradient: `azure → cyan → violet` at 100°. Glass: white 72% + blur 14–18px. Shadows are navy-tinted, never gray.

## 3 · Typography
**Display:** Satoshi 500/700 via Fontshare (editorial, youthful, premium; Outfit 500–700 as fallback — max weight 700, never 800). **Body:** Plus Jakarta Sans 400–600.
Fluid scale: step-4 hero ≈ 48–104px … step-0 body 16–18px. Hero/CTA headlines line-height ~1.05, tracking −0.025em, max-width 12em; section H2s line-height 1.02; kickers uppercase +0.28em azure. Gradient treatment on one key phrase per headline only.

## 4 · The journey sequence (implementation)
- Desktop ≥900px: `#journey` pins for `9 × 640px` of scroll; GSAP timeline crossfades stages (out 0.25u, in 0.35u, hold 0.45u), so **one milestone is always fully visible**.
- Plane: `MotionPathPlugin` along `#flightPath` (dashed SVG curve), autoRotate; the dash draws itself behind the plane (`strokeDashoffset`); progress bar scales 0→1; HUD updates 01–09.
- Mobile & reduced-motion: pin/plane/HUD hidden, stages become a generously spaced vertical story.

## 5 · Globe (humanized)
Fixed canvas behind everything. 560 azure dots; 8 named city pins with labels that fade in when front-facing; flight arcs with travelling pulses. Scroll evolves hue azure→cyan→violet, arc density, spin. Dims to 25% behind the journey, returns to full at the CTA. Static single frame under reduced motion.

## 6 · Photography direction
Bright, candid, lifestyle: graduation, plane windows, friends, campus walks, cities, libraries. Polaroid treatment (white frame + handwritten-style caption) for "memory" moments; full-bleed with navy gradient overlay for destination cards. Current images are Unsplash placeholders — swap for brand photography before launch; keep the warm/低-saturation-blue grade.

## 7 · Components shipped
Gradient primary button, ghost button, light-on-navy button (all magnetic) · polaroid figure · destination photo card · chip list · split media card with floating glass mini-card · gradient stat band + counter chips · story card with route codes · photo marquee strip · glass nav + full-screen mobile menu · navy footer.

## 8 · Accessibility & mobile (verified in preview)
No horizontal overflow at ~500px · hamburger menu open/close tested · journey vertical fallback verified · counters render final values under reduced motion · skip link, focus rings (azure), aria labels, sequential headings · rail has buttons + keyboard scroll + region label · all text AA+ on white (sky reserved for washes, azure minimum for small text) · `height:auto` + `aspect-ratio` on photos prevents layout shift.

## 9 · Scaling to remaining pages
- **Students:** opens on the split-section style with the journey sequence condensed to their current stage.
- **Universities:** cyan-led variant; the media-card ("4 new markets") becomes a live stats module.
- **Countries:** the photo rail becomes a full grid; each card expands into a country hero with its own photo + pin on the globe.
- **Success Stories:** route codes as the indexing system; globe draws each route on entry.
- **Contact:** boarding-pass form (Name / Destination / Dream).

## 10 · Wow-moment roadmap
1. Full-screen journey with flying plane (shipped).
2. Globe city pins fading in with names (shipped).
3. Destination card → country page shared-element transition (GSAP Flip).
4. Confetti burst at "Graduate" stage (tiny particles, brand colors, reduced-motion aware).
5. Boarding-pass contact form with stamp animation on submit.

---
*Placeholders to confirm with client: stats (600+/20+/10k+/95%), testimonials, destination list & one-liners, scholarship claims, contact email, final photography.*
