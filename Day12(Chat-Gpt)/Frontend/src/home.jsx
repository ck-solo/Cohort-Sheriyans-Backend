import React from 'react';
import './styles/theme.css';

const Home = () => {
  return (
    <div className="page-center">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Welcome</h1>
          <p className="label">This is the home page. Use the navigation to go to Login or Register.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;