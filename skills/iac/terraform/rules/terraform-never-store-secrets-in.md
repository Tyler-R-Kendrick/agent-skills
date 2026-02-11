---
title: "Never store secrets in `"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: terraform, iac, multi-cloud-provisioning, hcl-configuration, terraform-state-management
---

## Never store secrets in `

Never store secrets in `.tf` files — use variables with environment variables or a secrets manager.
