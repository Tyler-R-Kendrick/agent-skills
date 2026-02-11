---
title: "Configure appropriate gas estimation"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: nethermind, dotnet, general, running-ethereum-fullarchive-nodes, interacting-with-ethereum-via-json-rpc, building-ethereum-plugins
---

## Configure appropriate gas estimation

Configure appropriate gas estimation: by calling `EstimateGasAsync` before sending transactions and adding a buffer (10-20%) to avoid out-of-gas failures.
