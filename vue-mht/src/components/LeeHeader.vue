<template>
    <header style="width: 100%;">
        <el-row style="width: 100%;" type="flex">
            <el-col :span="3">
                <div>
                    MHTEnglish后台管理系统
                </div>
            </el-col>
            <el-col :span="19"></el-col>
            <el-col :span="1" @click.native="NoitceListVisible = true">
                <i class="el-icon-s-promotion" style="font-size:25px">
                    <el-badge v-if="needConfirmNoticeCount > 0" :value="needConfirmNoticeCount" />
                </i>
            </el-col>
            <el-col :span="1">
                <div class="opt-wrapper">
                    <el-dropdown :hide-on-click="false">
                        <span class="el-dropdown-link"><img :src="avatar" alt="" class="avatar" /></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided @click.native="changePassword()"> <i class="el-icon-info"></i>修改密码 </el-dropdown-item>
                            <el-dropdown-item divided @click.native="logOut()"><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>

        <!-- 修改密码框 -->
        <el-dialog title="修改密码" :visible.sync="confirmPasswordFormVisable" width="30%" :close-on-click-modal="false">
            <el-form :model="changePasswordForm" label-position="left" :rules="changePasswordFormRules" ref="changePasswordForm">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input v-model="changePasswordForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="changePasswordForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePassword">
                    <el-input v-model="changePasswordForm.rePassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="confirmPasswordFormVisable = false">取 消</el-button>
                <el-button type="primary" @click="toChangePassword()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 公告栏 -->
        <el-dialog title="公告列表" :visible.sync="NoitceListVisible">
            <el-table :data="NoticeList">
                <el-table-column property="status" label="状态" width="100" align="center" :formatter="formatFun"></el-table-column>
                <el-table-column property="publishTime" label="发布日期" width="200" align="center"></el-table-column>
                <el-table-column property="title" label="标题" width="200" align="center"></el-table-column>
                <el-table-column property="author.nickname" label="作者" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="showNotice(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 公告查看栏 -->
            <el-dialog title="公告查看" :visible.sync="showNoticeVisible" append-to-body>
                <div style="height:50vh;overflow-Y: auto;">
                    <div>
                        <h1 class="notice-title">
                            {{showingNotice.title}}
                        </h1>
                        <br />
                    </div>
                    <quill-editor ref="showingDialog" v-model="showingNotice.content" :options="showingOption"></quill-editor>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button v-if="showingNotice.status === 0" type="primary" @click="confirmNotice">我已确认</el-button>
                </div>
            </el-dialog>
        </el-dialog>
    </header>

</template>

<script>
import adminUserApi from "../request/adminUserApi";
import adminNoticeApi from "@/request/adminNoticeApi";

export default {
    data() {
        var checkRePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.changePasswordForm.newPassword) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            //websocketURL
            path: "wss://www.leezed525.top:8088/mhtEnglish/adminNoticeSocket/",
            // path: "ws://localhost:8080/mhtEnglish/adminNoticeSocket/",
            //头像地址
            avatar: require("@/assets/img/icon/icon6.png"),
            //修改密码弹窗框是否显示
            confirmPasswordFormVisable: false,
            //修改密码表单
            changePasswordForm: {
                oldPassword: "",
                newPassword: "",
                rePassword: "",
            },
            //修改密码表单校验规则
            changePasswordFormRules: {
                oldPassword: [
                    {
                        required: true,
                        message: "请输入原密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur",
                    },
                ],
                newPassword: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur",
                    },
                ],
                rePassword: [{ validator: checkRePassword, trigger: "blur" }],
            },
            socket: "",
            userInfo: "",
            //公告列表是否显示
            NoitceListVisible: false,
            //公告数据
            NoticeList: [],
            // 公告内容显示栏
            showNoticeVisible: false,
            //查看编辑框设置
            showingOption: {
                modules: {
                    toolbar: [],
                },
                theme: "snow",
                // disabled:true,
            },
            //当前正在查看的公告
            showingNotice: {
                id: 0,
                title: "",
                content: "",
            },
        };
    },
    computed: {
        needConfirmNoticeCount() {
            let _this = this;
            let count = 0;
            _this.NoticeList.forEach((item) => {
                if (item.status === 0) {
                    count += 1;
                }
            });
            return count;
        },
    },
    methods: {
        //修改密码弹出框打开
        changePassword() {
            let _this = this;
            _this.confirmPasswordFormVisable = true;
        },
        //发送请求去修改密码
        toChangePassword() {
            let _this = this;
            this.$refs["changePasswordForm"].validate((valid) => {
                if (valid) {
                    let data = {
                        oldPassword: _this.changePasswordForm.oldPassword,
                        newPassword: _this.changePasswordForm.newPassword,
                        userId: _this.$store.state.userInfo.id,
                    };
                    adminUserApi.changePassword(data).then((res) => {
                        let result = res.data;
                        if (result.code == 200) {
                            _this.$message({
                                message: "修改成功,请重新登录",
                                type: "success",
                            });
                            _this.logOut();
                        } else {
                            _this.$refs["changePasswordForm"].resetFields();
                            _this.$message({
                                message: result.msg,
                                type: "error",
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        //登出
        logOut() {
            let _this = this;
            _this.$store.dispatch("logout");
            _this.$router.replace({ path: "/login" });
        },
        //表格数据格式化函数
        formatFun(row, column, value) {
            if (value > 0) {
                return "已读";
            } else {
                return "未读";
            }
        },
        //获取公告
        getNotice() {
            let _this = this;
            adminNoticeApi.getAdminNoticeById().then((res) => {
                // console.log(res);
                _this.NoticeList = res.data.data;
            });
        },
        //显示公告
        showNotice(data) {
            let _this = this;
            _this.showingNotice = data;
            _this.showNoticeVisible = true;
        },
        //确认公告
        confirmNotice() {
            let _this = this;
            adminNoticeApi.confirmNotice(_this.showingNotice).then((res) => {
                if (res.data.code === 200) {
                    _this.$message.success(res.data.msg);
                    _this.showNoticeVisible = false;
                    _this.getNotice();
                } else {
                    _this.$message.error(res.data.msg);
                }
            });
        },

        //websocket获得发布消息
        publishNotice(notice) {
            let _this = this;
            _this.$message.info("有新的公告");
            let data = {
                status: 0,
                id: notice.id,
                publishTime: notice.publishTime,
                title: notice.title,
                content: notice.content,
                author: notice.author,
            };
            _this.NoticeList.unshift(data);
        },
        //websocket获得撤回消息
        cancelNotice(notice) {
            let _this = this;
            _this.$message.info("有公告被撤回了");
            for (let i = 0; i < _this.NoticeList.length; i += 1) {
                if (_this.NoticeList[i].id === notice.id) {
                    _this.NoticeList.splice(i, 1);
                    break;
                }
            }
        },
        //初始化发送websocket请求
        init() {
            let _this = this;
            _this.userInfo = _this.$store.state.userInfo;
            if (typeof WebSocket === "undefined") {
                _this.$alert("您的浏览器不支持websocket");
            } else {
                _this.socket = new WebSocket(_this.path + _this.userInfo.username);
                _this.socket.onopen = _this.onOpen;
                _this.socket.onerror = _this.onError;
                _this.socket.onmessage = _this.getMessage;
            }
        },
        onOpen() {
            let _this = this;
            // console.log("WebSocket连接成功");
            _this.getNotice();
        },
        onError() {
            // console.log("连接出错");
        },
        onClose() {
            // console.log("WebSocket关闭");
        },
        getMessage(res) {
            let _this = this;
            let notice = JSON.parse(res.data);
            if (notice.operation === "publish") {
                _this.publishNotice(notice);
            } else {
                _this.cancelNotice(notice);
            }
        },
    },
    mounted() {
        let _this = this;
        _this.init();
    },
    destroyed() {
        _this.socket.onclose = _this.onClose;
    },
};
</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
}
.avatar {
    margin-top: 10px;
    display: block;
    margin-right: 40px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
}
.notice-title {
    font-size: 40px;
    text-align: center;
}
</style>

