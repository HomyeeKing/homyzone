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

另外`&str`类型表示的是一个不可变的 UTF-8 字符串切片，也就是内容不可变
```rs
fn main() {
    let s = "hello";
    s[0] = 'H'; // 报错：`&str` 类型的变量内容不可变
}
```

而`String` 类型表示可变的 UTF-8 字符串，也就是说，String 类型的变量既可以指向一个固定的字符串，也可以动态地改变其值。
```rs
fn main() {
    let mut s = String::from("hello");
    s.push_str(", world!");
    println!("{}", s);  // 输出：hello, world!
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


# 静态链接 动态链接

静态链接是指将库文件的代码直接复制到可执行文件中，使得可执行文件中包含了全部所需的代码和数据，不再需要外部的库文件支持。

而动态链接是指可执行文件与库文件保持分离，运行时需要动态加载库文件。

在 Rust 中，使用静态链接可以将依赖库直接链接到应用程序中，从而减小应用程序的体积，同时也可以减少应用程序对系统环境的依赖。具体的原理如下：

编译器会将 Rust 应用程序编译为目标平台的机器码，同时生成一个符号表（Symbol Table），记录了应用程序所需的符号（比如函数、变量等）及其在可执行文件中的位置。

在编译时，Rust 编译器会将应用程序所需的库文件的代码直接复制到可执行文件中，并将符号表中对应的符号指向库文件中复制的代码段。

在运行时，操作系统加载可执行文件，并根据符号表中的信息找到对应的符号，执行库文件中复制的代码段。

因此，在静态链接的情况下，应用程序无需依赖外部的库文件，可以直接运行，从而减小了应用程序的体积，同时也减少了应用程序对系统环境的依赖。对于需要在不同的机器上运行的应用程序，使用静态链接还可以减少部署和配置的工作量，提高应用程序的可移植性。但是，静态链接的缺点是会增加可执行文件的体积和加载时间，并且不易更新库文件。

# move

转移所有权，主要用于闭包，move 关键字是用来修改闭包的行为的，把对变量的所有权转移给闭包。

```rs
fn main() {
    let x = vec![1, 2, 3];
    let add = move |n| {
        x.iter().map(|i| i + n).collect::<Vec<_>>()
    };
    println!("{:?}", x); // fail, 因为闭包已经把变量x的所有权获取了 外边无法再使用x了
    let result = add(10);
}
```