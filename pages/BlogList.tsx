import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/format';
import { useContent } from '../hooks/useContent';

export default function BlogList() {
  const { site, postOrder, posts } = useContent();

  useEffect(() => {
    document.title = `Blog — ${site.siteName}`;
  }, [site.siteName]);

  return (
    <main className="site-main blog-page">
      <header className="blog-page__header">
        <h1>Blog</h1>
        <p className="hero-lead">Notes on shipping fast front-ends.</p>
      </header>
      <div className="feature-grid blog-grid">
        {postOrder.map((slug) => {
          const post = posts[slug];
          if (!post) return null;
          return (
            <article key={slug} className="feature-card post-card">
              <p className="post-card__meta">{formatDate(post.publishedAt)}</p>
              <h2 className="post-card__title">
                <Link to={`/blog/${slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
