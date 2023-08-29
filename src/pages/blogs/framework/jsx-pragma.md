---
title: jsx pragma
date: 2023-08-29 16:04:41
hero_image: ''
lang: zh
duration: 25min
---

`pragma`是一个编译指令，告诉编译器如何处理当前文件，比如`'use strict'`。`JSX pragma`则是帮助编译器如何编译jsx文件。

一般默认是通过babel插件来进行编译，但是也有一种注释的方式来控制某个模块的编译行为。

分为两种模式`automatic`和`classic`, 其中`classic`包含如下配置
```jsx
/** @jsx Preact.h */
// 表示使用哪个方法来编译jsx

/** @jsxRuntime classic */
// 表示使用默认的runtime，也就是React.createElement
```

`automatic`包含如下配置
```jsx
/** @jsxImportSource custom-jsx-library */
```

# 参考阅读
- https://babeljs.io/docs/babel-plugin-transform-react-jsx#pragma
