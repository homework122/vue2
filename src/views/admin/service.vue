<!--  -->
<template>
<div>
    <el-container>
    <el-header>
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已开通区域" name="first"></el-tab-pane>
        <el-tab-pane label="设置电子围栏" name="two"> </el-tab-pane>
        </el-tabs>
    </el-header>
    <el-main><router-view></router-view></el-main>
    </el-container>
</div>
</template>

<script>
export default {
data() {
    return {
    activeName: "frist",
    remind_no: 1
    };
},

components: {},

computed: {},

mounted: function() {},
created() {
    this.activeName = this.$route.name;
},
methods: {
    handleClick(tab) {
    console.log(tab.name);
    if (this.activeName == "first") {
        this.remind_no = 1;
        this.$router.push({
        path: "/home/service/s-list",
        query: { remind_no: this.remind_no }
        });
    }
    if (this.activeName == "two") {
        this.remind_no = 2;
        this.$router.push({
        path: "/home/service/s-new",
        query: { remind_no: this.remind_no }
        });
    }
    }
}
};
</script>
<style scoped>
div {
margin: 0;
}
</style>
