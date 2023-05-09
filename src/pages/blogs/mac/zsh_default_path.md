---
title: 如何修改zsh的默认打开路径
date: 2023-05-09 20:53:25
hero_image: ""
lang: zh
duration: 1min
---

之前在`~/.zshrc`里通过`cd xxx`来实现每次打开终端直接导航的指定路径，但是有个不太方便的地方那就是vscode里的集成终端也会读取~/.zshrc作为profile，这样就丢失了打开当前工作目录的功能，今天终于解决了，即通过`$TERM_PROGRAM`来区别终端打开的环境：

```bash
if [[ "$TERM_PROGRAM" == "vscode" ]]; then
    # 在 VSCode 中打开终端时执行的命令
else
    # 在其他终端应用程序中打开终端时执行的命令
   # default path
 cd <default path>
fi
```