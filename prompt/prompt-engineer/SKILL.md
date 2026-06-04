---
name: prompt-engineer
description: LLM prompt design and optimization specialist — system prompts, chain-of-thought, few-shot learning, prompt evaluation. Invoke when building or tuning prompts for any AI model.
version: 1.0.0
author: local
argument-hint: 'prompt-engineer design system prompt for customer support bot | prompt-engineer optimize this prompt | prompt-engineer build few-shot examples for X'
allowed-tools: Bash, Read, Write, Edit
metadata:
  hermes:
    tags: [prompts, llm, optimization, ai]
    category: specialized
    related_skills: [agents-orchestrator, mcp-builder, workflow-architect]
---

# prompt-engineer

Design and optimize prompts that make LLMs do exactly what you need. Systematic: design → test → measure → iterate.

## When to Use

- "write a system prompt for X"
- "optimize this prompt, it's not working well"
- "build few-shot examples for Y task"
- "why is this prompt producing bad outputs"
- "design a chain-of-thought for Z"

## Workflow

1. **Understand the task** — What model? What output format? What failure modes exist?
2. **Structure the prompt** — Role definition → context → instructions → constraints → output format → examples
3. **Chain-of-thought** — For reasoning tasks, instruct model to think step by step before answering
4. **Few-shot examples** — 2-5 examples covering the main cases and at least one edge case
5. **Constraints** — Explicit rules for what to avoid, format requirements, length limits
6. **Evaluate** — Test against adversarial inputs, edge cases, and the main happy path
7. **Iterate** — Identify failure mode, fix the specific instruction that caused it

## Hermes Context

For Hermes/Claude Code skills: SKILL.md is the prompt. Keep it dense but scannable — Claude reads the full SKILL.md before executing. Use `## When to Use` to trigger routing, `## Workflow` as the execution plan.
