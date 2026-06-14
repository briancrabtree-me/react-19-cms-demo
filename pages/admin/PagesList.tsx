import { Link } from 'react-router-dom';
import { listPages } from '../../services/contentStore';

export default function PagesList() {
  const pages = listPages();

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Pages</h1>
      </header>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">ID</th>
              <th scope="col">SEO title</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td>{page.seo.title}</td>
                <td>
                  <code>{page.id}</code>
                </td>
                <td>{page.seo.title.length} chars</td>
                <td>
                  <Link to={`/admin/pages/${page.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
