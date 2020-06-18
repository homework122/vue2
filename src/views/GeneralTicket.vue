<!--这个是发布优惠券**单品券-->
<!--GeneralTicket-->
<!--SingleTickrt-->
<template>
  <div class="tongyong">
    <el-row>
      <el-col :span="2">单单品券名称：</el-col>
      <el-col :span="4">
        <el-input placeholder="请输入优惠券名称" v-model="input1" clearable>
        </el-input>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">面值</el-col>
      <el-col :span="4">
        <el-input
          placeholder="请输入面值应为1~99之间的整数"
          v-model="input2"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="2">元</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">发放总量</el-col>
      <el-col :span="4">
        <el-input
          placeholder="发放总量应为1~9999之间的整数"
          v-model="input3"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="2">张</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">使用条件</el-col>
      <el-col :span="1">订单满</el-col>
      <el-col :span="4">
        <el-input placeholder="不填则默认为0" v-model="input4" clearable>
        </el-input>
      </el-col>
      <el-col :span="2">元可使用</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">有效期:</el-col>
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
      <el-col :span="2">
        选择商品
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="dialogFormVisible = true"
          >选择商品</el-button
        >
        <!--选择商品的弹出框-->
        <el-dialog title="" :visible.sync="dialogFormVisible">
          <el-row :gutter="2">
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-input placeholder="商品名称"> </el-input>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="search">搜索</el-button>
              </div>
            </el-col>
          </el-row>
          <el-table
            width="50%"
            :header-cell-style="{ background: '#ADD8E6' }"
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
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="fabu">发布</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="info">返回</el-button>
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
      com_name: "" /*商品名字*/,
      com_price: "" /*商品单价*/,
      com_stock: "" /*商品库存*/,
      com_imgs: "" /*商品图片*/,
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
              "Content-Type": "application/json"
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
  margin-left: 100px;
}
</style>
