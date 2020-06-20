<!--这个是发布优惠券**单品券-->
<!--GeneralTicket-->
<!--SingleTickrt-->
<template>
  <div class="tongyong">
    <el-row>
      <el-col :span="5">单品券名称：</el-col>
      <el-col :span="5">
        <el-input placeholder="请输入优惠券名称" v-model="input1" clearable>
        </el-input>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="5">面值</el-col>
      <el-col :span="5">
        <el-input
          placeholder="请输入面值应为1~99之间的整数"
          v-model="input2"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="5" style="margin-left:20px;margin-top:8px">元</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="5">发放总量</el-col>
      <el-col :span="5">
        <el-input
          placeholder="发放总量应为1~9999之间的整数"
          v-model="input3"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="5" style="margin-left:20px;margin-top:8px">张</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="3">使用条件</el-col>
      <el-col :span="2" style="margin-top:0px">订单满</el-col>
      <el-col :span="5">
        <el-input placeholder="不填则默认为0" v-model="input4" clearable style="margin-top:-8px">
        </el-input>
      </el-col>
      <el-col :span="2" style="margin-left:20px">元可使用</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="5">有效期:</el-col>
      <el-col :span="10">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <br />

    <el-row>
      <el-col :span="5">
        选择商品
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="dialogFormVisible = true"
          >选择商品</el-button
        >
        <!--选择商品的弹出框-->
        <el-dialog title="" :visible.sync="dialogFormVisible">
          <el-table
          :header-cell-style="{background:'#F5F5F5',color:'#606266'  }"
            width="50%"
            :data="
              tableData.filter(
                data =>
                  !search ||
                  data.name.toLowerCase().includes(search.toLowerCase())
              )
            "
            style="width: 100%"
          >
            <el-table-column prop="com_imgs" label="图片" width="150">
              <template slot-scope="scope">
                <el-image
                  style="width: 100px;height: 100px"
                  :src="scope.row.com_imgs"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column label="商品名字" prop="com_name">
            </el-table-column>
            <el-table-column label="商品单价" prop="com_price">
              <!--<div prop="stan_price"></div>-->
              <!--<el-divider></el-divider>-->
              <!--<span prop="stan_price"></span>-->
            </el-table-column>
            <el-table-column label="总库存" prop="com_stock"> </el-table-column>
            <el-table-column align="right" label="编辑" prop="AllInventory">
              <template>
                <el-button size="medium" type="danger" @click="ondel(index)"
                  >移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <br />
    <el-row style="margin-left:80px;margin-top:50px">
      <el-col :span="4">
        <el-button type="primary" @click="fabu">发布</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="info" style="margin-left:150px">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "GeneralTicket",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      value1: "",
      search: "",
      InputSelect:'',// 搜索框值
      com_name: "" /*商品名字*/,
      com_price: "" /*商品单价*/,
      com_stock: "" /*商品库存*/,
      com_imgs: "" /*商品图片*/,
      token: window.sessionStorage.getItem("token"),
      stan_price: "",
      tableData: [],

      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    success(response) {
      console.log(response);
    },
    //跳转
    fabu() {
      this.$router.push({
        path: "/home/quanguanli/SendTicket"
      });
    },
    /*删除*/
    ondel(index) {
      this.tableData.splice(index, 1);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    gettableDataList() {
      console.log(window.sessionStorage.getItem("token"));
      this.$axios
        .post(
          "/api/discount/addSingleSelectAllCom.do",
          {
            dis_status: 0,
            page: 1,
            pagesize: 5
            /* token*/
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("单品券", res);
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    }
  },
  created: function() {
    this.gettableDataList();
  }
};
</script>

<style scoped>
.el-row {
}
.el-col {
  border-radius: 4px;
}
.tongyong {
  margin-left: 300px;
  margin-top: 20px;
}
</style>
