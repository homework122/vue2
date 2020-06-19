<!--  -->
<template>
  <div>
    <div class="head404"></div>

    <div class="txtbg404">
      <div class="txtbox">
        <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>

        <p style="font-size:20px" class="paddingbox">
          请点击以下链接继续浏览网页或联系管理员
        </p>

        <div class="home">
          <button style="cursor:pointer" @click="home">返回网站首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted: function() {},

  methods: {
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/home");
    }
  }
};
</script>
<style scoped>
.home {
  margin: 10px auto;
  width: 300px;
}

button {
  width: 120px;
  height: 32px;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 15px;
  background-color: #ec9b28;
  color: white;
  margin-left: 25%;
  margin-top: 20px;
  font-size: 15px;
}
.head404 {
  width: 580px;
  height: 234px;
  margin: 50px auto 0 auto;
  background: url(https://www.daixiaorui.com/Public/images/head404.png)
    no-repeat;
}

.txtbg404 {
  width: 499px;
  height: 169px;
  margin: 10px auto 0 auto;
  background: url(https://www.daixiaorui.com/Public/images/txtbg404.png)
    no-repeat;
}

.txtbg404 .txtbox {
  width: 390px;
  position: relative;
  top: 30px;
  left: 60px;
  color: #eee;
  font-size: 13px;
}

.txtbg404 .txtbox p {
  margin: 5px 0;
  line-height: 18px;
}

.txtbg404 .txtbox .paddingbox {
  padding-top: 15px;
}

.txtbg404 .txtbox p a {
  color: #eee;
  text-decoration: none;
}

.txtbg404 .txtbox p a:hover {
  color: #fc9d1d;
  text-decoration: underline;
}
</style>
