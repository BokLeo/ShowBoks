import api from 'services/api';

export const basicFreeTalkData = async () => {
  return await api.get('/api/talk/talk_free');
}

export const fetchFreeTalkData = async (page) => {
  // return await api.get('/api/talk/talk_free');
  return await api.get(`/api/talk/talk_free/data?page=${page}`);
};

// post 요청
export const postFreeTalkData = async (data) => {
  console.log('postFreeTalkData:', data);

  return await api.post('/api/talk/talk_free/save', data);
};


