---
title: linux指令
date: 2021-12-01 21:49:50
hero_image: ''
lang: zh
duration: 5min
---

主要记录下不容易记住但偶尔会用到的命令
## rsync篇

### 同步两个文件夹内容
```bash

rsync -av --delete source/ destination/ 
 # -a 除了可以递归同步以外，还可以同步元信息（比如修改时间、权限等）
# -v 将结果输出到终端
# --delete  会删除与 只存在目标目录 不存在源目录的文件 相当于 destination完全成为source的一个镜像

# 举例

# /a/src/mobile ---> /b/src/mobile  让b的mobile和a的同步
rsync -av --delete /a/src/mobile/  /b/src/

```


## head & tail

> https://www.geeksforgeeks.org/head-command-linux-examples/

参数包括：
![head&tail options](https://media.geeksforgeeks.org/wp-content/uploads/head.png)

head是展示前n行内容，默认n=10，tail反之， 多个文件的话 会以文件名分割

-c 前n个byte的内容

-n num  都可以简写成 -num

`tail +n file_name`, 将会读取从第n行到结尾的数据
## ls

`ls -t` : 展示最近修改的文件



