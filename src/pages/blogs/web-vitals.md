---
title: chrome performance 指标
date: 2021-07-19 20:22:40
hero_image: ''
lang: zh
duration: 25min
---

## 性能常见指标

### CLS(cumulative layout shift)
- 定义：累计布局位移，渲染时不期望出现的ui位移
- 占比（在web performance中的占比，下同）：5%
- 衡量：用户体验
- 期望：CLS越低越好
- 阈值：
    Good - nothing to do here = CLS of 0.1 or less.
    OK, but consider improvement = CLS between 0.1 and 0.15.
    Longer than recommended = CLS between 0.15 and 0.25.
    Much longer than recommended = CLS of 0.25 or higher .
- 提升手段：
    固定图片、视频的宽高等维度信息


### FCP(First content paint) 
- 定义：从页面加载到第一个像素点被渲染出来
- 占比：15%
- 衡量：页面加载速度
- 期望：越快越好
- 区别：First Paint是比如背景色加载出来就算，但是不具有代表性
- 阈值：
    Good - nothing to do here = FCP time of 934 milliseconds or less.
    OK, but consider improvement = FCP time between 934 and 1205 milliseconds.
    Longer than recommended = FCP time between 1205 and 1600 milliseconds.
    Much longer than recommended = FCP time higher than 1600 milliseconds.
- 提升手段：
    减少初始接口响应时间，合理利用cdn，静态资源缓存，重要的资源进行预取
    减少阻塞主进程渲染的资源，把`script` `link`标签尽可能放到dom的底部，最后去处理
    减少接口请求的数量，和payload的体积

### LCP(Largest Content Paint)
- 定义：在用户可视范围内，最大元素渲染到页面上需要的时间
- 占比：25%
- 衡量：页面加载速度
- 期望：越快越好，良好的LCP会给用户一种页面加载速度很快的感觉
- 阈值：
    Good - nothing to do here = LCP of 1200 milliseconds or less.
    OK, but consider improvement = LCP between 1200 and 1666 milliseconds.
    Longer than recommended = LCP between 1666 and 2400 milliseconds.
    Much longer than recommended = LCP higher than 2400 milliseconds.
- 提升手段：
    减少初始接口响应时间，合理利用cdn，静态资源缓存，重要的资源进行预取
    减少阻塞主进程渲染的资源，把`script` `link`标签尽可能放到dom的底部，最后去处理
    压缩视频、图片，因为大多数large资源都是图片、视频

### SI(Speed Index)
- 衡量：页面加载速度
- 期望：越快越好
- 方法：通过逐帧检测页面加载情况，会根据当前页面的完整度进行评分
- 占比：15%
- 阈值：
    Good - nothing to do here = SI of 1311 milliseconds or less.
    OK, but consider improvement = SI between 1311 and 1711 milliseconds.
    Longer than recommended = SI between 1711 and 2300 milliseconds.
    Much longer than recommended = SI higher than 2300 milliseconds.
- 提升手段：
    减少js执行时间
    移除没有使用的js（tree shaking）
    大的第三方库可以考虑external

### TBT(Total Block Time) 50ms
也就是**主线程**被阻塞的总时长，我们知道，通过主线程解析html，构建DOM，执行css\js，处理用户事件或其他任务，但是有一些**Long Task（执行时间超过50ms的任务）**会阻塞我们的主线程，从而造成页面卡顿，
因为主线程无法终止正在执行中的任务

计算公式就是 Sum(所有long task执行时间 - 50ms)
- 占比：25%
- 阈值
Good - nothing to do here = TBT of 150 milliseconds or less.
OK, but consider improvement = TBT between 150 and 224 milliseconds.
Longer than recommended = TBT between 224 and 350 milliseconds.
Much longer than recommended = TBT higher than 350 milliseconds.

- 提升TBT的方法
1) Reducing JavaScript execution time
2) Minimizing main-thread work
3) Removing unused JavaScript
4) Reducing the impact of third-party code
5) Replacing large JavaScript libraries with smaller alternatives

### TTI（Time To Interactive） 5s
- 占比：5%
顾名思义，也就是页面可进行交互需要的时间。
那么如何测量呢，谷歌定义为：如果主线程在长达**5s**时间内没有long task,我们就认为页面可交互
- 阈值
    Good - nothing to do here = TTI of 2468 milliseconds or less.
    Ok, but consider improvement = TTI between 2468 and 3280 milliseconds.
    Longer than recommended = TTI between 3280 and 4500 milliseconds.
    Much longer than recommended = TTI higher than 4500 milliseconds.