import Vue from "vue";
import Router from "vue-router";
import store from "../store/main";

import Login from "@/views/Login";
import Index from "@/views/Index";
import Main from "@/views/Main";
import AdminUser from "@/views/AdminUser";
import AdminRole from "@/views/AdminRole";
import AdminPermission from "@/views/AdminPermission";
import Word from "@/views/Word";
import Log from "@/views/Log";
import Notice from "@/views/AdminNotice";
import User from "@/views/User";


Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  mode:"hash",
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
      redirect: "Main",
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: "main",
          name: "Main",
          component: Main,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "adminPermission",
          name: "AdminPermission",
          component: AdminPermission,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "adminRole",
          name: "AdminRole",
          component: AdminRole,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "adminUser",
          name: "AdminUser",
          component: AdminUser,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "log",
          name: "Log",
          component: Log,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "notice",
          name: "Notice",
          component: Notice,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "user",
          name: "User",
          component: User,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "word",
          name: "Word",
          component: Word,
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  //???????????????????????????????????????
  if (to.meta.requireAuth) {
    //??????vuex state???????????????token????????????
    let token = store.state.token;
    if (token === null || token === "") {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // ??????????????????path????????????????????????????????????????????????
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
