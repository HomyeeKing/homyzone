---
title: npm link sucks!
date: 2021-10-15 11:03:02
hero_image: ''
lang: zh
duration: 5min
---


npm link 其实就是以下一个命令的集合
```bash
npm i -g xxx

cd your-own-project
ln -s 全局依赖目录  your-own-project

```

我理解的unlink应该是破坏软链，或者直接uninstall 全局的依赖
但是事实并不是，很糟糕

还是建议`yarn link`

yarn link 在全局安装目录的同级创建了一个`link`文件夹，专门存放link的依赖
然后进入到自己的项目工程里`yarn link xxx` 来使用

yarn unlink 从link文件夹删除对应的依赖

very good