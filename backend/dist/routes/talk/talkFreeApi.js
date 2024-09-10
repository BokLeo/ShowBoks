"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const router = express_1.default.Router();
const db = require(app_root_path_1.default.resolve('db')); // Use path.join to construct the path
;
// 페이지 진입 시
router.get('', (req, res) => {
    console.log('talkFree API accessed');
    db.query('SELECT * FROM talk_free', (err, results) => {
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
    const { content, user_ip, free_nickname, free_password } = req.body;
    // 회원 여부에 따라 다른 쿼리 실행
    let query;
    let params;
    console.log(`content: ${content}, user_ip: ${user_ip}, free_nickname: ${free_nickname}, free_password: ${free_password}`);
    query = 'INSERT INTO talk_free (content, free_nickname, free_password) VALUES (?, ?, ?, ?)';
    params = [content, user_ip, free_nickname, free_password];
    // 데이터베이스에 데이터 삽입
    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err });
        }
        console.log('Database query results:', results); // Log the results
        res.json(results);
    });
});
module.exports = router;
