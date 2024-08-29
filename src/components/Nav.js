// this File is used to create the Navigation bar for the website

import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/Experience">Experience</Link>
        </li>
        <li>
          <Link to="/Projects">Projects</Link>
        </li>
        <li>
          <Link to="/Talk">Talk</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
