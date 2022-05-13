---
title: vite ssr
date: 2021-03-03 11:04:34
hero_image: ''
lang: zh
duration: 25min
---
 
vite 的 ssr怎么开发呢？

通常的目录结构如下
```
- index.html
- src/
    - main.js // 暴露环境无关的app的代码
    - entry.client.js // 客户端相关代码，主要用来挂载app实例
    - entry.server.js // 服务端相关代码，通过框架提供的ssr的方法来渲染app， 所以这里要暴露一个render方法
```

服务端渲染 ，我们需要创建自己的开发服务器，这里通过vite的`createServer` 来创建，注意要进行条件判断来区分开发环境，来采取不同的导入方式