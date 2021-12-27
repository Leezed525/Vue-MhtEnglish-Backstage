<template>
    <div>
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
                                <el-input v-model="queryAdminUserForm.role_id" placeholder="请输入角色"></el-input>
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
            <tables ref="table" :tableData="tableData" :operationData="operationData" :queryData="queryAdminUserForm" @update="updateAdminUser" @resetPassword="resetPassword"
                @delete="deleteAdminUser">
            </tables>
        </div>

        <!-- 编辑框 -->
        <el-dialog title="编辑用户" :visible.sync="updateAdminUserFormVisible">
            <el-form :model="updateForm" label-position="left" label-width="80px">
                <el-form-item label="昵称">
                    <el-input v-model="updateForm.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-input v-model="updateForm.roleId" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateAdminUserFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toUpdateAdminUser(updateForm)">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import adminUserApi from "../request/adminUserApi";
import tables from "@/components/Tables";
import userApi from "../request/adminUserApi";
export default {
    data() {
        return {
            updateAdminUserFormVisible: false,
            queryAdminUserForm: {
                username: "",
                nickname: "",
                roleId: "",
            },
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
                            label: "重置密码",
                            type: "info",
                            operafun: "resetPassword",
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
                        width: 200,
                        align: "center",
                    },
                    {
                        prop: "nickname",
                        label: "昵称",
                        align: "center",
                    },
                    {
                        prop: "roleId",
                        label: "角色",
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
            updateForm: {
                id: "",
                nickname: "",
                roleId: "",
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
            _this.queryAdminUserForm.username = "";
            _this.queryAdminUserForm.nickname = "";
            _this.queryAdminUserForm.roleId = "";
            _this.$refs.table.getTableData();
        },
        // 发送条件搜索请求
        search() {
            this.$refs.table.getTableData();
        },

        // 单条数据更新
        updateAdminUser(data) {
            let _this = this;
            if (data.id == 1) {
                _this.$message.error("你的权限不能编辑此用户");
                return;
            }
            _this.updateAdminUserFormVisible = true;
            _this.updateForm.id = data.id;
            _this.updateForm.nickname = data.nickname;
            _this.updateForm.roleId = data.roleId;
        },
        //发送编辑请求
        toUpdateAdminUser(data) {
            let _this = this;
            adminUserApi
                .updateAdminUser(data)
                .then((res) => {
                    let result = res.data;
                    if (result.code == 200) {
                        _this.$message(result.msg);
                        this.$refs.table.getTableData();
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
                _this.$message.error("你的权限不能重置此用户");
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
                    console.log("去重置");
                    _this.toResetPassword(data.id);
                })
                .catch(() => {});
        },
        toResetPassword(id) {
            let data = {
                id
            }
            adminUserApi
                .restPassword(data)
                .then((res) => {
                    let result = res.data;
                    if (result.code == 200) {
                        this.$message(result.msg);
                        this.$refs.table.getTableData();
                    } else {
                        this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    this.$message.error("服务器错误，请稍后再试");
                });
        },
        //删除用户
        deleteAdminUser(data) {
            let _this = this;
            if (data.id == 1) {
                _this.$message.error("你的权限不能删除此用户");
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
        toDelete(id) {
            let ids = [id];
            adminUserApi
                .deleteAdminUserByIds(ids)
                .then((res) => {
                    let result = res.data;
                    if (result.code == 200) {
                        this.$message(result.msg);
                        this.$refs.table.getTableData();
                    } else {
                        this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    this.$message.error("服务器错误，请稍后再试");
                });
        },
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