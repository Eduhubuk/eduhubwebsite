/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · GALLERY — the 21st.dev Image Sphere.

   SphereImageGrid ported 1:1 from React/TSX to vanilla JS,
   exactly as js/students.js carries the Card Fan Carousel.
   This site has no build step and no React (see CLAUDE.md),
   so the component's logic is preserved line-for-line rather
   than reimplemented: SPHERE_MATH, the Fibonacci distribution
   with its pole bonus and randomisation, the rotation
   matrices, the fade zones, the pole-image scaling rule, the
   collision-detection pass, the momentum/auto-rotate physics,
   the hover rule and the modal are all the original's.

   Changed for integration only: `containerSize` is computed
   from the viewport instead of the demo's fixed 600 (the same
   prop, a responsive value), styling uses the site's tokens,
   and auto-rotate is gated behind prefers-reduced-motion.
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

/* ── hero: the one line arrives, then drifts as you leave ── */
if (!prefersReduced) {
  gsap.timeline().from(".g-hero-title .line", { yPercent: 110, duration: 0.95, stagger: 0.09, ease: "expo.out" }, 0.2);
  gsap.to(".g-hero-title", { yPercent: -12, opacity: 0.35, ease: "none",
    scrollTrigger: { trigger: ".g-hero", start: "top top", end: "bottom 30%", scrub: true } });
}

/* ═══════════════════════════════════════════════════════════
   THE IMAGES — the site's own verified photography.
   Captions are neutral by design: nothing here states a fact
   about the business. Swap for real brand photography.
   ═══════════════════════════════════════════════════════════ */
const U = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w || 500}&q=70`;

const BASE_IMAGES = [
  { src: U("photo-1523580494863-6f3031224c94"), alt: "Students together on campus", title: "Campus life", description: "The people you meet become the reason it felt like home." },
  { src: U("photo-1503676260728-1c00da094a0b"), alt: "A lecture hall", title: "First lecture", description: "The first week is the steepest — and the shortest." },
  { src: U("photo-1541339907198-e08756dedf3f"), alt: "A university building", title: "Somewhere new", description: "A building you will one day describe as yours." },
  { src: U("photo-1507525428034-b723cf961d3e"), alt: "A coastline at golden hour", title: "Beyond borders", description: "Distance stops being a number once you have made the trip." },
  { src: U("photo-1513635269975-59663e0ac1ad"), alt: "A city street", title: "City mornings", description: "A commute that still feels like an adventure." },
  { src: U("photo-1517486808906-6ca8b3f04846"), alt: "Studying at a desk", title: "The long nights", description: "Every deadline you were sure you would not make." },
  { src: U("photo-1522202176988-66273c2fd55f"), alt: "Friends studying together", title: "Found my people", description: "Study group first, friends for life second." },
  { src: U("photo-1438761681033-6461ffad8d80"), alt: "A student portrait", title: "The decision", description: "It starts with one person deciding to begin." },
  { src: U("photo-1506973035872-a4ec16b8e8d9"), alt: "A view from a plane window", title: "The flight out", description: "The quietest few hours of the whole journey." },
  { src: U("photo-1496442226666-8d4d0e62e6e9"), alt: "A city skyline", title: "Arrival", description: "The first evening in a place you chose." },
  { src: U("photo-1507679799987-c73779587ccf"), alt: "A graduate in a gown", title: "Graduation day", description: "The photograph everyone at home waits for." },
  { src: U("photo-1521587760476-6c12a4b040da"), alt: "A university library", title: "The library", description: "Where most of it actually happened." },
];

/* the demo repeats its base set to fill the sphere — same here */
const IMAGES = [];
for (let i = 0; i < 60; i++) {
  const base = BASE_IMAGES[i % BASE_IMAGES.length];
  IMAGES.push({ id: `img-${i + 1}`, ...base, alt: `${base.alt} (${Math.floor(i / BASE_IMAGES.length) + 1})` });
}

/* ═══════════════════════════════════════════════════════════
   SPHERE_MATH — verbatim from the component
   ═══════════════════════════════════════════════════════════ */
const SPHERE_MATH = {
  degreesToRadians: (degrees) => degrees * (Math.PI / 180),
  radiansToDegrees: (radians) => radians * (180 / Math.PI),
  sphericalToCartesian: (radius, theta, phi) => ({
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  }),
  calculateDistance: (pos, center = { x: 0, y: 0, z: 0 }) => {
    const dx = pos.x - center.x;
    const dy = pos.y - center.y;
    const dz = pos.z - center.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },
  normalizeAngle: (angle) => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  },
};

/* ═══════════════════════════════════════════════════════════
   SphereImageGrid — the component, ported
   ═══════════════════════════════════════════════════════════ */
function SphereImageGrid(mount, options) {
  // the demo's CONFIG, unchanged apart from a responsive containerSize
  const cfg = Object.assign({
    images: [],
    containerSize: 600,
    sphereRadius: 200,
    dragSensitivity: 0.8,
    momentumDecay: 0.96,
    maxRotationSpeed: 6,
    baseImageScale: 0.15,
    hoverScale: 1.3,       // accepted by the original but unused by it — kept for fidelity
    perspective: 1000,
    autoRotate: true,
    autoRotateSpeed: 0.2,
  }, options || {});

  const images = cfg.images;
  let containerSize = cfg.containerSize;
  let actualSphereRadius = cfg.sphereRadius || containerSize * 0.5;
  let baseImageSize = containerSize * cfg.baseImageScale;

  let rotation = { x: 15, y: 15, z: 0 };
  let velocity = { x: 0, y: 0 };
  let isDragging = false;
  let hoveredIndex = null;
  let imagePositions = [];
  const lastMousePos = { x: 0, y: 0 };
  let frame = null;

  /* ── the container ── */
  const container = document.createElement("div");
  container.className = "sphere-container";
  const stage = document.createElement("div");
  stage.className = "sphere-stage";
  container.appendChild(stage);
  mount.appendChild(container);

  const applySize = () => {
    container.style.width = containerSize + "px";
    container.style.height = containerSize + "px";
    container.style.perspective = cfg.perspective + "px";
  };

  /* ── generateSpherePositions — verbatim ── */
  function generateSpherePositions() {
    const positions = [];
    const imageCount = images.length;

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = (2 * Math.PI) / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      if (phi < 90) {
        phi = Math.max(5, phi - poleBonus);
      } else {
        phi = Math.min(175, phi + poleBonus);
      }

      phi = 15 + (phi / 180) * 150;

      const randomOffset = (Math.random() - 0.5) * 20;
      theta = (theta + randomOffset) % 360;
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));

      positions.push({ theta: theta, phi: phi, radius: actualSphereRadius });
    }
    return positions;
  }

  /* ── calculateWorldPositions — verbatim ── */
  function calculateWorldPositions() {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const worldPos = { x, y, z };

      const fadeZoneStart = -10;
      const fadeZoneEnd = -30;
      const isVisible = worldPos.z > fadeZoneEnd;

      let fadeOpacity = 1;
      if (worldPos.z <= fadeZoneStart) {
        fadeOpacity = Math.max(0, (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
      }

      const isPoleImage = pos.phi < 30 || pos.phi > 150;

      const distanceFromCenter = Math.sqrt(worldPos.x * worldPos.x + worldPos.y * worldPos.y);
      const maxDistance = actualSphereRadius;
      const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);

      const distancePenalty = isPoleImage ? 0.4 : 0.7;
      const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty);

      const depthScale = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return Object.assign({}, worldPos, {
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        originalIndex: index,
      });
    });

    // collision detection — verbatim
    const adjustedPositions = positions.slice();

    for (let i = 0; i < adjustedPositions.length; i++) {
      const pos = adjustedPositions[i];
      if (!pos.isVisible) continue;

      let adjustedScale = pos.scale;
      const imageSize = baseImageSize * adjustedScale;

      for (let j = 0; j < adjustedPositions.length; j++) {
        if (i === j) continue;

        const other = adjustedPositions[j];
        if (!other.isVisible) continue;

        const otherSize = baseImageSize * other.scale;

        const dx = pos.x - other.x;
        const dy = pos.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const minDistance = (imageSize + otherSize) / 2 + 25;

        if (distance < minDistance && distance > 0) {
          const overlap = minDistance - distance;
          const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
          adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
        }
      }

      adjustedPositions[i] = Object.assign({}, pos, { scale: Math.max(0.25, adjustedScale) });
    }

    return adjustedPositions;
  }

  const clampRotationSpeed = (speed) =>
    Math.max(-cfg.maxRotationSpeed, Math.min(cfg.maxRotationSpeed, speed));

  /* ── updateMomentum — verbatim ── */
  function updateMomentum() {
    if (isDragging) return;

    let newY = rotation.y;
    if (cfg.autoRotate) newY += cfg.autoRotateSpeed;
    newY += clampRotationSpeed(velocity.y);

    rotation = {
      x: SPHERE_MATH.normalizeAngle(rotation.x + clampRotationSpeed(velocity.x)),
      y: SPHERE_MATH.normalizeAngle(newY),
      z: rotation.z,
    };

    const decayed = { x: velocity.x * cfg.momentumDecay, y: velocity.y * cfg.momentumDecay };
    velocity =
      !cfg.autoRotate && Math.abs(decayed.x) < 0.01 && Math.abs(decayed.y) < 0.01
        ? { x: 0, y: 0 }
        : decayed;
  }

  /* ── the nodes (created once, restyled per frame) ── */
  const nodes = images.map((image, index) => {
    const node = document.createElement("div");
    node.className = "sphere-node";
    node.setAttribute("role", "button");
    node.setAttribute("tabindex", "-1");
    node.setAttribute("aria-label", `${image.title || image.alt} — enlarge`);

    const frameEl = document.createElement("div");
    frameEl.className = "sphere-node-frame";
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = "";
    img.draggable = false;
    img.loading = index < 3 ? "eager" : "lazy";
    img.decoding = "async";
    frameEl.appendChild(img);
    node.appendChild(frameEl);

    if (finePointer) {
      node.addEventListener("mouseenter", () => (hoveredIndex = index));
      node.addEventListener("mouseleave", () => (hoveredIndex = null));
    }
    node.addEventListener("click", (e) => {
      e.stopPropagation();
      if (dragMoved) return;      // a drag that ends on an image is not a click
      openModal(image);
    });
    stage.appendChild(node);
    return node;
  });

  /* ── render — the original's style rules, applied to live nodes ── */
  function render() {
    const worldPositions = calculateWorldPositions();
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      const position = worldPositions[index];

      if (!position || !position.isVisible) {
        node.style.display = "none";
        continue;
      }
      node.style.display = "";

      const imageSize = baseImageSize * position.scale;
      const isHovered = hoveredIndex === index;
      const finalScale = isHovered ? Math.min(1.2, 1.2 / position.scale) : 1;

      node.style.width = imageSize + "px";
      node.style.height = imageSize + "px";
      node.style.left = containerSize / 2 + position.x + "px";
      node.style.top = containerSize / 2 + position.y + "px";
      node.style.opacity = position.fadeOpacity;
      node.style.transform = `translate(-50%, -50%) scale(${finalScale})`;
      node.style.zIndex = position.zIndex;
    }
  }

  /* ── drag: mouse + touch, the original's deltas ── */
  let dragMoved = false;

  function onPointerDown(clientX, clientY) {
    isDragging = true;
    dragMoved = false;
    velocity = { x: 0, y: 0 };
    lastMousePos.x = clientX;
    lastMousePos.y = clientY;
    container.classList.add("is-grabbing");
  }

  function onPointerMove(clientX, clientY) {
    if (!isDragging) return;

    const deltaX = clientX - lastMousePos.x;
    const deltaY = clientY - lastMousePos.y;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 2) dragMoved = true;

    const rotationDelta = {
      x: -deltaY * cfg.dragSensitivity,
      y: deltaX * cfg.dragSensitivity,
    };

    rotation = {
      x: SPHERE_MATH.normalizeAngle(rotation.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(rotation.y + clampRotationSpeed(rotationDelta.y)),
      z: rotation.z,
    };

    velocity = {
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y),
    };

    lastMousePos.x = clientX;
    lastMousePos.y = clientY;
  }

  function onPointerUp() {
    isDragging = false;
    container.classList.remove("is-grabbing");
  }

  container.addEventListener("mousedown", (e) => { e.preventDefault(); onPointerDown(e.clientX, e.clientY); });
  document.addEventListener("mousemove", (e) => onPointerMove(e.clientX, e.clientY));
  document.addEventListener("mouseup", onPointerUp);

  container.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    onPointerDown(t.clientX, t.clientY);
  }, { passive: true });
  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const t = e.touches[0];
    onPointerMove(t.clientX, t.clientY);
  }, { passive: false });
  document.addEventListener("touchend", onPointerUp);

  /* ── the modal: the component's spotlight, in the site's language ── */
  const modal = document.querySelector(".sphere-modal");
  const modalImg = modal.querySelector(".sphere-modal-img");
  const modalTitle = modal.querySelector(".sphere-modal-title");
  const modalDesc = modal.querySelector(".sphere-modal-desc");
  const modalClose = modal.querySelector(".sphere-modal-close");
  let lastFocus = null;

  function openModal(image) {
    lastFocus = document.activeElement;
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modalTitle.textContent = image.title || "";
    modalDesc.textContent = image.description || "";
    modalTitle.hidden = !image.title;
    modalDesc.hidden = !image.description;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  modal.addEventListener("click", closeModal);
  modal.querySelector(".sphere-modal-card").addEventListener("click", (e) => e.stopPropagation());
  modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  /* ── responsive: the same prop, recalculated ── */
  function measure() {
    const wrap = mount.getBoundingClientRect();
    const budget = Math.min(wrap.width || window.innerWidth, window.innerHeight * 0.82);
    containerSize = Math.max(300, Math.min(cfg.containerSize, budget));
    const ratio = cfg.sphereRadius / cfg.containerSize;   // the demo's 200/600
    actualSphereRadius = containerSize * ratio;
    baseImageSize = containerSize * cfg.baseImageScale;
    imagePositions = imagePositions.map((p) => Object.assign({}, p, { radius: actualSphereRadius }));
    applySize();
  }

  /* ── start ── */
  imagePositions = generateSpherePositions();
  measure();
  if (prefersReduced) cfg.autoRotate = false;

  function loop() {
    updateMomentum();
    render();
    frame = requestAnimationFrame(loop);
  }
  loop();

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 150);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    } else if (!frame) {
      loop();
    }
  });

  return { measure };
}

/* ── mount ── */
(() => {
  const mount = document.getElementById("sphere-mount");
  if (!mount) return;
  SphereImageGrid(mount, { images: IMAGES });
})();

/* ── reveals ── */
if (!prefersReduced) {
  const cta = document.querySelector(".cta");
  const revealOnce = (el, from, to, trigger, startAt = 0.85) => {
    const tween = gsap.fromTo(el, from, Object.assign({}, to, { paused: true }));
    if (trigger.getBoundingClientRect().top < window.innerHeight * startAt) { tween.play(); return; }
    ScrollTrigger.create({ trigger, start: `top ${startAt * 100}%`, once: true, onEnter: () => tween.play() });
  };
  revealOnce(".sphere-wrap", { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1.05, ease: "power3.out" }, document.querySelector(".gallery"));
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
