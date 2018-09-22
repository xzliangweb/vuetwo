// 导入插件
import axios from "axios";
//  创建使用的 插件 对象
const MyHttp = {};
// vue的创建必须有有一个公共的install 方法
// 第二种写法注册公共的使用箭头函数 这样写不ok

MyHttp.install = Vue => {
  axios.defaults.baseURL = "http://localhost:9000/api/private/v1/";

  // Add a request interceptor
  // 添加请求拦截器
  axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      // 在请求发送之前，添加请求头，如果当前请求地址是login 的时候 不给请求头加token
      if (config.url !== "login") {
        const token = sessionStorage.getItem("token");
        config.headers.Authorization = token;
      }
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  // 添加响应拦截器
  axios.interceptors.response.use(
    function(response) {
      // Do something with response data
      return response;
    },
    function(error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  Vue.prototype.$http = axios;
};
// MyHttp.install = function(Vue) {
//   axios.defaults.baseURL = "http://localhost:9000/api/private/v1/";
//   Vue.prototype.$http = axios;
// };

// 把数据导出
export default MyHttp;
