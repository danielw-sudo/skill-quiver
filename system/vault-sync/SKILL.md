---
name: vault-sync
type: execution
category: system
source: original
model: any
description: >-
  Compares private vault/ skills against the quiver public library. Surfaces
  duplicates, overlaps, gaps, and improvement opportunities. Executes approved
  actions: absorb, revise, merge, append, or note. TRIGGER when: user says
  "/vault-sync", "check my vault", "compare vault to quiver", or "what's new
  in quiver".
pairs_with: [system/curate, system/format, system/stocktake]
reviewed_at: 2026-06-07
model_tested: claude-sonnet-4-6
---

# /vault-sync — Vault × Quiver Comparison

Compares your private skill vault against the quiver public library. Finds what overlaps, what quiver improved, what you have that quiver doesn't, and what quiver has that you're missing. Proposes actions — you approve each one.

## Vault Location

```
$QUIVER_PATH/vault/          ← gitignored, never committed
  <category>/<name>/SKILL.md
```

If `vault/` doesn't exist, offer to create it and exit — nothing to compare yet.

## Step 1: Inventory Vault

Scan `$QUIVER_PATH/vault/` recursively for `SKILL.md` files. For each:
- Read frontmatter: `name`, `category`, `description`
- Note full path

If vault is empty, report "Vault is empty — use /curate or /quiver-draw to populate it" and stop.

## Step 2: Load Public Index

Read `$QUIVER_PATH/skills.json`. This is the full quiver catalog.

## Step 3: Score Each Vault Skill Against Public Library

For each vault skill, find its closest match(es) in skills.json. Compare:
1. **Category** — same category scores higher
2. **Description similarity** — semantic overlap using your own judgment
3. **Name** — exact or near match

Score 0–100. Assign tier:

| Score | Tier | Meaning |
|-------|------|---------|
| 85–100 | **Duplicate** | Quiver has essentially the same skill |
| 55–84 | **Overlap** | Significant shared scope, but differences exist |
| 25–54 | **Complementary** | Adjacent — different angle on the same domain |
| 0–24 | **Novel** | Your vault skill covers something quiver doesn't |

A vault skill can have multiple quiver matches at different tiers — list up to 3.

## Step 4: Reverse Gap Scan

Find quiver skills your vault **lacks** in categories you actively use (infer active categories from your vault's category distribution). These are "also good to have" candidates.

Limit to top 5 most relevant. Don't flood — curate.

## Step 5: Report

Present findings in this format:

```
Vault × Quiver Sync
────────────────────────────────────────
Vault skills scanned: N
Quiver skills compared: N

DUPLICATES (N)
  [vault-skill-name]
    → quiver match: [id] (score: 92)
    → Action: Absorb / Keep

OVERLAPS (N)
  [vault-skill-name]
    → quiver match: [id] (score: 71)
    → Quiver has: [what quiver covers that yours doesn't — 1 sentence]
    → Your vault has: [what yours covers that quiver doesn't — 1 sentence]
    → Action: Show diff / Revise / Skip

COMPLEMENTARY (N)
  [vault-skill-name]
    → quiver match: [id] (score: 38)
    → Note: [quiver skill covers X, yours covers Y — related but distinct]
    → Action: Append quiver skill to vault / Note / Skip

NOVEL (N) — your vault-only skills
  [vault-skill-name]
    → No quiver equivalent found
    → Action: Note (consider contributing) / Skip

GAPS — quiver skills your vault lacks (N)
  [quiver-skill-id] — [description excerpt]
    → Action: Copy to vault / Skip
────────────────────────────────────────
```

## Step 6: Execute Approved Actions (HITL)

Work through each section. For each item, confirm action before executing.

### Absorb
Replace vault skill with quiver version:
```bash
cp "$QUIVER_PATH/{quiver-path}/SKILL.md" "$QUIVER_PATH/vault/{name}/SKILL.md"
```
Report: `Absorbed: {name} — vault replaced with quiver/{id}`

### Show diff (precursor to Revise)
Read both files side by side. Present a section-by-section comparison:
- Sections only in quiver version
- Sections only in vault version
- Sections present in both but different

Let user decide what to incorporate before writing.

### Revise
Apply selected diff sections to the vault skill. Write the updated file. Show the final result before confirming the write.

### Merge
Combine both skills into a unified vault skill. Structure: use vault's frontmatter as base, integrate quiver's unique sections, preserve vault's unique sections. Present merged draft — user approves before writing.

### Append
Copy quiver skill into vault alongside existing vault skill (different name):
```bash
mkdir -p "$QUIVER_PATH/vault/{category}/{quiver-name}"
cp "$QUIVER_PATH/{quiver-path}/SKILL.md" "$QUIVER_PATH/vault/{category}/{quiver-name}/SKILL.md"
```

### Copy to vault (gap fill)
```bash
mkdir -p "$QUIVER_PATH/vault/{category}/{name}"
cp "$QUIVER_PATH/{quiver-path}/SKILL.md" "$QUIVER_PATH/vault/{category}/{name}/SKILL.md"
```

### Note
Append a one-line note to `$QUIVER_PATH/vault/NOTES.md`:
```
[date] [vault-skill or quiver-skill] — [reason noted]
```
Creates the file if it doesn't exist.

### Skip
No action. Move to next item.

## Step 7: Summary

After all actions are processed:

```
Done.
  Absorbed: N  |  Revised: N  |  Merged: N
  Appended: N  |  Copied: N   |  Noted: N  |  Skipped: N

Vault: $QUIVER_PATH/vault/
Notes: $QUIVER_PATH/vault/NOTES.md
```

## Constraints

- **Never write without approval** — every file operation requires explicit user confirmation
- **Never delete vault skills** — Absorb replaces, never removes the old file silently; confirm before overwrite
- **vault/ stays gitignored** — remind user if they ask about committing vault content
- **Novel skills are yours** — don't auto-suggest contributing; only note it if user asks
- **Cadence** — run when quiver gets a meaningful update, or when vault feels stale. Not after every session.
