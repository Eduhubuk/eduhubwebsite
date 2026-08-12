# Education Hub website (v4 — the ONLY active version)

Approved premium static site: HTML + shared css/style.css + per-page JS (GSAP/ScrollTrigger/Lenis via CDN). No build step, no React — port any React component briefs to vanilla GSAP.

**Before any work: read `HANDOFF.md` (current state, hard rules, GSAP gotchas) and `DESIGN-SYSTEM.md` (iteration record).**

Non-negotiables:
- Do not redesign; the design system is approved. Tokens in `:root` of css/style.css; Satoshi display (700 max) + Plus Jakarta Sans.
- Content only from the approved v3 site (`../education-hub-v3/`). Never invent stats, countries, partners, or services. Approved: 17+ countries, 3 regions (South Asia/Middle East/Africa with fixed country lists), 6 service lines, UK HQ.
- Every page: shared nav/footer, body page-class, pagebar, sky-blobs, reduced-motion + <900px fallbacks (unpin, static reveals).
- Verify in the browser preview (port 4179, launch entry "education-hub-v4"); resize pane to 1280×800 for desktop checks; log each iteration in DESIGN-SYSTEM.md.

Done: index, about, students, institutions, partners, gallery, contact. Remaining: Stories, Services, Leadership.
