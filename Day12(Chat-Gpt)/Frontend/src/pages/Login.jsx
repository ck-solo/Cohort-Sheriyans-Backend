import React from 'react';
import '../Form.css';

const Login = () => {
  return (
    <div className="form-container">
      <form className="form">
        <h1 className="form-title">Login</h1>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-input" type="email" id="email" placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-input" type="password" id="password" placeholder="••••••••" />
        </div>
        <button className="form-button" type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
