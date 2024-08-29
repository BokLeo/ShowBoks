// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

import UserTab from './UserTab';
import Nav from './Nav';

function Header() {
  return (
    <>
      <h1>
        <Link to="/" className='showboxs-title'>ShowBok's</Link>
      </h1>

      <Nav />

      <UserTab />
    </>
  );
}

export default Header;