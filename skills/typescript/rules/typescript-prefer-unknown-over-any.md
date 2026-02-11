---
title: "Prefer `unknown` over `any`"
impact: LOW
impactDescription: "recommended but situational"
tags: typescript, typescript-language-features, choosing-build-tools, package-managers
---

## Prefer `unknown` over `any`

Prefer `unknown` over `any`: for values of uncertain type: ```typescript function parse(input: unknown): Config { if (typeof input === "object" && input !== null && "port" in input) { return input as Config; } throw new Error("Invalid config"); } ```
