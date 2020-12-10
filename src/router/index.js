import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';
Vue.use(VueRouter);
const requireAuth = () => (to, from, next) => {
  const nextRoute = to.path;
  if (store.getters.fetchedAccessToken) return next();
  else return next('/user/login' + nextRoute);
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/regist',
    name: 'regist',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/UserRegist.vue'),
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    beforeEnter: requireAuth(),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
