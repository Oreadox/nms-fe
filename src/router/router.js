import * as VueRouter from 'vue-router'

const IndexView = () => import('@/views/Index')
const NewsView = () => import('@/views/news/News')
const AdminView = () => import('@/views/admin/Admin')
const AdminInfoView = () => import('@/views/admin/profile/AccountInfo')
const AdminBasicInfoView = () => import('@/views/admin/profile/ChangeBasicInfo')
const AdminSecurityInfoView = () => import('@/views/admin/profile/ChangeSecurityInfo')
const NewsCreateView = () => import('@/views/admin/news/NewsCreate')
const NewsCreateMarkdownView = () => import('@/views/admin/news/NewsCreateMarkdown')
const NewsListView = () => import('@/views/admin/news/NewsList')
const NewsCheckView = () => import('@/views/admin/news/NewsCheck')
const NewsModifyView = () => import('@/views/admin/news/NewsModify')




const routes = [
    {path: '/index', name: '主页', component: IndexView},
    {path: '/news/:id', name: '新闻-加载中', component: NewsView},
    {path: '/admin', name: '管理员后台', component: AdminView, redirect: '/admin/info', meta: {login:true}, children: [
            {path: '/admin/info', name: '管理员用户信息', component: AdminInfoView},
            {path: '/admin/modify/info', name: '基本信息修改', component: AdminBasicInfoView},
            {path: '/admin/modify/security', name: '安全信息修改', component: AdminSecurityInfoView},
            {path: '/admin/news/create', name: '创建新闻', component: NewsCreateView},
            {path: '/admin/news/list', name: '管理新闻', component: NewsListView},
            {path: '/admin/news/check', name: '审核新闻', component: NewsCheckView},
        ]},
    {path: '/admin/news/create_md', name: '创建新闻-高级版', meta: {login:true}, component: NewsCreateMarkdownView},
    {path: '/admin/news/modify/:id', name: '编辑新闻', meta: {login:true}, component: NewsModifyView},
]

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

