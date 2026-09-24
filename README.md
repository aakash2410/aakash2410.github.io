# aakash2410.github.io

Personal portfolio of Aakash Sangani: AI governance research, data science, and AI product work.

The page is printed as a three-plate job. Each reader is an ink plate: **Researcher** (yellow), **Data scientist** (blue), **Product & strategy** (pink). "Anyone" prints all three slightly out of register, so the name fringes in colour. Picking a reader brings that plate into register, fades the other two, inks the phrases that matter to them, adds their notes in the margin, reorders the selected work (renumbering sections, figures, and index references to match), and switches the CV download. Each reading has its own link:

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
- **Plates:** the three inks (`--y`, `--b`, `--p`), the paper and the key ink are tokens at the top of `styles.css`. Each reader's registration offset is set on the `body[data-lens="..."]` rules just below them.
- **Overprint:** plates blend with `mix-blend-mode`, which is `multiply` on light paper and `screen` in dark mode (`--blend`). Text sitting on a plate is forced dark with `--mk-ink` so it stays readable in both.
- **Type:** Archivo (variable width and weight) and DM Mono, set as `--sans` and `--mono`.

## Preview locally

```bash
python3 -m http.server 8000
```
