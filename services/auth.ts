export const AUTH_SESSION_KEY = 'cms-demo-auth';
export const DEMO_PASSWORD = 'demo';

export function isAuthenticated(): boolean {
  if (typeof sessionStorage === 'undefined') return false;
  return sessionStorage.getItem(AUTH_SESSION_KEY) === '1';
}

export function login(password: string): boolean {
  if (password !== DEMO_PASSWORD) return false;
  sessionStorage.setItem(AUTH_SESSION_KEY, '1');
  return true;
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
}
