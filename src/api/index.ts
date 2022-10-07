import axios from 'axios';

const api = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { 'API-KEY': 'a3f656c8-219b-497c-b91e-7723447501cd' },
});

export default api;
