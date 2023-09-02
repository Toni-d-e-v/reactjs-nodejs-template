import React from 'react';
import { Link } from 'react-router-dom';

const PublicNavbar = () => {
  return (
    <nav className="public-navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {/* Add more public navigation links as needed */}
      </ul>
    </nav>
  );
};

export default PublicNavbar;
