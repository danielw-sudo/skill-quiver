---
name: stocktake
description: "Audit Claude skills and commands for quality. Quick Scan (changed only) or Full Stocktake with subagent batch evaluation."
type: execution
category: system
source: everything-claude-code
model: any
trigger: when auditing skill quality, running /skill-stocktake, or evaluating skill inventory
---

# skill-stocktake

Slash command (`/skill-stocktake`) that audits all Claude skills and commands using a quality checklist + AI holistic judgment. Supports Quick Scan (recently changed) and Full Stocktake (complete review).

## Modes

| Mode | Trigger | Duration |
|------|---------|---------|
| Quick Scan | `results.json` exists (default) | 5-10 min |
| Full Stocktake | `results.json` absent, or `/skill-stocktake full` | 20-30 min |

**Results cache:** `~/.claude/skills/skill-stocktake/results.json`

## Phase 2 — Quality Evaluation

Launch a general-purpose subagent with the full inventory and checklist. Process ~20 skills per invocation.

Each skill is evaluated against:
- Content overlap with other skills
- Overlap with MEMORY.md / CLAUDE.md
- Freshness of technical references (WebSearch if CLI flags / APIs present)
- Usage frequency

Verdict criteria:

| Verdict | Meaning |
|---------|---------|
| Keep | Useful and current |
| Improve | Worth keeping, specific improvements needed |
| Update | Referenced technology is outdated |
| Retire | Low quality, stale, or cost-asymmetric |
| Merge into [X] | Substantial overlap; name the merge target |

Evaluation is **holistic AI judgment**. Guiding dimensions: Actionability, Scope fit, Uniqueness, Currency.

**Reason quality requirements** — the `reason` field must be self-contained and decision-enabling:
- **Retire**: state (1) specific defect, (2) what covers the same need
- **Merge**: name target, describe what content to integrate
- **Improve**: describe specific change (section, action, target size)
- **Keep** (Quick Scan mtime-only): restate original verdict rationale

## Phase 3 — Summary Table

| Skill | 7d use | Verdict | Reason |
|-------|--------|---------|--------|

## Phase 4 — Consolidation

1. **Retire / Merge**: detailed justification per file before user confirmation
2. **Improve**: specific suggestions with rationale; user decides
3. **Update**: updated content with sources checked
4. Check MEMORY.md line count; propose compression if >100 lines

## Notes

- Evaluation is blind: same checklist for all skills regardless of origin
- Archive/delete always requires explicit user confirmation

## Workbench

Scope details, scan flow, Phase 1 inventory, results schema, and scripts (`scan.sh`, `quick-diff.sh`, `save-results.sh`) are in `workbench/skill-stocktake/`.
