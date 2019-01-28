import axios from 'axios';

const axiosConfig = {
  withCredentials: true, // 跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
  timeout: 10 * 1000 // 10秒钟超时
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

/**
 * 服务器端 axios 方法
 * @param {object} req HTTP 请求
 * @return {function} 返回 Axios 实例的方法
 */
export const serverInstance = ({ req }) => {
  // 服务器端渲染时会传 req
  if (req) {
    instance.defaults.baseURL = `${req.protocol}://${req.headers.host}`;
    instance.defaults.headers = {
      ...req.headers,
      'X-Real-IP': (req.ip || '').split(',')[0]
    };
  }

  return instance;
};
