import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './styles/theme.css';
import Home from './home';
import Login from './login';
import Register from './register';

const AppRouter = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div style={{ padding: 12 }}>
        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <div style={{ marginLeft: 'auto' }}>
            <button
              className="btn theme-btn"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {/* compact sun/moon icon that flips based on theme */}
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zM20.24 4.84l-1.79-1.79-1.8 1.79 1.8 1.79 1.79-1.79zM23 11v2h-3v-2h3zM4.22 19.78l1.79-1.79-1.79-1.8-1.8 1.8 1.8 1.79zM19.78 19.78l1.79-1.79-1.79-1.8-1.8 1.8 1.8 1.79zM12 6a6 6 0 100 12 6 6 0 000-12z" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter