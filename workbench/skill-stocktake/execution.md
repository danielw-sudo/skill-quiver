# Skill Stocktake — Workbench Execution Reference

## Scope

The command targets the following paths **relative to the directory where it is invoked**:

| Path | Description |
|------|-------------|
| `~/.claude/skills/` | Global skills (all projects) |
| `{cwd}/.claude/skills/` | Project-level skills (if exists) |

To include project-level skills, run from that project's root directory.

## Quick Scan Flow

Re-evaluate only skills that have changed since the last run (5-10 min).

1. Read `~/.claude/skills/skill-stocktake/results.json`
2. Run: `bash scripts/quick-diff.sh results.json`
3. If output is `[]`: report "No changes since last run." and stop
4. Re-evaluate only changed files using Phase 2 criteria
5. Carry forward unchanged skills from previous results
6. Output only the diff
7. Run: `bash scripts/save-results.sh results.json <<< "$EVAL_RESULTS"`

## Full Stocktake — Phase 1 (Inventory)

Run: `bash scripts/scan.sh`

The script enumerates skill files, extracts frontmatter, and collects UTC mtimes.

```
Scanning:
  o ~/.claude/skills/         (17 files)
  x {cwd}/.claude/skills/    (not found — global skills only)
```

## Results File Schema

`~/.claude/skills/skill-stocktake/results.json`:

```json
{
  "evaluated_at": "2026-02-21T10:00:00Z",
  "mode": "full",
  "batch_progress": {
    "total": 80,
    "evaluated": 80,
    "status": "completed"
  },
  "skills": {
    "skill-name": {
      "path": "~/.claude/skills/skill-name/SKILL.md",
      "verdict": "Keep",
      "reason": "Concrete, actionable, unique value for X workflow",
      "mtime": "2026-01-15T08:30:00Z"
    }
  }
}
```

**`evaluated_at`**: Must be actual UTC time. Obtain via: `date -u +%Y-%m-%dT%H:%M:%SZ`

## Scripts

- `scan.sh` — Phase 1 inventory (enumerate skills, extract frontmatter, collect mtimes)
- `quick-diff.sh` — Change detection (compare current mtimes against results.json)
- `save-results.sh` — Results persistence (write evaluation results to results.json)
