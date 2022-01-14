<template>
    <div class="home">
        <el-container style="height: 100%;width: 100%;">
            <el-header>
                <LeeHeader></LeeHeader>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <slider></slider>
                </el-aside>
                <el-main>
                    <div class="content">
                        <div class="content-tab">
                            <router-view />
                        </div>
                    </div>
                </el-main>
            </el-container>
            <el-footer >
                <LeeFooter></LeeFooter>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Slider from "@/components/Slider.vue";
import LeeFooter from "@/components/LeeFooter.vue";
import LeeHeader from "@/components/LeeHeader.vue";
export default {
    name: "Home",
    components: {
        Slider,
        LeeFooter,
        LeeHeader
    },
    data() {
        return {};
    },
    methods: {

    },
    mounted() {
    },
    computed: {

    },
    watch: {
    },
};
</script>
<style scoped >
.home {
    height: 100vh;
}
.app-wrap {
    padding: 20px;
}
.content {
    height: 100%;
}
.content-tab {
}
.content-wrap {
    height: 90%;
    border: 1px solid #dcdff7;
    border-top: none;
    margin-bottom: 10px;
}
.el-tabs.el-tabs--border-card {
    box-shadow: none;
}
.el-header{
    background-color:#67bfeb;
    text-align: center;
    line-height: 60px;
}
.el-footer {
    background-color: #212427;
    text-align: center;
    line-height: 60px;
}
</style>


