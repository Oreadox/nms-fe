import * as VueRouter from 'vue-router'

const IndexView = () => import('@/views/Index')
const NewsView = () => import('@/views/news/News')
const AdminView = () => import('@/views/admin/Admin')
const AdminIndexView = () => import('@/views/admin/AdminIndex')
const CreateNewsView = () => import('@/views/admin/news/CreateNews')
const AdminInfoView = () => import('@/views/admin/account/AdminInfo')


const routes = [
    {path: '/', name: '主页', component: IndexView},
    {path: '/news/:id', name: '新闻-加载中', component: NewsView},
    {
        path: '/admin', name: '管理员后台', component: AdminView, redirect: '/admin/index', children: [
            {path: '/admin/index', name: '管理员导航页', component: AdminIndexView},
            {path: '/admin/info', name: '管理员用户信息', component: AdminInfoView},
            {path: '/admin/news/create_md', name: '创建新闻', component: CreateNewsView},
        ]
    },

]

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

