# Dev Containers Rules

Best practices and rules for Dev Containers.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Prefer features over custom Dockerfiles for common tools | LOW | [`devcontainer-prefer-features-over-custom-dockerfiles-for-common-tools.md`](devcontainer-prefer-features-over-custom-dockerfiles-for-common-tools.md) |
| 2 | Use `postCreateCommand` for project-specific setup... | MEDIUM | [`devcontainer-use-postcreatecommand-for-project-specific-setup.md`](devcontainer-use-postcreatecommand-for-project-specific-setup.md) |
| 3 | Pin feature versions with major version tags (e | MEDIUM | [`devcontainer-pin-feature-versions-with-major-version-tags-e.md`](devcontainer-pin-feature-versions-with-major-version-tags-e.md) |
| 4 | Use `containerEnv` for build-time variables and `remoteEnv`... | CRITICAL | [`devcontainer-use-containerenv-for-build-time-variables-and-remoteenv.md`](devcontainer-use-containerenv-for-build-time-variables-and-remoteenv.md) |
| 5 | Enable Codespaces prebuilds to cache `postCreateCommand`... | MEDIUM | [`devcontainer-enable-codespaces-prebuilds-to-cache-postcreatecommand.md`](devcontainer-enable-codespaces-prebuilds-to-cache-postcreatecommand.md) |
| 6 | Use `"shutdownAction" | MEDIUM | [`devcontainer-use-shutdownaction.md`](devcontainer-use-shutdownaction.md) |
| 7 | Keep `.devcontainer/` in version control so every... | MEDIUM | [`devcontainer-keep-devcontainer-in-version-control-so-every.md`](devcontainer-keep-devcontainer-in-version-control-so-every.md) |
