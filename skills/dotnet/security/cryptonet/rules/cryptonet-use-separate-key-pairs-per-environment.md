---
title: "Use separate key pairs per environment"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cryptonet, dotnet, security, rsa-encryptiondecryption, symmetric-aes-encryption, x509-certificate-based-crypto
---

## Use separate key pairs per environment

Use separate key pairs per environment: development, staging, and production should each have their own RSA keys to prevent cross-environment data leaks.
