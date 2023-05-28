<!--
 * @GitHub       : https://github.com/Valinaa
 * @Author       : Valinaa
 * @Date         : 2022-07-28 18:31:56
 * @LastEditors  : Valinaa 1114854003@qq.com
 * @LastEditTime : 2023-05-28 01:21:06
 * @FilePath     : \\vue3-camp\\src\\components\\NavBar.vue
 * @Description  : 导航栏组件
 *
 * WeChat:Wish-Komorebi
 * Copyright (c) 2022 by Valinaa 1114854003@qq.com, All Rights Reserved.
-->
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
                src="src/assets/avatar.jpg" />
        </div>
        <el-menu-item
            index="/"
            style="width: 90px"
            @click="goIndexPage()">
            <i class="menu-item-icon">
                <SolarHomeOutline />
            </i>
            {{ t('home') }}
        </el-menu-item>
        <el-menu-item
            index="disabled"
            style="width: 130px"
            disabled>
            <i class="menu-item-icon">
                <IBiGift />
            </i>
            {{ t('more extends') }}...
        </el-menu-item>

        <div class="flex-grow" />
        <el-tooltip
            :content="isDark ? t('change light') : t('change dark')"
            placement="top">
            <button
                class="mx-2 !outline-none"
                @click="toggleDark()">
                <i-ph-cloud-moon-bold
                    v-if="isDark"
                    class="icon-nav mx-1" />
                <i-ph-sun-horizon-bold
                    v-else
                    class="icon-nav mx-1" />
            </button>
        </el-tooltip>
        <el-tooltip
            :content="t('change lang')"
            placement="top">
            <button
                class="icon-btn mx-2"
                @click="toggleLocales()">
                <i-la-language class="icon-nav" />
            </button>
        </el-tooltip>
        <el-sub-menu
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
import router from '@/router'
import { saveLanguage } from '@/utils/i18n'

import { ElMessageBox } from 'element-plus'
import SolarHomeOutline from '~icons/solar/home-outline'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const { t, availableLocales, locale } = useI18n()
const toggleLocales = () => {
    const locales = availableLocales
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    saveLanguage(locale.value) // 保存切换后的语言到本地存储
}
const ellipsis = ref(false)

const goIndexPage = () => {
    void router.push('/')
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
</style>
