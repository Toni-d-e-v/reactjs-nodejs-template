// src/pgaes/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import PublicNavbar from './pNavbar';
import { getBackendUrl } from '../utils/url';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend's /api/login endpoint
      const response = await axios.post(getBackendUrl() + '/api/login', formData);

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




      <Card>
        <Card.Header>Login</Card.Header>        
        <Card.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Username</Form.Label>
          
          <Form.Control type="username"  
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
          
          <Form.Control type="password"  
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Form.Group>
        <Button type="submit">Login</Button>

        </Form>
        </Card.Body>
      </Card>
      </header>

    </div>
  );
};

export default Login;
