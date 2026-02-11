# Dev Container — Python Rules

Best practices and rules for Dev Container — Python.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the dedicated `mcr | MEDIUM | [`python-use-the-dedicated-mcr.md`](python-use-the-dedicated-mcr.md) |
| 2 | Pin the Python version to a minor release (`3 | MEDIUM | [`python-pin-the-python-version-to-a-minor-release-3.md`](python-pin-the-python-version-to-a-minor-release-3.md) |
| 3 | Prefer Ruff over separate flake8/black installs | LOW | [`python-prefer-ruff-over-separate-flake8-black-installs.md`](python-prefer-ruff-over-separate-flake8-black-installs.md) |
| 4 | Use `postCreateCommand` for `pip install` so dependencies... | MEDIUM | [`python-use-postcreatecommand-for-pip-install-so-dependencies.md`](python-use-postcreatecommand-for-pip-install-so-dependencies.md) |
| 5 | Set `python | HIGH | [`python-set-python.md`](python-set-python.md) |
| 6 | For data science projects, enable `installJupyterlab` in... | MEDIUM | [`python-for-data-science-projects-enable-installjupyterlab-in.md`](python-for-data-science-projects-enable-installjupyterlab-in.md) |
| 7 | Use `containerEnv` to configure `VIRTUAL_ENV` if your... | MEDIUM | [`python-use-containerenv-to-configure-virtual-env-if-your.md`](python-use-containerenv-to-configure-virtual-env-if-your.md) |
