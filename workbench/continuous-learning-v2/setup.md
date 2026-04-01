# Continuous Learning v2.1 — Workbench Setup

## Enable Observation Hooks

Add to your `~/.claude/settings.json`.

**If installed as a plugin** (recommended):

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }],
    "PostToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }]
  }
}
```

**If installed manually** to `~/.claude/skills`:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }],
    "PostToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }]
  }
}
```

## Initialize Directory Structure

```bash
# Global directories
mkdir -p ~/.claude/homunculus/{instincts/{personal,inherited},evolved/{agents,skills,commands},projects}

# Project directories are auto-created when the hook first runs in a git repo
```

## Project Detection

The system automatically detects your current project:

1. **`CLAUDE_PROJECT_DIR` env var** (highest priority)
2. **`git remote get-url origin`** — hashed to create a portable project ID
3. **`git rev-parse --show-toplevel`** — fallback using repo path
4. **Global fallback** — if no project detected, instincts go to global scope

Each project gets a 12-character hash ID. A registry at `~/.claude/homunculus/projects.json` maps IDs to names.

## Configuration

Edit `config.json`:

```json
{
  "version": "2.1",
  "observer": {
    "enabled": false,
    "run_interval_minutes": 5,
    "min_observations_to_analyze": 20
  }
}
```

| Key | Default | Description |
|-----|---------|-------------|
| `observer.enabled` | `false` | Enable background observer agent |
| `observer.run_interval_minutes` | `5` | Observer analysis frequency |
| `observer.min_observations_to_analyze` | `20` | Minimum observations before analysis |

## File Structure

```
~/.claude/homunculus/
+-- identity.json
+-- projects.json
+-- observations.jsonl
+-- instincts/
|   +-- personal/
|   +-- inherited/
+-- evolved/
|   +-- agents/ skills/ commands/
+-- projects/
    +-- <project-hash>/
        +-- project.json
        +-- observations.jsonl
        +-- instincts/{personal,inherited}/
        +-- evolved/{skills,commands,agents}/
```

## Scripts

- `observe.sh` — Hook implementation (PreToolUse/PostToolUse)
- `instinct-cli.py` — Full CLI for instinct management
- `detect-project.sh` — Project detection helper

## Related

- [ECC-Tools GitHub App](https://github.com/apps/ecc-tools) — Generate instincts from repo history
- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) — Continuous learning section
