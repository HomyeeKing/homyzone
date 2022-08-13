---
title: webpack 常用插件、loader功能记录
date: 2022-06-28 11:16:31
hero_image: ""
lang: zh
duration: 1min
---


### HtmlWebpackPlugin

生成Html文件用来托管webpack bundle生成的内容，比如用script引进Bundle资源，如果有css资源，会通过link标签引入 放到head里

### MiniCssExtractPlugin

> https://webpack.js.org/plugins/mini-css-extract-plugin/

会根据每个包含css的js文件生成对应的css文件

如果在入口文件import css文件了，这个插件不会在页面中加载css资源，需要使用`HtmlWebpackPlugin`来辅助引入

而且不要同时和style-loader使用

### style-loader

将css通过link标签在DOM中注入，一般和css-loader搭配使用
一般适用于`import 'xxx.css'`这种side effect引入

### css-loader
用来解析导入为以.css为后缀的文件，用来解释@import、url()引入的资源

`modules:true`(modules: local 可以达到同样的效果) 可以开启`CSS modules`模式，可以实现如下效果
- 当前css文件会导出一个Object, key是类名，value是对应的hash值
- 可以通过`local` `:global`声明哈希类名或是全局类名
- 可以通过`composes` 来继承类名，不过被继承的类名要在当前类名之前，也可以通过import导入，支持多个导入

### stylesheet-loader
内联，导入jsx flavor的css
