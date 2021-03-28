---
layout: post
title: 搭建 React 组件库
subtitle: "create your own React component library using Rollup, TypeScript, Sass and Storybook"
author: "Toma"
hidden: true
header-style: text
tags:
  - 笔记
  - React
  - JavaScript
  - Rollup
  - TypeScript
---

> 😌 人生苦短，如何搭建一个兼容 react 15 & 16~17 版本的 组件库呢。
> 如果只是 react 版本差异也就算了，老版项目的 webpack 甚至有 webpack1。
> ლ(′◉❥◉｀ლ) ... 


## 项目结构

一些项目 react版本 最高可以升级到的 `16.14.0`, 因此，为了调试方便  
也将组件库的 react版本 锁定在这个版本了

```
.
├── README.md
├── dist                              # build 目录
├── jest.config.js
├── package-lock.json
├── package.json
├── rollup.config.js
├── src                               # 开发目录
│   ├── Icons
│   │   └── zixun.svg
│   ├── components
│   │   └── Sticky
│   │       ├── Sticky.scss
│   │       ├── Sticky.stories.tsx
│   │       ├── Sticky.tsx
│   │       ├── Sticky.types.ts
│   │       └── index.tsx
│   ├── custom.d.ts
│   ├── index.ts
│   ├── jest.test.ts
│   ├── mock
│   │   └── siteConfig.json
│   └── styles
│       ├── typography.scss
│       └── variables.scss
├── tsconfig.json
├── utils
└── yarn.lock
```
