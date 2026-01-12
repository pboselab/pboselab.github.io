# How This Website Loads: .html vs .md Files

## Summary

**The project is loading webpages from `.md` (Markdown) files** when deployed to GitHub Pages.

The `.html` files in the repository root are **standalone preview files** for local development only.

## Detailed Explanation

### Architecture Overview

This is a **Jekyll-based static site** configured for GitHub Pages deployment.

### Two Sets of Files

#### 1. **Markdown Files (.md)** - Production Source Files
- Located in root: `index.md`, `people.md`, `contact.md`, `research.md`, `publications.md`, `join.md`
- These contain:
  - **YAML front matter** defining layout, title, and permalink
  - **Markdown content** with Jekyll Liquid template tags (e.g., `{{ '/assets/img/research_dna.png' | relative_url }}`)
- **Used by Jekyll** to generate the live website
- When GitHub Pages builds the site, Jekyll:
  1. Reads the `.md` files
  2. Processes the front matter
  3. Converts Markdown to HTML
  4. Wraps content in layouts from `_layouts/` directory
  5. Generates final HTML pages in the `_site/` directory (not committed to git)

Example front matter from `people.md`:
```yaml
---
layout: default
title: People
permalink: /people/
---
```

#### 2. **HTML Files (.html)** - Preview Files for Local Development
- Located in root: `preview.html`, `people.html`, `contact.html`, `research.html`, `publications.html`, `join.html`
- These are **complete standalone HTML files** with:
  - Full DOCTYPE and HTML structure
  - Hardcoded links to other `.html` preview files (e.g., `href="preview.html"`)
  - Direct asset references (e.g., `href="assets/css/style.css"`)
- **NOT used by GitHub Pages** for the live website
- Purpose: Allow developers to preview pages locally by opening them directly in a browser **without running Jekyll**

Evidence from `people.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>People | Bose Lab Preview</title>
    <link rel="stylesheet" href="assets/css/style.css">
```

Notice the navigation links in preview files point to `.html` files:
```html
<a class="nav-link" href="people.html">People</a>
```

### Jekyll Configuration

**`_config.yml`** configures the Jekyll site:
```yaml
title: "Bose Lab"
baseurl: "/pboselab.github.io"
url: "https://bose-lab-ucalgary.github.io"
plugins:
  - jekyll-seo-tag
  - jekyll-feed
  - jekyll-sitemap
```

### Layout Files

Located in `_layouts/` directory:
- **`default.html`**: Main template with Jekyll Liquid tags (`{{ content }}`, `{% seo %}`, etc.)
- **`home.html`**: Extends default.html for the homepage

These layouts wrap the content from `.md` files.

### Build Process

**GitHub Pages Deployment:**
1. GitHub Pages automatically runs `jekyll build`
2. Jekyll processes all `.md` files
3. Applies layouts from `_layouts/`
4. Generates final HTML in `_site/` directory (served to visitors)

**Local Preview (Two Options):**
- **Option A**: Run `jekyll serve` to build and serve the site locally (uses `.md` files)
- **Option B**: Open `.html` preview files directly in browser (no build needed, no Jekyll required)

### What Gets Ignored

The `.gitignore` includes:
```
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
```

This confirms that generated files are not committed - only source files are versioned.

## Conclusion

**For the live website on GitHub Pages**: The project loads from **`.md` files**, which Jekyll processes and converts to HTML using templates from `_layouts/`.

**For local development preview**: Developers can optionally use standalone **`.html` files** to quickly preview pages without running Jekyll, but these are NOT used for the production website.
