(() => {
  const LENSES = ["all", "research", "data", "product"];
  const CVS = {
    all:      { href: "assets/resume/Aakash_Sangani_Research.pdf",         label: "Download CV" },
    research: { href: "assets/resume/Aakash_Sangani_Research.pdf",         label: "Academic CV" },
    data:     { href: "assets/resume/Aakash_Sangani_DataScience.pdf",      label: "Data science CV" },
    product:  { href: "assets/resume/Aakash_Sangani_Product_Strategy.pdf", label: "Product & strategy CV" },
  };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const buttons = [...document.querySelectorAll("[data-lens-btn]")];
  const list = document.querySelector("[data-sortable]");
  const works = [...list.querySelectorAll(":scope > .entry")];
  const marks = [...document.querySelectorAll("mark[data-for]")];

  // Reorder the work to suit the reader, animating each entry from its old
  // position to its new one (FLIP), then renumber and fix index references.
  function reorder(lens, animate) {
    const key = "rank" + lens[0].toUpperCase() + lens.slice(1);
    const sorted = [...works].sort((a, b) => a.dataset[key] - b.dataset[key]);
    if (sorted.every((el, i) => list.children[i] === el)) return renumber();

    const before = new Map(works.map((el) => [el, el.getBoundingClientRect().top]));
    sorted.forEach((el) => list.appendChild(el));
    renumber();
    if (!animate || reduceMotion) return;

    works.forEach((el) => {
      const dy = before.get(el) - el.getBoundingClientRect().top;
      if (!dy) return;
      el.classList.remove("moving");
      el.style.transform = `translateY(${dy}px)`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.classList.add("moving");
        el.style.transform = "";
      }));
      el.addEventListener("transitionend", () => el.classList.remove("moving"), { once: true });
    });
  }

  function renumber() {
    const prefix = list.dataset.prefix;
    [...list.children].forEach((el, i) => {
      el.dataset.num = `${prefix}.${i + 1}`;
      el.querySelector(".entry-num").textContent = el.dataset.num;
    });
    document.querySelectorAll("a.ref[data-ref]").forEach((ref) => {
      const target = document.getElementById(ref.dataset.ref);
      const num = target && target.dataset.num;
      if (num && ref.textContent !== num) {
        ref.textContent = num;
        ref.classList.remove("bumped");
        void ref.offsetWidth;
        ref.classList.add("bumped");
      }
    });
  }

  // Stagger the highlighter so marks near the top of the screen land first.
  function staggerMarks() {
    const vh = innerHeight;
    marks.forEach((m) => {
      const y = m.getBoundingClientRect().top;
      const onScreen = y > -40 && y < vh;
      m.style.setProperty("--d", onScreen ? `${Math.round(Math.max(0, y) / vh * 380)}ms` : "0ms");
    });
  }

  function setLens(lens, { animate = true, updateUrl = true } = {}) {
    if (!LENSES.includes(lens)) lens = "all";
    staggerMarks();
    reorder(lens, animate);
    document.body.dataset.lens = lens;
    buttons.forEach((b) => b.setAttribute("aria-checked", String(b.dataset.lensBtn === lens)));
    document.querySelectorAll("[data-cv]").forEach((a) => (a.href = CVS[lens].href));
    document.querySelectorAll("[data-cv-label]").forEach((s) => (s.textContent = CVS[lens].label));
    store.set("lens", lens);
    if (updateUrl) history.replaceState(null, "", lensUrl(lens));
  }

  function lensUrl(lens) {
    const url = new URL(location.href);
    url.hash = "";
    if (lens === "all") url.searchParams.delete("lens");
    else url.searchParams.set("lens", lens);
    return url.toString();
  }

  buttons.forEach((b) => b.addEventListener("click", () => setLens(b.dataset.lensBtn)));

  // Radio-group keyboard behaviour: arrows move and select.
  document.querySelector(".lens").addEventListener("keydown", (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const i = buttons.findIndex((b) => b.getAttribute("aria-checked") === "true");
    const next = buttons[(i + step + buttons.length) % buttons.length];
    next.focus();
    setLens(next.dataset.lensBtn);
  });
  const syncTabStops = () => buttons.forEach((b) => (b.tabIndex = b.getAttribute("aria-checked") === "true" ? 0 : -1));
  new MutationObserver(syncTabStops).observe(document.querySelector(".lens"), { subtree: true, attributes: true, attributeFilter: ["aria-checked"] });

  // A shared link (?lens=data) wins over the viewer's last choice.
  const fromUrl = new URLSearchParams(location.search).get("lens");
  setLens(fromUrl || store.get("lens") || "all", { animate: false, updateUrl: !!fromUrl });
  syncTabStops();

  // Copy a link to the current reading.
  const share = document.querySelector(".share");
  share.addEventListener("click", async () => {
    const url = lensUrl(document.body.dataset.lens);
    const original = share.textContent;
    try { await navigator.clipboard.writeText(url); share.textContent = "Link copied"; }
    catch { share.textContent = url; }
    setTimeout(() => (share.textContent = original), 2000);
  });

  // Light / dark
  const root = document.documentElement;
  document.querySelector(".theme").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    store.set("theme", root.dataset.theme);
  });

  // Contents: mark the section being read.
  const tocLinks = new Map([...document.querySelectorAll(".toc a")].map((a) => [a.getAttribute("href").slice(1), a]));
  const seen = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => seen.set(en.target.id, en.isIntersecting));
    const current = [...tocLinks.keys()].find((id) => seen.get(id));
    tocLinks.forEach((a, id) => a.classList.toggle("active", id === current));
  }, { rootMargin: "-20% 0px -70% 0px" });
  tocLinks.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
