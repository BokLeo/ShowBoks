
// AboutModulesWeather
// 날씨 API를 가져와서 보여주는 컴포넌트

import React, { useState, useEffect } from 'react';

// 위치 정보 얻어보기
import Geolocation from 'components/utils/Geolocation';

// 날씨 정보 가져오기
import Weather from 'components/utils/Weather';

// 날씨 Css 파일(경로 : src\styles\about-modules-weather.scss)
import 'styles/about-modules-weather.css';


const AboutModulesWeather = () => {
	const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ success: null, x: null, y: null });
	const [requestWeatherTarget, setRequestWeatherTarget] = useState([ 'SKY', 'T1H', 'PTY', 'RN1' ]);

  useEffect(() => {
    // 위치 정보 가져오기
    Geolocation().then((result) => {
      if (result.success) {
        setLocation(result);

				// const weatherApiResult = fetchWeather(result.x, result.y);
				const weatherApiResult = Weather(requestWeatherTarget, result.x, result.y);
				weatherApiResult.then((result) => {
					console.log('weatherApiResult:', result);
					setWeather(result);
				}).catch((error) => {
					console.error('weatherApiResult error:', error);
				});

      } else {
        console.log('Geolocation failed or not supported.');
        setLocation({ success: false });
      }
    }).catch((error) => {
      console.error('Geolocation error1`11:', error);
      setLocation({ success: false });
    });
  }, [ requestWeatherTarget ]);

  return (
    <div className='weather-wrap'>
      {location.success === null && <p>Loading location...</p>}
      {location.success === true && (
        <div>
          <p>Geolocation success: x={location.x}, y={location.y}</p>
          {/* 날씨 정보를 가져와서 화면에 표시하는 로직 추가 */}
					
					{weather && (
						<div>
							<div className='weather-data now-time'>
								{/* 
									{
										fcstDate: "20241011"
										fcstTime: "2300" 
										data: 
											0: {category: 'PTY', fcstValue: '0', unit: '', ko: '강수형태'}
											1: {category: 'RN1', fcstValue: '강수없음', unit: 'mm', ko: '1시간 강수량'}
											2: {category: 'SKY', fcstValue: '1', unit: '', ko: '하늘상태'}
											3: {category: 'T1H', fcstValue: '15', unit: '℃', ko: '기온'}
									}
								*/}
								{
									weather[0].data.map((item, index) => (
										<div key={index} className='weather-item'>

										</div>
									))
								}
							</div>

							<ul className='weather-data after-time'>

							</ul>
						</div>
					)}
        </div>
      )}
      {location.success === false && <p>Geolocation failed or not supported.</p>}
    </div>
  );
	
};
export default AboutModulesWeather;