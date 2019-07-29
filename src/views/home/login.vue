<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
            <h3 class="title">后台名称-后台管理</h3>
            <el-form-item prop="phone">
                <span class="svg-container">
                    <wscn-icon-svg icon-class="jiedianyoujian"></wscn-icon-svg>
                </span>
                <el-input name="phone" type="text" v-model="loginForm.phone" autoComplete="on" placeholder="账户"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <wscn-icon-svg icon-class="mima"></wscn-icon-svg>
                </span>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
            </el-form-item>
            <el-button type="primary" style="width:47%;" :loading="loading" @click.native.prevent="handleLogin">
                登录
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { isPhone } from 'utils/validate'
import Vue from 'vue'
import { setToken } from '@/utils/auth'

export default {
    name: 'login',
    data() {
        const validatePhone = (rule, value, callback) => {
            if (!isPhone(value)) {
                callback(new Error('请输入正确的账户'));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能小于6位'));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                phone: '13800000000',
                password: '123456'
            },
            loginRules: {
                phone: [
                    { required: true, trigger: 'blur', validator: validatePhone }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: validatePass }
                ]
            },
            loading: false
        }
    },
    methods: {
        handleLogin() {
            this.$api.system.basic.userLogin({
                data: "phone=" + this.loginForm.phone + "&password=" + this.loginForm.password
            }).then(res => {
                this.loading = false
                
                if (res.code === 200) {
                    console.log(res.data.token)
                    this.$message.success('登录成功')
                    setToken(res.data.token)
                    this.$router.push({path: '/index'})
                } else {
                    if (typeof res.message != 'undefined') {
                        this.$message.error(res.message)
                    } else if (res.data != null) {
                        this.$message.error(res.data.message)
                    } else 
                        this.$message.error('登录失败，账号或密码错误')

                    this.$router.push({path: '/login'})
                }
            }, error => {
                this.loading = false;
                this.$message.error('登录失败，网络异常');
            })
            
            this.$router.push({ path: '/test' });
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
