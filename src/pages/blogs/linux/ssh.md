---
title: solve ssh ip permission deny 
date: 2021-08-11 11:00:10
hero_image: ""
lang: zh
duration: 5min
---

其实这个问题和git的公钥私钥是一个问题，服务器需要识别你本地登录的这台机器

老规矩先生成对应的公钥
```bash
ssh-keygen -t ed25519 -C 'homyeeking@qq.com'

# 地址暂定 ~/.ssh/id_huaweiyun
```

生成之后然后需要把你的信息配置到`~/.ssh/config`这里

```bash
Host 121.36.32.150   # 你的ip
HostName 121.36.32.150
User root # 你云服务器用户名
ForwardAgent yes
PubKeyAuthentication yes
IdentityFile ~/.ssh/id_huaweiyun # 你的公钥地址
```