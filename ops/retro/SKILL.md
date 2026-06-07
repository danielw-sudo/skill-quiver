---
name: retro
description: Bidirectional retrospective — grades agent system evolution and human decision quality. Produces a structured review note in your KB.
type: workflow
category: ops
source: 2nd-brain-project
model: any
---

# Retro — Bidirectional Review

Produces an honest retrospective grading both the agent/system and the human's decisions over a review period. The value is pattern recognition over time, not any single grade.

## When to Activate

- After a meaningful milestone (not after every session)
- After a week of active work
- When something feels off — repeated friction, stalled progress, circular decisions
- When explicitly requested (`/retro`)
- Do NOT run after trivial sessions or during active implementation

## Review Scope

Before starting, establish the review window:
1. Read the KB-Context note for current state
2. Read recent timeline entries across KB notes to understand what happened
3. Check recent session-log notes for decisions and outcomes
4. If available, read the previous retro note for comparison

## Agent / System Grade

Evaluate the agent layer and tooling. Ask these questions:

### Effectiveness
- **Skills used vs available:** Were existing skills actually invoked? Which ones sat unused? An unused skill is either poorly triggered or solving a problem that doesn't exist.
- **Repeated manual work:** Were there tasks done by hand more than twice that should be automated? Each repetition is a missed skill or workflow.
- **Tool failures:** Did MCP tools, n8n workflows, or infra break during the period? Were failures fixed or worked around? Workarounds that persist become technical debt.

### Growth
- **New capabilities:** What was built or improved? Does it compound (makes future work easier) or is it isolated?
- **Barriers hit:** What blocked progress? Were barriers structural (architecture, missing tools) or incidental (config errors, cold starts)?
- **Skill quality:** Are skill files actually followed, or do they need revision? A skill that gets overridden every time is worse than no skill — it's noise.

### Grade Scale
| Grade | Meaning |
|-------|---------|
| Advancing | New capabilities added, compounding. Previous barriers resolved. |
| Holding | Functional but not growing. Maintenance without progress. |
| Regressing | Repeated failures, workarounds accumulating, skills ignored. |

## Human / Decision Grade

Evaluate decision quality with respect, not judgment. The goal is calibration, not criticism.

### Decision Quality
- **Right calls:** Decisions that proved correct in hindsight. What made them right? Was it good judgment, good information, or luck?
- **Wrong calls:** Decisions that cost time or created rework. What was the reasoning at the time? Was the information available to decide differently?
- **Over-architecture:** Were things designed that didn't need designing? Plans that looked elegant but added complexity without payoff? Features nobody asked for?
- **Under-architecture:** Were things hacked together that deserved more thought? Shortcuts that created debt?

### Planning Discipline
- **Tier respect:** Did short-term plans stay pragmatic? Did mid-term plans avoid prescribing implementation? Did long-term principles hold?
- **Agility:** When new information arrived, did plans adapt or were they stubbornly followed?
- **Prioritization:** Were the right things worked on? Was there yak-shaving — solving interesting but non-critical problems while important ones waited?

### Grade Scale
| Grade | Meaning |
|-------|---------|
| Sharp | Decisions well-calibrated to information available. Good use of the planning tiers. |
| Mixed | Some good calls, some avoidable mistakes. Patterns worth watching. |
| Drifting | Repeated patterns of over/under-architecture, poor prioritization, or rigidity. |

## Output Format

Write a structured note to your KB using the above/below format:

```markdown
## Retro [date range] — Compiled Truth

### Agent / System: [Grade]

[2-3 sentences on current state. What's working, what's not.]

- **Highlight:** [Best thing that happened]
- **Concern:** [Pattern worth watching]
- **Action:** [One concrete next step]

### Human / Decisions: [Grade]

[2-3 sentences on decision quality. Honest, not flattering.]

- **Right call:** [Decision that paid off, and why]
- **Watch:** [Pattern that could become a problem]
- **Action:** [One concrete adjustment]

### System Health

- Skills: [X used / Y available] — [note if any should be retired or created]
- KB notes: [total] — [structured vs raw]
- Open items carried forward: [count and brief list]

---

## Timeline

- [date] | retro — [Review period]. Agent: [grade]. Human: [grade]. [One-line summary of key finding.]
```

Label with: `memo`, `status:structured`, `retro`.

## Anti-Patterns

- **Cheerleading** — "Everything is great, keep going!" If there's nothing to improve, the retro was too shallow.
- **Blame** — Grading the human is about calibration, not criticism. Frame as "the decision" not "your mistake."
- **Laundry lists** — One highlight, one concern, one action per side. Prioritize ruthlessly. A retro with 12 action items is a to-do list, not a review.
- **Skipping the comparison** — If a previous retro exists, compare. Did last retro's actions get done? Did the concerns materialize? This is where pattern recognition lives.

## Cadence

No fixed schedule. Run when it would be useful. Suggested triggers:
- End of a project phase
- After 3+ substantial sessions in a week
- Before starting something architecturally significant
- When the previous retro's "concern" feels like it's becoming real
