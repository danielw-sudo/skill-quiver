'use strict';

const fs = require('fs');
const path = require('path');
const cache = require('./cache.js');
const fetch = require('./fetch.js');
const search = require('./search.js');
const fmt = require('./format.js');
const inject = require('./inject.js');

async function loadIndex() {
  let index = cache.readIndex();
  if (!index) {
    process.stderr.write('First run — syncing skill index...\n');
    index = await fetch.fetchIndex();
    cache.writeIndex(index);
  }
  return index;
}

async function loadSkillContent(skill) {
  let content = cache.readSkill(skill.name);
  if (!content) {
    content = await fetch.fetchSkill(skill);
    cache.writeSkill(skill.name, content);
  }
  return content;
}

function requireMatch(skills, name) {
  const result = search.resolveSkill(skills, name);
  if (result.ambiguous) {
    const list = result.matches.map(s => `  ${fmt.cyan(s.name)}  ${fmt.dim(s.category)}`).join('\n');
    throw new Error(`Ambiguous — multiple matches:\n${list}\nBe more specific.`);
  }
  if (!result.match) {
    throw new Error(`Skill "${name}" not found. Try: quiver search ${name}`);
  }
  return result.match;
}

async function cmdList() {
  const skills = await loadIndex();
  const grouped = {};
  for (const s of skills) {
    (grouped[s.category] || (grouped[s.category] = [])).push(s);
  }
  const cats = Object.keys(grouped).sort();
  for (const cat of cats) {
    process.stdout.write(`\n${fmt.bold(fmt.cyan(cat + '/'))}\n`);
    const rows = grouped[cat].map(s => [
      s.name, s.type, s.weight, s.description || ''
    ]);
    process.stdout.write(fmt.table(['Name', 'Type', 'Weight', 'Description'], rows) + '\n');
  }
  process.stdout.write(`\n${fmt.dim(`${skills.length} skills across ${cats.length} categories`)}\n`);
}

async function cmdSearch(args) {
  if (!args.length) throw new Error('Usage: quiver search <keyword>');
  const skills = await loadIndex();
  const results = search.fuzzyMatch(skills, args.join(' '));
  if (!results.length) {
    process.stdout.write(`No skills found matching "${args.join(' ')}"\n`);
    return;
  }
  const rows = results.map(s => [s.name, s.category, s.weight, s.description || '']);
  process.stdout.write(fmt.table(['Name', 'Category', 'Weight', 'Description'], rows) + '\n');
  process.stdout.write(fmt.dim(`${results.length} result${results.length > 1 ? 's' : ''}`) + '\n');
}

async function cmdDraw(args) {
  if (!args.length) throw new Error('Usage: quiver draw <name>');
  const skills = await loadIndex();
  const skill = requireMatch(skills, args[0]);
  const content = await loadSkillContent(skill);
  process.stdout.write(content);
}

async function cmdInstall(args) {
  if (!args.length) throw new Error('Usage: quiver install <name> [--target <dir>]');
  const skills = await loadIndex();
  const skill = requireMatch(skills, args[0]);
  let target = '.claude/skills';
  const tIdx = args.indexOf('--target');
  if (tIdx !== -1 && args[tIdx + 1]) target = args[tIdx + 1];

  const destDir = path.join(target, skill.name);
  fs.mkdirSync(destDir, { recursive: true });
  const content = await loadSkillContent(skill);
  fs.writeFileSync(path.join(destDir, 'SKILL.md'), content);
  process.stderr.write(`${fmt.green('Installed')} ${skill.name} → ${destDir}/SKILL.md\n`);

  const refFiles = await fetch.listReferenceFiles(skill);
  if (refFiles.length) {
    const refDir = path.join(destDir, 'reference');
    fs.mkdirSync(refDir, { recursive: true });
    for (const f of refFiles) {
      const rc = await fetch.fetchReference(skill, f);
      fs.writeFileSync(path.join(refDir, f), rc);
      cache.writeReference(skill.name, f, rc);
    }
    process.stderr.write(`${fmt.dim(`  + ${refFiles.length} reference file(s)`)}\n`);
  }
}

async function cmdInfo(args) {
  if (!args.length) throw new Error('Usage: quiver info <name>');
  const skills = await loadIndex();
  const skill = requireMatch(skills, args[0]);
  const fields = [
    ['Name', fmt.bold(skill.name)],
    ['ID', skill.id],
    ['Type', skill.type],
    ['Category', skill.category],
    ['Weight', skill.weight],
    ['Description', skill.description || ''],
    ['Pairs with', (skill.pairs_with || []).join(', ') || fmt.dim('none')],
    ['Reviewed', skill.reviewed_at || fmt.dim('not yet')],
    ['Model tested', skill.model_tested || fmt.dim('unknown')],
    ['Path', skill.path],
  ];
  const maxLabel = Math.max(...fields.map(f => f[0].length));
  for (const [label, val] of fields) {
    process.stdout.write(`  ${fmt.cyan(fmt.padRight(label, maxLabel + 1))} ${val}\n`);
  }
}

async function cmdSync() {
  process.stderr.write('Fetching latest skill index...\n');
  const skills = await fetch.fetchIndex();
  const prev = cache.readIndex();
  cache.writeIndex(skills);
  const cats = new Set(skills.map(s => s.category));
  let msg = `Synced: ${skills.length} skills (${cats.size} categories)`;
  if (prev) {
    const diff = skills.length - prev.length;
    if (diff > 0) msg += ` — ${diff} new`;
    else if (diff < 0) msg += ` — ${Math.abs(diff)} removed`;
  }
  process.stderr.write(fmt.green(msg) + '\n');
}

async function cmdInject(args) {
  if (args.length < 2) throw new Error('Usage: quiver inject <skill> <command> [args...]');
  const skills = await loadIndex();
  const skill = requireMatch(skills, args[0]);
  const content = await loadSkillContent(skill);
  const refs = [];
  const refFiles = await fetch.listReferenceFiles(skill);
  for (const f of refFiles) {
    let rc = cache.readReference(skill.name, f);
    if (!rc) {
      rc = await fetch.fetchReference(skill, f);
      cache.writeReference(skill.name, f, rc);
    }
    refs.push({ name: f, content: rc });
  }
  const ctx = inject.buildContext(content, refs);
  await inject.injectAndRun(args[1], args.slice(2), ctx);
}

const HELP = `
${fmt.bold('skill-quiver')} — AI skill package manager

${fmt.cyan('Commands:')}
  quiver list                  Browse all skills by category
  quiver search <keyword>      Fuzzy search skills
  quiver draw <name>           Output skill to stdout (pipe to any AI)
  quiver install <name>        Copy skill to .claude/skills/
  quiver info <name>           Show skill details
  quiver sync                  Refresh skill index from GitHub
  quiver inject <name> <cmd>   Prepend skill context to a CLI command

${fmt.cyan('Options:')}
  --target <dir>               Install target (default: .claude/skills/)
  --help, -h                   Show this help

${fmt.cyan('Examples:')}
  quiver search tdd            Find testing skills
  quiver draw tdd-workflow     Pipe TDD skill to AI context
  quiver install fe-design     Install frontend design skill locally
  quiver inject tdd codex exec "write tests for auth.ts"
`.trim();

const COMMANDS = {
  list: cmdList,
  search: cmdSearch,
  draw: cmdDraw,
  install: cmdInstall,
  info: cmdInfo,
  sync: cmdSync,
  inject: cmdInject,
};

async function run(argv) {
  const cmd = argv[0];
  if (!cmd || cmd === '--help' || cmd === '-h') {
    process.stdout.write(HELP + '\n');
    return;
  }
  const handler = COMMANDS[cmd];
  if (!handler) throw new Error(`Unknown command: ${cmd}. Run "quiver --help" for usage.`);
  await handler(argv.slice(1));
}

module.exports = { run };
