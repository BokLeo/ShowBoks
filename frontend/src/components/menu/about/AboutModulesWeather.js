
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
import 'styles/about-modules-weather.scss';

// 날씨 icon을 위한 Asset-icon 컴포넌트
import AssetIcon from 'components/ui/AssetIcon';


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
		console.log("location useEffect");
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

	// 하늘상태
	const SKY_CODES = {
		1 : { icon : 'sun', text : '맑음' },
		3 : { icon : 'cloud-sun', text : '구름많음' },
		4 : { icon : 'cloud', text : '흐림' },
	};

	//강수형태(없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7))
	const PTY_CODES = {
		0 : { icon : 'none', text : '없음' },
		1 : { icon : 'rain', text : '비' },
		2 : { icon : 'rain-snow', text : '비/눈' },
		3 : { icon : 'snow', text : '눈' },
		5 : { icon : 'rain', text : '비' },
		6 : { icon : 'rain-snow', text : '비/눈' },
		7 : { icon : 'snow', text : '눈' },
	};


	/*
		"sun","cloud-sun","cloud","rain","rain-snow","snow "
	 */

	
	

  return (
    <div className='weather'>
      {location.success === null && <p>Loading location...</p>}
      {location.success === true && (
				<>
					<p className='weather-location'>
						{address.city && address.street ? (
							<>현재 위치는 <strong><span className='txt-blue fs-xl'>{address.city}, {address.street}</span></strong> 입니다.</>
						) : (
							<>주소 정보를 가져올 수 없습니다.</>
						)}
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
								const skyData = item.data.find(d => d.category === 'SKY');
								const tempData = item.data.find(d => d.category === 'T1H');
								const rainData = item.data.find(d => d.category === 'RN1');
								const ptyData = item.data.find(d => d.category === 'PTY');

								const skyStatus = ptyData.fcstValue === "0";
								
								return (
									<div key={index} className='weather-item'>
										<div className='weather-date fs-xl'>{item.fcstDate}<span className='weather-time fs-lg'> ({item.fcstTime})</span></div>
										
										<div className='weather-data'>
										{skyStatus ? (
											<>
												<AssetIcon iconName={SKY_CODES[skyData.fcstValue].icon}/>
												<>{SKY_CODES[skyData.fcstValue].icon}</>
												{/* <p className={`sky-icon`}><AssetIcon name={SKY_CODES[skyData.fcstValue].icon} /><span className='screen-reader-text'>{SKY_CODES[skyData.fcstValue].text}</span></p> */}
												<p className='sky-value fs-md'>{tempData.fcstValue} {tempData.unit}</p>
											</>
										) : (
											<>
												<p className={`sky-icon ${PTY_CODES[ptyData.fcstValue].icon}`}><span className='screen-reader-text'>{PTY_CODES[ptyData.fcstValue].text}</span></p>
												<p className='sky-value fs-md'>{tempData.fcstValue} {tempData.unit} / {rainData.fcstValue}</p>
											</>
										)}
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