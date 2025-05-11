---
title: ESM CJS 互操
date: 2025-05-11 15:12:22
hero_image: ''
lang: zh
duration: 10min
---

# 在CJS里引用ESM
只能用import()

```typescript
const { default: pkg } = await import('esm-only-package')
```

# 在ESM里引用CJS
推荐使用default import 

```typescript
// cjs.cjs
exports.name = 'exported';
```

```typescript
import { name } from './cjs.cjs';
console.log(name);
// Prints: 'exported'

import cjs from './cjs.cjs';
console.log(cjs);
// Prints: { name: 'exported' }

import * as m from './cjs.cjs';
console.log(m);
// Prints: [Module] { default: { name: 'exported' }, name: 'exported' }
```

# 上下文shim
## require require.resolve
```typescript
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)


```

## __dirname __filename
```typescript
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))
```

# 参考
[https://nodejs.org/api/esm.html#interoperability-with-commonjs](https://nodejs.org/api/esm.html#interoperability-with-commonjs)

