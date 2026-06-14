import { NavLink, Outlet } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import SiteFooter from './SiteFooter';

export default function Layout() {
  const { site } = useContent();

  return (
    <>
      <header className="site-header">
        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/" className="site-brand" end>
            {site.siteName.split(' ')[0]}
            <em>{site.siteName.includes('CMS') ? '-cms' : ''}</em>
          </NavLink>
          <ul className="site-nav-links">
            {site.nav.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end={item.path === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Outlet />
      <SiteFooter />
    </>
  );
}
