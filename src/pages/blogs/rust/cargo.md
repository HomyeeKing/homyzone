---
title: cargo 基本用法
date: 2022-11-30 18:55:19 # sj
hero_image: ''
lang: zh
duration: 10min
---

nodejs里把一个包叫做`package`, 所以我们有npm（node package manager）, 同样rust把一个包称作`crate`（木箱），使用`cargo`(集装箱)来进行管理
# cargo new 

`$ cargo new hello_world --bin`

- --bin 创建命令工具的时候传入
- --lib 创建library 
- --vcs none 则不会创建git，默认会创建

目前看bin目录和library的目录没啥区别

# cargo build
会生成可执行程序, 生成`target`文件夹，
```bash
./target/debug/<manifest_name> # 多次修改name名 好像不会覆盖之前的，不晓得为啥这么设计 cargo clean才会清除

cargo build -r  # 会生成release版本，相应的可执行程序在./target/release/下
```
所以调试基本就很简单了，改完代码build以下，然后执行编译过后的bin命令即可


# 查看本地项目依赖关系

```bash 
cargo tree
```

# 查看某个crate的最新版本

```bash
cargo search <crate_name>
```

# 更新本地依赖

```bash
cargo update

# 更新指定包到最新版本
cargo update -p <crate_name>
```