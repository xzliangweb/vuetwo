import Vue from "vue";
import Router from "vue-router";

//  @是src目录在build 的配置文件中配置的
//  登录的路由就配置好了
import Login from "@/views/Login.vue";
import Home from "@/views/Home";
import Users from "@/views/users/List";
import Rights from "@/views/rights/Rights";

Vue.use(Router);

export default new Router({
  // path 写什么   在url 地址栏后面（/#）就写什么
  // name 是在代码中用 js 导航的时候可以使用的一个别名   this.$router.push({name: 'login})
  // component  在当前路由下渲染那个
  routes: [
    { name: "login", path: "/login", component: Login },
    {
      name: "home",
      path: "/",
      component: Home,
      children: [
        {
          name: "users",
          path: "/users",
          component: Users
        },
        {
          name: "rights",
          path: "/rights",
          component: Rights
        }
      ]
    }
  ]
});
