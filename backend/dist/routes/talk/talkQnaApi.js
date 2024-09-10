"use strict";
// const express = require('express');
// const appRoot = require('app-root-path');
// const router = express.Router();
// const db = require(appRoot.resolve('db')); // Use path.join to construct the path
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const router = express_1.default.Router();
const db = require(app_root_path_1.default.resolve('db')); // Use path.join to construct the path
// 페이지 진입 시
router.get('', (req, res) => {
    db.query('SELECT * FROM talk_qna', (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: err.message });
        }
        console.log('Database query results:', results); // Log the results
        res.json(results);
    });
});
module.exports = router;
