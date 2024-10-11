
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
						<div className='weather-grid'>
							{weather.map((item, index) => (
								<div key={index}>
									<p>{item.fcstDate} {item.fcstTime}</p>
									<ul>
										{item.data.map((data, index) => (
											<li key={index}>{data.ko}: {data.fcstValue} {data.unit}</li>
										))}
									</ul>
								</div>
							))}
						</div>
					)}
        </div>
      )}
      {location.success === false && <p>Geolocation failed or not supported.</p>}
    </div>
  );
	
};
export default AboutModulesWeather;