<template>
  <div>
    <el-row>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#EEEEEE"
              text-color="#737373"
              active-text-color="#ffd04b"
              router
              unique-opened
            >
              <el-col :span="24"
                ><div
                  class="grid-content bg-purple-dark"
                  v-for="item in routeList"
                  :key="item.path"
                >
                  <el-submenu
                    :index="item.path"
                    :key="item.path"
                    v-if="item.hasOwnProperty('menuChilds')"
                  >
                    <template slot="title">
                      <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item-group
                      v-for="ch_item in item.menuChilds"
                      :key="ch_item.path"
                    >
                      <el-menu-item
                        :index="ch_item.path"
                        @click="addTab(ch_item.path, ch_item.title)"
                        >{{ ch_item.title }}</el-menu-item
                      >
                    </el-menu-item-group>
                  </el-submenu>

                  <el-menu-item
                    :index="item.path"
                    v-else
                    @click="addTab(item.path, item.title)"
                  >
                    <span slot="title">{{ item.title }}</span>
                  </el-menu-item>
                </div></el-col
              >
            </el-menu>
          </el-col>
        </div>
      </el-col>
      <el-col :span="20"
        ><div class="grid-content bg-purple-light">
          <el-tabs
            v-model="editableTabsValue"
            @tab-click="handleClick"
            type="card"
            closable
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="index"
              :label="item.title"
              :name="item.name"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
        <router-view></router-view
      ></el-col>
    </el-row>
  </div>
</template>

<script>
<<<<<<< HEAD
var m = [
  {
    menuId: 1,
    title: "首页",
    path: "/home/FlowRecord",
    pathname: "home",
    componentPath: "../views/FlowRecodr",
    menuImgClass: "el-icon-dish",
    menuState: "0"
  },
  {
    menuId: 2,
    title: "直营电商",
    path: "/zhiy",
    pathname: "zhiy",
    componentPath: "",
    menuImgClass: "el-icon-dish",
    menuState: "0",
    menuChilds: [
      {
        menuId: 21,
        title: "分类管理",
        path: "/home/classification",
        pathname: "classification",
        componentPath: "../views/classification",
        menuImgClass: "",
        menuState: "0",
        menuChilds: []
      },
      {
        menuId: 22,
        title: "商品管理",
        path: "/home/goods",
        pathname: "goods",
        componentPath: "../views/goods",
        menuImgClass: "",
        menuState: "0",
        menuChilds: [
          {
            menuId: 221,
            title: "出售中",
            path: "/home/goods/chushouzhong",
            pathname: "chushouzhong",
            componentPath: "../views/chushouzhong",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 222,
            title: "下架",
            path: "/home/goods/xiajia",
            pathname: "xiajia",
            componentPath: "../views/xiajia",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          }
        ]
      },
      {
        menuId: 23,
        title: "配送管理",
        path: "/home/DeliveryFees",
        pathname: "DeliveryFees",
        componentPath: "../views/DeliveryFees",
        menuImgClass: "",
        menuState: "0",
        menuChilds: []
      },
      {
        menuId: 24,
        title: "订单管理",
        path: "/home/order/jinsanyue",
        pathname: "order",
        componentPath: "../views/order",
        menuImgClass: "",
        menuState: "0",
        menuChilds: [
          {
            menuId: 241,
            title: "近三月",
            path: "/home/order/jinsanyue",
            pathname: "jinsanyue",
            componentPath: "../views/jinsanyue",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 242,
            title: "等待买家付款",
            path: "/home/dengfukuan",
            pathname: "dengfukuan",
            componentPath: "../views/dengfukuan",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 243,
            title: "买家已付款",
            path: "/home/yifukuan",
            pathname: "yifukuan",
            componentPath: "../views/yifukuan",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 244,
            title: "等待买家收货",
            path: "dengshouhuo",
            pathname: "dengshouhuo",
            componentPath: "../views/dengshouhuo",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 245,
            title: "退款中",
            path: "tuikuanzhong",
            pathname: "tuikuanzhong",
            componentPath: "../views/tuikuanzhong",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 246,
            title: "交易成功",
            path: "jiaoyichenggong",
            pathname: "jiaoyichenggong",
            componentPath: "../views/jiaoyichenggong",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 247,
            title: "交易关闭",
            path: "jiaoyiguanbi",
            pathname: "jiaoyiguanbi",
            componentPath: "../views/jiaoyiguanbi",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 248,
            title: "三个月订单",
            path: "sanyueqian",
            pathname: "sanyueqian",
            componentPath: "../views/sanyueqian",
            menuImgClass: "",
            menuState: "0",
            menuChilds: []
          }
        ]
      }
    ]
  },
  {
    menuId: 3,
    title: "客服管理",
    path: "/ke",
    pathname: "ke",
    componentPath: "WasteList",
    menuImgClass: "el-icon-delete",
    menuState: "0",
    menuChilds: [
      {
        menuId: 31,
        title: "退款管理",
        path: "/home/Refund",
        pathname: "Refund",
        componentPath: "../views/Refund",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      }
    ]
  },
  {
    menuId: 4,
    title: "社区管理",
    path: "/she",
    pathname: "she",
    componentPath: "",
    menuImgClass: "el-icon-delete",
    menuState: "0",
    menuChilds: [
      {
        menuId: 41,
        title: "圈子管理",
        path: "/home/circle",
        pathname: "circle",
        componentPath: "../views/circle",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      },
      {
        menuId: 42,
        title: "帖子管理",
        path: "/home/Tiezguanli",
        pathname: "Tiezguanli",
        componentPath: "../views/Tiezguanli",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      },
      {
        menuId: 43,
        title: "用户列表",
        path: "/home/userList",
        pathname: "userList",
        componentPath: "../views/userList",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      }
    ]
  },
  {
    menuId: 5,
    title: "专题管理",
    path: "/zhuan",
    pathname: "zhuan",
    componentPath: "/",
    menuImgClass: "el-icon-delete",
    menuState: "0",
    menuChilds: [
      {
        menuId: 51,
        title: "创建专题",
        path: "/home/special_create",
        pathname: "special_create",
        componentPath: "../views/special_create",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      },
      {
        menuId: 52,
        title: "专题管理",
        path: "/home/special",
        pathname: "special",
        componentPath: "../views/special",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: [
          {
            menuId: 521,
            title: "进行中",
            path: "/home/special/specialConduc",
            pathname: "specialConduc",
            componentPath: "../views/special_conduct",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 522,
            title: "已进行",
            path: "/home/special/specialNot",
            pathname: "specialNot",
            componentPath: "../views/special_Not",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 523,
            title: "已结算",
            path: "/home/specialEnd",
            pathname: "specialEnd",
            componentPath: "../views/special_End",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          }
        ]
      }
    ]
  },
  {
    menuId: 6,
    title: "卡券中心",
    path: "/quan",
    pathname: "quan",
    componentPath: "/",
    menuImgClass: "el-icon-delete",
    menuState: "0",
    menuChilds: [
      {
        menuId: 61,
        title: "发布优惠券",
        path: "/home/release",
        pathname: "special_create",
        componentPath: "../views/special_create",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: [
          {
            menuId: 611,
            title: "通用券",
            path: "/home/release/GeneralTicket",
            pathname: "GeneralTicket",
            componentPath: "../views/GeneralTicket",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 612,
            title: "单品券",
            path: "/home/release/CategoryTicket",
            pathname: "CategoryTicket",
            componentPath: "../views/CategoryTicket",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 613,
            title: "运费券",
            path: "/home/release/FreightTicket",
            pathname: "FreightTicket",
            componentPath: "../views/FreightTicket",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 614,
            title: "品类券",
            path: "/home/release/SingleTickrt",
            pathname: "SingleTickrt",
            componentPath: "../views/SingleTickrt",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          }
        ]
      },
      {
        menuId: 62,
        title: "优惠券管理",
        path: "/home/kaguanli",
        pathname: "kaguanli",
        componentPath: "../views/kaguanli",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      }
    ]
  },
  {
    menuId: 7,
    title: "广告管理",
    path: "/ad",
    pathname: "ad",
    componentPath: "/",
    menuImgClass: "el-icon-delete",
    menuState: "0",
    menuChilds: [
      {
        menuId: 71,
        title: "广告管理",
        path: "/home/adguanli",
        pathname: "adguanli",
        componentPath: "../views/adguanli",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      },
      {
        menuId: 72,
        title: "投放广告",
        path: "/home/touf",
        pathname: "touf",
        componentPath: "../views/touf",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      },
      {
        menuId: 73,
        title: "广告列表",
        path: "/home/adlist",
        pathname: "adlist",
        componentPath: "../views/adlist",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      },
      {
        menuId: 74,
        title: "广告位列表",
        path: "/home/adweilist",
        pathname: "adweilist",
        componentPath: "../views/adweilist",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      }
    ]
  },
  {
    menuId: 8,
    title: "系统设置",
    path: "/",
    pathname: "",
    componentPath: "/",
    menuImgClass: "el-icon-delete",
    menuState: "0",
    menuChilds: [
      {
        menuId: 81,
        title: "用户管理",
        path: "/home/admin-set",
        pathname: "admin-set",
        componentPath: "../views/admin/admin-set",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      },
      {
        menuId: 82,
        title: "通知管理",
        path: "/home/msg-set/msgShow",
        pathname: "msg-set",
        componentPath: "../views/admin/msg-set",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: [
          {
            menuId: 821,
            title: "新订单预警",
            path: "/msgShow",
            pathname: "msgShow",
            componentPath: "../views/admin/msgShow",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 822,
            title: "库存预警",
            path: "/msg-new",
            pathname: "msg-new",
            componentPath: "../views/admin/msg-new",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          }
        ]
      },
      {
        menuId: 83,
        title: "业务区域设置",
        path: "/home/service/s-list",
        pathname: "service",
        componentPath: "../views/admin/service",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: [
          {
            menuId: 831,
            title: "新订单预警",
            path: "/home/service/s-list",
            pathname: "s-list",
            componentPath: "../views/admin/s-list",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          },
          {
            menuId: 832,
            title: "库存预警",
            path: "/home/service/s-new",
            pathname: "s-new",
            componentPath: "../views/admin/s-new",
            menuImgClass: "el-icon-delete",
            menuState: "0",
            menuChilds: []
          }
        ]
      },
      {
        menuId: 84,
        title: "配送管理",
        path: "/home/s",
        pathname: "s",
        componentPath: "../views/admin/s",
        menuImgClass: "el-icon-delete",
        menuState: "0",
        menuChilds: []
      }
    ]
  }
];
=======
// var m = [
//   {
//     menuId: 1,
//     title: "首页",
//     path: "/home/FlowRecord",
//     pathname: "home",
//     componentPath: "../views/FlowRecodr",
//     menuImgClass: "el-icon-dish",
//     menuState: "0"
//   },
//   {
//     menuId: 2,
//     title: "直营电商",
//     path: "/zhiy",
//     pathname: "zhiy",
//     componentPath: "",
//     menuImgClass: "el-icon-dish",
//     menuState: "0",
//     menuChilds: [
//       {
//         menuId: 21,
//         title: "分类管理",
//         path: "/home/classification",
//         pathname: "classification",
//         componentPath: "../views/classification",
//         menuImgClass: "",
//         menuState: "0",
//         menuChilds: []
//       },
//       {
//         menuId: 22,
//         title: "商品管理",
//         path: "/home/goods",
//         pathname: "goods",
//         componentPath: "../views/goods",
//         menuImgClass: "",
//         menuState: "0",
//         menuChilds: [
//           {
//             menuId: 221,
//             title: "出售中",
//             path: "/home/goods/chushouzhong",
//             pathname: "chushouzhong",
//             componentPath: "../views/chushouzhong",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 222,
//             title: "下架",
//             path: "/home/goods/xiajia",
//             pathname: "xiajia",
//             componentPath: "../views/xiajia",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           }
//         ]
//       },
//       {
//         menuId: 23,
//         title: "配送管理",
//         path: "/home/DeliveryFees",
//         pathname: "DeliveryFees",
//         componentPath: "../views/DeliveryFees",
//         menuImgClass: "",
//         menuState: "0",
//         menuChilds: []
//       },
//       {
//         menuId: 24,
//         title: "订单管理",
//         path: "/home/order/jinsanyue",
//         pathname: "order",
//         componentPath: "../views/order",
//         menuImgClass: "",
//         menuState: "0",
//         menuChilds: [
//           {
//             menuId: 241,
//             title: "近三月",
//             path: "/home/order/jinsanyue",
//             pathname: "jinsanyue",
//             componentPath: "../views/jinsanyue",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 242,
//             title: "等待买家付款",
//             path: "/home/dengfukuan",
//             pathname: "dengfukuan",
//             componentPath: "../views/dengfukuan",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 243,
//             title: "买家已付款",
//             path: "/home/yifukuan",
//             pathname: "yifukuan",
//             componentPath: "../views/yifukuan",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 244,
//             title: "等待买家收货",
//             path: "dengshouhuo",
//             pathname: "dengshouhuo",
//             componentPath: "../views/dengshouhuo",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 245,
//             title: "退款中",
//             path: "tuikuanzhong",
//             pathname: "tuikuanzhong",
//             componentPath: "../views/tuikuanzhong",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 246,
//             title: "交易成功",
//             path: "jiaoyichenggong",
//             pathname: "jiaoyichenggong",
//             componentPath: "../views/jiaoyichenggong",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 247,
//             title: "交易关闭",
//             path: "jiaoyiguanbi",
//             pathname: "jiaoyiguanbi",
//             componentPath: "../views/jiaoyiguanbi",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 248,
//             title: "三个月订单",
//             path: "sanyueqian",
//             pathname: "sanyueqian",
//             componentPath: "../views/sanyueqian",
//             menuImgClass: "",
//             menuState: "0",
//             menuChilds: []
//           }
//         ]
//       }
//     ]
//   },
//   {
//     menuId: 3,
//     title: "客服管理",
//     path: "/ke",
//     pathname: "ke",
//     componentPath: "WasteList",
//     menuImgClass: "el-icon-delete",
//     menuState: "0",
//     menuChilds: [
//       {
//         menuId: 31,
//         title: "退款管理",
//         path: "/home/Refund",
//         pathname: "Refund",
//         componentPath: "../views/Refund",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       }
//     ]
//   },
//   {
//     menuId: 4,
//     title: "社区管理",
//     path: "/she",
//     pathname: "she",
//     componentPath: "",
//     menuImgClass: "el-icon-delete",
//     menuState: "0",
//     menuChilds: [
//       {
//         menuId: 41,
//         title: "圈子管理",
//         path: "/home/circle",
//         pathname: "circle",
//         componentPath: "../views/circle",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       },
//       {
//         menuId: 42,
//         title: "帖子管理",
//         path: "/home/Tiezguanli",
//         pathname: "Tiezguanli",
//         componentPath: "../views/Tiezguanli",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       },
//       {
//         menuId: 43,
//         title: "用户列表",
//         path: "/home/userList",
//         pathname: "userList",
//         componentPath: "../views/userList",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       }
//     ]
//   },
//   {
//     menuId: 5,
//     title: "专题管理",
//     path: "/zhuan",
//     pathname: "zhuan",
//     componentPath: "/",
//     menuImgClass: "el-icon-delete",
//     menuState: "0",
//     menuChilds: [
//       {
//         menuId: 51,
//         title: "创建专题",
//         path: "/home/special_create",
//         pathname: "special_create",
//         componentPath: "../views/special_create",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       },
//       {
//         menuId: 52,
//         title: "专题管理",
//         path: "/home/special",
//         pathname: "special",
//         componentPath: "../views/special",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: [
//           {
//             menuId: 521,
//             title: "进行中",
//             path: "/home/special/specialConduc",
//             pathname: "specialConduc",
//             componentPath: "../views/special_conduct",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 522,
//             title: "已进行",
//             path: "/home/special/specialNot",
//             pathname: "specialNot",
//             componentPath: "../views/special_Not",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 523,
//             title: "已结算",
//             path: "/home/specialEnd",
//             pathname: "specialEnd",
//             componentPath: "../views/special_End",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           }
//         ]
//       }
//     ]
//   },
//   {
//     menuId: 6,
//     title: "卡券中心",
//     path: "/quan",
//     pathname: "quan",
//     componentPath: "/",
//     menuImgClass: "el-icon-delete",
//     menuState: "0",
//     menuChilds: [
//       {
//         menuId: 61,
//         title: "发布优惠券",
//         path: "/home/release",
//         pathname: "special_create",
//         componentPath: "../views/special_create",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: [
//           {
//             menuId: 611,
//             title: "通用券",
//             path: "/home/release/GeneralTicket",
//             pathname: "GeneralTicket",
//             componentPath: "../views/GeneralTicket",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 612,
//             title: "单品券",
//             path: "/home/release/CategoryTicket",
//             pathname: "CategoryTicket",
//             componentPath: "../views/CategoryTicket",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 613,
//             title: "运费券",
//             path: "/home/release/FreightTicket",
//             pathname: "FreightTicket",
//             componentPath: "../views/FreightTicket",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 614,
//             title: "品类券",
//             path: "/home/release/SingleTickrt",
//             pathname: "SingleTickrt",
//             componentPath: "../views/SingleTickrt",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           }
//         ]
//       },
//       {
//         menuId: 62,
//         title: "优惠券管理",
//         path: "/home/kaguanli",
//         pathname: "kaguanli",
//         componentPath: "../views/kaguanli",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       }
//     ]
//   },
//   {
//     menuId: 7,
//     title: "广告管理",
//     path: "/ad",
//     pathname: "ad",
//     componentPath: "/",
//     menuImgClass: "el-icon-delete",
//     menuState: "0",
//     menuChilds: [
//       {
//         menuId: 71,
//         title: "广告管理",
//         path: "/home/adguanli",
//         pathname: "adguanli",
//         componentPath: "../views/adguanli",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       },
//       {
//         menuId: 72,
//         title: "投放广告",
//         path: "/home/touf",
//         pathname: "touf",
//         componentPath: "../views/touf",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       },
//       {
//         menuId: 73,
//         title: "广告列表",
//         path: "/home/adlist",
//         pathname: "adlist",
//         componentPath: "../views/adlist",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       },
//       {
//         menuId: 74,
//         title: "广告位列表",
//         path: "/home/adweilist",
//         pathname: "adweilist",
//         componentPath: "../views/adweilist",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       }
//     ]
//   },
//   {
//     menuId: 8,
//     title: "系统设置",
//     path: "/",
//     pathname: "",
//     componentPath: "/",
//     menuImgClass: "el-icon-delete",
//     menuState: "0",
//     menuChilds: [
//       {
//         menuId: 81,
//         title: "用户管理",
//         path: "/home/admin-set",
//         pathname: "admin-set",
//         componentPath: "../views/admin/admin-set",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       },
//       {
//         menuId: 82,
//         title: "通知管理",
//         path: "/home/msg-set/msgShow",
//         pathname: "msg-set",
//         componentPath: "../views/admin/msg-set",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: [
//           {
//             menuId: 821,
//             title: "新订单预警",
//             path: "/msgShow",
//             pathname: "msgShow",
//             componentPath: "../views/admin/msgShow",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 822,
//             title: "库存预警",
//             path: "/msg-new",
//             pathname: "msg-new",
//             componentPath: "../views/admin/msg-new",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           }
//         ]
//       },
//       {
//         menuId: 83,
//         title: "业务区域设置",
//         path: "/home/service/s-list",
//         pathname: "service",
//         componentPath: "../views/admin/service",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: [
//           {
//             menuId: 831,
//             title: "新订单预警",
//             path: "/home/service/s-list",
//             pathname: "s-list",
//             componentPath: "../views/admin/s-list",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           },
//           {
//             menuId: 832,
//             title: "库存预警",
//             path: "/home/service/s-new",
//             pathname: "s-new",
//             componentPath: "../views/admin/s-new",
//             menuImgClass: "el-icon-delete",
//             menuState: "0",
//             menuChilds: []
//           }
//         ]
//       },
//       {
//         menuId: 84,
//         title: "配送管理",
//         path: "/home/s",
//         pathname: "s",
//         componentPath: "../views/admin/s",
//         menuImgClass: "el-icon-delete",
//         menuState: "0",
//         menuChilds: []
//       }
//     ]
//   }
// ];





>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9

export default {
  name: "navMenu",
  data: function() {
    return {
<<<<<<< HEAD
      routeList: m,
=======
      routeList: JSON.parse(sessionStorage.getItem("nav")),
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
      // routeList: [
      //   // 首页
      //   {
      //     title: "首页",
      //     name: "index",
      //     path: "/home/FlowRecord"
      //   },
      //   // 直营电商
      //   {
      //     title: "直营电商",
      //     name: "zhiy",
      //     path: "/zhiy",
      //     menuChilds: [
      //       {
      //         title: "分类管理",
      //         name: "classification",
      //         path: "/home/classification"
      //       },
      //       {
      //         title: "商品管理",
      //         name: "goods",
      //         path: "/home/goods"
      //       },
      //       {
      //         title: "配送管理",
      //         name: "peis",
      //         path: "/peis"
      //       },
      //       {
      //         title: "订单管理",
      //         name: "dingdan",
      //         path: "/home/order"
      //       }
      //     ]
      //   },
      //   // 客服管理
      //   {
      //     title: "客服管理",
      //     name: "ke",
      //     path: "/ke",
      //     menuChilds: [
      //       {
      //         title: "退款",
      //         name: "tuik",
      //         path: "/home/Refund"
      //       }
      //     ]
      //   },
      //
      //   // 社区
      //   {
      //     title: "社区管理",
      //     name: "shequ",
      //     path: "/shequ",
      //     menuChilds: [
      //       // {
      //       //   title: "快速发帖",
      //       //   name: "Posting",
      //       //   path: "/home/Posting"
      //       // },
      //       {
      //         title: "圈子管理",
      //         name: "quanz",
      //         path: "/home/circle"
      //       },
      //       {
      //         title: "帖子管理",
      //         name: "tiez",
      //         path: "/home/Tiezguanli"
      //       },
      //       {
      //         title: "用户列表",
      //         name: "user",
      //         path: "/home/userList"
      //       }
      //     ]
      //   },
      //   // 活动
      //   {
      //     title: "专题活动",
      //     name: "zhuant",
      //     path: "/zhuant",
      //     menuChilds: [
      //       {
      //         title: "创建专题",
      //         name: "create",
      //         path: "/create"
      //       },
      //       {
      //         title: "专题管理",
      //         name: "special",
      //         path: "/home/special"
      //       }
      //     ]
      //   },
      //   // 优惠券
      //   {
      //     title: "卡券中心",
      //     name: "kaquan",
      //     path: "/kaquan",
      //     menuChilds: [
      //       {
      //         title: "发布优惠券",
      //         name: "release",
      //         path: "/home/release"
      //       },
      //       {
      //         title: "优惠券管理",
      //         name: "kaguanli",
      //         path: "/home/kaguanli"
      //       }
      //     ]
      //   },
      //   {
      //     title: "广告管理",
      //     name: "ad",
      //     path: "/ad",
      //     menuChilds: [
      //       {
      //         title: "投放广告",
      //         name: "touf",
      //         path: "/touf"
      //       },
      //       {
      //         title: "广告管理",
      //         name: "adguanli",
      //         path: "/adguanli"
      //       }
      //     ]
      //   },
      //   // 系统
      //   {
      //     title: "系统管理",
      //     name: "xi",
      //     path: "/xi",
      //     menuChilds: [
      //       {
      //         title: "管理设置",
      //         name: "guanl",
      //         path: "/home/admin-set"
      //       },
      //       {
      //         title: "通知管理",
      //         name: "tongzhi",
      //         path: "/home/msg-set"
      //       },
      //       {
      //         title: "业务区域设置",
      //         name: "yewu",
      //         path: "/home/service"
      //       },
      //       {
      //         title: "配送管理",
      //         name: "peis",
      //         path: "/home/s"
      //       }
      //     ]
      //   }
      // ],
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "首页",
          path: "/home/FlowRecord",
          name: "1",
          content: "Tab 1 content"
        }
      ],
      tabIndex: 1
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    checkPath(path) {
      for (var i = 0; i < this.editableTabs.length; i++) {
        if (this.editableTabs[i].path == path) {
          return {
            msg: true,
            obj: this.editableTabs[i]
          };
        }
      }
    },

    addTab(path, title) {
      if (this.checkPath(path)) {
        this.$router.push(path);
        this.editableTabsValue = this.checkPath(path).obj.name;
      } else {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: title,
          path: path,
          name: newTabName,
          content: newTabName
        });
        this.editableTabsValue = newTabName;

      }
    },

    removeTab(targetName) {
      if (this.editableTabs.length > 1) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.$router.push(this.editableTabs[index - 1].path);
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      } else {
        console.log("");
      }
    },
    handleClick(tab) {
      console.log(tab.index);
      this.$router.push(this.editableTabs[tab.index].path);
    }
  },



};
</script>

<style scoped>
.el-menu-vertical-demo {
  overflow: hidden;
}
</style>
