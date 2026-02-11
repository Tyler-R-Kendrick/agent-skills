---
name: kubernetes
description: |
  Use when writing Kubernetes manifests for deploying and managing containerized applications. Covers Deployments, Services, ConfigMaps, Secrets, Ingress, and resource management.
  USE FOR: Kubernetes manifests, Deployments, Services, Ingress, ConfigMaps, resource management, kubectl
  DO NOT USE FOR: Helm chart templating (use helm), cloud resource provisioning (use terraform or crossplane), container image builds (use docker)
license: MIT
metadata:
  displayName: "Kubernetes"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Kubernetes Documentation"
    url: "https://kubernetes.io/docs/home/"
  - title: "Kubernetes API Reference"
    url: "https://kubernetes.io/docs/reference/kubernetes-api/"
  - title: "Kubernetes GitHub Repository"
    url: "https://github.com/kubernetes/kubernetes"
---

# Kubernetes

## Overview
Kubernetes orchestrates containerized applications across clusters of machines, handling deployment, scaling, networking, and self-healing. Resources are declared in YAML manifests and managed via `kubectl` or GitOps tools.

## Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:1.0.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 15
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: url
```

## Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP
```

## Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts: [my-app.example.com]
      secretName: my-app-tls
  rules:
    - host: my-app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-app
                port:
                  number: 80
```

## ConfigMap and Secret
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "info"
  FEATURE_FLAGS: "new-ui=true"
---
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
stringData:
  url: "postgresql://user:pass@db:5432/myapp"
```

## Key Commands
```bash
# Apply manifests
kubectl apply -f manifests/

# Check rollout status
kubectl rollout status deployment/my-app

# Scale
kubectl scale deployment/my-app --replicas=5

# View logs
kubectl logs -f deployment/my-app

# Port forward for debugging
kubectl port-forward svc/my-app 8080:80

# Diff before apply
kubectl diff -f manifests/
```

## Best Practices
- Always set resource `requests` and `limits` to ensure fair scheduling and prevent noisy neighbors.
- Use liveness probes (restart on failure) and readiness probes (stop routing traffic) for self-healing.
- Use Secrets for sensitive data, ConfigMaps for configuration — never hardcode either.
- Use `kubectl diff` before `kubectl apply` to review changes.
- Pin container image tags to specific versions (not `latest`) for reproducible deployments.
- Use namespaces to isolate environments or teams.
- Use labels and selectors consistently for organizing and querying resources.
- Use rolling update strategy (default) with `maxUnavailable` and `maxSurge` for zero-downtime deploys.
