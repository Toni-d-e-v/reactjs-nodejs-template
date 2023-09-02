// src/pgaes/UserInfo.js

import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../utils/token'; // Import the utility function

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information using the utility function
    getUserInfo()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        // Handle errors here
      });
  }, []);

  return (
    <div>
      {user ? (
        <p>Welcome, {user.message}</p>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserInfo;
