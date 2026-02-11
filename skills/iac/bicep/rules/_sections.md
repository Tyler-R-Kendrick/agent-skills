# Azure Bicep Rules

Best practices and rules for Azure Bicep.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always use `what-if` to preview changes before deploying | CRITICAL | [`bicep-always-use-what-if-to-preview-changes-before-deploying.md`](bicep-always-use-what-if-to-preview-changes-before-deploying.md) |
| 2 | Use modules to break large templates into reusable,... | MEDIUM | [`bicep-use-modules-to-break-large-templates-into-reusable.md`](bicep-use-modules-to-break-large-templates-into-reusable.md) |
| 3 | Use parameter decorators (`@allowed`, `@minLength`,... | MEDIUM | [`bicep-use-parameter-decorators-allowed-minlength.md`](bicep-use-parameter-decorators-allowed-minlength.md) |
| 4 | Reference existing resources with the `existing` keyword... | MEDIUM | [`bicep-reference-existing-resources-with-the-existing-keyword.md`](bicep-reference-existing-resources-with-the-existing-keyword.md) |
| 5 | Use `uniqueString(resourceGroup() | MEDIUM | [`bicep-use-uniquestring-resourcegroup.md`](bicep-use-uniquestring-resourcegroup.md) |
| 6 | Pin API versions on resources for predictable behavior | MEDIUM | [`bicep-pin-api-versions-on-resources-for-predictable-behavior.md`](bicep-pin-api-versions-on-resources-for-predictable-behavior.md) |
| 7 | Use Bicep instead of ARM JSON | MEDIUM | [`bicep-use-bicep-instead-of-arm-json.md`](bicep-use-bicep-instead-of-arm-json.md) |
