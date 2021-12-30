<template>
    <div>
        <el-card>
            <el-table :data="tableList" style="width: 100%" height="100%" :height="400" :max-height="440" v-loading="loading" element-loading-text="加载中，请稍后..."
                @selection-change="handleSelectionChange">

                <el-table-column type="selection" align="center" label="序号" width="50">
                </el-table-column>
                <el-table-column v-for="it in tableData.columnData" :key="it.name" :prop="it.prop" :align="it.align" :label="it.label" :width="it.width" :need="it.needFormat"
                    :formatter="formatAvailable">
                </el-table-column>
                <!-- 操作 -->
                <el-table-column v-if="tableData.operaData.isShow" fixed="right" label="操作" align="center" :width="tableData.operaData.data.length*80">
                    <template slot-scope="scope">
                        <el-button v-for="(it,index) in tableData.operaData.data" :key="it.label" :type="it.type" @click="btnClick(it.operafun,scope.row)" plain size="small">{{it.label}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-row :span="24">
                <!-- 分页 -->
                <el-col :span="16">
                    <!-- 分页 -->
                    <el-pagination style="margin: 40px 0 10px 30px;" background @size-change="pageSizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="pageSize"
                        :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </el-col>
                <!-- 表格操作按钮 -->
                <el-col :span="8">
                    <div class="operations" style="margin: 40px 0 10px 30px;">
                        <el-button v-for="item in operationData" :key="item.id" :type="item.type" @click="btnClick(item.operafun,tableSelection)">{{item.label}}</el-button>
                    </div>
                </el-col>
            </el-row>

        </el-card>
    </div>

</template>

<script>
var reqApi = {};
export default {
    name: "tables",
    props: {
        //表格数据
        tableData: {
            type: Object,
            default: () => [],
        },
        //表格后操作按钮数据
        operationData: {
            type: Array,
            default: () => [],
        },
        //查询元素
        queryData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            loading: false,
            tableList: [], //表格渲染数据
            currentPage: 1, //当前页
            pageSize: [5, 10, 20, 50, 100], //页数选择
            total: 0, //总条数
            limit: 5, //分页数
            tableSelection: [],
        };
    },
    mounted() {
        //剥离出从父组件传过来的数据请求函数
        reqApi.request = this.tableData.reqAPi;
        this.getTableData();
    },
    methods: {
        // 获取远程数据
        getTableData() {
            let _this = this;
            _this.loading = true;

            //获取父组件传过来的查询条件
            let querydata = _this.queryData;

            //封装数据
            let data = {
                ...querydata,
                page: _this.currentPage,
                limit: _this.limit,
            };
            reqApi
                .request(data)
                .then((res) => {
                    //发送请求
                    _this.loading = false;
                    let result = res.data;
                    if (result.code == 200) {
                        _this.$message({
                            type: "success",
                            message: result.msg,
                            center: true,
                            duration: 500,
                        });
                        //将获取到的数据填充到表格中
                        this.tableList = result.data.list;
                        //给予数据总数用以分页（没有这个分页组件失效）
                        this.total = result.data.total;
                    } else {
                        //失败
                        _this.$message({
                            type: "error",
                            message: result.msg,
                            center: true,
                            duration: 500,
                        });
                    }
                })
                .catch((error) => {
                    //异常
                    _this.loading = false;
                    _this.$message({
                        type: "error",
                        message: "服务器错误",
                        center: true,
                        duration: 500,
                    });
                });
        },
        // 条数选择
        pageSizeChange(val) {
            this.limit = val;
            this.currentPage = 1;
            this.getTableData();
        },
        // 当前页选择
        currentChange(val) {
            this.currentPage = val;
            this.getTableData();
        },
        // 触发父父组件事件按钮
        //data 数据，
        //fun 父组件函数名
        btnClick(fun, data) {
            // console.log(fun);
            // this.$emit("click_" + (idx + 1), e);
            this.$emit(fun, data);
        },
        formatAvailable(row, column, value) {
            //检查有没有给table组件绑定format方法
            let finalValue;
            if (this.$listeners["formatFun"]) {
                // 如果提供执行
                this.$emit("formatFun", row, column, value, (val) => {
                    finalValue = val;
                });
                return finalValue;
            } else {
                return value;
            }
        },
        //处理选中数据事件
        handleSelectionChange(val) {
            this.tableSelection = val;
        },
    },
};
</script>

<style>
</style>
