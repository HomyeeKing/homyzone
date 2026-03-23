---
title: OpenCLI 深度解析：如何将任意网站变成 CLI 工具
date: 2026-03-23 17:25:00
lang: zh
duration: 15min
---

> 项目地址：https://github.com/jackwener/opencli

## 概述

OpenCLI 是一个创新的 CLI 工具，它能够将任何网站、Electron 应用或本地 CLI 工具转化为标准化的命令行接口。它的核心目标是让 AI Agent 能够无缝地发现、学习和执行各种工具。

## 核心架构

OpenCLI 采用**双引擎架构**：

1. **YAML 声明式数据管道** - 用于简单的数据提取和转换
2. **浏览器运行时 TypeScript 注入** - 用于复杂的浏览器自动化操作

### 系统组件图

```
┌─────────────────────────────────────────────────────────────┐
│                        OpenCLI CLI                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   YAML      │  │  Browser    │  │   External CLI      │  │
│  │  Adapters   │  │  Adapters   │  │   Passthrough       │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
│         │                │                    │             │
│         └────────────────┼────────────────────┘             │
│                          │                                  │
│              ┌───────────┴───────────┐                      │
│              │     Pipeline Engine    │                      │
│              └───────────┬───────────┘                      │
└──────────────────────────┼──────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │    Daemon (localhost)     │
              │        :19825             │
              └────────────┬────────────┘
                           │
              ┌────────────┴────────────┐
              │   Chrome Extension        │
              │   (Browser Bridge)        │
              └────────────┬────────────┘
                           │
              ┌────────────┴────────────┐
              │      Chrome Browser       │
              │   (CDP / DevTools Protocol)│
              └───────────────────────────┘
```

## 工作原理详解

### 1. 与 Chrome 插件的通信机制

OpenCLI 通过 **Chrome DevTools Protocol (CDP)** 与浏览器通信：

#### 1.1 本地 Daemon 服务

```typescript
// src/daemon.ts - 核心守护进程
export const DAEMON_PORT = 19825;

// Daemon 启动时会：
// 1. 启动 HTTP 服务器监听 localhost:19825
// 2. 尝试连接到 Chrome Extension
// 3. 维护与浏览器的 WebSocket 连接
```

Daemon 提供以下端点：
- `GET /status` - 检查连接状态
- `POST /execute` - 执行浏览器命令
- `GET /logs` - 获取扩展日志
- `POST /attach` - 附加到特定标签页

#### 1.2 Chrome Extension 架构

```
extension/
├── manifest.json          # 扩展配置
├── src/
│   ├── background.ts      # Service Worker (核心)
│   ├── cdp.ts            # CDP 协议封装
│   └── protocol.ts       # 消息协议定义
```

**background.ts** 是扩展的核心，它：

1. **维护 WebSocket 连接** - 与本地 Daemon 保持长连接
2. **执行 CDP 命令** - 通过 Chrome DevTools Protocol 控制浏览器
3. **注入脚本** - 在目标页面执行自定义 JavaScript

```typescript
// extension/src/background.ts 核心逻辑
class BrowserBridge {
  private ws: WebSocket;
  private cdp: CDPConnection;

  async init() {
    // 1. 连接到本地 Daemon
    this.ws = new WebSocket('ws://localhost:19825');
    
    // 2. 获取当前标签页的 CDP 连接
    const tab = await chrome.tabs.query({ active: true });
    this.cdp = await chrome.debugger.attach(tab[0].id);
  }

  async executeCommand(command: Command) {
    // 根据命令类型执行不同操作
    switch (command.type) {
      case 'evaluate':
        // 在页面执行 JavaScript
        return await this.cdp.Runtime.evaluate({
          expression: command.script
        });
      
      case 'navigate':
        // 导航到指定 URL
        await chrome.tabs.update({ url: command.url });
        break;
      
      case 'click':
        // 模拟点击元素
        await this.cdp.DOM.querySelector({ selector: command.selector });
        await this.cdp.Input.dispatchMouseEvent({ ... });
        break;
      
      case 'screenshot':
        // 截取页面截图
        return await this.cdp.Page.captureScreenshot();
    }
  }
}
```

#### 1.3 通信流程

```
用户输入命令
    │
    ▼
┌─────────────┐
│  OpenCLI    │
│   CLI       │
└──────┬──────┘
       │ HTTP POST /execute
       ▼
┌─────────────┐
│   Daemon    │
│ :19825      │
└──────┬──────┘
       │ WebSocket
       ▼
┌─────────────┐
│   Chrome    │
│  Extension  │
└──────┬──────┘
       │ Chrome DevTools Protocol
       ▼
┌─────────────┐
│   Chrome    │
│   Browser   │
└─────────────┘
```

### 2. CLI 化实现机制

#### 2.1 Adapter 系统

OpenCLI 通过 **Adapter** 将网站 CLI 化。有两种类型的 Adapter：

**A. YAML 声明式 Adapter**

适用于简单的数据提取场景：

```yaml
# clis/bilibili.yaml
name: bilibili
commands:
  hot:
    description: 获取热门视频
    url: https://api.bilibili.com/x/web-interface/popular
    method: GET
    extract:
      - path: data.list
        fields:
          title: title
          author: owner.name
          views: stat.view
    output: table
```

**B. TypeScript 运行时 Adapter**

适用于复杂的浏览器自动化：

```typescript
// clis/zhihu.ts
export default {
  name: 'zhihu',
  commands: {
    hot: {
      description: '获取知乎热榜',
      async execute(browser) {
        // 1. 导航到热榜页面
        await browser.navigate('https://www.zhihu.com/hot');
        
        // 2. 等待内容加载
        await browser.waitForSelector('.HotList-item');
        
        // 3. 提取数据
        const items = await browser.evaluate(() => {
          return Array.from(document.querySelectorAll('.HotList-item')).map(el => ({
            title: el.querySelector('.HotList-title').textContent,
            heat: el.querySelector('.HotList-metrics').textContent
          }));
        });
        
        return items;
      }
    }
  }
};
```

#### 2.2 Pipeline 引擎

Pipeline 引擎负责执行 Adapter 定义的操作链：

```typescript
// src/pipeline/index.ts
interface PipelineStep {
  type: 'navigate' | 'wait' | 'click' | 'type' | 'extract' | 'execute';
  config: Record<string, any>;
}

class PipelineEngine {
  async execute(steps: PipelineStep[], context: BrowserContext) {
    const results = [];
    
    for (const step of steps) {
      switch (step.type) {
        case 'navigate':
          await context.browser.navigate(step.config.url);
          break;
          
        case 'wait':
          await context.browser.waitForSelector(step.config.selector);
          break;
          
        case 'click':
          await context.browser.click(step.config.selector);
          break;
          
        case 'extract':
          const data = await context.browser.extract(step.config.schema);
          results.push(data);
          break;
          
        case 'execute':
          // 执行自定义 JavaScript
          const result = await context.browser.evaluate(step.config.script);
          results.push(result);
          break;
      }
    }
    
    return results;
  }
}
```

### 3. 界面操作实现

#### 3.1 元素定位与操作

OpenCLI 通过 CDP 实现精确的界面操作：

```typescript
// extension/src/cdp.ts
class CDPConnection {
  // 查询元素
  async querySelector(selector: string) {
    const { nodeId } = await this.send('DOM.querySelector', {
      nodeId: this.documentNodeId,
      selector
    });
    return nodeId;
  }

  // 点击元素
  async clickElement(selector: string) {
    // 1. 获取元素位置
    const nodeId = await this.querySelector(selector);
    const { model } = await this.send('DOM.getBoxModel', { nodeId });
    
    // 2. 计算中心点坐标
    const [x, y] = this.calculateCenter(model.content);
    
    // 3. 分发鼠标事件
    await this.send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      x, y,
      button: 'left',
      clickCount: 1
    });
    
    await this.send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x, y,
      button: 'left',
      clickCount: 1
    });
  }

  // 输入文本
  async typeText(selector: string, text: string) {
    // 1. 聚焦元素
    await this.clickElement(selector);
    
    // 2. 分发键盘事件
    for (const char of text) {
      await this.send('Input.dispatchKeyEvent', {
        type: 'keyDown',
        text: char
      });
      await this.send('Input.dispatchKeyEvent', {
        type: 'keyUp',
        text: char
      });
    }
  }
}
```

#### 3.2 页面截图与快照

OpenCLI 可以截取页面截图并提取结构化数据：

```typescript
// src/snapshotFormatter.ts
export async function captureSnapshot(browser: Browser, options: SnapshotOptions) {
  // 1. 截取全页截图
  const screenshot = await browser.captureScreenshot({
    fullPage: options.fullPage ?? true
  });
  
  // 2. 提取 DOM 快照
  const domSnapshot = await browser.evaluate(() => {
    return {
      title: document.title,
      url: location.href,
      // 提取可交互元素
      interactiveElements: Array.from(document.querySelectorAll('a, button, input, [role="button"]'))
        .map(el => ({
          tag: el.tagName,
          text: el.textContent?.slice(0, 50),
          selector: generateSelector(el)
        }))
    };
  });
  
  // 3. 格式化输出
  return formatSnapshot(screenshot, domSnapshot, options.format);
}
```

### 4. 外部 CLI 透传机制

OpenCLI 不仅是浏览器自动化工具，还能作为**通用 CLI Hub**：

```typescript
// src/external.ts
export async function executeExternalCLI(name: string, args: string[]) {
  // 1. 检查 CLI 是否已安装
  const isInstalled = await checkCLIInstalled(name);
  
  if (!isInstalled) {
    // 2. 自动安装
    await autoInstallCLI(name);
  }
  
  // 3. 透传执行
  const { stdout, stderr, exitCode } = await execa(name, args, {
    stdio: 'inherit',  // 保持原始输入输出
    env: process.env
  });
  
  return { stdout, stderr, exitCode };
}

// 支持的 CLI 列表 (src/external-clis.yaml)
const externalCLIs = {
  gh: { description: 'GitHub CLI', install: 'brew install gh' },
  docker: { description: 'Docker CLI', install: 'brew install docker' },
  kubectl: { description: 'Kubernetes CLI', install: 'brew install kubectl' },
  obsidian: { description: 'Obsidian CLI', install: 'npm install -g obsidian-cli' },
  // ... 更多
};
```

### 5. AI Agent 集成

OpenCLI 专为 AI Agent 设计，提供以下特性：

#### 5.1 AGENT.md 配置

```markdown
# AGENT.md

## OpenCLI 集成指南

当用户需要与以下平台交互时，使用 OpenCLI：
- 社交媒体：Twitter/X、Reddit、小红书、知乎
- 视频平台：Bilibili、YouTube
- 开发工具：GitHub、Docker、Kubernetes
- 效率工具：Notion、Obsidian

### 使用流程

1. 发现可用命令：
   ```bash
   opencli list
   ```

2. 执行具体命令：
   ```bash
   # 获取 Bilibili 热门
   opencli bilibili hot --limit 10
   
   # 搜索知乎
   opencli zhihu search "AI 编程"
   
   # 获取 Twitter 趋势
   opencli twitter trending
   ```

3. 处理输出：
   - 使用 `-f json` 获取结构化数据
   - 使用 `-f yaml` 获取可读格式
```

#### 5.2 自动发现与学习

```typescript
// src/discovery.ts
export async function discoverCapabilities(url: string) {
  // 1. 分析网站结构
  const analysis = await analyzeWebsite(url);
  
  // 2. 检测 API 端点
  const apis = await detectAPIs(analysis);
  
  // 3. 生成 Adapter 配置
  const adapter = await generateAdapter(apis);
  
  // 4. 验证并注册
  await validateAndRegister(adapter);
  
  return adapter;
}
```

## 安全与隐私

### 1. 登录状态复用

OpenCLI **不存储任何凭据**，而是复用 Chrome 的登录状态：

```
用户已登录的 Chrome
        │
        │ 复用 Cookie/Session
        ▼
   OpenCLI 执行命令
        │
        │ 无需再次登录
        ▼
    网站正常响应
```

### 2. 权限隔离

Chrome Extension 采用最小权限原则：

```json
// extension/manifest.json
{
  "permissions": [
    "activeTab",      // 仅访问当前标签页
    "debugger",       // CDP 调试权限
    "storage"         // 本地存储配置
  ],
  "host_permissions": [
    "http://localhost:19825/*"  // 仅连接本地 Daemon
  ]
}
```

## 使用示例

### 基础命令

```bash
# 列出所有可用命令
opencli list

# 获取 Bilibili 热门视频
opencli bilibili hot --limit 5

# 搜索知乎
opencli zhihu search "OpenAI" -f json

# 获取 Twitter 趋势
opencli twitter trending --limit 10

# 下载小红书笔记
opencli xiaohongshu download abc123 --output ./xhs
```

### 管道与组合

```bash
# 获取热榜并过滤
opencli bilibili hot -f json | jq '.[] | select(.views > 1000000)'

# 批量下载
opencli twitter download elonmusk --limit 20 | \
  xargs -I {} opencli twitter download {}
```

### 开发自定义 Adapter

```typescript
// clis/my-site.ts
export default {
  name: 'mysite',
  commands: {
    search: {
      description: '搜索内容',
      args: {
        query: { type: 'string', required: true },
        limit: { type: 'number', default: 10 }
      },
      async execute({ browser, args }) {
        await browser.navigate(`https://mysite.com/search?q=${args.query}`);
        await browser.waitForSelector('.result-item');
        
        return await browser.extract({
          selector: '.result-item',
          fields: {
            title: '.title',
            url: { attr: 'href' },
            summary: '.desc'
          },
          limit: args.limit
        });
      }
    }
  }
};
```

## 总结

OpenCLI 通过创新的**浏览器桥接架构**，实现了：

1. **零配置** - 复用 Chrome 登录状态，无需 API Key
2. **通用性** - 支持任何网站、Electron 应用、CLI 工具
3. **AI 原生** - 专为 Agent 设计，支持自动发现和代码生成
4. **安全性** - 凭据永不离开浏览器

它的核心创新在于将**浏览器作为执行环境**，通过 CDP 协议实现精细控制，让任何 Web 应用都能被 CLI 化、自动化、AI 化。

---

*本文基于 OpenCLI v1.x 版本分析，具体实现细节可能随版本更新而变化。*