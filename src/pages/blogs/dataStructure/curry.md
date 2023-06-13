---
title: 科里化
date: 2023-06-13 10:44:18
hero_image: ''
lang: zh
duration: 1min
---

> 参考: https://zh.javascript.info/currying-partials

# 定义

将函数从可调用的`f(a, b, c)`转换为可调用的`f(a)(b)(c)`

```javascript
function add(...args: number[]) {
  return {
    sum() {
      return args.reduce((a, b) => a + b, 0);
    },
  };
}

function currify(fn) {
  return function curried(...args: number[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...newArgs) {
        return curried.apply(this, args.concat(newArgs));
      };
    }
  };
}

const currifyAdd = currify(add);
// const res = currifyAdd(1)(2, 3).sum();
const res = currifyAdd(1)(2)(3).sum();
console.log('res', res);
```

通过示例代码可以发现，科里化需要被转化的函数有确定的参数个数，不然也不知道需不需要继续透传
