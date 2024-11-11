// services/api.js
import axios from 'axios';

const api = axios.create({
  // baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
	baseURL: 'http://130.162.150.21:5000',
});

export const checkServerStatus = async () => {
  return await api.get('/status');
};

export default api;