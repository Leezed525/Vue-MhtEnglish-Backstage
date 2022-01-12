<template>
    <div>
        <!-- 上方搜索框 -->
        <el-card>
            <div class="query-form">
                <el-form :inline="true" :model="queryAdminLogForm" class="admin-log-form">
                    <el-row type="flex" align="middle">
                        <el-col :span="6" style="justify-content: center;">
                            <el-form-item label="操作人" class="admin-log-form-item">
                                <el-input v-model="queryAdminLogForm.operator" placeholder="请输入操作人" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="操作内容" class="admin-log-form-item">
                                <el-input v-model="queryAdminLogForm.action" placeholder="请输入操作内容" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="操作结果" class="admin-log-form-item">
                                <el-select v-model="queryAdminLogForm.result" placeholder="请选择操作结果" clearable>
                                    <el-option label="成功" value="success">
                                    </el-option>
                                    <el-option label="失败" value="fail">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item class="admin-log-form-item">
                                <el-button type="info" @click="reset">重置</el-button>
                            </el-form-item>

                        </el-col>
                    </el-row>
                    <el-divider content-position="left">日志数据十分钟刷新一次</el-divider>
                    <el-row type="flex" align="middle">
                        <el-col :span="6">
                            <el-form-item label="开始时间" class="admin-log-form-item">
                                <el-date-picker 
                                v-model="queryAdminLogForm.beginTime" 
                                type="datetime" 
                                placeholder="选择日期时间" 
                                format="yyyy-MM-dd hh:mm:ss" 
                                value-format="yyyy-MM-dd hh:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结束时间" class="admin-log-form-item">
                                <el-date-picker 
                                v-model="queryAdminLogForm.endTime" 
                                type="datetime" 
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd hh:mm:ss" 
                                value-format="yyyy-MM-dd hh:mm:ss">>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                        </el-col>
                        <el-col :span="6">
                            <el-form-item class="admin-log-form-item">
                                <el-button type="primary" @click="search">搜索</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
        <el-divider></el-divider>
        <!-- 表格部分 -->
        <div class="info-table">
            <tables ref="adminLogTable" :tableData="tableData" :operationData="operationData" :queryData="queryAdminLogForm" :isSelection="false" @viewJsonData="viewJsonData"
                @delete="deleteAdminLog" @formatFun="formatLogForm" @batchDeleteLog="batchDeleteLog">
            </tables>
        </div>

        <!-- 数据查看框 -->
        <el-dialog title="查看数据" :visible.sync="jsonValueVisible">
            <json-viewer :value="JsonValue" :expand-depth=4 copyable></json-viewer>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="jsonValueVisible = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import adminLogApi from "../request/adminLogApi";
import tables from "@/components/Tables";
export default {
    data() {
        return {
            //编辑弹出框是否打开
            jsonValueVisible: false,
            //搜索表单
            queryAdminLogForm: {
                operator: "",
                action: "",
                result: null,
                beginTimt: null,
                endTime: null,
            },
            //表格数据
            tableData: {
                //把发送请求的函数封装进去
                reqAPi: adminLogApi.getAllLogs,
                // 行尾操作按钮
                operaData: {
                    isShow: true,
                    data: [
                        {
                            label: "查看数据",
                            type: "primary",
                            operafun: "viewJsonData",
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
                        prop: "operator",
                        label: "操作人",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "type",
                        label: "操作类型",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "ip",
                        label: "IP",
                        align: "center",
                    },
                    {
                        prop: "action",
                        label: "操作内容",
                        align: "center",
                    },
                    {
                        prop: "result",
                        label: "操作结果",
                        align: "center",
                    },
                    {
                        prop: "createtime",
                        label: "操作时间",
                        align: "center",
                    },
                    {
                        prop: "timeConsuming",
                        label: "耗时",
                        align: "center",
                    },
                ],
            },
            //表格后操作按钮(一般是批量操作按钮)
            operationData: [
                {
                    id: 2,
                    type: "danger",
                    label: "批量删除",
                    operafun: "batchDeleteLog",
                },
            ],
            JsonValue:""
        };
    },
    components: {
        tables,
    },
    methods: {
        //重置搜索栏
        reset() {
            let _this = this;
            _this.queryAdminLogForm.operator = "";
            _this.queryAdminLogForm.action = "";
            _this.queryAdminLogForm.result = "";
            _this.queryAdminLogForm.beginTime = "";
            _this.queryAdminLogForm.endTime = "";
            _this.$refs.adminLogTable.getTableData();
        },
        // 发送条件搜索请求
        search() {
            this.$refs.adminLogTable.getTableData();
        },
        //表格数据格式化
        formatLogForm(row, column, value, callback) {
            if (column.property === "result") {
                if (value === "success") {
                    value = "成功";
                } else {
                    value = "失败";
                }
            }
            if(column.property === "timeConsuming"){
                value = value + "ms"
            }
            callback(value);
        },
        //查看json数据
        viewJsonData(data){
            let _this = this;
            _this.jsonValueVisible = true;
            _this.JsonValue = JSON.parse(data.data);
        },
        //删除日志
        deleteAdminLog(data) {
            let _this = this;
            _this
                .$confirm("是否要永久删除此日志", "警告", {
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
        // 发送删除日志请求
        toDelete(ids) {
            adminLogApi
                .deleteAdminLogByIds(ids)
                .then((res) => {
                    let result = res.data;
                    if (result.code == 200) {
                        this.$message(result.msg);
                        this.$refs.adminLogTable.getTableData();
                    } else {
                        this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    this.$message.error("服务器错误，请稍后再试");
                });
        },
        //批量删除
        batchDeleteLog(val) {
            let ids = [];
            let _this = this;
            _this
                .$confirm("是否要永久删除这些日志", "警告", {
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
    },
    beforeCreate() {
        adminLogApi.toLog().then((res) => {
            if (res.data.code === 401) {
                this.$router.replace("/");
            }
        });
    },
    mounted() {
    },
};
</script>

<style>
.query-form {
    width: 100%;
}

.admin-log-form {
    width: 100%;
}
.admin-log-form-item {
    margin: 0 auto;
}
</style>