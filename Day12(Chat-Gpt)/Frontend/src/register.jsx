import React, { useState } from 'react';
import './styles/theme.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '' });
  const [submitting, setsubmitting] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setsubmitting(true)
    // placeholder: integrate with backend/register service
    console.log('register data', form);
    axios.post("http://localhost:3000/api/auth/register",{
      email: form.email,
     FullName:{
       firstName : form.firstName,
      lastName : form.lastName,
     },
      password: form.password
    },
  {
    withCredentials:true
  }).then((res)=>{
    console.log(res)
    navigate('/')
  }).catch((err)=>{
    console.log(err);
    alert('Registeration failed ')
  })
    try{

    } catch(err){
        console.log(err);
      } finally {
        setsubmitting(false)
      }
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