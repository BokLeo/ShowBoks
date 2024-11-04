import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import AlertBox from 'components/ui/AlertBox';


const Talk = () => {
	const serverStatus = useSelector((state) => state.connection.serverStatus);

	const handleClick = (event) => {
    if (serverStatus.status !== 'working') {
      event.preventDefault();
    }
  };

	return (
    <div className='talk'>
      <ul className='btn-wrap'>
        <li>
					<Link 
						to="/Talk/QuickTalk" 
						className='btn'
					>빠른 문답</Link>
				</li>

        <li>
					<Link 
						to="/Talk/FreeTalk" 
						className='btn'
						disabled={serverStatus.status !== 'working'}
						onClick={handleClick}
					>자유 작성</Link>
				</li>
      </ul>

			{serverStatus.status !== 'working' && (
				<AlertBox
					message="서버와의 연결이 끊어졌습니다."
					type="error"
					isVisible={true}
				/>
			)}
    </div>
  );
};

export default Talk;

