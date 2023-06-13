---
title: rust 基本概念
date: 2022-11-25 14:46:43 # sj
hero_image: ''
lang: zh
duration: 10min
---

[[toc]]

## 变量

- let
- const
  和 js 不同的是, `let` 和 `const` 默认都是 immutable（不可变）的，但是`let`可以通过`mut`这个关键字让变量可变，如

```rs
fn main() {
  let mut x = 5;
  println!("The value of x is: {x}");
  x = 6;
  println!("The value of x is: {x}");
}
```

`const` 则和 js 的没啥区别，唯一就是 rust 是强类型语言，我们除了声明时候要赋值，也要显示标注好数据类型，而且变量名规范是大写字母加下划线

```rs
fn main() {
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
}
```

### overshadow

`let`声明变量的一种特性，这个点比较奇葩，大概意思是：

- 一个变量名可以被多次声明使用，
- 而且可以复用前一个相同变量名对应的值, innerscope 里也可以
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

## 数据类型

rust 作为一个强类型语言，我们必须显式的标记对应变量类型来帮助编译器做一些静态检查，当然编译器有一些基本的推断能力，但作为开发者白盒化总是能够避免一些 bug。因此熟悉每种类型及其区别对于我们编写 rust 代码甚至其他强类型代码都十分有帮助。

### 标量类型

在 js 里我们会分为基本类型和引用类型，区别就是前者通过值访问，后者通过引用(指针)去访问

同样在 rust 里，有四个主要的**标量类型**：
整型、浮点型、布尔、字符串

但是不像 js 那么粗糙，你可能在其他编程语言也见过，每种类型可以精确的指定其所占范围，

#### integer（整型）

整型就是整数，在计算机里又分为有符号整数和无符号整数(就是决定要不要拿末位作为符号位 0 正 1 负)，计算机里有符号数采用补码表示，如以 i8 为例

```bash
-1 对应的
原码：1000 0001
反码：1111 1110 # 正数反码与原码相同；负数符号位不变，其他位取反
补码：1111 1111 # 正数的补码与原码相同，负数的补码为反码+1
# 补码计算方式为 -128 + 64 + 32 + 16 + 8 + 4 +2 + 1 = -1
```

| Length  | Signed       | Unsigned |
| ------- | ------------ | -------- |
| 8-bit   | i8           | u8       |
| 16-bit  | i16          | u16      |
| 32-bit  | i32(default) | u32      |
| 64-bit  | i64          | u64      |
| 128-bit | i128         | u128     |
| arch    | isize        | usize    |

对应区间是(n 是位数)：

- 有符号 [-(2^(n - 1)) , 2^(n - 1) - 1]
- 无符号 [0, 2^n - 1]

`arch` 表示这个位数取决于程序运行电脑的架构是 64-bit 还是 32-bit

如何处理值溢出呢？
无符号溢出，模除区间最大值，比如`u8` 最大能表示的值是 255，如果我们赋值 256，256 % 256 = 0

有符号溢出，正常计算，采用补码计算方式来获得最终值
在 debug 模式下编译器会报错，但是在`--release`模式下会通过补码回环来处理，即 256 会被处理成 0

#### float-point 浮点型

rust 里分为`f32` 和 `f64`两种，默认是`f64`

这里复习下计算机内部是如何存储浮点数的：
TODO: 计算机讲浮点数分为 `符号位(S)` `指数(E)` `尾数(M)` 三个部分

#### character type

`char` 字符使用单引号来表示，字符串使用双引号来表示

### conpound type

#### 元组类型

```rs
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);
let (a,b,c) = x;  // 可以解构
    let five_hundred = x.0; // 通过 .来访问

    let six_point_four = x.1;

    let one = x.2;
}

```

#### 数组类型

```rs

fn main() {
let a: [i32; 5] = [1, 2, 3, 4, 5]; // i32表示元素的类型，5表示数组长度
let a = [3; 5]; // [3, 3, 3, 3, 3]
}

```

## 函数

关键字是`fn`, 这里也有箭头函数，不必显式地声明返回值，但必须在`->`声明返回值类型

```rs
fn five() -> i32 {
    5 // 注意这里没有分号 代表这是一个表达式，不是一个语句
}

fn main() {
    let x = five();

    println!("The value of x is: {x}");
}

```

## if

```rs
fn main() {
    let number = 3;

    if number < 5 {  // 不用加()
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}

```

if 后面跟的 condition 必须是`bool`类型，不会像 js 存在隐式转换

```rs
if 3 {
  println("true") // error!
}
```

另外`if`可以搭配`let`使用, 但是必须要保证 if else 返回的值类型相同

```rs
fn main() {
      let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}
```

## 循环

有三种方式`loop` `while` `for`

### loop

```rs
fn main() {
    loop { // 死循环
        println!("again!");
    }
// 退出循环
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;  // 通过break退出 后边还可以跟一些操作
        }
    };

    println!("The result is {result}"); // 20

    //  给循环打标
    let mut count = 0;
    'counting_up: loop {  // 必须是单引号开头 可以跟在break 和 continue后边
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;  //
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}
```

while 书写方式类似 if 不再赘述

### for

```rs
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }

    // 还可以搭配range使用
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}

```

## keyword

https://doc.rust-lang.org/book/appendix-01-keywords.html?highlight=use#keywords-currently-in-use

其实学 rust 最想搞清楚的是这些关键字，比 js 要丰富很多, 这里做一些类比

首先我们需要了解下模块系统，毕竟最终的场景是一个高复杂度的场景，模块化必不可少，我们来看下如何组织一个模块吧。

## 模块系统

> https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html#modules-cheat-sheet

写过 js 知道，我们通过 import export 来连接各个模块，js 里叫每个模块也会有一些不被导出的变量、方法，rust 也是一样的，只不过写法会有不同，我们通过编译流程从入口文件开始看，

### 入口文件

我们知道一个 npm 包的入口文件是通过`package.json`的`main`/`module`/`exports`等字段指定的，对于 rust，有个专属名词叫`crate root`

- `src/lib.rs` for library crate
- `src/main.rs` for binary crate

### 声明模块

这里通过`mod` 关键字引入

```rs
mod garden; // 引入一个叫garden的模块

// 查找方式如下：
//  - inline  可以直接后边跟garden的代码  mod garden {} 不跟分号
//  - src/garden.rs
//  - src/garden/mod.rs
```

我们看到 相比于 node 默认查找`index.js`, rust 默认查找`mod.rs`

### 声明子模块

除了`crate root`之外，在其他模块里我们都可以声明子模块, 其实也就是在上边提到的模块里再声明模块，这个模块就是子模块，接着刚才的例子：

```rs
// src/garden.rs
mod vegetables;

// 查找方式如下：
// - inline mod vegetables {} 不跟分号
// - src/garden/vegetable.rs
// - src/garden/vegetables/mod.rs
```

### path to code

顾名思义就是通过路径的方式来使用某个特定方法、类型，只不过通过`::`来作为分隔符，比如`vegetables`里声明了一个 type`Asparagus`, 且在同一个 crate 也就是包里，那么我们可以这样引用
`crate::garden::vegetable::Asparagus`

同样这里也有相对路径和绝对路径，`crate::`就相当于根目录，我们同样可以使用相对路径来引入模块比如

```rs
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}

```

### **use** 关键字

上边那个 path to code 有点长了，在一个作用域内，可以使用**use** 来创建一个简写，比如`use crate::garden::vegetables::Asparagus;`, 以后直接用 `Asparagus`就行了

也就是把 path to code 简化成对应的目标类型(最后一个单词)
`::` 也就相当于解引用、具名引用
然后也可以通过`as`来进行别名

```rs
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // --snip--
    Ok(())
}

fn function2() -> IoResult<()> {
    // --snip--
    Ok(())
}
```

也可以 re-exporting, 就是通过`pub use`

上边说的都是 crate 内部的引用，如何引入外部的包呢，首先也得通过`cargo add xxx`添加依赖

```rs
// 比如这个依赖叫rand
use rand::Rng;

fn main() {
   let secret_number = rand::thread_rng().gen_range(1..=100);
}

```

如果想引用多个可以, 包括自身，然后里边可以继续进行 path to code

```rs
use rand::{Rng,thread_rng, self};
// 还可以引入全部 public的内容
use rand::*；
```

### publich vs private

公有私有 mod，这两个关键字很常见了，`private`的 mod 则不能被外部访问，默认是`private`的

## struct 结构体

之前接触过 c 的同学应该对结构体不是很陌生，用来组织相关属性，类似于 java 和 ts 的 interface，同样可以通过`.`操作符进行访问

```rs
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
   let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");
}

```

类似于 js 的对象一样，可以省略操作符, 比如`email:email` 可以简写成`email`,
同样还有`...email` 来简写剩余属性

还有一种不跟任何属性的 struct,

```rs
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```

### 如何打印 struct

需要一个宏

```rs
#[derive(Debug)] // 只能跟着struct用
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {:?}", rect1);
}

```

## Traits

> https://doc.rust-lang.org/book/ch10-02-traits.html

抽象类
这个名词在看文档的时候见到过很多次，同时`trait`也是一个关键字，文档也专门有一章来介绍，类似于其他语言的 interface，用来定义一组通用行为，目前看来好像是分工处理了，`trait` 用来定义方法 `struct` 用来定义字段属性，不像`interface`那样都可以定义，类似于 java 里的抽象类

可以为某个`struct`实现一个`trait`, 但是必须要注意**trait 和 struct 必须有一个和 aggregator 处于同一个作用域**

```rs
pub trait Summary {
    fn summarize(&self) -> String;
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

现在`Tweet` 和 `NewsArticle` 都实现了 `Summary`这个 trait，但是我们在使用的时候，还是需要把 trait 引入到当前 scope 的， 这里需要一个聚合器`aggregator`

```rs
use aggregator::{Summary, Tweet};

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    };

    println!("1 new tweet: {}", tweet.summarize());
}
```

另外 trait 还可以提供默认的 implementation, 这样可以缺省, 填入空的 impl 块 `impl Summary for NewsArticle {}`，当然 struct 里也可以进行 override 覆盖

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
很明显上面的代码会摆错 因为 r 借用的值超过了生命周期

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

## macro 宏

宏命令，上学的时候就听过这个名词，一直没搞懂这是干啥的，C 里也有这个功能，简单来说，宏就是一组功能的集合。
分为以下三种：

- 自定义宏 `#[derive]` 在 structs 和 enums 上使用
- 类属性的宏，看起来像属性，用在任意 item 上
- 类函数的宏，看起来像函数调用，

### 宏和函数的区别

- 函数签名必须声明参数及其对应的类型，是固定的， 宏的话可以接受一组可变的参数， 像`println!()` 可以接收 1 或 2 个参数
- 另外宏命令属于元编程，实际生产出来的代码会比我们写的要多，在编译器开始解释代码的时候，宏命令就会被展开，所以一个宏可以在某个 type 上实现一个 trait；函数就不行了，函数在运行时被调用，trait 必须在编译期间就已经被开发好

宏的缺点就是开发起来要复杂的多，很难读且难维护，而且使用的时候必须要引入到当前作用域中，不像函数可以到处被调用、声明

## derive

`derive`会自动给指定数据结构添加新的 item，可以列出一组 traits 来自动 impl,比如

```rs
#![allow(unused)]
fn main() {
#[derive(PartialEq, Clone)]
struct Foo<T> {
    a: i32,
    b: T,
}
}

```

等同于

```rs
#![allow(unused)]
fn main() {
struct Foo<T> { a: i32, b: T }
impl<T: PartialEq> PartialEq for Foo<T> {
    fn eq(&self, other: &Foo<T>) -> bool {
        self.a == other.a && self.b == other.b
    }

    fn ne(&self, other: &Foo<T>) -> bool {
        self.a != other.a || self.b != other.b
    }
}
}

```

## error handle

> 参考文档 https://rust-cli.github.io/book/tutorial/errors.html

针对于[Result](https://doc.rust-lang.org/1.39.0/std/result/index.html)类型,

```rs
enum Result<T, E> {
   Ok(T),
   Err(E),
}
```

### unwrapping

看文档的时候经常会看到有些方法调用的时候会跟着`.unwrap`, 这个是用来处理 error case 的，
比如我们读取某个文件，当文件不存在的时候我们想让程序直接退出，
以往是通过`match`语句的`Err`分支上使用`panic!`处理， 这样比较繁琐，也可以用`.unwrap`来简单处理。
相当于获取`Result<T,E>`里的 T
`let content = std::fs::read_to_string("test.txt").unwrap();`

### 使用 return 来处理错误

我们也可以使用 return 来返回错误，但是前提要保证返回值类型满足函数签名的类型以及`match`各个分支的返回值类型相同

### ?

正如`.unwrap`是 `match + panic!`的简写
`?`是 `match + return`的简写
`let content = std::fs::read_to_string("test.txt")?;`
如果对应语句报错，就会 return `Err`, 否则就会`unwrap`对应的值, 不过要注意的是**只能在函数返回类型是 `Result` or `Option`的函数里调用**

## 闭包

语法：
`|arg1, arg2, ...| expression`

```rs
use std::process::Command;

fn main() {
    let commands = vec![
        "echo hello",
        "echo world",
        "ls -l",
    ];

    let handles: Vec<_> = commands.into_iter().map(|command| {
        std::thread::spawn(move || {
            let mut child = Command::new("sh")
                .arg("-c")
                .arg(command)
                .spawn()
                .expect("failed to execute command");

            let status = child.wait().expect("failed to wait for child");

            println!("command {} exited with status {:?}", command, status);
        })
    }).collect();

    for handle in handles {
        handle.join().unwrap();
    }
}

```

在 Rust 中，闭包的类型是一个匿名结构体，它实现了一个特定的函数类型 Trait，因此可以像普通函数一样被调用。例如，在上述代码中，闭包被传递给 map 方法，map 方法会对列表中的每个元素调用闭包，然后返回一个新的列表。

闭包在 Rust 的函数式编程中非常常用，可以用来实现函数的柯里化（Currying）、高阶函数（Higher-Order Functions）等功能。

**其实就是回调函数在 rust 里就是用闭包这种语法来写**

## Error Handle

rust 将异常分为 可恢复异常 和 不可恢复异常，分别对应`Result<T,E>` 和 `panic!`宏来处理
