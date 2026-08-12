/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · DAYLIGHT — motion system (Iteration 2)
   Human globe · full-screen journey · Lenis · GSAP
   ═══════════════════════════════════════════════════════════ */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDesktop = window.matchMedia("(min-width: 900px)").matches;

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* ─────────────────────────────────────────────
   GLOBE — soft point sphere with named destinations.
   Azure by day: dots stay light, city pins fade in,
   flight arcs glow as the story progresses.
   ───────────────────────────────────────────── */
const globe = (() => {
  const canvas = document.getElementById("globe");
  const ctx = canvas.getContext("2d");
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const N = 420; // fewer dots — the globe should feel alive, not technical
  const points = [];
  let W, H, R, cx, cy;
  let rot = 0;
  const state = { speed: 0.001, hue: 0, opacity: 1, arcs: 0.34, pins: 1, drift: 0, driftTarget: 0 };

  // azure → cyan → violet (brand spectrum, daylight version)
  const stops = [
    [21, 96, 189],
    [20, 175, 208],
    [139, 92, 246],
  ];
  const mix = (t) => {
    const seg = t < 0.5 ? 0 : 1;
    const k = (t - seg * 0.5) * 2;
    const a = stops[seg], b = stops[seg + 1];
    return [
      Math.round(a[0] + (b[0] - a[0]) * k),
      Math.round(a[1] + (b[1] - a[1]) * k),
      Math.round(a[2] + (b[2] - a[2]) * k),
    ];
  };

  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * 2.39996;
    points.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
  }

  // human touch: named destinations pinned to the sphere
  // (indices normalized below so they always fall inside the point cloud)
  const cities = [
    { idx: 40, name: "London" },
    { idx: 120, name: "Toronto" },
    { idx: 210, name: "Berlin" },
    { idx: 300, name: "Dubai" },
    { idx: 390, name: "Sydney" },
    { idx: 470, name: "New York" },
    { idx: 58, name: "Dublin" },
    { idx: 250, name: "Singapore" },
  ];
  const routes = [
    [40, 300], [120, 470], [210, 390], [300, 58], [390, 40], [470, 250], [58, 210], [250, 120],
  ].map(([a, b]) => [a % N, b % N]);
  cities.forEach((c) => { c.idx = c.idx % N; });

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    R = Math.min(W, H) * (isDesktop ? 0.54 : 0.56);
    cx = W * 0.5;
    cy = H * 0.62;
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
    if (state.opacity <= 0.01) return;
    const [cr, cg, cb] = mix(state.hue);
    const projected = points.map((p) => project(p, rot));

    // soft atmosphere — natural light, not a network graphic
    const atmo = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.35);
    atmo.addColorStop(0, `rgba(${cr},${cg},${cb},${0.09 * state.opacity})`);
    atmo.addColorStop(0.72, `rgba(${cr},${cg},${cb},${0.03 * state.opacity})`);
    atmo.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = atmo;
    ctx.fillRect(0, 0, W, H);

    // dots — feather-light on white
    for (const q of projected) {
      const depth = (q.z + 1) / 2;
      const a = (0.035 + depth * 0.24) * state.opacity;
      const size = 0.8 + depth * 1.6;
      ctx.beginPath();
      ctx.arc(q.sx, q.sy, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
      ctx.fill();
    }

    // flight arcs + travelling pulses
    for (let i = 0; i < routes.length; i++) {
      const [ai, bi] = routes[i];
      const A = projected[ai], B = projected[bi];
      if (A.z < -0.2 && B.z < -0.2) continue;
      const vis = Math.max(0, Math.min(1, ((A.z + B.z) / 2 + 0.6))) * state.arcs * state.opacity;
      if (vis <= 0.02) continue;
      const mx = (A.sx + B.sx) / 2, my = (A.sy + B.sy) / 2;
      const dx = B.sx - A.sx, dy = B.sy - A.sy;
      const len = Math.hypot(dx, dy) || 1;
      const lift = len * 0.25;
      const nx = mx - (dy / len) * lift;
      const ny = my + (dx / len) * lift;
      ctx.beginPath();
      ctx.moveTo(A.sx, A.sy);
      ctx.quadraticCurveTo(nx, ny, B.sx, B.sy);
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${vis * 0.3})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      const k = ((t * 0.0002) + i * 0.13) % 1;
      const px = (1 - k) * (1 - k) * A.sx + 2 * (1 - k) * k * nx + k * k * B.sx;
      const py = (1 - k) * (1 - k) * A.sy + 2 * (1 - k) * k * ny + k * k * B.sy;
      ctx.beginPath();
      ctx.arc(px, py, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${vis * 0.9})`;
      ctx.fill();
    }

    // city pins + labels — gentle breathing pulse, only when facing us
    ctx.font = "600 11.5px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    let ci = 0;
    for (const c of cities) {
      const q = projected[c.idx];
      ci++;
      if (q.z < 0.25) continue;
      const a = Math.min(1, (q.z - 0.25) / 0.4) * state.opacity * state.pins;
      if (a <= 0.03) continue;
      const pulse = Math.sin(t * 0.0018 + ci * 1.7) * 0.5 + 0.5; // 0..1
      ctx.beginPath();
      ctx.arc(q.sx, q.sy, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(q.sx, q.sy, 6 + pulse * 2.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a * (0.4 - pulse * 0.25)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = `rgba(18,35,74,${a * 0.78})`;
      ctx.fillText(c.name, q.sx + 12, q.sy + 4);
    }
  }

  let raf;
  function loop(t) {
    // the world leans gently toward your cursor
    state.drift += (state.driftTarget - state.drift) * 0.04;
    rot += state.speed + state.drift * 0.0016;
    draw(t);
    raf = requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener("resize", resize);
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      state.driftTarget = (e.clientX / window.innerWidth) - 0.5;
    });
  }
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
})();

/* ─────────────────────────────────────────────
   LENIS smooth scroll
   ───────────────────────────────────────────── */
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
      lenis.scrollTo(target, { offset: -70 });
    });
  });
}

/* ─────────────────────────────────────────────
   PRELOADER → hero entrance
   ───────────────────────────────────────────── */
const preloader = document.getElementById("preloader");
const heroLines = document.querySelectorAll(".hero-title .line");

let heroPlayed = false;
function heroEntrance() {
  if (heroPlayed) return;
  heroPlayed = true;
  if (prefersReduced) { preloader.remove(); return; }
  const tl = gsap.timeline();
  tl.to(".preloader-bar span", { width: "100%", duration: 0.7, ease: "power2.inOut" })
    .to(preloader, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "+=0.15")
    .set(preloader, { display: "none" })
    .from(heroLines, { yPercent: 110, duration: 0.9, stagger: 0.09, ease: "expo.out" }, "-=0.45")
    .from(".hero-sub", { opacity: 0, y: 14, duration: 0.5, ease: "power2.out" }, "-=0.5")
    .from(".journey-builder, .hero-trust", { opacity: 0, y: 14, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.35")
    .fromTo(".memory-stack",
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", immediateRender: true }, "-=0.4")
    .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.5");
}
window.addEventListener("load", heroEntrance);
setTimeout(heroEntrance, 3500); // never trap users behind the preloader
if (prefersReduced) preloader.remove();

/* ─────────────────────────────────────────────
   MEMORY STACK — printed memories you can pick up.
   Drag the front card aside and the next one comes
   forward; flick it and it tucks back into the pile.
   Idle nudge + parallax tilt say "touch me" without
   a single UI control. Transform/opacity only.
   ───────────────────────────────────────────── */
(() => {
  const stack = document.querySelector(".memory-stack");
  if (!stack) return;
  // DOM order is back → front; order[0] is the card on top
  let order = gsap.utils.toArray(stack.querySelectorAll(".mem-card")).reverse();
  if (order.length < 2) return;

  const D = (t) => (prefersReduced ? 0.01 : t); // respect reduced motion everywhere

  // one component, three temperaments
  const SLOTSETS = {
    desktop: [ // 4 printed memories on the table
      { x: 0,  y: 0,   r: -2,  s: 1,     o: 1 },
      { x: 16, y: -14, r: 2.2, s: 0.96,  o: 1 },
      { x: 32, y: -28, r: 4.8, s: 0.925, o: 1 },
      { x: 48, y: -42, r: 7.5, s: 0.89,  o: 1 },
      { x: 48, y: -42, r: 7.5, s: 0.89,  o: 0 }, // waiting, unseen
    ],
    tablet: [ // 3 visible, gentler angles
      { x: 0,  y: 0,   r: -1.5, s: 1,    o: 1 },
      { x: 14, y: -12, r: 1.8,  s: 0.96, o: 1 },
      { x: 28, y: -24, r: 3.5,  s: 0.92, o: 1 },
      { x: 28, y: -24, r: 3.5,  s: 0.92, o: 0 },
    ],
    mobile: [ // two cards: the memory, and the next one peeking
      { x: 0,  y: 0, r: 0,   s: 1,    o: 1 },
      { x: 16, y: 6, r: 2.2, s: 0.94, o: 1 },
      { x: 16, y: 6, r: 2.2, s: 0.94, o: 0 },
    ],
  };
  const tier = () => (window.innerWidth <= 560 ? "mobile" : window.innerWidth <= 1024 ? "tablet" : "desktop");
  let slots = SLOTSETS[tier()];
  const SPREAD = 1.4; // hover: the pile fans open slightly
  let spreadOn = false;
  const slotOf = (i) => slots[Math.min(i, slots.length - 1)];
  const front = () => order[0];

  const layout = (animate, exclude) => {
    order.forEach((card, i) => {
      if (card === exclude) return;
      const s = slotOf(i);
      const m = spreadOn && i > 0 ? SPREAD : 1;
      card.style.zIndex = String(order.length - i);
      gsap[animate ? "to" : "set"](card, {
        x: s.x * m, y: s.y * m, rotation: s.r, scale: s.s, autoAlpha: s.o,
        duration: D(0.7), ease: "power3.out", overwrite: "auto",
      });
    });
  };
  layout(false);
  window.addEventListener("resize", () => {
    const next = SLOTSETS[tier()];
    if (next !== slots) { slots = next; layout(false); }
  });

  /* ── recycle: front card leaves in `dir`, pile steps forward ── */
  const send = (dir) => {
    const f = order.shift();
    order.push(f);
    f.style.zIndex = String(order.length + 1); // stays on top while leaving
    const back = slotOf(order.length - 1);
    gsap.timeline()
      .to(f, { x: dir * 150, y: 36, rotation: dir * 10, rotationX: 0, rotationY: 0,
               autoAlpha: 0, duration: D(0.45), ease: "power2.in" }, 0)
      .add(() => {
        f.style.zIndex = "1";
        gsap.set(f, { x: back.x, y: back.y, rotation: back.r, scale: back.s, autoAlpha: 0, rotationX: 0, rotationY: 0 });
      }, D(0.5));
    layout(true, f);
    // the incoming caption breathes in rather than snapping
    gsap.fromTo(front().querySelector("figcaption"),
      { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: D(0.5), ease: "power2.out", delay: D(0.18) });
  };

  /* ── drag: pointer events + hand-rolled physics (no paid plugins) ── */
  let dragging = false, activeCard = null, axisLock = null;
  let startX = 0, startY = 0, curX = 0, lastX = 0, lastT = 0, vel = 0;
  const THRESH = 90;

  const resetFront = () => {
    gsap.to(front(), { x: 0, y: 0, rotation: slotOf(0).r, rotationX: 0, rotationY: 0, scale: 1,
                       duration: D(0.65), ease: "elastic.out(1, 0.55)" });
  };

  stack.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".mem-card") !== front()) return;
    dragging = true; activeCard = front(); axisLock = null;
    startX = e.clientX; startY = e.clientY; curX = 0;
    lastX = e.clientX; lastT = performance.now(); vel = 0;
    activeCard.setPointerCapture?.(e.pointerId);
    gsap.killTweensOf(activeCard);
    stack.classList.add("is-grabbing");
    stopIdle();
  });

  window.addEventListener("pointermove", (e) => {
    if (!dragging || !activeCard) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (axisLock === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6))
      axisLock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (axisLock === "y") { // vertical intent → hand the gesture back to the page
      dragging = false; activeCard = null;
      stack.classList.remove("is-grabbing");
      resetFront();
      return;
    }
    const abs = Math.abs(dx);
    curX = abs <= THRESH ? dx : Math.sign(dx) * (THRESH + (abs - THRESH) * 0.45); // rubber-band
    const now = performance.now();
    vel = (e.clientX - lastX) / Math.max(1, now - lastT);
    lastX = e.clientX; lastT = now;
    gsap.set(activeCard, { x: curX, y: Math.abs(curX) * 0.08, rotation: slotOf(0).r + curX * 0.045 });
  });

  const release = () => {
    if (!dragging || !activeCard) return;
    dragging = false;
    stack.classList.remove("is-grabbing");
    const flung = Math.abs(curX) > THRESH * 0.9 || Math.abs(vel) > 0.55;
    if (flung) send(Math.sign(curX || vel) || 1);
    else resetFront();
    activeCard = null;
    startIdle();
  };
  window.addEventListener("pointerup", release);
  window.addEventListener("pointercancel", release);

  /* ── idle nudge — a quiet "this is interactive" every ~4.5s ── */
  let idleTimer;
  const idle = () => {
    if (document.hidden || dragging) return;
    gsap.timeline()
      .to(front(), { y: -4, rotation: slotOf(0).r - 1.4, duration: 0.5, ease: "power2.out" })
      .to(front(), { y: 0, rotation: slotOf(0).r, duration: 0.9, ease: "elastic.out(1, 0.5)" });
  };
  const startIdle = () => { stopIdle(); if (!prefersReduced) idleTimer = setInterval(idle, 4500); };
  const stopIdle = () => clearInterval(idleTimer);
  startIdle();
  document.addEventListener("visibilitychange", () => { stopIdle(); if (!document.hidden) startIdle(); });

  /* ── hover: lift, parallax tilt, fan the pile open (fine pointers) ── */
  if (window.matchMedia("(pointer: fine)").matches && !prefersReduced) {
    stack.addEventListener("mouseenter", () => {
      spreadOn = true;
      layout(true, front());
      stopIdle();
      showHintOnce();
    });
    stack.addEventListener("mouseleave", () => {
      spreadOn = false;
      layout(true, dragging ? front() : null);
      if (!dragging) resetFront();
      startIdle();
    });
    stack.addEventListener("mousemove", (e) => {
      if (dragging) return;
      const r = stack.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(front(), {
        rotationY: px * 7, rotationX: -py * 6, y: -6, scale: 1.015,
        transformPerspective: 700, duration: 0.5, ease: "power2.out",
      });
    });
  }

  /* ── one-time hints — invitations, not tooltips ── */
  let hintEl = null;
  const spawnHint = (text) => {
    hintEl = document.createElement("span");
    hintEl.className = "mem-hint";
    hintEl.textContent = text;
    stack.appendChild(hintEl);
    gsap.fromTo(hintEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    return hintEl;
  };
  const fadeHint = (delay) => {
    if (!hintEl) return;
    const el = hintEl;
    hintEl = null;
    gsap.to(el, { opacity: 0, y: -6, duration: 0.5, delay, ease: "power2.in", onComplete: () => el.remove() });
  };
  // desktop: on first hover, gone after ~2s
  const showHintOnce = () => {
    let seen = false;
    try { seen = !!sessionStorage.getItem("memHintShown"); sessionStorage.setItem("memHintShown", "1"); } catch (_) {}
    if (seen) return;
    spawnHint("\u2190 Drag to explore");
    fadeHint(2.2);
  };
  // touch: on first visit, when the stack scrolls into view; gone after the first swipe
  if (window.matchMedia("(pointer: coarse)").matches) {
    let seen = false;
    try { seen = !!localStorage.getItem("memHintSwipe"); } catch (_) {}
    if (!seen) {
      const io = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        try { localStorage.setItem("memHintSwipe", "1"); } catch (_) {}
        spawnHint("\u2190 Swipe memories");
        setTimeout(() => fadeHint(0), 5000); // failsafe if they never swipe
      }, { threshold: 0.6 });
      io.observe(stack);
      stack.addEventListener("pointerdown", () => fadeHint(0.4), { once: true });
    }
  }
})();

/* ─────────────────────────────────────────────
   NAV — glass on scroll + mobile menu
   ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   GLOBE EVOLUTION — scroll shifts the day
   ───────────────────────────────────────────── */
if (!prefersReduced) {
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress;
      globe.hue = p;                      // azure → cyan → violet
      globe.arcs = 0.32 + p * 0.5;         // more routes as the story builds
      globe.speed = 0.0014 + p * 0.0018;
    },
  });
  // the background disappears behind the content mid-page
  gsap.to(globe, { opacity: 0.07, ease: "none",
    scrollTrigger: { trigger: "#journey", start: "top 70%", end: "top 20%", scrub: true } });
  gsap.to(globe, { opacity: 1, ease: "none",
    scrollTrigger: { trigger: "#cta", start: "top 85%", end: "top 35%", scrub: true } });
}


/* ─────────────────────────────────────────────
   THE JOURNEY — one immersive sequence.
   One stage on screen at a time; the plane flies
   the route; the line fills. Desktop pins; mobile
   and reduced-motion read it as a vertical story.
   ───────────────────────────────────────────── */
if (!prefersReduced && isDesktop) {
  const stages = gsap.utils.toArray(".stage");
  const hudNow = document.querySelector(".j-now");
  const n = stages.length;

  gsap.set(stages, { autoAlpha: 0, y: 60 });
  gsap.set(stages[0], { autoAlpha: 1, y: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#journey",
      start: "top top",
      end: () => "+=" + n * 820, // cinematic pacing — every milestone owns the screen
      scrub: 0.9,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.min(n - 1, Math.floor(self.progress * n));
        hudNow.textContent = String(idx + 1).padStart(2, "0");
      },
    },
  });

  // each unit: unhurried crossfade (0 → .5), long hold (.5 → 1)
  stages.forEach((s, i) => {
    if (i === 0) return;
    tl.to(stages[i - 1], { autoAlpha: 0, y: -70, duration: 0.28, ease: "power2.inOut" }, i)
      .fromTo(s, { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, i + 0.18);
  });
  tl.to({}, { duration: 1 }, n); // hold the final stage a full unit

  // the plane flies the whole route across the sequence
  const total = tl.duration();
  tl.to(".plane", {
    motionPath: { path: "#flightPath", align: "#flightPath", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "none", duration: total,
  }, 0);
  // the dotted line draws itself behind the plane
  const path = document.getElementById("flightPath");
  const plen = path.getTotalLength();
  gsap.set(path, { strokeDasharray: `${plen}`, strokeDashoffset: plen });
  tl.to(path, { strokeDashoffset: 0, ease: "none", duration: total }, 0);
  // journey progress line
  tl.to(".journey-progress", { scaleX: 1, ease: "none", duration: total }, 0);
} else if (!prefersReduced) {
  gsap.utils.toArray(".stage").forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 28, duration: 0.5, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
}

/* ─────────────────────────────────────────────
   DESTINATIONS RAIL — buttons + keyboard friendly
   ───────────────────────────────────────────── */
const rail = document.querySelector(".rail");
const cardStep = () => {
  const card = rail.querySelector(".dest-card");
  return card ? card.getBoundingClientRect().width + 24 : 340;
};
document.querySelector(".rail-prev").addEventListener("click", () => rail.scrollBy({ left: -cardStep() * 2, behavior: "smooth" }));
document.querySelector(".rail-next").addEventListener("click", () => rail.scrollBy({ left: cardStep() * 2, behavior: "smooth" }));

/* ─────────────────────────────────────────────
   SECTION REVEALS
   ───────────────────────────────────────────── */
if (!prefersReduced) {
  gsap.utils.toArray(".trust-inner, .section-head, .dest-card, .split-copy, .split-media, .cred, .band-inner, .story-card, .link-more").forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
    });
  });
  gsap.utils.toArray(".chip-list li").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 14, duration: 0.4, delay: (i % 6) * 0.05, ease: "power2.out",
      scrollTrigger: { trigger: el.parentElement, start: "top 88%" },
    });
  });
  gsap.from(".cta-title .line", {
    yPercent: 110, duration: 0.9, stagger: 0.1, ease: "expo.out",
    scrollTrigger: { trigger: "#cta", start: "top 70%" },
  });
  gsap.from(".cta-actions", {
    opacity: 0, y: 18, duration: 0.6, ease: "power2.out", delay: 0.2,
    scrollTrigger: { trigger: "#cta", start: "top 70%" },
  });
}

/* ─────────────────────────────────────────────
   COUNTERS
   ───────────────────────────────────────────── */
document.querySelectorAll(".num").forEach((el) => {
  const end = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "";
  if (prefersReduced) { el.textContent = end + suffix; return; }
  const obj = { v: 0 };
  gsap.to(obj, {
    v: end, duration: 2.2, ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 88%" },
    onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
  });
});

/* ─────────────────────────────────────────────
   MAGNETIC BUTTONS + TILT CARDS + CURSOR GLOW
   ───────────────────────────────────────────── */
if (window.matchMedia("(pointer: fine)").matches && !prefersReduced) {
  document.querySelectorAll(".btn").forEach((el) => {
    el.addEventListener("mousedown", () => gsap.to(el, { scale: 0.965, duration: 0.12, ease: "power2.out" }));
    ["mouseup", "mouseleave"].forEach((ev) =>
      el.addEventListener(ev, () => gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.out" }))
    );
  });

  document.querySelectorAll(".magnetic").forEach((el) => {
    const strength = 0.24; // effortless, not springy
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

/* refresh triggers once fonts/images settle */
window.addEventListener("load", () => ScrollTrigger.refresh());
