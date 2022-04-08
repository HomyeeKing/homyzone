---
title: code split——代码分片
date: 2021-02-22 15:40:12
hero_image: ''
lang: zh
duration: 25min
---

> 参考链接
- [webpack---code-split](https://webpack.js.org/guides/code-splitting/)
- [import()](https://webpack.js.org/api/module-methods/#import-1)
# 什么是代码分片？ 有什么用？
简单来说，代码分片就是把资源分割成独立的模块

在不做任何处理的情况下，项目打包后，所有的文件都会集中到**1个bundle文件**中，对于浏览器来说，只能一股脑全部加载，这极大的影响了首屏时间，也浪费带宽；
如果我们可以将这一整个资源分割成不同的小块，每次只加载一小部分，那么资源就可以得到很好的利用，并且我们可以决定资源加载的优先级来提高我们的页面性能，所以，这就是代码分片的意义

# 如何进行代码分片

以 `webpack` 为例，结合下面三种方法 来实现
- 结合入口文件
- 动态导入
- 代码去重和分片

#### 结合入口文件

通过入口文件的配置，我们可以告诉浏览器从哪加载资源，这是个好的开始，因为我们可以通过这个入口配置，将这些入口文件分割成不同的模块，浏览器因此可以只加载入口文件


```js
const path = require('path')
module.exports = {
    mode:'development',
    entry:{
        index:'./src/index.js',
        another:'./src/another.js'
    },
    output:{
        filename:'[name].bundle.js'
        path: path.resolve(__dirname,'dist')
    }
}
```

但是这种方式有一个问题，如果两个入口文件依赖了同一个库 ，那么这两个模块都会包含这个库的代码，就会造成代码冗余，同时也不够灵活
这里不记录某一打包工具的分片方法，需要注意的问题就是： 
 *去重分片模块里的重复代码，可以结合插件或打包工具本身的配置*


#### 动态导入

es 规范的 `import()` 是用来动态导入的，他的内部是通过`promise`来实现的，`import([module])`会被视作分片的点，也就是被请求的module及其子模块会被分成不同的模块。

但是需要注意的是，我们应该明确导入模块的路径，避免通过模板字符串的形式来导入，因为里面的变量会等到运行时才会确认，但是会造成额外的代码分片工作：

```js
import(`./src/${language}.json`)
// 这种方式会导致src下所有的json文件被分成新的chunk， 但是只有运行时 `language` 确认时 会引入对应的chunk， 但是会造成额外的分片工作
```

同时也可以通过内联注释来实现 或者决定处不处理 import()，
```js
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  /* webpackExports: ["default", "named"] */
  'module'
);
```


# preload && prefetch

简单来说 preload适用于当前页面可能需要用到的资源，prefetch适用于可能未来需要的但**未被访问**的路由下的资源

二者区别：

- preload的模块 会和 父模块并行加载，prefetch会在parent chunk加载完之后加载
- preload 有中等优先级，会立刻下载，prefetch会在浏览器空闲时进行
- preload的模块会被parent chunk 立刻请求， prefetch
- 浏览器支持程度不同
preload需要慎用，因为如果是某个很庞大的第三方依赖，那么你的首屏时间 性能肯定会收到影响



