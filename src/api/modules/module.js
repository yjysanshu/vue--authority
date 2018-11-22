import createAPI from '../axios'

// 其他管理 API
const module = {
    
    gii: {
        index: config => createAPI('/database/index', 'post', config),
        list: config => createAPI('/database/list', 'post', config),
        tableList: config => createAPI('/table/list', 'post', config),
        generator: config => createAPI('/generator/index', 'post', config),
    }
};

export default module;
