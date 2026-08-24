/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · CONTACT — the same motion language,
   pointed at one job: making it easy to start a conversation.
   Glass form with floating labels, details + map, three
   reasons, an animated journey line, an accordion.
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

/* ── reveal helper — fromTo, and play at once if already on screen ── */
function revealOnce(el, from, to, triggerEl, startAt = 0.86) {
  if (prefersReduced || !el) return;
  const trigger = triggerEl || (typeof el === "string" ? document.querySelector(el) : el);
  if (!trigger) return;
  const tween = gsap.fromTo(el, from, { ...to, paused: true });
  if (trigger.getBoundingClientRect().top < window.innerHeight * startAt) { tween.play(); return; }
  ScrollTrigger.create({ trigger, start: `top ${startAt * 100}%`, once: true, onEnter: () => tween.play() });
}

/* ── hero ── */
if (!prefersReduced) {
  gsap.timeline()
    .from(".c-hero-title .line", { yPercent: 110, duration: 0.95, stagger: 0.09, ease: "expo.out" }, 0.2)
    .from(".c-hero-sub", { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" }, 0.65);
  gsap.to(".c-hero-title, .c-hero-sub", { yPercent: -10, opacity: 0.4, ease: "none",
    scrollTrigger: { trigger: ".c-hero", start: "top top", end: "bottom 30%", scrub: true } });
}

/* ═════════ THE FORM — floating labels, gentle validation ═════════ */
(() => {
  const form = document.getElementById("inquiry");
  if (!form) return;
  const status = form.querySelector(".c-form-status");

  /* Apply Now hand-off: ?course=<name> pre-fills the course field and
     becomes the enquiry's Source line. */
  const courseParam = new URLSearchParams(location.search).get("course") ||
    new URLSearchParams(location.hash.replace(/^#/, "")).get("course");
  if (courseParam && form.elements.course) {
    form.elements.course.value = courseParam;
    const field = form.elements.course.closest(".field");
    if (field) field.classList.add("has-value");
    form.dataset.source = courseParam;
  }

  /* the two columns arrive, then the fields ladder in */
  revealOnce(".c-form-card", { opacity: 0, y: 42 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, document.querySelector(".contact-grid"));
  revealOnce(".c-side", { opacity: 0, y: 42 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.12 }, document.querySelector(".contact-grid"));
  revealOnce(".c-form .field, .c-form-actions", { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power2.out", delay: 0.25 },
    document.querySelector(".contact-grid"));

  /* focus: the field lifts a touch and its ring warms up */
  form.querySelectorAll(".field").forEach((field) => {
    const control = field.querySelector("input, select, textarea");
    if (!control) return;
    control.addEventListener("focus", () => {
      field.classList.add("is-focus");
      if (!prefersReduced) gsap.to(field, { y: -2, duration: 0.3, ease: "power2.out" });
    });
    control.addEventListener("blur", () => {
      field.classList.remove("is-focus");
      if (!prefersReduced) gsap.to(field, { y: 0, duration: 0.35, ease: "power2.out" });
      if (field.classList.contains("is-invalid")) validate(control); // clear once fixed
    });
    control.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) validate(control);
    });
    control.addEventListener("change", () => {
      field.classList.toggle("has-value", !!control.value);
      if (field.classList.contains("is-invalid")) validate(control);
    });
  });

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  function validate(control) {
    const field = control.closest(".field");
    let ok = true;
    if (control.hasAttribute("required") && !control.value.trim()) ok = false;
    if (ok && control.type === "email" && control.value && !isEmail(control.value)) ok = false;
    field.classList.toggle("is-invalid", !ok);
    control.setAttribute("aria-invalid", String(!ok));
    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const controls = [...form.querySelectorAll("input, select, textarea")];
    const results = controls.map(validate);
    const firstBad = controls[results.indexOf(false)];

    if (firstBad) {
      status.textContent = "Please check the highlighted fields.";
      status.classList.add("is-error");
      firstBad.focus();
      if (!prefersReduced) {
        gsap.fromTo(firstBad.closest(".field"),
          { x: -6 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      }
      return;
    }

    /* Sending: try the serverless endpoint first (/api/send-enquiry —
       live once RESEND_API_KEY is configured on the hosting account).
       If it isn't configured or fails, fall back to the original
       mailto: behaviour so the form never silently breaks.
       Routing/labels come from data attributes on the <form>:
       data-recipient · data-enquiry · data-subject · data-source */
    const get = (n) => (form.elements[n] ? form.elements[n].value.trim() : "");
    const recipient = form.dataset.recipient || "pbhatia@edu-hub.org.uk";
    const line = (label, name) =>
      form.elements[name] ? `${label}: ${get(name) || "—"}` : null;
    const body = [
      `Enquiry type: ${form.dataset.enquiry || "General enquiry"}`,
      line("Name", "name"),
      line("Email", "email"),
      line("Phone", "phone"),
      line("Country", "country"),
      line("I am a", "role"),
      line("Institution", "institution"),
      line("Organisation", "organisation"),
      line("Course / programme", "course"),
      "",
      get("message"),
      "",
      `Source: ${form.dataset.source || "Website Contact Page"}`,
      `Submitted: ${new Date().toUTCString()}`,
    ].filter((v) => v !== null).join("\n");

    const subject = (form.dataset.subject || "Website enquiry") + " — " + get("name");
    const showStatus = (msg, isError) => {
      status.classList.toggle("is-error", !!isError);
      status.textContent = msg;
      if (!prefersReduced) {
        gsap.fromTo(status, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      }
    };
    const mailtoFallback = () => {
      showStatus("Opening your email app so you can send this to us…");
      window.location.href =
        `mailto:${recipient}?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    showStatus("Sending your enquiry…");

    fetch("/api/send-enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, subject, body, replyTo: get("email") }),
    })
      .then((r) => {
        if (r.ok) {
          showStatus("Thank you. Your enquiry has been received. Our team will get back to you shortly.");
          form.reset();
          form.querySelectorAll(".field").forEach((f) => f.classList.remove("has-value"));
          return;
        }
        /* 502 = the backend exists and the send genuinely failed → honest
           error, allow retry. Anything else (404 = no backend on this
           hosting, 503 = email not configured yet) → mailto keeps working. */
        if (r.status === 502) {
          showStatus("Sorry — your enquiry could not be sent. Please try again, or email us directly at " + recipient + ".", true);
          return;
        }
        mailtoFallback();
      })
      .catch(() => { mailtoFallback(); })
      .finally(() => { submitBtn.disabled = false; });
  });
})();

/* ── the map lifts very slightly on hover, nothing more ── */
if (finePointer && !prefersReduced) {
  const map = document.querySelector(".c-map");
  if (map) {
    map.addEventListener("mouseenter", () => gsap.to(map, { y: -4, duration: 0.5, ease: "power2.out" }));
    map.addEventListener("mouseleave", () => gsap.to(map, { y: 0, duration: 0.6, ease: "power2.out" }));
  }
}

/* ═════════ WHY CONTACT — three cards, staggered ═════════ */
revealOnce(".why-card", { opacity: 0, y: 34 },
  { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" },
  document.querySelector(".why-grid"));

/* ═════════ THE JOURNEY LINE ═════════ */
(() => {
  const tl = document.querySelector(".tl");
  if (!tl || prefersReduced) return;
  const fill = tl.querySelector(".tl-track b");
  const steps = gsap.utils.toArray(".tl-step");

  /* the line draws itself, then each card arrives behind it */
  const master = gsap.timeline({ paused: true });
  master.fromTo(fill,
    { scaleX: 0, scaleY: 0 },
    { scaleX: 1, scaleY: 1, duration: 1.1, ease: "power2.inOut" }, 0);
  steps.forEach((step, i) => {
    master.fromTo(step.querySelector(".tl-dot"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 0.18 + i * 0.22);
    master.fromTo(step.querySelector(".tl-card"),
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.24 + i * 0.22);
  });

  if (tl.getBoundingClientRect().top < window.innerHeight * 0.8) master.play();
  else ScrollTrigger.create({ trigger: tl, start: "top 80%", once: true, onEnter: () => master.play() });
})();

/* ═════════ FAQ ACCORDION ═════════ */
(() => {
  const items = gsap.utils.toArray(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    gsap.set(panel, { height: 0, opacity: 0 });

    const setOpen = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-open", open);
      if (prefersReduced) {
        gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
        return;
      }
      gsap.to(panel, {
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
        duration: open ? 0.55 : 0.4,
        ease: open ? "power3.out" : "power2.inOut",
        overwrite: true,
      });
    };

    btn.addEventListener("click", () => {
      const willOpen = btn.getAttribute("aria-expanded") !== "true";
      // one at a time, like the rest of the site's sequences
      items.forEach((other) => {
        if (other === item) return;
        const otherBtn = other.querySelector(".faq-q");
        if (otherBtn.getAttribute("aria-expanded") === "true") {
          otherBtn.setAttribute("aria-expanded", "false");
          other.classList.remove("is-open");
          gsap.to(other.querySelector(".faq-a"), {
            height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut", overwrite: true,
          });
        }
      });
      setOpen(willOpen);
    });
  });

  revealOnce(".faq-item", { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
    document.querySelector(".faq-list"));
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
