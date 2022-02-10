---
title: Git Troubleshooting
date: 2022-02-10 20:34:46
hero_image: ""
lang: zh
duration: 5min
---

## git 将一个分支完全覆盖另一个分支

`git reset --hard xxx` 用xxx分支覆盖当前分支

`git push -f ` 推上去

## github\gitlab 账号管理

详看 [在mac上配置gitlab和github两个账户](./gitlab-github.md) 以及 [根据不同git仓库来动态切换user信息](./smart-git.md)

## git case-sensitive

Osx文件系统是对文件大小写不敏感的，所以在你更改文件名大小写，git是捕捉不到的，就会造成潜在的bug，比如发布的时候找不到模块，所以可以全局开启
`git config core.ignorecase false -g`，来帮助避免这种情况

同时也要删除不需要的那个文件，否则会有不同大小写相同文件、目录的两个提交，如果已经提交过了，也一样，步骤如下：

```sh
# 加上 -n 这个参数，执行命令时，是不会删除任何文件，而是展示此命令要删除的文件列表预览。

git rm -r -n --cached <文件/文件夹名称>

# 确认无误后删除文件
git rm -r  --cached <文件/文件夹名称>
```

然后正常提交即可