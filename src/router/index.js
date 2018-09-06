import Vue from 'vue';
import Router from 'vue-router';

//  @是src目录在build 的配置文件中配置的
//  登录的路由就配置好了
import Login from '@/views/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {name: 'login', path: '/login', component: Login}
  ]
});
