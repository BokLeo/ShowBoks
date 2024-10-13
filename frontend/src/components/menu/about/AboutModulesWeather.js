
// AboutModulesWeather
// 날씨 API를 가져와서 보여주는 컴포넌트

import React, { useState, useEffect } from 'react';

// 위치 정보 얻어보기
import Geolocation from 'components/utils/Geolocation';
// 주소 정보 가져오기
import { getReverseeocode } from 'services/outside/NaverMapApi';

// 날씨 정보 가져오기
import { getUltraSrtFcst } from 'services/outside/WeatherApi';

// 날시 정보 데이터 가공
import processWeatherData from 'components/utils/WeatherDataProcessor';

// 날씨 Css 파일(경로 : src\styles\about-modules-weather.scss)
import 'styles/about-modules-weather.css';


const AboutModulesWeather = () => {
	const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ success: null, x: null, y: null });
	const [address, setAddress] = useState({
		city: null,
		street: null,
	});
	const [requestWeatherTarget, setRequestWeatherTarget] = useState([ 'SKY', 'T1H', 'PTY', 'RN1' ]);

  useEffect(() => {
    // 위치 정보 가져오기
    const fetchLocation = async () => {
      const result = await Geolocation();
      if (result.success) {
        setLocation(result);
      }
    };
    fetchLocation();
  }, []); // 빈 배열을 사용하여 컴포넌트가 마운트될 때만 실행

	useEffect(() => {
		const fetchAddress = async () => {
			if (location.success) {
				const rawPayload = await getReverseeocode(location.x, location.y);
				const addressObj = rawPayload.data.results[0].region;
				// const addressName = addressObj.area1.name + ' ' + addressObj.area2.name;
				// console.log('addressName:', addressName);
				setAddress({
					city: addressObj.area1.name,
					street: addressObj.area2.name,
				});
			}
		};
		fetchAddress();
	}, [location]); // location이 변경될 때마다 실행

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location.success) {
        // 초단기 예보 데이터 가져오기
        const rawPayload = await getUltraSrtFcst(location.x, location.y);
				// ultraSrtFcst가 완료되면 processWeatherData 함수를 사용하여 데이터를 가공
				const response = await processWeatherData(rawPayload, requestWeatherTarget);
				console.log('response:', response);
				// 가공된 데이터를 상태로 저장
				setWeather(response);
      }
    };

    fetchWeatherData();
  }, [location, requestWeatherTarget]); // location과 requestWeatherTarget이 변경될 때마다 실행


  return (
    <div className='weather'>
      {location.success === null && <p>Loading location...</p>}
      {location.success === true && (
				<>
					<p className='weather-location'>
          현재 위치는 : {address ? `${address.city}, ${address.street}` : '주소 정보를 가져올 수 없습니다.'}
        </p>
					<div className='weather-wrap'>
						
						{/* 날씨 정보를 가져와서 화면에 표시하는 로직 추가 */}
						
						{
							/* weather 데이터 구조[array6]
								[
									{
										fcstDate: "10.13",
										fcstTime: "07:00",
										data: [
											{ category: "PTY", fcstValue: "0", unit: "", ko: "강수형태" },
											{ category: "RN1", fcstValue: "강수없음", unit: "mm", ko: "1시간 강수량" },
											{ category: "SKY", fcstValue: "1", unit: "", ko: "하늘상태" },
											{ category: "T1H", fcstValue: "15", unit: "℃", ko: "기온" }
										]
									},
									...
								]

							*/
							weather && weather.map((item, index) => {
								return (
									<div key={index} className='weather-item'>
										<div className='weather-date'>{item.fcstDate}</div>
										<div className='weather-time'>{item.fcstTime}</div>
										<div className='weather-data'>
											{
												item.data.map((data, index) => {
													return (
														<div key={index} className='weather-data-item'>
															<div className='weather-data-category'>{data.ko}</div>
															<div className='weather-data-value'>{data.fcstValue}{data.unit}</div>
														</div>
													)
												})
											}
										</div>
									</div>
								);
							})
									
						
						}
					</div>
				</>
      )}
      {location.success === false && <p>Geolocation failed or not supported.</p>}
    </div>
  );
	
};
export default AboutModulesWeather;