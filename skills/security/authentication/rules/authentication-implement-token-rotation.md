---
title: "Implement token rotation"
impact: MEDIUM
impactDescription: "general best practice"
tags: authentication, security, oauth-20, openid-connect, oidc
---

## Implement token rotation

Implement token rotation: use short-lived access tokens paired with longer-lived refresh tokens that are rotated on each use (refresh token rotation). Detect and revoke token families on reuse.
