<!-- 进行中 -->
<template>
    <div>
        <el-container>
            <el-header>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="通用券" name="first"></el-tab-pane>
                    <el-tab-pane label="单品券" name="second"> </el-tab-pane>
                    <el-tab-pane label="运费券" name="third"></el-tab-pane>
                    <el-tab-pane label="品类券" name="fourth"></el-tab-pane>
                </el-tabs>
            </el-header>
            <router-view></router-view>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: "first"
            };
        },
        created() {
            this.activeName = this.$route.name;
        },

        methods: {
            handleClick() {
                if (this.activeName == "first") {
                    this.$router.push("/home/release/GeneralTicket");
                }
                if (this.activeName == "second") {
                    this.$router.push("/home/release/SingleTickrt");
                }
                if (this.activeName == "third") {
                    this.$router.push("/home/release/FreightTicket");
                }
                if (this.activeName == "fourth") {
                    this.$router.push("/home/release/CategoryTicket");
                }
                // if (this.activeName == "second") {
                //
                // if (this.activeName == "third") {
                //
                // }
                // if (this.activeName == "fourth") {
                //
                // }
            }
        }
    };
</script>
<style scoped></style>
