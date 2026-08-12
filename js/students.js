/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · STUDENTS — one line, one fan
   Fan geometry & hover physics ported from the 21st.dev
   Card Fan Carousel (React→vanilla GSAP, 1:1 math).
   Plus: cursor depth on the whole fan, expanding fields,
   pinned support rail. Same motion language as the site.
   ═══════════════════════════════════════════════════════════ */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDesktop = window.matchMedia("(min-width: 900px)").matches;
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

/* ═════════════════ THE FAN ═════════════════ */
(() => {
  const stage = document.querySelector(".fan-stage");
  if (!stage) return;
  const cards = gsap.utils.toArray(stage.querySelectorAll(".fan-card"));
  const total = cards.length;
  if (!total) return;

  const mult = () => {
    const w = window.innerWidth;
    return w < 480 ? 0.28 : w < 640 ? 0.38 : w < 768 ? 0.5 : w < 1024 ? 0.75 : 1.0;
  };
  const hMult = () => {
    const w = window.innerWidth;
    const ideal = (w < 480 ? 22 : w < 640 ? 26 : w < 768 ? 28 : w < 1024 ? 34 : 38) * 16;
    const available = window.innerHeight * 0.7;
    return available >= ideal ? 1 : available / ideal;
  };
  // symmetric fan for any card count
  const slotConfig = (slot) => {
    const center = (total - 1) / 2;
    const distance = total > 1 ? (slot - center) / center : 0;
    const a = Math.abs(distance);
    return { rot: distance * 21, scale: 1.0 - 0.2244 * a * a, x: distance * 30, y: a * a * 7.3, z: 10 - Math.round(Math.abs(slot - center)) };
  };

  let entered = false;
  let isAnimating = true;

  function layoutBase(animate) {
    const m = mult(), hm = hMult();
    cards.forEach((card, slot) => {
      const c = slotConfig(slot);
      gsap[animate ? "to" : "set"](card, {
        xPercent: -50, yPercent: -50,
        x: `${c.x * m}rem`, y: `${c.y * hm}rem`,
        rotation: c.rot, scale: c.scale, opacity: 1, zIndex: c.z,
        ...(animate ? { duration: 0.5, ease: "power2.out", overwrite: "auto" } : {}),
      });
    });
  }

  // entrance: rise from below, elastic settle (as the original)
  {
    const m = mult(), hm = hMult();
    let done = 0;
    cards.forEach((card, slot) => {
      const c = slotConfig(slot);
      gsap.set(card, { xPercent: -50, yPercent: -50, x: 0, y: `${12 * hm}rem`, rotation: 0, scale: 0.5, opacity: 0, zIndex: c.z });
      gsap.to(card, prefersReduced
        ? { x: `${c.x * m}rem`, y: `${c.y * hm}rem`, rotation: c.rot, scale: c.scale, opacity: 1, duration: 0.01,
            onComplete: () => { if (++done >= total) { isAnimating = false; entered = true; } } }
        : { x: `${c.x * m}rem`, y: `${c.y * hm}rem`, rotation: c.rot, scale: c.scale, opacity: 1,
            duration: 1.2, ease: "elastic.out(1.05,.78)", delay: 0.45 + slot * 0.06,
            onComplete: () => { if (++done >= total) { isAnimating = false; entered = true; } } });
    });
  }

  /* hover physics — the original's push algorithm */
  if (finePointer && !prefersReduced) {
    let activeSlot = null, leaveTimer = null;
    const centerSlot = total >> 1;
    const layoutHover = (hovered) => {
      const m = mult(), hm = hMult();
      cards.forEach((el, slot) => {
        const base = slotConfig(slot);
        let tx = base.x * m, ty = base.y * hm, tr = base.rot, ts = base.scale, delay = 0;
        if (hovered !== null) {
          const distance = Math.abs(slot - hovered);
          delay = distance * 0.02;
          if (slot === hovered) { ty -= 2.5 * hm; ts *= 1.08; }
          else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const push = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));
            if (slot < hovered) { tx -= push * m; tr -= 3 / (distance + 1); }
            else { tx += push * m; tr += 3 / (distance + 1); }
            if (slot === total - 1 && hovered < centerSlot) ty -= 1 * hm;
            if (slot === 0 && hovered > centerSlot) ty -= 1 * hm;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }
        gsap.to(el, { x: `${tx}rem`, y: `${ty}rem`, rotation: tr, scale: ts, duration: 0.5, delay, ease: "elastic.out(1,.75)", overwrite: "auto" });
        gsap.set(el, { zIndex: slotConfig(slot).z });
      });
    };
    cards.forEach((el, slot) => {
      el.addEventListener("mouseenter", () => {
        if (isAnimating) return;
        if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
        if (activeSlot !== slot) { activeSlot = slot; layoutHover(slot); }
      });
    });
    stage.addEventListener("mouseleave", () => {
      if (isAnimating) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => { activeSlot = null; layoutHover(null); }, 50);
    });
    window.addEventListener("resize", () => { if (!isAnimating) layoutHover(activeSlot); });

    // cursor depth: the whole fan leans gently with the mouse (≤8px)
    const hero = document.querySelector(".st-hero");
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(stage, { x: px * 8, y: py * 6, duration: 0.9, ease: "power2.out" });
      gsap.to(".mesh", { xPercent: px * -2, yPercent: py * -2, duration: 1.2, ease: "power2.out" });
    });
    hero.addEventListener("mouseleave", () => {
      gsap.to(stage, { x: 0, y: 0, duration: 0.9, ease: "power3.out" });
      gsap.to(".mesh", { xPercent: 0, yPercent: 0, duration: 0.9, ease: "power3.out" });
    });
  } else {
    window.addEventListener("resize", () => { if (entered) layoutBase(false); });
  }
})();

/* ── the one line reveals; the fan parallaxes out on scroll ── */
if (!prefersReduced) {
  gsap.timeline()
    .from(".st-hero-title .line", { yPercent: 110, duration: 0.9, ease: "expo.out" }, 0.2);
  gsap.to(".st-hero-title", { yPercent: -14, opacity: 0.35, ease: "none",
    scrollTrigger: { trigger: ".st-hero", start: "top top", end: "bottom 35%", scrub: true } });
  gsap.to(".fan-stage", { yPercent: 6, ease: "none",
    scrollTrigger: { trigger: ".st-hero", start: "top top", end: "bottom top", scrub: true } });
}

/* ═════════ STUDY OPPORTUNITIES — expanding fields ═════════ */
(() => {
  const items = gsap.utils.toArray(".exp");
  if (!items.length) return;
  const open = (el) => {
    items.forEach((i) => i.classList.toggle("is-open", i === el));
  };
  items.forEach((el) => {
    if (finePointer) el.addEventListener("mouseenter", () => open(el));
    el.addEventListener("click", () => open(el));
    el.addEventListener("focus", () => open(el));
  });
})();

/* ═════════ SUPPORT — pinned horizontal rail ═════════ */
if (!prefersReduced && isDesktop) {
  const track = document.querySelector(".svc-track");
  const pin = document.querySelector(".support-pin");
  const getDist = () => Math.max(0, track.scrollWidth - pin.clientWidth + 80);
  gsap.timeline({
    scrollTrigger: {
      trigger: ".support",
      start: "top top",
      end: () => "+=" + (getDist() + window.innerHeight * 0.3),
      scrub: 0.8,
      pin: true,
      invalidateOnRefresh: true,
    },
  }).to(track, { x: () => -getDist(), ease: "none" });
  gsap.from(".svc", {
    opacity: 0, y: 30, duration: 0.6, stagger: 0.07, ease: "power2.out",
    scrollTrigger: { trigger: ".support", start: "top 65%" },
  });
} else if (!prefersReduced) {
  gsap.utils.toArray(".svc").forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 26, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
}

/* ── reveals ── */
if (!prefersReduced) {
  gsap.utils.toArray(".section-head, .exp-row").forEach((el) => {
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
