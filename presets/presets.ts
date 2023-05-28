/*
 * @GitHub       : https://github.com/Valinaa
 * @Author       : Valinaa
 * @Date         : 2023-04-22 00:03:06
 * @LastEditors  : Valinaa 1114854003@qq.com
 * @LastEditTime : 2023-05-28 01:19:09
 * @FilePath     : \\vue3-camp\\presets\\presets.ts
 * @Description  : 配置vite插件
 *
 * WeChat:Wish-Komorebi
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import {
    ElementPlusResolver,
    VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers'
import {
    createStyleImportPlugin,
    ElementPlusResolve,
} from 'vite-plugin-style-import'
import WindiCSS from 'vite-plugin-windicss'
import Markdown from 'vite-plugin-vue-markdown'
import Prism from 'markdown-it-prism'
import Unfonts from 'unplugin-fonts/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import LinkAttributes from 'markdown-it-link-attributes'
import { ConfigEnv } from 'vite'
import { resolve } from 'path'

const defaultClasses = 'prose prose-sm m-auto text-left'

export default (env: ConfigEnv) => {
    return [
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        vueJsx(),
        eslint(),
        svgLoader(),
        AutoImport({
            dts: './src/auto-imports.d.ts',
            imports: [
                'vue',
                'pinia',
                'vue-router',
                'vue-i18n',
                '@vueuse/core',
                {
                    axios: [
                        ['default', 'axios'], // import { default as axios } from 'axios',
                    ],
                    'echarts/core': [['*', 'echarts']],
                    'echarts/charts': [
                        'BarChart',
                        'BoxplotChart',
                        'ScatterChart',
                        'PieChart',
                    ],
                    'echarts/renderers': ['CanvasRenderer', 'SVGRenderer'],
                    'echarts/features': ['LabelLayout', 'UniversalTransition'],
                    // 引入提示框，标题，直角坐标系，数据集，内置数据转换器等组件
                    'echarts/components': [
                        'DatasetComponent',
                        'DataZoomComponent',
                        'GridComponent',
                        'LegendComponent',
                        'MarkLineComponent',
                        'TitleComponent',
                        'ToolboxComponent',
                        'TooltipComponent',
                        'TransformComponent',
                    ],
                },
            ],
            // Generate corresponding .eslintrc-auto-import.json file.
            // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
            eslintrc: {
                enabled: false, // Default `false`
                filepath: `./.eslintrc-auto-import.json`, // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
            resolvers: [ElementPlusResolver()],
        }),
        createStyleImportPlugin({
            resolves: [ElementPlusResolve()],
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    resolveStyle: (name: string) => {
                        return `element-plus/theme-chalk/${name}.css`
                    },
                },
            ],
        }),
        Components({
            dts: './src/components.d.ts',
            extensions: ['vue', 'md'],
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            // imports 指定组件所在位置，默认为 src/components; 有需要也可以加上 view 目录
            dirs: ['src/components/', 'src/views/'],
            resolvers: [
                ElementPlusResolver(),
                IconsResolver(),
                VueUseComponentsResolver(),
            ],
        }),
        Icons({
            compiler: 'vue3',
            autoInstall: true,
        }),
        Unfonts({
            google: {
                families: ['Open Sans', 'Montserrat', 'Fira Sans'],
            },
        }),
        VueI18n({
            include: [resolve(__dirname, '../locales/**')],
        }),
        WindiCSS({
            safelist: defaultClasses,
        }),
        Markdown({
            wrapperClasses: defaultClasses,
            headEnabled: false,
            markdownItSetup(md) {
                // https://prismjs.com/
                md.use(Prism)
                // 为 md 中的所有链接设置为 新页面跳转
                md.use(LinkAttributes, {
                    matcher: (link: string) => /^https?:\/\//.test(link),
                    attrs: {
                        target: '_blank',
                        rel: 'noopener',
                    },
                })
            },
        }),
    ]
}
