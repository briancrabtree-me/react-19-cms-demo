import { Link } from 'react-router-dom';
import { resetToSeed } from '../../services/contentStore';

export default function Dashboard() {
  const reset = () => {
    if (!confirm('Reset all content to the seed JSON?')) return;
    resetToSeed();
    window.location.reload();
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Dashboard</h1>
        <p>localStorage CMS — changes stay in this browser.</p>
      </header>
      <ul className="admin-quicklinks">
        <li>
          <Link to="/admin/pages/home">Edit home page</Link>
        </li>
        <li>
          <Link to="/admin/pages/about">Edit about page</Link>
        </li>
        <li>
          <Link to="/admin/blog">Manage blog posts</Link>
        </li>
        <li>
          <Link to="/admin/site">Site config &amp; navigation</Link>
        </li>
      </ul>
      <button type="button" className="admin-btn admin-btn--danger" onClick={reset}>
        Reset seed data
      </button>
    </div>
  );
}
