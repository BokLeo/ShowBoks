"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const router = express_1.default.Router();
// 접속 
const connPath = path_1.default.join(app_root_path_1.default.path, 'dist', 'src', 'conn'); // dist로 경로 수정
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
// 위경도 -> 좌표 변환 함수
const geoGridConverter_1 = require("../../utils/geoGridConverter");
const getFormattedDate = () => {
    const now = moment_timezone_1.default.tz("Asia/Seoul");
    const year = now.year().toString();
    const month = (now.month() + 1).toString().padStart(2, '0');
    const day = now.date().toString().padStart(2, '0');
    const hours = now.hours().toString().padStart(2, '0');
    const minutes = now.minutes().toString().padStart(2, '0');
    console.log("now : " + now);
    console.log("day : " + day);
    console.log("year : " + year, "month : " + month, "day : " + day, "hours : " + hours, "minutes : " + minutes);
    const base_date = `${year}${month}${day}`;
    const base_time = minutes >= '45' ? `${hours}30` : `${(parseInt(hours) - 1).toString().padStart(2, '0')}30`;
    return { base_date, base_time };
};
// 필수 API Parameter
const serviceKey = WEATHER_API_KEY;
const numOfRows = 1000;
const pageNo = 1;
const dataType = "JSON";
// 초단기	실황 조회
router.get('/:path', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { path } = req.params;
    /**
     * @readonly path - API 경로
     * : 설명 : API 경로에 따라 다른 데이터를 가져올 수 있습니다.
     *
     * - @property {string} getUltraSrtNcst - 초단기실황조회
     * - @property {string} getUltraSrtFcst - 초단기예보조회
     * - @property {string} getVilageFcst - 단기예보조회
    */
    const v1 = parseFloat(req.query.v1);
    const v2 = parseFloat(req.query.v2);
    if (isNaN(v1) || isNaN(v2)) {
        return res.status(400).json({ error: 'Invalid query parameters' });
    }
    // 위, 경도 -> 좌표 변환
    const { x, y } = (0, geoGridConverter_1.dfs_xy_conv)('toXY', v1, v2);
    const { nx, ny } = { nx: x, ny: y };
    // 날짜, 시간 설정
    const { base_date, base_time } = getFormattedDate();
    // 경로에 따라 다른 URL 생성
    let apiUrl = `${WEATHER_API_URL}${path}?serviceKey=${WEATHER_API_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}&dataType=${dataType}&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;
    console.log("apiUrl : " + apiUrl);
    try {
        const result = yield axios.get(apiUrl);
        res.json(result.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}));
exports.default = router;
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
    RN1	1시간강수량	mm	8
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
