<!--  -->
<template>
  <div>
    <!-- <el-table
      ref="tableData"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column prop="smgr_time1" label="开始时间" width="">
      </el-table-column>
      <el-table-column prop="smgr_time2" label="结束时间" width="">
      </el-table-column>
      <el-table-column prop="smgr_housecall" label="仓库电话" width="">
      </el-table-column>
      <el-table-column prop="smgr_houseaddr" label="仓库地址" width="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <div class="showDiv">
      <h3>配送管理</h3>
      <el-form :model="uptableData">
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-select v-model="uptableData[0].smgr_time1" placeholder="请选择">
            <el-option label="07:30:00" value="07:30:00"></el-option>
            <el-option label="08:00:00" value="08:00:00"></el-option>
            <el-option label="08:30:00" value="08:30:00"></el-option>
            <el-option label="09:00:00" value="09:00:00"></el-option>
          </el-select>
          结束时间
          <el-select v-model="uptableData[0].smgr_time2" placeholder="请选择">
            <el-option label="20:30:00" value="20:00:00"></el-option>
            <el-option label="21:00:00" value="21:00:00"></el-option>
            <el-option label="21:30:00" value="21:30:00"></el-option>
            <el-option label="22:00:00" value="22:00:00"></el-option>
            <el-option label="22:30:00" value="22:30:00"></el-option>
            <el-option label="23:00:00" value="23:00:00"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <el-select v-model="uptableData[0].smgr_arrive1" placeholder="请选择">
            <el-option label="24" value="24"></el-option>
            <el-option label="48" value="48"></el-option>
            <el-option label="72" value="72"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="即时送达时间" :label-width="formLabelWidth">
          <el-select v-model="uptableData[0].smgr_arrive2" placeholder="请选择">
            <el-option label="0.5" value="0.5"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="1.5" value="1.5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库电话" :label-width="formLabelWidth">
          <el-input
            style="width: 220px"
            v-model="uptableData[0].smgr_housecall"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" :label-width="formLabelWidth">
          <el-input
            style="width: 220px"
            v-model="uptableData[0].smgr_houseaddr"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click="updata">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="uptableData">
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-select v-model="uptableData.smgr_time1" placeholder="请选择">
            <el-option label="07:30:00" value="07:30:00"></el-option>
            <el-option label="08:00:00" value="08:00:00"></el-option>
            <el-option label="08:30:00" value="08:30:00"></el-option>
            <el-option label="09:00:00" value="09:00:00"></el-option>
          </el-select>
          结束时间
          <el-select v-model="uptableData.smgr_time2" placeholder="请选择">
            <el-option label="20:30:00" value="20:00:00"></el-option>
            <el-option label="21:00:00" value="21:00:00"></el-option>
            <el-option label="21:30:00" value="21:30:00"></el-option>
            <el-option label="22:00:00" value="22:00:00"></el-option>
            <el-option label="22:30:00" value="22:30:00"></el-option>
            <el-option label="23:00:00" value="23:00:00"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <el-select v-model="uptableData.smgr_arrive1" placeholder="请选择">
            <el-option label="24" value="24"></el-option>
            <el-option label="48" value="48"></el-option>
            <el-option label="72" value="72"></el-option>
          </el-select>
          即时配送
          <el-select v-model="uptableData.smgr_arrive2" placeholder="请选择">
            <el-option label="0.5" value="0.5"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="1.5" value="1.5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库电话">
          <el-input
            v-model="uptableData.smgr_housecall"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库地址">
          <el-input
            v-model="uptableData.smgr_houseaddr"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      uptableData: [],

      dialogFormVisible: false,
      form: [],
      formLabelWidth: "120px",
      token: window.sessionStorage.getItem("token")
    };
  },

  components: {},

  computed: {},

  mounted: function() {
    this.getStoreList();
  },

  methods: {
    //表头背景颜色设置
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color:lightblue;coloe:#fff";
      }
    },
    getStoreList() {
      console.log("获取信息中");
      this.$axios
        .post(
          "/api/sys/send/showSendMgr.do",
          {
            page: 1,
            pageSize: 5
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.token
            }
          }
        )
        .then(res => {
          console.log(res);
          console.log("信息获取成功");
          this.uptableData = this.tableData = res.data.data;
          // console.log(this.tableData)
        });
    },
    displayNone() {
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      this.uptableData = row;
      console.log(this.uptableData);
      console.log(this.uptableData + "这是修改后的表单");
      this.dialogFormVisible = true;
      console.log(this.uptableData.smgr_time2);
    },
    updata() {
      console.log("获取数据中");
      var that = this;
      console.log(this.uptableData[0].smgr_arrive1);
      this.$axios
        .post(
          "/api/sys/send/saveSendMgr.do",
          {
            smgr_arrive1: this.uptableData[0].smgr_arrive1,
            smgr_arrive2: this.uptableData[0].smgr_arrive2,
            smgr_houseaddr: this.uptableData[0].smgr_houseaddr,
            smgr_housecall: this.uptableData[0].smgr_housecall,
            smgr_no: this.uptableData[0].smgr_no,
            smgr_time1: this.uptableData[0].smgr_time1,
            smgr_time2: this.uptableData[0].smgr_time2
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.token
            }
          }
        )
        .then(response => {
          this.getStoreList();
          console.log(response);
          this.dialogFormVisible = false;
          that.$message({
            message: response.data.msg,
            type: "success"
          });
        });
    }
  }
};
</script>
<style scoped>
.showDiv {
  width: 750px;
  height: 300px;
  margin: 0 auto;
}
.showDiv > h3 {
  text-align: center;
}
</style>
