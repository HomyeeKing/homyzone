---
title: TypeScript关于模块配置的一些注意事项
date: 2023-03-29 10:29:39 # sj
hero_image: ''
lang: zh
duration: 10min
---
[[toc]]

# 前言
你将了解到：

- module的作用是什么
- moduleResolution的作用是什么
- 他们两个组合怎么能实现我们想要的功能（诸如支持package.json的exports）

省流看总结
# module
用于指定tsc编译出的.js文件采用什么模块格式

| **Input code** | **Output --module commonjs** | **Output --module esnext** |
| --- | --- | --- |
| import { createSourceFile } from "typescript" | "use strict"; Object.defineProperty(exports, "__esModule", { value: true }); const typescript_1 = require("typescript"); | import { createSourceFile } from "typescript" |

与此同时也限制了`input code`的写法，比如在`--module es2015`下，`import fs = require('fs')`就是不合法的，因为esm里是没有required的；`--module es2020 or system`下，是用不了top-level await的，因为当时的版本还没支持, 可以自行手动验证下。
另外需要注意的是当设置为node16/nodenext, 因为在这个版本之后node正式支持了esm，所以如果设置为这两个值的话，转译的代码模块格式可能是cjs，可能是esm，最终取决于package.json里的type字段，或者文件的格式名(.cjs | .mjs)，相应的也会影响moduleResolution的查找策略，我们接着来讨论这一部分
# moduleResolution
> see: [https://www.typescriptlang.org/docs/handbook/esm-node.html](https://www.typescriptlang.org/docs/handbook/esm-node.html)

字面意思就可以看出，这是决定了用何种算法来查找模块，这里提供了几个选项，我们只说下`node16`和`nodenext`。
node16和nodenext因为支持了esm，所以较之前解析策略有了更新，普通node的文件寻址策略我们大概都熟悉，关于node是如何解析esm模块的可以查看[这里](https://nodejs.org/api/esm.html#resolver-algorithm-specification)

## noResolve
这个配置次次见，次次令人懵逼，还是ChatGPT会说人话，就是省去tsc解析的时间，但还是会 检查import语句指向的模块是否是个有效的文件
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957178/1679542259830-4300f9aa-6181-46dc-a14d-d79b5bf1f24f.png#clientId=u78322627-1e12-4&from=paste&height=281&id=u817fa937&name=image.png&originHeight=562&originWidth=1602&originalType=binary&ratio=2&rotation=0&showTitle=false&size=325787&status=done&style=none&taskId=u29cb2877-fad0-4360-a4c6-53a7c20f3d7&title=&width=801)

## exports
如果你有看过上边node是如何解析esm模块的，那么你就会发现其中一个换件就是通过pjson里的exports字段来获取，所以这个feature也是模块解析的一部分，如果在ts项目中享受此功能，则**必须设置**`**--moduleResolution node16/nodenext**`** 且 types要写在exports里**

不过不同于node默认的cjs解析策略，这里有些写法上的限制：必须要显示添加后缀名，比如import './foo.js` 而不是 import './foo'
所以如果你是这么导出文件的 那么就会需要改造下，所以一定程度上来说还是有点麻烦的，因为不会默认识别`index`，必须是正确的路径名 + 后缀名
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957178/1679542904291-8a8e0285-3d4b-4ce2-9b96-9e227f757527.png#clientId=u78322627-1e12-4&from=paste&height=201&id=u5c8db550&name=image.png&originHeight=402&originWidth=1708&originalType=binary&ratio=2&rotation=0&showTitle=false&size=298890&status=done&style=none&taskId=u4c8c1d25-650b-41e4-b460-b80238056e4&title=&width=854)
据我目前开发体验来看，很少会需要用到项目自己使用自己的exports的情况，也就是编写组件文档demo时，为了保证渲染和给开发者示例一致，这种情况建议使用paths设置别名来解决，避免改造过多，而且node的默认解析策略大家基本上已经养成习惯了
# 
# 总结

- 最容易被忽略的就是node16/nodenext下模块解析策略是不同的，比如要显示添加文件名，不识别index等
- exports是一个很好的功能，但是要想用self-reference就得配合模块解析策略改造下代码，不过通过设置paths成本会更低一点
- module配置项的一切也就是关乎于模块格式（ESM CMD AMD...）的选择，其中包括像top-level await 和pjson的exports这种，都属于module范畴
- moduleResolution配置项决定的是引入一个（非）相对路径的模块，编译器应该怎么正确查找，这里核心只要注意node16/nodenext对于esm和cjs策略不同和相应的限制
# 参考

- [https://stackoverflow.com/questions/71463698/why-we-need-nodenext-typescript-compiler-option-when-we-have-esnext](https://stackoverflow.com/questions/71463698/why-we-need-nodenext-typescript-compiler-option-when-we-have-esnext)
- [https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#ecmascript-module-support-in-node-js](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#ecmascript-module-support-in-node-js)
