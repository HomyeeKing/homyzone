---
title: dataURL格式，以及相关优化
date: 2021-11-03 11:27:04
hero_image: ''
lang: zh
duration: 5min
---


dataURL的格式如下：
`data:[<mediatype>][;base64],<data>`

其中
- `mediatype` 就是 mime type 一些媒体格式, if ommit, defaults to `text/plain;charset=US-ASCII`
- `;base64` means the coming data is encoded as base64, if w/o ;base64, the data is represented using ASCII encoding 


in other words:
- for the format like this: `data:mime/type;base64,[data]`: base64-encoded, it's more efficient for binary data(PNGs, fonts,svgz,etc)
- `data:mime/type,[data]`, it's more efficient for text data (html,svg,json,.ect)

so you can choose which one is more suitable for your situation

for example: svg optimize 

- replace double quotes w/ single quote (since single quote is valid in url)
- encode unsafe characters
- wrap the dataURI with double quotes, since it contain the single quote

## references
https://codepen.io/tigt/post/optimizing-svgs-in-data-uris