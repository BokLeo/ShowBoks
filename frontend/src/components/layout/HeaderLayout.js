// components/Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// mui icons
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

// server status check
import ConnectionChecker from 'components/utils/ConnectionChecker';

import Nav from 'components/utils/Nav';
import UserTab from 'components/utils/UserTab';
import { useSelector } from 'react-redux';


function HeaderLayout() {
  const [serverIcon, setServerIcon] = useState(<WarningIcon fontSize='small' style={{ color: '#ffcc00' }} />);
  const serverStatus = useSelector((state) => state.connection.serverStatus);

  useEffect(() => {

    if (serverStatus.status === 'working') {
      setServerIcon(<CheckCircleIcon fontSize='small' style={{ color: '#007bff' }} />);
    } else if (serverStatus.status === 'not-working') {
      setServerIcon(<DoNotDisturbIcon fontSize='small' style={{ color: 'red' }} />);
    } else {
      setServerIcon(<WarningIcon fontSize='small' style={{ color: '#ffcc00' }} />);
    }
  }, [serverStatus]);

  return (
    <div className='app-header'>      
			<ConnectionChecker />

      <h1>
        <Link to="/" className='showboxs-title'>ShowBok&apos;s</Link>
        <span className='server-status' title={serverStatus.message}>{ serverIcon }</span>
      </h1>

      <Nav />

      {/* <UserTab /> 미사용으로 삭제 */}
    </div>
  );
}

export default HeaderLayout;