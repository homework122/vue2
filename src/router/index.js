import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/Login" }, // 重定向
  { path: "/Login", component: () => import("../views/Login") }, // 登录路由

  // 页面首页
  {
    path: "/home",
    component: () => import("../views/home"),
    redirect: "/home/FlowRecord",
    children: [
      {
        path: "/home/FlowRecord",
        component: () => import("../views/FlowRecord")
      },
      {
        path: "/home/Refund",
        component: () => import("../views/Refund")
      },
      {
        path: "/home/RefundDetail",
        name: "/home/RefundDetail",
        component: () => import("../views/RefundDetail")
      },
      // 分类
      {
        path: "/home/classification",
        component: () => import("../views/classification")
      },
      //  圈子管理
      {
        path: "/home/circle",
        component: () => import("../views/circle")
      },
      // 商品管理
      {
        path: "/home/specifications",
        component: () => import("../views/specifications")
      },
      // 快速发帖
      {
        path: "/home/Posting",
        component: () => import("../views/Posting")
      },
      //专题活动进行中
      {
        path: "/home/special",
        component: () => import("../views/special_List"),
        redirect: "/home/special/specialConduct",
        children: [
          {
            path: "/home/special/specialConduct",
            component: () => import("../views/special_conduct.vue")
          },
          {
            path: "/home/special/specialNot",
            component: () => import("../views/special_Not")
          },
          {
            path: "/home/special/specialEnd",
            component: () => import("../views/special_End")
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
