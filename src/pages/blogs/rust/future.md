---
title: Future in Rust
date: 2022-12-09 11:09:42 # sj
hero_image: ''
lang: zh
duration: 10min
---

[[toc]]

`Future`对应 js 里的`Promise`, 是一个`trait`

```rs
use std::pin::Pin;
use std::task::{Context, Poll};

pub trait Future {
    type Output; // 返回值的类型

    fn poll(self: Pin<&mut Self>, cx: &mut Context) // 轮询获取最终值
        -> Poll<Self::Output>;
}
```

任何实现了`Future` trait 的都可以通过`.await` 获取最终值

```rs

struct Delay{
  when: Instant,
}

impl Future for Delay{
 use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};
use std::time::{Duration, Instant};

struct Delay {
    when: Instant,
}

impl Future for Delay {
    type Output = &'static str; // 说明返回值类型是字符串

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>)
        -> Poll<&'static str>
    {
        if Instant::now() >= self.when {
            println!("Hello world");
            Poll::Ready("done")
        } else {
            // Ignore this line for now.
            cx.waker().wake_by_ref();
            Poll::Pending
        }
    }
}

#[tokio::main]
async fn main() {
    let when = Instant::now() + Duration::from_millis(10);
    let future = Delay { when };

    let out = future.await;
    assert_eq!(out, "done");
}
}
```

# executor
这个执行器就是负责触发轮询的，来推进任务完成，为了提高效率，我们肯定不能一直实时轮询，cpu会炸，
可以通过*订阅发布模式* ，当接受到信号的时候才进行轮询，这个信号由一个叫`wakers`的东西来发出

# wakers
wakers负责通知对应任务相应资源可用的，让对应的`executor`来执行任务

- rust的异步是一个懒操作，通过轮询来最终完成计算
- 每个future有一个对应的`walker`
- 未完成时，会返回`Poll::Pending`状态，对应的walker也会进行记录
- 为了提高效率，使用订阅发布模式，即当依赖的资源可用时, walker会通知executor执行轮询任务
- 任务获取资源后继续推进完成

# 注意事项
rust的异步模型允许一个future在多个task中传递，所以一旦中间有过切换，就会造成一个future对应多个walker的情况，这种情况下我们要确保`wake`方法要传递给最近调用poll的executor上，因为之前的相当于已经作废了，所以一定要考虑到这种场景，要及时更新对应的waker


