---
title: 迁机必备（一）：chezmoi 管理你的配置
date: 2026-03-20 17:10:00
lang: zh
duration: 10min
---

> 换新电脑时，最痛苦的不是安装系统，而是重新配置环境。chezmoi 帮你解决这个问题。

## 为什么需要配置管理工具？

每次换新电脑或重装系统，都要经历这些痛苦：

- 重新配置 shell（zsh/bash）
- 重新安装和配置各种工具
- 找回那些藏在 `~/.config` 里的个性化设置
- 忘记某些工具的安装顺序和依赖

传统的解决方案：
- **Git 裸仓库**：手动管理，容易出错
- **手动复制**：容易遗漏，难以同步
- **Ansible**：太重了，不适合个人配置

**chezmoi** 是专为管理个人配置文件设计的工具，它：
- 使用 Git 版本控制
- 支持模板（根据系统差异生成不同配置）
- 支持加密（管理敏感信息如 SSH key）
- 一键部署到新机器

## 安装 chezmoi

### macOS

```bash
brew install chezmoi
```

### Linux

```bash
sh -c "$(curl -fsLS get.chezmoi.io)"
```

### 验证安装

```bash
chezmoi --version
```

## 初始化 chezmoi

### 第一步：初始化仓库

```bash
# 初始化，使用 GitHub 作为后端
chezmoi init --apply https://github.com/yourusername/dotfiles.git

# 或者本地初始化
chezmoi init
```

### 第二步：了解目录结构

```
~/.local/share/chezmoi/    # chezmoi 工作目录（源目录）
├── dot_zshrc              # 对应 ~/.zshrc
├── dot_claude/
│   └── settings.json      # 对应 ~/.claude/settings.json
├── dot_gitconfig          # 对应 ~/.gitconfig
├── dot_ssh/
│   └── config             # 对应 ~/.ssh/config
└── .git/                  # Git 仓库
```

**命名规则**：
- `dot_` 前缀 → `.` 开头的隐藏文件
- `dot_` 目录 → `.` 开头的隐藏目录
- `private_` 前缀 → 设置文件权限为 600
- `executable_` 前缀 → 设置文件为可执行

## 实战：管理 ~/.zshrc

### 添加现有配置

```bash
# 将现有的 ~/.zshrc 添加到 chezmoi
chezmoi add ~/.zshrc

# 这会复制 ~/.zshrc 到 ~/.local/share/chezmoi/dot_zshrc
```

### 编辑配置

```bash
# 方式一：使用 chezmoi 编辑
chezmoi edit ~/.zshrc

# 方式二：直接编辑源文件
vim ~/.local/share/chezmoi/dot_zshrc
```

### 查看差异

```bash
# 查看工作目录和实际文件的差异
chezmoi diff
```

### 应用更改

```bash
# 将源目录的更改应用到实际文件
chezmoi apply

# 或者只应用特定文件
chezmoi apply ~/.zshrc
```

### 提交到 Git

```bash
cd ~/.local/share/chezmoi
git add .
git commit -m "update zshrc: add alias for docker"
git push
```

## 实战：管理 .claude/settings.json

Claude Code 的配置文件通常位于 `~/.claude/settings.json`，包含个人偏好设置。

### 添加配置

```bash
chezmoi add ~/.claude/settings.json
```

### 使用模板处理不同平台

假设你在 macOS 和 Linux 上有不同的设置：

```bash
# 将文件转为模板
chezmoi chattr template ~/.claude/settings.json
```

编辑 `dot_claude/settings.json.tmpl`：

```json
{
  "editor": "vim",
  "theme": "dark",
  {{ if eq .chezmoi.os "darwin" }}
  "shell": "/bin/zsh",
  "browser": "open"
  {{ else }}
  "shell": "/usr/bin/zsh",
  "browser": "xdg-open"
  {{ end }}
}
```

### 模板变量参考

```
{{ .chezmoi.os }}           # 操作系统：darwin, linux, windows
{{ .chezmoi.arch }}         # 架构：amd64, arm64
{{ .chezmoi.hostname }}     # 主机名
{{ .chezmoi.username }}     # 用户名
{{ .chezmoi.homeDir }}      # 家目录路径
```

## 高级技巧

### 1. 加密敏感文件

管理包含敏感信息的文件（如 API key）：

```bash
# 使用 age 加密
chezmoi age encrypt --recipient age1xxx... ~/.ssh/config

# 添加到 chezmoi
chezmoi add --encrypt ~/.ssh/config
```

### 2. 管理整个目录

```bash
# 添加整个 .config 目录
chezmoi add ~/.config/nvim

# 但排除某些文件
echo '*.log' >> ~/.local/share/chezmoi/.chezmoiignore
```

### 3. 使用脚本自动化

创建 `run_once_install-packages.sh.tmpl`：

```bash
#!/bin/bash
{{ if eq .chezmoi.os "darwin" }}
# macOS: 使用 Homebrew
brew install git vim tmux fzf
{{ else if eq .chezmoi.os "linux" }}
# Linux: 使用 apt
sudo apt update
sudo apt install -y git vim tmux fzf
{{ end }}
```

chezmoi 会在 apply 时自动执行这个脚本（只执行一次）。

### 4. 条件包含文件

创建 `.chezmoi.toml.tmpl`：

```toml
[git]
    autoCommit = true
    autoPush = true

[data]
    email = "your@email.com"
    name = "Your Name"
```

然后在模板中使用：

```
[user]
    name = {{ .name | quote }}
    email = {{ .email | quote }}
```

## 完整工作流

### 日常更新

```bash
# 1. 编辑配置
chezmoi edit ~/.zshrc

# 2. 查看变更
chezmoi diff

# 3. 应用变更
chezmoi apply

# 4. 提交到 Git
chezmoi git add .
chezmoi git commit -m "update zshrc"
chezmoi git push
```

### 快捷命令

```bash
# 拉取最新配置并应用
chezmoi update

# 查看状态
chezmoi status

# 强制覆盖本地文件
chezmoi apply --force

#  doctor 检查
chezmoi doctor
```

## 迁移到新机器

### 第一步：安装 chezmoi

```bash
brew install chezmoi  # macOS
# 或
sh -c "$(curl -fsLS get.chezmoi.io)"  # Linux
```

### 第二步：初始化并应用

```bash
# 从 GitHub 拉取配置
chezmoi init --apply https://github.com/yourusername/dotfiles.git

# 搞定！所有配置已自动部署
```

### 第三步：验证

```bash
# 检查 zshrc
cat ~/.zshrc

# 检查 claude 配置
cat ~/.claude/settings.json

# 检查 git 配置
git config --list
```

## 我的配置示例

这是我的 `~/.local/share/chezmoi` 目录结构：

```
.
├── dot_zshrc
├── dot_gitconfig
├── dot_claude/
│   └── settings.json
├── dot_ssh/
│   └── config
├── private_dot_aws/
│   └── config
├── dot_config/
│   └── nvim/
│       └── init.vim
├── run_once_install-packages.sh
└── .chezmoiignore
```

### dot_zshrc 片段

```zsh
# 插件管理
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# 别名
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# 工具配置
eval "$(fzf --zsh)"
eval "$(zoxide init zsh)"
```

### dot_claude/settings.json

```json
{
  "editor": "vim",
  "theme": "dark",
  "autoUpdate": true,
  "preferredLanguage": "zh"
}
```

## 常见问题

### Q: chezmoi 和 stow 有什么区别？
A: stow 使用符号链接，chezmoi 使用实际文件。chezmoi 更适合需要模板和加密的场景。

### Q: 如何处理机密信息？
A: 使用 `chezmoi add --encrypt` 加密文件，或使用模板从环境变量读取。

### Q: 可以在多个机器上使用不同的配置吗？
A: 可以，使用模板语法 `{{ if eq .chezmoi.hostname "work-mac" }}` 根据主机名条件渲染。

### Q: 如何临时跳过某个文件？
A: 使用 `chezmoi skip ~/.zshrc` 或添加到 `.chezmoiignore`。

## 总结

chezmoi 让配置管理变得简单：

1. **初始化**：`chezmoi init`
2. **添加文件**：`chezmoi add ~/.zshrc`
3. **编辑**：`chezmoi edit ~/.zshrc`
4. **应用**：`chezmoi apply`
5. **同步**：`chezmoi git push`

下次换电脑时，只需一行命令就能恢复所有配置：

```bash
chezmoi init --apply https://github.com/yourusername/dotfiles.git
```

---

**延伸阅读：**
- [chezmoi 官方文档](https://www.chezmoi.io/)
- [chezmoi GitHub](https://github.com/twpayne/chezmoi)
- [Migrating to chezmoi](https://www.chezmoi.io/docs/migrating/)

**下一篇预告：**《迁机必备（二）：Homebrew Bundle 管理你的软件》
