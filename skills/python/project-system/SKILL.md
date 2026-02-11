---
name: project-system
description: |
  Guidance for Python project configuration and packaging using pyproject.toml, build backends, and modern PEP standards.
  USE FOR: creating pyproject.toml, configuring build backends (setuptools, hatchling, flit-core, maturin, poetry-core, pdm-backend), entry points, version management, publishing to PyPI, editable installs, monorepo patterns
  DO NOT USE FOR: installing packages or managing dependencies at runtime (use package-management), building CLI applications (use cli)
license: MIT
metadata:
  displayName: "Python Project System"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
  tags:
    - python
    - pyproject
    - setuptools
    - hatch
    - flit
    - maturin
    - packaging
    - pep621
compatibility: claude, copilot, cursor
---

# Python Project System

## Overview

Modern Python packaging has converged on `pyproject.toml` as the single source of truth for project metadata, build configuration, and tool settings. A series of PEPs have standardized how Python projects are built, distributed, and installed:

| PEP | Title | Impact |
|-----|-------|--------|
| **PEP 517** | Build system interface | Defines how frontends (pip, build) invoke backends (setuptools, hatchling) |
| **PEP 518** | Build system requirements | Introduces `[build-system]` table in `pyproject.toml` |
| **PEP 621** | Project metadata | Standardizes `[project]` table for name, version, dependencies, etc. |
| **PEP 660** | Editable installs | Standardizes `pip install -e .` for PEP 517 backends |
| **PEP 639** | License metadata | Introduces `license-files` and SPDX license expressions |
| **PEP 723** | Inline script metadata | Allows single-file scripts to declare dependencies |

The key insight: **the build backend is now pluggable**. You choose a backend in `[build-system]`, define metadata in `[project]`, and any PEP 517-compatible frontend (pip, build, uv) can build your package.

## pyproject.toml Anatomy

A complete, annotated `pyproject.toml`:

```toml
# ============================================================
# Build System (PEP 518)
# Tells pip/build which backend to use and what to install first
# ============================================================
[build-system]
requires = ["hatchling"]            # Build dependencies
build-backend = "hatchling.build"   # The entry point for the backend

# ============================================================
# Project Metadata (PEP 621)
# Standardized metadata that all backends understand
# ============================================================
[project]
name = "my-package"
version = "1.2.0"                   # Static version (or use dynamic below)
description = "A short summary of the package"
readme = "README.md"
license = "MIT"                     # SPDX expression (PEP 639)
requires-python = ">=3.11"
authors = [
    { name = "Jane Doe", email = "jane@example.com" },
]
maintainers = [
    { name = "Team Lead", email = "lead@example.com" },
]
keywords = ["automation", "tooling"]
classifiers = [
    "Development Status :: 4 - Beta",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
    "Programming Language :: Python :: 3.13",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Typing :: Typed",
]

# Core dependencies
dependencies = [
    "httpx>=0.27",
    "pydantic>=2.0,<3",
    "rich>=13.0",
]

# ============================================================
# Optional dependency groups
# Install with: pip install my-package[dev]
# ============================================================
[project.optional-dependencies]
dev = [
    "pytest>=8.0",
    "pytest-cov>=5.0",
    "mypy>=1.10",
    "ruff>=0.5",
]
docs = [
    "sphinx>=7.0",
    "sphinx-rtd-theme>=2.0",
]

# ============================================================
# Entry Points
# ============================================================
[project.scripts]
my-cli = "my_package.cli:main"         # Console script

[project.gui-scripts]
my-gui = "my_package.gui:launch"       # GUI script (no console window on Windows)

[project.entry-points."my_package.plugins"]
builtin = "my_package.plugins.builtin:BuiltinPlugin"  # Plugin entry point group

# ============================================================
# URLs shown on PyPI
# ============================================================
[project.urls]
Homepage = "https://github.com/example/my-package"
Documentation = "https://my-package.readthedocs.io"
Repository = "https://github.com/example/my-package"
Issues = "https://github.com/example/my-package/issues"
Changelog = "https://github.com/example/my-package/blob/main/CHANGELOG.md"

# ============================================================
# Backend-specific configuration
# (This section varies by backend -- example is for hatchling)
# ============================================================
[tool.hatch.build.targets.wheel]
packages = ["src/my_package"]

# ============================================================
# Tool configuration (pytest, mypy, ruff, coverage, etc.)
# ============================================================
[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-ra -q --strict-markers"

[tool.mypy]
python_version = "3.11"
strict = true
warn_return_any = true
warn_unused_configs = true

[tool.ruff]
target-version = "py311"
line-length = 88

[tool.ruff.lint]
select = ["E", "W", "F", "I", "UP", "B", "SIM"]

[tool.coverage.run]
source = ["src/my_package"]
branch = true

[tool.coverage.report]
show_missing = true
fail_under = 80
```

## Build Backends Comparison

| Backend | Package | Strengths | Best For |
|---------|---------|-----------|----------|
| **setuptools** | `setuptools` | Most mature, huge ecosystem, supports C extensions | Legacy projects, C extensions, maximum compatibility |
| **hatchling** | `hatchling` | Fast, modern, excellent defaults, Hatch project manager | New pure-Python projects, projects wanting a full workflow tool |
| **flit-core** | `flit-core` | Minimal and simple, very fast builds | Simple pure-Python packages with no special build steps |
| **pdm-backend** | `pdm-backend` | PEP 621 native, supports PEP 582 | Projects using pdm as their package manager |
| **maturin** | `maturin` | Builds Rust+Python (PyO3/cffi) packages | Rust extensions, high-performance compiled modules |
| **poetry-core** | `poetry-core` | Integrated with Poetry workflow | Projects already using Poetry (note: uses `[tool.poetry]` not `[project]` for some fields) |

### Build System Configuration by Backend

**setuptools** (most common, most flexible):
```toml
[build-system]
requires = ["setuptools>=75.0", "wheel"]
build-backend = "setuptools.build_meta"
```

**hatchling** (recommended for new projects):
```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

**flit-core** (minimal):
```toml
[build-system]
requires = ["flit_core>=3.9"]
build-backend = "flit_core.buildapi"
```

**pdm-backend**:
```toml
[build-system]
requires = ["pdm-backend"]
build-backend = "pdm.backend"
```

**maturin** (Rust extensions):
```toml
[build-system]
requires = ["maturin>=1.7"]
build-backend = "maturin"
```

**poetry-core**:
```toml
[build-system]
requires = ["poetry-core>=1.9"]
build-backend = "poetry.core.masonry.api"
```

## Source Layout vs Flat Layout

### Source Layout (Recommended)

```
my-package/
  pyproject.toml
  README.md
  LICENSE
  src/
    my_package/
      __init__.py
      core.py
      utils.py
  tests/
    __init__.py
    test_core.py
    test_utils.py
```

**Advantages**:
- Prevents accidental imports of the development version (forces installation)
- Clear separation between source code and project metadata
- Avoids name collisions between the package directory and test/script imports
- Required by some backends (flit) by default

**setuptools configuration** for src layout:
```toml
[tool.setuptools.packages.find]
where = ["src"]
```

**hatchling configuration** for src layout:
```toml
[tool.hatch.build.targets.wheel]
packages = ["src/my_package"]
```

### Flat Layout

```
my-package/
  pyproject.toml
  README.md
  LICENSE
  my_package/
    __init__.py
    core.py
    utils.py
  tests/
    test_core.py
```

**Advantages**:
- Simpler directory structure
- No `src/` prefix in import paths during development
- Works out of the box with most backends

**setuptools configuration** for flat layout:
```toml
[tool.setuptools.packages.find]
include = ["my_package*"]
```

**Recommendation**: Use the **src layout** for libraries and packages published to PyPI. Use the **flat layout** for applications and scripts that will not be distributed as packages.

## Entry Points

### Console Scripts

Console scripts create executable commands that are installed into the user's PATH:

```toml
[project.scripts]
my-cli = "my_package.cli:main"
my-tool = "my_package.tools:run"
```

The format is `command-name = "module.path:function"`. The function is called with no arguments.

```python
# src/my_package/cli.py
import sys

def main() -> int:
    """Entry point for the my-cli command."""
    print("Hello from my-cli!")
    return 0

if __name__ == "__main__":
    sys.exit(main())
```

### GUI Scripts

Same as console scripts but without opening a console window on Windows:

```toml
[project.gui-scripts]
my-gui = "my_package.gui:launch"
```

### Plugin Entry Point Groups

Used for plugin systems where third-party packages can register extensions:

```toml
# In the plugin package's pyproject.toml
[project.entry-points."myapp.plugins"]
csv-export = "myapp_csv:CsvExporter"
json-export = "myapp_json:JsonExporter"
```

Discovering plugins at runtime:

```python
from importlib.metadata import entry_points

def load_plugins():
    eps = entry_points(group="myapp.plugins")
    plugins = {}
    for ep in eps:
        plugins[ep.name] = ep.load()
    return plugins
```

## Version Management Strategies

### Static Versioning

Define the version directly in `pyproject.toml`:

```toml
[project]
version = "1.2.0"
```

Update manually before each release. Simple but error-prone.

### Dynamic Versioning from a Python File

```toml
[project]
dynamic = ["version"]

[tool.setuptools.dynamic]
version = {attr = "my_package.__version__"}
```

```python
# src/my_package/__init__.py
__version__ = "1.2.0"
```

### SCM-Based Versioning with setuptools-scm

Derive versions automatically from git tags:

```toml
[build-system]
requires = ["setuptools>=75.0", "setuptools-scm>=8"]
build-backend = "setuptools.build_meta"

[project]
dynamic = ["version"]

[tool.setuptools_scm]
# Version derived from latest git tag
# Tag "v1.2.0" -> version "1.2.0"
# 3 commits after tag -> version "1.2.1.dev3+g1234abc"
```

Workflow:
```bash
git tag v1.0.0
git push --tags
# Version is now 1.0.0

# After more commits without a tag:
# Version becomes 1.0.1.dev3+g1234abc
```

### Hatch Version Management

```toml
[project]
dynamic = ["version"]

[tool.hatch.version]
path = "src/my_package/__about__.py"
```

```python
# src/my_package/__about__.py
__version__ = "1.2.0"
```

Bump with the CLI:
```bash
hatch version minor   # 1.2.0 -> 1.3.0
hatch version patch   # 1.3.0 -> 1.3.1
hatch version major   # 1.3.1 -> 2.0.0
```

## Package Discovery Configuration

### setuptools Auto-Discovery

```toml
# Find all packages under src/
[tool.setuptools.packages.find]
where = ["src"]

# Exclude test packages
[tool.setuptools.packages.find]
where = ["src"]
exclude = ["tests*"]
```

### Including Data Files

```toml
# setuptools
[tool.setuptools.package-data]
my_package = ["data/*.json", "templates/*.html"]

# hatchling
[tool.hatch.build.targets.wheel]
packages = ["src/my_package"]

[tool.hatch.build.targets.wheel.force-include]
"config/defaults.json" = "my_package/defaults.json"
```

### Including or Excluding Files from SDist

```toml
# hatchling
[tool.hatch.build.targets.sdist]
include = ["src/", "tests/", "README.md", "LICENSE"]
exclude = ["*.pyc", "__pycache__"]

# setuptools -- use MANIFEST.in
# include src/my_package/data/*.json
# exclude tests/*
```

## Building and Publishing Workflow

### Building Distributions

Use the standard `build` tool (PEP 517 frontend):

```bash
# Install the build tool
pip install build

# Build both sdist and wheel
python -m build

# Output goes to dist/
# dist/my_package-1.2.0.tar.gz      (sdist)
# dist/my_package-1.2.0-py3-none-any.whl  (wheel)
```

### Publishing to PyPI

**Using twine** (traditional):

```bash
pip install twine

# Upload to Test PyPI first
twine upload --repository testpypi dist/*

# Upload to production PyPI
twine upload dist/*
```

**Using Trusted Publishers** (recommended for CI/CD):

Trusted publishing eliminates API tokens by using OIDC identity from your CI provider. Configure on PyPI:

1. Go to PyPI project settings and add a "trusted publisher"
2. Configure your CI provider (GitHub Actions, GitLab CI, etc.)
3. No secrets or tokens needed

GitHub Actions example:

```yaml
name: Publish to PyPI

on:
  release:
    types: [published]

permissions:
  id-token: write  # Required for trusted publishing

jobs:
  publish:
    runs-on: ubuntu-latest
    environment: pypi
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install build
      - run: python -m build
      - uses: pypa/gh-action-pypi-publish@release/v1
        # No token needed -- uses OIDC
```

**Using uv publish** (modern alternative):

```bash
uv publish
# or to Test PyPI
uv publish --index-url https://test.pypi.org/legacy/
```

## Editable Installs (PEP 660)

Editable installs let you develop a package without reinstalling after every change:

```bash
# Standard editable install
pip install -e .

# With optional dependencies
pip install -e ".[dev,docs]"

# Using uv
uv pip install -e .
```

**How it works**: The backend creates a special `.pth` file or import hook that redirects imports to your source directory. Changes to source files take effect immediately.

**Backend support**:
- setuptools: Full support (uses import hooks or `.pth` files)
- hatchling: Full support
- flit: Full support
- pdm-backend: Full support
- maturin: Supported (rebuilds Rust code on import with `maturin develop`)

## Monorepo Patterns

### Workspace with Multiple Packages

```
monorepo/
  pyproject.toml          # Root project (optional, for workspace tools)
  packages/
    core/
      pyproject.toml
      src/core/
        __init__.py
    api/
      pyproject.toml
      src/api/
        __init__.py
    cli/
      pyproject.toml
      src/cli/
        __init__.py
```

### Inter-Package Dependencies

Reference sibling packages by path during development:

```toml
# packages/api/pyproject.toml
[project]
dependencies = [
    "core",  # Published name for installation from PyPI
]

# For local development, install with:
# pip install -e packages/core
# pip install -e packages/api
```

### uv Workspaces

uv supports native workspace management:

```toml
# Root pyproject.toml
[tool.uv.workspace]
members = ["packages/*"]
```

```bash
# Install all workspace members in editable mode
uv sync
```

### Hatch Workspaces

```toml
# Root pyproject.toml
[tool.hatch.envs.default]
dependencies = [
    "core @ {root:uri}/packages/core",
    "api @ {root:uri}/packages/api",
]
```

## Best Practices

1. **Always use `pyproject.toml`**. Do not create new `setup.py` or `setup.cfg` files. These are legacy.

2. **Choose src layout for libraries**. It prevents import confusion and is the community standard for published packages.

3. **Pin your build backend version** in `[build-system].requires` to avoid surprises:
   ```toml
   requires = ["hatchling>=1.25,<2"]
   ```

4. **Use `requires-python`** to declare the minimum Python version:
   ```toml
   requires-python = ">=3.11"
   ```

5. **Specify dependency bounds**. Use minimum versions with `>=` and optional upper bounds:
   ```toml
   dependencies = [
       "httpx>=0.27",
       "pydantic>=2.0,<3",
   ]
   ```

6. **Use optional dependency groups** for dev, test, and docs dependencies to keep the core package lean.

7. **Include a `py.typed` marker** for typed packages:
   ```
   src/my_package/py.typed   # Empty file -- signals PEP 561 compliance
   ```

8. **Use SCM-based versioning** (setuptools-scm) for libraries to avoid manual version bumps.

9. **Test your packaging** before publishing:
   ```bash
   python -m build
   twine check dist/*
   pip install dist/*.whl
   ```

10. **Use trusted publishers** for PyPI uploads from CI/CD instead of long-lived API tokens.
