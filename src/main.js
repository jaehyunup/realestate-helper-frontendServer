import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import store from './store';
import App from './App.vue';
import router from './router';
import '@/js/fontAwesomeIcon.js';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');
Vue.prototype.$socket = socket;
Vue.config.productionTip = false;
Vue.use(socket);
window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
