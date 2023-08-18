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


# CDN detector
CDN Detector（内容分发网络检测器）是一种用于检测和识别网站使用的内容分发网络（CDN）的工具或服务。CDN Detector 的主要目的是确定一个网站是否使用了CDN以及具体使用了哪个CDN提供商。

CDN Detector 通过分析网站的请求响应、DNS 解析、HTTP 头等信息，来检测网站是否使用了CDN。它可以根据不同的特征和指标，识别出网站所使用的CDN提供商，如Cloudflare、Akamai、Fastly等。CDN Detector 可以通过自动化的方式进行检测，也可以提供API或在线服务，供用户查询指定网站的CDN信息。

CDN Detector 对于网站管理员和开发人员来说，可以帮助他们了解和分析网站的CDN使用情况，优化网站性能，确保CDN的正确配置和使用。同时，对于安全研究人员和黑客来说，CDN Detector 也可以帮助他们了解和探测目标网站的CDN信息，从而进行更有针对性的攻击和安全评估。