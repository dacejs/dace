import axios from 'axios';

const instance = axios.create();
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  console.log('[axios config]:', config);
  return config;
}, error => Promise.reject(error));

export default instance;
