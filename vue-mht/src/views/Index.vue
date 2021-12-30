<template>
    <div class="home">
        <el-container style="height: 100%;width: 100%;">
            <el-header class=""> header</el-header>
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
            <el-footer>
                footer
            </el-footer>
        </el-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Slider from "@/components/Slider.vue";
export default {
    name: "Home",
    components: {
        Slider,
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
.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
</style>


