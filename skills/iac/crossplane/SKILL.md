---
name: crossplane
description: |
  Use when managing cloud infrastructure through Kubernetes with Crossplane. Covers providers, managed resources, compositions, XRDs, claims, and the control plane pattern.
  USE FOR: Kubernetes-native cloud provisioning, Crossplane compositions, XRDs and claims, control plane pattern
  DO NOT USE FOR: standalone CLI-driven IaC (use terraform or pulumi), Kubernetes application deployment (use kubernetes or helm)
license: MIT
metadata:
  displayName: "Crossplane"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Crossplane Documentation"
    url: "https://docs.crossplane.io"
  - title: "Crossplane GitHub Repository"
    url: "https://github.com/crossplane/crossplane"
---

# Crossplane

## Overview
Crossplane is an open-source Kubernetes add-on that extends the Kubernetes API to provision and manage cloud infrastructure. Instead of using separate IaC tools, you define cloud resources as Kubernetes custom resources and manage them with `kubectl`, GitOps, and the Kubernetes reconciliation loop.

## Core Concepts

### Providers
Install cloud providers to manage external resources:
```yaml
apiVersion: pkg.crossplane.io/v1
kind: Provider
metadata:
  name: provider-aws
spec:
  package: xpkg.upbound.io/upbound/provider-aws-s3:v1.7.0
```

### Managed Resources
Cloud resources represented as Kubernetes objects:
```yaml
apiVersion: s3.aws.upbound.io/v1beta2
kind: Bucket
metadata:
  name: my-app-assets
spec:
  forProvider:
    region: us-east-1
    tags:
      Environment: prod
  providerConfigRef:
    name: aws-config
```

### Composite Resources (XRDs + Compositions)
Define custom APIs that abstract cloud details:

#### CompositeResourceDefinition (XRD)
```yaml
apiVersion: apiextensions.crossplane.io/v1
kind: CompositeResourceDefinition
metadata:
  name: xdatabases.platform.example.com
spec:
  group: platform.example.com
  names:
    kind: XDatabase
    plural: xdatabases
  claimNames:
    kind: Database
    plural: databases
  versions:
    - name: v1alpha1
      served: true
      referenceable: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                engine:
                  type: string
                  enum: [postgres, mysql]
                size:
                  type: string
                  enum: [small, medium, large]
              required: [engine, size]
```

#### Composition
```yaml
apiVersion: apiextensions.crossplane.io/v1
kind: Composition
metadata:
  name: xdatabases.aws.platform.example.com
spec:
  compositeTypeRef:
    apiVersion: platform.example.com/v1alpha1
    kind: XDatabase
  resources:
    - name: rds-instance
      base:
        apiVersion: rds.aws.upbound.io/v1beta2
        kind: Instance
        spec:
          forProvider:
            engine: postgres
            instanceClass: db.t3.micro
            allocatedStorage: 20
      patches:
        - fromFieldPath: spec.engine
          toFieldPath: spec.forProvider.engine
        - type: FromCompositeFieldPath
          fromFieldPath: spec.size
          toFieldPath: spec.forProvider.instanceClass
          transforms:
            - type: map
              map:
                small: db.t3.micro
                medium: db.t3.medium
                large: db.t3.large
```

### Claims
Application teams request infrastructure using the custom API:
```yaml
apiVersion: platform.example.com/v1alpha1
kind: Database
metadata:
  name: orders-db
  namespace: orders
spec:
  engine: postgres
  size: medium
```

## Installation
```bash
# Install Crossplane via Helm
helm repo add crossplane-stable https://charts.crossplane.io/stable
helm install crossplane crossplane-stable/crossplane \
  --namespace crossplane-system --create-namespace
```

## Best Practices
- Use Compositions + Claims to create platform APIs that abstract cloud-specific details from application teams.
- Use GitOps (Argo CD, Flux) to manage Crossplane resources declaratively.
- Pin provider versions for reproducible infrastructure.
- Use `providerConfigRef` to separate credentials per environment.
- Use patches and transforms in Compositions to map simple claim inputs to complex cloud configurations.
- Monitor resource health with `kubectl get managed` — Crossplane continuously reconciles desired vs actual state.
