<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="changeForm" :rules="changeRules" ref="changeForm" label-position="left" label-width="0px" class="card-box login-form">
            <h3 class="title">用户修改密码</h3>
            <el-form-item prop="phone">
                <span class="svg-container">
                    <wscn-icon-svg icon-class="jiedianyoujian"></wscn-icon-svg>
                </span>
                <el-input name="phone" type="text" v-model="changeForm.phone" autoComplete="on" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <wscn-icon-svg icon-class="mima"></wscn-icon-svg>
                </span>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="changeForm.password" autoComplete="on" placeholder="旧密码"></el-input>
            </el-form-item>
            <el-form-item prop="newPassword">
                <span class="svg-container">
                    <wscn-icon-svg icon-class="mima"></wscn-icon-svg>
                </span>
                <el-input name="newPassword" type="password" @keyup.enter.native="handleLogin" v-model="changeForm.newPassword" autoComplete="on" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <span class="svg-container">
                    <wscn-icon-svg icon-class="mima"></wscn-icon-svg>
                </span>
                <el-input name="confirmPassword" type="password" @keyup.enter.native="handleLogin" v-model="changeForm.confirmPassword" autoComplete="on" placeholder="确认密码"></el-input>
            </el-form-item>

            <template v-if="redirectUrl == 'dashboard'">
                <el-button type="primary" style="width:47%;" @click.native.prevent="handleRedirect">
                    返回工作台
                </el-button>
            </template>
            <template v-else>
                <el-button type="primary" style="width:47%;" @click.native.prevent="handleRedirect">
                    返回登录
                </el-button>
            </template>
            <el-button type="primary" style="width:47%;" :loading="loading" @click.native.prevent="handleChange">
                确认修改
            </el-button>

        </el-form>
    </div>
</template>

<script>
import { isPhone } from 'utils/validate';

export default {
    name: 'changePwd',
    data() {
        const validatePhone = (rule, value, callback) => {
            if (!isPhone(value)) {
                callback(new Error('请输入正确的手机号'));
            }
            callback();
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能小于6位'));
            }
            callback();
        };
        return {
            changeForm: {
                phone: '',
                password: '',
                newPassword: '',
                confirmPassword: '',
            },
            changeRules: {
                email: [
                    { required: true, trigger: 'blur', validator: validatePhone }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: validatePass }
                ],
                new_password: [
                    { required: true, trigger: 'blur', validator: validatePass }
                ],
                confirm_password: [
                    { required: true, trigger: 'blur', validator: validatePass }
                ],
            },
            redirectUrl: 'dashboard',
            loading: false
        }
    },
    methods: {
        handleChange() {
            this.$refs.changeForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$api.system.basic.changePwd({
                        data: this.changeForm
                    }).then(response => {
                        this.loading = false;
                        if (response.data.code == 0) {
                            this.$message.success('成功修改密码，请重新登录');
                            localStorage.clear();
                            this.redirectUrl = 'login';
                        } else {
                            this.$message.warning(response.data.message);
                        }
                    }).catch(error => {
                        this.$message.error(error);
                        this.loading = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleRedirect() {
            this.$router.push({ path: '/' + this.redirectUrl });
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
}

.login-container {
    @include relative;
    height: 100vh;
    background-color: #2d3a4b;

    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
        -webkit-text-fill-color: #fff !important;
    }
    input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #eeeeee;
        height: 47px;
    }
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
    }

    .title {
        font-size: 26px;
        font-weight: 400;
        color: #eeeeee;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }

    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }

    .forget-pwd {
        color: #fff;
    }
}
</style>
