import createAPI from '../axios'

// 其他管理 API
const module = {
    
    gii: {
        index: config => createAPI('/database/index', 'post', config),
        list: config => createAPI('/database/list', 'post', config),
        tableList: config => createAPI('/table/list', 'post', config),
        generator: config => createAPI('/generator/index', 'post', config),
    },

    //学生信息管理
    student: {
        list: config => createAPI('/admin/student/list', 'post', config),
        save: config => createAPI('/admin/student/save', 'post', config),
        del: config => createAPI('/admin/student/del', 'post', config),
    }
};

export default module;
