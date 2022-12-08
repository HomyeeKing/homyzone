---
title: 命令行中 “&” 的踩坑日记
date: 2022-12-08 20:46:48
hero_image: ''
lang: zh
duration: 5min
---

[[toc]]

# 背景

最近踩了下这方面的坑，背景如下，有时候你会看到 npm script 里会有这种命令

```json
{
  "scripts": {
    "dev": "tsc -w && node index.js",
    "dev:1": "tsc -w && node index.js"
  }
}
```

简言之

- `&`用来并行执行两个命令
- `&&`用来串行执行两个命令

但是还远没有这么简单，&这里还要注意下，首先这不是 npm 的功能，这是 unix shell script 的功能
&前的命令就会运行在 background shell 的，也就是后台运行。

例如 tsc -w &, 这样你就会发现即使按了 ctrl_c，终端上程序退出后，再次修改 ts 文件同样也会触发程序执行。这里就是因为系统信号传递不到(目前我搜索了下，没找到可以传递系统信号到 backgroudn shell 的，如果有请告诉我)，例如这种中断命令就无法作用到后台运行的程序上, 所以你以为程序中断了，那只是没有在前台展示了，后台还在悄悄运行呢

# 如何查看后台命令

后台命令隐蔽，但是我们还是可以通过命令查看的，可以用 jobs -l(打印 pid)

然后 通过 kill -9 [pid]来杀掉对应的进程

# 如何手动把命令送到后台

除了一开始执行的时候加&, 运行的时候 按 ctrl + z 也可以

# 如何把命令送到前台

fg %x x 对应 job 的序号

送到前台 这时我们再触发下终端，jobs 就没了, perfect

# 如何持久化执行某个命令

在最前面加上 nohup ，如 nohup tsc -w &
这个命令会忽略 SIGHUP 信号，即使退出终端了，也就是即使当前终端 session 毙掉了，也会持续执行

# 总结

所以在 npm script 里，要想并行执行多个命令，还是老老实实用 concurrently 或者 pnpm 自带的并行执行命令的功能，尽量不用&

# 参考

● https://linuxhint.com/send-process-background-linux/
