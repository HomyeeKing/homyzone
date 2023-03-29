---
title: 偷偷告诉你，类型声明文件也分两种😘
date: 2023-03-29 10:29:39 # sj
hero_image: ''
lang: zh
duration: 10min
---
[[toc]]

# 前言
我们在日常开发中会经常遇到需要扩展全局变量类型的场景，尤其是扩展window属性的类型，网上一搜的解决方案大多是
```typescript
declare global{
  interface Window{
   foo:any
  }
}
```
在某些情况下, 这样声明是可以生效的，但是有时候你会发现没卵用。
其实之前大致了解过这部分的差异，但是当时没记录下来，正好最近同事遇到了这部分问题，所以正好记录下

# 普通类型声明文件
> [https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules)
> 

首先我们知道ts默认会检查项目里`.d.ts`结尾的声明文件，用于开发者扩展类型，其中最主要一个特点是`ambient`，也就是全局的，**不需要**我们手动导入的，所以我们只需要声明即可
```typescript
declare const aa:any
declare function foo(){}
declare class Test{}
declare enum 
type Foo = string;  
interface Bar{}
// 注意 type和interface 不需要使用 declare
```

这里你会发现在声明文件里的`interface`和`type`不需要使用declare关键字，它们只需正常定义就好，所以原理上我们如果想扩展window上的属性类型，只需使用interface即可
```typescript
interface Window{
   windvane: any;
}
```

所以前言的问题就转化成了：**什么时候需要使用**`**declare global**`**?**
不急，我们先了解一下什么是_模块类型声明文件_
# 模块化的类型声明文件
我们在开发大型项目的时候经常会把代码拆分成很多模块，然后相互引用来实现，其实类型文件也可以拆分成一个个的模块， 也就是将**类型声明文件模块化。**
同正常的模块代码一样，需要借助于`import/export`来实现类型的引用导出，这里就要注意了，一旦使用了`import/export`, 里面的类型声明就只属于这个模块了，也就是模块化后，里面的声明都默认加了层scope，在这种情况下如果想拓展全局类型的话 那就需要使用`declare global`, 通过[declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#introduction) 来实现对应效果。
_**换句话说，**_`_**declare global**_`_**所在的声明文件必须是个模块**_
```typescript
export {} // 标记为模块

declare global{
	 interface Window{
    	bar:any;
   }
}

```
如果不想变成模块化的怎么解, 把import放到declar里边 或者  使用动态导入 就可以了
```typescript
declare module 'homy' {
  import { CSSProperties } from 'rax'; // 放在内部

  interface Test {
    style: CSSProperties;
  }
}


declare module 'homy' {
  interface Test {
    style: import('rax').CSSProperties; // 动态导入
  }
}



`
```
# declare module
这里单独再说下`declare module`这个场景，比如我们使用`tsc`转译的时候，默认会生成一份类型声明文件，一般是一对一的，即`foo.ts`会生成一份`foo.d.ts`，一般来说我们是不用过多关注类型声明文件里的一些逻辑的，因为这都是工具自动处理的，但是有时候我们想手动声明某个module的类型时，注意这里，代码文件和声明文件同名的话 declare module是不生效的，也就是
```typescript
// foo.d.ts
declare module 'homy';
```
```typescript
// bar.ts
import homy from 'homy'  // ✅

// foo.ts
import homy from 'homy'  // ❌
```
# 参考

- [https://stackoverflow.com/a/66768386/12866134](https://stackoverflow.com/a/66768386/12866134) 
- [https://ts.xcatliu.com/basics/declaration-files.html#declare-module](https://ts.xcatliu.com/basics/declaration-files.html#declare-module)
- [https://ts.xcatliu.com/basics/declaration-files.html#%E4%B8%89%E6%96%9C%E7%BA%BF%E6%8C%87%E4%BB%A4](https://ts.xcatliu.com/basics/declaration-files.html#%E4%B8%89%E6%96%9C%E7%BA%BF%E6%8C%87%E4%BB%A4)
