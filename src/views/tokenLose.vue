<!--  -->
<template>
  <div>
    <h3>
        登录状态已过期，重新登录
    </h3>
    <button @click="home">点我回登录页</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted:function () {
  },

  methods: {
      home(){
        this.$router.push("/Login")
      }
  }
}

</script>
<style  scoped>
button{
    width: 120px;
    height: 32px;
    text-align: center;
    border: none;
    outline: none;
    border-radius: 15px;
    background-color: #EC9B28;
    color: white;
    margin-left: 25%;
    margin-top: 20px;
    font-size: 15px;
}
</style>