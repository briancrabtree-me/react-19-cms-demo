import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../lib/format';
import { useContent } from '../hooks/useContent';

export default function BlogPost() {
  const { slug = '' } = useParams();
  const { posts, postOrder } = useContent();
  const post = posts[slug];

  useEffect(() => {
    document.title = post?.seo.title ?? 'Post not found';
  }, [post?.seo.title]);

  if (!post) {
    return (
      <main className="site-main blog-page">
        <h1>Post not found</h1>
        <p className="hero-lead">
          <Link to="/blog">Back to blog</Link>
        </p>
      </main>
    );
  }

  const index = postOrder.indexOf(slug);
  const prevSlug = index > 0 ? postOrder[index - 1] : null;
  const nextSlug = index >= 0 && index < postOrder.length - 1 ? postOrder[index + 1] : null;
  const prev = prevSlug ? posts[prevSlug] : null;
  const next = nextSlug ? posts[nextSlug] : null;

  return (
    <main className="site-main blog-page blog-page--article">
      <p className="blog-breadcrumb">
        <Link to="/blog">Blog</Link> / {post.slug}
      </p>
      <article className="blog-article">
        <header className="blog-post__header">
          <h1>{post.title}</h1>
          <p className="blog-post__date">{formatDate(post.publishedAt)}</p>
          {post.excerpt ? <p className="hero-lead blog-post__dek">{post.excerpt}</p> : null}
        </header>
        <div className="blog-post__body">{post.body}</div>
      </article>
      <nav className="post-nav" aria-label="Post navigation">
        {prev ? (
          <Link to={`/blog/${prev.slug}`} className="post-nav__link post-nav__link--prev">
            <span className="post-nav__label">Previous</span>
            <span className="post-nav__title">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/blog/${next.slug}`} className="post-nav__link post-nav__link--next">
            <span className="post-nav__label">Next</span>
            <span className="post-nav__title">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
