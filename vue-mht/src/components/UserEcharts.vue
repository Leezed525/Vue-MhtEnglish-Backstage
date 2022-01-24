<template>
    <div class="Echarts">
        <div ref="user" style="width: 100%;height:100%;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        myEcharts() {
            var chartDom = this.$refs.user;
            var myChart = this.$echarts.init(chartDom);
            var option;

            option = {
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
                    },
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
            };

            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
            // setTimeout(function () {
            //     window.onresize = function () {
            //         myChart.resize();
            //     };
            // }, 200);
        },
    },
    mounted() {
        this.myEcharts();
    },
};
</script>

<style scoped>
.Echarts {
    height: 100%;
    width: 100%;
}
</style>