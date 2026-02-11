# Python Package Management Rules

Best practices and rules for Python Package Management.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always use a virtual environment | CRITICAL | [`package-management-always-use-a-virtual-environment.md`](package-management-always-use-a-virtual-environment.md) |
| 2 | Commit your lockfile | HIGH | [`package-management-commit-your-lockfile.md`](package-management-commit-your-lockfile.md) |
| 3 | Separate dependency groups | CRITICAL | [`package-management-separate-dependency-groups.md`](package-management-separate-dependency-groups.md) |
| 4 | Use `>=` with minimum versions | MEDIUM | [`package-management-use-with-minimum-versions.md`](package-management-use-with-minimum-versions.md) |
| 5 | Library: `dependencies = ["httpx>=0 | MEDIUM | [`package-management-library-dependencies-httpx-0.md`](package-management-library-dependencies-httpx-0.md) |
| 6 | Application | MEDIUM | [`package-management-application.md`](package-management-application.md) |
| 7 | Prefer uv for speed | LOW | [`package-management-prefer-uv-for-speed.md`](package-management-prefer-uv-for-speed.md) |
| 8 | Use pipx or `uv tool` for global CLI tools | CRITICAL | [`package-management-use-pipx-or-uv-tool-for-global-cli-tools.md`](package-management-use-pipx-or-uv-tool-for-global-cli-tools.md) |
| 9 | Regularly update dependencies | MEDIUM | [`package-management-regularly-update-dependencies.md`](package-management-regularly-update-dependencies.md) |
| 10 | Audit for vulnerabilities | MEDIUM | [`package-management-audit-for-vulnerabilities.md`](package-management-audit-for-vulnerabilities.md) |
| 11 | Use hash checking for high-security environments | CRITICAL | [`package-management-use-hash-checking-for-high-security-environments.md`](package-management-use-hash-checking-for-high-security-environments.md) |
| 12 | Pin Python version | HIGH | [`package-management-pin-python-version.md`](package-management-pin-python-version.md) |
