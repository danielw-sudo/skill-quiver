'use strict';

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

const useColor = !process.env.NO_COLOR && process.stdout.isTTY;

function c(code, text) {
  return useColor ? `${code}${text}${RESET}` : text;
}

const bold = t => c(BOLD, t);
const dim = t => c(DIM, t);
const cyan = t => c(CYAN, t);
const green = t => c(GREEN, t);
const yellow = t => c(YELLOW, t);
const red = t => c(RED, t);

function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

function padRight(str, len) {
  const visible = stripAnsi(str).length;
  return str + ' '.repeat(Math.max(0, len - visible));
}

function truncate(str, len) {
  if (str.length <= len) return str;
  return str.slice(0, len - 1) + '…';
}

function table(headers, rows, colWidths) {
  const cols = process.stdout.columns || 80;
  if (!colWidths) {
    const fixed = headers.length - 1;
    const fixedTotal = headers.slice(0, fixed).reduce((s, _, i) => {
      const max = Math.max(headers[i].length, ...rows.map(r => stripAnsi(String(r[i])).length));
      return s + max + 2;
    }, 0);
    colWidths = headers.slice(0, fixed).map((_, i) =>
      Math.max(headers[i].length, ...rows.map(r => stripAnsi(String(r[i])).length)) + 2
    );
    colWidths.push(Math.max(10, cols - fixedTotal - 2));
  }

  const hdr = headers.map((h, i) => bold(padRight(h, colWidths[i]))).join('');
  const sep = dim('─'.repeat(Math.min(cols, colWidths.reduce((a, b) => a + b, 0))));
  const body = rows.map(row =>
    row.map((cell, i) => {
      const s = String(cell);
      const w = colWidths[i];
      return padRight(truncate(stripAnsi(s).length > w ? truncate(s, w) : s, w), w);
    }).join('')
  ).join('\n');

  return `${hdr}\n${sep}\n${body}`;
}

module.exports = { bold, dim, cyan, green, yellow, red, padRight, truncate, table, stripAnsi };
