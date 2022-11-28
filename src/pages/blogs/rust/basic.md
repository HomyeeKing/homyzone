---
title: rust 基本概念
date: 2022-11-25 14:46:43 # sj
hero_image: ""
lang: zh
duration: 10min
---

## 变量
- let
- const
和js不同的是, `let` 和 `const` 默认都是immutable（不可变）的，但是`let`可以通过`mut`这个关键字让变量可变，如
```rs
fn main() {
  let mut x = 5;
  println!("The value of x is: {x}");
  x = 6;
  println!("The value of x is: {x}");
}
```

`const` 则和js的没啥区别，唯一就是rust是强类型语言，我们除了声明时候要赋值，也要显示标注好数据类型

### overshadow
`let`声明变量的一种特性，这个点比较奇葩，大概意思是：
- 一个变量名可以被多次声明使用，
- 而且可以复用前一个相同变量名对应的值, innerscope里也可以
- 可以变换数据类型

```rs
fn main() {
    let x = 1;
    let x = x + 1;
    println!("The value of x is: {x}");
    {
        let x = x * 2;
        println!("The value of x is: {x}");
    }
    println!("The value of x is: {x}");
    let x = "hello world";
    println!("The value of x is: {x}");
}
```

## 生命周期
> [官方文档地址](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html#validating-references-with-lifetimes)


### thumb rule
在任何语言里，栈上的值都有自己的生命周期，它和帧的生命周期一致。

**借用不能超过值的生命周期。**

在 Rust 中，值的生命周期可分为：
- 静态生命周期：如果一个值的生命周期贯穿整个进程的生命周期，那么我们就称这种生命周期为静态生命周期。
- 动态生命周期：如果一个值是在某个作用域中定义的，也就是说它被创建在栈上或者堆上，那么其生命周期是动态的。
- 分配在堆和栈上的内存有其各自的作用域，生命周期是动态的。
- 全局变量、静态变量、字符串字面量、代码等内容，在编译时，会被编译到可执行文件中，加载入内存。生命周期和进程的生命周期一致，生命周期是静态的。
- 函数指针的生命周期也是静态的，因为函数在 Text 段中，只要进程活着，其内存一直存在。

### lifetime specifier & generic lifetime parameters

lifetime annotation 不会决定一个引用生命周期的长短，只是描述生命周期之间的关系，是否处于相同生命周期等
**Syntax:** 必须以`'`开头 后边一般跟小写字母，尽量保持很短，比如`'a`. 然后放在`&`后面，使用空格和引用类型分开

```rs
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

```rs
fn main() {
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {}", r); //          |
}                         // ---------+
```
右边的注释图列出了`r` 和 `x`的生命周期分别是`'a` 和 `'b` 
很明显上面的代码会摆错 因为r借用的值超过了生命周期

有些情况编译器是无法推断出值得生命周期的，比如
```rs
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}

fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```
虽说字符串的生命周期是静态的，但是作为参数借用后，参数的生命周期是动态的，多个参数之间的动态声明周期也是无法固定的，在上面这段代码中，可能返回`x`or`y`, 对应的是两个不同的生命周期，此时需要我们手动打标，
