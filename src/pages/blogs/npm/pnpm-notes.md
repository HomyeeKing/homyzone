---
title: pnpm 原理记录
date: 2022-02-04 14:57:04
hero_image: ""
lang: zh
duration: 1min
---

## node_modules 结构

首先包含如下：

```
project
|
└───node_modules
    │   .bin  // 二进制文件命令 非js，一些脚手架
    │   .pnpm // 依赖store
    |   deps... // package.json中注册的依赖 通过软链指向.pnpm对应的依赖
```

## .pnpm

```
.pnpm
|____foo@1
     |____node_modules
          |____foo  //hard link to 全局pnpm store的指定依赖
          |____bar ---> ../../bar/node_modules/bar  //foo中包含的依赖， 软链到.pnpm中其对应的依赖
          |____ .......
|____bar@1
    |____node_modules
              |____bar hard link to 全局pnpm store的指定依赖
```

## 处理 peer 以及 不同版本的相同依赖

### package 有 peer 而且 peer 的版本不同

foo 有 peer bar + baz ， 但是不同版本

```
node_modules
└── .pnpm
    ├── foo@1.0.0_bar@1.0.0+baz@1.0.0
    │   └── node_modules
    │       ├── foo
    │       ├── bar   -> ../../bar@1.0.0/node_modules/bar
    │       ├── baz   -> ../../baz@1.0.0/node_modules/baz
    │       ├── qux   -> ../../qux@1.0.0/node_modules/qux
    │       └── plugh -> ../../plugh@1.0.0/node_modules/plugh
    ├── foo@1.0.0_bar@1.0.0+baz@1.1.0
    │   └── node_modules
    │       ├── foo
    │       ├── bar   -> ../../bar@1.0.0/node_modules/bar
    │       ├── baz   -> ../../baz@1.1.0/node_modules/baz
    │       ├── qux   -> ../../qux@1.0.0/node_modules/qux
    │       └── plugh -> ../../plugh@1.0.0/node_modules/plugh
    ├── bar@1.0.0
    ├── baz@1.0.0
    ├── baz@1.1.0
    ├── qux@1.0.0
    ├── plugh@1.0.0

```

### 当前 package 没有 peer 但是它的 dep 有 peer

假设 a 依赖着 b, b 有个同级依赖 c

正常情况下 a 是无法解析到 b 的同级依赖 c 的，所以 pnpm 会把 c 当做成 a 的依赖，形成上面的结构，不过目录名称也会有相应标识，所以这里会有两份 a，但是因为是 hardlink,这里只是多了个指向源文件的指针、地址，不会真正的物理磁盘

````

node_modules
└── .pnpm
├── a@1.0.0_c@1.0.0
│ └── node_modules
│ ├── a
│ └── b -> ../../b@1.0.0_c@1.0.0/node_modules/b
├── a@1.0.0_c@1.1.0
│ └── node_modules
│ ├── a
│ └── b -> ../../b@1.0.0_c@1.1.0/node_modules/b
├── b@1.0.0_c@1.0.0
│ └── node_modules
│ ├── b
│ └── c -> ../../c@1.0.0/node_modules/c
├── b@1.0.0_c@1.1.0
│ └── node_modules
│ ├── b
│ └── c -> ../../c@1.1.0/node_modules/c
├── c@1.0.0
├── c@1.1.0

```

```
````
