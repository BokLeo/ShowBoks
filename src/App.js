// App.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

// CSS
import './styles/common.css';

function App() {
  return (
    <Router>
      <div className='App-header'>
        <Header />
      </div>

      <div className='App-body'>
        <Routes>
          <Route exact path="/"  element={<Home />} />
        </Routes>
      </div>

      <div className='App-footer'>
        <ul className='footer-link'>
          <li><Link to="/test">Home</Link></li>
          <li><Link to="/test1">Feedback</Link></li>
          <li><Link to="/test2">Contact</Link></li>
        </ul>

        <p>© 2024 ShowBok's. All rights reserved.</p>
      </div>
    </Router>
  );
}

export default App;