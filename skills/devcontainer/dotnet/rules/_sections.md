# Dev Container — .NET Rules

Best practices and rules for Dev Container — .NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the dedicated `mcr | MEDIUM | [`dotnet-use-the-dedicated-mcr.md`](dotnet-use-the-dedicated-mcr.md) |
| 2 | Use the dotnet feature on a base image when you need | MEDIUM | [`dotnet-use-the-dotnet-feature-on-a-base-image-when-you-need.md`](dotnet-use-the-dotnet-feature-on-a-base-image-when-you-need.md) |
| 3 | Pin to a major SDK version (`9 | MEDIUM | [`dotnet-pin-to-a-major-sdk-version-9.md`](dotnet-pin-to-a-major-sdk-version-9.md) |
| 4 | Install workloads via the feature's `workloads` option... | MEDIUM | [`dotnet-install-workloads-via-the-feature-s-workloads-option.md`](dotnet-install-workloads-via-the-feature-s-workloads-option.md) |
| 5 | Add `ms-dotnettools | MEDIUM | [`dotnet-add-ms-dotnettools.md`](dotnet-add-ms-dotnettools.md) |
| 6 | Set `DOTNET_CLI_TELEMETRY_OPTOUT=1` in `containerEnv` for... | MEDIUM | [`dotnet-set-dotnet-cli-telemetry-optout-1-in-containerenv-for.md`](dotnet-set-dotnet-cli-telemetry-optout-1-in-containerenv-for.md) |
| 7 | Forward ports 5000/5001 for Kestrel HTTP/HTTPS and use... | MEDIUM | [`dotnet-forward-ports-5000-5001-for-kestrel-http-https-and-use.md`](dotnet-forward-ports-5000-5001-for-kestrel-http-https-and-use.md) |
