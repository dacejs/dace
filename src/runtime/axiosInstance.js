import axios from 'axios';

const axiosConfig = {
  withCredentials: true, // 跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
  timeout: 2 * 1000 // 2秒钟超时
};

const instance = axios.create(axiosConfig);

// instance.interceptors.request.use((config, b) => {
//   // Do something before request is sent
//   console.log('[b]:', b);
//   console.log('[axios config]:', config);
//   return config;
// }, error => Promise.reject(error));

/**
 * 为了方便纯浏览器端代码书写，直接导出一个 axios 实例
 */
export default instance;
