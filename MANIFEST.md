# Skill Manifest

Machine-readable index of all skills. Use for routing, search, and install decisions.

**Type legend:** `execution` = autonomous procedure | `reference` = knowledge base | `persona` = role identity | `setup` = one-time config

**Weight:** `light` (<100 lines) | `standard` (100-250) | `heavy` (250+)


## code/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| api-design | reference | heavy | code/patterns/api/ | REST API design patterns including resource naming, status codes, pagination, fi… |
| backend-architect | persona | light | code/backend-architect/ | Senior backend architect for system design, database architecture, API developme… |
| backend-patterns | reference | heavy | code/patterns/backend/ | Backend architecture patterns, API design, database optimization, and server-sid… |
| coding-standards | reference | heavy | code/patterns/standards/ | Universal coding standards, best practices, and patterns for TypeScript, JavaScr… |
| database-migrations | reference | heavy | code/tools/db-migrate/ | Database migration best practices for schema changes, data migrations, rollbacks… |
| frontend-patterns | reference | heavy | code/patterns/frontend/ | Frontend development patterns for React, Next.js, state management, performance … |
| mcp-server-patterns | reference | light | code/tools/mcp-server/ | Build MCP servers with Node/TypeScript SDK — tools, resources, prompts, Zod vali… |
| postgres-patterns | reference | standard | code/patterns/postgres/ | PostgreSQL database patterns for query optimization, schema design, indexing, an… |
| software-architect | persona | light | code/software-architect/ | Software architect for system design, domain-driven design, and architectural de… |
| systematic-debugging | execution | heavy | code/systematic-debugging/ | 4-phase root cause debugging: understand bugs before fixing. Enforces the iron l… |

## code/tools/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| extract | execution | light | code/tools/extract/ | Extract and consolidate reusable components, design tokens, and patterns into yo… |
| frontend-dev | execution | heavy | code/tools/fe-dev/ | | |
| harden | execution | heavy | code/tools/harden/ | Improve interface resilience through better error handling, i18n support, text o… |
| mcp-builder | persona | light | code/tools/mcp-builder/ | MCP server specialist — designs, builds, and tests MCP servers that extend AI ag… |
| optimize | execution | heavy | code/tools/optimize/ | Improve interface performance across loading speed, rendering, animations, image… |
| python-data-pipeline | reference | standard | code/tools/python-data-pipeline/ | Build robust multi-stage data processing pipelines using Python. Covers the Inpu… |

## design/core/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| fe-design | reference | standard | design/core/fe-design/ | Create distinctive, production-grade frontend interfaces with high design qualit… |
| fireworks-tech-graph | reference | heavy | design/core/fireworks-tech-graph/ | Use when the user wants to create any technical diagram - architecture, data flo… |
| impeccable | setup | light | design/core/impeccable/ | One-time setup that gathers design context for your project and saves it to your… |

## design/quality/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| audit | execution | standard | design/quality/audit/ | Perform comprehensive audit of interface quality across accessibility, performan… |
| critique | execution | standard | design/quality/critique/ | Evaluate design effectiveness from a UX perspective. Assesses visual hierarchy, … |
| norm | execution | light | design/quality/norm/ | Normalize design to match your design system and ensure consistency |
| onboard | execution | heavy | design/quality/onboard/ | Design or improve onboarding flows, empty states, and first-time user experience… |
| overdrive | execution | standard | design/quality/overdrive/ | Push interfaces past conventional limits with technically ambitious implementati… |
| polish | execution | standard | design/quality/polish/ | Final quality pass before shipping. Fixes alignment, spacing, consistency, and d… |
| quieter | execution | standard | design/quality/quieter/ | Tone down overly bold or visually aggressive designs. Reduces intensity while ma… |
| typeset | execution | standard | design/quality/typeset/ | Improve typography by fixing font choices, hierarchy, sizing, weight consistency… |

## design/verbs/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| adapt | execution | standard | design/verbs/adapt/ | Adapt designs to work across different screen sizes, devices, contexts, or platf… |
| animate | execution | standard | design/verbs/animate/ | Review a feature and enhance it with purposeful animations, micro-interactions, … |
| arrange | execution | standard | design/verbs/arrange/ | Improve layout, spacing, and visual rhythm. Fixes monotonous grids, inconsistent… |
| bolder | execution | standard | design/verbs/bolder/ | Amplify safe or boring designs to make them more visually interesting and stimul… |
| clarify | execution | standard | design/verbs/clarify/ | Improve unclear UX copy, error messages, microcopy, labels, and instructions. Ma… |
| colorize | execution | standard | design/verbs/colorize/ | Add strategic color to features that are too monochromatic or lack visual intere… |
| delight | execution | heavy | design/verbs/delight/ | Add moments of joy, personality, and unexpected touches that make interfaces mem… |
| distill | execution | standard | design/verbs/distill/ | Strip designs to their essence by removing unnecessary complexity. Great design … |

## domain/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| docx | execution | heavy | domain/docx/ | Professional DOCX document creation, editing, and formatting using OpenXML SDK (… |
| pdf | execution | standard | domain/pdf/ | Use this skill when visual quality and design identity matter for a PDF. CREATE … |
| pptx | execution | heavy | domain/pptx/ | Generate, edit, and read PowerPoint presentations. Create from scratch with Pptx… |
| shader | execution | heavy | domain/shader/ | Comprehensive GLSL shader techniques for creating stunning visual effects — ray … |
| xlsx | execution | standard | domain/xlsx/ | Open, create, read, analyze, edit, or validate Excel/spreadsheet files (.xlsx, .… |

## ops/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| agent-orchestration | execution | standard | ops/agent-orchestration/ | Orchestrate multiple AI agents on the same host. Two modes: dispatch (one-shot t… |
| compact | reference | light | ops/compact/ | Suggests manual context compaction at logical intervals to preserve context thro… |
| llm-costs | reference | standard | ops/llm-costs/ | Cost optimization patterns for LLM API usage — model routing by task complexity,… |
| maintain | workflow | standard | ops/maintain/ | KB chore runner — organizes unprocessed notes, enforces structure, rotates live … |
| opencode | reference | standard | ops/opencode/ | OpenCode CLI reference — delegate coding tasks to OpenCode as an autonomous codi… |
| persistent-background-script | execution | standard | ops/persistent-background-script/ | Create, deploy, and manage long-running resilient background service scripts tha… |
| retro | workflow | standard | ops/retro/ | Bidirectional retrospective — grades agent system evolution and human decision q… |
| session-distill | workflow | light | ops/session-distill/ | Distills a Claude Code session into a structured Trilium KB note following the a… |
| subagent-driven-development | execution | standard | ops/subagent-driven-development/ | Execute implementation plans by dispatching fresh subagents per task with two-st… |

## plan/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| blueprint | execution | light | plan/blueprint/ | Turn a one-line objective into a step-by-step construction plan for multi-sessio… |
| search-first | execution | light | plan/search-first/ | Research-before-coding workflow. Search for existing tools, libraries, and patte… |
| spike | execution | standard | plan/spike/ | Throwaway experiments to validate an idea before committing to a build. Validate… |
| workflow-architect | persona | light | plan/workflow-architect/ | Workflow design specialist. Maps complete workflow trees covering happy paths, b… |
| writing-plans | execution | standard | plan/writing-plans/ | Write architectural and implementation plans before any code. Two modes: top-dow… |

## prompt/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| article | reference | light | prompt/article/ | Write articles, guides, blog posts, tutorials, newsletter issues, and other long… |
| content | reference | light | prompt/content/ | Create platform-native content systems for X, LinkedIn, TikTok, YouTube, newslet… |
| prompt-tune | execution | heavy | prompt/prompt-tune/ | Analyze raw prompts, identify intent and gaps, match ECC components (skills/comm… |
| research | execution | standard | prompt/research/ | Multi-source deep research using firecrawl and exa MCPs. Searches the web, synth… |

## review/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| Code Reviewer | persona | light | review/reviewer/ | Expert code reviewer who provides constructive, actionable feedback focused on c… |
| requesting-code-review | execution | standard | review/requesting-code-review/ | Pre-commit verification pipeline: security scan, baseline-aware quality gates, i… |
| sec-review | execution | heavy | review/sec-review/ | Use this skill when adding authentication, handling user input, working with sec… |
| sec-scan | execution | light | review/sec-scan/ | Scan your Claude Code configuration (.claude/ directory) for security vulnerabil… |
| skill-scan | execution | light | review/skill-scan/ | Security scan a SKILL.md using NVIDIA SkillSpector before curation or promotion.… |

## ship/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| DevOps Automator | persona | heavy | ship/devops/ | Expert DevOps engineer specializing in infrastructure automation, CI/CD pipeline… |
| deploy | reference | heavy | ship/deploy/ | Deployment workflows, CI/CD pipeline patterns, Docker containerization, health c… |
| docker | reference | heavy | ship/docker/ | Docker and Docker Compose patterns for local development, container security, ne… |

## system/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| adr | reference | standard | system/adr/ | Capture architectural decisions made during Claude Code sessions as structured A… |
| ctx-audit | execution | standard | system/ctx-audit/ | Audits persistent context files (CLAUDE.md, SESSION_CONTEXT, handoffs, memory) f… |
| ctx-budget | execution | standard | system/ctx-budget/ | Audits Claude Code context window consumption across agents, skills, MCP servers… |
| curate | execution | standard | system/curate/ | HITL skill curation pipeline. Evaluates a candidate skill against quality/ feasi… |
| format | execution | standard | system/format/ | Normalize an existing SKILL.md to quiver frontmatter spec. Checks completeness, … |
| instinct | reference | standard | system/instinct/ | Instinct-based learning system that observes sessions via hooks, creates atomic … |
| onboard-repo | setup | standard | system/onboard-repo/ | Analyze an unfamiliar codebase and generate a structured onboarding guide with a… |
| quiver-draw | execution | standard | system/quiver-draw/ | Draw a skill from skill-quiver for immediate use in this session. Shows numbered… |
| stocktake | execution | light | system/stocktake/ | Audit Claude skills and commands for quality. Quick Scan (changed only) or Full … |

## test/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| API Tester | persona | heavy | test/api-tester/ | Expert API testing specialist focused on comprehensive API validation, performan… |
| Accessibility Auditor | persona | heavy | test/a11y-audit/ | Expert accessibility specialist who audits interfaces against WCAG standards, te… |
| ai-regression | reference | heavy | test/ai-regression/ | Regression testing strategies for AI-assisted development. Sandbox-mode API test… |
| e2e-testing | execution | heavy | test/e2e-testing/ | Playwright E2E testing patterns, Page Object Model, configuration, CI/CD integra… |
| tdd-workflow | execution | heavy | test/tdd-workflow/ | Use this skill when writing new features, fixing bugs, or refactoring code. Enfo… |
| verify | execution | standard | test/verify/ | A comprehensive verification system for Claude Code sessions. |
