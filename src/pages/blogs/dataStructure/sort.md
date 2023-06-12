---
title: 排序
date: 2023-06-12 10:19:14
hero_image: ''
lang: zh
duration: 1min
---

# 基本概念

## 什么是稳定的排序算法？

排序完 数字的相对位置没有变， 也就是对于数组里有重复数字的 case，如果排序后相对位置没有变，那就是稳定排序

# 插入排序

- 选择基准值 放置已经排序好的文件中
- 从数组的第二项开始 往前开始插入
- 时间复杂度 O(n^2) 适用于少量数据排序 稳定排序

代码示例：

```js
/**
 * 插入排序
 * 将待插入值tmp放在合适位置
 * 怎么找合适的位置？ 从目标值位置向前遍历，把大于tmp的移动到
 */
function insertSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    const tmp = arr[i]
    let j = i
    for (; j > 0 && arr[j - 1] > tmp; j--) arr[j] = arr[j - 1] // 把比目标值的元素右移动

    arr[j] = tmp
    console.log('arr', arr)
  }
}
```

# 快速排序

- 选择一个基准值，采用双指针(left, right)将待排数组分成两个部分
- 小于基准值的放到左边；大于基准值的放到右边；等于的放到任意一边都可
- 直到 left === right 即第一轮排序完成
- 然后递归排序基准值左侧数据 和 基准值右侧数据
- 非稳定排序 时间复杂度 O(logn)

> 注意这里无需进行数据交换，而是直接 O(1)来插入到指定位置

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
