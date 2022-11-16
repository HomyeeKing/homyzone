---
title: 批量删除本地、远程分支
date: 2022-11-16 17:02:28
hero_image: ""
lang: zh
duration: 5min
---

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