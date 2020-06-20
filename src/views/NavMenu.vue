<template>
  <div id="div1">
    <el-row>
      <el-col :span="4"
        >
        <div class="grid-content bg-purple">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
               background-color="rgba(0,0,0,0)"
               
            
              text-color="#303133"
              active-text-color="#fff"
              router
              unique-opened
            >
              <!-- background-color="#fff" -->
              <el-col :span="24"  style="height:750px"
                ><div
                  style="line-height:80px;  text-align:center ;"
                  class="grid-content bg-purple-dark bg-blue"
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
        <router-view style="margin:10px;"></router-view
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "navMenu",
  data: function() {
    return {
      routeList: JSON.parse(sessionStorage.getItem("nav")),
      editableTabsValue: "1",
      editableTabs:
        // :window.sessionStorage.getItem("editableTabs")?window.sessionStorage.getItem("editableTabs")
        [
          {
            title: "首页",
            path: "/home/FlowRecord",
            name: "1",
            content: "Tab 1 content"
          }
        ],
      tabIndex: 1,
      editableTabsList: []
    };
  },
  computed: {
    ...mapState([""]),
    ...mapMutations(["usermsg", "seteditableTabs", "seteditableTabsValue"])
  },

  created() {
    this.editableTabs = sessionStorage.getItem("editableTabs")
      ? JSON.parse(sessionStorage.getItem("editableTabs"))
      : [
          {
            title: "首页",
            path: "/home/FlowRecord",
            name: "1",
            content: "Tab 1 content"
          }
        ];
    this.tabIndex = sessionStorage.getItem("tabIndex")
      ? parseInt(sessionStorage.getItem("tabIndex"))
      : 1;
    this.editableTabsValue = sessionStorage.getItem("editableTabsValue")
      ? JSON.parse(sessionStorage.getItem("editableTabsValue"))
      : "1";

    console.log(this.tabIndex);
  },
  mounted() {
    window.addEventListener("beforeunload", e => this.test(e));
  },
  destroyed() {
    window.removeEventListener("beforeunload", e => this.test(e));
  },

  methods: {
    test(e) {
      console.log("刷新或关闭" + e);
      this.$store.commit("seteditableTabs", this.editableTabs);
      console.log(this.editableTabs);
      this.$store.commit("settabIndex", this.tabIndex);
      this.$store.commit("seteditableTabsValue", this.editableTabsValue);

      // ...
    },
    console() {
      console.log(this.editableTabs);
    },
    geteditableTabsList() {
      // this.editableTabs=JSON.parse(window.sessionStorage.getItem("editableTabs"))
      this.editableTabsList.path(
        JSON.parse(window.sessionStorage.getItem("editableTabs"))
      );
      console.log(this.editableTabsList);
    },
    geteditableTabs() {
      if (this.editableTabs.length != 1) {
        this.editableTabs = this.editableTabsS;
        for (var key in this.editableTabsS) {
          this.editableTabs[key] = this.editableTabsS[key];
        }
        console.log("加载中");
        console.log(this.editableTabsS);
        console.log(this.editableTabs);
      }
    },
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
/* .bg-blue{
  background-color: #fff;
} */
.el-menu-vertical-demo {
  overflow: hidden;
}
#div1{
  height: 100%;
  overflow: auto;
 
}
#div1::-webkit-scrollbar{width:0};
</style>
