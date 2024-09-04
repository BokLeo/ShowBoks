const express = require('express');
const router = express.Router();

// ----- Import the talk_qna routes -----
router.use('/talk/talk_qna', require('./talk/talkQnaApi'));

module.exports = router;