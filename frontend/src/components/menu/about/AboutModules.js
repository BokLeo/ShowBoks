// AboutModules 
// 날씨, 뉴스 등을 보여주는 button을 누르면 해당 정보를 보여주는 모듈들을 보여줍니다.

import React, {useState} from 'react';
import AboutModulesWeather from './AboutModulesWeather';
import ToggleBtn from 'components/ui/ToggleBtn';
import { Opacity } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AboutModules = () => {
	const [activeModule, setActiveModule] = useState(null);

	const serverStatus = useSelector((state) => state.connection.serverStatus);


	const AboutModulesStyle = {
    width: "100%",
    height: "80px",
  };

	const AboutModulesBtnArea = {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: "20px",
		gap: "4px",
	}

	return (
		<div style={AboutModulesStyle}>
      <ul style={AboutModulesBtnArea}>
        <li>
          <BaseButton 
						onClick={() => setActiveModule(activeModule === 'weather' ? null : 'weather')} 
						className={activeModule === 'weather' ? 'active' : ''}
						disabled={serverStatus.status !== 'working'}
					>날씨</BaseButton>
        </li>
        {/* <li>
          <ToggleBtn onClick={() => setActiveModule(null)} style={newsBtnStyle}>
            뉴스
          </ToggleBtn>
        </li> */}
      </ul>
      <div>
				{/* 
					1.serverStatus.status 'working'인지 확인 하고 
					2. serverStatus.status 'working'이면 activeModule값에 따라 AboutModulesWeather 컴포넌트를 보여줍니다.
				*/}
				{ serverStatus.status === 'working' && activeModule === 'weather' && <div><AboutModulesWeather /></div> }
				{ serverStatus.status === 'working' && activeModule === 'news' && <div>뉴스</div> }
				{ serverStatus.status !== 'working' && <div>서버 상태를 확인 중입니다...</div> }
      </div>
    </div>
	);
};

export default AboutModules;

const BaseButton = styled.button`
		width: 60px;
		height: 60px;
		font-size: 1rem;
		background-color: transparent;
		color: rgb(77, 77, 77);
		border: 1px solid rgb(77, 77, 77);
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			border: 1px solid #007bff;
			color: #007bff;
		}
		&.active {
			border: 1px solid #007bff;
			color: #007bff;
		}
	`;