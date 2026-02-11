---
title: "Review ORM and framework escape hatches"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: hygiene, security, data-hygiene, sanitization, canonicalization
---

## Review ORM and framework escape hatches

`dangerouslySetInnerHTML`, raw SQL, `HtmlString`, `@Html.Raw()`, `mark_safe()`, and similar constructs bypass built-in protections and require manual encoding.
