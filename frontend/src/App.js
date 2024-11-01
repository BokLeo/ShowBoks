import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';

// CSS
import './styles/common.scss';

// Components
// import { HeaderLayout, BodyLayout } from './components/layout';


// @를 사용한 경로
import { HeaderLayout, BodyLayout } from 'components/layout';
// 또는 alias 없이
// import { HeaderLayout, BodyLayout } from 'components/layout';

function App() {

  return (
    <BrowserRouter>
      <HeaderLayout />

      <BodyLayout />

      <div className='app-footer'>
				Copyright (c) 2024 Showboks. All rights reserved.
        {/* <ul className='footer-link'>
          <li><Link to="/Freeback">Feedback</Link></li>
          <li><Link to="/test2">Contact</Link></li>
        </ul> */}
      </div>
    </BrowserRouter>
  );
}

export default App;