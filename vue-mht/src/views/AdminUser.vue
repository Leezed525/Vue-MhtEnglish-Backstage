<template>
    <div>
        <!-- 上方搜索框 -->
        <el-card>
            <div class="query-form">
                <el-form :inline="true" :model="queryAdminUserForm" class="admin-user-form">
                    <el-row type="flex" align="middle">
                        <el-col :span="6" style="justify-content: center;">
                            <el-form-item label="用户名" class="admin-user-form-item">
                                <el-input v-model="queryAdminUserForm.username" placeholder="请输入用户名" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="昵称" class="admin-user-form-item">
                                <el-input v-model="queryAdminUserForm.nickname" placeholder="请输入昵称" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="角色" class="admin-user-form-item">
                                <el-select v-model="queryAdminUserForm.roleId" placeholder="请选择角色" clearable>
                                    <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item class="admin-user-form-item">
                                <el-button type="primary" @click="search">搜索</el-button>
                            </el-form-item>
                            <el-form-item class="admin-user-form-item">
                                <el-button type="primary" @click="reset">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
        <el-divider></el-divider>
        <div class="info-table">
            <tables ref="adminUserTable" :tableData="tableData" :operationData="operationData" :queryData="queryAdminUserForm" @update="updateAdminUser" @resetPassword="resetPassword"
                @delete="deleteAdminUser" @assign="assign" @formatFun="formatUserForm">
            </tables>
        </div>

        <!-- 编辑框 -->
        <el-dialog title="编辑用户" :visible.sync="updateAdminUserFormVisible">
            <el-form :model="updateForm" label-position="left" label-width="80px" :rules="updateFormRules">
                <el-form-item label="昵称">
                    <el-input v-model="updateForm.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="updateForm.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否可用">
                    <template>
                        <el-radio v-model="updateForm.available" :label="true">可用</el-radio>
                        <el-radio v-model="updateForm.available" :label="false">不可用</el-radio>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateAdminUserFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toUpdateAdminUser(updateForm)">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 分配角色弹出框 -->
        <el-dialog title="分配角色" :visible.sync="assignRolesFormVisiable" append-to-body>
            <el-table :data="roleOptions" @selection-change="handleSelectionChange" ref="assignTable">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="id" label="id" width="50"></el-table-column>
                <el-table-column property="roleName" label="角色名" width="150"></el-table-column>
                <el-table-column property="comment" label="备注"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="assignRolesFormVisiable = false">取 消</el-button>
                <el-button type="primary" @click="toAssignRoles()">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import adminUserApi from "../request/adminUserApi";
import adminRoleApi from "../request/adminRoleApi";
import tables from "@/components/Tables";
import AdminRoleApi from "../request/adminRoleApi";
export default {
    data() {
        return {
            //编辑弹出框是否打开
            updateAdminUserFormVisible: false,
            //分配角色弹出框是否打开
            assignRolesFormVisiable: false,
            //搜索表单
            queryAdminUserForm: {
                username: "",
                nickname: "",
                roleId: "",
            },
            //搜索表单权限选项
            roleOptions: [],
            //表格数据
            tableData: {
                //把发送请求的函数封装进去
                reqAPi: adminUserApi.getAllAdminUser,
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
                            label: "重置",
                            type: "info",
                            operafun: "resetPassword",
                        },
                        {
                            label: "分配角色",
                            type: "warning",
                            operafun: "assign",
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
                        prop: "username",
                        label: "用户名",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "nickname",
                        label: "昵称",
                        align: "center",
                    },
                    {
                        prop: "remark",
                        label: "备注",
                        width: 200,
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
                    id: 1,
                    type: "error",
                },
            ],
            //编辑表单
            updateForm: {
                id: "",
                nickname: "",
                remark: "",
                available: true,
            },
            //编辑表单校验规则
            updateFormRules: {
                roleId: [
                    {
                        required: true,
                        message: "请选择角色",
                        trigger: "change",
                    },
                ],
            },
            //分配角色选中的选项
            roleSelection: [],
            //正在进行分配的id
            assigningId: 0,
        };
    },
    components: {
        tables,
    },
    methods: {
        //重置搜索栏
        reset() {
            let _this = this;
            _this.queryAdminUserForm.username = "";
            _this.queryAdminUserForm.nickname = "";
            _this.queryAdminUserForm.roleId = "";
            _this.$refs.adminUserTable.getTableData();
        },
        // 发送条件搜索请求
        search() {
            this.$refs.adminUserTable.getTableData();
        },
        //表格数据格式化
        formatUserForm(row, column, value, callback) {
            // console.log("start format");
            // console.log(column)
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
            // let res = '';
            callback(returnval);
        },
        // 单条数据更新
        updateAdminUser(data) {
            let _this = this;
            if (data.id == 1) {
                _this.$message.error("你没有权限编辑此用户");
                return;
            }
            _this.updateAdminUserFormVisible = true;
            _this.updateForm.id = data.id;
            _this.updateForm.nickname = data.nickname;
            _this.updateForm.remark = data.remark;
            _this.updateForm.available = data.available;
        },
        //发送编辑请求
        toUpdateAdminUser(data) {
            console.log(data);
            let _this = this;
            adminUserApi
                .updateAdminUser(data)
                .then((res) => {
                    let result = res.data;
                    if (result.code == 200) {
                        _this.$message(result.msg);
                        this.$refs.adminUserTable.getTableData();
                    } else {
                        _this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    _this.$message.error("服务器错误，请稍后再试");
                });
            _this.updateAdminUserFormVisible = false;
        },
        //重置密码
        resetPassword(data) {
            let _this = this;
            if (data.id == 1) {
                _this.$message.error("你没有权限重置此用户");
                return;
            }
            _this
                .$confirm("是否要重置该用户的密码为123456", "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    //todelete
                    _this.toResetPassword(data.id);
                })
                .catch(() => {});
        },
        //发送重置请求
        toResetPassword(id) {
            let data = {
                id,
            };
            adminUserApi
                .restPassword(data)
                .then((res) => {
                    let result = res.data;
                    if (result.code == 200) {
                        this.$message(result.msg);
                        this.$refs.adminUserTable.getTableData();
                    } else {
                        this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    this.$message.error("服务器错误，请稍后再试");
                });
        },
        //打开分配角色框并勾选角色所拥有的权限
        assign(data) {
            // console.log("assign roles");
            let _this = this;
            let id = data.id;
            _this.assignRolesFormVisiable = true;
            // 将该用户原先拥有的权限勾选
            // 如果data中存的 id 与之前的一样的话，说明系统用户换了一个操作用户，这时候才去搜索权限
            if (id != _this.assigningId) {
                // 去搜索
                let hadRoles;
                _this.$nextTick(() => {
                    //直接这句有问题，要在dom元素更新后vue获取$refs才能去清理选项，主要是第一次打开dialog会有问题
                    _this.$refs.assignTable.clearSelection();
                });
                AdminRoleApi.getAllRolesByUserId({ userId: id }).then((res) => {
                    let result = res.data;
                    console.log(res);
                    if (result.code == 200) {
                        hadRoles = result.data;
                        //默认勾选查到的权限
                        hadRoles.forEach((role) => {
                            _this.$refs.assignTable.toggleRowSelection(
                                _this.roleOptions.find((item) => {
                                    return item.id == role.id;
                                }),
                                true
                            );
                        });
                    } else {
                        _this.$message.error("数据请求失败");
                    }
                });
            }
            //标记正在分配的id
            _this.assigningId = id;
        },
        // 发送分配角色请求
        toAssignRoles() {
            let _this = this;
            let rIds = [];
            console.log(_this.roleSelection);
            _this.roleSelection.forEach((item) => {
                console.log(item);
                rIds.push(item.id);
            });
            let data = {
                rIds: rIds,
                uId: _this.assigningId,
            };
            console.log(data);
            adminUserApi
                .reassignRoles(data)
                .then((res) => {
                    let result = res.data;
                    if (result.code === 200) {
                        _this.$message("分配成功");
                        _this.assigningId = 0;
                    } else {
                        _this.$message.error("分配失败");
                    }
                })
                .catch((error) => {
                    _this.$message.error(error.message);
                });
            _this.assignRolesFormVisiable = false;
        },

        //删除用户
        deleteAdminUser(data) {
            let _this = this;
            if (data.id == 1) {
                _this.$message.error("你没有权限删除此用户");
                return;
            }
            _this
                .$confirm("是否要永久删除此系统用户", "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    //todelete
                    _this.toDelete(data.id);
                })
                .catch(() => {});
        },
        // 发送删除用户请求
        toDelete(id) {
            let ids = [id];
            adminUserApi
                .deleteAdminUserByIds(ids)
                .then((res) => {
                    let result = res.data;
                    if (result.code == 200) {
                        this.$message(result.msg);
                        this.$refs.adminUserTable.getTableData();
                    } else {
                        this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    this.$message.error("服务器错误，请稍后再试");
                });
        },

        //处理分配角色处角色选择
        handleSelectionChange(val) {
            this.roleSelection = val;
            // console.log(this.roleSelection);
        },
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

.admin-user-form {
    width: 100%;
}
.admin-user-form-item {
    margin: 0 auto;
}
</style>