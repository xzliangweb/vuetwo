// 导入插件
import axios from "axios";
//  创建使用的 插件 对象
const MyHttp = {};
// vue的创建必须有有一个公共的install 方法
// 第二种写法注册公共的使用箭头函数
MyHttp.install = Vue => {
  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
  Vue.prototype.$http = axios;
};

// MyHttp.install = function(Vue) {
//   axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
//   Vue.prototype.$http = axios;
// };

// 把数据导出
export default MyHttp;
