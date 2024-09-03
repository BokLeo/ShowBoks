// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

export const checkServerStatus = async () => {
  return await api.get('/status');  
};

export default api;