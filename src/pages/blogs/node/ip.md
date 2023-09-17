---
title: node.js获取本机ip
date: 2023-09-03 19:33:33
hero_image: ''
lang: zh
duration: 10min
---

在 Node.js 中使用 `os.networkInterfaces()` 方法可以获取到当前操作系统上的网络接口信息，包括每个接口的 IP 地址、子网掩码、网关等。

`os.networkInterfaces()` 返回一个对象，其中每个属性都代表一个网络接口，属性的值是一个数组，包含了该接口的多个 IP 地址和相关信息。一个网络接口可以有多个 IP 地址的情况，例如一个接口同时具有 IPv4 和 IPv6 地址。

在某些情况下，一个网络接口可能会有多个 IP 地址，例如：

多个网络地址：一个网络接口可能配置了多个 IP 地址，每个 IP 地址代表该接口的一个网络地址。这在多网卡或多个网络接口的情况下比较常见。

IPv4 和 IPv6 地址：一个网络接口可能同时配置了 IPv4 和 IPv6 地址，以支持不同的网络协议版本。

因此，在调用 `os.networkInterfaces()` 方法时，你可能会看到多个 IP 地址。这些 IP 地址对应于不同的网络接口或网络地址类型。

需要注意的是，`os.networkInterfaces()` 方法只提供了当前操作系统上网络接口的信息，而不涉及网络连接的具体细节或其他远程主机的 IP 地址。如果你需要获取本地网络中其他主机的 IP 地址，需要使用其他技术或工具，如网络扫描工具或通过网络连接信息来获取。

# 网络接口介绍

## utun3

`utun3` 是 macOS 上的一种网络接口，它是一种虚拟网络接口类型。utun（Universal Tun/Tap）接口是为了支持 VPN（Virtual Private Network）等虚拟网络连接而创建的。

`utun3` 表示第三个 utun 接口，它的确切含义和用途取决于你的系统配置和当前的网络连接状态。一般来说，utun 接口的命名方式是按顺序递增的，例如 utun0、utun1、utun2、utun3 等。

## en0

在 macOS 上，en0 是指网络接口的名称，通常对应于本地计算机的物理网卡（即以太网卡）。在某些情况下，en0 可能会有多个 IP 地址。

有两个 IP 地址与 en0 相关的常见情况有：

- IPv4 和 IPv6 地址：en0 可以同时配置 IPv4 和 IPv6 地址，以支持不同的网络协议版本。IPv4 是传统的因特网协议版本，而 IPv6 是下一代因特网协议版本。因此，en0 可以分别有一个 IPv4 地址和一个 IPv6 地址。

- 多个网络地址：en0 可能会配置多个 IP 地址，每个 IP 地址代表了一个网络地址。这在多网卡或多个网络接口的情况下比较常见。例如，在某些网络配置中，en0 可能会连接到本地局域网（LAN）和外部广域网（WAN）两个不同的网络，并分别获得一个 IP 地址。

# 代码示例

node.js 获取本机 ip

```js
const os = require('node:os')
const nets = os.networkInterfaces()
const results = {}
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      if (!results[name])
        results[name] = []

      results[name].push(net.address)
    }
  }
}
console.log('results', results)
```
