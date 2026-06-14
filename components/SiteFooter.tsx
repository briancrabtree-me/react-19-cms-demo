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
        <a href="/admin">Admin</a>
      </p>
    </footer>
  );
}
