// App.js
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

// CSS
import './styles/common.css';

// Components
import { About, Experience, Projects, Talk } from './components/menu';



function App() {
  return (
    <BrowserRouter>    
      <div id="root">
        <div className='app-header'>
          <Header />
        </div>

        <div className='app-body'>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/Experience" element={<Experience />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Talk" element={<Talk />} />
          </Routes>
        </div>

        <div className='app-footer'>
          <ul className='footer-link'>
            <li><Link to="/test1">Feedback</Link></li>
            <li><Link to="/test2">Contact</Link></li>
          </ul>

          <p>© 2024 ShowBok's. All rights reserved.</p>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;