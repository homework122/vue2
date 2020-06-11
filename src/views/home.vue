<template>
  <div>
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

<style scoped></style>
