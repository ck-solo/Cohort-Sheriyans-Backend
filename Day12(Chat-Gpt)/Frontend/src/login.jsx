import React, { useState } from 'react';
import './styles/theme.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide email and password');
      return;
    }
    setLoading(true);
    try {
      // TODO: replace with actual API call
      await new Promise((r) => setTimeout(r, 700));
      setLoading(false);
      if (onLogin) onLogin({ email });
    } catch (err) {
      setLoading(false);
      setError('Login failed — try again');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to continue to the app</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div style={{ color: 'var(--danger)', marginTop: 8 }}>{error}</div>}

          <div className="form-actions">
            <button className="btn ghost" type="button" onClick={() => { setEmail(''); setPassword(''); }}>Reset</button>
            <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Signing...' : 'Sign in'}</button>
          </div>

          <p className="small" style={{ marginTop: 12 }}>
            Don't have an account? <a className="link" href="/register">Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
