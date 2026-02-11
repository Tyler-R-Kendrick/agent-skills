# GitVersion

## Overview
GitVersion generates semantic version numbers from Git history and branching strategy.

## Example
```yaml
# GitVersion.yml
mode: ContinuousDelivery
branches:
  main:
    tag: ''
  develop:
    tag: alpha
  feature:
    tag: feature
increment: Minor
```

```bash
# CLI usage
dotnet gitversion /output buildserver

# In CI/CD
- name: GitVersion
  uses: gittools/actions/gitversion/execute@v0.9
```

## Best Practices
- Choose appropriate mode (Mainline/ContinuousDelivery)
- Configure branch strategies
- Use in CI/CD pipelines
- Tag releases appropriately
- Consider Nerdbank.GitVersioning alternative
