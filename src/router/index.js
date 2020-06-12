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
        path: "FlowRecord",
        component: () => import("../views/FlowRecord")
      },
      {
        path: "Refund",
        component: () => import("../views/Refund")
      },
      {
        path: "RefundDetail",
        name: "/home/RefundDetail",
        component: () => import("../views/RefundDetail")
      },
      // 分类
      {
        path: "classification",
        component: () => import("../views/classification")
      },
      //  圈子管理
      {
        path: "circle",
        component: () => import("../views/circle")
      },
      // 商品管理
      {
        path: "goods",
        component: () => import("../views/goods")
      },

      // 卡券管理
      {
        path:'kaguanli',
        component: () => import("../views/kaguanli")
      },
        // 发布优惠券
      {
        path:'release',
        component: () => import("../views/release"),
        redirect:'/home/release/GeneralTicket',
        children:[
          {
            path:'GeneralTicket',
            component: () => import("../views/GeneralTicket"),
          }
        ]
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
      },
        // 系统设置
      {
        // 管理员设置
        path:'admin-set',
        component: () => import("../views/admin/admin-set"),
      },
      {
        // 、通知设置
        path:'msg-set',
        component: () => import("../views/admin/msg-set"),
        redirect:'/home/msg-set/msgShow',
        children:[
          {
            path:'msgShow',
            component: () => import("../views/admin/msgShow"),
          },
          {
            path:'msg-new',
            component: () => import("../views/admin/msg-new"),
          }
        ]
      },
      {
        // 业务区域设置
        path:'service',
        component: () => import("../views/admin/service"),
        redirect:'/home/service/s-list',
        children:[
          {
            path:'s-list',
            component: () => import("../views/admin/s-list"),
          },
          {
            path:'s-new',
            component: () => import("../views/admin/s-new"),
          }
        ]

      },
      {
        path:'s',
        component: () => import("../views/admin/s"),
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
