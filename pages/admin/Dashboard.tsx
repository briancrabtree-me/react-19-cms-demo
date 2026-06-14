import { Link } from 'react-router-dom';
import ActivityFeed from '../../components/admin/ActivityFeed';
import HealthPanel from '../../components/admin/HealthPanel';
import QuickActionGrid from '../../components/admin/QuickActionGrid';
import StatCard from '../../components/admin/StatCard';
import { formatDate, formatRelative } from '../../lib/format';
import { useContent } from '../../hooks/useContent';
import {
  getContentHealth,
  getDashboardStats,
  getRecentPosts,
  resetToSeed,
} from '../../services/contentStore';

export default function Dashboard() {
  const content = useContent();
  const stats = getDashboardStats();
  const health = getContentHealth();
  const recentPosts = getRecentPosts(3);

  const reset = () => {
    if (!confirm('Reset all content to the seed JSON?')) return;
    resetToSeed();
    window.location.reload();
  };

  return (
    <div className="admin-page admin-page--dashboard">
      <header className="admin-page__header">
        <h1>Dashboard</h1>
        <p>
          {content.site.siteName} · saved {formatRelative(stats.updatedAt)} · revision{' '}
          {stats.revision}
        </p>
      </header>

      <div className="admin-stat-grid">
        <StatCard value={stats.pages} label="Pages" href="/admin/pages" />
        <StatCard value={stats.posts} label="Posts" href="/admin/blog" />
        <StatCard value={stats.navItems} label="Nav links" href="/admin/site" />
        <StatCard value={`${stats.storageKb} KB`} label="Storage" />
      </div>

      <QuickActionGrid />

      <section className="admin-section" aria-labelledby="recent-posts-title">
        <h2 id="recent-posts-title" className="admin-section__title">
          Recent posts
        </h2>
        {recentPosts.length === 0 ? (
          <p className="admin-empty">
            No posts yet.{' '}
            <Link to="/admin/blog/new">Create one</Link>
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Published</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.slug}>
                    <td>{post.title}</td>
                    <td>{formatDate(post.publishedAt)}</td>
                    <td>
                      <Link to={`/admin/blog/${post.slug}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="admin-dashboard-grid">
        <HealthPanel issues={health} />
        <ActivityFeed entries={content.activity} />
      </div>

      <section className="admin-section admin-danger" aria-labelledby="danger-title">
        <h2 id="danger-title" className="admin-section__title">
          Danger zone
        </h2>
        <p className="admin-hint">Wipes local edits and restores the seed JSON.</p>
        <button type="button" className="admin-btn admin-btn--danger" onClick={reset}>
          Reset seed data
        </button>
      </section>
    </div>
  );
}
