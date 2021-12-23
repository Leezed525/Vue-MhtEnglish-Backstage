import Vue from "vue";
import Router from "vue-router";
import store from "../store/main";

import Login from "@/views/Login";
import Index from "@/views/Index";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      meta: {
        requireAuth: true
      },
      component: Index
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  //判断该路由是否需要登陆权限
  if (to.meta.requireAuth) {
    //通过vuex state获取当前的token是否存在
    let token = store.state.token;
    console.log(token);
    if (token === null || token === "") {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
