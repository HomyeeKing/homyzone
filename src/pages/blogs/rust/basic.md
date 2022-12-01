---
title: rust 基本概念
date: 2022-11-25 14:46:43 # sj
hero_image: ''
lang: zh
duration: 10min
---

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
while 书写方式类似if 不再赘述
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

其实学rust最想搞清楚的是这些关键字，比js要丰富很多, 这里做一些类比

首先我们需要了解下模块系统，毕竟最终的场景是一个高复杂度的场景，模块化必不可少，我们来看下如何组织一个模块吧。

## 模块系统
> https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html#modules-cheat-sheet

写过js知道，我们通过import export 来连接各个模块，js里叫每个模块也会有一些不被导出的变量、方法，rust也是一样的，只不过写法会有不同，我们通过编译流程从入口文件开始看，


### 入口文件
我们知道一个npm包的入口文件是通过`package.json`的`main`/`module`/`exports`等字段指定的，对于rust，有个专属名词叫`crate root`
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
我们看到 相比于node默认查找`index.js`, rust默认查找`mod.rs`
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
顾名思义就是通过路径的方式来使用某个特定方法、类型，只不过通过`::`来作为分隔符，比如`vegetables`里声明了一个type`Asparagus`, 且在同一个crate也就是包里，那么我们可以这样引用
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
上边那个path to code有点长了，在一个作用域内，可以使用**use** 来创建一个简写，比如`use crate::garden::vegetables::Asparagus;`, 以后直接用 `Asparagus`就行了

也就是把path to code简化成对应的目标类型(最后一个单词)
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

也可以re-exporting, 就是通过`pub use`

上边说的都是crate内部的引用，如何引入外部的包呢，首先也得通过`cargo add xxx`添加依赖

```rs
// 比如这个依赖叫rand
use rand::Rng;

fn main() {
   let secret_number = rand::thread_rng().gen_range(1..=100);
}

```

如果想引用多个可以, 包括自身，然后里边可以继续进行path to code 
```rs
use rand::{Rng,thread_rng, self};
// 还可以引入全部 public的内容
use rand::*；
```

### publich vs private
公有私有mod，这两个关键字很常见了，`private`的mod则不能被外部访问，默认是`private`的


| rust 关键字| js对应的关键字| 含义|
|--- | ---| ---|
|use | import | 导入|
|use | import | 导入|

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
