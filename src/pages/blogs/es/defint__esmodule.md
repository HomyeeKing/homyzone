---
title: Object.defineProperty(exports,"__esModule",{value:true}) 是为了做什么
date: 2021-10-15 11:03:02
hero_image: ''
lang: zh
duration: 5min
---



## 背景
在本地测试执行npm包的时候，控制台报了一个错误：
> Cannot use import statement outside a module

然后就查了一下这个问题的原因，顺着这个问题，然后就发现了在esmodule下通过default引用CommonJs module（没有default）的情况下就会有问题，而如题的属性就是为了解决这个问题，所以归根到底，这是个转译的问题

## 问题梳理
正常情况下 typescript会这么处理引入的 CommonJS/AMD/UMD的包

- import * as moment from 'moment'  ===>    const moment = require('moment')
- import moment from 'moment'  ===> const moment = require('moment').default

但是这会造成两个问题

- 根据es6规范，`namespace import`(import * as X) 只能是一个对象，不能被调用执行，但是ts转译的时候给处理成了如上的`require()`，这就破坏了es6的规范
- 大多数的第三方库都会遵循这个规范

所以为了兼容规范，ts通过`esModuleInterop`这个配置项来解决这个问题

具体表现在ts编译层面，增加了两个helper函数 `__importDefault` `__importStar`

我们先看一段代码：

```js
import * as fs from 'fs'
import _ from 'lodash'
fs.readFileSync('file.txt', 'utf8')
_.chunk(['a', 'b', 'c', 'd'], 2)
```

没有 `esModuleInterop` 转译出来的代码：

```js
'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const fs = require('fs')
const lodash_1 = require('lodash')
fs.readFileSync('file.txt', 'utf8')
lodash_1.default.chunk(['a', 'b', 'c', 'd'], 2)
```

有`esModuleInterop` 转译出来的代码：
```js
'use strict'
const __createBinding = (this && this.__createBinding) || (Object.create
  ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k
    Object.defineProperty(o, k2, { enumerable: true, get() { return m[k] } })
  }
  : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k
    o[k2] = m[k]
  })
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create
  ? function(o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v })
  }
  : function(o, v) {
    o.default = v
  })
const __importStar = (this && this.__importStar) || function(mod) {
  if (mod && mod.__esModule) return mod
  const result = {}
  if (mod != null) for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
  __setModuleDefault(result, mod)
  return result
}
const __importDefault = (this && this.__importDefault) || function(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const fs = __importStar(require('fs'))
const lodash_1 = __importDefault(require('lodash'))
fs.readFileSync('file.txt', 'utf8')
lodash_1.default.chunk(['a', 'b', 'c', 'd'], 2)
```
我们可以从转义出来的代码看到这两个函数，如果我们是通过namespace import引入的代码，就会通过__importStar来辅助实现，这个函数就是返回了当前模块属性的新对象（符合规范），并且设置了default属性（可以default import）

而__importDefault 就是通过`__esModule`这个属性来帮助default import的，
ts通过`__esModule`这个属性来帮助default import