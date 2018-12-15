import Vue from 'vue';
import axios from 'axios';
import router from 'src/router';

// 先判断环境，带端口的就默认访问本地
if (!!location.port) {
    Vue.prototype.HOST_PROXY_ADMIN = 'http://localhost:8080';  //need change 
} else {
    Vue.prototype.HOST_PROXY_ADMIN = 'http://permission-admin.yuanjy.com'; //need change location.origin.replace(/test/, 'admin');
}

// 创建axios实例
const axiosInstance = axios.create({
    baseURL: Vue.prototype.HOST_PROXY_ADMIN,
    timeout: 25000,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
    // 非 HOST_PROXY_ADMIN 域名下的请求，均不拦截
    if (config.url.includes(Vue.prototype.HOST_PROXY_ADMIN)) {
        config.emulateJSON = true;
        config.withCredentials = true;
        config.headers['X-TOKEN'] = localStorage.getItem('x-token');
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(function (response) {
    // 用户未登陆 或者 用户被禁用，重定向到登录页面
    if (response.data.code == 101003 || response.data.code == 101013) {
        localStorage.clear();
        router.replace({
            path: '/login',
        });
    }
    // 返回结果code编码不为0时，显示错误信息
    if (response.data.code > 0) {
        return Promise.reject(response.data.message);
    }
    return response;
}, function (error) {
    return Promise.reject('网络错误，请稍后再试');
});

// 创建 API 实例
const createAPI = (url, method, config = {}) => {
    return axiosInstance({
        url,
        method,
        ...config
    });
};

export default createAPI;
