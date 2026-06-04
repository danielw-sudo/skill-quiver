---
name: format
type: execution
category: system
source: original
model: any
description: >-
  Normalize an existing SKILL.md to quiver frontmatter spec. Checks completeness,
  line count, heading structure, and description quality. Outputs a diff-style
  view of changes. Does NOT alter skill body logic. TRIGGER when: user says
  "/format [path]", "normalize this skill", or "fix frontmatter for [skill]".
---

# /format — Skill Formatter

Normalize an existing SKILL.md to the quiver spec. Frontmatter only — body logic untouched.

## Step 1: Locate

Accept a path, skill name, or skill id (e.g. `test/tdd-workflow`).
Resolve to `$QUIVER_PATH/[id]/SKILL.md`.

If no argument, ask: "Which skill? Provide name or path."

## Step 2: Audit

Read the file. Check each frontmatter field:

| Field | Required | Valid values |
|-------|----------|--------------|
| `name` | yes | kebab-case, matches directory name |
| `type` | yes | `execution`, `reference`, `persona`, `setup` |
| `category` | yes | see taxonomy below |
| `source` | yes | repo name or `original` |
| `model` | yes | `any`, `sonnet`, `opus` |
| `description` | yes | ≥ 1 sentence; if `execution`, must include `TRIGGER when:` |
| `pairs_with` | no | list of skill ids |
| `proven_on` | no | list of project/product names |
| `reviewed_at` | no | ISO date |
| `model_tested` | no | model id from baseline |

**Line count:** Count lines in full file.
- < 100 → light ✓
- 100–250 → standard ✓
- > 250 → heavy — flag (not blocking, but note it)

**Heading check:** First `#` heading should match `name`. `##` headings should be present if body > 50 lines.

**Description check:**
- Must not start with "This skill..." or "A skill that..."
- If `type: execution`, must contain trigger conditions
- Max ~150 chars for skills.json truncation — flag if longer

## Step 3: Category Taxonomy

```
plan          → strategy, blueprints, architecture planning
code          → coding patterns, language standards (reference)
code/tools    → hands-on execution tools (frontend-dev, migrations, etc.)
test          → testing workflows, TDD, verification, accessibility
ship          → deployment, CI/CD, Docker
design/core   → design principles, context setup
design/verbs  → design action skills (animate, colorize, distill, etc.)
design/quality → design review and quality (audit, critique, polish, etc.)
prompt        → content creation, research, prompt optimization
ops           → agent ops, cost management, context management
review        → code review, security review
system        → skills that operate on the quiver or agent system itself
domain        → document generation (docx/pdf/xlsx), shaders
```

## Step 4: Output

Show a before/after diff for frontmatter only:

```
─── BEFORE ────────────────────────────────────
name: tdd
type: execution
description: TDD workflow
─── AFTER ─────────────────────────────────────
name: tdd-workflow
type: execution
category: test
source: everything-claude-code
model: any
description: >-
  TDD with 80%+ coverage. TRIGGER when: user asks to write tests,
  implement a feature with tests, or fix a failing test.
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
────────────────────────────────────────────────
Changes: category added, name normalized, description expanded, dates added
```

Also report:
```
Line count: [N] ([light/standard/heavy])
Body headings: [list of ## headings found]
Warnings: [any flagged issues]
```

## Step 5: Apply

Ask: "Apply these changes? (y/n)"

On yes:
1. Write updated frontmatter to the file (body unchanged)
2. Run `$QUIVER_PATH/sync-manifest.sh` to rebuild index
3. Report: `Formatted: [skill name]`

On no: discard, no changes written.

## Constraints
- Never rewrite skill body content — only frontmatter
- Never change `name` without confirming with user (affects MANIFEST and skills.json keys)
- If `reviewed_at` already set to a recent date, keep it (don't overwrite with today)
