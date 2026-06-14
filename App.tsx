import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';

const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AdminRoot = lazy(() => import('./pages/admin/AdminRoot'));

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

function RouteFallback() {
  return (
    <main className="site-main" aria-busy="true">
      <p>Loading…</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="blog"
            element={
              <Suspense fallback={<RouteFallback />}>
                <BlogList />
              </Suspense>
            }
          />
          <Route
            path="blog/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <BlogPost />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="admin/*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminRoot />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
