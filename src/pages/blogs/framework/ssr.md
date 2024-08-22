---
title: SSR 服务端渲染记录
date: 2024-08-22 17:43:05
hero_image: ''
lang: zh
duration: 25min
---

## 解析

suspense 结束前，主文档先渲染占位，并且留一个 template 元素站位用来后续上屏真实渲染结果

```html
<div id="root">
  <!--$?-->
  <template id="B:0"></template>
  loading..
  <!--/$-->
</div>
```

下面是对应的待替换的模版

```html
<div hidden id="S:0">
  <template id="P:1"></template> // 服务端渲染的结果
  <template id="P:2"></template> // 服务端对应的数据
</div>
```

等到流式结束后，上边的元素会变成

```html
<div hidden id="S:0">
  <div>418</div>
  // 服务端渲染的结果
  <script>
    服务端接口返回数据;
  </script>
  // 服务端对应的数据
</div>
```
然后再用 `S:0`替换 `B:0`完成 hydrate

- `$RS` (render snapshot), Suspense 结束后, 上屏服务端渲染结果，包括服务端渲染的DOM 以及 对应的数据源
- `$RC` (render commit) ，hydrate，提交到主文档进行真实渲染
- `$RX` suspense 时发生异常，服务端会渲染对应的报错信息，降级到CSR渲染