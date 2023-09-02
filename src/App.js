import React, { useEffect } from 'react';

import AppRouter from './AppRouter';
import AppRouterProtected from './AppRouterProtected';
import { hasToken } from './utils/token';

function App() {
  useEffect(() => {
    // Initialize the token in localStorage if it doesn't exist
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', '');
    }
  }, []);

  // Correctly invoke the hasToken function and check its return value
  if (!hasToken()) { // Invoke hasToken as a function
    return (
      <div className="App">
        <main>
          <AppRouter />
        </main>
      </div>
    );
  } else {
    // if token, redirect to home
    return (
      <div className="App">
        <main>
          <AppRouterProtected />
        </main>
      </div>
    );
  }
}

export default App;
