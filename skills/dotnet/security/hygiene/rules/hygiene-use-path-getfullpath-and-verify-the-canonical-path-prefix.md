---
title: "Use `Path.GetFullPath` and verify the canonical path prefix"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: hygiene, dotnet, security, preventing-xss-attacks, sql-injection-prevention, htmlurljavascript-encoding
---

## Use `Path.GetFullPath` and verify the canonical path prefix

Use `Path.GetFullPath` and verify the canonical path prefix: after resolving a user-supplied file name, confirm the full path starts with your allowed directory to prevent `../` traversal.
