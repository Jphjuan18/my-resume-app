# Juan Hernandez — Resume Site

A static resume and portfolio site built with plain HTML, CSS, and JavaScript. Designed for [GitHub Pages](https://pages.github.com/) with no build step, database, or framework dependencies.

**Live site:** https://jphjuan18.github.io/my-resume-app/

---

## CV Workshop

This repo is the home base for keeping your resume up to date.

| File | Purpose |
|---|---|
| `AA CV_JuanHernandez.docx.md` | Master CV document — edit here when tailoring for roles or adding new experience |
| `data/resume.json` | Structured data that powers the website |
| `project.html` | Dynamic project deep-dive pages (loaded from JSON by project `id`) |

### Workflow

1. **Update your CV** — Edit `AA CV_JuanHernandez.docx.md` with new roles, skills, or bullet points.
2. **Sync to the site** — Mirror changes into `data/resume.json` (hero, education, experience, awards, posters, projects).
3. **Expand project details** — Add or edit entries in the `projects` array. Each project supports:
   - `id` — URL slug used in `project.html?id=your-slug`
   - `summary` — Short blurb shown on the home page card
   - `description` — Array of paragraphs for the deep-dive page
   - `highlights`, `technologies`, `links` — Optional detail sections
4. **Preview locally** — See [Local preview](#local-preview) below.
5. **Deploy** — Push to `static-html-gh-pages` (or merge to `main` when ready).

---

## Project structure

```
├── index.html              # Single-page resume (rendered from JSON)
├── project.html            # Project deep-dive page (?id=project-slug)
├── data/resume.json        # All resume content
├── css/styles.css          # Styles
├── js/resume.js            # Home page renderer
├── js/project.js           # Project detail renderer
├── assets/placeholder.svg  # Profile photo placeholder
├── AA CV_JuanHernandez.docx.md
└── .nojekyll               # Required for GitHub Pages
```

---

## Local preview

Because the site loads data via `fetch`, open it through a local server (not `file://`):

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

---

## GitHub Pages deployment

1. Push this branch to GitHub:
   ```bash
   git push -u origin static-html-gh-pages
   ```
2. Go to **Settings → Pages** in the repo.
3. Set **Source** to **Deploy from a branch**.
4. Choose branch `static-html-gh-pages` and folder `/ (root)`.
5. Save — the site will be live at `https://jphjuan18.github.io/my-resume-app/` within a few minutes.

When you're ready, merge `static-html-gh-pages` into `main` and point Pages at `main` instead.

---

## Adding a new project

Add an object to the `projects` array in `data/resume.json`:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "year": "2025",
  "category": "Data Analytics",
  "summary": "One-line description for the home page card.",
  "description": [
    "First paragraph of the deep dive.",
    "Second paragraph with more detail."
  ],
  "highlights": ["Key achievement 1", "Key achievement 2"],
  "technologies": ["Python", "SQL"],
  "links": [
    { "label": "GitHub", "url": "https://github.com/Jphjuan18/my-repo" }
  ]
}
```

The project will automatically appear on the home page and be accessible at `project.html?id=my-new-project`.
