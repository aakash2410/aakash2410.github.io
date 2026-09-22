# aakash2410.github.io

Personal portfolio of Aakash Sangani: AI governance research, data science, and AI product work.

The page is set like an annotated working paper: numbered sections, figures, a bibliography, and an index. Three readers can mark it up, each with their own highlighter: **Researcher** (yellow), **Data scientist** (blue), and **Product & strategy** (pink). Picking a reader highlights the phrases that matter to them, adds their notes in the margin, reorders the selected work (renumbering sections, figures, and index references to match), and switches the CV download. Each reading has its own link:

- https://aakash2410.github.io/?lens=research
- https://aakash2410.github.io/?lens=data
- https://aakash2410.github.io/?lens=product

Plain HTML, CSS, and JavaScript. No build step.

## Editing

- **Highlights:** wrap a phrase in `<mark data-for="research data">…</mark>`. It is highlighted only for the readers listed.
- **Margin notes and reader-specific text:** any element with `data-for="…"` shows only for those readers (`all` is the default "Anyone" view).
- **Order of work:** the `data-rank-*` attributes on each entry in section 2. Numbers, `Fig.` labels, and index references update automatically.
- **Index references:** `<a class="ref" href="#ior" data-ref="ior">2.1</a>` points at an element's `id`; the number is filled in for you.
- **Figures:** each plot row places marks on a 0–1 scale with `--x` (a point) or `--a`/`--b` (a range).
- **CVs:** `assets/resume/`, mapped to readers in `script.js`.
- **Colours:** paper, ink, and the three highlighters are tokens at the top of `styles.css`.

## Preview locally

```bash
python3 -m http.server 8000
```
