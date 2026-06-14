import { NavLink, Outlet, Link } from 'react-router-dom';
import { ADMIN_NAV } from '../../pages/admin/adminNav';

export default function AdminAppShell({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <span className="admin-topbar__brand">CMS Admin</span>
        <div className="admin-topbar__actions">
          <Link to="/" className="admin-link">
            View site
          </Link>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onLogout}>
            Log out
          </button>
        </div>
      </header>
      <div className="admin-body">
        <nav className="admin-nav" aria-label="Admin">
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                isActive ? 'admin-nav__link is-active' : 'admin-nav__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
