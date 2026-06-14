export interface AdminNavItem {
  id: string;
  label: string;
  path: string;
}

export const ADMIN_NAV: AdminNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin' },
  { id: 'pages', label: 'Pages', path: '/admin/pages' },
  { id: 'blog', label: 'Blog', path: '/admin/blog' },
  { id: 'site', label: 'Site', path: '/admin/site' },
];
