import { NavLink, Outlet } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { useTheme } from '../hooks/useTheme';
import SiteFooter from './SiteFooter';

function brandParts(name: string): [string, string] {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return [name, ''];
  return [words[0], words.slice(1).join(' ')];
}

export default function Layout() {
  useTheme();
  const { site } = useContent();
  const [primary, accent] = brandParts(site.siteName);

  return (
    <>
      <header className="site-header">
        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/" className="site-brand" end>
            {primary}
            {accent ? <em>{accent}</em> : null}
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
      <SiteFooter siteName={site.siteName} />
    </>
  );
}
