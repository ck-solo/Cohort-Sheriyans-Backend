import React, { useState } from 'react';
import './styles/theme.css';

const Register = () => {
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: integrate with backend/register service
    console.log('register data', form);
    alert('Registered (placeholder)');
  };

  return (
    <div className="page-center">
      <div className="container" style={{ maxWidth: 440 }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Create an account</h2>
          <p className="label">Enter your details to register</p>

          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col">
                <label className="label" htmlFor="firstName">First name</label>
                <input
                  className="input"
                  id="firstName"
                  name="firstName"
                  placeholder="First"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="label" htmlFor="lastName">Last name</label>
                <input
                  className="input"
                  id="lastName"
                  name="lastName"
                  placeholder="Last"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                className="input"
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <button className="btn" type="submit">Register</button>
              <a className="link" href="/login">Already have an account?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register