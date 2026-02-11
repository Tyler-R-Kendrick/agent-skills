# Package Management Rules

Best practices and rules for Package Management.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Choose one package manager per project | CRITICAL | [`package-management-choose-one-package-manager-per-project.md`](package-management-choose-one-package-manager-per-project.md) |
| 2 | Use `npm ci` (or `pnpm install --frozen-lockfile`) | MEDIUM | [`package-management-use-npm-ci-or-pnpm-install-frozen-lockfile.md`](package-management-use-npm-ci-or-pnpm-install-frozen-lockfile.md) |
| 3 | Pin exact TypeScript versions | MEDIUM | [`package-management-pin-exact-typescript-versions.md`](package-management-pin-exact-typescript-versions.md) |
| 4 | Use `workspace:*` protocol | CRITICAL | [`package-management-use-workspace-protocol.md`](package-management-use-workspace-protocol.md) |
| 5 | Enable `engine-strict` | HIGH | [`package-management-enable-engine-strict.md`](package-management-enable-engine-strict.md) |
| 6 | Use `"files"` in `package.json` | CRITICAL | [`package-management-use-files-in-package-json.md`](package-management-use-files-in-package-json.md) |
| 7 | Set up `prepublishOnly` | MEDIUM | [`package-management-set-up-prepublishonly.md`](package-management-set-up-prepublishonly.md) |
| 8 | Use `"exports"` instead of `"main"` | HIGH | [`package-management-use-exports-instead-of-main.md`](package-management-use-exports-instead-of-main.md) |
| 9 | Audit dependencies regularly | MEDIUM | [`package-management-audit-dependencies-regularly.md`](package-management-audit-dependencies-regularly.md) |
| 10 | Use Corepack | HIGH | [`package-management-use-corepack.md`](package-management-use-corepack.md) |
