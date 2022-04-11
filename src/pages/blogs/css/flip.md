---
title: 读 《flip your animation》有感
date: 2022-04-11 15:02:24
hero_image: ""
lang: zh
duration: 1min
---

> 注： 原文作者著于2015.11，所以后续浏览器可能有新的变化，仅供参考思想

今天了解到了一个新的术语FLIP, 是四个英文字母的首字母组合（First Last Invert Paint）, 是浏览器动画的一种优化手段。为了更好的了解这个技术，我们需要了解动画在浏览器里的一些上下文

### 前置知识

> 推荐阅读： https://developer.mozilla.org/en-US/docs/Web/Performance/Animation_performance_and_frame_rate

首先要了解什么是帧率(FPS)？这里是[mdn的介绍](https://developer.mozilla.org/en-US/docs/Glossary/FPS), 帧率就是每秒可执行的帧数，用来衡量浏览器重新计算、布局、绘制元素的速度。对于浏览器，我们的目标就是保证有60fps，1s能播放60帧动画。

在这短短一帧动画里，会执行以下的操作:

```mermaid
 flowchart LR
 重新计算样式 --> 布局 --> 绘制
```

当然 对于不同样式的变化，上面的操作也不一定全部需要执行，也就是我们常说的`重排`和`重绘`

最理想的是只用`transform` 和 `opacity`（可以参考https://developer.mozilla.org/en-US/docs/Web/Performance/Animation_performance_and_frame_rate#css_property_cost 来查看css属性的消耗 或者查看[CSS Triggers](https://csstriggers.com/) 查看更多属性） 来实现，因为他们甚至都不会触发重绘，最终在合成层统一处理


### flip

了解到前面的上下文后，flip是怎么做的呢？首先
Frist 和 Last 分别是动画前后的两种状态，获取到动画执行前后的状态后，就可以计算出变化的属性了，省去了浏览器计算的时间，然后再通过Invert将元素状态重置到初始状态，然后再进行Play

那么你可能会问，开发者前期预计算不会影响动画的执行吗？作者给出的解释是这样的：在用户触发动画的时候，有个100ms的窗口期可供我们做一些工作（执行js代码）而不被用户感知，大致如下：

[Taking advantage of user perception](https://aerotwist.com/static/blog/flip-your-animations/window.jpg)



所以我们可以利用这宝贵的100ms来提前预计算动画变化的状态，然后将变化的部分尽量用`transform` `opacity`重新编写， 从而做到立即响应式的动画。



### 如何把握100ms的窗口期

> 注： 100ms并不是技术上的浏览器的行为，而是用户的反应时间 haha

首先计算出position\scale\opacity的变化，然后用transform\opacity替代，然后用will-change来告诉浏览器要发生变化的属性，最后用requestAnimationFrame（在下次重绘前更新动画）来请求执行动画
