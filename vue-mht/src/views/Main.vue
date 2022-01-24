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
                                            <div slot="header">用户图表</div>
                                            <user-echarts></user-echarts>
                                        </el-card>
                                        <el-card class="card-item" :body-style="{height:'75%',weight:'100%'}">
                                            <div slot="header">用户地区分布</div>
                                            <region-echarts></region-echarts>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="8" style="height: 100%;">
                                        <el-row style="height: 30%;">
                                            <el-col :span="12" style="height: 100%;">
                                                <el-card :body-style="{height:'50%'}" style="height: 95%;">
                                                    <div class="number-title" slot="header">用户在线人数</div>
                                                    <div class="number-content">
                                                        123456
                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <el-col :span="12" style="height: 100%;">
                                                <el-card :body-style="{height:'50%'}" style="height: 95%;">
                                                    <div class="number-title" slot="header">收录单词</div>
                                                    <div class="number-content">
                                                        654231
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                        <el-card style="height: 70%;" :body-style="{height:'80%'}">
                                            <div slot="header">
                                                <div>
                                                    <div style="float: left;">系统公告</div>
                                                    <div style="float: right;">
                                                        <el-link>
                                                            管理公告
                                                            <i class="el-icon-arrow-right"></i>
                                                        </el-link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                123
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
export default {
    components: { UserEcharts, RegionEcharts },
    data() {
        return {
            userInfo: {},
            nowDate: "", // 当前日期
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
        currentTime() {
            setInterval(this.formatDate, 500);
        },
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
    },
    mounted() {
        this.currentTime();
    },
    created() {
        let _this = this;
        _this.userInfo = _this.$store.state.userInfo;
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