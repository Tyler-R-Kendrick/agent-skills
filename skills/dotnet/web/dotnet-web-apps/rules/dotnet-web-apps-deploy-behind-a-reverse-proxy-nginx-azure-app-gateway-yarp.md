---
title: "Deploy behind a reverse proxy (NGINX, Azure App Gateway, YARP) and configure `ForwardedHeaders` middleware"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-web-apps, dotnet, web, choosing-between-and-implementing-net-web-application-patterns-including-mvc, razor-pages, minimal-apis
---

## Deploy behind a reverse proxy (NGINX, Azure App Gateway, YARP) and configure `ForwardedHeaders` middleware

Deploy behind a reverse proxy (NGINX, Azure App Gateway, YARP) and configure `ForwardedHeaders` middleware: to preserve the original client IP, scheme, and host from the `X-Forwarded-*` headers, because without this configuration, `HttpContext.Connection.RemoteIpAddress` returns the proxy's IP and `Request.Scheme` returns `http` instead of `https`.
