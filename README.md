# IPZOE VUE ADMIN

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.7.0-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
    <img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/releases">
    <img src="https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg" alt="GitHub release">
  </a>
  <a href="https://gitter.im/vue-element-admin/discuss">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="gitter">
  </a>
</p>

简体中文 | [English](./README.EN.md) 

## 简介

本项目是基于[vue-element-admin](https://panjiachen.github.io/vue-element-admin)，结合与后端约定进行的二次开发

[vue-element-admin](https://panjiachen.github.io/vue-element-admin) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。

- [在线预览](https://panjiachen.github.io/vue-element-admin)

- [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

- [Gitee](https://panjiachen.gitee.io/vue-element-admin/) 在线预览（国内用户可访问该地址）

- [国内访问文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/) 文档（方便没翻墙的用户查看）


**`v4.1.0+`版本之后默认 master 分支将不支持国际化，有需要的请使用[i18n](https://github.com/PanJiaChen/vue-element-admin/tree/i18n)分支，它会和 master 保持同步更新**

**该项目不支持低版本浏览器(如 ie)，有需求请自行添加 polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**

**目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若发现问题，欢迎提[issue](https://github.com/PanJiaChen/vue-element-admin/issues/new)。若你想使用旧版本，可以切换分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-element-admin/tree/tag/3.11.0)，它不依赖 `vue-cli`**

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 功能

```
- 登录 / 注销

- 权限验证
  - 权限配置

- 多环境发布
  - dev test stage prod

- Dashboard
  - 智慧大屏   （todo）
  
- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

```

## 开发

```bash
# 克隆项目
git clone http://xxx@git.ipzoe.com/scm/ift/ipzoe-admin-vue.git

# 进入项目目录
cd ipzoe-admin-vue

# 安装依赖
npm install 或者 yarn 

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 组件库
- **[View UI](https://www.iviewui.com/docs/introduce) 即原先的 iView，是一套基于 Vue.js 的开源 UI 组件库，主要服务于 PC 界面的中后台产品。**
- **[Vue-html5-editor](https://github.com/PeakTai/vue-html5-editor) Vue Html5 富文本编辑器**
- **[tiptap](https://github.com/scrumpy/tiptap) A renderless rich-text editor for Vue.js [Document](https://tiptap.scrumpy.io/docs)**
## 在线示例

[Demo](http://dev-admin-base.ipzoe.com/)

## 浏览器支持

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
