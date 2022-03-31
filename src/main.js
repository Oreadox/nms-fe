import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as icon from '@element-plus/icons-vue'
import router from "@/router/router";
import store from '@/store/index'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

axios.defaults.withCredentials=true



let app = createApp(App)
for (const iconName in icon) {
    if (Reflect.has(icon, iconName)) {
        const item = icon[iconName]
        app.component(iconName, item)
    }
}
app.use(router).use(ElementPlus).use(store).use(mavonEditor).mount('#app')

