---
title: "Store private keys in a secrets manager"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cryptonet, dotnet, security, rsa-encryptiondecryption, symmetric-aes-encryption, x509-certificate-based-crypto
---

## Store private keys in a secrets manager

Store private keys in a secrets manager: use Azure Key Vault, AWS Secrets Manager, or `dotnet user-secrets` for development; never embed private keys in source code or `appsettings.json`.
