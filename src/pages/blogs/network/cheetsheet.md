---
title: cheetsheet
date: 2023-08-13 17:14:214
hero_image: ''
lang: zh
duration: 1min
---

# 如何对域名进行提前建联？

http基于tcp，每次请求都要进行建立tcp连接，浏览器的话可以通过 `preconnect`来预建联

```js
<link rel="preconnect" href="https://example.com" />
```
另外还可以通过以下方式来减少连接次数

- 域名收拢。也就是尽量收敛到相同域名
- ip收拢。一个 TCP 连接是由一个四元组组成的（源 IP、源端口、目标 IP、目标端口），和域名无关，所以请求两个域名但是来自同一个ip的时候，会复用链接（dns解析还是有的）