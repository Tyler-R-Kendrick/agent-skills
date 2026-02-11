#!/usr/bin/env python3
"""Audit all skills for quality, identifying boilerplate and low-effort content."""

import os
import re
import sys
import yaml

SKILLS_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "skills"))

BOILERPLATE_PHRASES = [
    "use appropriate",
    "configure as needed",
    "follow best practices",
    "leverage built-in",
    "extend as needed",
    "use conventions",
    "keep tests focused",
    "use health checks",
    "implement circuit breakers",
    "configure timeout policies",
    "add custom middleware",
    "monitor proxy metrics",
    "monitor metrics",
    "choose appropriate",
    "as needed",
]


def analyze_skill(skill_dir):
    path = os.path.join(skill_dir, "SKILL.md")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)", content, re.DOTALL)
    if not m:
        return None

    fm_text, body = m.group(1), m.group(2)
    try:
        fm = yaml.safe_load(fm_text) or {}
    except yaml.YAMLError:
        fm = {}

    body_len = len(body)
    code_blocks = len(re.findall(r"```\w+", body))
    tables = len(re.findall(r"\|.*\|.*\|", body))
    sections = len(re.findall(r"^## ", body, re.MULTILINE))

    # Count generic/boilerplate phrases
    body_lower = body.lower()
    generic = 0
    generic_found = []
    for phrase in BOILERPLATE_PHRASES:
        count = body_lower.count(phrase)
        if count:
            generic += count
            generic_found.append(phrase)

    # Best practices items
    bp_match = re.search(r"## Best Practices\s*\n(.*?)(?=\n## |\Z)", body, re.DOTALL)
    bp_items = 0
    bp_text = ""
    if bp_match:
        bp_text = bp_match.group(1)
        bp_items = len(re.findall(r"^- ", bp_text, re.MULTILINE))

    # Check BP quality: are they specific or generic?
    bp_generic = 0
    if bp_text:
        for phrase in BOILERPLATE_PHRASES:
            bp_generic += bp_text.lower().count(phrase)

    # Quality score
    score = code_blocks * 3 + tables * 2 + sections * 2 + bp_items - generic * 2
    if body_len < 500:
        score -= 20
    elif body_len < 1000:
        score -= 10
    elif body_len < 2000:
        score -= 5

    # Specific checks for truly thin skills
    has_overview = bool(re.search(r"^## Overview", body, re.MULTILINE))
    has_example = bool(re.search(r"^## Example", body, re.MULTILINE))

    # Check if Best Practices are just "Use X", "Configure Y", "Monitor Z" one-liners
    thin_bp = 0
    if bp_text:
        for line in bp_text.splitlines():
            stripped = line.strip()
            if stripped.startswith("- ") and len(stripped) < 40:
                thin_bp += 1

    rel = os.path.relpath(skill_dir, SKILLS_ROOT).replace("\\", "/")

    return {
        "path": rel,
        "body_len": body_len,
        "code_blocks": code_blocks,
        "tables": tables,
        "sections": sections,
        "bp_items": bp_items,
        "generic": generic,
        "generic_found": generic_found,
        "bp_generic": bp_generic,
        "thin_bp": thin_bp,
        "score": score,
        "has_overview": has_overview,
        "has_example": has_example,
    }


def main():
    skill_dirs = []
    for root, dirs, files in os.walk(SKILLS_ROOT):
        if "SKILL.md" in files:
            skill_dirs.append(root)
    skill_dirs.sort()

    results = []
    for sd in skill_dirs:
        r = analyze_skill(sd)
        if r:
            results.append(r)

    results.sort(key=lambda x: x["score"])

    print(f"Total skills analyzed: {len(results)}")

    print(f"\nBOTTOM 60 (lowest quality scores):")
    print(f"{'Path':<60} {'Len':>5} {'Code':>4} {'Tbl':>4} {'Sec':>4} {'BP':>3} {'Gen':>3} {'TBP':>3} {'Score':>5}")
    print("-" * 100)
    for r in results[:60]:
        print(f"{r['path']:<60} {r['body_len']:>5} {r['code_blocks']:>4} {r['tables']:>4} {r['sections']:>4} {r['bp_items']:>3} {r['generic']:>3} {r['thin_bp']:>3} {r['score']:>5}")

    print(f"\nScore distribution:")
    brackets = [
        (float("-inf"), 0, "CRITICAL (<0)"),
        (0, 10, "LOW (0-9)"),
        (10, 25, "MEDIUM (10-24)"),
        (25, 50, "GOOD (25-49)"),
        (50, float("inf"), "EXCELLENT (50+)"),
    ]
    for lo, hi, label in brackets:
        count = sum(1 for r in results if lo <= r["score"] < hi)
        print(f"  {label}: {count}")

    # Skills with very thin best practices (all items < 40 chars)
    thin = [r for r in results if r["thin_bp"] >= 3 and r["bp_items"] > 0 and r["thin_bp"] / r["bp_items"] > 0.5]
    if thin:
        print(f"\nSkills with THIN best practices (>50% one-liners under 40 chars): {len(thin)}")
        for r in thin:
            print(f"  {r['path']} ({r['thin_bp']}/{r['bp_items']} thin)")

    # Skills with body < 1000 chars
    short = [r for r in results if r["body_len"] < 1000]
    if short:
        print(f"\nSkills with VERY SHORT body (<1000 chars): {len(short)}")
        for r in short:
            print(f"  {r['path']} ({r['body_len']} chars, {r['code_blocks']} code blocks)")


if __name__ == "__main__":
    main()
