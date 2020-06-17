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
                    v-if="item.hasOwnProperty('childen')"
                  >
                    <template slot="title">

                      <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item-group
                      v-for="ch_item in item.childen"
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
export default {
  name: "navMenu",
  data: function() {
    return {
      routeList: [
        // 首页
        {
          title: "首页",
          name: "index",
          path: "/home/FlowRecord"
        },
        // 直营电商
        {
          title: "直营电商",
          name: "zhiy",
          path: "/zhiy",
          childen: [
            {
              title: "分类管理",
              name: "classification",
              path: "/home/classification"
            },
            {
              title: "商品管理",
              name: "goods",
              path: "/home/goods"
            },
            {
              title: "配送管理",
              name: "peis",
              path: "/peis"
            },
            {
              title: "订单管理",
              name: "dingdan",
              path: "/home/order"
            }
          ]
        },
        // 客服管理
        {
          title: "客服管理",
          name: "ke",
          path: "/ke",
          childen: [
            {
              title: "退款",
              name: "tuik",
              path: "/home/Refund"
            }
          ]
        },

        // 社区
        {
          title: "社区管理",
          name: "shequ",
          path: "/shequ",
          childen: [
            // {
            //   title: "快速发帖",
            //   name: "Posting",
            //   path: "/home/Posting"
            // },
            {
              title: "圈子管理",
              name: "quanz",
              path: "/home/circle"
            },
            {
              title: "帖子管理",
              name: "tiez",
              path: "/home/Tiezguanli"
            },
            {
              title: "用户列表",
              name: "user",
              path: "/home/userList"
            }
          ]
        },
        // 活动
        {
          title: "专题活动",
          name: "zhuant",
          path: "/zhuant",
          childen: [
            {
              title: "创建专题",
              name: "create",
              path: "/create"
            },
            {
              title: "专题管理",
              name: "special",
              path: "/home/special"
            }
          ]
        },
        // 优惠券
        {
          title: "卡券中心",
          name: "kaquan",
          path: "/kaquan",
          childen: [
            {
              title: "发布优惠券",
              name: "release",
              path: "/home/release"
            },
            {
              title: "优惠券管理",
              name: "kaguanli",
              path: "/home/kaguanli"
            }
          ]
        },
        {
          title: "广告管理",
          name: "ad",
          path: "/ad",
          childen: [
            {
              title: "投放广告",
              name: "touf",
              path: "/touf"
            },
            {
              title: "广告管理",
              name: "adguanli",
              path: "/adguanli"
            }
          ]
        },
        // 系统
        {
          title: "系统管理",
          name: "xi",
          path: "/xi",
          childen: [
            {
              title: "管理设置",
              name: "guanl",
              path: "/home/admin-set"
            },
            {
              title: "通知管理",
              name: "tongzhi",
              path: "/home/msg-set"
            },
            {
              title: "业务区域设置",
              name: "yewu",
              path: "/home/service"
            },
            {
              title: "配送管理",
              name: "peis",
              path: "/home/s"
            }
          ]
        }
      ],
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
  }
};
</script>

<style scoped>
.el-menu-vertical-demo {
  overflow: hidden;
}
</style>
