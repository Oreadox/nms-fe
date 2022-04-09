import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'


export default new createStore({
    namespaced: true,
    plugins: [createPersistedState({
        key: "nms",
        paths: ['username', 'isLogin', 'id', 'permission']
    })],
    state: {
        username: "",
        isLogin: false,
        id: "",
        permission: []
    },
    mutations: {
        setUsername(state, username) {
            state.username = username
        },
        setLogin(state, isLogin) {
            state.isLogin = isLogin
        },
        setId(state, id) {
            state.id = id
        },
        setPermission(state, permission) {
            state.permission = (typeof permission) === 'object' ? permission : []
        }
    }
})