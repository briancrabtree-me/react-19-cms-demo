import { Link } from 'react-router-dom';

const ACTIONS = [
  {
    title: 'Edit home',
    body: 'Hero, prose, and SEO for the landing page.',
    href: '/admin/pages/home',
  },
  {
    title: 'Edit about',
    body: 'Studio copy and meta for the about route.',
    href: '/admin/pages/about',
  },
  {
    title: 'New post',
    body: 'Create a blog entry with slug validation.',
    href: '/admin/blog/new',
  },
  {
    title: 'Site settings',
    body: 'Site name, navigation, accent color.',
    href: '/admin/site',
  },
] as const;

export default function QuickActionGrid() {
  return (
    <section className="admin-section" aria-labelledby="quick-actions-title">
      <h2 id="quick-actions-title" className="admin-section__title">
        Quick actions
      </h2>
      <div className="admin-action-grid">
        {ACTIONS.map((action) => (
          <Link key={action.href} to={action.href} className="admin-action-card">
            <h3>{action.title}</h3>
            <p>{action.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
