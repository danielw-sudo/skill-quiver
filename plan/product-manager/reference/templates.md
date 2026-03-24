# Product Manager Templates

Reference templates for product deliverables. Consult when producing a specific document type.

## PRD Template

```markdown
# PRD: [Feature / Initiative Name]
**Status**: Draft | In Review | Approved | In Development | Shipped
**Author**: [PM Name]  **Last Updated**: [Date]  **Version**: [X.X]
**Stakeholders**: [Eng Lead, Design Lead, Marketing, Legal if needed]

## 1. Problem Statement
What specific user pain or business opportunity are we solving?
**Evidence:** User research (n=X), behavioral data, support signal, competitive signal.

## 2. Goals & Success Metrics
| Goal | Metric | Baseline | Target | Window |
|------|--------|----------|--------|--------|

## 3. Non-Goals
What this initiative will NOT address.

## 4. User Personas & Stories
**Primary Persona**: [Name] — [context]
**Story**: As a [persona], I want to [action] so that [outcome].
**Acceptance Criteria**: Given [context], when [action], then [result].

## 5. Solution Overview
[2-4 paragraphs + key design decisions with trade-offs]

## 6. Technical Considerations
Dependencies, known risks (likelihood/impact/mitigation), open questions.

## 7. Launch Plan
| Phase | Date | Audience | Success Gate |
**Rollback Criteria**: [metric threshold for revert]

## 8. Appendix
Research, competitive analysis, mocks, dashboards, tickets.
```

## Opportunity Assessment Template

```markdown
# Opportunity Assessment: [Name]
**Submitted by**: [PM]  **Date**: [date]  **Decision needed by**: [date]

## 1. Why Now?
## 2. User Evidence (interviews n=X, behavioral data, support signal)
## 3. Business Case (revenue, cost, strategic fit, market sizing)
## 4. RICE Score
| Reach | Impact | Confidence | Effort | Score |
## 5. Options Considered
| Option | Pros | Cons | Effort |
## 6. Recommendation: Build / Explore / Defer / Kill
```

## Roadmap Template (Now / Next / Later)

```markdown
# Product Roadmap — [Team] — [Quarter]

## North Star Metric: [metric] Current: [X] Target: [Y]

## Now — Active This Quarter (committed)
| Initiative | User Problem | Success Metric | Owner | Status | ETA |

## Next — 1-2 Quarters (directional)
| Initiative | Hypothesis | Expected Outcome | Confidence | Blocker |

## Later — 3-6 Month Horizon (strategic bets)
| Initiative | Strategic Hypothesis | Signal Needed to Advance |

## Not Building (and Why)
| Request | Source | Reason | Revisit Condition |
```

## GTM Brief Template

```markdown
# Go-to-Market: [Feature]
**Launch Date**: [date]  **Tier**: 1/2/3  **PM**: [name]

## What We're Launching (1 paragraph)
## Target Audience (segment, size, channel)
## Value Prop One-liner
## Launch Checklist (Engineering, Product, Marketing, Sales/CS)
## Success Criteria (launch day, 7d, 30d, 60d, 90d)
## Rollback & Contingency
```

## Sprint Health Snapshot Template

```markdown
# Sprint Health — Sprint [N] — [Dates]

## Committed vs Delivered
| Story | Points | Status | Blocker |
Velocity: [X] committed / [Y] delivered ([Z]%)

## Blockers & Actions
## Scope Changes This Sprint
## Risks Entering Next Sprint
```
