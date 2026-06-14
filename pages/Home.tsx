import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CapabilitiesStrip from '../components/CapabilitiesStrip';
import FeaturedPosts from '../components/FeaturedPosts';
import PageRenderer from '../components/PageRenderer';
import { useContent } from '../hooks/useContent';
import { getRecentPosts } from '../services/contentStore';

export default function Home() {
  const { pages } = useContent();
  const page = pages.home;
  const featured = getRecentPosts(2);

  useEffect(() => {
    document.title = page.seo.title;
  }, [page.seo.title]);

  return (
    <main className="site-main">
      <PageRenderer page={page} />
      <div className="hero-cta">
        <Link to="/blog" className="btn btn-primary">
          Read the blog
        </Link>
        <Link to="/about" className="btn">
          About the studio
        </Link>
      </div>
      <FeaturedPosts posts={featured} />
      <CapabilitiesStrip />
    </main>
  );
}
