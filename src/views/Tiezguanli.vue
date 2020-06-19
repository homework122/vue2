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
          <el-button type="primary" size="small" @click="search"
            >搜索</el-button
          >
        </div></el-col
      >
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-button type="primary" @click="goPosting" size="small">
            发帖+
          </el-button>
        </div></el-col
      >
    </el-row>

    <!--表格-->
    <el-table
      :header-cell-style="{background:'#96C9FF',color:'#606266'  }"
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

    <!--    详情显示-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <div v-if="isdata">
        <el-row>
          <el-col :span="14"
            ><div class="grid-content bg-purple">
              <!--                用户信息-->
              <el-row>
                <el-col :span="24"
                  ><div class="grid-content bg-purple-dark">
                    <el-row :gutter="0">
                      <el-col :span="3"
                        ><div class="grid-content bg-purple">
                          <el-avatar
                            :size="50"
                            :src="dataList[0].client_logo"
                          ></el-avatar></div
                      ></el-col>
                      <el-col style="margin-left: 20px" :span="3" :offset="6"
                        ><div class="grid-content bg-purple">
                          <p style="font-size: 18px; line-height: 10px">
                            {{ dataList[0].client_name }}
                          </p>
                        </div></el-col
                      >
                    </el-row>
                  </div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="24"
                  ><div class="grid-content bg-purple-dark">
                    <h3>{{ dataList[0].mypost_title }}</h3>
                  </div></el-col
                >
              </el-row>
              <!--                图片-->
              <el-row>
                <el-col :span="24"
                  ><div class="grid-content bg-purple-dark">
                    <div class="block">
                      <el-image
                        style="width: 130px"
                        :src="dataList[0].mypost_img"
                      ></el-image>
                    </div></div
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"
                  ><div class="grid-content bg-purple-dark">
                    <p>{{ dataList[0].mypost_text }}</p>
                  </div></el-col
                >
              </el-row>
            </div></el-col
          >
          <el-col :span="10"
            ><div class="grid-content bg-purple-light">
              <div id="wrap" style="height: 300px">
                <el-row v-for="item in leavemegdata" :key="item.client_name">
                  <el-col :span="24"
                    ><div class="grid-content bg-purple-dark">
                      <el-row :gutter="0">
                        <el-col :span="3"
                          ><div class="grid-content bg-purple">
                            <el-avatar
                              :size="50"
                              :src="item.client_logo"
                            ></el-avatar></div
                        ></el-col>
                        <el-col style="margin-left: 22px" :span="3" :offset="6"
                          ><div class="grid-content bg-purple">
                            <p>{{ item.client_name }}</p>
                          </div></el-col
                        >
                      </el-row>
                    </div></el-col
                  >
                  <el-col :span="24"
                    ><div class="grid-content bg-purple-dark">
                      {{ item.leavemeg_text }}
                    </div></el-col
                  >
                </el-row>
              </div>
            </div></el-col
          >
        </el-row>
      </div>

      <el-button @click="dialogVisible = false">返回</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Tiezguanli",
  inject: ["reload"],
  data() {
    return {
      circle_noVal: "",
      mypost_titleVal: "",
      options_1: "",
      formLabelWidth: "120px",
      tableData: [],
      // 分页
      currentPage: 1,
      pageSize: 5,
      total: 0,

      // 图片
      dialogImageUrl: "",
      ImgdialogVisible: false,

      // 弹框
      dialogVisible: false,
      // 帖子详情
      dataList: [],
      leavemegdata: [],
      isdata: false
    };
  },
  methods: {
    // 弹框

    /*删除*/
    handleDelete(index, row) {
      console.log(row.mypost_no);
      this.$axios
        .post(
          "/api/forum/postDel.do",
          {
            mypost_no: row.mypost_no
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
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
                    "Content-Type": "application/json",
                    token: sessionStorage.getItem("token")
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
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
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
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
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
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    },

    // 发帖
    goPosting() {
      this.$router.push("/home/Posting");
    },

    // 详情页
    detailEvent(index, row) {
      console.log(index, row);
      this.dialogVisible = true;

      this.$axios
        .post(
          "/api/forum/postDetails.do",
          {
            mypost_no: parseInt(row.mypost_no)
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          // console.log(res.data.data);
          this.dataList = res.data.data;
          this.isdata = true;
        })
        .catch(err => {
          console.log(err);
        });

      // 留言
      this.$axios
        .post(
          "/api/forum/showleavemeg.do",
          {
            mypost_no: this.$route.query.mypostNo
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log(res);

          this.leavemegdata = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });

      // this.$router.push({
      //   path: "/home/Tiezguanli/PostDetails",
      //   query: { mypostNo: row.mypost_no }
      // });
    }
  },
  mounted() {
    this.$axios
      .post("/api/forum/circleShow.do", {
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token")
        }
      })
      .then(res => {
        this.options_1 = res.data.data;
        this.options_1.unshift({
          circle_no: 0,
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
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token")
          }
        }
      )
      .then(res => {
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
#wrap {
  overflow: scroll;
}
</style>
