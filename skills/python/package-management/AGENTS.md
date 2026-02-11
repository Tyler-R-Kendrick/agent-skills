# Python Package Management

## Overview

Python package management has evolved significantly. While `pip` remains the foundational tool, newer tools like `uv`, `poetry`, and `pdm` offer integrated workflows with lockfiles, virtual environment management, and faster resolution. The choice of tool depends on project complexity, team preferences, and whether you need features like lockfile support or monorepo management.

## Tool Comparison

| Feature | pip | uv | poetry | pdm | conda | pipx | pip-tools |
|---------|-----|----|--------|-----|-------|------|-----------|
| **Install packages** | Yes | Yes | Yes | Yes | Yes | Yes (global CLI tools) | Yes |
| **Lockfile support** | No (use pip-tools) | Yes (`uv.lock`) | Yes (`poetry.lock`) | Yes (`pdm.lock`) | Yes (`conda-lock`) | N/A | Yes (`requirements.txt` from `*.in`) |
| **Virtual env management** | No (use `venv`) | Yes (`uv venv`) | Yes (auto-creates) | Yes (auto-creates) | Yes (conda envs) | Yes (isolated) | No |
| **Dependency resolution** | Backtracking | SAT solver (fast) | SAT solver | SAT solver | SAT solver | N/A | Backtracking |
| **Speed** | Moderate | Very fast (Rust) | Moderate | Fast | Slow | Fast | Moderate |
| **Monorepo/workspace** | No | Yes (workspaces) | No (limited) | No | No | No | No |
| **Python version management** | No | Yes (`uv python`) | No | No | Yes | No | No |
| **PEP 621 native** | Yes | Yes | Partial | Yes | N/A | N/A | Yes |
| **Private indexes** | Yes | Yes | Yes | Yes | Yes (channels) | Yes | Yes |

**Recommendation**: Use **uv** for new projects. It is the fastest tool, supports lockfiles, manages virtual environments and Python versions, and is fully PEP 621-compatible. Use **poetry** if your team is already invested in its workflow. Use **conda** for scientific computing with non-Python dependencies.

## pip Essentials

pip is the default package installer for Python, included with every Python installation.

### Basic Commands

```bash
# Install a package
pip install httpx

# Install a specific version
pip install httpx==0.27.0

# Install with version constraints
pip install "httpx>=0.27,<1.0"

# Install from a requirements file
pip install -r requirements.txt

# Install a local package in editable mode
pip install -e .

# Install with optional dependencies
pip install -e ".[dev,docs]"

# Uninstall
pip uninstall httpx

# List installed packages
pip list

# Show package info
pip show httpx

# Check for outdated packages
pip list --outdated

# Upgrade a package
pip install --upgrade httpx
```

### requirements.txt

The traditional way to pin dependencies:

```
# requirements.txt -- production dependencies
httpx==0.27.0
pydantic==2.9.2
rich==13.9.4

# requirements-dev.txt -- development dependencies
-r requirements.txt
pytest==8.3.3
pytest-cov==5.0.0
mypy==1.13.0
ruff==0.7.4
```

### Constraints Files

Constraints files limit versions without requiring installation:

```
# constraints.txt
# Ensures these versions are used IF the package is installed
urllib3>=2.0,<3
certifi>=2024.0
```

```bash
pip install -r requirements.txt -c constraints.txt
```

### pip Configuration

```ini
# pip.conf (Linux: ~/.config/pip/pip.conf, macOS: ~/Library/Application Support/pip/pip.conf)
# pip.ini (Windows: %APPDATA%\pip\pip.ini)
[global]
timeout = 60
index-url = https://pypi.org/simple
trusted-host = pypi.org

[install]
require-virtualenv = true   # Prevent accidental global installs
```

## uv Deep Dive

uv is an extremely fast Python package manager written in Rust. It is a drop-in replacement for pip, venv, pip-tools, and more.

### Installation

```bash
# Install uv (standalone)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Or with pip
pip install uv

# Or with Homebrew
brew install uv
```

### Python Version Management

```bash
# List available Python versions
uv python list

# Install a specific Python version
uv python install 3.12

# Pin a project to a specific Python version
uv python pin 3.12
# Creates .python-version file
```

### Virtual Environment Management

```bash
# Create a virtual environment
uv venv

# Create with a specific Python version
uv venv --python 3.12

# Activate (same as standard venv)
source .venv/bin/activate      # Linux/macOS
.venv\Scripts\activate         # Windows
```

### Package Installation (pip-compatible interface)

```bash
# Install packages (10-100x faster than pip)
uv pip install httpx pydantic rich

# Install from requirements file
uv pip install -r requirements.txt

# Install editable package
uv pip install -e ".[dev]"

# Compile a lockfile from requirements.in
uv pip compile requirements.in -o requirements.txt

# Sync environment to match lockfile exactly
uv pip sync requirements.txt

# Freeze current environment
uv pip freeze > requirements.txt
```

### Project Management (uv lock / uv sync / uv run)

uv has built-in project management that uses `pyproject.toml` and creates a cross-platform lockfile:

```bash
# Initialize a new project
uv init my-project
cd my-project

# Add dependencies
uv add httpx
uv add pydantic "rich>=13.0"

# Add development dependencies
uv add --dev pytest pytest-cov mypy ruff

# Remove a dependency
uv remove httpx

# Create/update the lockfile (uv.lock)
uv lock

# Sync the environment to match pyproject.toml + uv.lock
uv sync

# Sync including dev dependencies (default)
uv sync --all-extras

# Run a command in the project environment
uv run python -m pytest
uv run my-cli --help
uv run python script.py
```

### uv Tool Management (replaces pipx)

```bash
# Install a CLI tool globally (isolated environment)
uv tool install ruff
uv tool install httpie

# Run a tool without installing it
uv tool run black --check .
uvx ruff check .    # uvx is a shorthand for uv tool run

# List installed tools
uv tool list

# Upgrade a tool
uv tool upgrade ruff
```

### uv Workspaces (Monorepos)

```toml
# Root pyproject.toml
[tool.uv.workspace]
members = ["packages/*"]
```

```bash
# Sync all workspace members
uv sync

# Run a command in a specific workspace member
uv run --package api python -m pytest
```

### uv Cache Management

```bash
# Show cache directory
uv cache dir

# Clean the cache
uv cache clean

# Prune unused cache entries
uv cache prune
```

## Poetry Workflow

Poetry provides an all-in-one solution for dependency management, packaging, and publishing.

### Installation

```bash
# Recommended: use the official installer
curl -sSL https://install.python-poetry.org | python3 -

# Or with pipx
pipx install poetry
```

### Project Lifecycle

```bash
# Create a new project
poetry new my-project
cd my-project

# Or initialize in an existing directory
poetry init

# Add dependencies
poetry add httpx
poetry add pydantic "rich>=13.0"

# Add development dependencies
poetry add --group dev pytest pytest-cov mypy ruff

# Remove a dependency
poetry remove httpx

# Update dependencies (respects version constraints)
poetry update

# Update a specific package
poetry update httpx

# Generate/update the lockfile without installing
poetry lock

# Install all dependencies from the lockfile
poetry install

# Install without dev dependencies
poetry install --without dev

# Run a command in the virtual environment
poetry run python script.py
poetry run pytest

# Activate the virtual environment
poetry shell

# Show dependency tree
poetry show --tree

# Export to requirements.txt (useful for Docker)
poetry export -f requirements.txt -o requirements.txt --without-hashes
```

### poetry.lock

The `poetry.lock` file pins exact versions of all dependencies (direct and transitive). Always commit this file to version control.

```bash
# Regenerate from scratch
poetry lock --no-update

# Check if lock file is up to date
poetry check
```

### Publishing with Poetry

```bash
# Build distributions
poetry build

# Configure PyPI token
poetry config pypi-token.pypi pypi-AgEIcHlwaS...

# Publish
poetry publish

# Build and publish in one step
poetry publish --build
```

### Poetry Configuration

```bash
# Create virtualenvs in the project directory (.venv)
poetry config virtualenvs.in-project true

# Use a specific Python version
poetry env use python3.12

# Show environment info
poetry env info
```

## pdm Workflow

pdm is a modern Python package manager that supports PEP 621 natively and pioneered PEP 582 (local packages directory, now withdrawn).

### Basic Workflow

```bash
# Install pdm
pip install pdm
# or
pipx install pdm

# Create a new project
pdm init

# Add dependencies
pdm add httpx pydantic

# Add development dependencies
pdm add -dG dev pytest mypy ruff

# Install from lockfile
pdm install

# Update dependencies
pdm update

# Run commands
pdm run python script.py
pdm run pytest

# Build
pdm build

# Publish
pdm publish
```

### pdm.lock

pdm generates a cross-platform lockfile (`pdm.lock`). Commit it to version control.

```bash
# Lock dependencies
pdm lock

# Export to requirements.txt
pdm export -f requirements -o requirements.txt
```

## conda for Scientific Computing

conda manages packages, dependencies, and environments with support for non-Python libraries (C, Fortran, CUDA).

### Basic Workflow

```bash
# Create an environment
conda create -n myproject python=3.12

# Activate
conda activate myproject

# Install packages
conda install numpy pandas scikit-learn

# Install from conda-forge (community channel with more packages)
conda install -c conda-forge polars

# Export environment
conda env export > environment.yml

# Recreate environment from file
conda env create -f environment.yml

# List environments
conda env list

# Remove environment
conda env remove -n myproject
```

### environment.yml

```yaml
name: myproject
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.12
  - numpy>=1.26
  - pandas>=2.2
  - scikit-learn>=1.5
  - matplotlib>=3.9
  - pip:
    - httpx>=0.27       # pip packages when not available in conda
    - pydantic>=2.0
```

### conda vs pip

| Aspect | conda | pip |
|--------|-------|-----|
| **Package types** | Any (C, Fortran, Python, R, CUDA) | Python-only |
| **Dependency resolution** | Includes system libraries | Python packages only |
| **Speed** | Slower | Faster (especially with uv) |
| **Channels** | conda-forge, defaults, custom | PyPI, custom indexes |
| **Best for** | Scientific computing, ML, data science | General Python development |

**Recommendation**: Use conda when you need non-Python dependencies (CUDA, MKL, system libraries). For everything else, prefer uv or pip.

## pipx for CLI Tool Isolation

pipx installs Python CLI tools in isolated environments so they do not conflict with project dependencies.

```bash
# Install pipx
pip install pipx
pipx ensurepath

# Install CLI tools
pipx install ruff
pipx install httpie
pipx install cookiecutter
pipx install pre-commit

# Run without installing
pipx run cowsay "Hello!"

# Upgrade
pipx upgrade ruff
pipx upgrade-all

# List installed tools
pipx list

# Uninstall
pipx uninstall ruff
```

**Note**: uv can replace pipx with `uv tool install` and `uvx` (see the uv section above).

## Virtual Environment Strategies

### Standard Library venv

```bash
# Create
python -m venv .venv

# Activate
source .venv/bin/activate      # Linux/macOS
.venv\Scripts\activate         # Windows

# Deactivate
deactivate

# Create with access to system packages
python -m venv --system-site-packages .venv
```

### uv venv (Recommended)

```bash
# Create (much faster than venv)
uv venv

# Create with specific Python
uv venv --python 3.12

# Create in a custom location
uv venv myenv
```

### virtualenv (Third-Party)

```bash
pip install virtualenv

# Create (faster than venv, more features)
virtualenv .venv

# Create with specific Python
virtualenv -p python3.12 .venv
```

### Conventions

- Name: `.venv` (hidden directory, widely recognized by tools and IDEs)
- Location: Project root directory
- Git: Add `.venv/` to `.gitignore`
- CI: Recreate from lockfile on each run, do not cache the entire venv

## Dependency Resolution and Lockfiles

### Why Lockfiles Matter

A lockfile pins the exact version of every dependency (direct and transitive) to ensure reproducible installs:

- **Without lockfile**: `pip install httpx` may install different transitive dependency versions on different machines or at different times.
- **With lockfile**: Every install produces the identical environment.

### Lockfile Formats

| Tool | Lockfile | Cross-Platform | Format |
|------|----------|---------------|--------|
| **uv** | `uv.lock` | Yes | TOML |
| **poetry** | `poetry.lock` | Yes | TOML |
| **pdm** | `pdm.lock` | Yes | TOML |
| **pip-tools** | `requirements.txt` | No (per-platform) | Text |
| **conda-lock** | `conda-lock.yml` | Yes | YAML |

### pip-tools Workflow

pip-tools compiles `*.in` files into pinned `requirements.txt`:

```bash
pip install pip-tools

# Define abstract dependencies
# requirements.in
# httpx>=0.27
# pydantic>=2.0

# Compile to pinned versions
pip-compile requirements.in

# Output: requirements.txt with exact versions and hashes
# httpx==0.27.2
# pydantic==2.9.2
# ... all transitive dependencies pinned

# Sync environment to match
pip-sync requirements.txt

# Upgrade all
pip-compile --upgrade requirements.in

# Upgrade a specific package
pip-compile --upgrade-package httpx requirements.in
```

## Private Package Indexes

### Configuring pip

```bash
# Install from a private index
pip install my-internal-package --index-url https://private.pypi.example.com/simple/

# Use an extra index alongside PyPI
pip install my-internal-package --extra-index-url https://private.pypi.example.com/simple/
```

### pip.conf / pip.ini

```ini
[global]
index-url = https://private.pypi.example.com/simple/
extra-index-url = https://pypi.org/simple/
trusted-host = private.pypi.example.com
```

### Authentication with keyring

```bash
pip install keyring keyrings.google-artifactregistry-auth

# Keyring automatically provides credentials for configured indexes
pip install my-package --index-url https://us-central1-python.pkg.dev/my-project/my-repo/simple/
```

### pyproject.toml Configuration

**uv**:
```toml
[[tool.uv.index]]
name = "internal"
url = "https://private.pypi.example.com/simple/"

[[tool.uv.index]]
name = "pypi"
url = "https://pypi.org/simple/"
```

**poetry**:
```toml
[[tool.poetry.source]]
name = "internal"
url = "https://private.pypi.example.com/simple/"
priority = "primary"
```

### devpi (Private PyPI Server)

```bash
# Install devpi
pip install devpi-server devpi-client

# Initialize and start
devpi-server --init
devpi-server --start

# Configure client
devpi use http://localhost:3141
devpi login root --password=""
devpi index -c root/internal
devpi use root/internal

# Upload a package
devpi upload
```

## Best Practices

1. **Always use a virtual environment**. Never install project dependencies into the system Python. Set `require-virtualenv = true` in pip configuration.

2. **Commit your lockfile**. Whether it is `uv.lock`, `poetry.lock`, `pdm.lock`, or a compiled `requirements.txt`, commit it to version control for reproducible builds.

3. **Separate dependency groups**. Use optional dependency groups (`[project.optional-dependencies]`) or tool-specific groups to keep production dependencies lean:
   ```toml
   [project.optional-dependencies]
   dev = ["pytest", "mypy", "ruff"]
   docs = ["sphinx"]
   ```

4. **Use `>=` with minimum versions** for libraries, exact pins for applications:
   - Library: `dependencies = ["httpx>=0.27"]`
   - Application: Use a lockfile to pin exact versions

5. **Prefer uv for speed**. uv is 10-100x faster than pip for resolution and installation. It is a drop-in replacement.

6. **Use pipx or `uv tool` for global CLI tools**. Do not install ruff, black, httpie, etc. into your project virtual environment if they are only needed as standalone tools.

7. **Regularly update dependencies**:
   ```bash
   # uv
   uv lock --upgrade

   # poetry
   poetry update

   # pip-tools
   pip-compile --upgrade requirements.in
   ```

8. **Audit for vulnerabilities**:
   ```bash
   pip install pip-audit
   pip-audit

   # Or with uv
   uv pip audit
   ```

9. **Use hash checking for high-security environments**:
   ```bash
   # pip-tools generates hashes
   pip-compile --generate-hashes requirements.in

   # pip verifies
   pip install --require-hashes -r requirements.txt
   ```

10. **Pin Python version** with `.python-version` or `requires-python` in `pyproject.toml` to prevent environment drift.
