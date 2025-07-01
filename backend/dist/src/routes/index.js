"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const talkQnaApi_1 = __importDefault(require("./talk/talkQnaApi"));
const talkFreeApi_1 = __importDefault(require("./talk/talkFreeApi"));
const weatherApi_1 = __importDefault(require("./api/weatherApi"));
// import naverMapApi from './api/naverMapApi';
const router = express_1.default.Router();
// ----- Import the talk_qna routes -----
router.use("/talk/talk_qna", talkQnaApi_1.default);
// ----- Import the talk_free routes -----
router.use("/talk/talk_free", talkFreeApi_1.default);
// ----- Import the api routes -----
router.use("/weather", weatherApi_1.default);
// router.use('/map', naverMapApi);
exports.default = router;
