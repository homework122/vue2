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
                              :src=" dataList[0].client_logo"
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
                        <el-image :src="dataList[0].mypost_img"></el-image>
                      </div></div
                  ></el-col>
                </el-row>

                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark">
                    <p>{{dataList[0].mypost_text}}</p>
                  </div></el-col>
                </el-row>
                  <!--留言-->
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark">
                    <div style="height: 200px">
                      <el-row v-for="item in leavemegdata" :key="item.client_name">
                        <el-col :span="24"
                        ><div class="grid-content bg-purple-dark">
                          <el-row :gutter="0">
                            <el-col :span="3"
                            ><div class="grid-content bg-purple">
                              <el-avatar :size="50" :src="item.client_logo"></el-avatar></div
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
                          {{item.leavemeg_text}}
                        </div></el-col
                        >
                      </el-row>
                    </div>
                  </div></el-col>
                </el-row>

            </div></el-col>
          </el-row></div></el-col>

    </el-row>
  </div>
</template>


<script>
export default {
  name: "",
  props: [],

  data: function() {
    return {
      dataList: [],
      leavemegdata:[],
    };
  },
  mounted() {
    console.log(typeof this.$route.query.mypostNo);

    this.$axios
      .post(
        "/api/forum/postDetails.do",
        {
          mypost_no: parseInt(this.$route.query.mypostNo)
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res.data.data);
        this.dataList = res.data.data;
        // console.log(this.dataList);
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

        this.leavemegdata=res.data.data
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped></style>
