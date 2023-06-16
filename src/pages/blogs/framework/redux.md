---
title: redux使用记录
date: 2023-06-16 16:42:50
hero_image: ''
lang: zh
duration: 25min
---

## 前言
团队bizcook系统需要贡献，基于目前技术栈，我们一开始并没有选用ice官方的状态管理方案，自行引入的redux,当然ice内置的也是redux，但是使用上就没有了framework带来的封装便利，但是目前的使用方式还不是最佳，所以这篇文章就记录一下从[官网](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)学到的最佳实践，毕竟架构好才能让这个项目使更多的人参与进来。

## 推荐的官方库
当前使用了相关的包有`redux` `redux-react-hook` `redux-thunk`（中间件），基本上都不是官方文档中使用的，所以这里需要重构一下，看看api使用是否兼容，并且现在还不支持redux devtool来监听状态变更
- **[react-redux](https://react-redux.js.org/)** 官方包，通过它可以让react组件和store进行交互，它和redux的区别就是，redux是framework agnostic的，也就是可以和任何框架进行兼容，react-redux则是更针对于react
- **[redux toolkit](https://redux-toolkit.js.org/introduction/getting-started)** 里面包含编写redux逻辑需要的一些api
- **[redux devtool](https://github.com/zalmoxisus/redux-devtools-extension)**  用于查看状态变更


## 相关术语
### lifting state up
>https://reactjs.org/docs/lifting-state-up.html

这个概念很简单，官方的解释如下：
>In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it. This is called “lifting state up”. 

当我们不借助store来实现状态共享，我们必须把需要共享的状态放到最近的祖先元素的props上。
### reducer
为什么叫reducer? 在原生js中，数组有一个方法`Array.reducer`,这个方法传入一个回调函数，一个初始值，回调函数的两个参数分别是`prevState`和`currentState`，reduce本意就是减少，我们可以理解为经过reduce回调处理，我们最终把数组整合成了一个值

在store中也是同样的，reducer接收两个参数，一个state,一个action，state当然可以理解为处理之前的state，action就是对应的payload，最终处理完返回一个新的state

### selectors
用来从store里获取某个固定的值

### 中间件
### thunk
我们通过redux-thunk来处理异步请求。
什么是thunk？thunk其实就是一个高阶函数，传入函数，返回函数。在这里可以理解为一坨执行delay工作的代码。

### 最佳实践
> https://redux.js.org/style-guide/style-guide

1. 永远不要修改state, 也就是对于state，我们一定是在基于它的拷贝上进行修改，如果使用了`immer`这种库，我们可以使用mutable的写法，因为它内部会帮助我们进行处理
2. reducer中不能包含副作用。 比如ajax,settimeout,promises,生成随机值的方法, Date.now() Math.random(), 这个视情况来定，比如console.log 理论上也是有副作用的，但是不会对实际结果造成影响。
3. 一个项目只存在一个Redux实例。 理论上，我们只需在根组件上引入store，然后注入到组件树上即可，