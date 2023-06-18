// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const IndexPage = () => import('@/pages/blog/index.vue')
const PublicDirTable = () => import('@/pages/blog/PublicDirTable.vue')
const DashboardsTable = () => import('@/pages/blog/DashboardsTable.vue')

const commonRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
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
]

export default commonRoutes
