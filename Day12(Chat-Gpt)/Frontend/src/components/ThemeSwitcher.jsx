import React from 'react';

const ThemeSwitcher = ({ toggleTheme, theme }) => {
  return (
    <button onClick={toggleTheme} style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
      {theme === 'light' ? '🌞' : '🌜'}
    </button>
  );
};

export default ThemeSwitcher;
