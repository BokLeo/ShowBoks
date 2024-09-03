const express = require('express');
const router = express.Router();

// ----- Import the talk_qna routes -----
const talkQnaApi = require('./talk/talkQnaApi');
router.use('/talk/talkQnaApi', talkQnaApi);

module.exports = router;