---
title: npm 版本管理
date: 2022-03-14 21:42:13
hero_image: ''
lang: zh
duration: 5min
---

## 如何发布beta

You cannot set `0.2.1-alpha` automatically, but `0.2.1-alpha.0` is possible.

npm supports `--preid` option to specify the prefix of prereleases. It's available in combination with `pre*` versions.

**Example 1.** Make the alpha of next major version:
```sh
# 1.2.3 => 2.0.0-alpha.0
npm version premajor --preid alpha
```

**Example 2.** Bump alpha to beta:
```sh
# 2.0.0-alpha.0 => 2.0.0-beta.0
npm version prerelease --preid beta
```

Once you create a prerelease, you can increment the number using `prerelease` argument.

```sh
# 2.0.0-beta.0 => 2.0.0-beta.1
npm version prerelease
```

> https://stackoverflow.com/a/63112599