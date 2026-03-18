# AGENTS.md - Agent Guidelines

## Build Verification Required

**⚠️ IMPORTANT: After completing any code changes, you MUST run `npm run build` to verify there are no errors before considering the task complete.**

### Script区分

**`npm run build`** (本地/提交前使用)
- 只运行 Vite SSG 构建
- 不依赖 NeoDB Token
- 用于验证代码语法和构建是否正常

**`npm run build:prod`** (生产部署使用)
- 先运行 `fetch-data` 获取 NeoDB 数据
- 再运行 Vite SSG 构建
- 需要 NeoDB Token（Netlify 环境变量中设置）

### Why This Matters

The project has two build modes:
1. **Local/Pre-commit**: Only validates code can build correctly
2. **Production**: Fetches fresh data + builds site

Errors in the build process (like syntax errors in Vue files) will cause deployment failures on Netlify.

### Build Command (Local)

```bash
npm run build
```

This command:
- Builds the static site with Vite SSG
- Validates all code and dependencies
- Does NOT require NeoDB Token

### Pre-commit Hook

A pre-commit hook is configured to run `npm run build` before each commit. This ensures code can build correctly without requiring NeoDB Token.

### When to Run Build

Run `npm run build` after:
- ✅ Modifying any JavaScript/TypeScript/Vue files
- ✅ Changing build scripts or configuration
- ✅ Adding new dependencies
- ✅ Any changes that could affect the build process

### Success Criteria

Build is successful when:
- No error messages in console
- `dist/` folder is created with built files
- Exit code is 0

### Failure Handling

If build fails:
1. Read the error message carefully
2. Fix the root cause
3. Run `npm run build` again
4. Only commit after successful build

### Production Build

For production deployment (handled by Netlify):
```bash
npm run build:prod
```

This fetches fresh NeoDB data and builds the site. Only run this if you have `VITE_NEODB_TOKEN` set.
