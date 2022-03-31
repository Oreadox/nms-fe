import * as VueRouter from 'vue-router'

const IndexView = () => import('@/views/Index')
const NewsView = () => import('@/views/News/News')
const AdminIndexView = () => import('@/views/Admin/AdminIndex')
const CreateNewsView = () => import('@/views/Admin/CreateNews')


const routes = [
    {path: '/', name: '主页', component: IndexView},
    {path: '/news/:id', name: '新闻-加载中', component: NewsView},
    {path: '/admin', name: '管理员后台', component: AdminIndexView},
    {path: '/admin/news/create', name: '创建新闻', component: CreateNewsView},
]

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

