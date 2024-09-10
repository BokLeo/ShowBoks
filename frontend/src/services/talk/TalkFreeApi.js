import api from 'services/api';

export const fetchFreeTalkData = async () => {
  return await api.get('/api/talk/talk_free');
};

// post 요청
export const postFreeTalkData = async (data) => {
  console.log('postFreeTalkData:', data);

  return await api.post('/api/talk/talk_free/save', data);
};


