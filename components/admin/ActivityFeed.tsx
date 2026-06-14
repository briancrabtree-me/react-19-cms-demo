import { formatRelative } from '../../lib/format';
import type { ActivityEntry } from '../../lib/types/content';

export default function ActivityFeed({ entries }: { entries: ActivityEntry[] }) {
  const items = entries.slice(0, 8);

  return (
    <section className="admin-section" aria-labelledby="activity-title">
      <h2 id="activity-title" className="admin-section__title">
        Recent activity
      </h2>
      {items.length === 0 ? (
        <p className="admin-empty">No activity yet — save something to populate this feed.</p>
      ) : (
        <ul className="admin-activity">
          {items.map((entry, index) => (
            <li key={`${entry.at}-${index}`}>
              <span className="admin-activity__label">{entry.label}</span>
              <time className="admin-activity__time" dateTime={entry.at}>
                {formatRelative(entry.at)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
