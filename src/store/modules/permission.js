import SystemApi from '@/api';
import { asyncRouterMap, constantRouterMap } from 'src/router';
// 菜单相关
import Layout from 'views/layout/Layout';
import Iframe from 'views/iframe';
const _import = require('router/_import_' + process.env.NODE_ENV);

/**
 * 根据远程获取的用户菜单，递归生成路由
 */
function filterAsyncRouter(routerMap = []) {
    var accessedRouters = [];
    routerMap.forEach(function(route) {
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children);
        }
        var currentComponent;
        if (route.type == 'layout') {
            currentComponent = Layout;
        } else if (route.type == 'iframe') {
            currentComponent = Iframe;
        } else {
            //菜单加载异常的时候，不影响整体使用，尤其是开发环境会遇到
            try {
                currentComponent = _import(route.path);
            } catch (error) {
                console.log('菜单加载异常' + error)
            }
        }

        accessedRouters.push({
            path: route.path,
            component: currentComponent,
            name: route.title,
            icon: route.icon || 'zujian',
            children: route.children,
        });
    }, this);

    return accessedRouters;
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit }) {
            return new Promise((resolve, reject) => {
                SystemApi.system.basic.userMenu({
                }).then(response => {
                    // 如果用户未登陆，直接返回不生成路由表
                    if (response.data.code == 101003) {
                        resolve();
                    }
                    var accessedRouters = response.data.data;
                    accessedRouters = filterAsyncRouter(accessedRouters).concat(asyncRouterMap);
                    commit('SET_ROUTERS', accessedRouters);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default permission;
