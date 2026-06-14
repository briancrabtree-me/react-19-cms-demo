import { useEffect, useRef, useState } from 'react';
import SaveBar from '../../components/admin/SaveBar';
import { hexToRgb, rgbToHex } from '../../lib/format';
import { DEFAULT_ACCENT, type NavItem, type SiteConfig } from '../../lib/types/content';
import { getSite, saveSite } from '../../services/contentStore';

export default function SiteSettings() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const savedRef = useRef('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loaded = getSite();
    setConfig(loaded);
    savedRef.current = JSON.stringify(loaded);
  }, []);

  const updateNav = (index: number, item: NavItem) => {
    if (!config) return;
    const nav = [...config.nav];
    nav[index] = item;
    setConfig({ ...config, nav });
  };

  const dirty = config ? JSON.stringify(config) !== savedRef.current : false;
  const accent = config?.theme?.accent ?? DEFAULT_ACCENT;

  const save = () => {
    if (!config) return;
    setMessage('');
    setError('');
    try {
      saveSite(config);
      savedRef.current = JSON.stringify(config);
      setMessage('Saved.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
    }
  };

  if (!config) return <p className="admin-hint">Loading…</p>;

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Site</h1>
      </header>

      <fieldset className="admin-panel">
        <legend>General</legend>
        <label className="admin-field">
          <span className="admin-field__label">Site name</span>
          <input
            className="admin-input"
            value={config.siteName}
            onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
          />
        </label>
      </fieldset>

      <fieldset className="admin-panel">
        <legend>Theme</legend>
        <label className="admin-field admin-field--color">
          <span className="admin-field__label">Accent</span>
          <input
            className="admin-input admin-input--color"
            type="color"
            value={rgbToHex(accent)}
            onChange={(e) =>
              setConfig({
                ...config,
                theme: { accent: hexToRgb(e.target.value) },
              })
            }
          />
          <span
            className="admin-swatch"
            style={{ background: `rgb(${accent})` }}
            aria-hidden="true"
          />
        </label>
      </fieldset>

      <fieldset className="admin-panel">
        <legend>Navigation</legend>
        {config.nav.map((item, index) => (
          <div key={index} className="admin-field-grid">
            <label className="admin-field">
              <span className="admin-field__label">Label</span>
              <input
                className="admin-input"
                value={item.label}
                onChange={(e) => updateNav(index, { ...item, label: e.target.value })}
              />
            </label>
            <label className="admin-field">
              <span className="admin-field__label">Path</span>
              <input
                className="admin-input"
                value={item.path}
                onChange={(e) => updateNav(index, { ...item, path: e.target.value })}
              />
            </label>
          </div>
        ))}
      </fieldset>

      <SaveBar onSave={save} dirty={dirty} message={message} error={error} />
    </div>
  );
}
