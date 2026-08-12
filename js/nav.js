/* Shared nav dropdowns (Courses / Contact) — hover is CSS; this adds
   click/touch toggling, outside-click + Escape close, and aria state. */
(() => {
  const items = Array.from(document.querySelectorAll(".nav-item"));
  if (!items.length) return;

  const closeAll = (except) => {
    items.forEach((item) => {
      if (item === except) return;
      item.classList.remove("open");
      const t = item.querySelector(".nav-drop-trigger");
      if (t) t.setAttribute("aria-expanded", "false");
    });
  };

  items.forEach((item) => {
    const trigger = item.querySelector(".nav-drop-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = item.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(open));
      closeAll(item);
    });
  });

  document.addEventListener("click", () => closeAll());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
})();
