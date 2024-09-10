import express from 'express';
import talkQnaApi from './talk/talkQnaApi';
import talkFreeApi from './talk/talkFreeApi';

const router = express.Router();

// ----- Import the talk_qna routes -----
router.use('/talk/talk_qna', talkQnaApi);
// ----- Import the talk_free routes -----
router.use('/talk/talk_free', talkFreeApi);


export default router;