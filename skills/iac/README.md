# Infrastructure as Code

Use when working with Infrastructure as Code tools and platforms. Covers Terraform, Pulumi, CloudFormation, Bicep, ARM, Kubernetes, Helm, Docker, Crossplane, and Dagger.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`arm/`](arm/) | Use when working with Azure Resource Manager (ARM) JSON templates. Covers template structure, parameters, variables, fun... |
| [`bicep/`](bicep/) | Use when writing Azure Bicep templates for infrastructure deployment. Covers resource declarations, modules, parameters,... |
| [`cloud-formation/`](cloud-formation/) | Use when writing or managing AWS CloudFormation templates. Covers stack resources, parameters, outputs, intrinsic functi... |
| [`crossplane/`](crossplane/) | Use when managing cloud infrastructure through Kubernetes with Crossplane. Covers providers, managed resources, composit... |
| [`dagger/`](dagger/) | Use when building CI/CD pipelines as code with Dagger. Covers Dagger Functions, modules, container-based execution, cach... |
| [`docker/`](docker/) | Use when writing Dockerfiles, Docker Compose files, or managing container images. Covers multi-stage builds, layer cachi... |
| [`helm/`](helm/) | Use when creating or managing Helm charts for Kubernetes applications. Covers chart structure, values files, templates, ... |
| [`kubernetes/`](kubernetes/) | Use when writing Kubernetes manifests for deploying and managing containerized applications. Covers Deployments, Service... |
| [`pulumi/`](pulumi/) | Use when writing Pulumi programs for cloud infrastructure using TypeScript, Python, Go, or C#. Covers resource declarati... |
| [`terraform/`](terraform/) | Use when writing Terraform configurations for multi-cloud infrastructure. Covers HCL resources, modules, state managemen... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/iac
```

## License

MIT
