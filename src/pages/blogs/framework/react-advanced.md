---
title: react 进阶
date: 2024-01-28 15:19:30
hero_image: ''
lang: zh
duration: 10min
---

# 避免无用的 useEffect

## 当某个值可以基于 state 或 props计算出来，那么无需额外再创建一个state；相反在渲染期间进行计算


```tsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
```

以上代码我们下意识可能想要创建 `fullName` state，但其实是可以直接基于 `firstName` 和 `lastName` 计算出来的。

如果额外写一个state，相当于：
```
1. fullName基于原始的firstName和lastName创建
2. firstName or lastName 有变化
3. fullName 立刻基于最新的值进行二次渲染
4. fullName 这个state变更，会触发组件再次渲染
```

如果你改成渲染期间计算，那么步骤会简化为如下

```
1. fullName基于原始的firstName和lastName创建
2. firstName or lastName 有变化，渲染期间，fullName 会根据最新的state 立刻计算
```

## 缓存耗时较高的计算

这里主要是怎么定义耗时较高，一般是执行时间超过1ms，就可以考虑使用`useMemo`来缓存下了。

可以使用`console.time`来看下耗时，而且建议使用真实的环境来测试

## 怎么重置 state

当 props 的某个值变更后，如果想重置子组件的state, 推荐将这个值作为组件的key，这样可以保证组件重新渲染

## 想清楚代码的执行取决于什么

如果是埋点类的，那么它就取决于页面渲染完成来决定是否上报，那么它放到`useEffect`里是无可厚非的；

但是如果是一些接口调用，那么你就要慎重考虑，你的接口触发是依赖于用户的某个操作 还是依赖于页面挂载

简单来说，如果是依赖于用户的某个操作，那么就放到对应的 handler里；如果是依赖组件展示到页面上，那么就放到 Effect 中

## 禁止 子 -> 父传递数据

保持单项数据流，即 父组件向子组件传递数据