async function loadResume() {
  const response = await fetch("data/resume.json");
  if (!response.ok) throw new Error("Could not load resume data.");
  return response.json();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function getProjectId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderProject(project) {
  const paragraphs = project.description
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");

  const highlights =
    project.highlights.length > 0
      ? `
      <div class="detail-section">
        <h2>Highlights</h2>
        <ul>${project.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
      </div>
    `
      : "";

  const technologies =
    project.technologies.length > 0
      ? `
      <div class="detail-section">
        <h2>Technologies</h2>
        <div class="skill-tags">
          ${project.technologies.map((t) => `<span class="badge badge-secondary">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    `
      : "";

  const links =
    project.links.length > 0
      ? `
      <div class="detail-section">
        <h2>Links</h2>
        <div class="detail-links">
          ${project.links
            .map(
              (link) =>
                `<a class="btn btn-primary" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`
            )
            .join("")}
        </div>
      </div>
    `
      : "";

  return `
    <article class="project-detail">
      <div class="container">
        <a class="back-link" href="index.html#projects">← Back to all projects</a>
        <h1>${escapeHtml(project.title)}</h1>
        <div class="meta">
          <span>${escapeHtml(project.category)}</span>
          <span>${escapeHtml(project.year)}</span>
        </div>
        <p>${escapeHtml(project.summary)}</p>

        <div class="detail-section">
          <h2>Overview</h2>
          ${paragraphs}
        </div>

        ${highlights}
        ${technologies}
        ${links}
      </div>
    </article>
  `;
}

function renderFooter(hero) {
  return `
    <footer class="site-footer">
      <div class="container">
        <p>${escapeHtml(hero.name)}</p>
        <div class="footer-social">
          <a href="${escapeHtml(hero.github)}" target="_blank" rel="noopener noreferrer">
            ${icons.github}
            <span class="sr-only">GitHub</span>
          </a>
          <a href="${escapeHtml(hero.linkedin)}" target="_blank" rel="noopener noreferrer">
            ${icons.linkedin}
            <span class="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  `;
}

async function init() {
  const app = document.getElementById("project-app");
  const projectId = getProjectId();

  if (!projectId) {
    app.innerHTML = `<div class="error">No project specified. <a href="index.html#projects">Browse projects</a></div>`;
    return;
  }

  try {
    const data = await loadResume();
    const project = data.projects.find((p) => p.id === projectId);

    if (!project) {
      app.innerHTML = `<div class="error">Project not found. <a href="index.html#projects">Browse projects</a></div>`;
      return;
    }

    app.innerHTML = renderProject(project) + renderFooter(data.hero);
    document.title = `${project.title} — Juan Hernandez`;
    document.querySelector('meta[name="description"]').content = project.summary;
  } catch (err) {
    app.innerHTML = `<div class="error">Failed to load project. ${escapeHtml(err.message)}</div>`;
  }
}

init();
