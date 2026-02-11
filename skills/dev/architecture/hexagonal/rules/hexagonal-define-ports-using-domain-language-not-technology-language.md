---
title: "Define ports using domain language, not technology language"
impact: MEDIUM
impactDescription: "general best practice"
tags: hexagonal, dev, architecture, hexagonal-architecture, ports-and-adapters, onion-architecture
---

## Define ports using domain language, not technology language

Define ports using domain language, not technology language. `IOrderRepository.Save(Order)`, not `IDatabaseContext.ExecuteCommand(SQL)`.
