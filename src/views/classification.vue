<template>
<!--  分类管理-->
  <div id="app" class="bg">
<!--    &lt;!&ndash;标题&ndash;&gt;-->
<!--    <h1>分类管理</h1>-->
<!--    &lt;!&ndash;分割线&ndash;&gt;-->
<!--    <el-divider class="margin"></el-divider>-->
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
      <!--批量删除-->
      <el-button
        type="primary"
        icon="el-icon-delete"
        class="margin"
        size="small"
        :disabled="disabled"
        @click="batchBelete()"
        >批量删除
      </el-button>
      <!--新增-->
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="margin"
        size="small"
        @click="dialogTableVisible = true"
        >新增
      </el-button>
    </div>
    <!--弹出框-->
    <div>
      <!--弹出框-->
      <el-dialog
        title="商品分类"
        :visible.sync="dialogTableVisible"
        width="50%"
      >
        <el-row>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              上级分类名称：
              <template>
                <el-select v-model="val" clearable placeholder="上级分类名称">
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
    </div>
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
        <el-table-column prop="comc_pno" label="上级分类名称" width="">
        </el-table-column>
        <el-table-column prop="comc_name" label="分类名称" width="">
        </el-table-column>
        <el-table-column prop="comc_desc" label="商品分类描述" width="">
        </el-table-column>
        <el-table-column prop="comc_img" label="商品分类图片" width="150">
          <template slot-scope="scope">
            <el-image
              style="width: 100px;height: 100px"
              :src="scope.row.comc_img"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="comc_lower" label="下架商品数量" width="">
        </el-table-column>
        <el-table-column prop="comc_upper" label="上架商品数量" width="">
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
export default {
  name: "classification",
  data() {
    return {
      show: true,
      // 总条数
      count: 1,
      // 当前页
      currentPage: 1,
      // 显示条数
      pageSize: "",
      comc_no: "", // 商品分类编号
      comc_name: "", //商品分类名称
      comc_pno: 1, //商品分类上级编号
      comc_desc: "", //商品分类描述
      comc_lower: "", //下架商品数量
      comc_upper: "", //上架商品数量
      // 图片上传
      imageUrl: "",
      //  弹出框,
      value: [],
      options: [
        {
          value: this.comc_pno,
          label: "黄金糕"
        },
        {
          value: this.comc_pno,
          label: "双皮奶"
        },
        {
          value: this.comc_pno,
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
      dialogTableVisible: false,
      //查询
      stan_name: "",

      //    批量删除
      disabled: true,
      //    表格假数据
      tableData: [
        {
          comc_no: 2, // 商品分类编号
          comc_name: "香蕉", //商品分类名称
          comc_pno: "1", //商品分类上级编号
          comc_desc: "122324@qq.com", //商品分类描述
          comc_img: "", //商品分类图片
          comc_lower: 10, //下架商品数量
          comc_upper: 20 //上架商品数量
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    //提交信息
    submit() {
      this.dialogTableVisible = false;
      console.log(this.val);
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
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].comc_name.indexOf(this.stan_name) >= 0) {
          this.tableDatap.push(this.tableData[i]);
        } else {
          this.$message("没有数据");
        }
      }
      this.$axios
        .post(
          "/api/sale/searchComc.do",
          {
            page: this.currentPage,
            limit: this.pageSize,
            stan_name: this.stan_name
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
        })
        .catch(err => {
          console.log(err);
        });
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
    // 修改
    Modify(val) {
      console.log(val);
      this.dialogTableVisible = true;
      // this.options=val
      this.val = val.comc_pno;
      this.comc_name = val.comc_name;
      this.comc_desc = val.comc_desc;
      this.imageUrl = val.comc_img;
      console.log(this.val);

      // 请求数据
      this.$axios
        .post(
          "/api/sale/editComc.do",
          {
            comc_no: val.comc_no,
            comc_name: this.comc_name,
            comc_pno: this.comc_pno, //商品分类上级编号
            comc_desc: this.comc_desc, //商品分类描述
            comc_img: this.imageUrl
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
          this.count = response.data.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    Delete(val) {
      this.tableData.splice(val, 1);
      if (this.tableData.length === 0) {
        this.count = 0;
      }
      // 请求数据
      this.$axios
        .post(
          "/api/",
          {
            page: this.currentPage,
            pageSize: this.pageSize
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
          this.count = response.data.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // components: {
  //     // 富文本名
  //     // fuwenben
  // }
  mounted: function() {
    // 请求数据
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
        this.count = response.data.data.count;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.block {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
/*图片*/
.el-upload {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d92651;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/**/
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

.margin {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
