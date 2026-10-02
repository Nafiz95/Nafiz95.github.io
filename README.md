# Nafiz Sadman — academic portfolio

Static academic website for [nafiz95.github.io](https://nafiz95.github.io). GitHub Pages serves the repository's HTML, CSS, and JavaScript files directly. No build or package installation is required.

## Preview locally

From the repository root, run `python -m http.server 8080`, then open <http://localhost:8080>. Refresh the browser after edits and stop the server with Ctrl+C.

## Page map

| Page | File | Content |
| --- | --- | --- |
| Overview | `index.html` | Research identity, focus, featured work, four selected papers, internships, and collaborations |
| Research & Publication | `research.html` | Three research pillars, year-grouped publications, and a compact citation card |
| Old publications URL | `publications.html` | Redirects to the research page and preserves paper/archive fragments |
| Experience | `experience.html` | V9 résumé roles grouped into Research, Industry, and Teaching Experience |
| Old projects URL | `projects.html` | Redirects to Research & Publication while the page is being revised |
| Old teaching URL | `teaching.html` | Redirects to the Teaching Experience section |
| About | `about.html` | Research biography and education |
| Full CV | `cv.html` | Detailed history, service, certifications, references |
| PDF CV | `assets/cv.pdf` | Downloadable CV |

Shared design and interactions are in `assets/styles.css` and `assets/site.js`.

## Editing content

Text stays in semantic HTML so pages remain readable without JavaScript and can be indexed directly. Update `research.html` for research pillars and publication records, then check related overview links. The mobile menu and publication filters use `assets/site.js`. Publication summaries use native `<details>` controls and work without JavaScript. Publication filters appear only when JavaScript is available; all publication records remain visible otherwise.

The previous Projects page is saved as `_drafts/projects.html` for later editing. GitHub Pages excludes this draft directory from the published site. Restore and revise it when the Projects page is ready to return; `projects.html` currently redirects visitors to Research & Publication.

Research, industry, and teaching roles are edited in `experience.html`. Keep the `teaching-experience` anchor so the old teaching URL and CV link continue to work.

The publication list in `research.html#publications` is based on `assets/publications.bib` and grouped by year. Its Year and Topic controls can be combined; add or update each record's `data-pub-year` and `data-pub-tags` when editing. Keep existing `pub-*`, `summary-*`, and `archive` IDs: old `publications.html#...` links redirect to these anchors. Update the HTML and BibTeX file together when a record changes. Omit unavailable paper or code buttons; do not use `href="#"`.

The citation card beside the publication filters in `research.html#citation-statistics` is a manually maintained snapshot of Google Scholar values supplied by the site owner. Update the numbers and citation bar widths together when the profile changes.

The research journey and “Now” sections are currently commented out on the overview page.

## Images

The existing `gittu.jpg` is the portrait. The research page uses the owner-supplied `ctvlm-inspect.png`, `longtail.png`, and `biomedclip.png`; the overview also uses `depthpulse.png`. The saved Projects draft still has figure placeholders; replace those with owner-supplied figures and suitable alt text when revising it. Do not use generated portraits or synthetic scientific results.

## Content review before publication

Confirm the three drafted research questions under each pillar in `research.html`. Review roles marked “Present,” the CV facts and PDF, the teaching course list, and older project statuses. The redesign preserves existing facts unless the approved handoff supplies an updated research description.

## Deploy

After reviewing content and testing locally, commit and push the site files to `main`. GitHub Pages serves the root HTML files directly. Do not include the local `nafiz_portfolio_codex_handoff/` folder in the published commit.
