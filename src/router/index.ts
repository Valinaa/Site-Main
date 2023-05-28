import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from 'vue-router'
import NProgress from 'nprogress'
import exceptionRoutes from '@/router/route.exception'
import asyncRoutes from '@/router/route.async'
import commonRoutes from '@/router/route.common'

const routes: Array<RouteRecordRaw> = [
    // 无鉴权的业务路由 ex:登录
    ...commonRoutes,
    // 带鉴权的业务路由
    ...asyncRoutes,
    // 异常页必须放在路由匹配规则的最后
    ...exceptionRoutes,
]

const router: Router = createRouter({
    // 新的vue-router4 使用 history路由模式 和 base前缀
    // history: createWebHashHistory(),
    history: createWebHistory(import.meta.env.VITE_BASE),
    routes,
})

/**
 * @remarks
 * 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param to - RouteLocationNormalized   即将要进入的目标
 * @param from - RouteLocationNormalizedLoaded   当前导航正在离开的路
 *
 */
router.beforeEach((to, from) => {
    console.log('全局路由前置守卫：to,from\n', to, from)
    // 设置页面标题
    document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE
    if (!NProgress.isStarted()) {
        NProgress.start()
    }
})
router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        from.name ? next({ name: from.name }) : next('/')
    } else {
        next()
    }
})
router.afterEach((to, from) => {
    console.log('全局路由后置守卫: to,from\n', to, from)
    NProgress.done()
})

export default router
