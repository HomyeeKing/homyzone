---
title: node.js child_process
date: 2022-01-20 15:25:00 # sj
hero_image: ""
lang: en
duration: 10min
---

# Preview
To make myself to distinguish the `spawn fork exec` etc subprocess command, I need to look through the official docs to make a record.

# pipe
when we spawn a subprocess, there's a pipe to connect the main process and the subprocess, called `pipe`. But the pipe has some limits like output limit, so if the subprocess writes to `stdout` in excess of limit, the subprocess will be blocked and wait for the pipe buffer for more data. use `{stdio: 'ignore'}` if the output will not be consumed.

# command lookup
if you specify the `options.env.PATH`, then the command lookup w/ this, otherwise will use the `process.env.PATH`

# potential issue on Windows
Node.js sorts the `env` lexicographically, but Windows is case-insensitive, so be careful when you pass multiple variants of the same key, such as `PATH` and `Path`, that's to say, is you pass `{path: xxx, PATH:xxx}`, path will be consumed.

# related api
`child_process` module provides a handfule of sync and async alternatives to `spawn` and `spawnSync`

let's see the differences 
- `spawn`: spawn child process asyncly w/o blocking the Node.js event loop
- `exec`: spawn a shell and run command in that shell
- `execFile`: spawn the command directly w/o first spawning a shell by default
- `fork` spawn a new Node.js process and invokes a specified module w/ an IPC communication channel established that alows sending msg between parent and child.

the importance of the distinction between `exec` and the `execFile` can vary based on platform. On Unix-type platform, `execFile` is more efficient one since it not creates shell. On Windows, however, `.bat` and `.cmd` files are not executeable on their own w/o a terminal, so we have to use `exec` here.

and if the file name contains spaces, it needs to quoted:

```js
 exec('"my script.cmd"')
```

# spawn child process
this means each process has its own memory, w/ their own V8 instancs.


# shell
Shell is a command-line interpreter that allows the user to interact with the system. It is responsible for taking inputs from the user and displaying the output.

A shell script needs to be saved with the extension `.sh`.

To let the Linux system know that the file is a shell script, the file needs to begin with the `shebang` construct.

# shebang
this `#!` is called shebang or hashbang, it's used to specify the interpreter 
```sh
#!/bin/bash 
OR
#!/bin/sh
```


# executable file
- appearance: no file extension and system can process it