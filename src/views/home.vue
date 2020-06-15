<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <h3>全心生活后台管理系统</h3>
              </div></el-col
            >
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-row type="flex" class="row-bg" justify="end">
                  <el-col :span="3"
                    ><div class="grid-content bg-purple-light"></div
                  ></el-col>
                  <el-col :span="3"
                    ><div class="grid-content bg-purple">
                      <img class="headerImg" src="../assets/logo.png" /></div
                  ></el-col>

                  <el-col :span="3"
                    ><div class="grid-content bg-purple">
                      <el-popover placement="right" width="400" trigger="click">
                        <p>修改密码</p>
                        <p>退出</p>
                        <el-button slot="reference">xxx</el-button>
                      </el-popover>
                    </div></el-col
                  >
                </el-row>
              </div></el-col
            >
          </el-row>
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <NavMenu></NavMenu></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import NavMenu from "./NavMenu.vue";
export default {
  name: "",
  props: [],
  components: {
    NavMenu
  },

  data: function() {
    return {};
  }
};
</script>

<style scoped>
.headerImg {
  width: 45px;
  height: 45px;
  border-radius: 100%;
}
</style>
