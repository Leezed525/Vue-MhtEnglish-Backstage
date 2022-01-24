<template>
    <div class="Echarts">
        <div ref="hits" style="width: 100%;height:100%;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        myEcharts() {
            var chartDom = this.$refs.hits;
            var myChart = this.$echarts.init(chartDom);
            var option;

            option = {
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
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Fri", "Fri"],
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
                        data: [
                            {
                                value: 20,
                                itemStyle: {
                                    color: "#91cc75",
                                },
                            },
                            {
                                value: 150,
                                itemStyle: {
                                    color: "#91cc75",
                                },
                            },
                            {
                                value: 80,
                                itemStyle: {
                                    color: "#91cc75",
                                },
                            },
                            {
                                value: 100,
                                itemStyle: {
                                    color: "#91cc75",
                                },
                            },
                            {
                                value: 120,
                                itemStyle: {
                                    color: "#91cc75",
                                },
                            },
                            {
                                value: 130,
                                itemStyle: {
                                    color: "#91cc75",
                                },
                            },
                            {
                                value: 140,
                                itemStyle: {
                                    color: "#91cc75",
                                },
                            },
                        ],
                        type: "bar",
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
    height: 85%;
    width: 100%;
}
</style>