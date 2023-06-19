<br>

<p align='center'>
<a href="https://main.valinaa-wei.tech">Live Demo</a>
</p>

<br>

<p align='center'>
<b>English</b> | <a href="https://github.com/Valinaa/Site-Pages/blob/main/README.zh-CN.md">简体中文</a>
</p>

<br>

## Features

* ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 3](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - fast and faster !
* 💪 [Typescript](https://www.typescriptlang.org/) - of course! necessary
* 🎉 [Element Plus ready](https://github.com/element-plus/element-plus) - UI Library based on Vue.js 3
* 🔥 [Axios](https://github.com/axios/axios) - Http Library based on Promise
* 💡 [Vue Router 4](https://router.vuejs.org/zh/) - The official router for Vue.js
* 📦 [Components auto importing](https://github.com/antfu/unplugin-vue-components) - Automatically register components on demand without import
* 📥 [Auto import APIs](https://github.com/antfu/unplugin-auto-import) - Automatically import APIs
* 🍍 [State Management via Pinia](https://pinia.esm.dev/) - The Vue Store that you will enjoy using
* 🎨 [PostCSS](https://github.com/postcss/postcss) - A tool for transforming CSS with JavaScript
* 🎨 [Windi CSS](https://github.com/windicss/windicss) - next generation utility-first CSS framework
* 😃 [icones](https://github.com/antfu/unplugin-icons) - Powerful Icon Library, Use icons from any icon sets
* 🌍 [I18n ready](./locales) - Want to translate? Yes, you can!
* 👩‍🎨 [NProgress](https://github.com/rstacruz/nprogress) - Page loading progress feedback
* 😃 [SVG Support](https://github.com/jpkleemans/vite-svg-loader) - Support the use of SVG images as components
* 📑 [Markdown Support](https://github.com/antfu/vite-plugin-md) - Markdown as components / components in Markdown
* 🔑 Complete code style specification and code submission specification
* ☁️ Deploy on Netlify, zero-config

## Coding Style

* [ESLint](https://eslint.org/) with [Airbnb Style](https://github.com/airbnb/javascript) , [Prettier](https://prettier.io) , TypeScript , .etc.
* [StyleLint](https://stylelint.io) with [Prettier](https://prettier.io) and customized rules

## Dev tools

* [TypeScript](https://www.typescriptlang.org/)
* [Netlify](https://www.netlify.com/) - zero-config deployment
* [VS Code Extensions](./.vscode/extensions.json)
  + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) -Vue 3 IDE support
  + [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
  + [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
  + [PostCSS](https://postcss.org/) - A tool for transforming CSS with JavaScript
  + [Windi CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - IDE support for Windi CSS
  + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Code quality and rule checking
  + [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Focus on code formatting and beautifying code
  + [Stylelint - A mighty CSS linter](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - Helps you avoid errors and enforce conventions
  + [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - Coding style check

## Project Catalog

* locales
  + en.json *(English Mapping of Internationalized Languages)*
  + zh-CN.json *(Chinese Mapping of Internationalized Languages)*
* node_modules
* presets
  + presets.ts *(vite.config.ts Plugins Configuration)*
* src
  + assets *(Static Files)*
  + components *(Public Components)*
  + pages *(Private Components for Different Routes)*
  + router
  + store
  + utils
    - code.ts *(Encapsulation of Code Message)*
    - format.ts *(Encapsulation of JSON to URL)*
    - http.ts *(Encapsulation of Axios Config and Init)*
    - jsonp.ts *(Encapsulation of JSONP Request)*
  + views *(Such as 404.vue)*

## Start Now

### 1. GitHub Template

[Create a repo from this template on GitHub](https://github.com/Valinaa/Site-Pages/generate).

### 2. Clone to local

```bash
git clone https://github.com/Valinaa/Site-Pages.git my-site-pages
cd my-site-pages
pnpm i
```

## Note

Before you use this template, follow the checklist to update your info

* [ ] the author name in `LICENSE`
* [ ] the author information in `package.json`
* [ ] the title in `.env`
* [ ] the favicon and avatar in `src/assets`
* [ ] the `README`
* [ ] update/remove `routes` ,  `stores` and some vue components

## Usage

### Development

```bash
pnpm run dev
```

Run and visit [http://localhost:3000](http://localhost:3000)

### Build

```bash
pnpm run build
```

The generated files are in the directory `dist`

## Thanks

This template has partly inspired by [vitecamp](https://github.com/nekobc1998923/vitecamp)
