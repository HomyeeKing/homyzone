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

在DOM中注入CSS，一般和css-loader搭配使用