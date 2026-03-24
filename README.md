# skill-quiver

A curated collection of 70 production-grade skills for AI-assisted development.

Claude Code primary. Model-agnostic where possible.

## Quick Start

```bash
# Copy a skill into your project
cp skill-quiver/code/patterns/api-design/SKILL.md .claude/skills/api-design/SKILL.md
```

Or install the [`/quiver` loader](#quiver-loader) for interactive search and install.

## Skill Types

Every skill has a `type` field in its frontmatter:

| Type | Meaning | What it does when loaded |
|------|---------|------------------------|
| `execution` | Autonomous procedure | Drives work immediately — Claude follows steps |
| `reference` | Knowledge base | Provides context during work, not direction |
| `persona` | Role identity | Shapes approach and communication style |
| `setup` | One-time config | Run once, output persists across sessions |

See [MANIFEST.md](MANIFEST.md) for the full machine-readable skill index with types and weights.

## Categories

| Folder | Count | Purpose |
|---|---|---|
| [`plan/`](#plan) | 7 | Strategy, architecture, blueprints, product analysis |
| [`code/patterns/`](#codepatterns) | 7 | Language and framework patterns (reference) |
| [`code/tools/`](#codetools) | 7 | Frontend dev, migrations, optimization (execution) |
| [`test/`](#test) | 7 | TDD, verification, regression, e2e, accessibility |
| [`ship/`](#ship) | 3 | Deployment, Docker, DevOps automation |
| [`design/core/`](#designcore) | 3 | Design principles, GSAP reference, context setup |
| [`design/verbs/`](#designverbs) | 8 | Design actions — animate, clarify, colorize, etc. |
| [`design/quality/`](#designquality) | 8 | Design review — audit, critique, polish, etc. |
| [`prompt/`](#prompt) | 4 | Content creation, research, prompt optimization |
| [`ops/`](#ops) | 3 | Cost-aware pipelines, context management |
| [`review/`](#review) | 4 | Code review, security review |
| [`meta/`](#meta) | 5 | Learning, ADRs, onboarding, skill management |
| [`domain/`](#domain) | 5 | Document generation (DOCX/PDF/XLSX/PPTX), shaders |

---

## Catalog

### Plan

| Skill | Type | Description |
|---|---|---|
| [strategize](plan/strategize/SKILL.md) | execution | Deep autonomous strategic analysis — researches, evaluates trade-offs, produces decision document |
| [blueprint](plan/blueprint/SKILL.md) | execution | Multi-session construction plan with cold-start execution and adversarial review |
| [search-first](plan/search-first/SKILL.md) | execution | Research-before-coding — search for existing solutions before writing custom code |
| [software-architect](plan/software-architect/SKILL.md) | execution | Autonomous architecture analysis — reads codebase, produces ADR with trade-offs |
| [product-manager](plan/product-manager/SKILL.md) | execution | Autonomous product analysis — prioritization, recommendations. Templates in reference/ |
| [agentic-engineering](plan/agentic-engineering/SKILL.md) | reference | Eval-first execution, decomposition, cost-aware model routing |
| [autonomous-loops](plan/autonomous-loops/SKILL.md) | reference | Patterns for autonomous agent loops — sequential to RFC-driven DAG |

### Code/Patterns

| Skill | Type | Description |
|---|---|---|
| [api-design](code/patterns/api-design/SKILL.md) | reference | REST API patterns — resource naming, status codes, pagination, versioning |
| [backend-patterns](code/patterns/backend-patterns/SKILL.md) | reference | Backend architecture for Node.js, Express, Next.js API routes |
| [coding-standards](code/patterns/coding-standards/SKILL.md) | reference | Universal coding standards for TypeScript, JavaScript, React, Node.js |
| [django-patterns](code/patterns/django-patterns/SKILL.md) | reference | Django architecture — DRF, ORM best practices, caching, signals |
| [frontend-patterns](code/patterns/frontend-patterns/SKILL.md) | reference | React/Next.js patterns — hooks, state management, performance |
| [postgres-patterns](code/patterns/postgres-patterns/SKILL.md) | reference | PostgreSQL — query optimization, schema design, indexing, RLS |
| [python-patterns](code/patterns/python-patterns/SKILL.md) | reference | Pythonic idioms, PEP 8, type hints, robust Python applications |

### Code/Tools

| Skill | Type | Description |
|---|---|---|
| [frontend-dev](code/tools/frontend-dev/SKILL.md) | execution | Build production-grade frontend interfaces |
| [fullstack-dev](code/tools/fullstack-dev/SKILL.md) | execution | Full-stack architecture and frontend-backend integration |
| [mcp-server-patterns](code/tools/mcp-server-patterns/SKILL.md) | reference | Build MCP servers — tools, resources, validation, stdio vs HTTP |
| [database-migrations](code/tools/database-migrations/SKILL.md) | reference | Migration patterns — zero-downtime, rollback, data migrations |
| [harden](code/tools/harden/SKILL.md) | execution | Error handling, i18n, text overflow, edge case management |
| [optimize](code/tools/optimize/SKILL.md) | execution | Performance — loading, rendering, animations, bundle size |
| [extract](code/tools/extract/SKILL.md) | execution | Extract reusable components and design tokens |

### Test

| Skill | Type | Description |
|---|---|---|
| [tdd-workflow](test/tdd-workflow/SKILL.md) | execution | TDD with 80%+ coverage — unit, integration, E2E |
| [verification-loop](test/verification-loop/SKILL.md) | execution | Build, type check, lint, test, security scan, diff review |
| [e2e-testing](test/e2e-testing/SKILL.md) | execution | Playwright E2E — Page Object Model, CI/CD, flaky tests |
| [python-testing](test/python-testing/SKILL.md) | reference | pytest — TDD, fixtures, mocking, parametrization, coverage |
| [ai-regression-testing](test/ai-regression-testing/SKILL.md) | reference | Regression testing for AI-assisted development |
| [accessibility-auditor](test/accessibility-auditor/SKILL.md) | persona | WCAG auditing with assistive technology testing |
| [api-tester](test/api-tester/SKILL.md) | persona | API validation, performance testing, quality assurance |

### Ship

| Skill | Type | Description |
|---|---|---|
| [deployment-patterns](ship/deployment-patterns/SKILL.md) | reference | CI/CD, Docker, health checks, rollback strategies |
| [docker-patterns](ship/docker-patterns/SKILL.md) | reference | Docker/Compose — local dev, security, networking, volumes |
| [devops-automator](ship/devops-automator/SKILL.md) | persona | Infrastructure automation, CI/CD pipelines, cloud ops |

### Design/Core

| Skill | Type | Description |
|---|---|---|
| [frontend-design](design/core/frontend-design/SKILL.md) | reference | Design principles, anti-slop guidelines, aesthetic direction. Reference docs in reference/ |
| [teach-impeccable](design/core/teach-impeccable/SKILL.md) | setup | One-time design context gathering — recommended before design work |
| [gsap](design/core/gsap/SKILL.md) | reference | Consolidated GSAP — core, timelines, ScrollTrigger, React/Vue/Svelte, plugins |

### Design/Verbs

| Skill | Type | Description |
|---|---|---|
| [adapt](design/verbs/adapt/SKILL.md) | execution | Adapt designs across screen sizes, devices, platforms |
| [animate](design/verbs/animate/SKILL.md) | execution | Purposeful animations and micro-interactions |
| [arrange](design/verbs/arrange/SKILL.md) | execution | Fix layout, spacing, visual rhythm |
| [bolder](design/verbs/bolder/SKILL.md) | execution | Amplify safe designs — increase visual impact |
| [clarify](design/verbs/clarify/SKILL.md) | execution | Improve UX copy, error messages, labels |
| [colorize](design/verbs/colorize/SKILL.md) | execution | Add strategic color to monochromatic interfaces |
| [delight](design/verbs/delight/SKILL.md) | execution | Joy, personality, and unexpected touches |
| [distill](design/verbs/distill/SKILL.md) | execution | Strip designs to their essence |

### Design/Quality

| Skill | Type | Description |
|---|---|---|
| [audit](design/quality/audit/SKILL.md) | execution | Interface quality audit — accessibility, performance, theming |
| [critique](design/quality/critique/SKILL.md) | execution | UX design critique — hierarchy, IA, emotional resonance |
| [normalize](design/quality/normalize/SKILL.md) | execution | Align design to design system |
| [onboard](design/quality/onboard/SKILL.md) | execution | First-time user experience, empty states, guided tours |
| [overdrive](design/quality/overdrive/SKILL.md) | execution | Push interfaces past conventional limits |
| [polish](design/quality/polish/SKILL.md) | execution | Final quality pass — alignment, spacing, consistency |
| [quieter](design/quality/quieter/SKILL.md) | execution | Tone down visually aggressive designs |
| [typeset](design/quality/typeset/SKILL.md) | execution | Typography — font choices, hierarchy, readability |

### Prompt

| Skill | Type | Description |
|---|---|---|
| [deep-research](prompt/deep-research/SKILL.md) | execution | Multi-source research with citations via firecrawl/exa MCPs |
| [prompt-optimizer](prompt/prompt-optimizer/SKILL.md) | execution | Analyze and optimize prompts for better AI output |
| [article-writing](prompt/article-writing/SKILL.md) | reference | Long-form content in distinctive voice |
| [content-engine](prompt/content-engine/SKILL.md) | reference | Platform-native content for social and newsletters |

### Ops

| Skill | Type | Description |
|---|---|---|
| [cost-aware-llm-pipeline](ops/cost-aware-llm-pipeline/SKILL.md) | reference | LLM API cost optimization — model routing, budgets, caching |
| [enterprise-agent-ops](ops/enterprise-agent-ops/SKILL.md) | reference | Long-lived agent workloads with observability and security |
| [strategic-compact](ops/strategic-compact/SKILL.md) | reference | Manual context compaction at logical intervals |

### Review

| Skill | Type | Description |
|---|---|---|
| [security-review](review/security-review/SKILL.md) | execution | Security checklist for auth, input, secrets, APIs |
| [security-scan](review/security-scan/SKILL.md) | execution | Scan Claude Code config for vulnerabilities |
| [code-reviewer](review/code-reviewer/SKILL.md) | persona | Constructive code review — correctness, security, maintainability |
| [security-engineer](review/security-engineer/SKILL.md) | persona | Threat modeling, vulnerability assessment, secure architecture |

### Meta

| Skill | Type | Description |
|---|---|---|
| [context-budget](meta/context-budget/SKILL.md) | execution | Audit context window consumption and identify bloat |
| [skill-stocktake](meta/skill-stocktake/SKILL.md) | execution | Audit skills for quality — quick scan or full stocktake |
| [architecture-decision-records](meta/architecture-decision-records/SKILL.md) | reference | Capture decisions as structured ADRs |
| [codebase-onboarding](meta/codebase-onboarding/SKILL.md) | setup | Analyze unfamiliar codebase, generate onboarding guide |
| [continuous-learning-v2](meta/continuous-learning-v2/SKILL.md) | reference | Instinct-based learning with confidence scoring |

### Domain

| Skill | Type | Description |
|---|---|---|
| [minimax-docx](domain/minimax-docx/SKILL.md) | execution | Professional DOCX creation/editing |
| [minimax-pdf](domain/minimax-pdf/SKILL.md) | execution | Beautiful PDF generation |
| [minimax-xlsx](domain/minimax-xlsx/SKILL.md) | execution | Excel/spreadsheet creation and editing |
| [pptx-generator](domain/pptx-generator/SKILL.md) | execution | PowerPoint generation/editing |
| [shader-dev](domain/shader-dev/SKILL.md) | execution | GLSL shaders — ray marching, SDF, fluid, particles |

---

## Quiver Loader

Install the `/quiver` skill at the global level to search and install skills interactively:

```bash
cp skill-quiver/path/to/quiver/SKILL.md ~/.claude/skills/quiver/SKILL.md
```

Then use `/quiver search`, `/quiver list`, `/quiver preview`, or `/quiver install` from any project.

## Sources

Curated from:
- **everything-claude-code** — engineering, testing, agentic patterns
- **impeccable** — frontend design system with anti-AI-slop checks
- **gsap-skills** — GSAP animation library patterns (consolidated into single reference)
- **agency-agents** — role-based engineering personas (cherry-picked)
- **mini-max-skills** — document generation, native dev, shaders

## License

MIT
