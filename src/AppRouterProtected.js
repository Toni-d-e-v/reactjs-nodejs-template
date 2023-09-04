// src/AppRouter.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './ppages/Home';
import Logout from './ppages/Logout';
import { isAuthorizedToken } from './utils/token';

const ProtectedAppRouter = () => {

  
    useEffect(() => {
      // Initialize the token in localStorage if it doesn't exist
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', '');
      }
  
      // Check if the user is authorized
      const checkAuthorization = async () => {
        if (await isAuthorizedToken()) {
          // User is authorized, you can perform additional actions here
          // For example, fetch user data or redirect to a protected route
        } else {
          // User is not authorized, redirect to the login page
          // You can replace '/login' with your actual login route
          // clear token
          localStorage.setItem('token', '');

          window.location.href = '/';
        }
      };
  
      // Call the authorization check function
      checkAuthorization();
    }, []);
  
    
  


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/logout" component={Logout} />
        
      </Switch>
    </Router>
  );
};

export default ProtectedAppRouter;
