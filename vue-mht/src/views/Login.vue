<template>
    <body id="paper">
        <el-form :model="loginForm" class="login-container" label-position="left"
                label-width="0px" v-loading="loading" size="medium">
            <h3 class="login_title">系统登录</h3>
            
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username"
                    auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password"
                    auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>

            <el-checkbox class="login_remember" v-model="loginForm.checked"
                    label-position="left">
                    <span style="color: #505458">自动登录</span>
            </el-checkbox>

            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;border: none;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)" 
                @click="toLogin" round>登录</el-button>
            </el-form-item>
        </el-form>
    </body>
</template>
<script>
import { getCompleteWords ,login } from "@/request/userApi";

let api ={}
api.getCompleteWords = getCompleteWords
api.login = login

export default {
    name:'Login',
    data(){
        return {
            loading:false,
            loginForm:{
                username:'',
                password:'',
                checked:true,
            }
        }
    },
    methods: {
        CompleteWords(){
            let data = {
                user_id:25,
                query : "",
            }
            getCompleteWords(data).then(res => {
                console.log(res);
            })
        },
        toLogin(){
            let _this = this
            let data = {
                username:_this.loginForm.username,
                password:_this.loginForm.password
            }
            api.login(data).then(res => {
                 console.log(res)
            })
        }
    },
    mounted() {

    },
}
</script>
<style>
    #paper {
        background:url("../assets/img/bg/eva1.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0;
    }
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .login_remember {
        margin: 0px 0px 35px 0px;
        text-align: left;
    }
</style>