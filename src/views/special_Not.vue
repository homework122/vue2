<!-- 未进行 -->
<template>
  <div>
    <!-- 搜索框 -->
    <el-row class="SearchRow">
      <el-col :span="10"
        ><div>
          <el-input
            placeholder="输入活动名称进行搜索"
            v-model="InputSelect"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="SelectBtn"
            ></el-button>
          </el-input></div
      ></el-col>
    </el-row>
    <!-- 表单 -->
    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#ADD8E6' }"
      >
        <el-table-column width="10"> </el-table-column>
        <el-table-column prop="act_no" label="专题活动编号" width=""></el-table-column>
        <el-table-column prop="act_no" label="专题活动编号" width=""></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InputSelect: "", // 搜索框
      tableData: [], // 数据表单
      page: 1, // 当前页
      pageSize: 5, // 每页数量
      total: 0, // 总条数
    };
  },
  methods: {
    SelectBtn() {
      console.log(this.InputSelect);
    }, //搜索
    getTableDataList() {
      this.$axios.post('/api/activities/showActivities.do',{
        limit:this.pageSize,
        page:this.page,
        sta_no:2
      },{
        headers: {
                "Content-Type": "application/json"
              }
      }).then(res => {
        console.log(res)
      })
    }
  },
  created() {
    
  },
};
</script>
<style scoped>
.SearchRow {
  margin-top: -20px;
}
.el-row:nth-child(2) {
  margin: 20px 0;
}
</style>
