"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = {
    host: process.env.DB_HOST_RELEASE,
    user: process.env.DB_USER_RELEASE,
    password: process.env.DB_PASS_RELEASE,
    database: process.env.DB_NAME_RELEASE,
    port: process.env.DB_PORT_RELEASE ? parseInt(process.env.DB_PORT_RELEASE) : undefined,
};
const conn = mysql2_1.default.createConnection(dbConfig);
conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

exports.default = conn;
