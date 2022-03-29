import * as VueRouter from 'vue-router'

const IndexView = () => import('@/views/Index')
const NewsView = () => import('@/views/News')

const routes = [
    {path: '/', name: '主页', component: IndexView},
    {path: '/news/:id', name: '新闻-加载中', component: NewsView},
]

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

