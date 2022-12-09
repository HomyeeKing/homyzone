---
title: tokio
date: 2022-12-09 14:38:21 # sj
hero_image: ''
lang: zh
duration: 10min
---

tokio是rust的一个异步运行时库，用来处理多线程执行异步代码

# tokio::spawn

`tokio::spawn` 接受一个异步操作来触发一个新的任务来执行，在不同的操作系统线程上可能会同步执行，所以，一个任务线程里必须不能存在borrowed的变量

```rs
let handle = tokio::spwan(async {
 // return value
 "return value"
});
```

# tokio::select!
类似于`Promice.race`, 接受多个分支，哪个先运行完就执行对应的handler，其他的则会被丢弃。

这些分支运行跟编写顺序无关，而是*随机的*，并且是运行在**同一个任务**上的，所以里边的执行都是异步的

## ?
`?` 操作符用来传递错误

## Borrowing
记住一个黄金法则： 
- 多个异步表达式可以`immutably`借用数据，或者
- 一个异步表达式里可以`mutably`借用一个数据

比如
在下面这个pattern里，因为在匹配分支的时候会一个接一个的match，所以这里我们使用的data是一个不可变的
```rs
async fn race(
    data: &[u8],
    addr1: SocketAddr,
    addr2: SocketAddr
) -> io::Result<()> {
    tokio::select! {
        Ok(_) = async {
            let mut socket = TcpStream::connect(addr1).await?;
            socket.write_all(data).await?;
            Ok::<_, io::Error>(())
        } => {}
        Ok(_) = async {
            let mut socket = TcpStream::connect(addr2).await?;
            socket.write_all(data).await?;
            Ok::<_, io::Error>(())
        } => {}
        else => {} // 可以有else
    };

    Ok(())
}
```

但是在handler里，`select!`会保证只有一个Handler执行，所以我们在hanlder里可以使用可变的值

## 循环
`select!`经常会和循环一起使用，比如接受channel数据，我们就可以接受多个channel的值，每次循环保证每个channel的值都有被用到

## pre-condition
```rs
下面的`c=false` 就是一个预判断，这个条件不满足整个branch就会被忽略
tokio::select!{
  a=b,if c = false{  
    // ...
  }
}
```