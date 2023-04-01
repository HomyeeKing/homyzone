---
title: auto-set-upstream
date: 2022-11-11 14:57:15
hero_image: ""
lang: zh
duration: 5min
---


```bash
# need git 2.37.0
git config --global --add push.default current
git config --global --add push.autoSetupRemote true
```


https://pawelgrzybek.com/auto-setup-remote-branch-and-never-again-see-an-error-about-the-missing-upstream/


# 如何给分支设置指定upstream

假如现在有两个remote: foo & bar，以及两个分支a & b
```bash
# 将a分支的upstream 指向foo的master b分支指向bar的main

# 切换到a分支
git branch -u foo/master  

# 切换到b分支
git branch -u bar/main
```