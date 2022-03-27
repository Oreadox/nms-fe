import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


export default new createStore({
    namespaced: true,
    plugins: [createPersistedState({
        key: "nms",
        paths: ['username', 'isLogin', 'id']
    })],
    state: {
        username: "",
        isLogin: false,
        id: ""
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
    }
})