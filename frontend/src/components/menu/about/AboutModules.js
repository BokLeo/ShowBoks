// AboutModules 
// 날씨, 뉴스 등을 보여주는 button을 누르면 해당 정보를 보여주는 모듈들을 보여줍니다.

import React, {useState} from 'react';
import AboutModulesWeather from './AboutModulesWeather';
import ToggleBtn from 'components/ui/ToggleBtn';
import { Opacity } from '@mui/icons-material';

const AboutModules = () => {
	const [isWeather, setIsWeather] = useState(false);
	const [isNews, setIsNews] = useState(false);

	const AboutModules = {
		width: "100%",
		height: "80px",
	}

	const AboutModulesBtnArea = {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: "20px",
		gap: "10px",
	}

	const weatherBtnStyle = {
		width: "60px",
		height: "60px",
		fontSize: "1rem",
		backgroundColor: "transparent",
		color: "rgb(77, 77, 77)",
		border: "1px solid rgb(77, 77, 77)",
		...(isWeather && { 
			border: "1px solid #007bff",
			color: "#007bff",
			fontWeight: "bold",
			opacity: "1",
				
		}), // 조건부로 스타일 추가
	}

	return (
		<div style={AboutModules}>
			<ul style={AboutModulesBtnArea}>
				<li>
					<ToggleBtn onClick={() => setIsWeather(!isWeather)} style={weatherBtnStyle}>날씨</ToggleBtn>
				</li>
				<li>
					<button onClick={() => setIsNews(!isNews)}>뉴스</button>
				</li>
			</ul>

			<div>
				{isWeather && <div><AboutModulesWeather /></div>}
				{isNews && <div>뉴스 정보</div>}
			</div>
		</div>
	);
};

export default AboutModules;