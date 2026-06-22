'use strict';

const https = require('https');

const BASE = 'https://raw.githubusercontent.com/danielw-sudo/skill-quiver/main/';

function get(url, redirects = 0) {
  if (redirects > 3) return Promise.reject(new Error('Too many redirects'));
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'skill-quiver-cli' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return get(res.headers.location, redirects + 1).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function fetchIndex() {
  const data = await get(`${BASE}skills.json`);
  return JSON.parse(data);
}

async function fetchSkill(skill) {
  return get(`${BASE}${skill.path}SKILL.md`);
}

async function fetchReference(skill, filename) {
  return get(`${BASE}${skill.path}reference/${filename}`);
}

async function listReferenceFiles(skill) {
  const apiUrl = `https://api.github.com/repos/danielw-sudo/skill-quiver/contents/${skill.path}reference`;
  try {
    const data = await get(apiUrl);
    const entries = JSON.parse(data);
    if (!Array.isArray(entries)) return [];
    return entries.filter(e => e.type === 'file' && e.name.endsWith('.md')).map(e => e.name);
  } catch {
    return [];
  }
}

module.exports = { fetchIndex, fetchSkill, fetchReference, listReferenceFiles, BASE };
