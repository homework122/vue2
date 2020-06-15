<template>
  <div style="margin-left: 30px;margin-top: 10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/Tiezguanli' }"
        >帖子管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>帖子详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-row style="margin: 10px 0 20px">
            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">
                来自 <span>圈子1</span>
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">
                <!--                用户信息-->
                <el-row>
                  <el-col :span="24"
                    ><div class="grid-content bg-purple-dark">
                      <el-row :gutter="0">
                        <el-col :span="3"
                          ><div class="grid-content bg-purple">
                            <el-avatar
                              :size="50"
                              :src="circleUrl"
                            ></el-avatar></div
                        ></el-col>
                        <el-col style="margin-left: -10px" :span="3" :offset="6"
                          ><div class="grid-content bg-purple">
                            <p>{{ dataList[0].client_name }}</p>
                          </div></el-col
                        >
                      </el-row>
                    </div></el-col
                  >
                </el-row>
                <!--                标题-->
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
                        <span class="demonstration">默认</span>
                        <el-image :src="ImgSrc"></el-image>
                      </div></div
                  ></el-col>
                </el-row></div
            ></el-col>
          </el-row></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">
          <div style="background: #90ade5;height: 444px">
            <el-row>
              <el-col :span="24"
                ><div class="grid-content bg-purple-dark">
                  <el-row :gutter="0">
                    <el-col :span="3"
                      ><div class="grid-content bg-purple">
                        <el-avatar :size="50" :src="circleUrl"></el-avatar></div
                    ></el-col>
                    <el-col style="margin-left: 22px" :span="3" :offset="6"
                      ><div class="grid-content bg-purple">
                        <p>{{ dataList[0].client_name }}</p>
                      </div></el-col
                    >
                  </el-row>
                </div></el-col
              >
              <el-col :span="24"
                ><div class="grid-content bg-purple-dark">
                  <p>fsdfsfsgfdgdfgdfgdfg</p>
                </div></el-col
              >
            </el-row>
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "",
  props: [],

  data: function() {
    return {
      dataList: []
    };
  },
  mounted() {
    console.log(this.$route.query.mypostNo);

    this.$axios
      .post(
        "/api/forum/postDetails.do",
        {
          mypost_no: this.$route.query.mypostNo
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        this.dataList = res.data.data;
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
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped></style>
