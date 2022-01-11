---
title: package.json 字段含义记录
date: 2022-01-11 10:49:53
hero_image: ""
lang: zh
duration: 1min
---

### 为什么`script`里的命令不用加`node_modules/.bin`前缀？

当你执行 `npm run` 命令的时候，会把`node_modules/.bin`添加到环境变量中，所以只要你的项目或全局安装了指定依赖，你就可以放心的直接使用 而不用添加任何前缀。

### bin 字段是干啥的

简单来说，bin 是用来存放可执行文件的，里面是 command name 到本地可执行文件的映射， 可以有一至多个
比如你写了一个 cli, 要想可以被执行，你就需要在 package.json 里添加 bin 字段，指向你要执行的脚本
所以当依赖被安装的时候，它的 bin 指向的**node可执行文件** 就会被软链过去
比如

```json
"bin": {
    "switch-helper": "index.js"
  },
```

当你安装switch-helper的时候，就会从对应的index.js 创建软链到 /usr/local/bin/switch-helper