import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SaveBar from '../../components/admin/SaveBar';
import SeoFields from '../../components/admin/SeoFields';
import type { BlogPost } from '../../lib/types/content';
import { getPost, savePost } from '../../services/contentStore';

function emptyPost(): BlogPost {
  const today = new Date().toISOString().slice(0, 10);
  return {
    slug: '',
    title: '',
    publishedAt: today,
    excerpt: '',
    seo: { title: '', description: '' },
    body: '',
  };
}

export default function BlogEdit() {
  const { slug } = useParams<{ slug: string }>();
  const isNew = slug === 'new';
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(isNew ? emptyPost() : null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew || !slug) return;
    setPost(getPost(slug));
  }, [slug, isNew]);

  const save = async () => {
    if (!post) return;
    setSaving(true);
    setMessage('');
    setError('');
    try {
      savePost(post);
      if (isNew) {
        navigate(`/admin/blog/${post.slug}`);
        setMessage('Created.');
      } else {
        setMessage('Saved.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  if (!post) return <p className="admin-hint">Loading…</p>;

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <p className="admin-breadcrumb">
          <Link to="/admin/blog">Blog</Link> / {isNew ? 'new' : post.slug}
        </p>
        <h1>{isNew ? 'New post' : post.title}</h1>
      </header>

      <fieldset className="admin-panel">
        <legend>Post</legend>
        {isNew ? (
          <label className="admin-field">
            <span className="admin-field__label">Slug</span>
            <input
              className="admin-input"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              pattern="[a-z0-9-]+"
            />
          </label>
        ) : null}
        <label className="admin-field">
          <span className="admin-field__label">Title</span>
          <input
            className="admin-input"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </label>
        <label className="admin-field">
          <span className="admin-field__label">Published</span>
          <input
            className="admin-input"
            type="date"
            value={post.publishedAt}
            onChange={(e) => setPost({ ...post, publishedAt: e.target.value })}
          />
        </label>
        <label className="admin-field">
          <span className="admin-field__label">Excerpt</span>
          <textarea
            className="admin-input"
            rows={2}
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
          />
        </label>
        <label className="admin-field">
          <span className="admin-field__label">Body</span>
          <textarea
            className="admin-input"
            rows={8}
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
        </label>
      </fieldset>

      <SeoFields seo={post.seo} onChange={(seo) => setPost({ ...post, seo })} />

      <SaveBar onSave={save} saving={saving} message={message} error={error} />
    </div>
  );
}
