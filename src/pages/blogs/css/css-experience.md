---
title: css经验
date: 2021-11-11 17:22:48
hero_image: ""
lang: zh
duration: 1min
---

## 正确使用 margin: 0 auto
>https://stackoverflow.com/questions/4955122/what-exactly-is-needed-for-margin-0-auto-to-work


以下几个条件必须同时满足
- 必须是块级元素
- 不脱离文档流
- 必须定宽


## 文字离顶部元素固定距离
- 给文字部分设置高度
- 通过padding-top来设置距离

通过这种方式可以保持对上下距离一样，不会因为文字部分行数变化影响 下边的距离

## 轮播

代码结构如下
```html
  <div class="show-window">
    <ul class="container">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
```
`.show-window` 这个就是一个展示窗口，所有激活元素就在这里展示

`.container`这个就包含所有要轮播的元素，是一长串，就是通过移动这个元素来控制 切换

**滑动轮播** 

通过`touchStart` `touchEnd`事件来实现，我们这里需要界定一个滑动成功的条件：
- 滑动距离，比如以横轴为例，滑动超过30 就视为滑动成功
- 滑动时间，比如滑动时间小于300ms，就视为滑动成功

这些都可以通过touchEvent来获取到对应的属性