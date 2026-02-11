# GitVersion Rules

Best practices and rules for GitVersion.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always use `fetch-depth: 0` in CI checkout steps | CRITICAL | [`gitversion-always-use-fetch-depth-0-in-ci-checkout-steps.md`](gitversion-always-use-fetch-depth-0-in-ci-checkout-steps.md) |
| 2 | Choose Mainline mode for trunk-based development and ContinuousDelivery mode for GitFlow | MEDIUM | [`gitversion-choose-mainline-mode-for-trunk-based-development-and.md`](gitversion-choose-mainline-mode-for-trunk-based-development-and.md) |
| 3 | Pin the `tag-prefix` to `v` and use consistent tag formats like `v1.2.3` | MEDIUM | [`gitversion-pin-the-tag-prefix-to-v-and-use-consistent-tag-formats-like.md`](gitversion-pin-the-tag-prefix-to-v-and-use-consistent-tag-formats-like.md) |
| 4 | Use `+semver: major` or `+semver: minor` in commit messages for intentional version bumps | MEDIUM | [`gitversion-use-semver-major-or-semver-minor-in-commit-messages-for.md`](gitversion-use-semver-major-or-semver-minor-in-commit-messages-for.md) |
| 5 | Install GitVersion as a local tool via `dotnet tool install` with a tool manifest | MEDIUM | [`gitversion-install-gitversion-as-a-local-tool-via-dotnet-tool-install.md`](gitversion-install-gitversion-as-a-local-tool-via-dotnet-tool-install.md) |
| 6 | Set `prevent-increment-of-merged-branch-version: true` on main branch configuration | HIGH | [`gitversion-set-prevent-increment-of-merged-branch-version-true-on-main.md`](gitversion-set-prevent-increment-of-merged-branch-version-true-on-main.md) |
| 7 | Pass `SemVer` to MSBuild's `Version` property and `NuGetVersionV2` to `PackageVersion` | MEDIUM | [`gitversion-pass-semver-to-msbuild-s-version-property-and.md`](gitversion-pass-semver-to-msbuild-s-version-property-and.md) |
| 8 | Do not use `AssemblyVersion` for NuGet package versioning | CRITICAL | [`gitversion-do-not-use-assemblyversion-for-nuget-package-versioning.md`](gitversion-do-not-use-assemblyversion-for-nuget-package-versioning.md) |
| 9 | Test version calculation locally with `dotnet gitversion` before pushing | MEDIUM | [`gitversion-test-version-calculation-locally-with-dotnet-gitversion.md`](gitversion-test-version-calculation-locally-with-dotnet-gitversion.md) |
| 10 | Configure `assembly-versioning-scheme: MajorMinorPatch` explicitly | HIGH | [`gitversion-configure-assembly-versioning-scheme-majorminorpatch.md`](gitversion-configure-assembly-versioning-scheme-majorminorpatch.md) |
