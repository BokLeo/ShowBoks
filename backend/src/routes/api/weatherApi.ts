import express, { Request, Response } from 'express';
import path from 'path';
import appRoot from 'app-root-path';

const router = express.Router();

// 접속 
const connPath = path.join(appRoot.path, 'src', 'conn'); // 절대 경로로 conn 파일 경로 설정
const conn = require(connPath).default; // conn 모듈 가져오기

/*
	해당 파일은 DATA.go.kr에서 제공하는 날씨 API를 사용하기 위한 파일입니다.
	작성일 : 2024.10.08
	작성자 : Leo
	데이터명 : 기상청_단기예보 ((구)_동네예보) 조회서비스
	사용기간 : 2024.10.07 ~ 2026.10.07
*/

// .env 파일에서 API_KEY 가져오기 [WEATHER_API_KEY_ENCODING]
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY_ENCODING;

// 날씨 API 호출을 위한 axios 라이브러리
const axios = require('axios');


// 날씨 API 호출을 위한 URL
const WEATHER_API_URL = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/';

// 날씨 API 각 서비스별 URL String
const 초단기실황조회 = "getUltraSrtNcst";
const 초단기예보조회 = "getUltraSrtFcst";
const 단기예보조회 = "getVilageFcst";
const 예보버전조회 = "getFcstVersion";

// 필요한 API Parameter
const numOfRows = 10;
const pageNo = 1;
const dataType = "JSON";

const getFormattedDate = () => {
  const now = new Date();

  // 날짜 포맷: YYYYMMDD
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
  const day = now.getDate().toString().padStart(2, '0');

  const base_date = `${year}${month}${day}`;

  // 시간 포맷: HHmm (24시간 형식)
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  const base_time = `${hours}${minutes}`;

  return { base_date, base_time };
};
const { base_date, base_time } = getFormattedDate();


// 위, 경도 -> 좌표 변환

/**
 * // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
//

export default function dfs_xy_conv(code, v1, v2) {
		var DEGRAD = Math.PI / 180.0;
 * 
 */

		/**
		 * 파일 경로 : C:\bok\Dev\Project\ShowBoks\backend\src\utils\geoGridConverter.ts
		 * 
		 */
// geoGridConverter 파일 사용
import { dfs_xy_conv } from '../../utils/geoGridConverter';








// 초단기	실황 조회
router.get('/getUltraSrtNcst', async (req: Request, res: Response) => {
	const v1 = parseFloat(req.query.v1 as string);
	const v2 = parseFloat(req.query.v2 as string);

	if (isNaN(v1) || isNaN(v2)) {
		return res.status(400).json({ error: 'Invalid query parameters' });
	}

	// 위, 경도 -> 좌표 변환
	const { x, y } = dfs_xy_conv('toXY', v1, v2);
	const { nx, ny } = { nx: x, ny: y };
	
	const url = `${WEATHER_API_URL}${초단기실황조회}?serviceKey=${WEATHER_API_KEY}&dataType=${dataType}&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;
	console.log(url);	
	try {
		const result = await axios.get(url);
		res.json(result.data);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
});

export default router;



/*
	[단기예보]
	POP	강수확률	%	8
	PTY	강수형태	코드값	4
	PCP	1시간 강수량	범주 (1 mm)	8
	REH	습도	%	8
	SNO	1시간 신적설	범주(1 cm)	8
	SKY	하늘상태	코드값	4
	TMP	1시간 기온	℃	10
	TMN	일 최저기온	℃	10
	TMX	일 최고기온	℃	10
	UUU	풍속(동서성분)	m/s	12
	VVV	풍속(남북성분)	m/s	12
	WAV	파고	M	8
	VEC	풍향	deg	10
	WSD	풍속	m/s	10
	
	[초단기실황]
	T1H	기온	℃	10
	RN1	1시간 강수량	mm	8
	UUU	동서바람성분	m/s	12
	VVV	남북바람성분	m/s	12
	REH	습도	%	8
	PTY	강수형태	코드값	4
	VEC	풍향	deg	10
	WSD	풍속	m/s	10

	[초단기예보]
	T1H	기온	℃	10
	RN1	1시간 강수량	범주 (1 mm)	8
	SKY	하늘상태	코드값	4
	UUU	동서바람성분	m/s	12
	VVV	남북바람성분	m/s	12
	REH	습도	%	8
	PTY	강수형태	코드값	4
	LGT	낙뢰	kA(킬로암페어)	4
	VEC	풍향	deg	10
	WSD	풍속	m/s	10

*/