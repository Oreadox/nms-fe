import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router/router";
import store from '@/store/index'
import axios from 'axios'

axios.defaults.withCredentials=true



let app = createApp(App)
app.use(router).use(ElementPlus).use(store).mount('#app')

