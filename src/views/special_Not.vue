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
        <el-table-column
          prop="act_no"
          label="专题活动编号"
          width=""
        ></el-table-column>
        <el-table-column
          prop="act_name"
          label="专题活动名称"
          width=""
        ></el-table-column>
        <el-table-column
          prop="act_rule"
          label="规则说明"
          width=""
        ></el-table-column>
        <el-table-column
          prop="act_views"
          label="浏览量"
          width=""
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="open(scope.row)" type="text" size="small"
              >开启</el-button
            >
            <el-button @click="details(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button @click="deletes(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 修改框 -->
    <el-dialog
      title="修改专题信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="Mform" :model="Mform" :rules="Mrules" label-width="80px">
        <el-form-item label="活动编号">
          <el-input v-model="Mform.act_no" size="mini" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="act_name">
          <el-input v-model="Mform.act_name" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="模板编号">
          <el-input v-model="Mform.tem_no" size="mini" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="date"
            placeholder="开始时间"
            v-model="Mform.act_creat_time"
            style="width: 100%;"
            size="mini"
            disabled
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-form-item prop="act_start_time">
              <el-date-picker
                type="date"
                placeholder="开始时间"
                v-model="Mform.act_start_time"
                size="mini"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="act_end_time">
              <el-date-picker
                type="date"
                placeholder="结束时间"
                v-model="Mform.act_end_time"
                size="mini"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="浏览量">
          <el-input v-model="Mform.act_views" size="mini" disabled></el-input>
        </el-form-item>
        <el-form-item label="规则说明" prop="act_rule">
          <el-input
            type="textarea"
            v-model="Mform.act_rule"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="头部图片" prop="requreImage">
          <el-upload
            :file-list="[{ url: Mform.act_img }]"
            action="/api/uploadfile.do"
            auto-upload
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="success"
            :on-remove="handleRemove"
            style="width:150px;height:150px;overflow: hidden"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible2">
            <img width="100%" :src="Mform.act_img" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="组件主题" prop="act_parts_name">
          <el-input v-model="Mform.act_parts_name" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          共有{{ count }}个专题商品<el-button
            type="primary"
            size="mini"
            style="margin-left:30px"
            @click="innerVisible = true"
            >查看/修改</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modify('Mform')"
            >立即修改</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 二层模态框 -->
      <el-dialog
        width="70%"
        title="当前活动商品"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-row>
          <el-col :span="10">
            <p>
              添加商品：<el-button
                type="primary"
                size="mini"
                style="margin-left:20px"
                @click="ShopListBtn"
                >商品列表</el-button
              >
            </p>
          </el-col>
        </el-row>

        <el-table :data="ShopList">
          <el-table-column
            property="stan_no"
            fixed
            label="商品编号"
            width="80"
          ></el-table-column>
          <el-table-column
            property="stan_name"
            label="商品名"
            width="80"
          ></el-table-column>
          <el-table-column prop="com_imgs" label="图片" width="100px">
            <template slot-scope="scope">
              <img
                :src="scope.row.com_imgs"
                alt=""
                style="width:50px;height:50px"
              />
            </template>
          </el-table-column>
          <el-table-column
            property="stan_price"
            label="原价"
            width="80"
          ></el-table-column>
          <el-table-column
            property="stan_pprice"
            label="现价"
            width="80"
          ></el-table-column>
          <el-table-column
            property="stan_stock"
            label="库存"
            width="80"
          ></el-table-column>
          <el-table-column
            property="comc_name"
            label="种类"
            width="80"
          ></el-table-column>
          <el-table-column
            property="distt_name"
            label="配送方式"
            width="80"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row
          ><el-col :span="6" :offset="22" style="margin-top:20px"
            ><el-button type="primary" size="mini" @click="ShopBtn"
              >确定</el-button
            ></el-col
          ></el-row
        >
        <!-- 第三层模态框 -->
        <el-dialog
          width="50%"
          title="选择商品"
          :visible.sync="innerVisible3"
          append-to-body
        >
          <el-row class="SearchRow">
            <el-col :span="10" style="margin-bottom:10px"
              ><div>
                <el-input
                  placeholder="输入商品名称进行搜索"
                  v-model="SearchInput"
                  class="input-with-select"
                  size="mini"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="SelectBtn2"
                  ></el-button>
                </el-input></div
            ></el-col>
          </el-row>
          <el-table :data="ShopList2" border style="width: 100%">
            <el-table-column fixed prop="stan_no" label="编号" width="50">
            </el-table-column>
            <el-table-column prop="com_imgs" label="图片" width="100px">
              <template slot-scope="scope">
                <img
                  :src="scope.row.com_imgs"
                  alt=""
                  style="width:50px;height:50px"
                />
              </template>
            </el-table-column>
            <el-table-column prop="stan_name" label="商品名称" width="100px">
            </el-table-column>
            <el-table-column prop="stan_price" label="商品原价" width="100px">
            </el-table-column>
            <el-table-column prop="stan_pprice" label="商品现价" width="100px">
            </el-table-column>
            <el-table-column prop="stan_stock" label="库存" width="100px">
            </el-table-column>
            <el-table-column prop="comc_name" label="类型" width="100px">
            </el-table-column>
            <el-table-column prop="distt_name" label="快递方式" width="100px">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="Add(scope.row)" type="text" size="small"
                  >添加</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <el-col :span="6">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="page"
                :page-size="limit"
                layout="total, prev, pager, next, jumper"
                :total="total2"
              >
              </el-pagination>
            </el-col>
          </el-row>
        </el-dialog>
      </el-dialog>
    </el-dialog>
    <!-- 分页 -->
    <el-row>
      <el-col :span="6" :offset="8">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InputSelect: "", // 搜索框
      SearchInput: "", //  搜索框2
      tableData: [], // 数据表单
      Mform: "", // 修改数组
      ShopList: "", // 当前活动商品数组
      ShopList2: [], // 商品数组
      SelectShopList: [], // 选中修改商品数组
      page: 1, // 当前页
      pageSize: 5, // 每页数量
      total: 0, // 总条数
      count: 0, // 商品数
      limit: 5, // 每页条数
      page2: 1, // 当前页
      total2: 0, // 总数
      dialogVisible: false, //修改框
      Mrules: {
        act_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        act_rule: [
          { required: true, message: "请输入活动规则", trigger: "blur" }
        ]
      }, //修改框验证
      dialogVisible2: false, // 图片放大
      innerVisible: false, // 修改内模态框
      innerVisible3: false, // 添加商品模态框
      token: window.sessionStorage.getItem("token"), // token
      SearchRow: "" // 搜索框
    };
  },
  methods: {
    SelectBtn() {
      if (this.page != 1) {
        this.page = 1;
        this.$axios
          .post(
            "/api/activities/queryActivities.do",
            {
              sta_no: 2,
              act_name: this.InputSelect,
              limit: this.pageSize,
              page: this.page
            },
            {
              headers: {
                "Content-Type": "application/json",
                token: this.token
              }
            }
          )
          .then(res => {
            (this.tableData = res.data.data), (this.total = res.data.count);
          });
      } else {
        this.$axios
          .post(
            "/api/activities/queryActivities.do",
            {
              sta_no: 2,
              act_name: this.InputSelect,
              limit: this.pageSize,
              page: this.page
            },
            {
              headers: {
                "Content-Type": "application/json",
                token: this.token
              }
            }
          )
          .then(res => {
            (this.tableData = res.data.data), (this.total = res.data.count);
          });
      }
    }, //搜索
    getTableDataList() {
      this.$axios
        .post(
          "/api/activities/showActivities.do",
          {
            limit: this.pageSize,
            page: this.page,
            sta_no: 2
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.token
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    }, // 获取数据
    open(r) {
      this.$axios
        .post(
          "/api/activities/changeActivities.do",
          {
            act_no: r.act_no,
            sta_no: 1
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.token
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          }
          this.getTableDataList();
        });
    }, //开启
    details(r) {
      console.log(r);
      this.dialogVisible = !this.dialogVisible;
      this.$axios
        .post(
          "/api/activities/clickActivities.do",
          {
            act_no: r.act_no
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
          this.Mform = res.data.data[0];
          this.count = this.Mform.standardsList.length;
          this.ShopList = this.Mform.standardsList;
        });
    }, //修改模态框
    modify(Mform) {
      this.SelectShopList = [];
      this.$refs[Mform].validate(valid => {
        if (valid) {
          for (var i = 0; i < this.ShopList.length; i++) {
            this.SelectShopList.push(this.ShopList[i].stan_no);
          }
          this.dialogVisible = !this.dialogVisible;
          this.$axios
            .post(
              "/api/activities/editActivities.do",
              {
                act_no: this.Mform.act_no,
                act_name: this.Mform.act_name,
                act_start_time: new Date(this.Mform.act_start_time),
                act_end_time: new Date(this.Mform.act_end_time),
                act_rule: this.Mform.act_rule,
                act_img: this.Mform.act_img,
                act_parts_name: this.Mform.act_parts_name,
                stan_no: this.SelectShopList
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  token: this.token
                }
              }
            )
            .then(res => {
              this.$message(res.data.msg);
              this.getTableDataList();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }, // 修改提交按钮  修改没做完
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }, //关闭按钮
    deletes(r) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(
              "/api/activities/delActivities.do",
              {
                act_no: r.act_no
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  token: this.token
                }
              }
            )
            .then(res => {
              this.getTableDataList();
              this.$message({
                type: "success",
                message: res.data.msg
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }, //删除
    handleSizeChange(i) {
      this.page = i;
      this.getTableDataList();
    }, // 分页下标
    handleCurrentChange(i) {
      this.page = i;
      this.getTableDataList();
    }, //分页输入框
    handlePictureCardPreview(file) {
      this.Mform.act_img = file.url;
      this.dialogVisible = true;
    }, // 图片改变
    success(response) {
      this.imgUrl = response.newfilepath;
    }, // 上传成功后
    handleRemove(file, fileList) {
      if (fileList) console.log(file, fileList);
    }, // 图片移除后
    deleteRow(i) {
      this.ShopList.splice(i, 1);
    }, // 移除商品
    ShopListBtn() {
      this.innerVisible3 = true;
      this.getChoice();
    },
    getChoice() {
      this.$axios
        .post(
          "/api/activities/chooseCommodity.do",
          {
            act_no: this.Mform.act_no,
            limit: this.limit,
            page: this.page2
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.token
            }
          }
        )
        .then(res => {
          this.ShopList2 = res.data.data;
          this.total2 = res.data.count;
        });
    }, //获取商品数据
    handleSizeChange2(i) {
      this.page2 = i;
      this.getChoice();
    }, // 下标改变
    handleCurrentChange2(i) {
      this.page2 = i;
      this.getChoice();
    }, // 页码改变
    SelectBtn2() {
      if (this.page2 != 1) {
        this.page2 = 1;
        this.$axios
          .post(
            "/api/activities/queryCommodity.do",
            {
              comc_no: 0,
              stan_name: this.SearchInput,
              limit: this.limit,
              page: this.page2
            },
            {
              headers: {
                "Content-Type": "application/json",
                token: this.token
              }
            }
          )
          .then(res => {
            this.ShopList2 = res.data.data;
            this.total2 = res.data.count;
          });
      } else {
        this.$axios
          .post(
            "/api/activities/queryCommodity.do",
            {
              comc_no: 0,
              stan_name: this.SearchInput,
              limit: this.limit,
              page: this.page2
            },
            {
              headers: {
                "Content-Type": "application/json",
                token: this.token
              }
            }
          )
          .then(res => {
            this.ShopList2 = res.data.data;
            this.total2 = res.data.count;
          });
      }
    },
    Add(row) {
      this.ShopList.push(row);
    },
    ShopBtn() {
      this.SelectShopList = [];
      // for (var i = 0; i < this.ShopList.length; i++) {
      //         this.SelectShopList.push(this.ShopList[i].stan_no);
      //       }
      this.count = this.ShopList.length;
      this.innerVisible = false;
    }
  },
  created() {
    this.getTableDataList();
  }
};
</script>

<style scoped>
.SearchRow {
  margin-top: 10px;
}
.el-row:nth-child(2) {
  margin: 20px 0;
}
</style>
