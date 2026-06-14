import { Link } from 'react-router-dom';

export default function SiteFooter({ siteName }: { siteName: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>
        © {year} Brian Crabtree · MIT ·{' '}
        <a
          href="https://github.com/briancrabtree-me/react-19-cms-demo"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        {' · '}
        <Link to="/admin">Admin demo</Link>
      </p>
      <p className="site-tagline">{siteName} — React 19 CMS demo</p>
    </footer>
  );
}
