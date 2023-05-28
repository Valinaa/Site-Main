<!-- eslint-disable camelcase -->
<template>
    <div class="container max-w-3xl mx-auto mt-10">
        <div class="h-60 mb-8">
            <div class="w-52 h-52 mx-auto mb-4">
                <img
                    src="/src/assets/svg/website.png"
                    alt="logo"
                    class="w-52 h-52" />
            </div>
        </div>
        <div class="text-center text-md">
            <h1 class="font-serif font-bold text-4xl mb-8">
                {{ t('hello') }} , {{ t('welcome to') }} Valinaa{{
                    t('personal site')
                }}
            </h1>
            <div class="text-red-500 font-bold text-lg mb-4">
                <i><i-iconoir-developer /></i>
                <span>{{ t('coming soon') }}</span>
            </div>
            <p class="text-lg mb-4">
                <i><i-raphael-no /></i>
                <span>{{ t('data analysis module not available') }}</span>
            </p>
            <p class="text-lg mb-4">
                <i><i-tabler-click /></i>
                <span>{{ t('try clicking the button below') }},</span>
                <br />
                <ElButton
                    type="success"
                    class="my-1"
                    @click="getFineBILoginToken()">
                    {{ t('cross login') }}
                </ElButton>
                <br />
                <i><i-icon-park-solid-success /></i>
                <span>
                    {{ t('if the response is successful') }},
                    {{ t('it means it is already available') }}
                </span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import BILoginStore from '@/store/finebi'
import JSONP, { isResponseData } from '@/utils/jsonp'
import { ElMessage, ElNotification } from 'element-plus'

const useBILoginStore = BILoginStore()
const { setToken } = useBILoginStore
const { t } = useI18n()

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
ElMessage.success({
    message: t('welcome'),
    duration: 1000,
})
ElNotification({
    title: 'Issue',
    message: `${t(
        'issue'
    )}<br/><b><i>https://github.com/Valinaa/Site-Pages/issues<i/><b/>`,
    dangerouslyUseHTMLString: true,
    duration: 0,
})

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
i {
    padding-top: 4px;
}

a {
    @apply text-sky-400 hover:(text-sky-600) transition-all ease-out duration-100;
}

.button-link-a {
    color: white !important;
}
</style>
