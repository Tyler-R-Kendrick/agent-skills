#!/usr/bin/env python3
"""Generate rules/ directories for every skill that has a Best Practices section.

Extracts best practice bullets from SKILL.md and creates individual rule files
following the Vercel agent-skills pattern:
  - _template.md   : rule authoring template
  - _sections.md   : index table of all rules with impact levels
  - {name}-{slug}.md : one file per best practice

Usage:
    python scripts/generate-rules.py [--dry-run] [--verbose]
"""

import json
import os
import re
import sys
import yaml


SKILLS_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "skills"))

# Section headers that contain best practices
BP_HEADERS = [
    r"## Best Practices",
    r"## Guidelines",
    r"## Rules You Must Follow",
    r"## Rules",
    r"## Recommendations",
]

# Keyword heuristics for impact classification
CRITICAL_KEYWORDS = [
    "never", "always", "must", "critical", "security", "vulnerability",
    "injection", "secret", "credential", "production", "do not",
]
HIGH_KEYWORDS = [
    "important", "ensure", "require", "enforce", "validate", "prevent",
    "protect", "avoid", "mandatory",
]
LOW_KEYWORDS = [
    "consider", "prefer", "optionally", "where possible", "when practical",
    "if needed", "may want",
]


def parse_skill_md(path: str):
    """Parse SKILL.md into (frontmatter_dict, body_str)."""
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)", content, re.DOTALL)
    if not match:
        return None, content
    fm_text, body = match.group(1), match.group(2)
    try:
        fm = yaml.safe_load(fm_text)
    except yaml.YAMLError:
        fm = {}
    return fm or {}, body


def display_name_from(name: str, metadata: dict) -> str:
    """Get display name from metadata or title-case the name."""
    if metadata and metadata.get("displayName"):
        return metadata["displayName"]
    return name.replace("-", " ").title()


def extract_best_practices(body: str) -> list:
    """Extract bullet items from the best-practices-like section of the body."""
    header_pattern = "|".join(BP_HEADERS)
    match = re.search(
        rf"(?:^|\n)({header_pattern})\s*\n(.*?)(?=\n## |\Z)",
        body,
        re.DOTALL | re.MULTILINE,
    )
    if not match:
        return []

    section_text = match.group(2)

    # Parse bullet items (- prefixed), handling continuation lines
    bullets = []
    current = None
    for line in section_text.splitlines():
        stripped = line.strip()
        if stripped.startswith("- "):
            if current is not None:
                bullets.append(current)
            current = stripped[2:]
        elif re.match(r"^\d+\.\s+", stripped):
            # Numbered list item
            if current is not None:
                bullets.append(current)
            current = re.sub(r"^\d+\.\s+", "", stripped)
        elif current is not None and stripped and not stripped.startswith("#"):
            current += " " + stripped
        elif not stripped:
            if current is not None:
                bullets.append(current)
                current = None
    if current is not None:
        bullets.append(current)

    return [b.strip() for b in bullets if b.strip()]


def parse_bullet(bullet_text: str) -> dict:
    """Parse a bullet into title and description."""
    # Pattern 1: **Bold Label**: description or **Bold Label** description
    bold_match = re.match(r"\*\*(.+?)\*\*[:\.\s—–-]*(.+)", bullet_text, re.DOTALL)
    if bold_match:
        title = bold_match.group(1).strip()
        description = bold_match.group(2).strip()
        # If description starts with lowercase, prepend title for full sentence
        if description and description[0].islower():
            description = title + ": " + description
        return {"title": title, "description": description}

    # Pattern 2: plain text — derive title from first clause
    description = bullet_text.strip()
    # Try to find a natural break point for the title
    title_match = re.match(r"^(.{10,60}?)[.!?:—–]", description)
    if title_match:
        title = title_match.group(1).strip().rstrip(",;:")
    else:
        if len(description) <= 60:
            title = description.rstrip(".")
        else:
            title = description[:60].rsplit(" ", 1)[0] + "..."
    return {"title": title, "description": description}


def generate_rule_filename(title: str, skill_name: str) -> str:
    """Generate a kebab-case filename from the rule title, prefixed by skill name."""
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    if len(slug) > 60:
        slug = slug[:60].rsplit("-", 1)[0]

    prefix = re.sub(r"[^a-z0-9]+", "-", skill_name.lower()).strip("-")
    if slug.startswith(prefix):
        return f"{slug}.md"
    return f"{prefix}-{slug}.md"


def determine_impact(bullet_text: str):
    """Return (impact_level, impact_description) based on keyword heuristics."""
    text_lower = bullet_text.lower()
    for kw in CRITICAL_KEYWORDS:
        if kw in text_lower:
            return ("CRITICAL", "essential for correctness or security")
    for kw in HIGH_KEYWORDS:
        if kw in text_lower:
            return ("HIGH", "significant quality or reliability improvement")
    for kw in LOW_KEYWORDS:
        if kw in text_lower:
            return ("LOW", "recommended but situational")
    return ("MEDIUM", "general best practice")


def derive_tags(fm: dict, skill_dir: str) -> list:
    """Derive tags from skill metadata and directory path."""
    tags = []
    metadata = fm.get("metadata") or {}
    if isinstance(metadata.get("tags"), list):
        tags.extend(metadata["tags"])

    name = fm.get("name", os.path.basename(skill_dir))
    if name and name not in tags:
        tags.append(name)

    rel = os.path.relpath(skill_dir, SKILLS_ROOT).replace("\\", "/")
    parts = rel.split("/")
    for part in parts[:-1]:
        if part not in tags:
            tags.append(part)

    desc = fm.get("description", "")
    use_for_match = re.search(r"USE FOR:\s*(.+?)(?:\n|DO NOT)", desc)
    if use_for_match:
        keywords = [kw.strip() for kw in use_for_match.group(1).split(",")]
        for kw in keywords[:3]:
            clean = re.sub(r"[^a-z0-9-]", "", kw.lower().replace(" ", "-"))
            if clean and clean not in tags:
                tags.append(clean)

    return tags


def build_rule_content(title: str, description: str, impact: str,
                       impact_desc: str, tags: list) -> str:
    """Build the full markdown content for a single rule file."""
    tag_str = ", ".join(tags)
    # Escape quotes in title for YAML
    safe_title = title.replace('"', '\\"')
    lines = [
        "---",
        f'title: "{safe_title}"',
        f"impact: {impact}",
        f'impactDescription: "{impact_desc}"',
        f"tags: {tag_str}",
        "---",
        "",
        f"## {title}",
        "",
        description,
        "",
    ]
    return "\n".join(lines)


def build_template_content(skill_name: str) -> str:
    """Generate _template.md for the rules/ directory."""
    return f"""---
title: "Rule Title"
impact: MEDIUM
impactDescription: "brief explanation of why this matters"
tags: {skill_name}, tag2
---

## Rule Title

Brief explanation of the rule and why it matters.

**Incorrect:**

```
<!-- Example of what NOT to do -->
```

**Correct:**

```
<!-- Example of the recommended approach -->
```

**Reference:** [link to documentation or source]
"""


def build_sections_content(rules: list, skill_name: str,
                           display_name: str) -> str:
    """Generate _sections.md that indexes all rules in the directory."""
    lines = [
        f"# {display_name} Rules",
        "",
        f"Best practices and rules for {display_name}.",
        "",
        "## Rules",
        "",
        "| # | Rule | Impact | File |",
        "|---|------|--------|------|",
    ]
    for i, rule in enumerate(rules, 1):
        lines.append(
            f"| {i} | {rule['title']} | {rule['impact']} | "
            f"[`{rule['filename']}`]({rule['filename']}) |"
        )
    lines.append("")
    return "\n".join(lines)


def write_rules_directory(skill_dir: str, rules: list, skill_name: str,
                          display_name: str, dry_run: bool = False) -> int:
    """Create rules/ directory and write all rule files. Returns file count."""
    rules_dir = os.path.join(skill_dir, "rules")
    if not dry_run:
        os.makedirs(rules_dir, exist_ok=True)

    files_written = 0

    # _template.md
    if not dry_run:
        with open(os.path.join(rules_dir, "_template.md"), "w", encoding="utf-8") as f:
            f.write(build_template_content(skill_name))
    files_written += 1

    # Deduplicate filenames
    seen = set()
    for rule in rules:
        fn = rule["filename"]
        if fn in seen:
            base, ext = os.path.splitext(fn)
            fn = f"{base}-{rule['index']}{ext}"
            rule["filename"] = fn
        seen.add(fn)

    # _sections.md (needs final filenames)
    if not dry_run:
        with open(os.path.join(rules_dir, "_sections.md"), "w", encoding="utf-8") as f:
            f.write(build_sections_content(rules, skill_name, display_name))
    files_written += 1

    # Individual rule files
    for rule in rules:
        if not dry_run:
            with open(os.path.join(rules_dir, rule["filename"]), "w", encoding="utf-8") as f:
                f.write(rule["content"])
        files_written += 1

    return files_written


def main():
    dry_run = "--dry-run" in sys.argv
    verbose = "--verbose" in sys.argv or "-v" in sys.argv

    if not os.path.isdir(SKILLS_ROOT):
        print(f"ERROR: skills root not found: {SKILLS_ROOT}", file=sys.stderr)
        sys.exit(1)

    # Discover all SKILL.md files
    skill_dirs = []
    for root, dirs, files in os.walk(SKILLS_ROOT):
        if "SKILL.md" in files:
            skill_dirs.append(root)
    skill_dirs.sort()

    print(f"Found {len(skill_dirs)} skill directories")
    if dry_run:
        print("DRY RUN -- no files will be written\n")

    total = len(skill_dirs)
    with_rules = 0
    without_rules = 0
    total_rules = 0
    total_files = 0

    for skill_dir in skill_dirs:
        skill_md_path = os.path.join(skill_dir, "SKILL.md")
        fm, body = parse_skill_md(skill_md_path)
        if fm is None:
            fm = {}

        bullets = extract_best_practices(body)
        rel = os.path.relpath(skill_dir, SKILLS_ROOT).replace("\\", "/")

        if not bullets:
            without_rules += 1
            if verbose:
                print(f"  SKIP (no best practices): {rel}")
            continue

        skill_name = fm.get("name", os.path.basename(skill_dir))
        metadata = fm.get("metadata") or {}
        display = display_name_from(skill_name, metadata)
        tags = derive_tags(fm, skill_dir)

        rules = []
        for i, bullet_text in enumerate(bullets):
            parsed = parse_bullet(bullet_text)
            impact, impact_desc = determine_impact(bullet_text)
            filename = generate_rule_filename(parsed["title"], skill_name)
            content = build_rule_content(
                parsed["title"], parsed["description"],
                impact, impact_desc, tags,
            )
            rules.append({
                "title": parsed["title"],
                "description": parsed["description"],
                "impact": impact,
                "impact_description": impact_desc,
                "filename": filename,
                "index": i,
                "content": content,
            })

        files = write_rules_directory(skill_dir, rules, skill_name, display, dry_run)
        with_rules += 1
        total_rules += len(rules)
        total_files += files
        print(f"  OK: {rel} ({len(rules)} rules, {files} files)")

    print(f"\n{'=' * 50}")
    print(f"Skills processed:     {total}")
    print(f"  With rules/:        {with_rules}")
    print(f"  Skipped (no BP):    {without_rules}")
    print(f"Total rule files:     {total_rules}")
    print(f"Total files written:  {total_files}")
    print(f"  (includes _template.md and _sections.md per skill)")


if __name__ == "__main__":
    main()
