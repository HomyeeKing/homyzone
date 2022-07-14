---
title: 你真的写对入口文件了吗？
date: 2022-07-14 10:00:56
hero_image: ''
lang: zh
duration: 10min
---

# 前情提要
在node中支持两种模块方案——`CommonJS`（cjs） 和 `ECMAScript modules ` (esm)。


随着ESModule的广泛使用，社区生态也在逐渐转向ESModule，ESModule相比于require的运行时执行，可以用来做一些静态代码分析如tree shaking等来减小代码体积，但是由于CommonJS已有庞大的用户基础，对于第三方库作者来说，不能完全一刀切只用ESModule，还要兼容CommonJS场景的使用，所以最合理的方式就是“鱼和熊掌兼得”，即**使用ESModule编写库代码，然后通过TypeScript、Babel等工具辅助生成对应的CommonJS格式的代码**，然后根据开发者的引用方式来动态替换为指定格式的代码。

有了两种版本的代码，第三方库作者就需要编写相应的入口文件，来达到“动态”引入的目的（即import引用的时候指向ESModule的代码，require引入则指向CommonJS的代码），同时也方便于打包工具对于无用代码的剔除，减少代码体积，本篇文章主要聚焦于如何正确的配置入口文件。


> 注： 本篇文章以node规范为准，对于打包工具额外支持的配置方式会进行额外标注
> 本文的涉及的示例代码可以通过 https://github.com/HomyeeKing/test-entry 进行查看、测试

# main
package.json的 `main`字段是最常见的指定入口文件的形式

```json
{
  "name": "@homy/test-entry",
  "version": "1.0.0",
  "description": "",
  "main": "index.js"
}
```

当开发者引入`@homy/test-entry`这个包的时候，可以确定`@homy/test-entry` 这个npm包的入口文件指向的是 `index.js`
```js
const pkg = require('@homy/test-entry')
```

但是`index.js`究竟是cjs or esm? 

一种方式是我们可以通过**后缀名**来显示地标注出当前文件是cjs还是esm格式的:
- cjs ---> `.cjs`
- esm ---> `.mjs`

在显示标注后缀名的情况下，如果你`require`了一个mjs的文件则会抛出异常，同时`import`一个`.cjs`则不支持具名导入，但是可以通过default export的形式（即import pkg from './pkg.cjs')导入
```js
// ❌ Error

import { someVar } from './index.cjs'  const pkg = require('./index.mjs') //  ❌ Error
import pkg from './index.cjs' //  ✅
```

另一种方式是通过package.json的 `type`字段来标识

# type
package.json 里也提供了一个type字段 用于标注用什么格式来执行`.js`文件，
```json
{
  "name": "@homy/test-entry",
  "version": "1.0.0",
  "description": "",
  "type": "commonjs", // or "module", 默认是 commonjs
  "main": "index.js"
}
```
如果手动设置`type: module`, 则将`index.js`当做esmodule处理，否则视为CommonJS

>type: module ，只有Node.js >= 14 且使用import才能使用，不支持require引入

> 注： 关于.js的详细解析策略推荐阅读 https://nodejs.org/api/modules.html#enabling

通过type和main字段，我们可以指定入口文件以及入口文件是什么类型，但是指定的只是*一个*入口文件，仍然不能够满足我们“动态”引入的需求，所以node又引入`exports`这个新的字段作为`main`更强大的替代品


# exports
相比较于`main`字段，exports可以指定多个入口文件，且优先级高于main

```json
{
 "name": "@homy/test-entry",
  "main": "index.js",
  "exports":{
    "import":"./index.mjs",
    "require":"./index.cjs",
    "default": "./index.mjs"  // 兜底使用 
  },
```
而且还有效限制了入口文件的范围，即如果你引入指定入口文件范围之外的文件，则会报错
```js
const pkg = require('@homy/test-entry/test.js')
// 报错！ Package subpath './test.js' is not defined by "exports"
```
如果想指定`submodule`, 我们可以

另外我们还可以这个指定submodule
```json
"exports": {
    "." : "./index.mjs",
    "./mobile": "./mobile.mjs",
    "./pc": "./pc.mjs"
  },

// or 更详细的配置

"exports": {
    ".":{
         "import":"./index.mjs",
         "require":"./index.cjs",
         "default": "./index.mjs"  
    },
    "./mobile": {
         "import":"./mobile.mjs",
         "require":"./mobile.cjs",
         "default": "./mobile.mjs" 
    }
  },
```

然后通过如下方式可以访问到子模块文件
```js
import pkg from 'pkg/mobile'
```
另外还有一个`imports` 字段，主要用于控制import的解析路径，类似于[Import Maps](https://wicg.github.io/import-maps/), 不过在node中指定的入口需要以`#`开头，感兴趣的可以阅读[subpath-imports](https://nodejs.org/api/packages.html?spm=ata.21736010.0.0.5b734bfcYSEaQE#subpath-imports) 

对于前端日常开发来说，我们的运行环境主要还是浏览器和各种webview，我们会使用各种打包工具来压缩、转译我们的代码，除了上面提到的`main` `exports`字段，被主流打包工具广泛支持的还有一个`module`字段

# module
大部分时候 我们也能在第三方库中看到module这个字段，用来指定esm的入口，但是这个提案没有被node采纳（使用exports）但是大多数打包工具比如webpack、rollup以及esbuild等支持了这一特性，方便进行tree shaking等优化策略

![](https://ata2-img.oss-cn-zhangjiakou.aliyuncs.com/neweditor/582e902c-797b-41c5-b8e8-915423af19dc.png)

另外，Typescript已经成为前端的主流开发方式，同时Typescript也有自己的一套入口解析方式，只不过解析的是**类型**的入口文件，有效辅助开发者进行类型检查和代码提示，来提高我们编码的效率和准确性，下面我们继续了解下Typescript是怎么解析类型文件的

# typescript的module resolution
tsconfig.json包含一个`moduleResolution`字段，支持classic（默认）和node两种解析策略，主要针对**相对路径**引入和**非相对路径**引入两种方式，我们可以通过示例来理解下

## classic
查找目标以`.ts` 或`.d.ts`结尾的文件
### relative import
```ts
//  /root/src/folder/A.ts
import { b } from './moduleB'

// process:
/root/src / folder / moduleB.ts
/ root / src / folder / moduleB.d.ts
```
相对路径会找当前目录下的.ts 或.d.ts的文件

### no-relative import
```ts
//  /root/src/folder/A.ts
import { b } from 'moduleB'

// process:
/root/src / folder / moduleB.ts
/ root / src / folder / moduleB.d.ts
/ root / src / moduleB.ts
/ root / src / moduleB.d.ts
/ root / moduleB.ts
/ root / moduleB.d.ts
/ moduleB.ts
/ moduleB.d.ts
```
则会向上查找，直到找到moduleB 相关的.ts或.d.ts文件


## node
### relative
```js
/root/src/moduleA
const pkg = require('./moduleB')

// process：
/root/src/moduleB.js
/root/src/package.json (查找/root/src下有无package.json 如果指定了main字段 则指向main字段对应的文件)
/root/src/moduleB/index.js
```
在node环境下，会依次解析`.js`  当前package.json中`main`字段指向的文件以及是否存在对应的`index.js`文件

 typescript解析的时候则是把后缀名替换成ts专属的后缀`.ts` `.tsx` `.d.ts`，而且ts这时候会读取`types`字段 而非main
```
/root/src/moduleB.ts
/root/src/moduleB.tsx
/root/src/moduleB.d.ts
/root/src/moduleB/package.json (if it specifies a types property)
/root/src/moduleB/index.ts
/root/src/moduleB/index.tsx
/root/src/moduleB/index.d.ts
```

### no-relative
no-relative就直接查看指定`node_modules`下有没有对应文件
```js
/root/src/moduleA
const pkg = require('moduleB')

// process：
/root/src/node_modules/moduleB.js
/root/src/node_modules/package.json 
/root/src/node_modules/moduleB/index.js

/root/node_modules/moduleB.js
/root/node_modules/moduleB/package.json (if it specifies a "main" property)
/root/node_modules/moduleB/index.js

/node_modules/moduleB.js
/node_modules/moduleB/package.json (if it specifies a "main" property)
/node_modules/moduleB/index.js
```
类似的 typescript也会替换对应后缀名，而且多了`@types`下类型的查找
```
/root/src/node_modules/moduleB.ts
/root/src/node_modules/moduleB.tsx
/root/src/node_modules/moduleB.d.ts
/root/src/node_modules/moduleB/package.json (if it specifies a types property)
/root/src/node_modules/@types/moduleB.d.ts     <----- check out @types
/root/src/node_modules/moduleB/index.ts
/root/src/node_modules/moduleB/index.tsx
/root/src/node_modules/moduleB/index.d.ts
....
```



# 总结
- node中可以通过`main` 和  `type: module | commonjs` 来指定入口文件及其模块类型， `exports` 则是更强大的替代品，拥有更灵活的配置方式
- 主流打包工具如webpack rollup esbuild 则在此基础上增加了对top-level `module`的支持
- typescript 查找的是 `.ts` `.tsx` `.d.ts`, 对应查看的是top-level `types`字段

# 参考
https://webpack.js.org/guides/package-exports/
https://nodejs.org/api/packages.html#packages_package_entry_points
https://esbuild.github.io/api/#main-fields
https://www.typescriptlang.org/docs/handbook/module-resolution.html#relative-vs-non-relative-module-imports