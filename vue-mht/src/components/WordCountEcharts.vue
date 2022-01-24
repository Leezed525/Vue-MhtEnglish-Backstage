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
                        smooth:true
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