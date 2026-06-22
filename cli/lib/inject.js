'use strict';

const { spawn } = require('child_process');

function buildContext(skillContent, referenceContents) {
  let ctx = skillContent;
  if (referenceContents && referenceContents.length > 0) {
    for (const { name, content } of referenceContents) {
      ctx += `\n\n---\n\n# Reference: ${name}\n\n${content}`;
    }
  }
  return ctx;
}

function injectAndRun(cli, cliArgs, context) {
  const cmd = cli.toLowerCase();

  if (cmd === 'codex' || cmd.endsWith('/codex')) {
    const lastIdx = cliArgs.length - 1;
    if (lastIdx >= 0) {
      cliArgs[lastIdx] = `${context}\n\n---\n\n${cliArgs[lastIdx]}`;
    }
    return run(cli, cliArgs);
  }

  if (cmd === 'gemini' || cmd.endsWith('/gemini')) {
    const lastIdx = cliArgs.length - 1;
    if (lastIdx >= 0) {
      cliArgs[lastIdx] = `${context}\n\n---\n\n${cliArgs[lastIdx]}`;
    }
    return run(cli, cliArgs);
  }

  if (cmd === 'claude' || cmd.endsWith('/claude')) {
    return run(cli, ['-p', `${context}\n\n---\n\n${cliArgs.join(' ')}`]);
  }

  process.stdout.write(context + '\n\n---\n\n');
  return run(cli, cliArgs);
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
    child.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

module.exports = { buildContext, injectAndRun };
