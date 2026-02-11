---
title: "Install the Aspire workload via the dotnet feature's..."
impact: MEDIUM
impactDescription: "general best practice"
tags: aspire, devcontainer, net-aspire-dev-containers, aspire-workload-in-codespaces, aspire-dashboard-port-forwarding
---

## Install the Aspire workload via the dotnet feature's...

Install the Aspire workload via the dotnet feature's `workloads` option (cached in prebuilds) rather than `postCreateCommand` when possible.
