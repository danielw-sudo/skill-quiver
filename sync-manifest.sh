#!/bin/bash
# sync-manifest.sh — Push compact skill index to Trilium
# Run after adding/removing skills in the quiver
# Requires: TRILIUM_URL and TRILIUM_TOKEN env vars (or edit defaults below)

TRILIUM_URL="${TRILIUM_URL:-http://localhost:37840}"
TRILIUM_TOKEN="${TRILIUM_TOKEN:-}"
NOTE_ID="kpIA1RoIFb6V"
MANIFEST="$(dirname "$0")/MANIFEST.md"

if [ -z "$TRILIUM_TOKEN" ]; then
  echo "Error: Set TRILIUM_TOKEN env var"
  exit 1
fi

# Parse MANIFEST.md into compact index: number, name, description
awk -F'|' '
  /^\|.*\|.*execution.*\|/ || /^\|.*\|.*reference.*\|/ || /^\|.*\|.*persona.*\|/ || /^\|.*\|.*setup.*\|/ {
    gsub(/^[ \t]+|[ \t]+$/, "", $2)  # name
    gsub(/^[ \t]+|[ \t]+$/, "", $6)  # description
    printf "%2d  %-28s %s\n", ++n, $2, $6
  }
' "$MANIFEST" > /tmp/skill-index.txt

curl -s -X PUT "${TRILIUM_URL}/etapi/notes/${NOTE_ID}/content" \
  -H "Authorization: ${TRILIUM_TOKEN}" \
  -H "Content-Type: text/plain" \
  -T /tmp/skill-index.txt

echo "Synced $(wc -l < /tmp/skill-index.txt) skills to Trilium note ${NOTE_ID}"
rm /tmp/skill-index.txt
