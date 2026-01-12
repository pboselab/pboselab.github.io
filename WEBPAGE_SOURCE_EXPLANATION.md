# How This Website Loads: .html vs .md Files

## Summary

**The project is now loading webpages from `.html` (static HTML) files** when deployed to GitHub Pages.

The `.md` files in the repository root are **legacy source files** that were previously used with Jekyll but are no longer active.

## Detailed Explanation

### Architecture Overview

This is now a **static HTML site** served directly by GitHub Pages without Jekyll processing.

### Current Configuration

#### **HTML Files (.html)** - Production Source Files
- Located in root: `index.html`, `people.html`, `contact.html`, `research.html`, `publications.html`, `join.html`
- These are **complete standalone HTML files** with:
  - Full DOCTYPE and HTML structure
  - Direct links to other `.html` files (e.g., `href="index.html"`)
  - Direct asset references (e.g., `href="assets/css/style.css"`)
- **Directly served by GitHub Pages** as static files
- The `.nojekyll` file in the root directory tells GitHub Pages to skip Jekyll processing

Example from `people.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>People | Bose Lab</title>
    <link rel="stylesheet" href="assets/css/style.css">
```

Notice the navigation links point directly to `.html` files:
```html
<a class="nav-link" href="people.html">People</a>
```

#### **Markdown Files (.md)** - Legacy Files (Not Used)
- Located in root: `index.md`, `people.md`, `contact.md`, `research.md`, `publications.md`, `join.md`
- These contain:
  - **YAML front matter** that was used by Jekyll
  - **Markdown content** with Jekyll Liquid template tags
- **NOT used by GitHub Pages** for the current website
- Kept for historical reference or potential future use

### Jekyll Configuration (Legacy)

The following files are from the previous Jekyll-based setup and are no longer active:

**`_config.yml`** - Jekyll configuration (no longer processed):
```yaml
title: "Bose Lab"
baseurl: "/pboselab.github.io"
url: "https://bose-lab-ucalgary.github.io"
plugins:
  - jekyll-seo-tag
  - jekyll-feed
  - jekyll-sitemap
```

**`.nojekyll`** - This empty file in the root tells GitHub Pages to **skip Jekyll processing** and serve the HTML files directly as static content.

### Layout Files (Legacy)

Located in `_layouts/` directory:
- **`default.html`**: Former Jekyll template with Liquid tags
- **`home.html`**: Former Jekyll template for homepage

These layouts are no longer used since Jekyll processing is disabled.

### Deployment Process

**GitHub Pages Deployment:**
1. GitHub Pages detects the `.nojekyll` file in the repository root
2. Skips Jekyll build process entirely
3. Serves `.html` files directly as static content
4. Assets (CSS, JS, images) are served from the `assets/` directory

**Local Development:**
- Simply open any `.html` file directly in a browser
- No build process or server required
- All links and assets work immediately with relative paths

### What Gets Ignored

The `.gitignore` includes:
```
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
```

These directories are from the previous Jekyll setup and are no longer generated.

## Conclusion

**For the live website on GitHub Pages**: The project now loads from **`.html` files**, which are served directly as static content without any build process.

**Key files:**
- `index.html` - Homepage (formerly `preview.html`)
- `people.html`, `contact.html`, `research.html`, `publications.html`, `join.html` - Other pages
- `.nojekyll` - Tells GitHub Pages to skip Jekyll processing
- `assets/` - CSS, JavaScript, and images

**Legacy files (no longer used):**
- `.md` files - Previous Jekyll source files
- `_layouts/` - Previous Jekyll templates
- `_config.yml` - Previous Jekyll configuration

The site is now a simple static HTML website that can be opened directly in a browser or served by any web server without requiring Jekyll or any build process.
