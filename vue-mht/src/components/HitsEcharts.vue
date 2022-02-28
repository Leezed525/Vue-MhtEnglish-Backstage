<template>
    <div class="Echarts">
        <div ref="hits" style="width: 100%;height:100%;"></div>
    </div>
</template>

<script>
import adminMainApi from "@/request/adminMainApi";
var myChart;
export default {
    data() {
        return {
            option: {
                tooltip: {
                    trigger: "axis",
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: "category",
                    // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Fri", "Fri"],
                },
                yAxis: {
                    type: "value",
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                series: [
                    {
                        // data: [20, 150, 80, 100, 120, 130, 140],
                        itemStyle: {
                            color: "#91cc75",
                        },
                        type: "bar",
                    },
                ],
            },
        };
    },
    methods: {
        myEcharts() {
            let _this = this;
            var chartDom = _this.$refs.hits;
            myChart = _this.$echarts.init(chartDom);
            let option = _this.option;
            _this.option = option;
            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        getRecentHitCount() {
            let _this = this;
            let option = _this.option;
            let date = [];
            let hitCounts = [];
            adminMainApi.getRecentWeekHitCount().then((res) => {
                if (res.data.code === 200) {
                    let result = res.data.data;
                    result.reverse();
                    result.forEach((item) => {
                        date.push(item.createDate.slice(5));
                        hitCounts.push(item.count);
                    });
                    option.xAxis.data = date;
                    option.series[0].data = hitCounts;
                    _this.myEcharts()
                }
            });
        },
    },
    mounted() {
        this.getRecentHitCount();
    },
};
</script>

<style scoped>
.Echarts {
    height: 85%;
    width: 100%;
}
</style>