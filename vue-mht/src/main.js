// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store/main";
import router from "./router";

// 引入elementui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入Vuex_store

Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
