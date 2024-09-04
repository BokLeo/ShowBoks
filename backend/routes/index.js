const express = require('express');
const router = express.Router();

// ----- Import the talk_qna routes -----
router.use('/talk/talk_qna', require('./talk/talkQnaApi'));
// ----- Import the talk_free routes -----
router.use('/talk/talk_free', require('./talk/talkFreeApi'));

module.exports = router;