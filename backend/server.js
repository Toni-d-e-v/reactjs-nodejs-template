const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
app.use(bodyParser.json());

const secretKey = 'your-secret-key';
app.use(cors()); // Use the cors middleware for all routes
// Database configuration
const pool = new Pool({
  user: 'your-db-user',
  database: 'your-db-name',
  password: 'your-db-password',
  port: 5432, // PostgreSQL default port
  host: 'postgres',
});
app.post('/api/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Hash the password before storing it
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // Insert the new user into the database
      await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
  
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });
  
  // Authenticate user and return a JWT token
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Query the database to check if the user exists
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  
      if (user.rows.length === 0 || !bcrypt.compareSync(password, user.rows[0].password)) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Login failed:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });
  





// Middleware to verify the JWT token
  const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded; // Store the user information in the request object
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token is invalid' });
    }
  };

  // Protected route to get the user information
  app.get('/protected/user', verifyToken, (req, res) => {
    // Access the user information from the request object
    const { username } = req.user;

    // You can now use the username or perform any other action based on the user's identity
    res.json({ message: `User: ${username}` });
  });







  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
    next();
  });
  

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });