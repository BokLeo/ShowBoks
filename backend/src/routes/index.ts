import express from 'express';
import talkQnaApi from './talk/talkQnaApi';
import talkFreeApi from './talk/talkFreeApi';
import weatherApi from './api/weatherApi';

const router = express.Router();

// ----- Import the talk_qna routes -----
router.use('/talk/talk_qna', talkQnaApi);
// ----- Import the talk_free routes -----
router.use('/talk/talk_free', talkFreeApi);
// ----- Import the api routes -----
router.use('/weather', weatherApi);

export default router;