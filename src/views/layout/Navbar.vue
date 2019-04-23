<template>
    <el-menu class="navbar" mode="horizontal">
        <levelbar></levelbar>
        <tabs-view></tabs-view>
        <error-log v-if="log.length > 0" class="errLog-container" :logsList="log"></error-log>
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <screenfull class='screenfull'></screenfull>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <img class="user-avatar" :src="(avatar != '' ? avatar : defaultAvatar) + '?imageView2/1/w/80/h/80'">
                <span class="user-name"> {{ name }} </span>
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <el-dropdown-item>
                    <router-link class='inlineBlock' to="/">首页</router-link>
                </el-dropdown-item>
                <el-dropdown-item divided>
                    <span @click="changePwd" style="display:block;">修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                    <span @click="logout" style="display:block;">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import Levelbar from './Levelbar';
import TabsView from './TabsView';
import Hamburger from 'components/Hamburger';
import Screenfull from 'components/Screenfull';
import ErrorLog from 'components/ErrLog';
import errLogStore from 'store/errLog';

export default {
    components: {
        Levelbar,
        TabsView,
        Hamburger,
        ErrorLog,
        Screenfull
    },
    data() {
        return {
            log: errLogStore.state.errLog,
            defaultAvatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'name',
            'avatar',
            'position',
            'email',
        ])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
        logout() {
            localStorage.clear();
            location.reload();
            // this.$store.dispatch('LogOut').then(() => {
            //     location.reload();// 为了重新实例化vue-router对象 避免bug
            // });
        },
        changePwd() {
            this.$router.push({ path: '/changePwd' });
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .errLog-container {
        display: inline-block;
        position: absolute;
        right: 150px;
    }
    .screenfull {
        position: absolute;
        right: 160px;
        top: 16px;
        color: red;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            height: 50px;
            position: relative;
            .user-avatar {
                margin-top: 5px;
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .user-name {
                top: -12px;
                display: inline-block;
                font-size: 15px;
                position: relative;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>



