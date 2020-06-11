<template>
  <!--    圈子管理-->
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content bg-purple">
            <el-input
                    placeholder="请输入圈子"
                    v-model="search_input"
                    clearable>
            </el-input>
          </div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple">

          </div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "circle",
  props: {},

  data: function() {
    return {
      search_input:'',
    };
  }
};
</script>

<style scoped></style>
