---
title: "Use `WaitForReceiptAsync`"
impact: MEDIUM
impactDescription: "general best practice"
tags: nethermind, dotnet, general, running-ethereum-fullarchive-nodes, interacting-with-ethereum-via-json-rpc, building-ethereum-plugins
---

## Use `WaitForReceiptAsync`

Use `WaitForReceiptAsync`: after sending transactions to confirm inclusion and check the status field, since transactions can be mined but revert at the EVM level.
