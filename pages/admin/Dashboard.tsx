import { Link } from 'react-router-dom';
import { resetToSeed } from '../../services/contentStore';

export default function Dashboard() {
  const reset = () => {
    if (!confirm('Reset all demo data to seed content?')) return;
    resetToSeed();
    window.location.reload();
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Dashboard</h1>
        <p>Browser-only CMS — content persists in localStorage on this device.</p>
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
      <fieldset className="admin-panel">
        <legend>Demo tools</legend>
        <p className="admin-hint">
          Password is <code>demo</code>. Edits sync to the public site immediately on this browser.
        </p>
        <button type="button" className="admin-btn admin-btn--danger" onClick={reset}>
          Reset demo data
        </button>
      </fieldset>
    </div>
  );
}
