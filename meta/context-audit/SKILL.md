---
name: context-audit
description: Audits persistent context files (CLAUDE.md, SESSION_CONTEXT, handoffs, memory) for staleness, duplication, hot/cold mismatch, orphan references, and bloat. Produces a prioritized action list. User confirms before any changes.
type: execution
category: meta
source: original
model: any
---

# Context Audit

Periodic hygiene check across all persistent context layers. Detects stale references, duplication, cold projects in hot context, orphan paths, and bloated files.

## When to Use

- Monthly or after a project goes cold
- After renaming domains, moving files, or restructuring repos
- When session startup feels heavy or context window is pressured
- Before onboarding a new project into the workspace
- Running `/context-audit`

## Phase 1: Inventory

Scan all persistent context layers from the workspace root. Default root: `D:\cc`.

| Layer | Scan targets |
|-------|-------------|
| Global Claude | `~/.claude/CLAUDE.md` |
| Workspace root | `{root}/CLAUDE.md`, `{root}/.claude/SESSION_CONTEXT.md` |
| Cold storage | `{root}/cairn/docs/*-handoff.md` |
| Legacy handoffs | `{root}/HANDOFF-*.md` |
| Project contexts | `{root}/*/.claude/CLAUDE.md` |
| Memory index | `~/.claude/projects/*/memory/MEMORY.md` |
| Memory files | `~/.claude/projects/*/memory/*.md` (excluding MEMORY.md) |

For each file found, record:
- Path, line count, last-modified date
- Projects/topics referenced (grep for known project names, domains, paths)

Present the inventory as a table before proceeding.

**Isolation rule:** Standalone projects (those with their own `.claude/CLAUDE.md` that says "do not load" external context) are scanned for bloat only — not cross-referenced with workspace context.

## Phase 2: Evaluate

Run five checks across the inventory. Use subagents for parallelism where possible.

### 2a. Staleness

Grep all inventoried files for domains, URLs, and env var references. Cross-check:
- Do referenced domains resolve to what's described? (check against known domain tables)
- Do referenced file paths still exist on disk?
- Are "known issues" or "TODO" items still relevant? (check git log for resolution)

### 2b. Duplication

Identify information that appears in multiple files:
- Recipe/collection tables
- Architecture diagrams or directory trees
- Deploy instructions
- Domain/URL tables

For each duplicate, identify the **authoritative source** (usually the in-repo file closest to the code).

### 2c. Hot/Cold Mismatch

For each project referenced in always-loaded context (`SESSION_CONTEXT.md`, root `CLAUDE.md`):
- Run `git log -1 --format="%ar"` in the project repo
- If last commit >30 days ago → flag as cold
- Cold projects should be in cairn handoffs, not in hot context

### 2d. Orphan References

Check all file-path references (`HANDOFF-*.md`, `docs/*.md`, etc.) across context files:
- Does the referenced file exist?
- If not, is there a replacement at a different path?

### 2e. Bloat

Flag files exceeding limits:

| File type | Limit |
|-----------|-------|
| Root CLAUDE.md | 200 lines |
| SESSION_CONTEXT.md | 200 lines |
| Project .claude/CLAUDE.md | 150 lines |
| Memory MEMORY.md | 100 lines |
| Handoff docs | 50 lines |

## Phase 3: Report

Present findings grouped by severity:

```
Context Audit Report
════════════════════════════════════

Files scanned: N | Total lines: N

Issues Found:
┌──────────────────┬───────┬────────────────────────────────┐
│ Type             │ Count │ Top example                    │
├──────────────────┼───────┼────────────────────────────────┤
│ Stale references │ N     │ [domain] in [N] files          │
│ Duplication      │ N     │ [what] in [N] places           │
│ Hot/cold mismatch│ N     │ [project] last commit [when]   │
│ Orphan refs      │ N     │ [path] referenced but missing  │
│ Bloat            │ N     │ [file] at [N] lines            │
└──────────────────┴───────┴────────────────────────────────┘

Recommended Actions:
1. [verb] — [target files] — [reason]
2. ...
```

If no issues found, report clean and stop.

## Phase 4: Consolidate

For each recommended action, present:
- **What:** the specific change (move, trim, update, delete section)
- **Why:** the issue it resolves
- **Authoritative source:** the file that should NOT be changed (it's correct)
- **Targets:** the files that need updating

**Wait for user confirmation before each action.**

Available actions:
- **Move to cairn** — relocate a handoff doc to `cairn/docs/` as cold storage
- **Trim section** — remove a project section from SESSION_CONTEXT or CLAUDE.md
- **Update reference** — fix a stale domain, path, or URL across files
- **Remove orphan** — delete a reference to a file that no longer exists
- **Flag for review** — mark duplication for manual resolution (never auto-deduplicate)

After all approved actions are executed, re-run the inventory to confirm resolution.

## Examples

**Monthly check**
```
User: /context-audit
Skill: Scans 14 files (1,840 lines) →
       2 stale refs (reload.tools4all.ai in 3 files),
       1 hot/cold (argus in SESSION_CONTEXT, last commit 33 days ago),
       1 orphan (HANDOFF-ARGUS.md referenced but deleted)
       → 4 recommended actions
```

**Post-migration check**
```
User: We just renamed the CMS domain, run /context-audit
Skill: Greps for old domain → found in 5 files across 3 repos
       → proposes bulk update with authoritative source identified
```

**Clean result**
```
User: /context-audit
Skill: Scans 12 files (1,200 lines) → no issues found. Context is clean.
```

## Best Practices

- Run after any infrastructure change (domain rename, repo move, project retirement)
- Phase 1-3 are read-only — safe to run anytime
- Never auto-deduplicate — context duplication sometimes exists for isolation reasons
- Standalone projects are checked for internal bloat only, never cross-referenced
- When in doubt about authoritative source, ask the user
