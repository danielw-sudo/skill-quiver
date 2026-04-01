"""
Finance Alert — Threshold-based alerting for financial metrics.

Scaffold for the AIGC-portfolio Finance Alert agent.
Reads thresholds from config, checks current values, dispatches notifications.

Usage:
    python finance_alert.py --config thresholds.json --data metrics.json
    python finance_alert.py --config thresholds.json --stdin
"""

import argparse
import json
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Alert:
    metric: str
    current: float
    threshold: float
    direction: str  # "above" or "below"
    severity: str   # "info", "warning", "critical"

    @property
    def message(self) -> str:
        return (
            f"[{self.severity.upper()}] {self.metric}: "
            f"{self.current} is {self.direction} threshold {self.threshold}"
        )


def load_json(path: Path) -> dict:
    return json.loads(path.read_text())


def check_thresholds(
    metrics: dict[str, float],
    thresholds: list[dict],
) -> list[Alert]:
    """Compare current metrics against configured thresholds."""
    alerts: list[Alert] = []
    for rule in thresholds:
        metric = rule["metric"]
        if metric not in metrics:
            continue
        current = metrics[metric]
        limit = rule["threshold"]
        direction = rule.get("direction", "above")
        severity = rule.get("severity", "warning")
        triggered = (
            (direction == "above" and current > limit)
            or (direction == "below" and current < limit)
        )
        if triggered:
            alerts.append(Alert(
                metric=metric,
                current=current,
                threshold=limit,
                direction=direction,
                severity=severity,
            ))
    return alerts


def dispatch(alerts: list[Alert], *, webhook_url: str | None = None) -> None:
    """Dispatch alerts. Currently stdout; extend with webhook/email."""
    for alert in alerts:
        print(alert.message)
    # TODO: Add webhook dispatch when AIGC-portfolio defines the endpoint
    # TODO: Add email dispatch for critical alerts


def main() -> None:
    parser = argparse.ArgumentParser(description="Finance Alert — threshold checker")
    parser.add_argument("--config", required=True, help="Path to thresholds.json")
    parser.add_argument("--data", help="Path to metrics.json")
    parser.add_argument("--stdin", action="store_true", help="Read metrics from stdin")
    args = parser.parse_args()

    config = load_json(Path(args.config))
    thresholds = config.get("thresholds", [])

    if args.stdin:
        metrics = json.load(sys.stdin)
    elif args.data:
        metrics = load_json(Path(args.data))
    else:
        parser.error("Provide --data or --stdin")
        return

    alerts = check_thresholds(metrics, thresholds)
    if alerts:
        dispatch(alerts, webhook_url=config.get("webhook_url"))
        sys.exit(1)  # Non-zero exit = alerts fired
    else:
        print("No alerts triggered.")


if __name__ == "__main__":
    main()
