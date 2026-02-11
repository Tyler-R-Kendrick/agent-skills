# Node.js Rules

Best practices and rules for Node.js.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the latest Active LTS version | CRITICAL | [`node-use-the-latest-active-lts-version.md`](node-use-the-latest-active-lts-version.md) |
| 2 | Use ESM for new projects. | MEDIUM | [`node-use-esm-for-new-projects.md`](node-use-esm-for-new-projects.md) |
| 3 | Use `node:` prefix for built-in modules. | MEDIUM | [`node-use-node-prefix-for-built-in-modules.md`](node-use-node-prefix-for-built-in-modules.md) |
| 4 | Use `fs/promises` instead of callback-based `fs`. | HIGH | [`node-use-fs-promises-instead-of-callback-based-fs.md`](node-use-fs-promises-instead-of-callback-based-fs.md) |
| 5 | Use `stream/promises` pipeline | CRITICAL | [`node-use-stream-promises-pipeline.md`](node-use-stream-promises-pipeline.md) |
| 6 | Use `AbortController` for cancellation. | MEDIUM | [`node-use-abortcontroller-for-cancellation.md`](node-use-abortcontroller-for-cancellation.md) |
| 7 | Always handle `unhandledRejection` | CRITICAL | [`node-always-handle-unhandledrejection.md`](node-always-handle-unhandledrejection.md) |
| 8 | Use `AsyncLocalStorage` | MEDIUM | [`node-use-asynclocalstorage.md`](node-use-asynclocalstorage.md) |
| 9 | Use worker threads for CPU-intensive work. | MEDIUM | [`node-use-worker-threads-for-cpu-intensive-work.md`](node-use-worker-threads-for-cpu-intensive-work.md) |
| 10 | Use `--env-file` | MEDIUM | [`node-use-env-file.md`](node-use-env-file.md) |
| 11 | Configure the `exports` field | HIGH | [`node-configure-the-exports-field.md`](node-configure-the-exports-field.md) |
| 12 | Use `tsx` for development | CRITICAL | [`node-use-tsx-for-development.md`](node-use-tsx-for-development.md) |
| 13 | Enable `--experimental-permission` | CRITICAL | [`node-enable-experimental-permission.md`](node-enable-experimental-permission.md) |
| 14 | Use `diagnostics_channel` | MEDIUM | [`node-use-diagnostics-channel.md`](node-use-diagnostics-channel.md) |
| 15 | Prefer `node --test` | CRITICAL | [`node-prefer-node-test.md`](node-prefer-node-test.md) |
| 16 | Use `process.exit()` sparingly. | LOW | [`node-use-process-exit-sparingly.md`](node-use-process-exit-sparingly.md) |
| 17 | Set `"engines"` in package.json | MEDIUM | [`node-set-engines-in-package-json.md`](node-set-engines-in-package-json.md) |
| 18 | Profile before optimizing. | MEDIUM | [`node-profile-before-optimizing.md`](node-profile-before-optimizing.md) |
