// components/Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// mui icons
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

// server status check
import { checkServerStatus } from 'services/api';

import Nav from 'components/utils/Nav';
import UserTab from 'components/utils/UserTab';

function HeaderLayout() {
  const [serverIcon, setServerIcon] = useState(<WarningIcon fontSize='small' style={{ color: '#ffcc00' }} />);
  const [serverStatus, setServerStatus] = useState({
    status: 'checking',
    message: 'Checking server status...',
  });
  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await checkServerStatus();
        if(response.data.result) {
          setServerIcon(<CheckCircleIcon fontSize='small' style={{ color: '#007bff' }} />);
          setServerStatus({
            status: 'ok',
            message: 'Server is running.',
          });
        }
      } catch (error) {
        setServerIcon(<DoNotDisturbIcon fontSize='small' style={{ color: 'red' }} />);
        setServerStatus({
          status: 'error',
          message: 'Failed to connect to the server.',
        });
      }
    };

    fetchServerStatus();
  }, []);

  return (
    <div className='app-header'>
      <h1>
        <Link to="/" className='showboxs-title'>ShowBok&apos;s</Link>
        <span className='server-status' title={serverStatus.message}>{ serverIcon }</span>
      </h1>

      <Nav />

      <UserTab />
    </div>
  );
}

export default HeaderLayout;