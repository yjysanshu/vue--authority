import createAPI from '../axios'

// mock 服务管理 API
const mock = {
    // 接口管理
    api: {
        list: config => createAPI('/mock/api-list', 'post', config),
        save: config => createAPI('/mock/api-save', 'post', config),
        delete: config => createAPI('/mock/api-delete', 'post', config),
    },
    // 场景功能
    scenario: {
        list: config => createAPI('/mock/scenario-list', 'post', config),
        save: config => createAPI('/mock/scenario-save', 'post', config),
        delete: config => createAPI('/mock/scenario-delete', 'post', config),
    },
    // 自定义来源管理
    source: {
        list: config => createAPI('/mock/source-list', 'post', config),
        save: config => createAPI('/mock/source-save', 'post', config),
        delete: config => createAPI('/mock/source-delete', 'post', config),
    }
};

export default mock;
