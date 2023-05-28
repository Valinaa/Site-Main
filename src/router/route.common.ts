// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const IndexPage = () => import('@/pages/blog/index.vue')
const PublicDirTable = () => import('@/pages/blog/PublicDirTable.vue')
const DashboardsTable = () => import('@/pages/blog/DashboardsTable.vue')
const AboutAuthor = () => import('@/pages/about/AboutAuthor.vue')

const commonRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/blog',
    },
    {
        path: '/blog',
        name: 'IndexPage',
        component: IndexPage,
    },
    {
        path: '/table/publicDir/:data',
        name: 'PublicDirTable',
        component: PublicDirTable,
    },
    {
        path: '/table/dashboards',
        name: 'DashboardsTable',
        component: DashboardsTable,
    },
    {
        path: '/about',
        name: 'AboutAuthor',
        component: AboutAuthor,
    },
]

export default commonRoutes
