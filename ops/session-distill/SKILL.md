---
name: session-distill
description: Distills a Claude Code session into a structured Trilium KB note following the above/below the line format. Captures actionable insights, not raw transcripts.
type: workflow
category: ops
source: 2nd-brain-project
model: any
requires: trilium-mcp
---

# Session Distillation

Processes a Claude Code session into a structured knowledge base note in Trilium. The goal is distillation, not transcription — extract what matters, discard the noise.

## When to Activate

- At session end, when meaningful work was done (not trivial Q&A)
- When a session produced decisions, discoveries, or reusable approaches
- When `/wrap` runs and the session touched the KB or produced KB-worthy insights
- Do NOT activate for sessions that were purely mechanical (file renames, dependency updates)

## Entry Criteria

Not every session earns a note. Ask before distilling:

1. **Was something decided?** Architecture choices, tool selections, approach changes
2. **Was something discovered?** Bugs, gotchas, undocumented behavior, integration patterns
3. **Was something built?** New infrastructure, workflows, tools
4. **Was an approach validated or invalidated?** Something worked/failed in a non-obvious way

If none of these apply, skip distillation. The bar must hold.

## Note Structure

Follow the above/below the line format defined in KB-Structure: Note Standard.

```html
<h2>[Topic] — Compiled Truth</h2>
<p>What is true right now as a result of this session. Written as present-tense facts.
Not what was done — what is now known or in place.</p>

<hr>

<h2>Timeline</h2>
<ul>
<li>[date] | [source] — What happened. Decisions made. Key details.</li>
</ul>
```

### Compiled Truth Section Rules

- Present tense. State facts, not actions.
- Include: infrastructure state, working configurations, validated patterns, key decisions
- Exclude: debugging steps, failed approaches (unless the failure itself is the insight), routine operations
- If the session changed something previously captured in another note, UPDATE THAT NOTE's compiled truth instead of creating a new one

### Timeline Section Rules

- Past tense. What happened and when.
- Include date and source (e.g., "Claude Code session", "manual test", "n8n workflow")
- Include credentials, ports, config values — the details you'd need to reproduce
- Newest entries first

## Tagging

Apply these labels to the created note:

| Label | Value | When |
|-------|-------|------|
| `noteType` | `session-log` | Always |
| `status` | `structured` | Always (distilled notes are structured by definition) |
| `knowledgebase` | `` | If the session touched the KB project |
| `activeProject` | `` | If the session advanced an active project |
| `skill-candidate` | `` | If a reusable approach was discovered |

## Process

1. **Scan the session** — identify decisions, discoveries, things built, approaches validated/invalidated
2. **Check existing notes** — search Trilium for related notes. If this session updates an existing topic, update that note's compiled truth and append to its timeline instead of creating a new note
3. **Write compiled truth** — distill to present-tense facts. Be ruthless about what earns inclusion
4. **Write timeline entry** — one entry for this session with key details
5. **Tag the note** — apply labels per the table above
6. **Update the index** — append to the "2nd Brain: timeline" index note if a new note was created

## Anti-Patterns

- **Transcript dump** — copying conversation into a note. The session is not the knowledge.
- **Action log** — "ran this command, then that command." Nobody needs this.
- **Unbounded notes** — if the compiled truth section exceeds ~500 words, the session probably touched multiple topics. Split into separate notes.
- **Orphan creation** — creating a note that doesn't connect to anything in the existing KB. Every note should either update an existing topic or be linked from the index.

## Example

A session that verified trilium-mcp, fixed an n8n workflow, and deployed a dashboard would produce:

**Compiled truth:** current state of each service (working/broken, ports, configurations).
**Timeline:** single entry dated today, listing what was verified, what was fixed, what was deployed, with specific config values.

NOT: a step-by-step replay of the debugging process.
