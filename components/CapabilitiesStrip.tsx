import { Link } from 'react-router-dom';

const CAPABILITIES = [
  {
    title: 'Pages',
    body: 'Fixed routes with hero + prose sections, SEO fields, and explicit save.',
  },
  {
    title: 'Blog',
    body: 'Full CRUD — slug validation, excerpts, ordered index, delete with confirm.',
  },
  {
    title: 'Admin demo',
    body: 'Lazy-loaded panel with dashboard stats, health checks, and activity feed.',
  },
] as const;

export default function CapabilitiesStrip() {
  return (
    <section className="home-section" aria-labelledby="capabilities-title">
      <h2 id="capabilities-title" className="section-title">
        CMS scope
      </h2>
      <div className="feature-grid">
        {CAPABILITIES.map((item) => (
          <article key={item.title} className="feature-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
