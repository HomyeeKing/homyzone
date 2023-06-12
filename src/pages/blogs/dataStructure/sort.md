---
title: 排序
date: 2023-06-12 10:19:14
hero_image: ''
lang: zh
duration: 1min
---

# 快速排序

- 选择一个基准值，采用双指针(left, right)将待排数组分成两个部分
- 小于基准值的放到左边；大于基准值的放到右边；等于的放到任意一边都可
- 直到 left === right 即第一轮排序完成
- 然后递归排序基准值左侧数据 和 基准值右侧数据

> 注意这里无需进行数据交换，而是直接O(1)来插入到指定位置

代码示例：

```js
const arr1 = [5, 4, 7, 2, 11, 1, 13]

function quickSort(arr, _left, _right) {
  let left = _left
  let right = _right
  const pivot = arr[left]
  if (left <= right) {
    while (left !== right) {
      while (right > left && arr[right] >= pivot) right--

      arr[left] = arr[right]

      while (left < right && arr[left] <= pivot) left++
      arr[right] = arr[left]
    }
    arr[right] = pivot
    quickSort(arr, _left, left - 1)
    quickSort(arr, right + 1, _right)
  }
}

quickSort(arr1, 0, arr1.length - 1)
console.log('arr', arr1)
```
