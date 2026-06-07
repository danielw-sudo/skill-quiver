# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Always-loaded skills (this project)

@system/quiver-draw/SKILL.md
@system/curate/SKILL.md
@system/format/SKILL.md
@system/stocktake/SKILL.md

## What this repo is

A curated collection of production-grade skills for AI-assisted development. Each skill is a `SKILL.md` file that any AI coding tool loads into context to gain a capability (execution procedure, reference knowledge, role persona, or one-time setup).

## Stack

```
Source:   GitHub (this repo)
Index:    skills.json  (generated — do not edit manually)
Manifest: MANIFEST.md  (generated — do not edit manually)
Frontend: Astro static site → GitHub Pages  [planned]
CDN:      Cloudflare DNS proxy              [planned]
```

## Key commands

```bash
# Rebuild skills.json + MANIFEST.md from all SKILL.md files
./sync-manifest.sh

# Inject a skill into any CLI tool (non-Claude tools)
./bin/quiver-inject <skill-name> <cli-command...>
# e.g.  ./bin/quiver-inject tdd-workflow codex exec "write tests for auth.ts"
```

## Environment

Set once in `~/.bashrc` or `~/.zshrc` — all tools read from here:
```bash
export QUIVER_PATH=~/projects/skill-quiver
```

## Skill structure

Every skill lives at `<category>/<name>/SKILL.md`. Required frontmatter:

```yaml
---
name: kebab-case-name
type: execution | reference | persona | setup
category: plan | code | code/tools | test | ship | design/core | design/verbs | design/quality | prompt | ops | review | system | domain
source: original | everything-claude-code | impeccable | ...
model: any | sonnet | opus
description: >-
  One paragraph. If type=execution, must include TRIGGER when: ...
---
```

Optional: `pairs_with`, `proven_on`, `reviewed_at`, `model_tested`.

Skills with large reference material put supporting docs in `<skill>/reference/`. The quiver-draw loader reads those automatically.

## Generated files

`skills.json` — machine-readable index. Schema per entry:
```json
{
  "id": "test/tdd-workflow",
  "name": "tdd-workflow",
  "type": "execution",
  "category": "test",
  "description": "...",
  "weight": "light | standard | heavy",
  "pairs_with": [],
  "proven_on": [],
  "reviewed_at": null,
  "model_tested": null,
  "path": "test/tdd-workflow/",
  "install": "cp $QUIVER_PATH/test/tdd-workflow/SKILL.md .claude/skills/tdd-workflow/SKILL.md"
}
```

Weight derived from line count: `light` <100, `standard` 100–250, `heavy` 250+.

`baseline.json` — human-maintained. Current model names and active MCPs. Used by curation scoring for freshness checks.

## Folder taxonomy

| Folder | Purpose |
|---|---|
| `system/` | Skills that operate on the quiver itself: curate, format, quiver-draw, stocktake, onboard-repo, adr, ctx-budget, ctx-audit, instinct, vault-sync |
| `workbench/` | Experimental/in-progress skills — not in MANIFEST.md |
| `vault/` | **GITIGNORED** — private skills, never committed, never indexed |
| `resources/` | **GITIGNORED** — staging area and source pools |
| `resources/_incoming/` | Drop candidates here for curation |
| `resources/_rejected/` | Failed curation, log.md tracks reasons |
| `resources/_retired/` | Archived promoted skills (never deleted) |
| `resources/hermes-skills/` | Symlink → `~/.hermes/skills/` |
| `resources/agy-skills/` | Symlink → `~/agy-workspace/.agents/skills/` |
| `resources/gemini-skills/` | Symlink → `~/gemini-workspace/agents/` |
| `resources/everything-claude-code/` | Cloned source repo |
| `resources/agency-agents/` | Cloned source repo (plain .md format) |
| `resources/impeccable/` | Cloned source repo |
| `resources/gsap-skills/` | Cloned source repo |
| `resources/baoyu-skills/` | Cloned source repo |
| `resources/ljg-skills/` | Cloned source repo |
| `resources/mini-max-skills/` | Cloned source repo |
| `resources/notebooklm-skill/` | Cloned source repo |
| `resources/fireworks-tech-graph/` | Cloned source repo |

## Curation workflow (HITL)

```
1. Drop candidate into resources/_incoming/   (or point /curate at a source pool path)
2. Run /curate [file]                         (loads system/curate/SKILL.md)
3. Review score report + normalized frontmatter
4. Approve → promoted to correct category folder, sync-manifest.sh runs automatically
5. Reject → logged to resources/_rejected/log.md
```

Scoring: QUALITY (0–3) + FEASIBILITY (0–4) + FRESHNESS (0–3). Threshold ≥ 7 promotes.

## System skills

| Skill | Trigger | Purpose |
|---|---|---|
| `system/curate` | `/curate [path]` | Evaluate + promote/reject a candidate |
| `system/format` | `/format [skill]` | Normalize frontmatter of existing skill |
| `system/quiver-draw` | `/quiver-draw [name]` | Load any skill into context on demand |
| `system/stocktake` | `/stocktake` | Audit quality of all skills |
| `system/vault-sync` | `/vault-sync` | Compare vault/ against public library, sync improvements |
| `system/retire` | `/retire [skill]` | Retire a skill — move out of index, preserve in _retired/ |
| `system/onboard-repo` | `/onboard-repo` | Analyze unfamiliar codebase |

## Adding a skill manually

1. Create `<category>/<name>/SKILL.md` with correct frontmatter
2. Optional: add `reference/` subfolder for supporting docs
3. Run `./sync-manifest.sh` — MANIFEST.md and skills.json update automatically

## On-call pattern for other CLI tools

Tools that don't have Claude Code's skill system can use `bin/quiver-inject`:
```bash
# Injects skill content as context prefix to any command
quiver-inject tdd-workflow codex exec "write tests for src/auth.ts"
quiver-inject api-design gemini "design the REST API for user management"
```

Quiver-inject reads `skills.json`, finds the skill by name, prepends its content to the command's prompt.

## Constraints

- `resources/` never committed
- `vault/` never committed — private skills stay local
- `skills.json` and `MANIFEST.md` only written by `sync-manifest.sh` — never edit manually
- `vault/` excluded from `sync-manifest.sh` — vault skills never appear in the public index
- Promote threshold: ≥ 7/10 composite score
- Retire: manual only, move to `resources/_retired/`, never delete
- Auto-sanitize: never
- SKILL.md files: ≤ 200 lines preferred (>250 flagged as heavy)
