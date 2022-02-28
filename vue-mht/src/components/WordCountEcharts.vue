<template>
    <div class="Echarts">
        <div ref="user" style="width: 100%;height:100%;"></div>
    </div>
</template>

<script>
import adminMainApi from "@/request/adminMainApi";

export default {
    data() {
        return {
            option: {
                tooltip: {
                    trigger: "axis",
                },

                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "单词背诵量",
                        type: "line",
                        data: [120, 132, 101, 134, 90, 230, 100],
                        smooth: true,
                    },
                ],
            },
        };
    },
    methods: {
        myEcharts() {
            let _this = this;
            var chartDom = this.$refs.user;
            var myChart = this.$echarts.init(chartDom);
            var option = _this.option;

            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        getData() {
            let _this = this;
            let option = _this.option;
            let date = [];
            let wordCounts = [];
            adminMainApi.getAllRecentWeekWordsLearnCount().then((res) => {
                if (res.data.code === 200) {
                    let result = res.data.data;
                    result.reverse();
                    result.forEach((item) => {
                        date.push(item.date.slice(5));
                        wordCounts.push(item.count);
                    });
                    option.xAxis.data = date;
                    option.series[0].data = wordCounts;
                    _this.myEcharts();
                }
            });
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

<style scoped>
.Echarts {
    height: 100%;
    width: 100%;
}
</style>