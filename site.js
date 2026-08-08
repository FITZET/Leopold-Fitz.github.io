(function () {
  "use strict";

  const SELF = "Zixuan Shen";
  const list = document.getElementById("publication-list");
  const counter = document.getElementById("publication-count");
  const buttons = Array.from(document.querySelectorAll(".filter-button"));
  const publications = Array.isArray(window.publications) ? window.publications.slice() : [];

  publications.sort((a, b) => (b.year - a.year) || ((b.month || 0) - (a.month || 0)) || a.title.localeCompare(b.title));

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderAuthors(authors) {
    return authors.map((author) => {
      const safe = escapeHtml(author);
      return author === SELF ? `<span class="self-author">${safe}</span>` : safe;
    }).join(", ");
  }

  function paperUrl(paper) {
    if (paper.url) return paper.url;
    if (paper.doi) return `https://doi.org/${paper.doi}`;
    if (paper.localPdf) return paper.localPdf;
    return "#";
  }

  function paperLinks(paper) {
    const links = [];
    if (paper.doi) links.push(`<a href="https://doi.org/${escapeHtml(paper.doi)}" target="_blank" rel="noreferrer">DOI</a>`);
    if (paper.arxiv) links.push(`<a href="https://arxiv.org/abs/${escapeHtml(paper.arxiv)}" target="_blank" rel="noreferrer">arXiv</a>`);
    if (paper.localPdf) links.push(`<a href="${escapeHtml(paper.localPdf)}">PDF</a>`);
    return links.join("");
  }

  function render(filter) {
    const filtered = publications.filter((paper) => {
      if (filter === "all") return true;
      if (filter === "first-author") return paper.authors[0] === SELF;
      return paper.type === filter;
    });

    let currentYear = null;
    const chunks = [];

    filtered.forEach((paper) => {
      if (paper.year !== currentYear) {
        currentYear = paper.year;
        chunks.push(`<h3 class="year-heading">${paper.year}</h3>`);
      }

      chunks.push(`
        <article class="publication-card">
          <div class="paper-thumb" aria-hidden="true">
            <span class="thumb-year">${paper.year}</span>
            <span class="thumb-venue">${escapeHtml(paper.shortVenue || "Publication")}</span>
          </div>
          <div>
            <a class="publication-title" href="${escapeHtml(paperUrl(paper))}" target="_blank" rel="noreferrer">${escapeHtml(paper.title)}</a>
            <p class="authors">${renderAuthors(paper.authors)}</p>
            <p class="venue-line">${escapeHtml(paper.venue)}</p>
            ${paper.award ? `<p class="paper-award">${escapeHtml(paper.award)}</p>` : ""}
            ${paper.summary ? `<p class="paper-summary">${escapeHtml(paper.summary)}</p>` : ""}
            <div class="paper-links">${paperLinks(paper)}</div>
          </div>
        </article>`);
    });

    list.innerHTML = chunks.join("");
    counter.textContent = `${filtered.length} ${filtered.length === 1 ? "entry" : "entries"}`;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      render(button.dataset.filter || "all");
    });
  });

  render("all");
})();
