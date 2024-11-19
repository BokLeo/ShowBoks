"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./src/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*', // 모든 도메인에서의 접근을 허용
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/status', (req, res) => {
    res.send({
        result: true,
        message: 'Server is running'
    });
});
const port = 5000; // 5000번 포트
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
