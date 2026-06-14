export default function SaveBar({
  onSave,
  saving = false,
  dirty = false,
  message,
  error,
}: {
  onSave: () => void;
  saving?: boolean;
  dirty?: boolean;
  message?: string;
  error?: string;
}) {
  return (
    <div className="admin-savebar admin-savebar--sticky">
      <button type="button" className="admin-btn admin-btn--primary" onClick={onSave} disabled={saving}>
        {saving ? 'Saving…' : 'Save changes'}
      </button>
      {dirty ? <span className="admin-flash admin-flash--dirty">Unsaved changes</span> : null}
      {message ? <span className="admin-flash admin-flash--ok">{message}</span> : null}
      {error ? (
        <span className="admin-flash admin-flash--error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
