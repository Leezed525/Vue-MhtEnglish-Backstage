// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

// 引入elementui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入Vuex_store
import store from "./store/main";
// 引入md5加密
import md5 from "js-md5";

//关闭生产提示
Vue.config.productionTip = false;

// 把md5放入vue的原型方便调用
Vue.prototype.$MD5 = md5;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
