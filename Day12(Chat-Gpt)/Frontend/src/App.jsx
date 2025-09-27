import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/theme.css'
import AppRouter from './AppRouter';
import sunIcon from './assets/theme/sun.png';
import moonIcon from './assets/theme/moon.png';

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch (e) {
      return 'light'
    }
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <div style={{ position: 'absolute', right: 16, top: 12, zIndex: 60 }}>
        <button
          aria-label="Toggle theme"
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img
            src={theme === 'dark' ? moonIcon : sunIcon}
            alt={theme === 'dark' ? 'Moon icon' : 'Sun icon'}
            width={32}
            height={32}
            style={{ display: 'block' }}
          />
        </button>
      </div>

  <AppRouter />
    </>
  )
}

export default App
