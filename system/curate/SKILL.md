---
name: curate
type: execution
category: system
source: original
model: any
description: >-
  HITL skill curation pipeline. Evaluates a candidate skill against quality/
  feasibility/freshness dimensions, normalizes frontmatter to quiver spec, and
  guides promotion or rejection. TRIGGER when: user says "/curate", "evaluate
  this skill", "curate [skill name or path]", or drops a file in _incoming/.
---

# /curate — Skill Curation

Evaluate a skill candidate and decide: promote to quiver, or reject with reason.

## Input Resolution

Accept any of:
1. **File path**: `curate resources/_incoming/some-skill.md`
2. **Skill name in _incoming/**: `curate tdd-workflow` → look in `resources/_incoming/`
3. **Source pool path**: `curate resources/hermes-skills/software-development/tdd/SKILL.md`
4. **No argument**: list all files in `resources/_incoming/`, ask user to pick

If multiple candidates match, show a numbered list.

## Step 1: Read

Read the candidate file. If it lacks `---` frontmatter, treat it as a persona/reference doc and note this.

Read `$QUIVER_PATH/baseline.json` for current model names and active MCPs/tools.

## Step 2: Score

Score each dimension honestly. Show your working.

### QUALITY (0–3)
| Score | Criteria |
|-------|----------|
| 3 | Frontmatter complete, single clear responsibility, trigger conditions explicit |
| 2 | Minor gaps (missing 1-2 fields, trigger slightly vague) |
| 1 | Significant gaps — can be fixed with effort |
| 0 | Unusable — no structure, contradictory, or purely redundant with existing skill |

Check for duplicates: scan `$QUIVER_PATH/skills.json` for same name or near-identical description.

### FEASIBILITY (0–4)
| Score | Criteria |
|-------|----------|
| 4 | All referenced tools, MCPs, and CLIs are in `baseline.json.active` |
| 2 | Some dependencies unverifiable or uncertain |
| 0 | Depends on a deprecated or absent tool/MCP |

Grep the skill text for tool/MCP names. Cross-check against `baseline.json`.

### FRESHNESS (0–3)
| Score | Criteria |
|-------|----------|
| 3 | No deprecated model names found |
| 1 | Minor stale references (old model alias, fixable) |
| 0 | Deprecated model or pattern is the *primary* mechanism |

Grep for model names in `baseline.json.deprecated`.

### Composite
```
Total = QUALITY + FEASIBILITY + FRESHNESS  (max 10)
≥ 7 → eligible for promotion
< 7 → reject (log reason)
```

## Step 3: Report

Present clearly:

```
Candidate: [skill name]
Source:    [file path]

QUALITY      [0-3]: [reason]
FEASIBILITY  [0-4]: [reason]
FRESHNESS    [0-3]: [reason]
─────────────────────────────
TOTAL        [0-10]  → PROMOTE / REJECT

Issues found:
- [list any gaps, fixable or blocking]

Suggested target path: [category]/[name]/
```

## Step 4: Normalize (if score ≥ 7)

Rewrite frontmatter to quiver spec. Fill in missing fields. Do NOT rewrite the skill body — only frontmatter + trim excess whitespace.

Required fields:
```yaml
---
name: kebab-case-name
type: execution | reference | persona | setup
category: plan | code/tools | code | test | ship | design/core | design/verbs | design/quality | prompt | ops | review | system | domain
source: [original repo or "original"]
model: any | sonnet | opus
description: >-
  One paragraph. If type=execution, include: TRIGGER when: ...
pairs_with: []         # optional but encouraged
proven_on: []          # optional
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---
```

Show the normalized frontmatter to the user.

## Step 5: Decision

Ask:
```
Promote to [suggested path]? (y/n/edit path)
```

**On yes:**
1. Create `$QUIVER_PATH/[target-path]/` directory
2. Write normalized SKILL.md there
3. If skill has a `reference/` dir in source, copy it too
4. Run `$QUIVER_PATH/sync-manifest.sh` to update MANIFEST.md and skills.json
5. Move original from `_incoming/` to `_retired/` (keep source for audit trail)
6. Report: `Promoted: [name] → [path]`

**On no:**
1. Write a one-line rejection reason
2. Append to `resources/_rejected/log.md`:
   ```
   [date] [skill-name] SCORE:[total] REASON:[reason]
   ```
3. Move file to `resources/_rejected/[skill-name].md`
4. Report: `Rejected: [name] — [reason]`

## Handling Non-SKILL.md Sources

**agency-agents** (plain `.md` persona files):
- Set `type: persona`
- Extract the agent's domain as category
- Description = first paragraph of the file
- These rarely need reference/ dirs

**hermes-skills** (has `metadata.hermes` block):
- Convert `metadata.hermes.tags` → `pairs_with` candidates
- Convert `metadata.hermes.related_skills` → `pairs_with`
- Category mapping: hermes `software-development` → `code`, `engineering` → `code/tools`, etc.

## Constraints
- Never auto-promote without showing user the normalized frontmatter
- Never modify the source file directly — always write to target path
- If score is 5–6 (borderline), flag explicitly and ask if user wants to manually fix before promoting
