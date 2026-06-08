---
name: retire
type: execution
category: system
source: original
model: any
description: >-
  Retires a skill from the quiver — moves it out of the index, preserves
  it in resources/_retired/ for audit trail, and logs the reason. TRIGGER
  when: user says "/retire [skill]", "retire this skill", stocktake verdicts
  Retire and user confirms, or a skill is superseded by a better one.
pairs_with: [system/stocktake, system/curate]
reviewed_at: 2026-06-07
model_tested: claude-sonnet-4-6
---

# /retire — Retire a Skill

Moves a skill out of the active quiver into `resources/_retired/`. The skill is preserved for historical reference but removed from the index and no longer loadable by name.

## Step 1: Locate

Accept a skill name, path, or id (e.g. `test/tdd-workflow`).

If no argument: ask "Which skill to retire? Provide name, id, or path."

Resolve against `$QUIVER_PATH/skills.json`. If not found, report error and stop — do not retire a skill that isn't in the index.

## Step 2: Show and Confirm

Display what will be retired:

```
Retiring: [name]
  Path:     [category/name/]
  Type:     [type]
  Weight:   [weight]
  Description: [description excerpt]

This will:
  1. Move [path] → resources/_retired/[name]/
  2. Remove from skills.json and MANIFEST.md
  3. Log to resources/_retired/log.md

Reason for retirement? (one line — required)
```

Wait for user to provide a reason. Do not proceed without one.

Then confirm:

```
Confirm retire '[name]'? (y/n)
```

Stop on n.

## Step 3: Retire

```bash
# Ensure destination exists
mkdir -p "$QUIVER_PATH/resources/_retired"

# Move skill directory
mv "$QUIVER_PATH/[path]" "$QUIVER_PATH/resources/_retired/[name]/"
```

If `resources/_retired/[name]/` already exists (retired before), append a datestamp suffix: `[name]-[YYYY-MM-DD]`.

## Step 4: Rebuild Index

```bash
$QUIVER_PATH/sync-manifest.sh
```

Confirm the skill no longer appears in the updated `skills.json`.

## Step 5: Log

Append to `$QUIVER_PATH/resources/_retired/log.md` (create if absent):

```
[YYYY-MM-DD] [name] ([category]) — [reason]
  Archived: resources/_retired/[name]/
```

## Step 6: Report

```
Retired: [name]
  Moved to: resources/_retired/[name]/
  Index: removed (skills.json rebuilt)
  Log: resources/_retired/log.md

Skills remaining: [N]
```

## Constraints

- **Never delete** — retirement is a move, not a deletion. The skill must be recoverable.
- **Reason required** — retirement without a reason is not logged meaningfully and creates future confusion.
- **Index must update** — always run `sync-manifest.sh` after moving. A retired skill that still appears in the index is worse than no action.
- **Vault skills cannot be retired here** — vault/ is the owner's private space. Retire vault skills manually.
- **One at a time** — if stocktake produced multiple Retire verdicts, work through them one by one. Bulk retirement without individual confirmation is not allowed.

## Unretire (recovery)

If a skill needs to be restored:

```bash
mv "$QUIVER_PATH/resources/_retired/[name]/" "$QUIVER_PATH/[original-category]/[name]/"
./sync-manifest.sh
```

Then run `/format [skill]` to re-verify frontmatter before re-use.
