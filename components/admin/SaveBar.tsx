export default function SaveBar({
  onSave,
  saving,
  message,
  error,
}: {
  onSave: () => void;
  saving: boolean;
  message?: string;
  error?: string;
}) {
  return (
    <div className="admin-savebar">
      <button type="button" className="admin-btn admin-btn--primary" onClick={onSave} disabled={saving}>
        {saving ? 'Saving…' : 'Save changes'}
      </button>
      {message ? <span className="admin-flash admin-flash--ok">{message}</span> : null}
      {error ? (
        <span className="admin-flash admin-flash--error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
