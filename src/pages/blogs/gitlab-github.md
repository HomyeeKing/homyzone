---
title: 在mac上配置gitlab和github两个账户
date: 2021-07-06 22:54:38
hero_image: ""
lang: zh
duration: 5min
---

首先要生成各自的秘钥：
```sh

# gitlab
ssh-keygen -t rsa -C "gitlab email address"
随后的生成目录设置为 **/id_rsa_gitlab


# github
ssh-keygen -t rsa -C "github email address"
随后的生成目录设置为 **/id_rsa_github
```

然后再 ~/.ssh/config里配置如下，没有就新建

这个配置文件的意义在于：
- 根据repo 的hostname找到对应的Host，然后可以得到相应的用户以及配置信息
```sh
# default  
Host github.com #必须跟repo 的hostname保持一致
HostName github.com
User githubuser@xyz.com（GitHub邮箱）
IdentityFile ~/.ssh/id_rsa_github
# two 
Host gitlab.com（这里注意填写自己公司对应的gitlab host）
HostName gitlab.com
User gitlabuser@xyz.com（Gitlab邮箱）
IdentityFile ~/.ssh/id_rsa_gitlab
```

最后 在github gitlab上把对应的公钥粘贴进去
gitlab再 Profile处， GitHub在setting处

如果完成以上步骤还是不行，遇到类似于Permissions 0644 for '/Users/liuml/.ssh/id_rsa_tz' are too open.’这种错误
#注意
看秘钥的读写权限是否过于宽泛
解决办法就是执行以下命令：
```sh
> cd ~/.ssh
> sudo chmod -R 700 config id_rsa_*

```