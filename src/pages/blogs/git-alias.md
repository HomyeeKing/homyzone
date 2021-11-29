---
title: git 操作记录
date: 2021-07-06 23:27:22
hero_image: ''
lang: zh
duration: 5min
---

## 别名篇
记录我的 ~/.zshrc文件 

```sh
#default path
cd ~/Desktop/homyee


alias cmm=commit -m #必须key=value 紧挨着等号
alias  st=status
alias  pl=pull
alias  ps=push
alias   sw=switch
alias   swc=switch -c
alias   br= branch
alias   l=log --stat
alias	lp=log  --all --decorate --oneline --graph
alias    g=git

```



## git 将一个分支完全覆盖另一个分支


`git reset --hard xxx` 用xxx分支覆盖当前分支

`git push -f ` 推上去