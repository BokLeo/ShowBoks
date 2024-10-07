// AboutModules 
// 날씨, 뉴스 등을 보여주는 button을 누르면 해당 정보를 보여주는 모듈들을 보여줍니다.

import React, {useState} from 'react';
import AboutModulesWeather from './AboutModulesWeather';

const AboutModules = () => {

	const AboutModules = {
		width: "100%",
		height: "80px",
	}

	const AboutModulesBtnArea = {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "rgb(77, 77, 77)",
		borderRadius: "8px",
		padding: "20px",
		marginBottom: "20px"
	}

	const [isWeather, setIsWeather] = useState(false);
	const [isNews, setIsNews] = useState(false);

	return (
		<div style={AboutModules}>
			<ul style={AboutModulesBtnArea}>
				<li>
					<button onClick={() => setIsWeather(!isWeather)}>날씨</button>
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