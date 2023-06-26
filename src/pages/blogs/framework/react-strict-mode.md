---
title: react strict mode
date: 2023-06-26 11:39:11
hero_image: ''
lang: zh
duration: 25min
---

> https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development

# 重复渲染组件

react要求开发者写的组件是pure component，幂等的，即多次调用 如果props和state相同的话 展示的内容也应该相同，所以在严格模式下会默认渲染两遍，所以在严格模式下，如果你打印了个log，可能会在本地环境控制台触发两次（但是第二个console的颜色会浅一点），这不是bug，也可以通过React Dev Tools来设置压缩不显示


# 重复执行useEffect

为了帮助开发者及早发现没有添加Clean Up函数

# 检测使用了不安全的、过时的API
findDOMNode. See alternatives.
UNSAFE_ class lifecycle methods like UNSAFE_componentWillMount. See alternatives.
Legacy context (childContextTypes, contextTypes, and getChildContext). See alternatives.
Legacy string refs (this.refs). See alternatives.