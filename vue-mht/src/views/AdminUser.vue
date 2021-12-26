<template>
    <div>
        <el-card>
            <div class="query-form">
                <el-form :inline="true" :model="queryAdminUserForm" class="admin-user-form">
                    <el-row type="flex" align="middle">
                        <el-col :span="6" style="justify-content: center;">
                            <el-form-item label="用户名" class="admin-user-form-item">
                                <el-input v-model="queryAdminUserForm.username" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="昵称" class="admin-user-form-item">
                                <el-input v-model="queryAdminUserForm.nickname" placeholder="请输入昵称"></el-input>
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
            <tables ref="table" :tableData="tableData" :operationData="operationData" :queryData="queryAdminUserForm" @click_1="test1" @click_2="test2" @click_3="test3">
                <el-empty description="描述文字"></el-empty>
            </tables>
        </div>
    </div>
</template>

<script>
import adminUserApi from "../request/adminUserApi";
import tables from "@/components/Tables";
export default {
    data() {
        return {
            queryAdminUserForm: {
                username: "",
                nickname: "",
                role_id: "",
            },
            tableData: {
                //把发送请求的函数封装进去
                reqAPi: adminUserApi.getAllAdminUser,
                // 行尾操作按钮
                operaData: {
                    isShow: true,
                    data: [
                        { label: "增加", type: "primary" },
                        { label: "更新", type: "info" },
                        { label: "删除", type: "danger" },
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
                        prop: "role_id",
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
            _this.queryAdminUserForm.role_id = "";
            _this.$refs.table.getTableData();
        },
        // 发送条件搜索请求
        search() {
            this.$refs.table.getTableData();
        },
        test1(e) {
            this.$message("删除");
            console.log("删除", e.name);
        },
        test2(e) {
            this.$message("增加");
            console.log("增加", e.name);
        },
        test3(e) {
            this.$message("其他");
            console.log("其他", e.name);
        },
    },
};
</script>

<style>
.query-form {
    width: 100%;
    padding-left: 30px;
    /* background-color: beige; */
}

.admin-user-form {
    width: 100%;
}
.admin-user-form-item {
    margin: 0 auto;
}
</style>