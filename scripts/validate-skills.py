#!/usr/bin/env python3
"""Validate repository skill frontmatter and directory contracts.

The upstream skills-ref validator currently rejects this repository's documented
`references` frontmatter field. This validator follows AGENTS.md so `npm test`
can validate the actual marketplace contract.
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path
from typing import Any

import yaml


ALLOWED_FIELDS = {
    "allowed-tools",
    "compatibility",
    "description",
    "license",
    "metadata",
    "name",
    "references",
}
NAME_PATTERN = re.compile(r"^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$")
ROOTS = (Path("skills"), Path(".agents") / "skills")


def parse_skill(path: Path) -> tuple[dict[str, Any], str]:
    content = path.read_text(encoding="utf-8")
    if not content.startswith("---\n"):
        raise ValueError("missing YAML frontmatter")

    try:
        _, frontmatter, body = content.split("---", 2)
    except ValueError as exc:
        raise ValueError("frontmatter must be delimited by --- fences") from exc

    data = yaml.safe_load(frontmatter) or {}
    if not isinstance(data, dict):
        raise ValueError("frontmatter must be a mapping")

    return data, body


def validate_metadata(metadata: Any) -> list[str]:
    errors: list[str] = []
    if metadata is None:
        return errors
    if not isinstance(metadata, dict):
        return ["metadata must be a mapping"]

    tags = metadata.get("tags")
    if tags is not None:
        if not isinstance(tags, list) or not all(isinstance(tag, str) for tag in tags):
            errors.append("metadata.tags must be a list of strings")

    for key in ("displayName", "author", "version"):
        value = metadata.get(key)
        if value is not None and not isinstance(value, str):
            errors.append(f"metadata.{key} must be a string")

    return errors


def validate_references(references: Any) -> list[str]:
    if references is None:
        return []
    if not isinstance(references, list):
        return ["references must be a list"]

    errors: list[str] = []
    for index, reference in enumerate(references):
        if not isinstance(reference, dict):
            errors.append(f"references[{index}] must be a mapping")
            continue
        if not isinstance(reference.get("title"), str) or not reference["title"].strip():
            errors.append(f"references[{index}].title must be a non-empty string")
        if not isinstance(reference.get("url"), str) or not reference["url"].strip():
            errors.append(f"references[{index}].url must be a non-empty string")
    return errors


def validate_allowed_tools(value: Any) -> list[str]:
    if value is None:
        return []
    if not isinstance(value, list) or not all(isinstance(tool, str) for tool in value):
        return ["allowed-tools must be a list of strings"]
    return []


def validate_skill_dir(skill_dir: Path) -> list[str]:
    errors: list[str] = []
    skill_path = skill_dir / "SKILL.md"

    try:
        frontmatter, body = parse_skill(skill_path)
    except Exception as exc:
        return [str(exc)]

    unexpected = sorted(set(frontmatter) - ALLOWED_FIELDS)
    if unexpected:
        errors.append(f"unexpected frontmatter fields: {', '.join(unexpected)}")

    name = frontmatter.get("name")
    if not isinstance(name, str) or not name:
        errors.append("name must be a non-empty string")
    elif not NAME_PATTERN.fullmatch(name):
        errors.append("name must use lowercase letters, digits, and hyphens only, max 64 chars")
    elif name != skill_dir.name:
        errors.append(f"name must match directory name: expected {skill_dir.name!r}, got {name!r}")

    description = frontmatter.get("description")
    if not isinstance(description, str) or not description.strip():
        errors.append("description must be a non-empty string")
    elif len(description) > 1024:
        errors.append("description must be 1024 characters or fewer")

    license_value = frontmatter.get("license")
    if license_value is not None and not isinstance(license_value, str):
        errors.append("license must be a string")

    compatibility = frontmatter.get("compatibility")
    if compatibility is not None:
        is_string = isinstance(compatibility, str)
        is_string_list = isinstance(compatibility, list) and all(
            isinstance(item, str) for item in compatibility
        )
        if not is_string and not is_string_list:
            errors.append("compatibility must be a string or list of strings")

    errors.extend(validate_metadata(frontmatter.get("metadata")))
    errors.extend(validate_references(frontmatter.get("references")))
    errors.extend(validate_allowed_tools(frontmatter.get("allowed-tools")))

    if not body.strip():
        errors.append("SKILL.md body must not be empty")

    return errors


def discover_skill_dirs() -> list[Path]:
    skill_dirs: list[Path] = []
    for root in ROOTS:
        if not root.exists():
            continue
        for skill_file in root.rglob("SKILL.md"):
            skill_dirs.append(skill_file.parent)
    return sorted(skill_dirs)


def main(argv: list[str]) -> int:
    os.chdir(Path(__file__).resolve().parents[1])
    targets = [Path(arg) for arg in argv] if argv else discover_skill_dirs()

    passed = 0
    failures: list[tuple[Path, list[str]]] = []
    for target in targets:
        errors = validate_skill_dir(target)
        if errors:
            failures.append((target, errors))
        else:
            passed += 1

    for target, errors in failures:
        print(f"Validation failed for {target}:")
        for error in errors:
            print(f"  - {error}")

    print("")
    print("=== Validation Summary ===")
    print(f"Passed: {passed}")
    print(f"Failed: {len(failures)}")

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
