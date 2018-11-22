import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式

/* layout */
import Layout from '../views/layout/Layout';

/* iframe source page */
import Iframe from '../views/iframe';

/* fond auth callback page */
import AuthCallback from '../views/callback';

/* in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading */
const _import = require('./_import_' + process.env.NODE_ENV);

/* home log in and out */
const Login = _import('home/login');
const ChangePwd = _import('home/changePwd');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/changePwd', component: ChangePwd, hidden: true },
    { path: '/auth/callback', component: AuthCallback, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '首页',
        hidden: true,
        children: [{ path: 'dashboard', component: Iframe }]
    },
    {
        path: '/index',
        component: Layout,
        name: '首页',
        hidden: true,
        children: [{ path: 'dashboard', component: AuthCallback }]
    },
];

export const asyncRouterMap = [
    { path: '*', redirect: '/404', hidden: true }
];

// 全局初始化-路由
Vue.use(Router);

const router = new Router({
    mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

// 开始Progress
router.beforeEach((to, from, next) => {
    NProgress.start();
    let xToken = localStorage.getItem('x-token');

    if (to.path == '/auth/callback') {
        next();
    } else if (to.path == '/login' && xToken) {
        next({ path: '/' });
    } else if (to.path == '/login') {
        next();
    } else if (xToken == null) {
        next({ path: '/login' });
    } else {
        next();
    }
});

// 结束Progress
router.afterEach(() => {
    NProgress.done();
});

export default router;
