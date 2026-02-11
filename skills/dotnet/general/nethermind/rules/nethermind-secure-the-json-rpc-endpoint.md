---
title: "Secure the JSON-RPC endpoint"
impact: MEDIUM
impactDescription: "general best practice"
tags: nethermind, dotnet, general, running-ethereum-fullarchive-nodes, interacting-with-ethereum-via-json-rpc, building-ethereum-plugins
---

## Secure the JSON-RPC endpoint

Secure the JSON-RPC endpoint: by binding to `127.0.0.1` (not `0.0.0.0`), using authentication, and placing it behind a reverse proxy with rate limiting.
