# skill-quiver

A curated collection of 77 production-grade skills for AI-assisted development.

Claude Code primary. Model-agnostic where possible.

## Quick Start

```bash
# Copy a skill into your project
cp skill-quiver/code/api-design/SKILL.md .claude/skills/api-design/SKILL.md
```

Or install the [`/quiver` loader](#quiver-loader) for interactive search and install.

## Categories

| Folder | Count | Purpose |
|---|---|---|
| [`plan/`](#plan) | 6 | Architecture, blueprints, agentic engineering, autonomous loops |
| [`code/`](#code) | 11 | Language patterns, frameworks, API design, standards |
| [`test/`](#test) | 7 | TDD, verification loops, regression, e2e, accessibility |
| [`ship/`](#ship) | 3 | Deployment, Docker, DevOps automation |
| [`design/`](#design) | 29 | Impeccable design system, GSAP animation, frontend polish |
| [`prompt/`](#prompt) | 4 | Content creation, research, prompt optimization |
| [`ops/`](#ops) | 3 | Cost-aware pipelines, context management, operations |
| [`review/`](#review) | 4 | Code review, security review, security scan |
| [`meta/`](#meta) | 5 | Continuous learning, ADRs, onboarding, skill management |
| [`domain/`](#domain) | 5 | Document generation (DOCX/PDF/XLSX/PPTX), shaders |

---

## Catalog

### Plan

| Skill | Description |
|---|---|
| [agentic-engineering](plan/agentic-engineering/SKILL.md) | Eval-first execution, task decomposition, cost-aware model routing for agentic workflows |
| [autonomous-loops](plan/autonomous-loops/SKILL.md) | Patterns for autonomous agent loops — from sequential pipelines to RFC-driven multi-agent DAGs |
| [blueprint](plan/blueprint/SKILL.md) | Turn a one-line objective into a multi-session construction plan with cold-start execution and adversarial review |
| [product-manager](plan/product-manager/SKILL.md) | Full product lifecycle ownership — discovery, strategy, roadmap, stakeholder alignment, go-to-market |
| [search-first](plan/search-first/SKILL.md) | Research-before-coding workflow — search for existing tools, libraries, and patterns before writing custom code |
| [software-architect](plan/software-architect/SKILL.md) | System design, domain-driven design, architectural patterns, and trade-off analysis for scalable systems |

### Code

| Skill | Description |
|---|---|
| [api-design](code/api-design/SKILL.md) | REST API patterns — resource naming, status codes, pagination, filtering, versioning, rate limiting |
| [backend-patterns](code/backend-patterns/SKILL.md) | Backend architecture for Node.js/Express/Next.js — repository, service, middleware, caching, error handling |
| [coding-standards](code/coding-standards/SKILL.md) | Universal coding standards for TypeScript, JavaScript, React, and Node.js |
| [database-migrations](code/database-migrations/SKILL.md) | Safe migration patterns for PostgreSQL, MySQL, and ORMs — zero-downtime, rollback, data migrations |
| [django-patterns](code/django-patterns/SKILL.md) | Django architecture — DRF APIs, ORM best practices, caching, signals, middleware |
| [frontend-dev](code/frontend-dev/SKILL.md) | Premium frontend development — design, animations, AI-generated assets, copywriting, generative art |
| [frontend-patterns](code/frontend-patterns/SKILL.md) | React/Next.js patterns — composition, hooks, state management, performance, accessibility |
| [fullstack-dev](code/fullstack-dev/SKILL.md) | Full-stack architecture and frontend-backend integration guide |
| [mcp-server-patterns](code/mcp-server-patterns/SKILL.md) | Build MCP servers — tools, resources, prompts, Zod validation, stdio vs Streamable HTTP |
| [postgres-patterns](code/postgres-patterns/SKILL.md) | PostgreSQL patterns — query optimization, schema design, indexing, Row Level Security |
| [python-patterns](code/python-patterns/SKILL.md) | Pythonic idioms, PEP 8 standards, type hints, and best practices for maintainable Python |

### Test

| Skill | Description |
|---|---|
| [accessibility-auditor](test/accessibility-auditor/SKILL.md) | WCAG 2.2 auditing with assistive technology testing — catches what automation misses |
| [ai-regression-testing](test/ai-regression-testing/SKILL.md) | Regression patterns for AI-assisted dev — sandbox testing, AI blind-spot detection, bug-check workflows |
| [api-tester](test/api-tester/SKILL.md) | Comprehensive API validation — functional, performance, security, contract testing |
| [e2e-testing](test/e2e-testing/SKILL.md) | Playwright E2E patterns — Page Object Model, CI/CD integration, flaky test strategies |
| [python-testing](test/python-testing/SKILL.md) | pytest patterns — TDD methodology, fixtures, mocking, parametrization, coverage |
| [tdd-workflow](test/tdd-workflow/SKILL.md) | Test-driven development with 80%+ coverage — unit, integration, and E2E test phases |
| [verification-loop](test/verification-loop/SKILL.md) | Comprehensive verification — build, type check, lint, test, security scan, diff review |

### Ship

| Skill | Description |
|---|---|
| [deployment-patterns](ship/deployment-patterns/SKILL.md) | CI/CD pipelines, Docker containerization, health checks, rollback strategies, production readiness |
| [devops-automator](ship/devops-automator/SKILL.md) | Infrastructure automation — IaC, CI/CD pipelines, container orchestration, zero-downtime deploys |
| [docker-patterns](ship/docker-patterns/SKILL.md) | Docker/Compose patterns — local dev, container security, networking, volume strategies |

### Design

#### Impeccable Design System

Run [`teach-impeccable`](design/teach-impeccable/SKILL.md) first to gather project design context.

| Skill | Description |
|---|---|
| [frontend-design](design/frontend-design/SKILL.md) | Master design skill — context gathering, aesthetics, typography, color, layout, motion, anti-slop checks |
| [teach-impeccable](design/teach-impeccable/SKILL.md) | One-time setup — gathers design context for your project and persists it to config |
| [adapt](design/adapt/SKILL.md) | Adapt designs across screen sizes, devices, and platforms |
| [animate](design/animate/SKILL.md) | Add purposeful animations and micro-interactions that improve usability |
| [arrange](design/arrange/SKILL.md) | Fix layout, spacing, and visual rhythm — create intentional compositions |
| [audit](design/audit/SKILL.md) | Comprehensive quality audit — accessibility, performance, theming, responsive |
| [bolder](design/bolder/SKILL.md) | Amplify safe designs — increase visual impact while maintaining usability |
| [clarify](design/clarify/SKILL.md) | Improve UX copy, error messages, microcopy, labels, and instructions |
| [colorize](design/colorize/SKILL.md) | Add strategic color to monochromatic designs |
| [critique](design/critique/SKILL.md) | UX design critique — hierarchy, IA, emotional resonance, AI-slop detection |
| [delight](design/delight/SKILL.md) | Add personality, joy, and unexpected touches that make interfaces memorable |
| [distill](design/distill/SKILL.md) | Strip designs to essence — remove unnecessary complexity |
| [extract](design/extract/SKILL.md) | Extract reusable components, design tokens, and patterns into a design system |
| [harden](design/harden/SKILL.md) | Improve resilience — error handling, i18n, text overflow, edge cases |
| [normalize](design/normalize/SKILL.md) | Align design to your design system — fix inconsistent tokens and styles |
| [onboard](design/onboard/SKILL.md) | Design first-time user experience, empty states, guided tours |
| [optimize](design/optimize/SKILL.md) | Performance optimization — loading speed, rendering, animations, bundle size |
| [overdrive](design/overdrive/SKILL.md) | Push interfaces to technical limits — shaders, spring physics, scroll-driven reveals |
| [polish](design/polish/SKILL.md) | Final quality pass — alignment, spacing, states, transitions, edge cases |
| [quieter](design/quieter/SKILL.md) | Tone down visually aggressive designs while maintaining character |
| [typeset](design/typeset/SKILL.md) | Improve typography — font choices, hierarchy, sizing, readability |

#### GSAP Animation

| Skill | Description |
|---|---|
| [gsap-core](design/gsap-core/SKILL.md) | Core GSAP API — tweens, easing, stagger, defaults, responsive animation |
| [gsap-react](design/gsap-react/SKILL.md) | React-specific GSAP — useGSAP hook, refs, cleanup, SSR |
| [gsap-scrolltrigger](design/gsap-scrolltrigger/SKILL.md) | Scroll-driven animations — pinning, scrubbing, batching |
| [gsap-timeline](design/gsap-timeline/SKILL.md) | Timeline sequencing — position parameter, nesting, playback control |
| [gsap-plugins](design/gsap-plugins/SKILL.md) | GSAP plugins — Flip, Draggable, SplitText, SVG, physics |
| [gsap-performance](design/gsap-performance/SKILL.md) | Animation performance — GPU properties, will-change, batching |
| [gsap-frameworks](design/gsap-frameworks/SKILL.md) | GSAP with Vue, Svelte, and other frameworks |
| [gsap-utils](design/gsap-utils/SKILL.md) | Utility functions — clamp, mapRange, snap, toArray, wrap, pipe |

### Prompt

| Skill | Description |
|---|---|
| [article-writing](prompt/article-writing/SKILL.md) | Long-form content — articles, guides, blog posts, tutorials in a distinctive voice |
| [content-engine](prompt/content-engine/SKILL.md) | Platform-native content for X, LinkedIn, TikTok, YouTube, newsletters |
| [deep-research](prompt/deep-research/SKILL.md) | Multi-source deep research with web search, synthesis, and cited reports |
| [prompt-optimizer](prompt/prompt-optimizer/SKILL.md) | Analyze and optimize prompts — identify intent, gaps, and output ready-to-paste improvements |

### Ops

| Skill | Description |
|---|---|
| [cost-aware-llm-pipeline](ops/cost-aware-llm-pipeline/SKILL.md) | Cost optimization for LLM APIs — model routing, budget tracking, retry logic, prompt caching |
| [enterprise-agent-ops](ops/enterprise-agent-ops/SKILL.md) | Long-lived agent workloads with observability, security boundaries, and lifecycle management |
| [strategic-compact](ops/strategic-compact/SKILL.md) | Manual context compaction at logical intervals to preserve context through task phases |

### Review

| Skill | Description |
|---|---|
| [code-reviewer](review/code-reviewer/SKILL.md) | Constructive code review — correctness, security, maintainability, performance. Teaches, not gatekeeps |
| [security-engineer](review/security-engineer/SKILL.md) | Threat modeling, vulnerability assessment, secure code review, OWASP compliance |
| [security-review](review/security-review/SKILL.md) | Security checklist for auth, user input, secrets, API endpoints, payment flows |
| [security-scan](review/security-scan/SKILL.md) | Scan Claude Code config for vulnerabilities, misconfigurations, and injection risks |

### Meta

| Skill | Description |
|---|---|
| [architecture-decision-records](meta/architecture-decision-records/SKILL.md) | Capture architectural decisions as structured ADRs with context, alternatives, and rationale |
| [codebase-onboarding](meta/codebase-onboarding/SKILL.md) | Analyze unfamiliar codebases and generate structured onboarding guides with architecture maps |
| [context-budget](meta/context-budget/SKILL.md) | Audit context window consumption — identify bloat and produce token-savings recommendations |
| [continuous-learning-v2](meta/continuous-learning-v2/SKILL.md) | Instinct-based learning system — observes sessions, creates atomic learnings, evolves into skills |
| [skill-stocktake](meta/skill-stocktake/SKILL.md) | Audit skills and commands for quality — Quick Scan or Full Stocktake modes |

### Domain

| Skill | Description |
|---|---|
| [minimax-docx](domain/minimax-docx/SKILL.md) | Professional DOCX creation/editing — OpenXML SDK, CJK typography, multi-section layouts |
| [minimax-pdf](domain/minimax-pdf/SKILL.md) | Beautiful PDF generation — token-based design system, 15 document type templates |
| [minimax-xlsx](domain/minimax-xlsx/SKILL.md) | Excel/spreadsheet creation — formula-first approach, financial formatting, validation |
| [pptx-generator](domain/pptx-generator/SKILL.md) | PowerPoint generation/editing — PptxGenJS, 5 slide types, theme system |
| [shader-dev](domain/shader-dev/SKILL.md) | GLSL shaders — ray marching, SDF, fluid simulation, procedural generation, 36 techniques |

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
- **gsap-skills** — GSAP animation library patterns
- **agency-agents** — role-based engineering personas (cherry-picked)
- **mini-max-skills** — document generation, native dev, shaders

## License

MIT
