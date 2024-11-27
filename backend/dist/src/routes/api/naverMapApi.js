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
const router = express_1.default.Router();
const connPath = path_1.default.join(app_root_path_1.default.path, 'dist', 'src', 'conn'); // dist로 경로 수정
const conn = require(connPath).default; // conn 모듈 가져오기
// .env 파일에서 API_KEY 가져오기 [WEATHER_API_KEY_ENCODING]
require('dotenv').config();
const NAVER_API_ID = process.env.NAVER_MAP_API_ID;
const NAVER_API_SECRET = process.env.NAVER_MAP_API_SECRET;
// 날씨 API 호출을 위한 axios 라이브러리
const axios = require('axios');
// 날씨 API 호출을 위한 URL
const NAVER_API_URL = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc`;
router.get('/reversegeocode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lng } = req.query;
    const headers = {
        'x-ncp-apigw-api-key-id': NAVER_API_ID,
        'x-ncp-apigw-api-key': NAVER_API_SECRET,
    };
    const params = {
        coords: `${lng},${lat}`,
        orders: 'legalcode,addr',
        output: 'json',
    };
    try {
        const response = yield axios.get(NAVER_API_URL, { headers, params });
        res.json(response.data);
    }
    catch (error) {
        console.error('Naver Map API error:', error);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
