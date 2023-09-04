// src/pgaes/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import PublicNavbar from './pNavbar';
import { getBackendUrl } from '../utils/url';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend's /api/register endpoint
      const response = await axios.post(getBackendUrl() + '/api/register', formData);

      // Handle success or errors
      console.log(response.data);
      if (response.data) {
        console.log('User has been registered!');
        window.location.href = '/login';
    }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Username in use')
    }
  };

  return (
    <div>
      <PublicNavbar></PublicNavbar>
      <header>

      <Card>
        <Card.Header>Register</Card.Header>        
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

export default Register;
