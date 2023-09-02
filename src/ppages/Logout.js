// src/pgaes/Logout.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import { removeToken } from '../utils/token'; // Assuming you have a removeToken function in your token utility file

const Logout = () => {
  // Remove the token from localStorage
  removeToken();

  // Redirect to the home page or any other appropriate page after logout
  return <Redirect to="/" />;
};

export default Logout;
