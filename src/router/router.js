import * as VueRouter from 'vue-router'

const IndexView = () => import('@/views/Index')


const routes = [
    {path: '/', component: IndexView}
]

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

