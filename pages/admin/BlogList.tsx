import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, listPosts } from '../../services/contentStore';
import type { BlogPost } from '../../lib/types/content';

function matchPost(post: BlogPost, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return post.title.toLowerCase().includes(q) || post.slug.toLowerCase().includes(q);
}

export default function BlogList() {
  const [posts, setPosts] = useState(() => listPosts());
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => posts.filter((post) => matchPost(post, query)),
    [posts, query],
  );

  const remove = (slug: string) => {
    if (!confirm(`Delete post "${slug}"?`)) return;
    deletePost(slug);
    setPosts(listPosts());
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header admin-page__header--row">
        <div>
          <h1>Blog</h1>
          <p className="admin-hint">{posts.length} posts</p>
        </div>
        <Link to="/admin/blog/new" className="admin-btn admin-btn--primary">
          New post
        </Link>
      </header>

      <label className="admin-field admin-field--search">
        <span className="admin-field__label">Search</span>
        <input
          className="admin-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by title or slug"
        />
      </label>

      {filtered.length === 0 ? (
        <p className="admin-empty">
          {query ? 'No posts match that filter.' : 'No posts yet.'}{' '}
          {!query ? <Link to="/admin/blog/new">Create one</Link> : null}
        </p>
      ) : (
        <ul className="admin-list">
          {filtered.map((post) => (
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
      )}
    </div>
  );
}
