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
| api-design | reference | heavy | code/patterns/api-design/ | REST API design — resource naming, status codes, pagination, versioning |
| backend-patterns | reference | heavy | code/patterns/backend-patterns/ | Backend architecture for Node.js, Express, Next.js API routes |
| coding-standards | reference | heavy | code/patterns/coding-standards/ | Universal coding standards for TypeScript, JavaScript, React, Node.js |
| frontend-patterns | reference | heavy | code/patterns/frontend-patterns/ | Frontend patterns for React, Next.js, state management, performance |
| postgres-patterns | reference | standard | code/patterns/postgres-patterns/ | PostgreSQL query optimization, schema design, indexing, security |

## code/tools/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| frontend-dev | execution | heavy | code/tools/frontend-dev/ | Build production-grade frontend interfaces |
| mcp-server-patterns | reference | light | code/tools/mcp-server-patterns/ | Build MCP servers — tools, resources, validation, stdio vs HTTP |
| database-migrations | reference | heavy | code/tools/database-migrations/ | Migration best practices — schema changes, rollbacks, zero-downtime |
| harden | execution | heavy | code/tools/harden/ | Error handling, i18n, text overflow, edge case management |
| optimize | execution | heavy | code/tools/optimize/ | Performance optimization — loading, rendering, animations, bundle size |
| extract | execution | light | code/tools/extract/ | Extract reusable components and design tokens |

## design/core/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| frontend-design | reference | standard | design/core/frontend-design/ | Design principles, anti-slop guidelines, aesthetic direction. Reference docs in reference/ |
| teach-impeccable | setup | light | design/core/teach-impeccable/ | One-time design context gathering — saves to .impeccable.md |

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
| normalize | execution | light | design/quality/normalize/ | Normalize design to match design system |
| onboard | execution | heavy | design/quality/onboard/ | Design onboarding flows and first-time experiences |
| overdrive | execution | standard | design/quality/overdrive/ | Push interfaces past conventional limits |
| polish | execution | standard | design/quality/polish/ | Final quality pass — alignment, spacing, consistency |
| quieter | execution | standard | design/quality/quieter/ | Tone down overly bold designs |
| typeset | execution | standard | design/quality/typeset/ | Improve typography — font choices, hierarchy, readability |

## test/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| tdd-workflow | execution | heavy | test/tdd-workflow/ | Test-driven development with 80%+ coverage |
| verification-loop | execution | standard | test/verification-loop/ | Comprehensive verification system — build, lint, type check, test |
| e2e-testing | execution | heavy | test/e2e-testing/ | Playwright E2E patterns, Page Object Model, CI/CD |
| ai-regression-testing | reference | heavy | test/ai-regression-testing/ | Regression testing for AI-assisted development |
| accessibility-auditor | persona | heavy | test/accessibility-auditor/ | WCAG audit specialist — assistive tech testing |
| api-tester | persona | heavy | test/api-tester/ | API validation, performance testing, quality assurance |

## ship/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| deployment-patterns | reference | heavy | ship/deployment-patterns/ | CI/CD, Docker, health checks, rollback strategies |
| docker-patterns | reference | heavy | ship/docker-patterns/ | Docker/Compose patterns — dev, security, networking, volumes |
| devops-automator | persona | heavy | ship/devops-automator/ | Infrastructure automation, CI/CD pipelines, cloud ops |

## prompt/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| deep-research | execution | standard | prompt/deep-research/ | Multi-source research with citations via firecrawl/exa MCPs |
| prompt-optimizer | execution | heavy | prompt/prompt-optimizer/ | Optimize and refine prompts for better AI output |
| article-writing | reference | light | prompt/article-writing/ | Long-form content in distinctive voice |
| content-engine | reference | light | prompt/content-engine/ | Platform-native content systems for social and newsletters |

## ops/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| cost-aware-llm-pipeline | reference | standard | ops/cost-aware-llm-pipeline/ | LLM API cost optimization — model routing, budget tracking |
| enterprise-agent-ops | reference | light | ops/enterprise-agent-ops/ | Long-lived agent workloads with observability and security |
| strategic-compact | reference | standard | ops/strategic-compact/ | Manual context compaction at logical intervals |

## review/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| security-review | execution | heavy | review/security-review/ | Security checklist for auth, input handling, secrets, APIs |
| security-scan | execution | standard | review/security-scan/ | Scan .claude/ directory for vulnerabilities via AgentShield |
| code-reviewer | persona | light | review/code-reviewer/ | Constructive code review — correctness, maintainability, security |
| security-engineer | persona | heavy | review/security-engineer/ | Threat modeling, vulnerability assessment, secure architecture |

## meta/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| context-budget | execution | standard | meta/context-budget/ | Audit context window consumption and identify bloat |
| skill-stocktake | execution | standard | meta/skill-stocktake/ | Audit skills for quality — quick scan or full stocktake |
| architecture-decision-records | reference | standard | meta/architecture-decision-records/ | Capture architectural decisions as structured ADRs |
| codebase-onboarding | setup | standard | meta/codebase-onboarding/ | Analyze unfamiliar codebase and generate onboarding guide |
| continuous-learning-v2 | reference | heavy | meta/continuous-learning-v2/ | Instinct-based learning system with confidence scoring |

## domain/

| Name | Type | Weight | Path | Description |
|------|------|--------|------|-------------|
| minimax-docx | execution | heavy | domain/minimax-docx/ | Create, read, edit Word documents |
| minimax-pdf | execution | standard | domain/minimax-pdf/ | Read, create, manipulate PDF files |
| minimax-xlsx | execution | standard | domain/minimax-xlsx/ | Create, read, edit Excel spreadsheets |
| pptx-generator | execution | standard | domain/pptx-generator/ | Generate, edit, read PowerPoint presentations |
| shader-dev | execution | heavy | domain/shader-dev/ | GLSL shader techniques — ray marching, SDF, fluid, particles |
