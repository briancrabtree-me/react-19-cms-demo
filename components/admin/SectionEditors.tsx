import type { HeroSection, PageSection, ProseSection } from '../../lib/types/content';

export function HeroEditor({
  section,
  onChange,
}: {
  section: HeroSection;
  onChange: (section: HeroSection) => void;
}) {
  return (
    <fieldset className="admin-panel">
      <legend>Hero</legend>
      <label className="admin-field">
        <span className="admin-field__label">Headline</span>
        <input
          className="admin-input"
          value={section.headline}
          onChange={(e) => onChange({ ...section, headline: e.target.value })}
        />
      </label>
      <label className="admin-field">
        <span className="admin-field__label">Subhead</span>
        <textarea
          className="admin-input"
          rows={2}
          value={section.subhead ?? ''}
          onChange={(e) => onChange({ ...section, subhead: e.target.value })}
        />
      </label>
    </fieldset>
  );
}

export function ProseEditor({
  section,
  onChange,
}: {
  section: ProseSection;
  onChange: (section: ProseSection) => void;
}) {
  const updateBlock = (index: number, text: string) => {
    const blocks = section.blocks.map((block, i) =>
      i === index ? { ...block, text } : block,
    );
    onChange({ ...section, blocks });
  };

  const addBlock = (type: 'heading' | 'paragraph') => {
    onChange({ ...section, blocks: [...section.blocks, { type, text: '' }] });
  };

  const removeBlock = (index: number) => {
    onChange({ ...section, blocks: section.blocks.filter((_, i) => i !== index) });
  };

  return (
    <fieldset className="admin-panel">
      <legend>Prose</legend>
      {section.blocks.map((block, index) => (
        <div key={index} className="admin-block">
          <span className="admin-block__type">{block.type}</span>
          <textarea
            className="admin-input"
            rows={block.type === 'heading' ? 2 : 4}
            value={block.text}
            onChange={(e) => updateBlock(index, e.target.value)}
          />
          <button
            type="button"
            className="admin-btn admin-btn--danger admin-btn--sm"
            onClick={() => removeBlock(index)}
          >
            Remove block
          </button>
        </div>
      ))}
      <div className="admin-field-grid">
        <button type="button" className="admin-btn" onClick={() => addBlock('heading')}>
          Add heading
        </button>
        <button type="button" className="admin-btn" onClick={() => addBlock('paragraph')}>
          Add paragraph
        </button>
      </div>
    </fieldset>
  );
}

export function getHeroSection(sections: PageSection[]): HeroSection {
  return (
    sections.find((section): section is HeroSection => section.type === 'hero') ?? {
      type: 'hero',
      headline: '',
      subhead: '',
    }
  );
}

export function getProseSection(sections: PageSection[]): ProseSection {
  return (
    sections.find((section): section is ProseSection => section.type === 'prose') ?? {
      type: 'prose',
      blocks: [],
    }
  );
}

export function replaceHeroSection(sections: PageSection[], hero: HeroSection): PageSection[] {
  const hasHero = sections.some((section) => section.type === 'hero');
  if (hasHero) {
    return sections.map((section) => (section.type === 'hero' ? hero : section));
  }
  return [hero, ...sections];
}

export function replaceProseSection(sections: PageSection[], prose: ProseSection): PageSection[] {
  const hasProse = sections.some((section) => section.type === 'prose');
  if (hasProse) {
    return sections.map((section) => (section.type === 'prose' ? prose : section));
  }
  return [...sections, prose];
}
