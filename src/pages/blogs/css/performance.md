---
title: link script 标签
date: 2024-09-06 17:44:59
hero_image: ''
lang: zh
duration: 1min
---

> 参考： https://juejin.cn/post/6844903936877395981

## link 标签会阻塞 js 的执行

js 运行时，有可能会请求样式信息，如果此时还没有加载和解析样式，js 就有可能会得到错误的回复，产生很多问题。因此浏览器在<link>标签的加载和解析过程中，会禁止脚本运行。

所以如果有要提前执行的 script 脚本，要放到 links 前，否则会阻塞

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      console.log(Date.now());
    </script>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.css"
    />
    <script>
      console.log(Date.now());
    </script>
  </head>
  <body>
    <div>i am content a.</div>
    <div>i am content b.</div>
  </body>
</html>
```

## script

- `<script>` 标签会阻塞DOM的解析和渲染；
- 带src属性的`<script>`标签会触发页面paint，渲染此`<script>`标签之前的元素，但也有一定的条件：

- 此`<script>`标签是在`<body>`中的，`<head>`中的不会触发paint；
- 此`<script>`标签之前的`<link>`标签需加载完毕。


- inline的`<script>`标签不会触发页面paint，页面必须等到脚本执行完毕，且DOM Tree和CSSOM Tree解析完毕后才会渲染；
- `<link>`标签不会阻塞DOM的解析；
- `<link>`标签会阻塞DOM的渲染；
- `<link>`标签同时还会阻塞其之后的`<script>`标签的执行。
