// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Calculator from './components/Calculator';

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
          <Route path="/Calculator"  element={<Calculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;