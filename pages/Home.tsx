import { useEffect } from 'react';
import PageRenderer from '../components/PageRenderer';
import { useContent } from '../hooks/useContent';

export default function Home() {
  const { pages } = useContent();
  const page = pages.home;

  useEffect(() => {
    document.title = page.seo.title;
  }, [page.seo.title]);

  return <PageRenderer page={page} />;
}
