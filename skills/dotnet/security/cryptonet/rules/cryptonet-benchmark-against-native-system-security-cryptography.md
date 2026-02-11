---
title: "Benchmark against native `System.Security.Cryptography`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cryptonet, dotnet, security, rsa-encryptiondecryption, symmetric-aes-encryption, x509-certificate-based-crypto
---

## Benchmark against native `System.Security.Cryptography`

Benchmark against native `System.Security.Cryptography`: for high-throughput scenarios, compare CryptoNet performance with direct .NET crypto APIs to ensure the abstraction overhead is acceptable.
