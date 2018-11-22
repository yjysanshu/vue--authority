// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from 'src/App';
import store from 'src/store';
import router from 'src/router';
import api from 'src/api';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Viewer from 'viewerjs'; // 图片查看组件 - 组件绑定到 window 对象上，子组件无需在引用
import 'viewerjs/dist/viewer.min.css';

import 'normalize.css/normalize.css';// normalize.css 样式格式化
import 'ionicons/dist/css/ionicons.css'; // 图标组件库

import 'components/Icon-svg/index'; // 封装的svg组件
import 'assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import errLog from 'store/errLog'; // error log组件

// 全局注册
Vue.use(ElementUI);

// Vue.config.productionTip = false;
Vue.prototype.$api = api;

// 当且仅当用户登录的时候
if (localStorage.getItem('x-token')) {
    // 远程获取用户菜单生成路由
    store.dispatch('GenerateRoutes').then(() => {
        router.addRoutes(store.getters.addRouters);
    });

    // 获取用户信息
    store.dispatch('GetUserInfo').catch(error => {
        Vue.prototype.$message.error(error);
    });
}

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function (err, vm) {
        console.log(err, window.location.href);
        errLog.pushLog({
            err,
            url: window.location.href,
            vm
        })
    };
}

// 开始
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
