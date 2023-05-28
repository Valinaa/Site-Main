<!--
 * @GitHub       : https://github.com/Valinaa
 * @Author       : Valinaa
 * @Date         : 2023-05-14 15:19:46
 * @LastEditors  : Valinaa 1114854003@qq.com
 * @LastEditTime : 2023-05-26 16:53:31
 * @FilePath     : \\vue3-camp\\src\\views\\home\\index.vue
 * @Description  : 
 * 
 * WeChat:Wish-Komorebi
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->

<!-- eslint-disable camelcase -->
<template>
    <div class="container max-w-3xl mx-auto mt-10">
        <div class="h-60 mb-8">
            <div class="w-52 h-52 mx-auto mb-4">
                <img
                    src="@/assets/svg/android-chrome-192x192.png"
                    alt="logo"
                    class="w-52 h-52" />
            </div>
        </div>
        <div class="text-center text-md">
            <ElButton
                type="success"
                @click="getFineBILoginToken()">
                {{ t('cross login') }}
            </ElButton>
            <br />
            <h1 class="font-serif font-bold text-4xl mb-8">
                {{ t('hello') }} , {{ t('welcome to') }} Valinaa 的个人网站
            </h1>
            <p class="mb-10">
                <strong>Vitecamp</strong>
                {{ t('includes features') }}
            </p>
            <p class="mb-10">
                <template
                    v-for="(item, index) in featureList"
                    :key="index">
                    <a
                        :href="item.href"
                        target="_blank">
                        {{ item.name }}
                    </a>
                    <template v-if="!item.isEnd">|</template>
                </template>
            </p>
            <div>
                {{ t('before coding') }} , {{ t('setup ide') }}
                <strong>VSCode</strong>
                +
                <strong>Volar</strong>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BILoginStore from '@/store/finebi'
import JSONP, { isResponseData } from '@/utils/jsonp'
import { ElMessage, ElNotification } from 'element-plus'

const useBILoginStore = BILoginStore()
const { setToken, getToken } = useBILoginStore
const { t } = useI18n()

// axios.defaults.headers.get.Authorization = `Bearer ${getToken()}`
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
ElMessage.success({
    message: 'welcome',
    duration: 1000,
})
ElNotification({
    title: 'Issue',
    message:
        'If you encounter problems in using the template, please raise them in the issue',
    duration: 0,
})
const featureList = [
    {
        name: 'Vite3',
        href: 'https://github.com/vitejs/vite',
    },
    {
        name: 'Vue3',
        href: 'https://github.com/vuejs/core',
    },
    {
        name: 'TypeScript',
        href: 'https://github.com/microsoft/TypeScript',
    },
    {
        name: 'Element Plus',
        href: 'https://element-plus.gitee.io/zh-CN/',
    },
    {
        name: 'Vue Router 4',
        href: 'https://router.vuejs.org/zh/',
    },
    {
        name: 'Pinia',
        href: 'https://pinia.vuejs.org/',
    },
    {
        name: 'icones',
        href: 'https://icones.netlify.app/',
    },
    {
        name: 'Windi CSS',
        href: 'https://github.com/windicss/windicss',
    },
    {
        name: 'Axios',
        href: 'https://axios-http.com/',
    },
    {
        name: 'I18n',
        href: 'https://github.com/intlify/vite-plugin-vue-i18n',
    },
    {
        name: 'Prettier',
        href: 'https://github.com/prettier/prettier',
    },
    {
        name: 'ESLint',
        href: 'https://github.com/eslint/eslint',
    },
    {
        name: 'Airbnb Style',
        href: 'https://github.com/airbnb/javascript',
    },
    {
        name: 'Husky',
        href: 'https://github.com/typicode/husky',
    },
    {
        name: 'VueUse',
        href: 'https://github.com/vueuse/vueuse',
    },
    {
        name: 'Markdown',
        href: 'https://github.com/antfu/vite-plugin-md',
    },
    {
        name: 'NProgress',
        href: 'https://github.com/rstacruz/nprogress',
        isEnd: true,
    },
]

/**
 * 返回所有Dashboards与UserInfo
 *
 * @remarks
 * 内部返回的数据暂未处理
 *
 * @returns void
 */
const getAllDashboardInfo = (): void => {
    JSONP(
        `/v5/api/dashboard/user/info?op=api&cmd=get_all_reports_data&fine_auth_token=${getToken()}`,
        {
            timeout: 10000,
        }
    )
        .then((data) => {
            if (isResponseData(data)) {
                if (data.data?.dashboards && data.data.userInfo) {
                    const res = data.data.dashboards
                    const len = res.length
                    ElMessage.info({
                        message: `有${len}个Dashboards`,
                    })
                }
            }
            return data
        })
        .catch((err) => {
            ElMessage.error(`Dashboard与User信息获取失败! \n err:${err}`)
        })
}

/**
 * 跨域登录并获取token
 *
 * @remarks
 * 内部返回的数据暂未处理
 *
 * @returns void
 */
const getFineBILoginToken = (): void => {
    JSONP(
        '/login/cross/domain?fine_username=hadoop&fine_password=valina&validity=-2',
        {
            timeout: 10000,
        }
    )
        .then((data) => {
            if (isResponseData(data)) {
                if (typeof data === 'object' && data.accessToken) {
                    ElMessage.success('账号验证成功！')
                    setToken(data.accessToken)
                }
            } else {
                ElMessage.warning('返回值判断错误！')
            }

            return data
        })
        .catch((err) => {
            ElMessage.error(`账号验证失败！${err}`)
        })
}
</script>

<style lang="scss" scoped>
a {
    @apply text-sky-400 hover:(text-sky-600) transition-all ease-out duration-100;
}

.button-link-a {
    color: white !important;
}
</style>
