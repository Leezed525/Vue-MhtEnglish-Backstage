<template>
    <div>
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
                            <el-input v-model="queryAdminUserForm.role" placeholder="请输入角色"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item class="admin-user-form-item">
                            <el-button type="primary" @click="onSubmit">搜索</el-button>
                        </el-form-item>
                        <el-form-item class="admin-user-form-item">
                            <el-button type="primary" @click="reset">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-divider></el-divider>
        <div class="info-table">
            <div class="operation">
                <tables :tableData="tableData" @click_1="test1" @click_2="test2" @click_3="test3">
                </tables>
            </div>
        </div>
    </div>
</template>

<script>
import tables from "@/components/Tables";
export default {
    data() {
        return {
            queryAdminUserForm: {},
            tableData: {
                reqUrl: "https://easy-mock.com/mock/5f2403effa76424e9506a6b8/example/getData",
                operaData: {
                    isShow: true,
                    data: [
                        { label: "删除", type: "danger" },
                        { label: "增加", type: "primary" },
                        { label: "其他", type: "info" },
                    ],
                },
                columnData: [
                    {
                        prop: "name",
                        label: "名字",
                        width: 200,
                        align: "center",
                    },
                    { prop: "time", label: "时间", align: "center" },
                ],
            },
        };
    },
    components: {
        tables,
    },
    methods: {
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