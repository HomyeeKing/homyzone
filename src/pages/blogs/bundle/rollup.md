---
title: rollup cheetsheet
date: 2024-10-25 11:14:32
hero_image: ''
lang: zh
duration: 10min
---

## output

- [`assetFileNames`](https://rollupjs.org/configuration-options/#output-assetfilenames) 控制生成的 asset 文件的名称 
- [`entryFileNames`](https://rollupjs.org/configuration-options/#output-entryfilenames) 用于定义从入口点创建的块（chunks）的命名模式。这个选项可以是一个字符串，也可以是一个函数，该函数针对每个入口块返回一个特定的模式。适用于多入口的 chunk 命名配置
- [`chunkFileNames`](https://rollupjs.org/configuration-options/#output-chunkfilenames), 控制输出文件的名称，支持`[format]` `[name]` `[hash]`等通配符
