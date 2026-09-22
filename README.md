# aakash2410.github.io

Personal portfolio of Aakash Sangani: AI governance research, data science, and AI product work.

The site has one set of content and three **lenses** (Researcher, Data Scientist, Product & Strategy). Each lens changes the headline, summary, highlighted numbers, project order, and which résumé the download button serves. A lens can be linked directly:

- https://aakash2410.github.io/?lens=research
- https://aakash2410.github.io/?lens=data
- https://aakash2410.github.io/?lens=product

Plain HTML, CSS, and JavaScript. No build step.

## Editing

- Content: `index.html`. Elements with `data-for="research data"` only show under those lenses (`all` = Overview).
- Project and skill order per lens: the `data-rank-*` attributes on each `.project` and `.skill-group`.
- Résumé PDFs: `assets/resume/`, mapped to lenses in `script.js`.
- Colours: the tokens at the top of `styles.css` (each lens has its own accent).

## Preview locally

```bash
python3 -m http.server 8000
```
