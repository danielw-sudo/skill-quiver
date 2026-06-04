---
name: vps-audit
description: >-
  Systematically audit a Linux VPS — find all listening services, check
  firewall rules (UFW + iptables), test external reachability, inspect
  logs for blocked probes. Answer the question: "what's exposed to the
  internet?"
version: 1.0.0
author: Hermes
platforms: [linux]
metadata:
  hermes:
    tags: [vps, audit, firewall, ssh, security, reconnaissance]
---

# VPS Infrastructure Audit

Use this skill when the user asks to:
- "Is port X reachable?"
- "What's listening on this server?"
- "Check the firewall"
- "What services are exposed?"
- "Investigate SSH connectivity"
- "Why can't I connect to port X?"
- "Audit the server's public surface"

## Systematic Approach — Layer by Layer

### Layer 1: Find All Listening Services

```bash
# All listening, with process names
sudo ss -tlnp

# Separate what's on all interfaces vs loopback-only
sudo ss -tlnp | grep -v "127.0.0.1\|::1\]"
```

Categorize: `0.0.0.0:PORT` = public interface (firewall-dependent). `127.0.0.1:PORT` = localhost only.

### Layer 2: Check UFW Firewall

```bash
sudo ufw status numbered
sudo ufw status verbose
```

If a service is on `0.0.0.0:PORT` but UFW shows it BLOCKED, it won't be reachable from outside.

### Layer 3: Check iptables (underlying rules)

```bash
sudo iptables -L -n --line-numbers | head -40
```

Look at the INPUT chain policy (ACCEPT/DROP) and UFW chains. UFW inserts its rules before the default policy.

### Layer 4: Local Connectivity Test (from inside the VPS)

Use bash's `/dev/tcp` if `nc` is not installed:

```bash
timeout 5 bash -c 'exec 3>/dev/tcp/localhost/PORT' && echo "OPEN" || echo "BLOCKED"
```

Test against the **public IP** to confirm hairpin routing:

```bash
PUBLIC_IP=$(curl -s ifconfig.me)
timeout 5 bash -c "exec 3>/dev/tcp/$PUBLIC_IP/PORT" && echo "OPEN" || echo "BLOCKED"
```

Note: hairpin success means the VPS firewall + local routing allow it. Cloud-level firewalls (Oracle Cloud security lists, AWS security groups, GCP firewall rules) can still block external traffic.

### Layer 5: External Reachability Check

When the user wants to know if the internet can reach a port, you need an **external service**. Options:

**Option A — yougetsignal.com (simple HTTP API):**
```bash
curl -s "https://ports.yougetsignal.com/check-port.php?remote_address=IP&port=PORT"
```
Returns a page with "open/closed" text somewhere in the HTML.

**Option B — check-host.net (Cloudflare-gated, may need JS):**
```bash
curl -s "https://check-host.net/check-tcp?host=IP:PORT&node=us1.node.check-host.net"
```

### Layer 6: Check Logs for Probes

```bash
# Recent blocked connections (UFW logs to kernel)
sudo journalctl --since "30 minutes ago" | grep "UFW BLOCK" | tail -20

# SSH auth attempts
sudo journalctl -u ssh -n 20 --no-pager

# All non-sshd activity
sudo journalctl --since "30 minutes ago" | grep -v sshd | tail -30
```

### Layer 7: Cloud-Level Firewall

On Oracle Cloud, AWS, GCP, Azure — there's a firewall OUTSIDE the VPS. UFW may allow a port but the cloud layer blocks it. The only way to confirm is:

1. An **external port check** (Layer 5) — if it times out but local test passes, the cloud layer is blocking
2. User must check the **cloud console** (security lists / security groups / firewall rules)

### Layer 8: Start a Test Service

If you need to verify a new port works end-to-end:

```bash
# Start a service (e.g. second SSH daemon)
sudo /usr/sbin/sshd -p PORT

# Open UFW
sudo ufw allow PORT/tcp

# Verify listening
sudo ss -tlnp | grep :PORT

# Test locally
timeout 5 bash -c "exec 3>/dev/tcp/localhost/PORT" && echo "OPEN"
```

## Common Pitfalls

- **`nc` is often not installed** on minimal VPS images (Oracle, AWS). Use `bash -c 'exec 3>/dev/tcp/...'` instead.
- **`auth.log` doesn't exist** on systemd-based distros (Ubuntu, Oracle Linux). Use `journalctl -u ssh` instead.
- **UFW defaults to deny-incoming.** Opening a service port in the app without a `ufw allow` rule means it stays blocked.
- **Cloud layer is invisible from inside the VM.** You can't `curl` or `ping` your own cloud firewall — it needs an external check.
- **`sshd -p PORT` requires absolute path** (`/usr/sbin/sshd`), not bare `sshd`.
- **Yougetsignal.com** returns HTML, not JSON — need to grep for "open"/"closed".