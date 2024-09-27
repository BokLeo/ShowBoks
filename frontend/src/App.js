import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';

// CSS
import './styles/common.css';

// Components
import { HeaderLayout, BodyLayout } from './components/layout';

function App() {

  return (
    <BrowserRouter>
      <HeaderLayout />

      <BodyLayout />

      <div className='app-footer'>
        <ul className='footer-link'>
          <li><Link to="/test1">Feedback</Link></li>
          <li><Link to="/test2">Contact</Link></li>
        </ul>
      </div>
    </BrowserRouter>
  );
}

export default App;