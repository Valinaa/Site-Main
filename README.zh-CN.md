<br>

<p align='center'>
<a href="https://www.valinaa-wei.tech/blog/">在线 Demo</a>
</p>

<br>

<p align='center'>
<a href="https://github.com/Valinaa/Site-Pages/blob/main/README.md">English</a> | <b>简体中文</b>
</p>

<br>

## 特性

* ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 3](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - 快，且更快！
* 💪 [Typescript](https://www.typescriptlang.org/) - 当然！必不可少
* 🎉 [Element Plus 开箱即用](https://github.com/element-plus/element-plus) - 基于 Vue.js 3 的强大 UI 库
* 🔥 [Axios 配置和封装](https://github.com/axios/axios) - 基于 Promise 的 HTTP 请求库
* 💡 [Vue Router 4](https://router.vuejs.org/zh/) - Vuejs 的官方路由
* 📦 [组件自动按需加载](https://github.com/antfu/unplugin-vue-components) - 自动按需注册组件, 无需 import
* 📥 [API 自动按需加载](https://github.com/antfu/unplugin-auto-import) - 无需手动 import 进行引入
* 🍍 [Pinia 状态管理](https://pinia.esm.dev/) - 你将会喜欢上的 Vue Store
* 🎨 [PostCSS](https://github.com/postcss/postcss) - A tool for transforming CSS with JavaScript
* 🎨 [Windi CSS](https://github.com/windicss/windicss) - 下一代实用的原子 css 框架
* 😃 [icones](https://github.com/antfu/unplugin-icons) - 强大的图标库，各种图标集为你所用
* 🌍 [I18n 国际化开箱即用](./locales) - 想要翻译？是的，都可以！
* 👩‍🎨 [NProgress](https://github.com/rstacruz/nprogress) - 页面加载进度反馈
* 😃 [SVG 支持](https://github.com/jpkleemans/vite-svg-loader) - 支持以 组件形式使用 SVG 图片
* 📑 [Markdown 支持](https://github.com/antfu/vite-plugin-md) - 随意的在页面中嵌入 Markdown
* 🔑 完整支持的代码风格规范和代码提交规范
* ☁️ 支持零配置部署 Netlify

## 编码风格

* 使用[Airbnb](https://github.com/airbnb/javascript)风格、对[Prettier](https://prettier.io)、TypeScript等有特定规则支持的[ESLint](https://eslint.org/)
* 与[Prettier](https://prettier.io)相结合并定制化规则的[StyleLint](https://stylelint.io)

## 开发工具

* [TypeScript](https://www.typescriptlang.org/)
* [Netlify](https://www.netlify.com/) - 零配置的部署
* [VS Code 扩展](./.vscode/extensions.json)

  + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - Vue 3 IDE 支持
  + [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - 图标内联显示和自动补全
  + [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - 多合一的 I18n 支持
  + [PostCSS](https://postcss.org/) - 使用JavaScript转换CSS的工具
  +
  + [Windi CSS 智能感知](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - Windi CSS 的 IDE 支持
  + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 代码质量和规则检查
  + [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 专注于代码格式化、美化代码
  + [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - 编码风格检查
* locales

  + en.json *(国际化语言的英文映射)*
  + zh-CN.json *(国际化语言的中文映射)*
* node_modules
* presets

  + presets.ts *(vite.config.ts 插件配置)*
* src

  + assets *(静态文件)*
  + components *(公共组件)*
  + pages *(不同路由的私有组件)*
  + router
  + store
  + utils
    - code.ts *(封装状态码)*
    - format.ts *(封装JSON to URL函数)*
    - http.ts *(封装Axios)*
    - jsonp.ts *(封装 JSONP 请求)*
  + views *(例如 404.vue)*

## 现在开始吧

### GitHub 模板

[使用这个模板创建仓库](https://github.com/Valinaa/Site-Pages/generate).

### 克隆到本地

```bash
git clone https://github.com/Valinaa/Site-Pages.git my-site-pages
cd my-site-pages
pnpm i
```

## 注意

在使用之前, 请根据下列清单更新您的个人信息

* [ ] `LICENSE、package.json` 中的作者信息(author)
* [ ] `.env` 中的标题(title)
* [ ] `src/assets` 中的图标(favicon)和头像(avatar)
* [ ] `README` 相关文档
* [ ] 更新或删除 `routes` ,  `stores` 以及部分Vue组件

## 使用

### 开发环境

执行以下命令
随后访问 [http://localhost:3000](http://localhost:3000)

```bash
pnpm run dev
```

### 构建

执行以下命令

```bash
pnpm run build
```

生成的文件在 `dist` 文件夹中

## Thanks

该模板部分灵感源自 [vitecamp](https://github.com/nekobc1998923/vitecamp)
