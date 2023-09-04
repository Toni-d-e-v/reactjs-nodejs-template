import { getBackendUrl } from './url';

// utils/token.js
// Function to set a JWT token in localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Function to get the JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Function to check if a JWT token exists in localStorage
export const hasToken = () => {
    const token = getToken();
    // Return false if no token or it's an empty string
    return token !== null && token !== '';
};


export const removeToken = () => {
    localStorage.removeItem('token');
};


export const getUserInfo = async () => {
    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem('token');
  
      // Make a GET request to the protected route with the token in the Authorization header
      const response = await fetch(getBackendUrl() + '/protected/user', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        // Handle unauthorized or other errors here
        throw new Error('Failed to fetch user information');
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
  };


  export const isAuthorizedToken = async () => {
    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem('token');
  
      // Make a GET request to the protected resource with the token in the Authorization header
      const response = await fetch(getBackendUrl() + '/protected/user', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
  
      if (response.ok) {
        // The response status is 200, indicating the user is authorized
        return true;
      } else if (response.status === 401) {
        // The response status is 401, indicating unauthorized access
        return false;
      } else {
        // Handle other errors here
        console.error('Error checking authorization:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error checking authorization:', error);
      return false;
    }
  };