---
title: css经验
date: 2021-11-11 17:22:48
hero_image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Subscript_superscript_expert.png"
lang: zh
duration: 1min
---
[[toc]]
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


## font-size

## 区分单位
### em
em是可以动态计算字体大小的单位，相对于父级元素的font-size大小，直到根元素html，一般浏览器默认字体大小是`16px`，所以 1em = 16px

如果
```css
html{
  font-size: 62.5%; // 16 * 62.5% = 10px
}

span{
  font-size: 2em; // 10 * 2 = 20px
}
```

但是em随之带来的一个副作用是`compounding`，比如
```html
<span>Hello <span>world</span></span>
```
按照上边的样式，Hello的font-size为：2em = 2*10 = 20px
world的font-size则为 2em = 2*20 = 40px

所以为了规避compounding,引入了rem

### rem

rem是相对于根元素就是`html`来计算的，我们改一下上边的样式
```css
html{
  font-size: 62.5%; // 16 * 62.5% = 10px
}

span{
  font-size: 2rem; // 10 * 2 = 20px
}
```
这样hello world展示的字体大小就一致了

## line-height 与垂直居中
“行高”顾名思意指一行文字（line box）的高度。具体来说是指**两行文字间基线之间的距离**, 
对于块级元素，设置的是里面 [line box](https://drafts.csswg.org/css-inline/#line-box)的最小高度


所以这里需要元素是[inline-level](https://drafts.csswg.org/css-display-3/#inline-level)的，inline-level的布局包含如下

![generate-box](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650441440245-36a9e4db-0f1b-48a8-893a-f44f8c6a0920.png)


基线在哪里可以查看[此图](https://drafts.csswg.org/css-values-4/images/Typography_Line_Terms.svg)


对于line-height和垂直居中，我们经常听到的一句话是： 对于内联元素，将line-height值设置和盒子高度一样即可实现垂直居中，但近期我的一次遭遇，发现将line-height设置和高度相同的值后，并没有实现垂直居中，反而设置和font-size相同高度后，垂直居中了，所以，是时候认真看下line-height到底做了什么


### 无height 有line-height
line-height对于高度是有作用的，一个元素如果没有设置height（假设也没有padding这些属性），那么起高度作用的就是line-height，可以试验下
```html
<div>
<span>hello</span>
  </div>
  <style>
 div{
      width: 100px;
      font-size: 36px;
      border: 1px solid #000;
      padding: 31px 0;
      box-sizing: border-box;
line-height: 100px;
    }
    span{
      border: 1px solid #000;
    }
</style>
```

![example-1](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650437443663-0175df37-b278-44d2-94c0-0eaee36eb855.png)

可以看到div的高度是`164px` = line-height + padding + border，也可以说明line-height撑起的高度是不受border-box控制的


### height line-height
这个就是常规的场景，line-height设置和height同样的值就能垂直居中了
### 有height padding 如何控制line-height

现在我们给div设置一个100px的高度，然后取消line-height，现在展示如下
```html

<style>
    div{
      width: 100px;
      height: 100px;
      font-size: 36px;
      border: 1px solid #000;
      padding: 31px 0;
      box-sizing: border-box;
/* line-height: 100px; */
    }
  </style>
```

![example-2](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650437940566-c94f499c-9fd5-4c58-bec7-4b820ad1ec58.png)

为什么我们现在设置了padding + font-size + border = height，依然不是垂直居中的呢？我们看看此时的span的line-height 是 50

![example-3](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650439678434-d55191d0-6ef0-424e-8ae2-21e1f2cd9515.png)

而现在div的内容区域也就是content-box则是由font-size撑开的，为36px，
所以这个就是原因，只要我们此时把line-height设置为36px就可以了
由此我们可以得出一个重要结论:

**line-height的值设置为content-box的高度才能实现垂直居中**

所以 此时设置div的 line-height为36px就能实现垂直居中了
![example-4](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650439893828-23a2e70c-b685-4dfb-9fb4-350c050101f9.png)



### 参考
- https://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/

## 倒计时反复横跳问题

如果不是等宽字体的话就会出现这种情况，如果没有指定宽度 或者宽度设置的比最宽的0要小的情况下就会出现被挤出来的情况，所以我们要么引入等宽字体（影响页面加载） 要么通过css来调控  
这里我们借助flex布局来实现等宽，通过space-between来实现均分

## flex容器自适应子元素宽高

属性： inline-flex  
作用：inline-flex 并不是把子元素都变成inline，它是把flex容器变为了inline，容器会根据子元素的宽高进行自适应

## 圆角无法展示

对于视频可替换组件，层级可能都很高，如果在父级元素上设置了圆角没有展示的话 可以用overflow:hidden 来避免子级视频元素遮挡，如果还显示不出来的话，用transform相关的属性来让它们变成合成层，使得处于同一层级

![image](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650007524796-ab78874f-474d-4b06-b35a-e1956561dffb.png) 

## 如何正确使用line-height

![image](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650437940566-c94f499c-9fd5-4c58-bec7-4b820ad1ec58.png) 

![image](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650439678434-d55191d0-6ef0-424e-8ae2-21e1f2cd9515.png) 

![image](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650439893828-23a2e70c-b685-4dfb-9fb4-350c050101f9.png) 

![image](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/24957178/1650441440245-36a9e4db-0f1b-48a8-893a-f44f8c6a0920.png) 

## 如何阻止滚动穿透

![image](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8bdc4f0f-8347-47ed-a034-e4736f51516d/Untitled.png)

chatgpt给出以上四种方案，以overflow:hidden来说，不是直接设置属性就可以解决问题的，首先要确定**滚动容器** 是哪个 ，然后确保高度不要过大，不然容器本身高度很高，那自然就不存在overflow的情况

# 动画篇

## 轮播

曾经困扰我无数次的轮播问题，终于在这次紧急上线的时候彻底搞懂了。  
第一次接触轮播是在网上的教学视频看的，对视频中老师印象很深的一句话就是： 没有什么是一顿饭解决不了的问题，如果不行那就两顿，同理，如果一张图解决不了轮播，那就两张😂。  
虽然对这句话印象很深刻，但是并没有get到为什么要这么做，现在终于明白了，如果要实现这种无限轮播，我们需要在后面插入一张和第一个同样的图片，在最后一张图片**完全**进入屏幕后，我们立马切回第一个，由于首尾相同，肉眼几乎分辨不出，所以可以做到无缝切换。  
小结一下：

*   向后插入一张和第一个相同的图片，此时首尾的图片相同
    

*   当最后一个**完全**（为什么要完全，如果在过渡中我们进行切换的话，那还是会穿帮的） 进入屏幕后，立刻切换到第一个，从而做到无缝切换
    

## dom插入移除的过渡动画怎么加

dom插入的时候，核心是通过**延时**来实现动画效果，无论是通过animation transition 还是js实现，都是要通过延时来处理

dom移除核心要素就是先触发动画，在动画结束的时候再移除dom