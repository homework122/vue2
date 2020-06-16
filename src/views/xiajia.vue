<template>
    <div class="bg">
        <!--查询-->
        <el-input
                size="small"
                class="input"
                placeholder="请输入分类名称"
                v-model="stan_name"
                maxlength="30"
                clearable
        >
        </el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="query()"
        >查询
        </el-button>
        <div>
            <!--新增-->
            <el-button
                    type="primary"
                    icon="el-icon-plus"
                    class="margin"
                    size="small"
                    @click="add()"
            >新增
            </el-button>
        </div>
        <!--发布弹出框-->
        <div>
            <!--发布弹出框-->
            <el-dialog
                    title="商品规格"
                    :visible="dialogTableVisible"
                    width="100%"
                    :fullscreen="true"
                    top="0"
                    :destroy-on-close='true'

            >
                <el-row>
                    <el-col :span="24">
                        <template>
                            <el-form :label-position="labelPosition" label-width="80px" :model="tanchuang">
                                <p>1.选择商品分类</p>
                                <!--分类下拉列表-->
                                <el-form-item label="分类名称">
                                    <el-select v-model="val" clearable placeholder="分类名称" style="width: 300px">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button @click="newClassification()" style="margin-left: 30px">新增分类</el-button>
                                </el-form-item>
                                <!--分类新增弹出框-->
                                <div>
                                    <!--分类新增弹出框-->
                                    <el-dialog
                                            title="商品分类"
                                            :visible.sync="dialogTable"
                                            width="60%"
                                            append-to-body
                                    >
                                        <el-row >
                                            <el-col :span="14">
                                                <div class="grid-content bg-purple">
                                                    <el-form-item label="上级分类:" style="width: 300px">
                                                        <template>
                                                            <el-select v-model="val" style="width: 300px" clearable placeholder="上级分类名称" >
                                                                <el-option
                                                                        v-for="item in options"
                                                                        :key="item.value"
                                                                        :label="item.label"
                                                                        :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                        </template>
                                                    </el-form-item>
                                                    <div>
                                                        <el-form-item label="分类名称:" style="width: 200px">
                                                            <el-input placeholder="分类名称" style="width: 300px" v-model="comc_name" clearable
                                                                      class="width"></el-input>
                                                        </el-form-item>
                                                    </div>
                                                    <div class="center">
                                                        <el-form-item label="分类描述:" style="width: 200px">
                                                            <textarea name="maosu" id="" cols="40" rows="15"
                                                                      v-model="comc_desc" placeholder="分类描述"></textarea>
                                                        </el-form-item>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="10">
                                                <!--图片上传-->
                                                <el-form-item label="商品图片" style="width: 200px">
                                                    <el-upload
                                                            action="/api/uploadfile.do"
                                                            auto-upload
                                                            list-type="picture-card"
                                                            :on-preview="handlePictureCardPreview"
                                                            :on-success="success"
                                                            :on-remove="handleRemove">
                                                        <i class="el-icon-plus"></i>
                                                    </el-upload>
                                                    <el-dialog :visible.sync="dialogVisible">
                                                        <img width="100%" :src="dialogImageUrl" alt="">
                                                    </el-dialog>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="dialogTable= false">取 消</el-button>
                                            <el-button type="primary" @click="determine"
                                            >确 定
                                            </el-button
                                            >
                                        </div>
                                    </el-dialog>
                                </div>
                                <el-form-item label="商品标签">
                                    <el-input placeholder="商品标签" style="width: 300px" clearable v-model="biaoqian"></el-input>
                                </el-form-item>
                                <p>
                                    2.商品基本信息
                                </p>
                                <el-form-item label="商品标题">
                                    <el-input
                                            type="text"
                                            clearable
                                            placeholder="请输入内容"
                                            v-model="biaoti"
                                            maxlength="20"
                                            show-word-limit
                                            style="width: 300px">
                                    </el-input><el-button @click="Quick" style="margin-left: 30px">产品库快捷添加</el-button>

                                </el-form-item>
                                <p>
                                    使用产品库快捷添加商品基本信息,从此添加商品不在困扰!
                                </p>
                                <el-form-item label="规格参数">
                                </el-form-item>
                                <el-table :data="tabledatas" border  :header-cell-style="tableHeader">
                                    <el-table-column label="规格">
                                        <template slot-scope="scope">
                                            <el-input placeholder="请输入规格" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                                            <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="出售价">
                                        <template slot-scope="scope">
                                            <el-input placeholder="请输入出售价" v-show="scope.row.show" v-model="scope.row.tab2"></el-input>
                                            <span v-show="!scope.row.show">{{scope.row.tab2}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="原价">
                                        <template slot-scope="scope">
                                            <el-input placeholder="请输入原价" v-show="scope.row.show" v-model="scope.row.tab3"></el-input>
                                            <span v-show="!scope.row.show">{{scope.row.tab3}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="库存">
                                        <template slot-scope="scope">
                                            <el-input placeholder="请输入库存" v-show="scope.row.show" v-model="scope.row.tab4"></el-input>
                                            <span v-show="!scope.row.show">{{scope.row.tab4}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="重量/件（个）">
                                        <template slot-scope="scope">
                                            <el-input placeholder="请输入重量" v-show="scope.row.show" v-model="scope.row.tab5"></el-input>
                                            <span v-show="!scope.row.show">{{scope.row.tab5}}</span>
                                            <!--<el-select v-model="scope.row.tab5" v-show="scope.row.show" placeholder="请选择">-->
                                            <!--<el-option label="KG" :value=1>KG</el-option>-->
                                            <!--<el-option label="件" :value=0>件</el-option>-->
                                            <!--</el-select>-->
                                            <!--<span v-show="!scope.row.show" v-if="scope.row.tab5==1">KG</span>-->
                                            <!--<span v-show="!scope.row.show" v-if="scope.row.tab5==0">件</span>-->
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button @click="scope.row.show =true" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
                                            <el-button @click="scope.row.show =false" type="success" icon="el-icon-check" size="mini" circle></el-button>
                                            <el-button @click="add2()" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
                                            <el-button @click="shan(scope.row )" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <p>
                                    限制最大可添加6个规格
                                </p>
                                <p>
                                    上传图片的最佳尺寸: 720像素*720像素, 其他尺寸会影响页效果，格式png，jpeg，jipg，gif.大小不超过2M，商品图片-一共可
                                    以上传5张，默认第一张为主图封面
                                </p>
                                <!--图片上传-->
                                <!--
                                 auto-upload// 自动上传
                                   list-type="picture-card" // 图片显示列表的样式
                                     :on-success="success"//上传成功返回相应信息
                                     :on-remove="handleRemove">// 移除图片事件
                                -->
                                <el-form-item label="商品图片">
                                    <el-upload
                                            action="/api/uploadfile.do"
                                            auto-upload
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-success="success"
                                            :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </el-form-item>
                                <el-form-item label="商品描述">
                                    <fuwenben></fuwenben>
                                </el-form-item>
                                <!--分割线-->
                                <el-divider class="margin"></el-divider>
                                <p>
                                    3.配送服务
                                </p>
                                <el-form-item label="拆单属性">
                                    <template>
                                        <el-radio v-model="radio" label="1">普通商品</el-radio>
                                        <br>
                                        <el-radio v-model="radio" label="2">单独配送商品:特殊商品需要独立配送，提交订单时该商品分包裹单独计算邮费。</el-radio>
                                        <br>
                                        <el-radio v-model="radio" label="3">同城即时达:即时性商品，提交订单时此类商品分包裹单独计算邮费,仅支持同城配送(建议生鲜、快餐食品等商品使用该属性)。</el-radio>
                                    </template>
                                </el-form-item>
                                <el-form-item label="配送模板">
                                    <template>
                                        <el-select v-model="valu" clearable placeholder="请选择">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <el-button @click="moban" style="margin-left:30px;">新增模板</el-button>
                                </el-form-item>
                                <el-form-item label="">
                                    <div>
                                        <el-button>同城配送</el-button>
                                        <el-button>快速物流</el-button>
                                        <p>
                                            默认运费: 1件10.00， 每增加1件，加2.00元
                                        </p>
                                        <hr>
                                        <p>
                                            指定区域运费 <br>
                                        </p>
                                        <p>
                                            香港、澳门、台湾1件内35.001每增加1件加12.00元
                                        </p>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit"
                    >确 定
                    </el-button
                    >
                </div>
            </el-dialog>
        </div>


        <!--表格-->
        <template>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%; "
                    :header-cell-style="tableHeaderColor"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="com_no" label="商品编号" width="">
                </el-table-column>
                <el-table-column prop="comc_no" label="商品分类编号" width="">
                </el-table-column>
                <el-table-column prop="com_name" label="商品名称" width="">
                </el-table-column>
                <el-table-column
                        prop="com_imgs"
                        label="商品图片地址"
                        width="150">
                    <template slot-scope="scope">
                        <el-image style="width: 100px;height: 100px" :src="scope.row.com_imgs"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="com_piecework" label="配送方式" width="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.com_piecework == 0">普通</span>
                        <span v-if="scope.row.com_piecework == 1">单独配送</span>
                        <span v-if="scope.row.com_piecework == 2">同城即时达</span>
                    </template>
                </el-table-column>
                <el-table-column prop="com_disttno" label="配送模板" width="">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button
                                @click="Modify(scope.row)"
                                size="mini"
                                type="primary"
                                icon="el-icon-edit"
                        ></el-button>
                        <el-button
                                @click="Delete(scope.row)"
                                size="mini"
                                type="danger"
                                icon="el-icon-delete"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--分页-->
        <div class="block">
            <el-pagination
                    v-show="show"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    background
                    :page-sizes="[3, 6, 10, 15,20]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import fuwenben from '../components/fuwenben.vue'
    export default {
        name: 'goods',
        data() {
            return {


                true:true,
                //图片上传
                dialogImageUrl: '',
                dialogVisible: false,
                imgUrl:'',//图片上传成功后接收的地址

                ok: false,
                a: '',
                show: true,
                // 总条数
                count: 1,
                // 当前页
                currentPage: 1,
                // 显示条数
                pageSize: 5,
                //查询名称
                stan_name: "",
                com_no: '',// 商品编号
                comc_no: '',// 商品分类编号
                com_name: '',//  商品名称
                com_imgs: '',// 商品图片地址
                com_desc: '',//商品详情
                standards: '',//  规格
                com_piecework: '',//分件 Piecework 0：普通，1：单独配送，2：同城即时达
                com_disttno: '',//  配送模板Distribution template
                // 图片上传
                imageUrl: "",
                //  弹出框,
                value: [],
                options: [{
                    value: 1,
                    label: '黄金糕'
                }, {
                    value: 2,
                    label: '双皮奶'
                }, {
                    value: 3,
                    label: '蚵仔煎'
                }, {
                    value: 4,
                    label: '龙须面'
                }, {
                    value: 5,
                    label: '北京烤鸭'
                }],
                val: '',
                // 新增商品分类
                dialogTable: false,
                // 发布商品
                dialogTableVisible: false,
                //    批量删除
                disabled: true,
                //    表格假数据
                tableData: [{
                    com_no: 6,// 商品编号
                    comc_no: 9999999999999999999999999,// 商品分类编号
                    com_name: '888888888888888888888888',//  商品名称
                    com_imgs: '',// 商品图片地址
                    com_desc: '414',//商品详情
                    standards: '424',//  规格
                    com_piecework: '24',//分件 Piecework 0：普通，1：单独配送，2：同城即时达
                    com_disttno: '42'//  配送模板Distribution template
                }],
                multipleSelection: [],
                table:[{
                    stan_name:'',// 规格名称
                    stan_price:'',//出售价
                    stan_pprice:'',//原价
                    stan_stock:'',
                    stan_company:''
                }],
                tabledatas: [
                    { com_no: '', //商品编码
                        stan_name: '',//名称
                        tab3: '',
                        tab4: '',
                        tab5: '',
                        show:true}
                ],
                //发布弹出框的数组
                tanchuang:{
                    val:'',
                    biaoqian:'',
                    biaoti:'',
                    radio:'', // 拆弹属性
                    valu:'',//配送费模板
                }
            }
        },
        methods: {
            // 修改table header的背景色
            tableHeader({rowIndex}) {
                if (rowIndex === 0) {
                    return "text-align:center;height:60px";
                }
            },
            // 发布规格表添加
            add2() {
                // console.log(val)
                console.log(265959)
                this.tabledatas.push(
                    { tab1: '', tab2: '',tab3: '',tab4: '',tab5: '',show:true}
                )
            },
            //删除
            shan(val) {
                console.log(val)

                if(this.tabledatas.length>1){
                    this.tabledatas.splice(val,1)
                }
            },

            // 新增提交
            determine() {
                this.dialogTable = false

            },
            //新增分类
            newClassification() {
                this.dialogTable = true
            },
            //提交信息
            submit() {
                this.dialogTableVisible = false;
                console.log(this.val)
                if (!this.a === 1) {
                    console.log(this.a)
                } else if (this.a === 1) {
                    //修改数据
                    this.$axios.post('/api/sale/editCommodity.do', {
                        com_no: this.com_no,
                        comc_no: this.comc_no,
                        com_name: this.com_name,
                        com_imgs: this.com_imgs,
                        com_desc: this.com_desc,
                        standards: this.standards,
                        com_piecework: this.com_piecework,
                        com_disttno: this.com_disttno
                    }, {
                        // 设置请求头
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        console.log(response)
                        this.tableData = response.data.data
                        this.count = response.data.count
                        // console.log(typeof response.data)
                        // this.count = response.data.data
                        // console.log(this.count)
                    }).catch((err) => {
                        console.log(err)
                    })
                }

            },
            // 图片上传
            // 上传图片成功
            success(response){
                console.log(response)
                this.imgUrl = response.newfilepath

            },
            // 图片移除
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }, //弹出框数据
            handleChange(value) {
                console.log(value);
            },
            // 分页获取数据
            shuju() {
                this.$axios.post('/api/sale/queryComc.do', {
                    page: this.currentPage,
                    limit: this.pageSize
                }, {
                    // 设置请求头
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response)
                    this.tableData = response.data.data
                    this.count = response.data.count
                    // console.log(typeof response.data)
                    // this.count = response.data.data
                    // console.log(this.count)
                }).catch((err) => {
                    console.log(err)
                })
            },
            // 每页显示条数
            handleSizeChange(val) {
                this.pageSize = val
                this.shuju()
            },
            // 分页
            handleCurrentChange(pag) {
                console.log(pag)
                this.currentPage = pag
                this.shuju()
            },
            // 查询
            query() {
                // 请求数据
                this.$axios.post('/api/sale/searchCom.do', {
                        page: this.currentPage,
                        limit: this.pageSize,
                        comc_name: this.comc_name
                    },
                    {
                        // 设置请求头
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                    console.log(response.data.data.list)
                    this.tableData = response.data.data
                    this.count = response.data.data.count
                    if (this.count === '') {
                        this.show = false
                    }
                }).catch((err) => {
                    console.log(err)
                })
                // for(var i=0;i<this.tableData.length;i++) {
                //     if (this.tableData[i].comc_name.indexOf(this.stan_name)>=0) {
                //         this.tableDatap.push(this.tableData[i])
                //     }else{
                //         this.$message('没有数据');
                //     }
                // }
            },
            // 修改table header的背景色
            tableHeaderColor({rowIndex}) {
                if (rowIndex === 0) {
                    return "background-color: #90ADE5;color: #fff;font-weight:500;height:60px";
                }
            },
            // 批量删除
            batchBelete() {
                for (var i = 0; this.multipleSelection.length; i++) {
                    console.log(12334566);
                    console.log(this.multipleSelection[i]);

                    this.tableData.splice(this.multipleSelection[i], 1);
                    this.$message("删除成功");
                    this.disabled = true;
                }
            },
            // 表格复选框
            handleSelectionChange(val) {
                this.disabled = false;
                this.multipleSelection = val;
                console.log(val);
            },
            //新增
            add() {
                this.dialogTableVisible = true
                // this.options.lable=this.tableData.comc_name
                this.options.push({lable: 'this.tableData.comc_name', value: this.tableData.comc_no})
                // this.options.value=this.tableData.comc_no
                console.log(this.options)
                console.log(this.tableData[0].comc_no)
            },
            // 修改
            Modify(val) {
                this.a = 1
                console.log(val);
                this.dialogTableVisible = true
                // this.options=val
                this.val = val.comc_no
                this.text = val.comc_name
                this.maosu = val.comc_desc
                this.imageUrl = val.comc_img
                console.log(this.val)
            },
            // 删除
            Delete(val) {
                this.tableData.splice(val, 1);
                if (this.tableData.length === 0) {
                    this.count = 0
                }
            }
        },
        mounted: function () {
            // 请求数据
            this.$axios.post('/api/sale/queryCom.do', {
                    page: this.currentPage,
                    limit: this.pageSize
                },
                {
                    // 设置请求头
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                console.log(response.data.data.list)
                this.tableData = response.data.data
                this.count = response.data.data.count
            }).catch((err) => {
                console.log(err)
            })
        },
        components: {
            fuwenben
        }
    }
</script>


<style scoped>
    .width1{
        width: 1000px;
    }
    .margin {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .center {
        height: 200px;
        width: 300px;
    }

    .center input {
        margin-top: 20px;
    }

    .width {
        width: 150px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .bg {
        background-color: ghostwhite;
        margin: 0;
        padding: 10px;
        height: 1200px;
    }

    .input {
        width: 200px;
        margin-right: 50px;
    }
    p{
        color: #949494;
        font-size: 15px;
    }
</style>