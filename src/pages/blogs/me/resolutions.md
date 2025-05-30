---
title: 像素、分辨率、帧率是什么
date: 2025-05-25 21:32:24
hero_image: ''
lang: zh
duration: 1min
---

## 起因

我的笔记本电脑屏幕分辨率最高到 1080P，而且主要是亮度太低，白天阳光好的时候，根本看不清游戏里的东西。

然后我这里有个 4K 显示器，画质清晰，亮度也够，按理我把游戏拖到显示器上展示就能解决问题，为什么一直没用起来呢，是因为我发现游戏一到这个显示器上，帧率就会变得很低，画面非常不太流畅，有点不跟手的感觉。

游戏里也有个选择画面分辨率的面板，我发现这个面板的分辨率可选项在显示器和电脑上是不同的，这里读取的就是当前设备支持的分辨率，比如在我的老笔记本上最多能到 1080p，而换到了显示器上最多能到 2k。

然后我把游戏的分辨率调到了最高的那个，还是不够流畅，甚至画面有点被拉伸了，我就研究了下显示器的分辨率

## 像素

首先了解下什么是像素，正如生物由原子构成，像素就是数字图像组成的基本单位。

买相机或者手机拍照的时候，都会标有对应的像素，比如是  2000w  像素的相机、手机，一个像素就背后一个感光元件（photosite），所以它是一个物理上真实存在的东西，按下快门后，通过将光信号转化为电信号，然后电信号被处理成二进制存储（bitmap），所以像`.png` `jpeg`这些文件里存储的都是一些点位信息，  你用  2000w  像素的设备拍出的照片，对应的文件就包含 2000w 个像素点，将这些数字点位信息转化为肉眼图像这个过程是通过看图软件配合显示器完成的

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/54Lq35AmZdY0gl7E/img/082648f0-f03b-4161-ae8e-8648ae61ba39.png)

问题来了  2000w  像素的相机和  2000w  像素的手机拍出来的照片效果一样吗？

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/54Lq35AmZdY0gl7E/img/9928dc9a-5383-4eaa-9ae2-9c96d63af26f.png)

感光元件本身也存在尺寸大小的区别，相机的感光元件尺寸通常更大，捕获的光线更多，相对出片的质量会更高

另外如果用微距镜来放大观察像素，能够发现   像素就是这   红绿蓝一组

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/54Lq35AmZdY0gl7E/img/c4aaab74-f552-4aac-89f3-35df4a04c8b6.png)

当放大时，看到的像素块为什么会变大？

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/54Lq35AmZdY0gl7E/img/8cc5b51a-356f-4db9-ae13-f4594d1da445.png)

默认图片像素和屏幕像素是一一对应的，当图片像素放大时，原本一个屏幕像素渲染的内容   被多个像素块渲染。

缩小则是通过算法，按照缩小比例，暂时减少了图片像素，看起来在缩小

## 分辨率

以下是我们常听的一些分辨率

- 1080p
- 2K
- 4K

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/54Lq35AmZdY0gl7E/img/15e92eb0-bb3a-42cd-8a73-23bec7086569.png)

其中 P 是纵向像素数量

K 是横向像素数量

按照这个标准  1080P 也可以说是 2k

4k 也可以称为 2160P

我们购买显示器主看的参数就是分辨率和尺寸，大尺寸看得爽、高分辨率画面细腻，但是这两个是越大越好吗，哪个指标重要呢？

假设有一台 32 寸的 4k 和 27 寸的 4k，直觉上是分辨率同等的情况下，尺寸越大越好，但其实不是。这里涉及到一个知识点——**ppi**（像素密度   或   每英寸有多少个像素），这个是衡量显示是否细腻的一个标准，PPI 的计算公式如下：

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/54Lq35AmZdY0gl7E/img/da56a53c-e9b5-477b-abc9-29782863852a.png '显示器对角尺寸就是 xxx 寸')

简单来说你把同样的一幅画面放在 32 寸和 27 寸的显示器上，那毫无疑问 27 的密度高，所以 27 寸的观感会更好

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/54Lq35AmZdY0gl7E/img/e3fffd21-c290-4717-b9a6-68a0359357a8.png)

又比如说  32  寸 2k 设备和  24  寸的 1080p 设备，这两台的 PPI 是一样的

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/54Lq35AmZdY0gl7E/img/52b3b014-8a5d-459a-b85a-8b12b1cc5fb0.png)

所以说视觉感受上来说是没有区别的，但是对于设备来说，图形输出压力左边要高于右边，因为他要多输出  （2560\*1440） - （1920\*1080）个像素，也就是硬件支持上也是有区别的

顺便提一下帧率（FPS），帧率也是我们观看视频、动画流畅度的一个指标，那么它和分辨率什么关系？

答案是没关系。分辨率可以想象成一个空间单位，你有一个大房子，里面可以装很多东西，而  fps  是一个时间单位，表示同一时间能展示多少东西。所以为什么高帧率的视频往往存储体积也很大，因为它每秒要展示的内容很多，比如  60fps  就可以理解为每秒展示  60  张图片，所以你就要存这么多内容

## 小结

- K  说的是横向的像素数量
- P  指的是纵向的像素数量
- xxx  寸表示的是显示器的对角尺寸
- PPI，为像素密度，代表画面的细腻程度，FPS  是流畅度

## 那么应该如何设置？

所以话说回来，当我游戏里设置了 2k，显示器的分辨率最好也调成 2k，就是要调成一样的，如果不同就会有一下两种情况：

- **游戏分辨率低于屏幕分辨率**：其实对应上边说的放大操作，我们游戏画面会被拉伸以填满屏幕，可能会导致画面模糊、细节丢失。例如，用 2560×1440 的显示器运行 1920×1080 的游戏，画面会被放大，清晰度会下降。
- **游戏分辨率高于屏幕分辨率**：对应缩放，游戏画面会被压缩以适应屏幕，可能会出现画面细节无法完全展现的情况。

所以游戏最高能选择  2k，那我也得把显示器的分辨率调成  2k  才能匹配上，   然后即使都调成 2k 帧率还是不佳为啥呢，就是上边提到的硬件问题了，因为我的笔记本最高也就支持 1080P，输出 2k 有点太难为人了，而且调整分辨率并不是说关闭一些像素的显然，而是进行缩放，所以  4k  的像素点变成  2k  每个更大的像素了，对于硬件来说压力也是翻倍的
