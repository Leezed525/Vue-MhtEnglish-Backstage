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
                    auto-complete="off" placeholder="密码" @keydown.enter.native="toLogin"></el-input>
            </el-form-item>

            <el-checkbox class="login_remember" v-model="loginForm.autoLogin"
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
import userApi from "@/request/userApi";

export default {
    name:'Login',
    data(){
        return {
            loading:false,
            loginForm:{
                username:'',
                password:'',
                autoLogin:true,
            }
        }
    },
    methods: {
        toLogin(){
            let _this = this
            _this.loading = true
            let autoLogin = _this.loginForm.autoLogin
            let data = {
                username:_this.loginForm.username,
                password:_this.$MD5(_this.loginForm.password.trim()),
            }
            console.log(data)
            userApi.login(data).then(res => {
                let result = res.data
                if(result.code == 200){

                    _this.$store.dispatch("getUserInfoByUsername",_this.loginForm.username);
                    _this.$message({
                        type:"success",
                        message: result.msg,
                        center:true,
                        duration:500,
                        onClose:function(){
                            let token = result.data
                            //如果自动登录就把token 存入localStorage,这样一打开也不用登录
                            if(autoLogin){
                                window.localStorage.setItem("mhtToken", token);
                            }
                            //如果不是自动登录的话，刷新一下页面就没，目前逻辑是这么写的,虽然这样很蠢，但也算实现了功能
                            //打算之后写成1小时内保持登陆状态,这得加上跟后端的校验，前端纯写这样的逻辑不符合前后端分离的思想
                            else{
                                window.localStorage.removeItem("mhtToken")
                            }
                            //首先将token 存到vuex中
                            _this.$store.dispatch("setToken",token)
                            //跳转至首页
                            _this.$router.replace("/")
                        }
                    })
                } else {
                    //登陆失败清空password框
                    _this.$message({
                        typre:"error",
                        message:result.msg,
                        center:true,
                        duration:500,
                        onClose:function(){
                            _this.loading = false
                            _this.loginForm.password = ""
                        }
                    })
                }
            })
        },
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