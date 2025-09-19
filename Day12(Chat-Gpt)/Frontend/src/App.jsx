import { useState, useEffect } from 'react';
import AppRoutes from './appRoutes.jsx';
import ThemeSwitcher from './components/ThemeSwitcher';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = `${newTheme}-theme`;
  };

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  return (
    <>
      <ThemeSwitcher toggleTheme={toggleTheme} theme={theme} />
      <AppRoutes />
    </>
  );
}

export default App;
