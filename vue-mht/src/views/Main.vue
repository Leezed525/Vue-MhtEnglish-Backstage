<template>
    <div style="height: 100%;">
        <el-container>
            <el-header>
                <el-card>
                    <div>
                        欢迎来到棉花糖English后台管理系统
                    </div>
                </el-card>
            </el-header>
            <el-main style="height: 100%;">
                <el-card class="main-content" :body-style="{ height: '95%',padding : '15px'}">
                    <div style="height: 95%;">
                        <div>
                            <el-divider content-position="right">尊敬的{{ this.userInfo.nickname}}，你好!现在是{{nowDate}}</el-divider>
                        </div>
                        <div style="height: 95%;">
                            <div style="height: 100%; background-color: #fff;">
                                <el-row style="height: 100%;" type="flex">
                                    <el-col :span="8" style="height: 100%;">
                                        <el-card class="card-item" :body-style="{height:'75%',weight:'100%'}">
                                            <div slot="header">用户动态</div>
                                            <user-echarts></user-echarts>
                                        </el-card>
                                        <el-card class="card-item" :body-style="{height:'75%',weight:'100%'}">
                                            <div slot="header">总用户</div>
                                            <region-echarts></region-echarts>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="8" style="height: 100%;">
                                        <el-row style="height: 30%;">
                                            <el-col :span="12" style="height: 100%;">
                                                <el-card :body-style="{height:'50%'}" style="height: 95%;">
                                                    <div class="number-title" slot="header">用户在线人数</div>
                                                    <div class="number-content">
                                                        {{onlineUsersCount}}
                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <el-col :span="12" style="height: 100%;">
                                                <el-card :body-style="{height:'50%'}" style="height: 95%;">
                                                    <div class="number-title" slot="header">收录单词</div>
                                                    <div class="number-content">
                                                        {{wordCount}}
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                        <el-card style="height: 70%;" :body-style="{height:'80%'}">
                                            <div slot="header">
                                                <div>
                                                    <div style="float: left;">系统公告</div>
                                                    <div style="float: right;">
                                                        <el-link @click="toNotice">
                                                            管理公告
                                                            <i class="el-icon-arrow-right"></i>
                                                        </el-link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <el-table :data="NoticeList">
                                                    <el-table-column property="title" label="标题" align="center"></el-table-column>
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
                                                </el-dialog>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="8" style="height: 100%;">
                                        <el-card class="card-item" :body-style="{height:'75%',weight:'100%'}">
                                            <div slot="header">全站单词背诵量</div>
                                            <word-count-echarts></word-count-echarts>
                                        </el-card>
                                        <el-card class="card-item" :body-style="{height:'75%',weight:'100%'}">
                                            <div slot="header">小程序点击量</div>
                                            <hits-echarts></hits-echarts>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import UserEcharts from "../components/UserEcharts.vue";
import RegionEcharts from "../components/RegionEcharts.vue";
import WordCountEcharts from "../components/WordCountEcharts.vue";
import HitsEcharts from "../components/HitsEcharts.vue";

import adminMainApi from "@/request/adminMainApi";
import adminNoticeApi from "@/request/adminNoticeApi";
export default {
    components: { UserEcharts, RegionEcharts },
    data() {
        return {
            userInfo: {},
            nowDate: "", // 当前日期
            wordCount: 1,
            onlineUsersCount: 1,
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
    computed: {},
    components: {
        UserEcharts,
        RegionEcharts,
        WordCountEcharts,
        HitsEcharts,
    },
    methods: {
        //显示现在时间
        currentTime() {
            setInterval(this.formatDate, 500);
        },
        //时间格式化
        formatDate() {
            let date = new Date();
            let year = date.getFullYear(); // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日
            let week = date.getDay(); // 星期
            let weekArr = [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
            ];
            let hour = date.getHours(); // 时
            hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
            let minute = date.getMinutes(); // 分
            minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
            let second = date.getSeconds(); // 秒
            second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
            this.nowDate = `${year}年${month}月${day}日 ${hour}:${minute}:${second} ${weekArr[week]}`;
        },
        //获得单词总数
        getWordCount() {
            let _this = this;
            adminMainApi.getWordCount().then((res) => {
                if (res.data.code === 200) {
                    _this.wordCount = res.data.data;
                    _this.wordCount = (
                        Array(6).join(0) + _this.wordCount
                    ).slice(-6);
                }
            });
        },

        //获取在线用户数
        getOnlineUserCount() {
            let _this = this;
            adminMainApi.getOnlineUserCount().then((res) => {
                if (res.data.code === 200) {
                    _this.onlineUsersCount = res.data.data;
                    _this.onlineUsersCount = (
                        Array(6).join(0) + _this.onlineUsersCount
                    ).slice(-6);
                }
            });
        },
        //获取管理员公告
        getNotice() {
            let _this = this;
            adminNoticeApi.getAdminNoticeById().then((res) => {
                if (res.data.code === 200) {
                    _this.NoticeList = res.data.data;
                }
            });
        },
        //显示公告
        showNotice(data) {
            let _this = this;
            _this.showingNotice = data;
            _this.showNoticeVisible = true;
        },

        toNotice() {
            adminNoticeApi.toNotice().then((res) => {
                if (res.data.code === 200) {
                    this.$router.replace("/notice");
                }
            });
        },
    },
    mounted() {
        let _this = this;
        _this.currentTime();
        _this.getWordCount();
        _this.getOnlineUserCount();
    },
    created() {
        let _this = this;
        _this.userInfo = _this.$store.state.userInfo;
        _this.getNotice();
    },
    beforeDestroy() {
        if (this.formatDate) {
            clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
        }
    },
};
</script>

<style scope>
.el-header {
    width: 100%;
    text-align: center;
}
.el-container {
    height: 100%;
}
.main-content {
    height: 100%;
    width: 100%;
}
.card-item {
    height: 50%;
}
.number-title {
    text-align: center;
}
.number-content {
    text-align: center;
    font-size: 70px;
    line-height: 80px;
    font-family: "electronicFont";
    color: #1071a1;
}
</style>