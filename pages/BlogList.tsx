import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

export default function BlogList() {
  const { site, postOrder, posts } = useContent();

  useEffect(() => {
    document.title = `Blog — ${site.siteName}`;
  }, [site.siteName]);

  return (
    <main className="site-main blog-page">
      <h1>Blog</h1>
      <ul className="blog-list">
        {postOrder.map((slug) => {
          const post = posts[slug];
          if (!post) return null;
          return (
            <li key={slug} className="blog-list__item">
              <Link to={`/blog/${slug}`} className="blog-list__link">
                <span className="blog-list__title">{post.title}</span>
                <span className="blog-list__meta">
                  {post.publishedAt} · {post.excerpt}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
