// src/pgaes/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import PublicNavbar from './pNavbar';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend's /api/login endpoint
      const response = await axios.post('http://localhost:5000/api/login', formData);

      // Handle success or errors
      console.log(response.data);
      if (response.data) {
            console.log('User has been logged in!');
            // save
            localStorage.setItem('token', response.data.token);
            // redirect
            window.location.href = '/';
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <PublicNavbar></PublicNavbar>
      <header>

      <h2>Login</h2>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      </header>

    </div>
  );
};

export default Login;
