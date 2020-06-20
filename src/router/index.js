import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // { path: "/", redirect: "/Login" meta: { title: '登录页'},}, // 重定向
  { path: "/Login", meta: { title: '登录页'}, component: () => import("../views/Login") }, // 登录路由

  // 页面首页
  {
    path: "/home", meta: { title: '首页页'},
    component: () => import("../views/home"),
    redirect: "/home/FlowRecord",
    children: [
      {
        path: "FlowRecord", meta: { title: '首页'},
        component: () => import("../views/FlowRecord")
      },
      {
        path: "Refund",meta: { title: '退款管理'},
        component: () => import("../views/Refund")
      },
      {
        path: "RefundDetail",
        name: "/home/RefundDetail",meta: { title: '退款详情'},
        component: () => import("../views/RefundDetail")
      },
      // 分类
      {
        path: "classification",meta: { title: '分类管理'},
        component: () => import("../views/classification")
      },
      // 商品管理
      {
        path: "goods",meta: { title: '商品管理'},
        component: () => import("../views/goods"),
        redirect: "/home/goods/chushouzhong",
        children: [
          {
            // 出售中
            path: "/home/goods/chushouzhong",meta: { title: '出售中'},
            component: () => import("../views/chushouzhong")
          },
          {
            // 下架
            path: "/home/goods/xiajia",meta: { title: '下架'},
            component: () => import("../views/xiajia")
          }
        ]
      },
      //配送管理
      {
        path: "DeliveryFees",meta: { title: '配送管理'},
        component: () => import("../views/DeliveryFees")
      },

      // 订单管理
      {
        path: "order",meta: { title: '订单管理'},
        component: () => import("../views/order"),
        redirect: "/home/order/jinsanyue",
        children: [
          {
            // 近三月
            path: "/home/order/jinsanyue",meta: { title: '近三月订单'},
            component: () => import("../views/jinsanyue")
          },
          {
            // 等买家付款
            path: "dengfukuan",meta: { title: '等买家付款'},
            component: () => import("../views/dengfukuan")
          },
          {
            // 买家已付款
            path: "yifukuan",meta: { title: '买家已付款'},
            component: () => import("../views/yifukuan")
          },
          {
            // 等买家收货
            path: "dengshouhuo",meta: { title: '等买家收货'},
            component: () => import("../views/dengshouhuo")
          },
          {
            // 退款中
            path: "tuikuanzhong",meta: { title: '退款中'},
            component: () => import("../views/tuikuanzhong")
          },
          {
            // 交易成功
            path: "jiaoyichenggong",meta: { title: '交易成功'},
            component: () => import("../views/jiaoyichenggong")
          },
          {
            // 交易关闭
            path: "jiaoyiguanbi",meta: { title: '交易关闭'},
            component: () => import("../views/jiaoyiguanbi")
          },
          {
            // 三月前订单
            path: "sanyueqian",meta: { title: '三月前订单'},
            component: () => import("../views/sanyueqian")
          }
        ]
      },
      {
        // 订单
        path: "/home/orderDetails",
        name: "/home/orderDetails",meta: { title: '订单管理'},
        component: () => import("../views/orderDetails")
      },

      //广告管理
      {
        path: "adguanli",
        component: () => import("../views/adguanli")
      },
      //投放广告
      {
        path: "touf",meta: { title: '投放广告'},
        component: () => import("../views/touf")
      },
      //广告列表
      {
        path: "adlist",meta: { title: '广告列表'},
        component: () => import("../views/adlist")
      },
      //广告位列表
      {
        path: "adweilist",meta: { title: '广告位列表'},
        component: () => import("../views/adweilist")
      },

      //广告管理
      {
        path: "adguanli",meta: { title: '广告管理'},
        component: () => import("../views/adguanli")
      },
      //投放广告
      {
        path: "touf",meta: { title: '投放广告'},
        component: () => import("../views/touf")
      },

      // 卡券管理
      // {
      //   path:'kaguanli',
      //   component: () => import("../views/kaguanli")
      // },

      {
        path: "quanguanli",meta: { title: '优惠券管理'},
        component: () => import("../views/quanguanli"),
        redirect: "/home/quanguanli/SendTicket",
        children: [
          // 这个是优惠券管理**正在派券
          {
            path: "SendTicket",meta: { title: '正在排券中'},
            component: () => import("../views/SendTicket")
          },
          // 这个是优惠券管理**已结束
          {
            path: "OverTicket",meta: { title: '已结束'},
            component: () => import("../views/OverTicket")
          },

          // 这个是优惠券管理**未开始
          {
            path: "EndTicket",meta: { title: '未开始'},
            component: () => import("../views/EndTicket")
          }
        ]
      },
      // 发布优惠券

      // 卡券管理
      {
        path: "kaguanli",meta: { title: '卡券管理'},
        component: () => import("../views/kaguanli")
      },
      // 发布优惠券

      {
        path: "release",meta: { title: '发布优惠券'},
        component: () => import("../views/release"),
        redirect: "/home/release/GeneralTicket",
        children: [
          // 这个是发布优惠券**通用券
          {
            path: "GeneralTicket",meta: { title: '通用券'},
            component: () => import("../views/GeneralTicket")
          },
          // 这个是发布优惠券**品类券
          {
            path: "CategoryTicket",meta: { title: '品类券'},
            component: () => import("../views/CategoryTicket")
          },
          // 这个是发布优惠券**运费券
          {
            path: "FreightTicket",meta: { title: '运费券'},
            component: () => import("../views/FreightTicket")
          },
          // 这个是发布优惠券**单品券
          {
            path: "SingleTickrt",meta: { title: '单品券'},
            component: () => import("../views/SingleTickrt")
          }
        ]
      },
      /*帖子管理*/
      // 快速发帖
      {
        path: "/home/Posting",meta: { title: '快速发帖'},
        component: () => import("../views/Posting")
      },
      // 圈子管理
      {
        path: "/home/circle",meta: { title: '圈子管理'},
        component: () => import("../views/circle")
      },
      // 帖子管理
      {
        path: "/home/Tiezguanli",meta: { title: '帖子管理'},
        component: () => import("../views/Tiezguanli")
      },
      // // 帖子详情
      // {
      //   path: "/home/Tiezguanli/:id",
      //   component: () => import("../views/PostDetails")
      // },
      //  用户列表
      {
        path: "/home/userList",meta: { title: '用户列表'},
        component: () => import("../views/userList")
      },
      {
        path: "/home/special_create",meta: { title: '创建专题'},
        component: () => import("../views/special_create")
      },

      //专题活动进行中
      {
        path: "/home/special",meta: { title: '专题活动进行时'},
        component: () => import("../views/special_List"),
        redirect: "/home/special/specialConduct",
        children: [
          {
            path: "/home/special/specialConduct",meta: { title: '专题活动进行时'},
            component: () => import("../views/special_conduct.vue")
          },
          {
            path: "/home/special/specialNot",meta: { title: '专题活动未开始'},
            component: () => import("../views/special_Not")
          },
          {
            path: "/home/special/specialEnd",meta: { title: '专题活动已结束'},
            component: () => import("../views/special_End")
          }
        ]
      },

      // 系统设置
      {
        // 管理员设置
        path: "admin-set",meta: { title: '用户管理'},
        component: () => import("../views/admin/admin-set")
      },
      {
        // 、通知设置
        path: "msg-set",meta: { title: '通知设置'},
        component: () => import("../views/admin/msg-set"),
        redirect: "/home/msg-set/msgShow",
        children: [
          {
            path: "msgShow",meta: { title: '新订单提醒'},
            component: () => import("../views/admin/msgShow")
          },
          {
            path: "msg-new",meta: { title: '库存预警'},
            component: () => import("../views/admin/msg-new")
          }
        ]
      },
      {
        // 业务区域设置
        path: "service",meta: { title: '业务区域设置'},
        component: () => import("../views/admin/service"),
        redirect: "/home/service/s-list",
        children: [
          {
            path: "s-list",meta: { title: '已开通区域'},
            component: () => import("../views/admin/s-list")
          },
          {
            path: "s-new",meta: { title: '设置电子围栏'},
            component: () => import("../views/admin/s-new")
          }
        ]
      },
      {
        path: "s",meta: { title: '配送管理'},
        component: () => import("../views/admin/s")
      }
    ]
  },
  {
    path: "/lose",meta: { title: '登录失效'},
    component: () => import("../views/tokenLose")
  },
  {
    path: "/404",meta: { title: '404'},
    component: () => import("../views/404")
  },
  {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title == undefined?'默认标题':to.meta.title
  const role_no = window.sessionStorage.getItem("role_no");
  
  if (to.path === "/Login") return next();
  else {
    const token = window.sessionStorage.getItem("token");
    if (!token) return next("/Login");
    else {
      next();
      if (role_no == 2 && to.path == "/home/admin-set") {
        next("/404");
      } else {
        next();
      }
    }
  }
});
// router.beforeEach((to, from, next) => {
//   const  token = window.sessionStorage.getItem("token")
//   if (token) {
//     next()
//   } else {
//       if (to.path == '/login') {
//           next()
//       }
//   }
// })
// router.beforeEach((to, from, next) => {
//   if (sessionStorage.token) {
//     next();
//   } else {
//     if (to.path === "Login" ) {
//       next();
//     } else {
//       next("/Login");
//     }
//   }
// });

export default router;
