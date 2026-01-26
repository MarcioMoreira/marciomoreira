export function projectsView(projects = []) {
  const items = projects
    .map(p => `
      <li class="list-group-item">
        <strong>${p.name}</strong>
        <div class="text-muted small">${(p.tech || []).join(', ')}</div>
      </li>
    `)
    .join('');

  return `
    <section>
      <h2>Projects</h2>
      <ul class="list-group">
        ${items}
      </ul>
    </section>
  `;
}
