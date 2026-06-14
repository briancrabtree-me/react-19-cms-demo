import { Link } from 'react-router-dom';

export default function StatCard({
  value,
  label,
  href,
}: {
  value: string | number;
  label: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="admin-stat__value">{value}</span>
      <span className="admin-stat__label">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link to={href} className="admin-stat admin-stat--link">
        {body}
      </Link>
    );
  }

  return <div className="admin-stat">{body}</div>;
}
