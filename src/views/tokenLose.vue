<!--  -->
<template>
  <div>
  <div class="lose">  <h3>
      登录状态已过期，请重新登录
    </h3>
    <button @click="home">点我回登录页</button></div>
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
    home() {
      this.$router.push("/Login");
    }
  }
};
</script>
<style scoped>
.lose{
  margin: 15% auto;
  width: 300px;  
  height: 200px;
}
h3{
text-align: center;
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
</style>
