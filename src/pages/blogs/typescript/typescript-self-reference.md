---
title: typescript library如何自己引用自己
date: 2022-11-08 16:56:12 # sj
hero_image: ''
lang: zh
duration: 10min
---

需修改`tsconfig.json`中如下几个地方：
ts 版本 4.7 以上 应该

```json
{
  "compilerOptions": {
    "moduleResolution": "NodeNext"
  },
  "include": [] // 这里一定要包含对应目录，否则再怎么配置都作用不到对应目录中
}
```
