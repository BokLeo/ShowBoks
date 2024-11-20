
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
import Information from 'components/utils/Information';

// react Loading spinner
import HashLoader from "react-spinners/HashLoader";


const AboutModulesWeather = () => {
	const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ success: null, x: null, y: null });
	const [address, setAddress] = useState({
		city: null,
		street: null,
	});
	const [requestWeatherTarget, setRequestWeatherTarget] = useState([ 'SKY', 'T1H', 'PTY', 'RN1' ]);
	const [loading, setLoading] = useState(false);

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
			try {
				if (location.success) {
					const rawPayload = await getReverseeocode(location.x, location.y);
					// const addressObj = rawPayload?.data?.results[0].region;
					// setAddress({
					// 	city: addressObj.area1.name,
					// 	street: addressObj.area2.name,
					// });
					const result = rawPayload?.data?.results;
					if(!result || result.length === 0){
						throw new Error('주소 정보를 가져올 수 없습니다.');
					}
					const addressObj = result[0]?.region;
					if(!addressObj){
						throw new Error('주소 정보를 가져올 수 없습니다.');
					}

					setAddress({
						city: addressObj.area1.name,
						street: addressObj.area2.name,
					});
				}	
			} catch (error) {
				console.error('주소 정보를 가져오는 중 에러가 발생했습니다.', error);
				setAddress({
					city: null,
					street: null,
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
				setWeather(response);
				setLoading(true);
      }
    };

    fetchWeatherData();
  }, [location, requestWeatherTarget]); // location과 requestWeatherTarget이 변경될 때마다 실행

	// 하늘상태(1:맑음, 3:구름많음, 4:흐림)
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

	if(!loading) {
		return (
			<div className='weather'>
				<div style={{padding: '20px'}} >
					<HashLoader color={"rgb(0, 123, 255)"} loading={!loading} size={50} />
				</div>
			</div>
		);
	}

  return (
    <div className='weather'>
      {location.success === null && <p>Loading location...</p>}
      {location.success === true && (
				<>
					<p className='weather-location'>
						{address.city && address.street ? (
							<>
								현재 위치는 <strong><span className='txt-blue fs-xl'>{address.city} {address.street}</span></strong> 입니다.
							</>
						) : (
							<>주소 정보를 가져올 수 없습니다.</>
						)}
					</p>
					<div className='weather-wrap'>
						{
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
												<p className={`sky-icon`}><AssetIcon iconName={SKY_CODES[skyData.fcstValue].icon} /></p>
												<p className='sky-value fs-md'>{tempData.fcstValue} {tempData.unit}</p>
											</>
										) : (
											<>
												<p className={`sky-icon`}><AssetIcon iconName={PTY_CODES[ptyData.fcstValue].icon} /></p>
												<p className='sky-value fs-md'>{tempData.fcstValue} {tempData.unit} / {rainData.fcstValue}</p>
											</>
										)}
										</div>
									</div>
								);
							})
						}
					</div>
					<Information iconName="i" text="✨ 제작한 아이콘입니다." style={{ alignSelf: "flex-end", marginTop: "8px" }} direction="left" />
				</>
      )}
      {location.success === false && <p>Geolocation failed or not supported.</p>}
    </div>
  );
	
};
export default AboutModulesWeather;