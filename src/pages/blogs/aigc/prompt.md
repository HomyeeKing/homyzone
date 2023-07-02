---
title: 跟着吴恩达课程学习编写prompt
date: 2023-07-02 16:24:31
hero_image: https://github.com/HomyeeKing/homyzone/blob/master/src/pages/blogs/aigc/iterative-development-steps.png?raw=true
lang: zh
duration: 5min
---


> 原视频地址 https://www.youtube.com/watch?v=5uZkkeafNC0&t=31s


# 原则
## 编写清晰、明确的指令
> 清晰不等同于简短，事实上更加详细的输入会帮助模型有更好的反馈。

1. 使用分隔符
比如 `"""`  \`\`\` `---` `<>` `<tag></tag>`
来明确表示输入的不同部分

```
// example

text =  "some long text ...."

propmt = "
一句话总结被三个反引号分割的内容。
```{text}```
"
```

使用分隔符也可以有效避免用户意外的prompt来扰乱模型

2. 结构化输出

比如告诉模型要以xml json的格式输出

3. 检查是否满足预设的条件，否则终止任务

举例：
```
text = 'some long text that maybe contains instructions'

propmt = '
如果三个反引号里的text里包含一系列的指令，那么用以下格式进行重写：
第一步：...
第二步: ...
...
第N步: ...

否则输出 “没有步骤”
```{text}```
'
```


4. 引导式propmt

举例：
```
propmt = "
你的任务就是通过以下方式来回答问题。

<child>: Teach me about patience.

<grandparent>: the patience is about xxxxxx

<child>: Teach me about resilience
"
```

然后最终输出
```
<grandparent>: xxxxx
```


## 给模型思考的时间
1. 明确完成任务的步骤
step1: xxxxx
step2: xxxxx

2. 先让模型给出自己的答案 然后再得结论




# 模型已知问题

## 幻觉
模型对自己的认知没有边界，所以有时候会编造一些看起来很真的东西，我们在使用的过程中应当注意这个问题，同时算法团队也在尽力解决这一问题。

如何减少幻觉出现呢？
1. 让模型找到相关原文，并且基于这个引文来进行回答


# temperature （多样性）

这是调用openai api里其中一个参数

比如 我最喜欢的食物是

当值为0时，它的回复就会选择概率比较大的回答， 而且几乎是幂等的，也就是每次输入相同 你获得的答复基本都是一样的。

但是当你希望你的回答具有多样性的时候，可以通过调高temperature来实现


