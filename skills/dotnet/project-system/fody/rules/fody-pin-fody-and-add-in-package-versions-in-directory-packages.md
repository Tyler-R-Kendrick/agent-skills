---
title: "Pin Fody and add-in package versions in `Directory.Packages.props`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## Pin Fody and add-in package versions in `Directory.Packages.props`

Pin Fody and add-in package versions in `Directory.Packages.props`: when using Central Package Management to prevent version skew between developers and CI; mismatched versions can cause silent weaving failures.
