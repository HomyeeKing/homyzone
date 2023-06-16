---
title: font-family 要不要加引号
date: 2023-06-16 16:49:53
hero_image: ""
lang: zh
duration: 1min
---

在移动端开发中，我们经常需要引用一些字体，有些是自定义的、有些是系统字体，但是我发现在代码库中，有些字体名添加了引号，有些是直接使用的，在配了stylelint的项目下 这个warning尤其刺眼，所以决定看一下什么情况下需要我们添加引号。
首先我们需要区分三个名词:  `identifier`  `keywords` `whitespace`

# identifier
通配符。在CSS中，identifer（包括元素名、类名、id名），可包含的字符是 `[-_a-zA-Z0-9\u00A0-\u10FFFF]`  
也就是数字 + 字母 +  下划线 + 中划线 +  ISO 10646字符

另外identifier不能以数字、两个中划线(--)或者中划线+数字开头，可以包含转义字符，也就是符合`^(-?\d|--)`这个规则的都**不是**合法的identifier

# keywords
关键字。规范中定义的通用关键字包括：

- 字体关键字： serif, sans-serif, cursive, fantasy, 以及 monospace，
- 保留字`initial``default`
- 关键字 inherit

且大小写不敏感，通常被用作fallback，它们一定不能被添加引号，否则不会被浏览器所识别解释
也就是说 `font-family: sans-serif` 会指向通用的sans-serif字体，如果添加了引号`font-family: 'sans-serif'`
则会指向真实的`sans-serif`字体
如果字体名称恰好和关键字重名，一定要使用引号进行区分

# whitespace
根据规范
> Font family names must either be given quoted as [strings](https://www.w3.org/TR/CSS21/syndata.html#strings), or unquoted as a sequence of one or more [identifiers](https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier). This means most punctuation characters and digits at the start of each token must be escaped in unquoted font family names.


字体名必须被添加引号或者 采用多个identifier用空格间隔，连续的空格会被合并成一个空格，且前后空格会被忽略
比如 ` Comic Sans MS`和 ` 'Comic Sans MS' `等价

# 总结

- 根据[规范](https://www.w3.org/TR/CSS2/fonts.html#font-family-prop)， font-family的值包括两类： 普通的字体名以及generic family names
- font-family的属性值 要么是字符串，要么是unquoted的identifer  ，且多个identifier最终会被join成一个字符串


# 参考

-  [https://mathiasbynens.be/notes/unquoted-font-family](https://mathiasbynens.be/notes/unquoted-font-family)
- [https://stylelint.io/user-guide/rules/list/font-family-name-quotes/#options](https://stylelint.io/user-guide/rules/list/font-family-name-quotes/#options)
- [https://www.w3.org/TR/CSS2/fonts.html#font-family-prop](https://www.w3.org/TR/CSS2/fonts.html#font-family-prop)
