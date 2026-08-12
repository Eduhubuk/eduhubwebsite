# Education Hub — Session Handoff

> Read this + DESIGN-SYSTEM.md before touching anything. The design system is approved and locked.

## Project
- **Location:** `/Users/amreenfirasta/Desktop/Claude_Code/education-hub-v4/` (the ONLY active version — `education-hub`, `-2`, `-v3`, `-v5`, `-v4 copy` are old iterations/backups)
- **Stack:** static HTML + shared `css/style.css` (all design tokens) + per-page JS. GSAP 3.12 + ScrollTrigger (+ MotionPathPlugin on home) + Lenis via jsDelivr CDN. Fonts: Satoshi (Fontshare) display / Plus Jakarta Sans (Google) body. NO build step, NO React — briefs sometimes mention Next.js/Tailwind/shadcn but the approved build is static; port components to vanilla GSAP (precedent: the 21st.dev Card Fan Carousel was ported 1:1 into `js/students.js`).
- **Run:** `npx serve education-hub-v4 -l 4179` (launch.json entry "education-hub-v4" exists) → http://localhost:4179

## Pages done (all verified in-browser)
| Page | File | JS | Signature interactions |
|---|---|---|---|
| Home | index.html | js/main.js | fixed bg globe (azure→violet w/ scroll), draggable memory stack, journey builder, pinned plane journey (9 stages), dest rail, stories |
| About | about.html | js/about.js | student-first 6-chapter scroll story: depth-card hero (tilt+glare), sticky moments, pinned student journey (5), floating panels, waking flat map, fullscreen counters |
| Students | students.html | js/students.js | fan-carousel hero (one line "Find your next home." + 6 country cards, hover push physics), expanding fields row, pinned horizontal support rail |
| Institutions | institutions.html | js/institutions.js | `createGlobe()` factory (hero globe + sticky markets mini-globe, region illumination), scroll-expanding partnership panels; executive/slower motion |
| Contact | contact.html | js/contact.js | glass form with floating labels + inline validation, details card + Google Map, three reasons, an animated journey line (horizontal → vertical), a one-at-a-time FAQ accordion |
| Gallery | gallery.html | js/gallery.js | the 21st.dev **SphereImageGrid** ported 1:1 to vanilla JS (Fibonacci sphere, rotation matrices, fade zones, collision pass, momentum + auto-rotate, click-to-enlarge) on the shared gradient mesh with generous whitespace — no vignette, no dark section |
| Partners | partners.html | js/partners.js | hero + two flip cards (approved, unchanged) that now also switch a **dynamic university profile** below them — 10 brochure-sourced sections each, GSAP fade/slide + height animation |
| ~~Partners (cards only)~~ | partners.html | js/partners.js | two photographic glass cards (campus front under a navy veil) that tilt + glare under the cursor and flip 180° into a Ken Burns destination back; hero is one line only |

## Remaining pages (from nav/footer)
- **Stories / Success Stories** (nav "Stories" → index.html#stories currently). ⚠ The homepage story cards (Ayesha K. / Rahul S. / Zara M.) are invented — there is no approved testimonial content in v3. Get real, consented stories before building this page.
- **Services** (footer link "#") — v3 services.html has five service blocks with bullet lists + the four-step Understand/Develop/Engage/Grow approach. *(Note: the docs say "6 service lines" but v3 shows five — confirm before building.)*
- **Leadership** (footer "#") — v3 has only one unattributed quote signed "Founder & CEO"; no name, bio or portrait. Needs client input.
- index.html nav still has user-edited placeholder anchors for Services/Contact; "Partners" now points at partners.html.

## Nav/footer wiring (as of the Contact build)
Primary nav + mobile menu on every page: About · Students · Institutions · Partners · Gallery · Stories · **Contact** (7 links — measured 589px at 1280, 40px clear of the CTA, no overflow). index.html additionally keeps its user-added "Services" placeholder (8 links). Footer Company column carries Exclusive Partners · Gallery · Contact on all seven pages. Verified programmatically across all seven: no duplicate nav entries, Contact present in nav, mobile menu and footer.

⚠ **Careful with bulk link edits.** A `perl -0pi` pass keyed on `<a href="gallery.html">Gallery</a>` matches inside *both* the nav and the footer, and a second pass keyed on the Stories link then double-inserts. index.html is a further exception — its Stories link is `#stories`, not `index.html#stories`. Edit per region (nav / mobile-menu / footer Company column) and verify counts per region afterwards.

## Hard rules learned across 20+ iterations
1. **Content:** ONLY from approved v3 site (`../education-hub-v3/*.html`) — regions: South Asia (India, Nepal, Bangladesh, Pakistan, Sri Lanka), Middle East (UAE, Saudi, Oman, Qatar, Bahrain, Kuwait), Africa (Kenya, Nigeria, Ghana, Tanzania, Uganda, Rwanda); 17+ countries; 3 regions; 6 service lines; UK HQ; emails pbhatia@ / partnerships@edu-hub.org.uk. NEVER invent stats/countries/partners.
2. **⚠ Open flag:** homepage hero says "600+ universities · 20+ countries" (placeholder) vs approved "17+ countries" — reconcile before launch.
3. **Design tokens live in `:root` of style.css** — navy #123A7B, azure #1560BD, cyan #14AFD0, violet #8B5CF6, grad-brand, Satoshi 700 max weight, fluid steps, sp-1..7. New pages: append page-scoped CSS to style.css, copy the shared JS block pattern (Lenis/nav/menu/reveals/magnetic/press) from students.js.
4. **Per-page body class** (`.page-about` etc.) for scoped overrides. Every page: pagebar, sky-blobs, same nav/footer (About/Students/Institutions active states), skip-link, reduced-motion + <900px fallbacks (unpin everything, static reveals).
5. **GSAP gotchas already hit:** `"+=-0.55"` is invalid position syntax; `from()` + `invalidateOnRefresh` re-records hidden states (use `fromTo`); globe pin/route indices must be `% N`; `[hidden]` needs `display:none` guard when class sets display.
6. **Preview pane quirks:** programmatic `scrollTo` desyncs Lenis/ScrollTrigger (use wheel-event dispatch or `ScrollTrigger.refresh()` and treat torn screenshots as artifacts); pane often opens <900px (mobile tier) — resize to 1280×800 for desktop checks; verify via DOM state, images via network panel.
   **The pane also backgrounds itself between tool calls** — `document.hidden` goes true, rAF stops, `gsap.ticker.frame` stays at 0 and every tween sits frozen at its from-state (which reads exactly like an animation bug: elements stuck at opacity 0, blank layers, nonsense ScrollTrigger start/end because `innerHeight` is 0). Check `innerHeight`/`gsap.ticker.frame` before believing a failure; `preview_start` or a screenshot wakes it; `gsap.globalTimeline.time(t + n)` advances the clock manually when you just need the end state. `computer` scroll/click time out while it's hidden — a tall viewport (e.g. 1280×1500) shows the whole short page without scrolling.
   Port 4179 is often held by another session: launch entry **education-hub-v4-verify** (autoPort, 4183) serves the same folder for parallel verification.
7. **Anything on the back of a flip must be a CSS `background-image`, never an `<img>`.** An image that finishes decoding while its layer is turned away (`backface-visibility: hidden` + `rotateY(180deg)`) loads fine — correct `naturalWidth`, `complete: true`, on top per `elementFromPoint` — and still paints as an empty panel. `decode()` priming does not fix it; a visibility swap at the midpoint makes it worse. Backgrounds paint as part of the layer. (Partners URLs live in the `.p-kb i` / `.p-front-bg` rules keyed by `data-partner`.)
8. **Short pages can load already inside their own reveal trigger** (also true of deep links and mid-page reloads) — the ScrollTrigger never fires and the element stays hidden. Use the `revealOnce()` pattern in `js/partners.js`: always `fromTo`, and play immediately if the trigger is on screen when the tween is created.
9. **On a flip card, the away-facing face must be `pointer-events: none`.** It still occupies the same box — on Partners, `.p-back-copy` sits exactly over the Download Brochure button — and browsers that hit-test an away-facing backface let it swallow clicks meant for the control underneath (the click lands on the back, which isn't a control, so the card flips instead of downloading; symptom seen in the wild: "only the icon is clickable"). `.p-back` is inert until `.is-flipped`, and `.p-front` goes inert while flipped.
10. **A hover tilt will steal clicks from any button inside the card.** The tilt lifts the card 38px toward the viewer; under `perspective` that enlarges and rotates it over a 0.7s tween, which is enough to slide a button out from under a *stationary* cursor between mousedown and mouseup. The browser then fires `click` on the nearest common ancestor — the card — so the card flips and the button's default action (the download) never runs. Symptoms: "the button flips the card", "only part of the button works". **Fix: freeze the tilt while a press is in progress** (`pressing` flag in `js/partners.js`), and decide the flip from the *pointerdown* target rather than the click target. Neither synthetic events nor `elementFromPoint` reproduce this — only a real trusted click does, so debug it with a document-level listener logging `e.target`/`e.isTrusted`.
11. **Freeze a `quickTo` by retargeting it to its current value, never with `killTweensOf`** — killing the tween permanently breaks the quickTo instance and that property never animates again.
12. **Use bubble-phase `stopPropagation()` on controls, not capture-phase.** Chrome visits a target's capture and bubble listeners separately, so a capture-phase stop also silences that element's *own* bubble listeners — which killed the `.btn` press animation and left the brochure button with no feedback at all. Never `preventDefault()`; the default action is what downloads the PDF.
13. **Partner page content comes only from `/brochures/`.** Extract with `pypdf` (installed via `pip install --user pypdf pillow`). LAAT's deck bakes letter-spacing into its text — de-space by splitting on 2+ spaces and joining single-spaced characters. ArkAngel's images are Adobe CMYK JPEGs: the raw DCT streams render inverted, so open with Pillow, `ImageChops.invert`, convert to RGB. LAAT's deck has no photography at all — its overview image and gallery are omitted rather than filled.
14. **A tween created inside a timeline `.add()` callback is not part of that timeline** — the timeline's `onComplete` fires while it is still running. Anything that must happen after such a tween (releasing an animated height back to `auto`) belongs on that tween's own `onComplete`.
15. Brochures are the real client PDFs in `brochures/`, linked root-relative (`/brochures/arkangel-brochur.pdf`, `/brochures/laat-brochure.pdf`) with `download` — root-relative means the site must be served from a domain root, not a subdirectory. Photos are Unsplash placeholders (all current URLs verified loading; `photo-1523050854058` is DEAD, don't reuse). Logo: `assets/logo.png` (user-provided, in nav at 34px).


## Final change list — implemented (this session, 2026-08-12)

The 30-point client change list is done except email sending (explicitly deferred by the client until the site moves to their hosting — forms still build a `mailto:`; routing/labels come from data-attributes on each `<form>`).

**New pages:** `courses-ug.html`, `courses-pg.html`, `short-courses.html`, `course.html` (detail via `#slug` hash), `contact-students.html`, `contact-institutions.html`, `contact-partners.html`.
**New JS:** `js/nav.js` (dropdowns, all pages), `js/courses.js` + `js/courses-data.js` (LAAT-extracted, edit the data file to update courses), `js/destinations-data.js` (7-section destination guides; accordion logic appended to `js/main.js`).
**Nav:** Home · About · Courses▾ · Institutions · Exc Partners · Contact▾ on all 14 pages (desktop + mobile groups + footer). Gallery de-linked everywhere and `noindex`ed; component untouched. Students page remains, linked from the footer only.
**Routing:** student + channel-partner forms → pbhatia@; institution forms → partnerships@. Apply Now everywhere → `contact-students.html#course=<name>` (hash, NOT query — `npx serve`'s clean-URL redirect drops query strings).
**Claim:** 100+ universities · 20+ countries (client-final; also stats band + journey stage 03). Testimonials retained per client.
**Logo:** nav/footer now use `assets/logo-nav.png` (trimmed crop of logo.png, which had 42% transparent padding) at 44px/34px.
**Type scale:** `--step-0…4` and all hardcoded heading clamps reduced ~15–20% at the top end — do not "restore" them from old muscle memory.
**Marquee:** official partner logos in `assets/partners/logos/` (sources logged in DESIGN-SYSTEM.md Chapter Nine). Anglia Ruskin's mark is officially yellow-on-dark only → navy chip. Images must stay eager-loaded (lazy never fires while the pane is hidden).
**Client flags still open:** ARU dark-tile treatment (or request brand pack); "SP Jain London" sourced from spjain.org — confirm the client means SP Jain School of Global Management, not the separate SP Jain London School of Management; "PMU – UK" interpreted as Plymouth Marjon University; partner commission figures are displayed publicly on short-courses per the client's instruction — confirm they want that public.
**Preloader gotcha (new):** on index, when the pane backgrounds itself the preloader freezes at opacity 1 and every screenshot is pure white — advance `gsap.globalTimeline.time(+15)` or verify via DOM.

## Where the record lives
`DESIGN-SYSTEM.md` — every iteration logged with what/why/verification. Keep appending.
