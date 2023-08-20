---
title: 用vscode debug一切
date: 2023-08-20 21:52:03
hero_image: ""
lang: zh
duration: 5min
---

# Launch & Attach
> https://github.com/forsigner/vscode-debug-examples/blob/master/docs/launch-and-attach-zh-CN.md
> https://code.visualstudio.com/docs/editor/debugging#_launch-versus-attach-configurations

VSCode 提供了两种调试模式：
- launch：启动程序并进行调试；
- attach：调试某个已启动的程序；
有什么区别呢？launch模式 由 VSCode 来启动一个独立的具有 debug 模式的程序；attach模式 附加于一个已经启动的程序，也就是程序本身不是通过 VSCode 启动的。

在同一项目中，这两种模式也可以并存使用。

如何选择呢？其实可以说明下使用场景。 如果选择了`launch`, 那么vscode会重新启动一个进程，比如进行web项目调试，vscode就会新开一个tab，如果使用attach就会连接到已经进行的进程上。