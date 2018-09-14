// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// 导入element ui插件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/index.css";
// 导入axios
import MyHttp from "@/plugins/MyHttp";
// 导入时间过滤器
import moment from "moment";
// 过滤器格式化日期字符串
Vue.filter("fmtDate", (value, fmtStr) => {
  return moment(value).format(fmtStr);
});

// 注册 MyHttp 封装的 axios
Vue.use(MyHttp);

// 注册插件ElementUi
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
