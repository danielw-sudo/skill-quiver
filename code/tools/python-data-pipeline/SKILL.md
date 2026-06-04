---
name: python-data-pipeline
type: reference
category: code/tools
source: hermes
model: any
description: >-
  Build robust multi-stage data processing pipelines using Python. Covers the
  Input-Process-Output (IPO) pattern, config-driven architecture, dependency
  management with venv, and common pitfalls including NumPy ABI conflicts and
  externally-managed-environment errors.
pairs_with: [ops/persistent-background-script, code/software-architect]
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---

# Python Data Pipeline

## Philosophy: Config-Driven, Multi-Modal Architecture

**Core Principles:**
- **Config-Driven:** Sources defined in config files (e.g., `source_pools.json`), not hardcoded. New pipeline = new config block, no code changes.
- **Abstract Ingestion:** A single universal ingestion abstraction handles all source types. Main pipeline doesn't care how content is fetched.
- **Enrich at the Source:** Config metadata (tags, scoring weights) attached during ingestion provides context for downstream processing.

This transforms "building a pipeline" into "building a factory that produces pipelines."

## Intelligence Pipeline Architecture (5 Layers)

For content radars, market monitors, signal processors:

```
Layer 1: Raw Feed Service    → polls raw sources, writes to staging
Layer 2: Intelligent Harvester → hydrates pointers, extracts full content
Layer 3: Process Engine      → filter, dedupe, score, rank
Layer 4: Orchestrator        → runs layers sequentially with validation gates
Layer 5: Publication         → pushes final output to destination (CMS, API)
```

- **Layer 1:** Standalone persistent service (systemd/FastAPI) that survives restarts. Decoupled from main agent. Two-tier ingestion: complete items → "complete", failed/paywalled → "pointer" with URL only.
- **Layer 3:** Versioned "binary" Python script. TF-IDF semantic deduplication, scoring (authority × engagement × recency), ranking.
- **Layer 4:** Runs harvester + processor sequentially. Uses parallel dispatch for final polishing. Skip-and-log error recovery.

Always start with data contracts (JSON schemas) before writing code.

## IPO Architecture

For simpler pipelines:

- **Input:** Harvest scripts write raw data to `output/harvest/` as JSON files conforming to a schema.
- **Process:** Central `process_data.py` reads all harvest files, deduplicates, scores, enriches, writes `output/processed_data.json`.
- **Output:** Downstream scripts consume processed data for LLM curation, rendering, publishing.

## Dependency Management

### Pitfall: `externally-managed-environment` Error

Modern Linux systems (PEP 668) block `pip install` without a venv. **Never use `--break-system-packages`.**

**Correct solution:**
```bash
# Create project venv
python3 -m venv ./.venv

# Install with venv pip
./.venv/bin/pip install <package>

# Run with venv python
./.venv/bin/python3 your_script.py
```

Always use this pattern for Python projects requiring external libraries.

### Pitfall: NumPy 2.x ABI Break

NumPy 2.0 broke binary ABI. Packages with compiled C extensions built against 1.x fail at runtime with 2.x.

**Solution: isolated venv with pinned versions**

```bash
cat > requirements.txt << 'EOF'
numpy<2.0
scikit-learn>=1.3
scipy>=1.11
EOF

python3 -m venv .venv
./.venv/bin/pip install -r requirements.txt
./.venv/bin/python3 your_script.py
```

### Pitfall: Using `patch` Tool for Code Edits

1. **Always read the file first** — ensures `old_string` is accurate
2. **Copy exact text** — include indentation and surrounding lines for uniqueness
3. **Validate syntax** of `new_string` before applying
4. **On failed patch:** re-read the file, start over

## Execution Steps

1. **Define Schemas** — JSON schemas for raw harvested data and final processed data before any code
2. **Implement Harvesters** — simple, single-purpose scripts per data source
3. **Implement Processor** — central Python script with the core logic
4. **Manage Dependencies** — always use a project venv
5. **Orchestrate** — run scripts in correct order, validate between stages
