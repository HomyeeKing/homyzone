---
title: 在mac上配置gitlab和github两个账户
date: 2021-07-06 22:56:30
hero_image: ""
lang: zh
duration: 5min
---


首先要生成各自的秘钥：

```bash
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

```bash
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

## 常见问题解决

如果完成以上步骤还是不行，遇到类似于Permissions 0644 for '/Users/liuml/.ssh/id_rsa_tz' are too open.’这种错误
#注意
看秘钥的读写权限是否过于宽泛
解决办法就是执行以下命令：

```bash
> cd ~/.ssh
> sudo chmod -R 700 config id_rsa_*

```

#### Git fatal: Could not read from remote repository Solution

> 参考链接： https://careerkarma.com/blog/git-fatal-could-not-read-from-remote-repository/

- ssh连接方式
当你git clone之后 发现出现上面的错误，这是个认证错误，这时候我们首先要做的就是把秘钥添加到SSH keychain中（首先已经确保你通过ssh-keygen 已经生成了秘钥），

```bash
ssh-add <your key path like: ~/.ssh/id_rsa>
```

#### authenticity of host 'github.com can't be established

run this command
```
ssh-keyscan github.com >> ~/.ssh/known_hosts
```

同理 gitlab的问题也可以通过上面的解决