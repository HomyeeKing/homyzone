---
title: ACP：Agent Communication Protocol - AI Agent 互操作性的开放标准
date: 2026-03-24
lang: zh
duration: 10min
---

> 由 Linux Foundation 主导的开放标准，让 AI Agent 能够跨框架、跨组织无缝协作

## 什么是 ACP？

**ACP (Agent Communication Protocol)** 是一个开放的协议标准，用于解决 AI Agent 之间的互操作性挑战。它允许不同框架、不同团队构建的 Agent 通过标准化的 RESTful API 进行通信。

ACP 由 [BeeAI](https://github.com/i-am-bee) 主导开发，作为 Linux Foundation 下的开放标准，采用透明、社区驱动的治理模式。

## ACP 解决了什么问题？

### 问题 1：Agent 孤岛

现代 AI Agent 通常在不同的框架中独立构建，导致：
- 每个框架有自己的通信模式和 API
- Agent 之间难以互相发现和协作
- 跨团队、跨组织的 Agent 集成成本高昂

### 问题 2：碎片化的生态系统

```
┌─────────────────────────────────────────────────────────────┐
│                    没有 ACP 的世界                           │
├─────────────────────────────────────────────────────────────┤
│  Framework A → Agent A₁, Agent A₂ (私有协议)                 │
│  Framework B → Agent B₁, Agent B₂ (私有协议)                 │
│  Framework C → Agent C₁, Agent C₂ (私有协议)                 │
│                                                             │
│  Agent A₁ 无法与 Agent B₁ 通信 ❌                             │
│  需要为每个组合编写自定义集成 ❌                              │
└─────────────────────────────────────────────────────────────┘
```

### 问题 3：开发者体验不一致

- 每个框架有自己的模式和抽象
- 学习曲线陡峭，迁移成本高
- 难以构建可复用的 Agent 组件

## ACP 如何解决这些问题？

### 核心方案：标准化 REST API

ACP 使用简单、定义良好的 RESTful 端点进行通信，而不是需要 specialized 客户端的协议（如 JSON-RPC）。

```
┌─────────────────────────────────────────────────────────────┐
│                    ACP 赋能的世界                            │
├─────────────────────────────────────────────────────────────┤
│  Framework A → Agent A₁ ──┐                                 │
│  Framework B → Agent B₁ ──┼──→ ACP REST API → 互操作 ✅      │
│  Framework C → Agent C₁ ──┘                                 │
│                                                             │
│  任何 Agent 可以与任何其他 Agent 通信                          │
│  统一的消息格式，支持所有模态                                │
└─────────────────────────────────────────────────────────────┘
```

### 关键特性

| 特性 | 说明 |
|------|------|
| **REST 通信** | 使用标准 HTTP 端点，可用 curl/Postman 直接调用 |
| **全模态支持** | 通过 MIME 类型识别内容，支持文本、图片、音频、视频等 |
| **同步/异步** | 主要为异步设计（处理长任务），也支持同步 |
| **流式传输** | 支持 streaming 响应，适合实时交互 |
| **离线发现** | Agent 元数据可嵌入分发包，支持离线环境发现 |
| **无需 SDK** | 可直接用 HTTP 工具调用，官方提供 Python/TS SDK |

### 核心架构组件

```
┌─────────────────────────────────────────────────────────────┐
│                      ACP 架构                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐ │
│  │   Client    │ ───→ │   Server    │ ←──→ │   Agent     │ │
│  │ (调用方)    │ HTTP │ (ACP 端点)  │      │ (业务逻辑)  │ │
│  └─────────────┘      └─────────────┘      └─────────────┘ │
│                                                             │
│  核心端点:                                                   │
│  - GET  /agents          - 列出可用 Agent                    │
│  - POST /agents/:name    - 与 Agent 交互                     │
│  - GET  /agents/:name    - 获取 Agent 元数据                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 如何使用 ACP？

### 方式 1：使用 HTTP 工具直接调用

无需 SDK，使用标准 HTTP 工具即可：

```bash
# 1. 获取 Agent 列表
curl http://localhost:8000/agents

# 2. 获取特定 Agent 的元数据
curl http://localhost:8000/agents/chat

# 3. 向 Agent 发送消息
curl -X POST http://localhost:8000/agents/chat/run \
  -H "Content-Type: application/json" \
  -d '{"message": "你好，请帮我分析这份数据"}'
```

### 方式 2：使用官方 SDK

ACP 提供 Python 和 TypeScript SDK：

**Python SDK:**
```python
from acp import AgentClient

# 连接到 ACP Server
client = AgentClient("http://localhost:8000")

# 获取可用 Agent 列表
agents = client.list_agents()

# 与 Agent 交互
agent = client.get_agent("chat")
response = agent.run(message="你好，请帮我分析这份数据")
print(response)
```

**TypeScript SDK:**
```typescript
import { AgentClient } from '@i-am-bee/acp';

const client = new AgentClient('http://localhost:8000');

// 获取 Agent 列表
const agents = await client.listAgents();

// 运行 Agent
const response = await client.runAgent('chat', {
  message: '你好，请帮我分析这份数据'
});
```

### ACP Server 示例

使用 BeeAI 快速搭建 ACP Server：

```python
from fastapi import FastAPI
from acp.server import ACPServer
from acp.agent import Agent

app = FastAPI()
acp = ACPServer(app)

# 定义 Agent
chat_agent = Agent(
    name="chat",
    description="Conversational agent with memory",
    run=lambda message: f"收到：{message}",
    input_content_types=["text/plain"],
    output_content_types=["text/plain"],
    metadata={
        "framework": "BeeAI",
        "capabilities": [{"name": "Conversational AI", "description": "Handles multi-turn conversations"}],
        "tags": ["Chat"],
        "license": "Apache-2.0"
    }
)

# 注册 Agent
acp.register(chat_agent)

# 启动服务
# uvicorn main:app --host 0.0.0.0 --port 8000
```

## Showcase：多 Agent 协作场景

### 场景：自动化内容创作工作流

假设有一个内容创作需求，需要多个专业 Agent 协作：

```
┌─────────────────────────────────────────────────────────────────┐
│                    内容创作工作流                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  用户请求 → "写一篇关于 AI 安全的技术文章"                        │
│                                                                 │
│       ↓                                                          │
│  ┌─────────────────┐                                            │
│  │  研究 Agent     │ - 搜索最新 AI 安全研究                        │
│  │  (research)     │ - 收集相关论文和案例                        │
│  └────────┬────────┘                                            │
│           ↓                                                      │
│  ┌─────────────────┐                                            │
│  │  写作 Agent     │ - 基于研究结果撰写文章                      │
│  │  (writer)       │ - 确保技术准确性和可读性                    │
│  └────────┬────────┘                                            │
│           ↓                                                      │
│  ┌─────────────────┐                                            │
│  │  SEO Agent      │ - 优化关键词和结构                         │
│  │  (seo)          │ - 提升搜索引擎排名潜力                      │
│  └────────┬────────┘                                            │
│           ↓                                                      │
│  输出：完整的技术文章                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 代码实现

```python
from acp import AgentClient

client = AgentClient("http://localhost:8000")

# 1. 研究阶段
research_result = client.run_agent("research", {
    "topic": "AI safety best practices",
    "depth": "comprehensive"
})

# 2. 写作阶段
draft = client.run_agent("writer", {
    "research": research_result,
    "target_length": 3000,
    "audience": "technical"
})

# 3. SEO 优化
final_article = client.run_agent("seo", {
    "content": draft,
    "keywords": ["AI safety", "machine learning", "best practices"]
})

print(final_article)
```

### Agent 元数据示例

ACP 返回的 Agent 信息包含丰富的元数据：

```json
{
  "name": "chat",
  "description": "Conversational agent with memory, supporting real-time search, Wikipedia lookups, and weather updates",
  "input_content_types": ["text/plain"],
  "output_content_types": ["text/plain"],
  "metadata": {
    "framework": "BeeAI",
    "capabilities": [
      {"name": "Conversational AI", "description": "Handles multi-turn conversations with memory"},
      {"name": "Tool Integration", "description": "Search, Wikipedia, Weather APIs"}
    ],
    "domains": ["general"],
    "tags": ["Chat", "Assistant"],
    "license": "Apache-2.0",
    "author": {
      "name": "John Smith",
      "email": "jsmith@example.com"
    },
    "dependencies": [
      {"type": "tool", "name": "weather"}
    ]
  }
}
```

## ACP 与现有方案对比

| 特性 | MCP | ACP |
|------|-----|-----|
| **定位** | 模型上下文协议 | Agent 通信协议 |
| **通信方式** | JSON-RPC | RESTful HTTP |
| **主要场景** | 为 LLM 提供外部工具/数据 | Agent 间互操作 |
| **治理模式** | Anthropic 主导 | Linux Foundation 开放标准 |
| **SDK** | 多种语言 | Python, TypeScript |

## 未来展望

ACP 正在快速发展中，未来方向包括：

- **Tool Registry**：统一的工具注册和发现中心
- **安全框架**：企业级权限管理和审计合规
- **多 Agent 编排**：复杂工作流的标准化
- **跨组织协作**：企业间 Agent 安全通信协议

## 结语

ACP 通过提供标准化的 RESTful 通信协议，解决了 AI Agent 互操作性的核心挑战：

1. **降低集成成本**：一次实现 ACP，与所有兼容 Agent 互操作
2. **促进生态繁荣**：开放标准，社区驱动，避免厂商锁定
3. **加速创新**：开发者专注于 Agent 能力，而非集成细节

随着 AI Agent 的普及，ACP 将成为连接智能系统的通用语言。

---

**相关资源**
- 官方文档：https://agentcommunicationprotocol.dev
- GitHub: https://github.com/i-am-bee/acp
- Python SDK: https://github.com/i-am-bee/acp/tree/main/python
- TypeScript SDK: https://github.com/i-am-bee/acp/tree/main/typescript
