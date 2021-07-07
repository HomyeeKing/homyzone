---
title: npm 全局安装包 zsh找不到指令
date: 2021-03-29 12:18:14
hero_image: ''
lang: zh
duration: 5min
---

首先归根到底是环境变量中有没有`npm`的路径
### 指令相关
```sh 
 npm -g bin  # 查看npm全局安装路径
# or
which npm 

echo $PATH # 查看环境变量
# 查看里面有没有npm全局安装的bin目录

#修改npm全局路径
npm cofig set prefix xxxx

# 查看npm全局安装的包
npm -g list --depth=0

```

### 使用nrm(npm registry manage)来管理npm镜像源
```sh
 npm i -g nrm

 nrm add [name] [registry url]
 nrm use [name]

 nrm ls #查看所有可用的源
```

### 使用nvm 来管理node 版本

```sh  
nvm ls # 查看所有版本
nvm use xxx 指定版本

```


### 常见问题

mac下：如果你遇到EACCES: permission denied, symlink ‘../lib/node_modules........这种问题，这个就是权限问题，而且是你在全局安装的时候会遇到

依据下面的流程进行即可：

```
1. 创建global安装任务的目录 并把目录添加到环境变量

mkdir ~/.npm-global

export PATH=~/.npm-global/bin:$PATH

2. 配置npm使用新的目录
npm config set prefix '~/.npm-global'

3. 在~/.bashrc文件中增加配置 （任意一个终端配置文件中）
source ~/.bashrc

4. 配置文件立即生效
source ~/.bashrc



5. 然后重新npm i -g xxx 就可以了
```