import system from './modules/system';
import mock from './modules/mock';
import module from './modules/module';
import {postRequest} from './modules/httpRequest';

const api = {
    system: system,
    mock: mock,
    module: module,
    postRequest: postRequest
};

export default api;
