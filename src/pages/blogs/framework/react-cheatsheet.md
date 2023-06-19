---
title: React cheatsheet
date: 2022-09-15 14:48:44
hero_image: ''
lang: zh
duration: 25min
---

记录“手动挡”react 使用上的一些注意事项 以及优化点， 最大可能避免 rerender

## useRef vs useState

两者最显著的区别就是 useState 会触发 rerender，也就是所有 jsx 相关的变量都要用 state 来控制，这样才能控制 view 的更新
包括 props，ref 的变化是不会造成子组件渲染的，所以子组件拿到的值也就是旧的

### Q1： 逻辑一致的情况下，可不可以一个用 state 另一个用 ref ref 那个借助 state 更新

```tsx
const count = useRef(0)

const [count1, setCount1] = useState(0)

// ...

setCount1(count1 + 1)
count.current += 1
```

可以 但没必要，react 会自动合并 setState, 另外当下是一致的，真要出问题排查到猴年马月

### Q2: 子组件的 state 依赖父组件传入的变量，props 变更，会自动更新吗？

我一直以为是会的，但是并不会。。。

```tsx
// parent.tsx
const [count, setCount] = useState(0)
useEffect(()=>{setTimeout(()=>setCount(count+1),1000)},[])
<Child count={count} />

// Child

({count})=>{
 const [data, setData]=useState(count)
console.log(data) //  始终是0

// 除非添加useEffect来手动set一遍 useRef同理
}

```


## React.memo()
> 参考链接： https://dmitripavlutin.com/use-react-memo-wisely/

这个api会通过浅比较前后两个props是否发生变化，如果没有就会复用上一次的渲染结果，这就需要保证
- 纯组件  即相同的props总会返回相同的渲染结果
- 组件会经常渲染 但是props不会总变，不然每次props的比较也会浪费时间
- 渲染结果比较大 才值得去缓存

### 将不变的部分抽离出来
当然基于组件本身渲染成本很大的情况
比如组件需要三个props分别是a b c
a是服务端动态获取的数据，b、c不变，那么我们可以把b c涉及到的部分抽离出来 作为一个memorized组件

### 什么时候不要用
组件本身很轻巧的话 就不用考虑使用React.memo(), 没有显著收益的时候不要用，就像那句谚语所说，螺丝能用就没必要换新的
反之可能就会起到反效果

### React.memo() w/ useCallback
假设属性中有一项是函数，那么如果不缓存这个函数 那么每次渲染就会重新创建一个函数实例，那么对于引用值来说 浅比较自然每次都返回false，自然memo也就失去了意义，所以建议用useCallback包一下

### hooks in memo
当然 state的变更依然会触发memo组件的rerender


## useCallback
> 参考链接：https://dmitripavlutin.com/dont-overuse-react-usecallback/

我们总会在一个组件里写几个函数 来处理事件或执行其他操作，组件每次重新渲染的时候就会重新创建一份函数，useCallback就是为了让函数在每次rerender的时候保持同一份。 但是并不是所有的函数都必须或者有必要用useCallback来包裹，一些小的inline function 也是可以接受的，因为这并不会带来什么昂贵的开销，反而可能适得其反，因为所有的这些“记忆”相关的操作都少不了一些比较，这些比较就是额外的开销，所以本质上就是衡量比较和重新创建之间的开销问题

什么时候我们必须、最好使用呢？
- memo组件里有一个函数的属性，那么这就有必要保持函数始终是同一份实例
- 当这个函数是作为useEffect的一个依赖项
- 函数有一些内部状态，比如函数是debounced 或是 throtted的


## This Suspense boundary received an update before it finished hydrating.
https://www.reddit.com/r/nextjs/comments/yxa87v/im_glad_im_not_the_only_one_that_thinks_this/