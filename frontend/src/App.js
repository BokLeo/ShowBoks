import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';

// CSS
import './styles/common.css';

// Components
import { HeaderLayout, BodyLayout } from './components/layout';
import { checkServerStatus } from 'services/api';

function App() {
  const [serverStatus, setServerStatus] = useState('Checking...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await checkServerStatus();
        console.log('Server status response:', response.data); // 디버깅을 위해 응답 데이터 출력
        setServerStatus(response.data);
      } catch (error) {
        setError('Failed to connect to the server.');
        console.error('Server status check error:', error);
      }
    };

    fetchServerStatus();
  }, []);

  return (
    <BrowserRouter>
      <p>Server Status: {error ? error : serverStatus}</p>

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