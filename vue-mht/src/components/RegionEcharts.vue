<template>
    <div class="Echarts">
        <div ref="region" style="width: 100%;height:100%;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        myEcharts() {
            var chartDom = this.$refs.region;
            var myChart = this.$echarts.init(chartDom);
            var option;

            option = {
                legend: {
                    top: "bottom",
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        restore: { show: true },
                        saveAsImage: { show: true },
                    },
                },
                series: [
                    {
                        name: "Nightingale Chart",
                        type: "pie",
                        radius: ['20%', '80%'],
                        center: ["50%", "45%"],
                        roseType: "area",
                        itemStyle: {
                            borderRadius: 8,
                        },
                        data: [
                            { value: 40, name: "rose 1" },
                            { value: 38, name: "rose 2" },
                            { value: 32, name: "rose 3" },
                            { value: 30, name: "rose 4" },
                        ],
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