<template>
    <div>
        <!-- 上方搜索框 -->
        <el-card>
            <div class="query-form">
                <el-form :inline="true" :model="queryAdminPermissionForm" class="admin-permission-form">
                    <el-row type="flex" align="middle">
                        <el-col :span="6" style="justify-content: center;">
                            <el-form-item label="权限名称" class="admin-permission-form-item">
                                <el-input v-model="queryAdminPermissionForm.title" placeholder="请输入权限名称" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="权限编码" class="admin-permission-form-item">
                                <el-input v-model="queryAdminPermissionForm.percode" placeholder="请输入权限编码" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="菜单名称" class="admin-permission-form-item">
                                <el-select v-model="queryAdminPermissionForm.pid" placeholder="请选择菜单" clearable>
                                    <el-option v-for="item in menuOption" :key="item.id" :label="item.title" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item class="admin-permission-form-item">
                                <el-button type="primary" @click="search">搜索</el-button>
                            </el-form-item>
                            <el-form-item class="admin-permission-form-item">
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
            <tables ref="adminPermissionTable" :tableData="tableData" :operationData="operationData" :queryData="queryAdminPermissionForm" @update="updateAdminPermission"
                @delete="deleteAdminPermission" @formatFun="formatPermissionForm" @addAdminPermission="addAdminPermission">
            </tables>
        </div>

        <!-- 编辑框 -->
        <el-dialog title="编辑权限" :visible.sync="updateAdminPermissionFormVisible">
            <el-form :model="updateForm" label-position="left" label-width="80px" :rules="updateFormRules" ref="updataForm">
                <el-form-item label="权限名" prop="title">
                    <el-input v-model="updateForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限地址" prop="reqUrl">
                    <el-input v-model="updateForm.reqUrl" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限编码" prop="percode">
                    <el-input v-model="updateForm.percode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属菜单" prop="pid"> 
                    <el-select v-model="updateForm.pid" placeholder="请选择菜单">
                        <el-option v-for="item in menuOption" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可用">
                    <template>
                        <el-radio v-model="updateForm.available" :label="true">可用</el-radio>
                        <el-radio v-model="updateForm.available" :label="false">不可用</el-radio>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateAdminPermissionFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toUpdateAdminPermission(updateForm)">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 添加权限弹出框 -->
        <el-dialog title="添加权限" :visible.sync="addAdminPermissionFormVisible">
            <el-form :model="addAdminPermissionForm" label-position="left" label-width="80px" :rules="addAdminPermissionFormRules" ref="addAdminPermissionForm">
                <el-form-item label="权限名" prop="title">
                    <el-input v-model="addAdminPermissionForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限地址" prop="reqUrl">
                    <el-input v-model="addAdminPermissionForm.reqUrl" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限编码" prop="percode">
                    <el-input v-model="addAdminPermissionForm.percode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属菜单" prop="pid">
                    <el-select v-model="addAdminPermissionForm.pid" placeholder="请选择菜单" clearable>
                        <el-option v-for="item in menuOption" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可用">
                    <template>
                        <el-radio v-model="addAdminPermissionForm.available" :label="true">可用</el-radio>
                        <el-radio v-model="addAdminPermissionForm.available" :label="false">不可用</el-radio>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addAdminPermissionFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toAddAdminPermission(addAdminPermissionForm)">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
import adminPermissionApi from "../request/adminPermissionApi";
import tables from "@/components/Tables";
export default {
    data() {
        var checkTitle = (rule, value, callback) => {
            let data = {
                title: value,
            };
            adminPermissionApi.checkTitleUnique(data).then((res) => {
                let result = res.data;
                if (result.code == 200) {
                    // console.log("权限名可用");
                    callback();
                } else {
                    callback(new Error("权限名已存在"));
                }
            });
        };
        return {
            //编辑弹出框是否打开
            updateAdminPermissionFormVisible: false,
            // 添加权限弹出框是否打开
            addAdminPermissionFormVisible: false,
            //搜索表单
            queryAdminPermissionForm: {
                title: "",
                percode: "",
                pid: null,
            },
            //菜单选项
            menuOption: [],
            //表格数据
            tableData: {
                //把发送请求的函数封装进去
                reqAPi: adminPermissionApi.getAllPermissions,
                // 行尾操作按钮
                operaData: {
                    isShow: true,
                    data: [
                        {
                            label: "编辑",
                            type: "primary",
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
                        width: 50,
                        align: "center",
                    },
                    {
                        prop: "title",
                        label: "权限名",
                        width: 150,
                        align: "center",
                    },
                    {
                        prop: "reqUrl",
                        label: "权限地址",
                        align: "center",
                    },
                    {
                        prop: "percode",
                        label: "权限编码",
                        align: "center",
                    },
                    {
                        prop: "available",
                        label: "是否可用",
                        align: "center",
                    },
                ],
            },
            //表格后操作按钮(一般是批量操作按钮)
            operationData: [
                {
                    id: 2,
                    type: "success",
                    label: "添加权限",
                    operafun: "addAdminPermission",
                },
            ],
            //编辑表单
            updateForm: {
                title: "",
                percode: "",
                reqUrl: "",
                available: true,
            },
            //编辑表单校验规则
            updateFormRules: {
                title: [
                    {
                        required: true,
                        message: "请输入权限名",
                        trigger: "change",
                    },
                ],
                reqUrl: [
                    {
                        required: true,
                        message: "请输入权限地址",
                        trigger: "change",
                    },
                ],
                percode: [
                    {
                        required: true,
                        message: "请输入权限编码",
                        trigger: "change",
                    },
                ],
                pid: [
                    {
                        required: true,
                        message: "请输入权限编码",
                        trigger: "change",
                    },
                ],
            },
            // 添加权限表单
            addAdminPermissionForm: {
                title: "",
                percode: "",
                reqUrl: "",
                available: true,
            },
            addAdminPermissionFormRules: {
                title: [
                    {
                        required: true,
                        message: "请输入权限名",
                        trigger: "blur",
                    },
                    {
                        validator: checkTitle,
                        trigger: "blur",
                    },
                ],
                reqUrl: [
                    {
                        required: true,
                        message: "请输入权限地址",
                        trigger: "blur",
                    },
                ],
                percode: [
                    {
                        required: true,
                        message: "请输入权限编码",
                        trigger: "blur",
                    },
                ],
                pid: [
                    {
                        required: true,
                        message: "请输入权限编码",
                        trigger: "blur",
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
            _this.queryAdminPermissionForm.title = "";
            _this.queryAdminPermissionForm.percode = "";
            _this.queryAdminPermissionForm.pid = null;
            _this.search();
        },
        // 发送条件搜索请求
        search() {
            this.$refs.adminPermissionTable.getTableData();
        },
        //表格数据格式化
        formatPermissionForm(row, column, value, callback) {
            let returnval;
            if (column.property === "available") {
                if (value === true) {
                    returnval = "可用";
                } else {
                    returnval = "不可用";
                }
            } else {
                returnval = value;
            }
            callback(returnval);
        },
        // 单条数据更新
        updateAdminPermission(data) {
            let _this = this;
            _this.updateAdminPermissionFormVisible = true;
            _this.updateForm.id = data.id;
            _this.updateForm.title = data.title;
            _this.updateForm.reqUrl = data.reqUrl;
            _this.updateForm.percode = data.percode;
            _this.updateForm.pid = data.pid;
            _this.updateForm.available = data.available;
        },
        //发送编辑请求
        toUpdateAdminPermission(data) {
            let _this = this;
            //验证表单规则
            _this.$refs["updataForm"].validate((valid) => {
                //验证通过
                if (valid) {
                    adminPermissionApi
                        .updateAdminPermission(data)
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
                    _this.updateAdminPermissionFormVisible = false;
                    return;
                }
            });
        },
        //删除权限
        deleteAdminPermission(data) {
            let _this = this;
            _this
                .$confirm("是否要永久删除此权限", "警告", {
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
        // 发送删除权限请求
        toDelete(ids) {
            let _this = this;
            adminPermissionApi
                .deleteAdminPermissionByIds(ids)
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
        },
        addAdminPermission() {
            let _this = this;
            _this.addAdminPermissionFormVisible = true;
        },
        toAddAdminPermission(data) {
            let _this = this;
            _this.$refs["addAdminPermissionForm"].validate((valid) => {
                //验证通过
                if (valid) {
                    adminPermissionApi
                        .addAdminPermission(data)
                        .then((res) => {
                            let result = res.data;
                            if (result.code == 200) {
                                _this.$message.success(result.msg);
                                _this.search();
                                _this.addAdminPermissionFormVisible = false;
                            } else {
                                _this.$message.error(result.msg);
                            }
                        })
                        .catch((error) => {
                            _this.$message.error("服务器错误，请稍后再试");
                        });
                    _this.$nextTick(() => {
                        _this.$refs["addAdminPermissionForm"].resetFields();
                    });
                    return;
                }
            });
        },
    },
    beforeCreate() {
        adminPermissionApi.toPermission().then(res =>{
            if(res.data.code === 401){
                this.$router.replace("/");
            }
        })
    },
    mounted() {
        //获取权限列表
        let _this = this;
        adminPermissionApi.getAllMenu().then((res) => {
            let result = res.data;
            if (result.code == 200) {
                _this.menuOption = result.data;
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

.admin-permission-form {
    width: 100%;
}
.admin-permission-form-item {
    margin: 0 auto;
}
</style>