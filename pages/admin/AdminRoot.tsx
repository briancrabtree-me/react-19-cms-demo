import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminAppShell from '../../components/admin/AdminAppShell';
import AdminLogin from '../../components/admin/AdminLogin';
import { useTheme } from '../../hooks/useTheme';
import { isAuthenticated, logout } from '../../services/auth';
import '../../styles/admin.css';

const Dashboard = lazy(() => import('./Dashboard'));
const PagesList = lazy(() => import('./PagesList'));
const PageEdit = lazy(() => import('./PageEdit'));
const BlogList = lazy(() => import('./BlogList'));
const BlogEdit = lazy(() => import('./BlogEdit'));
const SiteSettings = lazy(() => import('./SiteSettings'));

function AdminFallback() {
  return <p className="admin-hint">Loading…</p>;
}

export default function AdminRoot() {
  useTheme();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    setAuthed(false);
  };

  if (authed === null) {
    return (
      <div className="admin-login">
        <p className="admin-hint">Checking session…</p>
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin />;
  }

  return (
    <Suspense fallback={<AdminFallback />}>
      <Routes>
        <Route element={<AdminAppShell onLogout={handleLogout} />}>
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/:pageId" element={<PageEdit />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogEdit />} />
          <Route path="site" element={<SiteSettings />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
