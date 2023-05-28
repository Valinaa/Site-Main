<template>
    <div class="not-found">
        <img
            src="@/assets/404.gif"
            alt="您访问的页面不存在哦~" />
        <div style="position: relative; z-index: 100">
            <el-row>
                <el-col>
                    <el-result
                        icon="warning"
                        title="页面未找到"
                        sub-title="请检查路径后重试或返回首页">
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
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
const goBack = () => {
    void router.push('/')
}
</script>
<style scoped>
.not-found {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.not-found img {
    width: 100%;
    height: 100%;
}
</style>
