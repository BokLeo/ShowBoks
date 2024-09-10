"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// ----- Import the talk_qna routes -----
router.use('/talk/talk_qna', require('./talk/talkQnaApi'));
// ----- Import the talk_free routes -----
router.use('/talk/talk_free', require('./talk/talkFreeApi'));
exports.default = router;
