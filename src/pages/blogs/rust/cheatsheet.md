---
title: rust cheetsheet
date: 2022-12-10 16:51:52 # sj
hero_image: ''
lang: zh
duration: 10min
---

# &str 和 String的区别
简言之 `&str` 是 `String`的子集，`&str`代表一个[String Slice]('https://doc.rust-lang.org/book/ch04-03-slices.html'), 

```rs
fn main() {
    let s = String::from("hello world"); // String type
    let hello = &s[0..5]; // &str type
    let world = &s[6..11];
}
```

# borrow rule
- 在任意时刻，只能存在一个mutable的指针或者多个immutable的指针
- reference 必须总是有效(生命周期)

# 如何返回local variable
> https://doc.rust-lang.org/error_codes/E0515.html

在一个函数中创建的变量，rust是不允许返回这个值的引用的，因为它的生命周期仅限于这个函数体，
所以如果你想返回这个本地创建的值，那么返回值类型就不能是`borrowed`， 例如`String`而不是`&str`, `Vec<T>`而不是`&[T]`, `T`而不是`&T`。

相当于把所有权交给了函数调用的地方

参考 
- https://stackoverflow.com/questions/32682876/is-there-any-way-to-return-a-reference-to-a-variable-created-in-a-function

# 当函数参数是一个借用值，怎么处理
首先入参的类型要不要加`&`, 取决于我们的入参变量在函数调用后还要不要被使用，如果不需要的话那就没必要传递指针，直接把所有权转移给函数即可。
```rs
fn test (input: String) -> String{
 
}

fn main(){
  let str = "hello";
  let _str = test(str);
}
```

# 模块导出约定

Many crates contain a prelude, a list of things that are convenient to import all at once. This allows common features of the module to be conveniently accessed without a lengthy prefix. F

一般会提供`prelude`用来导出一些通用feature