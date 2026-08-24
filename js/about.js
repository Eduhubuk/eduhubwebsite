/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · ABOUT — one continuous experience
   Student-first. Same hands as the homepage; every chapter
   breathes: living hero, sticky story, journey sequence,
   waking map, fullscreen moments. GPU transforms only.
   ═══════════════════════════════════════════════════════════ */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDesktop = window.matchMedia("(min-width: 900px)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

gsap.registerPlugin(ScrollTrigger);

/* ── Lenis smooth scroll ── */
let lenis = null;
if (!prefersReduced && typeof Lenis !== "undefined") {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
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

/* ── page scroll progress ── */
if (!prefersReduced) {
  gsap.to(".pagebar i", {
    scaleX: 1, ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.4 },
  });
}

/* ── nav ── */
const nav = document.getElementById("nav");
ScrollTrigger.create({
  start: 40,
  onUpdate: (self) => nav.classList.toggle("scrolled", self.scroll() > 40),
});
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

/* ── hero: entrance, cursor parallax, scroll-out ── */
if (!prefersReduced) {
  gsap.timeline()
    .from(".s-hero .kicker", { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" }, 0.1)
    .from(".s-hero-title .line", { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "expo.out" }, 0.2)
    .from(".s-hero-sub", { opacity: 0, y: 14, duration: 0.6, ease: "power2.out" }, "-=0.5")
    .from(".s-hero-actions .btn", { opacity: 0, y: 14, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.4")
    .from(".s-hero-media", { opacity: 0, x: 40, duration: 1.0, ease: "power3.out" }, 0.35)
    .from(".s-hero-media img", { scale: 1.12, duration: 1.6, ease: "power2.out" }, 0.35)
    .from(".s-hero .hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.4");

  // idle life: the card sways less than a degree, forever
  if (isDesktop) {
    gsap.to(".card-inner", { rotation: 0.7, duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
    gsap.to(".s-hero-media", { y: "+=6", duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
  }

  // the depth card: hero-level nudge (≤8px) + card-level 3D tilt with glare
  if (finePointer && isDesktop) {
    const heroEl = document.querySelector(".s-hero");
    heroEl.addEventListener("mousemove", (e) => {
      const r = heroEl.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(".s-hero-media", { x: px * 8, y: py * 6, duration: 0.8, ease: "power2.out" });
      gsap.to(".mesh", { xPercent: px * -2, yPercent: py * -2, duration: 1.2, ease: "power2.out" });
    });
    heroEl.addEventListener("mouseleave", () => {
      gsap.to(".s-hero-media", { x: 0, y: 0, duration: 0.9, ease: "power3.out" });
      gsap.to(".mesh", { xPercent: 0, yPercent: 0, duration: 0.9, ease: "power3.out" });
    });

    const card = document.querySelector(".card-inner");
    const glare = document.querySelector(".card-glare");
    const cardImg = card.querySelector("img");
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotationX: py * -8, rotationY: px * 9, transformPerspective: 900, duration: 0.5, ease: "power2.out" });
      gsap.to(cardImg, { x: px * -8, y: py * -6, scale: 1.05, duration: 0.5, ease: "power2.out" });
      gsap.to(glare, { xPercent: px * 46, yPercent: py * 46, opacity: 0.55, duration: 0.5, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.55)" });
      gsap.to(cardImg, { x: 0, y: 0, scale: 1, duration: 0.9, ease: "power3.out" });
      gsap.to(glare, { opacity: 0, duration: 0.5, ease: "power2.out" });
    });
    card.addEventListener("mousedown", () => gsap.to(card, { scale: 0.985, duration: 0.15, ease: "power2.out" }));
    ["mouseup", "mouseleave"].forEach((ev) =>
      card.addEventListener(ev, () => gsap.to(card, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }))
    );
  }

  // scrolling away: image grows slightly, copy drifts up faster, hero hands off softly
  gsap.to(".s-hero-media img", { scale: 1.07, ease: "none",
    scrollTrigger: { trigger: ".s-hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".s-hero-copy", { yPercent: -12, opacity: 0.4, ease: "none",
    scrollTrigger: { trigger: ".s-hero", start: "top top", end: "bottom 30%", scrub: true } });
}

/* ── chapter 1: sticky story — brightening moments, zooming image, rail ── */
if (!prefersReduced && isDesktop) {
  gsap.utils.toArray(".moment").forEach((m) => {
    ScrollTrigger.create({
      trigger: m,
      start: "top 55%",
      end: "bottom 45%",
      onToggle: (self) => m.classList.toggle("is-on", self.isActive),
    });
  });
  gsap.fromTo(".why-media img", { scale: 1.0 }, { scale: 1.14, ease: "none",
    scrollTrigger: { trigger: ".why-story", start: "top top", end: "bottom bottom", scrub: true } });
  gsap.to(".why-rail i", { scaleY: 1, ease: "none",
    scrollTrigger: { trigger: ".moments", start: "top 55%", end: "bottom 60%", scrub: 0.4 } });
} else {
  document.querySelectorAll(".moment").forEach((m) => m.classList.add("is-on"));
}

/* ── shared: pinned fade-through sequence ── */
function pinSequence({ trigger, slides, per = 750, onIndex, onProgress, onActivate }) {
  const n = slides.length;
  gsap.set(slides, { autoAlpha: 0, y: 40 });
  gsap.set(slides[0], { autoAlpha: 1, y: 0 });
  let lastIdx = 0;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: () => "+=" + n * per,
      scrub: 0.7,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (onProgress) onProgress(self.progress);
        const idx = Math.min(n - 1, Math.floor(self.progress * n));
        if (idx !== lastIdx) {
          lastIdx = idx;
          if (onIndex) onIndex(idx);
          if (onActivate) onActivate(slides[idx], idx);
        }
      },
    },
  });
  slides.forEach((s, i) => {
    if (i === 0) return;
    tl.to(slides[i - 1], { autoAlpha: 0, y: -34, scale: 0.965, duration: 0.34, ease: "power2.inOut" }, i)
      .fromTo(s, { autoAlpha: 0, y: 46, scale: 1.02 },
                 { autoAlpha: 1, y: 0, scale: 1, duration: 0.46, ease: "power3.out" }, i + 0.14);
  });
  tl.to({}, { duration: 1 }, n);
  return tl;
}

/* per-slide flourishes: chip pops, number settles */
function slideFlourish(slide) {
  const chip = slide.querySelector(".step-chip");
  const num = slide.querySelector(".slide-num");
  if (chip) gsap.fromTo(chip, { autoAlpha: 0, y: 10, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, delay: 0.25, ease: "back.out(1.6)" });
  if (num) gsap.fromTo(num, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 0.13, duration: 0.8, ease: "power3.out" });
  const img = slide.querySelector(".slide-media img");
  if (img) gsap.fromTo(img, { scale: 1.07 }, { scale: 1, duration: 1.1, ease: "power2.out" });
}

/* ── chapter 2: the student journey ── */
if (!prefersReduced && isDesktop) {
  const slides = gsap.utils.toArray(".seq .slide");
  const dots = gsap.utils.toArray(".seq .rail-dot");
  const setDots = (idx) => dots.forEach((d, i) => d.classList.toggle("on", i === idx));
  setDots(0);
  pinSequence({
    trigger: ".seq",
    slides,
    per: 760,
    onIndex: setDots,
    onActivate: slideFlourish,
    onProgress: (p) => {
      gsap.set(".rail-fill", { scaleY: p });
      gsap.set(".seq .seq-bg", { opacity: p }); // the room slowly changes light
    },
  });
} else if (!prefersReduced) {
  gsap.utils.toArray(".seq .slide").forEach((s) => {
    gsap.from(s, {
      opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: s, start: "top 86%" },
    });
  });
}

/* ── chapter 5: at a glance — fullscreen moments with chips ── */
function glanceCount(slide) {
  const el = slide.querySelector(".g-num[data-count]");
  if (el) {
    const end = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 1.1, ease: "power2.out",
      onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
    });
  }
  const chips = slide.querySelectorAll(".g-chips span");
  if (chips.length) gsap.fromTo(chips, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07, delay: 0.3, ease: "power2.out" });
}
if (!prefersReduced && isDesktop) {
  const gSlides = gsap.utils.toArray(".g-slide");
  pinSequence({
    trigger: ".glance-seq",
    slides: gSlides,
    per: 620,
    onActivate: glanceCount,
    onProgress: (p) => {
      gsap.set(".g-bar i", { scaleX: p });
      gsap.set(".glance-bg", { opacity: p });
    },
  });
  glanceCount(gSlides[0]);
} else if (!prefersReduced) {
  gsap.utils.toArray(".g-slide").forEach((s) => {
    ScrollTrigger.create({ trigger: s, start: "top 86%", once: true, onEnter: () => glanceCount(s) });
  });
}

/* ── chapter 4: the map wakes — illumination, paths, pulses ── */
(() => {
  const regions = gsap.utils.toArray(".region");
  if (!regions.length) return;

  const illuminate = () => {
    [".region-sa", ".region-me", ".region-af"].forEach((sel, i) => {
      gsap.delayedCall(0.25 + i * 0.4, () => document.querySelector(sel).classList.add("lit"));
    });
    // connection paths draw themselves once the regions are awake
    gsap.delayedCall(1.3, () => {
      document.querySelectorAll(".mpath").forEach((p, i) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
        p.classList.add("on");
        gsap.to(p, { strokeDashoffset: 0, duration: 1.2, delay: i * 0.3, ease: "power2.inOut",
          onComplete: () => { p.style.strokeDasharray = "2 1.4"; p.style.strokeDashoffset = "0"; } });
      });
    });
  };
  if (!prefersReduced) {
    ScrollTrigger.create({ trigger: ".map-canvas", start: "top 75%", once: true, onEnter: illuminate });
    gsap.fromTo(".map-canvas", { scale: 1.035, y: 24 }, { scale: 1, y: 0, ease: "none",
      scrollTrigger: { trigger: ".reach", start: "top 85%", end: "top 25%", scrub: 0.6 } });
  } else {
    regions.forEach((r) => r.classList.add("lit"));
    document.querySelectorAll(".mpath").forEach((p) => p.classList.add("on"));
  }

  const panels = gsap.utils.toArray(".map-countries");
  const hint = document.querySelector(".map-hint");
  let active = null;
  const show = (key) => {
    if (key === active) return;
    active = key;
    regions.forEach((r) => {
      const on = r.dataset.region === key;
      r.classList.toggle("is-active", on);
      r.setAttribute("aria-pressed", String(on));
    });
    if (hint) hint.hidden = !!key;
    panels.forEach((p) => {
      const on = p.dataset.for === key;
      if (on && p.hidden) {
        p.hidden = false;
        if (!prefersReduced) {
          gsap.fromTo(p.querySelectorAll("span, b"),
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.035, ease: "power2.out" });
        }
      } else if (!on) {
        p.hidden = true;
      }
    });
  };
  regions.forEach((r) => {
    if (finePointer) {
      r.addEventListener("mouseenter", () => show(r.dataset.region));
      r.addEventListener("click", () => show(r.dataset.region)); // click confirms, never blanks
    } else {
      r.addEventListener("click", () => show(r.dataset.region === active ? null : r.dataset.region));
    }
    r.addEventListener("focus", () => show(r.dataset.region));
  });
})();

/* ── chapter 3: panels — tilt + everything already floats via CSS ── */
if (finePointer && !prefersReduced) {
  document.querySelectorAll(".tilt").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 4;
      gsap.to(el, { rotateX: rx, rotateY: ry, transformPerspective: 800, duration: 0.5, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () =>
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" })
    );
  });
}

/* ── gentle reveals for everything that simply arrives ── */
if (!prefersReduced) {
  gsap.utils.toArray(".section-head, .panel, .map-canvas, .map-detail, .belief > *, .lm-prose > *, .lm-sub, .lm-sub-note, .lm-sign").forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
    });
  });
  gsap.from(".cta-title .line", {
    yPercent: 110, duration: 0.9, stagger: 0.1, ease: "expo.out",
    scrollTrigger: { trigger: ".cta", start: "top 70%" },
  });
  gsap.from(".cta-actions", {
    opacity: 0, y: 18, duration: 0.6, ease: "power2.out", delay: 0.2,
    scrollTrigger: { trigger: ".cta", start: "top 70%" },
  });
}

/* ── micro-interactions — identical hands to the homepage ── */
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
