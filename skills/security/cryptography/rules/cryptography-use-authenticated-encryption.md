---
title: "Use authenticated encryption"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cryptography, security, tls, encryption, hashing
---

## Use authenticated encryption

(AES-GCM or ChaCha20-Poly1305) for all symmetric encryption; never use unauthenticated modes like ECB or plain CBC.
