---
title: 关于工具库（Library）上的一些FAQ
date: 2022-09-15 14:48:44
hero_image: ''
lang: zh
duration: 25min
---

> 以下FAQ大多假定的场景是工具库、library

# 什么场景下需要转译ESM
Library. 也就是对于npm包，我们是需要转移成ESM的，这样使用方在打包的时候就可以进行tree-shaking, 但如果你的场景是application，比如网页应用，是不涉及转译ESM的，ESM针对于库。
# 转译ESM包含哪些步骤
- 首先是将模块系统transform成ESM，即import satement
- 然后是转译代码，将源代码进行转译，比如通过tsconfig.json的target进行设置，转译成目标平台可执行的代码。这一步也不是强制的，兜底是使用方在bundle的时候通过插件配置进行统一转译，但是作为库作者，最好还是做在前置链路，因为你不能强保证使用方能够正确配置插件进行转译

# 目标平台是如何找到引入的工具包的
这个问题主要是楼主之前困惑的问题，主要是对整个链路不够了解，真正搞清楚需要站在application的角度。一个工具库发布完之后并不代表最终使用的形式，最终形式还得看应用bundle完之后。

application本身依赖的dependencies 以及 依赖的依赖 最终都会被打包工具替换成真实的物理地址

# can not use import statement outside the module
这个算是比较常见的error, 主要是因为库作者没有对源代码进行ESM转译或者没有指向正确的入口文件，所以导致使用方在import的时候出现这个error，关于指向正确的入口文件，参考[这篇](https://ata.alibaba-inc.com/articles/240969?spm=ata.25287382.0.0.11f530664YOudz)





