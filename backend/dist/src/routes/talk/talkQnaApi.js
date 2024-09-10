"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const router = express_1.default.Router();
const connPath = path_1.default.join(app_root_path_1.default.path, 'src', 'conn'); // 절대 경로로 conn 파일 경로 설정
const conn = require(connPath).default; // conn 모듈 가져오기
// 페이지 진입 시
router.get('', (req, res) => {
    conn.query('SELECT * FROM talk_qna', (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err.message });
        }
        console.log('Database query results:', results); // Log the results
        res.json(results);
    });
});
exports.default = router;
