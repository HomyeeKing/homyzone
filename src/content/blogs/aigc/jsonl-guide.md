---
title: "JSONL：大模型时代的结构化数据格式"
date: 2026-03-31
description: "介绍 JSONL 文件格式，它是 JSON 的流式变体，非常适合大模型训练数据的存储和处理"
tags: ["JSONL", "数据格式", "大模型", "AIGC"]
---

在大模型训练和数据处理的场景中，JSONL（JSON Lines）是一种越来越常见的数据格式。它结合了 JSON 的结构化优势和文本文件的流式处理能力，成为 AIGC 领域数据交换的事实标准之一。

## 什么是 JSONL

JSONL 是 **JSON Lines** 的缩写，顾名思义，就是把多条 JSON 数据按行存储的文件格式。每行一个独立的 JSON 对象，行与行之间用换行符分隔。

```
{"name": "Alice", "age": 25, "city": "Beijing"}
{"name": "Bob", "age": 30, "city": "Shanghai"}
{"name": "Charlie", "age": 35, "city": "Shenzhen"}
```

对比标准 JSON 的数组格式：

```json
[
  {"name": "Alice", "age": 25, "city": "Beijing"},
  {"name": "Bob", "age": 30, "city": "Shanghai"},
  {"name": "Charlie", "age": 35, "city": "Shenzhen"}
]
```

## 核心特点

| 特性 | JSON | JSONL |
|------|------|-------|
| 结构 | 数组包裹对象 | 每行独立对象 |
| 解析方式 | 需加载整个文件 | 可逐行流式处理 |
| 内存占用 | 随数据量线性增长 | 恒定（只需当前行）|
| 追加写入 | 需重写整个文件 | 直接追加到末尾 |
| 损坏容错 | 一处错误全文件失效 | 仅影响损坏行 |

## 典型使用场景

### 1. 大模型训练数据

OpenAI、Anthropic 等公司的微调 API 都使用 JSONL 格式：

```jsonl
{"messages": [{"role": "system", "content": "你是一个 helpful 的助手"}, {"role": "user", "content": "你好"}, {"role": "assistant", "content": "你好！有什么可以帮你的吗？"}]}
{"messages": [{"role": "user", "content": "讲个笑话"}, {"role": "assistant", "content": "为什么程序员总是分不清圣诞节和万圣节？因为 Oct 31 == Dec 25"}]}
```

### 2. 日志收集

```jsonl
{"timestamp": "2026-03-31T10:00:00Z", "level": "INFO", "message": "服务启动", "service": "api"}
{"timestamp": "2026-03-31T10:00:05Z", "level": "ERROR", "message": "数据库连接失败", "service": "db", "error": "timeout"}
{"timestamp": "2026-03-31T10:00:10Z", "level": "WARN", "message": "请求过多", "service": "api", "ip": "192.168.1.1"}
```

### 3. 爬虫数据存储

```jsonl
{"url": "https://example.com/page1", "title": "示例页面1", "content": "页面内容...", "crawled_at": "2026-03-31T10:00:00Z"}
{"url": "https://example.com/page2", "title": "示例页面2", "content": "页面内容...", "crawled_at": "2026-03-31T10:00:05Z"}
```

### 4. 向量数据库批量导入

```jsonl
{"id": "doc_001", "text": "人工智能是计算机科学的一个分支", "embedding": [0.1, 0.2, 0.3, ...], "metadata": {"source": "wiki", "lang": "zh"}}
{"id": "doc_002", "text": "机器学习是AI的核心技术之一", "embedding": [0.2, 0.3, 0.4, ...], "metadata": {"source": "wiki", "lang": "zh"}}
```

## 代码示例

### Python 处理 JSONL

```python
import json

# 读取 JSONL
with open('data.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line.strip())
        print(data['name'])

# 写入 JSONL
with open('output.jsonl', 'w', encoding='utf-8') as f:
    for item in data_list:
        f.write(json.dumps(item, ensure_ascii=False) + '\n')
```

### 使用 pandas

```python
import pandas as pd

# 读取
df = pd.read_json('data.jsonl', lines=True)

# 写入
df.to_json('output.jsonl', orient='records', lines=True, force_ascii=False)
```

### Node.js

```javascript
const fs = require('fs');
const readline = require('readline');

// 读取
const fileStream = fs.createReadStream('data.jsonl');
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

for await (const line of rl) {
  const data = JSON.parse(line);
  console.log(data);
}

// 写入
const data = { name: 'Alice', age: 25 };
fs.appendFileSync('output.jsonl', JSON.stringify(data) + '\n');
```

## 最佳实践

1. **每行必须是有效 JSON**：确保每行都能独立解析
2. **使用 UTF-8 编码**：避免中文乱码
3. **末尾保留换行符**：方便追加和流式处理
4. **避免嵌套过深**：扁平结构更易处理
5. **添加 schema 验证**：确保数据质量

## 与相关格式对比

| 格式 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| JSON | 标准、通用 | 大文件解析慢 | 配置、小数据 |
| JSONL | 流式、高效 | 非标准格式 | 大数据、日志 |
| CSV | 简单、兼容 | 无嵌套结构 | 表格数据 |
| Parquet | 压缩高效 | 二进制、不可读 | 分析型数据 |
| YAML | 可读性好 | 解析慢 | 配置文件 |

## 总结

JSONL 是 JSON 的流式变体，特别适合：

- 大模型训练数据（OpenAI、Claude 等）
- 日志收集和分析
- 大规模数据 ETL 处理
- 实时数据流处理

它的核心优势在于**流式处理**和**内存友好**，让处理 GB 甚至 TB 级的数据变得简单高效。

---

**参考链接：**
- [JSON Lines 官方规范](https://jsonlines.org/)
- [OpenAI Fine-tuning 数据格式](https://platform.openai.com/docs/guides/fine-tuning)
