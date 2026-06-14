import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getHeroSection,
  getProseSection,
  HeroEditor,
  ProseEditor,
  replaceHeroSection,
  replaceProseSection,
} from '../../components/admin/SectionEditors';
import SaveBar from '../../components/admin/SaveBar';
import SeoFields from '../../components/admin/SeoFields';
import type { PageDocument } from '../../lib/types/content';
import { getPage, savePage } from '../../services/contentStore';

export default function PageEdit() {
  const { pageId = '' } = useParams<{ pageId: string }>();
  const [page, setPage] = useState<PageDocument | null>(null);
  const savedRef = useRef('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pageId) return;
    const loaded = getPage(pageId);
    setPage(loaded);
    savedRef.current = JSON.stringify(loaded);
  }, [pageId]);

  const dirty = page ? JSON.stringify(page) !== savedRef.current : false;

  const save = () => {
    if (!page || !pageId) return;
    setMessage('');
    setError('');
    try {
      savePage(pageId, page);
      savedRef.current = JSON.stringify(page);
      setMessage('Saved.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
    }
  };

  if (!page) return <p className="admin-hint">Loading…</p>;

  const hero = getHeroSection(page.sections);
  const prose = getProseSection(page.sections);

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <p className="admin-breadcrumb">
          <Link to="/admin/pages">Pages</Link> / {pageId}
        </p>
        <h1>{page.seo.title}</h1>
      </header>

      <SeoFields seo={page.seo} onChange={(seo) => setPage({ ...page, seo })} />

      <HeroEditor
        section={hero}
        onChange={(section) =>
          setPage({ ...page, sections: replaceHeroSection(page.sections, section) })
        }
      />

      <ProseEditor
        section={prose}
        onChange={(section) =>
          setPage({ ...page, sections: replaceProseSection(page.sections, section) })
        }
      />

      <SaveBar onSave={save} dirty={dirty} message={message} error={error} />
    </div>
  );
}
