"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const router = express_1.default.Router();
// 빌드 후 dist/src/conn.js 경로를 맞추기 위해 경로 수정
const connPath = path_1.default.join(app_root_path_1.default.path, 'dist', 'src', 'conn'); // dist로 경로 수정
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
