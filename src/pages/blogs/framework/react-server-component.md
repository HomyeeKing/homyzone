---
title: React Server Component
date: 2022-12-12 15:10:02
hero_image: ''
lang: zh
duration: 10min
---


#  server component是什么
顾名思义是在服务端渲染的组件，服务端处理后，正如我猜想的那样, 这里返回的是vdom，当你打开source面板的时候，你会发现server component的资源并不在其中，因为他们是不存在于客户端的js bundle中的，只是由服务端渲染返回，返回一个完整上下文(无论是你使用了什么第三方依赖)让客户端进行最终的展示。它的好处如下：

- 不增加bundle size，可以打开source panel进行查看，里面不会看到任何服务端组件的内容
- 运行在服务端，可以利用好服务端的能力，比如像文件操作，数据库操作这些，可以直接处理。
- 懒加载的
- 客户端组件和服务端组件可以混合使用 

# shared component
共享组件是可以运行在服务端和客户端的，并且拥有着双重限制（即client-only or server-only的功能都不能被使用），应用场景如下：

让我们看一个叫`MarkdownRenderer`的组件
- 在客户端，这个组件在用户点击编辑按钮的时候展示，可以借助state做到实时展示
- 在服务端，可以作为渲染内容的组件

shared component是懒加载的，只有在触发的时候才会fetch 

# Q&A
## 区分服务端组件和客户端组件 以及相互引用时的注意事项
要想利用好0 bundle size的能力，我们必须要明确这个组件运行在客户端还是服务端，尽量保证那些大依赖的组件作为服务端组件
通过`"use clent";` 指令来标记组件是一个client-only的组件 默认是server component

服务端组件中引用客户端组件时，要保证props可[序列化](https://beta.nextjs.org/docs/rendering/server-and-client-components#passing-props-from-server-to-client-components-serialization)，当然useEffect useState这些client的hooks也不能被使用

客户端引用服务端组件也有一些限制，因为服务端组件可能涉及一些数据库操作，但是可以通过作为Child或者props使用
因为这些地方的渲染时机要早于client component

## context共享
比如像数据库实例这些 可以使用原生js模块作用域全局单例的能力
像数据请求这种，我们可以就跟着组件里去写就行，不用拆分出来通过props传递，会自动去重，读取cache

## 什么时候使用服务端组件和客户端组件以及共享组件
https://beta.nextjs.org/docs/rendering/server-and-client-components#when-to-use-server-vs-client-components



## 和SSR的区别是什么

SSR是返回一整个文档(DOM)然后让客户端hydrate去渲染，服务端组件返回的则是类似于vdom的信息，里面包含对应组件渲染所需的所有上下文

SSR最主要是用在初始渲染的，我们把复杂的渲染逻辑放到服务端处理然后返回客户端进行hydrate，`Server component`就是运行时是服务端的组件，不一定是首屏出现的，也可以懒加载出现, 即我们可以多次refetch多次

server component 和 SSR 不是对立关系，是可以相辅相成的, 因为server component是被渲染成一种中转格式生成server tree，然后和client tree进行合并, 不会导致客户端状态丢失。所以二者一起使用的时候，server component会生成vdom, 然后SSR再将其生成HTML进行下发，但是js bundle会显著减少




# 参考
- https://beta.nextjs.org/docs/rendering/server-and-client-components#why-server-components
- https://youtu.be/TQQPAU21ZUw
- https://nitayneeman.com/posts/introducing-server-and-shared-components-in-react/#:~:text=Shared%20Components%20are%20components%20that,Client%20Components%20and%20Server%20Components