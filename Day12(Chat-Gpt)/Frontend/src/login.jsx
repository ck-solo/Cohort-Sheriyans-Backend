import React, { useState } from 'react';
import './styles/theme.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate()

  function handleChange(e) {
    const { email, password } = e.target;
    setForm({email: form.value, password: form.value});
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // placeholder: integrate with backend/login service
    console.log('login', form);
    alert('Login (placeholder)');

    axios.post("http://localhost:3000/api/auth/login",{
      email: form.email,
      password : form.password
    },
  {
    withCredentials : true
  }).then((res)=>{
    console.log(res);
    navigate('/')
  }).catch((res)=>{
    console.log(res);
  }).finally(()=>{
    setSubmitting(false)
  })
  };

  return (
    <div className="page-center">
      <div className="container" style={{ maxWidth: 420 }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Welcome back</h2>
          <p className="label">Sign in to continue to your account</p>

          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                 
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                className="input"
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                 
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button className="btn" type="submit">Sign in</button>
              <a className="link" href="/register">Create account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;