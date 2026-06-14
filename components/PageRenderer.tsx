import type { PageDocument } from '../lib/types/content';

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
    <main className="site-main">
      {page.sections.map((section, index) => {
        if (section.type === 'hero') {
          return (
            <section key={index} className="hero">
              <h1 className="hero-title">{section.headline}</h1>
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
    </main>
  );
}
