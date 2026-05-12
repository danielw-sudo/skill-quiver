---
name: maintain
description: KB chore runner — organizes unprocessed notes, enforces structure, rotates live entries, tag hygiene. Surfaces findings for human review.
type: workflow
category: ops
source: 2nd-brain-project
model: any
requires: trilium-mcp
---

# Maintain — KB Chore Runner

Scans the Trilium knowledge base, identifies notes that need attention, and surfaces findings for human review. Does NOT fix autonomously — proposes actions, human decides.

## When to Activate

- On demand (`/maintain`)
- After a burst of note creation (3+ new notes without a maintenance pass)
- When the KB feels messy — hard to find things, tags inconsistent, orphan notes accumulating
- As a scheduled periodic chore (weekly or biweekly)

## Checks

Run these in order. Each check produces a finding or "clean."

### 1. Untagged Notes
Search for notes under `raw/2nd Brain` missing the `noteType` label.

**Action:** For each, propose a `noteType` value based on content inspection:
- External source capture → `reference`
- Original analysis → `memo`
- Session output → `session-log`
- Reusable approach → `skill-candidate`
- Governance/rules → `standard`
- Living state document → `context`

### 2. Unstructured Notes
Search for notes with `status:raw` or missing `status` label.

**Action:** For each, assess whether it should be restructured to above/below format:
- Memos and session logs: yes — extract compiled truth, move details to timeline
- References (external captures): no — raw source content is the value. Tag `status:raw` and move on
- If restructuring is needed, propose the compiled truth section (do not write without approval)

### 3. Stale Live Entries
For notes tagged `noteType:context` or identified as live entries:

**Action:** Check if the compiled truth section reflects current state:
- Compare compiled truth against recent timeline entries and related notes
- If timeline has entries newer than the last compiled truth rewrite, flag as stale
- Propose updated compiled truth (human approves before write)

When rotating a live entry:
1. Create a child note titled `[YYYY-MM-DD] snapshot` with the current content
2. Tag the child with `noteType:archive` only — no other tags
3. Rewrite the parent note's compiled truth
4. Do NOT index the child. Do NOT add it to the timeline note. It exists for historical reference only.

### 4. Orphan Notes
Search for notes under `raw/2nd Brain` that are not referenced in the index (timeline note) and are not children of other notes.

**Action:** For each orphan:
- If it has value: propose adding it to the index under the appropriate type section
- If it's superseded or empty: propose deletion (human confirms)
- If it's a fragment that belongs in another note: propose merging

### 5. Tag Hygiene
List all labels in use across KB notes. Check for:

- **Near-duplicates:** `knowledgebase` vs `knowledge-base`, `kowledgebase` (typo already exists on one note)
- **Inconsistent format:** mixed case, underscores vs hyphens
- **Orphan tags:** labels used on only one note (might be a typo or might be intentional — flag, don't delete)

**Action:** Propose normalizations. Human picks the canonical form.

### 6. Missing Cross-References
Scan compiled truth sections for mentions of known entities (project names, tool names, concepts) that have their own notes but aren't linked.

**Action:** List the missing links. Don't add them automatically — Trilium link syntax needs human verification.

### 7. Open Items Audit
Search for notes containing phrases like "open items", "TODO", "WIP", "next session", "to be fixed."

**Action:** For items older than 14 days:
- Still relevant → keep, but surface for human awareness
- Done but not updated → propose updating the note
- Abandoned → propose removing or moving to timeline as historical

## Output Format

Produce a maintenance report. Two options:

**Option A — Trilium note** (for substantial findings):
```html
<h2>Maintenance Report [date] — Findings</h2>

<h3>1. Untagged: [count]</h3>
<ul><li>[note title] → proposed: noteType:[value]</li></ul>

<h3>2. Unstructured: [count]</h3>
<ul><li>[note title] → needs above/below restructuring</li></ul>

<h3>3. Stale Live Entries: [count]</h3>
<ul><li>[note title] → compiled truth outdated, [brief reason]</li></ul>

<h3>4. Orphans: [count]</h3>
<ul><li>[note title] → propose: index / merge / delete</li></ul>

<h3>5. Tag Issues: [count]</h3>
<ul><li>[tag] → normalize to [canonical]</li></ul>

<h3>6. Missing Links: [count]</h3>
<ul><li>[note] mentions [entity] but doesn't link to [target note]</li></ul>

<h3>7. Stale Open Items: [count]</h3>
<ul><li>[note title]: "[item text]" — [age] days old</li></ul>
```

Tag with: `noteType:memo`, `status:structured`, `maintain-report`.

**Option B — Inline summary** (for clean or minor findings):
Report directly in the conversation. No note needed if there are fewer than 3 findings.

## Execution Rules

- **Read-only by default.** Every write requires human approval.
- **Batch proposals.** Don't ask about each note individually — present all findings, let human approve/reject in bulk.
- **Don't chase perfection.** If a note is 80% right, flag it but don't block on it. The goal is incremental improvement, not a clean room.
- **Known imperfections are fine.** If the human says "leave it," mark it as reviewed and move on. Don't re-flag it next run.
- **Fix the typo.** The existing `kowledgebase` label (note `c105LrC3Kn9i`) is a known tag typo — normalize to `knowledgebase` on first run.

## Anti-Patterns

- **Automating taste** — The skill can classify, but only the human decides what's worth keeping. Never propose deletion without surfacing what would be lost.
- **Maintenance theater** — Running maintain on a 10-note KB weekly is overhead, not discipline. Scale cadence to KB size.
- **Perfectionist spiral** — Spending 30 minutes restructuring a note that was fine as raw. The bar is "useful," not "perfect."
