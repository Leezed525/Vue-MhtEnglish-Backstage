<template>
    <div>
        <!-- 上方搜索框 -->
        <el-card>
            <div class="query-form">
                <el-form :inline="true" :model="queryAdminWordForm" class="admin-word-form">
                    <el-row type="flex" align="middle">
                        <el-col :span="6" style="justify-content: center;">
                            <el-form-item label="单词名" class="admin-word-form-item">
                                <el-input v-model="queryAdminWordForm.word" placeholder="请输入单词" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="释义" class="admin-word-form-item">
                                <el-input v-model="queryAdminWordForm.mean" placeholder="请输入释义" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="词性" class="admin-word-form-item">
                                <el-select v-model="queryAdminWordForm.part" placeholder="请选择词性" clearable>
                                    <el-option v-for="item in partOptions" :key="item.id" :label="item.partName" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item class="admin-word-form-item">
                                <el-button type="primary" @click="search">搜索</el-button>
                            </el-form-item>
                            <el-form-item class="admin-word-form-item">
                                <el-button type="info" @click="reset">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
        <el-divider></el-divider>

        <!-- 表格部分 -->
        <div class="info-table">
            <tables ref="adminWordTable" :tableData="tableData" :operationData="operationData" :queryData="queryAdminWordForm" @update="updateAdminWord" @delete="deleteAdminWord"
                @batchRemove="batchRemove" @addAdminWord="addAdminWord">
            </tables>
        </div>

        <!-- 编辑框 -->
        <el-dialog title="编辑单词" :visible.sync="updateAdminWordFormVisible">
            <el-form :model="updateForm" label-position="left" label-width="80px" :rules="updateFormRules" ref="updataForm">
                <el-form-item label="单词" prop="word">
                    <el-input v-model="updateForm.word" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="音标" prop="symbols">
                    <el-input v-model="updateForm.symbols" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="词性" prop="part">
                    <el-select v-model="updateForm.part" placeholder="请选择词性">
                        <el-option v-for="item in partOptions" :key="item.id" :label="item.partName" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="释义" prop="mean">
                    <el-input v-model="updateForm.mean" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="例句" prop="ex">
                    <el-input v-model="updateForm.ex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="翻译" prop="tran">
                    <el-input v-model="updateForm.tran" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateAdminWordFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toUpdateAdminWord(updateForm)">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 添加单词弹出框 -->
        <el-dialog title="添加单词" :visible.sync="addAdminWordFormVisible">
            <el-form :model="addAdminWordForm" label-position="left" label-width="80px" :rules="addAdminWordFormRules" ref="addAdminWordForm">
                <el-form-item label="单词" prop="word">
                    <el-input v-model="addAdminWordForm.word" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="音标" prop="symbols">
                    <el-input v-model="addAdminWordForm.symbols" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="词性" prop="part">
                    <el-select v-model="addAdminWordForm.part" placeholder="请选择词性">
                        <el-option v-for="item in partOptions" :key="item.id" :label="item.partName" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="释义" prop="mean">
                    <el-input v-model="addAdminWordForm.mean" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="例句" prop="ex">
                    <el-input v-model="addAdminWordForm.ex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="翻译" prop="tran">
                    <el-input v-model="addAdminWordForm.tran" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addAdminWordFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toaddAdminWord(addAdminWordForm)">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
import adminRoleApi from "../request/adminRoleApi";
import tables from "@/components/Tables";
import adminWordApi from "../request/adminWordApi";
export default {
    data() {

        return {
            //编辑弹出框是否打开
            updateAdminWordFormVisible: false,
            // 添加单词弹出框是否打开
            addAdminWordFormVisible: false,
            //搜索表单
            queryAdminWordForm: {
                word: "",
                part: "",
                mean: "",
            },
            //词性选项
            partOptions: [
                {
                    id: 1,
                    value: "n.",
                    partName: "名词",
                },
                {
                    id: 2,
                    value: "v.",
                    partName: "动词",
                },
                {
                    id: 3,
                    value: "adj.",
                    partName: "形容词",
                },
                {
                    id: 4,
                    value: "adv.",
                    partName: "副词",
                },
                {
                    id: 5,
                    value: "art.",
                    partName: "冠词",
                },
                {
                    id: 6,
                    value: "prep.",
                    partName: "介词",
                },
            ],
            //表格数据
            tableData: {
                //把发送请求的函数封装进去
                reqAPi: adminWordApi.getAllAdminWord,
                // 行尾操作按钮
                operaData: {
                    isShow: true,
                    data: [
                        {
                            label: "编辑",
                            type: "warning",
                            operafun: "update",
                        },
                        {
                            label: "删除",
                            type: "danger",
                            operafun: "delete",
                        },
                    ],
                },
                //列头元素
                columnData: [
                    {
                        prop: "id",
                        label: "id",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "word",
                        label: "单词名",
                        width: 150,
                        align: "center",
                    },
                    {
                        prop: "symbols",
                        label: "音标",
                        width: 150,
                        align: "center",
                    },
                    {
                        prop: "part",
                        label: "词性",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "mean",
                        label: "释义",
                        align: "center",
                    },
                ],
            },
            //表格后操作按钮(一般是批量操作按钮)
            operationData: [
                {
                    id: 1,
                    type: "danger",
                    label: "批量删除",
                    operafun: "batchRemove",
                },
                {
                    id: 2,
                    type: "success",
                    label: "添加单词",
                    operafun: "addAdminWord",
                },
            ],
            //编辑表单
            updateForm: {
                word: "",
                symbols: "",
                part: "",
                mean: "",
                ex: "",
                tran: "",
            },
            //编辑表单校验规则
            updateFormRules: {
                word: [
                    {
                        required: true,
                        message: "单词不能为空",
                        trigger: "change",
                    },
                ],
                symbols: [
                    {
                        required: true,
                        message: "音标不能为空",
                        trigger: "change",
                    },
                ],
                part: [
                    {
                        required: true,
                        message: "词性不能为空",
                        trigger: "change",
                    },
                ],
                mean: [
                    {
                        required: true,
                        message: "释义不能为空",
                        trigger: "change",
                    },
                ],
                ex: [
                    {
                        required: true,
                        message: "例句不能为空",
                        trigger: "change",
                    },
                ],
                tran: [
                    {
                        required: true,
                        message: "翻译不能为空",
                        trigger: "change",
                    },
                ],
            },
            // 添加单词表单
            addAdminWordForm: {
                word: "",
                symbols: "",
                part: "",
                mean: "",
                ex: "",
                tran: "",
            },
            addAdminWordFormRules: {
                word: [
                    {
                        required: true,
                        message: "单词不能为空",
                        trigger: "change",
                    },
                ],
                symbols: [
                    {
                        required: true,
                        message: "音标不能为空",
                        trigger: "change",
                    },
                ],
                part: [
                    {
                        required: true,
                        message: "词性不能为空",
                        trigger: "change",
                    },
                ],
                mean: [
                    {
                        required: true,
                        message: "释义不能为空",
                        trigger: "change",
                    },
                ],
                ex: [
                    {
                        required: true,
                        message: "例句不能为空",
                        trigger: "change",
                    },
                ],
                tran: [
                    {
                        required: true,
                        message: "翻译不能为空",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    components: {
        tables,
    },
    methods: {
        //重置搜索栏
        reset() {
            let _this = this;
            _this.queryAdminWordForm.word = "";
            _this.queryAdminWordForm.part = "";
            _this.queryAdminWordForm.mean = "";
            _this.search();
        },
        // 发送条件搜索请求
        search() {
            this.$refs.adminWordTable.getTableData();
        },
        // 单条数据更新
        updateAdminWord(data) {
            let _this = this;
            _this.updateAdminWordFormVisible = true;
            _this.updateForm = {
                ...data,
            };
        },
        //发送编辑请求
        toUpdateAdminWord(data) {
            let _this = this;
            //验证表单规则
            _this.$refs["updataForm"].validate((valid) => {
                //验证通过
                if (valid) {
                    adminWordApi
                        .updateAdminWord(data)
                        .then((res) => {
                            let result = res.data;
                            if (result.code == 200) {
                                _this.$message(result.msg);
                                _this.search();
                            } else {
                                _this.$message.error(result.msg);
                            }
                        })
                        .catch((error) => {
                            _this.$message.error("服务器错误，请稍后再试");
                        });
                    _this.updateAdminWordFormVisible = false;
                    return;
                }
            });
        },
        //删除单词
        deleteAdminWord(data) {
            let _this = this;
            _this
                .$confirm("是否要永久删除此单词", "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    //todelete
                    _this.toDelete([data.id]);
                })
                .catch(() => {});
        },
        // 发送删除单词请求
        toDelete(ids) {
            let _this = this;
            adminWordApi
                .deleteAdminWordByIds(ids)
                .then((res) => {
                    let result = res.data;
                    if (result.code === 200) {
                        _this.$message(result.msg);
                        _this.search();
                    } else {
                        _this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    _this.$message.error("服务器错误，请稍后再试");
                });
        },
        batchRemove(val) {
            let ids = [];
            let _this = this;
            if (val.length === 0) {
                _this.$message.error("您还没有选中任一单词");
                return false;
            }
            _this
                .$confirm("是否要永久删除这些单词", "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    //todelete
                    val.forEach((item) => {
                        ids.push(item.id);
                    });
                    _this.toDelete(ids);
                })
                .catch(() => {});
        },
        addAdminWord() {
            let _this = this;
            _this.addAdminWordFormVisible = true;
        },
        toaddAdminWord(data) {
            let _this = this;
            _this.$refs["addAdminWordForm"].validate((valid) => {
                //验证通过
                if (valid) {
                    adminWordApi
                        .addAdminWord(data)
                        .then((res) => {
                            let result = res.data;
                            if (result.code == 200) {
                                _this.$message.success(result.msg);
                                _this.search();
                                _this.addAdminWordFormVisible = false;
                            } else {
                                _this.$message.error(result.msg);
                            }
                        })
                        .catch((error) => {
                            _this.$message.error("服务器错误，请稍后再试");
                        });
                    _this.$nextTick(() => {
                        _this.$refs["addAdminWordForm"].resetFields();
                    });
                    return;
                }
            });
        },
    },
    beforeCreate() {
        adminWordApi.toWord().then((res) => {
            if (res.data.code === 401) {
                this.$router.replace("/");
            }
        });
    },
    mounted() {
        //获取权限列表
        let _this = this;
        adminRoleApi.getAllRoles().then((res) => {
            let result = res.data;

            if (result.code == 200) {
                _this.roleOptions = result.data;
            }
        });
    },
};
</script>

<style>
.query-form {
    width: 100%;
    padding-left: 30px;
}

.admin-word-form {
    width: 100%;
}
.admin-word-form-item {
    margin: 0 auto;
}
</style>