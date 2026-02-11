---
title: "Use RSA 2048-bit keys minimum"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cryptonet, dotnet, security, rsa-encryptiondecryption, symmetric-aes-encryption, x509-certificate-based-crypto
---

## Use RSA 2048-bit keys minimum

Use RSA 2048-bit keys minimum: always call `GenerateRsaKeyPair(2048)` or higher; 1024-bit keys are considered insecure and should never be used in production.
