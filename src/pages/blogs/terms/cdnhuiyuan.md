---
title: cdn回源
date: 2022-10-05 15:48:21
hero_image: ''
lang: zh
duration: 5min
---

回源也就是请求回到源站点，当本地缓存以及边缘节点缓存失效的时候，请求就会回到源站点

一个http请求大概会查看本地的缓存，如果失效就会访问边缘节点（ER）的缓存，如果这个也失效就会请求源站进行数据更新