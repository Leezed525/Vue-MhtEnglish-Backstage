<template>
    <el-card>
        <el-table :data="tableList" style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="50">
                <template slot-scope="scope">
                    <span>{{scope.$index+1+(currentPage-1)*limit}}</span>
                </template>
            </el-table-column>
            <el-table-column v-for="it in tableData.columnData" :key="it.name" :prop="it.prop" :align="it.align" :label="it.label" :width="it.width">
            </el-table-column>
            <!-- 操作 -->
            <el-table-column v-if="tableData.operaData.isShow" fixed="right" label="操作" align="center" :width="tableData.operaData.data.length*80">
                <template slot-scope="scope">
                    <el-button v-for="(it,index) in tableData.operaData.data" :key="it.label" :type="it.type" @click="btnClick(scope.row,index)" plain size="small">{{it.label}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination style="margin: 40px 0 10px 30px;" background @size-change="pageSizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="pageSize" :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
import axios from "axios";
export default {
    name: "tables",
    props: {
        tableData: { type: Object, default: () => [] },
    },
    data() {
        return {
            tableList: [], //表格渲染数据
            currentPage: 1, //当前页
            pageSize: [5, 10, 20, 50, 100], //页数选择
            total: 0, //总条数
            limit: 5, //分页数
        };
    },
    mounted() {
        this.getTableData();
    },
    methods: {
        // 获取远程数据
        getTableData() {
            // var data = {
            //     page: this.currentPage,
            //     limit: this.limit,
            // };
            // axios.post(this.tableData.reqUrl, data).then((res) => {
            //     console.log("请求", res.data);
            //     if (res.data.code == 1) {
            //         // this.tableList = res.data.data.list;
            //         this.tableList = [
            //             {
            //                 name: 123,
            //                 time: 20000525,
            //             },
            //             {
            //                 name: 123,
            //                 time: 20000525,
            //             },
            //             {
            //                 name: 123,
            //                 time: 20000525,
            //             },
            //             {
            //                 name: 123,
            //                 time: 20000525,
            //             },
            //         ];
            //         this.total = res.data.data.count;
            //     }
            // });
            this.tableList = [
                {
                    name: 123,
                    time: 20000525,
                },
                {
                    name: 123,
                    time: 20000525,
                },
                {
                    name: 123,
                    time: 20000525,
                },
                {
                    name: 123,
                    time: 20000525,
                },
            ];
            this.total = res.data.data.count;
        },
        // 条数选择
        pageSizeChange(val) {
            this.limit = val;
            this.getTableData();
        },
        // 当前页选择
        currentChange(val) {
            this.currentPage = val;
            this.getTableData();
        },
        // 操作按钮
        btnClick(e, idx) {
            this.$emit("click_" + (idx + 1), e);
        },
    },
};
</script>

<style>
</style>
