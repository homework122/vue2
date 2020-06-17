<!--  -->
<template>
  <div>
    {{ this.user.user_name }}
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
export default {
  inject: ["reload"],
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState(["user"]),
    ...mapMutations(["usermsg"])
  },

  mounted: function() {
    this.getnew();
  },

  methods: {
    getnew() {
      var that = this;
      this.$axios
        .post(
          "/api/sys/mgr/showKeyEmpInfoAbs.do",
          {
            userName: this.user.user_name,
            page: 1,
            pageSize: 1
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res);
          that.$store.commit("usermsg", JSON.stringify(res.data.data));
          this.userList = res.data.data;
          console.log(this.userList);
        });
    }
  }
};
</script>
<style scoped></style>
