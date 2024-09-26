import api from 'services/api';

// totalPage cnt
export const getFreeTalkTotalCnt = async () => {
  return await api.get('/api/talk/talk_free/total_cnt');
}

// freetalk 데이터 가져오기
export const fetchFreeTalkData = async (page) => {
  // return await api.get('/api/talk/talk_free');
  return await api.get(`/api/talk/talk_free/data?page=${page}`);
};

// freetalk 게시글 저장
export const postFreeTalkData = async (data) => {
  console.log('postFreeTalkData:', data);

  return await api.post('/api/talk/talk_free/save', data);
};

// freetalk 게시글 삭제
export const deleteFreeTalkDataApi = async (postId) => {
  return await api.post('/api/talk/talk_free/delete', { postId });
};

// freetalk 게시글 수정
export const editFreeTalkDataApi = async (postId, content) => {
  return await api.post('/api/talk/talk_free/update', { postId, content });
};

