<template>
    <!-- <div class="sidebar-toggle">
        <Icon
            class="shrink-btn"
            :icon="
                Collapse
                    ? 'iconamoon:arrow-right-2-bold'
                    : 'iconamoon:arrow-left-2-bold'
            "
            width="32"
            height="32"
            @click="toggleCollapse" />
    </div> -->
    <el-menu
        class="side-bar font-mono font-bold"
        default-active="/"
        :collapse="Collapse"
        @mouseover="goCollapse"
        @mouseleave="leaveCollapse">
        <el-menu-item
            index="/"
            @click="goIndexPage()">
            <i>
                <IFluentHome20Regular />
            </i>
            <span>{{ t('home') }}</span>
        </el-menu-item>
        <el-sub-menu
            index="1"
            class="side-menu">
            <template #title>
                <i class="sub-menu-icon">
                    <i-ep-trend-charts />
                </i>
                <span>{{ t('data analysis platform') }}</span>
            </template>
            <el-menu-item-group :title="t('meta data management')">
                <el-menu-item
                    index="1-1"
                    @click="getPublicData()">
                    <i class="menu-item-icon"><i-vaadin-table /></i>
                    <span>{{ t('view public data') }}</span>
                </el-menu-item>
                <el-menu-item
                    index="1-2"
                    @click="ViewPublicData()">
                    <i class="menu-item-icon">
                        <i-ep-edit />
                    </i>
                    <span>{{ t('editing interface') }}</span>
                </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group :title="t('analysis management')">
                <el-menu-item
                    index="1-3"
                    @click="ViewAnalysis()">
                    <i class="menu-item-icon">
                        <i-ep-edit />
                    </i>
                    <span>{{ t('editing interface') }}</span>
                </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group :title="t('dashboard management')">
                <el-menu-item
                    index="1-4"
                    @click="getDashboardData()">
                    <i class="menu-item-icon"><i-vaadin-table /></i>
                    <span>{{ t('view dashboard info') }}</span>
                </el-menu-item>
                <el-menu-item
                    index="1-5"
                    @click="viewDashboard()">
                    <i class="menu-item-icon">
                        <i-vscode-icons-file-type-qlikview />
                    </i>
                    <span>{{ t('view default dashboard') }}</span>
                </el-menu-item>
                <el-menu-item
                    index="1-6"
                    @click="editDashboard()">
                    <i class="menu-item-icon">
                        <i-ep-edit-pen />
                    </i>
                    <span>{{ t('edit default dashboard') }}</span>
                </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-7">
                <template #title>item four</template>
                <el-menu-item index="1-7-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
            <i>
                <IFluentHome20Regular />
            </i>
            <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item
            index="3"
            disabled>
            <i>
                <IFluentHome20Regular />
            </i>
            <span>Navigator Three</span>
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts" setup>
import BILoginStore from '@/store/finebi'
import JSONP, { isResponseData } from '@/utils/jsonp'
import { Icon } from '@iconify/vue'
import router from '@/router'
import {
    DashBoardUserInfoResponse,
    PublicFolderResponse,
    ResponseData,
} from '@/types'

const { t } = useI18n()
const useBILoginStore = BILoginStore()
const { getToken, setData } = useBILoginStore
const Collapse = ref(true)
const goCollapse = () => {
    Collapse.value = false
}
const leaveCollapse = () => {
    Collapse.value = true
}
const ViewPublicData = () => {
    const url = `http://master:8080/webroot/decision/v5/api/conf/page?fine_auth_token=${getToken()}`
    window.open(url, '_blank')
}
const ViewAnalysis = () => {
    const url = `http://master:8080/webroot/decision/v5/api/page/analysis?fine_auth_token=${getToken()}`
    window.open(url, '_blank')
}
const viewDashboard = () => {
    const dashboardId = 'fe0e26b97ea84772a41450a638214d75'
    const url = `http://master:8080/webroot/decision/v5/design/report/${dashboardId}/view?fine_auth_token=${getToken()}`
    window.open(url, '_blank')
}
const editDashboard = () => {
    const dashboardId = 'fe0e26b97ea84772a41450a638214d75'
    const url = `http://master:8080/webroot/decision/v5/design/report/${dashboardId}/edit?fine_auth_token=${getToken()}`
    window.open(url, '_blank')
}
const goIndexPage = () => {
    void router.push('/')
}
const isDashboardResponse = (
    obj: DashBoardUserInfoResponse | ResponseData | PublicFolderResponse
): obj is DashBoardUserInfoResponse => {
    if ('data' in obj && obj.data) {
        if ('dashboards' in obj.data) {
            return true
        }
    }
    return false
}
const encodedData = (data: unknown) => {
    return encodeURIComponent(JSON.stringify(data))
}
const getPublicData = () => {
    const url = `/v5/api/conf/groups?fine_auth_token=${getToken()}`
    JSONP(url, {
        timeout: 10000,
    })
        .then((data) => {
            if (!isResponseData(data)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const res = data.data
                ElMessage.info({
                    message: '已接收到公共表数据',
                })
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                console.log(`编码前:${res}`)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const encode = encodedData(res)
                void router.push(`/table/publicDir/${encode}`)
            } else {
                ElMessage.error({
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    message: `<b>您似乎没有登录或登录已过期</b> <br/> <i>${data.errorMsg}</i>`,
                    dangerouslyUseHTMLString: true,
                })
            }
            return data
        })
        .catch((err) => {
            ElMessage.error({
                message: `<b>公共表信息获取失败!</b> <br/> <i>${err}</i>`,
                dangerouslyUseHTMLString: true,
            })
        })
}
const getDashboardData = () => {
    const url = `/v5/api/dashboard/user/info?fine_auth_token=${getToken()}`
    JSONP(url, {
        timeout: 10000,
    })
        .then((data) => {
            if (isDashboardResponse(data)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { dashboards } = data.data
                ElMessage.info({
                    message: '已接收到仪表板数据',
                })
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                console.log(`编码前:`)
                console.log(dashboards)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const encode = encodedData(dashboards)
                setData(encode)
                void router.push(`/table/dashboards`)
            } else {
                ElMessage.error({
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    message: `<b>您似乎没有登录或登录已过期</b> <br/> <i>${data.errorMsg}</i>`,
                    dangerouslyUseHTMLString: true,
                })
            }

            return data
        })
        .catch((err) => {
            ElMessage.error({
                message: `<b>Dashboards信息获取失败!</b> <br/> <i>${err}</i>`,
                dangerouslyUseHTMLString: true,
            })
        })
}
</script>
<style lang="scss" scoped>
.shrink-btn {
    position: absolute;
    z-index: 9999;
    top: 305px;
    left: -22px;

    /* color: #151d41; */
    margin-left: 100px;
    cursor: pointer;

    /* transform: rotate(180deg); */
}

.side-bar {
    border-right: solid 1px var(--el-border-color);
}

.el-menu-item * {
    vertical-align: middle;
}

.el-sub-menu * {
    vertical-align: middle;
}

.sub-menu-icon {
    display: block;
    width: 50px;
    text-align: center;
}

.menu-item-icon {
    display: block;
    width: 25px !important;
    margin-bottom: 4px !important;
    text-align: left !important;
}

.el-menu-item > i {
    width: 50px;
    text-align: center;
}

/* stylelint-disable-next-line selector-class-pattern */
.el-menu--collapse {
    min-width: 82px;
}
/* stylelint-disable-next-line selector-class-pattern */
.el-menu--collapse .el-sub-menu--collapse > .el-menu {
    flex: 1;
    overflow: hidden;
}

/* stylelint-disable-next-line selector-class-pattern */
.side-bar:not(.el-menu--collapse) {
    width: var(--el-aside-width);
}
</style>
