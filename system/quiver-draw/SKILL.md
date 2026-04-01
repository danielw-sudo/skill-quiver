---
name: quiver-draw
description: >-
  Draw a skill from skill-quiver for immediate use in this session.
  Shows numbered list, user picks, skill is read into context.
  TRIGGER when: user says "/quiver-draw", "draw a skill", "I need a skill",
  "load skill from quiver".
type: execution
category: meta
source: original
model: any
---

# /quiver-draw — Draw a Skill

Pick a skill from the quiver. It gets read into context and is ready to use immediately. No installation, no restart.

## Quiver Location

```
D:\cc\skill-quiver
```

## How It Works

### Step 1: List

Read `D:\cc\skill-quiver\MANIFEST.md`. Present a numbered menu:

```
Quiver — pick your arrow:

 #  Name                    Category        Weight    Description
 1  blueprint               plan            light     Multi-session construction plan generator
 2  search-first            plan            light     Research-before-coding workflow
 3  api-design              code/patterns   heavy     REST API design patterns
 4  backend-patterns        code/patterns   heavy     Backend architecture for Node/Express
 ...
54  context-audit           meta            standard  Audit persistent context files

Type a number to draw:
```

**Exclude** `_sources/` directory — those are raw imports, not curated skills.

If the user passed a name or keyword with the command (e.g. `/quiver-draw tdd`), skip the menu — fuzzy match against MANIFEST.md and go straight to Step 2. If multiple matches, show only those as a numbered list.

### Step 2: Draw

Once the user picks a number (or a name was matched):

1. Look up the skill's path in MANIFEST.md
2. Read `D:\cc\skill-quiver\{path}/SKILL.md`
3. If the skill has a `reference/` directory, read those files too
4. Present: `Drawn: {name} ({weight}). Ready to use.`
5. If `heavy` weight: note `⚠ Heavy — this will use significant context`

The skill is now in context. The user can invoke it naturally — "use it to..." or by its trigger phrases.

### Step 3: Use

Follow the drawn skill's instructions as if it were an installed skill. The skill content is in your context — execute it.

## Rules

- **Read-only** — never modify files in skill-quiver
- **No file copying** — skills are read into context, not installed to disk
- **MANIFEST.md first** — always read the manifest for lookup, don't scan directories
- **One at a time** — drawing a second skill is fine, but warn if context is getting heavy (2+ heavy skills)
- **Exclude `_sources/`** — not curated, not in manifest

## Examples

**Interactive pick**
```
User: /quiver-draw
Skill: Shows numbered list of 54 skills
User: 12
Skill: Reads frontend-dev SKILL.md → "Drawn: frontend-dev (heavy). Ready to use."
```

**Direct draw by name**
```
User: /quiver-draw tdd
Skill: Matches tdd-workflow → reads it → "Drawn: tdd-workflow (heavy). Ready to use."
```

**Keyword search**
```
User: /quiver-draw security
Skill: Shows 4 matches:
        1  security-review    review   heavy
        2  security-scan      review   standard
        3  security-engineer  review   heavy
        4  harden             code     heavy
       Type a number to draw:
```
