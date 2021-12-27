<template>
    <el-menu :default-active="$route.path" class="slider" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
        <el-menu-item index="/main">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu v-for="(item,index) in menuList" :key="index" :index='item.id'>
            <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="child in item.children" :key="child.id" :index='child.index'>{{child.childtitle}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "Slider",
    data() {
        return {
            menuList: [
                {
                    id: "1",
                    title: "基础管理",
                    icon: "el-icon-location",
                    children: [
                        {
                            index: "/page1",
                            childtitle: "单词管理",
                        },
                        {
                            index: "/page2",
                            childtitle: "用户管理",
                        },
                    ],
                },
                {
                    id: "2",
                    title: "权限管理",
                    icon: "el-icon-location",
                    children: [
                        {
                            index: "/page4",
                            childtitle: "权限管理",
                        },
                        {
                            index: "/page4",
                            childtitle: "角色管理",
                        },
                        {
                            index: "/AdminUser",
                            childtitle: "管理人员管理",
                        },
                    ],
                },
                {
                    id: "3",
                    title: "系统管理",
                    icon: "el-icon-location",
                    children: [
                        {
                            index: "/page4",
                            childtitle: "系统公告",
                        },
                        {
                            index: "/page3",
                            childtitle: "系统日志",
                        },
                    ],
                },
            ],
        };
    },
};
</script>
<style scoped>
.slider {
  height: 100%;
}
</style>
