import { Link } from 'react-router-dom';
import { formatDate } from '../lib/format';
import type { BlogPost } from '../lib/types/content';

export default function FeaturedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="home-section" aria-labelledby="featured-posts-title">
      <h2 id="featured-posts-title" className="section-title">
        From the blog
      </h2>
      <div className="feature-grid">
        {posts.map((post) => (
          <article key={post.slug} className="feature-card post-card">
            <p className="post-card__meta">{formatDate(post.publishedAt)}</p>
            <h3>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
