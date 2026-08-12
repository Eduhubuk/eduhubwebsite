/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · COURSES — one script for the UG / PG / Short
   listing pages and the course detail page. Content renders
   from js/courses-data.js (no runtime dependency on LAAT).
   Shared motion block follows the same pattern as contact.js.
   ═══════════════════════════════════════════════════════════ */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

gsap.registerPlugin(ScrollTrigger);

/* ── Lenis ── */
if (!prefersReduced && typeof Lenis !== "undefined") {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -60 });
    });
  });
}

/* ── page progress + nav + menu ── */
if (!prefersReduced) {
  gsap.to(".pagebar i", { scaleX: 1, ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.4 } });
}
const nav = document.getElementById("nav");
ScrollTrigger.create({ start: 40, onUpdate: (s) => nav.classList.toggle("scrolled", s.scroll() > 40) });
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("mobile-menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  })
);

/* ── reveal helper — fromTo, and play at once if already on screen ── */
function revealOnce(el, from, to, triggerEl, startAt = 0.86) {
  if (prefersReduced || !el) return;
  const trigger = triggerEl || (typeof el === "string" ? document.querySelector(el) : el);
  if (!trigger) return;
  const tween = gsap.fromTo(el, from, { ...to, paused: true });
  if (trigger.getBoundingClientRect().top < window.innerHeight * startAt) { tween.play(); return; }
  ScrollTrigger.create({ trigger, start: `top ${startAt * 100}%`, once: true, onEnter: () => tween.play() });
}

/* ── hero (same voice as the contact hero) ── */
if (!prefersReduced) {
  gsap.timeline()
    .from(".c-hero-title .line", { yPercent: 110, duration: 0.95, stagger: 0.09, ease: "expo.out" }, 0.2)
    .from(".c-hero-sub, .cd-meta", { opacity: 0, y: 16, duration: 0.7, ease: "power2.out", stagger: 0.08 }, 0.65);
}

/* ═════════ RENDERING ═════════ */
const DATA = window.EDUHUB_COURSES || {};
const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/* hash, not query: static hosts with clean-URL redirects (npx serve, and
   Vercel if cleanUrls is ever enabled) drop query strings on the redirect —
   the hash always survives. */
const applyHref = (name) => `contact-students.html#course=${encodeURIComponent(name)}`;

const metaRow = (label, value) =>
  value ? `<li><b>${esc(label)}</b><span>${esc(value)}</span></li>` : "";

/* ── listing pages: <div class="course-grid" data-level="ug|pg"> ── */
document.querySelectorAll(".course-grid[data-level]").forEach((grid) => {
  const list = DATA[grid.dataset.level] || [];
  grid.innerHTML = list.map((c) => `
    <article class="panel course-card">
      <span class="crs-badge">Awarded by ${esc(c.awarding)}</span>
      <h3>${esc(c.name)}</h3>
      <ul class="course-meta">
        ${metaRow("Location", c.location)}
        ${metaRow("Duration", c.duration)}
        ${metaRow("Intakes", c.intakes)}
        ${metaRow("Tuition", c.tuition)}
        ${metaRow("Application fee", c.applicationFee)}
        ${metaRow("Assessment", c.assessment)}
      </ul>
      <p class="course-overview">${esc(c.overview.split(". ")[0].replace(/\.$/, ""))}.</p>
      <div class="course-actions">
        <a class="btn btn-ghost" href="course.html#${esc(c.slug)}">View course
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>
        </a>
        <a class="btn btn-primary" href="${applyHref(c.name)}">Apply Now
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>
        </a>
      </div>
    </article>`).join("");
  revealOnce(grid.children, { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: "power3.out" }, grid);
});

/* ── short courses page ── */
(() => {
  const marjonGrid = document.querySelector("[data-short-marjon]");
  if (!marjonGrid) return;

  const t = DATA.shortMarjon.terms;
  const termsEl = document.querySelector("[data-short-terms]");
  termsEl.innerHTML = [
    ["Course fee", t.fee],
    ["Minimum batch size", t.minBatch],
    ["Maximum batch size", t.maxBatch],
    ["Intakes", t.intakes],
    ["Partner commission", t.commission],
  ].map(([b, v]) => `<div class="sc-term"><b>${esc(b)}</b><span>${esc(v)}</span></div>`).join("");

  marjonGrid.innerHTML = DATA.shortMarjon.courses.map((c) => `
    <article class="panel course-card">
      <span class="crs-badge">Awarded by Plymouth Marjon University</span>
      <h3>${esc(c.name)}</h3>
      <ul class="course-meta">
        ${metaRow("Duration", c.duration)}
        ${metaRow("Intakes", t.intakes)}
        ${metaRow("Course fee", t.fee)}
      </ul>
      <p class="course-overview">${esc(c.overview)}</p>
      <div class="course-actions">
        <a class="btn btn-primary" href="${applyHref(c.name)}">Apply Now
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>
        </a>
      </div>
    </article>`).join("");

  const n = DATA.ncfe.course;
  document.querySelector("[data-short-ncfe]").innerHTML = `
    <article class="panel course-card">
      <span class="crs-badge">Awarded by ${esc(n.awarding)}</span>
      <h3>${esc(n.name)}</h3>
      <ul class="course-meta">
        ${metaRow("Course type", n.type)}
        ${metaRow("Course fee", n.fee)}
        ${metaRow("Partner commission", n.commission)}
      </ul>
      <div class="course-actions">
        <a class="btn btn-primary" href="${applyHref(n.name)}">Apply Now
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>
        </a>
      </div>
    </article>`;

  document.querySelector("[data-short-more]").innerHTML = DATA.shortLaat
    .map((name) => `<a href="${applyHref(name)}">${esc(name)}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="12" height="12" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg></a>`)
    .join("");

  [termsEl, marjonGrid, document.querySelector("[data-short-ncfe]"), document.querySelector("[data-short-more]")]
    .forEach((el) => revealOnce(el.children, { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" }, el));
})();

/* ── course detail page ── */
(() => {
  if (!document.body.classList.contains("page-course-detail")) return;
  const slug = new URLSearchParams(location.search).get("course") ||
    decodeURIComponent(location.hash.replace(/^#/, ""));
  const course = [...(DATA.ug || []), ...(DATA.pg || [])].find((c) => c.slug === slug);
  const detail = document.querySelector(".cd-grid");
  const heroSub = document.querySelector(".c-hero .crs-badge");

  if (!course) {
    detail.style.display = "none";
    document.querySelector(".cd-missing").style.display = "block";
    document.getElementById("cd-name").textContent = "Course not found";
    if (heroSub) heroSub.style.display = "none";
    return;
  }

  document.title = `${course.name} — Courses · Education Hub`;
  document.getElementById("cd-name").innerHTML =
    `<span class="line">${esc(course.name)}</span>`;
  heroSub.textContent = `Awarded by ${course.awarding}`;
  document.querySelector("[data-cd-overview]").textContent = course.overview;

  document.querySelector("[data-cd-facts]").innerHTML = [
    ["Awarding institution", course.awarding],
    ["Location", course.location],
    ["Duration", course.duration],
    ["Intakes", course.intakes],
    ["Delivery", course.delivery],
    ["Assessment", course.assessment],
    ["Tuition", course.tuition],
    ["Application fee", course.applicationFee],
  ].map(([l, v]) => metaRow(l, v)).join("");

  document.querySelector("[data-cd-entry]").innerHTML =
    course.entry.map((e) => `<li>${esc(e)}</li>`).join("");

  document.querySelector("[data-cd-structure]").innerHTML = course.structure.map((s) => `
    <div class="cd-stage">
      <h3>${esc(s.stage)}</h3>
      <ul>${s.modules.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
    </div>`).join("");

  document.querySelectorAll("[data-cd-apply]").forEach((a) => { a.href = applyHref(course.name); });

  revealOnce(".cd-main > *", { opacity: 0, y: 26 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power3.out" }, detail);
  revealOnce(".cd-facts", { opacity: 0, y: 26 },
    { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: "power3.out" }, detail);
})();

/* ── section heads + CTA ── */
if (!prefersReduced) {
  gsap.utils.toArray(".section-head").forEach((el) =>
    revealOnce(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, el)
  );
  const cta = document.querySelector(".cta");
  revealOnce(".cta-title .line", { yPercent: 110 },
    { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "expo.out" }, cta, 0.7);
  revealOnce(".cta-actions", { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }, cta, 0.7);
}

/* ── micro-interactions ── */
if (finePointer && !prefersReduced) {
  document.querySelectorAll(".btn").forEach((el) => {
    el.addEventListener("mousedown", () => gsap.to(el, { scale: 0.965, duration: 0.12, ease: "power2.out" }));
    ["mouseup", "mouseleave"].forEach((ev) =>
      el.addEventListener(ev, () => gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.out" }))
    );
  });
  document.querySelectorAll(".magnetic").forEach((el) => {
    const strength = 0.24;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - r.left - r.width / 2) * strength,
        y: (e.clientY - r.top - r.height / 2) * strength,
        duration: 0.3, ease: "power2.out",
      });
    });
    el.addEventListener("mouseleave", () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" })
    );
  });
}

window.addEventListener("load", () => ScrollTrigger.refresh());
