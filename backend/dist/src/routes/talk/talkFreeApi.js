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
router.get('/total_cnt', (req, res) => {
    conn.query(`SELECT count(*) as cnt FROM talk_free where use_yn = 'Y'`, (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err.message });
        }
        console.log('Database query results:', results); // Log the results
        // res.json(results);
        const cnt = results[0]['cnt'];
        const pageSize = 8;
        const totalPage = Math.ceil(cnt / pageSize);
        res.json({ totalPage: totalPage });
    });
});
// 데이터 요청
router.get('/data', (req, res) => {
    console.log('talkFree API accessed');
    // 페이지네이션 파라미터 가져오기
    const page = parseInt(req.query.page) || 1; // 기본값 1
    const pageSize = 8;
    // OFFSET 계산
    const offset = (page - 1) * pageSize;
    console.log(`page: ${page}, pageSize: ${pageSize}, offset: ${offset}`);
    // 데이터 조회 쿼리 실행
    conn.query(`SELECT * FROM talk_free WHERE use_yn = 'Y' ORDER BY updated_dt DESC LIMIT ? OFFSET ?`, [pageSize, offset], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err.message });
        }
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
    query = 'INSERT INTO talk_free (content, free_nickname, free_password, user_ip) VALUES (?, ?, ?, ?)';
    params = [content, free_nickname, free_password, user_ip];
    // 데이터베이스에 데이터 삽입
    conn.query(query, params, (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err });
        }
        results.message = '게시글이 성공적으로 등록되었습니다.';
        res.json(results);
    });
});
// talk_free 게시글 비밀번호 확인
router.post('/check_password', (req, res) => {
    console.log(req.body);
    const { postId, password } = req.body;
    console.log(`postId: ${postId}, password: ${password}`);
    conn.query('SELECT * FROM talk_free WHERE id = ? AND free_password = ?', [postId, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err });
        }
        console.log('Database query results:', results); // Log the results
        if (results.length === 0) {
            return res.status(200).json({ result: false, error: '비밀번호가 일치하지 않습니다.' });
        }
        res.status(200).json({ result: true, data: results });
    });
});
// talk_free 게시글 삭제
router.post('/delete', (req, res) => {
    console.log(req.body);
    const { postId } = req.body;
    console.log(`postId: ${postId}`);
    conn.query('UPDATE talk_free SET use_yn = "N" WHERE id = ?', [postId], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(200).json({ result: false, error: '비밀번호가 일치하지 않거나 게시글이 존재하지 않습니다.' });
        }
        res.status(200).json({ result: true, message: '게시글이 성공적으로 삭제되었습니다.' });
    });
});
// talk_free 게시글 수정
router.post('/update', (req, res) => {
    const { postId, content } = req.body;
    console.log(`postId: ${postId}, content: ${content}`);
    conn.query('UPDATE talk_free SET content = ? WHERE id = ?', [content, postId], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(200).json({ result: false, error: '게시글이 존재하지 않습니다.' });
        }
        res.status(200).json({ result: true, message: '게시글이 성공적으로 수정되었습니다.' });
    });
});
exports.default = router;
