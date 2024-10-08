
// AboutModulesWeather
// 날씨 API를 가져와서 보여주는 컴포넌트

import React, { useState, useEffect } from 'react';

// 위치 정보 얻어보기
import Geolocation from 'components/utils/Geolocation';

// 날씨 API 가져오기
import { getWeather } from 'services/outside/Weather';

// 
import Weather from 'components/utils/Weather';

const AboutModulesWeather = () => {
	const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ success: null, x: null, y: null });
	const [requestWeatherTarget, setRequestWeatherTarget] = useState('기온');

	

	// setRequestWeatherTargetArr([

  useEffect(() => {
		// 날씨 정보 가져오기
		// const fetchWeather = async (v1, v2) => {
		// 	const response = await getWeather(v1, v2);
		// 	setWeather(response.data);
		// };

    // 위치 정보 가져오기
    Geolocation().then((result) => {
      if (result.success) {
        setLocation(result);

				// const weatherApiResult = fetchWeather(result.x, result.y);
				const weatherApiResult = Weather(requestWeatherTarget, result.x, result.y);
				weatherApiResult.then((result) => {
					console.log('weatherApiResult:', result);
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
  }, []);

  return (
    <div>
      {location.success === null && <p>Loading location...</p>}
      {location.success === true && (
        <div>
          <p>Geolocation success: x={location.x}, y={location.y}</p>
          {/* 날씨 정보를 가져와서 화면에 표시하는 로직 추가 */}
        </div>
      )}
      {location.success === false && <p>Geolocation failed or not supported.</p>}
    </div>
  );
	
};
export default AboutModulesWeather;