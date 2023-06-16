---
title: vscode 自定义代码片段
date: 2023-06-16 16:48:13
hero_image: ""
lang: zh
duration: 5min
---

`command` +`shift`+ `p` 然后输入snippet
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1666363919442-b972e19c-80c6-4fa5-9262-34eb5489e282.png#clientId=u6e2ed08f-aad3-4&errorMessage=unknown%20error&from=paste&height=158&id=u86a593b2&originHeight=316&originWidth=1126&originalType=binary&ratio=1&rotation=0&showTitle=false&size=77202&status=error&style=none&taskId=u1e0c5d4b-6c81-4c68-a638-b2b80858923&title=&width=563)
选择 `配置用户snippets`
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1666364043440-3bac8bdb-badc-4db0-86c1-f7510a5a0bde.png#clientId=u6e2ed08f-aad3-4&errorMessage=unknown%20error&from=paste&height=630&id=uf60b705f&originHeight=1260&originWidth=1760&originalType=binary&ratio=1&rotation=0&showTitle=false&size=271360&status=error&style=none&taskId=u5afbf212-d153-498d-9509-66d69c03ccb&title=&width=880)
详细的language id 可以查看[这里](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers)
## 举例
假如我们想拓展jsx的功能，我们可以分别在`javascriptreact`和 `typescriptreact`（分别代表.jsx .tsx）里进行配置
比如想快速生成`<div classname={styles.xxx}></div>`的片段
我们可以这样写

```json
{
  "jsx classnames emmet": {
    "prefix": "styles.",
    "body": [
      "<div className={styles.$1}>$2</div>"
    ]
  }
}
```

如果是自定义的全局文件则可以通过scope控制
```json
{
  "jsx classnames emmet": {
    "prefix": "styles.",
    "body": [
      "<div className={styles.$1}>$2</div>"
    ],
    "scope":"javascriptreact,typescriptreact"
  }
}
```

效果如下
![屏幕录制2022-10-21 22.57.35.gif](https://intranetproxy.alipay.com/skylark/lark/0/2022/gif/24957178/1666365118210-93d77ddc-755a-49e9-be44-0f67f78566d6.gif#clientId=uabbbb159-af7d-4&from=paste&height=879&id=u51b9d78d&originHeight=1758&originWidth=2188&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4470848&status=done&style=none&taskId=u2981adfe-569b-4092-b2d9-0d5b512e919&title=&width=1094)
