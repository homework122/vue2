<template>
  <div id="app" class="bg" v-cloak>
    <el-button
      type="primary"
      size="small"
      @click="batchBelete"
      :disabled="this.multipleSelection.length === 0"
      >批量删除</el-button
    >
    <!--新增-->
    <el-button
      type="primary"
      icon="el-icon-plus"
      class="margin"
      size="small"
      @click="add()"
      >新增
    </el-button>
    <el-button
      style="margin-right: 10px"
    
      icon="el-icon-search"
      size="small"
      @click="query()"
      >
    </el-button>
    <!--查询-->
    <el-input
      size="small"
      class="input"
      placeholder="请输入分类名称"
      v-model="comc_noo"
      maxlength="30"
      clearable
    >
    </el-input>

    <!--弹出框-->
    <div>
      <el-dialog
        title="商品分类"
        :visible.sync="dialogTable"
        width="60%"
        append-to-body
      >
        <el-row>
          <el-form>
            <el-col :span="14">
              <div class="grid-content bg-purple">
                <el-form-item
                  label="上级分类:"
                  style="width: 300px"
                  v-if="readonly != true"
                  prop="vall"
                >
                  <el-select
                    v-model="vall"
                    style="width:300px"
                    elcarable
                    placeholder="上级分类名称"
                    autocomplete="off"
                  >
                    <el-option
                      v-for="item in tableData"
                      :key="item.comc_pno"
                      :label="item.comc_pname"
                      :value="item.comc_pno"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <div>
                  <el-form-item
                    label="分类名称:"
                    style="width: 200px"
                    prop="comc_name"
                  >
                    <el-input
                      placeholder="分类名称"
                      style="width: 300px"
                      v-model="comc_name"
                      clearable
                      class="width"
                      autocomplete="off"
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
            </el-col>
            <el-col :span="10">
              <!--图片上传-->
              <el-form-item label="商品图片" style=" width: 200px">
                <el-upload
                  action="/api/uploadfile.do"
                  auto-upload
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-success="success"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTable = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定 </el-button>
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
        :header-cell-style="{background:'#F5F5F5',color:'#606266'  }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="comc_pname" label="上级分类名称" width="">
        </el-table-column>
        <el-table-column prop="comc_name" label="分类名称" width="">
        </el-table-column>
        <el-table-column prop="comc_desc" label="商品分类描述" width="">
        </el-table-column>
        <el-table-column prop="comc_img" label="商品分类图片" width="150">
          <template slot-scope="scope">
            <el-image
              style="width: 50px;height: 50px"
              :src="scope.row.comc_img"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="lower" label="下架商品数量" width="">
        </el-table-column>
        <el-table-column prop="upper" label="上架商品数量" width="">
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
              @click="Delet(scope.row)"
              size="mini "
            type="info"
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
        :page-sizes="[3, 5, 10, 15, 20]"
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
  inject: ["reload"],
  data() {
    return {
      vall: "",
      show: true,
      readonly: false,
      // 总条数
      count: 1,
      // 当前页
      currentPage: 1,
      // 显示条数
      pageSize: 5,
      comc_no: "", // 商品分类编号
      comc_name: "", //商品分类名称
      comc_pno: "", //商品分类上级编号
      comc_pname: "", //商品分类上级名称
      comc_desc: "", //商品分类描述
      comc_status: "", //状态
      lower: "", //下架商品数量
      upper: "", //上架商品数量

      //图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "", //图片上传成功后接收的地址
      //  弹出框,
      value: [],
      //下拉框
      tabl:'',
      dialogTable: false,
      //查询
      comc_noo: "",
      // //    批量删除
      // disabled: true,
      //    表格假数据
      tableData: [
        {
          comc_no: "", // 商品分类编号
          comc_name: "", //商品分类名称
          comc_pno: "", //商品分类上级编号
          comc_pname: "", //商品分类上级名称
          comc_desc: "", //商品分类描述
          comc_img: "", //商品分类图片
          comc_status: "", //状态
          lower: "", //下架商品数量
          upper: "" //上架商品数量
        }
      ],

      multipleSelection: [],
      a: ""
    };
  },
  methods: {
    //添加
    add() {
      this.dialogTable = true;
      this.a = 0;
      this.readonly = false;
    },
    //提交信息
    determine() {
      console.log(this.comc_pname);
      if (this.a == 1) {
        // 修改请求数据
        this.$axios
          .post(
            "/api/sale/editComc.do",
            {
              comc_no: this.comc_no, //商品分类编号
              comc_name: this.comc_name, //商品分类名称
              comc_pno: this.comc_pno, //商品分类上级编号
              comc_desc: this.comc_desc, //商品分类描述
              comc_img: this.imgUrl //商品分类图片
              // comc_status: this.comc_status,//状态
              // lower: this.lower,//下架数量
              // upper:this.upper,//上架数量
            },
            {
              // 设置请求头
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                token: window.sessionStorage.getItem("token")
              }
            }
          )
          .then(response => {
            console.log("修改");
            console.log(response);
            this.$message(response.data.msg);
            this.dialogTable = false;
            this.reload();
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.a == 0) {
        if (this.all == "" || this.comc_name == "") {
          this.$message("分类和名称不能为空");
        } else {
          this.$axios
            .post(
              "/api/sale/addComc.do",
              {
                comc_no: this.comc_no, //商品分类编号
                comc_name: this.comc_name, //商品分类名称
                comc_pno: parseInt(this.vall), //商品分类上级编号
                comc_pname: this.comc_pname, //商品分类上级名
                comc_desc: this.comc_desc, //商品分类描述
                comc_img: this.imgUrl, //商品分类图片
                comc_status: parseInt(this.comc_status) //状态
              },
              {
                // 设置请求头
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                  token: window.sessionStorage.getItem("token")
                }
              }
            )
            .then(response => {
              console.log(response);
              this.tableData = response.data.data;
              this.dialogTable = false;
              this.$message(response.data.msg);
              this.reload();
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    // 图片上传
    // 上传图片成功
    success(response) {
      console.log(response);
      this.imgUrl = response.newfilepath;
      console.log("hdiofdfjodssjf=" + this.imgUrl);
    },
    // 图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //弹出框数据
    handleChange(value) {
      console.log(value);
    },
    // 分页获取数据
    shuju() {
      // 请求数据
      this.$axios
        .post(
          "/api/sale/queryComc.do",
          {
            page: this.currentPage,
            pagesize: this.pageSize
          },
          {
            // 设置请求头
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log("商品分类");
          console.log(response);
          this.tableData = response.data.data;
          this.count = response.data.count;
          // this.reload();
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
      this.$axios
        .post(
          "/api/sale/searchComc.do",
          {
            comc_name: this.comc_noo,
            page: this.currentPage,
            pagesize: this.pageSize
          },
          {
            // 设置请求头
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response);
          this.tableData = response.data.data;
          console.log(this.tableData);
          this.count = response.data.count;
          this.$message(response.data.msg);
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
    // 修改
    Modify(val) {
      console.log(val);
      this.readonly = true;
      this.dialogTable = true;
      this.a = 1;
      this.vall = val.comc_pname;
      this.comc_name = val.comc_name;
      this.comc_desc = val.comc_desc;
      this.imgUrl = val.comc_img;
      this.comc_status = val.comc_status;
      this.lower = val.lower;
      this.upper = val.upper;
      this.comc_no = val.comc_no;
      this.comc_pno = val.comc_pno;
      console.log("上级分类");
      console.log(this.comc_pno, val.comc_pno);
    },
    // 删除
    Delet(val) {
      // 请求数据
      this.$axios
        .post(
          "/api/sale/delComcs.do",
          {
            comc_nos: [val.comc_no]
          },
          {
            // 设置请求头
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response);
          // this.tableData.splice(val, 1);
          this.reload();
          this.$message(response.data.msg);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 表格复选框
    handleSelectionChange(val) {
      this.disabled = false;
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // // 批量删除
    batchBelete() {
      var ids = [];
      ids = this.multipleSelection.map(item => item.comc_no); //获取所有选中行的id组成的字符串，以逗号分隔
      console.log(ids);
      this.$axios
        .post(
          "/api/sale/delComcs.do",
          {
            comc_nos: ids
          },
          {
            // 设置请求头
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(response => {
          this.$message(response.data.msg);
          this.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted: function() {
    // 请求数据
    // this.shuju()
    // 请求数据
    console.log("请求数据");
    this.$axios
      .post(
        "/api/sale/queryComc.do",
        {
          page: this.currentPage,
          pagesize: this.pageSize
        },
        {
          // 设置请求头
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            token: window.sessionStorage.getItem("token")
          }
        }
      )
      .then(response => {
        console.log("商品分类");
        console.log(response);
        this.tableData = response.data.data;
        this.count = response.data.count;
        // this.reload();
      })
      .catch(err => {
        console.log("8888", err);
      });

      // console.log("下来框数据");
      // this.$axios
      //     .post(
      //         "/api/sale/queryComcXl.do",
      //         {
      //         },
      //         {
      //             // 设置请求头
      //             headers: {
      //                 "Content-Type": "application/json;charset=utf-8",
      //                 token: window.sessionStorage.getItem("token")
      //             }
      //         }
      //     )
      //     .then(response => {
      //         console.log("商品分类");
      //         console.log(response);
      //         this.tabl = response.data.data;
      //         this.count = response.data.count;
      //         // this.reload();
      //     })
      //     .catch(err => {
      //         console.log("8888", err);
      //     });
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
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
