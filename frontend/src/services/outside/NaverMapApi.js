/**
 * 네이버 지도 API 호출 서비스
 * -- 네이버 지도 API를 사용하여 위치 정보를 가져온다.
 * @see https://api.ncloud-docs.com/docs/ainaverapi-maps-overview
 */

import api from 'services/api';


/**
 * 
 * @param {*} v1 => x 좌표
 * @param {*} v2 => y 좌표
 * @returns 
 */

export const getReverseeocode = async (v1, v2) => {
	return await api.get(`/api/map/reversegeocode?lat=${v1}&lng=${v2}`);
}