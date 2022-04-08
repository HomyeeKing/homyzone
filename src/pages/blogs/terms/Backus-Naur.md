---
title: Backus-Naur 语法
date: 2022-02-13 17:52:05
hero_image: ""
lang: zh
duration: 1min
---

最近看 npm 文档的时候，看到了[Range Grammar](https://docs.npmjs.com/cli/v6/using-npm/semver#range-grammar)这一块，读不太懂，于是 google 了下。

首先看下维基百科关于这段的介绍吧：

> In computer science, Backus–Naur form (/ˌbækəs ˈnaʊər/) or Backus normal form (BNF) is a metasyntax notation for context-free grammars, often used to describe the syntax of languages used in computing, such as computer programming languages, document formats, instruction sets and communication protocols. They are applied wherever exact descriptions of languages are needed: for instance, in official language specifications, in manuals, and in textbooks on programming language theory.

大概意思就是说，在 CS 中，BNF 是一个用于描述编程语言的语法的一种元语言。

它的结构大概就是规则集的定义：

```
<rule>  ::= <terminal> | <another rule>  // := 或 ::= 是定义的意思
<!--  左边是 规则集名称， 右边是定义的具体内容 -->
比如
<Digit> := 0 | 1 | 2 | 3 |4 | 5 | 6 | 7 | 8| 9

```


### 参考：
- https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form

- https://www.google.com/search?q=how+to+read+backus-naur+grammar&oq=how+to+read+backus-naur+grammar&aqs=chrome..69i57j33i160.7978j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_jNYIYvuIK7aIr7wPk6amoAo16



