---
title: 解析vite工作原理
date: 2021-03-03 15:04:34
hero_image: ''
lang: zh
duration: 25min
---
> 参考链接
https://harlanzw.com/blog/how-the-heck-does-vite-work/

本文结合传统的`webpack`等打包工具来对比说明`vite`背后的工作原理。

_文末有[图解](/blogs/why-vite#图解)_

在看了一段时间的vite的源码之后，感觉还是先了解vite（其实适用于所有打包工具）工作比较好，要不蒙头看效率太低，于是我发现了一个对vite理解非常透彻的文章（通过前文参考文章链接），结合自己的理解，来记录一下。

毫无疑问，`vite`将是未来打包工具的主流产品，无论是vue的用户群体的庞大，更在于他本身超前的理念———— 利用浏览器可以解析esmodule的这一特点，大大提升了开发效率


### 基于esmodule
所以`vite`有别于传统的`webpack` `rollup`等，它假设你使用最新的浏览器，所以，不会编译我们的代码来对旧的浏览器进行兼容，这也是他提升速度的一大原因，即———— **不对**开发时的代码进行打包

随着项目体积的增大，相信很多开发者都有等待项目漫长编译启动的经历，而`vite` 从根本改变了这种情况

### vite如何处理我们的代码

省去了打包这一过程，vite做的很简单，就是把我们的入口文件直接传送给浏览器，然后利用浏览器解析esmodule的能力，分析里面的`import | export`语句来生成对各种资源的请求，然后将这些请求发送给vite的开发服务器，由服务器来处理这些请求然后对目标资源进行编译解析，然后把资源返回

服务器在处理这些请求的时候必然会生成新的`import export`语句，从而产生新的请求，所以，浏览器会递归分析，来加载所有需要的资源

### 以请求一个vue文件为例

可以创建一个简单的vite工程，然后启动并打开devtool的`network`

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ed9946bf6e54192bb23c01b17aba83e~tplv-k3u1fbpfcp-watermark.image" />

浏览器解析我们的入口文件`main.js` ， 发现引入了`vue` 和 `App.vue`，然后分别请求了这两个依赖
<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d294f1c4d9945fc8a7d3c578e53d780~tplv-k3u1fbpfcp-watermark.image" />

然后我们看一下 是如何处理vue文件的，来看一下服务器返回的`App.vue`

```js

import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.vue");import HelloWorld from '/src/components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

const _sfc_main = {
  expose: [],
  setup(__props) {


return { HelloWorld }
}

}
import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "/node_modules/.vite/vue.js?v=4431a46c"

const _hoisted_1 = { class: "logo" }

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", _hoisted_1))
}

import "/src/App.vue?vue&type=style&index=0&lang.scss"

_sfc_main.render = _sfc_render
_sfc_main.__file = "/Users/Desktop/HomyeeKing/vite-alias-demo.github.io/src/App.vue"
export default _sfc_main
_sfc_main.__hmrId = "7ba5bd90"
typeof __VUE_HMR_RUNTIME__ !== 'undefined' && __VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main)
import.meta.hot.accept(({ default: updated, _rerender_only }) => {
  if (_rerender_only) {
    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render)
  } else {
    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated)
  }
})
```

vite是通过`vite-plugin-vue`这个插件来对编译vue文件的，我们可以看到它把一个SFC文件分成了不同类型的请求：
- template: 这里没有，大致也是通过query的形式：vue?type=template
- style: App.vue?vue&type=style&index=0&lang.scss
- component: HelloWorld.vue
- dependency: xx/xxx/vue.js?xxx


通过把一个sfc分割成不同的请求，我们可以实现更好的HMR🔥，因为比如我们看一下请求的style:
```js
import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.vue?vue&type=style&index=0&lang.scss");import { updateStyle, removeStyle } from "/@vite/client"
const id = "/Users/Desktop/HomyeeKing/vite-alias-demo.github.io/src/App.vue?vue&type=style&index=0&lang.scss"
const css = ".logo{\n    width: 200px;\n    height: 200px;\n    background-image: url(/src/assets/logo.png);\n}"
updateStyle(id, css)
import.meta.hot.accept()
export default css
import.meta.hot.prune(() => removeStyle(id))
```
当你更新css的时候，不是传统的对sfc进行重新编译，而是只会更新这一个请求，怎么样，是不是很酷😎？

### production build

知道原理后，我们知道这极大的提高了开发效率，但是开发环境是不是也是如此呢？答案是否定的，这也是显然的，而且[vite的文档也给出了解释](https://vitejs.dev/guide/why.html#why-bundle-for-production)，就是这太依赖http传输速度了，传送这些未打包的esmodule代码依然效率很低，即使是http2，而且加上层层嵌套的import生成的请求，可想而知这对网络带宽是多么大的考验

vite采用`rollup`进行生产环境的打包，同时提供了很多开箱即用的功能来尽可能页面的性能, 而且针对请求很多的情况，vite采用强缓存来缓存不变的资源

### 图解

### 约束
- vite是需要esmodule的，所以node_modules的依赖必须是有esmodule 的export ， 换句话说 所有非esmodule的依赖转化成esmodule也是比较耗费时间的

- http请求的处理，开发环境下 vite默认采用强缓存来提高资源的命中率来缓解http压力