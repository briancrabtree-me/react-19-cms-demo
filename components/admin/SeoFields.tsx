import type { Seo } from '../../lib/types/content';

export default function SeoFields({
  seo,
  onChange,
}: {
  seo: Seo;
  onChange: (seo: Seo) => void;
}) {
  return (
    <fieldset className="admin-panel">
      <legend>SEO</legend>
      <label className="admin-field">
        <span className="admin-field__label">Title</span>
        <input
          className="admin-input"
          value={seo.title}
          onChange={(e) => onChange({ ...seo, title: e.target.value })}
        />
      </label>
      <label className="admin-field">
        <span className="admin-field__label">Description</span>
        <textarea
          className="admin-input"
          rows={3}
          value={seo.description}
          onChange={(e) => onChange({ ...seo, description: e.target.value })}
        />
      </label>
    </fieldset>
  );
}
