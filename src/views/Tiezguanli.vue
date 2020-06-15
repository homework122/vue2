<template>
  <div>
    <!--搜索和发帖-->

    <el-row :gutter="2">
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-select v-model="circle_noVal" placeholder="请选择">
            <el-option
              v-for="item in options_1"
              :key="item.circle_no"
              :label="item.circle_name"
              :value="item.circle_no"
            >
            </el-option>
          </el-select></div
      ></el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-input
            v-model="mypost_titleVal"
            placeholder="帖子主题"
          ></el-input></div
      ></el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-button type="primary" @click="search">搜索</el-button>
        </div></el-col
      >
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-button type="primary" @click="goPosting">
            发帖+
          </el-button>
        </div></el-col
      >
    </el-row>

    <!--表格-->
    <el-table
      :header-cell-style="{ background: '#ADD8E6' }"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="帖子主题" prop="mypost_title"> </el-table-column>
      <el-table-column label="帖子图片" prop="mypost_img">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.mypost_img"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="posttype_name"> </el-table-column>
      <el-table-column label="所在圈子" prop="circle_name"> </el-table-column>
      <el-table-column label="作者" prop="client_name"> </el-table-column>
      <el-table-column label="回复/查看" prop="mypost_megsum">
      </el-table-column>

      <el-table-column label="操作" width="220" align="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini "
            @click="handleEdit(scope.$index, scope.row)"
            >修改
          </el-button>
          <!--修改的弹出框-->
          <el-dialog id="form" title="" :visible.sync="onxiugai">
            <el-form :model="formxiugai">
              <el-form-item label="主题" :label-width="formLabelWidth">
                <el-input
                  style="width: 220px"
                  v-model="formxiugai.mypost_title"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="类别" :label-width="formLabelWidth">
                <el-select
                  v-model="formxiugai.posttype_name"
                  placeholder="选择类型"
                >
                  <el-option
                    v-for="item in options_1"
                    :key="item.circle_no"
                    :label="item.circle_name"
                    :value="item.circle_no"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="作者" :label-width="formLabelWidth">
                <el-input
                  style="width: 220px"
                  v-model="formxiugai.client_name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>

            <div v-if="false" id="imgdiv">
              <el-upload
                action="/api/uploadfile.do"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="success"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="ImgdialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="onxiugai = false">取 消</el-button>
              <el-button type="primary" @click="onxiugai = false"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <el-button
            style="margin-left: 3px"
            size="mini "
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button
            style="margin-left: 3px"
            size="mini "
            type="primary"
            @click="detailEvent(scope.$index, scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Tiezguanli",
  data() {
    return {
      circle_noVal: "",
      mypost_titleVal: "",
      options_1: "",

      // 修改
      onxiugai: false,
      formxiugai: {
        mypost_title: "", //帖子主题
        posttype_name: "", //类型名
        client_name: "" //作者名
      },
      formLabelWidth: "120px",
      tableData: [],
      // 分页
      currentPage: 1,
      pageSize: 5,
      total: 0,

      // 图片
      dialogImageUrl: "",
      ImgdialogVisible: false
    };
  },
  methods: {
    /*删除*/
    handleDelete(index, row) {
      this.$axios
        .post(
          "/api/forum/postDel.do",
          {
            mypost_no: row.mypost_no
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索
    search() {
      this.$axios
        .post(
          "/api/forum/postSearch.do",
          {
            mypost_title: this.mypost_titleVal,
            circle_no: this.circle_noVal,
            page: 1,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    },

    onSubmit() {
      console.log("submit!");
    },

    // 修改
    handleEdit(index, row) {
      this.onxiugai = true;
      console.log(row);
      for (var key in this.formxiugai) {
        this.formxiugai[key] = row[key];
      }
    },
    dialogFormVisible() {
      console.log("11");
    },
    // 分页
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.$axios
        .post(
          "/api/forum/postShow.do",
          {
            page: this.currentPage,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$axios
        .post(
          "/api/forum/postShow.do",
          {
            page: this.currentPage,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    },

    // 图片
    // 上传图片成功
    success(response) {
      console.log(response);
    },
    // 图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.ImdialogVisible = true;
    },

    // 发帖
    goPosting() {
      this.$router.push("/home/Posting");
    },

    // 跳转到详情页
    detailEvent(index, row) {
      console.log(index, row);

      this.$router.push({
        path: "/home/Tiezguanli/PostDetails",
        query: { mypostNo: row.mypost_no }
      });
    }
  },
  mounted() {
    this.$axios
      .post("/api/forum/circleShow.do", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.options_1 = res.data.data;
        this.options_1.unshift({
          circle_no: "",
          circle_name: "全部"
        });
      });

    this.$axios
      .post(
        "/api/forum/postShow.do",
        {
          page: this.currentPage,
          pageSize: this.pageSize
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.count;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#form .el-form-item__content .el-select {
  left: -300px;
}
#form .el-form-item .el-input {
  left: -300px;
}

#imgdiv {
  position: absolute;
  right: 60px;
  top: 60px;
}
</style>
