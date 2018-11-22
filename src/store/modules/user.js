import SystemApi from '@/api';

const user = {
    state: {
        email: '',
        token: localStorage.getItem('x-token'),
        name: '',
        avatar: '',
        position: '',
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_POSITION: (state, position) => {
            state.position = position;
        }
    },
    actions: {
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                SystemApi.system.basic.userInfo({
                }).then(response => {
                    // 获取用户信息失败
                    if (response.data.code != 0) {
                        reject(response.data.message);
                    }

                    let userInfo = response.data.data;
                    commit('SET_TOKEN', localStorage.getItem('x-token'));
                    commit('SET_EMAIL', userInfo.email);
                    commit('SET_NAME', userInfo.name);
                    commit('SET_AVATAR', userInfo.avatar);
                    commit('SET_POSITION', userInfo.position);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
};

export default user;
