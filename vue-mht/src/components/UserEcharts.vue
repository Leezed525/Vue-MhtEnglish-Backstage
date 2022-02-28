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
                legend: {
                    data: ["活跃用户", "新增用户"],
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
                        name: "活跃用户",
                        type: "line",
                        data: [220, 182, 191, 234, 290, 330, 310],
                    },
                    {
                        name: "新增用户",
                        type: "line",
                        data: [150, 232, 201, 154, 190, 330, 410],
                    },
                ],
            },
        };
    },
    methods: {
        myEcharts() {
            let _this = this;
            var chartDom = _this.$refs.user;
            var myChart = _this.$echarts.init(chartDom);
            let option = _this.option;

            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        getData() {
            Promise.all([
                adminMainApi.getRecentWeekNewUserCount(),
                adminMainApi.getRecentWeekActiveUserCount(),
            ]).then((res) => {
                let _this = this;
                let result0 = res[0];
                let option = _this.option;
                let date = [];
                let newUserCount = [];
                if (result0.data.code === 200) {
                    result0.data.data.reverse();
                    result0.data.data.forEach((item) => {
                        date.push(item.date.slice(5));
                        newUserCount.push(item.count);
                    });
                    option.xAxis.data = date;
                    option.series[1].data = newUserCount;
                }

                let result1 = res[1];
                let activeUserCount = [];
                if (result1.data.code === 200) {
                    result1.data.data.reverse();
                    result1.data.data.forEach((item) => {
                        activeUserCount.push(item.count);
                    });
                    option.series[0].data = activeUserCount;
                }

                _this.option = option;
                _this.myEcharts();
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