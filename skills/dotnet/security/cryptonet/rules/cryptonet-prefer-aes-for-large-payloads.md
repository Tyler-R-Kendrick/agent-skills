---
title: "Prefer AES for large payloads"
impact: LOW
impactDescription: "recommended but situational"
tags: cryptonet, dotnet, security, rsa-encryptiondecryption, symmetric-aes-encryption, x509-certificate-based-crypto
---

## Prefer AES for large payloads

RSA can only encrypt data smaller than its key size; use envelope encryption (AES for data, RSA for the AES key) for anything larger than 200 bytes.
