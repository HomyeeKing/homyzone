# AGENTS.md - Agent Guidelines

## Build Verification Required

**⚠️ IMPORTANT: After completing any code changes, you MUST run `npm run build` to verify there are no errors before considering the task complete.**

### Why This Matters

The project uses a custom build process that:
1. Fetches data from NeoDB API (`npm run fetch-data`)
2. Builds the static site with Vite SSG

Errors in the build process (like syntax errors in `fetch-neodb-data.js`) will cause deployment failures on Netlify.

### Build Command

```bash
npm run build
```

This command:
- Runs `fetch-neodb-data.js` to get latest data from NeoDB
- Builds the production site
- Validates all code and dependencies

### Pre-commit Hook

A pre-commit hook is configured to check `fetch-neodb-data.js` syntax before each commit. However, this only catches syntax errors - the full build may still fail due to other issues.

### When to Run Build

Run `npm run build` after:
- ✅ Modifying any JavaScript/TypeScript files
- ✅ Changing build scripts or configuration
- ✅ Adding new dependencies
- ✅ Modifying data fetching logic
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
