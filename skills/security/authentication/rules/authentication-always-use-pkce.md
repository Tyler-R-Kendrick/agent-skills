---
title: "Always use PKCE"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: authentication, security, oauth-20, openid-connect, oidc
---

## Always use PKCE

Always use PKCE: regardless of client type, use PKCE with the Authorization Code flow. It adds protection against code interception attacks at negligible implementation cost.
