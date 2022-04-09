---
title: 通过nvm 管理node、 npm（包管理工具）
date: 2022-03-17 20:23:43
hero_image: ''
lang: zh
duration: 5min
---

### 推荐做法
使用 [nvm](https://github.com/nvm-sh/nvm#install--update-script)来管理node 和 npm版本

#### 安装
参考github https://github.com/nvm-sh/nvm#install--update-script 这一章节
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

#### 版本切换
```bash
nvm install xxx # install xxx version of node
nvm use xxx # 在当前session中使用xxx版本
nvm alias default xxx # 将xxx 设为默认版本
```

#### 将系统版本跟随nvm
创建软链 指向当前nvm版本的node npm npx，这样做的好处可以实时更新system版本，也避免的操作system版本的权限问题
```bash
sudo ln -sf "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
sudo ln -sf "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
sudo ln -sf "$NVM_DIR/versions/node/$(nvm version)/bin/npx" "/usr/local/bin/npx"
```
#### node 版本切换时，如何迁移全局安装的依赖

可以参考这个issue https://github.com/nvm-sh/nvm/issues/2753

主要原因就是 全局依赖不要跨node版本共享，有些时候他们会被编译过，也就意味着需要重新为每个node版本都Build一下


```bash
# 比如当前版本是 yyy， 如果要切换到xxx，我们需要执行以下操作
nvm install xxx  --reinstall-packages-from=yyy --latest-npm # --latest-npm 是将npm升级到最新版本
#or 
nvm install xxx  --reinstall-packages-from=current --latest-npm 
```

这样就可以解决版本切换带来的 全局依赖丢失的问题了


### 注意事项

#### 慎用 pnpm setup
之前闲来无事，乱试了一遍pnpm的命令，其中包括[pnpm setup](https://pnpm.io/cli/setup)这个指令，结果就gg了

首先，文档已明确标识出这个命令是为了给**standalone installation scripts of pnpm** 这种安装方式使用的，即[这一章节的内容](https://pnpm.io/installation#using-a-standalone-script)

setup主要帮我们做了：
- 创建pnpm命令的路径 并且添加到环境变量中

所以 如果我们之前已经通过其他方式安装，例如npm i -g pnpm， 就会破坏pnpm的查找方式，所以一旦误执行，请及时自查
`which pnpm` 的安装地址，并且针对上边的操作进行回退