import createAPI from '../axios'

// 系统管理相关 API
const system = {
    // 用户基本权限
    basic: {
        userMenu: config => createAPI('/user/menu', 'post', config),
        userInfo: config => createAPI('/user/info', 'post', config),
        userLogin: config => createAPI('/user/login', 'post', config),
        changePwd: config => createAPI('/user/change-pwd', 'post', config),
    },
    // 配置项管理
    config: {
        list: config => createAPI('/config/list', 'post', config),
        save: config => createAPI('/config/save', 'post', config),
        delete: config => createAPI('/config/del', 'post', config),
    },
    // 菜单管理
    menu: {
        map: config => createAPI('/menu/father-menus', 'post', config),
        list: config => createAPI('/menu/list', 'post', config),
        save: config => createAPI('/menu/save', 'post', config),
        delete: config => createAPI('/menu/del', 'post', config),
    },
    // 角色管理
    role: {
        list: config => createAPI('/role/list', 'post', config),
        all: config => createAPI('/role/all', 'post', config),
        save: config => createAPI('/role/save', 'post', config),
        delete: config => createAPI('/role/del', 'post', config),
        getMenu: config => createAPI('/role/get-menu', 'post', config),
        getUser: config => createAPI('/role/get-user', 'post', config),
        saveUser: config => createAPI('/role/save-user', 'post', config),
        savePrivilege: config => createAPI('/role/save-privilege', 'post', config),
        getResource: config => createAPI('/role/get-resource', 'post', config),
        saveResource: config => createAPI('/role/save-resource', 'post', config),
    },
    // 用户管理
    user: {
        list: config => createAPI('/user/list', 'post', config),
        save: config => createAPI('/user/save', 'post', config),
        delete: config => createAPI('/user/del', 'post', config),
        resetPwd: config => createAPI('/user/reset-pwd', 'post', config),
    }
};

export default system;
