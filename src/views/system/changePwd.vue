<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="changeForm" :rules="changeRules" ref="changeForm" label-position="left" label-width="80px" class="card-box login-form">
            <h3 class="title">用户信息修改</h3>
            <el-form-item label="头像图标" prop="pic">
                <one-file-upload @upload="getResponseImage" :defaultImage="changeForm.pic" :defaultFileType="new Array('image/jpeg','image/png')"></one-file-upload>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
                <el-input name="email" type="text" v-model="changeForm.email" autoComplete="on" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="password">
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="changeForm.password" autoComplete="on" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
                <el-input name="newPassword" type="password" @keyup.enter.native="handleLogin" v-model="changeForm.newPassword" autoComplete="on" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item label="再次输入" prop="confirm_password">
                <el-input name="confirm_password" type="password" @keyup.enter.native="handleLogin" v-model="changeForm.confirm_password" autoComplete="on" placeholder="确认密码"></el-input>
            </el-form-item>

            <el-button type="primary" style="width:47%;" :loading="loading" @click.native.prevent="handleChange">
                确认修改
            </el-button>

        </el-form>
    </div>
</template>

<script>
import { isEmail } from 'utils/validate';
import OneFileUpload from 'components/Upload/oneFileUpload';

export default {
    name: 'changePwd',
    components: {
        OneFileUpload
    },
    data() {
        const validateEmail = (rule, value, callback) => {
            if (!isEmail(value)) {
                callback(new Error('请输入正确的合法邮箱'));
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
                email: '13890744115',
                password: '',
                newPassword: '',
                confirm_password: '',
                pic: '',
            },
            changeRules: {
                email: [
                    { required: true, trigger: 'blur', validator: validateEmail }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: validatePass }
                ],
                newPassword: [
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
                            if (response.data.data > 0) {
                                localStorage.clear();
                            }
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
        getResponseImage(response) {
            console.log(response);
            this.changeForm.pic = response.source_url;
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
    margin-bottom: 5px;
}

.login-container {
    @include relative;
    height: 100vh;

    .el-input {
        height: 40px;
        width: 100%;
    }

    .title {
        font-size: 26px;
        font-weight: 400;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }

    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        padding: 15px 35px 15px;
        margin: 20px 50px;
    }

    .forget-pwd {
        color: #fff;
    }
}
</style>
