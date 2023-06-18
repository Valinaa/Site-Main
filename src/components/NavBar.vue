<template>
    <el-menu
        class="font-mono font-bold nav-bar"
        mode="horizontal"
        :ellipsis="ellipsis">
        <div
            style="
                padding-right: 16px;
                padding-left: 20px;
                place-items: center center;
            ">
            <el-avatar
                :size="55"
                :src="avatar" />
        </div>
        <el-menu-item
            index="main"
            style="width: 90px"
            @click="goPage('www')">
            <i class="menu-item-icon">
                <Icon
                    icon="solar:home-outline"
                    width="20.15"
                    height="20.15" />
            </i>
            {{ t('home') }}
        </el-menu-item>
        <el-menu-item
            index="blog"
            style="width: 90px"
            @click="goPage('blog')">
            <i class="menu-item-icon">
                <Icon
                    icon="solar:document-add-broken"
                    width="20.15"
                    height="20.15" />
            </i>
            {{ t('blog') }}
        </el-menu-item>
        <el-menu-item
            index="muse"
            style="width: 90px"
            @click="goPage('muse')">
            <i class="menu-item-icon">
                <i-tabler-bulb />
            </i>
            {{ t('muse') }}
        </el-menu-item>
        <el-menu-item
            index="life"
            style="width: 90px"
            @click="goPage('life')">
            <i class="menu-item-icon">
                <Icon
                    icon="mingcute:fork-spoon-line"
                    width="20.15"
                    height="20.15" />
            </i>
            {{ t('life') }}
        </el-menu-item>

        <div class="flex-grow media-menu" />
        <el-tooltip
            class="media-menu"
            :content="isDark ? t('change light') : t('change dark')"
            placement="top">
            <button
                class="mx-2 !outline-none"
                @click="toggleDark()">
                <i-ph-cloud-moon-bold
                    v-if="isDark"
                    class="icon-nav mx-1 mt-1" />
                <i-ph-sun-horizon-bold
                    v-else
                    class="icon-nav mx-1 mt-1" />
            </button>
        </el-tooltip>
        <el-tooltip
            class="media-menu"
            :content="t('change lang')"
            placement="top">
            <button
                class="icon-btn mx-2"
                @click="toggleLocales()">
                <i-la-language class="icon-nav mr-2 mt-1" />
            </button>
        </el-tooltip>
        <el-menu-item
            class="media-menu"
            index="intro"
            style="width: 90px"
            @click="goPage('intro')">
            <i class="menu-item-icon">
                <i-carbon-user-speaker class="mr-1" />
            </i>
            {{ t('intro') }}
        </el-menu-item>
        <el-sub-menu
            class="media-menu"
            index="3"
            style="width: 130px">
            <template #title>
                <i class="menu-item-icon">
                    <i-fluent-contact-card-20-filled />
                </i>
                {{ t('contact me') }}
            </template>
            <el-menu-item
                index="/github"
                @click="goGitHub()">
                <i class="menu-item-icon"><i-iconoir-github /></i>
                GitHub
            </el-menu-item>
            <el-menu-item
                index="/emails"
                @click="getEmails()">
                <i class="menu-item-icon"><i-line-md-email-twotone /></i>
                {{ t('emails') }}
            </el-menu-item>
            <el-divider>
                <IEpStarFilled />
            </el-divider>
        </el-sub-menu>
    </el-menu>
    <el-backtop />
</template>
<script lang="ts" setup>
import avatar from '@/assets/avatar.jpg'
import { saveLanguage } from '@/utils/i18n'
import { ElMessageBox } from 'element-plus'
import { Icon } from '@iconify/vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const { t, availableLocales, locale } = useI18n()
const toggleLocales = () => {
    const locales = availableLocales
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    saveLanguage(locale.value) // 保存切换后的语言到本地存储
}
const ellipsis = ref(false)

const goPage = (path: string) => {
    const url = `https://${path}.valinaa-wei.tech`
    window.location.href = url
}
const goGitHub = () => {
    window.open('https://github.com/Valinaa')
}
const getEmails = () => {
    void ElMessageBox.alert(
        `${t('email content')}<br/>
        <ul>
            <li><b>valinaa@valinaa-wei.tech<b/></li>
            <li><b>1114854003@qq.com<b/></li>
            <li><b>ecustck@163.com<b/></li>
            <li><b>20002605@mail.ecust.edu.cn<b/></li>
            <li><b>valinaa.chenkang@gmail.com<b/></li>
        <ul/>`,
        t('contact info'),
        {
            autofocus: true,
            confirmButtonText: 'OK',
            dangerouslyUseHTMLString: true,
            callback: () => {
                ElMessage({
                    type: 'success',
                    message: `${t('thank for visit')} ^_^`,
                })
            },
        }
    )
}
</script>
<style scoped>
.icon-nav {
    font-size: 1.3em;
}

.menu-item-icon {
    width: 25px;
    padding-bottom: 2px;
    margin-bottom: 2px;
    font-size: 1.2em;
    text-align: left;
    vertical-align: middle;
}

.el-menu-item * {
    vertical-align: middle;
}

/* stylelint-disable-next-line selector-class-pattern */
.el-sub-menu__title * {
    vertical-align: middle;
}

/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 768) {
    .media-menu {
        display: none;
    }
}
</style>
