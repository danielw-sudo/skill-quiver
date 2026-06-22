'use strict';

function parse(text) {
  if (!text.startsWith('---')) return { meta: {}, body: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { meta: {}, body: text };

  const fmText = text.slice(4, end).trim();
  const body = text.slice(end + 4).trim();
  const result = {};
  const lines = fmText.split('\n');
  let i = 0;

  while (i < lines.length) {
    const m = lines[i].match(/^([\w][\w_-]*):\s*(.*)/);
    if (!m) { i++; continue; }
    const [, key, rawVal] = m;
    const val = rawVal.trim();

    if (val.startsWith('[')) {
      result[key] = val.slice(1, val.lastIndexOf(']'))
        .split(',')
        .map(x => x.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
      i++; continue;
    }

    if (val === '' || val === '>-' || val === '>') {
      const collected = [];
      i++;
      while (i < lines.length && /^\s/.test(lines[i])) {
        const trimmed = lines[i].trim();
        if (trimmed.startsWith('- ')) {
          collected.push(trimmed.slice(2));
        } else {
          collected.push(trimmed);
        }
        i++;
      }
      result[key] = collected.length === 1 ? collected[0] :
        collected.some((_, idx) => lines[i - collected.length + idx]?.trim().startsWith('- '))
          ? collected : collected.join(' ');
      continue;
    }

    result[key] = val.replace(/^['"]|['"]$/g, '');
    i++;
  }

  return { meta: result, body };
}

module.exports = { parse };
