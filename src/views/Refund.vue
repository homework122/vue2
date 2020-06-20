<template>
  <div class="Refund">
    <!--<el-row>-->
      <!--<el-col :span="20">-->
    <div class="Headers">
      <div id="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="买家昵称">
            <el-input
                    v-model="formInline.client_no"
                    placeholder="买家昵称"
                    size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="退款状态">
            <el-select
                    v-model="formInline.infor_status"
                    placeholder="退款状态"
                    size="mini"
            >
              <el-option label="全部" value="3"></el-option>
              <el-option label="等待处理" value="0"></el-option>
              <el-option label="退款关闭" value="2"></el-option>
              <el-option label="退款成功" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" size="small" @click="onSubmit"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="exportTables">
        <el-button @click="exportExcel">导出</el-button>
      </div>
    </div>
      <!--</el-col>-->
      <!--<el-col :span="4">-->
        <!--<el-button  @click="outTab" id="output">导出退款信息</el-button>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--表格-->
    <el-table :data="tableData" style="width: 100%" >
      <el-table-column prop="infor_no" label="退款编号" width="180">
      </el-table-column>
      <el-table-column prop="order_no" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="client_name" label="买家" width="180">
      </el-table-column>
      <el-table-column prop="order_actcol" label="订单金额" width="180">
      </el-table-column>
      <el-table-column prop="infor_money" label="退款金额" width="180">
      </el-table-column>
      <el-table-column prop="infor_accepttime" label="申请时间" width="180">
        <template slot-scope="scope">{{
          scope.row.infor_accepttime | dateFormat(scope.row.infor_accepttime)
        }}</template>
      </el-table-column>
      <el-table-column prop="infor_status" label="退款状态" width="180">
        <template slot-scope="scope">
          <span>{{
            scope.row.infor_status | statusForm(scope.row.infor_status)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="买家">
        <template slot-scope="scope">
          <!--<router-view></router-view>-->
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--导出的信息表-->
    <el-table :data="exportTable" style="width: 100%" id="outTable" v-show="hiddenTable">
      <el-table-column prop="infor_no" label="退款编号" width="180">
      </el-table-column>
      <el-table-column prop="order_no" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="client_name" label="买家" width="180">
      </el-table-column>
      <el-table-column prop="order_actcol" label="订单金额" width="180">
      </el-table-column>
      <el-table-column prop="infor_money" label="退款金额" width="180">
      </el-table-column>
      <el-table-column prop="infor_accepttime" label="申请时间" width="180">
        <template slot-scope="scope">{{
          scope.row.infor_accepttime | dateFormat(scope.row.infor_accepttime)
          }}</template>
      </el-table-column>
      <el-table-column prop="infor_status" label="退款状态" width="180">
        <template slot-scope="scope">
          <span>{{
            scope.row.infor_status | statusForm(scope.row.infor_status)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="买家">
        <template slot-scope="scope">
          <!--<router-view></router-view>-->
          <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
  name: "Refund",
  data() {
    return {
      hiddenTable:false,//隐藏导出的表
      formInline: {
        // infor_no:'',//退款编号
        // infor_startime:'',//申请开始时间
        // infor_endtime:'',//申请结束时间
        // order_no:'',//订单编号
        client_no: "", //买家
        infor_status: "" //退款状态
      },
      tableData: [],
      exportTable:[],//用于导出退款信息表
      // 分页
      currentPage: 1,
      pagesize: 3, // 每页显示的条数
      total: "" //总条数
    };
  },
  methods: {
    // 导出退款信息
    exportExcel () {
      /* generate workbook object from table */
      var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(document.querySelector('#outTable'), xlsxParam)

      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'refundInfo.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    },
    // 导出信息的表
    getAllInfoExport(){
      this.$axios
          .post(
              "/api/refund/queryInforAll.do",
              {
                page: this.currentPage, //当前页码数
                pageSize: 1000 //每页显示条数
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                  token: window.sessionStorage.getItem("token")
                }
              }
          )
          .then(res => {
            // this.tableData = res.data
            console.log("退款信息总数据", res);
            console.log("res.data", res.data.data);
            this.exportTable = res.data.data;
            console.log("this.exportTable", this.tableData);
          })
          .catch(err => {
            console.log("退款总数据出错", err);
          });
    },
    // 退款信息总数据
    getAllInfo() {
      this.$axios
        .post(
          "/api/refund/queryInforAll.do",
          {
            page: this.currentPage, //当前页码数
            pageSize: this.pagesize //每页显示条数
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          // this.tableData = res.data
          console.log("退款信息总数据", res);
          console.log("res.data", res.data.data);
          this.tableData = res.data.data;
          this.total = res.data.count;
          console.log("this.tableData", this.tableData);
          console.log("this.total", this.total);
        })
        .catch(err => {
          console.log("退款总数据出错", err);
        });
    },
    // 得到查询信息
    onSubmit() {
      console.log("查询进入");
      console.log("退款状态", this.formInline.infor_status);
      console.log(typeof this.formInline.infor_status);
      // 查询请求数据
      this.$axios
        .post(
          "/api/refund/queryInforAllByParm.do",
          {
            page: this.currentPage,
            pageSize: this.pagesize,
            client_name: this.formInline.client_no, //买家昵称
            infor_status: parseInt(this.formInline.infor_status) //退款状态
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("查询信息", res);
          if (res.data.code == 200) {
            // this.$message(res.data.msg)
            console.log(res.data.data);
            this.tableData = res.data.data;
            this.total = res.data.count;
          }
          if (res.data.code == 500) {
            this.$message(res.data.msg);
          }
          // window.location.reload()
        })
        .catch(err => {
          console.log("查询信息出错", err);
          this.$message("数据查询出错请联系管理员");
        });
      console.log("submit!");
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.pagesize = val;
      console.log("pagesize");
      console.log(this.pagesize);
      if (this.formInline.infor_status != "") {
        this.onSubmit();
      }
      this.getAllInfo();
      // this.onSubmit()
    },
    // 分页改变当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log("currentPage");
      console.log(this.currentPage);
      // 再次请求数据
      if (this.formInline.infor_status != "") {
        this.onSubmit();
      }
      this.getAllInfo();
      // this.onSubmit()
    },
    // 重置
    onRestart() {
      console.log("onRestart");
      this.formInline.refundId = "";
      this.formInline.orderId = "";
      this.formInline.status = "";
      this.formInline.userName = "";
      this.formInline.date1 = "";
      this.formInline.date2 = "";
    },
    // 表格
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleClick(row) {
      console.log(row);
      // 点击查看的时候将退款状态传递
      this.$router.push({
        name: "/home/RefundDetail",
        params: {
          statusId: row.infor_status,
          refundId: row.infor_no,
          sendOrderId: row.order_no
        }
      });
      // this.$router.push('/RefundDetail',{params:{statusId:row.status}})

      console.log(row);
    }
  },
  filters: {
    // 时间格式化
    dateFormat(date) {
      let ret = "";
      let fmt = "YYYY-mm-dd HH:MM:SS";
      date = new Date(date);
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (const k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },

    statusForm(status) {
      if (status == 0) {
        return "等待处理";
      } else if (status == 1) {
        return "退款成功";
      } else if (status == 2) {
        return "退款关闭";
      }
    }
  },
  mounted() {
    // 退款信息总数据
    this.getAllInfo();
    // this.onSubmit()
    this.getAllInfoExport();
  }
};
</script>

<style scoped>
  .Headers{
    display: flex;
    justify-content: space-between;
  }
</style>
