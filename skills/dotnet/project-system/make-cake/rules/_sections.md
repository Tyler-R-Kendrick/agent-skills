# Cake Build Rules

Best practices and rules for Cake Build.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use Cake.Frosting for new projects instead of `.cake` scripts | MEDIUM | [`make-cake-use-cake-frosting-for-new-projects-instead-of-cake-scripts.md`](make-cake-use-cake-frosting-for-new-projects-instead-of-cake-scripts.md) |
| 2 | Install Cake as a local dotnet tool with a tool manifest | MEDIUM | [`make-cake-install-cake-as-a-local-dotnet-tool-with-a-tool-manifest.md`](make-cake-install-cake-as-a-local-dotnet-tool-with-a-tool-manifest.md) |
| 3 | Define a linear task dependency chain (Clean -> Restore -> Build -> Test -> Pack -> Deploy) | HIGH | [`make-cake-define-a-linear-task-dependency-chain-clean-restore-build.md`](make-cake-define-a-linear-task-dependency-chain-clean-restore-build.md) |
| 4 | Use `WithCriteria` to conditionally skip tasks instead of wrapping task bodies in if-statements | MEDIUM | [`make-cake-use-withcriteria-to-conditionally-skip-tasks-instead-of.md`](make-cake-use-withcriteria-to-conditionally-skip-tasks-instead-of.md) |
| 5 | Pass build parameters via `Argument("name", defaultValue)` rather than hardcoding values | MEDIUM | [`make-cake-pass-build-parameters-via-argument-name-defaultvalue-rather.md`](make-cake-pass-build-parameters-via-argument-name-defaultvalue-rather.md) |
| 6 | Set `NoRestore = true` and `NoBuild = true` on downstream tasks | HIGH | [`make-cake-set-norestore-true-and-nobuild-true-on-downstream-tasks.md`](make-cake-set-norestore-true-and-nobuild-true-on-downstream-tasks.md) |
| 7 | Use `GetFiles("./tests/ | MEDIUM | [`make-cake-use-getfiles-tests.md`](make-cake-use-getfiles-tests.md) |
| 8 | Store artifacts in a dedicated `./artifacts` directory and clean it in the Clean task | HIGH | [`make-cake-store-artifacts-in-a-dedicated-artifacts-directory-and.md`](make-cake-store-artifacts-in-a-dedicated-artifacts-directory-and.md) |
| 9 | Use `OnError` handlers on deployment tasks to log failure details and re-throw | HIGH | [`make-cake-use-onerror-handlers-on-deployment-tasks-to-log-failure.md`](make-cake-use-onerror-handlers-on-deployment-tasks-to-log-failure.md) |
| 10 | Pin addin versions in `#addin` directives or `PackageReference` elements | HIGH | [`make-cake-pin-addin-versions-in-addin-directives-or-packagereference.md`](make-cake-pin-addin-versions-in-addin-directives-or-packagereference.md) |
