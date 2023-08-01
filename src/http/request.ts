import axios from 'axios';
import { ElMessage } from 'element-plus';

const token = window.localStorage.getItem('token');

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:8970/'
      : 'http://124.71.190.15:8970/', // url = base url + request url
  timeout: 30000, // request timeout
  headers: {
    // 设置后端需要的传参类型
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});
// 请求拦截
service.interceptors.request.use(
  (config: any) => {
    if (token !== null) {
      config.headers['crane-token'] = token;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    if (res.code !== 1 || res.code !== 200) {
      return response.data;
    }
    ElMessage.error(res.msg);

    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default service;
