<template>
  <div class="bg">
    <h1>商品管理</h1>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">出售中商品</div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">下架商品</div></el-col
      >
    </el-row>
    <!--分割线-->
    <el-divider class="margin"></el-divider>
    <!--查询-->
    <el-input
      size="small"
      class="input"
      placeholder="请输入分类名称"
      v-model="stan_name"
      maxlength="30"
      clearable
    >
    </el-input>
    <el-button
      type="primary"
      icon="el-icon-search"
      size="small"
      @click="query()"
      >查询
    </el-button>
    <div>
      <!--新增-->
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="margin"
        size="small"
        @click="add()"
        >新增
      </el-button>
    </div>
    <!--发布弹出框-->
    <div>
      <!--发布弹出框-->
      <el-dialog
        title="商品规格"
        :visible.sync="dialogTableVisible"
        width="50%"
      >
        <el-row>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              分类名称：
              <template>
                <el-form
                  :label-position="labelPosition"
                  label-width="80px"
                  :model="tableData"
                >
                  <p>1.选择商品分类</p>
                  <el-form-item label="商品编号">
                    <el-input
                      placeholder="商品编号"
                      v-model="tableData.com_no"
                      clearable
                      class="width"
                    ></el-input>
                    <!--<el-select v-model="options" placeholder="请选择活动区域">-->
                    <!--<el-option label="区域一" :value="shanghai"></el-option>-->
                    <!--<el-option label="区域二" :value="beijing"></el-option>-->
                    <!--</el-select>-->
                  </el-form-item>
                  <!--分类下拉列表-->
                  <el-form-item label="分类名称">
                    <el-select v-model="val" clearable placeholder="分类名称">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <el-button @click="newClassification()">新增分类</el-button>
                  </el-form-item>
                  <div class="demo-input-suffix">
                    商品标签：
                    <el-input
                      placeholder="请选择日期"
                      suffix-icon="el-icon-date"
                      v-model="input1"
                    >
                    </el-input>
                  </div>
                  <div>
                    <!--<fenleixinzeng :isShop="panelShow" >-->
                    <!--</fenleixinzeng>-->
                    <!--分类新增弹出框-->
                    <div>
                      <!--分类新增弹出框-->
                      <el-dialog
                        title="商品分类"
                        :visible.sync="dialogTable"
                        width="50%"
                      >
                        <el-row>
                          <el-col :span="15">
                            <div class="grid-content bg-purple">
                              上级分类名称：
                              <template>
                                <el-select
                                  v-model="val"
                                  clearable
                                  placeholder="上级分类名称"
                                >
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                  >
                                  </el-option>
                                </el-select>
                              </template>
                              <div>
                                分类名称：
                                <el-input
                                  placeholder="分类名称"
                                  v-model="comc_name"
                                  clearable
                                  class="width"
                                ></el-input>
                              </div>
                              <div class="center">
                                <p>分类描述：</p>
                                <textarea
                                  name="maosu"
                                  id=""
                                  cols="30"
                                  rows="10"
                                  v-model="comc_desc"
                                  placeholder="分类描述"
                                ></textarea>
                                <!--<el-input type="textarea" v-model="maosu"  placeholder="分类描述"></el-input>-->
                              </div>
                            </div>
                          </el-col>
                          <el-col :span="9">
                            <div class="grid-content bg-purple-light">
                              <!--上传图片-->
                              <el-upload
                                class="avatar-uploader"
                                action=" http://localhost:8081/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                              >
                                <img
                                  v-if="imageUrl"
                                  :src="imageUrl"
                                  class="avatar"
                                />
                                <i
                                  v-else
                                  class="el-icon-plus avatar-uploader-icon"
                                ></i>
                              </el-upload>
                            </div>
                          </el-col>
                        </el-row>
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogTable = false"
                            >取 消</el-button
                          >
                          <el-button type="primary" @click="determine"
                            >确 定
                          </el-button>
                        </div>
                      </el-dialog>
                    </div>
                  </div>
                  <el-form-item>
                    <el-input v-model="tableData.region"></el-input>
                  </el-form-item>
                  <!--<el-form-item label="活动形式">-->
                  <!--<el-input v-model="tableData.type"></el-input>-->
                  <!--</el-form-item>-->
                </el-form>
              </template>
              <!--<div class="center">-->
              <!--<p>分类描述：</p>-->
              <!--<textarea name="maosu" id="" cols="30" rows="10" v-model="maosu" placeholder="分类描述"></textarea>-->
              <!--&lt;!&ndash;<el-input type="textarea" v-model="maosu"  placeholder="分类描述"></el-input>&ndash;&gt;-->
              <!--</div>-->
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light">
              <!--上传图片-->
              <el-upload
                class="avatar-uploader"
                action=" http://localhost:8081/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定 </el-button>
        </div>
      </el-dialog>
      <!--
              -->
    </div>
    <template> </template>

    <!--表格-->
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; "
        :header-cell-style="tableHeaderColor"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="com_no" label="商品编号" width="">
        </el-table-column>
        <el-table-column prop="comc_no" label="商品分类编号" width="">
        </el-table-column>
        <el-table-column prop="com_name" label="商品名称" width="">
        </el-table-column>
        <el-table-column prop="com_imgs" label="商品图片地址" width="150">
          <template slot-scope="scope">
            <el-image
              style="width: 100px;height: 100px"
              :src="scope.row.com_imgs"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="com_piecework" label="配送方式" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.com_piecework == 0">普通</span>
            <span v-if="scope.row.com_piecework == 1">单独配送</span>
            <span v-if="scope.row.com_piecework == 2">同城即时达</span>
          </template>
        </el-table-column>
        <el-table-column prop="com_disttno" label="配送模板" width="">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="Modify(scope.row)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              @click="Delete(scope.row)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--分页-->
    <div class="block">
      <el-pagination
        v-show="show"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        :page-sizes="[3, 6, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import fenleixinzeng from '../components/fenleixinzeng'
export default {
  name: "goods",
  data() {
    return {
      //分类弹出层
      // panelShow: false,

      ok: false,
      a: "",
      show: true,
      // 总条数
      count: 1,
      // 当前页
      currentPage: 1,
      // 显示条数
      pageSize: 5,
      //查询名称
      stan_name: "",
      com_no: "", // 商品编号
      comc_no: "", // 商品分类编号
      com_name: "", //  商品名称
      com_imgs: "", // 商品图片地址
      com_desc: "", //商品详情
      standards: "", //  规格
      com_piecework: "", //分件 Piecework 0：普通，1：单独配送，2：同城即时达
      com_disttno: "", //  配送模板Distribution template
      // 图片上传
      imageUrl: "",
      //  弹出框,
      value: [],
      options: [
        {
          value: 1,
          label: "黄金糕"
        },
        {
          value: 2,
          label: "双皮奶"
        },
        {
          value: 3,
          label: "蚵仔煎"
        },
        {
          value: 4,
          label: "龙须面"
        },
        {
          value: 5,
          label: "北京烤鸭"
        }
      ],
      val: "",
      // 新增商品分类
      dialogTable: false,
      // 发布商品
      dialogTableVisible: false,
      //    批量删除
      disabled: true,
      //    表格假数据
      tableData: [
        {
          com_no: 6, // 商品编号
          comc_no: 545, // 商品分类编号
          com_name: "sfd", //  商品名称
          com_imgs: "", // 商品图片地址
          com_desc: "414", //商品详情
          standards: "424", //  规格
          com_piecework: "24", //分件 Piecework 0：普通，1：单独配送，2：同城即时达
          com_disttno: "42" //  配送模板Distribution template
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    // 新增提交
    determine() {
      this.dialogTable = false;
    },
    //新增分类
    newClassification() {
      this.dialogTable = true;
    },
    //提交信息
    submit() {
      this.dialogTableVisible = false;
      console.log(this.val);
      if (!this.a === 1) {
        console.log(this.a);
      } else if (this.a === 1) {
        //修改数据
        this.$axios
          .post(
            "/api/sale/editCommodity.do",
            {
              com_no: this.com_no,
              comc_no: this.comc_no,
              com_name: this.com_name,
              com_imgs: this.com_imgs,
              com_desc: this.com_desc,
              standards: this.standards,
              com_piecework: this.com_piecework,
              com_disttno: this.com_disttno
            },
            {
              // 设置请求头
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(response => {
            console.log(response);
            this.tableData = response.data.data;
            this.count = response.data.count;
            // console.log(typeof response.data)
            // this.count = response.data.data
            // console.log(this.count)
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      console.log("mfoiejfoelfm");
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }, //弹出框数据
    handleChange(value) {
      console.log(value);
    },
    // 分页获取数据
    shuju() {
      this.$axios
        .post(
          "/api/sale/queryComc.do",
          {
            page: this.currentPage,
            limit: this.pageSize
          },
          {
            // 设置请求头
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log(response);
          this.tableData = response.data.data;
          this.count = response.data.count;
          // console.log(typeof response.data)
          // this.count = response.data.data
          // console.log(this.count)
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.shuju();
    },
    // 分页
    handleCurrentChange(pag) {
      console.log(pag);
      this.currentPage = pag;
      this.shuju();
    },
    // 查询
    query() {
      // 请求数据
      this.$axios
        .post(
          "/api/sale/searchCom.do",
          {
            page: this.currentPage,
            limit: this.pageSize,
            comc_name: this.comc_name
          },
          {
            // 设置请求头
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log(response.data.data.list);
          this.tableData = response.data.data;
          this.count = response.data.data.count;
          if (this.count === "") {
            this.show = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
      // for(var i=0;i<this.tableData.length;i++) {
      //     if (this.tableData[i].comc_name.indexOf(this.stan_name)>=0) {
      //         this.tableDatap.push(this.tableData[i])
      //     }else{
      //         this.$message('没有数据');
      //     }
      // }
    },
    // 修改table header的背景色
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color: #90ADE5;color: #fff;font-weight:500;height:60px";
      }
    },
    // 批量删除
    batchBelete() {
      for (var i = 0; this.multipleSelection.length; i++) {
        console.log(12334566);
        console.log(this.multipleSelection[i]);

        this.tableData.splice(this.multipleSelection[i], 1);
        this.$message("删除成功");
        this.disabled = true;
      }
    },
    // 表格复选框
    handleSelectionChange(val) {
      this.disabled = false;
      this.multipleSelection = val;
      console.log(val);
    },
    //新增
    add() {
      this.dialogTableVisible = true;
      // this.options.lable=this.tableData.comc_name
      this.options.push({
        lable: "this.tableData.comc_name",
        value: this.tableData.comc_no
      });
      // this.options.value=this.tableData.comc_no
      console.log(this.options);
      console.log(this.tableData[0].comc_no);
    },
    // 修改
    Modify(val) {
      this.a = 1;
      console.log(val);
      this.dialogTableVisible = true;
      // this.options=val
      this.val = val.comc_no;
      this.text = val.comc_name;
      this.maosu = val.comc_desc;
      this.imageUrl = val.comc_img;
      console.log(this.val);
    },
    // 删除
    Delete(val) {
      this.tableData.splice(val, 1);
      if (this.tableData.length === 0) {
        this.count = 0;
      }
    }
  },
  mounted: function() {
    // 请求数据
    this.$axios
      .post(
        "/api/sale/queryCom.do",
        {
          page: this.currentPage,
          limit: this.pageSize
        },
        {
          // 设置请求头
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        console.log(response.data.data.list);
        this.tableData = response.data.data;
        this.count = response.data.data.count;
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    // fenleixinzeng
  }
};
</script>

<style scoped>
.margin {
  margin-top: 20px;
  margin-bottom: 20px;
}
.center {
  height: 200px;
  width: 300px;
}
.center input {
  margin-top: 20px;
}
.width {
  width: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.bg {
  background-color: ghostwhite;
  margin: 0;
  padding: 10px;
  height: 1200px;
}

.input {
  width: 200px;
  margin-right: 50px;
}
</style>
