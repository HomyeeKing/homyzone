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

```bash
# 加上 -n 这个参数，执行命令时，是不会删除任何文件，而是展示此命令要删除的文件列表预览。

git rm -r -n --cached <文件/文件夹名称>

# 确认无误后删除文件
git rm -r  --cached <文件/文件夹名称>
```

然后正常提交即可


## git submodule

为什么采用git submodule 而不是npm包呢？ 我觉得下边这段描述会更精确一些：
> Its more accurate to say that git submodules are useful when you want to share code that you also need change along with the consumer of that code. If you’re not trying to change the shared code along with the consumer of that code, there are better options for sharing your code.

就是当我们想依赖一段代码而且又有可能在使用过程中修改它（比如发现bug 进行pr，亦或是官网说的 you're really working on the code in the submodule at the same time）的时候，我们可能会需要git submodule

### 目录结构 
使用 git submodule后，当前项目下会生成一个`.gitsubmodule` .git下也有对应的submodule， 如果删除的话 也要`git rm <submodule>`

### 参考链接
https://www.philosophicalhacker.com/post/using-git-submodules-effectively/#:~:text=Its%20more%20accurate%20to%20say,options%20for%20sharing%20your%20code.


## fast-forward

只有当源分支和目标分支是线性的， 也就是你当前分支初始状态和源分支是同样的时候 git 就会执行fast-forward, 即把指针直接指向当前提交

### 参考链接
https://www.tutorialspoint.com/what-is-a-fast-forward-merge-in-git


## 批量删除本地、远程分支

```bash
# 删除本地单个分支
git branch -d  xxx
# 删除本地多个分支 
git branch | grep 'feat/' | xargs git branch -d  # 删除所有以feat/开头的分支
# 删除远程单个分支
git push origin -d  xxx
# 批量删除远程分支  删除远程所有 feat/ 开头的分支
git branch -r| grep 'feat/' | sed 's/origin\///g' | xargs -I {} git push origin :{}


# 命令解释
xargs 将前面的值作为后边命令的标准参数
git branch -r  查看远程分支
| sed ‘s/origin///g‘  去掉origin(能够把接受到的分支都过滤掉开头的origin/得到实际的分支名 （大概这个意思）)
-I {}  使用占位符来构造后面的命令
git push origin :branchName  删除远程分支
git branch -r表示列出所有远程分支，匹配含有lyn_的分支，sed 's/origin///g'能够把接受到的分支都过滤掉开头的origin/得到实际的分支名 （大概这个意思），比如origin/A分支执行了 sed 's/origin///g'命令就能得到A  ,然后将A这个分支作为参数传给下一个命令，-I {} 使用占位符 来构造 后面的命令，也就是接收到了上个命令的执行结果A执行git push origin :A

```



git completion 的切换分支会包含远程分支


## 切换到指定tag的分支

```bash
git fetch --all --tags # 拉取所有分支的tags
git switch tags/<tag> --detach # 切换到指定tag
```