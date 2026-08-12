/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · INSTITUTIONS — executive calm
   The brand globe as a reusable factory: one full globe in
   the hero (cursor-reactive), one compact globe pinned in
   Markets (regions illuminate as they scroll). Slower motion
   than the student pages — confident, not busy.
   ═══════════════════════════════════════════════════════════ */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDesktop = window.matchMedia("(min-width: 900px)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

gsap.registerPlugin(ScrollTrigger);

/* ── globe factory — the homepage engine, scoped to a canvas ── */
function createGlobe(canvas, opts = {}) {
  if (!canvas) return null;
  const ctx = canvas.getContext("2d");
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const N = opts.points || 380;
  const points = [];
  let W, H, R, cx, cy, rot = 0, raf;
  const state = {
    speed: opts.speed || 0.0008,
    opacity: 1, drift: 0, driftTarget: 0,
    region: null, // 'sa' | 'me' | 'af' | null
  };
  const AZ = [21, 96, 189], CY = [20, 175, 208], VI = [139, 92, 246];
  const regionColor = { sa: AZ, me: VI, af: CY };

  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * 2.39996;
    points.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
  }

  // approved markets only — countries as glowing destinations
  const pins = [
    { idx: 40,  name: "India",        region: "sa" },
    { idx: 120, name: "Pakistan",     region: "sa" },
    { idx: 210, name: "Bangladesh",   region: "sa" },
    { idx: 300, name: "Sri Lanka",    region: "sa" },
    { idx: 355, name: "UAE",          region: "me" },
    { idx: 55,  name: "Saudi Arabia", region: "me" },
    { idx: 255, name: "Kenya",        region: "af" },
    { idx: 160, name: "Nigeria",      region: "af" },
  ];
  const routes = [
    [40, 355], [120, 55], [210, 255], [300, 160], [355, 255], [55, 160], [40, 160], [210, 355],
  ].map(([a, b]) => [a % N, b % N]);
  pins.forEach((p) => { p.idx = p.idx % N; });

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    R = Math.min(W, H) * 0.42;
    cx = W * 0.5; cy = H * 0.5;
  }

  function project(p, rotY) {
    const cos = Math.cos(rotY), sin = Math.sin(rotY);
    const x = p.x * cos - p.z * sin;
    const z = p.x * sin + p.z * cos;
    const tilt = 0.35;
    const y = p.y * Math.cos(tilt) - z * Math.sin(tilt) * 0.25;
    return { sx: cx + x * R, sy: cy + y * R, z };
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const projected = points.map((p) => project(p, rot));

    // atmosphere
    const atmo = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.3);
    atmo.addColorStop(0, `rgba(${AZ},0.10)`);
    atmo.addColorStop(0.75, `rgba(${AZ},0.03)`);
    atmo.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = atmo;
    ctx.fillRect(0, 0, W, H);

    // dots
    for (const q of projected) {
      const depth = (q.z + 1) / 2;
      ctx.beginPath();
      ctx.arc(q.sx, q.sy, 0.7 + depth * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${AZ},${0.04 + depth * 0.24})`;
      ctx.fill();
    }

    // connection routes + travelling pulses
    for (let i = 0; i < routes.length; i++) {
      const [ai, bi] = routes[i];
      const A = projected[ai], B = projected[bi];
      if (A.z < -0.2 && B.z < -0.2) continue;
      const pa = pins.find((p) => p.idx === ai), pb = pins.find((p) => p.idx === bi);
      const hot = state.region && (pa?.region === state.region || pb?.region === state.region);
      const vis = Math.max(0, Math.min(1, ((A.z + B.z) / 2 + 0.6))) * (hot ? 0.85 : 0.32);
      if (vis <= 0.02) continue;
      const mx = (A.sx + B.sx) / 2, my = (A.sy + B.sy) / 2;
      const dx = B.sx - A.sx, dy = B.sy - A.sy;
      const len = Math.hypot(dx, dy) || 1;
      const nx = mx - (dy / len) * len * 0.25;
      const ny = my + (dx / len) * len * 0.25;
      ctx.beginPath();
      ctx.moveTo(A.sx, A.sy);
      ctx.quadraticCurveTo(nx, ny, B.sx, B.sy);
      ctx.strokeStyle = `rgba(${hot ? CY : AZ},${vis * 0.35})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();
      const k = ((t * 0.00016) + i * 0.13) % 1;
      const px = (1 - k) * (1 - k) * A.sx + 2 * (1 - k) * k * nx + k * k * B.sx;
      const py = (1 - k) * (1 - k) * A.sy + 2 * (1 - k) * k * ny + k * k * B.sy;
      ctx.beginPath();
      ctx.arc(px, py, 2.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hot ? CY : AZ},${vis * 0.9})`;
      ctx.fill();
    }

    // destination pins — soft glow, brighter when their region is active
    if (opts.labels !== false) ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const q = projected[pin.idx];
      if (q.z < 0.2) continue;
      const active = !state.region || state.region === pin.region;
      const a = Math.min(1, (q.z - 0.2) / 0.4) * (active ? 1 : 0.25);
      if (a <= 0.03) continue;
      const col = regionColor[pin.region];
      const pulse = Math.sin(t * 0.0014 + i * 1.7) * 0.5 + 0.5;
      // glow
      const glow = ctx.createRadialGradient(q.sx, q.sy, 0, q.sx, q.sy, 12 + pulse * 4);
      glow.addColorStop(0, `rgba(${col},${a * 0.5})`);
      glow.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(q.sx - 18, q.sy - 18, 36, 36);
      ctx.beginPath();
      ctx.arc(q.sx, q.sy, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${a})`;
      ctx.fill();
      if (opts.labels !== false) {
        ctx.fillStyle = `rgba(18,35,74,${a * 0.75})`;
        ctx.fillText(pin.name, q.sx + 10, q.sy + 4);
      }
    }
  }

  function loop(t) {
    state.drift += (state.driftTarget - state.drift) * 0.035;
    rot += state.speed + state.drift * 0.0012;
    draw(t);
    raf = requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener("resize", resize);
  if (prefersReduced) {
    draw(0);
  } else {
    raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    });
  }
  return state;
}

/* ── two globes, one engine ── */
const heroGlobe = createGlobe(document.getElementById("hero-globe"), { points: 400, speed: 0.0008 });
const marketsGlobe = isDesktop
  ? createGlobe(document.getElementById("markets-globe"), { points: 300, speed: 0.0006, labels: false })
  : null;

/* hero globe: leans with the cursor, slowly */
if (heroGlobe && finePointer && isDesktop && !prefersReduced) {
  const hero = document.querySelector(".i-hero");
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    heroGlobe.driftTarget = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(".globe-wrap", { x: ((e.clientX - r.left) / r.width - 0.5) * 8, y: py * 6, duration: 1.1, ease: "power2.out" });
  });
  hero.addEventListener("mouseleave", () => {
    heroGlobe.driftTarget = 0;
    gsap.to(".globe-wrap", { x: 0, y: 0, duration: 1.1, ease: "power3.out" });
  });
}

/* ── Lenis ── */
if (!prefersReduced && typeof Lenis !== "undefined") {
  const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
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

/* ── hero entrance — slower, executive ── */
if (!prefersReduced) {
  gsap.timeline()
    .from(".i-hero .kicker", { opacity: 0, y: 10, duration: 0.6, ease: "power2.out" }, 0.15)
    .from(".i-hero-title .line", { yPercent: 110, duration: 1.05, stagger: 0.12, ease: "expo.out" }, 0.25)
    .from(".i-hero-sub", { opacity: 0, y: 14, duration: 0.7, ease: "power2.out" }, "-=0.6")
    .from(".i-hero-actions .btn", { opacity: 0, y: 14, duration: 0.6, ease: "power2.out" }, "-=0.45")
    .from(".globe-wrap", { opacity: 0, scale: 0.94, duration: 1.3, ease: "power3.out" }, 0.4);
}

/* ── markets: sticky regions drive both globes ── */
(() => {
  const blocks = gsap.utils.toArray(".region-block");
  if (!blocks.length) return;
  const label = document.querySelector("[data-region-label]");
  const names = { sa: "South Asia", me: "Middle East", af: "Africa" };

  const activate = (key) => {
    if (marketsGlobe) marketsGlobe.region = key;
    if (heroGlobe) heroGlobe.region = key;
    if (label && key) label.textContent = names[key];
  };

  if (!prefersReduced && isDesktop) {
    blocks.forEach((b) => {
      ScrollTrigger.create({
        trigger: b,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          b.classList.toggle("is-on", self.isActive);
          if (self.isActive) {
            activate(b.dataset.region);
            gsap.fromTo(b.querySelectorAll(".chip-row span"),
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power2.out", overwrite: "auto" });
          }
        },
      });
    });
  } else {
    blocks.forEach((b) => b.classList.add("is-on"));
  }
})();

/* ── partnership models: the active panel breathes open ── */
if (!prefersReduced && isDesktop) {
  gsap.utils.toArray(".model").forEach((m) => {
    ScrollTrigger.create({
      trigger: m,
      start: "top 62%",
      end: "bottom 38%",
      onToggle: (self) => m.classList.toggle("is-open", self.isActive),
    });
  });
} else {
  document.querySelectorAll(".model").forEach((m) => m.classList.add("is-open"));
}

/* ── reveals — unhurried ── */
if (!prefersReduced) {
  gsap.utils.toArray(".section-head, .markets-sticky, .model").forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 30, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
    });
  });
  gsap.from(".cta-title .line", {
    yPercent: 110, duration: 1.0, stagger: 0.12, ease: "expo.out",
    scrollTrigger: { trigger: ".cta", start: "top 70%" },
  });
  gsap.from(".cta-actions", {
    opacity: 0, y: 18, duration: 0.7, ease: "power2.out", delay: 0.2,
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
    const strength = 0.22;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - r.left - r.width / 2) * strength,
        y: (e.clientY - r.top - r.height / 2) * strength,
        duration: 0.35, ease: "power2.out",
      });
    });
    el.addEventListener("mouseleave", () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" })
    );
  });
}

window.addEventListener("load", () => ScrollTrigger.refresh());
