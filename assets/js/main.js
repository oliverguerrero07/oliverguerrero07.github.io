// =============================================================
// Small bits of interactivity. No libraries needed.
//   1. Mobile menu button
//   2. Project tag filter (Projects page)
//   3. Click-to-enlarge images (project pages)
// =============================================================

// ---------- 1. Mobile menu ----------
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  // Close the menu after tapping a link (e.g. "Contact" jumps down the page)
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
})();

// ---------- 2. Tag filter ----------
(function () {
  const buttons = document.querySelectorAll(".filter[data-filter]");
  const cards = document.querySelectorAll("#project-grid .card");
  const emptyMsg = document.getElementById("empty-msg");
  if (!buttons.length) return;

  function applyFilter(tag) {
    let shown = 0;
    cards.forEach((card) => {
      const tags = (card.dataset.tags || "").split("|");
      const match = tag === "all" || tags.includes(tag);
      card.classList.toggle("is-hidden", !match);
      if (match) shown++;
    });
    buttons.forEach((b) => {
      const active = b.dataset.filter === tag;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    if (emptyMsg) emptyMsg.hidden = shown > 0;
  }

  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      applyFilter(b.dataset.filter);
      // Remember the filter in the URL (e.g. /projects/#Team) so it can be shared
      history.replaceState(null, "", b.dataset.filter === "all" ? location.pathname : "#" + b.dataset.filter);
    })
  );

  // Open with a filter already applied if the URL has one, e.g. /projects/#Research
  const fromUrl = decodeURIComponent(location.hash.slice(1));
  if (fromUrl && [...buttons].some((b) => b.dataset.filter === fromUrl)) applyFilter(fromUrl);
})();

// ---------- 3. Lightbox ----------
(function () {
  const galleryLinks = [...document.querySelectorAll(".gallery-item")];
  const proseImages = [...document.querySelectorAll(".prose img")];
  if (!galleryLinks.length && !proseImages.length) return;
  if (typeof HTMLDialogElement !== "function") return; // very old browser: links still work

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML =
    '<div class="lightbox-inner"><img alt=""></div>' +
    '<button class="lb-close" type="button" aria-label="Close">×</button>' +
    '<button class="lb-prev" type="button" aria-label="Previous image">‹</button>' +
    '<button class="lb-next" type="button" aria-label="Next image">›</button>';
  document.body.appendChild(dialog);

  const img = dialog.querySelector("img");
  const prev = dialog.querySelector(".lb-prev");
  const next = dialog.querySelector(".lb-next");
  let group = [];
  let index = 0;

  function show(i) {
    index = (i + group.length) % group.length;
    img.src = group[index].src;
    img.alt = group[index].alt;
    prev.hidden = next.hidden = group.length < 2;
  }
  function open(items, i) {
    group = items;
    show(i);
    dialog.showModal();
  }

  const galleryItems = galleryLinks.map((a) => ({ src: a.href, alt: a.querySelector("img").alt }));
  galleryLinks.forEach((a, i) =>
    a.addEventListener("click", (e) => { e.preventDefault(); open(galleryItems, i); })
  );
  const proseItems = proseImages.map((el) => ({ src: el.currentSrc || el.src, alt: el.alt }));
  proseImages.forEach((el, i) => el.addEventListener("click", () => open(proseItems, i)));

  dialog.querySelector(".lb-close").addEventListener("click", () => dialog.close());
  prev.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  // Click on the dark background closes it
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target.classList.contains("lightbox-inner")) dialog.close();
  });
  document.addEventListener("keydown", (e) => {
    if (!dialog.open || group.length < 2) return;
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
