<template>
    <body id="paper">
        <el-form :model="loginForm" class="login-container" label-position="left" :rules="rules"
                label-width="0px" ref="loginForm" v-loading="loading" size="medium">
            <h3 class="login_title">系统登录</h3>
            
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username"
                    auto-complete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password"
                    auto-complete="off" placeholder="请输入密码" @keydown.enter.native="toLogin"></el-input>
            </el-form-item>

            <el-form-item>
                <el-checkbox class="login_remember" v-model="loginForm.rememberMe"
                    label-position="left">
                    <span style="color: #505458">记住密码</span>
                </el-checkbox>
                <el-checkbox class="login_autologin" v-model="loginForm.autoLogin"
                    label-position="right">
                    <span style="color: #505458">自动登录</span>
                </el-checkbox>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;border: none;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)" 
                @click="submitForm('loginForm')" round>登录</el-button>
            </el-form-item>
        </el-form>
    </body>
</template>
<script>
// 引入base64加密


import userApi from "@/request/userApi";

export default {
    name:'Login',
    data(){
        return {
            loading:false,
            loginForm:{
                username:'',
                password:'',
                autoLogin:false,
                rememberMe:true
            },
            //表单校验规则
            rules: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                }
        }
    },
    methods: {
        //提交表单
        submitForm(formName) {
            console.log(this.$refs)
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.toLogin()
            } else {
                return false;
            }
        });
        },
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
                    this.saveFormInfo()
                    _this.$store.dispatch("getUserInfoByUsername",_this.loginForm.username);
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
                    _this.$message({
                        type:"success",
                        message: result.msg,
                        center:true,
                        duration:500,
                        onClose:function(){
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

        //储存表单信息
        saveFormInfo(){
            // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
            // 如果没有勾选，储存的信息为空
            let _this = this
            if(_this.loginForm.rememberMe){
                _this.setCookie("username",_this.loginForm.username)
                // base64加密密码
                let password = _this.$BASE64.encode(_this.loginForm.password)
                _this.setCookie("password",password)    
            }else{
                _this.setCookie("username","")
                _this.setCookie("password","") 
            } 
        },

        // 获取cookie
        getCookie(key) {
            if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(key + '=')
            if (start !== -1) {
                start = start + key.length + 1
                var end = document.cookie.indexOf(';', start)
                if (end === -1) end = document.cookie.length
                return unescape(document.cookie.substring(start, end))
            }
            }
            return ''
        },
        // 保存cookie
        setCookie(cName, value, expiredays) {
            var exdate = new Date()
            exdate.setDate(exdate.getDate() + expiredays)
            document.cookie = cName + '=' + decodeURIComponent(value) +
            ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
        },
    },
    created() {
        let _this = this
        let token = _this.$store.state.token
        if(token != null && token != ""){
            _this.$message({
                type:"success",
                message: "您已登录",
                center:true,
                duration:500,
                onClose:function(){
                    //跳转至首页
                    _this.$router.replace("/")
                }
            })
        }
    },
    mounted() {
        let _this = this
         // 在页面加载时从cookie获取登录信息
        let username = this.getCookie("username")
        let password = _this.$BASE64.decode(this.getCookie("password"))
        // 如果存在赋值给表单，并且将记住密码勾选
        if(username != null && username != ""){
            this.loginForm.username = username
            this.loginForm.password = password
            this.loginForm.remember = true
        }
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
        text-align: left;
    }
    .login_autologin{
        text-align: left;
        margin-right: 10px;
        float: right;
    }
</style>