import express, { Request, Response } from 'express';
import path from 'path';
import appRoot from 'app-root-path';

const router = express.Router();

const connPath = path.join(appRoot.path, 'dist', 'src', 'conn'); // dist로 경로 수정
const conn = require(connPath).default; // conn 모듈 가져오기

// .env 파일에서 API_KEY 가져오기 [WEATHER_API_KEY_ENCODING]
require('dotenv').config();
const NAVER_API_ID = process.env.NAVER_MAP_API_ID;
const NAVER_API_SECRET = process.env.NAVER_MAP_API_SECRET;

// 날씨 API 호출을 위한 axios 라이브러리
const axios = require('axios');

// 날씨 API 호출을 위한 URL
const NAVER_API_URL = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc`;


router.get('/reversegeocode', async (req: Request, res: Response) => {
	const { lat, lng } = req.query;

	const headers = {
		'x-ncp-apigw-api-key-id': NAVER_API_ID,
		'x-ncp-apigw-api-key': NAVER_API_SECRET,
	};

	const params = {
		coords: `${lng},${lat}`,
		orders: 'roadaddr',
		output: 'json',
	};

	try {
		console.log("Request URL:", NAVER_API_URL);
		console.log("Request Headers:", headers);
		console.log("Request Params:", params);

		const response = await axios.get(NAVER_API_URL, { headers, params });
		console.log('API Response:', response.data); // API 응답 로그

		res.json(response.data);
	} catch (error) {
		console.error('Naver Map API error:', error);
		res.status(500).json({ error: (error as Error).message });
	}
});

export default router;
