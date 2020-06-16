<template>
    <div class="bg">
        <!--查询-->
        <el-input
                size="small"
                class="input"
                placeholder="请输入分类名称"
                v-model="comc_namee"
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
                    top="0"
                    :destroy-on-close='true'
            >
                <el-row>
                    <el-col :span="24">

                        <el-form label-width="80px">
                            <p>1.选择商品分类</p>
                            <!--分类下拉列表-->
                            <el-form-item label="分类名称">
                                <el-select v-model="vall" style="width:300px" placeholder="分类名称">
                                    <el-option v-for="item in options" track-by="$index"
                                               :key="item.comc_no"
                                               :label="item.comc_name"
                                               :value="item.comc_no">
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
                                    <el-row>
                                        <el-col :span="14">
                                            <el-form>
                                                <div class="grid-content bg-purple">
                                                    <el-form-item label="上级分类:" style="width: 300px">
                                                        <template>
                                                            <el-select v-model="shanji" style="width: 300px" clearable
                                                                       placeholder="上级分类名称">
                                                                <el-option
                                                                        v-for="item in options"
                                                                        :key="item.comc_pno"
                                                                        :label="item.comc_pname"
                                                                        :value="item.comc_pno">
                                                                </el-option>
                                                            </el-select>
                                                        </template>
                                                    </el-form-item>
                                                    <div>
                                                        <el-form-item label="分类名称:" style="width: 200px">
                                                            <el-input placeholder="分类名称" style="width: 300px"
                                                                      v-model="comc_name" clearable
                                                                      class="width"></el-input>
                                                        </el-form-item>
                                                    </div>
                                                    <div class="center">
                                                        <el-form-item label="分类描述:" style="width: 200px">
                                                            <textarea cols="40" rows="15"
                                                                      v-model="comc_desc" placeholder="分类描述"></textarea>
                                                        </el-form-item>
                                                    </div>
                                                </div>
                                            </el-form>
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
                                <el-input placeholder="商品标签" style="width: 300px" clearable
                                          v-model="biaoqian"></el-input>
                            </el-form-item>
                            <p>
                                2.商品基本信息
                            </p>
                            <el-button @click="Quick" style="margin-left: 30px">产品库快捷添加</el-button>
                            <p>
                                使用产品库快捷添加商品基本信息,从此添加商品不在困扰!
                            </p>

                            <el-form-item label="规格参数">
                            </el-form-item>
                            <el-table :data="tabledatas" border :header-cell-style="tableHeader">
                                <el-table-column label="规格">
                                    <template slot-scope="scope">
                                        <el-input placeholder="请输入规格" v-show="scope.row.show"
                                                  v-model="scope.row.stan_name"></el-input>
                                        <span v-show="!scope.row.show">{{scope.row.stan_name}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="出售价">
                                    <template slot-scope="scope">
                                        <el-input placeholder="请输入出售价" v-show="scope.row.show"
                                                  v-model="scope.row.stan_price"></el-input>
                                        <span v-show="!scope.row.show">{{scope.row.stan_price}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="原价">
                                    <template slot-scope="scope">
                                        <el-input placeholder="请输入原价" v-show="scope.row.show"
                                                  v-model="scope.row.stan_pprice"></el-input>
                                        <span v-show="!scope.row.show">{{scope.row.stan_pprice}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="库存">
                                    <template slot-scope="scope">
                                        <el-input placeholder="请输入库存" v-show="scope.row.show"
                                                  v-model="scope.row.stan_stock"></el-input>
                                        <span v-show="!scope.row.show">{{scope.row.stan_stock}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="重量">
                                    <template slot-scope="scope">
                                        <el-input placeholder="请输入重量" v-show="scope.row.show"
                                                  v-model="scope.row.stan_weight"></el-input>
                                        <span v-show="!scope.row.show">{{scope.row.stan_weight}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="scope.row.show =true" type="primary" icon="el-icon-edit"
                                                   size="mini" circle></el-button>
                                        <el-button @click="scope.row.show =false" type="success" icon="el-icon-check"
                                                   size="mini" circle></el-button>
                                        <el-button @click="add2()" type="primary" icon="el-icon-plus" size="mini"
                                                   circle></el-button>
                                        <el-button @click="shan(scope.row )" type="danger" icon="el-icon-delete"
                                                   size="mini" circle></el-button>
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
                                <el-radio-group v-model="radio">
                                    <el-radio :label="1">普通商品</el-radio>
                                    <el-radio :label="2">单独配送商品:特殊商品需要独立配送,提交订单时该商品分包裹单独计算邮费.</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="配送模板">
                                <template>
                                    <el-select v-model="valu" clearable placeholder="请选择">
                                        <el-option
                                                v-for="item in optionss"
                                                :key="item.distt_no"
                                                :label="item.distt_name"
                                                :value="item.distt_no">
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

                <el-table-column prop="comc.comc_name" label="商品分类名" width="">
                </el-table-column>
                <el-table-column prop="com_name" label="商品名称" width="">
                </el-table-column>
                <el-table-column prop="com_desc" label="商品描述" width="">
                </el-table-column>
                <el-table-column
                        prop="com_imgs"
                        label="商品图片地址"
                        width="150">
                    <template slot-scope="scope">
                        <el-image style="width: 100px;height: 100px" :src="scope.row.com_imgs"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="standards.stan_stock" label="库存" width="">
                </el-table-column>
                <el-table-column prop="com_isupper" label="状态" width="">
                    <span v-if="com_isupper==1">出售中</span>
                </el-table-column>
                <el-table-column prop="distt.distt_name" label="配送模板" width="">
                </el-table-column>
                <el-table-column prop="distt.distt_name" label="配送模板" width="">
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
                true: true,
                //图片上传
                dialogImageUrl: '',
                dialogVisible: false,
                imgUrl: '',//图片上传成功后接收的地址

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
                comc_namee: "",
                com_no: '',// 商品编号
                comc_no: '',// 商品分类编号
                com_name: '',//  商品名称
                com_imgs: '',// 商品图片地址
                com_desc: '',//商品详情
                standards: '',//  规格
                com_piecework: '',//分件 Piecework 0：普通，1：单独配送，2：同城即时达
                com_disttno: '',//  配送模板Distribution template
                //  弹出框,
                value: [],
                options: [],
                //配送模板
                optionss: [],
                // 新增商品分类
                dialogTable: false,
                comc_desc: '',
                comc_name: '',
                shanji: '',
                // 发布商品
                dialogTableVisible: false,
                //    批量删除
                disabled: true,
                //    表格假数据
                tableData: [],
                multipleSelection: [],
                table: [{
                    stan_name: '',// 规格名称
                    stan_price: '',//出售价
                    stan_pprice: '',//原价
                    stan_stock: '',
                    stan_company: ''
                }],
                tabledatas: [
                    {
                        stan_name: '', //商品编码
                        stan_price: '',
                        stan_pprice: '',
                        stan_stock: '',
                        stan_weight: '',
                        show: true
                    }
                ],
                //发布弹出框的数组
                miaosu: '',
                vall: '',
                biaoqian: '',
                biaoti: '',
                radio: '', // 拆弹属性
                valu: '',//配送费模板
                ccom_no: '',
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
                    {
                        stan_name: '', //商品编码
                        stan_price: '',
                        stan_pprice: '',
                        stan_stock: '',
                        stan_weight: '',
                        show: true
                    }
                )
            },
            //删除
            shan(val) {
                console.log(val)

                if (this.tabledatas.length > 1) {
                    this.tabledatas.splice(val, 1)
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
            //新增模板
            moban() {
                console.log('1233')
            },
            //产品库快捷添加
            Quick() {
                console.log('1233')
            },
            //提交信息
            submit() {
                this.dialogTableVisible = false;




                if (this.a == 1) {
                    // 添加数据
                    this.$axios.post('http://47.101.61.203/sale/addCom.do', {
                        // com_no: parseInt(this.ccom_no),
                        comc_no: parseInt(this.vall),
                        com_name: this.biaoqian,
                        com_imgs:this.imgUrl,
                        // com_desc:this.miaosu,
                        com_isupper:1,
                        standards: this.tabledatas,
                        pwork_no: parseInt(this.radio),
                        distt_no: parseInt(this.valu)
                    }, {
                        // 设置请求头
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    }).then((response) => {
                        console.log(response)
                        this.count = response.data.count
                        this.$message(response.data.msg);
                    }).catch((err) => {
                        console.log(err)
                    })
                } else if (this.a == 2) {
                    // 修改数据
                    this.$axios.post('http://47.101.61.203/sale/editCom.do', {
                        com_no: parseInt(this.ccom_no),
                        comc_no: parseInt(this.vall),
                        com_name: this.biaoqian,
                        // com_imgs:this.imgUrl,
                        // com_desc:this.miaosu,
                        standards: this.tabledatas,
                        pwork_no: parseInt(this.radio),
                        distt_no: parseInt(this.valu)
                    }, {
                        // 设置请求头
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    }).then((response) => {
                        console.log(response)
                        this.count = response.data.count
                        this.$message(response.data.msg);
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
            success(response) {
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
                // 请求数据
                this.$axios.post('/api/sale/queryCom.do', {
                        page: this.currentPage,
                        pagesize: this.pageSize
                    },
                    {
                        // 设置请求头
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    }).then((response) => {
                    console.log('商品数据');
                    console.log(response)
                    this.tableData = response.data.data
                    // for (var j = 0; j < arr.length;j++) {
                    //     if (arr[j].com_isupper==1) {
                    //         this.tableData=[],
                    //         this.tableData.push(arr[j])
                    //     }
                    // }
                    for (var i = 0; i < this.tableData.length; i++) {
                        this.options.push(this.tableData[i].comc)
                    }
                    // console.log( this.options)
                    this.count = response.data.count
                    console.log('获取数' + this.count)
                    console.log('返回数=' + response.data.count)
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
                this.$axios.post('http://47.101.61.203/sale/searchCom.do', {
                        page: this.currentPage,
                        pagesize: this.pageSize,
                        comc_name: this.comc_namee,
                        com_isupper:1
                    },
                    {
                        // 设置请求头
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    }).then((response) => {
                    console.log(response.data.data.list)
                    this.tableData = response.data.data
                    this.count = response.data.count

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
                this.a = 1
                // this.options.push({lable: 'this.tableData.comc_name', value: this.tableData.comc_no})
                // console.log(this.options)
                // console.log(this.tableData[0].comc_no)

            },
            // 修改
            Modify(val) {
                this.a = 2
                console.log('修改')
                console.log(val);
                this.dialogTableVisible = true
                // this.options=val
                this.ccom_no = val.com_no
                this.vall = val.comc_no
                this.biaoqian = val.com_name
                this.tabledatas = val.standards
                this.dialogImageUrl = val.com_imgs
                this.miaosu = val.com_desc
                this.radio = val.pwork.pwork_no//拆单属性
                this.valu = val.distt_no//模板
                console.log(this.miaosu)
            },
            // 删除
            Delete(val) {
                // // 请求数据
                this.$axios.post('http://47.101.61.203/sale/delCom.do', {
                        com_nos:[val.com_no]
                    },
                    {
                        // 设置请求头
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    }).then((response) => {
                    console.log('商品数据');
                    console.log(response)
                   if(response.data.code==200){
                       this.tableData.splice(val, 1)
                   }
                    this.$message(response.data.msg);
                    this.count = response.data.count
                }).catch((err) => {
                    console.log(err)
                })


            }
        },
        mounted: function () {
            // 请求数据
            this.$axios.post('http://47.101.61.203/sale/queryCom.do', {
                    page: this.currentPage,
                    pagesize: this.pageSize,
                    com_isupper:1
                },
                {
                    // 设置请求头
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }).then((response) => {
                console.log('商品数据');
                console.log(response)
                this.tableData = response.data.data
                for (var i = 0; i < this.tableData.length; i++) {
                    this.options.push(this.tableData[i].comc)
                    this.optionss.push(this.tableData[i].distt)
                }
                this.count = response.data.count
                this.$message(response.msg);
                console.log('获取数' + this.count)
                console.log('返回数=' + response.data.count)
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
    .width1 {
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

    p {
        color: #949494;
        font-size: 15px;
    }
</style>