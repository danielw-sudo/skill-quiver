#!/bin/bash
# sync-manifest.sh
# Scans all SKILL.md files → regenerates MANIFEST.md + emits skills.json
#
# Usage:
#   ./sync-manifest.sh

set -euo pipefail
QUIVER_ROOT="$(cd "$(dirname "$0")" && pwd)"

python3 - "$QUIVER_ROOT" <<'PYEOF'
import sys, os, json, re
from pathlib import Path

root = Path(sys.argv[1])

EXCLUDE_DIRS = {
    'resources', 'workbench', '_sources', '_archived',
    '.git', 'web', 'node_modules', '.claude'
}

def parse_frontmatter(text):
    """Return dict of frontmatter fields, or {} if none."""
    if not text.startswith('---'):
        return {}
    end = text.find('\n---', 3)
    if end == -1:
        return {}
    fm_text = text[3:end].strip()
    result = {}
    # simple key: value parser (handles lists too)
    i = 0
    lines = fm_text.splitlines()
    while i < len(lines):
        line = lines[i]
        m = re.match(r'^(\w[\w_-]*):\s*(.*)', line)
        if not m:
            i += 1
            continue
        key, val = m.group(1), m.group(2).strip()
        # inline list: [a, b, c]
        if val.startswith('['):
            inner = val.strip('[]')
            result[key] = [x.strip().strip('"\'') for x in inner.split(',') if x.strip()]
            i += 1
            continue
        # block list
        if val == '':
            items = []
            i += 1
            while i < len(lines) and lines[i].startswith('  - '):
                items.append(lines[i][4:].strip())
                i += 1
            result[key] = items
            continue
        # quoted string / multiline indicator
        val = val.strip('"\'').strip()
        if val == '>-' or val == '>':
            # collect continuation lines
            parts = []
            i += 1
            while i < len(lines) and (lines[i].startswith('  ') or lines[i] == ''):
                parts.append(lines[i].strip())
                i += 1
            result[key] = ' '.join(parts).strip()
            continue
        result[key] = val
        i += 1
    return result

def weight(line_count):
    if line_count < 100:
        return 'light'
    if line_count < 250:
        return 'standard'
    return 'heavy'

skills = []

for skill_md in sorted(root.rglob('SKILL.md')):
    # skip excluded dirs
    parts = skill_md.relative_to(root).parts
    if any(p in EXCLUDE_DIRS for p in parts):
        continue
    # path = category/name/  (must be at least 2 levels deep)
    if len(parts) < 2:
        continue

    text = skill_md.read_text(errors='replace')
    fm = parse_frontmatter(text)

    if not fm.get('name'):
        continue  # no frontmatter or no name — skip

    line_count = len(text.splitlines())
    rel_dir = str(skill_md.parent.relative_to(root)) + '/'

    # derive category from parent path (strip skill-name dir + SKILL.md)
    category = fm.get('category', '/'.join(parts[:-2]) if len(parts) > 2 else parts[0])

    skill = {
        'id': str(skill_md.parent.relative_to(root)),
        'name': fm.get('name', parts[-2]),
        'type': fm.get('type', 'reference'),
        'category': category,
        'description': fm.get('description', '').replace('\n', ' ').strip(),
        'weight': weight(line_count),
        'pairs_with': fm.get('pairs_with', []),
        'proven_on': fm.get('proven_on', []),
        'reviewed_at': fm.get('reviewed_at') or None,
        'model_tested': fm.get('model_tested') or None,
        'path': rel_dir,
        'install': f'cp $QUIVER_PATH/{rel_dir}SKILL.md .claude/skills/{fm.get("name", parts[-2])}/SKILL.md',
    }
    skills.append(skill)

# --- Write skills.json ---
skills_json = root / 'skills.json'
skills_json.write_text(json.dumps(skills, indent=2, ensure_ascii=False))
print(f'skills.json: {len(skills)} skills')

# --- Write MANIFEST.md ---
from collections import defaultdict
by_cat = defaultdict(list)
for s in skills:
    by_cat[s['category']].append(s)

lines = [
    '# Skill Manifest\n',
    'Machine-readable index of all skills. Use for routing, search, and install decisions.\n',
    '**Type legend:** `execution` = autonomous procedure | `reference` = knowledge base | `persona` = role identity | `setup` = one-time config\n',
    '**Weight:** `light` (<100 lines) | `standard` (100-250) | `heavy` (250+)\n',
]

for cat in sorted(by_cat):
    lines.append(f'\n## {cat}/\n')
    lines.append('| Name | Type | Weight | Path | Description |')
    lines.append('|------|------|--------|------|-------------|')
    for s in sorted(by_cat[cat], key=lambda x: x['name']):
        desc = s['description'][:80] + ('…' if len(s['description']) > 80 else '')
        lines.append(f"| {s['name']} | {s['type']} | {s['weight']} | {s['path']} | {desc} |")

manifest = root / 'MANIFEST.md'
manifest.write_text('\n'.join(lines) + '\n')
print(f'MANIFEST.md: {sum(len(v) for v in by_cat.values())} skills across {len(by_cat)} categories')
PYEOF
