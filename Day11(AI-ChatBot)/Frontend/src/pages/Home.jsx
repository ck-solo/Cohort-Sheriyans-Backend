import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="auth-container">
      <h1>Welcome</h1>
      <p>This is a placeholder home page. Use the links to navigate.</p>
      <div className="auth-actions">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
    </div>
  );
}