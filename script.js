(() => {
  const LENSES = ["all", "research", "data", "product"];
  const RESUMES = {
    all:      { href: "assets/resume/Aakash_Sangani_Research.pdf",         label: "Download CV" },
    research: { href: "assets/resume/Aakash_Sangani_Research.pdf",         label: "Academic CV" },
    data:     { href: "assets/resume/Aakash_Sangani_DataScience.pdf",      label: "Data Science résumé" },
    product:  { href: "assets/resume/Aakash_Sangani_Product_Strategy.pdf", label: "Product & Strategy résumé" },
  };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  const buttons = document.querySelectorAll("[data-lens-btn]");
  const resumeLink = document.querySelector("[data-resume]");
  const resumeLabel = document.querySelector("[data-resume-label]");

  function reorder(selector, lens) {
    const items = [...document.querySelectorAll(selector)];
    items.forEach((el) => {
      const rank = Number(el.dataset[`rank${lens[0].toUpperCase()}${lens.slice(1)}`]) || 99;
      el.style.order = rank;
      el.classList.toggle("is-first", rank === 1);
      // Restart the fade so reordering reads as a change, not a jump.
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
  }

  function setLens(lens, { push = true } = {}) {
    if (!LENSES.includes(lens)) lens = "all";
    document.body.dataset.lens = lens;
    buttons.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.lensBtn === lens)));
    reorder(".project", lens);
    reorder(".skill-group", lens);
    resumeLink.href = RESUMES[lens].href;
    resumeLabel.textContent = RESUMES[lens].label;
    store.set("lens", lens);
    if (push) {
      const url = new URL(location.href);
      if (lens === "all") url.searchParams.delete("lens");
      else url.searchParams.set("lens", lens);
      history.replaceState(null, "", url);
    }
  }

  buttons.forEach((b) => b.addEventListener("click", () => setLens(b.dataset.lensBtn)));

  // Arrow-key navigation within the lens tablist.
  document.querySelector(".lens").addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const list = [...buttons];
    const i = list.findIndex((b) => b.getAttribute("aria-selected") === "true");
    const next = list[(i + (e.key === "ArrowRight" ? 1 : -1) + list.length) % list.length];
    next.focus();
    setLens(next.dataset.lensBtn);
  });

  // A shared link (?lens=data) wins over the viewer's last choice.
  const fromUrl = new URLSearchParams(location.search).get("lens");
  setLens(fromUrl || store.get("lens") || "all", { push: !!fromUrl });

  // Theme toggle
  const root = document.documentElement;
  const savedTheme = store.get("theme");
  if (savedTheme) root.dataset.theme = savedTheme;
  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = isDark ? "light" : "dark";
    store.set("theme", root.dataset.theme);
  });

  // Copy a link to the current lens
  const copyBtn = document.querySelector(".copy-link");
  copyBtn.addEventListener("click", async () => {
    const url = new URL(location.href);
    url.hash = "";
    const lens = document.body.dataset.lens;
    if (lens === "all") url.searchParams.delete("lens"); else url.searchParams.set("lens", lens);
    try {
      await navigator.clipboard.writeText(url.toString());
      copyBtn.textContent = "Copied";
    } catch {
      copyBtn.textContent = url.toString();
    }
    setTimeout(() => (copyBtn.textContent = "Copy link"), 1800);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
