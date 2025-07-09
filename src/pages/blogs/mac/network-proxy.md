---
title: 网络代理配置
date: 2025-07-09 10:25:56
hero_image: ''
lang: en
duration: 5min
---

1. Check the proxy port
Go to `System settings` > `Network` > `Details` > `Proxies`  OR  access by this command:
```bash
system_profiler SPNetworkDataType | grep "HTTP Proxy"
```
you will find the proxied the address like this

```
HTTP Proxy Enabled: Yes
HTTP Proxy Port: 13659
HTTP Proxy Server: 127.0.0.1
HTTP Proxy Enabled: Yes
HTTP Proxy Port: 13659
HTTP Proxy Server: 127.0.0.1
HTTP Proxy Enabled: Yes
HTTP Proxy Port: 13659
HTTP Proxy Server: 127.0.0.1
```
so the proxy is `http://127.0.0.1:13659`

2. Let the `terminal` know the proxy settings
```bash
# for current session
export http_proxy="http://your-proxy-address:port" https_proxy="http://your-proxy-address:port"
```

if you want it permanently, put this into  SHELL_CONFIG like `~/.zshrc`

OR

you can set the npm config as well:

```bash
# will write into the `~/.npmrc` and works permanently
npm config set proxy http://your-proxy-address:port
npm config set https-proxy http://your-proxy-address:port
```