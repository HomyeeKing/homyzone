---
title: monorepo 使用注意事项
date: 2022-09-13 17:43:45
hero_image: ''
lang: zh
duration: 5min
---

## 推荐使用hoist
hoist会做：
- 提升公共依赖到项目根目录的node_modules中
- 常用依赖（即使没有所有项目使用）依然会被提升到顶层依赖，不同版本的会各自在自己的node_modules里安装
- 所有的bin会自动在各自的node_modules里进行软链

**优点**
- hoist 就是把依赖提升到根目录，而不是在每个pakcage下执行install 避免依赖重复


**缺点**
因为node的resolve机制，可能会有幽灵依赖，即没有在本项目中声明，但是也能work，这要开发者保持良好的开发习惯，用到的依赖一定要在package.json里声明；

一些工具如果没有严格按照node resolution查找依赖（只在当前node_modules里查找 没有向上查找），会有依赖找不到的问题，推荐让这类工具进行兼容


## commit管理
因为所有的包都在一个仓库了，而且是一个git，一定要保证commit的pure，显式标注提交属于哪个package，方便进行快速回滚
（可通过commit工具进行约束）