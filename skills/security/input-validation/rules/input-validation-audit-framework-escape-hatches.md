---
title: "Audit framework escape hatches"
impact: MEDIUM
impactDescription: "general best practice"
tags: input-validation, security, output-encoding, xss-prevention
---

## Audit framework escape hatches

Audit framework escape hatches: review all uses of `dangerouslySetInnerHTML`, `Html.Raw()`, `|safe`, `th:utext`, and similar raw-output functions during code review.
