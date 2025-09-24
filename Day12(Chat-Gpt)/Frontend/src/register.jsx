import React, { useState } from 'react';
import './styles/theme.css';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !firstname || !lastname || !password) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      // TODO: call register API
      await new Promise((r) => setTimeout(r, 900));
      setLoading(false);
      if (onRegister) onRegister({ email, firstname, lastname });
    } catch (err) {
      setLoading(false);
      setError('Registration failed — try again');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Start using the app in seconds — no credit card required.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col form-group">
              <span>First name</span>
              <input
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>

            <div className="col form-group">
              <span>Last name</span>
              <input
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div style={{ color: 'var(--danger)', marginTop: 8 }}>{error}</div>}

          <div className="form-actions ">
            <button className="btn ghost" type="button" onClick={() => { setFirstname(''); setLastname(''); setEmail(''); setPassword(''); }}>Clear</button>
            <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
          </div>

          <p className="small" style={{ marginTop: 12 }}>
            Already have an account? <a className="link" href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
