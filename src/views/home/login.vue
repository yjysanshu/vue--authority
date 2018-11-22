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
import { isPhone } from 'utils/validate';
import Vue from 'vue';

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
        /*handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$api.system.basic.userLogin({
                        data: this.loginForm
                    }).then(response => {
                        this.loading = false;
                        if (response.data.code == 0) {
                            let token = response.data.data.token;
                            // 跳转到 callback 页面处理
                            this.$router.push({ path: '/auth/callback?token=' + token });
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
        },*/
        /*handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$api.postRequest('/user/login', {
                        email: this.loginForm.email,
                        password: this.loginForm.password
                    }).then(response => {
                        this.loading = false;
                        this.$message.warning("123456");
                        console.log(response);
                        if (response.code == 0) {
                            let token = response.message;
                            // 跳转到 callback 页面处理
                            this.$router.push({ path: '/dashboard?token=' + token });
                        } else {
                            this.$message.warning(response.message);
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
        },*/
        handleLogin() {
            $.ajax({
                "url": Vue.prototype.HOST_PROXY_ADMIN + "/user/login",
                "method": "POST",
                "contentType": "application/x-www-form-urlencoded",
                "data": "phone=" + this.loginForm.phone + "&password=" + this.loginForm.password
            }).done(response => {
                this.loading = false;
                if (response.code === 0) {
                    console.log(response.data.token);
                    this.$message.success('登录成功');
                    localStorage.setItem('x-token', response.data.token);
                    this.$router.push({path: '/'});
                } else {
                    if (typeof response.message != 'undefined') {
                        this.$message.error(response.message);
                    } else if (response.data != null) {
                        this.$message.error(response.data.message);
                    } else 
                        this.$message.error('登录失败，账号或密码错误');
                    this.$router.push({path: '/login'});
                }
            }).fail(error => {
                this.loading = false;
                this.$message.error('登录失败，网络异常');
            });
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
