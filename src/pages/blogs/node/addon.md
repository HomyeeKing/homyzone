---
title: node addon
date: 2023-05-26 14:37:11 # sj
hero_image: ""
lang: en
duration: 10min
---

首先跟着node文档学习一下
https://nodejs.org/dist/latest-v16.x/docs/api/addons.html

addon 需要使用 v8\libuv（node官方的c++）库里的api进行操作

`node-gyp` 是一个编译工具，把我们编写的c++代码编译成二进制文件
我们在编写node addon的时候，需要有一个配置文件，`binding.gyp`, 我们在里面配置好后，`npm install`的时候就会自动执行`node-gyp`编译你的C++代码

`binding.gyp`本质是一个json文件
```gyp
{
  "targets": [ # 每一个binding.gyp都需要一个targets数组， 每一项代表一个c++模块
    {
      "target_name": "binding", # 最终编译成 <target_name>.node 文件
      "sources": [ "src/binding.cc" ] #  被编译的源代码文件， 可以是c 或 c++
	  "include_dirs": []  # 可选，这个作为被编译时 #include 搜索的目录
    }
  ]
}
```

比如上述配置文件就代表：
目标代码文件是`binding.cc`
编译结果的文件名是`binding.node`
### link library
`node-gyp` 会自动定位到`#include <...>` 引入的头部文件，当node-gyp执行的时候，会先检测node.js的发布版本，要么下载所有的源代码，要么仅仅下载头文件。
如果下载的是源代码，addon可以获取Node.js所有的依赖，否则只有导出的symbols可以被访问使用

`node-gyp`可以通过`--nodedir`这个选项来指向本地的node镜像，同样可以使addon获取node所有的依赖

通过NAN进行开发，所以我们要引入#include <nan.h>这个头文件

### require
我们通过require来引入我们编写的addon，也就是`.node`为后缀的二进制文件，require访问文件的优先级是 .js>json>node