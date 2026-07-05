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

function renderHero(hero) {
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          <div>
            <h1>${escapeHtml(hero.name)}</h1>
            <p class="subtitle">${escapeHtml(hero.title)}</p>
          </div>
          <div class="social-links">
            <a class="btn btn-primary" href="${escapeHtml(hero.github)}" target="_blank" rel="noopener noreferrer">
              ${icons.github}
              Github
            </a>
            <a class="btn btn-outline" href="${escapeHtml(hero.linkedin)}" target="_blank" rel="noopener noreferrer">
              ${icons.linkedin}
              Linkedin
            </a>
          </div>
        </div>
        <div class="hero-image">
          <img src="assets/headshot.png" alt="${escapeHtml(hero.name)}" width="600" height="600" />
        </div>
      </div>
    </section>
  `;
}

function renderEducation(education) {
  const items = education
    .map(
      (edu) => `
      <li>
        <div class="edu-degree">${escapeHtml(edu.degree)}</div>
        ${edu.institution ? `<div class="edu-institution">${escapeHtml(edu.institution)}</div>` : ""}
        <span class="badge">${escapeHtml(edu.date)}</span>
      </li>
    `
    )
    .join("");

  return `
    <section id="education-and-skills">
      <div class="container">
        <h2 class="section-title">Education &amp; Licensure</h2>
        <div class="grid-2">
          <div class="card">
            <div class="card-header">Education</div>
            <div class="card-body">
              <ul class="edu-list">${items}</ul>
            </div>
          </div>
          <div class="card" id="skills-card">
            <div class="card-header">Technical Skills</div>
            <div class="card-body" id="skills-body"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSkills(skills) {
  return skills
    .map(
      (group) => `
      <div class="skill-group">
        <div class="skill-category">${escapeHtml(group.category)}</div>
        <div class="skill-tags">
          ${group.items.map((item) => `<span class="badge badge-secondary">${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>
    `
    )
    .join("");
}

function renderExperience(experience) {
  const items = experience
    .map((exp) => {
      const bullets =
        exp.responsibilities.length > 0
          ? `<ul>${exp.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>`
          : "";
      const location = exp.location ? ` · ${escapeHtml(exp.location)}` : "";
      return `
        <div class="exp-item">
          <h3 class="exp-title">${escapeHtml(exp.title)}</h3>
          <p class="exp-company">${escapeHtml(exp.company)}${location}</p>
          <p class="exp-dates">${escapeHtml(exp.startDate)} – ${escapeHtml(exp.endDate)}</p>
          ${bullets}
        </div>
      `;
    })
    .join("");

  return `
    <section id="experience">
      <div class="container">
        <h2 class="section-title">Work Experience</h2>
        <div class="card">${items}</div>
      </div>
    </section>
  `;
}

function renderAwards(awards) {
  const items = awards
    .map(
      (award) => `
      <div class="award-item">
        <div class="award-header">
          <span class="award-title">${escapeHtml(award.title)}</span>
          <span class="award-year">${escapeHtml(award.year)}</span>
        </div>
        <p class="award-desc">${escapeHtml(award.description)}</p>
      </div>
    `
    )
    .join("");

  return `
    <section id="awards-and-leadership">
      <div class="container">
        <h2 class="section-title">Awards &amp; Recognitions</h2>
        <div class="card"><div class="card-body">${items}</div></div>
      </div>
    </section>
  `;
}

function renderPosters(posters) {
  const items = posters
    .map(
      (poster) => `
      <div class="poster-item">
        <div class="poster-header">
          <span class="poster-title">${escapeHtml(poster.title)}</span>
          <span class="poster-date">${escapeHtml(poster.date)}</span>
        </div>
        <p class="poster-desc">${escapeHtml(poster.description)}</p>
      </div>
    `
    )
    .join("");

  return `
    <section id="posters">
      <div class="container">
        <h2 class="section-title">Posters &amp; Workshops</h2>
        <div class="card"><div class="card-body">${items}</div></div>
      </div>
    </section>
  `;
}

function renderProjects(projects) {
  const cards = projects
    .map(
      (project) => `
      <a class="project-card" href="project.html?id=${encodeURIComponent(project.id)}">
        <h3>${escapeHtml(project.title)}</h3>
        <div class="project-meta">${escapeHtml(project.category)} · ${escapeHtml(project.year)}</div>
        <p>${escapeHtml(project.summary)}</p>
        <span class="read-more">View deep dive →</span>
      </a>
    `
    )
    .join("");

  return `
    <section id="projects">
      <div class="container">
        <h2 class="section-title">Projects</h2>
        <div class="projects-grid">${cards}</div>
      </div>
    </section>
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
  const app = document.getElementById("app");
  try {
    const data = await loadResume();
    app.innerHTML =
      renderHero(data.hero) +
      renderEducation(data.education) +
      renderExperience(data.experience) +
      renderAwards(data.awards) +
      renderPosters(data.posters) +
      renderProjects(data.projects) +
      renderFooter(data.hero);

    document.getElementById("skills-body").innerHTML = renderSkills(data.skills);
    document.title = `${data.hero.name} — Resume`;
  } catch (err) {
    app.innerHTML = `<div class="error">Failed to load resume. ${escapeHtml(err.message)}</div>`;
  }
}

init();
