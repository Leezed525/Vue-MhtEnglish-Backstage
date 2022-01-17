<template>
    <div>
        <!-- 上方搜索框 -->
        <el-card>
            <div class="query-form">
                <el-form :inline="true" :model="queryAdminRoleForm" class="admin-role-form">
                    <el-row type="flex" align="middle">
                        <el-col :span="8" style="justify-content: center;">
                            <el-form-item label="角色名" class="admin-role-form-item">
                                <el-input v-model="queryAdminRoleForm.roleName" placeholder="请输入角色名" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注" class="admin-role-form-item">
                                <el-input v-model="queryAdminRoleForm.comment" placeholder="请输入备注" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="admin-role-form-item">
                                <el-button type="primary" @click="search">搜索</el-button>
                            </el-form-item>
                            <el-form-item class="admin-role-form-item">
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
            <tables ref="adminRoleTable" :tableData="tableData" :operationData="operationData" :queryData="queryAdminRoleForm" @update="updateAdminRole" @delete="deleteAdminRole" @assign="assign"
                @formatFun="formatRoleForm" @addAdminRole="addAdminRole">
            </tables>
        </div>

        <!-- 编辑框 -->
        <el-dialog title="编辑角色" :visible.sync="updateAdminRoleFormVisible">
            <el-form :model="updateForm" label-position="left" label-width="80px" :rules="updateFormRules" ref="updataForm">
                <el-form-item label="角色名" prop="roleName">
                    <el-input v-model="updateForm.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="updateForm.comment" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否可用">
                    <template>
                        <el-radio v-model="updateForm.available" :label="true">可用</el-radio>
                        <el-radio v-model="updateForm.available" :label="false">不可用</el-radio>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateAdminRoleFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toUpdateAdminRole(updateForm)">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 分配角色弹出框 -->
        <el-dialog title="分配角色" :visible.sync="assignPermissionFormVisible" append-to-body v-loading="assignLoading">
            <el-tree :data="permissionTreeData" show-checkbox node-key="id" :props="defaultProps" ref="tree">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="assignPermissionFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toAssignRoles()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 添加角色弹出框 -->
        <el-dialog title="添加角色" :visible.sync="addAdminRoleFormVisible">
            <el-form :model="addAdminRoleForm" label-position="left" label-width="80px" :rules="addAdminRoleFormRules" ref="addAdminRoleForm">
                <el-form-item label="角色名" prop="roleName">
                    <el-input v-model="addAdminRoleForm.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addAdminRoleForm.comment" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否可用">
                    <template>
                        <el-radio v-model="addAdminRoleForm.available" :label="true">可用</el-radio>
                        <el-radio v-model="addAdminRoleForm.available" :label="false">不可用</el-radio>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addAdminRoleFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toAddAdminRole(addAdminRoleForm)">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
import adminRoleApi from "../request/adminRoleApi";
import adminPermissionApi from "../request/adminPermissionApi";

import tables from "@/components/Tables";
export default {
    data() {
        var checkRolename = (rule, value, callback) => {
            let data = {
                roleName: value,
            };
            adminRoleApi.checkRolenameUnique(data).then((res) => {
                let result = res.data;
                if (result.code == 200) {
                    // console.log("角色名可用");
                    callback();
                } else {
                    callback(new Error("角色名已存在"));
                }
            });
        };
        return {
            //编辑弹出框是否打开
            updateAdminRoleFormVisible: false,
            //分配角色弹出框是否打开
            assignPermissionFormVisible: false,
            // 添加角色弹出框是否打开
            addAdminRoleFormVisible: false,
            //搜索表单
            queryAdminRoleForm: {
                roleName: "",
                comment: "",
            },
            //表格数据
            tableData: {
                //把发送请求的函数封装进去
                reqAPi: adminRoleApi.getAllAdminRole,
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
                            label: "分配权限",
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
                        prop: "roleName",
                        label: "角色名",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "comment",
                        label: "备注",
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
                    label: "添加角色",
                    operafun: "addAdminRole",
                },
            ],
            //编辑表单
            updateForm: {
                id: "",
                roleName: "",
                comment: "",
                available: true,
            },
            //编辑表单校验规则
            updateFormRules: {
                roleName: [
                    {
                        required: true,
                        message: "请输入昵称",
                        trigger: "change",
                    },
                ],
            },
            //分配角色选中的选项
            roleSelection: [],
            //正在进行分配的id
            assigningId: 0,
            // 添加角色表单
            addAdminRoleForm: {
                roleName: "",
                comment: "",
                available: true,
            },
            // 添加角色表单规则
            addAdminRoleFormRules: {
                roleName: [
                    {
                        required: true,
                        message: "请输入角色名",
                        trigger: "blur",
                    },
                    { validator: checkRolename, trigger: "blur" },
                ],
            },
            // 分配权限权限树
            permissionTreeData: {},
            defaultProps: {
                children: "children",
                label: "label",
            },
            assignLoading: false,
        };
    },
    components: {
        tables,
    },
    methods: {
        //重置搜索栏
        reset() {
            let _this = this;
            _this.queryAdminRoleForm.roleName = "";
            _this.queryAdminRoleForm.comment = "";
            _this.search();
        },
        // 发送条件搜索请求
        search() {
            this.$refs.adminRoleTable.getTableData();
        },
        //表格数据格式化
        formatRoleForm(row, column, value, callback) {
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
        updateAdminRole(data) {
            let _this = this;
            _this.updateAdminRoleFormVisible = true;
            _this.updateForm.id = data.id;
            _this.updateForm.roleName = data.roleName;
            _this.updateForm.comment = data.comment;
            _this.updateForm.available = data.available;
        },
        //发送编辑请求
        toUpdateAdminRole(data) {
            let _this = this;
            //验证表单规则
            _this.$refs["updataForm"].validate((valid) => {
                //验证通过
                if (valid) {
                    adminRoleApi
                        .updateAdminRole(data)
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
                    _this.updateAdminRoleFormVisible = false;
                    return;
                }
            });
        },
        //打开分配权限树并勾选角色所拥有的权限
        assign(data) {
            // console.log("assign roles");
            let _this = this;
            let id = data.id;
            //清空上一个角色的权限
            console.log(1);
            console.log(_this.$refs);
            _this.assignLoading = true;
            _this.assignPermissionFormVisible = true;
            _this.assigningId = id;
            _this.$nextTick(() => {
                _this.$refs.tree.setCheckedKeys([]);
                adminPermissionApi
                    .getPermissionByRoleId({
                        RoleId: id,
                    })
                    .then((res) => {
                        _this.assignLoading = false;
                        let result = res.data;
                        if (result.code === 200) {
                            let setkeys = [];
                            result.data.forEach((item) => {
                                setkeys.push(item.id);
                            });
                            _this.$refs.tree.setCheckedKeys(setkeys);
                        } else {
                            _this.$message.error("数据请求出错");
                        }
                    })
                    .catch((error) => {
                        _this.assignLoading = false;
                        _this.$message.error("服务器出错");
                    });
            });
        },
        // 发送分配角色请求
        toAssignRoles() {
            let _this = this;
            let pids = _this.$refs.tree.getCheckedKeys();
            console.log(pids);
            let data = {
                pIds: pids,
                rId: _this.assigningId,
            };
            adminRoleApi
                .reassignPermission(data)
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
            _this.assignPermissionFormVisible = false;
        },

        //删除角色
        deleteAdminRole(data) {
            let _this = this;
            _this
                .$confirm("是否要永久删除此角色", "警告", {
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
        // 发送删除角色请求
        toDelete(ids) {
            let _this = this;
            adminRoleApi
                .deleteAdminRoleByIds(ids)
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
        //处理分配角色处角色选择
        handleSelectionChange(val) {
            this.roleSelection = val;
            // console.log(this.roleSelection);
        },
        addAdminRole() {
            let _this = this;
            _this.addAdminRoleFormVisible = true;
        },
        toAddAdminRole(data) {
            let _this = this;
            _this.$refs["addAdminRoleForm"].validate((valid) => {
                //验证通过
                if (valid) {
                    adminRoleApi
                        .addAdminRole(data)
                        .then((res) => {
                            let result = res.data;
                            if (result.code == 200) {
                                _this.$message.success(result.msg);
                                _this.search();
                                _this.addAdminRoleFormVisible = false;
                            } else {
                                _this.$message.error(result.msg);
                            }
                        })
                        .catch((error) => {
                            _this.$message.error("服务器错误，请稍后再试");
                        });
                    _this.$nextTick(() => {
                        _this.$refs["addAdminRoleForm"].resetFields();
                    });

                    return;
                }
            });
        },
    },
    beforeCreate() {
        adminRoleApi.toRole().then(res =>{
            if(res.data.code === 401){
                this.$router.replace("/");
            }
        })
    },
    mounted() {
        let _this = this;
        //获取权限树
        adminPermissionApi.getPermissionTree().then((res) => {
            let result = res.data;
            if (result.code === 200) {
                _this.permissionTreeData = result.data;
            } else {
                _this.$message.error("获取权限树失败");
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

.admin-role-form {
    width: 100%;
}
.admin-role-form-item {
    margin: 0 auto;
}
</style>