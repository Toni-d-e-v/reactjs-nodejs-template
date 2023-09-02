import React from 'react';
import { Link } from 'react-router-dom';

const PrivateNavbar = () => {
  return (
    <nav className="public-navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
        <a href="/logout">Logout</a>

        </li>
        {/* Add more public navigation links as needed */}
      </ul>
    </nav>
  );
};

export default PrivateNavbar;
