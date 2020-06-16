import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const routes = [
  // { path: "/", redirect: "/Login" }, // 重定向
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
        component: () => import("../views/goods"),
        redirect: '/home/goods/chushouzhong',
        children:[
          {// 出售中
            path: '/home/goods/chushouzhong',
            component: () => import("../views/chushouzhong"),
          },
          {// 下架
            path: '/home/goods/xiajia',
            component: () => import("../views/xiajia"),
          },
        ]
      },
      // 订单管理
      {
        path: "order",
        component: () => import("../views/order"),
        redirect: '/home/order/jinsanyue',
        children: [
          {// 近三月
            path: '/home/order/jinsanyue',
            component: () => import("../views/jinsanyue"),
          },
          {// 等买家付款
            path: 'dengfukuan',
            component: () => import("../views/dengfukuan"),
          },
          {// 买家已付款
            path: 'yifukuan',
            component: () => import("../views/yifukuan"),
          },
          {// 等买家收货
            path: 'dengshouhuo',
            component: () => import("../views/dengshouhuo"),
          },
          {// 退款中
            path: 'tuikuanzhong',
            component: () => import("../views/tuikuanzhong"),
          },
          {// 交易成功
            path: 'jiaoyichenggong',
            component: () => import("../views/jiaoyichenggong"),
          },
          {// 交易关闭
            path: 'jiaoyiguanbi',
            component: () => import("../views/jiaoyiguanbi"),
          },
          {// 三月前订单
            path: 'sanyueqian',
            component: () => import("../views/sanyueqian"),
          },
          {// 订单
            path: 'dingdanxiangqing',
            name:'/home/order/dingdanxiangqing',
            component: () => import("../views/dingdanxiangqing"),

          }
        ]
      },


      // 卡券管理
      {
        path: "kaguanli",
        component: () => import("../views/kaguanli")
      },
      // 发布优惠券
      {
        path: "release",
        component: () => import("../views/release"),
        redirect: "/home/release/GeneralTicket",
        children: [
          // 这个是发布优惠券**通用券
          {
            path: "GeneralTicket",
            component: () => import("../views/GeneralTicket")
          },
          // 这个是发布优惠券**品类券
          {
            path: "CategoryTicket",
            component: () => import("../views/CategoryTicket")
          },
          // 这个是发布优惠券**运费券
          {
            path: "FreightTicket",
            component: () => import("../views/FreightTicket")
          },
          // 这个是发布优惠券**单品券
          {
            path: "SingleTickrt",
            component: () => import("../views/SingleTickrt")
          }
        ]
      },
      /*帖子管理*/

      // 快速发帖
      {
        path: "/home/Posting",
        component: () => import("../views/Posting")
      },
      // 圈子管理
      {
        path: "/home/circle",
        component: () => import("../views/circle")
      },
      // 帖子管理
      {
        path: "/home/Tiezguanli",
        component: () => import("../views/Tiezguanli")
      },
      {
        path: "/home/Tiezguanli/:id",
        component: () => import("../views/PostDetails")
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
        path: "admin-set",
        component: () => import("../views/admin/admin-set")
      },
      {
        // 、通知设置
        path: "msg-set",
        component: () => import("../views/admin/msg-set"),
        redirect: "/home/msg-set/msgShow",
        children: [
          {
            path: "msgShow",
            component: () => import("../views/admin/msgShow")
          },
          {
            path: "msg-new",
            component: () => import("../views/admin/msg-new")
          }
        ]
      },
      {
        // 业务区域设置
        path: "service",
        component: () => import("../views/admin/service"),
        redirect: "/home/service/s-list",
        children: [
          {
            path: "s-list",
            component: () => import("../views/admin/s-list")
          },
          {
            path: "s-new",
            component: () => import("../views/admin/s-new")
          }
        ]
      },
      {
        path: "s",
        component: () => import("../views/admin/s")
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// router.beforeEach((to,from,next)=>{
//   if(to.path==='/Login') return next();
//   const  token = window.sessionStorage.getItem("token")
//   if(!token) return next('/Login')
//   next()
//   if (to.path === '/Login') {
//     next()
//   } else {
//       const tokenStr = window.sessionStorage.getItem('token')
//       if (!tokenStr) {
//         next('/Login')
//       } else {
//         next()
//       }
//     }
// })


export default router;
