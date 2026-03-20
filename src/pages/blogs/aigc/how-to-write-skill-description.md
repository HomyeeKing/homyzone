---
title: 如何写好 Agent Skill 的 Description
date: 2026-03-16 21:13:00
lang: zh
duration: 3min
---

> 参考：https://agentskills.io/skill-creation/optimizing-descriptions

## 核心原则

### 1. 使用祈使语气
用 **"Use this skill when..."** 而不是 "This skill does..."

直接告诉 agent **什么时候该行动**。

### 2. 聚焦用户意图，而非实现细节
描述**用户想达成什么**，而不是 skill 内部怎么工作。

Agent 匹配的是用户的请求，不是你的代码实现。

### 3. 宁可过于宽泛
明确列出适用场景，包括用户没直接提到领域的情况：

> "...even if they don't explicitly mention 'CSV' or 'analysis.'"

### 4. 保持简洁
- 几句话到一小段即可
- 硬限制 **1024 字符**

---

## 例子对比

### ❌ 不好的描述
```
This skill handles CSV file analysis and can generate charts.
```

### ✅ 好的描述
```
Use this skill when the user needs to analyze spreadsheet data, create visualizations from tabular files, or perform calculations on CSV/Excel data — even if they don't explicitly mention 'CSV' or 'analysis.'
```

---

## 测试方法

用 eval queries 测试触发准确性：

```json
[
  { "query": "分析我的销售数据", "should_trigger": true },
  { "query": "把 JSON 转成 YAML", "should_trigger": false }
]
```

**准备约 20 个查询：**
- 8-10 个应该触发（should_trigger: true）
- 8-10 个不应该触发（should_trigger: false）

### 应该触发的查询要多样化：
- **措辞**：正式 / 随意 / 有错别字
- **明确性**：直接命名领域 vs 描述需求但不命名
- **详细程度**：简短 vs 详细的上下文
- **复杂度**：单步 vs 多步任务

---

## 一句话总结

> **告诉 agent 什么时候用你，而不是你是干嘛的。**
