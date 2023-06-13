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

> 以下默认都是按照升序处理

# 冒泡排序

- 两个两个比较，如果前者比后者大，则交换两个元素的位置
- 冒泡排序最好的时间复杂度为 O(n)。冒泡排序的最坏时间复杂度为 O(n^2)。因此冒泡排序总的平均时间复杂度为 O(n^2)。
- 算法适用于少量数据的排序，是稳定的排序方法。

```ts
function bubbleSort(arr: number[]) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[i])
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }

  }
  return arr
}
```

# 选择排序

- 找到一组数据中最小（大）的那个数，然后放到最前面
- 不稳定 O(n^2)

```js
function selectSort(arr: number[]) {
  const len = arr.length

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex])
        minIndex = j
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
}
```

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

# 希尔排序

- 先分组 按照对半砍这么区分，比如分组跨度值为 5， 那么取下标为 0 5 10...的一组
- 每个组里按照插入排序排
- 等跨度为 1 排完后 基本排好了
- 不稳定 最好 O(nlogn) 最差 O(n^2)

```js
function shellSort(arr: number[]) {
  const len = arr.length
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      const tmp = arr[i]
      let j = i
      for (; j >= gap && arr[j - gap] > tmp; j -= gap) arr[j] = arr[j - gap]

      arr[j] = tmp
    }
  }
}
```

# 堆排序

- 构建大（小）顶堆， 从第一个非叶子节点开始
- 构建完后 将堆顶元素和末尾元素交换
- 然后继续将剩下的 len - 1 个元素进行 堆化，这里从堆顶开始即可，因为下边子树的根节点已经是对应的最大值了，只需要从堆顶及其子元素找出最大值即可

```js
function heapSort(arr: number[]) {
  let len = arr.length
  function heapify(arr: number[], index: number, length: number) {
    const left = 2 * index + 1
    const right = 2 * index + 2
    let largest = index
    if (left < length && arr[left] > arr[largest])
      largest = left
    if (right < length && arr[right] > arr[largest])
      largest = right
    if (largest !== index)
      [arr[largest], arr[index]] = [arr[index], arr[largest]]

  }
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--)
    heapify(arr, i, len)

  for (let i = len - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]

    len--
    heapify(arr, 0, len)
  }
}
```
