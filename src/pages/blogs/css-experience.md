---
title: css经验
date: 2021-11-11 17:22:48
hero_image: ""
lang: zh
duration: 1min
---

## 正确使用 margin: 0 auto
>https://stackoverflow.com/questions/4955122/what-exactly-is-needed-for-margin-0-auto-to-work


以下几个条件必须同时满足
- 必须是块级元素
- 不脱离文档流
- 必须定宽


## 文字离顶部元素固定距离
- 给文字部分设置高度
- 通过padding-top来设置距离

通过这种方式可以保持对上下距离一样，不会因为文字部分行数变化影响 下边的距离