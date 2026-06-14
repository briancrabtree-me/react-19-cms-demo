import { Link } from 'react-router-dom';
import { listPages } from '../../services/contentStore';

export default function PagesList() {
  const pages = listPages();

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Pages</h1>
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
