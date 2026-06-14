import { useActionState } from 'react';
import { login } from '../../services/auth';

type LoginState = { error: string };

async function submitLogin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get('password') ?? '');
  if (!password) return { error: 'Password required.' };
  if (!login(password)) return { error: 'Invalid password. Use demo.' };
  window.location.reload();
  return { error: '' };
}

const initial: LoginState = { error: '' };

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState(submitLogin, initial);

  return (
    <div className="admin-login">
      <form className="admin-login__form" action={formAction}>
        <h1>Admin</h1>
        <p className="admin-login__hint">React 19 CMS Demo · password: demo</p>
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
