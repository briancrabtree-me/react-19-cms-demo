import type { PageDocument } from '../lib/types/content';

function renderHeadline(headline: string) {
  const words = headline.trim().split(/\s+/);
  if (words.length < 2) return headline;
  const last = words.pop()!;
  return (
    <>
      {words.join(' ')} <em>{last}</em>
    </>
  );
}

function renderBlock(block: { type: 'heading' | 'paragraph'; text: string }, index: number) {
  if (block.type === 'heading') {
    return (
      <h2 key={index} className="section-title">
        {block.text}
      </h2>
    );
  }
  return (
    <p key={index} className="prose-paragraph">
      {block.text}
    </p>
  );
}

export default function PageRenderer({ page }: { page: PageDocument }) {
  return (
    <>
      {page.sections.map((section, index) => {
        if (section.type === 'hero') {
          return (
            <section key={index} className="hero">
              <h1 className="hero-title">{renderHeadline(section.headline)}</h1>
              {section.subhead ? <p className="hero-lead">{section.subhead}</p> : null}
            </section>
          );
        }
        return (
          <section key={index} className="prose-section">
            {section.blocks.map(renderBlock)}
          </section>
        );
      })}
    </>
  );
}
