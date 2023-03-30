---
title: 根据不同git仓库来动态切换user信息
date: 2021-04-12 11:31:59
hero_image: ''
lang: zh
duration: 1min
---

> 原理： 通过 git-hooks 的 post-checkout，在切换分支的时候执行我们的脚本，脚本的内容就是通过 git 仓库地址，来判断 gitLab/github 来分发相应作者信息

目录结构如下：

```
- root
 * .git-clone-init(file)
 * .gitconfig(file)
 * .git-templates
  + hooks
   + post-checkout
```

首先在`~/.gitconfig`里引入模板

```bash
# ....

[init]
	templatedir = /Users/wanghongye/.git-templates

```

```bash
# 创建 .git-templates文件夹
~/.git-templates/hooks/post-checkout

#!/bin/bash

#checkout hook to locally set user name and email based on user defined patterns
#The patterns are matched against the clone url.
#
#Based on http://www.dvratil.cz/2015/12/git-trick-628-automatically-set-commit-author-based-on-repo-url/

function warn() {
    echo -e "\n $1"
}

email="$(git config --local user.email)"
name="$(git config --local user.name)"

if [[-n $email && -n $name]]; then
    warn "There's not email or name in local config, so we will overwrite it"
fi

remote="$([[ $(git remote | wc -l) -eq 1 ]] && git remote || git remote | grep "^origin$")"

if [[ -z $remote ]]; then
    warn "Failed to detect remote."
    exit 0
fi

url="$(git config --local remote.${remote}.url)"

if [[ ! -f ~/.git-clone-init ]]; then
    warn "You need to create a clone template first, including email and name condition"
fi
. ~/.git-clone-init

if [[ -z $name || -z $email ]]; then
  warn "Failed to detect identity using ~/.git-clone-init."
  exit 0
fi
git config --local user.email "$email"
git config --local user.name "$name"

echo -e "\nIdentity set to $name <$email>"
```

`post-check`脚本中包含`.git-clone-init`脚本，内容如下
里面就是条件分支语句，如果是 github 用户信息是啥，其他的是啥，当然根据你的需要可以修改

```bash
case "$url" in
  *@github.com:* )
  email="HomyeeKing@gmail.com";
  name="HomyeeKing";;
  *)
  email="foo@mail.com"; name="foo";;
esac

```
