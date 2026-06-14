import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listPages } from '../../services/contentStore';
import type { PageDocument } from '../../lib/types/content';

export default function PagesList() {
  const [pages, setPages] = useState<PageDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPages(listPages());
    setLoading(false);
  }, []);

  if (loading) return <p className="admin-hint">Loading pages…</p>;

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Pages</h1>
        <p className="admin-hint">Fixed page set — edit content only.</p>
      </header>
      <ul className="admin-list">
        {pages.map((page) => (
          <li key={page.id}>
            <Link to={`/admin/pages/${page.id}`} className="admin-list__link">
              <span className="admin-list__title">{page.seo.title}</span>
              <span className="admin-list__meta">{page.id}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
