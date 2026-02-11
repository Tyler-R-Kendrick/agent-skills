---
title: "Use type narrowing"
impact: LOW
impactDescription: "recommended but situational"
tags: typescript, typescript-language-features, choosing-build-tools, package-managers
---

## Use type narrowing

Use type narrowing: instead of type assertions: ```typescript // Prefer this if (typeof value === "string") { console.log(value.toUpperCase()); } // Over this console.log((value as string).toUpperCase()); ```
