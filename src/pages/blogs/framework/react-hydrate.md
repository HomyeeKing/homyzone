---
title: react hydrate 报错排查
date: 2024-08-23 15:24:37
hero_image: ''
lang: zh
duration: 1min
---

首先找到复现的条件，然后使用开发版本的 react 进行调试

# 区分端的渲染
## 区分前后端
```tsx
const IsomorphicContainer = () => {
  const isClient = typeof window !== "undefined";

  return isClient ? <ClientOnlyComponent /> : null;
};
```
## 区分设备
```tsx
import { useMediaQuery } from 'react-responsive';

const BreakpointVaryingCTA = ({ showModel }) => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: 768 });

  return isMobileOrTablet ? <a href="/content">Additional information</a> : <button type="button" onClick={showModel}>Additional information</button>
};
```
都是由于在服务端渲染的时候条件不满足，导致前后两个UI树的内容不同
# whitespace
没错，连空格对不上也会报错
```tsx
<div id="root">${html}</div>
 
<div id="root">
  ${html}
</div>
```
第二个例子可能会导致hydrate错误，服务端渲染的template如上，但是输出到前端的时候将空格移除掉了，就会复现这个问题
```tsx
Warning: Did not expect server HTML to contain the text node " " in <div>
```
# 数据差异
如果数据会作用到 UI上，不同数据的展示存在差异，那么也会导致这类问题。
最常见的就是 时间戳
其他的比如是 

- 使用了非确定性的id，比如uuid，
- 字符编码不同，确保服务端和前端的编码一致，一般是utf-8
# 无效的HTML
比如 a 标签不能嵌套在 a标签里，因为这些是浏览器的规则，在服务端会渲染，到浏览器的时候 会“纠正”这个元素 ，所以这里的关键就是要写一个有效的HTML

# 第三方工具干扰

- 如浏览器插件修改dom，建议开启无痕模式看一下
   - 要么本来没问题，因为某些插件导致 pc 的控制台有 hydrate 错误
   - 要么本来就有问题，导致pc没有报错 但移动端有
- 云厂商修改了html的response

# 参考文章

- [Text content does not match server-rendered HTML](https://nextjs.org/docs/messages/react-hydration-error#common-ios-issues)
- [https://medium.com/@craigmorten/how-to-debug-react-hydration-errors-5627f67a6548](https://medium.com/@craigmorten/how-to-debug-react-hydration-errors-5627f67a6548)
- [https://github.com/facebook/react/issues/26224](https://github.com/facebook/react/issues/26224)
