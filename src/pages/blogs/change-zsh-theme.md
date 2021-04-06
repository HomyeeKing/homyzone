---
title: 修改zsh的主题
date: 2021-04-06 10:30:26
hero_image: ""
lang: zh
duration: 1min
---
```sh
# 1. 进入theme 目录
cd ~/.oh-my-zsh/themes

ls # 查看所有的主题 可以看到很多以.zsh-theme结尾的主题脚本

# 2. 在.zshrc中修改主题vi ~/.zshrc
vi ~/.zshrc
# 找到ZSH_THEME='xxx'  只需要把xxx替换成.zsh-theme前面的主体名称即可  记得重启终端才能看到效果

```