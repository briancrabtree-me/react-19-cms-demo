import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

export default function BlogPost() {
  const { slug = '' } = useParams();
  const { posts } = useContent();
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

  return (
    <main className="site-main blog-page">
      <p className="blog-breadcrumb">
        <Link to="/blog">Blog</Link> / {post.slug}
      </p>
      <article>
        <header className="blog-post__header">
          <h1>{post.title}</h1>
          <p className="blog-list__meta">{post.publishedAt}</p>
          {post.excerpt ? <p className="hero-lead">{post.excerpt}</p> : null}
        </header>
        <div className="blog-post__body">{post.body}</div>
      </article>
    </main>
  );
}
