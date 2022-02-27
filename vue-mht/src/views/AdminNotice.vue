<template>
    <div>
        <!-- 上方搜索框 -->
        <el-card>
            <div class="query-form">
                <el-form :inline="true" :model="queryAdminNoticeForm" class="admin-notice-form">
                    <el-row type="flex" align="middle">
                        <el-col :span="6" style="justify-content: center;">
                            <el-form-item label="发布者" class="admin-notice-form-item">
                                <el-input v-model="queryAdminNoticeForm.authorUserName" placeholder="请输入发布者" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="公告标题" class="admin-notice-form-item">
                                <el-input v-model="queryAdminNoticeForm.title" placeholder="请输入公告标题" @keydown.enter.native="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="公告类型" class="admin-notice-form-item">
                                <el-select v-model="queryAdminNoticeForm.type" placeholder="请选择公告类型" clearable>
                                    <el-option label="管理员公告" value="adminUsers">
                                    </el-option>
                                    <el-option label="用户公告" value="users">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item class="admin-notice-form-item">
                                <el-button type="info" @click="reset">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>
                    <el-row type="flex" align="middle">
                        <el-col :span="9">
                            <el-form-item label="发布时间" class="admin-notice-form-item">
                                <el-date-picker v-model="publishTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                    align="right" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="更新时间" class="admin-notice-form-item">
                                <el-date-picker v-model="updateTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                    align="right" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item class="admin-notice-form-item">
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
            <tables ref="adminNoticeTable" :tableData="tableData" :operationData="operationData" :queryData="queryAdminNoticeForm" :isSelection="false" @updateNotice="updateNotice"
                @delete="deleteAdminNotice" @formatFun="formatLogForm" @showNotice="showNotice" @addNotice="addNotice" @publish="publish" @cancel="cancel">
            </tables>
        </div>

        <!-- 公告查看框 -->
        <el-dialog title="公告查看" :visible.sync="showContentVisible">
            <div style="height:50vh;overflow-Y: auto;">
                <div>
                    <h1 class="notice-title">
                        {{showingTitle}}
                    </h1>
                    <br />
                </div>
                <quill-editor ref="showingDialog" v-model="showingContent" :options="showingOption"></quill-editor>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showContentVisible = true">关闭</el-button>
            </div>
        </el-dialog>

        <!-- 公告编辑框 -->
        <el-dialog title="编辑公告" :visible.sync="updateNoticeFormVisible" :close-on-click-modal="false">
            <el-form :model="updateNoticeForm" label-position="left" label-width="80px" :rules="updateNoticeFormRules" ref="updateNoticeForm">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="updateNoticeForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <quill-editor ref="editor" v-model="updateNoticeForm.content" :options="editorOption"></quill-editor>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="toUpdateAdminNotice(updateNoticeForm)">保存</el-button>
            </div>
        </el-dialog>

        <!-- 公告新建框 -->
        <el-dialog title="新建公告" :visible.sync="addNoticeFormVisible" :close-on-click-modal="false">
            <el-form :model="addNoticeForm" label-position="left" label-width="80px" :rules="addNoticeFormRules" ref="addNoticeForm">
                <el-row type="flex">
                    <el-col :span="12">
                        <el-form-item label="公告标题" prop="title">
                            <el-input v-model="addNoticeForm.title" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="8">
                        <el-form-item label="公告类型" prop="type">
                            <el-select v-model="addNoticeForm.type" placeholder="请选择公告类型" clearable>
                                <el-option label="管理员公告" value="adminUsers">
                                </el-option>
                                <el-option label="用户公告" value="users">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <quill-editor ref="editor" v-model="addNoticeForm.content" :options="editorOption"></quill-editor>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="toAddAdminNotice(addNoticeForm)">新建</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import adminLogApi from "../request/adminLogApi";
import adminNoticeApi from "@/request/adminNoticeApi";
import tables from "@/components/Tables";

//富文本编辑器头部工具栏
const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
    ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
    [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
    [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
    [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
    // [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
    [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
    [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
    [{ font: [] }], // 字体种类-----[{ font: [] }]
    [{ align: [] }], // 对齐方式-----[{ align: [] }]
    ["clean"], // 清除文本格式-----['clean']
    [], // 链接、图片、视频-----['link', 'image', 'video']
];

export default {
    data() {
        return {
            //搜索表单
            queryAdminNoticeForm: {
                author: "",
                title: "",
                type: "",
                publishBeginTime: "",
                publishEndTime: "",
                updateBeginTime: "",
                updateEndTime: "",
            },
            //公告显示框
            showContentVisible: false,
            //当前显示的公告的标题
            showingTitle: "",
            //当前显示的公告的内容
            showingContent: "",
            //查看编辑框设置
            showingOption: {
                modules: {
                    toolbar: [],
                },
                theme: "snow",
                // disabled:true,
            },
            //编辑弹出框是否打开
            updateNoticeFormVisible: false,
            //编辑公告表单
            updateNoticeForm: {
                title: "",
                content: "",
                available: "",
            },
            //富文本编辑器设置
            editorOption: {
                //  富文本编辑器配置
                modules: {
                    toolbar: toolbarOptions,
                },
                theme: "snow",
                placeholder: "请输入正文",
            },
            //更新表单校验规则
            updateNoticeFormRules: {
                title: [
                    {
                        required: true,
                        message: "必须要有标题",
                        trigger: "blur",
                    },
                ],
            },
            //添加表单显示
            addNoticeFormVisible: false,
            //添加表单内容
            addNoticeForm: {
                title: "",
                content: "",
                type: "",
            },
            //添加表单校验规则
            addNoticeFormRules: {
                title: [
                    {
                        required: true,
                        message: "必须要有标题",
                        trigger: "blur",
                    },
                ],
                type: [
                    {
                        required: true,
                        message: "请选择公告类型",
                        trigger: "change",
                    },
                ],
            },
            //表格数据
            tableData: {
                //把发送请求的函数封装进去
                reqAPi: adminNoticeApi.getAllNotice,
                // 行尾操作按钮
                operaData: {
                    isShow: true,
                    data: [
                        {
                            label: "查看公告",
                            type: "success",
                            operafun: "showNotice",
                        },
                        {
                            label: "编辑公告",
                            type: "primary",
                            operafun: "updateNotice",
                        },
                        {
                            label: "发布",
                            type: "warning",
                            operafun: "publish",
                        },
                        {
                            label: "撤销",
                            type: "info",
                            operafun: "cancel",
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
                        label: "公告id",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "title",
                        label: "公告标题",
                        width: 100,
                        align: "center",
                    },

                    {
                        prop: "createtime",
                        label: "创建时间",
                        align: "center",
                    },
                    {
                        prop: "author.username",
                        label: "创建者",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "type",
                        label: "类型",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "available",
                        label: "是否发布",
                        width: 100,
                        align: "center",
                    },
                    {
                        prop: "publishTime",
                        label: "发布时间",
                        align: "center",
                    },
                ],
            },
            //表格后操作按钮(一般是批量操作按钮)
            operationData: [
                {
                    id: 1,
                    type: "primary",
                    label: "添加公告",
                    operafun: "addNotice",
                },
            ],
            JsonValue: "",
            publishTime: [],
            updateTime: [],
            //时间快速选择工具
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        },
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
            _this.queryAdminNoticeForm.author = "";
            _this.queryAdminNoticeForm.title = "";
            _this.queryAdminNoticeForm.type = "";
            _this.queryAdminNoticeForm.publishBeginTime = "";
            _this.queryAdminNoticeForm.publishEndTime = "";
            _this.queryAdminNoticeForm.updateBeginTime = "";
            _this.queryAdminNoticeForm.updateEndTime = "";
            _this.publishTime = [];
            _this.updateTime = [];
            _this.search();
        },
        // 发送条件搜索请求
        search() {
            this.queryAdminNoticeForm.publishBeginTime = this.publishTime[0];
            this.queryAdminNoticeForm.publishEndTime = this.publishTime[1];
            this.queryAdminNoticeForm.updateBeginTime = this.updateTime[0];
            this.queryAdminNoticeForm.updateEndTime = this.updateTime[1];
            this.$refs.adminNoticeTable.getTableData();
        },
        //表格数据格式化
        formatLogForm(row, column, value, callback) {
            if (column.property === "available") {
                if (value) {
                    value = "已发布";
                } else {
                    value = "未发布";
                }
            }
            if (column.property === "publishTime") {
                if (value === null) {
                    value = "未发布";
                }
            }
            if (column.property === "type") {
                if (value === "all") {
                    value = "所有人公告";
                } else if (value === "adminUsers") {
                    value = "管理员公告";
                } else if (value === "users") {
                    value = "用户公告";
                } else if (value === "newUsers") {
                    value = "新用户公告";
                }
            }
            callback(value);
        },
        //更新公告
        updateNotice(data) {
            let _this = this;
            if (data.available) {
                _this.$msgbox({
                    title: "请注意",
                    message: "当前公告已经发布无法编辑,请先撤回后在编辑",
                    type: "error",
                });
                return false;
            }
            _this.updateNoticeForm.id = data.id;
            _this.updateNoticeForm.title = data.title;
            _this.updateNoticeForm.content = data.content;
            _this.updateNoticeForm.available = data.available;
            _this.updateNoticeFormVisible = true;
        },
        //去更新公告
        toUpdateAdminNotice(notice) {
            let _this = this;
            _this.$refs["updateNoticeForm"].validate((valid) => {
                if (valid) {
                    adminNoticeApi.updateNotice(notice).then((res) => {
                        if (res.data.code === 200) {
                            _this.$message.success(res.data.msg);
                            _this.updateNoticeFormVisible = false;
                            _this.search();
                        } else {
                            _this.$message.error(res.data.msg);
                        }
                    });
                }
            });
        },
        addNotice() {
            let _this = this;
            _this.addNoticeFormVisible = true;
        },
        toAddAdminNotice(notice) {
            let _this = this;
            _this.$refs["addNoticeForm"].validate((valid) => {
                if (valid) {
                    _this.$msgbox({
                        title: "请注意",
                        message: "公告一旦创建后不能修改公告类型",
                        type: "warning",
                        callback(action) {
                            if (action === "confirm") {
                                adminNoticeApi.addNotice(notice).then((res) => {
                                    if (res.data.code === 200) {
                                        _this.addNoticeFormVisible = false;
                                        _this.$message.success(res.data.msg);
                                        _this.$refs[
                                            "addNoticeForm"
                                        ].resetFields();
                                        _this.addNoticeForm.content = "";
                                        _this.search();
                                    } else {
                                        _this.$message.error(res.data.msg);
                                    }
                                });
                            }
                        },
                    });
                }
            });
        },

        //删除公告
        deleteAdminNotice(data) {
            let _this = this;
            _this
                .$confirm("是否要永久删除此公告", "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    _this.toDelete(data);
                })
                .catch(() => {});
        },
        // 发送删除公告
        toDelete(data) {
            let _this = this;
            adminNoticeApi
                .deleteAdminNotice(data)
                .then((res) => {
                    let result = res.data;
                    if (result.code == 200) {
                        _this.$message.success(result.msg)
                        _this.search()
                        _this.$message(result.msg);
                        _this.search();
                    } else {
                        _this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    _this.$message.error("服务器错误,请稍后再试");
                });
        },
        // 公告查看
        showNotice(data) {
            let _this = this;
            _this.showingContent = data.content;
            _this.showingTitle = data.title;
            _this.showContentVisible = true;
            _this.$nextTick(() => {
                _this.$refs.showingDialog.quill.enable(false);
            });
        },
        //公告发布
        publish(data) {
            let _this = this;
            if (data.available) {
                _this.$alert("当前公告已经发布,无需在发布");
                return false;
            }
            _this
                .$confirm("您确定要发布这个公告嘛？", "提示", {
                    type: "warning",
                })
                .then(() => {
                    adminNoticeApi.publishNotice(data).then((res) => {
                        if (res.data.code === 200) {
                            _this.$message.success(res.data.msg);
                            _this.search();
                        } else {
                            _this.$message.error(res.data.msg);
                        }
                    });
                })
                .catch(() => {});
        },
        //公告撤销
        cancel(data) {
            let _this = this;
            if (!data.available) {
                _this.$alert("当前公告还未发布,无需撤销");
                return false;
            }
            _this
                .$confirm("您确定要撤回这个公告嘛？", "提示", {
                    type: "warning",
                })
                .then(() => {
                    adminNoticeApi.cancelNotice(data).then((res) => {
                        if (res.data.code === 200) {
                            _this.$message.success(res.data.msg);
                            _this.search();
                        } else {
                            _this.$message.error(res.data.msg);
                        }
                    });
                })
                .catch(() => {});
        },
    },
    beforeCreate() {
        adminNoticeApi.toNotice().then((res) => {
            if (res.data.code === 401) {
                this.$router.replace("/");
            }
        });
    },
    mounted() {},
};
</script>

<style scoped>
.query-form {
    width: 100%;
}

.admin-notice-form {
    width: 100%;
}
.admin-notice-form-item {
    margin: 0 auto;
}
.notice-title {
    font-size: 40px;
    text-align: center;
}
</style>