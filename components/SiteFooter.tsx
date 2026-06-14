import { Link } from 'react-router-dom';

export default function SiteFooter() {
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
    </footer>
  );
}
