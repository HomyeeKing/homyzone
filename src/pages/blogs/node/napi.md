---
title: napi 工作流程
date: 2023-05-26 14:37:11 # sj
hero_image: ""
lang: en
duration: 10min
---

N-API（Node.js API）是一种用于构建可移植Node.js模块的API，它允许你编写适用于不同版本的Node.js和不同操作系统的原生扩展。其工作流程如下：

编写C++代码，使用N-API的API编写原生扩展。

使用Node.js的C++编译器将原生扩展编译为动态链接库（.node文件），该文件可以与Node.js应用程序一起加载和运行。

在Node.js应用程序中使用require()函数加载原生扩展，并从JavaScript中调用原生扩展中的函数。

原生扩展中的代码使用N-API的API与V8 JavaScript引擎通信，读取和写入JavaScript对象。

原生扩展中的代码可以使用N-API的API处理JavaScript对象，例如创建新的JavaScript对象、读取和设置对象属性、调用JavaScript函数等。