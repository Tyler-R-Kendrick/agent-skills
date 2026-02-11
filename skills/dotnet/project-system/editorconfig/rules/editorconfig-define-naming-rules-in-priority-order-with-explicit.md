---
title: "Define naming rules in priority order with explicit severity levels"
impact: MEDIUM
impactDescription: "general best practice"
tags: editorconfig, dotnet, project-system, configuring-consistent-c-coding-styles, naming-conventions, formatting-rules
---

## Define naming rules in priority order with explicit severity levels

Define naming rules in priority order with explicit severity levels: because `.editorconfig` naming rules are evaluated top-to-bottom and the first matching rule wins; place more specific rules (interfaces, type parameters) before general rules (public members).
