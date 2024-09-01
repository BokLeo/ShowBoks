// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

import Nav from 'components/utils/Nav';
import UserTab from 'components/utils/UserTab';

function HeaderLayout() {
  return (
    <div className='app-header'>
      <h1>
        <Link to="/" className='showboxs-title'>ShowBok's</Link>
      </h1>

      <Nav />

      <UserTab />
    </div>
  );
}

export default HeaderLayout;