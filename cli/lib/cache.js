'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const CACHE_DIR = path.join(os.homedir(), '.quiver');
const INDEX_FILE = path.join(CACHE_DIR, 'skills.json');
const SKILLS_DIR = path.join(CACHE_DIR, 'skills');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readIndex() {
  try {
    return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function writeIndex(data) {
  ensureDir(CACHE_DIR);
  fs.writeFileSync(INDEX_FILE, JSON.stringify(data, null, 2));
}

function skillDir(name) {
  return path.join(SKILLS_DIR, name);
}

function readSkill(name) {
  try {
    return fs.readFileSync(path.join(skillDir(name), 'SKILL.md'), 'utf8');
  } catch {
    return null;
  }
}

function writeSkill(name, content) {
  const dir = skillDir(name);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'SKILL.md'), content);
}

function readReference(name, filename) {
  try {
    return fs.readFileSync(path.join(skillDir(name), 'reference', filename), 'utf8');
  } catch {
    return null;
  }
}

function writeReference(name, filename, content) {
  const dir = path.join(skillDir(name), 'reference');
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, filename), content);
}

function getCachePath() {
  return CACHE_DIR;
}

module.exports = {
  readIndex, writeIndex,
  readSkill, writeSkill,
  readReference, writeReference,
  getCachePath, ensureDir
};
