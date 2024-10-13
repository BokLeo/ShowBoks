import api from 'services/api';

/**
 * @description : path 값에 따라 날씨 정보를 가져옴
 * - path : {String} - api 경로
 * 		- getUltraSrtNcst	초단기실황조회
			- getUltraSrtFcst	초단기예보조회
			- getVilageFcst	단기예보조회
 */

/**
 * @param {*} v1 : x 좌표
 * @param {*} v2 : y 좌표
 */

export const getUltraSrtNcst = async (v1, v2) => {
	return await api.get(`/api/weather/getUltraSrtNcst?v1=${v1}&v2=${v2}`);
}

export const getUltraSrtFcst = async (v1, v2) => {
	return await api.get(`/api/weather/getUltraSrtFcst?v1=${v1}&v2=${v2}`);
}

export const getVilageFcst = async (v1, v2) => {
	return await api.get(`/api/weather/getVilageFcst?v1=${v1}&v2=${v2}`);
}