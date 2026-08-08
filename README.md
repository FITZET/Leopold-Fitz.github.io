# Zixuan Shen — Academic Homepage

Static academic homepage adapted from the visual structure of [Zishen Wan's homepage](https://github.com/zishenwan/zishenwan.github.io). The implementation is intentionally lightweight and works directly on GitHub Pages without a build step.

## Local preview

From this directory, run:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Updating content

- Main biography, research interests, news, and talks: `index.html`
- Publication metadata: `data/publications.js`
- Page styling: `stylesheet.css`
- Publication rendering and filters: `site.js`

## Adding the files that are still pending

1. Replace the portrait placeholder in `index.html` with an image, for example `images/zixuan-shen.jpg`.
2. Put the CV at `data/CV_Zixuan_Shen.pdf`, then change “CV forthcoming” in `index.html` to a link.
3. Put paper PDFs in `publication/`. For each publication, add a field such as:

```js
localPdf: "publication/your-paper.pdf"
```

The PDF button will then appear automatically.

## Data note

The current publication list is limited to records verified through the IEEE DOI, HUST affiliation, and the recurring HUST co-author network. This avoids pulling unrelated works from other researchers named Zixuan Shen.
