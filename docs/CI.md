# CI/CD Pipeline

The project uses **GitHub Actions** for Continuous Integration (CI). The workflow is defined in `.github/workflows/ci.yml`.

## Overview

The pipeline runs on every `push` and `pull_request` to the `main` branch. It ensures that the code meets quality standards before being merged.

## Workflow: `CI`

### Triggers
- **Push**: `main` branch
- **Pull Request**: `main` branch

### Environment
- **Runner**: `ubuntu-latest` (Standard GitHub-hosted runner)

### Jobs

#### `validate`
This single job executes all checks in parallel where possible, or sequentially as defined.

1.  **Checkout Code**: Fetches the code using `actions/checkout@v4`.
2.  **Setup pnpm**: Installs `pnpm` (v9) using `pnpm/action-setup@v3`.
3.  **Setup Node.js**: Installs Node.js (v20) using `actions/setup-node@v4` with caching enabled for faster installs.
4.  **Install Dependencies**: Runs `pnpm install --frozen-lockfile` to ensure deterministic builds.
5.  **Linting**: Runs `pnpm lint` (Biome) to enforce code style and catch errors.
6.  **Type Checking**: Runs `pnpm typecheck` (TypeScript) to verify type safety.
7.  **Testing**: Runs `pnpm test:coverage` (Jest) to run unit tests and generate coverage reports.

## Local Verification

You can reproduce the CI checks locally by running:

```bash
# 1. Lint
pnpm lint

# 2. Type Check
pnpm typecheck

# 3. Test
pnpm test:coverage
```

## Troubleshooting

### "pnpm: command not found"
Ensure you have enabled Corepack or installed pnpm globally:
```bash
corepack enable
# or
npm install -g pnpm
```

### Type Errors
If `pnpm typecheck` fails, check if you have any uncommitted changes or if `node_modules` is out of sync (`pnpm install`).

### Test Failures
Run `pnpm test` to see detailed failure logs. Use `pnpm test:watch` to debug specific tests interactively.
