<template>
    <header>
        <div>
            MHTEnglish后台管理系统
        </div>
        <div class="opt-wrapper">
            <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link"><img :src="avatar" alt="" class="avatar" /></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item divided @click.native="changePassword()"> <i class="el-icon-info"></i>修改密码 </el-dropdown-item>
                    <el-dropdown-item divided @click.native="logOut()"><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="confirmPasswordFormVisable" width="30%" :close-on-click-modal="false">
            <el-form :model="changePasswordForm" label-position="left" :rules="changePasswordFormRules" ref="changePasswordForm">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input v-model="changePasswordForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="changePasswordForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePassword">
                    <el-input v-model="changePasswordForm.rePassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="confirmPasswordFormVisable = false">取 消</el-button>
                <el-button type="primary" @click="toChangePassword()">确 定</el-button>
            </div>
        </el-dialog>
    </header>

</template>

<script>
import adminUserApi from "../request/adminUserApi";

export default {
    data() {
        var checkRePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.changePasswordForm.newPassword) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };

        return {
            avatar: require("@/assets/img/icon/icon6.png"),
            //展示表单
            confirmPasswordFormVisable: false,
            changePasswordForm: {
                oldPassword: "",
                newPassword: "",
                rePassword: "",
            },
            changePasswordFormRules: {
                oldPassword: [
                    {
                        required: true,
                        message: "请输入原密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur",
                    },
                ],
                newPassword: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur",
                    },
                ],
                rePassword: [{ validator: checkRePassword, trigger: "blur" }],
            },
        };
    },
    methods: {
        changePassword() {
            console.log("changePassword");
            let _this = this;
            _this.confirmPasswordFormVisable = true;
        },
        toChangePassword() {
            let _this = this;
            console.log(_this);
            this.$refs["changePasswordForm"].validate((valid) => {
                if (valid) {
                    let data = {
                        oldPassword: _this.changePasswordForm.oldPassword,
                        newPassword: _this.changePasswordForm.newPassword,
                        userId: _this.$store.state.userInfo.id,
                    };
                    adminUserApi.changePassword(data).then((res) => {
                        let result = res.data;
                        if (result.code == 200) {
                            
                            _this.$message({
                                message: "修改成功,请重新登录",
                                type: "success",
                            });
                            _this.logOut();
                        } else {
                            _this.$refs["changePasswordForm"].resetFields();
                            _this.$message({
                                message: result.msg,
                                type: "error",
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        logOut() {
            let _this = this;
            _this.$store.dispatch("logout");
            _this.$router.replace({ path:'/login'})
        },
    },
};
</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
}
.avatar {
    margin-top: 10px;
    display: block;
    margin-right: 40px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
}
</style>

