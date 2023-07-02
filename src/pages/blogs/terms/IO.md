---
title: I/O密集型和CPU密集型
date: 2023-06-26 16:33:47
lang: zh
duration: 1min
---

# I/O
I/O（输入/输出）包含了计算机系统中所有数据输入和输出的过程，包括但不限于网络 I/O、文件 I/O、标准输入输出、内存映射、管道等等。

其中，网络 I/O 是指计算机通过网络接口与其他计算机进行数据交换的过程，例如 TCP/UDP 网络编程、HTTP 通信等；文件 I/O 是指计算机通过文件系统与存储设备进行数据交换的过程，例如读取/写入文件、创建/删除目录等；标准输入输出是指计算机与用户进行交互的过程，例如从命令行读取输入、向命令行输出结果等。

除此之外，还有一些其他的 I/O 方式，例如内存映射、管道等。内存映射是指将文件映射到内存中，使得文件的内容可以通过内存直接读取和操作；管道是指通过管道将一个进程的输出连接到另一个进程的输入，实现进程间的数据交换。

需要注意的是，不同的 I/O 方式可能在底层实现上有所不同，因此在实际编程过程中需要根据具体的需求和场景选择合适的 I/O 方式，并处理好可能出现的错误和异常情况。

# CPU密集型
如果您需要执行多个 CPU 密集型任务（例如计算密集型任务），并且您的机器拥有多个 CPU 核心，则使用多线程可能是更好的选择。在多线程中，每个线程可以独立地执行一个任务，从而提高 CPU 利用率并加速程序的执行。当然，在使用多线程时，您需要考虑线程安全和同步的问题，以避免出现数据竞争和死锁等问题。

# 如何选择

如果您需要执行多个 CPU 密集型任务（例如计算密集型任务），并且您的机器拥有多个 CPU 核心，则使用多线程可能是更好的选择。在多线程中，每个线程可以独立地执行一个任务，从而提高 CPU 利用率并加速程序的执行。当然，在使用多线程时，您需要考虑线程安全和同步的问题，以避免出现数据竞争和死锁等问题。

如果您需要执行多个 I/O 密集型任务（例如网络请求、数据库操作、文件操作等），则使用异步处理可能是更好的选择。在异步处理中，当一个任务被阻塞时，线程可以切换到执行其他任务，从而提高 CPU 利用率并减少等待时间。使用异步处理的另一个好处是，它可以减少线程的创建和销毁成本，从而降低线程池的负担。