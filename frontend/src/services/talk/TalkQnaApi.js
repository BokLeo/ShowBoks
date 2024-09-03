// services/talk/TalkQnaApi.js
import api from 'services/api';

export const fetchQuickTalkData = async () => {
  return await api.get('/api/talk/talk_qna');
};