---
title: 浏览器渲染层合成
date: 2022-04-18 22:54:16
hero_image: ""
lang: zh
duration: 10min
---


## 什么是渲染层合成

正常没有任何外在条件干预下（显示的css属性），处于同一层级的元素（z轴相同) 会形成一个渲染层，然后不断堆叠，保证元素的正确显示

`渲染层`是浏览器渲染期间构造的第一个层模型，另外除了处于相同z轴空间的元素会被归并到同一个合成层，对于满足形成层叠上下文条件的渲染对象浏览器也会自动为其创建新的渲染层，常见的情况包括：
```
根元素 document


有明确的定位属性（relative、fixed、sticky、absolute）


opacity < 1


有 CSS fliter 属性


有 CSS mask 属性


有 CSS mix-blend-mode 属性且值不为 normal


有 CSS transform 属性且值不为 none


backface-visibility 属性为 hidden


有 CSS reflection 属性


有 CSS column-count 属性且值不为 auto或者有 CSS column-width 属性且值不为 auto


当前有对于 opacity、transform、fliter、backdrop-filter 应用动画


overflow 不为 visible
```

满足以上条件的元素就会拥有独立的渲染层，但这并不代表这个元素独享整个渲染层，部分不满足以上条件的元素也会和第一个拥有渲染层的父级共享

## 图形层
图形层是一个负责生成最终准备呈现的内容图形的层模型，拥有一个图像上下文，负责输出该层的位图，位图存储在共享内存，在共享内存里将其纹理传给gpu，由gpu将多个位图进行合成，然后绘制到屏幕上, **它主要用来处理合成层**

> 位图(bitmap) 由像素组成，像素可以进行不同的排列和染色构成不同的图样


> 纹理，计算机能以矢量图(vector)或位图(bitmap)格式显示图像，常见的位图格式有PNG，JPG，PSD，GIF等，这些图片并不能直接给计算机显卡使用，如果图片要传输给显卡使用，则必须转换成显卡能够识别的纹理格式，这个在游戏引擎中，会对应自动转换，也可以通过相关的代码设置显式的转换，而纹理格式有RGBA8888（一个像素4个字节） RGBA4444（2个字节）RGB888（3个字节），纹理格式还有压缩格式比如IOS用的PVRTC，Android用的ETC1等


## 合成层

满足某些条件的渲染层会提升成合成层，合成层拥有单独的[图形层](#图形层)，其他不是合成层的渲染层则和第一个拥有图形层的父级公用。
这些特殊条件包含如下：
```
3D transforms：translate3d、translateZ 等


video、canvas、iframe 等元素


通过 Element.animate() 实现的 opacity 动画转换


通过 СSS 动画实现的 opacity 动画转换


position: fixed


具有 will-change 属性


对 opacity、transform、fliter、backdropfilter 应用了 animation 或者 transition
```

所以这也就是我们通常说的开启gpu加速，因为他们有独立的图形层，会交给gpu单独处理

## 隐式合成

上边提到满足特定条件渲染成会提升成合成层，另外还有一种隐式合成即在某些特定条件下会被默认提升为合成层，举例说明一下：

- 两个absolute布局的元素在屏幕上重叠了
![two absolute div](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/9/16daf0c0a871e2e9~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

如果处于下方的元素成为了合成层，那么它的层级就位于主文档（document）的上方，就会造成上边的层级反而降了，所以浏览器为了保持这种层级关系，就会隐式地上边的元素也提升到合成层


## 层爆炸

有了上边提到的隐式合成，试想一个元素上方(z轴)如果包含多个元素，如果它一旦成为了合成层，那么就会凭空产生几千个合成层，就会造成`层爆炸` 
所以消除隐式合成就是要手动控制好层级，避免元素重叠

## 层压缩
对于下面的情况
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/9/16daf0c0d4bf2415~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

如果最底层的元素变成了合成层，根据隐式合成，是不是一下产生了4个合成层，然而事实上不是，浏览器会有层压缩机制，上方的三个div会处于同一个合成层中

## 层合成的利与弊

层合成是一个相对复杂的浏览器特性，为什么我们需要关注这么底层又难理解的东西呢？那是因为渲染层提升为合成层之后，会给我们带来不少好处：


- 合成层的位图，会交由 GPU 合成，比 CPU 处理要快得多；


- 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层；


- 元素提升为合成层后，transform 和 opacity 才不会触发 repaint，如果不是合成层，则其依然会触发 repaint。


当然了，利弊是相对和共存的，层合成也存在一些缺点，这很多时候也成为了我们网页性能问题的根源所在：


- 绘制的图层必须传输到 GPU，这些层的数量和大小达到一定量级后，可能会导致传输非常慢，进而导致一些低端和中端设备上出现闪烁；


- 隐式合成容易产生过量的合成层，每个合成层都占用额外的内存，而内存是移动设备上的宝贵资源，过多使用内存可能会导致浏览器崩溃，让性能优化适得其反。

## chrome devtool 查看层

- 打开devtool
- `command + shif + p` 输入 `show layer` 即可查看

里面包含一些指标：
```

Size：合成层的大小，其实也就是对应元素的尺寸；
Compositing Reasons：形成复合层原因，这是最关键的，也是我们分析问题的突破口，比如图中的合成层产生的原因就是交叠问题；
Memory estimate：内存占用估算；
Paint count：绘制次数；
Slow scroll regions：缓慢滚动区域。
```


## 优化手段

### 1. 尽可能使用transform 和 opacity
### 2. 减少隐式合成
开发的时候注意层级关系，考虑好布局，但是不能盲目通过增大z-index来解决问题，有时候z-index也能隐式合成
### 3. 减少合成层尺寸
这个观点其实还是听新的，以往我们拿到设计稿后，元素有多大我们就会设置多大的宽高，但是有人做过实验，比如
width:100px height:100px的元素，如果改写为width:10px height:10px transform: scale(10)

而且都把他们提升到合成层的情况下，后者占用的内存要小得多，因为transform位于的composite阶段完全在gpu执行，会极大减少合成层带来的内存消耗。


## 参考文章
- https://juejin.cn/post/6844903959425974280#heading-7