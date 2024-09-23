import api from 'services/api';

// freeTalk Password check
export const checkFreeTalkPassword = async (data) => {
  return await api.post('/api/talk/talk_free/check_password', data);
};