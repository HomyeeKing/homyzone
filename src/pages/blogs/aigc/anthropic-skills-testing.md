---
title: Anthropic Skills 测试机制详解
date: 2026-03-20 17:15:00
lang: zh
duration: 12min
---

> 如何科学地验证一个 Skill 是否有效？Anthropic 的 skill-creator 提供了一套完整的测试和评估机制。

## 为什么需要测试机制？

创建 Skill 不只是写一份说明书，更重要的是验证它真的能用、好用。Anthropic 的 skill-creator 提供了一套系统化的测试流程：

1. **定性评估** - 人工检查输出质量
2. **定量评估** - 自动化断言验证
3. **基准对比** - 有/无 Skill 的效果对比
4. **迭代优化** - 根据反馈持续改进

## 测试流程概览

```
起草 Skill → 创建测试用例 → 并行运行 → 收集反馈 → 分析结果 → 改进 Skill → 重复
```

整个流程是循环的，直到 Skill 达到满意的效果。

## 第一步：创建测试用例

测试用例是评估的基础。好的测试用例应该：

- **覆盖典型场景** - 最常见的使用方式
- **包含边界情况** - 极端输入、异常情况
- **多样化表达** - 不同措辞、正式/随意语气
- **具体细节** - 真实的文件路径、数据、上下文

### 测试用例示例

**不好的测试用例：**
```
"格式化这个数据"
"从 PDF 提取文本"
"创建一个图表"
```

**好的测试用例：**
```
"我老板刚给我发了个 xlsx 文件（在 Downloads 里，叫 'Q4 sales final FINAL v2.xlsx'），她让我加一列显示利润率百分比。收入在 C 列，成本在 D 列。"
```

### 测试用例文件结构

```
workspace/
├── evals/
│   └── evals.json          # 测试用例定义
├── eval-0-with_skill/      # 使用 Skill 的运行结果
├── eval-0-without_skill/   # 不使用 Skill 的基线结果
├── eval-1-with_skill/
├── eval-1-without_skill/
└── ...
```

## 第二步：并行运行测试

使用子代理（subagent）并行运行所有测试用例：

```bash
# 对每个测试用例，同时运行两个版本：
# 1. with_skill - 使用 Skill 的 Claude
# 2. without_skill - 不使用 Skill 的 Claude（基线）
```

### 为什么要跑基线？

对比才能看出 Skill 的价值：
- Skill 是否真的提升了效果？
- 还是只是增加了复杂度？
- 时间/Token 消耗是否值得？

## 第三步：定量断言（Assertions）

定量评估使用 JSON 断言自动验证输出：

```json
{
  "evals": [
    {
      "name": "chart_has_title",
      "prompt": "Create a chart from sales data",
      "assertions": [
        {
          "name": "output_has_chart",
          "description": "Output contains a chart file",
          "type": "file_exists",
          "path": "output/chart.png"
        },
        {
          "name": "chart_has_title",
          "description": "Chart has a title",
          "type": "content_contains",
          "file": "output/chart.png",
          "substring": "Sales"
        }
      ]
    }
  ]
}
```

### 断言类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `file_exists` | 文件是否存在 | 检查是否生成了输出文件 |
| `content_contains` | 内容包含特定字符串 | 检查输出是否包含关键词 |
| `json_path` | JSON 路径存在且值正确 | 检查 API 返回结构 |
| `exit_code` | 命令退出码 | 检查脚本是否成功执行 |

### 好断言的特征

- **客观可验证** - 不是主观判断
- **描述清晰** - 一眼看懂在检查什么
- **命名直观** - `chart_has_title` 比 `check1` 好
- **不过度设计** - 主观内容（如写作风格）不适合断言

## 第四步：收集性能数据

每次运行自动收集：

```json
{
  "total_tokens": 84852,
  "duration_ms": 23332,
  "total_duration_seconds": 23.3
}
```

这些数据用于：
- 对比有/无 Skill 的效率差异
- 发现异常耗时或 Token 消耗
- 优化 Skill 的成本

## 第五步：评分与聚合

### 人工评分

使用 `eval-viewer/generate_review.py` 启动评估查看器：

```bash
python eval-viewer/generate_review.py \
  <workspace>/iteration-N \
  --skill-name "my-skill" \
  --benchmark <workspace>/iteration-N/benchmark.json
```

查看器提供两个标签页：

**Outputs 标签：**
- 显示每个测试用例的输入和输出
- 可以逐条查看、对比迭代改进
- 提供反馈文本框，实时保存

**Benchmark 标签：**
- 通过率、时间、Token 消耗的统计对比
- 有 Skill vs 无 Skill 的差异分析

### 自动化评分

使用评分代理（grader）自动评估断言：

```json
{
  "expectations": [
    {
      "text": "Output contains a chart file",
      "passed": true,
      "evidence": "Found output/chart.png"
    },
    {
      "text": "Chart has a title",
      "passed": false,
      "evidence": "No title found in chart.png"
    }
  ]
}
```

注意：字段名必须是 `text`、`passed`、`evidence`，查看器依赖这些字段。

### 聚合基准报告

```bash
python -m scripts.aggregate_benchmark \
  <workspace>/iteration-N \
  --skill-name <name>
```

生成 `benchmark.json` 和 `benchmark.md`：

```json
{
  "configurations": [
    {
      "name": "with_skill",
      "pass_rate": 0.85,
      "mean_time_seconds": 23.3,
      "stddev_time": 5.2,
      "mean_tokens": 84852
    },
    {
      "name": "without_skill",
      "pass_rate": 0.45,
      "mean_time_seconds": 45.1,
      "stddev_time": 12.3,
      "mean_tokens": 120456
    }
  ],
  "delta": {
    "pass_rate": "+40%",
    "time": "-48%",
    "tokens": "-30%"
  }
}
```

## 第六步：分析师审查

自动分析基准数据，发现隐藏问题：

- **非判别性断言** - 总是通过的断言（无意义）
- **高方差测试** - 结果波动大（可能不稳定）
- **时间/Token 权衡** - 质量提升是否值得成本增加

## 第七步：读取反馈并迭代

用户查看结果后，反馈保存在 `feedback.json`：

```json
{
  "reviews": [
    {
      "run_id": "eval-0-with_skill",
      "feedback": "图表缺少坐标轴标签",
      "timestamp": "2026-03-20T10:00:00Z"
    },
    {
      "run_id": "eval-1-with_skill",
      "feedback": "",
      "timestamp": "2026-03-20T10:05:00Z"
    },
    {
      "run_id": "eval-2-with_skill",
      "feedback": "完美，喜欢这个输出",
      "timestamp": "2026-03-20T10:10:00Z"
    }
  ],
  "status": "complete"
}
```

**空反馈** = 用户觉得没问题
**有反馈** = 需要针对性改进

### 如何改进 Skill

1. **泛化反馈** - 不要只修这一个例子，要理解根本问题
2. **保持简洁** - 删除无效指令，减少浪费
3. **解释原因** - 告诉 Claude 为什么，而不是只说做什么
4. **提取公共脚本** - 如果多个测试用例都写了类似代码，打包成脚本

## 完整工作流示例

```bash
# 1. 初始化工作空间
mkdir -p workspace/evals

# 2. 创建测试用例
cat > workspace/evals/evals.json << 'EOF'
[
  {
    "name": "create-sales-chart",
    "prompt": "从 Q4-sales.xlsx 创建销售图表",
    "assertions": [...]
  }
]
EOF

# 3. 并行运行测试（使用子代理）
# 对每个 eval，同时运行 with_skill 和 without_skill

# 4. 收集性能数据
# 从子代理通知中提取 total_tokens 和 duration_ms

# 5. 评分
python -m scripts.grade workspace/iteration-1

# 6. 聚合基准
python -m scripts.aggregate_benchmark workspace/iteration-1 --skill-name chart-creator

# 7. 启动查看器
python eval-viewer/generate_review.py workspace/iteration-1 \
  --skill-name chart-creator \
  --benchmark workspace/iteration-1/benchmark.json

# 8. 等待用户反馈...

# 9. 读取 feedback.json 并改进 Skill

# 10. 重复步骤 3-9，直到满意
```

## 高级：盲测对比

对于更严格的对比，使用盲测：

1. 给独立代理两个输出，不告诉它哪个是哪个
2. 让它判断哪个更好
3. 分析胜者为什么赢

这需要子代理支持，大多数用户不需要，人工审查通常足够。

## 描述优化（Description Optimization）

Skill 的 `description` 决定了触发率。skill-creator 提供自动优化：

### 生成触发评估查询

创建 20 个评估查询（10 个应该触发，10 个不应该）：

```json
[
  {"query": "帮我做个销售图表", "should_trigger": true},
  {"query": "写个斐波那契函数", "should_trigger": false}
]
```

### 运行优化循环

```bash
python -m scripts.run_loop \
  --eval-set trigger-eval.json \
  --skill-path ./my-skill \
  --model claude-sonnet-4-20250514 \
  --max-iterations 5
```

自动迭代优化描述，最大化触发准确率。

## 常见问题

### Q: 测试用例越多越好吗？
A: 不是。质量 > 数量。5-10 个高质量、多样化的测试用例比 50 个重复的好。

### Q: 主观 Skill（如写作风格）怎么测试？
A: 主要依靠人工评估，跳过定量断言。关注用户反馈，迭代改进。

### Q: 没有子代理怎么办？
A: 在 Claude.ai 中，自己运行测试用例，直接在对话中展示结果给用户审查。

### Q: 如何知道 Skill 已经"足够好"？
A: 满足以下任一条件：
- 用户说满意
- 反馈全部为空（都通过）
- 迭代不再产生有意义的改进

## 总结

Anthropic Skills 的测试机制是一个完整的闭环：

| 阶段 | 工具/方法 | 输出 |
|------|-----------|------|
| 创建测试 | 人工编写 | `evals.json` |
| 运行测试 | 子代理并行 | 运行目录 |
| 收集数据 | 自动提取 | `timing.json` |
| 评分 | 断言 + 人工 | `grading.json` |
| 聚合 | 脚本 | `benchmark.json` |
| 审查 | 查看器 | 用户反馈 |
| 迭代 | 人工改进 | 新版 Skill |

核心原则：**测试驱动开发** - 先写测试，再写 Skill，循环迭代直到达标。

---

**参考资源：**
- [skill-creator SKILL.md](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)
- [Anthropic Skills GitHub](https://github.com/anthropics/skills)
