# Pulumi

## Overview
Pulumi is an open-source IaC platform that lets you define cloud infrastructure using general-purpose programming languages (TypeScript, Python, Go, C#, Java). Unlike HCL-based tools, you get full IDE support, loops, conditionals, type checking, and package management.

## TypeScript Example
```typescript
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const environment = config.require("environment");

const bucket = new aws.s3.Bucket("assets", {
  bucket: `my-app-${environment}-assets`,
  tags: { Environment: environment },
});

const bucketVersioning = new aws.s3.BucketVersioningV2("assets-versioning", {
  bucket: bucket.id,
  versioningConfiguration: { status: "Enabled" },
});

export const bucketArn = bucket.arn;
```

## Python Example
```python
import pulumi
import pulumi_aws as aws

config = pulumi.Config()
environment = config.require("environment")

bucket = aws.s3.Bucket("assets",
    bucket=f"my-app-{environment}-assets",
    tags={"Environment": environment},
)

pulumi.export("bucket_arn", bucket.arn)
```

## Workflow
```bash
# Create a new project
pulumi new aws-typescript

# Preview changes
pulumi preview

# Deploy changes
pulumi up

# Destroy resources
pulumi destroy

# Switch stacks (environments)
pulumi stack select prod
```

## Outputs and Apply
Pulumi resources return `Output<T>` values (resolved asynchronously):
```typescript
// Outputs are lazy — use .apply() to transform
const url = bucket.websiteEndpoint.apply(ep => `https://${ep}`);

// Use pulumi.interpolate for string interpolation
const name = pulumi.interpolate`app-${bucket.id}`;

// Use pulumi.all to combine multiple outputs
const combined = pulumi.all([bucket.arn, bucket.id]).apply(
  ([arn, id]) => `${arn} (${id})`
);
```

## Component Resources
Create reusable infrastructure abstractions:
```typescript
class StaticSite extends pulumi.ComponentResource {
  public readonly url: pulumi.Output<string>;

  constructor(name: string, args: { domain: string }, opts?: pulumi.ComponentResourceOptions) {
    super("custom:StaticSite", name, {}, opts);

    const bucket = new aws.s3.Bucket(`${name}-bucket`, {
      website: { indexDocument: "index.html" },
    }, { parent: this });

    this.url = bucket.websiteEndpoint;
    this.registerOutputs({ url: this.url });
  }
}
```

## Stack Configuration
```bash
# Set config values
pulumi config set environment prod
pulumi config set --secret dbPassword s3cret

# Access in code
const config = new pulumi.Config();
const env = config.require("environment");
const dbPass = config.requireSecret("dbPassword");
```

## State Backends
| Backend | Description |
|---------|-------------|
| Pulumi Cloud | Default managed backend with collaboration features |
| S3 | `pulumi login s3://my-bucket` |
| Azure Blob | `pulumi login azblob://container` |
| Local | `pulumi login --local` |

## Best Practices
- Always run `pulumi preview` before `pulumi up` to review changes.
- Use `ComponentResource` classes for reusable infrastructure patterns.
- Never call `.apply()` on Outputs when `pulumi.interpolate` suffices.
- Use `pulumi.Config` for environment-specific values and secrets.
- Use stack references for cross-stack dependencies instead of hardcoded values.
- Pin provider package versions in `package.json` / `requirements.txt`.
- Use `aliases` when renaming resources to avoid delete-and-recreate.
