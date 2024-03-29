---
title: c语言cheetsheet
date: 2023-07-16 23:41:27 # sj
hero_image: ''
lang: zh
duration: 10min
---

# 哪些类型作为函数参数的时候 需要声明为指针？

在 C 语言中，函数参数类型一般可以分为以下几种：

1. 基本数据类型（如 int、float、char 等）：基本数据类型的参数可以直接传递给函数，不需要声明为指针类型。

2. 数组类型：数组类型的参数在函数调用时会被自动转换为指向数组第一个元素的指针，因此不需要声明为指针类型。例如：
```c
void func(int arr[]);
```
在调用函数 func 时，可以传递一个数组作为参数，而不需要将数组显式地转换为指针类型。

3. 结构体类型：结构体类型的参数在函数调用时会被复制一份，因此如果需要在函数中修改结构体的内容，需要将结构体参数声明为指针类型。例如：
```c
typedef struct {
    int x;
    int y;
} Point;

void func(Point *p);
```
在调用函数 func 时，需要传递一个指向 Point 结构体的指针作为参数，才能在函数中修改结构体的内容。

4. 大型数据类型（如字符串、数组、结构体等）：如果需要在函数中修改大型数据类型的内容，需要将参数声明为指针类型。例如：
```c
void func(char *str);
```
在调用函数 func 时，需要传递一个指向字符串的指针作为参数，才能在函数中修改字符串的内容。

需要注意的是，如果函数不需要修改参数的内容，可以将参数声明为 const 类型，以避免参数被意外修改。例如：
```c
void func(const int *ptr);
```
在上述函数中，参数 ptr 被声明为指向 int 类型的指针，但此指针指向的值不能被修改。如果在函数中尝试修改 ptr 所指向的值，编译器会发出警告。


# CPPFLAGS LDFLAGS

在编译和链接程序时，LDFLAGS 和 CPPFLAGS 都是用于传递参数给编译器或链接器的环境变量。它们分别代表：

LDFLAGS：用于传递链接器（ld）的参数。链接器用于将多个目标文件或库文件合并成一个可执行文件或共享库。LDFLAGS 可以用于传递链接器参数，例如链接库文件的路径、链接库的名称等。例如，-L 选项可以指定库文件的路径，-l 选项可以指定链接的库文件名称，例如 -L/usr/local/lib -lmylib。

CPPFLAGS：用于传递预处理器（cpp）的参数。预处理器用于在编译程序之前对源代码进行宏替换、条件编译等预处理工作。CPPFLAGS 可以用于传递预处理器参数，例如指定头文件的搜索路径、定义宏等。例如，-I 选项可以指定头文件的搜索路径，例如 -I/usr/local/include。

在编译和链接程序时，你可以使用这两个环境变量来传递参数给编译器或链接器，以控制编译和链接的行为。例如，如果你的程序依赖于某个库文件，你可以使用 LDFLAGS 来指定库文件的路径和名称，以便链接器能够找到它。另外，如果你的程序需要使用某个头文件，你可以使用 CPPFLAGS 来指定头文件搜索的路径。

需要注意的是，LDFLAGS 和 CPPFLAGS 只是环境变量，需要在编译和链接命令中显式地使用它们才能生效

```bash
$ CPPFLAGS="-I/usr/local/include" LDFLAGS="-L/usr/local/lib -lmylib" ./configure
$ make
$ make install

```

# clang lldb llvm 的关系是什么
Clang、LLDB和LLVM是三个相关但不完全相同的项目。

LLVM(Low Level Vritual Machine)是一个编译器基础设施，它包括一个编译器前端、一个编译器后端、一个代码生成器和一个调试器。LLVM最初由美国伊利诺伊大学香槟分校的Chris Lattner教授创建，并于2003年发布。LLVM的设计目标是提供一种通用的编译器架构，可以用于各种不同的编程语言和架构，而不需要针对每个语言和架构都编写专门的编译器。

Clang是LLVM项目中的一个编译器前端，它支持C、C++、Objective-C和Objective-C++等编程语言。与传统的编译器不同，Clang采用模块化设计，可以在编译时间和运行时间提供更好的错误消息、更好的代码生成和更快的编译速度。

LLDB是LLVM项目中的一个调试器，它支持多种平台和多种编程语言。LLDB具有模块化的设计，可以轻松地扩展到新的目标平台或编程语言，并提供了强大的调试功能，可以帮助开发人员诊断和修复程序中的错误。

综上，LLVM是一个编译器基础设施，Clang是LLVM项目中的一个编译器前端，LLDB是LLVM项目中的一个调试器。这三个项目都在共同构建一个通用的编译器基础设施。

# 使用位运算进行flag确认
比如git源码里通过位运算来确定文件的flag
```c
	enum {

		/**
		 * Return just ignored files in `entries[]`, not untracked files.
		 * This flag is mutually exclusive with `DIR_SHOW_IGNORED_TOO`.
		 */
		DIR_SHOW_IGNORED = 1<<0,

		/* Include a directory that is not tracked. */
		DIR_SHOW_OTHER_DIRECTORIES = 1<<1,

		/* Do not include a directory that is not tracked and is empty. */
		DIR_HIDE_EMPTY_DIRECTORIES = 1<<2,

		/**
		 * If set, recurse into a directory that looks like a Git directory.
		 * Otherwise it is shown as a directory.
		 */
		DIR_NO_GITLINKS = 1<<3,

		/**
		 * Special mode for git-add. Return ignored files in `ignored[]` and
		 * untracked files in `entries[]`. Only returns ignored files that match
		 * pathspec exactly (no wildcards). Does not recurse into ignored
		 * directories.
		 */
		DIR_COLLECT_IGNORED = 1<<4,

		/**
		 * Similar to `DIR_SHOW_IGNORED`, but return ignored files in
		 * `ignored[]` in addition to untracked files in `entries[]`.
		 * This flag is mutually exclusive with `DIR_SHOW_IGNORED`.
		 */
		DIR_SHOW_IGNORED_TOO = 1<<5,

		DIR_COLLECT_KILLED_ONLY = 1<<6,

		/**
		 * Only has meaning if `DIR_SHOW_IGNORED_TOO` is also set; if this is
		 * set, the untracked contents of untracked directories are also
		 * returned in `entries[]`.
		 */
		DIR_KEEP_UNTRACKED_CONTENTS = 1<<7,

		/**
		 * Only has meaning if `DIR_SHOW_IGNORED_TOO` is also set; if this is
		 * set, returns ignored files and directories that match an exclude
		 * pattern. If a directory matches an exclude pattern, then the
		 * directory is returned and the contained paths are not. A directory
		 * that does not match an exclude pattern will not be returned even if
		 * all of its contents are ignored. In this case, the contents are
		 * returned as individual entries.
		 *
		 * If this is set, files and directories that explicitly match an ignore
		 * pattern are reported. Implicitly ignored directories (directories that
		 * do not match an ignore pattern, but whose contents are all ignored)
		 * are not reported, instead all of the contents are reported.
		 */
		DIR_SHOW_IGNORED_TOO_MODE_MATCHING = 1<<8,

		DIR_SKIP_NESTED_GIT = 1<<9
	} flags;
```

如果想测试某个flag里包不包含flag2 就进行 与操作， 即
`flag & flag2 == flag2`

如果想添加flag，进行或操作
`flag | flag2`

# 文件类型定义

这是Linux系统下的文件类型定义，定义如下：

- DT_UNKNOWN：未知文件类型。
- DT_FIFO：命名管道文件，也称为FIFO，用于进程间通信。
- DT_CHR：字符设备文件，用于与设备进行通信。
- DT_DIR：目录文件，用于存储其他文件和目录。
- DT_BLK：块设备文件，用于与设备进行通信。
- DT_REG：普通文件，包括文本文件、二进制文件等。
- DT_LNK：符号链接文件，指向其他文件或目录。
- DT_SOCK：套接字文件，用于进程间网络通信。
- DT_WHT：白色文件，一种特殊的文件类型，通常用于将一个目录挂载到另外一个目录上。
这些文件类型定义在Linux系统下进行文件系统操作时非常重要，例如在文件查找、目录遍历、文件类型判断等操作中都会用到这些定义。在具体使用中，可以通过检查Linux系统调用返回的文件类型标识来确定文件的类型。

# 头文件
也就是`.h` 文件，用来存储变量、函数和其他c对象，可通过`#include "headerFile.h"`被其他c源文件(`.c`)引入


# 函数签名

函数定义，函数名，参数个数以及类型、返回值类型，但是不包含函数体
```c 
int multiplyNumbers(int a, int b);
```

# 宏
宏会在编译代码之前被处理，通过`#define`指令来创建
```c 
#define TESTMACRO asdf
// 定义了宏 TESTMACRO ， 值为 asdf
```

代码里用到`TESTMACRO`的地方会被预处理器处理成`asdf`

一般用在如下几个场景：
- 用来检查某个宏是否被定义
- 存储整数、字符串
- 存储简单的代码片段（通常只有一行）


# 指针
指针就是变量的内存地址，某个变量的指针可以通过`&`来获取，存储在`*`声明的变量中
```c 
int age = 21;
int* age_pointer = &age;
```

`*`也可以被用来解引用，来获取指针对应的值
```c 
int new_age = *age_pointer;
```