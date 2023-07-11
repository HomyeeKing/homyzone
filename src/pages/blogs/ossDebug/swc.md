---
title: swc debugging
date: 2022-05-03 22:49:56
hero_image: ""
lang: zh
duration: 1min
---

# 入口
swc 使用了 [napi](https://napi.rs/docs/cli/build) 来构建@swc/core等js api，所以我们大部分要调试是的时候，首先得掌握如何把你改的代码编译成最新的@swc/core

这里主要看`package.json` 里的 `build:dev` scripts
```bash
tsc -d && napi build --platform --cargo-name binding_core_node --js ./node-swc/src/binding.js --dts ./node-swc/src/binding.d.ts --cargo-cwd ./bindings -p binding_core_node

# 命令含义如下
# --platform：生成的node文件名要不要加 [platform triple](https://napi.rs/docs/cli/napi-config#what-is-target-triple)
# --js ./node-swc/src/binding.js：jsbinding路径，也就是一个判断环境来load哪个node文件的脚本
# --dts ./node-swc/src/binding.d.ts：指定编译时使用的 TypeScript 类型声明文件路径。
# --cargo-cwd ./bindings：默认cargo/toml的cwd
# -p binding_core_node：要build的crate为binding_core_node。
# --cargo-name binding_core_node：配套-p，标明要从target/release里读哪个文件 binding_core_node。
```

搞清楚上边这个命令，我们知道要首先看的crate就是binding_core_node。

# binding_core_node。

目录下首先会看到一个