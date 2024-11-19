"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// 데이터베이스 연결 설정
const dbConfig = {
    host: process.env.DB_HOST_RELEASE,
    user: process.env.DB_USER_RELEASE,
    password: process.env.DB_PASS_RELEASE,
    database: process.env.DB_NAME_RELEASE,
    port: process.env.DB_PORT_RELEASE ? parseInt(process.env.DB_PORT_RELEASE) : undefined,
    waitForConnections: true, // 연결 대기 설정
    connectionLimit: process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE) : 10, // 커넥션 풀 크기
    queueLimit: 0, // 대기열 제한 (무제한)
};
// 커넥션 풀 생성
const pool = mysql2_1.default.createPool(dbConfig);
// 커넥션 풀에서 연결을 얻어서 쿼리 실행 예시
pool.query('SELECT 1', (err, results, fields) => {
    if (err) {
        console.error('Error executing query:', err);
    }
    else {
        console.log('Query result:', results);
    }
});
// 커넥션 풀 반환 (필요할 때 호출)
exports.default = pool;
