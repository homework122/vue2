<template>
  <div id="app" class="bg">
    <!--标题-->
    <h1>规格管理</h1>
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
        @click="dialogTableVisible = true"
        >新增
      </el-button>
    </div>
    <!--弹出框-->
    <div>
      <!--分类新增弹出框-->
      <el-dialog
        title="商品分类"
        :visible.sync="dialogTableVisible"
        width="60%"
        append-to-body
      >
        <el-row>
          <el-col :span="14">
<<<<<<< HEAD
            <el-form>
              <div class="grid-content bg-purple">
                <el-form-item label="上级分类:" style="width: 300px">
                  <template>
                    <el-select
                      v-model="val"
                      style="width: 300px"
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
                </el-form-item>
                <div>
                  <el-form-item label="分类名称:" style="width: 200px">
                    <el-input
                      placeholder="分类名称"
                      style="width: 300px"
                      v-model="comc_name"
                      clearable
                      class="width"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="center">
                  <el-form-item label="分类描述:" style="width: 200px">
                    <textarea
                      name="maosu"
                      id=""
                      cols="40"
                      rows="15"
                      v-model="comc_desc"
                      placeholder="分类描述"
                    ></textarea>
                  </el-form-item>
                </div>
              </div>
            </el-form>
=======
            <div class="grid-content bg-purple">
              <el-form-item label="上级分类:" style="width: 300px">
                <template>
                  <el-select
                    v-model="val"
                    style="width: 300px"
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
              </el-form-item>
              <div>
                <el-form-item label="分类名称:" style="width: 200px">
                  <el-input
                    placeholder="分类名称"
                    style="width: 300px"
                    v-model="comc_name"
                    clearable
                    class="width"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="center">
                <el-form-item label="分类描述:" style="width: 200px">
                  <textarea
                    name="maosu"
                    id=""
                    cols="40"
                    rows="15"
                    v-model="comc_desc"
                    placeholder="分类描述"
                  ></textarea>
                </el-form-item>
              </div>
            </div>
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
          </el-col>
          <el-col :span="10">
            <!--图片上传-->
            <el-form-item label="商品图片" style="width: 200px">
              <el-upload
<<<<<<< HEAD
                action="/api/uploadfile.do"
                auto-upload
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="success"
=======
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定 </el-button>
        </div>
      </el-dialog>
<<<<<<< HEAD
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
        <el-table-column prop="comc_pno" label="商品分类名称" width="">
        </el-table-column>
        <el-table-column prop="comc_name" label="商品名称" width="">
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
=======
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
        <el-table-column prop="comc_pno" label="商品分类名称" width="">
        </el-table-column>
        <el-table-column prop="comc_name" label="商品名称" width="">
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
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
  </div>
</template>

<script>
export default {
  name: "specifications",
  data() {
    return {
      show: true,
      // 总条数
      count: 1,
      // 当前页
      currentPage: 1,
      // 显示条数
      pageSize: 5,
      //查询名称
      stan_name: "",
      //添加分类名称
      text: "",
      //添加分类描述
      maosu: "",
<<<<<<< HEAD
      //图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "", //图片上传成功后接收的地址
=======
      // 图片上传
      imageUrl: "",
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
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
      dialogTableVisible: false,

      //    批量删除
      disabled: true,
      //    表格假数据
      tableData: [
        {
          comc_no: 2, // 商品分类编号
          comc_name: "香蕉", //商品分类名称
          comc_pno: "1", //商品分类上级编号
          comc_desc: "122324@qq.com", //商品分类描述
          comc_img: "../../assets/logo.png", //商品分类图片
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
<<<<<<< HEAD
    // 图片上传
    // 上传图片成功
    success(response) {
      console.log(response);
      this.imgUrl = response.newfilepath;
    },
    // 图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
=======
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
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
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
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].comc_name.indexOf(this.stan_name) >= 0) {
          this.tableDatap.push(this.tableData[i]);
        } else {
          this.$message("没有数据");
        }
      }
    },
    // 修改table header的背景色
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color: #90ADE5;color: #fff;font-weight:500;height:60px";
      }
    },
<<<<<<< HEAD

    // 批量删除
    batchBelete() {
      for (var i = 0; this.multipleSelection.length; i++) {
        console.log(12334566);
        console.log(this.multipleSelection[i]);

=======

    // 批量删除
    batchBelete() {
      for (var i = 0; this.multipleSelection.length; i++) {
        console.log(12334566);
        console.log(this.multipleSelection[i]);

>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
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
      this.text = val.comc_name;
      this.maosu = val.comc_desc;
      this.imageUrl = val.comc_img;
      console.log(this.val);
    },
    // 删除
    Delete(val) {
      this.tableData.splice(val, 1);
      if (this.tableData.length == 0) {
        this.count = 0;
      }
    }
  },
  mounted: function() {
    // 请求数据
    this.$axios
      .post(
        "/api/sale/queryComc.do",
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
        console.log(response.data.data.list);
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
