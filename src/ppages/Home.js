// src/pgaes/Home.js
import React from 'react';
import UserInfo from '../pcomps/UserInfo';
import PrivateNavbar from './ppNavbar';
const Home = () => {
  return (
    <div>
      <PrivateNavbar></PrivateNavbar>
      <h1>
        Home Page
      </h1>
      <div class="dashboard">
        <div class="card">
          <UserInfo>

          </UserInfo>
        </div>
      </div>
      <div class="dashboard">
        <div class="card">
        <div class="card">
          <img src='http://clipart-library.com/images/qiBbdgki5.gif'
            width='500px' height='400px'
          ></img>
        </div>
        </div>
        <div class="card">
          <UserInfo>

          </UserInfo>
        </div>
      </div>
      <div class="dashboard">
        <div class="card">
          <UserInfo>

          </UserInfo>
        </div>

        <div class="card">
          <UserInfo>

          </UserInfo>
        </div>
        <div class="card">
          <UserInfo>

          </UserInfo>
        </div>
      </div>
    </div>
  );
};

export default Home;
