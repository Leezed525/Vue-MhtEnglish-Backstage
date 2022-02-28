<template>
    <div class="Echarts">
        <div ref="allUser" style="width: 100%;height:100%;"></div>
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
                legend: {
                    data: ["用户数", "活跃用户", "新增用户"],
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
                        name: "用户数",
                        type: "line",
                        data: [120, 132, 101, 134, 90, 230, 100],
                        itemStyle: {
                            color: "#fbce5a",
                        },
                    },
                ],
            },
        };
    },
    methods: {
        myEcharts() {
            let _this = this;
            var chartDom = _this.$refs.allUser;
            var myChart = _this.$echarts.init(chartDom);
            let option = _this.option;

            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        getData() {
            let _this = this;
            let option = _this.option;
            let date = [];

            let allUserCount = [];
            adminMainApi.getRecentWeekAllUserCount().then((res) => {
                if (res.data.code === 200) {
                    res.data.data.reverse();
                    res.data.data.forEach((item) => {
                        date.push(item.date.slice(5));
                        allUserCount.push(item.count);
                    });
                    option.xAxis.data = date;
                    option.series[0].data = allUserCount;
                    _this.option = option;
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