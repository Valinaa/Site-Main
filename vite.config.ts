/*
 * @GitHub       : https://github.com/Valinaa
 * @Author       : Valinaa
 * @Date         : 2023-04-22 00:03:06
 * @LastEditors  : Valinaa 1114854003@qq.com
 * @LastEditTime : 2023-05-28 01:34:38
 * @FilePath     : \\vue3-camp\\vite.config.ts
 * @Description  : vite配置文件
 *
 * WeChat:Wish-Komorebi
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

/* eslint-disable @typescript-eslint/no-unsafe-call */
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import presets from './presets/presets'

// https://vitejs.dev/config/
export default defineConfig((env) => {
    // env 环境变量
    const viteEnv = loadEnv(env.mode, process.cwd())

    return {
        // envDir: resolve(__dirname),
        base: viteEnv.VITE_BASE,
        plugins: [presets(env)],
        // 别名设置
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'), // 把 @ 指向到 src 目录去
            },
        },
        // 服务设置
        server: {
            host: true, // host设置为true才可以使用network的形式，以ip访问项目
            port: 3000, // 端口号
            open: true, // 自动打开浏览器
            cors: true, // 跨域设置允许
            strictPort: true, // 如果端口已占用直接退出
            // 接口代理
            proxy: {
                '/api': {
                    // 本地 8000 前端代码的接口 代理到 8888 的服务端口
                    // target: 'http://localhost:8888/',
                    target: 'http://master:8080/webroot/decision',
                    changeOrigin: true, // 允许跨域
                    // rewrite: (path) => path.replace('/api/', '/'),
                },
                // '/superset': {
                //     target: 'http://master:5000',
                //     changeOrigin: true,
                // },
            },
        },
        build: {
            // outDir: resolve(__dirname, `dist`), // 指定输出路径
            sourcemap: false, // 这个生产环境一定要关闭，不然打包的产物会很大
            assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
            emptyOutDir: true, // Vite 会在构建时清空该目录
            reportCompressedSize: false,
            // 消除打包大小超过500kb警告
            chunkSizeWarningLimit: 2000,
            minify: 'esbuild',
            assetsDir: 'static/assets',
            // 静态资源打包到dist下的不同目录
            rollupOptions: {
                output: {
                    compact: true, // 压缩代码，删除换行符等
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                },
            },
        },
        css: {
            preprocessorOptions: {
                // 全局引入了 scss 的文件
                scss: {
                    additionalData: `@import "@/assets/styles/variables.scss";`,
                    javascriptEnabled: true,
                },
            },
        },
    }
})
