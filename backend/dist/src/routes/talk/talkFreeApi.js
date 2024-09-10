"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const router = express_1.default.Router();
// 접속 
const connPath = path_1.default.join(app_root_path_1.default.path, 'src', 'conn'); // 절대 경로로 conn 파일 경로 설정
const conn = require(connPath).default; // conn 모듈 가져오기
// Utils > getUserIp 가져오기
const getUserIp = require(path_1.default.join(app_root_path_1.default.path, 'src', 'utils', 'getUserIp')).default;
;
// 페이지 진입 시
router.get('', (req, res) => {
    console.log('talkFree API accessed');
    conn.query('SELECT * FROM talk_free', (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err.message });
        }
        console.log('Database query results:', results); // Log the results
        res.json(results);
    });
});
// talk_free 테이블에 데이터 삽입
router.post('/save', (req, res) => {
    const { content, free_nickname, free_password } = req.body;
    // 회원 여부에 따라 다른 쿼리 실행
    let query;
    let params;
    console.log(`content: ${content}, free_nickname: ${free_nickname}, free_password: ${free_password}`);
    // ip 가져오기
    const user_ip = getUserIp(req);
    console.log(`user_ip: ${user_ip}`);
    query = 'INSERT INTO talk_free (content, free_nickname, free_password, user_ip) VALUES (?, ?, ?, ?)';
    // params = [content, free_nickname, free_password, user_ip];
    params = [content, free_nickname, free_password];
    // 데이터베이스에 데이터 삽입
    conn.query(query, params, (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err });
        }
        console.log('Database query results:', results); // Log the results
        res.json(results);
    });
});
exports.default = router;
