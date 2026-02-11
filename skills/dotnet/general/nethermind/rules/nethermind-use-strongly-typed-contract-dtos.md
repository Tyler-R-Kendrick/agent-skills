---
title: "Use strongly-typed contract DTOs"
impact: MEDIUM
impactDescription: "general best practice"
tags: nethermind, dotnet, general, running-ethereum-fullarchive-nodes, interacting-with-ethereum-via-json-rpc, building-ethereum-plugins
---

## Use strongly-typed contract DTOs

Use strongly-typed contract DTOs: with `[Function]` and `[Event]` attributes from Nethereum rather than raw ABI encoding to catch type errors at compile time.
