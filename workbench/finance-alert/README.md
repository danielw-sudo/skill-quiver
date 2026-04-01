# Finance Alert

Threshold-based alerting for the AIGC-portfolio Finance Alert agent.

## Purpose

Monitors financial and operational metrics against configurable thresholds. Fires alerts when values cross boundaries. Designed as the missing primitive for the Finance Alert agent in the aggregator + butler + publish workflow.

## Usage

```bash
# Check metrics against thresholds
python finance_alert.py --config thresholds.json --data metrics.json

# Pipe metrics from another process
some_metrics_source | python finance_alert.py --config thresholds.json --stdin
```

Exit code: `0` = no alerts, `1` = alerts fired.

## Config Format

See `thresholds.example.json`. Each threshold rule:

| Field | Required | Description |
|-------|----------|-------------|
| `metric` | Yes | Metric name to match against input data |
| `threshold` | Yes | Numeric boundary |
| `direction` | No | `"above"` (default) or `"below"` |
| `severity` | No | `"info"`, `"warning"` (default), or `"critical"` |

Top-level `webhook_url`: reserved for future webhook dispatch.

## Status

Scaffold. Extend when AIGC-portfolio defines:
- Data sources (API spend tracker, portfolio feed, pipeline metrics)
- Notification channels (webhook, email, Slack)
- Alert aggregation / dedup rules
