---
name: supply-chain
description: |
    Use when securing the software supply chain — dependencies, build pipelines, and artifact integrity. Covers SBOMs, dependency scanning, SLSA framework, artifact signing, and reproducible builds.
    USE FOR: SBOM, software bill of materials, dependency scanning, SLSA framework, artifact signing, reproducible builds, SCA, Dependabot, Snyk, Trivy, Grype, CycloneDX, SPDX
    DO NOT USE FOR: runtime vulnerability detection (use security-testing), container runtime security (use security-testing), secrets in code detection (use security-testing)
license: MIT
metadata:
  displayName: "Supply Chain Security"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "SLSA (Supply-chain Levels for Software Artifacts) Specification"
    url: "https://slsa.dev"
  - title: "OWASP CycloneDX SBOM Standard"
    url: "https://cyclonedx.org"
  - title: "SPDX (Software Package Data Exchange) Specification"
    url: "https://spdx.dev"
---

# Supply Chain Security

## Overview

Software supply chain attacks have escalated dramatically in both frequency and impact. High-profile incidents such as **SolarWinds** (compromised build pipeline injecting backdoors into signed updates), **Log4Shell** (critical vulnerability in a ubiquitous transitive dependency), and **xz-utils** (social engineering of an open-source maintainer to introduce a backdoor) demonstrate that the software you depend on is an attack surface.

Securing the supply chain means protecting three areas:

1. **Dependencies** — knowing what you include, scanning it for vulnerabilities, and keeping it up to date.
2. **Build pipelines** — ensuring that what you build is what you intended, with tamper-proof provenance.
3. **Artifacts** — signing and verifying everything you produce and consume.

## Software Bill of Materials (SBOM)

A Software Bill of Materials (SBOM) is a formal, machine-readable inventory of all components in a software artifact. It is the foundation of supply chain visibility — you cannot secure what you cannot see.

### Standard Formats

| Format     | Maintainer     | Notes                                                      |
|------------|----------------|------------------------------------------------------------|
| SPDX       | Linux Foundation | ISO/IEC 5962:2021 standard; widely adopted in compliance  |
| CycloneDX  | OWASP          | Security-focused; supports VEX (Vulnerability Exploitability eXchange) |

### What an SBOM Contains

- **Components** — every library, module, and framework included in the build
- **Versions** — exact version numbers for each component
- **Suppliers** — the origin or publisher of each component
- **Licenses** — license type for each component (MIT, Apache-2.0, GPL, etc.)
- **Dependency relationships** — the graph of direct and transitive dependencies

### SBOM Generation Tools

| Tool                | Formats Supported     | Languages / Ecosystems       | Notes                          |
|---------------------|-----------------------|------------------------------|--------------------------------|
| Syft (Anchore)      | SPDX, CycloneDX      | All major + containers       | Pairs with Grype for scanning  |
| Trivy               | SPDX, CycloneDX      | All major + containers + IaC | All-in-one scanner             |
| CycloneDX CLI       | CycloneDX             | All major                    | Official OWASP tooling         |
| Microsoft SBOM Tool | SPDX                  | All major                    | Used in Microsoft supply chain |
| SPDX Tools          | SPDX                  | All major                    | Reference implementation       |

## SLSA Framework

SLSA (Supply-chain Levels for Software Artifacts, pronounced "salsa") is a framework from Google for ensuring the integrity of software artifacts throughout the supply chain. It defines four levels of increasing assurance.

### SLSA Levels

| Level   | Requirements                                                   | Trust                                              |
|---------|----------------------------------------------------------------|----------------------------------------------------|
| Level 1 | Documentation of the build process; scripted build             | Prevents ad-hoc builds; basic provenance available |
| Level 2 | Hosted build service; signed provenance generated automatically | Provenance is harder to forge; build is auditable  |
| Level 3 | Hardened build platform; non-falsifiable provenance; isolated builds | Build cannot be tampered with by insiders          |
| Level 4 | Hermetic and reproducible builds; two-person review of all changes | Highest assurance; build output is independently verifiable |

### Key Concepts

- **Provenance** — metadata describing how an artifact was built: source repo, builder identity, build instructions, and input parameters.
- **Hermetic builds** — builds that have no network access and use only declared inputs. This prevents dependency confusion and ensures reproducibility.
- **Non-falsifiable provenance** — provenance generated by the build platform itself (not the build script), so that even a compromised build script cannot forge provenance claims.

## Dependency Scanning Tools

Regularly scan all dependencies — direct and transitive — for known vulnerabilities.

### Tool Comparison

| Tool                     | Type         | Languages              | SBOM Output | Cost        |
|--------------------------|--------------|------------------------|-------------|-------------|
| Snyk                     | SCA          | All major              | Yes         | Freemium    |
| Dependabot               | GitHub-native | All GitHub-supported   | No          | Free        |
| Trivy                    | Scanner      | All major + containers | Yes         | Free / OSS  |
| Grype + Syft             | Scanner      | All major              | Yes (Syft)  | Free / OSS  |
| OWASP Dependency-Check   | SCA          | Java, .NET, Node       | No          | Free / OSS  |

### Recommendations

- Run dependency scans in CI on every pull request and on a scheduled nightly basis.
- Enable automatic pull requests for vulnerable dependency updates (Dependabot, Snyk, Renovate).
- Triage vulnerabilities by reachability — a vulnerable function that is never called may be lower priority than one in a hot code path.
- Track and enforce a maximum age for unpatched critical/high vulnerabilities.

## Artifact Signing

Signing artifacts provides integrity and authenticity guarantees. Consumers can verify that an artifact was produced by a trusted builder and has not been tampered with.

### Container Images — Sigstore / cosign

[Sigstore](https://www.sigstore.dev/) provides keyless signing using OpenID Connect identities. `cosign` is the primary CLI tool.

```bash
# Sign a container image (keyless, using OIDC identity)
cosign sign ghcr.io/org/app:v1.2.3

# Verify a container image
cosign verify --certificate-identity=build@org.iam.gserviceaccount.com \
    --certificate-oidc-issuer=https://accounts.google.com \
    ghcr.io/org/app:v1.2.3
```

### Packages — GPG Signing

- Sign Git tags and commits with GPG or SSH keys.
- Sign release artifacts (tarballs, binaries) and publish signatures alongside them.
- Verify signatures in CI before deploying or consuming third-party packages.

### npm Provenance

npm supports publishing packages with provenance statements linking the published package back to its source repository and build workflow.

```bash
npm publish --provenance
```

### PyPI Trusted Publishers

PyPI Trusted Publishers allow GitHub Actions (and other CI providers) to publish packages without long-lived API tokens, using OIDC federation. This eliminates token theft as an attack vector.

## Lock Files

Lock files record the exact resolved versions (and often integrity hashes) of every dependency in your dependency tree. They are critical for reproducible and secure builds.

### Rules

- **Always commit lock files to version control.** Without a lock file, builds resolve dependencies at install time and may pick up compromised or incompatible versions.
- **Pin exact versions** in lock files rather than relying on ranges.
- **Review lock file diffs** in pull requests — unexpected changes to transitive dependencies can indicate supply chain attacks.

### Lock Files by Ecosystem

| Ecosystem  | Lock File              |
|------------|------------------------|
| npm        | `package-lock.json`    |
| Yarn       | `yarn.lock`            |
| pnpm       | `pnpm-lock.yaml`       |
| Python     | `poetry.lock`          |
| Go         | `go.sum`               |
| Rust       | `Cargo.lock`           |
| .NET       | `packages.lock.json`   |

## Reproducible Builds

A build is **reproducible** if given the same source code, build environment, and build instructions, it produces bit-for-bit identical output every time, regardless of when or where it is run.

### Why Reproducible Builds Matter

- **Verification** — anyone can independently rebuild the artifact and confirm it matches the distributed binary, proving no tampering occurred.
- **Auditability** — reproducible builds make it possible to trace exactly what went into an artifact.
- **Trust** — users do not need to blindly trust the build infrastructure; they can verify.

### How to Achieve Reproducible Builds

1. **Eliminate non-determinism** — remove timestamps, random values, and file-ordering differences from the build process.
2. **Pin all build tools and dependencies** — use lock files, pinned base images (by digest, not tag), and version-locked compilers.
3. **Use hermetic build environments** — no network access during the build; all inputs are declared and fetched beforehand.
4. **Containerize the build** — use a fixed, content-addressed container image for the build environment.
5. **Sort all file listings and map iterations** — many languages iterate maps or directories in non-deterministic order.
6. **Strip or normalize metadata** — remove build paths, timestamps, and environment-specific data from output artifacts.

## Best Practices

- **Generate and maintain SBOMs** for every release artifact using SPDX or CycloneDX format, and store them alongside the artifacts they describe.
- **Run dependency scanning in CI** on every pull request and on a nightly schedule; block merges with critical or high unpatched vulnerabilities.
- **Commit lock files to version control** and review lock file diffs in pull requests to detect unexpected dependency changes.
- **Sign all release artifacts** — use Sigstore/cosign for container images, GPG for packages, and enable npm provenance or PyPI Trusted Publishers as applicable.
- **Target SLSA Level 2 or higher** for production build pipelines, with signed provenance generated automatically by the build platform.
- **Enable automatic dependency update PRs** via Dependabot, Renovate, or Snyk to keep dependencies current and reduce the window of exposure.
- **Use reproducible, hermetic builds** to ensure that build output can be independently verified and is not dependent on external state.
- **Audit your transitive dependency tree** regularly — most supply chain attacks target deep transitive dependencies that are less visible to maintainers.
