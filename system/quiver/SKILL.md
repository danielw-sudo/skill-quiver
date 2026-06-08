---
name: quiver
type: execution
category: system
source: original
model: any
description: >-
  Dynamic remote loader and package manager for skill-quiver. Search, draw, or install skills directly from the public GitHub repository. TRIGGER when: user runs `/quiver`, `/quiver find`, `/quiver search`, `/quiver draw`, or `/quiver install`.
reviewed_at: 2026-06-08
model_tested: claude-sonnet-4-6
---

# /quiver — Skill Manager

Zero-clone, lightweight loader and installer for the `skill-quiver` library. You can search, load (draw) skills into active context, or install them locally into your project.

## Remote Registry

- **Registry JSON**: `https://raw.githubusercontent.com/danielw-sudo/skill-quiver/main/skills.json`
- **Base URL**: `https://raw.githubusercontent.com/danielw-sudo/skill-quiver/main/`

## Hybrid Resolution (Local-First)

If the environment variable `$QUIVER_PATH` is configured and points to a valid local directory, resolve files locally to save network calls. Otherwise, fetch them directly from the GitHub repository.

## Commands

### 1. `/quiver list`
Fetches the registry and displays all available skills grouped by category.

### 2. `/quiver search <query>` (or `/quiver find <query>`)
Fuzzy searches the query term across skill names, categories, and descriptions.
- **Action**:
  1. Fetch registry:
     ```bash
     curl -s https://raw.githubusercontent.com/danielw-sudo/skill-quiver/main/skills.json
     ```
  2. Parse and filter entries where `name`, `category`, or `description` match the query (case-insensitive).
  3. Output matching skills in a clean Markdown table.

### 3. `/quiver draw <name>`
Dynamically fetches a skill and reads it directly into the active session context without writing to disk.
- **Action**:
  1. Look up the skill's relative `path` from the registry.
  2. Fetch its `SKILL.md`:
     ```bash
     curl -s https://raw.githubusercontent.com/danielw-sudo/skill-quiver/main/{path}SKILL.md
     ```
  3. Inline the content into the active prompt context so it is ready for immediate execution.
  4. Fetch any associated files in the `reference/` directory if needed.
  5. Print: `Drawn: {name}. Ready to use.`

### 4. `/quiver install <name>`
Downloads and installs the skill locally into the active project workspace.
- **Action**:
  1. Look up the skill's relative `path` from the registry.
  2. Determine the local installation directory: `.claude/skills/{name}/` (or the equivalent directory for the current agent).
  3. Create the directories:
     ```bash
     mkdir -p .claude/skills/{name}/reference
     ```
  4. Download and write the files:
     ```bash
     curl -s -o .claude/skills/{name}/SKILL.md https://raw.githubusercontent.com/danielw-sudo/skill-quiver/main/{path}SKILL.md
     ```
  5. For any reference files listed under the skill's `reference/` path, download them similarly.
  6. Confirm: `Successfully installed {name} to .claude/skills/{name}/. Ready to use.`

## Examples

**Search**
```
User: /quiver find postgres
Agent: [Fetches registry, searches, displays postgres-patterns details]
```

**Draw (In-Context Load)**
```
User: /quiver draw tdd-workflow
Agent: [Fetches tdd-workflow/SKILL.md and inlines it] → "Drawn: tdd-workflow. Ready to use."
```

**Install**
```
User: /quiver install node-inspect-debugger
Agent: [Downloads files to .claude/skills/node-inspect-debugger/] → "Successfully installed node-inspect-debugger to .claude/skills/node-inspect-debugger/."
```
