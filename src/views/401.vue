<!--
 * @GitHub       : https://github.com/Valinaa
 * @Author       : Valinaa
 * @Date         : 2023-04-22 00:03:06
 * @LastEditors  : Valinaa 1114854003@qq.com
 * @LastEditTime : 2023-04-23 13:43:44
 * @FilePath     : \\vue3-camp\\src\\views\\exception\\401.vue
 * @Description  : 
 * 
 * WeChat:Wish-Komorebi
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->

<template>
    <el-row>
        <el-col>
            <el-result
                icon="warning"
                title="页面无权限"
                sub-title="请联系管理员申请权限">
                <template #extra>
                    <el-button
                        type="primary"
                        @click="goBack">
                        Back
                    </el-button>
                </template>
            </el-result>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
const router = useRouter()
const goBack = () => {
    void router.push({
        name: 'home',
    })
}
</script>
