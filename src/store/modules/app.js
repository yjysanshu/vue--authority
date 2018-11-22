import Cookies from 'js-cookie';

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        },
        theme: 'default',
        livenewsChannels: Cookies.get('livenewsChannels') || '[]',
        visitedViews: []
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1);
            } else {
                Cookies.set('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
        },
        ADD_VISITED_VIEWS: (state, view) => {
            let index = state.visitedViews.indexOf(view)
            if (index == -1) {
                state.visitedViews.push(view)
            } else if (state.visitedViews.length - index > 6) {
                state.visitedViews.splice(index, 1)
                state.visitedViews.push(view)
            } else {
                return ;
            }
        },
        DEL_VISITED_VIEWS: (state, view) => {
            let index = state.visitedViews.indexOf(view)
            state.visitedViews.splice(index, 1)
        }
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        addVisitedViews: ({ commit }, view) => {
            commit('ADD_VISITED_VIEWS', view)
        },
        delVisitedViews: ({ commit }, view) => {
            commit('DEL_VISITED_VIEWS', view)
        }
    }
};

export default app;
