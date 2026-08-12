/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · PARTNERS — two exclusive partners,
   one interaction. Glass cards that tilt under the cursor
   and flip into the destination they belong to.
   Same motion language as the rest of the site.
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

/* ── reveal helper ──────────────────────────────────────────
   The page is short: on a tall viewport the cards already sit
   inside the trigger band at load, and a plain ScrollTrigger
   never fires (it also never fires on a deep link or a mid-page
   reload). So: fromTo — never from — and play at once when the
   element is already on screen.
   ───────────────────────────────────────────────────────── */
function revealOnce(el, from, to, triggerEl, startAt = 0.88) {
  if (prefersReduced || !el) return;
  const trigger = triggerEl || el;
  const tween = gsap.fromTo(el, from, { ...to, paused: true });
  if (trigger.getBoundingClientRect().top < window.innerHeight * startAt) {
    tween.play();
    return;
  }
  ScrollTrigger.create({
    trigger, start: `top ${startAt * 100}%`, once: true,
    onEnter: () => tween.play(),
  });
}

/* ── hero: the one line arrives, then drifts as you leave ── */
if (!prefersReduced) {
  gsap.timeline().from(".p-hero-title .line", { yPercent: 110, duration: 0.95, stagger: 0.09, ease: "expo.out" }, 0.2);
  gsap.to(".p-hero-title", { yPercent: -12, opacity: 0.35, ease: "none",
    scrollTrigger: { trigger: ".p-hero", start: "top top", end: "bottom 30%", scrub: true } });
}

/* ═════════════════ THE PARTNER CARDS ═════════════════ */
(() => {
  const shells = gsap.utils.toArray(".p-card-shell");
  if (!shells.length) return;

  /* the destination behind the card — slow crossfades, gentle Ken Burns */
  const kenBurns = (wrap) => {
    const imgs = gsap.utils.toArray(wrap.querySelectorAll("i"));
    if (!imgs.length) return null;
    gsap.set(imgs, { opacity: 0, scale: 1.12 });
    gsap.set(imgs[0], { opacity: 1 });
    if (prefersReduced || imgs.length < 2) return null;

    const HOLD = 4.4, FADE = 1.7, CYCLE = HOLD + FADE;
    const tl = gsap.timeline({ repeat: -1, paused: true });
    tl.set(imgs, { opacity: 0 }, 0).set(imgs[0], { opacity: 1 }, 0);

    imgs.forEach((img, i) => {
      const at = i * CYCLE;
      const next = imgs[(i + 1) % imgs.length];
      const drift = i % 2 ? 1.6 : -1.6;
      // each frame pans and de-zooms across its own turn (plus the fade either side)
      tl.fromTo(img,
        { scale: 1.14, xPercent: drift, yPercent: drift * 0.4 },
        { scale: 1.02, xPercent: -drift, yPercent: -drift * 0.4,
          duration: i === 0 ? CYCLE : CYCLE + FADE, ease: "none" },
        i === 0 ? 0 : at - FADE);
      tl.to(img, { opacity: 0, duration: FADE, ease: "power1.inOut" }, at + HOLD)
        .fromTo(next, { opacity: 0 }, { opacity: 1, duration: FADE, ease: "power1.inOut" }, at + HOLD);
    });
    return tl;
  };

  shells.forEach((shell, index) => {
    const tilt = shell.querySelector(".p-tilt");
    const flip = shell.querySelector(".p-flip");
    const front = shell.querySelector(".p-front");
    const back = shell.querySelector(".p-back");
    const glare = shell.querySelector(".p-glare");
    const kb = kenBurns(shell.querySelector(".p-kb"));

    let flipped = false;
    let busy = false;

    /* The back sits in a rotated, backface-hidden layer: an image that
       finishes decoding while that layer is turned away never gets its
       bitmap uploaded, and the first flip lands on an empty panel.
       Decoding up front — before anyone can flip — removes the race. */
    const backFrames = [...shell.querySelectorAll(".p-kb i")];
    let primed = false;
    const primeBack = () => {
      if (primed) return Promise.resolve();
      primed = true;
      return Promise.all(backFrames.map((frame) => new Promise((resolve) => {
        const url = /url\(["']?(.+?)["']?\)/.exec(getComputedStyle(frame).backgroundImage);
        if (!url) return resolve();
        const img = new Image();
        img.onload = img.onerror = () => resolve();
        img.src = url[1];
      })));
    };
    shell.addEventListener("pointerenter", primeBack, { once: true });

    /* faces: only the one facing you is reachable */
    const syncFaces = () => {
      shell.setAttribute("aria-pressed", String(flipped));
      front.setAttribute("aria-hidden", String(flipped));
      back.setAttribute("aria-hidden", String(!flipped));
      front.querySelectorAll("a, button").forEach((el) => (el.tabIndex = flipped ? -1 : 0));
      back.querySelectorAll("a, button").forEach((el) => (el.tabIndex = flipped ? 0 : -1));
    };
    syncFaces();

    /* idle: the card breathes, like the panels elsewhere on the site.
       Starts only once the arrival tween has let go of `y`. */
    const startIdle = () => {
      if (prefersReduced || !isDesktop) return;
      gsap.to(shell, {
        y: -9, duration: 5.2 + index * 0.7, ease: "sine.inOut",
        repeat: -1, yoyo: true, delay: index * 0.9,
      });
    };

    const setFlipped = (next) => {
      if (busy || next === flipped) return;
      flipped = next;
      shell.classList.toggle("is-flipped", flipped);
      syncFaces();

      if (prefersReduced) {
        gsap.set(flip, { rotationY: flipped ? 180 : 0 });
      } else {
        busy = true;
        gsap.timeline({ onComplete: () => { busy = false; } })
          // the flip itself: a breath of anticipation, a soft overshoot, a settle
          .to(flip, { rotationY: flipped ? 180 : 0, duration: 1.2, ease: "back.inOut(0.9)" }, 0)
          .to(tilt, { rotationX: 0, rotationY: 0, z: 0, duration: 0.55, ease: "power2.out" }, 0)
          .to(shell, { scale: 1.03, duration: 0.5, ease: "power2.out" }, 0)
          .to(shell, { scale: 1, duration: 0.8, ease: "power3.out" }, 0.5);
      }

      if (!kb) return;
      if (!flipped) { kb.pause(); return; }
      primeBack().then(() => { if (flipped) kb.play(); });
    };

    /* pointer: tilt, elevation, and a reflection that follows the cursor */
    if (finePointer && !prefersReduced) {
      const rotX = gsap.quickTo(tilt, "rotationX", { duration: 0.7, ease: "power3.out" });
      const rotY = gsap.quickTo(tilt, "rotationY", { duration: 0.7, ease: "power3.out" });
      const lift = gsap.quickTo(tilt, "z", { duration: 0.7, ease: "power3.out" });

      /* While a press is in progress the card holds absolutely still. The tilt
         lifts the card 38px toward the viewer, and under perspective that
         enlarges and rotates it — enough to slide a button out from under a
         stationary cursor between mousedown and mouseup. When that happens the
         browser fires `click` on the nearest common ancestor (the card) rather
         than the button, so the card flips and the link never activates. */
      let pressing = false;
      shell.addEventListener("pointerdown", () => {
        pressing = true;
        // Freeze by retargeting each tween to the value it is already at.
        // (Killing the tweens instead would break these quickTo instances
        // permanently — the tilt would never move again.)
        rotX(gsap.getProperty(tilt, "rotationX"));
        rotY(gsap.getProperty(tilt, "rotationY"));
        lift(gsap.getProperty(tilt, "z"));
      });
      const endPress = () => { pressing = false; };
      window.addEventListener("pointerup", endPress);
      window.addEventListener("pointercancel", endPress);

      shell.addEventListener("mousemove", (e) => {
        if (busy || pressing) return;
        const r = shell.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rotX(py * -5);
        rotY(px * 6);
        if (glare) {
          glare.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
          glare.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
        }
      });
      shell.addEventListener("mouseenter", () => {
        if (pressing) return;
        shell.classList.add("is-hover"); lift(38);
      });
      shell.addEventListener("mouseleave", () => {
        shell.classList.remove("is-hover");
        rotX(0); rotY(0); lift(0);
      });
    }

    /* click / tap flips — except on the controls, which own their events
       outright. Stopping in the CAPTURE phase means the card never sees the
       event no matter what order listeners were bound in, and stopping the
       pointer/mouse pair too keeps the drag bookkeeping below from recording
       a press that belonged to a control. stopPropagation (not the immediate
       variant) so the element's own handlers — the button press animation,
       and the anchor's default download — still run. */
    shell.querySelectorAll("[data-stop]").forEach((el) => {
      // Stop in the BUBBLE phase, and only for the events that could reach the
      // card's own flip handler. Chrome visits a target's capture and bubble
      // listeners separately, so stopping in capture would also silence this
      // element's own bubble listeners — which is where the .btn press
      // animation lives, leaving the button with no feedback at all.
      // stopPropagation (never preventDefault) so the anchor still downloads.
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        if (el.hasAttribute("data-back")) setFlipped(false);
      });
      el.addEventListener("keydown", (e) => e.stopPropagation());
    });

    // ignore the click that ends a scroll-drag
    let downAt = null;
    let downOnControl = false;
    shell.addEventListener("pointerdown", (e) => {
      downAt = { x: e.clientX, y: e.clientY };
      // where the press STARTED is the honest signal: if the card shifts under
      // the cursor mid-press, `click` retargets to a common ancestor and the
      // target check below would no longer recognise the control
      downOnControl = !!e.target.closest("[data-stop], a[href], button");
    });
    shell.addEventListener("click", (e) => {
      // belt and braces: anything interactive inside the card keeps its click,
      // even if it were ever added without a data-stop attribute
      if (downOnControl || e.target.closest("[data-stop], a[href], button")) return;
      // a click that ends a scroll-drag is not a tap — but a click with no
      // coordinates (keyboard, assistive tech) always counts
      const dragged = downAt && (e.clientX || e.clientY) &&
        Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 10;
      downAt = null;
      downOnControl = false;
      if (dragged) return;
      setFlipped(!flipped);
    });
    shell.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
      e.preventDefault();
      setFlipped(!flipped);
    });

    /* arrival — the card and its CTA come up together as one unit */
    revealOnce(shell.closest(".p-item") || shell,
      { opacity: 0, y: 46 },
      { opacity: 1, y: 0, duration: 1.05, ease: "power3.out", delay: index * 0.12,
        onComplete: () => { startIdle(); primeBack(); } },
      document.querySelector(".p-grid"));
    if (prefersReduced) primeBack();
  });

  /* first-visit hint — the same quiet pill the memory stack uses */
  (() => {
    if (prefersReduced) return;
    try { if (sessionStorage.getItem("eh-partners-hint")) return; } catch (_) {}
    const hint = document.querySelector(".p-hint");
    if (!hint) return;
    if (finePointer) hint.textContent = "Click a card to explore the destination";
    const seen = () => { try { sessionStorage.setItem("eh-partners-hint", "1"); } catch (_) {} };
    const show = () => {
      gsap.fromTo(hint, { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      gsap.to(hint, { opacity: 0, duration: 0.6, delay: 3.4, ease: "power2.in" });
      seen();
    };
    const grid = document.querySelector(".p-grid");
    if (grid.getBoundingClientRect().top < window.innerHeight * 0.7) gsap.delayedCall(1.2, show);
    else ScrollTrigger.create({ trigger: grid, start: "top 70%", once: true, onEnter: show });
    shells.forEach((s) => s.addEventListener("click", () => gsap.to(hint, { opacity: 0, duration: 0.3 }), { once: true }));
  })();
})();

/* ── reveals ── */
if (!prefersReduced) {
  const cta = document.querySelector(".cta");
  revealOnce(".p-note", { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    document.querySelector(".p-note"), 0.92);
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

/* ═══════════════════════════════════════════════════════════
   THE UNIVERSITY PROFILE — the two cards above become the
   navigation. Switching swaps the profile in place: the old
   one fades and slides out, the container eases to the new
   height, the new one fades and slides in. No reload, no
   navigation, and the page never jumps under you.
   ═══════════════════════════════════════════════════════════ */
(() => {
  const viewport = document.querySelector(".uni-viewport");
  if (!viewport) return;

  const profiles = new Map(
    [...viewport.querySelectorAll(".uni")].map((el) => [el.dataset.profile, el])
  );
  const cards = [...document.querySelectorAll(".p-card-shell")];
  let current = "arkangel";
  let swapping = false;

  const markCards = () =>
    cards.forEach((c) => c.classList.toggle("is-selected", c.dataset.partner === current));
  markCards();

  function show(next) {
    if (swapping || next === current || !profiles.has(next)) return;
    const from = profiles.get(current);
    const to = profiles.get(next);
    current = next;
    markCards();

    if (prefersReduced) {
      from.classList.remove("is-active"); from.setAttribute("aria-hidden", "true");
      to.classList.add("is-active"); to.setAttribute("aria-hidden", "false");
      ScrollTrigger.refresh();
      return;
    }

    swapping = true;
    const startH = viewport.getBoundingClientRect().height;

    gsap.timeline({ onComplete: () => { swapping = false; } })
      .to(from, { opacity: 0, y: -18, duration: 0.34, ease: "power2.in" })
      .add(() => {
        from.classList.remove("is-active");
        from.setAttribute("aria-hidden", "true");
        to.classList.add("is-active");
        to.setAttribute("aria-hidden", "false");
        gsap.set(to, { opacity: 0, y: 22 });
        // measure the incoming height, then ease the container to it.
        // Releasing back to `auto` has to happen in THIS tween's onComplete:
        // it is created outside the timeline, so it outlives the timeline and
        // would otherwise leave a fixed pixel height behind — and with
        // overflow:hidden that clips anything that grows later (an FAQ opening).
        gsap.set(viewport, { height: startH });
        const endH = to.getBoundingClientRect().height;
        gsap.to(viewport, {
          height: endH, duration: 0.55, ease: "power3.inOut",
          onComplete: () => {
            gsap.set(viewport, { height: "auto" });
            ScrollTrigger.refresh();
          },
        });
      })
      .to(to, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, ">-0.28");
  }

  /* the selector cards drive it — without disturbing their own flip */
  cards.forEach((card) => {
    card.addEventListener("click", () => show(card.dataset.partner));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") show(card.dataset.partner);
    });
  });

  /* ── programme tabs ── */
  viewport.addEventListener("click", (e) => {
    const tab = e.target.closest(".u-tab");
    if (!tab) return;
    const group = tab.closest(".u-tabs");
    const panes = group.parentElement.querySelector(".u-panes");
    const idx = [...group.querySelectorAll(".u-tab")].indexOf(tab);
    group.querySelectorAll(".u-tab").forEach((t, i) => {
      t.classList.toggle("is-active", i === idx);
      t.setAttribute("aria-selected", String(i === idx));
    });
    panes.querySelectorAll(".u-pane").forEach((p, i) => p.classList.toggle("is-active", i === idx));
    const shown = panes.querySelector(".u-pane.is-active");
    if (shown && !prefersReduced) {
      gsap.fromTo(shown.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" });
    }
  });

  /* ── FAQ accordion, one open at a time (same behaviour as Contact) ── */
  viewport.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    gsap.set(panel, { height: 0, opacity: 0 });
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      const siblings = item.closest(".faq-list").querySelectorAll(".faq-item");
      siblings.forEach((other) => {
        if (other === item) return;
        const ob = other.querySelector(".faq-q");
        if (ob.getAttribute("aria-expanded") === "true") {
          ob.setAttribute("aria-expanded", "false");
          other.classList.remove("is-open");
          gsap.to(other.querySelector(".faq-a"), { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut", overwrite: true });
        }
      });
      btn.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-open", open);
      gsap.to(panel, {
        height: open ? "auto" : 0, opacity: open ? 1 : 0,
        duration: open ? 0.55 : 0.4, ease: open ? "power3.out" : "power2.inOut",
        overwrite: true,
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
  });

  /* ── gallery lightbox ── */
  const box = document.querySelector(".u-lightbox");
  if (box) {
    const img = box.querySelector(".u-lightbox-img");
    const cap = box.querySelector(".u-lightbox-cap");
    const close = box.querySelector(".u-lightbox-close");
    let lastFocus = null;
    const shut = () => {
      box.classList.remove("open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    viewport.addEventListener("click", (e) => {
      const shot = e.target.closest(".u-shot");
      if (!shot) return;
      lastFocus = shot;
      img.src = shot.dataset.lightbox;
      img.alt = shot.dataset.caption || "";
      cap.textContent = shot.dataset.caption || "";
      box.classList.add("open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      close.focus();
    });
    box.addEventListener("click", shut);
    box.querySelector(".u-lightbox-card").addEventListener("click", (e) => e.stopPropagation());
    close.addEventListener("click", shut);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && box.classList.contains("open")) shut();
    });
  }

  /* ── scroll reveals inside the profile ── */
  if (!prefersReduced) {
    const revealables = ".u-overview, .u-split, .u-feat-grid, .u-tabs, .u-panes, .u-cards, .u-gallery, .u-loc, .faq-list, .u-tl";
    viewport.querySelectorAll(revealables).forEach((el) => {
      revealOnce(el, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }, el, 0.9);
    });
    viewport.querySelectorAll(".u-block > .section-head").forEach((el) =>
      revealOnce(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, el, 0.9)
    );

    /* the admissions line draws itself, like the Contact timeline */
    viewport.querySelectorAll(".u-tl").forEach((tl) => {
      const fill = tl.querySelector(".tl-track b");
      const master = gsap.timeline({ paused: true })
        .fromTo(fill, { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 1.1, ease: "power2.inOut" }, 0);
      tl.querySelectorAll(".tl-step").forEach((step, i) => {
        master.fromTo(step.querySelector(".tl-dot"), { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 0.15 + i * 0.16);
        master.fromTo(step.querySelector(".tl-card"), { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.2 + i * 0.16);
      });
      if (tl.getBoundingClientRect().top < window.innerHeight * 0.85) master.play();
      else ScrollTrigger.create({ trigger: tl, start: "top 85%", once: true, onEnter: () => master.play() });
    });
  }

  /* press feedback on the buttons that arrived with the profile */
  if (finePointer && !prefersReduced) {
    viewport.querySelectorAll(".btn").forEach((el) => {
      el.addEventListener("mousedown", () => gsap.to(el, { scale: 0.965, duration: 0.12, ease: "power2.out" }));
      ["mouseup", "mouseleave"].forEach((ev) =>
        el.addEventListener(ev, () => gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.out" }))
      );
    });
  }
})();
