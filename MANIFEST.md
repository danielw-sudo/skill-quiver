# Skill Manifest

Machine-readable index of all skills. Use for routing, search, and install decisions.

**Type legend:** `execution` = autonomous procedure | `reference` = knowledge base | `persona` = role identity | `setup` = one-time config

**Weight:** `light` (<100 lines) | `standard` (100-250) | `heavy` (250+)

## plan/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| blueprint | execution | light | plan/blueprint/ | Multi-session construction plan generator with adversarial review |
| search-first | execution | light | plan/search-first/ | Research-before-coding workflow — find existing solutions first |

## code/patterns/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| api | reference | heavy | code/patterns/api/ | REST API design — resource naming, status codes, pagination, versioning |
| backend | reference | heavy | code/patterns/backend/ | Backend architecture for Node.js, Express, Next.js API routes |
| standards | reference | heavy | code/patterns/standards/ | Universal coding standards for TypeScript, JavaScript, React, Node.js |
| frontend | reference | heavy | code/patterns/frontend/ | Frontend patterns for React, Next.js, state management, performance |
| postgres | reference | standard | code/patterns/postgres/ | PostgreSQL query optimization, schema design, indexing, security |

## code/tools/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| fe-dev | execution | heavy | code/tools/fe-dev/ | Build production-grade frontend interfaces |
| mcp-server | reference | light | code/tools/mcp-server/ | Build MCP servers — tools, resources, validation, stdio vs HTTP |
| db-migrate | reference | heavy | code/tools/db-migrate/ | Migration best practices — schema changes, rollbacks, zero-downtime |
| harden | execution | heavy | code/tools/harden/ | Error handling, i18n, text overflow, edge case management |
| optimize | execution | heavy | code/tools/optimize/ | Performance optimization — loading, rendering, animations, bundle size |
| extract | execution | light | code/tools/extract/ | Extract reusable components and design tokens |

## design/core/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| fe-design | reference | standard | design/core/fe-design/ | Design principles, anti-slop guidelines, aesthetic direction |
| impeccable | setup | light | design/core/impeccable/ | One-time design context gathering — saves to .impeccable.md |

## design/verbs/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| adapt | execution | standard | design/verbs/adapt/ | Adapt designs across screen sizes, devices, platforms |
| animate | execution | standard | design/verbs/animate/ | Add purposeful animations and micro-interactions |
| arrange | execution | standard | design/verbs/arrange/ | Fix layout, spacing, visual rhythm |
| bolder | execution | standard | design/verbs/bolder/ | Amplify safe designs to increase visual impact |
| clarify | execution | standard | design/verbs/clarify/ | Improve UX copy, error messages, labels |
| colorize | execution | standard | design/verbs/colorize/ | Add strategic color to monochromatic interfaces |
| delight | execution | heavy | design/verbs/delight/ | Add moments of joy and personality |
| distill | execution | standard | design/verbs/distill/ | Strip designs to their essence |

## design/quality/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| audit | execution | standard | design/quality/audit/ | Comprehensive interface quality audit — accessibility, performance, theming |
| critique | execution | standard | design/quality/critique/ | Evaluate design effectiveness from UX perspective |
| norm | execution | light | design/quality/norm/ | Normalize design to match design system |
| onboard | execution | heavy | design/quality/onboard/ | Design onboarding flows and first-time experiences |
| overdrive | execution | standard | design/quality/overdrive/ | Push interfaces past conventional limits |
| polish | execution | standard | design/quality/polish/ | Final quality pass — alignment, spacing, consistency |
| quieter | execution | standard | design/quality/quieter/ | Tone down overly bold designs |
| typeset | execution | standard | design/quality/typeset/ | Improve typography — font choices, hierarchy, readability |

## test/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| tdd-workflow | execution | heavy | test/tdd-workflow/ | Test-driven development with 80%+ coverage |
| verify | execution | standard | test/verify/ | Comprehensive verification system — build, lint, type check, test |
| e2e-testing | execution | heavy | test/e2e-testing/ | Playwright E2E patterns, Page Object Model, CI/CD |
| ai-regression | reference | heavy | test/ai-regression/ | Regression testing for AI-assisted development |
| a11y-audit | persona | heavy | test/a11y-audit/ | WCAG audit specialist — assistive tech testing |
| api-tester | persona | heavy | test/api-tester/ | API validation, performance testing, quality assurance |

## ship/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| deploy | reference | heavy | ship/deploy/ | CI/CD, Docker, health checks, rollback strategies |
| docker | reference | heavy | ship/docker/ | Docker/Compose patterns — dev, security, networking, volumes |
| devops | persona | heavy | ship/devops/ | Infrastructure automation, CI/CD pipelines, cloud ops |

## prompt/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| research | execution | standard | prompt/research/ | Multi-source research with citations via firecrawl/exa MCPs |
| prompt-tune | execution | heavy | prompt/prompt-tune/ | Optimize and refine prompts for better AI output |
| article | reference | light | prompt/article/ | Long-form content in distinctive voice |
| content | reference | light | prompt/content/ | Platform-native content systems for social and newsletters |

## ops/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| llm-costs | reference | standard | ops/llm-costs/ | LLM API cost optimization — model routing, budget tracking, production ops |
| compact | reference | light | ops/compact/ | Manual context compaction at logical intervals |

## review/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| sec-review | execution | heavy | review/sec-review/ | Security checklist for auth, input handling, secrets, APIs |
| sec-scan | execution | light | review/sec-scan/ | Scan .claude/ directory for vulnerabilities via AgentShield |
| reviewer | persona | light | review/reviewer/ | Constructive code review — correctness, maintainability, security |

## system/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| ctx-audit | execution | standard | system/ctx-audit/ | Audit persistent context files for staleness, duplication, and bloat |
| ctx-budget | execution | standard | system/ctx-budget/ | Audit context window consumption and identify bloat |
| quiver-draw | execution | standard | system/quiver-draw/ | Draw skills from quiver into context on demand |
| stocktake | execution | standard | system/stocktake/ | Audit skills for quality — quick scan or full stocktake |
| adr | reference | standard | system/adr/ | Capture architectural decisions as structured ADRs |
| onboard-repo | setup | standard | system/onboard-repo/ | Analyze unfamiliar codebase and generate onboarding guide |
| instinct | reference | standard | system/instinct/ | Instinct-based learning system with confidence scoring |

## domain/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| docx | execution | heavy | domain/docx/ | Create, read, edit Word documents |
| pdf | execution | standard | domain/pdf/ | Read, create, manipulate PDF files |
| xlsx | execution | standard | domain/xlsx/ | Create, read, edit Excel spreadsheets |
| pptx | execution | standard | domain/pptx/ | Generate, edit, read PowerPoint presentations |
| shader | execution | heavy | domain/shader/ | GLSL shader techniques — ray marching, SDF, fluid, particles |
