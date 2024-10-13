// AboutModules 
// 날씨, 뉴스 등을 보여주는 button을 누르면 해당 정보를 보여주는 모듈들을 보여줍니다.

import React, {useState} from 'react';
import AboutModulesWeather from './AboutModulesWeather';
import ToggleBtn from 'components/ui/ToggleBtn';
import { Opacity } from '@mui/icons-material';

const AboutModules = () => {
	const [activeModule, setActiveModule] = useState(null);


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

	const baseBtnStyle = {
		width: "60px",
		height: "60px",
		fontSize: "1rem",
		backgroundColor: "transparent",
		color: "rgb(77, 77, 77)",
		border: "1px solid rgb(77, 77, 77)",
	};
	
	const getConditionalStyles = (isActive) => (
		isActive ? {
			border: "1px solid #007bff",
			color: "#007bff",
			fontWeight: "bold",
			opacity: "1",
		} : {}
	);
	
	const weatherBtnStyle = { ...baseBtnStyle, ...getConditionalStyles(activeModule === 'weather') };
  const newsBtnStyle = { ...baseBtnStyle, ...getConditionalStyles(activeModule === 'news') };

	return (
		<div style={AboutModulesStyle}>
      <ul style={AboutModulesBtnArea}>
        <li>
          <ToggleBtn onClick={() => setActiveModule(activeModule === 'weather' ? null : 'weather')} style={weatherBtnStyle}>
            날씨
          </ToggleBtn>
        </li>
        <li>
          <ToggleBtn onClick={() => setActiveModule(activeModule === 'news' ? null : 'news')} style={newsBtnStyle}>
            뉴스
          </ToggleBtn>
        </li>
      </ul>
      <div>
        {activeModule === 'weather' && <div><AboutModulesWeather /></div>}
        {activeModule === 'news' && <div>뉴스 정보</div>}
      </div>
    </div>
	);
};

export default AboutModules;