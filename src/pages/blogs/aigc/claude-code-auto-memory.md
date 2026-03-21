---
title: Claude Code 的 Auto Memory 机制：让 AI 记住你的项目
date: 2026-03-20 17:00:00
lang: zh
duration: 8min
---

> 每次开启 Claude Code 会话都是全新的上下文窗口？CLAUDE.md 和 Auto Memory 帮你解决这个问题。

## 为什么需要记忆机制？

Claude Code 的每个会话都从一个全新的上下文窗口开始。这意味着：

- 你上一会话教给 Claude 的东西，它不会记得
- 项目的特定规范和偏好需要反复说明
- 调试过程中发现的模式无法自动积累

为了解决这个问题，Claude Code 提供了两种互补的记忆机制：

## 两种记忆系统对比

| 特性 | CLAUDE.md | Auto Memory |
|------|-----------|-------------|
| **谁写的** | 你 | Claude 自己 |
| **内容** | 指令和规则 | 学习和模式 |
| **范围** | 项目、用户或组织 | 每个工作树 |
| **加载方式** | 每次会话 | 每次会话（前200行）|
| **用途** | 编码标准、工作流、架构 | 构建命令、调试洞察、偏好 |

## CLAUDE.md：你写的指令

CLAUDE.md 是你主动编写的指令文件，告诉 Claude 如何在这个项目中工作。

### 放置位置（按优先级从高到低）

1. **项目级** - `./CLAUDE.md` 或 `./.claude/CLAUDE.md`
   - 特定项目的编码规范
   - 技术栈要求
   - 文件组织方式

2. **用户级** - `~/.claude/CLAUDE.md`
   - 个人编程风格
   - 常用工具偏好
   - 默认工作流

3. **组织级** - 系统目录
   - 公司编码标准
   - 安全合规要求

### 示例 CLAUDE.md

```markdown
# 项目规范

## 技术栈
- 前端：React + TypeScript
- 样式：Tailwind CSS
- 测试：Vitest

## 代码规范
- 使用函数组件而非类组件
- 所有组件必须添加 PropTypes
- 优先使用 async/await 而非 Promise 链

## 常用命令
- 开发：npm run dev
- 测试：npm test
- 构建：npm run build
```

## Auto Memory：AI 自己学习

Auto Memory 是 Claude 自动记录的笔记，基于你的纠正和偏好。

### 工作原理

1. **触发条件** - 当你纠正 Claude 或给出明确偏好时
2. **自动记录** - Claude 会将这些学习写入内存文件
3. **下次加载** - 新会话开始时自动读取

### 典型的 Auto Memory 内容

```markdown
## Build Commands

项目使用 pnpm 而非 npm：
- pnpm build
- pnpm test
- pnpm dev

## Debugging Insights

这个项目的日志输出在 ./logs/debug.log
调试时先检查这个文件

## Preferences

用户偏好使用单引号而非双引号
喜欢显式返回而非隐式返回
```

### 配置 Auto Memory

在项目根目录创建 `.claude/auto-memory.json`：

```json
{
  "enabled": true,
  "maxLines": 200,
  "includePatterns": [
    "build",
    "debug",
    "preferences"
  ]
}
```

## 实际使用场景

### 场景 1：记住构建命令

**第 1 次会话：**
```
你：这个项目怎么构建？
Claude：我看看 package.json... 哦，用 pnpm build
```

**第 2 次会话：**
```
你：构建项目
Claude：好的，运行 pnpm build（从 auto memory 读取）
```

### 场景 2：记住调试模式

**第 1 次会话：**
```
你：调试的时候要看 ./logs/debug.log，别用 console.log
Claude：明白，记住了
```

**第 2 次会话：**
```
你：帮我看看为什么报错
Claude：先检查 ./logs/debug.log 的最新错误...
```

### 场景 3：代码风格偏好

**第 1 次会话：**
```
你：用单引号，别用双引号
Claude：好的，我会使用单引号
```

**后续会话：**
- Claude 自动使用单引号
- 不需要每次都提醒

## 最佳实践

### 1. CLAUDE.md 用于不变的东西

- 技术栈选择
- 架构决策
- 项目结构

### 2. Auto Memory 用于发现的东西

- 构建命令
- 调试技巧
- 个人偏好

### 3. 定期整理

Auto Memory 可能积累过时信息：
- 每季度检查一次
- 删除不再适用的条目
- 更新变化的信息

### 4. 结合使用

```
CLAUDE.md: "使用 pnpm 作为包管理器"
Auto Memory: "pnpm build 比 npm run build 快 30%"
```

## 常见问题

### Q: Auto Memory 会泄露敏感信息吗？
A: 不会。Auto Memory 存储在本地，不会上传到云端。但建议不要将密码等敏感信息放入其中。

### Q: 如何清除 Auto Memory？
A: 删除 `.claude/auto-memory.md` 文件即可。

### Q: CLAUDE.md 和 Auto Memory 冲突怎么办？
A: CLAUDE.md 优先级更高。Auto Memory 是建议性的，CLAUDE.md 是指令性的。

### Q: 子代理有独立的 Auto Memory 吗？
A: 是的，子代理可以维护自己的 Auto Memory。需要在配置中启用。

## 总结

Claude Code 的记忆机制让 AI 从"每次重新学习"变成"持续积累经验"：

- **CLAUDE.md** - 你主动编写的项目规范
- **Auto Memory** - AI 自动学习的偏好和模式

合理使用这两种机制，可以显著提升与 Claude Code 的协作效率，减少重复沟通的成本。

---

**参考文档：**
- [Claude Code Memory Documentation](https://code.claude.com/docs/en/memory)
- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
