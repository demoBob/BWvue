// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import {UrlSearch} from './assets/js/Geturl'
import '@/assets/font/font.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//注意：echarts3.0以后已经不包含地图文件了，需要手动引入china.js文件
import 'echarts/map/js/china'

//将echarts绑定到vue的原型上
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

let Request = new UrlSearch();
Vue.prototype.$Request=Request;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
