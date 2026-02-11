---
title: "Handle chain reorganizations"
impact: MEDIUM
impactDescription: "general best practice"
tags: nethermind, dotnet, general, running-ethereum-fullarchive-nodes, interacting-with-ethereum-via-json-rpc, building-ethereum-plugins
---

## Handle chain reorganizations

Handle chain reorganizations: in event listeners by tracking confirmed blocks and re-processing events when the canonical chain changes.
