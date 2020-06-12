<template>
    <div>
        <!--订单区分-->
        <el-row :gutter="20">
            <el-col :span="2">
                <div class="grid-content bg-purple" :class="{grid:ok}">
                    近三个月订单
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    等待买家付款
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    买家已付款
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    等待买家收货
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    退款中
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    交易成功
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    交易关闭
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    三个月前订单
                </div>
            </el-col>
        </el-row>
        <!--分割线-->
        <el-divider class="margin"></el-divider>
        <!--搜索-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
    export default {
        name: 'order',
        data() {
            return {
                //    状态区分
                ok: false,
            //    搜索值
                formInline: {
                    user: '',
                    region: ''
                }
            }

        },
        models:{
            //查询按钮
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>


<style scoped>
    .margin {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .bg-purple {
        /*background: #d3dce6;*/
    }

    .grid-content {
        text-align: center;
        min-height: 36px;

    }

    .grid-content:hover {
        border-bottom: 3px solid steelblue;
    }

    grid {
        border-bottom: 3px solid steelblue;
    }

</style>    