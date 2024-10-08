import api from 'services/api';

/*
	-@ 날씨 정보를 가져오는 API
	- nx: x 좌표
	- ny: y 좌표
*/ 
export const getWeather = async (v1, v2) => {
	return await api.get(`/api/weather/getUltraSrtNcst?v1=${v1}&v2=${v2}`);
}