# nafiz95.github.io

Personal academic portfolio — [nafiz95.github.io](https://nafiz95.github.io)

Nafiz Sadman · PhD Candidate · Queen's University, School of Computing · BAM Lab

## Stack

Vanilla HTML + CSS + JS. No build step — GitHub Pages serves the files directly.

```
index.html          ← Home (bento grid)
publications.html   ← Publications (filterable, expandable abstracts)
projects.html       ← Projects (filterable by area)
cv.html             ← CV (timeline + sticky rail)
assets/
  styles.css        ← All shared styles + design tokens
  site.js           ← count-up animation, filtering, abstract toggle
  cv.pdf            ← Resume PDF (V8)
gittu.jpg           ← Profile headshot
scripts/
  fetch_scholar.py  ← Scholar stats scraper (used by CI)
.github/workflows/
  scholar-sync.yml  ← Daily GitHub Action to refresh citation counts
```

## Run locally

Any static file server works:

```bash
# Python (built-in)
python -m http.server 8080
# then open http://localhost:8080

# Node (npx)
npx serve .
```

## Update content

All content is hard-coded in the HTML files.

| Content | File |
|---|---|
| Bio, role, links | `index.html` — profile card |
| Research focus tagline + chips | `index.html` — research focus card |
| "Now" bullets | `index.html` — now card |
| Publications | `publications.html` — one `.pub-card` block per paper |
| Scholar stat numbers | `publications.html` + `index.html` — `data-countup` attributes |
| Projects | `projects.html` — one `.project-card` block per project |
| CV sections | `cv.html` |
| CV PDF | replace `assets/cv.pdf` |
| Headshot | replace `gittu.jpg` (or update `<img src>` in `index.html`) |

### Adding a publication

Copy an existing `.pub-card` block in `publications.html` and update:
- `data-pub-tags` attribute — comma-separated, e.g. `"XAI,VLM,first-author"`
- The colored left stripe `background` color
- Title, venue badge, authors, venue full name, abstract, links
- Place it in the correct year group, or add a new `year-group` section

### Adding a project

Copy an existing `.project-card` block in `projects.html` and update:
- `data-project-area` — must match a `data-area-filter` chip, or add a new chip to the filter bar
- Header background tint + border color, area pill, title, year/role, description, tags, status, links

## Updating Scholar stats manually

Update the `data-countup` values in `index.html` and `publications.html`:

```html
<span class="stat-number" data-countup="187">0</span>  <!-- citations -->
<span class="stat-number" data-countup="7">0</span>    <!-- h-index -->
<span class="stat-number" data-countup="6">0</span>    <!-- i10-index -->
<span class="stat-number" data-countup="12">0</span>   <!-- 1st-auth papers -->
```

Also update the subtitle text in `publications.html` and the "synced" date in the Citations stat tile.

## Google Scholar auto-sync (optional)

`.github/workflows/scholar-sync.yml` runs daily at 06:00 UTC, calls
`scripts/fetch_scholar.py`, and commits updated stats.

**Note:** `scholarly` scrapes Scholar and may hit CAPTCHAs from GitHub Actions IP
ranges. If the action fails, update the values manually as above.
The workflow supports `workflow_dispatch` for manual triggering from the GitHub UI.

## Deploy

Push to `main` — GitHub Pages picks it up automatically. No build step needed.

For a custom domain, add a `CNAME` file to the repo root containing your domain.
