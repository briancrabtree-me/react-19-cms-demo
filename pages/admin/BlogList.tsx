import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, listPosts } from '../../services/contentStore';
import type { BlogPost } from '../../lib/types/content';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = () => setPosts(listPosts());

  useEffect(() => {
    reload();
    setLoading(false);
  }, []);

  const remove = (slug: string) => {
    if (!confirm(`Delete post "${slug}"?`)) return;
    deletePost(slug);
    reload();
  };

  if (loading) return <p className="admin-hint">Loading…</p>;

  return (
    <div className="admin-page">
      <header className="admin-page__header admin-page__header--row">
        <div>
          <h1>Blog</h1>
        </div>
        <Link to="/admin/blog/new" className="admin-btn admin-btn--primary">
          New post
        </Link>
      </header>
      <ul className="admin-list">
        {posts.map((post) => (
          <li key={post.slug} className="admin-list__row">
            <Link to={`/admin/blog/${post.slug}`} className="admin-list__link">
              <span className="admin-list__title">{post.title}</span>
              <span className="admin-list__meta">
                {post.slug} · {post.publishedAt}
              </span>
            </Link>
            <button
              type="button"
              className="admin-btn admin-btn--danger admin-btn--sm"
              onClick={() => remove(post.slug)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
