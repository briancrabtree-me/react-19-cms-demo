import { Link } from 'react-router-dom';
import type { HealthIssue } from '../../lib/types/content';

export default function HealthPanel({ issues }: { issues: HealthIssue[] }) {
  const warnings = issues.filter((item) => item.level === 'warn');
  const ok = issues.filter((item) => item.level === 'ok');

  return (
    <section className="admin-section" aria-labelledby="health-title">
      <h2 id="health-title" className="admin-section__title">
        Content health
      </h2>
      <ul className="admin-health">
        {warnings.map((issue) => (
          <li key={issue.message} className="admin-health__item admin-health__item--warn">
            {issue.href ? (
              <Link to={issue.href}>{issue.message}</Link>
            ) : (
              issue.message
            )}
          </li>
        ))}
        {ok.map((issue) => (
          <li key={issue.message} className="admin-health__item admin-health__item--ok">
            {issue.message}
          </li>
        ))}
      </ul>
    </section>
  );
}
