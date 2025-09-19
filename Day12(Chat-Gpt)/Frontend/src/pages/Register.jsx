import React from 'react';
import '../Form.css';

const Register = () => {
  return (
    <div className="form-container">
      <form className="form">
        <h1 className="form-title">Register</h1>
        <div className="form-group">
          <label className="form-label" htmlFor="firstname">First Name</label>
          <input className="form-input" type="text" id="firstname" placeholder="John" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lastname">Last Name</label>
          <input className="form-input" type="text" id="lastname" placeholder="Doe" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-input" type="email" id="email" placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-input" type="password" id="password" placeholder="••••••••" />
        </div>
        <button className="form-button" type="submit">Create account</button>
      </form>
    </div>
  );
};

export default Register;
