#!/usr/bin/env python3
"""Generate metadata.json, AGENTS.md, and README.md for every skill directory.

Mirrors the Vercel agent-skills pattern:
  - metadata.json  : machine-readable metadata extracted from SKILL.md frontmatter
  - AGENTS.md      : agent-optimized content (SKILL.md body without frontmatter)
  - README.md      : human-readable documentation with structure and sub-skills

Usage:
    python scripts/generate-skill-files.py [--dry-run]
"""

import json
import os
import re
import sys
import yaml


SKILLS_ROOT = os.path.join(os.path.dirname(__file__), "..", "skills")
DATE = "February 2026"


def parse_skill_md(path: str):
    """Parse SKILL.md into (frontmatter_dict, body_str)."""
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split on YAML frontmatter fences
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)", content, re.DOTALL)
    if not match:
        return None, content

    fm_text, body = match.group(1), match.group(2)
    try:
        fm = yaml.safe_load(fm_text)
    except yaml.YAMLError:
        fm = {}
    return fm or {}, body


def clean_description(desc: str) -> str:
    """Extract the first meaningful paragraph, stripping USE FOR / DO NOT USE FOR."""
    if not desc:
        return ""
    lines = desc.strip().splitlines()
    clean_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped.upper().startswith("USE FOR:"):
            break
        if stripped.upper().startswith("DO NOT USE FOR:"):
            break
        clean_lines.append(stripped)
    result = " ".join(clean_lines).strip()
    # collapse multiple spaces
    result = re.sub(r"\s+", " ", result)
    return result


def display_name_from(name: str, metadata: dict) -> str:
    """Get display name from metadata or title-case the name."""
    if metadata and metadata.get("displayName"):
        return metadata["displayName"]
    # Title-case with hyphens replaced by spaces
    return name.replace("-", " ").title()


def find_sub_skills(skill_dir: str) -> list:
    """Find immediate child directories that contain SKILL.md."""
    subs = []
    try:
        entries = sorted(os.listdir(skill_dir))
    except OSError:
        return subs
    for entry in entries:
        child = os.path.join(skill_dir, entry)
        if os.path.isdir(child) and os.path.isfile(os.path.join(child, "SKILL.md")):
            # Get name from child frontmatter
            fm, _ = parse_skill_md(os.path.join(child, "SKILL.md"))
            child_name = fm.get("name", entry) if fm else entry
            child_desc = clean_description(fm.get("description", "")) if fm else ""
            child_display = display_name_from(child_name, fm.get("metadata"))
            subs.append({
                "dir": entry,
                "name": child_name,
                "displayName": child_display,
                "description": child_desc,
            })
    return subs


def generate_metadata_json(fm: dict, skill_dir: str) -> dict:
    """Build metadata.json content from frontmatter."""
    name = fm.get("name", os.path.basename(skill_dir))
    metadata = fm.get("metadata") or {}
    return {
        "version": "1.0.0",
        "name": name,
        "displayName": display_name_from(name, metadata),
        "description": clean_description(fm.get("description", "")),
        "author": metadata.get("author", "Tyler-R-Kendrick"),
        "license": fm.get("license", "MIT"),
        "date": DATE,
        "compatibility": fm.get("compatibility", ""),
        "references": [],
    }


def generate_readme(fm: dict, skill_dir: str, sub_skills: list) -> str:
    """Build README.md content."""
    name = fm.get("name", os.path.basename(skill_dir))
    metadata = fm.get("metadata") or {}
    display = display_name_from(name, metadata)
    desc = clean_description(fm.get("description", ""))
    license_id = fm.get("license", "MIT")

    lines = [f"# {display}", ""]
    if desc:
        lines.extend([desc, ""])

    # Structure section
    lines.append("## Structure")
    lines.append("")
    lines.append("| File | Purpose |")
    lines.append("|------|---------|")
    lines.append("| `SKILL.md` | Agent skill definition (frontmatter + instructions) |")
    lines.append("| `metadata.json` | Machine-readable metadata and versioning |")
    lines.append("| `AGENTS.md` | Agent-optimized quick reference (generated) |")
    lines.append("| `README.md` | This file |")
    # Include rules/ if present
    rules_dir = os.path.join(skill_dir, "rules")
    if os.path.isdir(rules_dir):
        rule_count = len([f for f in os.listdir(rules_dir)
                         if f.endswith(".md") and not f.startswith("_")])
        lines.append(f"| `rules/` | {rule_count} individual best practice rules |")
    lines.append("")

    # Sub-skills section
    if sub_skills:
        lines.append("## Sub-skills")
        lines.append("")
        lines.append("| Skill | Description |")
        lines.append("|-------|-------------|")
        for s in sub_skills:
            short_desc = s["description"][:120] + ("..." if len(s["description"]) > 120 else "")
            lines.append(f"| [`{s['dir']}/`]({s['dir']}/) | {short_desc} |")
        lines.append("")

    # Usage
    lines.append("## Usage")
    lines.append("")
    # Build the skill path relative to skills/
    rel = os.path.relpath(skill_dir, os.path.join(skill_dir, "..", "..")).replace("\\", "/")
    # Actually compute relative to the skills root
    abs_skills = os.path.abspath(SKILLS_ROOT)
    abs_skill = os.path.abspath(skill_dir)
    if abs_skill.startswith(abs_skills):
        rel_path = os.path.relpath(abs_skill, abs_skills).replace("\\", "/")
    else:
        rel_path = name
    lines.append("```bash")
    lines.append(f"npx agentskills add Tyler-R-Kendrick/agent-skills/skills/{rel_path}")
    lines.append("```")
    lines.append("")

    # License
    lines.append("## License")
    lines.append("")
    lines.append(f"{license_id}")
    lines.append("")

    return "\n".join(lines)


def process_skill(skill_dir: str, dry_run: bool = False) -> dict:
    """Process one skill directory. Returns stats dict."""
    skill_md = os.path.join(skill_dir, "SKILL.md")
    if not os.path.isfile(skill_md):
        return {"skipped": True}

    fm, body = parse_skill_md(skill_md)
    if fm is None:
        fm = {}

    sub_skills = find_sub_skills(skill_dir)

    # 1. metadata.json
    meta = generate_metadata_json(fm, skill_dir)
    meta_path = os.path.join(skill_dir, "metadata.json")
    if not dry_run:
        with open(meta_path, "w", encoding="utf-8") as f:
            json.dump(meta, f, indent=2, ensure_ascii=False)
            f.write("\n")

    # 2. AGENTS.md — body content from SKILL.md
    agents_path = os.path.join(skill_dir, "AGENTS.md")
    if not dry_run:
        with open(agents_path, "w", encoding="utf-8") as f:
            f.write(body.lstrip("\n"))

    # 3. README.md
    readme = generate_readme(fm, skill_dir, sub_skills)
    readme_path = os.path.join(skill_dir, "README.md")
    if not dry_run:
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(readme)

    return {
        "skipped": False,
        "name": fm.get("name", os.path.basename(skill_dir)),
        "sub_skills": len(sub_skills),
    }


def main():
    dry_run = "--dry-run" in sys.argv

    if not os.path.isdir(SKILLS_ROOT):
        print(f"ERROR: skills root not found: {SKILLS_ROOT}", file=sys.stderr)
        sys.exit(1)

    # Collect all skill directories
    skill_dirs = []
    for root, dirs, files in os.walk(SKILLS_ROOT):
        if "SKILL.md" in files:
            skill_dirs.append(root)
    skill_dirs.sort()

    print(f"Found {len(skill_dirs)} skill directories")
    if dry_run:
        print("DRY RUN — no files will be written")

    processed = 0
    skipped = 0
    for sd in skill_dirs:
        result = process_skill(sd, dry_run)
        if result.get("skipped"):
            skipped += 1
        else:
            processed += 1
            rel = os.path.relpath(sd, SKILLS_ROOT).replace("\\", "/")
            subs = result.get("sub_skills", 0)
            sub_note = f" ({subs} sub-skills)" if subs > 0 else ""
            print(f"  OK: {rel}{sub_note}")

    print(f"\nDone: {processed} processed, {skipped} skipped")


if __name__ == "__main__":
    main()
