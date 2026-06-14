import { useActionState } from 'react';
import { useContent } from '../../hooks/useContent';
import { login } from '../../services/auth';

type LoginState = { error: string };

async function submitLogin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get('password') ?? '');
  if (!password) return { error: 'Password required.' };
  if (!login(password)) return { error: 'Invalid password.' };
  window.location.reload();
  return { error: '' };
}

const initial: LoginState = { error: '' };

export default function AdminLogin() {
  const { site } = useContent();
  const [state, formAction, pending] = useActionState(submitLogin, initial);

  return (
    <div className="admin-login">
      <div className="admin-login__stripe" aria-hidden="true" />
      <form className="admin-login__form admin-login__panel" action={formAction}>
        <h1>Admin</h1>
        <p className="admin-login__hint">{site.siteName}</p>
        <p className="admin-login__hint">Demo gate — see README for password.</p>
        <label className="admin-field">
          <span className="admin-field__label">Password</span>
          <input
            className="admin-input"
            type="password"
            name="password"
            required
            autoComplete="current-password"
          />
        </label>
        {state.error ? (
          <p className="admin-flash admin-flash--error" role="alert">
            {state.error}
          </p>
        ) : null}
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
