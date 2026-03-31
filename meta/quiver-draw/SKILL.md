---
name: quiver-draw
description: >-
  Hot-load skills from skill-quiver into global ~/.claude/skills/ for immediate
  use. List available skills, draw (load), sheathe (unload), and show current
  loadout. TRIGGER when: user wants to equip a skill, says "/quiver-draw",
  "load skill", "I need the X skill", or "unload skill".
type: execution
category: meta
source: original
model: any
---

# /quiver-draw — Skill Loader

Hot-load skills from the quiver into your global skills for immediate use.

## Paths

```
Quiver:  D:\cc\skill-quiver
Global:  C:\Users\wangd\.claude\skills
```

## Commands

### List available skills
```
/quiver-draw list [category]
```
Read `D:\cc\skill-quiver\MANIFEST.md`. Show name, type, weight, and whether already loaded (compare against global skills directory). If category given, filter.

### Draw (load) a skill
```
/quiver-draw [skill-name]
/quiver-draw draw [skill-name]
```
1. Find skill in MANIFEST.md by name (fuzzy match OK — `context` matches `context-audit`)
2. If multiple matches, show them and ask
3. Source: `D:\cc\skill-quiver\{path}/SKILL.md`
4. Target: `C:\Users\wangd\.claude\skills\{skill-name}\SKILL.md`
5. If skill has a `reference/` directory, copy that too
6. If already loaded: report "already drawn" and skip
7. If `heavy` weight: warn about token cost before copying
8. Confirm: `Drawn: {skill-name} ({type}, {weight})`

### Sheathe (unload) a skill
```
/quiver-draw sheathe [skill-name]
```
1. Check if skill exists in global skills
2. **Safety check**: only remove skills that exist in the quiver — never remove skills that don't have a quiver source (those are hand-crafted globals like wrap, kael, etc.)
3. Delete `C:\Users\wangd\.claude\skills\{skill-name}\`
4. Confirm: `Sheathed: {skill-name}`

### Show current loadout
```
/quiver-draw inventory
```
Compare global skills against MANIFEST.md:

```
Currently Drawn (from quiver):
  context-audit    meta     standard
  tdd-workflow     test     heavy

Permanent (no quiver source):
  wrap, kael, learner, elevate, brainstorm, ...

Available in Quiver: 54 skills across 12 categories
```

## No-Argument Behavior

If run with no arguments, show the inventory (current loadout).

## Rules

- **Never modify the quiver** — read-only source
- **Never sheathe permanent skills** — only skills that have a matching quiver source can be sheathed
- **Always read MANIFEST.md first** — don't scan directories
- **Copy, don't symlink** — symlinks on Windows are unreliable without admin
- **Show weight on draw** — user should know the token cost

## Examples

**Quick draw**
```
User: /quiver-draw tdd
Skill: Found tdd-workflow (test/tdd-workflow, execution, heavy)
       ⚠ Heavy skill — adds ~3K tokens to context
       Drawn: tdd-workflow
```

**Browse then draw**
```
User: /quiver-draw list design
Skill: Shows 16 design skills with loaded/available status
User: draw animate
Skill: Drawn: animate (design/verbs/animate, execution, standard)
```

**Clean up after session**
```
User: /quiver-draw sheathe tdd-workflow
Skill: Sheathed: tdd-workflow
```

**Check what's loaded**
```
User: /quiver-draw
Skill: Shows inventory — 3 drawn from quiver, 8 permanent, 54 available
```
