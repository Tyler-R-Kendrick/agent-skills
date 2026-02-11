---
title: "When in doubt about which layer something belongs to, ask"
impact: MEDIUM
impactDescription: "general best practice"
tags: clean-architecture, dev, craftsmanship, dependency-rule-enforcement, layer-separation, boundary-design
---

## When in doubt about which layer something belongs to, ask

When in doubt about which layer something belongs to, ask: "If I change the database / framework / UI, does this need to change?" If yes, it belongs in an outer layer.
