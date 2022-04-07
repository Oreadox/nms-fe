import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import * as icon from '@element-plus/icons-vue'
import router from "@/router/router";
import store from '@/store/index'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from "moment";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8081'

let app = createApp(App)
for (const iconName in icon) {
    if (Reflect.has(icon, iconName)) {
        const item = icon[iconName]
        app.component(iconName, item)
    }
}


router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        next('/index')
        return
    }
    if (to.name) {
        document.title = to.name
    }
    if (to.matched[0].meta.login) {
        if (store.state.isLogin) {
            axios({
                method: 'get',
                url: '/admin',
            }).catch(function (error) {
                if (error.response.status === 401) {
                    store.commit("setLogin", false)
                    next('/index')
                    location.reload()
                    ElMessage({
                        message: '登录状态失效',
                        type: 'error',
                    })
                }
            }).then(function (response) {
                var respData = response['data']
                if (Boolean(respData['status']) === true) {
                    next()
                } else {
                    store.commit("setLogin", false)
                    next('/index')
                    ElMessage({
                        message: '登录状态失效',
                        type: 'error',
                    })
                }
            })
        } else {
            next('/index')
            ElMessage({
                message: '该页面要求管理员权限',
                type: 'error',
            })
        }
    } else {
        next()
    }
})


app.use(router).use(ElementPlus).use(store).use(mavonEditor).use(moment).mount('#app')

