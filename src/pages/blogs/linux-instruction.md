---
title: linux指令
date: 2021-12-01 21:49:50
hero_image: ''
lang: zh
duration: 5min
---


## rsync篇

### 同步两个文件夹内容
```sh

rsync -av --delete source/ destination/ 
 # -a 除了可以递归同步以外，还可以同步元信息（比如修改时间、权限等）
# -v 将结果输出到终端
# --delete  会删除与 只存在目标目录 不存在源目录的文件 相当于 destination完全成为source的一个镜像

# 举例

# /a/src/mobile ---> /b/src/mobile  让b的mobile和a的同步
rsync -av --delete /a/src/mobile/  /b/src/

```

