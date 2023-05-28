<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn
</script>

<template>
    <div class="app-container">
        <el-config-provider :locale="locale">
            <el-container class="main-container">
                <el-header>
                    <NavBar />
                </el-header>
                <el-container>
                    <el-aside v-if="$route.path === '/blog'">
                        <SideBar />
                    </el-aside>
                    <el-container>
                        <el-main>
                            <router-view />
                        </el-main>
                        <el-footer>
                            <TheFooter />
                        </el-footer>
                    </el-container>
                </el-container>
            </el-container>
        </el-config-provider>
    </div>
</template>
<style lang="scss">
.app-container {
    z-index: 100;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-image: linear-gradient(
        326deg,
        #bb667f,
        #bd8f9d,
        #b8b6bb,
        #addddb
    );
}

.dark .app-container {
    background-image: linear-gradient(
        315deg,
        #003160,
        #36466b,
        #575c76,
        #767481
    );
}

.main-container {
    display: flex;
    flex: 1;
    flex-direction: column;
}

.el-footer {
    margin-top: auto; /* 将 el-footer 推至页面底部 */
    text-align: center;
}

.el-aside {
    display: flex;

    --el-menu-icon-width: 0;
}

.el-header {
    padding: 0;
}

.el-main {
    min-height: 610px;
}

:root {
    --el-aside-width: 220px;
    --el-menu-bg-color: transparent;
    --el-menu-border-color: transparent;
}
</style>
